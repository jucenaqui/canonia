// T025: pruebas de física (001/FR-001, FR-003, FR-004, FR-005). Sin lienzo ni navegador.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createBody, advance, PHYSICS } from '../../src/presentation/engine/physics.js';

const NONE = { left: false, right: false, jumpHeld: false, jumpPressed: false };
const GROUND = { x: -1000, y: 400, w: 4000, h: 64 };

function standing() {
  const body = createBody({ x: 100, y: GROUND.y - 40 });
  advance(body, NONE, [GROUND], 0.2);
  assert.equal(body.onGround, true);
  return body;
}

/** Simula `seconds` a paso de cuadro de 60 Hz con una entrada fija; `jumpPressed` solo el primer cuadro. */
function run(body, input, solids, seconds) {
  const frames = Math.round(seconds * 60);
  let maxRise = 0;
  const startY = body.y;
  for (let i = 0; i < frames; i++) {
    advance(body, { ...input, jumpPressed: i === 0 && input.jumpPressed }, solids, 1 / 60);
    maxRise = Math.max(maxRise, startY - body.y);
  }
  return maxRise;
}

test('avanza a la derecha y a la izquierda, y se detiene al soltar', () => {
  const body = standing();
  const x0 = body.x;
  run(body, { ...NONE, right: true }, [GROUND], 0.5);
  assert.ok(body.x > x0 + 50, 'avanzó a la derecha');
  run(body, NONE, [GROUND], 0.5);
  assert.equal(body.vx, 0, 'se detuvo');
  const x1 = body.x;
  run(body, { ...NONE, left: true }, [GROUND], 0.5);
  assert.ok(body.x < x1 - 50, 'avanzó a la izquierda');
});

test('izquierda y derecha a la vez lo dejan quieto (T028)', () => {
  const body = standing();
  const x0 = body.x;
  run(body, { ...NONE, left: true, right: true }, [GROUND], 0.5);
  assert.equal(body.x, x0);
});

test('el salto varía con el tiempo pulsado, entre un mínimo y un máximo (001/FR-003)', () => {
  const tap = standing();
  const tapRise = run(tap, { ...NONE, jumpPressed: true, jumpHeld: false }, [GROUND], 1.2);
  const hold = standing();
  const holdRise = run(hold, { ...NONE, jumpPressed: true, jumpHeld: true }, [GROUND], 1.2);
  assert.ok(tapRise >= PHYSICS.TILE * 0.9, `salto mínimo de casi una casilla (${tapRise.toFixed(0)})`);
  assert.ok(holdRise > tapRise * 2, `mantener pulsado salta mucho más (${holdRise.toFixed(0)} frente a ${tapRise.toFixed(0)})`);
  assert.ok(holdRise <= PHYSICS.TILE * 4, `salto máximo acotado (${holdRise.toFixed(0)})`);
  assert.equal(hold.onGround, true, 'vuelve a apoyarse');
});

test('sin segundo salto en el aire (001/FR-004)', () => {
  const body = standing();
  advance(body, { ...NONE, jumpPressed: true, jumpHeld: true }, [GROUND], 1 / 60);
  run(body, { ...NONE, jumpHeld: true }, [GROUND], 0.25);
  assert.equal(body.onGround, false);
  const vyBefore = body.vy;
  advance(body, { ...NONE, jumpPressed: true, jumpHeld: true }, [GROUND], 1 / 60);
  assert.ok(body.vy >= vyBefore, 'pulsar en el aire no da otro impulso');
});

test('un salto pulsado justo antes de aterrizar se recuerda un instante (ayuda al principiante)', () => {
  const body = createBody({ x: 100, y: GROUND.y - 40 - 6 });
  body.vy = 300;
  advance(body, { ...NONE, jumpPressed: true, jumpHeld: true }, [GROUND], 1 / 60);
  run(body, { ...NONE, jumpHeld: true }, [GROUND], 0.05);
  assert.ok(body.vy < 0, 'saltó al tocar el suelo');
});

test('se apoya en una plataforma y no la atraviesa al caer', () => {
  const platform = { x: 0, y: 300, w: 200, h: 16, oneWay: true };
  const body = createBody({ x: 80, y: 100 });
  run(body, NONE, [platform, GROUND], 2);
  assert.equal(body.onGround, true);
  assert.equal(body.y + body.h, platform.y);
});

test('no atraviesa plataformas aunque el paso de tiempo sea enorme (001/FR-005)', () => {
  const platform = { x: 0, y: 300, w: 200, h: 16, oneWay: true };
  const body = createBody({ x: 80, y: 100 });
  advance(body, NONE, [platform, GROUND], 3); // un solo cuadro de 3 segundos: dispositivo muy lento
  assert.equal(body.y + body.h, platform.y);
  const fast = createBody({ x: 80, y: -2000 });
  fast.vy = 5000;
  advance(fast, NONE, [platform, GROUND], 4);
  assert.equal(fast.y + fast.h, platform.y, 'a máxima velocidad de caída tampoco');
});

test('las plataformas de una sola cara se atraviesan desde abajo', () => {
  const platform = { x: 0, y: GROUND.y - 80, w: 200, h: 16, oneWay: true };
  const body = standing();
  run(body, { ...NONE, jumpPressed: true, jumpHeld: true }, [platform, GROUND], 1.2);
  assert.equal(body.y + body.h, platform.y, 'subió a través y quedó encima');
});

test('los bloques sólidos frenan de lado y por arriba', () => {
  const wall = { x: 200, y: GROUND.y - 200, w: 32, h: 200 };
  const body = standing();
  run(body, { ...NONE, right: true }, [wall, GROUND], 2);
  assert.equal(body.x + body.w, wall.x, 'se detiene contra la pared');

  const ceiling = { x: -100, y: GROUND.y - 40 - 40, w: 400, h: 16 };
  const under = standing();
  const rise = run(under, { ...NONE, jumpPressed: true, jumpHeld: true }, [ceiling, GROUND], 0.5);
  assert.ok(rise <= 40 - 16 + 1, 'el techo corta el salto');
});

test('la velocidad real es la misma con cuadros cortos o largos (001/FR-005)', () => {
  const a = standing();
  const b = standing();
  for (let i = 0; i < 60; i++) advance(a, { ...NONE, right: true }, [GROUND], 1 / 60);
  for (let i = 0; i < 20; i++) advance(b, { ...NONE, right: true }, [GROUND], 3 / 60);
  assert.ok(Math.abs(a.x - b.x) < 1, `${a.x} frente a ${b.x}`);
});
