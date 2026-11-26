// Panel "Tu ficha del influencer": las piezas del mundo en orden, con lo elegido, "Por decidir" o
// "Por revisar". Solo informa (006/FR-015): no aprueba nada. Todo texto entra como texto plano.
// "Empezar de nuevo" solo aparece si quien integra pasa `onRestart` (vista previa), y pide confirmación.

import { h, button, screen, replace } from './dom.js';

/**
 * @param {object} options
 * @param {HTMLElement} options.container Capa de pantallas.
 * @param {object} options.texts Textos comunes (content/es.js).
 * @param {{ name: string, value: string | null, review?: boolean }[]} options.rows Una fila por pieza, en orden.
 * @param {() => void} [options.onClose]
 * @param {() => void} [options.onRestart] Si existe, se ofrece "Empezar de nuevo" con confirmación.
 */
export function openSheetScreen({ container, texts, rows, onClose = () => {}, onRestart = null }) {
  const t = texts.sheetPanel;
  let asking = false;
  const root = h('div', { class: 'sheet-panel' });
  let section = null;

  function close() {
    if (!section) return;
    section.remove();
    section = null;
    onClose();
  }

  function render() {
    const list = h('ol', { class: 'sheet-rows' }, rows.map((row) => h('li', { class: `sheet-row${row.value === null ? ' empty' : ''}${row.review ? ' review' : ''}` }, [
      h('span', { class: 'sheet-row-name', text: row.name }),
      h('span', { class: 'sheet-row-value', text: row.value === null ? t.pending : row.value }),
      row.review && row.value !== null ? h('span', { class: 'sheet-row-flag', text: t.toReview }) : null,
    ])));
    const restart = !onRestart ? null : asking
      ? h('div', { class: 'sheet-restart' }, [
        h('p', { class: 'hint', text: t.restartAsk }),
        h('div', { class: 'row actions' }, [button(t.restartYes, () => onRestart(), 'danger'), button(t.restartNo, () => { asking = false; render(); })]),
      ])
      : button(t.restart, () => { asking = true; render(); }, 'link');
    replace(root,
      h('h3', { class: 'sheet-title', text: t.title }),
      h('p', { class: 'lead', text: t.lead }),
      list,
      h('div', { class: 'row actions' }, [button(t.close, close, 'primary')]),
      restart);
  }

  render();
  section = screen(t.title, [root], 'sheet-screen');
  container.append(section);
  return { close, element: section };
}
