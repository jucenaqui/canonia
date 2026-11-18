// Pantalla de inicio (T094, D39): aviso de guardado, continuar o empezar de nuevo con
// confirmación dentro de la página, y avisos de modo de demostración o de guardado fallido.

import { h, button, screen, replace } from './dom.js';

/**
 * @param {object} options
 * @param {HTMLElement} options.container
 * @param {object} options.texts
 * @param {'direct'|'guide'|'demo'} options.aiMode
 * @param {'none'|'found'|'unreadable'|'otherVersion'|'unavailable'} options.savedStatus
 * @param {boolean} options.storageAvailable
 * @param {() => void} options.onContinue
 * @param {(options: { confirmed: boolean }) => void} options.onNew
 */
export function openStartScreen({ container, texts, aiMode, savedStatus, storageAvailable, onContinue, onNew }) {
  const s = texts.start;
  const actions = h('div', { class: 'stack' });
  const notices = [
    aiMode === 'demo' ? texts.notices.demoMode : null,
    storageAvailable ? texts.notices.savedHere : texts.notices.cannotSave,
    savedStatus === 'unreadable' ? texts.notices.savedGameUnreadable : null,
    savedStatus === 'otherVersion' ? texts.notices.savedGameOtherVersion : null,
  ].filter(Boolean);

  const root = screen(texts.game.title, [
    h('h1', { class: 'title', text: texts.game.title }),
    h('p', { class: 'tagline', text: texts.game.tagline }),
    h('p', { class: 'lead', text: s.lead }),
    ...notices.map((text) => h('p', { class: 'notice', text })),
    actions,
  ], 'start-screen');
  container.append(root);

  function done(callback) {
    root.remove();
    callback();
  }

  function showChoices() {
    const hasSomething = savedStatus !== 'none' && savedStatus !== 'unavailable';
    if (savedStatus === 'found') {
      replace(actions,
        button(texts.buttons.continue, () => done(onContinue), 'primary'),
        button(texts.buttons.startOver, showConfirm));
    } else {
      replace(actions, button(texts.buttons.start, hasSomething ? showConfirm : () => done(() => onNew({ confirmed: false })), 'primary'));
    }
  }

  function showConfirm() {
    replace(actions,
      h('p', { class: 'warning', attrs: { role: 'alert' }, text: texts.notices.confirmStartOver }),
      button(texts.buttons.confirmStartOver, () => done(() => onNew({ confirmed: true })), 'danger'),
      button(texts.buttons.cancel, showChoices));
  }

  showChoices();
}
