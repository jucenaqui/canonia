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

/** Chispas acumuladas por cada consejo de PIX y porcentaje que cuesta un fallo (D48). */
export const SPARKS_PER_TIP = 10;
export const FAIL_LOSS_PERCENT = 25;

/** Confianza con la que empieza el jugador en los minijuegos (D51). */
export const INITIAL_TRUST = 60;

/**
 * Estado del mundo 3D que no es una pieza del influencer (plan 006, T011): chispas (D48),
 * consejos de PIX desbloqueados, minijuegos hechos (`zona:opción`) y confianza (D51).
 * `zonesPresented`: zonas cuya presentación de PIX ya se vio (D62); si falta o viene mal, vacío.
 * `sparksCollected`: ids de las chispas ya recogidas (T037, no reaparecen); lectura tolerante.
 * `tipsUnlocked` guarda un id por consejo (`tip-<índice>`); su longitud es cuántos hay desbloqueados.
 * Nada de esto aprueba ni cambia piezas.
 */
function newWorld3dState() {
  return { sparks: 0, tipsUnlocked: [], minigamesDone: [], zonesPresented: [], sparksCollected: [], trust: INITIAL_TRUST };
}

/** Valida y copia el estado del mundo 3D guardado. Lanza si la forma no es válida. */
function readWorld3dState(saved) {
  if (saved === undefined || saved === null) return newWorld3dState();
  const isIdList = (list) => Array.isArray(list) && list.every((item) => typeof item === 'string' && item.length > 0 && item.length <= 80);
  const { sparks, tipsUnlocked, minigamesDone, trust } = saved;
  if (!Number.isInteger(sparks) || sparks < 0) throw new Error('Chispas inválidas');
  if (!isIdList(tipsUnlocked) || !isIdList(minigamesDone)) throw new Error('Listas inválidas');
  if (typeof trust !== 'number' || trust < 0 || trust > 100) throw new Error('Confianza inválida');
  const zonesPresented = isIdList(saved.zonesPresented) ? [...new Set(saved.zonesPresented)] : [];
  const sparksCollected = isIdList(saved.sparksCollected) ? [...new Set(saved.sparksCollected)] : [];
  return { sparks, tipsUnlocked: [...tipsUnlocked], minigamesDone: [...minigamesDone], zonesPresented, sparksCollected, trust };
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
    this.world3d = newWorld3dState();
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

  // --- Presentación de zonas (D62) ---

  /** Marca la presentación de PIX de una zona como vista (sin duplicados) y guarda. */
  async markZonePresented(zoneId) {
    if (typeof zoneId !== 'string' || !zoneId) return { ok: false, warn: false };
    if (!this.world3d.zonesPresented.includes(zoneId)) this.world3d.zonesPresented.push(zoneId);
    return this.saveNow();
  }

  // --- Chispas y consejos (T037, D48) ---

  /**
   * Recoge una chispa. Cada `sparkId` cuenta una vez por partida. Cada SPARKS_PER_TIP chispas
   * recogidas en total (las perdidas no restan al contador) se desbloquea el siguiente consejo.
   * @returns {Promise<{ ok: true, sparks: number, tipUnlocked: number | null, duplicate: boolean } | { ok: false, reason: string }>}
   */
  async collectSpark(sparkId) {
    if (typeof sparkId !== 'string' || !sparkId || sparkId.length > 80) return { ok: false, reason: 'invalidSpark' };
    const w = this.world3d;
    if (w.sparksCollected.includes(sparkId)) return { ok: true, sparks: w.sparks, tipUnlocked: null, duplicate: true };
    w.sparksCollected.push(sparkId);
    w.sparks += 1;
    let tipUnlocked = null;
    if (Math.floor(w.sparksCollected.length / SPARKS_PER_TIP) > w.tipsUnlocked.length) {
      tipUnlocked = w.tipsUnlocked.length;
      w.tipsUnlocked.push(`tip-${tipUnlocked}`);
    }
    await this.saveNow();
    return { ok: true, sparks: w.sparks, tipUnlocked, duplicate: false };
  }

  /**
   * Un fallo cuesta el 25 % de las chispas actuales, redondeado hacia abajo (con 1 a 3 chispas
   * no se pierde ninguna). Nunca quita consejos, piezas ni zonas.
   * @param {'fall' | 'enemy'} reason
   * @returns {Promise<{ ok: true, sparks: number, lost: number } | { ok: false, reason: string }>}
   */
  async registerFailure(reason) {
    if (reason !== 'fall' && reason !== 'enemy') return { ok: false, reason: 'invalidReason' };
    const lost = Math.floor((this.world3d.sparks * FAIL_LOSS_PERCENT) / 100);
    this.world3d.sparks -= lost;
    if (lost > 0) await this.saveNow();
    return { ok: true, sparks: this.world3d.sparks, lost };
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
      world3d: readWorld3dState(this.world3d),
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
    const world3d = readWorld3dState(data.world3d);
    return { inventory, worlds, gates, playerContext, world3d, resume };
  }
}
