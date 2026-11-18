// Arte provisional del mundo (T031): fondo, suelo, plataformas como publicaciones, bloques,
// puertas y puntos seguros. Formas propias, sin imitar ninguna red social concreta.

import { PALETTE } from './palette.js';

const TAU = Math.PI * 2;

/** Fondo con degradado, cuadrícula de pantalla y formas flotantes con paralaje. */
export function drawBackground(ctx, view, camera, time) {
  const gradient = ctx.createLinearGradient(0, 0, 0, view.height);
  gradient.addColorStop(0, PALETTE.skyTop);
  gradient.addColorStop(1, PALETTE.skyBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, view.width, view.height);

  // Cuadrícula que se desplaza más despacio que el nivel
  const size = 64;
  const ox = -((camera.x * 0.3) % size);
  ctx.strokeStyle = PALETTE.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = ox; x < view.width; x += size) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, view.height);
  }
  for (let y = 0; y < view.height; y += size) {
    ctx.moveTo(0, y);
    ctx.lineTo(view.width, y);
  }
  ctx.stroke();

  // Corazones y burbujas que flotan lejos
  ctx.fillStyle = PALETTE.floater;
  for (let i = 0; i < 9; i++) {
    const span = view.width + 200;
    const x = ((i * 233 - camera.x * 0.15) % span + span) % span - 100;
    const y = 40 + ((i * 97) % Math.max(60, view.height - 160)) + Math.sin(time * 0.8 + i) * 6;
    if (i % 2 === 0) drawHeart(ctx, x, y, 10 + (i % 3) * 3);
    else {
      ctx.beginPath();
      ctx.roundRect(x - 12, y - 8, 24, 16, 6);
      ctx.fill();
    }
  }
}

function drawHeart(ctx, x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.35);
  ctx.bezierCurveTo(x - s, y - s * 0.4, x - s * 0.4, y - s, x, y - s * 0.35);
  ctx.bezierCurveTo(x + s * 0.4, y - s, x + s, y - s * 0.4, x, y + s * 0.35);
  ctx.fill();
}

/** Suelo: bloque oscuro con borde de luz arriba. Se extiende hacia abajo para llenar la pantalla. */
export function drawGround(ctx, solid, extraBelow) {
  const gradient = ctx.createLinearGradient(0, solid.y, 0, solid.y + solid.h + extraBelow);
  gradient.addColorStop(0, PALETTE.ground);
  gradient.addColorStop(1, PALETTE.groundDeep);
  ctx.fillStyle = gradient;
  ctx.fillRect(solid.x, solid.y, solid.w, solid.h + extraBelow);
  ctx.fillStyle = PALETTE.groundEdge;
  ctx.fillRect(solid.x, solid.y, solid.w, 3);
}

/** Plataforma como una publicación: tarjeta clara con cabecera de color y líneas de texto. */
export function drawPost(ctx, solid) {
  const cardH = 30;
  const y = solid.y;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.roundRect(solid.x + 3, y + 4, solid.w, cardH, 7);
  ctx.fill();

  ctx.fillStyle = PALETTE.card;
  ctx.beginPath();
  ctx.roundRect(solid.x, y, solid.w, cardH, 7);
  ctx.fill();

  const header = ctx.createLinearGradient(solid.x, 0, solid.x + solid.w, 0);
  header.addColorStop(0, PALETTE.cardHeaderA);
  header.addColorStop(1, PALETTE.cardHeaderB);
  ctx.fillStyle = header;
  ctx.beginPath();
  ctx.roundRect(solid.x, y, solid.w, 9, [7, 7, 0, 0]);
  ctx.fill();

  ctx.fillStyle = PALETTE.cardHeaderB;
  ctx.beginPath();
  ctx.arc(solid.x + 9, y + 17, 4, 0, TAU);
  ctx.fill();
  ctx.fillStyle = PALETTE.cardLine;
  ctx.fillRect(solid.x + 17, y + 14, Math.max(8, solid.w * 0.5), 3);
  ctx.fillRect(solid.x + 17, y + 21, Math.max(6, solid.w * 0.3), 3);
}

/** Bloque sólido: como un icono de aplicación. */
export function drawBlock(ctx, solid) {
  ctx.fillStyle = PALETTE.block;
  ctx.beginPath();
  ctx.roundRect(solid.x + 1, solid.y + 1, solid.w - 2, solid.h - 2, 8);
  ctx.fill();
  ctx.strokeStyle = PALETTE.blockEdge;
  ctx.lineWidth = 2;
  ctx.stroke();
}

/** Puerta de decisión: un marco que brilla con un signo de pregunta; resuelta, una marca de hecho. */
export function drawGate(ctx, gate, time) {
  const { x, y, w, h } = gate;
  const pad = 6;
  if (gate.resolved) {
    ctx.strokeStyle = PALETTE.gateDone;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(x - pad, y, w + pad * 2, h, [16, 16, 4, 4]);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = PALETTE.gateDone;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + w / 2 - 8, y + h * 0.35);
    ctx.lineTo(x + w / 2 - 2, y + h * 0.35 + 7);
    ctx.lineTo(x + w / 2 + 10, y + h * 0.35 - 8);
    ctx.stroke();
    return;
  }
  const glow = 0.6 + Math.sin(time * 3) * 0.25;
  const gradient = ctx.createLinearGradient(x, y, x, y + h);
  gradient.addColorStop(0, PALETTE.gateA);
  gradient.addColorStop(1, PALETTE.gateB);
  ctx.shadowColor = PALETTE.gateA;
  ctx.shadowBlur = 18 * glow;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(x - pad, y, w + pad * 2, h, [16, 16, 4, 4]);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Burbuja con la pregunta
  const by = y - 26 + Math.sin(time * 2.5) * 3;
  ctx.fillStyle = PALETTE.ink;
  ctx.beginPath();
  ctx.roundRect(x + w / 2 - 14, by, 28, 22, 8);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + w / 2 - 4, by + 22);
  ctx.lineTo(x + w / 2, by + 28);
  ctx.lineTo(x + w / 2 + 4, by + 22);
  ctx.fill();
  ctx.fillStyle = PALETTE.gateA;
  ctx.font = '800 16px "Baloo 2", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('?', x + w / 2, by + 12);
}

/** Punto seguro: una pequeña antena de señal que se enciende al alcanzarla. */
export function drawCheckpoint(ctx, checkpoint, bodyW, bodyH) {
  const cx = checkpoint.x + bodyW / 2;
  const base = checkpoint.y + bodyH;
  const color = checkpoint.reached ? PALETTE.checkpointOn : PALETTE.checkpoint;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, base);
  ctx.lineTo(cx, base - 30);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, base - 32, 4, 0, TAU);
  ctx.fill();
  ctx.lineWidth = 2;
  for (const r of [9, 15]) {
    ctx.globalAlpha = checkpoint.reached ? 1 : 0.5;
    ctx.beginPath();
    ctx.arc(cx, base - 32, r, -Math.PI * 0.8, -Math.PI * 0.2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
