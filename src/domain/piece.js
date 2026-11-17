// Pieza del influencer (T016). data-model.md, "Piece".
// Solo `approve` cambia el contenido, y solo la invoca el caso de uso de aprobar (002/FR-018).

export const PIECE_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  NEEDS_REVIEW: 'needsReview',
});

export const PIECE_ORIGIN = Object.freeze({
  AI: 'ai',
  AI_EDITED: 'aiEdited',
  PLAYER: 'player',
});

/** Longitudes del contenido aprobado (002/FR-015). Se cuentan sobre el texto sin espacios de los bordes. */
export const MIN_CONTENT_LENGTH = 2;
export const MAX_CONTENT_LENGTH = 500;

/** Error de una regla del dominio. La aplicación valida antes para no llegar aquí. */
export class DomainError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
  }
}

/** Valida un texto aprobable. */
export function validateContent(text) {
  if (typeof text !== 'string' || text.trim().length < MIN_CONTENT_LENGTH) return { ok: false, reason: 'tooShort' };
  if (text.length > MAX_CONTENT_LENGTH) return { ok: false, reason: 'tooLong' };
  return { ok: true };
}

function sameExtras(a, b) {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  return keysA.length === keysB.length && keysA.every((key) => a[key] === b[key]);
}

function cleanExtras(extras) {
  const result = {};
  for (const [key, value] of Object.entries(extras ?? {})) {
    if (typeof value !== 'string') throw new DomainError('invalidExtras', `El extra ${key} debe ser texto`);
    result[key] = value;
  }
  return result;
}

export class Piece {
  /**
   * @param {object} data
   * @param {string} data.id
   * @param {string} data.worldId
   * @param {string[]} [data.dependsOn]
   */
  constructor({ id, worldId, dependsOn = [], status = PIECE_STATUS.PENDING, content = null, extras = {},
    origin = null, approvedAt = null, history = [] }) {
    if (!id || !worldId) throw new DomainError('invalidPiece', 'Una pieza necesita id y mundo');
    if (!Object.values(PIECE_STATUS).includes(status)) throw new DomainError('invalidPiece', `Estado desconocido: ${status}`);
    if (status === PIECE_STATUS.PENDING && content !== null) throw new DomainError('invalidPiece', 'Una pieza pendiente no tiene contenido');
    if (status !== PIECE_STATUS.PENDING && validateContent(content).ok !== true) throw new DomainError('invalidPiece', 'Contenido aprobado inválido');
    this.id = id;
    this.worldId = worldId;
    this.dependsOn = [...dependsOn];
    this.status = status;
    this.content = content;
    this.extras = cleanExtras(extras);
    this.origin = origin;
    this.approvedAt = approvedAt;
    this.history = history.map((version) => ({ ...version, extras: { ...version.extras } }));
  }

  /**
   * Aprueba un texto. Es la única operación que cambia el contenido.
   * @returns {{ contentChanged: boolean }}
   */
  approve({ content, origin, extras = {}, now }) {
    const check = validateContent(content);
    if (!check.ok) throw new DomainError(check.reason, 'El contenido no se puede aprobar');
    if (!Object.values(PIECE_ORIGIN).includes(origin)) throw new DomainError('invalidOrigin', `Origen desconocido: ${origin}`);
    const newExtras = cleanExtras(extras);

    const wasPending = this.status === PIECE_STATUS.PENDING;
    const contentChanged = this.content !== content;
    const extrasChanged = !sameExtras(this.extras, newExtras);

    this.status = PIECE_STATUS.APPROVED;
    if (!wasPending && !contentChanged && !extrasChanged) return { contentChanged: false };

    if (!wasPending) {
      this.history.push({ content: this.content, extras: { ...this.extras }, origin: this.origin, approvedAt: this.approvedAt });
    }
    this.content = content;
    this.extras = newExtras;
    this.origin = origin;
    this.approvedAt = now;
    return { contentChanged };
  }

  /** Marca la pieza por revisar, si está aprobada. Conserva su contenido (002/FR-033). */
  markNeedsReview() {
    if (this.status !== PIECE_STATUS.APPROVED) return false;
    this.status = PIECE_STATUS.NEEDS_REVIEW;
    return true;
  }

  toData() {
    return {
      id: this.id,
      worldId: this.worldId,
      dependsOn: [...this.dependsOn],
      status: this.status,
      content: this.content,
      extras: { ...this.extras },
      origin: this.origin,
      approvedAt: this.approvedAt,
      history: this.history.map((version) => ({ ...version, extras: { ...version.extras } })),
    };
  }

  static fromData(data) {
    return new Piece(data);
  }
}
