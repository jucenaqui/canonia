// Pantalla de una puerta de decisión (T041, T042, T043): mini lección, tres tarjetas con la
// recomendada marcada, elegir sin aprobar, editar, pedir otras, volver a las anteriores,
// escribir la propia respuesta, "no sé, recomiéndame" y aprobar. Con el modo guía (T087).
// Solo el botón de aprobar llama a approvePiece (002/FR-018).

import { h, button, screen, replace } from './dom.js';
import { createGuidePanel } from './guide.js';

const BATCH = 3;

/**
 * @param {object} options
 * @param {HTMLElement} options.container Capa de pantallas.
 * @param {object} options.gateFlow
 * @param {object} options.guideFlow
 * @param {string} options.gateId
 * @param {object} options.gateText Título, lección y datos útiles de la puerta (contenido del mundo).
 * @param {boolean} options.wantsLabel La puerta pide etiqueta pública (004/FR-020).
 * @param {object} options.texts Textos comunes (content/es.js).
 * @param {boolean} [options.awaitingGuideAnswer] Se vuelve de otra app con la pregunta copiada.
 * @param {(text: string) => void} options.onNotice
 * @param {() => void} options.onClose Se cerró la pantalla (aprobada o no).
 */
export function openGateScreen({ container, gateFlow, guideFlow, gateId, gateText, wantsLabel, texts, awaitingGuideAnswer = false, onNotice, onClose }) {
  const t = texts.gate;
  const opened = gateFlow.openGate(gateId);
  const state = {
    view: opened.lessonSeen || awaitingGuideAnswer ? 'options' : 'lesson',
    all: opened.shownOptions,
    // De vuelta de otra app con la pregunta copiada, se espera la respuesta nueva: las opciones
    // anteriores quedan en "ver las anteriores".
    batchStart: awaitingGuideAnswer ? opened.shownOptions.length : Math.max(0, opened.shownOptions.length - BATCH),
    showPrevious: false,
    selected: null, // { option, text, label }
    recommendation: null,
    error: null,
    own: { text: '', label: '', comment: undefined, message: '' },
    message: '',
    busy: false,
    guide: awaitingGuideAnswer || opened.mode === 'guide',
    guideReturning: awaitingGuideAnswer,
  };

  const body = h('div', { class: 'gate-body' });
  const root = screen(gateText.title, [
    h('header', { class: 'gate-header' }, [
      h('p', { class: 'eyebrow', text: t.eyebrow }),
      h('h2', { text: gateText.title }),
    ]),
    body,
  ], 'gate-screen');
  container.append(root);

  function close() {
    root.remove();
    onClose();
  }

  function exit() {
    gateFlow.closeGate(gateId);
    close();
  }

  // --- Acciones ---

  async function loadOptions() {
    state.busy = true;
    state.view = 'loading';
    state.error = null;
    render();
    const result = await gateFlow.requestOptions(gateId);
    state.busy = false;
    if (!root.isConnected) return;
    if (result.ok) {
      state.batchStart = state.all.length;
      state.all = [...state.all, ...result.options];
      state.selected = null;
      state.recommendation = null;
      state.view = 'options';
    } else if (result.guide || result.switchedToGuide) {
      state.guide = true;
      state.view = 'options';
    } else if (result.reason !== 'cancelled') {
      state.error = result.reason;
      state.view = 'error';
    }
    render();
  }

  function select(option) {
    state.selected = { option, text: option.text, label: option.extras?.publicLabel ?? '' };
    state.message = '';
    render();
  }

  async function recommend() {
    const batch = currentBatch();
    if (batch.length === 0) return;
    state.busy = true;
    render();
    const result = await gateFlow.askRecommendation(gateId, batch);
    state.busy = false;
    if (!root.isConnected) return;
    if (result.ok) {
      state.recommendation = { option: batch[result.index], reason: result.reason, fromAnswer: Boolean(result.fromAnswer) };
      select(batch[result.index]);
      return;
    }
    state.message = texts.aiErrors[result.reason] ?? texts.aiErrors.failed;
    render();
  }

  async function approve(text, origin, label) {
    if (wantsLabel && !label.trim()) {
      state.message = t.labelRequired;
      render();
      return;
    }
    state.busy = true;
    render();
    const result = await gateFlow.approvePiece(gateId, { text, origin, extras: wantsLabel ? { publicLabel: label } : {} });
    state.busy = false;
    if (!result.ok) {
      state.message = texts.validation[result.reason] ?? (result.reason === 'invalidExtras' ? t.labelRequired : texts.aiErrors.failed);
      render();
      return;
    }
    if (result.save && !result.save.ok && result.save.warn) onNotice(texts.notices.cannotSave);
    onNotice(t.approved);
    close();
  }

  async function checkOwn() {
    state.busy = true;
    render();
    const result = await gateFlow.submitOwnAnswer(gateId, state.own.text);
    state.busy = false;
    if (!root.isConnected) return;
    if (!result.ok) {
      state.own.message = texts.validation[result.reason] ?? '';
      state.own.comment = undefined;
    } else {
      state.own.message = '';
      state.own.comment = result.comment;
    }
    render();
  }

  // --- Piezas de la pantalla ---

  function currentBatch() {
    return state.all.slice(state.batchStart);
  }

  function card(option) {
    const selected = state.selected?.option === option;
    return h('button', {
      type: 'button',
      class: `card${selected ? ' selected' : ''}${option.recommended ? ' recommended' : ''}`,
      attrs: { 'aria-pressed': selected ? 'true' : 'false' },
      on: { click: () => select(option) },
    }, [
      option.recommended ? h('span', { class: 'badge', text: t.recommended }) : null,
      h('strong', { class: 'card-title', text: option.text }),
      option.pros ? h('span', { class: 'card-line pros', text: `${t.pros} ${option.pros}` }) : null,
      option.risks ? h('span', { class: 'card-line risks', text: `${t.risks} ${option.risks}` }) : null,
    ]);
  }

  function labelField(value, onInput) {
    if (!wantsLabel) return null;
    const input = h('input', { type: 'text', value, maxLength: 40, attrs: { 'aria-label': t.publicLabel }, on: { input: (e) => onInput(e.target.value) } });
    return h('div', { class: 'field' }, [
      h('span', { class: 'label', text: t.publicLabel }),
      input,
      h('span', { class: 'hint', text: t.publicLabelHint }),
    ]);
  }

  function selectedEditor() {
    if (!state.selected) return null;
    const { option } = state.selected;
    const textarea = h('textarea', {
      value: state.selected.text,
      maxLength: 500,
      attrs: { 'aria-label': t.yourChoice },
      on: { input: (e) => { state.selected.text = e.target.value; } },
    });
    return h('div', { class: 'editor' }, [
      h('span', { class: 'label', text: t.yourChoice }),
      textarea,
      h('span', { class: 'hint', text: t.editHint }),
      labelField(state.selected.label, (v) => { state.selected.label = v; }),
      button(texts.buttons.approve, () => {
        const text = state.selected.text;
        const origin = text === option.text ? 'ai' : 'aiEdited';
        approve(text, origin, state.selected.label);
      }, 'primary'),
    ]);
  }

  function lessonView() {
    return [
      h('p', { class: 'lesson', text: gateText.lesson.text }),
      h('p', { class: 'example' }, [h('strong', { text: `${t.example} ` }), gateText.lesson.example.replace(/^Ejemplo:\s*/, '')]),
      h('div', { class: 'row' }, [
        button(texts.buttons.seeOptions, () => { gateFlow.completeLesson(gateId); state.view = 'options'; startOptions(); }, 'primary'),
        button(texts.buttons.skipLesson, () => { gateFlow.completeLesson(gateId); state.view = 'options'; startOptions(); }),
      ]),
    ];
  }

  function loadingView() {
    const tip = gateText.tips?.[0];
    return [
      h('p', { class: 'thinking', attrs: { role: 'status' }, text: t.thinking }),
      tip ? h('p', { class: 'tip' }, [h('strong', { text: `${t.tip} ` }), tip]) : null,
      button(texts.buttons.exitGate, exit, 'keep'),
    ];
  }

  function errorView() {
    return [
      h('p', { class: 'error', attrs: { role: 'alert' }, text: texts.aiErrors[state.error] ?? texts.aiErrors.failed }),
      h('div', { class: 'row' }, [
        button(texts.buttons.retry, loadOptions, 'primary'),
        button(texts.buttons.writeOwn, () => { state.view = 'own'; render(); }),
        button(texts.buttons.exitGate, exit),
      ]),
    ];
  }

  function optionsView() {
    const batch = currentBatch();
    const previous = state.all.slice(0, state.batchStart);
    const parts = [];
    if (batch.length === 0 && state.guide) {
      if (state.showWhy === undefined) state.showWhy = guideFlow.takeGuideNotice();
      parts.push(createGuidePanel({
        guideFlow, gateId, texts, showWhy: state.showWhy,
        focusPaste: state.guideReturning,
        onNotice,
        onOptions: (options) => {
          state.guideReturning = false;
          state.batchStart = state.all.length;
          state.all = [...state.all, ...options];
          render();
        },
      }));
    } else if (batch.length > 0) {
      if (state.recommendation) {
        parts.push(h('p', { class: 'recommendation' }, [
          h('strong', { text: `${state.recommendation.fromAnswer ? t.recommendationFromAnswer : t.recommendation} ` }),
          `${state.recommendation.option.text}. ${state.recommendation.reason}`,
        ]));
      }
      parts.push(h('div', { class: 'cards', attrs: { role: 'group', 'aria-label': t.options } }, batch.map(card)));
      parts.push(selectedEditor());
      if (previous.length > 0) {
        parts.push(button(state.showPrevious ? t.hidePrevious : `${texts.buttons.previousOptions} (${previous.length})`, () => {
          state.showPrevious = !state.showPrevious;
          render();
        }, 'link'));
        if (state.showPrevious) parts.push(h('div', { class: 'cards previous' }, previous.map(card)));
      }
    }
    if (state.message) parts.push(h('p', { class: 'error', attrs: { role: 'alert' }, text: state.message }));
    const actions = [];
    if (batch.length > 0) {
      actions.push(button(texts.buttons.recommend, recommend));
      if (!state.guide) actions.push(button(texts.buttons.otherOptions, loadOptions));
      else actions.push(button(texts.buttons.otherOptions, () => { state.batchStart = state.all.length; render(); }));
    }
    actions.push(button(texts.buttons.writeOwn, () => { state.view = 'own'; render(); }));
    actions.push(button(texts.buttons.close, exit));
    parts.push(h('div', { class: 'row actions' }, actions));
    return parts;
  }

  function ownView() {
    const own = state.own;
    const textarea = h('textarea', {
      value: own.text,
      maxLength: 500,
      attrs: { 'aria-label': t.ownTitle },
      on: { input: (e) => { own.text = e.target.value; own.comment = undefined; } },
    });
    const reviewed = own.comment !== undefined;
    return [
      h('span', { class: 'label', text: t.ownTitle }),
      textarea,
      labelField(own.label, (v) => { own.label = v; }),
      own.message ? h('p', { class: 'error', attrs: { role: 'alert' }, text: own.message }) : null,
      reviewed && own.comment ? h('p', { class: 'comment' }, [h('strong', { text: `${t.commentTitle} ` }), own.comment]) : null,
      state.message ? h('p', { class: 'error', attrs: { role: 'alert' }, text: state.message }) : null,
      h('div', { class: 'row' }, [
        reviewed
          ? button(texts.buttons.approve, () => approve(own.text, 'player', own.label), 'primary')
          : button(t.checkOwn, checkOwn, 'primary'),
        button(t.backToOptions, () => { state.view = 'options'; state.message = ''; render(); }),
        button(texts.buttons.close, exit),
      ]),
    ];
  }

  function render() {
    const views = { lesson: lessonView, loading: loadingView, error: errorView, options: optionsView, own: ownView };
    replace(body, ...views[state.view]());
    for (const control of body.querySelectorAll('button')) control.disabled = state.busy && !control.classList.contains('keep');
  }

  function startOptions() {
    // Sin opciones todavía se piden: en modo guía la aplicación responde al instante que toca
    // el modo guía, salvo las opciones fijas ya explicadas, que no necesitan IA.
    if (state.all.length === 0 && !state.guideReturning) loadOptions();
    else render();
  }

  if (state.view === 'lesson') render();
  else startOptions();

  return { close: exit };
}
