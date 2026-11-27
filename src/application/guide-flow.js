// Flujo del modo guía (T086, D37, D38): la pregunta para copiar y la respuesta pegada.
// La partida se guarda antes de entregar la pregunta, con el punto de retorno en la puerta,
// porque en el teléfono la página se recarga al volver de otra app (005/FR-014, FR-016; T004b).

import { AI_REASONS, GUIDE_KINDS } from './ports.js';
import { buildOptionsRequest } from './gate-flow.js';

/**
 * @param {object} deps
 * @param {import('./game-session.js').GameSession} deps.session
 * @param {Record<string, object>} deps.gateContent
 */
export function createGuideFlow({ session, gateContent }) {
  return {
    /** Modo de IA de esta carga de la página (005/FR-006). */
    aiMode() {
      return session.aiMode;
    },

    /** true la primera vez: la pantalla explica por qué se usa el modo guía (005/US2, escenario 1). */
    takeGuideNotice() {
      if (session.playerContext.guideNoticeSeen) return false;
      session.playerContext.guideNoticeSeen = true;
      return true;
    },

    /** Pregunta para copiar. Guarda antes de devolverla. */
    async getGuidePrompt(gateId) {
      const gate = session.gates.get(gateId);
      if (!gate) throw new Error(`Puerta desconocida: ${gateId}`);
      const prompt = session.ai.guidePrompt?.(GUIDE_KINDS.OPTIONS, buildOptionsRequest(session, gateContent, gateId));
      if (!prompt?.ok) return { ok: false, reason: AI_REASONS.FAILED };
      session.setResume({ worldId: gate.worldId, screen: 'gate', gateId, awaitingGuideAnswer: true });
      const save = await session.saveNow();
      return { ok: true, text: prompt.text, save };
    },

    /** Lee la respuesta pegada y muestra sus opciones; nunca aprueba nada (005/FR-008, FR-009). */
    async submitGuideAnswer(gateId, rawText) {
      const gate = session.gates.get(gateId);
      if (!gate) throw new Error(`Puerta desconocida: ${gateId}`);
      const request = buildOptionsRequest(session, gateContent, gateId);
      const result = session.ai.readGuideAnswer?.(GUIDE_KINDS.OPTIONS, request, typeof rawText === 'string' ? rawText.slice(0, 20000) : rawText) ?? { ok: false, reason: AI_REASONS.BAD_ANSWER };
      if (!result.ok) return { ok: false, reason: AI_REASONS.BAD_ANSWER };
      const added = gate.addOptions(result.options, 'ai');
      if (added.length === 0) return { ok: false, reason: AI_REASONS.BAD_ANSWER };
      session.setResume({ worldId: gate.worldId, screen: 'gate', gateId, awaitingGuideAnswer: false });
      await session.saveNow();
      return { ok: true, options: added.map((o) => ({ ...o })) };
    },
  };
}
