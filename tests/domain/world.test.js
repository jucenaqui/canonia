// T015 (mundo): pruebas de World y Observation (data-model.md, "World" y "Observation").

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { World, WORLD_STATUS, BOSS_FIGHT, REVIEW_STATUS } from '../../src/domain/world.js';
import { OBSERVATION_STATUS } from '../../src/domain/observation.js';
import { Inventory } from '../../src/domain/inventory.js';
import { PIECES, SAMPLE_TEXT, CRITERIA, NOW } from '../fixtures/world-fixture.js';

function setup({ approved = PIECES.map((p) => p.id) } = {}) {
  const inventory = Inventory.fromDefinitions(PIECES);
  for (const id of approved) inventory.approve(id, { content: SAMPLE_TEXT[id], origin: 'ai', now: NOW });
  const world = new World({ id: 'world-1', criteria: CRITERIA });
  return { inventory, world };
}

function readyToClose() {
  const { inventory, world } = setup();
  world.recordBossFight('won');
  world.setReview({ observations: [], deducedData: {} }, inventory);
  return { inventory, world };
}

const OBSERVATION = {
  criterionId: 'timeAndGoalCoherence',
  pieceIds: ['timeAvailable', 'goal90Days'],
  explanation: 'Con 5 horas a la semana, 3 publicaciones semanales es ajustado.',
};

test('el jefe no es accesible con una pieza pendiente, y dice cuál falta (003/FR-001, FR-002)', () => {
  const { inventory, world } = setup({ approved: ['incomeSource', 'niche', 'audience', 'timeAvailable'] });
  assert.deepEqual(world.canFaceBoss(inventory), { ok: false, reason: 'missingPiece', pieceIds: ['goal90Days'] });
});

test('el jefe no es accesible con piezas por revisar (003/FR-003)', () => {
  const { inventory, world } = setup();
  inventory.approve('niche', { content: 'Plantas', origin: 'player', now: NOW });
  const result = world.canFaceBoss(inventory);
  assert.equal(result.ok, false);
  assert.equal(result.reason, 'needsReview');
  assert.deepEqual(result.pieceIds.sort(), ['audience', 'goal90Days']);
});

test('con todo aprobado, el jefe es accesible', () => {
  const { inventory, world } = setup();
  assert.deepEqual(world.canFaceBoss(inventory), { ok: true });
});

test('la pelea vencida o saltada no se repite (003/FR-009)', () => {
  const { world } = setup();
  assert.equal(world.recordBossFight('skipped'), true);
  assert.equal(world.recordBossFight('won'), false);
  assert.equal(world.bossFight, BOSS_FIGHT.SKIPPED);
});

test('el mundo no se cierra sin pelea ni revisión', () => {
  const { inventory, world } = setup();
  assert.equal(world.canClose(inventory).ok, false);
  world.recordBossFight('won');
  assert.equal(world.canClose(inventory).reason, 'reviewPending');
});

test('se descartan observaciones sobre piezas inexistentes, de otro mundo o con criterio desconocido (003/FR-015)', () => {
  const { inventory, world } = setup();
  world.recordBossFight('won');
  world.setReview({
    observations: [
      OBSERVATION,
      { criterionId: 'clarity', pieceIds: ['personaje'], explanation: 'x' },
      { criterionId: 'inventado', pieceIds: ['niche'], explanation: 'x' },
      { criterionId: 'clarity', pieceIds: [], explanation: 'x' },
    ],
    deducedData: { markets: 'España y México' },
  }, inventory);
  assert.equal(world.observations.length, 1);
  assert.equal(world.observations[0].status, OBSERVATION_STATUS.OPEN);
});

test('con una observación abierta no se cierra; aceptarla permite cerrar (003/FR-019, FR-020)', () => {
  const { inventory, world } = setup();
  world.recordBossFight('won');
  world.setReview({ observations: [OBSERVATION], deducedData: {} }, inventory);
  assert.equal(world.canClose(inventory).reason, 'openObservations');
  assert.equal(world.acceptObservation('timeAndGoalCoherence'), true);
  assert.equal(world.observations[0].status, OBSERVATION_STATUS.ACCEPTED);
  assert.deepEqual(world.canClose(inventory), { ok: true });
});

test('el mundo se cierra solo con el resumen aprobado, y una sola vez (003/FR-023, FR-024)', () => {
  const { inventory, world } = readyToClose();
  assert.equal(world.status, WORLD_STATUS.OPEN);
  assert.equal(world.approveSummary(inventory), true);
  assert.equal(world.status, WORLD_STATUS.CLOSED);
  assert.equal(world.approveSummary(inventory), false);
});

test('la revisión no cambia el inventario (003/FR-013)', () => {
  const { inventory, world } = setup();
  const before = JSON.stringify(inventory.toData());
  world.recordBossFight('won');
  world.setReview({ observations: [OBSERVATION], deducedData: { markets: 'x' } }, inventory);
  world.acceptObservation('timeAndGoalCoherence');
  assert.equal(JSON.stringify(inventory.toData()), before);
});

test('cambiar una pieza de un mundo cerrado lo deja pendiente de revisión, sin repetir la pelea (003/FR-028)', () => {
  const { inventory, world } = readyToClose();
  world.approveSummary(inventory);
  world.onPieceChanged();
  assert.equal(world.status, WORLD_STATUS.PENDING_REVIEW);
  assert.equal(world.bossFight, BOSS_FIGHT.WON);
  assert.equal(world.reviewStatus, REVIEW_STATUS.NONE);
  world.setReview({ observations: [], deducedData: {} }, inventory);
  assert.equal(world.approveSummary(inventory), true);
  assert.equal(world.status, WORLD_STATUS.CLOSED);
});

test('cambiar una pieza tras una observación obliga a repetir la revisión (003/FR-021)', () => {
  const { inventory, world } = setup();
  world.recordBossFight('won');
  world.setReview({ observations: [OBSERVATION], deducedData: {} }, inventory);
  world.onPieceChanged();
  assert.equal(world.reviewStatus, REVIEW_STATUS.NONE);
  assert.deepEqual(world.observations, []);
  assert.equal(world.bossFight, BOSS_FIGHT.WON);
});

test('sin IA se puede cerrar marcado como no revisado (003/FR-031)', () => {
  const { inventory, world } = setup();
  world.recordBossFight('won');
  world.skipReview();
  assert.equal(world.reviewed, false);
  assert.equal(world.approveSummary(inventory), true);
});

test('no se cierra si una pieza quedó por revisar después de la revisión', () => {
  const { inventory, world } = readyToClose();
  inventory.approve('niche', { content: 'Plantas', origin: 'player', now: NOW });
  assert.equal(world.canClose(inventory).reason, 'piecesNotReady');
});

test('los datos deducidos se confirman de forma explícita (003/FR-014)', () => {
  const { inventory, world } = setup();
  world.recordBossFight('won');
  world.setReview({ observations: [], deducedData: { markets: 'España', platforms: 'Instagram' } }, inventory);
  assert.equal(world.deducedConfirmed, false);
  world.confirmDeducedData({ markets: 'México', platforms: 'Instagram' });
  assert.equal(world.deducedConfirmed, true);
  assert.deepEqual(world.deducedData, { markets: 'México', platforms: 'Instagram' });
});

test('se guarda y se recupera igual', () => {
  const { inventory, world } = setup();
  world.recordBossFight('won');
  world.setReview({ observations: [OBSERVATION], deducedData: { markets: 'x' } }, inventory);
  const copy = World.fromData(JSON.parse(JSON.stringify(world.toData())));
  assert.deepEqual(copy.toData(), world.toData());
});
