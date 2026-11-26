// T012: cálculos de la cámara detrás del personaje (spec 006/FR-006).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cameraTarget, followFactor, groundAxes, CAMERA } from '../../src/presentation/world3d/camera-math.js';

const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);

test('con giro 0 la cámara queda detrás (z mayor) y por encima, mirando al personaje', () => {
  const { position, lookAt } = cameraTarget({ x: 1, y: 2, z: 3 }, 0, 16 / 9);
  close(position.x, 1);
  close(position.z, 3 + CAMERA.distance);
  close(position.y, 2 + CAMERA.height);
  assert.deepEqual(lookAt, { x: 1, y: 2 + CAMERA.lookHeight, z: 3 });
});

test('en una pantalla vertical la cámara se aleja para ver más', () => {
  const wide = cameraTarget({ x: 0, y: 0, z: 0 }, 0, 1.5).position.z;
  const tall = cameraTarget({ x: 0, y: 0, z: 0 }, 0, 0.5).position.z;
  assert.ok(tall > wide);
});

test('la cámara sigue igual de suave a cualquier velocidad de pantalla', () => {
  const twoSmall = 1 - (1 - followFactor(1 / 60)) ** 2;
  close(twoSmall, followFactor(2 / 60));
  assert.equal(followFactor(0), 0);
});

test('"adelante" se aleja de la cámara y "derecha" es perpendicular', () => {
  for (const yaw of [0, 0.7, Math.PI / 2, -2]) {
    const { forward, right } = groundAxes(yaw);
    const cam = cameraTarget({ x: 0, y: 0, z: 0 }, yaw, 1).position;
    assert.ok(forward.x * cam.x + forward.z * cam.z < 0, 'adelante apunta lejos de la cámara');
    close(forward.x * right.x + forward.z * right.z, 0);
  }
});

test('close-up pulls the camera nearer and lower, and 0 leaves it as before (D62)', () => {
  const p = { x: 0, y: 0, z: 0 };
  const normal = cameraTarget(p, 0, 1.5).position;
  assert.deepEqual(cameraTarget(p, 0, 1.5, 0).position, normal);
  const close = cameraTarget(p, 0, 1.5, 1).position;
  assert.ok(close.z < normal.z && close.y < normal.y);
  assert.ok(Math.abs(cameraTarget(p, 0, 1.5, 5).position.z - close.z) < 1e-9);
});

import { PITCH, PITCH_RANGE, clampPitch } from '../../src/presentation/world3d/camera-math.js';

const elevationOf = (player, pitch, closeUp = 0, aspect = 1.5) => {
  const { position, lookAt } = cameraTarget(player, 0, aspect, closeUp, pitch);
  return Math.atan2(position.y - lookAt.y, Math.hypot(position.x - lookAt.x, position.z - lookAt.z));
};

test('pitch 0 deja la cámara como estaba', () => {
  const p = { x: 0, y: 0, z: 0 };
  assert.deepEqual(cameraTarget(p, 0.4, 1.5, 0.3, 0), cameraTarget(p, 0.4, 1.5, 0.3));
});

test('el pitch se limita entre casi a ras del suelo y casi cenital', () => {
  assert.equal(clampPitch(99), PITCH_RANGE.max);
  assert.equal(clampPitch(-99), PITCH_RANGE.min);
  assert.equal(clampPitch(NaN), 0);
  const p = { x: 0, y: 0, z: 0 };
  const top = cameraTarget(p, 0, 1.5, 0, 99).position;
  assert.ok(top.y > 5 && Math.hypot(top.x, top.z) < 4, 'desde arriba, casi sobre el personaje');
  const topDeg = Math.atan2(top.y - 1.3, Math.hypot(top.x, top.z)) * 180 / Math.PI;
  assert.ok(topDeg >= 70 && topDeg <= 75, `vista alta de ${topDeg}°`);
});

test('mirando bajo la cámara nunca atraviesa el suelo y mira hacia arriba', () => {
  for (const y of [0, 3.5]) {
    for (const closeUp of [0, 1]) {
      for (const pitch of [-5, -0.5, -0.2, 0, 0.5, 5]) {
        const { position } = cameraTarget({ x: 0, y, z: 0 }, 0, 0.5, closeUp, pitch);
        assert.ok(position.y >= y + PITCH.minHeightAboveFeet - 1e-9, `y=${position.y}`);
      }
    }
  }
  const low = cameraTarget({ x: 0, y: 0, z: 0 }, 0, 1.5, 0, -5);
  assert.ok(low.lookAt.y > cameraTarget({ x: 0, y: 0, z: 0 }, 0, 1.5).lookAt.y, 'el punto de mira sube');
  assert.ok(low.lookAt.y > low.position.y, 'mira un poco hacia arriba');
});

test('más pitch sube la cámara en cualquier giro y con la presentación de zona', () => {
  for (const closeUp of [0, 1]) {
    assert.ok(elevationOf({ x: 0, y: 0, z: 0 }, 0.3, closeUp) > elevationOf({ x: 0, y: 0, z: 0 }, -0.1, closeUp));
  }
  const a = cameraTarget({ x: 2, y: 0, z: 2 }, 1.2, 1, 0, 0.5).position;
  assert.ok(Math.hypot(a.x - 2, a.z - 2) > 0 && Number.isFinite(a.y));
});
