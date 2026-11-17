// Puerta de decisión (T018). data-model.md, "Gate" y "Option".

import { DomainError } from './piece.js';

export const GATE_STATUS = Object.freeze({
  UNRESOLVED: 'unresolved',
  RESOLVED: 'resolved',
});

export const OPTION_SOURCE = Object.freeze({
  AI: 'ai',
  PLAYER: 'player',
});

function toOption(option, source) {
  return {
    text: option.text,
    pros: option.pros ?? '',
    risks: option.risks ?? '',
    recommended: Boolean(option.recommended),
    source: option.source ?? source,
    ...(option.extras ? { extras: { ...option.extras } } : {}),
  };
}

export class Gate {
  constructor({ id, worldId, pieceId, status = GATE_STATUS.UNRESOLVED, lessonSeen = false, shownOptions = [] }) {
    if (!id || !worldId || !pieceId) throw new DomainError('invalidGate', 'Una puerta necesita id, mundo y pieza');
    if (!Object.values(GATE_STATUS).includes(status)) throw new DomainError('invalidGate', `Estado desconocido: ${status}`);
    this.id = id;
    this.worldId = worldId;
    this.pieceId = pieceId;
    this.status = status;
    this.lessonSeen = lessonSeen;
    this.shownOptions = shownOptions.map((option) => toOption(option, option.source));
  }

  /** Registra la mini lección. Devuelve true solo la primera vez (002/FR-003). */
  completeLesson() {
    if (this.lessonSeen) return false;
    this.lessonSeen = true;
    return true;
  }

  /** Textos ya mostrados, para pedir opciones nuevas sin repetir (002/FR-010). */
  shownTexts() {
    return this.shownOptions.map((option) => option.text);
  }

  /**
   * Añade opciones mostradas, sin repetir textos ya vistos (002/FR-011).
   * @returns {object[]} Las opciones que sí se añadieron.
   */
  addOptions(options, source) {
    const seen = new Set(this.shownTexts());
    const added = [];
    for (const option of options) {
      if (seen.has(option.text)) continue;
      seen.add(option.text);
      const stored = toOption(option, source);
      this.shownOptions.push(stored);
      added.push(stored);
    }
    return added;
  }

  /** Marca la puerta resuelta. No hay vuelta atrás (001/FR-019). Devuelve true si cambió. */
  resolve() {
    if (this.status === GATE_STATUS.RESOLVED) return false;
    this.status = GATE_STATUS.RESOLVED;
    return true;
  }

  toData() {
    return {
      id: this.id,
      worldId: this.worldId,
      pieceId: this.pieceId,
      status: this.status,
      lessonSeen: this.lessonSeen,
      shownOptions: this.shownOptions.map((option) => toOption(option, option.source)),
    };
  }

  static fromData(data) {
    return new Gate(data);
  }
}
