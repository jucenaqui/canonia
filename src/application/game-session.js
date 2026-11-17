// Partida en curso (T019, T093): inventario, mundos, puertas, contexto del jugador y guardado.
// Usa ProgressStore; los flujos de puerta, jefe y modo guía llaman a saveNow() al terminar
// cada acción (005/FR-014).

import { Inventory } from '../domain/inventory.js';
import { Gate } from '../domain/gate.js';
import { World } from '../domain/world.js';
import { SAVED_GAME_VERSION, STORE_ERRORS, AI_MODES } from './ports.js';

export const MIN_INTERESTS = 3;
export const MAX_INTERESTS = 5;
export const MIN_CUSTOM_INTEREST = 2;
export const MAX_CUSTOM_INTEREST = 40;

const SCREENS = ['map', 'level', 'gate', 'bossReview', 'summary'];

function newPlayerContext() {
  return { interests: [], customInterest: null, tutorialSeen: false, assistMode: false, guideNoticeSeen: false };
}

/**
 * Contenido que la sesión necesita de cada mundo.
 * @typedef {object} SessionContent
 * @property {{ id: string, criteria: string[] }[]} worlds
 * @property {{ id: string, worldId: string, dependsOn: string[] }[]} pieces
 * @property {{ id: string, worldId: string, pieceId: string }[]} gates
 * @property {string[]} interests Lista fija de intereses (004/FR-010).
 */

export class GameSession {
  #content;
  #store;
  #clock;
  #pendingSave = null;
  #saveWarned = false;

  /**
   * @param {object} deps
   * @param {SessionContent} deps.content
   * @param {import('./ports.js').ProgressStore} deps.store
   * @param {import('./ports.js').AiPort} deps.ai
   * @param {() => string} [deps.clock] Fecha ISO para las aprobaciones.
   */
  constructor({ content, store, ai, clock = () => new Date().toISOString() }) {
    this.#content = content;
    this.#store = store;
    this.#clock = clock;
    this.ai = ai;
    /** Modo de IA de esta carga de la página (005/FR-006). No se guarda: se decide al arrancar. */
    this.aiMode = ai?.mode ?? AI_MODES.DEMO;
    this.#reset();
  }

  #reset() {
    this.inventory = Inventory.fromDefinitions(this.#content.pieces);
    /** @type {Map<string, World>} */
    this.worlds = new Map(this.#content.worlds.map((w) => [w.id, new World({ id: w.id, criteria: w.criteria })]));
    /** @type {Map<string, Gate>} */
    this.gates = new Map(this.#content.gates.map((g) => [g.id, new Gate(g)]));
    this.playerContext = newPlayerContext();
    this.resume = null;
  }

  now() {
    return this.#clock();
  }

  // --- Intereses (004/FR-010 a FR-013) ---

  /**
   * Cambia los intereses. No toca ninguna pieza (004/FR-013).
   * @param {{ selected: string[], custom?: string | null }} choice
   */
  async setInterests({ selected, custom = null }) {
    const unique = [...new Set(selected ?? [])];
    if (unique.length < MIN_INTERESTS) return { ok: false, reason: 'tooFew' };
    if (unique.length > MAX_INTERESTS) return { ok: false, reason: 'tooMany' };
    if (!unique.every((interest) => this.#content.interests.includes(interest))) return { ok: false, reason: 'unknownInterest' };
    const written = typeof custom === 'string' ? custom.trim() : '';
    if (written && (written.length < MIN_CUSTOM_INTEREST || written.length > MAX_CUSTOM_INTEREST)) {
      return { ok: false, reason: 'invalidCustom' };
    }
    this.playerContext.interests = written ? [...unique, written] : unique;
    this.playerContext.customInterest = written || null;
    await this.saveNow();
    return { ok: true };
  }

  // --- Punto de retorno y guardado (D39) ---

  /** Dónde reabrir la partida tras una recarga (data-model.md, "ResumePoint"). */
  setResume({ worldId, screen, gateId = null, awaitingGuideAnswer = false }) {
    if (!this.worlds.has(worldId)) throw new Error(`Mundo desconocido: ${worldId}`);
    if (!SCREENS.includes(screen)) throw new Error(`Pantalla desconocida: ${screen}`);
    if (gateId !== null && !this.gates.has(gateId)) throw new Error(`Puerta desconocida: ${gateId}`);
    this.resume = { worldId, screen, gateId, awaitingGuideAnswer: Boolean(awaitingGuideAnswer) };
  }

  toSavedGame() {
    return {
      version: SAVED_GAME_VERSION,
      inventory: this.inventory.toData(),
      worlds: [...this.worlds.values()].map((world) => world.toData()),
      gates: [...this.gates.values()].map((gate) => gate.toData()),
      playerContext: { ...this.playerContext, interests: [...this.playerContext.interests] },
      resume: this.resume ? { ...this.resume } : null,
    };
  }

  /**
   * Guarda la partida. Un fallo no deshace nada de lo hecho en memoria.
   * @returns {Promise<{ ok: true } | { ok: false, warn: boolean }>} `warn` es true solo la primera vez
   *   que falla, para avisar una sola vez (005/FR-018).
   */
  async saveNow() {
    const result = await this.#store.save(this.toSavedGame());
    if (result?.ok) return { ok: true };
    const warn = !this.#saveWarned;
    this.#saveWarned = true;
    return { ok: false, warn };
  }

  /**
   * Busca una partida guardada sin aplicarla todavía (005/FR-015).
   * @returns {Promise<{ status: 'none'|'found'|'unreadable'|'otherVersion'|'unavailable' }>}
   */
  async loadSavedGame() {
    this.#pendingSave = null;
    const data = await this.#store.load();
    if (data === null || data === undefined) return { status: 'none' };
    if (data.error) {
      const known = Object.values(STORE_ERRORS).includes(data.error);
      return { status: known ? data.error : STORE_ERRORS.UNREADABLE };
    }
    try {
      this.#pendingSave = this.#restore(data);
    } catch {
      return { status: STORE_ERRORS.UNREADABLE };
    }
    return { status: 'found' };
  }

  /** Aplica la partida encontrada y devuelve el punto de retorno (005/FR-016). */
  continueSavedGame() {
    if (!this.#pendingSave) throw new Error('No hay partida guardada para continuar');
    Object.assign(this, this.#pendingSave);
    this.#pendingSave = null;
    return this.resume ? { ...this.resume } : null;
  }

  /**
   * Empieza de nuevo. Si hay una partida guardada, exige la confirmación del jugador (005/FR-015).
   * @param {{ confirmed?: boolean }} [options]
   */
  async startNewGame({ confirmed = false } = {}) {
    if (this.#pendingSave && !confirmed) return { ok: false, reason: 'needsConfirmation' };
    await this.#store.clear();
    this.#pendingSave = null;
    this.#reset();
    return { ok: true };
  }

  /** Reconstruye el estado desde una partida guardada. Lanza si no encaja con el contenido. */
  #restore(data) {
    if (data.version !== SAVED_GAME_VERSION) throw new Error('Versión distinta');
    const inventory = Inventory.fromData(data.inventory);
    const expectedPieces = this.#content.pieces.map((p) => p.id).sort();
    const savedPieces = inventory.list().map((p) => p.id).sort();
    if (JSON.stringify(expectedPieces) !== JSON.stringify(savedPieces)) throw new Error('Piezas distintas');

    const worlds = new Map(data.worlds.map((w) => [w.id, World.fromData(w)]));
    const gates = new Map(data.gates.map((g) => [g.id, Gate.fromData(g)]));
    for (const { id } of this.#content.worlds) if (!worlds.has(id)) throw new Error('Mundos distintos');
    for (const { id } of this.#content.gates) if (!gates.has(id)) throw new Error('Puertas distintas');

    const playerContext = { ...newPlayerContext(), ...data.playerContext };
    if (!Array.isArray(playerContext.interests)) throw new Error('Intereses inválidos');

    const resume = data.resume ?? null;
    if (resume && (!worlds.has(resume.worldId) || !SCREENS.includes(resume.screen)
      || (resume.gateId != null && !gates.has(resume.gateId)))) {
      throw new Error('Punto de retorno inválido');
    }
    return { inventory, worlds, gates, playerContext, resume };
  }
}
