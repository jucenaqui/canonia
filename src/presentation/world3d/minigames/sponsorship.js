// Minijuego de patrocinios (T031): vista. La lógica está en sponsorship-logic.js (máquina de estados pura).
// API: start({ container, texts?, example: 0|1, onFinish({ lessonId, trustDelta, summary }), onExit() }) → { destroy() }
// No aprueba nada: solo informa con onFinish.
import { createSponsorship } from './sponsorship-logic.js';
import { mountMinigame } from './view.js';

export function start(options) {
  return mountMinigame({ ...options, accent: 'sponsorship', gameKey: 'sponsorship', create: createSponsorship });
}
