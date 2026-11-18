// Validación de las respuestas de la IA (T038). Toda respuesta es no confiable (research R8):
// se comprueba su forma, se limpian caracteres de control y se descarta lo que no cumple
// (002/FR-043). Lo mismo vale para la IA directa y para la respuesta pegada en modo guía.

export const LIMITS = Object.freeze({
  optionText: 300,
  pros: 300,
  risks: 300,
  publicLabel: 40,
  publicLabelMin: 2,
  comment: 600,
  reason: 400,
  maxOptions: 3,
  maxRawOptions: 6,
});

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Texto plano limpio, o null si no es texto, queda vacío o excede el límite. */
export function cleanText(value, max) {
  if (typeof value !== 'string') return null;
  const text = value.replace(CONTROL_CHARS, '').replace(/[ \t]+/g, ' ').trim();
  if (!text || text.length > max) return null;
  return text;
}

function normalizeKey(text) {
  return text.toLocaleLowerCase('es').replace(/\s+/g, ' ').trim();
}

function isRecommended(value) {
  return value === true || value === 'true';
}

function cleanOption(item, { extrasWanted, fixedByKey }) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
  let text = cleanText(item.text, LIMITS.optionText);
  const pros = cleanText(item.pros, LIMITS.pros);
  const risks = cleanText(item.risks, LIMITS.risks);
  if (!text || !pros || !risks) return null;
  if (fixedByKey) {
    text = fixedByKey.get(normalizeKey(text)) ?? null;
    if (!text) return null;
  }
  const option = { text, pros, risks, recommended: isRecommended(item.recommended) };
  if (extrasWanted.includes('publicLabel')) {
    const label = cleanText(item.extras?.publicLabel ?? item.publicLabel, LIMITS.publicLabel);
    if (!label || label.length < LIMITS.publicLabelMin) return null;
    option.extras = { publicLabel: label };
  }
  return option;
}

/**
 * Valida una lista de opciones (contracts/puertos.md, `proposeOptions`).
 * Quita las inválidas, repetidas o ya mostradas; exige exactamente una recomendada entre
 * las que quedan, y devuelve como máximo tres, conservando la recomendada.
 * @param {unknown} value
 * @param {{ exclude?: string[], extrasWanted?: string[], fixedChoices?: { values: string[] } | null }} [rules]
 * @returns {{ ok: true, options: object[] } | { ok: false }}
 */
export function validateOptions(value, { exclude = [], extrasWanted = [], fixedChoices = null } = {}) {
  if (!Array.isArray(value) || value.length === 0 || value.length > LIMITS.maxRawOptions) return { ok: false };
  const fixedByKey = fixedChoices?.values?.length
    ? new Map(fixedChoices.values.map((v) => [normalizeKey(v), v]))
    : null;
  const seen = new Set(exclude.map(normalizeKey));
  const options = [];
  for (const item of value) {
    const option = cleanOption(item, { extrasWanted, fixedByKey });
    if (!option) continue;
    const key = normalizeKey(option.text);
    if (seen.has(key)) continue;
    seen.add(key);
    options.push(option);
  }
  const recommended = options.filter((o) => o.recommended);
  if (recommended.length !== 1) return { ok: false };
  const others = options.filter((o) => !o.recommended).slice(0, LIMITS.maxOptions - 1);
  const kept = options.filter((o) => o.recommended || others.includes(o));
  return { ok: true, options: kept };
}

/** Valida la recomendación (`recommend`). */
export function validateRecommendation(value, optionCount) {
  const index = Number.isInteger(value?.index) ? value.index : Number.NaN;
  const reason = cleanText(value?.reason, LIMITS.reason);
  if (!(index >= 0 && index < optionCount) || !reason) return { ok: false };
  return { ok: true, index, reason };
}

/** Valida el comentario a una respuesta escrita (`commentOnAnswer`). Sin comentario es válido. */
export function validateComment(value) {
  if (value?.comment === null || value?.comment === undefined || value?.comment === '') return { ok: true, comment: null };
  const comment = cleanText(value.comment, LIMITS.comment);
  return comment ? { ok: true, comment } : { ok: false };
}

/**
 * Extrae el primer bloque JSON de un texto: tolera texto alrededor, marcas de código y
 * comillas tipográficas. Devuelve null si no hay un bloque legible.
 * @param {unknown} text
 * @param {'array'|'object'} kind
 */
export function extractJson(text, kind) {
  if (typeof text !== 'string') return null;
  const normalized = text
    .replace(/[“”„‟″«»]/g, '"')
    .replace(/[‘’‚‛′]/g, "'")
    .replace(/```(?:json)?/gi, '');
  const [open, close] = kind === 'array' ? ['[', ']'] : ['{', '}'];
  const start = normalized.indexOf(open);
  const end = normalized.lastIndexOf(close);
  if (start < 0 || end <= start) return null;
  try {
    const value = JSON.parse(normalized.slice(start, end + 1));
    if (kind === 'array' ? !Array.isArray(value) : (value === null || typeof value !== 'object' || Array.isArray(value))) return null;
    return value;
  } catch {
    return null;
  }
}
