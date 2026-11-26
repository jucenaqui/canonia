// Minijuego de afiliados (T028): vista. La lógica está en affiliate-logic.js (máquina de estados pura).
// API: start({ container, texts?, example: 0|1, onFinish({ lessonId, trustDelta, summary }), onExit() }) → { destroy() }
// No aprueba nada: solo informa con onFinish.
import { createAffiliate } from './affiliate-logic.js';
import { mountMinigame } from './view.js';

export function start(options) {
  return mountMinigame({ ...options, accent: 'affiliate', gameKey: 'affiliate', create: createAffiliate });
}
