// Modo guía (T085, D37, D38): arma la pregunta para copiar y lee la respuesta pegada.
// No llama a ninguna IA. Usa las mismas instrucciones y la misma validación que la IA directa,
// así que la respuesta llega a la aplicación con la misma forma (005/FR-007, FR-008).
// Solo cubre las opciones de una puerta; la revisión del jefe llega con T088.

import { AI_REASONS, GUIDE_KINDS } from '../../application/ports.js';
import { buildOptionsPrompt } from './prompts.js';
import { extractJson, validateOptions } from './validate.js';

/**
 * @param {'options'|'review'} kind
 * @param {object} request
 * @returns {{ ok: true, text: string } | { ok: false, reason: 'failed' }}
 */
export function guidePrompt(kind, request) {
  try {
    if (kind === GUIDE_KINDS.OPTIONS) return { ok: true, text: buildOptionsPrompt(request, { forGuide: true }) };
  } catch {
    // Petición mal formada: se trata como fallo, sin lanzar.
  }
  return { ok: false, reason: AI_REASONS.FAILED };
}

/**
 * @param {'options'|'review'} kind
 * @param {object} request La misma petición con la que se armó la pregunta.
 * @param {unknown} rawText Lo que pegó el jugador.
 */
export function readGuideAnswer(kind, request, rawText) {
  const bad = { ok: false, reason: AI_REASONS.BAD_ANSWER };
  try {
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
