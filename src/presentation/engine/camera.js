// Cámara (T029): la vista sigue al personaje a lo largo del nivel (001/FR-007).
// El personaje queda algo a la izquierda del centro, para ver lo que viene, y la vista
// no sale de los bordes del nivel.

const LOOK_AHEAD = 0.4;   // fracción del ancho visible a la izquierda del personaje
const SMOOTHING = 10;     // cuánto tarda en alcanzarlo (más alto, más rápido)

export function createCamera() {
  const camera = { x: 0, y: 0 };

  function target(body, level, view) {
    const x = body.x + body.w / 2 - view.width * LOOK_AHEAD;
    const y = body.y + body.h / 2 - view.height * 0.55;
    return {
      x: Math.min(Math.max(x, 0), Math.max(0, level.width - view.width)),
      y: Math.min(Math.max(y, 0), Math.max(0, level.height - view.height)),
    };
  }

  return {
    get x() { return camera.x; },
    get y() { return camera.y; },
    /** Coloca la cámara sobre el personaje sin transición (al empezar o reaparecer). */
    snap(body, level, view) {
      Object.assign(camera, target(body, level, view));
    },
    /** Sigue al personaje con suavidad. */
    follow(body, level, view, dt) {
      const goal = target(body, level, view);
      const k = 1 - Math.exp(-SMOOTHING * dt);
      camera.x += (goal.x - camera.x) * k;
      camera.y += (goal.y - camera.y) * k;
    },
  };
}
