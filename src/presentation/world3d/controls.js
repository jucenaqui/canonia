// Controles del mundo 3D (T015, spec 006/FR-001 a FR-005, FR-010):
// palanca táctil a la izquierda, botones de saltar y de acción a la derecha,
// girar la cámara deslizando el dedo por la escena, y teclado.

const KEYS = {
  left: ['ArrowLeft', 'KeyA'],
  right: ['ArrowRight', 'KeyD'],
  up: ['ArrowUp', 'KeyW'],
  down: ['ArrowDown', 'KeyS'],
  jump: ['Space'],
  action: ['KeyE', 'Enter'],
  turnLeft: ['KeyQ'],
  turnRight: ['KeyR'],
};

/** Radianes por píxel al deslizar y por segundo con Q y R. */
export const TURN = Object.freeze({ perPixel: 0.008, perSecond: 2 });
const STICK_RADIUS = 42;

function isTyping(target) {
  return typeof Element !== 'undefined' && target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'));
}

/**
 * @param {object} options
 * @param {HTMLElement} options.container Capa sobre el lienzo donde van los botones.
 * @param {HTMLElement} options.dragSurface Elemento donde deslizar gira la cámara (el lienzo).
 * @param {EventTarget} [options.keyTarget]
 * @param {{ jump: string, action: string, stick: string }} [options.labels]
 */
export function createControls({ container, dragSurface, keyTarget = globalThis, labels = { jump: 'Saltar', action: '', stick: 'Moverse' } }) {
  const root = document.createElement('div');
  root.className = 'w3d-controls';
  root.innerHTML = `
    <div class="w3d-stick" role="presentation" aria-label="${labels.stick}"><div class="w3d-knob"></div></div>
    <div class="w3d-buttons">
      <button type="button" class="w3d-action" hidden></button>
      <button type="button" class="w3d-jump" aria-label="${labels.jump}">${labels.jump}</button>
    </div>`;
  container.appendChild(root);
  const stickEl = root.querySelector('.w3d-stick');
  const knob = root.querySelector('.w3d-knob');
  const jumpEl = root.querySelector('.w3d-jump');
  const actionEl = root.querySelector('.w3d-action');

  const stick = { x: 0, y: 0 };
  const keys = new Set();
  let jumpHeld = false;
  let jumpPresses = 0;
  let actionPresses = 0;
  let yawDrag = 0;
  let enabled = true;
  const cleanups = [];
  const listen = (target, type, handler, opts) => { target.addEventListener(type, handler, opts); cleanups.push(() => target.removeEventListener(type, handler, opts)); };

  // Palanca
  let stickId = null; let cx = 0; let cy = 0;
  const moveStick = (event) => {
    let dx = event.clientX - cx; let dy = event.clientY - cy;
    const length = Math.hypot(dx, dy);
    if (length > STICK_RADIUS) { dx *= STICK_RADIUS / length; dy *= STICK_RADIUS / length; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    stick.x = dx / STICK_RADIUS; stick.y = dy / STICK_RADIUS;
  };
  const endStick = (event) => { if (event.pointerId !== stickId) return; stickId = null; stick.x = 0; stick.y = 0; knob.style.transform = ''; };
  listen(stickEl, 'pointerdown', (event) => {
    if (!enabled) return;
    event.preventDefault();
    stickId = event.pointerId; stickEl.setPointerCapture?.(event.pointerId);
    const r = stickEl.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2;
    moveStick(event);
  });
  listen(stickEl, 'pointermove', (event) => { if (event.pointerId === stickId) moveStick(event); });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(stickEl, type, endStick);

  // Saltar
  listen(jumpEl, 'pointerdown', (event) => { if (!enabled) return; event.preventDefault(); jumpEl.setPointerCapture?.(event.pointerId); if (!jumpHeld) jumpPresses++; jumpHeld = true; jumpEl.classList.add('held'); });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(jumpEl, type, () => { jumpHeld = false; jumpEl.classList.remove('held'); });
  for (const el of [stickEl, jumpEl, actionEl]) listen(el, 'contextmenu', (event) => event.preventDefault());

  // Acción
  listen(actionEl, 'click', () => { if (enabled) actionPresses++; });

  // Girar la cámara deslizando por la escena
  let dragId = null; let dragX = 0;
  listen(dragSurface, 'pointerdown', (event) => { if (!enabled) return; dragId = event.pointerId; dragX = event.clientX; dragSurface.setPointerCapture?.(event.pointerId); });
  listen(dragSurface, 'pointermove', (event) => { if (event.pointerId !== dragId) return; yawDrag -= (event.clientX - dragX) * TURN.perPixel; dragX = event.clientX; });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(dragSurface, type, (event) => { if (event.pointerId === dragId) dragId = null; });

  // Teclado
  const controlOf = (code) => Object.keys(KEYS).find((control) => KEYS[control].includes(code));
  listen(keyTarget, 'keydown', (event) => {
    const control = controlOf(event.code);
    if (!control || isTyping(event.target) || !enabled) return;
    event.preventDefault();
    if (event.repeat) return;
    keys.add(control);
    if (control === 'jump') jumpPresses++;
    if (control === 'action') actionPresses++;
  });
  listen(keyTarget, 'keyup', (event) => { const control = controlOf(event.code); if (control) keys.delete(control); });
  listen(keyTarget, 'blur', () => reset());

  function reset() {
    stick.x = 0; stick.y = 0; knob.style.transform = ''; stickId = null;
    keys.clear(); jumpHeld = false; jumpPresses = 0; actionPresses = 0; yawDrag = 0;
    jumpEl.classList.remove('held');
  }

  return {
    /**
     * Estado del cuadro. Los toques de saltar y de acción y el giro se consumen al leerlos.
     * @param {number} dt segundos desde el cuadro anterior
     */
    snapshot(dt) {
      let x = stick.x; let y = stick.y;
      if (keys.has('left')) x = -1;
      if (keys.has('right')) x = 1;
      if (keys.has('up')) y = -1;
      if (keys.has('down')) y = 1;
      let yaw = yawDrag;
      if (keys.has('turnLeft')) yaw += TURN.perSecond * dt;
      if (keys.has('turnRight')) yaw -= TURN.perSecond * dt;
      const result = {
        stick: { x, y },
        jumpHeld: jumpHeld || keys.has('jump'),
        jumpPressed: jumpPresses > 0,
        actionPressed: actionPresses > 0,
        yawDelta: yaw,
      };
      jumpPresses = 0; actionPresses = 0; yawDrag = 0;
      return result;
    },
    /** Muestra el botón de acción con lo que hará, o lo oculta con null (spec 006/FR-014). */
    setAction(text) {
      actionEl.hidden = !text;
      actionEl.textContent = text || '';
    },
    setEnabled(value) { enabled = value; if (!value) reset(); },
    reset,
    destroy() { for (const cleanup of cleanups) cleanup(); root.remove(); },
  };
}
