// Lógica pura del dron de spam (T036, spec 006/FR-029; D49): recorrido de ida y vuelta, contacto de lado
// o desde arriba, invulnerabilidad del jugador y reaparición. Sin three.js: se prueba en Node.

import { PHYSICS3D } from './physics3d.js';

export const ENEMY = Object.freeze({
  RADIUS: 0.45,          // radio de contacto del dron
  HEIGHT: 1.1,           // alto del dron
  STOMP_TOLERANCE: 0.35, // cuánto por debajo de su techo puede estar el pie y aun así contar como "desde arriba"
  INVULNERABLE: 3,       // segundos sin poder ser empujado otra vez
  RESPAWN: 60,           // el dron vencido reaparece al minuto (D49)
  BOUNCE: 9.5,           // velocidad vertical del rebote al vencerlo
  KNOCK: 9,              // velocidad horizontal del empujón
  KNOCK_UP: 5,           // y un pequeño salto hacia arriba
});

/**
 * Posición del dron sobre un recorrido de ida y vuelta, a velocidad constante, con una pausa en cada extremo.
 * @param {{ x: number, z: number }[]} path al menos dos puntos
 * @param {number} speed metros por segundo
 * @param {number} time segundos de juego
 * @param {number} [pause] segundos de pausa en cada extremo
 * @returns {{ x: number, z: number, dirX: number, dirZ: number }}
 */
export function patrolPosition(path, speed, time, pause = 0.6) {
  const lengths = [];
  let total = 0;
  for (let i = 1; i < path.length; i++) { lengths.push(Math.hypot(path[i].x - path[i - 1].x, path[i].z - path[i - 1].z)); total += lengths[i - 1]; }
  if (total <= 0 || speed <= 0) return { x: path[0].x, z: path[0].z, dirX: 0, dirZ: 1 };
  const leg = total / speed;
  const period = 2 * (leg + pause);
  const phase = ((time % period) + period) % period;
  let forward = true;
  let along;
  if (phase < leg) along = phase * speed;
  else if (phase < leg + pause) along = total;
  else if (phase < 2 * leg + pause) { forward = false; along = total - (phase - leg - pause) * speed; }
  else { forward = false; along = 0; }
  let rest = along;
  for (let i = 0; i < lengths.length; i++) {
    if (rest <= lengths[i] || i === lengths.length - 1) {
      const k = lengths[i] > 0 ? Math.min(1, rest / lengths[i]) : 0;
      const a = path[i]; const b = path[i + 1];
      const sign = forward ? 1 : -1;
      const len = lengths[i] || 1;
      return { x: a.x + (b.x - a.x) * k, z: a.z + (b.z - a.z) * k, dirX: sign * (b.x - a.x) / len, dirZ: sign * (b.z - a.z) / len };
    }
    rest -= lengths[i];
  }
  return { x: path[0].x, z: path[0].z, dirX: 0, dirZ: 1 };
}

/**
 * Qué pasa cuando el personaje y el dron se tocan.
 * @param {{ x: number, y: number, z: number, vy: number }} body
 * @param {{ x: number, y: number, z: number }} enemy `y` es la base del dron
 * @param {number} [prevY] Altura de los pies en el cuadro anterior: con pocos cuadros por segundo el personaje puede
 *   atravesar el techo del dron entre dos cuadros, y aun así cuenta como caerle encima.
 * @returns {'stomp' | 'side' | null} 'stomp' = le cae encima; 'side' = lo toca de lado.
 */
export function classifyContact(body, enemy, prevY = body.y) {
  const reach = PHYSICS3D.RADIUS + ENEMY.RADIUS;
  if (Math.hypot(body.x - enemy.x, body.z - enemy.z) > reach) return null;
  const top = enemy.y + ENEMY.HEIGHT;
  const head = body.y + PHYSICS3D.HEIGHT;
  if (body.y > top + 0.2 || head < enemy.y) return null; // bien por encima o por debajo: sin contacto
  if (body.vy < 0 && Math.max(body.y, prevY) >= top - ENEMY.STOMP_TOLERANCE) return 'stomp';
  return 'side';
}

/** Empujón horizontal lejos del dron; si están en el mismo punto, hacia atrás de su marcha. */
export function knockbackFrom(body, enemy, dir = { dirX: 0, dirZ: 1 }) {
  let dx = body.x - enemy.x; let dz = body.z - enemy.z;
  const length = Math.hypot(dx, dz);
  if (length < 1e-3) { dx = dir.dirZ; dz = -dir.dirX; } else { dx /= length; dz /= length; }
  const norm = Math.hypot(dx, dz) || 1;
  return { vx: (dx / norm) * ENEMY.KNOCK, vz: (dz / norm) * ENEMY.KNOCK, vy: ENEMY.KNOCK_UP };
}

/** Estado de un dron: vivo, o vencido con su cuenta atrás para reaparecer. */
export function createEnemyState(respawnSeconds = ENEMY.RESPAWN) {
  return { alive: true, respawnIn: 0, respawnSeconds };
}
export function defeatEnemy(state) { state.alive = false; state.respawnIn = state.respawnSeconds; }
/** Avanza el tiempo; devuelve true en el cuadro en que el dron reaparece. */
export function tickEnemy(state, dt) {
  if (state.alive) return false;
  state.respawnIn = Math.max(0, state.respawnIn - dt);
  if (state.respawnIn > 0) return false;
  state.alive = true;
  return true;
}

/** Invulnerabilidad del jugador tras un empujón. */
export function createInvulnerability() { return { left: 0 }; }
export function startInvulnerability(inv, seconds = ENEMY.INVULNERABLE) { inv.left = seconds; }
export function tickInvulnerability(inv, dt) { inv.left = Math.max(0, inv.left - dt); }
export const isInvulnerable = (inv) => inv.left > 0;

/**
 * Resuelve un cuadro: qué ocurre entre el jugador y un dron.
 * Vencerlo se puede siempre; el empujón no cuenta mientras el jugador es invulnerable.
 * @returns {'stomp' | 'side' | null}
 */
export function resolveEnemyContact({ body, enemy, state, invulnerability, prevY = body.y }) {
  if (!state.alive) return null;
  const contact = classifyContact(body, enemy, prevY);
  if (contact === 'side' && isInvulnerable(invulnerability)) return null;
  return contact;
}
