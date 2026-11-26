// Flujo de una zona de decisión (006, T021), a partir de gate-flow.js: entrar, inspeccionar la ficha
// de una opción, anotar un minijuego, recomendar, aprobar, cambiar y explicar "Otra".
//
// REGLA DE ORO (006/FR-015, FR-043): ningún evento del mundo 3D aprueba nada. Los eventos solo
// informan (`chosenForApproval` abre la tarjeta; `minigameFinished` anota). La ÚNICA llamada a
// `inventory.approve` de este archivo está en `commit`, a la que solo llegan `approveZoneChoice`
// (botón "Aprobar" de la tarjeta) y `changeZoneChoice` (el mismo botón, sobre una pieza ya aprobada).
// La IA nunca decide: en "Recomiéndame" solo redacta el porqué de una opción que ya calculó el
// contenido, y sus fallos vuelven como motivo, nunca como excepción.
//
// ---------------------------------------------------------------------------------------------
// FORMA DEL CONTENIDO DE UNA ZONA (la que debe seguir `src/content/world-1/zone-*.js`)
//
// `zoneContent` es un objeto `{ [zoneId]: ZoneContent }`. El `zoneId` es el id de la pieza que
// decide la zona y el de su puerta del dominio (`incomeSource`, `niche`, `audience`,
// `timeAvailable`, `goal90Days`).
//
// @typedef {object} ZoneContent
// @property {string} zoneId              Igual a la clave y al id de la pieza.
// @property {string} question            Pregunta oficial de la fase, para el jugador.
// @property {string} instruction         Tarea para la IA ("Elige la fuente de ingreso inicial...").
// @property {string|null} [nextZoneId]   Zona cuyo puente se abre al aprobar esta (006/FR-012).
// @property {string} [introTextId]       Texto de PIX al entrar (`say { textId }`); si falta, PIX calla.
// @property {string[]} [extrasWanted]    Extras que pide la pieza (por ejemplo `['publicLabel']`).
// @property {SheetField[]} sheetFields   Campos de la ficha, en orden: qué es, cómo entra el dinero...
// @property {Criterion[]} criteria       Criterios visibles de la fase para comparar (FR-045).
// @property {ZoneOption[]} options       La lista explícita de la factoría (FR-044), sin "Otra" ni "Recomiéndame".
// @property {{ question?: PlayedQuestion }} [recommendation]
//
// @typedef {{ id: string, label: string }} SheetField        Ej.: { id: 'what', label: 'Qué es' }.
//
// @typedef {object} Criterion
// @property {string} id
// @property {string} label               Columna de la tabla: "Rapidez para empezar".
// @property {'high'|'low'} better        Qué nivel es mejor: 'high' (más es mejor) o 'low' (menos es mejor,
//                                        como "Audiencia que pide" o "Esfuerzo").
// @property {string} [strength]          Frase para el porqué cuando la opción es buena aquí:
//                                        "se puede empezar pronto". Si falta, se usa `label`.
//
// @typedef {object} ZoneOption
// @property {string} id                  Ej.: 'ugc'. Es el `optionId` de los eventos.
// @property {string} text                Nombre de la opción. Es EXACTAMENTE lo que se guarda en la pieza.
// @property {{ fields: Record<string,string>, examples: string[] }} sheet
//                                        `fields` usa los ids de `sheetFields`; `examples` son dos (D52).
// @property {{ lessonId: string }} [minigame]  Si tiene minijuego (informativo para la aplicación).
// @property {Record<string, 'low'|'medium'|'high'>} ratings  Nivel de la opción en cada criterio.
// @property {Record<string,string>} [extras]  Extras que se guardan con la pieza.
//
// @typedef {object} PlayedQuestion       La única pregunta jugada de "Recomiéndame" (FR-045).
// @property {string} id
// @property {string} prompt
// @property {{ id: string, label: string, focus?: string[] }[]} answers
//        `focus`: ids de criterios que cuentan al elegir esa respuesta; si falta, cuentan todos.
//
// CÓMO RECOMIENDA (sin pesos ocultos): cada criterio da 0, 1 o 2 puntos a una opción según su nivel
// ('low' 0, 'medium' 1, 'high' 2; al revés si `better` es 'low'). La puntuación es la SUMA de los
// criterios que cuentan, todos con el mismo valor. La respuesta de la pregunta jugada solo elige
// cuáles cuentan (`focus`). Gana la mayor; a igualdad, la primera del contenido. Solo se pregunta
// cuando hay empate en lo más alto y el contenido trae la pregunta.
// ---------------------------------------------------------------------------------------------

import { validateContent, PIECE_ORIGIN, PIECE_STATUS } from '../domain/piece.js';
import { AI_MODES, AI_REASONS } from './ports.js';
import { WORLD3D_EVENTS, WORLD3D_COMMANDS } from './events.js';
import { validateExtras } from './gate-flow.js';

const LEVEL_POINTS = Object.freeze({ low: 0, medium: 1, high: 2 });
const LEVEL_WORDS = Object.freeze({ low: 'baja', medium: 'media', high: 'alta' });
const MAX_POINTS = 2;
const REASON_MAX = 400;
const MAX_EXAMPLES = 2;
const FIELD_MAX = 300;
const TRUST_MIN = 0;
const TRUST_MAX = 100;

/** Tareas de la IA que además existen en modo guía (adaptadores/ai/guide.js). */
export const ZONE_GUIDE_KINDS = Object.freeze({ OTHER_SHEET: 'otherSheet', RECOMMEND_REASON: 'recommendReason' });

// --- Cálculo puro de la recomendación ---

/** Puntos (0 a 2) de un nivel en un criterio. Un nivel que falte cuenta como medio. */
export function pointsFor(better, level) {
  const base = LEVEL_POINTS[level] ?? 1;
  return better === 'low' ? MAX_POINTS - base : base;
}

/**
 * Puntuación visible de cada opción. `focus` limita los criterios que cuentan (o null: todos).
 * @returns {{ optionId: string, score: number, points: Record<string, number> }[]}
 */
export function scoreOptions(zone, focus = null) {
  const counted = zone.criteria.filter((c) => !focus || focus.includes(c.id));
  return zone.options.map((option) => {
    const points = {};
    for (const criterion of counted) points[criterion.id] = pointsFor(criterion.better, option.ratings?.[criterion.id]);
    return { optionId: option.id, score: Object.values(points).reduce((a, b) => a + b, 0), points };
  });
}

function joinSpanish(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;
}

/** Porqué construido solo con los criterios del contenido: sirve de borrador y de respaldo sin IA. */
export function draftReason(zone, row, answer = null) {
  const option = zone.options.find((o) => o.id === row.optionId);
  const best = zone.criteria.filter((c) => row.points[c.id] === MAX_POINTS);
  const chosen = best.length > 0 ? best : zone.criteria.filter((c) => c.id in row.points).sort((a, b) => row.points[b.id] - row.points[a.id]).slice(0, 1);
  const strengths = chosen.slice(0, 3).map((c) => c.strength ?? c.label.toLocaleLowerCase('es'));
  const lead = answer ? `Como dijiste «${answer.label}», ` : '';
  const text = strengths.length > 0
    ? `${lead}«${option.text}» encaja mejor porque ${joinSpanish(strengths)}. Es una orientación: puedes elegir cualquier otra.`
    : `${lead}«${option.text}» es la que mejor encaja con lo que contaste. Es una orientación: puedes elegir cualquier otra.`;
  const capital = text.charAt(0).toLocaleUpperCase('es') + text.slice(1);
  return capital.length > REASON_MAX ? `${capital.slice(0, REASON_MAX - 1)}…` : capital;
}

// --- Ficha de "Otra" ---

function cleanSheet(sheet, zone) {
  const fields = {};
  for (const { id } of zone.sheetFields) {
    const value = sheet?.fields?.[id];
    if (typeof value === 'string' && value.trim() && value.trim().length <= FIELD_MAX) fields[id] = value.trim();
  }
  const examples = (Array.isArray(sheet?.examples) ? sheet.examples : [])
    .filter((e) => typeof e === 'string' && e.trim() && e.trim().length <= FIELD_MAX)
    .map((e) => e.trim())
    .slice(0, MAX_EXAMPLES);
  return { fields, examples };
}

function withMissing(sheet, zone) {
  return { ...sheet, missing: zone.sheetFields.filter(({ id }) => !(id in sheet.fields)).map(({ label }) => label) };
}

function fallbackSheet(zone) {
  return withMissing({ fields: {}, examples: [] }, zone);
}

/**
 * @param {object} deps
 * @param {import('./game-session.js').GameSession} deps.session
 * @param {Record<string, ZoneContent>} deps.zoneContent Contenido de cada zona (forma al inicio de este archivo).
 * @param {ReturnType<import('./events.js').createEventBus>} deps.events
 * @param {boolean} [deps.autoBind] Si es true (por defecto), escucha los eventos del mundo 3D
 *   (`zoneEntered`, `optionInspected`, `minigameFinished`, `recommendationAsked`). La presentación
 *   solo emite eventos; los métodos de abajo son lo que esos eventos invocan y lo que llaman las pantallas.
 */
export function createZoneFlow({ session, zoneContent, events, autoBind = true }) {
  /** @type {Map<string, AbortController>} Una llamada a la IA en curso por zona y tarea. */
  const inFlight = new Map();
  const unsubscribe = [];

  function lookup(zoneId) {
    const zone = zoneContent[zoneId];
    const gate = session.gates.get(zoneId);
    return zone && gate ? { zone, gate } : null;
  }

  function controllerFor(key) {
    inFlight.get(key)?.abort();
    const controller = new AbortController();
    inFlight.set(key, controller);
    return controller;
  }

  function finish(key, controller) {
    if (inFlight.get(key) === controller) inFlight.delete(key);
  }

  function abortZone(zoneId) {
    for (const key of [...inFlight.keys()]) {
      if (key.startsWith(`${zoneId}:`)) { inFlight.get(key).abort(); inFlight.delete(key); }
    }
  }

  function currentOf(zone, gate) {
    const piece = session.inventory.get(gate.pieceId);
    if (piece.status === PIECE_STATUS.PENDING || piece.content === null) return { piece, text: null, optionId: null };
    return { piece, text: piece.content, optionId: zone.options.find((o) => o.text === piece.content)?.id ?? null };
  }

  function approvedPiecesFor(gate) {
    const result = {};
    for (const piece of session.inventory.piecesOfWorld(gate.worldId)) {
      if (piece.id !== gate.pieceId && piece.content !== null && piece.status !== PIECE_STATUS.PENDING) result[piece.id] = piece.content;
    }
    return result;
  }

  function aiCan(operation) {
    return session.aiMode !== AI_MODES.GUIDE && typeof session.ai?.[operation] === 'function';
  }

  /** Llama a una operación opcional de la IA sin lanzar ni reintentar. */
  async function callAi(operation, request, key) {
    const controller = controllerFor(key);
    let result;
    try {
      result = await session.ai[operation](request, { signal: controller.signal });
    } catch {
      result = { ok: false, reason: AI_REASONS.FAILED };
    }
    finish(key, controller);
    if (controller.signal.aborted) return { ok: false, reason: AI_REASONS.CANCELLED };
    return result ?? { ok: false, reason: AI_REASONS.FAILED };
  }

  /** Si la IA directa no está disponible, el resto de la partida sigue en modo guía (005/FR-006). */
  function noteUnavailable(result) {
    if (result.reason === AI_REASONS.UNAVAILABLE && session.aiMode !== AI_MODES.GUIDE) {
      session.aiMode = AI_MODES.GUIDE;
      return true;
    }
    return false;
  }

  function zoneState(zone, gate) {
    const { piece, text, optionId } = currentOf(zone, gate);
    return {
      zoneId: zone.zoneId,
      question: zone.question,
      status: piece.status,
      currentOptionId: optionId,
      currentText: text,
      mode: session.aiMode,
      options: zone.options.map((o) => ({
        id: o.id,
        text: o.text,
        isCurrent: o.id === optionId,
        minigameDone: session.world3d.minigamesDone.includes(`${zone.zoneId}:${o.id}`),
      })),
      criteria: zone.criteria.map(({ id, label, better }) => ({ id, label, better })),
      table: zone.options.map((o) => ({ optionId: o.id, text: o.text, cells: { ...o.ratings } })),
    };
  }

  function say(textId, vars = {}) {
    events.emit(WORLD3D_COMMANDS.SAY, { textId, vars });
  }

  /** Aprueba la pieza de la zona. Único lugar donde se llama a `inventory.approve`. */
  async function commit(zoneId, choice, { change }) {
    const found = lookup(zoneId);
    if (!found) return { ok: false, reason: 'unknownZone' };
    const { zone, gate } = found;

    const hasOption = typeof choice?.optionId === 'string';
    const hasOwn = choice?.ownText !== undefined && choice?.ownText !== null;
    if (hasOption === hasOwn) return { ok: false, reason: 'invalidChoice' };

    let text;
    let origin;
    let extras;
    let optionId = null;
    if (hasOption) {
      const option = zone.options.find((o) => o.id === choice.optionId);
      if (!option) return { ok: false, reason: 'unknownOption' };
      text = option.text;
      origin = PIECE_ORIGIN.CATALOG;
      extras = { ...(option.extras ?? {}) };
      optionId = option.id;
    } else {
      const check = validateContent(choice.ownText);
      if (!check.ok) return { ok: false, reason: check.reason };
      text = choice.ownText;
      origin = PIECE_ORIGIN.PLAYER;
      extras = validateExtras(choice.extras, zone.extrasWanted ?? []);
      if (extras === null) return { ok: false, reason: 'invalidExtras' };
    }

    const { piece } = currentOf(zone, gate);
    const hasContent = piece.content !== null && piece.status !== PIECE_STATUS.PENDING;
    if (change) {
      if (!hasContent) return { ok: false, reason: 'notApproved' };
      if (piece.content === text) return { ok: false, reason: 'sameChoice' };
    } else if (piece.status === PIECE_STATUS.APPROVED && piece.content !== text) {
      return { ok: false, reason: 'useChange' };
    }

    abortZone(zoneId);
    const wasResolved = gate.status === 'resolved';
    const { contentChanged, markedForReview } = session.inventory.approve(gate.pieceId, {
      content: text, origin, extras, now: session.now(),
    });
    if (contentChanged) {
      const affected = new Set([gate.worldId, ...markedForReview.map((id) => session.inventory.get(id).worldId)]);
      for (const worldId of affected) session.worlds.get(worldId)?.onPieceChanged();
    }
    gate.resolve();
    session.setResume({ worldId: gate.worldId, screen: 'level', gateId: zoneId });
    events.emit(WORLD3D_COMMANDS.LIGHT_ZONE, { zoneId });
    events.emit(WORLD3D_COMMANDS.SET_CHOSEN, { zoneId, optionId });
    if (!wasResolved && zone.nextZoneId) events.emit(WORLD3D_COMMANDS.OPEN_BRIDGE, { zoneId: zone.nextZoneId });
    const save = await session.saveNow();
    return { ok: true, contentChanged, markedForReview, save };
  }

  const flow = {
    /** El personaje entró en la zona (zoneEntered): estado para la pantalla y punto de retorno. */
    enterZone(zoneId) {
      const found = lookup(zoneId);
      if (!found) return { ok: false, reason: 'unknownZone' };
      session.setResume({ worldId: found.gate.worldId, screen: 'level', gateId: zoneId });
      if (found.zone.introTextId) say(found.zone.introTextId);
      return { ok: true, zone: zoneState(found.zone, found.gate) };
    },

    /** El jugador abrió la ficha de una opción (optionInspected). No guarda ni aprueba. */
    inspectOption(zoneId, optionId) {
      const found = lookup(zoneId);
      if (!found) return { ok: false, reason: 'unknownZone' };
      const option = found.zone.options.find((o) => o.id === optionId);
      if (!option) return { ok: false, reason: 'unknownOption' };
      const current = currentOf(found.zone, found.gate);
      const isCurrent = current.optionId === option.id;
      return {
        ok: true,
        option: {
          id: option.id,
          text: option.text,
          sheet: { fields: { ...option.sheet.fields }, examples: [...option.sheet.examples] },
          minigame: option.minigame ? { ...option.minigame } : null,
          minigameDone: session.world3d.minigamesDone.includes(`${zoneId}:${option.id}`),
        },
        sheetFields: found.zone.sheetFields.map((f) => ({ ...f })),
        isCurrent,
        canChange: current.text !== null && !isCurrent,
      };
    },

    /**
     * Terminó un minijuego (minigameFinished). Lo anota y ajusta la confianza entre 0 y 100.
     * NO aprueba (006/FR-043). Repetirlo no duplica la anotación.
     */
    async recordMinigame(zoneId, optionId, { lessonId, trustDelta } = {}) {
      const found = lookup(zoneId);
      if (!found) return { ok: false, reason: 'unknownZone' };
      if (!found.zone.options.some((o) => o.id === optionId)) return { ok: false, reason: 'unknownOption' };
      if (typeof lessonId !== 'string' || lessonId.length === 0 || lessonId.length > 80) return { ok: false, reason: 'invalidResult' };
      if (typeof trustDelta !== 'number' || !Number.isFinite(trustDelta)) return { ok: false, reason: 'invalidResult' };
      const key = `${zoneId}:${optionId}`;
      const firstTime = !session.world3d.minigamesDone.includes(key);
      if (firstTime) session.world3d.minigamesDone.push(key);
      session.world3d.trust = Math.min(TRUST_MAX, Math.max(TRUST_MIN, session.world3d.trust + trustDelta));
      const save = await session.saveNow();
      return { ok: true, firstTime, trust: session.world3d.trust, save };
    },

    /**
     * "No sé, recomiéndame" (recommendationAsked). Los criterios del contenido deciden la opción;
     * la IA solo redacta el porqué y, si falla o no está, el porqué sale de los criterios.
     * No aprueba nada. Una sola llamada a la IA, sin reintentos.
     * @param {string} zoneId
     * @param {Record<string, string>} [answers] `{ [questionId]: answerId }` de la pregunta jugada.
     * @returns {Promise<
     *   { ok: true, needsQuestion: true, question: object, comparison: object[] }
     *   | { ok: true, optionId: string, reason: string, fromFallback: boolean, comparison: object[], explanationFailed?: string, switchedToGuide?: true }
     *   | { ok: false, reason: string }>}
     */
    async recommendOption(zoneId, answers = {}) {
      const found = lookup(zoneId);
      if (!found) return { ok: false, reason: 'unknownZone' };
      const { zone, gate } = found;
      if (zone.options.length === 0) return { ok: false, reason: 'noOptions' };

      const question = zone.recommendation?.question ?? null;
      const given = question ? answers?.[question.id] : undefined;
      let answer = null;
      let focus = null;
      if (question && given !== undefined && given !== null) {
        answer = question.answers.find((a) => a.id === given) ?? null;
        if (!answer) return { ok: false, reason: 'unknownAnswer' };
        const known = (answer.focus ?? []).filter((id) => zone.criteria.some((c) => c.id === id));
        focus = known.length > 0 ? known : null;
      }

      const rows = scoreOptions(zone, focus);
      const top = Math.max(...rows.map((r) => r.score));
      const leaders = rows.filter((r) => r.score === top);
      const comparison = rows.map((r) => ({ ...r, points: { ...r.points } }));
      if (leaders.length > 1 && question && !answer) {
        return {
          ok: true,
          needsQuestion: true,
          question: { id: question.id, prompt: question.prompt, answers: question.answers.map(({ id, label }) => ({ id, label })) },
          comparison,
        };
      }

      const winner = leaders[0];
      const option = zone.options.find((o) => o.id === winner.optionId);
      const draft = draftReason(zone, winner, answer);
      events.emit(WORLD3D_COMMANDS.MARK_RECOMMENDED, { zoneId, optionId: option.id });

      const result = { ok: true, optionId: option.id, reason: draft, fromFallback: true, comparison };
      if (!aiCan('explainRecommendation')) return result;

      const request = {
        zoneId,
        instruction: zone.instruction,
        recommended: { id: option.id, text: option.text },
        options: zone.options.map((o) => ({
          id: o.id,
          text: o.text,
          levels: zone.criteria.map((c) => ({ criterion: c.label, level: LEVEL_WORDS[o.ratings?.[c.id]] ?? LEVEL_WORDS.medium })),
        })),
        answers: answer ? [{ question: question.prompt, answer: answer.label }] : [],
        draftReason: draft,
        approvedPieces: approvedPiecesFor(gate),
        playerContext: { interests: [...session.playerContext.interests] },
      };
      const explained = await callAi('explainRecommendation', request, `${zoneId}:recommend`);
      if (explained.ok && typeof explained.reason === 'string' && explained.reason.trim()) {
        return { ...result, reason: explained.reason.trim(), fromFallback: false };
      }
      const switchedToGuide = noteUnavailable(explained);
      return { ...result, explanationFailed: explained.reason ?? AI_REASONS.FAILED, ...(switchedToGuide ? { switchedToGuide: true } : {}) };
    },

    /**
     * Aprueba la elección de la zona (el botón "Aprobar" de la tarjeta). Es la única vía para fijar
     * la pieza. `choice` es `{ optionId }` o `{ ownText, extras? }` (nunca los dos).
     * Si la pieza ya está aprobada con otra cosa, hay que usar `changeZoneChoice`.
     * Razones de fallo: unknownZone, invalidChoice, unknownOption, tooShort, tooLong, invalidExtras, useChange.
     */
    approveZoneChoice(zoneId, choice) {
      return commit(zoneId, choice, { change: false });
    },

    /**
     * Cambia una elección ya aprobada ("Cambiar a esta"): aprueba la otra opción, y lo que dependía de
     * la pieza queda "por revisar" sin borrarse (006/FR-046, D52). Razones: notApproved, sameChoice y
     * las de `approveZoneChoice`.
     */
    changeZoneChoice(zoneId, choice) {
      return commit(zoneId, choice, { change: true });
    },

    /**
     * "Otra": arma la ficha del texto del jugador (006/FR-044). No aprueba. Si la IA no puede (o es
     * modo guía), la ficha de respaldo dice qué datos faltan. En modo guía devuelve además
     * `guide: { kind, request }` para que la pantalla arme la pregunta con `ai.guidePrompt(kind, request)`
     * y lea lo pegado con `readOtherGuideAnswer`.
     * @returns {Promise<{ ok: true, sheet: { fields: object, examples: string[], missing: string[] }, fromFallback: boolean, reason?: string, guide?: object, switchedToGuide?: true } | { ok: false, reason: string }>}
     */
    async explainOtherOption(zoneId, text) {
      const found = lookup(zoneId);
      if (!found) return { ok: false, reason: 'unknownZone' };
      const check = validateContent(text);
      if (!check.ok) return { ok: false, reason: check.reason };
      const { zone } = found;
      const request = buildOtherRequest(found, text);
      const fallback = { ok: true, sheet: fallbackSheet(zone), fromFallback: true };

      if (session.aiMode === AI_MODES.GUIDE) {
        return { ...fallback, guide: { kind: ZONE_GUIDE_KINDS.OTHER_SHEET, request } };
      }
      if (!aiCan('explainOther')) return fallback;

      const result = await callAi('explainOther', request, `${zoneId}:other`);
      if (result.ok) {
        const sheet = cleanSheet(result.sheet, zone);
        if (Object.keys(sheet.fields).length > 0) return { ok: true, sheet: withMissing(sheet, zone), fromFallback: false };
        return { ...fallback, reason: AI_REASONS.BAD_ANSWER };
      }
      if (result.reason === AI_REASONS.CANCELLED) return { ok: false, reason: AI_REASONS.CANCELLED };
      const switchedToGuide = noteUnavailable(result);
      return { ...fallback, reason: result.reason, ...(switchedToGuide ? { switchedToGuide: true } : {}) };
    },

    /** Lee la ficha de "Otra" que el jugador pegó del modo guía. */
    readOtherGuideAnswer(zoneId, text, rawText) {
      const found = lookup(zoneId);
      if (!found) return { ok: false, reason: 'unknownZone' };
      const check = validateContent(text);
      if (!check.ok) return { ok: false, reason: check.reason };
      const bad = { ok: false, reason: AI_REASONS.BAD_ANSWER };
      if (typeof session.ai?.readGuideAnswer !== 'function') return bad;
      let result;
      try {
        result = session.ai.readGuideAnswer(ZONE_GUIDE_KINDS.OTHER_SHEET, buildOtherRequest(found, text), rawText);
      } catch {
        return bad;
      }
      if (!result?.ok) return bad;
      const sheet = cleanSheet(result.sheet, found.zone);
      if (Object.keys(sheet.fields).length === 0) return bad;
      return { ok: true, sheet: withMissing(sheet, found.zone), fromFallback: false };
    },

    /**
     * Tras cargar una partida: repite hacia el mundo lo ya aprobado (zonas encendidas, opción elegida,
     * puentes abiertos) para que el mundo se vea como se dejó. No cambia ninguna pieza.
     */
    restoreWorld() {
      let restored = 0;
      for (const zone of Object.values(zoneContent)) {
        const found = lookup(zone.zoneId);
        if (!found) continue;
        const { optionId, text } = currentOf(zone, found.gate);
        if (text === null) continue;
        events.emit(WORLD3D_COMMANDS.LIGHT_ZONE, { zoneId: zone.zoneId });
        events.emit(WORLD3D_COMMANDS.SET_CHOSEN, { zoneId: zone.zoneId, optionId });
        if (zone.nextZoneId) events.emit(WORLD3D_COMMANDS.OPEN_BRIDGE, { zoneId: zone.nextZoneId });
        restored += 1;
      }
      return { restored };
    },

    /** Deja de escuchar los eventos y cancela lo que esté en curso. */
    dispose() {
      for (const off of unsubscribe.splice(0)) off();
      for (const controller of inFlight.values()) controller.abort();
      inFlight.clear();
    },
  };

  function buildOtherRequest({ zone, gate }, text) {
    const reference = zone.options[0];
    return {
      zoneId: zone.zoneId,
      instruction: zone.instruction,
      text,
      sheetFields: zone.sheetFields.map((f) => ({ ...f })),
      referenceOption: reference ? { text: reference.text, fields: { ...reference.sheet.fields } } : null,
      approvedPieces: approvedPiecesFor(gate),
      playerContext: { interests: [...session.playerContext.interests] },
    };
  }

  if (autoBind) {
    // Un error en un manejador nunca debe llegar al motor: los métodos ya devuelven sus fallos.
    const safe = (fn) => (data) => {
      try {
        Promise.resolve(fn(data ?? {})).catch(() => {});
      } catch {
        // Se ignora: el evento llegó con datos mal formados.
      }
    };
    unsubscribe.push(
      events.on(WORLD3D_EVENTS.ZONE_ENTERED, safe(({ zoneId }) => flow.enterZone(zoneId))),
      events.on(WORLD3D_EVENTS.OPTION_INSPECTED, safe(({ zoneId, optionId }) => flow.inspectOption(zoneId, optionId))),
      events.on(WORLD3D_EVENTS.MINIGAME_FINISHED, safe(({ zoneId, optionId, lessonId, trustDelta }) => flow.recordMinigame(zoneId, optionId, { lessonId, trustDelta }))),
      events.on(WORLD3D_EVENTS.RECOMMENDATION_ASKED, safe(({ zoneId, answers }) => flow.recommendOption(zoneId, answers))),
    );
  }

  return flow;
}
