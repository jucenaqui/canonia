// Punto de composición (T024): elige los adaptadores y conecta las capas.
// Es el único archivo que importa de todas las capas (plan.md, "Reglas de dependencia").
//
// Estado de esta entrega en construcción:
// - El adaptador de Claude llega con T040 y el modo guía con T085. Hasta entonces, dentro de
//   Claude se usa la IA de demostración y se registra qué modo correspondería.
// - El contenido del Mundo 1 llega con T065 a T068 y las pantallas desde la Fase 3. Cuando
//   existan, T076 crea aquí la sesión con ese contenido y arranca la presentación.

import { createEventBus } from './application/events.js';
import { AI_MODES, SAVED_GAME_VERSION, STORE_ERRORS } from './application/ports.js';
import { GameSession } from './application/game-session.js';
import { createDemoAiAdapter } from './adapters/ai/demo-ai-adapter.js';
import { BrowserProgressStore } from './adapters/storage/browser-progress-store.js';
import { MemoryProgressStore } from './adapters/storage/memory-progress-store.js';

/**
 * Decide el modo de IA (005/FR-006): fuera de Claude, demostración; dentro, directa si la página
 * recibe la IA y, si no, modo guía.
 * @returns {Promise<{ mode: 'direct'|'guide'|'demo', sample: unknown }>}
 */
export async function detectAiMode(env = globalThis) {
  const claude = env.claude;
  if (typeof claude?.use !== 'function') return { mode: AI_MODES.DEMO, sample: null };
  try {
    const sample = await claude.use('sample');
    return sample ? { mode: AI_MODES.DIRECT, sample } : { mode: AI_MODES.GUIDE, sample: null };
  } catch {
    return { mode: AI_MODES.GUIDE, sample: null };
  }
}

/** Elige el adaptador de IA para el modo detectado. */
export function chooseAiAdapter({ mode }) {
  if (mode === AI_MODES.GUIDE) return createDemoAiAdapter({ mode: AI_MODES.GUIDE }); // Modo guía real: T085.
  return createDemoAiAdapter(); // IA directa real: T040 (ClaudeSampleAdapter).
}

/**
 * Elige dónde guardar: el navegador si deja; si no, memoria, y se avisa (005/FR-018).
 * @returns {Promise<{ store: object, storageAvailable: boolean }>}
 */
export async function chooseStore({ getStorage } = {}) {
  const browser = new BrowserProgressStore({ version: SAVED_GAME_VERSION, ...(getStorage ? { getStorage } : {}) });
  const probe = await browser.load();
  if (probe?.error === STORE_ERRORS.UNAVAILABLE) return { store: new MemoryProgressStore(), storageAvailable: false };
  return { store: browser, storageAvailable: true };
}

/**
 * Compone la aplicación. Sin contenido todavía no crea sesión.
 * @param {{ env?: object, content?: object, getStorage?: () => Storage | null }} [options]
 */
export async function composeApp({ env = globalThis, content = null, getStorage } = {}) {
  const events = createEventBus({ onListenerError: (error, name) => console.error(`Error en un oyente de ${name}`, error) });
  const detected = await detectAiMode(env);
  const ai = chooseAiAdapter(detected);
  const { store, storageAvailable } = await chooseStore({ getStorage });
  const session = content ? new GameSession({ content, store, ai }) : null;
  return { events, ai, aiMode: detected.mode, store, storageAvailable, session };
}

if (typeof document !== 'undefined') {
  composeApp().then((app) => {
    document.documentElement.dataset.aiMode = app.aiMode;
  });
}
