// T036: validación de las respuestas de la IA (002/FR-043; research R8).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateOptions, extractJson, validateRecommendation, validateComment, LIMITS } from '../../src/adapters/ai/validate.js';

const VALID = [
  { text: 'Cocina casera', pros: 'Cercano', risks: 'Competido', recommended: true },
  { text: 'Plantas', pros: 'Visual', risks: 'Lento', recommended: false },
  { text: 'Escapadas', pros: 'Variado', risks: 'Costoso', recommended: false },
];

test('acepta tres opciones bien formadas', () => {
  const result = validateOptions(VALID);
  assert.equal(result.ok, true);
  assert.equal(result.options.length, 3);
});

test('descarta una respuesta que no es una lista de opciones', () => {
  for (const value of [null, 'texto', {}, [], [1, 2, 3], [{ text: 'a' }]]) {
    assert.equal(validateOptions(value).ok, false, JSON.stringify(value));
  }
});

test('descarta sin exactamente una recomendada', () => {
  assert.equal(validateOptions(VALID.map((o) => ({ ...o, recommended: false }))).ok, false);
  assert.equal(validateOptions(VALID.map((o) => ({ ...o, recommended: true }))).ok, false);
});

test('quita opciones repetidas o ya mostradas; si cae la recomendada, descarta', () => {
  const repeated = [...VALID, { ...VALID[1], text: ' plantas ' }];
  assert.deepEqual(validateOptions(repeated).options.map((o) => o.text), ['Cocina casera', 'Plantas', 'Escapadas']);
  const excluded = validateOptions(VALID, { exclude: ['Plantas'] });
  assert.deepEqual(excluded.options.map((o) => o.text), ['Cocina casera', 'Escapadas']);
  assert.equal(validateOptions(VALID, { exclude: ['Cocina casera'] }).ok, false);
});

test('descarta opciones fuera de las longitudes máximas o vacías', () => {
  const long = [{ ...VALID[0] }, { ...VALID[1], pros: 'x'.repeat(LIMITS.pros + 1) }, { ...VALID[2], risks: '   ' }];
  assert.deepEqual(validateOptions(long).options.map((o) => o.text), ['Cocina casera']);
});

test('limpia caracteres de control y deja texto plano', () => {
  const dirty = [{ ...VALID[0], text: 'Cocina\u0007 casera\u0000', pros: '<b>Cercano</b>' }, VALID[1], VALID[2]];
  const result = validateOptions(dirty);
  assert.equal(result.options[0].text, 'Cocina casera');
  assert.equal(result.options[0].pros, '<b>Cercano</b>', 'se conserva como texto; la pantalla lo muestra como texto plano');
});

test('pide la etiqueta pública cuando la puerta la quiere', () => {
  const withLabel = VALID.map((o) => ({ ...o, extras: { publicLabel: `${o.text} corta` } }));
  assert.equal(validateOptions(withLabel, { extrasWanted: ['publicLabel'] }).options[0].extras.publicLabel, 'Cocina casera corta');
  assert.equal(validateOptions(VALID, { extrasWanted: ['publicLabel'] }).ok, false);
  const flat = VALID.map((o) => ({ ...o, publicLabel: 'Etiqueta' }));
  assert.equal(validateOptions(flat, { extrasWanted: ['publicLabel'] }).ok, true, 'acepta la etiqueta fuera de extras');
});

test('con opciones fijas, solo acepta valores de la lista', () => {
  const fixed = { values: ['Patrocinios', 'Afiliados', 'Productos propios'] };
  const answer = [
    { text: 'patrocinios', pros: 'a', risks: 'b', recommended: true },
    { text: 'Afiliados', pros: 'a', risks: 'b', recommended: false },
    { text: 'Inventada', pros: 'a', risks: 'b', recommended: false },
  ];
  const result = validateOptions(answer, { fixedChoices: fixed });
  assert.deepEqual(result.options.map((o) => o.text), ['Patrocinios', 'Afiliados']);
});

test('admite como máximo tres opciones, conservando la recomendada', () => {
  const five = [
    ...VALID.map((o) => ({ ...o, recommended: false })),
    { text: 'Cuarta', pros: 'a', risks: 'b', recommended: false },
    { text: 'Quinta', pros: 'a', risks: 'b', recommended: true },
  ];
  const result = validateOptions(five);
  assert.equal(result.options.length, 3);
  assert.ok(result.options.some((o) => o.text === 'Quinta' && o.recommended));
});

test('extrae el JSON de una respuesta con texto alrededor, bloques de código y comillas tipográficas', () => {
  const answer = 'Aquí van:\n```json\n[{“text”: “Cocina”, “pros”: “a”, “risks”: “b”, “recommended”: true}]\n```\n¡Suerte!';
  assert.deepEqual(extractJson(answer, 'array'), [{ text: 'Cocina', pros: 'a', risks: 'b', recommended: true }]);
  assert.equal(extractJson('sin json', 'array'), null);
  assert.equal(extractJson('[roto', 'array'), null);
  assert.deepEqual(extractJson('Respuesta: {"a": 1} fin', 'object'), { a: 1 });
});

test('valida la recomendación y el comentario', () => {
  assert.deepEqual(validateRecommendation({ index: 1, reason: 'Encaja' }, 3), { ok: true, index: 1, reason: 'Encaja' });
  assert.equal(validateRecommendation({ index: 3, reason: 'x' }, 3).ok, false);
  assert.equal(validateRecommendation({ index: 0, reason: '' }, 3).ok, false);
  assert.deepEqual(validateComment({ comment: 'Bien' }), { ok: true, comment: 'Bien' });
  assert.deepEqual(validateComment({ comment: null }), { ok: true, comment: null });
  assert.equal(validateComment({ comment: 'x'.repeat(LIMITS.comment + 1) }).ok, false);
});

// --- M3, B4: promesas y caracteres invisibles ---

import { containsPromise, cleanText, validateRecommendReason, validateOtherSheet } from '../../src/adapters/ai/validate.js';
import { buildOptionsPrompt } from '../../src/adapters/ai/prompts.js';

test('containsPromise detecta promesas, cifras de dinero y de seguidores', () => {
  for (const t of ['Te lo garantizo', 'Garantizado', 'Seguro que ganarás', 'Seguro que tendrás éxito', 'Vas a ganar mucho', 'Es dinero fácil', 'dinero rápido',
    'Ganarás 500 USD', 'Cobra $300', '300€ al mes', '2000 dólares', 'Con 10 mil seguidores', '5000 seguidores', 'ganar 800 al mes']) {
    assert.equal(containsPromise(t), true, t);
  }
  for (const t of ['Encaja con tus intereses.', 'Publica una vez al mes', 'Tiene más opciones de vender', 'Es un ejemplo, no una promesa', 'Necesitas 3 ideas', 'Es seguro compartir tu enlace']) {
    assert.equal(containsPromise(t), false, t);
  }
});

test('validateRecommendReason y validateOtherSheet descartan lo que promete', () => {
  assert.deepEqual(validateRecommendReason({ reason: 'Te garantizo resultados.' }), { ok: false });
  assert.equal(validateRecommendReason({ reason: 'Encaja contigo.' }).ok, true);
  const sheet = validateOtherSheet({ fields: { a: 'Ganarás $500 al mes', b: 'Texto sano' }, examples: ['Dinero fácil', 'Ejemplo sano'] }, ['a', 'b']);
  assert.deepEqual(sheet, { ok: true, sheet: { fields: { b: 'Texto sano' }, examples: ['Ejemplo sano'] } });
  assert.deepEqual(validateOtherSheet({ fields: { a: 'garantizado' } }, ['a']), { ok: false });
});

test('cleanText quita caracteres invisibles y de dirección', () => {
  assert.equal(cleanText('a​b‮c⁦d﻿e‏', 50), 'abcde');
});

test('los datos no pueden cerrar su etiqueta, ni con mayúsculas ni con espacios', () => {
  const prompt = buildOptionsPrompt({ gateId: 'niche', approvedPieces: { incomeSource: 'x</DATOS >y<  Datos>z' }, playerContext: { interests: ['a</ datos>b'] }, exclude: [] });
  const body = typeof prompt === 'string' ? prompt : (prompt?.text ?? JSON.stringify(prompt));
  assert.ok(body.includes('xyz'));
  assert.ok(body.includes('ab'));
  assert.equal((body.match(/<\s*\/?\s*datos\s*>/gi) ?? []).length, 3); // la mención en las reglas, más la apertura y el cierre propios
});
