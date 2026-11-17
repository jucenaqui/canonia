// T014: pruebas de Inventory (data-model.md, "Inventory").

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Inventory } from '../../src/domain/inventory.js';
import { PIECE_STATUS } from '../../src/domain/piece.js';
import { PIECES, SAMPLE_TEXT, NOW } from '../fixtures/world-fixture.js';

function approveAll(inventory) {
  for (const { id } of PIECES) inventory.approve(id, { content: SAMPLE_TEXT[id], origin: 'ai', now: NOW });
}

function contents(inventory) {
  return Object.fromEntries(inventory.list().map((p) => [p.id, p.content]));
}

test('el inventario empieza con todas las piezas pendientes', () => {
  const inventory = Inventory.fromDefinitions(PIECES);
  assert.equal(inventory.list().length, 5);
  assert.ok(inventory.list().every((p) => p.status === PIECE_STATUS.PENDING));
  assert.equal(inventory.hasPending('world-1'), true);
});

test('cambiar una pieza deja por revisar a las que dependen de ella, directa o indirectamente (002/FR-033)', () => {
  const inventory = Inventory.fromDefinitions(PIECES);
  approveAll(inventory);
  const before = contents(inventory);

  const result = inventory.approve('incomeSource', { content: 'Venta de productos propios', origin: 'player', now: NOW });

  assert.deepEqual(result.markedForReview.sort(), ['audience', 'goal90Days', 'niche']);
  assert.equal(inventory.get('niche').status, PIECE_STATUS.NEEDS_REVIEW);
  assert.equal(inventory.get('audience').status, PIECE_STATUS.NEEDS_REVIEW, 'dependencia indirecta');
  assert.equal(inventory.get('goal90Days').status, PIECE_STATUS.NEEDS_REVIEW);
  assert.equal(inventory.get('timeAvailable').status, PIECE_STATUS.APPROVED);
  for (const id of ['niche', 'audience', 'goal90Days', 'timeAvailable']) {
    assert.equal(inventory.get(id).content, before[id], `${id} conserva su contenido`);
  }
});

test('ninguna pieza se borra por un cambio en otra (002/FR-034)', () => {
  const inventory = Inventory.fromDefinitions(PIECES);
  approveAll(inventory);
  inventory.approve('niche', { content: 'Plantas en balcones', origin: 'player', now: NOW });
  assert.equal(inventory.list().length, 5);
  assert.ok(inventory.list().every((p) => p.content !== null));
});

test('aprobar el mismo contenido no marca nada por revisar', () => {
  const inventory = Inventory.fromDefinitions(PIECES);
  approveAll(inventory);
  const result = inventory.approve('incomeSource', { content: SAMPLE_TEXT.incomeSource, origin: 'ai', now: NOW });
  assert.deepEqual(result.markedForReview, []);
  assert.equal(inventory.hasNeedsReview('world-1'), false);
});

test('las piezas pendientes no pasan a por revisar', () => {
  const inventory = Inventory.fromDefinitions(PIECES);
  inventory.approve('incomeSource', { content: SAMPLE_TEXT.incomeSource, origin: 'ai', now: NOW });
  inventory.approve('incomeSource', { content: 'Otra fuente', origin: 'player', now: NOW });
  assert.equal(inventory.get('niche').status, PIECE_STATUS.PENDING);
});

test('dependentsOf avisa de las dependientes antes de reabrir (002/FR-031)', () => {
  const inventory = Inventory.fromDefinitions(PIECES);
  assert.deepEqual(inventory.dependentsOf('niche').sort(), ['audience', 'goal90Days']);
  assert.deepEqual(inventory.dependentsOf('timeAvailable'), ['goal90Days']);
  assert.deepEqual(inventory.dependentsOf('audience'), []);
});

test('informa si un mundo tiene piezas por revisar (002/FR-037)', () => {
  const inventory = Inventory.fromDefinitions(PIECES);
  approveAll(inventory);
  assert.equal(inventory.hasNeedsReview('world-1'), false);
  inventory.approve('timeAvailable', { content: 'Menos de 5 horas', origin: 'player', now: NOW });
  assert.equal(inventory.hasNeedsReview('world-1'), true);
  assert.deepEqual(inventory.needsReviewIds('world-1'), ['goal90Days']);
});

test('rechaza definiciones con dependencias desconocidas o en ciclo', () => {
  assert.throws(() => Inventory.fromDefinitions([{ id: 'a', worldId: 'w', dependsOn: ['x'] }]));
  assert.throws(() => Inventory.fromDefinitions([
    { id: 'a', worldId: 'w', dependsOn: ['b'] },
    { id: 'b', worldId: 'w', dependsOn: ['a'] },
  ]));
  assert.throws(() => Inventory.fromDefinitions([
    { id: 'a', worldId: 'w', dependsOn: [] },
    { id: 'a', worldId: 'w', dependsOn: [] },
  ]));
});

test('aprobar una pieza inexistente falla', () => {
  const inventory = Inventory.fromDefinitions(PIECES);
  assert.throws(() => inventory.approve('nope', { content: 'Texto', origin: 'player', now: NOW }));
});

test('se guarda y se recupera igual', () => {
  const inventory = Inventory.fromDefinitions(PIECES);
  approveAll(inventory);
  inventory.approve('niche', { content: 'Plantas', origin: 'player', now: NOW });
  const copy = Inventory.fromData(JSON.parse(JSON.stringify(inventory.toData())));
  assert.deepEqual(copy.toData(), inventory.toData());
  assert.equal(copy.get('audience').status, PIECE_STATUS.NEEDS_REVIEW);
});
