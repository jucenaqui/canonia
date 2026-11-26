// T038: chispas repartidas por el mundo (D48) y consejos de PIX.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORLD_1_LAYOUT as L, boxOf } from '../../src/content/world-1/layout.js';
import { TIPS } from '../../src/content/world-1/tips.js';
import { canCollect, visibleSparks, tipText, SPARK } from '../../src/presentation/world3d/spark-math.js';
import { PHYSICS3D } from '../../src/presentation/world3d/physics3d.js';

test('ids únicos y estables, de texto y de hasta 80 caracteres', () => {
  const ids = L.sparks.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.ok(typeof id === 'string' && id.length > 0 && id.length <= 80);
});

test('hay chispas en la plaza, en los puentes y en la zona 1, y bastantes para dos consejos', () => {
  const ids = L.sparks.map((s) => s.id);
  assert.ok(ids.some((id) => id.startsWith('plaza')));
  assert.ok(ids.some((id) => id.startsWith('bridge')));
  assert.ok(ids.some((id) => id.startsWith('income')));
  assert.ok(L.sparks.filter((s) => !s.requiresBridge).length >= 19, 'a diez chispas por consejo');
});

test('cada chispa está sobre un suelo, a una altura que se alcanza caminando o con un salto', () => {
  const floors = [...L.plazaBoxes, ...L.zones, ...L.bridges].map((p) => boxOf(p));
  const maxJump = PHYSICS3D.JUMP_SPEED ** 2 / (2 * PHYSICS3D.GRAVITY);
  for (const s of L.sparks) {
    const under = floors.filter((f) => s.x > f.minX && s.x < f.maxX && s.z > f.minZ && s.z < f.maxZ && f.maxY < s.y);
    assert.ok(under.length > 0, `${s.id} flota sobre el vacío`);
    const rise = s.y - Math.max(...under.map((f) => f.maxY));
    assert.ok(rise >= 0.6 && rise <= maxJump + SPARK.CHEST, `${s.id} a ${rise.toFixed(2)} m del suelo`);
  }
});

test('no hay chispas dentro de los objetos con acción de la zona ni del reactor', () => {
  for (const o of L.zoneObjects.incomeSource) {
    for (const s of L.sparks) assert.ok(Math.hypot(s.x - o.x, s.z - o.z) > (o.solid ?? 0.5) + 0.6, `${s.id} dentro de ${o.id}`);
  }
  for (const s of L.sparks.filter((p) => p.z > -20)) {
    if (Math.abs(s.z) > 10) continue;
    assert.ok(Math.hypot(s.x - L.reactor.x, s.z - L.reactor.z) > L.reactor.size / 2 + 0.5, `${s.id} en el reactor`);
  }
});

test('se recoge caminando cerca, o saltando las altas, no de lejos', () => {
  const low = { x: 0, y: 0.9, z: 0 };
  assert.equal(canCollect({ x: 0.3, y: 0, z: 0 }, low), true);
  assert.equal(canCollect({ x: 2, y: 0, z: 0 }, low), false);
  const high = { x: 0, y: 1.9, z: 0 };
  assert.equal(canCollect({ x: 0, y: 0, z: 0 }, high), false, 'una alta pide saltar');
  assert.equal(canCollect({ x: 0, y: 1.2, z: 0 }, high), true);
});

test('las ya recogidas no se dibujan, y las de un puente cerrado tampoco', () => {
  const sparks = [{ id: 'a' }, { id: 'b' }, { id: 'c', requiresBridge: 'niche' }];
  assert.deepEqual(visibleSparks(sparks, ['a'], new Set()).map((s) => s.id), ['b']);
  assert.deepEqual(visibleSparks(sparks, [], new Set(['niche'])).map((s) => s.id), ['a', 'b', 'c']);
});

test('consejos: al menos seis, cortos, sin cifras ni promesas, y se leen por índice', () => {
  assert.ok(TIPS.length >= 6);
  for (const tip of TIPS) {
    assert.ok(tip.length > 30 && tip.length <= 220, `${tip.length} caracteres`);
    assert.doesNotMatch(tip, /\d/);
    assert.doesNotMatch(tip, /garantiz|seguro que ganas|ganar[áa]s|ingresos? asegurad|millon/i);
  }
  assert.equal(new Set(TIPS).size, TIPS.length);
  assert.equal(tipText(TIPS, 0), TIPS[0]);
  assert.equal(tipText(TIPS, TIPS.length), null);
  assert.equal(tipText(TIPS, null), null);
});
