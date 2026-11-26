// Física del personaje en 3D (T014): moverse, saltar, chocar, subir escalones y reaparecer.
// Lleva del motor 2D (engine/physics.js) el paso fijo, el margen al borde y el salto recordado.
// Sin three.js: se prueba en Node (tests/engine/physics3d.test.js).
// Unidades en metros; el eje y crece hacia arriba. Las plataformas son cajas alineadas a los ejes.

import { groundAxes } from './camera-math.js';

export const PHYSICS3D = Object.freeze({
  STEP: 1 / 120,        // segundos por paso fijo
  SPEED: 6.2,           // metros por segundo
  ACCEL: 9.2,           // qué tan rápido alcanza la velocidad pedida (por segundo, exponencial)
  GRAVITY: 30,
  MAX_FALL: 40,
  JUMP_SPEED: 11.5,     // salto máximo ≈ 2,2 m
  JUMP_RELEASE_SPEED: 5,  // al soltar antes, el salto se corta: mínimo ≈ 0,4 m
  COYOTE_TIME: 0.08,    // margen para saltar justo después de salir del borde
  JUMP_BUFFER: 0.1,     // un salto pulsado un poco antes de aterrizar se recuerda
  RADIUS: 0.3,
  HEIGHT: 1.5,
  STEP_UP: 0.35,        // escalón que se sube sin saltar (menos de un cuarto de la altura)
  FALL_LIMIT: -10,      // por debajo de esto se considera caída al vacío
  DEAD_ZONE: 0.15,      // inclinación mínima de la palanca
});

// Distancia al borde que se pide a un sitio seguro (el radio del cuerpo más un margen).
const SAFE_MARGIN = 0.6;

/**
 * @typedef {{ minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number }} Box
 */

/** Crea el cuerpo del personaje de pie en un punto. */
export function createBody({ x, y, z }) {
  return {
    x, y, z, vx: 0, vy: 0, vz: 0, face: Math.PI,
    onGround: false, coyote: 0, jumpBuffer: 0, accumulator: 0, forcedLift: false,
    safe: { x, y, z },
    tune: null, // ayuda (T040): { coyote, jump } mientras dura "hacerlo más fácil"; null = valores normales
  };
}

/**
 * Convierte la palanca (x a la derecha, y hacia abajo, de -1 a 1) en dirección en el suelo,
 * relativa a la cámara (spec 006/FR-001).
 */
export function moveFromStick(stick, yaw) {
  const length = Math.hypot(stick.x, stick.y);
  if (length < PHYSICS3D.DEAD_ZONE) return { moveX: 0, moveZ: 0 };
  const k = Math.min(1, length) / length;
  const { forward, right } = groundAxes(yaw);
  return {
    moveX: (right.x * stick.x - forward.x * stick.y) * k,
    moveZ: (right.z * stick.x - forward.z * stick.y) * k,
  };
}

function overlaps(body, b, y = body.y) {
  const r = PHYSICS3D.RADIUS;
  return body.x + r > b.minX && body.x - r < b.maxX && body.z + r > b.minZ && body.z - r < b.maxZ
    && y + PHYSICS3D.HEIGHT > b.minY && y < b.maxY;
}

function canStepUp(body, b, boxes) {
  if (body.vy > 0 || b.maxY - body.y > PHYSICS3D.STEP_UP) return false;
  return !boxes.some((other) => other !== b && overlaps(body, other, b.maxY + 0.01));
}

function moveAxis(body, boxes, axis, delta) {
  if (delta === 0) return;
  body[axis] += delta;
  for (const b of boxes) {
    if (!overlaps(body, b) || body.y >= b.maxY - 0.05) continue;
    if (canStepUp(body, b, boxes)) { body.y = b.maxY; continue; }
    const r = PHYSICS3D.RADIUS;
    if (axis === 'x') body.x = delta > 0 ? b.minX - r : b.maxX + r;
    else body.z = delta > 0 ? b.minZ - r : b.maxZ + r;
  }
}

function step(body, input, boxes, dt) {
  const blend = 1 - Math.exp(-PHYSICS3D.ACCEL * dt);
  body.vx += (input.moveX * PHYSICS3D.SPEED - body.vx) * blend;
  body.vz += (input.moveZ * PHYSICS3D.SPEED - body.vz) * blend;
  if (Math.hypot(input.moveX, input.moveZ) > 0.1) body.face = Math.atan2(input.moveX, input.moveZ);

  const coyoteTime = body.tune?.coyote ?? PHYSICS3D.COYOTE_TIME;
  body.coyote = body.onGround ? coyoteTime : Math.max(0, body.coyote - dt);
  body.jumpBuffer = Math.max(0, body.jumpBuffer - dt);
  if (body.jumpBuffer > 0 && body.coyote > 0) {
    body.vy = body.tune?.jump ?? PHYSICS3D.JUMP_SPEED;
    body.onGround = false;
    body.coyote = 0;
    body.jumpBuffer = 0;
  }
  // Un rebote al vencer a un dron (forcedLift) no se corta al soltar el botón de salto.
  if (body.vy <= 0) body.forcedLift = false;
  if (!input.jumpHeld && body.vy > PHYSICS3D.JUMP_RELEASE_SPEED && !body.forcedLift) body.vy = PHYSICS3D.JUMP_RELEASE_SPEED;
  body.vy = Math.max(body.vy - PHYSICS3D.GRAVITY * dt, -PHYSICS3D.MAX_FALL);

  moveAxis(body, boxes, 'x', body.vx * dt);
  moveAxis(body, boxes, 'z', body.vz * dt);

  // Vertical: se aterriza por cruce de la cara superior, sin atravesar a ninguna velocidad.
  const prevY = body.y;
  body.y += body.vy * dt;
  body.onGround = false;
  const r = PHYSICS3D.RADIUS;
  for (const b of boxes) {
    const inside = body.x + r > b.minX && body.x - r < b.maxX && body.z + r > b.minZ && body.z - r < b.maxZ;
    if (!inside) continue;
    if (body.vy <= 0 && prevY >= b.maxY - 1e-6 && body.y <= b.maxY) {
      body.y = b.maxY;
      body.vy = 0;
      body.onGround = true;
    } else if (body.vy > 0 && prevY + PHYSICS3D.HEIGHT <= b.minY && body.y + PHYSICS3D.HEIGHT > b.minY) {
      body.y = b.minY - PHYSICS3D.HEIGHT;
      body.vy = 0;
    }
  }
  if (body.onGround && hasSolidFooting(body, boxes)) body.safe = { x: body.x, y: body.y, z: body.z };
}

/**
 * ¿Hay suelo firme alrededor de los pies (a `margin` metros en las cuatro direcciones)? Solo entonces el
 * punto cuenta como sitio seguro (T035): así nunca se reaparece en el borde de un puente ni sobre un cristal.
 * El suelo vecino puede estar un escalón más abajo o a la misma altura.
 */
export function hasSolidFooting(body, boxes, margin = SAFE_MARGIN) {
  const points = [[margin, 0], [-margin, 0], [0, margin], [0, -margin]];
  return points.every(([dx, dz]) => boxes.some((b) => body.x + dx > b.minX && body.x + dx < b.maxX
    && body.z + dz > b.minZ && body.z + dz < b.maxZ
    && b.maxY <= body.y + 0.05 && b.maxY >= body.y - PHYSICS3D.STEP_UP));
}

/**
 * Avanza el cuerpo `elapsed` segundos en pasos fijos.
 * @param {ReturnType<typeof createBody>} body
 * @param {{ moveX: number, moveZ: number, jumpHeld: boolean, jumpPressed: boolean }} input
 * @param {Box[]} boxes
 * @param {number} elapsed
 * @returns {{ fell: boolean }} `fell` es true si cayó al vacío en este avance (spec 006/FR-023).
 */
export function advance(body, input, boxes, elapsed) {
  if (input.jumpPressed) body.jumpBuffer = PHYSICS3D.JUMP_BUFFER;
  body.accumulator += elapsed;
  let fell = false;
  while (body.accumulator >= PHYSICS3D.STEP - 1e-9) {
    step(body, input, boxes, PHYSICS3D.STEP);
    body.accumulator -= PHYSICS3D.STEP;
    if (body.y < PHYSICS3D.FALL_LIMIT) { fell = true; break; }
  }
  if (fell) body.accumulator = 0;
  return { fell };
}

/** Devuelve al personaje al último sitio donde estuvo de pie (spec 006/FR-024). */
export function respawn(body) {
  Object.assign(body, { ...body.safe, vx: 0, vy: 0, vz: 0, onGround: true, coyote: 0, jumpBuffer: 0, accumulator: 0, forcedLift: false });
}
