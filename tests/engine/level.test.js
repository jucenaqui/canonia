// T030: el nivel se detiene en una puerta, continúa al indicarlo y devuelve al punto seguro al caer.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildLevel, createLevelRuntime, LEVEL_STATE } from '../../src/presentation/engine/level.js';
import { PHYSICS } from '../../src/presentation/engine/physics.js';

const T = PHYSICS.TILE;
const DEF = {
  id: 'l', worldId: 'w', rows: 13, groundRow: 10,
  spawn: { col: 1 },
  ground: [[0, 40]],
  posts: [{ col: 9, row: 8, width: 5 }],
  checkpoints: [{ col: 15 }],
  gates: [{ col: 25, gateId: 'g1' }],
  end: { col: 38 },
};

const RIGHT = { left: false, right: true, jumpHeld: false, jumpPressed: false };
const IDLE = { left: false, right: false, jumpHeld: false, jumpPressed: false };

function setup(options = {}) {
  const events = [];
  const runtime = createLevelRuntime(buildLevel(DEF), { emit: (name, data) => events.push({ name, data }), ...options });
  return { runtime, events };
}

function walk(runtime, seconds, input = RIGHT) {
  for (let i = 0; i < seconds * 60; i++) runtime.update(input, 1 / 60);
}

test('al tocar una puerta sin resolver, se detiene y avisa una vez (001/FR-011)', () => {
  const { runtime, events } = setup();
  walk(runtime, 10);
  assert.equal(runtime.state, LEVEL_STATE.AT_GATE);
  assert.deepEqual(events, [{ name: 'gateReached', data: { gateId: 'g1' } }]);
  const x = runtime.body.x;
  walk(runtime, 1);
  assert.equal(runtime.body.x, x, 'detenido mientras la puerta está abierta');
});

test('cerrada sin aprobar, el personaje retrocede y puede volver a tocarla (002/FR-025)', () => {
  const { runtime, events } = setup();
  walk(runtime, 10);
  runtime.resumeLevel();
  assert.equal(runtime.state, LEVEL_STATE.PLAYING);
  assert.ok(runtime.body.x + runtime.body.w < 25 * T - T, 'retrocedió');
  walk(runtime, 3);
  assert.equal(events.filter((e) => e.name === 'gateReached').length, 2);
});

test('resuelta, se puede pasar y se llega al final del tramo', () => {
  const { runtime, events } = setup();
  walk(runtime, 10);
  runtime.setGateResolved('g1');
  runtime.resumeLevel();
  walk(runtime, 10);
  assert.equal(runtime.state, LEVEL_STATE.ENDED);
  assert.deepEqual(events.at(-1), { name: 'bossReached', data: { worldId: 'w' } });
});

test('una puerta ya resuelta no detiene el nivel (001/FR-019)', () => {
  const { runtime, events } = setup({ resolvedGates: ['g1'] });
  walk(runtime, 12);
  assert.equal(events.some((e) => e.name === 'gateReached'), false);
});

test('caer al vacío devuelve al último punto seguro (001/FR-015)', () => {
  const runtime = createLevelRuntime(buildLevel({
    ...DEF, ground: [[0, 5], [9, 40]], posts: [], checkpoints: [{ col: 3 }],
  }), { emit: () => {} });
  // Camina a la derecha, pasa el punto seguro de la columna 3 y cae en el hueco de las columnas 6 a 8.
  for (let i = 0; i < 600 && runtime.respawnFlash === 0; i++) runtime.update(RIGHT, 1 / 60);
  assert.ok(runtime.respawnFlash > 0, 'reapareció');
  const checkpoint = runtime.level.checkpoints[0];
  assert.equal(runtime.body.x, checkpoint.x);
  assert.ok(Math.abs(runtime.body.y - checkpoint.y) < 1);
});

test('los sectores se encienden con las puertas resueltas, sin tocar nada más (004/FR-041, T095)', () => {
  const twoGates = { ...DEF, gates: [{ col: 15, gateId: 'g1' }, { col: 28, gateId: 'g2' }] };
  const runtime = createLevelRuntime(buildLevel(twoGates), { emit: () => {} });
  assert.deepEqual(runtime.sectors.map((s) => s.lit), [false, false, false]);
  assert.equal(runtime.sectors[0].from, 0);
  assert.equal(runtime.sectors.at(-1).to, runtime.level.width);
  runtime.setGateResolved('g1');
  assert.deepEqual(runtime.sectors.map((s) => s.lit), [true, false, false]);
  runtime.setGateResolved('g2');
  assert.deepEqual(runtime.sectors.map((s) => s.lit), [true, true, true], 'con todas resueltas se enciende el último tramo');
  const resumed = createLevelRuntime(buildLevel(twoGates), { emit: () => {}, resolvedGates: ['g2'] });
  assert.deepEqual(resumed.sectors.map((s) => s.lit), [false, true, false], 'al continuar una partida se ven encendidos los ya resueltos');
});

test('al continuar con una puerta abierta, queda detenido ante ella y se reanuda igual', () => {
  const { runtime, events } = setup();
  assert.equal(runtime.holdAtGate('g1'), true);
  assert.equal(runtime.state, LEVEL_STATE.AT_GATE);
  assert.equal(runtime.body.x + runtime.body.w, 25 * T);
  assert.deepEqual(events, [], 'no vuelve a avisar');
  runtime.setGateResolved('g1');
  runtime.resumeLevel();
  walk(runtime, 3);
  assert.ok(runtime.body.x > 25 * T, 'pasa la puerta');
});

test('al continuar una partida, aparece en el punto seguro anterior a la puerta', () => {
  const { runtime } = setup();
  runtime.placeBeforeGate('g1');
  assert.equal(runtime.body.x, runtime.level.checkpoints[0].x);
});
