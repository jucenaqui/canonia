// Dibujo en el lienzo (T031). La vista muestra siempre VIEW_ROWS casillas de alto; el ancho
// visible depende de la pantalla. Abajo se reserva el alto de los botones táctiles para que
// no tapen al personaje ni a la puerta (001/FR-006).
// Arte de The Influence Foundry dibujado por código (D45); los sectores se encienden con las
// puertas resueltas (004/FR-041).

import { PHYSICS } from './physics.js';
import { drawBackground, drawMidLayer, drawGround, drawPost, drawBlock, drawGate, drawCheckpoint, drawDimSector } from '../art/world.js';
import { drawPlayer, drawPix } from '../art/character.js';

export const VIEW_ROWS = 13;
const MAX_PIXEL_RATIO = 2;
const PIX_FOLLOW = 5;

/** @param {HTMLCanvasElement} canvas */
export function createRenderer(canvas) {
  const ctx = canvas.getContext('2d');
  let cssWidth = 0;
  let cssHeight = 0;
  let scale = 1;
  let ratio = 1;
  let lastTime = 0;
  const view = { width: 0, height: VIEW_ROWS * PHYSICS.TILE };
  const pix = { x: null, y: null };

  function followPix(runtime, dt) {
    const { body, facing } = runtime;
    const targetX = body.x + body.w / 2 - facing * 30;
    const targetY = body.y - 22;
    if (pix.x === null || Math.abs(targetX - pix.x) > 400) Object.assign(pix, { x: targetX, y: targetY });
    const k = 1 - Math.exp(-PIX_FOLLOW * dt);
    pix.x += (targetX - pix.x) * k;
    pix.y += (targetY - pix.y) * k;
  }

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
      const dt = Math.min(0.1, Math.max(0, time - lastTime));
      lastTime = time;
      const { level, body } = runtime;
      const sectors = runtime.sectors;
      const litFraction = sectors.filter((s) => s.lit).length / Math.max(1, sectors.length);
      const isLit = (worldX) => (sectors.find((s) => worldX < s.to) ?? sectors.at(-1))?.lit ?? false;
      const groundY = level.groundY;

      ctx.setTransform(ratio * scale, 0, 0, ratio * scale, 0, 0);
      const fullHeight = cssHeight / scale;
      drawBackground(ctx, { width: view.width, height: fullHeight }, camera, time, litFraction);
      drawMidLayer(ctx, { width: view.width, height: fullHeight }, camera, groundY - camera.y, isLit, time);

      ctx.save();
      ctx.translate(-Math.round(camera.x), -Math.round(camera.y));
      const left = camera.x - PHYSICS.TILE;
      const right = camera.x + view.width + PHYSICS.TILE;
      const visible = (s) => s.x + s.w >= left && s.x <= right;

      for (const sector of sectors) {
        if (!sector.lit && sector.to >= left && sector.from <= right) drawDimSector(ctx, sector.from, sector.to - sector.from, fullHeight);
      }
      for (const solid of level.solids) {
        if (!visible(solid)) continue;
        if (solid.kind === 'ground') drawGround(ctx, solid, fullHeight);
        else if (solid.kind === 'post') drawPost(ctx, solid, time);
        else drawBlock(ctx, solid);
      }
      for (const checkpoint of level.checkpoints) {
        if (checkpoint.x >= left && checkpoint.x <= right) drawCheckpoint(ctx, checkpoint, body.w, body.h, time);
      }
      for (const gate of level.gates) if (visible(gate)) drawGate(ctx, gate, time);
      drawPlayer(ctx, body, { facing: runtime.facing, time, blink: runtime.respawnFlash > 0 });
      followPix(runtime, dt);
      drawPix(ctx, pix, { facing: runtime.facing, time });
      ctx.restore();
    },
  };
}
