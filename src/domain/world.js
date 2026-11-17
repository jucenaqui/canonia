// Mundo y sus reglas de jefe y cierre (T018). data-model.md, "World".
// Las reglas de cierre se comprueban sin IA.

import { DomainError } from './piece.js';
import { createObservation, isValidObservation, isSettled, OBSERVATION_STATUS } from './observation.js';

export const WORLD_STATUS = Object.freeze({
  OPEN: 'open',
  PENDING_REVIEW: 'pendingReview',
  CLOSED: 'closed',
});

export const BOSS_FIGHT = Object.freeze({
  PENDING: 'pending',
  WON: 'won',
  SKIPPED: 'skipped',
});

/** Estado de la revisión del jefe. `skipped`: se cerró sin revisión por IA no disponible (003/FR-031). */
export const REVIEW_STATUS = Object.freeze({
  NONE: 'none',
  DONE: 'done',
  SKIPPED: 'skipped',
});

export class World {
  constructor({ id, criteria = [], status = WORLD_STATUS.OPEN, bossFight = BOSS_FIGHT.PENDING,
    reviewStatus = REVIEW_STATUS.NONE, observations = [], deducedData = {}, deducedConfirmed = false }) {
    if (!id) throw new DomainError('invalidWorld', 'Un mundo necesita id');
    this.id = id;
    this.criteria = [...criteria];
    this.status = status;
    this.bossFight = bossFight;
    this.reviewStatus = reviewStatus;
    this.observations = observations.map(createObservation);
    this.deducedData = { ...deducedData };
    this.deducedConfirmed = deducedConfirmed;
  }

  /** Falso si el mundo se cerró sin revisión. */
  get reviewed() {
    return this.reviewStatus === REVIEW_STATUS.DONE;
  }

  /** Reglas de acceso al jefe (003/FR-001 a FR-003). */
  canFaceBoss(inventory) {
    const missing = inventory.pendingIds(this.id);
    if (missing.length > 0) return { ok: false, reason: 'missingPiece', pieceIds: missing };
    const toReview = inventory.needsReviewIds(this.id);
    if (toReview.length > 0) return { ok: false, reason: 'needsReview', pieceIds: toReview };
    return { ok: true };
  }

  /** Registra la pelea ganada o saltada. No se repite (003/FR-009). Devuelve true si cambió. */
  recordBossFight(result) {
    if (result !== BOSS_FIGHT.WON && result !== BOSS_FIGHT.SKIPPED) throw new DomainError('invalidBossFight', `Resultado desconocido: ${result}`);
    if (this.bossFight !== BOSS_FIGHT.PENDING) return false;
    this.bossFight = result;
    return true;
  }

  /**
   * Guarda el resultado de una revisión. Descarta las observaciones inválidas (003/FR-015).
   * No toca el inventario (003/FR-013).
   */
  setReview({ observations = [], deducedData = {} }, inventory) {
    const pieceIds = inventory.piecesOfWorld(this.id).map((piece) => piece.id);
    this.observations = observations
      .filter((observation) => isValidObservation(observation, { criteria: this.criteria, pieceIds }))
      .map((observation) => createObservation({ ...observation, status: OBSERVATION_STATUS.OPEN }));
    this.deducedData = { ...deducedData };
    this.deducedConfirmed = false;
    this.reviewStatus = REVIEW_STATUS.DONE;
  }

  /** Sin IA: se sigue sin revisión, y el resumen lo indicará (003/FR-031). */
  skipReview() {
    this.observations = [];
    this.reviewStatus = REVIEW_STATUS.SKIPPED;
  }

  /** El jugador acepta una observación tal como está (003/FR-019). */
  acceptObservation(criterionId) {
    return this.#settle(criterionId, OBSERVATION_STATUS.ACCEPTED);
  }

  /** La observación queda resuelta porque el jugador revisó la pieza. */
  resolveObservation(criterionId) {
    return this.#settle(criterionId, OBSERVATION_STATUS.RESOLVED);
  }

  #settle(criterionId, status) {
    const observation = this.observations.find((o) => o.criterionId === criterionId);
    if (!observation || observation.status !== OBSERVATION_STATUS.OPEN) return false;
    observation.status = status;
    return true;
  }

  /** Datos sin puerta propia, confirmados por el jugador (003/FR-014). */
  confirmDeducedData(data) {
    this.deducedData = { ...data };
    this.deducedConfirmed = true;
  }

  /** Reglas de cierre. */
  canClose(inventory) {
    if (this.bossFight === BOSS_FIGHT.PENDING) return { ok: false, reason: 'bossPending' };
    if (!this.canFaceBoss(inventory).ok) return { ok: false, reason: 'piecesNotReady' };
    if (this.reviewStatus === REVIEW_STATUS.NONE) return { ok: false, reason: 'reviewPending' };
    if (!this.observations.every(isSettled)) return { ok: false, reason: 'openObservations' };
    return { ok: true };
  }

  /**
   * Aprobación explícita del resumen. Cierra el mundo una sola vez (003/FR-023, FR-024).
   * @returns {boolean} true si el mundo se cerró ahora.
   */
  approveSummary(inventory) {
    if (this.status === WORLD_STATUS.CLOSED) return false;
    const check = this.canClose(inventory);
    if (!check.ok) throw new DomainError(check.reason, 'El mundo todavía no se puede cerrar');
    this.status = WORLD_STATUS.CLOSED;
    return true;
  }

  /**
   * Una pieza de este mundo cambió de contenido. La revisión se repite sin repetir la pelea
   * (003/FR-021) y, si el mundo estaba cerrado, queda pendiente de revisión (003/FR-028).
   */
  onPieceChanged() {
    if (this.status === WORLD_STATUS.CLOSED) this.status = WORLD_STATUS.PENDING_REVIEW;
    this.reviewStatus = REVIEW_STATUS.NONE;
    this.observations = [];
  }

  toData() {
    return {
      id: this.id,
      criteria: [...this.criteria],
      status: this.status,
      bossFight: this.bossFight,
      reviewStatus: this.reviewStatus,
      observations: this.observations.map(createObservation),
      deducedData: { ...this.deducedData },
      deducedConfirmed: this.deducedConfirmed,
    };
  }

  static fromData(data) {
    return new World(data);
  }
}
