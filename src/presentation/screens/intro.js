// Presentación de una zona (D62): capa sobre el mundo mientras PIX habla. Siempre hay "Saltar"; tocar la
// pantalla termina la presentación mientras suena la voz. Si la voz no suena, el resumen sale en una
// tarjeta con "Continuar". Todo texto entra como texto plano.

import { h } from './dom.js';

const IGNORE_TAPS_MS = 700; // el dedo que aún sostenía la palanca no debe saltarla sin querer

/**
 * @param {object} options
 * @param {HTMLElement} options.container
 * @param {{ skip: string, continue: string, label: string }} options.texts
 * @param {() => void} options.onDone Saltó, tocó la pantalla o pulsó "Continuar".
 * @param {() => number} [options.now]
 */
export function openIntroScreen({ container, texts, onDone, onListen = () => {}, onRead = () => {}, now = () => Date.now() }) {
  const openedAt = now();
  let cardMode = false;
  let closed = false;
  const done = () => { if (!closed) onDone(); };

  const card = h('div', { class: 'zone-intro-card', hidden: true, attrs: { role: 'status' } });
  const cardText = h('p', { class: 'zone-intro-text' });
  const cardButton = h('button', { type: 'button', class: 'zone-intro-continue', text: texts.continue, on: { click: (e) => { e.stopPropagation(); done(); } } });
  // Elección cuando el audio espera el primer toque: "Escuchar a PIX" cuenta como ese toque (se atiende dentro del mismo gesto).
  const speakerIcon = h('span', { class: 'zone-intro-icon', attrs: { 'aria-hidden': 'true' } });
  speakerIcon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 9v6h4l5 4V5L7 9H3z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  let handlers = { onListen, onRead };
  const listenButton = h('button', { type: 'button', class: 'zone-intro-listen', on: { click: (e) => { e.stopPropagation(); handlers.onListen(); } } }, [speakerIcon, texts.listen]);
  const readButton = h('button', { type: 'button', class: 'zone-intro-read', text: texts.read, on: { click: (e) => { e.stopPropagation(); handlers.onRead(); } } });
  const choice = h('div', { class: 'zone-intro-choice', hidden: true }, [listenButton, readButton]);
  card.append(h('span', { class: 'hud-pix-name', attrs: { 'aria-hidden': 'true' }, text: 'PIX' }), cardText, choice, cardButton);

  const skip = h('button', { type: 'button', class: 'zone-intro-skip', text: texts.skip, on: { click: (e) => { e.stopPropagation(); done(); } } });
  const layer = h('div', { class: 'zone-intro', attrs: { role: 'dialog', 'aria-label': texts.label } }, [card, skip]);
  layer.addEventListener('pointerdown', () => {
    // Con la voz sonando, un toque adelanta; con la tarjeta hay que pulsar "Continuar".
    if (!cardMode && now() - openedAt >= IGNORE_TAPS_MS) done();
  });
  container.append(layer);

  return {
    element: layer,
    /** Muestra el resumen escrito (el audio no suena). */
    showCard(text) {
      cardMode = true;
      cardText.textContent = String(text);
      cardText.hidden = false;
      choice.hidden = true;
      cardButton.hidden = false;
      card.hidden = false;
      skip.hidden = true;
      cardButton.focus({ preventScroll: true });
    },
    /** Ofrece "Escuchar a PIX" (principal) y "Leer"; todavía no se muestra el texto. */
    showChoice() {
      cardMode = true;
      cardText.hidden = true;
      cardButton.hidden = true;
      choice.hidden = false;
      card.hidden = false;
      skip.hidden = true;
      listenButton.focus({ preventScroll: true });
    },
    /** Vuelve al modo voz: sin tarjeta, con "Saltar" y con un toque que adelanta. */
    showVoice() {
      cardMode = false;
      card.hidden = true;
      skip.hidden = false;
    },
    setHandlers(next) { handlers = { ...handlers, ...next }; },
    get cardShown() { return cardMode; },
    get choiceShown() { return !choice.hidden; },
    close() { closed = true; layer.remove(); },
  };
}
