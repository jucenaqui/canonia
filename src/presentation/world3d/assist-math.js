// Modo de ayuda como lógica pura (T040, spec 006/FR-032 a FR-036): cuenta los fallos seguidos desde el mismo sitio,
// decide cuándo ofrecer ayuda y qué cambia "hacerlo más fácil". Sin three.js ni DOM: se prueba en Node.
// El estado de la ayuda es del motor: no genera eventos hacia la aplicación y nunca toca piezas ni zonas.

export const ASSIST = Object.freeze({
  FAILS_TO_OFFER: 3,        // fallos seguidos desde el mismo sitio
  SAME_SITE_RADIUS: 4,      // metros: dos fallos así de cerca cuentan como el mismo sitio
  EASIER_SECONDS: 90,       // cuánto dura "hacerlo más fácil"
  COYOTE_TIME: 0.2,         // más margen para saltar tras el borde (normal: 0,08)
  JUMP_SPEED: 12.6,         // salto un poco más alto (normal: 11,5)
  ENEMY_SPEED_SCALE: 0.6,   // el dron va más lento
});

/** Valores normales de la física y del dron: lo que vuelve cuando termina la ayuda. */
export const NO_TUNING = Object.freeze({ coyote: null, jump: null, enemyScale: 1 });

/** Cambios de "hacerlo más fácil", o los normales si no está activo. */
export function assistTuning(active) {
  return active ? { coyote: ASSIST.COYOTE_TIME, jump: ASSIST.JUMP_SPEED, enemyScale: ASSIST.ENEMY_SPEED_SCALE } : { ...NO_TUNING };
}

/**
 * @param {{ enabled?: boolean }} [options] `enabled`: si la oferta está activa (interruptor del menú).
 */
export function createAssist({ enabled = true } = {}) {
  return { enabled, streak: null, easierLeft: 0 };
}

/**
 * ¿Es el mismo sitio? Misma zona, puente o sala y, para caídas, a menos de SAME_SITE_RADIUS. El dron patrulla
 * una línea: si alguno de los dos fallos fue por el dron, basta con la misma área.
 * @param {{ area: string | null, x: number, z: number, reason?: string }} a
 * @param {{ area: string | null, x: number, z: number, reason?: string }} b
 */
export function sameSite(a, b) {
  if (a.area !== b.area) return false;
  if (a.reason === 'enemy' || b.reason === 'enemy') return true;
  return Math.hypot(a.x - b.x, a.z - b.z) <= ASSIST.SAME_SITE_RADIUS;
}

/**
 * Anota un fallo. Con el tercero seguido desde el mismo sitio devuelve `offer: true` y la cuenta vuelve a cero:
 * elegir "seguir intentando" no repite la oferta hasta otros tres fallos (FR-036).
 * @param {ReturnType<typeof createAssist>} state
 * @param {{ area: string | null, x: number, z: number, reason?: 'fall' | 'enemy' }} site Sitio seguro desde el que se falló.
 * @returns {{ offer: boolean, count: number }}
 */
export function recordFailure(state, site) {
  if (!state.enabled) { state.streak = null; return { offer: false, count: 0 }; }
  const here = { area: site.area, x: site.x, z: site.z, reason: site.reason };
  if (state.streak && sameSite(state.streak.site, here)) state.streak.count += 1;
  else state.streak = { site: here, count: 1 };
  const count = state.streak.count;
  if (count >= ASSIST.FAILS_TO_OFFER) { state.streak = null; return { offer: true, count }; }
  return { offer: false, count };
}

/**
 * El jugador sigue por otro lado: si ya no está en el sitio de los fallos, la racha se corta
 * (los fallos tienen que ser seguidos, sin avanzar).
 */
export function noteProgress(state, pos) {
  if (state.streak && !sameSite(state.streak.site, { area: pos.area, x: pos.x, z: pos.z, reason: 'fall' })) state.streak = null;
}

/** Enciende "hacerlo más fácil" durante un rato. */
export function startEasier(state, seconds = ASSIST.EASIER_SECONDS) { state.easierLeft = seconds; state.streak = null; }

/** Avanza el tiempo de la ayuda. Devuelve true en el momento en que se acaba. */
export function tickEasier(state, dt) {
  if (state.easierLeft <= 0) return false;
  state.easierLeft = Math.max(0, state.easierLeft - dt);
  return state.easierLeft === 0;
}

export const isEasier = (state) => state.easierLeft > 0;

/** Interruptor del menú: apagarlo corta la oferta pendiente y la ayuda en curso. */
export function setAssistEnabled(state, enabled) {
  state.enabled = Boolean(enabled);
  if (!state.enabled) { state.streak = null; state.easierLeft = 0; }
}
