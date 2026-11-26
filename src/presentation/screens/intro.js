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
export function openIntroScreen({ container, texts, onDone, now = () => Date.now() }) {
  const openedAt = now();
  let cardMode = false;
  let closed = false;
  const done = () => { if (!closed) onDone(); };

  const card = h('div', { class: 'zone-intro-card', hidden: true, attrs: { role: 'status' } });
  const cardText = h('p', { class: 'zone-intro-text' });
  const cardButton = h('button', { type: 'button', class: 'zone-intro-continue', text: texts.continue, on: { click: (e) => { e.stopPropagation(); done(); } } });
  card.append(h('span', { class: 'hud-pix-name', attrs: { 'aria-hidden': 'true' }, text: 'PIX' }), cardText, cardButton);

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
      card.hidden = false;
      skip.hidden = true;
      cardButton.focus({ preventScroll: true });
    },
    get cardShown() { return cardMode; },
    close() { closed = true; layer.remove(); },
  };
}
