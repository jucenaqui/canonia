// T013: física 3D (spec 006/FR-001 a FR-003, FR-007, FR-008, FR-024).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PHYSICS3D, createBody, advance, respawn, moveFromStick } from '../../src/presentation/world3d/physics3d.js';

const floor = (top = 0, size = 40) => ({ minX: -size, maxX: size, minZ: -size, maxZ: size, minY: top - 1, maxY: top });
const box = (x, z, w, d, top, h = 1) => ({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, minY: top - h, maxY: top });
const idle = { moveX: 0, moveZ: 0, jumpHeld: false, jumpPressed: false };
const run = (seconds, body, input, boxes) => { for (let t = 0; t < seconds; t += 1 / 60) advance(body, input, boxes, 1 / 60); };

test('avanza en la dirección pedida y se detiene al soltar', () => {
  const body = createBody({ x: 0, y: 0, z: 0 });
  run(1, body, { ...idle, moveX: 1 }, [floor()]);
  assert.ok(body.x > 4, `x=${body.x}`);
  assert.ok(Math.abs(body.z) < 1e-6);
  run(1, body, idle, [floor()]);
  const stopped = body.x;
  run(0.5, body, idle, [floor()]);
  assert.ok(Math.abs(body.x - stopped) < 0.05);
});

test('el movimiento es relativo a la cámara: "adelante" con giro 0 va hacia -z', () => {
  const move = moveFromStick({ x: 0, y: -1 }, 0);
  assert.ok(Math.abs(move.moveX) < 1e-9);
  assert.ok(move.moveZ < -0.99);
  const right = moveFromStick({ x: 1, y: 0 }, Math.PI / 2);
  assert.ok(right.moveZ < -0.99, 'con la cámara girada, "derecha" cambia de eje');
  assert.deepEqual(moveFromStick({ x: 0.05, y: 0.05 }, 0), { moveX: 0, moveZ: 0 });
});

test('salto variable: mantener pulsado salta más alto que tocar', () => {
  const tap = createBody({ x: 0, y: 0, z: 0 });
  const hold = createBody({ x: 0, y: 0, z: 0 });
  advance(tap, { ...idle, jumpPressed: true, jumpHeld: false }, [floor()], 1 / 60);
  advance(hold, { ...idle, jumpPressed: true, jumpHeld: true }, [floor()], 1 / 60);
  let maxTap = 0; let maxHold = 0;
  for (let i = 0; i < 90; i++) {
    advance(tap, idle, [floor()], 1 / 60); maxTap = Math.max(maxTap, tap.y);
    advance(hold, { ...idle, jumpHeld: true }, [floor()], 1 / 60); maxHold = Math.max(maxHold, hold.y);
  }
  assert.ok(maxTap > 0.3, `mínimo ${maxTap}`);
  assert.ok(maxHold > maxTap * 1.8, `${maxHold} vs ${maxTap}`);
  assert.ok(maxHold < 2.5 && maxHold > 1.9, `máximo ${maxHold}`);
});

test('no hay segundo salto en el aire', () => {
  const body = createBody({ x: 0, y: 0, z: 0 });
  advance(body, { ...idle, jumpPressed: true, jumpHeld: true }, [floor()], 1 / 60);
  run(0.3, body, { ...idle, jumpHeld: true }, [floor()]);
  const vyBefore = body.vy;
  advance(body, { ...idle, jumpPressed: true, jumpHeld: true }, [floor()], 1 / 60);
  assert.ok(body.vy <= vyBefore, 'el segundo toque no vuelve a impulsar');
});

test('margen al borde: se puede saltar justo después de salir de una plataforma', () => {
  const ledge = box(0, 0, 2, 2, 0);
  const body = createBody({ x: 0.8, y: 0, z: 0 });
  for (let i = 0; i < 120 && (i < 2 || body.onGround); i++) advance(body, { ...idle, moveX: 1 }, [ledge], 1 / 60);
  assert.equal(body.onGround, false, 'ya salió del borde');
  advance(body, { ...idle, moveX: 1, jumpPressed: true, jumpHeld: true }, [ledge], 1 / 60);
  assert.ok(body.vy > 5, 'el salto todavía cuenta');
});

test('salto recordado: un toque justo antes de aterrizar salta al tocar el suelo', () => {
  const body = createBody({ x: 0, y: 3, z: 0 });
  while (body.y > 0.25) advance(body, idle, [floor()], 1 / 120);
  assert.equal(body.onGround, false);
  let landedJump = false;
  advance(body, { ...idle, jumpPressed: true, jumpHeld: true }, [floor()], 1 / 60);
  for (let i = 0; i < 20; i++) { advance(body, { ...idle, jumpHeld: true }, [floor()], 1 / 60); if (body.vy > 5) landedJump = true; }
  assert.ok(landedJump);
});

test('sube solos los escalones bajos y se detiene ante los altos', () => {
  const low = createBody({ x: 0, y: 0, z: 0 });
  run(0.7, low, { ...idle, moveX: 1 }, [floor(), box(4, 0, 6, 4, 0.3)]);
  assert.ok(low.x > 1.5 && Math.abs(low.y - 0.3) < 1e-6, `bajo: x=${low.x} y=${low.y}`);
  const high = createBody({ x: 0, y: 0, z: 0 });
  run(0.7, high, { ...idle, moveX: 1 }, [floor(), box(4, 0, 6, 4, 1)]);
  assert.ok(high.x < 0.7 + 1e-6, `alto: x=${high.x}`);
  assert.ok(PHYSICS3D.STEP_UP <= PHYSICS3D.HEIGHT / 4 + 1e-9);
});

test('no atraviesa el suelo aunque un cuadro dure mucho', () => {
  const body = createBody({ x: 0, y: 30, z: 0 });
  advance(body, idle, [box(0, 0, 4, 4, 0, 0.2)], 3);
  assert.ok(Math.abs(body.y) < 1e-6 && body.onGround, `y=${body.y}`);
});

test('caer al vacío avisa y reaparece en el último sitio seguro', () => {
  const body = createBody({ x: 0, y: 0, z: 0 });
  const boxes = [box(0, 0, 2, 2, 0)];
  run(0.2, body, idle, boxes);
  const result = { fell: false };
  for (let i = 0; i < 300 && !result.fell; i++) Object.assign(result, advance(body, { ...idle, moveX: 1 }, boxes, 1 / 60));
  assert.equal(result.fell, true);
  respawn(body);
  assert.ok(Math.abs(body.x) <= 1 + 0.3 + 1e-6, `x=${body.x}`);
  assert.ok(body.y === 0 && body.vx === 0 && body.vy === 0);
});
