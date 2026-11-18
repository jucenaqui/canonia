// Ayudas para construir pantallas. Todo texto entra como texto plano (textContent), nunca como
// HTML: así el texto de la IA o del jugador no puede inyectar nada (research R8).

/**
 * Crea un elemento.
 * @param {string} tag
 * @param {Record<string, unknown>} [props] `class`, `text`, `on` (eventos), `attrs` y propiedades del elemento.
 * @param {(Node | string | null | false | undefined)[]} [children]
 */
export function h(tag, props = {}, children = []) {
  const element = document.createElement(tag);
  const { class: className, text, on, attrs, ...rest } = props;
  if (className) element.className = className;
  if (text !== undefined && text !== null) element.textContent = String(text);
  for (const [name, handler] of Object.entries(on ?? {})) element.addEventListener(name, handler);
  for (const [name, value] of Object.entries(attrs ?? {})) {
    if (value !== false && value !== null && value !== undefined) element.setAttribute(name, value === true ? '' : String(value));
  }
  Object.assign(element, rest);
  for (const child of children) {
    if (child === null || child === false || child === undefined) continue;
    element.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return element;
}

/** Botón con texto. */
export function button(text, onClick, className = '') {
  return h('button', { type: 'button', class: className, text, on: { click: onClick } });
}

/** Pantalla a pantalla completa sobre el lienzo, con su cuerpo centrado. */
export function screen(label, children, className = '') {
  return h('section', { class: `screen ${className}`.trim(), attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-label': label } }, [
    h('div', { class: 'screen-body' }, children),
  ]);
}

/** Sustituye el contenido de un contenedor. */
export function replace(container, ...children) {
  container.replaceChildren(...children.filter(Boolean));
}

/** Copia un texto. Si el sistema no deja, devuelve false para mostrarlo seleccionado (005/FR-013). */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
