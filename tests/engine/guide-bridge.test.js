// Modo guía de "Otra" en el 3D (005/FR-006): el puente da al panel de guía la pregunta y lee lo pegado.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setupZoneFlow } from '../fixtures/zone-fixture.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { AI_MODES } from '../../src/application/ports.js';
import { createOtherGuideBridge } from '../../src/presentation/world3d/guide-bridge.js';

async function setup(onSheet) {
  const ai = createDemoAiAdapter({ mode: AI_MODES.GUIDE });
  const { zoneFlow } = setupZoneFlow({ ai });
  const ownText = 'Clases por videollamada';
  const result = await zoneFlow.explainOtherOption('incomeSource', ownText);
  assert.ok(result.guide, 'en modo guía "Otra" devuelve la petición de guía');
  return createOtherGuideBridge({ ai, zoneFlow, zoneId: 'incomeSource', ownText, guide: result.guide, onSheet });
}

test('el puente da la pregunta con lo que escribió el jugador', async () => {
  const bridge = await setup();
  const prompt = await bridge.getGuidePrompt('other');
  assert.equal(prompt.ok, true);
  assert.ok(prompt.text.includes('Clases por videollamada'));
});

test('una respuesta pegada válida entrega la ficha; una mala se rechaza sin avisar a nadie', async () => {
  const sheets = [];
  const bridge = await setup((sheet) => sheets.push(sheet));
  const bad = await bridge.submitGuideAnswer('other', 'no es json');
  assert.deepEqual(bad, { ok: false, reason: 'badAnswer' });
  assert.equal(sheets.length, 0);
  const good = await bridge.submitGuideAnswer('other', '```json\n{"fields":{"what":"Clases en línea.","money":"Pagan por hora."},"examples":["Inglés."]}\n```');
  assert.equal(good.ok, true);
  assert.equal(sheets.length, 1);
  assert.equal(sheets[0].fields.what, 'Clases en línea.');
});

test('sin guidePrompt en el adaptador, el puente falla con un motivo explicable', async () => {
  const bridge = createOtherGuideBridge({ ai: {}, zoneFlow: {}, zoneId: 'x', ownText: 'ab', guide: { kind: 'otherSheet', request: {} } });
  assert.deepEqual(await bridge.getGuidePrompt(), { ok: false, reason: 'failed' });
});
