// Nivel en juego (T030): tramos, plataformas, puntos seguros y puertas.
// Al tocar una puerta sin resolver, el motor se detiene y avisa con `gateReached`;
// con `resumeLevel` continúa (001/FR-011). El motor nunca aprueba nada (001/FR-012).
// Caer al vacío devuelve al último punto seguro (001/FR-015); corazones y modo de ayuda: T048 a T050.

import { PHYSICS, createBody, advance } from './physics.js';
import { createCheckpoint, createGateMarker, touchesGate, gateWall } from './entities.js';

const T = PHYSICS.TILE;

export const LEVEL_STATE = Object.freeze({
  PLAYING: 'playing',
  AT_GATE: 'atGate',
  ENDED: 'ended',
});

/**
 * Convierte la definición en casillas (src/content) a unidades del motor.
 * @param {object} def
 * @param {number} def.rows Alto del nivel en casillas.
 * @param {number} def.groundRow Fila donde empieza el suelo.
 * @param {[number, number][]} def.ground Tramos de suelo: columnas desde y hasta, incluidas.
 * @param {{ col: number, row: number, width: number }[]} [def.posts] Plataformas que se atraviesan desde abajo.
 * @param {{ col: number, row: number, width: number, height: number }[]} [def.blocks] Bloques sólidos.
 * @param {{ col: number }[]} def.checkpoints
 * @param {{ col: number, gateId: string }[]} def.gates
 * @param {{ col: number }} def.spawn
 * @param {{ col: number }} def.end
 */
export function buildLevel(def) {
  const { rows, groundRow } = def;
  const lastCol = Math.max(...def.ground.map(([, to]) => to), def.end.col);
  const solids = [
    ...def.ground.map(([from, to]) => ({ x: from * T, y: groundRow * T, w: (to - from + 1) * T, h: (rows - groundRow) * T, kind: 'ground' })),
    ...(def.posts ?? []).map((p) => ({ x: p.col * T, y: p.row * T, w: p.width * T, h: T / 2, oneWay: true, kind: 'post' })),
    ...(def.blocks ?? []).map((b) => ({ x: b.col * T, y: b.row * T, w: b.width * T, h: b.height * T, kind: 'block' })),
  ];
  return {
    id: def.id,
    worldId: def.worldId,
    width: (lastCol + 1) * T,
    height: rows * T,
    groundY: groundRow * T,
    deathY: (rows + 2) * T,
    solids,
    spawn: createCheckpoint({ col: def.spawn.col, groundRow }),
    checkpoints: def.checkpoints.map((c) => createCheckpoint({ col: c.col, groundRow })),
    gates: def.gates.map((g) => createGateMarker({ col: g.col, gateId: g.gateId, groundRow })),
    end: { x: def.end.col * T },
  };
}

/**
 * @param {ReturnType<typeof buildLevel>} level
 * @param {{ emit: (name: string, data: object) => void, resolvedGates?: string[] }} options
 */
export function createLevelRuntime(level, { emit, resolvedGates = [] }) {
  for (const gate of level.gates) gate.resolved = resolvedGates.includes(gate.gateId);
  const body = createBody(level.spawn);
  let safePoint = level.spawn;
  let state = LEVEL_STATE.PLAYING;
  let currentGate = null;
  let facing = 1;
  let respawnFlash = 0;

  function solids() {
    return [...level.solids, ...level.gates.filter((g) => !g.resolved).map(gateWall)];
  }

  function placeAt(point) {
    Object.assign(body, { x: point.x, y: point.y, vx: 0, vy: 0, onGround: false, jumpBuffer: 0, accumulator: 0 });
  }

  function respawn() {
    placeAt(safePoint);
    respawnFlash = 0.6;
  }

  return {
    level,
    body,
    get state() { return state; },
    get facing() { return facing; },
    get respawnFlash() { return respawnFlash; },

    /**
     * Sectores del nivel para el dibujo (004/FR-041, T095): el tramo que lleva a cada puerta se
     * enciende al resolverla; el último tramo, cuando todas están resueltas. Solo visual.
     * @returns {{ from: number, to: number, lit: boolean }[]}
     */
    get sectors() {
      const gates = [...level.gates].sort((a, b) => a.x - b.x);
      const result = [];
      let from = 0;
      for (const gate of gates) {
        result.push({ from, to: gate.x + gate.w, lit: gate.resolved });
        from = gate.x + gate.w;
      }
      result.push({ from, to: level.width, lit: gates.every((g) => g.resolved) });
      return result;
    },

    update(input, dt) {
      respawnFlash = Math.max(0, respawnFlash - dt);
      if (state !== LEVEL_STATE.PLAYING) return;
      advance(body, input, solids(), dt);
      if (body.vx > 1) facing = 1;
      else if (body.vx < -1) facing = -1;

      for (const checkpoint of level.checkpoints) {
        if (!checkpoint.reached && body.x >= checkpoint.x && body.onGround) {
          checkpoint.reached = true;
          safePoint = checkpoint;
        }
      }

      const gate = level.gates.find((g) => !g.resolved && touchesGate(body, g));
      if (gate) {
        state = LEVEL_STATE.AT_GATE;
        currentGate = gate;
        body.vx = 0;
        emit('gateReached', { gateId: gate.gateId });
        return;
      }

      if (body.y > level.deathY) respawn();

      if (body.x >= level.end.x) {
        state = LEVEL_STATE.ENDED;
        emit('bossReached', { worldId: level.worldId });
      }
    },

    /** La puerta quedó resuelta o el jugador la cerró: se reanuda (001/FR-011). */
    resumeLevel() {
      if (state !== LEVEL_STATE.AT_GATE) return;
      if (currentGate && !currentGate.resolved) {
        // Sin aprobar, la puerta sigue cerrada: el personaje retrocede para poder volver a tocarla.
        body.x = currentGate.x - body.w - 1.5 * T;
        body.vx = 0;
      }
      currentGate = null;
      state = LEVEL_STATE.PLAYING;
    },

    setGateResolved(gateId) {
      const gate = level.gates.find((g) => g.gateId === gateId);
      if (gate) gate.resolved = true;
    },

    /**
     * Para continuar una partida con una puerta abierta (005/FR-016): el personaje queda ante
     * esa puerta, detenido, como si acabara de tocarla. No emite `gateReached`.
     */
    holdAtGate(gateId) {
      const gate = level.gates.find((g) => g.gateId === gateId);
      if (!gate || gate.resolved) return false;
      this.placeBeforeGate(gateId);
      placeAt({ x: gate.x - body.w, y: gate.y + gate.h - body.h });
      body.onGround = true;
      state = LEVEL_STATE.AT_GATE;
      currentGate = gate;
      return true;
    },

    /** Para continuar una partida: el personaje aparece en el punto seguro anterior a esa puerta. */
    placeBeforeGate(gateId) {
      const gate = level.gates.find((g) => g.gateId === gateId);
      if (!gate) return;
      const before = [level.spawn, ...level.checkpoints].filter((p) => p.x < gate.x).at(-1) ?? level.spawn;
      for (const checkpoint of level.checkpoints) checkpoint.reached = checkpoint.x <= before.x;
      safePoint = before;
      placeAt(before);
    },
  };
}
