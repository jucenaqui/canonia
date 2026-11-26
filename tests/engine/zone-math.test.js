// T023: qué zona pisa el personaje y qué objeto tiene a su alcance (sin three.js).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORLD_1_LAYOUT } from '../../src/content/world-1/layout.js';
import { INCOME_ZONE } from '../../src/content/world-1/zone-income.js';
import { es } from '../../src/content/es.js';
import { zoneAt, nearestObject, actionLabel, focusLine, solidBox, ringRadius, reachOf, RING_REACH_MARGIN } from '../../src/presentation/world3d/zone-math.js';

const L = WORLD_1_LAYOUT;
const objects = L.zoneObjects.incomeSource;

test('zoneAt encuentra la zona que se pisa y nada en la sala ni en los puentes', () => {
  assert.equal(zoneAt(L.zones, 0, -23)?.id, 'incomeSource');
  assert.equal(zoneAt(L.zones, 26, -23)?.id, 'niche');
  assert.equal(zoneAt(L.zones, 0, 0), null);
  assert.equal(zoneAt(L.zones, 0, -11.5), null);
});

test('nearestObject elige el más cercano dentro de su alcance y nada si está lejos', () => {
  const ugc = objects.find((o) => o.id === 'ugc');
  assert.equal(nearestObject(objects, ugc.x, ugc.z + 1.5)?.id, 'ugc');
  assert.equal(nearestObject(objects, 0, -20), null);
  const a = objects.find((o) => o.id === 'affiliate'); const d = objects.find((o) => o.id === 'digital');
  assert.equal(nearestObject(objects, a.x + 0.3, a.z + 1)?.id, 'affiliate');
  assert.equal(nearestObject(objects, d.x - 0.3, d.z + 1)?.id, 'digital');
});

test('cada objeto tiene un botón de acción con el nombre de lo que hace y una frase de PIX', () => {
  for (const o of objects) {
    const label = actionLabel(o, INCOME_ZONE, es);
    assert.ok(label && label.length > 3, `${o.id} sin texto de acción`);
    assert.ok(focusLine(o, INCOME_ZONE).length > 10, `${o.id} sin frase de PIX`);
  }
  assert.ok(actionLabel(objects.find((o) => o.id === 'ugc'), INCOME_ZONE, es).includes('UGC AI para marcas'));
});

test('solidBox solo existe para los objetos sólidos y sube de la zona', () => {
  for (const o of objects) {
    const box = solidBox(o, 0.5);
    assert.ok(box && box.maxY > 0.5 && box.minX < o.x && box.maxX > o.x);
  }
  assert.equal(solidBox({ x: 0, z: 0, solid: 0, height: 1 }, 0), null);
});

test('el alcance es el aro de luz más un margen pequeño: a 2,5 m del centro no se enfoca nada', () => {
  for (const o of objects) {
    const reach = reachOf(o);
    assert.equal(reach, ringRadius(o) + RING_REACH_MARGIN);
    assert.ok(reach < 2.0, `${o.id} alcanza demasiado lejos`);
    assert.equal(nearestObject(objects, o.x, o.z + reach - 0.01)?.id, o.id, `${o.id} no se enfoca sobre su aro`);
    assert.equal(nearestObject(objects, o.x, o.z + reach + 0.05), null, `${o.id} se enfoca fuera de su aro`);
    assert.equal(nearestObject(objects, o.x, o.z + 2.5), null, `${o.id} se enfoca a 2,5 m`);
  }
});

test('el avatar, pegado a la caja sólida, siempre queda dentro del alcance', () => {
  for (const o of objects) {
    assert.ok(o.solid + 0.3 <= reachOf(o), `${o.id}: el choque impide llegar al alcance`);
  }
});
