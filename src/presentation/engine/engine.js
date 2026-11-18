// Motor de plataformas armado: une bucle, controles, nivel, cámara y dibujo, y habla con la
// aplicación solo por eventos (contracts/puertos.md, sección 3).

import { ENGINE_EVENTS, APP_COMMANDS } from '../../application/events.js';
import { createLoop } from './loop.js';
import { createInput } from './input.js';
import { createCamera } from './camera.js';
import { buildLevel, createLevelRuntime } from './level.js';
import { createRenderer } from './render.js';

/**
 * @param {object} options
 * @param {HTMLCanvasElement} options.canvas
 * @param {{ left: HTMLElement, right: HTMLElement, jump: HTMLElement }} options.buttons
 * @param {HTMLElement} [options.controls] Contenedor de los botones táctiles, para reservar su alto.
 * @param {object} options.levelDef Definición del nivel en casillas (src/content).
 * @param {ReturnType<import('../../application/events.js').createEventBus>} options.events
 * @param {string[]} [options.resolvedGates]
 * @param {(reason: string) => void} [options.onAutoPause]
 */
export function createEngine({ canvas, buttons, controls, levelDef, events, resolvedGates = [], onAutoPause = () => {} }) {
  const renderer = createRenderer(canvas);
  const input = createInput({ buttons });
  const camera = createCamera();
  const runtime = createLevelRuntime(buildLevel(levelDef), {
    resolvedGates,
    emit: (name, data) => {
      if (name === ENGINE_EVENTS.GATE_REACHED) {
        input.setEnabled(false);
        loop.pause();
      }
      events.emit(name, data);
    },
  });
  let time = 0;

  const loop = createLoop({
    update(dt) {
      time += dt;
      runtime.update(input.snapshot(), dt);
      camera.follow(runtime.body, runtime.level, renderer.view, dt);
    },
    render() {
      renderer.draw(runtime, camera, time);
    },
    onAutoPause(reason) {
      input.setEnabled(false);
      events.emit(ENGINE_EVENTS.LEVEL_PAUSED, { reason });
      onAutoPause(reason);
    },
  });

  function resize() {
    const reserve = controls && getComputedStyle(controls).display !== 'none' ? controls.getBoundingClientRect().height : 0;
    renderer.resize(reserve);
    camera.snap(runtime.body, runtime.level, renderer.view);
  }

  const unsubscribe = [
    events.on(APP_COMMANDS.SET_GATE_RESOLVED, ({ gateId }) => runtime.setGateResolved(gateId)),
    events.on(APP_COMMANDS.RESUME_LEVEL, () => {
      runtime.resumeLevel();
      input.setEnabled(true);
      loop.resume();
    }),
  ];
  globalThis.addEventListener('resize', resize);

  return {
    runtime,
    start() {
      resize();
      loop.start();
    },
    /** Pausa del jugador (001/FR-031). */
    pause() {
      loop.pause();
      input.setEnabled(false);
      events.emit(ENGINE_EVENTS.LEVEL_PAUSED, { reason: 'player' });
    },
    resume() {
      if (runtime.state !== 'playing') return;
      input.setEnabled(true);
      loop.resume();
      events.emit(ENGINE_EVENTS.LEVEL_RESUMED, {});
    },
    /** Para continuar una partida: el personaje aparece en el punto seguro anterior a esa puerta. */
    placeBeforeGate(gateId) {
      runtime.placeBeforeGate(gateId);
      camera.snap(runtime.body, runtime.level, renderer.view);
    },
    /** Para continuar una partida guardada con esa puerta abierta (005/FR-016). */
    holdAtGate(gateId) {
      if (!runtime.holdAtGate(gateId)) return false;
      input.setEnabled(false);
      loop.pause();
      camera.snap(runtime.body, runtime.level, renderer.view);
      return true;
    },
    destroy() {
      loop.destroy();
      input.destroy();
      unsubscribe.forEach((off) => off());
      globalThis.removeEventListener('resize', resize);
    },
  };
}
