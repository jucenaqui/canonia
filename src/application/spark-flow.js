// Chispas y fallos del mundo 3D (T037, D48/D49). Conecta de forma opcional los eventos
// `sparkCollected { sparkId }` y `playerFailed { reason }` con la sesión. Sin autoBind no escucha nada.

import { WORLD3D_EVENTS } from './events.js';
export { SPARKS_PER_TIP, FAIL_LOSS_PERCENT } from './game-session.js';

/**
 * @param {object} deps
 * @param {import('./game-session.js').GameSession} deps.session
 * @param {{ on: Function }} deps.events
 * @param {boolean} [deps.autoBind=true]
 * @returns {{ collectSpark: Function, registerFailure: Function, dispose: () => void }}
 */
export function createSparkFlow({ session, events, autoBind = true }) {
  const off = [];
  if (autoBind) {
    const safe = (fn) => (data) => {
      try { Promise.resolve(fn(data ?? {})).catch(() => {}); } catch { /* evento mal formado */ }
    };
    off.push(
      events.on(WORLD3D_EVENTS.SPARK_COLLECTED, safe(({ sparkId }) => session.collectSpark(sparkId))),
      events.on(WORLD3D_EVENTS.PLAYER_FAILED, safe(({ reason }) => session.registerFailure(reason))),
    );
  }
  return {
    collectSpark: (id) => session.collectSpark(id),
    registerFailure: (reason) => session.registerFailure(reason),
    dispose() { off.splice(0).forEach((fn) => typeof fn === 'function' && fn()); },
  };
}
