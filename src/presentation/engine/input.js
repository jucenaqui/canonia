// Controles (T028): tres botones táctiles y teclado (001/FR-001, FR-002).
// Izquierda y derecha a la vez dejan quieto al personaje (lo resuelve physics.js).

const KEYS = {
  left: ['ArrowLeft', 'KeyA'],
  right: ['ArrowRight', 'KeyD'],
  jump: ['Space', 'ArrowUp', 'KeyW'],
};

function isTyping(target) {
  return target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
}

/**
 * @param {object} options
 * @param {{ left: HTMLElement, right: HTMLElement, jump: HTMLElement }} options.buttons
 * @param {EventTarget} [options.keyTarget]
 */
export function createInput({ buttons, keyTarget = globalThis }) {
  const held = { left: false, right: false, jump: false };
  let jumpPresses = 0;
  let enabled = true;
  const cleanups = [];

  function set(control, value) {
    if (!enabled && value) return;
    if (control === 'jump' && value && !held.jump) jumpPresses += 1;
    held[control] = value;
    buttons[control]?.classList.toggle('held', value);
  }

  function listen(target, type, handler, options) {
    target.addEventListener(type, handler, options);
    cleanups.push(() => target.removeEventListener(type, handler, options));
  }

  // Teclado
  const controlOf = (code) => Object.keys(KEYS).find((control) => KEYS[control].includes(code));
  listen(keyTarget, 'keydown', (event) => {
    const control = controlOf(event.code);
    if (!control || isTyping(event.target) || !enabled) return;
    event.preventDefault();
    if (!event.repeat) set(control, true);
  });
  listen(keyTarget, 'keyup', (event) => {
    const control = controlOf(event.code);
    if (control) set(control, false);
  });
  listen(keyTarget, 'blur', () => reset());

  // Botones táctiles, con captura del puntero para no perder el "soltar"
  for (const [control, element] of Object.entries(buttons)) {
    if (!element) continue;
    listen(element, 'pointerdown', (event) => {
      event.preventDefault();
      element.setPointerCapture?.(event.pointerId);
      set(control, true);
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      listen(element, type, () => set(control, false));
    }
    listen(element, 'contextmenu', (event) => event.preventDefault());
  }

  function reset() {
    for (const control of Object.keys(held)) set(control, false);
    jumpPresses = 0;
  }

  return {
    /** Estado para el cuadro actual. `jumpPressed` se consume al leerlo. */
    snapshot() {
      const jumpPressed = jumpPresses > 0;
      jumpPresses = 0;
      return { left: held.left, right: held.right, jumpHeld: held.jump, jumpPressed };
    },
    /** Suelta todo, por ejemplo al abrir una puerta o al pausar. */
    reset,
    setEnabled(value) {
      enabled = value;
      if (!value) reset();
    },
    destroy() {
      for (const cleanup of cleanups) cleanup();
    },
  };
}
