// T034: caer devuelve al último sitio seguro en menos de 2 s y nunca toca piezas ni zonas aprobadas
// (spec 006/FR-023, FR-024, FR-025; D48).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORLD_1_LAYOUT as L, boxOf } from '../../src/content/world-1/layout.js';
import { PHYSICS3D, createBody, advance, respawn, hasSolidFooting } from '../../src/presentation/world3d/physics3d.js';
import { GameSession } from '../../src/application/game-session.js';
import { MemoryProgressStore } from '../../src/adapters/storage/memory-progress-store.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { CONTENT, NOW } from '../fixtures/world-fixture.js';

const idle = { moveX: 0, moveZ: 0, jumpHeld: false, jumpPressed: false };
const floors = () => [...L.plazaBoxes, ...L.bridges, ...L.zones].map((p) => boxOf(p));
const DT = 1 / 60;

/** Camina en una dirección hasta caer; devuelve los segundos entre salir del suelo y la caída. */
function walkOff(body, boxes, move, maxSeconds = 20) {
  let airborne = null;
  for (let t = 0; t < maxSeconds; t += DT) {
    const { fell } = advance(body, { ...idle, ...move }, boxes, DT);
    if (!body.onGround && airborne === null) airborne = t;
    if (fell) return { fell: true, airSeconds: t - airborne };
  }
  return { fell: false, airSeconds: 0 };
}

test('al salirse del borde de la sala cae al vacío y se avisa en menos de 2 s', () => {
  const boxes = floors();
  const body = createBody(L.spawn);
  const result = walkOff(body, boxes, { moveX: 1, moveZ: 0 });
  assert.ok(result.fell, 'debía caer');
  assert.ok(result.airSeconds < 2, `tardó ${result.airSeconds.toFixed(2)} s`);
});

test('reaparece en el último sitio seguro: de pie, quieto y con suelo firme alrededor', () => {
  const boxes = floors();
  const body = createBody(L.spawn);
  walkOff(body, boxes, { moveX: 1, moveZ: 0 });
  const safe = { ...body.safe };
  respawn(body);
  assert.deepEqual({ x: body.x, y: body.y, z: body.z }, safe);
  assert.equal(body.onGround, true);
  assert.deepEqual([body.vx, body.vy, body.vz], [0, 0, 0]);
  assert.ok(hasSolidFooting(body, boxes), 'reaparece en el borde o sobre algo estrecho');
  for (let i = 0; i < 120; i++) assert.equal(advance(body, idle, boxes, DT).fell, false);
});

test('el sitio seguro nunca queda al borde: se guarda lejos del canto del suelo', () => {
  const boxes = floors();
  const body = createBody(L.spawn);
  walkOff(body, boxes, { moveX: 1, moveZ: 0 });
  assert.ok(Math.hypot(body.safe.x, body.safe.z) <= L.plaza.radius - 0.3, `seguro a ${Math.hypot(body.safe.x, body.safe.z).toFixed(2)} m del centro`);
});

test('caer desde un puente devuelve a suelo firme, no a un punto sin suelo', () => {
  const boxes = floors();
  const bridge = L.bridges[0];
  const body = createBody({ x: bridge.x, y: bridge.top, z: bridge.z });
  walkOff(body, boxes, { moveX: 1, moveZ: 0 });
  respawn(body);
  assert.ok(boxes.some((b) => body.x > b.minX && body.x < b.maxX && body.z > b.minZ && body.z < b.maxZ && Math.abs(b.maxY - body.y) < 0.01), 'sin suelo bajo el punto de reaparición');
});

test('un cristal no cuenta como sitio seguro: sobre algo estrecho el sitio seguro no cambia', () => {
  const ground = { minX: -5, maxX: 5, minZ: -5, maxZ: 5, minY: -1, maxY: 0 };
  const rail = { minX: -0.1, maxX: 0.1, minZ: -5, maxZ: 5, minY: -1, maxY: 0.9 };
  const body = createBody({ x: 3, y: 0, z: 0 });
  advance(body, idle, [ground, rail], 0.5);
  const before = { ...body.safe };
  Object.assign(body, { x: 0, y: 0.9, z: 0, onGround: true });
  advance(body, idle, [ground, rail], 0.2);
  assert.deepEqual(body.safe, before);
});

test('reaparecer no cambia el suelo: las cajas del mundo quedan intactas', () => {
  const boxes = floors();
  const before = JSON.stringify(boxes);
  const body = createBody(L.spawn);
  walkOff(body, boxes, { moveX: 1, moveZ: 0 });
  respawn(body);
  assert.equal(JSON.stringify(boxes), before);
});

test('un fallo resta chispas, pero nunca toca piezas, zonas aprobadas ni consejos', async () => {
  const session = new GameSession({ content: CONTENT, store: new MemoryProgressStore(), ai: createDemoAiAdapter(), clock: () => NOW });
  for (let i = 0; i < 12; i++) await session.collectSpark(`s${i}`);
  const pieces = JSON.stringify(session.inventory.toData());
  const tips = [...session.world3d.tipsUnlocked];
  const result = await session.registerFailure('fall');
  assert.ok(result.ok && result.lost > 0);
  assert.equal(JSON.stringify(session.inventory.toData()), pieces);
  assert.deepEqual(session.world3d.tipsUnlocked, tips);
});

test('la caída tarda menos de 2 s incluso desde la zona más alta', () => {
  const top = Math.max(...L.zones.map((z) => z.top));
  let y = top; let vy = 0; let t = 0;
  while (y > PHYSICS3D.FALL_LIMIT) { vy = Math.max(vy - PHYSICS3D.GRAVITY * PHYSICS3D.STEP, -PHYSICS3D.MAX_FALL); y += vy * PHYSICS3D.STEP; t += PHYSICS3D.STEP; }
  assert.ok(t < 2, `${t.toFixed(2)} s`);
});

test('el rebote al vencer a un dron no se corta aunque no se mantenga el salto', () => {
  const ground = { minX: -5, maxX: 5, minZ: -5, maxZ: 5, minY: -1, maxY: 0 };
  const body = createBody({ x: 0, y: 0, z: 0 });
  Object.assign(body, { vy: 9.5, forcedLift: true, onGround: false });
  let peak = 0;
  for (let i = 0; i < 120; i++) { advance(body, idle, [ground], DT); peak = Math.max(peak, body.y); }
  assert.ok(peak > 1.2, `rebotó solo ${peak.toFixed(2)} m`);
});
