// Modo guía (T085, D37, D38): arma la pregunta para copiar y lee la respuesta pegada.
// No llama a ninguna IA. Usa las mismas instrucciones y la misma validación que la IA directa,
// así que la respuesta llega a la aplicación con la misma forma (005/FR-007, FR-008).
// Cubre las opciones de una puerta y, para las zonas (006, T022), la ficha de "Otra" ('otherSheet')
// y el porqué de una recomendación ('recommendReason'). La revisión del jefe llega con T088.

import { AI_REASONS, GUIDE_KINDS } from '../../application/ports.js';
import { buildOptionsPrompt, buildOtherSheetPrompt, buildRecommendReasonPrompt, ZONE_TASKS } from './prompts.js';
import { extractJson, validateOptions, validateOtherSheet, validateRecommendReason } from './validate.js';

/**
 * @param {'options'|'review'|'otherSheet'|'recommendReason'} kind
 * @param {object} request
 * @returns {{ ok: true, text: string } | { ok: false, reason: 'failed' }}
 */
export function guidePrompt(kind, request) {
  try {
    if (kind === GUIDE_KINDS.OPTIONS) return { ok: true, text: buildOptionsPrompt(request, { forGuide: true }) };
    if (kind === ZONE_TASKS.OTHER_SHEET) return { ok: true, text: buildOtherSheetPrompt(request, { forGuide: true }) };
    if (kind === ZONE_TASKS.RECOMMEND_REASON) return { ok: true, text: buildRecommendReasonPrompt(request, { forGuide: true }) };
  } catch {
    // Petición mal formada: se trata como fallo, sin lanzar.
  }
  return { ok: false, reason: AI_REASONS.FAILED };
}

/** Largo máximo de la respuesta pegada que se lee (B5). */
export const MAX_PASTED = 20000;

/**
 * @param {'options'|'review'} kind
 * @param {object} request La misma petición con la que se armó la pregunta.
 * @param {unknown} rawText Lo que pegó el jugador.
 */
export function readGuideAnswer(kind, request, rawTextIn) {
  const rawText = typeof rawTextIn === 'string' ? rawTextIn.slice(0, MAX_PASTED) : rawTextIn;
  const bad = { ok: false, reason: AI_REASONS.BAD_ANSWER };
  try {
    if (kind === ZONE_TASKS.OTHER_SHEET) {
      const sheet = validateOtherSheet(extractJson(rawText, 'object'), (request.sheetFields ?? []).map((f) => f.id));
      return sheet.ok ? sheet : bad;
    }
    if (kind === ZONE_TASKS.RECOMMEND_REASON) {
      const reason = validateRecommendReason(extractJson(rawText, 'object'));
      return reason.ok ? reason : bad;
    }
    if (kind !== GUIDE_KINDS.OPTIONS) return bad;
    const value = extractJson(rawText, 'array');
    if (value === null) return bad;
    const result = validateOptions(value, {
      exclude: request.exclude ?? [],
      extrasWanted: request.extrasWanted ?? [],
      fixedChoices: request.fixedChoices ?? null,
    });
    return result.ok ? result : bad;
  } catch {
    return bad;
  }
}
