// Dibujo en el lienzo (T031). La vista muestra siempre VIEW_ROWS casillas de alto; el ancho
// visible depende de la pantalla. Abajo se reserva el alto de los botones táctiles para que
// no tapen al personaje ni a la puerta (001/FR-006).

import { PHYSICS } from './physics.js';
import { drawBackground, drawGround, drawPost, drawBlock, drawGate, drawCheckpoint } from '../art/world.js';
import { drawPlayer } from '../art/character.js';

export const VIEW_ROWS = 13;
const MAX_PIXEL_RATIO = 2;

/** @param {HTMLCanvasElement} canvas */
export function createRenderer(canvas) {
  const ctx = canvas.getContext('2d');
  let cssWidth = 0;
  let cssHeight = 0;
  let scale = 1;
  let ratio = 1;
  const view = { width: 0, height: VIEW_ROWS * PHYSICS.TILE };

  return {
    view,

    /**
     * Ajusta el lienzo al tamaño en pantalla.
     * @param {number} reserveBottom píxeles CSS ocupados por los botones táctiles.
     */
    resize(reserveBottom = 0) {
      const rect = canvas.getBoundingClientRect();
      cssWidth = Math.max(1, rect.width);
      cssHeight = Math.max(1, rect.height);
      ratio = Math.min(globalThis.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      canvas.width = Math.round(cssWidth * ratio);
      canvas.height = Math.round(cssHeight * ratio);
      const usable = Math.max(cssHeight * 0.5, cssHeight - reserveBottom);
      scale = usable / view.height;
      view.width = cssWidth / scale;
    },

    /**
     * @param {ReturnType<import('./level.js').createLevelRuntime>} runtime
     * @param {{ x: number, y: number }} camera
     * @param {number} time segundos desde el inicio
     */
    draw(runtime, camera, time) {
      const { level, body } = runtime;
      ctx.setTransform(ratio * scale, 0, 0, ratio * scale, 0, 0);
      const fullHeight = cssHeight / scale;
      drawBackground(ctx, { width: view.width, height: fullHeight }, camera, time);

      ctx.save();
      ctx.translate(-Math.round(camera.x), -Math.round(camera.y));
      const left = camera.x - PHYSICS.TILE;
      const right = camera.x + view.width + PHYSICS.TILE;
      const visible = (s) => s.x + s.w >= left && s.x <= right;
      const extraBelow = fullHeight;

      for (const solid of level.solids) {
        if (!visible(solid)) continue;
        if (solid.kind === 'ground') drawGround(ctx, solid, extraBelow);
        else if (solid.kind === 'post') drawPost(ctx, solid);
        else drawBlock(ctx, solid);
      }
      for (const checkpoint of level.checkpoints) {
        if (checkpoint.x >= left && checkpoint.x <= right) drawCheckpoint(ctx, checkpoint, body.w, body.h);
      }
      for (const gate of level.gates) if (visible(gate)) drawGate(ctx, gate, time);
      drawPlayer(ctx, body, { facing: runtime.facing, time, blink: runtime.respawnFlash > 0 });
      ctx.restore();
    },
  };
}
