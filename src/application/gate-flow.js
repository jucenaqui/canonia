// Flujo de una puerta de decisión (T037): abrir, lección, opciones, recomendación, respuesta
// propia, aprobar y cerrar. Aprobar es la única forma de cambiar una pieza (002/FR-018) y solo
// la invoca el botón de aprobar. La IA nunca decide ni rompe: sus fallos vuelven como motivo.

import { validateContent, PIECE_ORIGIN } from '../domain/piece.js';
import { AI_MODES, AI_REASONS } from './ports.js';
import { APP_COMMANDS } from './events.js';

export const PUBLIC_LABEL_MIN = 2;
export const PUBLIC_LABEL_MAX = 40;

/**
 * Petición de opciones de una puerta (contracts/puertos.md, `proposeOptions`).
 * La comparten la IA directa y el modo guía.
 */
export function buildOptionsRequest(session, gateContent, gateId) {
  const gate = session.gates.get(gateId);
  const content = gateContent[gateId];
  if (!gate || !content) throw new Error(`Puerta desconocida: ${gateId}`);
  const approvedPieces = {};
  for (const piece of session.inventory.piecesOfWorld(gate.worldId)) {
    if (piece.id !== gate.pieceId && piece.content !== null && piece.status !== 'pending') approvedPieces[piece.id] = piece.content;
  }
  return {
    gateId,
    instruction: content.instruction,
    approvedPieces,
    playerContext: { interests: [...session.playerContext.interests] },
    exclude: gate.shownTexts(),
    fixedChoices: content.fixedChoices?.values ? { values: [...content.fixedChoices.values] } : null,
    ...(content.extrasWanted ? { extrasWanted: [...content.extrasWanted] } : {}),
  };
}

export function validateExtras(extras, wanted) {
  const result = {};
  for (const [key, value] of Object.entries(extras ?? {})) {
    if (!wanted.includes(key)) continue;
    if (typeof value !== 'string') return null;
    if (key === 'publicLabel') {
      const label = value.trim();
      if (label.length < PUBLIC_LABEL_MIN || label.length > PUBLIC_LABEL_MAX) return null;
      result[key] = label;
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * @param {object} deps
 * @param {import('./game-session.js').GameSession} deps.session
 * @param {Record<string, object>} deps.gateContent Contenido de cada puerta: instrucción, opciones fijas, extras.
 * @param {ReturnType<import('./events.js').createEventBus>} deps.events
 */
export function createGateFlow({ session, gateContent, events }) {
  /** @type {Map<string, AbortController>} */
  const inFlight = new Map();

  function gateOf(gateId) {
    const gate = session.gates.get(gateId);
    if (!gate) throw new Error(`Puerta desconocida: ${gateId}`);
    return gate;
  }

  function controllerFor(gateId) {
    inFlight.get(gateId)?.abort();
    const controller = new AbortController();
    inFlight.set(gateId, controller);
    return controller;
  }

  function finish(gateId, controller) {
    if (inFlight.get(gateId) === controller) inFlight.delete(gateId);
  }

  return {
    /** Abre la puerta: estado para la pantalla. */
    openGate(gateId) {
      const gate = gateOf(gateId);
      session.setResume({ worldId: gate.worldId, screen: 'gate', gateId, awaitingGuideAnswer: session.resume?.gateId === gateId && session.resume.awaitingGuideAnswer });
      return {
        gateId,
        lessonSeen: gate.lessonSeen,
        resolved: gate.status === 'resolved',
        shownOptions: gate.shownOptions.map((o) => ({ ...o })),
        mode: session.aiMode,
      };
    },

    /** Mini lección completada o saltada (002/FR-002, FR-003). */
    completeLesson(gateId) {
      return { firstTime: gateOf(gateId).completeLesson() };
    },

    /**
     * Pide tres opciones nuevas, distintas de las ya mostradas (002/FR-004 a FR-011).
     * En modo guía no llama a la IA: devuelve `guide: true` para que la pantalla muestre el modo guía.
     */
    async requestOptions(gateId) {
      const gate = gateOf(gateId);
      const content = gateContent[gateId];

      // Opciones fijas ya explicadas: no hace falta la IA, en ningún modo.
      const explained = content?.fixedChoices?.explained;
      if (explained) {
        const added = gate.addOptions(explained, 'ai');
        const options = added.length > 0 ? added : gate.shownOptions.filter((o) => explained.some((e) => e.text === o.text));
        return { ok: true, options: options.map((o) => ({ ...o })) };
      }

      if (session.aiMode === AI_MODES.GUIDE) return { ok: false, reason: AI_REASONS.UNAVAILABLE, guide: true };

      const controller = controllerFor(gateId);
      const request = buildOptionsRequest(session, gateContent, gateId);
      const result = await session.ai.proposeOptions(request, { signal: controller.signal, fresh: request.exclude.length > 0 });
      finish(gateId, controller);
      if (controller.signal.aborted) return { ok: false, reason: AI_REASONS.CANCELLED };
      if (!result.ok) {
        if (result.reason === AI_REASONS.UNAVAILABLE && session.aiMode !== AI_MODES.GUIDE) {
          session.aiMode = AI_MODES.GUIDE; // 005/FR-006: hasta recargar.
          return { ok: false, reason: AI_REASONS.UNAVAILABLE, switchedToGuide: true };
        }
        return { ok: false, reason: result.reason };
      }
      const added = gate.addOptions(result.options, 'ai');
      if (added.length === 0) return { ok: false, reason: AI_REASONS.FAILED };
      return { ok: true, options: added.map((o) => ({ ...o })) };
    },

    /**
     * "No sé, recomiéndame" (002/FR-016). No aprueba nada (FR-017).
     * En modo guía destaca la opción que ya vino recomendada, con su ventaja como motivo (D38).
     */
    async askRecommendation(gateId, options) {
      gateOf(gateId);
      if (!Array.isArray(options) || options.length === 0) return { ok: false, reason: AI_REASONS.FAILED };
      const marked = options.findIndex((o) => o.recommended);
      if (session.aiMode === AI_MODES.GUIDE || options.length === 1) {
        const index = Math.max(0, marked);
        return { ok: true, index, reason: options[index].pros, fromAnswer: true };
      }
      const controller = controllerFor(gateId);
      const request = { ...buildOptionsRequest(session, gateContent, gateId), options: options.map(({ text, pros, risks }) => ({ text, pros, risks })) };
      const result = await session.ai.recommend(request, { signal: controller.signal });
      finish(gateId, controller);
      if (!result.ok) return { ok: false, reason: result.reason };
      return { ok: true, index: result.index, reason: result.reason };
    },

    /**
     * Respuesta escrita por el jugador (002/FR-013 a FR-015). El comentario de la IA nunca bloquea;
     * en modo guía no se pide (D38).
     */
    async submitOwnAnswer(gateId, text) {
      gateOf(gateId);
      const check = validateContent(text);
      if (!check.ok) return { ok: false, reason: check.reason };
      const option = { text, pros: '', risks: '', recommended: false, source: 'player' };
      if (session.aiMode === AI_MODES.GUIDE) return { ok: true, option, comment: null };
      const controller = controllerFor(gateId);
      const request = { ...buildOptionsRequest(session, gateContent, gateId), answer: text };
      const result = await session.ai.commentOnAnswer(request, { signal: controller.signal });
      finish(gateId, controller);
      return { ok: true, option, comment: result.ok ? result.comment : null };
    },

    /**
     * Aprueba la pieza de la puerta con el texto exacto del jugador (002/FR-018 a FR-024).
     * Repetir la acción no crea otra versión (FR-023). Guarda la partida (005/FR-014).
     */
    async approvePiece(gateId, { text, origin, extras = {} }) {
      const gate = gateOf(gateId);
      const check = validateContent(text);
      if (!check.ok) return { ok: false, reason: check.reason };
      if (!Object.values(PIECE_ORIGIN).includes(origin)) return { ok: false, reason: 'invalidOrigin' };
      const cleanExtras = validateExtras(extras, gateContent[gateId]?.extrasWanted ?? []);
      if (cleanExtras === null) return { ok: false, reason: 'invalidExtras' };

      inFlight.get(gateId)?.abort();
      const { contentChanged, markedForReview } = session.inventory.approve(gate.pieceId, {
        content: text, origin, extras: cleanExtras, now: session.now(),
      });
      if (contentChanged) {
        const affected = new Set([gate.worldId, ...markedForReview.map((id) => session.inventory.get(id).worldId)]);
        for (const worldId of affected) session.worlds.get(worldId)?.onPieceChanged();
      }
      gate.resolve();
      session.setResume({ worldId: gate.worldId, screen: 'level' });
      events.emit(APP_COMMANDS.SET_GATE_RESOLVED, { gateId });
      events.emit(APP_COMMANDS.RESUME_LEVEL, {});
      const save = await session.saveNow();
      return { ok: true, contentChanged, markedForReview, save };
    },

    /** Cierra la puerta sin aprobar: nada cambia y la puerta sigue sin resolver (002/FR-025). */
    closeGate(gateId) {
      const gate = gateOf(gateId);
      inFlight.get(gateId)?.abort();
      inFlight.delete(gateId);
      session.setResume({ worldId: gate.worldId, screen: 'level' });
      events.emit(APP_COMMANDS.RESUME_LEVEL, {});
    },
  };
}
