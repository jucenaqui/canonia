// Oferta de ayuda tras tres fallos seguidos en el mismo sitio (T040, spec 006/FR-032 a FR-036).
// Tarjeta con tres opciones; "Llevarme al siguiente sitio seguro" solo se muestra si hay un destino permitido.
// No decide nada: avisa con callbacks. Todo texto entra como texto plano.

import { h, button, screen } from './dom.js';

/**
 * @param {object} options
 * @param {HTMLElement} options.container Capa de pantallas.
 * @param {object} options.texts Textos comunes (content/es.js).
 * @param {string} options.lead Lo que dice PIX (frase de pix-lines.js).
 * @param {boolean} options.canSkip ¿Hay un siguiente sitio seguro permitido?
 * @param {() => void} options.onEasier
 * @param {() => void} options.onSkip
 * @param {() => void} options.onKeep
 * @returns {{ close: () => void, element: HTMLElement }}
 */
export function openAssistScreen({ container, texts, lead, canSkip, onEasier, onSkip, onKeep }) {
  const t = texts.assist;
  let root = null;
  const finish = (action) => () => { if (!root) return; root.remove(); root = null; action(); };
  const option = (label, hint, action, kind) => h('div', { class: 'assist-option' }, [
    button(label, finish(action), kind),
    hint ? h('p', { class: 'hint', text: hint }) : null,
  ]);
  root = screen(t.label, [
    h('h2', { text: t.title }),
    h('p', { class: 'lead', text: lead }),
    h('div', { class: 'actions' }, [
      option(t.easier, t.easierHint, onEasier, 'primary'),
      canSkip ? option(t.skip, t.skipHint, onSkip, '') : null,
      option(t.keep, null, onKeep, ''),
    ]),
    h('p', { class: 'hint', text: t.note }),
  ], 'assist-screen');
  container.append(root);
  root.querySelector('button')?.focus();
  return { close: () => { root?.remove(); root = null; }, element: root };
}
