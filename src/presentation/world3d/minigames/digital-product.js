// Minijuego de productos digitales (T029): vista. La lógica está en digital-product-logic.js (máquina de estados pura).
// API: start({ container, texts?, example: 0|1, onFinish({ lessonId, trustDelta, summary }), onExit() }) → { destroy() }
// No aprueba nada: solo informa con onFinish.
import { createDigitalProduct } from './digital-product-logic.js';
import { mountMinigame } from './view.js';

export function start(options) {
  return mountMinigame({ ...options, accent: 'digital', gameKey: 'digital', create: createDigitalProduct });
}
