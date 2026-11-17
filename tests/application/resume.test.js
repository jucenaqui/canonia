// T091: guardado y continuación de la partida (005/FR-014 a FR-018, D39).
// Las partes que dependen de los flujos de puerta, jefe y modo guía quedan como pendientes
// hasta que existan (T037, T060, T086, T088).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameSession } from '../../src/application/game-session.js';
import { MemoryProgressStore } from '../../src/adapters/storage/memory-progress-store.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { PIECE_STATUS } from '../../src/domain/piece.js';
import { CONTENT, SAMPLE_TEXT, NOW } from '../fixtures/world-fixture.js';

function newSession(store = new MemoryProgressStore()) {
  return new GameSession({ content: CONTENT, store, ai: createDemoAiAdapter(), clock: () => NOW });
}

class FailingStore extends MemoryProgressStore {
  async save() { return { ok: false, reason: 'unavailable' }; }
}

test('sin partida guardada, se empieza una nueva', async () => {
  const session = newSession();
  assert.deepEqual(await session.loadSavedGame(), { status: 'none' });
  assert.equal(session.inventory.list().length, 5);
});

test('cambiar los intereses guarda la partida y no toca ninguna pieza (004/FR-013)', async () => {
  const store = new MemoryProgressStore();
  const session = newSession(store);
  session.inventory.approve('niche', { content: SAMPLE_TEXT.niche, origin: 'ai', now: NOW });
  const before = JSON.stringify(session.inventory.toData());
  const result = await session.setInterests({ selected: ['cocina', 'plantas', 'viajes'], custom: 'motos' });
  assert.equal(result.ok, true);
  assert.equal(JSON.stringify(session.inventory.toData()), before);
  const saved = await store.load();
  assert.deepEqual(saved.playerContext.interests, ['cocina', 'plantas', 'viajes', 'motos']);
});

test('los intereses van de 3 a 5 de la lista, más uno escrito opcional (004/FR-010, FR-011)', async () => {
  const session = newSession();
  assert.deepEqual(await session.setInterests({ selected: ['cocina', 'plantas'] }), { ok: false, reason: 'tooFew' });
  assert.deepEqual(await session.setInterests({ selected: ['cocina', 'plantas', 'viajes', 'música', 'deporte', 'moda'] }), { ok: false, reason: 'tooMany' });
  assert.deepEqual(await session.setInterests({ selected: ['cocina', 'plantas', 'inventado'] }), { ok: false, reason: 'unknownInterest' });
  assert.deepEqual(await session.setInterests({ selected: ['cocina', 'plantas', 'viajes'], custom: 'x' }), { ok: false, reason: 'invalidCustom' });
  assert.deepEqual(await session.setInterests({ selected: ['cocina', 'cocina', 'plantas'] }), { ok: false, reason: 'tooFew' });
  assert.equal((await session.setInterests({ selected: ['cocina', 'plantas', 'viajes', 'música', 'deporte'], custom: '  ' })).ok, true);
});

test('continuar restaura la puerta con sus opciones mostradas y el punto de retorno (005/FR-016)', async () => {
  const store = new MemoryProgressStore();
  const first = newSession(store);
  first.inventory.approve('incomeSource', { content: SAMPLE_TEXT.incomeSource, origin: 'ai', now: NOW });
  first.gates.get('niche').addOptions([
    { text: 'Cocina casera', pros: 'a', risks: 'b', recommended: true },
    { text: 'Plantas', pros: 'a', risks: 'b', recommended: false },
  ], 'ai');
  first.setResume({ worldId: 'world-1', screen: 'gate', gateId: 'niche', awaitingGuideAnswer: true });
  await first.saveNow();

  // Recarga de la página: sesión nueva sobre el mismo almacenamiento.
  const second = newSession(store);
  assert.deepEqual(await second.loadSavedGame(), { status: 'found' });
  const resume = second.continueSavedGame();
  assert.deepEqual(resume, { worldId: 'world-1', screen: 'gate', gateId: 'niche', awaitingGuideAnswer: true });
  assert.deepEqual(second.gates.get('niche').shownTexts(), ['Cocina casera', 'Plantas']);
  assert.equal(second.inventory.get('incomeSource').content, SAMPLE_TEXT.incomeSource);
});

test('cargar no aplica la partida hasta que el jugador elige continuar', async () => {
  const store = new MemoryProgressStore();
  const first = newSession(store);
  first.inventory.approve('niche', { content: SAMPLE_TEXT.niche, origin: 'ai', now: NOW });
  await first.saveNow();
  const second = newSession(store);
  await second.loadSavedGame();
  assert.equal(second.inventory.get('niche').status, PIECE_STATUS.PENDING);
});

test('empezar de nuevo con partida guardada exige confirmación (005/FR-015)', async () => {
  const store = new MemoryProgressStore();
  const first = newSession(store);
  first.inventory.approve('niche', { content: SAMPLE_TEXT.niche, origin: 'ai', now: NOW });
  await first.saveNow();

  const second = newSession(store);
  await second.loadSavedGame();
  assert.deepEqual(await second.startNewGame(), { ok: false, reason: 'needsConfirmation' });
  assert.ok(await store.load(), 'sin confirmar no se borra nada');
  assert.deepEqual(await second.startNewGame({ confirmed: true }), { ok: true });
  assert.equal(await store.load(), null);
  assert.equal(second.inventory.get('niche').status, PIECE_STATUS.PENDING);
});

test('un fallo al guardar no deshace lo hecho y se avisa una sola vez (005/FR-018)', async () => {
  const session = newSession(new FailingStore());
  session.inventory.approve('niche', { content: SAMPLE_TEXT.niche, origin: 'ai', now: NOW });
  assert.deepEqual(await session.saveNow(), { ok: false, warn: true });
  assert.deepEqual(await session.saveNow(), { ok: false, warn: false });
  assert.equal(session.inventory.get('niche').content, SAMPLE_TEXT.niche);
});

test('datos ilegibles o de otra versión se informan y no se borran (005/FR-018)', async () => {
  const unreadable = new MemoryProgressStore();
  unreadable.load = async () => ({ error: 'unreadable' });
  assert.deepEqual(await newSession(unreadable).loadSavedGame(), { status: 'unreadable' });

  const other = new MemoryProgressStore();
  other.load = async () => ({ error: 'otherVersion' });
  assert.deepEqual(await newSession(other).loadSavedGame(), { status: 'otherVersion' });
});

test('una partida que no encaja con el contenido se trata como ilegible', async () => {
  const store = new MemoryProgressStore();
  await store.save({ version: 1, inventory: [{ id: 'otraPieza' }], worlds: [], gates: [], playerContext: {}, resume: null });
  const session = newSession(store);
  assert.deepEqual(await session.loadSavedGame(), { status: 'unreadable' });
  assert.equal(session.inventory.list().length, 5);
});

test.todo('aprobar una pieza guarda la partida (T037)');
test.todo('aceptar una observación y cerrar un mundo guardan la partida (T060)');
test.todo('getGuidePrompt guarda antes de devolver la pregunta, con el punto de retorno en esa puerta (T086)');
