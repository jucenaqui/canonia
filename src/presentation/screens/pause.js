// Menú de pausa (T032): a mano o al dejar de verse la página (001/FR-031, FR-032).
// El modo de ayuda y el inventario se añaden aquí con T050 y T055.

import { h, button, screen } from './dom.js';

/**
 * @param {{ container: HTMLElement, texts: object, onResume: () => void }} options
 * @returns {{ close: () => void }}
 */
export function openPauseScreen({ container, texts, onResume }) {
  const root = screen(texts.pause.title, [
    h('h2', { text: texts.pause.title }),
    h('p', { class: 'lead', text: texts.pause.hint }),
    button(texts.buttons.resume, () => {
      root.remove();
      onResume();
    }, 'primary'),
  ], 'pause-screen');
  container.append(root);
  root.querySelector('button')?.focus();
  return { close: () => root.remove() };
}

/** Aviso breve que desaparece solo. */
export function showToast(container, text, ms = 3500) {
  const toast = h('p', { class: 'toast', attrs: { role: 'status' }, text });
  container.append(toast);
  setTimeout(() => toast.remove(), ms);
}
