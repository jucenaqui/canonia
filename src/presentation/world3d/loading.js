// Pantalla de carga del mundo 3D. La lógica de "ya se puede jugar" es pura (sin DOM ni three.js):
// qué modelos son imprescindibles y cuánto falta. El HTML de la pantalla vive en mundo3d.html.

/** Modelos del protagonista, de PIX y de la sala de PIX Central: sin ellos se verían formas de reserva. */
export const ESSENTIAL_MODELS = Object.freeze([
  'heroe-correr', 'heroe-quieto', 'heroe-saltar', 'pix', 'plataforma', 'reactor', 'capsula', 'nucleo',
]);

/** Tiempo máximo con la pantalla puesta: pasado esto se quita aunque falte algo. */
export const LOADING_TIMEOUT_MS = 25000;

/**
 * Modelos que hay que tener antes de quitar la pantalla: los de la sala y los objetos de las zonas.
 * Los de fondo (visitantes, jardineras, portales) no cuentan.
 * @param {{ zoneObjects?: Record<string, { model?: string }[]> }} layout
 * @param {{ zoneIds?: string[] }} [options] Solo esas zonas (por defecto, todas las que tienen objetos).
 * @returns {string[]}
 */
export function requiredModels(layout, { zoneIds } = {}) {
  const fromZones = Object.entries(layout?.zoneObjects ?? {})
    .filter(([id]) => !zoneIds || zoneIds.includes(id))
    .flatMap(([, objects]) => objects.map((o) => o.model).filter(Boolean));
  return [...new Set([...ESSENTIAL_MODELS, ...fromZones])];
}

/**
 * Avance de la carga. Un modelo cuenta cuando termina, haya llegado o no (si falló, se sigue con su
 * forma de reserva: nunca se bloquea el juego).
 * @param {string[]} required
 * @param {Iterable<string>} settled Modelos que ya terminaron de cargar (bien o mal).
 * @returns {{ done: number, total: number, percent: number, ready: boolean }}
 */
export function loadProgress(required, settled) {
  const done = new Set(settled);
  const finished = required.filter((name) => done.has(name)).length;
  const total = required.length;
  return { done: finished, total, percent: total === 0 ? 100 : Math.floor((finished / total) * 100), ready: finished >= total };
}

/**
 * Puerta de carga: se avisa de cada modelo que termina y de ella sale la promesa `released`, que se
 * cumple cuando los imprescindibles están o cuando pasa el tiempo máximo.
 * @param {{ required: string[], onProgress?: (p: ReturnType<typeof loadProgress>) => void, timeoutMs?: number,
 *   setTimer?: typeof setTimeout, clearTimer?: typeof clearTimeout }} options
 */
export function createLoadGate({ required, onProgress = () => {}, timeoutMs = LOADING_TIMEOUT_MS, setTimer = setTimeout, clearTimer = clearTimeout }) {
  const settled = new Set();
  let done = false;
  let reason = null;
  let finish;
  const released = new Promise((resolve) => { finish = resolve; });
  const release = (why) => {
    if (done) return;
    done = true; reason = why;
    clearTimer(timer);
    finish(why);
  };
  const timer = setTimer(() => release('timeout'), timeoutMs);
  const check = () => {
    const progress = loadProgress(required, settled);
    onProgress(progress);
    if (progress.ready) release('ready');
  };
  if (required.length === 0) queueMicrotask(check);
  return {
    released,
    settle(name) { if (!done) { settled.add(name); check(); } },
    get isReleased() { return done; },
    get reason() { return reason; },
  };
}
