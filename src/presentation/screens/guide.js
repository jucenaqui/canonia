// Panel del modo guía (T087): pasos, aviso de privacidad, copiar la pregunta y pegar la respuesta.
// Las opciones válidas se muestran con las mismas tarjetas de la puerta (005/FR-006 a FR-013).

import { h, button, copyText } from './dom.js';

/**
 * @param {object} options
 * @param {object} options.guideFlow Flujo del modo guía (application/guide-flow.js).
 * @param {string} options.gateId
 * @param {object} options.texts Textos comunes (content/es.js).
 * @param {boolean} options.showWhy Mostrar por qué se usa el modo guía (una vez).
 * @param {boolean} [options.focusPaste] Viene de vuelta de otra app: el recuadro de pegar va primero.
 * @param {(options: object[]) => void} options.onOptions Opciones válidas leídas de la respuesta.
 * @param {(notice: string) => void} options.onNotice Aviso breve (por ejemplo, no se pudo guardar).
 */
export function createGuidePanel({ guideFlow, gateId, texts, showWhy, focusPaste = false, onOptions, onNotice }) {
  const g = texts.guide;
  const note = h('p', { class: 'note', attrs: { 'aria-live': 'polite' } });
  const promptBox = h('textarea', { class: 'guide-prompt', readOnly: true, hidden: true, attrs: { 'aria-label': 'Pregunta para copiar' } });
  const answer = h('textarea', { class: 'guide-answer', placeholder: 'Pega la respuesta completa', maxLength: 20000, attrs: { 'aria-label': g.pasteLabel } });
  const error = h('p', { class: 'error', attrs: { role: 'alert' }, hidden: true });

  async function copy() {
    const result = await guideFlow.getGuidePrompt(gateId);
    if (!result.ok) {
      note.textContent = texts.aiErrors.failed;
      return;
    }
    if (result.save && !result.save.ok && result.save.warn) onNotice(texts.notices.cannotSave);
    promptBox.value = result.text;
    if (await copyText(result.text)) {
      promptBox.hidden = true;
      note.textContent = texts.notices.copied;
    } else {
      promptBox.hidden = false;
      promptBox.focus();
      promptBox.select();
      note.textContent = texts.notices.copyFallback;
    }
  }

  async function check() {
    error.hidden = true;
    const result = await guideFlow.submitGuideAnswer(gateId, answer.value);
    if (!result.ok) {
      error.textContent = texts.aiErrors.badAnswer; // el texto pegado se conserva (005/FR-009)
      error.hidden = false;
      return;
    }
    onOptions(result.options);
  }

  const pasteBlock = [
    h('label', { class: 'label', text: g.pasteLabel, htmlFor: 'guide-answer' }),
    Object.assign(answer, { id: 'guide-answer' }),
    error,
    button(texts.buttons.checkAnswer, check, 'primary'),
  ];

  const element = h('div', { class: 'guide' }, [
    showWhy ? h('p', { class: 'notice', text: g.why }) : null,
    focusPaste ? h('div', { class: 'stack' }, pasteBlock) : null,
    h('ol', { class: 'steps' }, g.steps.map((step) => h('li', { text: step }))),
    h('p', { class: 'privacy', text: g.privacy }),
    button(texts.buttons.copyQuestion, copy, focusPaste ? '' : 'primary'),
    note,
    promptBox,
    focusPaste ? null : h('div', { class: 'stack' }, pasteBlock),
  ]);
  if (focusPaste) queueMicrotask(() => answer.focus());
  return element;
}
