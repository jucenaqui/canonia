// Pantalla de carga del mundo 3D: qué modelos son imprescindibles y cuándo se puede jugar (sin DOM).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORLD_1_LAYOUT } from '../../src/content/world-1/layout.js';
import { ESSENTIAL_MODELS, requiredModels, loadProgress, createLoadGate } from '../../src/presentation/world3d/loading.js';

test('los imprescindibles son el protagonista, PIX, la sala y las máquinas de la zona; no los de fondo', () => {
  const required = requiredModels(WORLD_1_LAYOUT);
  for (const name of ['heroe-correr', 'pix', 'plataforma', 'reactor', 'maquina-ugc', 'maquina-recomendar', 'terminal']) assert.ok(required.includes(name), name);
  for (const name of ['visitante-a', 'visitante-b', 'jardinera', 'portal']) assert.ok(!required.includes(name), name);
  assert.equal(new Set(required).size, required.length);
});

test('requiredModels puede limitarse a una zona y tolera un layout sin objetos', () => {
  assert.deepEqual(requiredModels({}), [...ESSENTIAL_MODELS]);
  assert.deepEqual(requiredModels(WORLD_1_LAYOUT, { zoneIds: ['niche'] }), [...ESSENTIAL_MODELS]);
});

test('loadProgress cuenta solo los imprescindibles, hayan llegado o fallado', () => {
  const required = ['a', 'b', 'c', 'd'];
  assert.deepEqual(loadProgress(required, ['a', 'visitante-a']), { done: 1, total: 4, percent: 25, ready: false });
  assert.equal(loadProgress(required, ['a', 'b', 'c', 'd']).ready, true);
  assert.equal(loadProgress([], []).ready, true);
});

test('la puerta se abre al terminar el último imprescindible', async () => {
  const seen = [];
  const gate = createLoadGate({ required: ['a', 'b'], onProgress: (p) => seen.push(p.percent) });
  gate.settle('x'); gate.settle('a');
  assert.equal(gate.isReleased, false);
  gate.settle('b');
  assert.equal(await gate.released, 'ready');
  assert.deepEqual(seen, [0, 50, 100]);
  assert.equal(gate.reason, 'ready');
});

test('la puerta se abre sola por tiempo si algo se queda sin llegar', async () => {
  const gate = createLoadGate({ required: ['a'], timeoutMs: 10 });
  assert.equal(await gate.released, 'timeout');
  gate.settle('a'); // tarde: no cambia nada
  assert.equal(gate.reason, 'timeout');
});

test('lista, esperando entrar: la pantalla no se quita hasta que el jugador entra', async () => {
  const gate = createLoadGate({ required: ['a'] });
  assert.equal(gate.enter(), false); // aún cargando: tocar no hace nada
  assert.equal(gate.isEntered, false);
  gate.settle('a');
  assert.equal(await gate.released, 'ready');
  assert.equal(gate.isReleased, true);
  assert.equal(gate.isEntered, false); // lista, pero esperando el toque
  let entered = false;
  gate.entered.then(() => { entered = true; });
  await Promise.resolve();
  assert.equal(entered, false);
  assert.equal(gate.enter(), true);
  assert.equal(await gate.entered, 'ready');
  assert.equal(gate.isEntered, true);
  assert.equal(gate.enter(), false); // un segundo toque no repite
});

test('si se agota el tiempo también espera el toque para entrar', async () => {
  const gate = createLoadGate({ required: ['a'], timeoutMs: 10 });
  assert.equal(await gate.released, 'timeout');
  assert.equal(gate.isEntered, false);
  assert.equal(gate.enter(), true);
  assert.equal(await gate.entered, 'timeout');
});
