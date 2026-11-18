// T034 y T035: flujo de una puerta (002/FR-001 a FR-025, FR-041, FR-042).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setupFlows } from '../fixtures/gate-fixture.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { MemoryProgressStore } from '../../src/adapters/storage/memory-progress-store.js';
import { SAMPLE_TEXT } from '../fixtures/world-fixture.js';

async function approveIncome(gateFlow) {
  await gateFlow.approvePiece('incomeSource', { text: SAMPLE_TEXT.incomeSource, origin: 'ai' });
}

// --- T034 ---

test('abrir una puerta muestra primero la lección, que se registra una vez (002/FR-001, FR-003)', () => {
  const { gateFlow } = setupFlows();
  assert.equal(gateFlow.openGate('niche').lessonSeen, false);
  assert.deepEqual(gateFlow.completeLesson('niche'), { firstTime: true });
  assert.deepEqual(gateFlow.completeLesson('niche'), { firstTime: false });
  assert.equal(gateFlow.openGate('niche').lessonSeen, true);
});

test('seleccionar o recibir opciones no aprueba nada (002/FR-009, FR-019)', async () => {
  const { gateFlow, session } = setupFlows();
  const result = await gateFlow.requestOptions('niche');
  assert.equal(result.ok, true);
  assert.equal(result.options.length, 3);
  assert.equal(result.options.filter((o) => o.recommended).length, 1);
  assert.equal(session.inventory.get('niche').status, 'pending');
});

test('cerrar sin aprobar no guarda nada y la puerta sigue sin resolver (002/FR-025)', async () => {
  const { gateFlow, session, emitted } = setupFlows();
  gateFlow.openGate('niche');
  await gateFlow.requestOptions('niche');
  gateFlow.closeGate('niche');
  assert.equal(session.inventory.get('niche').status, 'pending');
  assert.equal(session.gates.get('niche').status, 'unresolved');
  assert.deepEqual(emitted, [{ name: 'resumeLevel', data: {} }]);
});

test('aprobar guarda exactamente el texto aprobado y resuelve la puerta (002/FR-018, FR-022, FR-024)', async () => {
  const { gateFlow, session, emitted, store } = setupFlows();
  const text = '  Cocina «casera», rápida 🍳 ';
  const result = await gateFlow.approvePiece('niche', { text, origin: 'aiEdited', extras: { publicLabel: 'Cocina rápida' } });
  assert.equal(result.ok, true);
  assert.equal(session.inventory.get('niche').content, text);
  assert.deepEqual(session.inventory.get('niche').extras, { publicLabel: 'Cocina rápida' });
  assert.equal(session.gates.get('niche').status, 'resolved');
  assert.deepEqual(emitted, [
    { name: 'setGateResolved', data: { gateId: 'niche' } },
    { name: 'resumeLevel', data: {} },
  ]);
  assert.equal((await store.load()).inventory.find((p) => p.id === 'niche').content, text, 'aprobar guarda la partida (005/FR-014)');
});

test('aprobar dos veces guarda una sola pieza (002/FR-023)', async () => {
  const { gateFlow, session } = setupFlows();
  await Promise.all([
    gateFlow.approvePiece('niche', { text: 'Cocina casera', origin: 'ai' }),
    gateFlow.approvePiece('niche', { text: 'Cocina casera', origin: 'ai' }),
  ]);
  assert.deepEqual(session.inventory.get('niche').history, []);
});

test('las opciones nuevas excluyen las ya mostradas, y se puede volver a las anteriores (002/FR-010, FR-011)', async () => {
  const { gateFlow, session } = setupFlows();
  const first = await gateFlow.requestOptions('niche');
  const second = await gateFlow.requestOptions('niche');
  const firstTexts = new Set(first.options.map((o) => o.text));
  assert.ok(second.options.every((o) => !firstTexts.has(o.text)));
  assert.equal(gateFlow.openGate('niche').shownOptions.length, 6);
  assert.equal(session.gates.get('niche').shownOptions.length, 6);
});

test('las opciones fijas ya explicadas no llaman a la IA', async () => {
  let calls = 0;
  const ai = createDemoAiAdapter();
  const counting = { ...ai, proposeOptions: async (...args) => { calls += 1; return ai.proposeOptions(...args); } };
  const { gateFlow } = setupFlows({ ai: counting });
  const result = await gateFlow.requestOptions('timeAvailable');
  assert.equal(result.ok, true);
  assert.equal(calls, 0);
  assert.deepEqual(result.options.map((o) => o.text), ['Menos de 5 horas', 'De 5 a 10 horas', 'Más de 10 horas']);
});

test('la petición lleva las piezas aprobadas, los intereses y los extras de la puerta (002/FR-007)', async () => {
  let seen;
  const ai = createDemoAiAdapter();
  const spying = { ...ai, proposeOptions: async (request, opts) => { seen = request; return ai.proposeOptions(request, opts); } };
  const { gateFlow, session } = setupFlows({ ai: spying });
  await session.setInterests({ selected: ['cocina', 'plantas', 'viajes'] });
  await approveIncome(gateFlow);
  await gateFlow.requestOptions('niche');
  assert.deepEqual(seen.approvedPieces, { incomeSource: SAMPLE_TEXT.incomeSource });
  assert.deepEqual(seen.playerContext.interests, ['cocina', 'plantas', 'viajes']);
  assert.deepEqual(seen.extrasWanted, ['publicLabel']);
  assert.equal(seen.instruction, 'Propón nichos');
});

test('reaprobar una pieza con otro texto deja por revisar a las dependientes (002/FR-033)', async () => {
  const { gateFlow, session } = setupFlows();
  await approveIncome(gateFlow);
  await gateFlow.approvePiece('niche', { text: SAMPLE_TEXT.niche, origin: 'ai' });
  const result = await gateFlow.approvePiece('incomeSource', { text: 'Suscripciones', origin: 'player' });
  assert.deepEqual(result.markedForReview, ['niche']);
  assert.equal(session.inventory.get('niche').status, 'needsReview');
});

// --- T035 ---

test('una recomendación no aprueba nada (002/FR-016, FR-017)', async () => {
  const { gateFlow, session } = setupFlows();
  const { options } = await gateFlow.requestOptions('niche');
  const result = await gateFlow.askRecommendation('niche', options);
  assert.equal(result.ok, true);
  assert.ok(result.index >= 0 && result.index < options.length);
  assert.ok(result.reason);
  assert.equal(session.inventory.get('niche').status, 'pending');
});

test('con la IA no disponible, el jugador puede escribir y aprobar su respuesta (002/FR-042)', async () => {
  const { gateFlow, session } = setupFlows({ ai: createDemoAiAdapter({ behavior: 'unavailable' }) });
  const options = await gateFlow.requestOptions('niche');
  assert.equal(options.ok, false);
  assert.equal(options.reason, 'unavailable');
  const own = await gateFlow.submitOwnAnswer('niche', 'Huertos urbanos para principiantes');
  assert.equal(own.ok, true);
  assert.equal(own.comment, null);
  const approved = await gateFlow.approvePiece('niche', { text: own.option.text, origin: 'player' });
  assert.equal(approved.ok, true);
  assert.equal(session.inventory.get('niche').content, 'Huertos urbanos para principiantes');
});

test('una respuesta propia recibe comentario sin bloquear la aprobación (002/FR-014)', async () => {
  const { gateFlow } = setupFlows();
  const own = await gateFlow.submitOwnAnswer('niche', 'Cocina');
  assert.equal(own.ok, true);
  assert.equal(typeof own.comment, 'string');
  assert.equal((await gateFlow.approvePiece('niche', { text: 'Cocina', origin: 'player' })).ok, true);
});

test('una respuesta vacía o demasiado larga se rechaza (002/FR-015)', async () => {
  const { gateFlow, session } = setupFlows();
  assert.deepEqual(await gateFlow.submitOwnAnswer('niche', '  '), { ok: false, reason: 'tooShort' });
  assert.deepEqual(await gateFlow.submitOwnAnswer('niche', 'x'.repeat(501)), { ok: false, reason: 'tooLong' });
  assert.deepEqual(await gateFlow.approvePiece('niche', { text: 'a', origin: 'player' }), { ok: false, reason: 'tooShort' });
  assert.equal(session.inventory.get('niche').status, 'pending');
});

test('una etiqueta pública inválida se rechaza y no se aprueba nada', async () => {
  const { gateFlow, session } = setupFlows();
  const result = await gateFlow.approvePiece('niche', { text: 'Cocina casera', origin: 'ai', extras: { publicLabel: 'x'.repeat(41) } });
  assert.deepEqual(result, { ok: false, reason: 'invalidExtras' });
  assert.equal(session.inventory.get('niche').status, 'pending');
});

test('un error de la IA no borra piezas aprobadas (002/FR-041)', async () => {
  const store = new MemoryProgressStore();
  const { gateFlow, session } = setupFlows({ ai: createDemoAiAdapter({ behavior: 'failed' }), store });
  await approveIncome(gateFlow);
  assert.deepEqual(await gateFlow.requestOptions('niche'), { ok: false, reason: 'failed' });
  assert.equal(session.inventory.get('incomeSource').content, SAMPLE_TEXT.incomeSource);
});

test('salir de la puerta cancela una petición en curso', async () => {
  const { gateFlow } = setupFlows({ ai: createDemoAiAdapter({ behavior: 'slow', delayMs: 50 }) });
  const pending = gateFlow.requestOptions('niche');
  gateFlow.closeGate('niche');
  assert.deepEqual(await pending, { ok: false, reason: 'cancelled' });
});
