// T021: el adaptador de demostración cumple el puerto de IA sin lanzar nunca.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { isAiPort } from '../../src/application/ports.js';

const REQUEST = {
  gateId: 'niche',
  instruction: 'Propón nichos',
  approvedPieces: { incomeSource: 'Patrocinios' },
  playerContext: { interests: ['cocina', 'plantas', 'viajes'] },
  exclude: [],
  fixedChoices: null,
  extrasWanted: ['publicLabel'],
};

test('cumple la forma del puerto', () => {
  assert.ok(isAiPort(createDemoAiAdapter()));
  assert.equal(createDemoAiAdapter().mode, 'demo');
  assert.equal(createDemoAiAdapter({ mode: 'guide' }).mode, 'guide');
});

test('da tres opciones, exactamente una recomendada, con los extras pedidos', async () => {
  const result = await createDemoAiAdapter().proposeOptions(REQUEST);
  assert.equal(result.ok, true);
  assert.equal(result.options.length, 3);
  assert.equal(result.options.filter((o) => o.recommended).length, 1);
  assert.ok(result.options.every((o) => o.text && o.pros && o.risks && o.extras?.publicLabel));
});

test('no repite opciones excluidas', async () => {
  const ai = createDemoAiAdapter();
  const first = await ai.proposeOptions(REQUEST);
  const second = await ai.proposeOptions({ ...REQUEST, exclude: first.options.map((o) => o.text) });
  assert.equal(second.ok, true);
  const texts = new Set(first.options.map((o) => o.text));
  assert.ok(second.options.every((o) => !texts.has(o.text)));
  assert.equal(second.options.filter((o) => o.recommended).length, 1);
});

test('con opciones fijas, elige entre los valores permitidos', async () => {
  const values = ['Patrocinios', 'Afiliados', 'Productos propios', 'Suscripciones'];
  const result = await createDemoAiAdapter().proposeOptions({ ...REQUEST, gateId: 'incomeSource', fixedChoices: { values } });
  assert.equal(result.ok, true);
  assert.ok(result.options.every((o) => values.includes(o.text)));
});

test('comenta, recomienda y revisa', async () => {
  const ai = createDemoAiAdapter();
  assert.equal((await ai.commentOnAnswer({ gateId: 'niche', answer: 'Cocina' })).ok, true);
  const recommendation = await ai.recommend({ gateId: 'niche', options: [{ text: 'a', recommended: false }, { text: 'b', recommended: true }] });
  assert.deepEqual([recommendation.ok, recommendation.index], [true, 1]);
  const review = await ai.reviewWorld({ worldId: 'world-1', criteria: [{ id: 'clarity', description: 'x' }], pieces: { niche: 'a' }, deduce: ['markets'] });
  assert.equal(review.ok, true);
  assert.equal(review.solid[0].criterionId, 'clarity');
  assert.ok(review.deduced.markets);
});

test('simula IA no disponible, ocupada y fallida, sin lanzar', async () => {
  for (const behavior of ['unavailable', 'busy', 'failed']) {
    const ai = createDemoAiAdapter({ behavior });
    for (const call of [
      () => ai.proposeOptions(REQUEST),
      () => ai.commentOnAnswer({}),
      () => ai.recommend({ options: [] }),
      () => ai.reviewWorld({ criteria: [], pieces: {}, deduce: [] }),
    ]) {
      assert.deepEqual(await call(), { ok: false, reason: behavior });
    }
  }
});

test('simula una IA lenta y se puede cancelar', async () => {
  const ai = createDemoAiAdapter({ behavior: 'slow', delayMs: 50 });
  const controller = new AbortController();
  const pending = ai.proposeOptions(REQUEST, { signal: controller.signal });
  controller.abort();
  assert.deepEqual(await pending, { ok: false, reason: 'cancelled' });
  assert.equal((await ai.proposeOptions(REQUEST)).ok, true);
});

test('una petición mal formada no lanza', async () => {
  const result = await createDemoAiAdapter().proposeOptions(undefined);
  assert.equal(result.ok, false);
});
