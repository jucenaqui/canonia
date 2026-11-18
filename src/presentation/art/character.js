// Personaje provisional (T031): una burbuja de mensaje con ojos, que mira hacia donde camina.
// El personaje definitivo y su nombre están por decidir (pregunta abierta 1).

import { PALETTE } from './palette.js';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: number, y: number, w: number, h: number, vx: number, vy: number, onGround: boolean }} body
 * @param {{ facing: number, time: number, blink: boolean }} state
 */
export function drawPlayer(ctx, body, { facing, time, blink }) {
  if (blink && Math.floor(time * 12) % 2 === 0) return;
  const { x, y, w, h } = body;

  // Se estira al subir y se aplasta al caer, para que el salto se lea.
  const stretch = body.onGround ? 1 : Math.max(0.88, Math.min(1.12, 1 - body.vy / 4000));
  const dh = h * stretch;
  const dw = w / stretch;
  const dx = x + (w - dw) / 2;
  const dy = y + h - dh;
  const bob = body.onGround && Math.abs(body.vx) > 10 ? Math.sin(time * 18) * 1.5 : 0;

  // Sombra
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h + 2, w * 0.45, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cuerpo: burbuja con su colita
  const gradient = ctx.createLinearGradient(dx, dy, dx, dy + dh);
  gradient.addColorStop(0, PALETTE.playerA);
  gradient.addColorStop(1, PALETTE.playerB);
  ctx.fillStyle = gradient;
  roundRect(ctx, dx, dy + bob, dw, dh - 6, 12);
  ctx.fill();
  ctx.beginPath();
  const tailX = facing > 0 ? dx + 6 : dx + dw - 6;
  ctx.moveTo(tailX, dy + dh - 8 + bob);
  ctx.lineTo(tailX - facing * 4, dy + dh + bob);
  ctx.lineTo(tailX + facing * 8, dy + dh - 8 + bob);
  ctx.fill();

  // Ojos que miran hacia donde camina
  const eyeY = dy + dh * 0.36 + bob;
  const look = facing * 2.5;
  for (const offset of [-6, 6]) {
    const ex = dx + dw / 2 + offset + look;
    ctx.fillStyle = PALETTE.ink;
    ctx.beginPath();
    ctx.ellipse(ex, eyeY, 4.2, 5.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = PALETTE.eye;
    ctx.beginPath();
    ctx.arc(ex + facing * 1.5, eyeY + 1, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Mejillas
  ctx.fillStyle = 'rgba(200, 30, 74, 0.35)';
  for (const offset of [-11, 11]) {
    ctx.beginPath();
    ctx.ellipse(dx + dw / 2 + offset + look, eyeY + 8, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}
