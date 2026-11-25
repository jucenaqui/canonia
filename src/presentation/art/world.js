// Arte del mundo dibujado por código (T031, D45): PIX Central, el núcleo de The Influence Foundry.
// Fondo claro con anillos y cápsulas, suelo pulido, pasarelas de luz, portales holográficos
// como puertas y postes de luz como puntos seguros. Los sectores apagados se ven atenuados
// hasta que su puerta se resuelve (004/FR-041).

import { PALETTE } from './palette.js';

const TAU = Math.PI * 2;

/** Cielo luminoso y anillos lejanos del núcleo, con paralaje. */
export function drawBackground(ctx, view, camera, time, litFraction) {
  const sky = ctx.createLinearGradient(0, 0, 0, view.height);
  sky.addColorStop(0, PALETTE.skyTop);
  sky.addColorStop(1, PALETTE.skyBottom);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, view.width, view.height);

  // Reactor central: un anillo grande que brilla más cuanto más encendida está la fábrica.
  const cx = view.width * 0.5 - ((camera.x * 0.08) % 600);
  const cy = view.height * 0.32;
  for (const offset of [0, 600, -600, 1200]) {
    const x = cx + offset;
    if (x < -260 || x > view.width + 260) continue;
    const glow = ctx.createRadialGradient(x, cy, 10, x, cy, 190);
    glow.addColorStop(0, `rgba(22, 181, 219, ${0.10 + litFraction * 0.35})`);
    glow.addColorStop(1, 'rgba(22, 181, 219, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(x - 200, cy - 200, 400, 400);
    ctx.strokeStyle = PALETTE.ring;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(x, cy, 170, 46, 0, 0, TAU);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x, cy, 120, 30, 0, 0, TAU);
    ctx.stroke();
  }
}

/**
 * Capa media: columnas con cápsulas de influencer. Una cápsula brilla si el sector del nivel
 * que tiene detrás ya está encendido.
 * @param {(worldX: number) => boolean} isLit
 */
export function drawMidLayer(ctx, view, camera, groundY, isLit, time) {
  const spacing = 300;
  const factor = 0.5;
  const start = Math.floor((camera.x * factor) / spacing) - 1;
  for (let i = start; i < start + Math.ceil(view.width / spacing) + 3; i++) {
    const x = i * spacing - camera.x * factor;
    const worldX = camera.x + x;
    const lit = isLit(worldX);
    const top = groundY - 230;
    // Columna
    ctx.fillStyle = PALETTE.structure;
    ctx.fillRect(x - 6, top - 60, 12, 290);
    ctx.fillStyle = PALETTE.structureLine;
    ctx.fillRect(x - 6, top - 60, 3, 290);
    // Cápsula de vidrio
    ctx.fillStyle = lit ? 'rgba(22, 181, 219, 0.22)' : 'rgba(255, 255, 255, 0.35)';
    ctx.strokeStyle = lit ? PALETTE.cyan : PALETTE.structureLine;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x + 14, top + 20, 44, 96, 22);
    ctx.fill();
    ctx.stroke();
    // Silueta dentro de la cápsula
    ctx.fillStyle = lit ? 'rgba(124, 92, 255, 0.55)' : 'rgba(150, 156, 200, 0.35)';
    ctx.beginPath();
    ctx.arc(x + 36, top + 46, 7, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(x + 27, top + 56, 18, 44, 8);
    ctx.fill();
    if (lit) {
      ctx.fillStyle = `rgba(227, 176, 75, ${0.55 + Math.sin(time * 2 + i) * 0.2})`;
      ctx.fillRect(x + 22, top + 120, 28, 3);
    }
  }
}

/** Suelo pulido con borde de luz. Se extiende hacia abajo para llenar la pantalla. */
export function drawGround(ctx, solid, extraBelow) {
  const body = ctx.createLinearGradient(0, solid.y, 0, solid.y + solid.h + extraBelow);
  body.addColorStop(0, PALETTE.floor);
  body.addColorStop(0.5, PALETTE.floorDeep);
  body.addColorStop(1, '#8F98CF');
  ctx.fillStyle = body;
  ctx.fillRect(solid.x, solid.y, solid.w, solid.h + extraBelow);
  ctx.fillStyle = PALETTE.seam;
  for (let x = solid.x + 64; x < solid.x + solid.w; x += 64) ctx.fillRect(x, solid.y + 8, 2, solid.h + extraBelow);
  ctx.fillStyle = PALETTE.floorTop;
  ctx.fillRect(solid.x, solid.y, solid.w, 7);
  ctx.fillStyle = PALETTE.cyan;
  ctx.fillRect(solid.x, solid.y + 7, solid.w, 2);
}

/** Pasarela de luz: panel de vidrio con borde cyan y luces debajo. */
export function drawPost(ctx, solid, time) {
  const h = 16;
  ctx.shadowColor = PALETTE.cyanSoft;
  ctx.shadowBlur = 14;
  ctx.fillStyle = PALETTE.glass;
  ctx.beginPath();
  ctx.roundRect(solid.x, solid.y, solid.w, h, 6);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = PALETTE.glassEdge;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = PALETTE.white;
  ctx.fillRect(solid.x + 6, solid.y + 3, solid.w - 12, 2);
  for (let x = solid.x + 12; x < solid.x + solid.w - 6; x += 20) {
    ctx.fillStyle = `rgba(22, 181, 219, ${0.5 + Math.sin(time * 3 + x * 0.05) * 0.3})`;
    ctx.beginPath();
    ctx.arc(x, solid.y + h + 3, 2, 0, TAU);
    ctx.fill();
  }
}

/** Bloque sólido: módulo de metal limpio con canto violeta. */
export function drawBlock(ctx, solid) {
  const g = ctx.createLinearGradient(0, solid.y, 0, solid.y + solid.h);
  g.addColorStop(0, '#FFFFFF');
  g.addColorStop(1, '#D3D9F5');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.roundRect(solid.x + 1, solid.y + 1, solid.w - 2, solid.h - 2, 8);
  ctx.fill();
  ctx.strokeStyle = PALETTE.violet;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = PALETTE.gold;
  ctx.fillRect(solid.x + 8, solid.y + solid.h - 9, solid.w - 16, 3);
}

/** Puerta de decisión: portal holográfico con marco blanco y dorado. */
export function drawGate(ctx, gate, time) {
  const { x, y, w, h } = gate;
  const fx = x - 10;
  const fw = w + 20;
  // Marco
  ctx.fillStyle = PALETTE.white;
  ctx.strokeStyle = PALETTE.gold;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(fx, y - 8, fw, h + 8, [28, 28, 4, 4]);
  ctx.fill();
  ctx.stroke();
  // Interior holográfico
  const inner = ctx.createLinearGradient(0, y, 0, y + h);
  if (gate.resolved) {
    inner.addColorStop(0, 'rgba(22, 181, 219, 0.35)');
    inner.addColorStop(1, 'rgba(22, 181, 219, 0.08)');
  } else {
    inner.addColorStop(0, PALETTE.violet);
    inner.addColorStop(1, PALETTE.cyan);
  }
  ctx.fillStyle = inner;
  ctx.globalAlpha = gate.resolved ? 1 : 0.75 + Math.sin(time * 3) * 0.15;
  ctx.beginPath();
  ctx.roundRect(fx + 6, y, fw - 12, h, [22, 22, 2, 2]);
  ctx.fill();
  ctx.globalAlpha = 1;
  // Líneas de holograma
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  for (let ly = y + ((time * 30) % 8); ly < y + h; ly += 8) ctx.fillRect(fx + 8, ly, fw - 16, 1);
  // Símbolo
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (gate.resolved) {
    ctx.strokeStyle = PALETTE.cyan;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x + w / 2 - 8, y + h * 0.42);
    ctx.lineTo(x + w / 2 - 2, y + h * 0.42 + 7);
    ctx.lineTo(x + w / 2 + 10, y + h * 0.42 - 8);
    ctx.stroke();
    ctx.lineCap = 'butt';
  } else {
    ctx.fillStyle = PALETTE.white;
    ctx.font = '700 22px "Space Grotesk", system-ui, sans-serif';
    ctx.fillText('?', x + w / 2, y + h * 0.42 + Math.sin(time * 2.5) * 2);
  }
}

/** Punto seguro: poste de luz que se enciende al alcanzarlo. */
export function drawCheckpoint(ctx, checkpoint, bodyW, bodyH, time) {
  const cx = checkpoint.x + bodyW / 2;
  const base = checkpoint.y + bodyH;
  ctx.fillStyle = PALETTE.white;
  ctx.strokeStyle = PALETTE.structureLine;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(cx - 3, base - 34, 6, 34, 3);
  ctx.fill();
  ctx.stroke();
  const on = checkpoint.reached;
  if (on) {
    const halo = ctx.createRadialGradient(cx, base - 40, 2, cx, base - 40, 18);
    halo.addColorStop(0, 'rgba(22, 181, 219, 0.6)');
    halo.addColorStop(1, 'rgba(22, 181, 219, 0)');
    ctx.fillStyle = halo;
    ctx.fillRect(cx - 20, base - 60, 40, 40);
  }
  ctx.fillStyle = on ? PALETTE.cyan : PALETTE.structure;
  ctx.beginPath();
  ctx.arc(cx, base - 40, 6 + (on ? Math.sin(time * 4) * 0.8 : 0), 0, TAU);
  ctx.fill();
}

/** Velo sobre un tramo cuyo sector todavía está apagado. */
export function drawDimSector(ctx, x, width, height) {
  ctx.fillStyle = PALETTE.dim;
  ctx.fillRect(x, -height, width, height * 3);
}
