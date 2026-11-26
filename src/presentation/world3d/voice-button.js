// Botón redondo con la cara de PIX (D61): tocar silencia o activa su voz. Muestra una raya cuando
// está silenciado y brilla mientras PIX habla. Lo usan el marcador y la cabecera de los minijuegos.
// No conoce el audio: recibe un objeto `voice` ({ isMuted, setMuted, isSpeaking?, subscribe? }).

import { h } from '../screens/dom.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function svg(tag, attrs, children = []) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  for (const child of children) el.append(child);
  return el;
}

/** Cara de PIX en SVG propio: círculo blanco con visor oscuro y ojos cyan. */
function pixFace() {
  return svg('svg', { viewBox: '0 0 48 48', class: 'pix-face', 'aria-hidden': 'true', focusable: 'false' }, [
    svg('circle', { cx: 24, cy: 24, r: 21, fill: '#FFFFFF', stroke: '#1E1B3A', 'stroke-opacity': '0.18', 'stroke-width': 2 }),
    svg('rect', { x: 9, y: 17, width: 30, height: 15, rx: 7.5, fill: '#1E1B3A' }),
    svg('circle', { class: 'pix-eye', cx: 18, cy: 24.5, r: 3.4, fill: '#16B5DB' }),
    svg('circle', { class: 'pix-eye', cx: 30, cy: 24.5, r: 3.4, fill: '#16B5DB' }),
    svg('path', { d: 'M24 3.5 V8', stroke: '#1E1B3A', 'stroke-opacity': '0.5', 'stroke-width': 2, 'stroke-linecap': 'round' }),
    svg('circle', { cx: 24, cy: 3.5, r: 2, fill: '#16B5DB' }),
    svg('path', { class: 'pix-slash', d: 'M9 40 L39 8', stroke: '#C0392B', 'stroke-width': 4, 'stroke-linecap': 'round' }),
  ]);
}

/**
 * @param {object} options
 * @param {{ isMuted: () => boolean, setMuted: (v: boolean) => void, isSpeaking?: () => boolean, subscribe?: (fn: () => void) => (() => void) }} options.voice
 * @param {string} options.mute Texto accesible cuando suena: "Silenciar la voz de PIX".
 * @param {string} options.unmute Texto accesible cuando está silenciada.
 * @param {string} [options.className]
 */
export function createVoiceButton({ voice, mute, unmute, className = '' }) {
  const button = h('button', { type: 'button', class: `voice-btn ${className}`.trim(), on: { click: () => { voice.setMuted(!voice.isMuted()); paint(); } } }, []);
  button.append(pixFace());
  function paint() {
    const muted = voice.isMuted();
    button.setAttribute('aria-label', muted ? unmute : mute);
    button.setAttribute('title', muted ? unmute : mute);
    button.setAttribute('aria-pressed', muted ? 'true' : 'false');
    button.classList.toggle('is-muted', muted);
    button.classList.toggle('is-speaking', !muted && Boolean(voice.isSpeaking?.()));
  }
  paint();
  const off = voice.subscribe?.(paint) ?? (() => {});
  return { element: button, paint, destroy: off };
}
