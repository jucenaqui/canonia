// Punto de composición (T024): elige los adaptadores y conecta las capas.
// Es el único archivo que importa de todas las capas (plan.md, "Reglas de dependencia").
//
// Por ahora arranca el mundo de prueba de las fases 3 y 4 (src/content/test-world.js).
// T076 lo sustituye por el Mundo 1 cuando su contenido exista (T065 a T072).

import { createEventBus } from './application/events.js';
import { AI_MODES, SAVED_GAME_VERSION, STORE_ERRORS } from './application/ports.js';
import { GameSession } from './application/game-session.js';
import { createGateFlow } from './application/gate-flow.js';
import { createGuideFlow } from './application/guide-flow.js';
import { createZoneFlow } from './application/zone-flow.js';
import { createDemoAiAdapter } from './adapters/ai/demo-ai-adapter.js';
import { createClaudeSampleAdapter } from './adapters/ai/claude-sample-adapter.js';
import { BrowserProgressStore } from './adapters/storage/browser-progress-store.js';
import { MemoryProgressStore } from './adapters/storage/memory-progress-store.js';
import { es } from './content/es.js';
import { testLevel, testSessionContent, testGates } from './content/test-world.js';
import { startGameView } from './presentation/game-view.js';
import { WORLD_1_LAYOUT } from './content/world-1/layout.js';
import {
  WORLD_1_ID, WORLD_1_PIECES, WORLD_1_CRITERIA, WORLD_1_PIECE_NAMES, WORLD_1_ZONE_SCREENS, WORLD_1_ZONE_CONTENT, zoneText,
} from './content/world-1/zones.js';
import { createMinigameRegistry, adaptMinigame } from './presentation/world3d/minigame-registry.js';
import { MINIGAMES } from './presentation/world3d/minigames/index.js';

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
export function chooseAiAdapter({ mode, sample }) {
  if (mode === AI_MODES.DIRECT) return createClaudeSampleAdapter({ sample });
  // En modo guía no se llama a ninguna IA: solo se usan la pregunta y la lectura de lo pegado,
  // que son iguales en todos los adaptadores (adapters/ai/guide.js).
  if (mode === AI_MODES.GUIDE) return createDemoAiAdapter({ mode: AI_MODES.GUIDE });
  return createDemoAiAdapter();
}

/**
 * Elige dónde guardar: el navegador si deja; si no, memoria, y se avisa (005/FR-018).
 * @returns {Promise<{ store: object, storageAvailable: boolean }>}
 */
export async function chooseStore({ getStorage, key } = {}) {
  const browser = new BrowserProgressStore({ version: SAVED_GAME_VERSION, ...(getStorage ? { getStorage } : {}), ...(key ? { key } : {}) });
  const probe = await browser.load();
  if (probe?.error === STORE_ERRORS.UNAVAILABLE) return { store: new MemoryProgressStore(), storageAvailable: false };
  return { store: browser, storageAvailable: true };
}

/**
 * Compone la aplicación. Sin contenido no crea sesión ni flujos.
 * @param {{ env?: object, content?: object, gateContent?: object, getStorage?: () => Storage | null }} [options]
 */
export async function composeApp({ env = globalThis, content = null, gateContent = {}, getStorage, storeKey } = {}) {
  const events = createEventBus({ onListenerError: (error, name) => console.error(`Error en un oyente de ${name}`, error) });
  const detected = await detectAiMode(env);
  const ai = chooseAiAdapter(detected);
  const { store, storageAvailable } = await chooseStore({ getStorage, key: storeKey });
  const session = content ? new GameSession({ content, store, ai }) : null;
  const gateFlow = session ? createGateFlow({ session, gateContent, events }) : null;
  const guideFlow = session ? createGuideFlow({ session, gateContent }) : null;
  return { events, ai, aiMode: detected.mode, store, storageAvailable, session, gateFlow, guideFlow };
}

async function boot() {
  const app = await composeApp({ content: testSessionContent, gateContent: testGates });
  document.documentElement.dataset.aiMode = app.aiMode;
  const byId = (id) => document.getElementById(id);
  await startGameView({
    dom: {
      canvas: byId('stage'),
      screens: byId('screens'),
      controls: byId('controls'),
      pauseButton: byId('btn-pause'),
      buttons: { left: byId('btn-left'), right: byId('btn-right'), jump: byId('btn-jump') },
    },
    session: app.session,
    gateFlow: app.gateFlow,
    guideFlow: app.guideFlow,
    events: app.events,
    texts: es,
    levelDef: testLevel,
    gateTexts: testGates,
    storageAvailable: app.storageAvailable,
  });
}

// --- Mundo 3D (006, Fase 4). Hoy solo en la vista previa mundo3d.html; entra en index.html con T042. ---

/** Contenido de la sesión del Mundo 1 (data-model.md de 005, "Contenido del Mundo 1"). */
export const WORLD_1_SESSION_CONTENT = Object.freeze({
  worlds: [{ id: WORLD_1_ID, criteria: [...WORLD_1_CRITERIA] }],
  pieces: WORLD_1_PIECES.map((p) => ({ ...p, dependsOn: [...p.dependsOn] })),
  gates: WORLD_1_PIECES.map((p) => ({ id: p.id, worldId: p.worldId, pieceId: p.id })),
  interests: [...testSessionContent.interests],
});

/** Clave de guardado de la vista previa 3D: no pisa la partida del tramo 2D. */
export const WORLD3D_PREVIEW_KEY = 'canonia.vista3d';

/**
 * Compone el mundo 3D con zonas: sesión, flujo de zonas (escucha los eventos del mundo) y el
 * registro de minijuegos, que se rellena con `minigames.register(lessonId, start)`.
 */
export async function composeWorld3d({ env = globalThis, getStorage, key = WORLD3D_PREVIEW_KEY } = {}) {
  const app = await composeApp({ env, content: WORLD_1_SESSION_CONTENT, getStorage, storeKey: key });
  const { session } = app;
  const found = await session.loadSavedGame();
  if (found.status === 'found') session.continueSavedGame();
  const zoneFlow = createZoneFlow({ session, zoneContent: WORLD_1_ZONE_CONTENT, events: app.events, autoBind: true });
  const minigames = createMinigameRegistry();
  for (const [lessonId, start] of Object.entries(MINIGAMES)) minigames.register(lessonId, adaptMinigame(start));
  return { ...app, zoneFlow, minigames, loaded: found.status };
}

async function bootWorld3d() {
  // Import dinámico: three.js solo existe en el navegador, y las pruebas de Node importan este archivo.
  const { startZoneView } = await import('./presentation/world3d/zone-view.js');
  const byId = (id) => document.getElementById(id);
  const app = await composeWorld3d();
  document.documentElement.dataset.aiMode = app.aiMode;
  const { createLoadGate, requiredModels } = await import('./presentation/world3d/loading.js');
  const splash = byId('loading3d');
  const bar = byId('loadingBar3d');
  const percentText = byId('loadingText3d');
  const gate = createLoadGate({
    required: requiredModels(WORLD_1_LAYOUT),
    onProgress: ({ percent }) => {
      if (bar) bar.style.transform = `scaleX(${percent / 100})`;
      if (percentText) percentText.textContent = `${es.loading.text} ${percent} %`;
    },
  });
  // Al 100 % (o al agotarse el tiempo) la barra se cambia por el botón "Entrar" (D63). Su toque es el gesto
  // que desbloquea el audio: voice.unlock() va primero y sin await; luego se funde y PIX habla.
  const frames = (n) => new Promise((resolve) => { const step = () => (n-- > 0 ? requestAnimationFrame(step) : resolve()); step(); });
  const enterButton = byId('enterButton3d');
  let view = null;
  gate.released.then(() => frames(2)).then(() => {
    if (!splash) { gate.enter(); return; }
    splash.dataset.ready = '1'; // la red de seguridad de mundo3d.html ya no la quita: espera al jugador
    if (!enterButton) { gate.enter(); splash.classList.add('is-done'); return; }
    byId('loadingTrack3d')?.setAttribute('hidden', '');
    if (percentText) percentText.hidden = true;
    enterButton.textContent = es.loading.enter;
    enterButton.hidden = false;
    enterButton.focus({ preventScroll: true });
    enterButton.addEventListener('click', () => {
      if (!gate.enter()) return;
      try { view?.voice?.unlock(); } catch { /* sin audio: se entra igual y "Escuchar a PIX" queda de respaldo */ }
      splash.classList.add('is-done');
      setTimeout(() => { splash.hidden = true; }, 600);
    }, { once: true });
  });
  view = startZoneView({
    dom: { canvas: byId('stage3d'), overlay: byId('overlay3d'), screens: byId('screens3d') },
    layout: WORLD_1_LAYOUT,
    zoneScreens: WORLD_1_ZONE_SCREENS,
    zoneContent: WORLD_1_ZONE_CONTENT,
    texts: es,
    session: app.session,
    zoneFlow: app.zoneFlow,
    events: app.events,
    sayText: zoneText,
    pieceNames: WORLD_1_PIECE_NAMES,
    worldId: WORLD_1_ID, // para recordar dónde reaparecer al recargar (T041)
    minigames: app.minigames,
    // Solo en la vista previa: la ficha ofrece empezar de cero (borra lo guardado y recarga).
    onRestart: async () => { try { await app.store.clear(); } catch { /* sin almacenamiento: se recarga igual */ } location.reload(); },
    onModelSettled: gate.settle,
    loadingGate: gate.entered,
  });
  view.start();
}

if (typeof document !== 'undefined' && document.getElementById('stage')) boot();
if (typeof document !== 'undefined' && document.getElementById('stage3d')) bootWorld3d();
