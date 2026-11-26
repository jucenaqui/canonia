// Marcador del mundo 3D (T032, spec 006/FR-014, FR-016, FR-029; D48): progreso de zonas, chispas,
// barra de confianza, botón Ficha con "por revisar" y el globo de PIX. Es HTML sobre el lienzo.
// No conoce la aplicación: recibe datos con set*() y avisa con callbacks. Todo texto entra como texto plano.

import { h } from '../screens/dom.js';
import { createVoiceButton } from './voice-button.js';

const SUBTITLE_MAX = 84;

/**
 * Subtítulo corto del globo de PIX (D60): la primera frase; si es larga, se corta en una palabra y
 * termina en "…". Devuelve el texto completo si ya es corto. El texto completo se lee con "Leer".
 */
export function subtitleOf(text, max = SUBTITLE_MAX) {
  const full = String(text ?? '').replace(/\s+/g, ' ').trim();
  const first = full.split(/(?<=[.!?…])\s+/)[0] ?? '';
  if (first.length <= max) return first;
  const cut = first.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return `${(space > max * 0.5 ? cut.slice(0, space) : cut).replace(/[\s,;:.]+$/, '')}…`;
}

/**
 * @param {object} options
 * @param {HTMLElement} options.container Capa de pantallas o del juego.
 * @param {object} options.texts Textos comunes (content/es.js).
 * @param {{ id: string, name?: string }[]} options.zones Zonas en orden (id de la pieza).
 * @param {() => void} [options.onSheet] Pulsó el botón Ficha.
 * @param {number} [options.sayMs] Cuánto dura un globo de PIX, como mínimo.
 * @param {{ isMuted: () => boolean, setMuted: (v: boolean) => void, isSpeaking?: () => boolean, subscribe?: (fn: () => void) => (() => void) } | null} [options.voice]
 *   Voz de PIX: el marcador muestra el botón con su cara para silenciarla o activarla (D61).
 */
export function createHud({ container, texts, zones, onSheet = () => {}, sayMs = 6000, voice = null }) {
  const t = texts.hud;
  const pips = new Map();
  const pipRow = h('ol', { class: 'hud-zones', attrs: { 'aria-label': t.zones } }, zones.map((zone, i) => {
    const pip = h('li', { class: 'hud-pip pending', attrs: { 'data-zone': zone.id, 'aria-label': `${zone.name ?? `${t.zones} ${i + 1}`}: ${t.zonePending}` }, text: String(i + 1) });
    pips.set(zone.id, pip);
    return pip;
  }));

  const sparkValue = h('span', { class: 'hud-spark-value', text: '0' });
  const sparks = h('div', { class: 'hud-sparks', attrs: { role: 'status', 'aria-label': t.sparks } }, [h('span', { class: 'hud-spark-icon', attrs: { 'aria-hidden': 'true' }, text: '✦' }), sparkValue]);

  const trustFill = h('span', { class: 'hud-trust-fill' });
  const trust = h('div', { class: 'hud-trust', hidden: true, attrs: { role: 'progressbar', 'aria-label': t.trust, 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': '0' } }, [
    h('span', { class: 'hud-trust-label', text: t.trust }),
    h('span', { class: 'hud-trust-bar' }, [trustFill]),
  ]);

  const reviewBadge = h('span', { class: 'hud-review', hidden: true });
  const sheetButton = h('button', { type: 'button', class: 'hud-sheet', attrs: { 'aria-label': t.sheetLabel }, on: { click: () => onSheet() } }, [
    h('span', { text: t.sheet }),
    reviewBadge,
  ]);

  const v = texts.voice;
  const bubbleText = h('span', { class: 'hud-pix-text' });
  const readButton = h('button', { type: 'button', class: 'hud-pix-read', hidden: true, attrs: { 'aria-expanded': 'false' }, text: v.read });
  const bubble = h('div', { class: 'hud-pix', hidden: true, attrs: { role: 'status', 'aria-live': 'polite', 'aria-label': t.pixLabel } }, [
    h('span', { class: 'hud-pix-name', attrs: { 'aria-hidden': 'true' }, text: 'PIX' }),
    bubbleText,
    readButton,
  ]);

  // Voz de PIX (D61): botón con su cara, junto a Ficha. Tocar silencia o activa; brilla mientras habla.
  const voiceButton = voice ? createVoiceButton({ voice, mute: v.mute, unmute: v.unmute, className: 'hud-voice' }) : null;
  const topRight = h('div', { class: 'hud-top-right' }, [...(voiceButton ? [voiceButton.element] : []), sheetButton]);

  const left = h('div', { class: 'hud-left' }, [pipRow, sparks, trust]);
  const root = h('div', { class: 'hud' }, [left, topRight, bubble]);
  container.append(root);

  let bubbleTimer = null;
  let fullText = '';
  let expanded = false;

  function hideLater(ms) {
    clearTimeout(bubbleTimer);
    bubbleTimer = ms > 0 ? setTimeout(() => { bubble.hidden = true; expanded = false; }, ms) : null;
  }
  function showText() {
    bubbleText.textContent = expanded ? fullText : subtitleOf(fullText);
    readButton.textContent = expanded ? v.close : v.read;
    readButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    bubble.classList.toggle('expanded', expanded);
  }
  readButton.addEventListener('click', () => {
    expanded = !expanded;
    showText();
    // Mientras se lee el texto completo, el globo no se va solo.
    if (expanded) clearTimeout(bubbleTimer); else hideLater(4000);
  });

  return {
    root,

    /** Progreso por zona: { [zoneId]: 'done' | 'current' | 'pending' }. */
    setProgress(states) {
      for (const [id, pip] of pips) {
        const state = states[id] ?? 'pending';
        pip.className = `hud-pip ${state}`;
        const label = state === 'done' ? t.zoneDone : state === 'current' ? t.zoneCurrent : t.zonePending;
        const name = zones.find((z) => z.id === id)?.name ?? pip.textContent;
        pip.setAttribute('aria-label', `${name}: ${label}`);
        if (state === 'current') pip.setAttribute('aria-current', 'step'); else pip.removeAttribute('aria-current');
      }
    },

    setSparks(count) { sparkValue.textContent = String(Math.max(0, Math.floor(count))); },

    /** Confianza de 0 a 100. `null` oculta la barra (solo aparece donde importa, D51). */
    setTrust(value) {
      if (value === null || value === undefined) { trust.hidden = true; return; }
      const pct = Math.max(0, Math.min(100, Math.round(value)));
      trust.hidden = false;
      trustFill.style.width = `${pct}%`;
      trust.setAttribute('aria-valuenow', String(pct));
      trust.classList.toggle('low', pct < 35);
    },

    /** Piezas "por revisar" que muestra el botón Ficha. */
    setReviewCount(count) {
      reviewBadge.hidden = !(count > 0);
      reviewBadge.textContent = count > 0 ? `${count} ${t.toReview}` : '';
      sheetButton.classList.toggle('has-review', count > 0);
    },

    /** Globo de PIX: texto plano, desaparece solo. Un texto vacío lo quita. */
    say(text, { ms = sayMs } = {}) {
      clearTimeout(bubbleTimer);
      expanded = false;
      if (!text) { bubble.hidden = true; return; }
      fullText = String(text);
      showText();
      readButton.hidden = subtitleOf(fullText) === fullText.replace(/\s+/g, ' ').trim();
      bubble.hidden = false;
      hideLater(ms);
    },

    /** El silencio o el habla de PIX cambió: se vuelve a dibujar el botón. */
    refreshVoice() { voiceButton?.paint(); },

    setVisible(visible) { root.hidden = !visible; },

    destroy() { clearTimeout(bubbleTimer); voiceButton?.destroy(); root.remove(); },
  };
}
