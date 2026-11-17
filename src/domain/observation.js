// Observación del jefe (T018). data-model.md, "Observation".

export const OBSERVATION_STATUS = Object.freeze({
  OPEN: 'open',
  RESOLVED: 'resolved',
  ACCEPTED: 'accepted',
});

/**
 * Indica si una observación es válida para un mundo: criterio conocido y piezas que existen
 * y son de ese mundo (003/FR-015).
 * @param {{ criterionId: string, pieceIds: string[], explanation: string }} observation
 * @param {{ criteria: string[], pieceIds: string[] }} world
 */
export function isValidObservation(observation, { criteria, pieceIds }) {
  return Boolean(observation)
    && criteria.includes(observation.criterionId)
    && Array.isArray(observation.pieceIds)
    && observation.pieceIds.length > 0
    && observation.pieceIds.every((id) => pieceIds.includes(id))
    && typeof observation.explanation === 'string'
    && observation.explanation.trim().length > 0;
}

export function createObservation({ criterionId, pieceIds, explanation, status = OBSERVATION_STATUS.OPEN }) {
  return { criterionId, pieceIds: [...pieceIds], explanation, status };
}

export function isSettled(observation) {
  return observation.status === OBSERVATION_STATUS.RESOLVED || observation.status === OBSERVATION_STATUS.ACCEPTED;
}
