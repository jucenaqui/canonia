// Minijuego de suscripciones (T030): vista. La lógica está en subscriptions-logic.js (máquina de estados pura).
// API: start({ container, texts?, example: 0|1, onFinish({ lessonId, trustDelta, summary }), onExit() }) → { destroy() }
// No aprueba nada: solo informa con onFinish.
import { createSubscriptions } from './subscriptions-logic.js';
import { mountMinigame } from './view.js';

export function start(options) {
  return mountMinigame({ ...options, accent: 'subscriptions', gameKey: 'subscriptions', create: createSubscriptions });
}
