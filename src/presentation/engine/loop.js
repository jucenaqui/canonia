// Bucle del juego (T026, T032). Llama a `update` con el tiempo transcurrido y a `render` en cada
// cuadro. La física reparte ese tiempo en pasos fijos (physics.js), así que el juego va a la
// misma velocidad real en un teléfono lento (001/FR-005).
// Se pausa a mano y también solo cuando la página deja de verse (001/FR-031, FR-032).

const MAX_FRAME = 0.25; // un cuadro de más de 250 ms (pestaña dormida) no se simula entero

/**
 * @param {object} options
 * @param {(dt: number) => void} options.update
 * @param {() => void} options.render
 * @param {(reason: 'hidden') => void} [options.onAutoPause]
 * @param {Document} [options.doc]
 */
export function createLoop({ update, render, onAutoPause = () => {}, doc = globalThis.document }) {
  let running = false;
  let paused = false;
  let frameId = 0;
  let last = 0;

  function frame(now) {
    if (!running) return;
    const dt = last ? Math.min((now - last) / 1000, MAX_FRAME) : 0;
    last = now;
    if (!paused) update(dt);
    render();
    frameId = requestAnimationFrame(frame);
  }

  function onVisibility() {
    if (doc.visibilityState === 'hidden' && running && !paused) {
      paused = true;
      onAutoPause('hidden');
    }
  }

  doc?.addEventListener('visibilitychange', onVisibility);

  return {
    start() {
      if (running) return;
      running = true;
      last = 0;
      frameId = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(frameId);
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
      last = 0; // no se cuenta el tiempo pasado en pausa
    },
    get paused() {
      return paused;
    },
    destroy() {
      this.stop();
      doc?.removeEventListener('visibilitychange', onVisibility);
    },
  };
}
