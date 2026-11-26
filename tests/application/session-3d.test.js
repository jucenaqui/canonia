// T010: la sesión guarda y recupera lo nuevo del mundo 3D (plan 006): chispas, consejos
// desbloqueados, minijuegos hechos y confianza. Las piezas "por revisar" ya se guardan en el
// inventario; aquí se comprueba que sobreviven a la recarga junto con lo demás.

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

test('una partida nueva empieza sin chispas, sin consejos, sin minijuegos y con confianza 60', () => {
  const session = newSession();
  assert.deepEqual(session.world3d, { sparks: 0, tipsUnlocked: [], minigamesDone: [], zonesPresented: [], trust: 60 });
});

test('chispas, consejos, minijuegos y confianza sobreviven a una recarga', async () => {
  const store = new MemoryProgressStore();
  const first = newSession(store);
  first.world3d.sparks = 7;
  first.world3d.tipsUnlocked.push('tip-hooks');
  first.world3d.minigamesDone.push('incomeSource:ugc');
  first.world3d.trust = 45;
  await first.saveNow();

  const second = newSession(store);
  assert.deepEqual(await second.loadSavedGame(), { status: 'found' });
  second.continueSavedGame();
  assert.deepEqual(second.world3d, { sparks: 7, tipsUnlocked: ['tip-hooks'], minigamesDone: ['incomeSource:ugc'], zonesPresented: [], trust: 45 });
});

test('markZonePresented guarda sin duplicados y sobrevive a una recarga', async () => {
  const store = new MemoryProgressStore();
  const first = newSession(store);
  assert.deepEqual(await first.markZonePresented('incomeSource'), { ok: true });
  await first.markZonePresented('incomeSource');
  await first.markZonePresented('niche');
  assert.deepEqual(first.world3d.zonesPresented, ['incomeSource', 'niche']);

  const second = newSession(store);
  await second.loadSavedGame();
  second.continueSavedGame();
  assert.deepEqual(second.world3d.zonesPresented, ['incomeSource', 'niche']);
});

test('zonesPresented inválido o ausente se lee como vacío y no hace ilegible la partida', async () => {
  for (const value of ['no', [1, 2], undefined]) {
    const store = new MemoryProgressStore();
    const saved = newSession(store).toSavedGame();
    saved.world3d.zonesPresented = value;
    await store.save(saved);
    const session = newSession(store);
    assert.deepEqual(await session.loadSavedGame(), { status: 'found' });
    session.continueSavedGame();
    assert.deepEqual(session.world3d.zonesPresented, []);
  }
});

test('las piezas por revisar siguen por revisar tras una recarga', async () => {
  const store = new MemoryProgressStore();
  const first = newSession(store);
  first.inventory.approve('incomeSource', { content: SAMPLE_TEXT.incomeSource, origin: 'catalog', now: NOW });
  first.inventory.approve('niche', { content: SAMPLE_TEXT.niche, origin: 'ai', now: NOW });
  first.inventory.approve('incomeSource', { content: 'Marketing de afiliados', origin: 'catalog', now: NOW });
  assert.equal(first.inventory.get('niche').status, PIECE_STATUS.NEEDS_REVIEW);
  await first.saveNow();

  const second = newSession(store);
  await second.loadSavedGame();
  second.continueSavedGame();
  assert.equal(second.inventory.get('niche').status, PIECE_STATUS.NEEDS_REVIEW);
  assert.equal(second.inventory.get('niche').content, SAMPLE_TEXT.niche);
  assert.equal(second.inventory.get('incomeSource').origin, 'catalog');
});

test('una partida guardada antes del mundo 3D se abre con los valores de partida', async () => {
  const store = new MemoryProgressStore();
  const old = newSession(store).toSavedGame();
  delete old.world3d;
  await store.save(old);
  const session = newSession(store);
  assert.deepEqual(await session.loadSavedGame(), { status: 'found' });
  session.continueSavedGame();
  assert.deepEqual(session.world3d, { sparks: 0, tipsUnlocked: [], minigamesDone: [], zonesPresented: [], trust: 60 });
});

test('datos del mundo 3D con forma inválida hacen la partida ilegible, sin romper nada', async () => {
  const store = new MemoryProgressStore();
  const bad = newSession(store).toSavedGame();
  bad.world3d = { sparks: -3, tipsUnlocked: 'no', minigamesDone: [], trust: 500 };
  await store.save(bad);
  const session = newSession(store);
  assert.deepEqual(await session.loadSavedGame(), { status: 'unreadable' });
  assert.equal(session.world3d.sparks, 0);
});

test('empezar de nuevo borra lo del mundo 3D', async () => {
  const session = newSession();
  session.world3d.sparks = 4;
  await session.startNewGame();
  assert.equal(session.world3d.sparks, 0);
});
