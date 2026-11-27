// Menú de pausa del mundo 3D (T041): a mano o al dejar de verse la página (001/FR-031, FR-032).

import { h, button, screen, replace } from './dom.js';

/**
 * Menú de pausa del mundo 3D (T041): Seguir, Ficha, el interruptor de la ayuda (T040) y Empezar de nuevo
 * (con confirmación). Todo texto entra como texto plano.
 * @param {object} options
 * @param {HTMLElement} options.container
 * @param {object} options.texts Textos comunes (content/es.js).
 * @param {() => void} options.onResume
 * @param {() => void} [options.onSheet] Si existe, se ofrece "Ficha".
 * @param {{ enabled: boolean, onToggle: (enabled: boolean) => void }} [options.assist]
 * @param {() => void} [options.onRestart] Si existe, se ofrece "Empezar de nuevo".
 * @returns {{ close: () => void, element: HTMLElement }}
 */
export function openWorldPauseScreen({ container, texts, onResume, onSheet = null, assist = null, onRestart = null }) {
  const t = texts.pauseMenu;
  const body = h('div', { class: 'pause-body' });
  let asking = false;
  let assistOn = assist ? Boolean(assist.enabled) : false;

  function render() {
    const switchRow = !assist ? null : h('button', {
      type: 'button', class: 'switch-row', attrs: { role: 'switch', 'aria-checked': assistOn ? 'true' : 'false' },
      on: { click: () => { assistOn = !assistOn; assist.onToggle(assistOn); render(); body.querySelector('.switch-row')?.focus(); } },
    }, [
      h('span', { class: 'switch-label' }, [t.assistLabel, h('small', { text: t.assistHelp })]),
      h('span', { class: 'switch-state', text: assistOn ? t.assistOn : t.assistOff }),
      h('span', { class: 'switch-track', attrs: { 'aria-hidden': 'true' } }),
    ]);
    const restart = !onRestart ? null : asking
      ? h('div', { class: 'sheet-restart' }, [
        h('p', { class: 'hint', text: t.restartAsk }),
        h('div', { class: 'actions' }, [button(t.restartYes, () => onRestart(), 'danger'), button(t.restartNo, () => { asking = false; render(); })]),
      ])
      : button(t.restart, () => { asking = true; render(); }, 'link');
    replace(body,
      h('h2', { text: t.title }),
      h('p', { class: 'lead', text: t.hint }),
      h('div', { class: 'actions' }, [
        button(t.resume, () => onResume(), 'primary'),
        onSheet ? button(t.sheet, () => onSheet()) : null,
      ]),
      switchRow,
      restart);
  }
  render();
  const root = screen(t.title, [body], 'pause-menu');
  container.append(root);
  root.querySelector('button')?.focus();
  return { close: () => root.remove(), element: root };
}
