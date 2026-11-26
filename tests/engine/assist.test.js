// T039 (spec 006/FR-032 a FR-036): tres fallos seguidos desde el mismo sitio ofrecen ayuda y ninguna opción
// salta una zona. También el interruptor, "hacerlo más fácil" y la reaparición al recargar (T041).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORLD_1_LAYOUT as L, boxOf } from '../../src/content/world-1/layout.js';
import {
  ASSIST, assistTuning, createAssist, recordFailure, noteProgress, startEasier, tickEasier, isEasier, setAssistEnabled, sameSite,
} from '../../src/presentation/world3d/assist-math.js';
import { areaOf, buildRoute, nextSafeSpot, routeProgress, spawnPoint } from '../../src/presentation/world3d/route-math.js';
import { createBody, advance, hasSolidFooting, PHYSICS3D } from '../../src/presentation/world3d/physics3d.js';

const site = (x, z, area = 'bridge:niche', reason = 'fall') => ({ area, x, z, reason });
const ROUTE = buildRoute(L);
const openAll = () => true;
const openOnly = (...ids) => (to) => ids.includes(to);
const floors = () => [...L.plazaBoxes, ...L.bridges, ...L.zones].map((p) => boxOf(p));

// --- Tres fallos seguidos ---

test('tres fallos seguidos desde el mismo sitio ofrecen ayuda; dos no', () => {
  const state = createAssist();
  assert.equal(recordFailure(state, site(13, -23)).offer, false);
  assert.equal(recordFailure(state, site(13.5, -23.2)).offer, false);
  const third = recordFailure(state, site(12.8, -22.9));
  assert.equal(third.offer, true);
  assert.equal(third.count, ASSIST.FAILS_TO_OFFER);
});

test('un fallo desde otro sitio empieza la cuenta de nuevo', () => {
  const state = createAssist();
  recordFailure(state, site(13, -23));
  recordFailure(state, site(13, -23));
  assert.equal(recordFailure(state, site(26, -11, 'bridge:audience')).offer, false, 'otro puente: cuenta 1');
  assert.equal(recordFailure(state, site(26, -11, 'bridge:audience')).offer, false);
  assert.equal(recordFailure(state, site(26, -11, 'bridge:audience')).offer, true);
});

test('el mismo puente pero lejos (más de 4 m) no es el mismo sitio', () => {
  assert.equal(sameSite(site(26, -13), site(26, -9)), true);
  assert.equal(sameSite(site(26, -14), site(26, -8)), false);
});

test('el dron cuenta: tres empujones en la sala ofrecen ayuda aunque el sitio seguro varíe', () => {
  const state = createAssist();
  recordFailure(state, site(0, 4, 'plaza', 'enemy'));
  recordFailure(state, site(-3, -3, 'plaza', 'enemy'));
  assert.equal(recordFailure(state, site(1, 6, 'plaza', 'enemy')).offer, true);
  assert.equal(sameSite(site(0, 4, 'plaza', 'enemy'), site(9, 4, 'bridge:niche', 'enemy')), false, 'otra área no es el mismo sitio');
});

test('tras la oferta la cuenta vuelve a cero: "seguir intentando" no repite hasta otros tres fallos (FR-036)', () => {
  const state = createAssist();
  for (let i = 0; i < 3; i++) recordFailure(state, site(13, -23));
  assert.equal(state.streak, null);
  assert.equal(recordFailure(state, site(13, -23)).offer, false);
  assert.equal(recordFailure(state, site(13, -23)).offer, false);
  assert.equal(recordFailure(state, site(13, -23)).offer, true);
});

test('si el jugador sigue adelante, la racha se corta: los fallos deben ser seguidos', () => {
  const state = createAssist();
  recordFailure(state, site(13, -23));
  recordFailure(state, site(13, -23));
  noteProgress(state, { area: 'zone:niche', x: 26, z: -23 });
  assert.equal(state.streak, null);
  assert.equal(recordFailure(state, site(13, -23)).offer, false);
});

test('con el interruptor apagado nunca se ofrece ayuda, y apagarlo corta la ayuda en curso (FR-035)', () => {
  const state = createAssist({ enabled: false });
  for (let i = 0; i < 6; i++) assert.equal(recordFailure(state, site(13, -23)).offer, false);
  setAssistEnabled(state, true);
  for (let i = 0; i < 2; i++) recordFailure(state, site(13, -23));
  assert.equal(recordFailure(state, site(13, -23)).offer, true);
  startEasier(state);
  assert.equal(isEasier(state), true);
  setAssistEnabled(state, false);
  assert.equal(isEasier(state), false);
  assert.equal(state.enabled, false);
});

// --- Hacerlo más fácil ---

test('"hacerlo más fácil" dura un rato y luego vuelve todo a lo normal', () => {
  const state = createAssist();
  startEasier(state);
  assert.deepEqual(assistTuning(isEasier(state)), { coyote: ASSIST.COYOTE_TIME, jump: ASSIST.JUMP_SPEED, enemyScale: ASSIST.ENEMY_SPEED_SCALE });
  assert.equal(tickEasier(state, ASSIST.EASIER_SECONDS - 1), false);
  assert.equal(isEasier(state), true);
  assert.equal(tickEasier(state, 2), true, 'avisa en el momento en que termina');
  assert.deepEqual(assistTuning(isEasier(state)), { coyote: null, jump: null, enemyScale: 1 });
  assert.equal(tickEasier(state, 1), false);
});

test('la ayuda da más margen: con más coyote y salto, se cruza un hueco que antes no', () => {
  assert.ok(ASSIST.COYOTE_TIME > PHYSICS3D.COYOTE_TIME);
  assert.ok(ASSIST.JUMP_SPEED > PHYSICS3D.JUMP_SPEED);
  assert.ok(ASSIST.ENEMY_SPEED_SCALE < 1);
  const jumpHeight = (tune) => {
    const boxes = [{ minX: -50, maxX: 50, minZ: -50, maxZ: 50, minY: -1, maxY: 0 }];
    const body = createBody({ x: 0, y: 0, z: 0 });
    body.tune = tune;
    advance(body, { moveX: 0, moveZ: 0, jumpHeld: false, jumpPressed: false }, boxes, 0.1);
    advance(body, { moveX: 0, moveZ: 0, jumpHeld: true, jumpPressed: true }, boxes, 0.01);
    let top = 0;
    for (let t = 0; t < 2; t += 1 / 60) { advance(body, { moveX: 0, moveZ: 0, jumpHeld: true, jumpPressed: false }, boxes, 1 / 60); top = Math.max(top, body.y); }
    return top;
  };
  assert.ok(jumpHeight({ coyote: ASSIST.COYOTE_TIME, jump: ASSIST.JUMP_SPEED }) > jumpHeight(null) + 0.2);
});

test('con coyote largo se puede saltar un poco más tarde tras salir del borde', () => {
  const run = (tune) => {
    const boxes = [{ minX: -10, maxX: 0, minZ: -5, maxZ: 5, minY: -1, maxY: 0 }];
    const body = createBody({ x: -1, y: 0, z: 0 });
    body.tune = tune;
    for (let t = 0; t < 1; t += 1 / 60) {
      advance(body, { moveX: 1, moveZ: 0, jumpHeld: false, jumpPressed: false }, boxes, 1 / 60);
      if (body.x > 0.35) break;
    }
    // Ya fuera del borde: tras 0,15 s sin suelo, un salto.
    for (let t = 0; t < 0.15; t += 1 / 60) advance(body, { moveX: 0.2, moveZ: 0, jumpHeld: false, jumpPressed: false }, boxes, 1 / 60);
    const before = body.vy;
    advance(body, { moveX: 0.2, moveZ: 0, jumpHeld: true, jumpPressed: true }, boxes, 1 / 60);
    return body.vy > before;
  };
  assert.equal(run(null), false, 'sin ayuda ya no hay salto');
  assert.equal(run({ coyote: ASSIST.COYOTE_TIME, jump: null }), true, 'con ayuda todavía salta');
});

// --- Ninguna opción salta una zona ---

test('el camino tiene sitios seguros firmes: de pie ahí no se cae y nada queda en el vacío', () => {
  const boxes = floors();
  assert.ok(ROUTE.length > 20);
  for (const spot of ROUTE) {
    const body = createBody({ x: spot.x, y: spot.y, z: spot.z });
    assert.ok(hasSolidFooting(body, boxes), `${spot.id} no tiene suelo firme alrededor`);
    assert.ok(areaOf(L, spot.x, spot.z) !== null, `${spot.id} está en el vacío`);
  }
  for (let i = 1; i < ROUTE.length; i++) assert.ok(ROUTE[i].s > ROUTE[i - 1].s, 'el camino avanza');
});

test('desde la sala, el siguiente sitio seguro es la salida hacia el primer puente, sin entrar a ninguna zona', () => {
  const next = nextSafeSpot({ route: ROUTE, layout: L, from: { x: 0, z: 6 }, isOpen: openAll });
  assert.equal(next.id, 'exit:plaza');
  assert.equal(next.area, 'plaza');
  assert.ok(next.z < 0 && Math.abs(next.x) < 1, 'por el mismo eje del puente norte');
});

test('en un puente, el siguiente sitio seguro es más adelante en el mismo puente', () => {
  const bridge = L.bridges[1]; // hacia 'niche', de oeste a este
  const next = nextSafeSpot({ route: ROUTE, layout: L, from: { x: bridge.x - 2.8, z: bridge.z }, isOpen: openAll });
  assert.equal(next.area, 'bridge:niche');
  assert.ok(next.x > bridge.x - 2.8, 'hacia adelante');
});

test('al final de un puente NO se ofrece pasar a la zona de destino (otra zona)', () => {
  const bridge = L.bridges[1];
  const next = nextSafeSpot({ route: ROUTE, layout: L, from: { x: bridge.x + 2.6, z: bridge.z }, isOpen: openAll });
  assert.equal(next, null);
});

test('dentro de una zona sin aprobar no hay a dónde llevar al jugador: no se salta la zona', () => {
  const zone = L.zones[0];
  const next = nextSafeSpot({ route: ROUTE, layout: L, from: { x: zone.x, z: zone.z + 3 }, isOpen: openOnly('incomeSource') });
  assert.equal(next, null, 'el puente siguiente sigue cerrado');
});

test('dentro de una zona ya aprobada se puede llevar hasta la salida, nunca más allá ni a otra zona', () => {
  const zone = L.zones[0];
  const next = nextSafeSpot({ route: ROUTE, layout: L, from: { x: zone.x, z: zone.z + 3 }, isOpen: openOnly('incomeSource', 'niche') });
  assert.equal(next.id, 'exit:incomeSource');
  assert.equal(areaOf(L, next.x, next.z), 'zone:incomeSource');
});

test('un puente cerrado nunca es destino', () => {
  const next = nextSafeSpot({ route: ROUTE, layout: L, from: { x: 0, z: 6 }, isOpen: () => false });
  assert.equal(next, null);
});

test('barrido: desde cualquier punto del camino, el destino queda en la misma zona, en un puente abierto o en la sala', () => {
  const boxes = floors();
  const openSets = [openOnly('incomeSource'), openOnly('incomeSource', 'niche'), openAll];
  for (const isOpen of openSets) {
    for (let s = 0; s < ROUTE.at(-1).s; s += 1.3) {
      // Punto del camino a esa distancia.
      const i = ROUTE.findIndex((p) => p.s >= s);
      const a = ROUTE[Math.max(0, i - 1)]; const b = ROUTE[i];
      const t = b.s > a.s ? (s - a.s) / (b.s - a.s) : 0;
      const from = { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t };
      const area = areaOf(L, from.x, from.z);
      const next = nextSafeSpot({ route: ROUTE, layout: L, from, isOpen });
      if (!next) continue;
      assert.ok(routeProgress(ROUTE, next.x, next.z) > routeProgress(ROUTE, from.x, from.z), 'solo hacia adelante');
      assert.ok(!next.area.startsWith('zone:') || next.area === area, `entra a otra zona desde ${area}: ${next.area}`);
      const body = createBody({ x: next.x, y: next.y, z: next.z });
      assert.ok(hasSolidFooting(body, boxes), `${next.id} sin suelo firme`);
    }
  }
});

// --- Reaparecer al recargar (T041) ---

test('al recargar: sin punto guardado o en la sala, vuelve a la sala', () => {
  const plaza = spawnPoint({ layout: L, resume: null, isOpen: openAll });
  assert.deepEqual([plaza.x, plaza.y, plaza.z, plaza.area], [L.spawn.x, L.spawn.y, L.spawn.z, 'plaza']);
  assert.equal(spawnPoint({ layout: L, resume: { screen: 'map', gateId: null }, isOpen: openAll }).area, 'plaza');
});

test('al recargar: con una zona en curso vuelve a su entrada, dentro de la zona y con suelo firme', () => {
  const boxes = floors();
  for (const zone of L.zones) {
    const p = spawnPoint({ layout: L, resume: { screen: 'gate', gateId: zone.id }, isOpen: openAll });
    assert.equal(p.area, `zone:${zone.id}`);
    assert.equal(areaOf(L, p.x, p.z), `zone:${zone.id}`);
    assert.ok(hasSolidFooting(createBody(p), boxes), `${zone.id}: entrada sin suelo firme`);
    assert.equal(p.y, zone.top);
  }
});

test('al recargar: si el puente de esa zona no está abierto, vuelve a la sala', () => {
  const p = spawnPoint({ layout: L, resume: { screen: 'gate', gateId: 'audience' }, isOpen: openOnly('incomeSource') });
  assert.equal(p.area, 'plaza');
  assert.equal(spawnPoint({ layout: L, resume: { screen: 'gate', gateId: 'noExiste' }, isOpen: openAll }).area, 'plaza');
});

test('areaOf distingue la sala, los puentes, las zonas y el vacío', () => {
  assert.equal(areaOf(L, 0, 0), 'plaza');
  assert.equal(areaOf(L, 0, -23), 'zone:incomeSource');
  assert.equal(areaOf(L, 13, -23), 'bridge:niche');
  assert.equal(areaOf(L, 80, 80), null);
});
