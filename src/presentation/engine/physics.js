// Física del personaje (T027): movimiento, salto variable y colisiones.
// Avanza a paso fijo, independiente de la velocidad de dibujo (001/FR-005): un cuadro largo
// se reparte en varios pasos iguales, y la caída se comprueba por cruce, no por solape,
// así que no atraviesa plataformas aunque el dispositivo vaya muy lento.
// Unidades: la casilla mide TILE unidades; el eje y crece hacia abajo.

export const PHYSICS = Object.freeze({
  TILE: 32,
  STEP: 1 / 120,          // segundos por paso fijo
  RUN_SPEED: 220,         // unidades por segundo
  GROUND_ACCEL: 2400,
  AIR_ACCEL: 1600,
  GRAVITY: 1800,
  MAX_FALL: 900,
  JUMP_SPEED: 640,        // salto máximo ≈ 3,5 casillas
  JUMP_RELEASE_SPEED: 360, // al soltar antes, el salto se corta: mínimo ≈ 1 casilla
  COYOTE_TIME: 0.08,      // margen para saltar justo después de salir del borde
  JUMP_BUFFER: 0.1,       // un salto pulsado un poco antes de aterrizar se recuerda
  BODY_W: 28,
  BODY_H: 40,
});

/** Crea el cuerpo del personaje en una posición (esquina superior izquierda). */
export function createBody({ x, y }) {
  return {
    x, y, w: PHYSICS.BODY_W, h: PHYSICS.BODY_H,
    vx: 0, vy: 0,
    onGround: false,
    coyote: 0,
    jumpBuffer: 0,
    accumulator: 0,
  };
}

function approach(value, target, delta) {
  if (value < target) return Math.min(value + delta, target);
  return Math.max(value - delta, target);
}

function overlapsX(body, solid) {
  return body.x < solid.x + solid.w && body.x + body.w > solid.x;
}

function overlaps(body, solid) {
  return overlapsX(body, solid) && body.y < solid.y + solid.h && body.y + body.h > solid.y;
}

/** Un paso fijo de simulación. */
function step(body, input, solids, dt) {
  // Horizontal: izquierda y derecha a la vez se anulan.
  const direction = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  const accel = body.onGround ? PHYSICS.GROUND_ACCEL : PHYSICS.AIR_ACCEL;
  body.vx = approach(body.vx, direction * PHYSICS.RUN_SPEED, accel * dt);

  // Salto: con margen de borde y recuerdo breve del toque.
  body.coyote = body.onGround ? PHYSICS.COYOTE_TIME : Math.max(0, body.coyote - dt);
  body.jumpBuffer = Math.max(0, body.jumpBuffer - dt);
  if (body.jumpBuffer > 0 && body.coyote > 0) {
    body.vy = -PHYSICS.JUMP_SPEED;
    body.onGround = false;
    body.coyote = 0;
    body.jumpBuffer = 0;
  }
  // Soltar antes corta el salto: altura variable (001/FR-003).
  if (!input.jumpHeld && body.vy < -PHYSICS.JUMP_RELEASE_SPEED) body.vy = -PHYSICS.JUMP_RELEASE_SPEED;

  body.vy = Math.min(body.vy + PHYSICS.GRAVITY * dt, PHYSICS.MAX_FALL);

  // Eje x, contra bloques sólidos.
  body.x += body.vx * dt;
  for (const solid of solids) {
    if (solid.oneWay || !overlaps(body, solid)) continue;
    if (body.vx > 0) body.x = solid.x - body.w;
    else if (body.vx < 0) body.x = solid.x + solid.w;
    body.vx = 0;
  }

  // Eje y: se aterriza por cruce del borde superior (sin atravesar a ninguna velocidad).
  const prevTop = body.y;
  const prevBottom = body.y + body.h;
  body.y += body.vy * dt;
  body.onGround = false;
  for (const solid of solids) {
    if (!overlapsX(body, solid)) continue;
    const bottom = body.y + body.h;
    if (body.vy >= 0 && prevBottom <= solid.y && bottom >= solid.y) {
      body.y = solid.y - body.h;
      body.vy = 0;
      body.onGround = true;
    } else if (!solid.oneWay && body.vy < 0 && prevTop >= solid.y + solid.h && body.y <= solid.y + solid.h) {
      body.y = solid.y + solid.h;
      body.vy = 0;
    }
  }
}

/**
 * Avanza el cuerpo `elapsed` segundos en pasos fijos. El resto se guarda para el siguiente cuadro.
 * @param {ReturnType<typeof createBody>} body
 * @param {{ left: boolean, right: boolean, jumpHeld: boolean, jumpPressed: boolean }} input
 * @param {{ x: number, y: number, w: number, h: number, oneWay?: boolean }[]} solids
 * @param {number} elapsed segundos
 */
export function advance(body, input, solids, elapsed) {
  if (input.jumpPressed) body.jumpBuffer = PHYSICS.JUMP_BUFFER;
  body.accumulator += elapsed;
  while (body.accumulator >= PHYSICS.STEP - 1e-9) {
    step(body, input, solids, PHYSICS.STEP);
    body.accumulator -= PHYSICS.STEP;
  }
}
