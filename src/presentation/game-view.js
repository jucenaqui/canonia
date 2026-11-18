// Vista del juego: conecta el motor con las pantallas por eventos (contracts/puertos.md, sección 3).
// Recibe la sesión y los flujos ya creados por main.js; no conoce a los adaptadores.

import { ENGINE_EVENTS } from '../application/events.js';
import { createEngine } from './engine/engine.js';
import { openGateScreen } from './screens/gate.js';
import { openStartScreen } from './screens/start.js';
import { openPauseScreen, showToast } from './screens/pause.js';
import { h, button, screen } from './screens/dom.js';

/**
 * @param {object} options
 * @param {{ canvas: HTMLCanvasElement, screens: HTMLElement, controls: HTMLElement, buttons: object, pauseButton: HTMLElement }} options.dom
 * @param {import('../application/game-session.js').GameSession} options.session
 * @param {object} options.gateFlow
 * @param {object} options.guideFlow
 * @param {object} options.events
 * @param {object} options.texts Textos comunes.
 * @param {object} options.levelDef Nivel en casillas.
 * @param {Record<string, object>} options.gateTexts Título, lección y datos útiles de cada puerta.
 * @param {boolean} options.storageAvailable
 */
export async function startGameView({ dom, session, gateFlow, guideFlow, events, texts, levelDef, gateTexts, storageAvailable }) {
  const saved = await session.loadSavedGame();
  const choice = await new Promise((resolve) => openStartScreen({
    container: dom.screens,
    texts,
    aiMode: session.aiMode,
    savedStatus: saved.status,
    storageAvailable,
    onContinue: () => resolve({ resume: session.continueSavedGame() }),
    onNew: async ({ confirmed }) => {
      await session.startNewGame({ confirmed });
      resolve({ resume: null });
    },
  }));

  const resolvedGates = [...session.gates.values()].filter((g) => g.status === 'resolved').map((g) => g.id);
  let gateScreenOpen = false;
  let pauseScreen = null;

  const engine = createEngine({
    canvas: dom.canvas,
    buttons: dom.buttons,
    controls: dom.controls,
    levelDef,
    events,
    resolvedGates,
  });

  function openGate(gateId, awaitingGuideAnswer = false) {
    if (gateScreenOpen) return;
    gateScreenOpen = true;
    dom.pauseButton.hidden = true;
    openGateScreen({
      container: dom.screens,
      gateFlow,
      guideFlow,
      gateId,
      gateText: gateTexts[gateId],
      wantsLabel: (gateTexts[gateId].extrasWanted ?? []).includes('publicLabel'),
      texts,
      awaitingGuideAnswer,
      onNotice: (text) => showToast(dom.screens, text),
      onClose: () => {
        gateScreenOpen = false;
        dom.pauseButton.hidden = false;
      },
    });
  }

  events.on(ENGINE_EVENTS.GATE_REACHED, ({ gateId }) => openGate(gateId));

  events.on(ENGINE_EVENTS.LEVEL_PAUSED, () => {
    if (gateScreenOpen || pauseScreen) return;
    pauseScreen = openPauseScreen({
      container: dom.screens,
      texts,
      onResume: () => {
        pauseScreen = null;
        engine.resume();
      },
    });
  });

  events.on(ENGINE_EVENTS.BOSS_REACHED, () => {
    dom.pauseButton.hidden = true;
    const root = screen(texts.levelEnd.title, [
      h('h2', { text: texts.levelEnd.title }),
      h('p', { class: 'lead', text: texts.levelEnd.text }),
      button(texts.levelEnd.again, () => globalThis.location.reload(), 'primary'),
    ]);
    dom.screens.append(root);
  });

  dom.pauseButton.addEventListener('click', () => engine.pause());

  engine.start();
  dom.pauseButton.hidden = false;

  // Continuar donde se dejó (005/FR-016).
  const resume = choice.resume;
  if (resume?.screen === 'gate' && resume.gateId && engine.holdAtGate(resume.gateId)) {
    openGate(resume.gateId, resume.awaitingGuideAnswer);
  } else if (resume) {
    const next = levelDef.gates.find((g) => !resolvedGates.includes(g.gateId));
    if (next) engine.placeBeforeGate(next.gateId);
  }
  return { engine };
}
