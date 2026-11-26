// Puertos de la capa de aplicación (T010).
// Contrato: specs/005-version-jugable-minima/contracts/puertos.md
// La aplicación programa contra estos puertos; los adaptadores los implementan.
// Este archivo no importa nada: solo define formas y constantes compartidas.

/** Modos de IA de la sesión (005/FR-006). */
export const AI_MODES = Object.freeze({
  DIRECT: 'direct',
  GUIDE: 'guide',
  DEMO: 'demo',
});

/** Motivos de error del puerto de IA. Nunca se lanzan: se devuelven. */
export const AI_REASONS = Object.freeze({
  UNAVAILABLE: 'unavailable',
  BUSY: 'busy',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  BAD_ANSWER: 'badAnswer',
});

/**
 * Operaciones del modo guía (D38: opciones y revisión). Las zonas del mundo 3D (006, T022) añaden
 * la ficha de "Otra" y el porqué de una recomendación.
 */
export const GUIDE_KINDS = Object.freeze({
  OPTIONS: 'options',
  REVIEW: 'review',
  OTHER_SHEET: 'otherSheet',
  RECOMMEND_REASON: 'recommendReason',
});

/** Motivos de error del puerto de guardado. */
export const STORE_ERRORS = Object.freeze({
  UNAVAILABLE: 'unavailable',
  UNREADABLE: 'unreadable',
  OTHER_VERSION: 'otherVersion',
});

/** Versión actual de la forma de una partida guardada. */
export const SAVED_GAME_VERSION = 1;

/**
 * @typedef {{ ok: false, reason: 'unavailable'|'busy'|'failed'|'cancelled'|'badAnswer' }} AiError
 */

/**
 * @typedef {object} OptionData
 * @property {string} text
 * @property {string} pros
 * @property {string} risks
 * @property {boolean} recommended
 * @property {Record<string, string>} [extras]
 */

/**
 * @typedef {object} OptionsRequest
 * @property {string} gateId
 * @property {string} instruction
 * @property {Record<string, string>} approvedPieces
 * @property {{ interests: string[] }} playerContext
 * @property {string[]} exclude Textos ya mostrados en esta puerta.
 * @property {{ values: string[], explained?: boolean } | null} fixedChoices
 * @property {string[]} [extrasWanted] Extras que la puerta pide, por ejemplo ['publicLabel'].
 */

/** @typedef {{ ok: true, options: OptionData[] } | AiError} OptionsResult */
/** @typedef {{ ok: true, comment: string | null } | AiError} CommentResult */
/** @typedef {{ ok: true, index: number, reason: string } | AiError} RecommendResult */

/**
 * @typedef {object} ReviewRequest
 * @property {string} worldId
 * @property {{ id: string, description: string }[]} criteria
 * @property {Record<string, string>} pieces
 * @property {string[]} deduce
 */

/**
 * @typedef {{
 *   ok: true,
 *   solid: { criterionId: string, explanation: string }[],
 *   observations: { criterionId: string, pieceIds: string[], explanation: string }[],
 *   deduced: Record<string, string>
 * } | AiError} ReviewResult
 */

/**
 * Porqué de una recomendación que el juego YA calculó con los criterios del contenido (006/FR-045).
 * La IA solo redacta; no puede cambiar la opción recomendada.
 * @typedef {object} RecommendReasonRequest
 * @property {string} zoneId
 * @property {string} instruction
 * @property {{ id: string, text: string }} recommended
 * @property {{ id: string, text: string, levels: { criterion: string, level: string }[] }[]} options
 * @property {{ question: string, answer: string }[]} answers
 * @property {string} draftReason Porqué armado con los criterios: respaldo si la IA falla.
 * @property {Record<string, string>} approvedPieces
 * @property {{ interests: string[] }} playerContext
 */

/** @typedef {{ ok: true, reason: string } | AiError} RecommendReasonResult */

/**
 * Ficha de una opción "Otra" escrita por el jugador (006/FR-044). No aprueba nada.
 * @typedef {object} OtherSheetRequest
 * @property {string} zoneId
 * @property {string} instruction
 * @property {string} text Texto del jugador.
 * @property {{ id: string, label: string }[]} sheetFields
 * @property {{ text: string, fields: Record<string, string> } | null} referenceOption Ficha de ejemplo.
 * @property {Record<string, string>} approvedPieces
 * @property {{ interests: string[] }} playerContext
 */

/** @typedef {{ ok: true, sheet: { fields: Record<string, string>, examples: string[] } } | AiError} OtherSheetResult */

/**
 * Puerto de IA. Ninguna operación lanza excepciones.
 * `explainRecommendation` y `explainOther` son opcionales: sin ellas, la zona usa su respaldo
 * (el porqué de los criterios y la ficha que dice qué datos faltan).
 * @typedef {object} AiPort
 * @property {'direct'|'guide'|'demo'} mode
 * @property {(request: OptionsRequest, opts?: { signal?: AbortSignal, fresh?: boolean }) => Promise<OptionsResult>} proposeOptions
 * @property {(request: object, opts?: { signal?: AbortSignal }) => Promise<CommentResult>} commentOnAnswer
 * @property {(request: object, opts?: { signal?: AbortSignal }) => Promise<RecommendResult>} recommend
 * @property {(request: ReviewRequest, opts?: { signal?: AbortSignal }) => Promise<ReviewResult>} reviewWorld
 * @property {(request: RecommendReasonRequest, opts?: { signal?: AbortSignal }) => Promise<RecommendReasonResult>} [explainRecommendation] Zonas 3D (006, T022).
 * @property {(request: OtherSheetRequest, opts?: { signal?: AbortSignal }) => Promise<OtherSheetResult>} [explainOther] Zonas 3D (006, T022).
 * @property {(kind: 'options'|'review'|'otherSheet'|'recommendReason', request: object) => { ok: true, text: string } | { ok: false, reason: 'failed' }} [guidePrompt] Llega con T085.
 * @property {(kind: 'options'|'review'|'otherSheet'|'recommendReason', request: object, rawText: string) => OptionsResult | ReviewResult | OtherSheetResult | RecommendReasonResult} [readGuideAnswer] Llega con T085.
 */

/**
 * Partida guardada (data-model.md, "Qué se conserva").
 * @typedef {object} SavedGame
 * @property {number} version
 * @property {object[]} inventory
 * @property {object[]} worlds
 * @property {object[]} gates
 * @property {object} playerContext
 * @property {object | null} resume
 */

/**
 * Puerto de guardado. Ninguna operación lanza excepciones.
 * @typedef {object} ProgressStore
 * @property {() => Promise<SavedGame | null | { error: 'unreadable'|'otherVersion'|'unavailable' }>} load
 * @property {(game: SavedGame) => Promise<{ ok: true } | { ok: false, reason: 'unavailable' }>} save
 * @property {() => Promise<void>} clear
 */

const AI_OPERATIONS = ['proposeOptions', 'commentOnAnswer', 'recommend', 'reviewWorld'];
/** Operaciones opcionales: si están, deben ser funciones. */
export const AI_OPTIONAL_OPERATIONS = Object.freeze(['explainRecommendation', 'explainOther', 'guidePrompt', 'readGuideAnswer']);
const STORE_OPERATIONS = ['load', 'save', 'clear'];

/** Comprueba que un objeto cumple la forma del puerto de IA. */
export function isAiPort(candidate) {
  return Boolean(candidate)
    && Object.values(AI_MODES).includes(candidate.mode)
    && AI_OPERATIONS.every((name) => typeof candidate[name] === 'function')
    && AI_OPTIONAL_OPERATIONS.every((name) => candidate[name] === undefined || typeof candidate[name] === 'function');
}

/** Comprueba que un objeto cumple la forma del puerto de guardado. */
export function isProgressStore(candidate) {
  return Boolean(candidate) && STORE_OPERATIONS.every((name) => typeof candidate[name] === 'function');
}
