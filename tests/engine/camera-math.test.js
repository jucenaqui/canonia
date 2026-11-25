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
