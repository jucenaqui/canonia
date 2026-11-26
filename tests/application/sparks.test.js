// T037: chispas y consejos de PIX (D48, D49). Escritas antes que el código.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameSession } from '../../src/application/game-session.js';
import { createSparkFlow, SPARKS_PER_TIP, FAIL_LOSS_PERCENT } from '../../src/application/spark-flow.js';
import { createEventBus } from '../../src/application/events.js';
import { MemoryProgressStore } from '../../src/adapters/storage/memory-progress-store.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { WORLD3D_EVENTS } from '../../src/application/events.js';
import { CONTENT, NOW } from '../fixtures/world-fixture.js';

function newSession(store = new MemoryProgressStore()) {
  return new GameSession({ content: CONTENT, store, ai: createDemoAiAdapter(), clock: () => NOW });
}
async function collect(session, n, from = 0) {
  let last;
  for (let i = from; i < from + n; i++) last = await session.collectSpark(`s${i}`);
  return last;
}

test('constantes: un consejo cada 10 chispas y 25 % por fallo', () => {
  assert.equal(SPARKS_PER_TIP, 10);
  assert.equal(FAIL_LOSS_PERCENT, 25);
});

test('collectSpark suma una chispa y no desbloquea consejo antes de 10', async () => {
  const s = newSession();
  assert.deepEqual(await s.collectSpark('a'), { ok: true, sparks: 1, tipUnlocked: null, duplicate: false });
  assert.equal(s.world3d.sparks, 1);
});

test('el mismo sparkId solo cuenta una vez', async () => {
  const s = newSession();
  await s.collectSpark('a');
  assert.deepEqual(await s.collectSpark('a'), { ok: true, sparks: 1, tipUnlocked: null, duplicate: true });
});

test('id inválido se rechaza', async () => {
  const s = newSession();
  assert.deepEqual(await s.collectSpark(''), { ok: false, reason: 'invalidSpark' });
  assert.deepEqual(await s.collectSpark(null), { ok: false, reason: 'invalidSpark' });
  assert.equal(s.world3d.sparks, 0);
});

test('la chispa 10 desbloquea el consejo 0 y la 20 el 1', async () => {
  const s = newSession();
  const r9 = await collect(s, 9);
  assert.equal(r9.tipUnlocked, null);
  const r10 = await s.collectSpark('s9');
  assert.equal(r10.tipUnlocked, 0);
  assert.equal(r10.sparks, 10);
  assert.equal(s.world3d.tipsUnlocked.length, 1);
  const r20 = await collect(s, 10, 10);
  assert.equal(r20.tipUnlocked, 1);
  assert.equal(s.world3d.tipsUnlocked.length, 2);
});

test('registerFailure pierde el 25 % redondeado hacia abajo', async () => {
  const s = newSession();
  await collect(s, 9);
  assert.deepEqual(await s.registerFailure('fall'), { ok: true, sparks: 7, lost: 2 });
  assert.deepEqual(await s.registerFailure('enemy'), { ok: true, sparks: 6, lost: 1 });
});

test('con 0 a 3 chispas el fallo no quita nada (nunca todas)', async () => {
  const s = newSession();
  assert.deepEqual(await s.registerFailure('fall'), { ok: true, sparks: 0, lost: 0 });
  await collect(s, 3);
  assert.deepEqual(await s.registerFailure('fall'), { ok: true, sparks: 3, lost: 0 });
});

test('un fallo nunca quita consejos ya desbloqueados ni toca piezas', async () => {
  const s = newSession();
  await collect(s, 10);
  const before = JSON.stringify(s.inventory.toData());
  await s.registerFailure('fall');
  await s.registerFailure('fall');
  assert.equal(s.world3d.tipsUnlocked.length, 1);
  assert.equal(JSON.stringify(s.inventory.toData()), before);
});

test('recuperar chispas tras perderlas no repite un consejo ya desbloqueado', async () => {
  const s = newSession();
  await collect(s, 10);
  await s.registerFailure('fall'); // 10 -> 8
  const r = await collect(s, 2, 10); // 10 recogidas nuevas... 12 acumuladas
  assert.equal(r.tipUnlocked, null);
  assert.equal(s.world3d.tipsUnlocked.length, 1);
  const r20 = await collect(s, 8, 12); // 20 acumuladas
  assert.equal(r20.tipUnlocked, 1);
});

test('registerFailure con motivo inválido se rechaza', async () => {
  const s = newSession();
  assert.deepEqual(await s.registerFailure('otra'), { ok: false, reason: 'invalidReason' });
});

test('chispas recogidas, ids y consejos sobreviven a la recarga; no reaparecen', async () => {
  const store = new MemoryProgressStore();
  const a = newSession(store);
  await collect(a, 10);
  await a.registerFailure('fall');
  const b = newSession(store);
  await b.loadSavedGame();
  b.continueSavedGame();
  assert.equal(b.world3d.sparks, 8);
  assert.equal(b.world3d.tipsUnlocked.length, 1);
  assert.deepEqual(await b.collectSpark('s0'), { ok: true, sparks: 8, tipUnlocked: null, duplicate: true });
});

test('una partida guardada sin sparksCollected se lee con lista vacía', async () => {
  const a = newSession();
  a.world3d.sparks = 3;
  const data = a.toSavedGame();
  delete data.world3d.sparksCollected;
  const store = { load: async () => structuredClone(data), save: async () => ({ ok: true }), clear: async () => {} };
  const b = newSession(store);
  await b.loadSavedGame();
  b.continueSavedGame();
  assert.deepEqual(b.world3d.sparksCollected, []);
  assert.equal(b.world3d.sparks, 3);
});

test('spark-flow escucha sparkCollected {sparkId} y playerFailed, sin duplicar efectos', async () => {
  const events = createEventBus();
  const s = newSession();
  createSparkFlow({ session: s, events, autoBind: true });
  events.emit(WORLD3D_EVENTS.SPARK_COLLECTED, { sparkId: 'x' });
  events.emit(WORLD3D_EVENTS.SPARK_COLLECTED, { sparkId: 'x' });
  events.emit(WORLD3D_EVENTS.SPARK_COLLECTED, {});
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(s.world3d.sparks, 1);
  const bare = newSession();
  createSparkFlow({ session: bare, events: createEventBus(), autoBind: false });
  assert.equal(bare.world3d.sparks, 0);
});
