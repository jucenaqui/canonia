// Minijuego UGC (T027): vista. La lógica está en ugc-logic.js (máquina de estados pura).
// API: start({ container, texts?, example: 0|1, onFinish({ lessonId, trustDelta, summary }), onExit() }) → { destroy() }
// No aprueba nada: solo informa con onFinish.
import { createUgc } from './ugc-logic.js';
import { mountMinigame } from './view.js';

export function start(options) {
  return mountMinigame({ ...options, accent: 'ugc', gameKey: 'ugc', create: createUgc });
}
