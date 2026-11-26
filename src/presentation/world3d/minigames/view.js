// Vista común de los minijuegos: un panel HTML a pantalla completa sobre el lienzo, táctil y pensado
// para 375 px de ancho. Dibuja la escena de la máquina (machine.js) y no decide nada: solo muestra
// y pasa lo que el jugador toca a la máquina. Todo texto entra como texto plano (h() usa textContent).
//
// API de cada minijuego (la misma para los cinco):
//   start({ container, texts?, example: 0|1, onFinish({ lessonId, trustDelta, summary }), onExit() }) → { destroy() }
// onFinish se llama una sola vez, en cuanto el juego llega a su final (el jugador aún ve lo que
// aprendió). El botón "Volver a la sala" llama a onExit. "Salir" a mitad de juego llama a onExit sin onFinish.
//
// Pantalla de entrada (D60): si llega `intro`, antes de jugar se ve el ejemplo de turno y lo que se
// aprende, con el botón "Empezar". intro = { exampleText, learns, entryKey?, endKey? }.
// Voz de PIX (opcional): `voice` = { say(clave|texto), stop(), isMuted(), setMuted(bool), isSpeaking?(), subscribe?(fn) }. Dice la
// entrada (entryKey) y el resumen final (endKey). Sin voz, todo se ve igual en texto.

import { MINIGAME_TEXTS } from '../../../content/world-1/minigames.js';
import { h } from '../../screens/dom.js';
import { fill } from './machine.js';
import { createVoiceButton } from '../voice-button.js';

const EXAMPLES = 2;

/**
 * @param {object} options
 * @param {string} options.accent Clase de color del minijuego (ugc, affiliate, digital, subscriptions, sponsorship).
 * @param {string} options.gameKey Clave del juego dentro de los textos.
 * @param {(opts: { example: number, texts: object }) => ReturnType<import('./machine.js').createMachine>} options.create
 */
export function mountMinigame({ accent, gameKey, create, container, texts = MINIGAME_TEXTS, example = 0, intro = null, voice = null, onFinish = () => {}, onExit = () => {} }) {
  const ui = texts.ui;
  const title = texts[gameKey].title;
  const machine = create({ example, texts });
  let finishedReported = false;
  let destroyed = false;
  let entering = Boolean(intro); // pantalla de entrada antes del primer paso
  let endSpoken = false;

  const root = h('section', { class: `minigame mg-${accent}`, attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-label': title } });
  const exitButton = h('button', { type: 'button', class: 'mg-exit', text: ui.exit, on: { click: () => { if (!destroyed) onExit(); } } });
  const voiceButton = voice ? createVoiceButton({ voice, mute: ui.mute, unmute: ui.unmute, className: 'mg-voice' }) : null;
  const trustFill = h('span', { class: 'mg-trust-fill' });
  const trustValue = h('span', { class: 'mg-trust-value' });
  const trustBox = h('div', { class: 'mg-trust', hidden: true, attrs: { role: 'progressbar', 'aria-label': ui.trust, 'aria-valuemin': '0', 'aria-valuemax': '100' } }, [
    h('span', { class: 'mg-trust-label', text: ui.trust }),
    h('span', { class: 'mg-trust-bar' }, [trustFill]),
    trustValue,
  ]);
  const stepLabel = h('span', { class: 'mg-step' });
  const header = h('header', { class: 'mg-head' }, [
    h('div', { class: 'mg-title' }, [
      h('span', { class: 'mg-kicker', text: fill(ui.example, { n: example + 1, total: EXAMPLES }) }),
      h('h2', { text: title }),
    ]),
    h('div', { class: 'mg-head-actions' }, [voiceButton?.element, exitButton]),
  ]);
  const body = h('div', { class: 'mg-body', attrs: { 'aria-live': 'polite' } });
  const footer = h('footer', { class: 'mg-foot' });
  root.append(header, trustBox, h('div', { class: 'mg-scroll' }, [stepLabel, body]), footer);
  container.append(root);

  function meterRow(item) {
    const row = h('li', { class: `mg-item ${item.tone ?? ''}`.trim() }, [
      h('span', { class: 'mg-item-label', text: item.label }),
      h('span', { class: 'mg-item-value', text: item.value ?? '' }),
    ]);
    if (item.max) {
      const pct = Math.max(0, Math.min(100, Math.round((item.bar ?? 0) / item.max * 100)));
      row.append(h('span', { class: 'mg-meter', attrs: { 'aria-hidden': 'true' } }, [h('span', { class: 'mg-meter-fill', style: `width:${pct}%` })]));
    }
    return row;
  }

  /** Pantalla de entrada: el ejemplo de turno y lo que se aprende, antes de jugar (D60). */
  function renderEntry() {
    trustBox.hidden = true;
    stepLabel.textContent = '';
    body.replaceChildren(
      h('h3', { class: 'mg-heading', text: title, attrs: { tabindex: '-1' } }),
      h('div', { class: 'mg-entry' }, [
        h('p', { class: 'label', text: fill(ui.example, { n: example + 1, total: EXAMPLES }) }),
        h('p', { class: 'mg-text mg-entry-example', text: intro.exampleText }),
      ]),
      h('p', { class: 'mg-pix' }, [h('span', { class: 'mg-pix-name', text: ui.pix }), h('span', { class: 'mg-pix-text' }, [h('strong', { text: `${ui.learnsLabel}: ` }), intro.learns])]),
      h('p', { class: 'mg-note', text: ui.note }),
    );
    footer.replaceChildren(h('button', { type: 'button', class: 'primary mg-main', text: ui.start, on: { click: () => { voice?.stop(); entering = false; render(); } } }));
    footer.hidden = false;
    root.querySelector('.mg-scroll').scrollTop = 0;
    body.querySelector('.mg-heading')?.focus({ preventScroll: true });
    if (intro.entryKey) voice?.say(intro.entryKey);
  }

  function render() {
    if (destroyed) return;
    if (entering) { renderEntry(); return; }
    const scene = machine.scene();

    // Confianza: solo en los juegos que la usan.
    if (scene.trust === null) {
      trustBox.hidden = true;
    } else {
      trustBox.hidden = false;
      trustFill.style.width = `${scene.trust}%`;
      trustValue.textContent = String(scene.trust);
      trustBox.setAttribute('aria-valuenow', String(scene.trust));
      trustBox.classList.toggle('low', scene.trust < 35);
    }
    stepLabel.textContent = scene.phase === 'end' ? '' : fill(ui.step, { n: scene.progress.step, total: scene.progress.total });

    const parts = [h('h3', { class: 'mg-heading', text: scene.heading, attrs: { tabindex: '-1' } })];
    if (scene.phase === 'reaction') parts.push(h('p', { class: `mg-pix ${scene.tone}` }, [h('span', { class: 'mg-pix-name', text: ui.pix }), h('span', { class: 'mg-pix-text', text: scene.text })]));
    else if (scene.phase === 'end') parts.push(h('p', { class: 'mg-pix good' }, [h('span', { class: 'mg-pix-name', text: ui.pix }), h('span', { class: 'mg-pix-text', text: scene.text })]));
    else if (scene.text) parts.push(h('p', { class: 'mg-text', text: scene.text }));
    if (scene.phase === 'info' && scene.pix) parts.push(h('p', { class: 'mg-pix', }, [h('span', { class: 'mg-pix-name', text: ui.pix }), h('span', { class: 'mg-pix-text', text: scene.pix })]));
    if (scene.phase === 'choice' && scene.pix) parts.push(h('p', { class: 'mg-pix', }, [h('span', { class: 'mg-pix-name', text: ui.pix }), h('span', { class: 'mg-pix-text', text: scene.pix })]));

    if (scene.phase === 'reaction' && scene.trustChange) {
      parts.push(h('p', { class: `mg-trust-change ${scene.trustChange > 0 ? 'up' : 'down'}`, text: `${scene.trustChange > 0 ? ui.trustUp : ui.trustDown} (${scene.trustChange > 0 ? '+' : ''}${scene.trustChange})` }));
    }
    if (scene.items.length) parts.push(h('ul', { class: 'mg-items' }, scene.items.map(meterRow)));

    if (scene.phase === 'end') {
      if (!endSpoken && intro?.endKey) { endSpoken = true; voice?.say(intro.endKey); }
      parts.push(h('h4', { class: 'mg-recap-title', text: ui.recap }));
      parts.push(h('ol', { class: 'mg-recap' }, scene.recap.map((r) => h('li', {}, [h('strong', { text: r.label }), h('span', { text: r.text })]))));
      parts.push(h('p', { class: 'mg-note', text: ui.note }));
    } else if (scene.phase === 'choice') {
      parts.push(h('div', { class: 'mg-choices' }, scene.choices.map((c) => h('button', {
        type: 'button', class: 'mg-choice', attrs: { 'data-choice': c.id },
        on: { click: () => { machine.choose(c.id); afterStep(); } },
      }, [h('span', { class: 'mg-choice-label', text: c.label }), c.detail ? h('span', { class: 'mg-choice-detail', text: c.detail }) : null]))));
    }
    body.replaceChildren(...parts);

    // Pie: un solo botón grande al alcance del pulgar.
    footer.replaceChildren();
    if (scene.phase === 'end') {
      footer.append(h('button', { type: 'button', class: 'primary mg-main', text: ui.back, on: { click: () => { if (!destroyed) onExit(); } } }));
    } else if (scene.continueLabel) {
      footer.append(h('button', { type: 'button', class: 'primary mg-main', text: scene.continueLabel, on: { click: () => { machine.advance(); afterStep(); } } }));
    }
    footer.hidden = footer.childElementCount === 0;

    root.querySelector('.mg-scroll').scrollTop = 0;
    // El foco va al título nuevo para lectores de pantalla; no roba el toque al jugador.
    body.querySelector('.mg-heading')?.focus({ preventScroll: true });
  }

  function afterStep() {
    render();
    if (machine.isDone() && !finishedReported) {
      finishedReported = true;
      onFinish(machine.result());
    }
  }

  render();

  return {
    destroy() {
      if (destroyed) return;
      destroyed = true;
      voiceButton?.destroy();
      voice?.stop();
      root.remove();
    },
  };
}
