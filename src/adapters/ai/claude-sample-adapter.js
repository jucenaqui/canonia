// IA directa con la capacidad `sample` del entorno de Claude (T040).
// Nivel rápido para opciones, comentario y recomendación; la revisión del jefe llega con T061.
// Nunca lanza: traduce cada fallo a { ok: false, reason } (contracts/puertos.md).
// "Pedir otras" no usa la memoria de respuestas, o devolvería las mismas (research R1).

import { AI_MODES, AI_REASONS } from '../../application/ports.js';
import { buildOptionsPrompt, buildCommentPrompt, buildRecommendPrompt, buildRecommendReasonPrompt, buildOtherSheetPrompt } from './prompts.js';
import { extractJson, validateOptions, validateRecommendation, validateComment, validateRecommendReason, validateOtherSheet } from './validate.js';
import { guidePrompt, readGuideAnswer } from './guide.js';

/** Traduce un error del entorno a un motivo del puerto. */
export function reasonOf(error, signal) {
  if (signal?.aborted || error?.name === 'AbortError' || error?.code === 'aborted') return AI_REASONS.CANCELLED;
  switch (error?.code) {
    case 'not_granted':
    case 'sampling_disabled':
    case 'unavailable':
      return AI_REASONS.UNAVAILABLE;
    case 'rate_limited':
      return AI_REASONS.BUSY;
    default:
      return AI_REASONS.FAILED;
  }
}

/**
 * @param {{ sample: Function }} deps La función `sample` que entrega `claude.use('sample')`.
 * @returns {import('../../application/ports.js').AiPort}
 */
export function createClaudeSampleAdapter({ sample }) {
  /** Pide texto a la IA y lo pasa por `read`. Cualquier fallo vuelve como motivo. */
  async function ask(prompt, read, { signal, fresh = false, tier = 'quick' } = {}) {
    try {
      if (signal?.aborted) return { ok: false, reason: AI_REASONS.CANCELLED };
      const answer = await sample(prompt, { modelTier: tier, cache: !fresh, signal });
      if (signal?.aborted) return { ok: false, reason: AI_REASONS.CANCELLED };
      const result = read(answer?.text);
      return result.ok ? result : { ok: false, reason: AI_REASONS.FAILED };
    } catch (error) {
      return { ok: false, reason: reasonOf(error, signal) };
    }
  }

  return {
    mode: AI_MODES.DIRECT,

    proposeOptions(request, { signal, fresh = false } = {}) {
      return ask(buildOptionsPrompt(request), (text) => validateOptions(extractJson(text, 'array'), {
        exclude: request.exclude ?? [],
        extrasWanted: request.extrasWanted ?? [],
        fixedChoices: request.fixedChoices ?? null,
      }), { signal, fresh: fresh || (request.exclude ?? []).length > 0 });
    },

    commentOnAnswer(request, { signal } = {}) {
      return ask(buildCommentPrompt(request), (text) => validateComment(extractJson(text, 'object')), { signal, fresh: true });
    },

    recommend(request, { signal } = {}) {
      const count = request.options?.length ?? 0;
      return ask(buildRecommendPrompt(request), (text) => validateRecommendation(extractJson(text, 'object'), count), { signal });
    },

    /** Redacta el porqué de una recomendación ya decidida por el juego (006, T022). Nivel rápido, sin memoria. */
    explainRecommendation(request, { signal } = {}) {
      return ask(buildRecommendReasonPrompt(request), (text) => validateRecommendReason(extractJson(text, 'object')), { signal, fresh: true });
    },

    /** Arma la ficha de una opción "Otra" escrita por el jugador (006, T022). */
    explainOther(request, { signal } = {}) {
      const fieldIds = (request.sheetFields ?? []).map((f) => f.id);
      return ask(buildOtherSheetPrompt(request), (text) => validateOtherSheet(extractJson(text, 'object'), fieldIds), { signal, fresh: true });
    },

    async reviewWorld() {
      return { ok: false, reason: AI_REASONS.FAILED }; // Revisión del jefe: T061.
    },

    guidePrompt,
    readGuideAnswer,
  };
}
