// T025: el contenido de la zona de fuente de ingreso sigue el diseño y las reglas de la factoría.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INCOME_ZONE, incomeOption } from '../../src/content/world-1/zone-income.js';

test('tiene las cinco opciones de F01, en orden, con id único', () => {
  assert.deepEqual(INCOME_ZONE.options.map((o) => o.id), ['ugc', 'affiliate', 'digital', 'subscriptions', 'sponsorships']);
  assert.deepEqual(INCOME_ZONE.options.map((o) => o.name), [
    'UGC AI para marcas', 'Marketing de afiliados', 'Productos digitales', 'Suscripciones o contenido exclusivo', 'Patrocinios y colaboraciones',
  ]);
  assert.equal(INCOME_ZONE.zoneId, 'incomeSource');
});

test('cada ficha trae todos sus campos y dos ejemplos', () => {
  for (const option of INCOME_ZONE.options) {
    for (const field of INCOME_ZONE.sheetFields) assert.ok(option.sheet[field.key]?.length > 5, `${option.id}: falta ${field.key}`);
    assert.equal(option.examples.length, 2, `${option.id}: dos ejemplos`);
    assert.ok(option.play.lessonId && option.play.title && option.play.learns, `${option.id}: datos del juego`);
  }
  assert.equal(new Set(INCOME_ZONE.options.map((o) => o.play.lessonId)).size, 5);
});

test('la ficha liviana: lo esencial es qué es, cómo entra el dinero y para quién conviene; el resto va en "Ver más" (D60)', () => {
  assert.deepEqual(INCOME_ZONE.sheetEssential, ['what', 'money', 'fit']);
  const keys = INCOME_ZONE.sheetFields.map((f) => f.key);
  for (const key of INCOME_ZONE.sheetEssential) assert.ok(keys.includes(key));
  assert.ok(keys.length > INCOME_ZONE.sheetEssential.length, 'hay campos para "Ver más"');
});

test('los criterios coinciden con la tabla del diseño', () => {
  const rows = Object.fromEntries(INCOME_ZONE.options.map((o) => [o.id, [o.criteria.speed, o.criteria.audience, o.criteria.effort, o.criteria.growth]]));
  assert.deepEqual(rows, {
    ugc: [3, 1, 2, 2], affiliate: [3, 2, 1, 2], digital: [1, 2, 3, 3], subscriptions: [1, 3, 2, 3], sponsorships: [1, 3, 1, 2],
  });
  for (const key of INCOME_ZONE.criteriaKeys) for (const o of INCOME_ZONE.options) assert.ok([1, 2, 3].includes(o.criteria[key.key]));
});

test('la pregunta jugada tiene dos respuestas con pesos por criterio', () => {
  const { answers } = INCOME_ZONE.recommend;
  assert.deepEqual(answers.map((a) => a.id), ['asap', 'canWait']);
  for (const a of answers) for (const key of INCOME_ZONE.criteriaKeys) assert.equal(typeof a.weights[key.key], 'number');
});

test('con los pesos, "lo antes posible" favorece UGC o afiliados y "puedo esperar" productos o suscripciones', () => {
  const score = (option, answer) => INCOME_ZONE.criteriaKeys.reduce((sum, c) => sum + answer.weights[c.key] * option.criteria[c.key], 0);
  const best = (id) => INCOME_ZONE.options.map((o) => [o, score(o, INCOME_ZONE.recommend.answers.find((a) => a.id === id))]).sort((a, b) => b[1] - a[1])[0][0].id;
  assert.ok(['ugc', 'affiliate'].includes(best('asap')));
  assert.ok(['digital', 'subscriptions'].includes(best('canWait')));
});

test('ningún texto promete dinero ni garantiza resultados', () => {
  const text = JSON.stringify(INCOME_ZONE).toLowerCase();
  for (const banned of ['garantizado', 'garantizamos', 'asegurado', 'sin riesgo', 'hazte rico', 'ganarás']) assert.ok(!text.includes(banned), banned);
  assert.ok(INCOME_ZONE.note.includes('No son una promesa'));
});

test('incomeOption busca por id', () => {
  assert.equal(incomeOption('digital').name, 'Productos digitales');
  assert.equal(incomeOption('nada'), null);
});
