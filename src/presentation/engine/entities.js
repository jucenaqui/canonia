// Elementos del nivel (T030): puntos seguros y marcadores de puerta.
// Los enemigos y corazones llegan con T049.

import { PHYSICS } from './physics.js';

const T = PHYSICS.TILE;
export const GATE_HEIGHT_TILES = 3;

/** Punto seguro: dónde reaparece el personaje (001/FR-010). */
export function createCheckpoint({ col, groundRow }) {
  return { x: col * T + (T - PHYSICS.BODY_W) / 2, y: groundRow * T - PHYSICS.BODY_H, reached: false };
}

/** Marcador de una puerta de decisión: mientras no está resuelta, es una pared. */
export function createGateMarker({ col, gateId, groundRow }) {
  return {
    gateId,
    x: col * T,
    y: (groundRow - GATE_HEIGHT_TILES) * T,
    w: T,
    h: GATE_HEIGHT_TILES * T,
    resolved: false,
  };
}

/** El personaje está tocando la puerta por su lado izquierdo. */
export function touchesGate(body, gate) {
  const verticalOverlap = body.y < gate.y + gate.h && body.y + body.h > gate.y;
  return verticalOverlap && body.x + body.w >= gate.x - 0.5 && body.x < gate.x + gate.w;
}

/** Pared que representa una puerta sin resolver. */
export function gateWall(gate) {
  return { x: gate.x, y: gate.y - 4 * T, w: gate.w, h: gate.h + 4 * T };
}
