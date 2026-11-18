// T084: flujo del modo guía en la aplicación (005/FR-006 a FR-013, D38).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setupFlows, chatAnswer, NICHE_OPTIONS } from '../fixtures/gate-fixture.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';

function guideSetup() {
  return setupFlows({ ai: createDemoAiAdapter({ mode: 'guide' }) });
}

test('unavailable pasa la sesión a modo guía una sola vez', async () => {
  const { gateFlow, guideFlow, session } = setupFlows({ ai: createDemoAiAdapter({ behavior: 'unavailable' }) });
  assert.equal(guideFlow.aiMode(), 'demo');
  const first = await gateFlow.requestOptions('niche');
  assert.deepEqual(first, { ok: false, reason: 'unavailable', switchedToGuide: true });
  assert.equal(session.aiMode, 'guide');
  assert.equal(guideFlow.takeGuideNotice(), true);
  assert.equal(guideFlow.takeGuideNotice(), false, 'el aviso se muestra una vez');
  const second = await gateFlow.requestOptions('niche');
  assert.deepEqual(second, { ok: false, reason: 'unavailable', guide: true }, 'ya no llama a la IA directa');
});

test('busy y failed no cambian de modo', async () => {
  for (const behavior of ['busy', 'failed']) {
    const { gateFlow, session } = setupFlows({ ai: createDemoAiAdapter({ behavior }) });
    await gateFlow.requestOptions('niche');
    assert.equal(session.aiMode, 'demo');
  }
});

test('en modo guía, pedir opciones no llama a la IA, salvo las opciones fijas ya explicadas', async () => {
  const { gateFlow } = guideSetup();
  assert.deepEqual(await gateFlow.requestOptions('niche'), { ok: false, reason: 'unavailable', guide: true });
  assert.equal((await gateFlow.requestOptions('timeAvailable')).ok, true);
});

test('la pregunta guarda la partida antes de entregarse, con el punto de retorno en la puerta (005/FR-014, FR-016)', async () => {
  const { guideFlow, store } = guideSetup();
  const result = await guideFlow.getGuidePrompt('niche');
  assert.equal(result.ok, true);
  assert.ok(result.text.includes('```json'));
  const saved = await store.load();
  assert.deepEqual(saved.resume, { worldId: 'world-1', screen: 'gate', gateId: 'niche', awaitingGuideAnswer: true });
});

test('una respuesta pegada válida muestra opciones y no aprueba nada (005/FR-008)', async () => {
  const { guideFlow, session } = guideSetup();
  await guideFlow.getGuidePrompt('niche');
  const result = await guideFlow.submitGuideAnswer('niche', chatAnswer(NICHE_OPTIONS));
  assert.equal(result.ok, true);
  assert.equal(result.options.length, 3);
  assert.equal(session.inventory.get('niche').status, 'pending');
  assert.equal(session.gates.get('niche').shownOptions.length, 3);
  assert.equal(session.resume.awaitingGuideAnswer, false);
});

test('una respuesta pegada inválida devuelve badAnswer y no cambia nada (005/FR-009)', async () => {
  const { guideFlow, session } = guideSetup();
  const result = await guideFlow.submitGuideAnswer('niche', 'No entendí la pregunta');
  assert.deepEqual(result, { ok: false, reason: 'badAnswer' });
  assert.equal(session.gates.get('niche').shownOptions.length, 0);
});

test('en modo guía, "recomiéndame" usa la opción ya recomendada sin llamar a la IA (005/FR-010)', async () => {
  let calls = 0;
  const ai = createDemoAiAdapter({ mode: 'guide' });
  const counting = { ...ai, recommend: async (...args) => { calls += 1; return ai.recommend(...args); } };
  const { gateFlow, guideFlow } = setupFlows({ ai: counting });
  const { options } = await guideFlow.submitGuideAnswer('niche', chatAnswer(NICHE_OPTIONS));
  const result = await gateFlow.askRecommendation('niche', options);
  assert.deepEqual(result, { ok: true, index: 0, reason: 'Cotidiano', fromAnswer: true });
  assert.equal(calls, 0);
});

test('en modo guía, la respuesta propia no pide comentario y escribir y salir siguen disponibles (005/FR-010, FR-012)', async () => {
  let calls = 0;
  const ai = createDemoAiAdapter({ mode: 'guide' });
  const counting = { ...ai, commentOnAnswer: async (...args) => { calls += 1; return ai.commentOnAnswer(...args); } };
  const { gateFlow, session, emitted } = setupFlows({ ai: counting });
  const own = await gateFlow.submitOwnAnswer('niche', 'Cocina');
  assert.deepEqual([own.ok, own.comment, calls], [true, null, 0]);
  assert.equal((await gateFlow.approvePiece('niche', { text: 'Cocina', origin: 'player' })).ok, true);
  assert.equal(session.inventory.get('niche').content, 'Cocina');
  gateFlow.closeGate('audience');
  assert.equal(emitted.at(-1).name, 'resumeLevel');
});
