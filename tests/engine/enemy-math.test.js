// T036: dron de spam (spec 006/FR-029; D49): contacto, invulnerabilidad, reaparición y recorrido.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORLD_1_LAYOUT as L } from '../../src/content/world-1/layout.js';
import {
  ENEMY, patrolPosition, classifyContact, knockbackFrom, createEnemyState, defeatEnemy, tickEnemy,
  createInvulnerability, startInvulnerability, tickInvulnerability, isInvulnerable, resolveEnemyContact,
} from '../../src/presentation/world3d/enemy-math.js';

const enemy = { x: 0, y: 0.4, z: 0 };
const top = enemy.y + ENEMY.HEIGHT;

test('contacto de lado: de pie junto al dron cuenta como empujón', () => {
  assert.equal(classifyContact({ x: 0.5, y: 0.4, z: 0, vy: 0 }, enemy), 'side');
  assert.equal(classifyContact({ x: 0.5, y: 0.6, z: 0, vy: 3 }, enemy), 'side');
});

test('desde arriba: cayéndole encima con los pies a la altura de su techo lo vence', () => {
  assert.equal(classifyContact({ x: 0.1, y: top + 0.05, z: 0, vy: -6 }, enemy), 'stomp');
  assert.equal(classifyContact({ x: 0.3, y: top - 0.2, z: 0, vy: -10 }, enemy), 'stomp');
});

test('con pocos cuadros por segundo, atravesar su techo entre dos cuadros sigue siendo caerle encima', () => {
  assert.equal(classifyContact({ x: 0.1, y: top - 0.6, z: 0, vy: -8 }, enemy), 'side', 'sin cuadro anterior parece de lado');
  assert.equal(classifyContact({ x: 0.1, y: top - 0.6, z: 0, vy: -8 }, enemy, top + 0.3), 'stomp');
});

test('subiendo por encima o lejos no hay contacto', () => {
  assert.equal(classifyContact({ x: 0, y: top + 0.6, z: 0, vy: 4 }, enemy), null);
  assert.equal(classifyContact({ x: 2, y: 0.4, z: 0, vy: 0 }, enemy), null);
  assert.equal(classifyContact({ x: 0, y: -3, z: 0, vy: 0 }, enemy), null);
});

test('si lo toca por el costado cayendo pero bien por debajo del techo, es empujón y no victoria', () => {
  assert.equal(classifyContact({ x: 0.6, y: 0.5, z: 0, vy: -4 }, enemy), 'side');
});

test('el empujón va en sentido contrario al dron y con un saltito', () => {
  const k = knockbackFrom({ x: 1, y: 0.4, z: 0 }, enemy);
  assert.ok(k.vx > 8 && Math.abs(k.vz) < 1e-6 && k.vy === ENEMY.KNOCK_UP);
  const same = knockbackFrom({ x: 0, y: 0.4, z: 0 }, enemy, { dirX: 1, dirZ: 0 });
  assert.ok(Math.hypot(same.vx, same.vz) > 8);
});

test('invulnerabilidad: tras un empujón no hay otro hasta que pasan unos segundos, pero sí se puede vencer', () => {
  const state = createEnemyState();
  const inv = createInvulnerability();
  const side = { x: 0.5, y: 0.4, z: 0, vy: 0 };
  const stomp = { x: 0, y: top, z: 0, vy: -5 };
  assert.equal(resolveEnemyContact({ body: side, enemy, state, invulnerability: inv }), 'side');
  startInvulnerability(inv);
  assert.equal(isInvulnerable(inv), true);
  assert.equal(resolveEnemyContact({ body: side, enemy, state, invulnerability: inv }), null);
  assert.equal(resolveEnemyContact({ body: stomp, enemy, state, invulnerability: inv }), 'stomp');
  tickInvulnerability(inv, ENEMY.INVULNERABLE - 0.1);
  assert.equal(isInvulnerable(inv), true);
  tickInvulnerability(inv, 0.2);
  assert.equal(isInvulnerable(inv), false);
  assert.equal(resolveEnemyContact({ body: side, enemy, state, invulnerability: inv }), 'side');
});

test('vencido, el dron no hace contacto y reaparece al minuto', () => {
  const state = createEnemyState();
  const inv = createInvulnerability();
  defeatEnemy(state);
  assert.equal(state.alive, false);
  assert.equal(resolveEnemyContact({ body: { x: 0.5, y: 0.4, z: 0, vy: 0 }, enemy, state, invulnerability: inv }), null);
  assert.equal(ENEMY.RESPAWN, 60);
  let came = false;
  for (let i = 0; i < 590; i++) came = tickEnemy(state, 0.1) || came;
  assert.equal(state.alive, false, 'todavía no pasó el minuto');
  assert.equal(came, false);
  assert.equal(tickEnemy(state, 1), true);
  assert.equal(state.alive, true);
  assert.equal(tickEnemy(state, 1), false, 'solo avisa en el cuadro en que reaparece');
});

test('el recorrido es de ida y vuelta, con pausas en los extremos', () => {
  const path = [{ x: 0, z: 0 }, { x: 0, z: 10 }];
  assert.equal(patrolPosition(path, 2, 0).z, 0);
  assert.equal(patrolPosition(path, 2, 2.5).z, 5);
  assert.equal(patrolPosition(path, 2, 2.5).dirZ, 1);
  assert.equal(patrolPosition(path, 2, 5.3, 1).z, 10, 'pausa en el extremo');
  const back = patrolPosition(path, 2, 5 + 1 + 2.5, 1);
  assert.equal(back.z, 5);
  assert.equal(back.dirZ, -1);
  assert.equal(patrolPosition(path, 2, 2 * (5 + 1) + 2.5, 1).z, 5, 'se repite');
});

test('el dron de la plaza queda lejos del camino obligatorio y dentro de la sala', () => {
  const spec = L.enemies[0];
  assert.equal(spec.model, 'spam');
  assert.equal(spec.respawnSeconds, 60);
  for (let t = 0; t < 60; t += 0.25) {
    const p = patrolPosition(spec.path, spec.speed, t, spec.pause);
    assert.ok(Math.hypot(p.x, p.z) < L.plaza.radius - 1, 'sale de la sala');
    assert.ok(Math.abs(p.x) - ENEMY.RADIUS >= 3, `a ${Math.abs(p.x).toFixed(1)} m del eje central`);
    assert.ok(Math.hypot(p.x - L.reactor.x, p.z - L.reactor.z) > L.reactor.size / 2 + 1, 'sobre el reactor');
  }
});
