// T017: la distribución del Mundo 1 se puede recorrer (spec 006/FR-011, FR-012).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORLD_1_LAYOUT, boxOf } from '../../src/content/world-1/layout.js';
import { PHYSICS3D } from '../../src/presentation/world3d/physics3d.js';

const pieces = ['incomeSource', 'niche', 'audience', 'timeAvailable', 'goal90Days'];

test('hay una zona por pieza de F01, en el orden de la factoría', () => {
  assert.deepEqual(WORLD_1_LAYOUT.zones.map((z) => z.id), pieces);
});

test('solo el primer puente está abierto al empezar; cada zona abre el siguiente', () => {
  const [first, ...rest] = WORLD_1_LAYOUT.bridges;
  assert.equal(first.opensAfter, null);
  assert.deepEqual(rest.map((b) => b.opensAfter), pieces);
});

test('la sala circular tiene suelo en todo su borde: nadie se cae donde se ve suelo', () => {
  const strips = WORLD_1_LAYOUT.plazaBoxes.map((s) => boxOf(s));
  const r = WORLD_1_LAYOUT.plaza.radius - PHYSICS3D.RADIUS;
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const x = Math.sin(a) * r; const z = Math.cos(a) * r;
    assert.ok(strips.some((b) => x >= b.minX && x <= b.maxX && z >= b.minZ && z <= b.maxZ), `sin suelo en ${(a * 180 / Math.PI).toFixed(0)}°`);
  }
});

test('el personaje aparece sobre la plaza', () => {
  const plaza = boxOf(WORLD_1_LAYOUT.plaza);
  const { x, z } = WORLD_1_LAYOUT.spawn;
  assert.ok(x > plaza.minX && x < plaza.maxX && z > plaza.minZ && z < plaza.maxZ);
});

test('cada puente toca sus dos orillas y, en el sentido del recorrido, las subidas se hacen sin saltar', () => {
  const places = new Map([['plaza', WORLD_1_LAYOUT.plaza], ...WORLD_1_LAYOUT.zones.map((z) => [z.id, z])]);
  let from = 'plaza';
  for (const bridge of WORLD_1_LAYOUT.bridges) {
    const b = boxOf(bridge);
    for (const id of [from, bridge.to]) {
      const p = boxOf(places.get(id));
      const gapX = Math.max(0, p.minX - b.maxX, b.minX - p.maxX);
      const gapZ = Math.max(0, p.minZ - b.maxZ, b.minZ - p.maxZ);
      assert.ok(gapX < PHYSICS3D.RADIUS * 2 && gapZ < PHYSICS3D.RADIUS * 2, `${bridge.to}: hueco con ${id}`);
    }
    // Bajar se puede siempre; subir, solo escalones bajos (spec 006/FR-007).
    assert.ok(bridge.top - places.get(from).top <= PHYSICS3D.STEP_UP, `${bridge.to}: subida al puente`);
    assert.ok(places.get(bridge.to).top - bridge.top <= PHYSICS3D.STEP_UP, `${bridge.to}: subida a la orilla`);
    from = bridge.to;
  }
});
