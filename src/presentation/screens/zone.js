// Pantalla de una zona de decisión del mundo 3D (T024, spec 006/US2; D47, D51, D52, D60).
// Parte de screens/gate.js, pero no llama a la aplicación: recibe callbacks. Muestra la ficha de
// una opción (primera vista liviana con lo esencial, "Probar" y "Ver más"; los ejemplos y lo que se
// aprende se ven al entrar al minijuego), la ficha de "Otra" y de "No sé, recomiéndame",
// y la tarjeta de aprobación con la tabla de criterios.
// Solo el botón "Aprobar" de la tarjeta llama a onApprove; nada más fija una pieza (006/FR-015).
// Todo texto de la IA o del jugador entra como texto plano (h() usa textContent).

import { h, button, screen, replace } from './dom.js';

/**
 * @typedef {object} ZoneCallbacks
 * @property {(optionId: string) => void} [onInspect] Se abrió la ficha de una opción.
 * @property {(optionId: string) => void} [onTry] El jugador quiere probar la opción (minijuego).
 * @property {(optionId: string) => void} [onChoose] "Elegir esta": se abre la tarjeta de aprobación.
 * @property {(optionId: string) => void} [onChange] "Cambiar a esta": igual que elegir, cuando ya hay una elegida.
 * @property {(ownText: string) => (void | { ok: boolean, reason?: string } | Promise<void | { ok: boolean, reason?: string }>)} [onOther] El jugador escribió "Otra".
 * @property {(answerId: string) => (void | { ok: boolean, reason?: string } | Promise<void | { ok: boolean, reason?: string }>)} [onRecommend] Respuesta a la pregunta jugada.
 * @property {(choice: { optionId?: string, ownText?: string }) => (void | { ok: boolean, reason?: string } | Promise<void | { ok: boolean, reason?: string }>)} [onApprove] Pulsó "Aprobar".
 * @property {() => void} [onClose] Se cerró la pantalla (aprobada o no).
 */

const LEVEL_CLASS = { 1: 'lvl-1', 2: 'lvl-2', 3: 'lvl-3' };

/** Valor de un criterio con su etiqueta. */
export function levelLabel(zone, key, value) {
  return zone.levelsByKey?.[key]?.[value] ?? zone.levels[value] ?? String(value);
}

/** Si un valor de un criterio es favorable (para colorear la tabla). */
export function isFavorable(better, value) {
  return better === 'high' ? value === 3 : value === 1;
}

/**
 * @param {object} options
 * @param {HTMLElement} options.container Capa de pantallas.
 * @param {typeof import('../../content/world-1/zone-income.js').INCOME_ZONE} options.zone Contenido de la zona.
 * @param {object} options.texts Textos comunes (content/es.js).
 * @param {{ type: 'sheet', optionId: string } | { type: 'other' } | { type: 'recommend' }} options.view Qué abrir.
 * @param {string | null} [options.chosenId] Opción aprobada ahora (la elección actual).
 * @param {string[]} [options.playedIds] Opciones ya probadas.
 * @param {string | null} [options.recommendedId] Opción recomendada por PIX.
 * @param {string} [options.recommendedReason]
 * @param {string[]} [options.dependents] Nombres de lo que quedaría "por revisar" si se cambia la elección.
 * @param {ZoneCallbacks} options.callbacks
 */
export function openZoneScreen({ container, zone, texts, view, chosenId = null, playedIds = [], recommendedId = null, recommendedReason = '', dependents = [], callbacks }) {
  const t = texts.zone;
  const state = {
    view: view ?? { type: 'recommend' },
    chosenId,
    played: new Set(playedIds),
    recommendedId,
    recommendedReason,
    dependents,
    // Lo que se está por aprobar: { optionId } o { ownText }.
    pending: null,
    ownText: '',
    answerId: null,
    moreOpen: false, // "Ver más" de la ficha (D60)
    message: '',
    busy: false,
  };

  const body = h('div', { class: 'zone-body' });
  const root = screen(zone.title, [
    h('header', { class: 'gate-header' }, [
      h('p', { class: 'eyebrow', text: t.eyebrow }),
      h('h2', { text: zone.title }),
    ]),
    body,
  ], 'gate-screen zone-screen');
  container.append(root);

  const optionOf = (id) => zone.options.find((o) => o.id === id) ?? null;

  function close() {
    if (!root.isConnected) return;
    root.remove();
    callbacks.onClose?.();
  }

  /** Espera a un callback que puede ser asíncrono; devuelve su resultado o un fallo explicado por PIX. */
  async function run(fn) {
    state.busy = true; state.message = ''; render();
    let result;
    try { result = await fn(); } catch { result = { ok: false, reason: 'failed' }; }
    state.busy = false;
    if (!root.isConnected) return { ok: false, reason: 'closed' };
    if (result && result.ok === false) {
      state.message = texts.validation[result.reason] ?? texts.aiErrors[result.reason] ?? texts.aiErrors.failed;
      render();
      return result;
    }
    render(); // quita "Un momento…" y vuelve a habilitar los botones
    return { ok: true };
  }

  // --- Acciones ---

  function showSheet(optionId) {
    if (!optionOf(optionId)) return;
    state.view = { type: 'sheet', optionId };
    state.moreOpen = false;
    state.message = '';
    callbacks.onInspect?.(optionId);
    render();
  }

  function startApproval(pending, changing) {
    state.pending = pending;
    state.view = { type: 'approve' };
    state.message = '';
    if (pending.optionId) (changing ? callbacks.onChange : callbacks.onChoose)?.(pending.optionId);
    render();
  }

  async function submitOther() {
    const text = state.ownText.trim();
    if (text.length < 2) { state.message = t.otherBlank; render(); return; }
    const done = await run(async () => callbacks.onOther?.(text));
    if (done.ok) startApproval({ ownText: text }, false);
  }

  async function submitRecommend() {
    if (!state.answerId) { state.message = t.recommendPick; render(); return; }
    await run(async () => callbacks.onRecommend?.(state.answerId));
  }

  async function approve() {
    const choice = state.pending.optionId ? { optionId: state.pending.optionId } : { ownText: state.pending.ownText };
    const done = await run(async () => callbacks.onApprove?.(choice));
    if (done.ok) close();
  }

  // --- Piezas ---

  function badges(optionId) {
    const items = [];
    if (state.chosenId === optionId) items.push(h('span', { class: 'badge badge-ok', text: t.currentChoice }));
    if (state.recommendedId === optionId) items.push(h('span', { class: 'badge', text: t.recommended }));
    if (state.played.has(optionId)) items.push(h('span', { class: 'badge badge-soft', text: t.played }));
    return items.length ? h('div', { class: 'badges' }, items) : null;
  }

  /** Campos de la ficha: la primera vista solo trae lo esencial; "Ver más" despliega el resto (D60). */
  function sheetList(option) {
    const essential = zone.sheetEssential ?? zone.sheetFields.map((f) => f.key);
    const fields = zone.sheetFields.filter((f) => state.moreOpen || essential.includes(f.key));
    const rows = fields.map((field) => h('div', { class: `sheet-row${essential.includes(field.key) ? '' : ' sheet-extra'}` }, [
      h('dt', { text: field.label }),
      h('dd', { text: option.sheet[field.key] }),
    ]));
    return h('dl', { class: 'sheet' }, rows);
  }

  function sheetView() {
    const option = optionOf(state.view.optionId);
    const isCurrent = state.chosenId === option.id;
    const hasOther = Boolean(state.chosenId) && !isCurrent;
    const actions = [];
    actions.push(button(t.tryIt, () => callbacks.onTry?.(option.id)));
    const hasMore = zone.sheetFields.some((f) => !(zone.sheetEssential ?? []).includes(f.key)) && Boolean(zone.sheetEssential);
    if (hasMore) {
      const more = button(state.moreOpen ? t.seeLess : t.seeMore, () => { state.moreOpen = !state.moreOpen; render(); }, 'more-toggle');
      more.setAttribute('aria-expanded', state.moreOpen ? 'true' : 'false');
      actions.push(more);
    }
    if (isCurrent) {
      const current = button(t.currentChoice, () => {}, 'is-current');
      current.disabled = true;
      current.setAttribute('aria-disabled', 'true');
      actions.push(current);
    } else {
      actions.push(button(hasOther ? t.changeToThis : t.chooseThis, () => startApproval({ optionId: option.id }, hasOther), 'primary'));
    }
    return [
      badges(option.id),
      h('h3', { class: 'sheet-title', text: option.name }),
      h('p', { class: 'lead', text: option.short }),
      sheetList(option),
      h('div', { class: 'row actions' }, actions),
      button(t.back, close, 'link'),
    ];
  }

  function otherView() {
    const textarea = h('textarea', {
      value: state.ownText,
      maxLength: 500,
      attrs: { 'aria-label': zone.other.label },
      on: { input: (e) => { state.ownText = e.target.value; } },
    });
    return [
      h('h3', { class: 'sheet-title', text: t.otherTitle }),
      h('p', { class: 'lead', text: zone.other.short }),
      h('span', { class: 'label', text: zone.other.label }),
      textarea,
      h('span', { class: 'hint', text: zone.other.hint }),
      h('div', { class: 'row actions' }, [
        button(t.otherSubmit, submitOther, 'primary'),
        button(t.back, close),
      ]),
    ];
  }

  function recommendView() {
    const r = zone.recommend;
    const answers = r.answers.map((answer) => h('button', {
      type: 'button',
      class: `card${state.answerId === answer.id ? ' selected' : ''}`,
      attrs: { 'aria-pressed': state.answerId === answer.id ? 'true' : 'false' },
      on: { click: () => { state.answerId = answer.id; render(); } },
    }, [h('strong', { class: 'card-title', text: answer.label })]));
    const recommended = state.recommendedId ? optionOf(state.recommendedId) : null;
    return [
      h('h3', { class: 'sheet-title', text: t.recommendTitle }),
      h('p', { class: 'lead', text: r.question }),
      h('div', { class: 'cards', attrs: { role: 'group', 'aria-label': r.question } }, answers),
      recommended ? h('p', { class: 'recommendation' }, [
        h('strong', { text: `${t.recommended}: ` }),
        `${recommended.name}. `,
        state.recommendedReason ? `${t.recommendWhy} ${state.recommendedReason}` : '',
      ]) : null,
      h('p', { class: 'hint', text: r.footer }),
      h('div', { class: 'row actions' }, [
        button(t.recommendSubmit, submitRecommend, 'primary'),
        recommended ? button(t.seeRecommended, () => showSheet(recommended.id)) : null,
        button(t.back, close),
      ]),
    ];
  }

  function criteriaTable(selectedId) {
    const head = h('tr', {}, [
      h('th', { attrs: { scope: 'col' }, text: '' }),
      ...zone.criteriaKeys.map((c) => h('th', { attrs: { scope: 'col' }, text: c.label })),
    ]);
    const rows = zone.options.map((option) => h('tr', { class: option.id === selectedId ? 'is-selected' : '' }, [
      h('th', { attrs: { scope: 'row' }, text: option.name }),
      ...zone.criteriaKeys.map((c) => {
        const value = option.criteria[c.key];
        return h('td', { class: `${LEVEL_CLASS[value] ?? ''}${isFavorable(c.better, value) ? ' favorable' : ''}`, text: levelLabel(zone, c.key, value) });
      }),
    ]));
    return h('div', { class: 'table-wrap' }, [
      h('table', { class: 'criteria', attrs: { 'aria-label': t.compareTitle } }, [h('thead', {}, [head]), h('tbody', {}, rows)]),
    ]);
  }

  function approveView() {
    const pending = state.pending;
    const option = pending.optionId ? optionOf(pending.optionId) : null;
    const changing = Boolean(state.chosenId) && state.chosenId !== pending.optionId;
    const summary = option
      ? h('div', { class: 'approve-card' }, [
        h('strong', { class: 'card-title', text: option.name }),
        h('span', { class: 'card-line', text: option.short }),
        h('span', { class: 'card-line pros', text: `${zone.sheetFields.find((f) => f.key === 'pros').label}: ${option.sheet.pros}` }),
        h('span', { class: 'card-line risks', text: `${zone.sheetFields.find((f) => f.key === 'risks').label}: ${option.sheet.risks}` }),
      ])
      : h('div', { class: 'approve-card' }, [
        h('strong', { class: 'card-title', text: t.ownChoiceLabel }),
        h('span', { class: 'card-line', text: pending.ownText }), // texto del jugador: siempre texto plano
      ]);
    return [
      h('h3', { class: 'sheet-title', text: t.approveTitle }),
      h('p', { class: 'lead', text: t.approveLead }),
      summary,
      changing ? h('p', { class: 'warning', text: t.changeWarning }) : null,
      changing && state.dependents.length ? h('p', { class: 'hint' }, [h('strong', { text: `${t.changeDependents} ` }), state.dependents.join(', ')]) : null,
      h('p', { class: 'label', text: t.compareTitle }),
      criteriaTable(pending.optionId ?? null),
      h('p', { class: 'hint', text: t.compareHint }),
      h('div', { class: 'row actions' }, [
        button(texts.buttons.approve, approve, 'primary'),
        button(t.keepExploring, close),
      ]),
    ];
  }

  function render() {
    const views = { sheet: sheetView, other: otherView, recommend: recommendView, approve: approveView };
    const parts = views[state.view.type]();
    if (state.busy) parts.push(h('p', { class: 'thinking', attrs: { role: 'status' }, text: t.working }));
    if (state.message) parts.push(h('p', { class: 'error', attrs: { role: 'alert' }, text: state.message }));
    replace(body, ...parts);
    for (const control of body.querySelectorAll('button')) {
      if (state.busy) control.disabled = true;
    }
  }

  if (state.view.type === 'sheet') callbacks.onInspect?.(state.view.optionId);
  render();

  return {
    root,
    showSheet,
    showOther() { state.view = { type: 'other' }; state.message = ''; render(); },
    showRecommend() { state.view = { type: 'recommend' }; state.message = ''; render(); },
    /** La aplicación calculó la recomendación: se muestra con su motivo. */
    setRecommended(optionId, reason = '') { state.recommendedId = optionId; state.recommendedReason = reason; render(); },
    setChosen(optionId) { state.chosenId = optionId; render(); },
    setPlayed(ids) { state.played = new Set(ids); render(); },
    close,
  };
}
