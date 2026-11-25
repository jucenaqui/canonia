// Personajes dibujados por código (T031, D45).
// - El protagonista es el influencer del jugador: una silueta de proporciones adultas, de luz,
//   que ganará rasgos mundo a mundo. En el Mundo 1 es solo contorno.
// - PIX, el guía, vuela a su lado: cabeza blanca con visor oscuro y ojos de luz.
// Se reemplazan por las ilustraciones del encargo cuando lleguen.

import { PALETTE } from './palette.js';

const TAU = Math.PI * 2;

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: number, y: number, w: number, h: number, vx: number, vy: number, onGround: boolean }} body
 * @param {{ facing: number, time: number, blink: boolean }} state
 */
export function drawPlayer(ctx, body, { facing, time, blink }) {
  if (blink && Math.floor(time * 12) % 2 === 0) return;
  const { x, y, w, h } = body;
  const cx = x + w / 2;
  const running = body.onGround && Math.abs(body.vx) > 10;
  const stride = running ? Math.sin(time * 16) : 0;
  const airborne = !body.onGround;

  // Sombra
  ctx.fillStyle = 'rgba(30, 27, 58, 0.18)';
  ctx.beginPath();
  ctx.ellipse(cx, y + h + 1, w * 0.45, 3, 0, 0, TAU);
  ctx.fill();

  ctx.save();
  ctx.shadowColor = 'rgba(124, 92, 255, 0.55)';
  ctx.shadowBlur = 10;
  const stroke = ctx.createLinearGradient(0, y, 0, y + h);
  stroke.addColorStop(0, PALETTE.violet);
  stroke.addColorStop(1, PALETTE.cyan);
  ctx.strokeStyle = stroke;
  ctx.fillStyle = PALETTE.silhouetteFill;
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Piernas
  const hipY = y + h * 0.66;
  const legSwing = airborne ? 0.35 : stride * 0.45;
  for (const side of [-1, 1]) {
    const swing = side * legSwing;
    ctx.beginPath();
    ctx.moveTo(cx + side * 3, hipY);
    ctx.lineTo(cx + side * 3 + Math.sin(swing) * 9 * facing, y + h - (airborne && side > 0 ? 5 : 0));
    ctx.stroke();
  }

  // Torso
  ctx.beginPath();
  ctx.moveTo(cx - 7, y + h * 0.32);
  ctx.quadraticCurveTo(cx, y + h * 0.27, cx + 7, y + h * 0.32);
  ctx.lineTo(cx + 5, hipY);
  ctx.lineTo(cx - 5, hipY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Brazos
  const armSwing = airborne ? -0.9 : -stride * 0.5;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(cx + side * 6, y + h * 0.35);
    ctx.lineTo(cx + side * 7 + Math.sin(side * armSwing) * 6 * facing, y + h * 0.56 + (airborne ? -6 : 0));
    ctx.stroke();
  }

  // Cabeza
  ctx.beginPath();
  ctx.arc(cx + facing * 0.5, y + h * 0.15, 5.6, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

/**
 * PIX vuela cerca del protagonista, un poco detrás y arriba.
 * @param {{ x: number, y: number }} position centro de PIX en unidades del mundo
 */
export function drawPix(ctx, position, { facing, time }) {
  const { x } = position;
  const y = position.y + Math.sin(time * 2.4) * 3;

  // Anillo de luz bajo PIX
  ctx.strokeStyle = 'rgba(22, 181, 219, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(x, y + 16, 9, 2.5, 0, 0, TAU);
  ctx.stroke();

  // Orejas
  ctx.fillStyle = PALETTE.white;
  ctx.strokeStyle = PALETTE.gold;
  ctx.lineWidth = 1;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(x + side * 5, y - 9);
    ctx.lineTo(x + side * 10, y - 17);
    ctx.lineTo(x + side * 11, y - 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Cabeza
  ctx.shadowColor = 'rgba(22, 181, 219, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillStyle = PALETTE.white;
  ctx.beginPath();
  ctx.ellipse(x, y, 12, 10.5, 0, 0, TAU);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(30, 27, 58, 0.15)';
  ctx.stroke();

  // Visor y ojos
  ctx.fillStyle = PALETTE.pixVisor;
  ctx.beginPath();
  ctx.ellipse(x + facing * 1.5, y + 1, 8.5, 6.5, 0, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = PALETTE.cyan;
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(x + facing * 1.5 + side * 3.4, y + 1.5, 1.8, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  }
  ctx.lineCap = 'butt';

  // Cuerpo pequeño
  ctx.fillStyle = PALETTE.white;
  ctx.beginPath();
  ctx.ellipse(x, y + 13, 5.5, 4, 0, 0, TAU);
  ctx.fill();
}
