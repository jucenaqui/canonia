// T083: modo guía en el adaptador (005/FR-007, FR-008; contracts/puertos.md, "Modo guía").

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { guidePrompt, readGuideAnswer } from '../../src/adapters/ai/guide.js';
import { validateOptions } from '../../src/adapters/ai/validate.js';
import { NICHE_OPTIONS, chatAnswer } from '../fixtures/gate-fixture.js';

const REQUEST = {
  gateId: 'niche',
  instruction: 'Propón tres nichos distintos.',
  approvedPieces: { incomeSource: 'Enlaces de afiliado' },
  playerContext: { interests: ['cocina', 'plantas', 'viajes'] },
  exclude: ['Música para estudiar'],
  fixedChoices: null,
  extrasWanted: ['publicLabel'],
};

test('la pregunta incluye instrucción, piezas, intereses, exclusiones y formato', () => {
  const { ok, text } = guidePrompt('options', REQUEST);
  assert.equal(ok, true);
  for (const part of ['Propón tres nichos distintos.', 'Enlaces de afiliado', 'cocina, plantas, viajes', 'Música para estudiar', '"recommended"', 'publicLabel', '```json']) {
    assert.ok(text.includes(part), `falta: ${part}`);
  }
  assert.ok(text.length < 4000, 'corta, para copiar en el teléfono');
});

test('lee el bloque con texto alrededor y entre marcas de código', () => {
  const result = readGuideAnswer('options', REQUEST, chatAnswer(NICHE_OPTIONS));
  assert.equal(result.ok, true);
  assert.equal(result.options.length, 3);
});

test('acepta comillas tipográficas', () => {
  const curly = JSON.stringify(NICHE_OPTIONS).replaceAll('"', '“');
  const result = readGuideAnswer('options', REQUEST, `Listo: ${curly}`);
  assert.equal(result.ok, true);
});

test('rechaza con badAnswer lo que no cumple, sin lanzar', () => {
  for (const raw of ['', 'No sé qué decirte', '[{"text": "solo una", "recommended": false}]', null, undefined, 42]) {
    assert.deepEqual(readGuideAnswer('options', REQUEST, raw), { ok: false, reason: 'badAnswer' });
  }
});

test('una respuesta válida da el mismo resultado que la operación directa con el mismo contenido', () => {
  const guided = readGuideAnswer('options', REQUEST, chatAnswer(NICHE_OPTIONS));
  const direct = validateOptions(NICHE_OPTIONS, { exclude: REQUEST.exclude, extrasWanted: REQUEST.extrasWanted });
  assert.deepEqual(guided, direct);
});

test('respeta las exclusiones de la puerta', () => {
  const result = readGuideAnswer('options', { ...REQUEST, exclude: ['Plantas en balcones'] }, chatAnswer(NICHE_OPTIONS));
  assert.deepEqual(result.options.map((o) => o.text), ['Cocina casera rápida', 'Escapadas de un día']);
});
