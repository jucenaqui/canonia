// Technical spike for Canonia (task T001). Verifies, inside Claude:
// 1) linked modules load, 2) canvas smoothness and touch response,
// 3) quick-tier AI answers three valid options in Spanish, and how long it takes,
// 4) what happens when the player declines the AI, 5) browser storage.

import { MODULE_MARK, buildOptionsPrompt, validateOptions, parseJsonArray } from './extra.js';

const $ = (id) => document.getElementById(id);
const results = {};

function report(key, label, value, state) {
  results[key] = `${label}: ${value}`;
  const row = $(`r-${key}`);
  row.querySelector('.value').textContent = value;
  row.dataset.state = state;
  $('summary').value = Object.values(results).join('\n');
}

// ---------- 1. Modules
window.__modulesLoaded = true;
report('modules', 'Módulos enlazados', MODULE_MARK === 'extra.js cargado' ? 'Sí, cargaron los dos' : 'Fallo', 'ok');

// ---------- Environment
const insideClaude = typeof window.claude?.use === 'function';
report('env', 'Entorno', insideClaude ? 'Dentro de Claude' : 'Fuera de Claude (modo local)', insideClaude ? 'ok' : 'warn');

// ---------- 5. Browser storage
(function checkStorage() {
  try {
    const visits = Number(localStorage.getItem('canonia-spike-visits') || '0') + 1;
    localStorage.setItem('canonia-spike-visits', String(visits));
    report('storage', 'Almacenamiento del navegador', `Disponible. Visita número ${visits} (recarga para ver si sube)`, 'ok');
  } catch {
    report('storage', 'Almacenamiento del navegador', 'No disponible en esta vista', 'warn');
  }
})();

// ---------- 2. Canvas, fixed-step loop and touch controls
const canvas = $('stage');
const ctx = canvas.getContext('2d');
const STEP = 1 / 60;
const world = { w: 360, h: 220, ground: 190 };
const hero = { x: 60, y: world.ground - 30, vx: 0, vy: 0, w: 26, h: 30, onGround: true };
const keys = { left: false, right: false, jump: false };
const platforms = [
  { x: 120, y: 150, w: 70, h: 12 },
  { x: 230, y: 115, w: 80, h: 12 },
];
let pressAt = 0;
const latencies = [];

function fitCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const cssWidth = canvas.clientWidth;
  const cssHeight = Math.round((cssWidth * world.h) / world.w);
  canvas.style.height = `${cssHeight}px`;
  canvas.width = Math.round(cssWidth * ratio);
  canvas.height = Math.round(cssHeight * ratio);
  ctx.setTransform(canvas.width / world.w, 0, 0, canvas.height / world.h, 0, 0);
}
fitCanvas();
window.addEventListener('resize', fitCanvas);

function bind(id, key) {
  const btn = $(id);
  const down = (e) => {
    e.preventDefault();
    if (!keys[key]) pressAt = performance.now();
    keys[key] = true;
    btn.classList.add('held');
  };
  const up = (e) => {
    e.preventDefault();
    keys[key] = false;
    btn.classList.remove('held');
  };
  btn.addEventListener('pointerdown', down);
  btn.addEventListener('pointerup', up);
  btn.addEventListener('pointercancel', up);
  btn.addEventListener('pointerleave', up);
  btn.addEventListener('contextmenu', (e) => e.preventDefault());
}
bind('btn-left', 'left');
bind('btn-right', 'right');
bind('btn-jump', 'jump');

const KEYMAP = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'jump', ' ': 'jump', a: 'left', d: 'right', w: 'jump' };
window.addEventListener('keydown', (e) => {
  const k = KEYMAP[e.key];
  if (!k || e.target.tagName === 'TEXTAREA') return;
  e.preventDefault();
  if (!keys[k]) pressAt = performance.now();
  keys[k] = true;
});
window.addEventListener('keyup', (e) => {
  const k = KEYMAP[e.key];
  if (k) keys[k] = false;
});

function update() {
  const dir = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  hero.vx = dir * 120;
  if (keys.jump && hero.onGround) {
    hero.vy = -330;
    hero.onGround = false;
  }
  if (!keys.jump && hero.vy < -120) hero.vy = -120; // variable jump height
  hero.vy += 900 * STEP;
  hero.x = Math.max(0, Math.min(world.w - hero.w, hero.x + hero.vx * STEP));
  const prevBottom = hero.y + hero.h;
  hero.y += hero.vy * STEP;
  hero.onGround = false;
  const floors = [{ x: 0, y: world.ground, w: world.w, h: 30 }, ...platforms];
  for (const p of floors) {
    const within = hero.x + hero.w > p.x && hero.x < p.x + p.w;
    if (within && hero.vy >= 0 && prevBottom <= p.y + 0.01 && hero.y + hero.h >= p.y) {
      hero.y = p.y - hero.h;
      hero.vy = 0;
      hero.onGround = true;
    }
  }
}

function draw() {
  ctx.fillStyle = '#1b1147';
  ctx.fillRect(0, 0, world.w, world.h);
  ctx.fillStyle = '#2b1680';
  ctx.fillRect(0, world.ground, world.w, world.h - world.ground);
  ctx.fillStyle = '#7cffe0';
  ctx.fillRect(0, world.ground, world.w, 2);
  ctx.fillStyle = '#e9e2ff';
  for (const p of platforms) ctx.fillRect(p.x, p.y, p.w, p.h);
  ctx.fillStyle = '#ff8a3d';
  ctx.fillRect(hero.x, hero.y, hero.w, hero.h);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(hero.x + 5, hero.y + 8, 5, 5);
  ctx.fillRect(hero.x + 15, hero.y + 8, 5, 5);
}

let last = performance.now();
let acc = 0;
let frames = 0;
let worstGap = 0;
let windowStart = last;
let hidden = false;
document.addEventListener('visibilitychange', () => {
  hidden = document.hidden;
  last = performance.now();
  acc = 0;
});

function frame(now) {
  requestAnimationFrame(frame);
  if (hidden) return;
  const gap = now - last;
  last = now;
  worstGap = Math.max(worstGap, gap);
  acc += Math.min(gap / 1000, 0.25);
  const before = hero.x + hero.y;
  while (acc >= STEP) {
    update();
    acc -= STEP;
  }
  draw();
  if (pressAt && hero.x + hero.y !== before) {
    latencies.push(performance.now() - pressAt);
    pressAt = 0;
  }
  frames += 1;
  if (now - windowStart >= 2000) {
    const fps = Math.round((frames * 1000) / (now - windowStart));
    const avgLatency = latencies.length
      ? `${Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)} ms`
      : 'aún sin pulsaciones';
    report(
      'canvas',
      'Lienzo y controles',
      `${fps} cuadros por segundo; peor salto ${Math.round(worstGap)} ms; respuesta al toque ${avgLatency}`,
      fps >= 50 ? 'ok' : 'warn',
    );
    frames = 0;
    worstGap = 0;
    windowStart = now;
  }
}
requestAnimationFrame(frame);

// ---------- 3 and 4. AI at the quick tier, and declining the permission
const aiBtn = $('btn-ai');
const aiOut = $('ai-out');

const ERROR_COPY = {
  not_granted: 'No diste permiso para usar la IA. El juego seguiría dejándote escribir tus propias respuestas.',
  rate_limited: 'Demasiadas peticiones o límite de uso alcanzado. Prueba más tarde.',
  sampling_disabled: 'La IA está desactivada para esta vista.',
  not_declared: 'La página no declaró la capacidad de IA al publicarse.',
  session_expired: 'La sesión de Claude caducó. Recarga la página.',
  refused: 'La IA rechazó la petición.',
  cancelled: 'Petición cancelada.',
};

function showOptions(options, out = aiOut) {
  out.replaceChildren();
  for (const o of options) {
    const card = document.createElement('article');
    card.className = 'option';
    const title = document.createElement('h3');
    title.textContent = o.text + (o.recommended ? '  ·  Recomendada' : '');
    const pros = document.createElement('p');
    pros.textContent = `A favor: ${o.pros}`;
    const risks = document.createElement('p');
    risks.textContent = `Riesgo: ${o.risks}`;
    card.append(title, pros, risks);
    out.append(card);
  }
}

aiBtn.addEventListener('click', async () => {
  aiBtn.disabled = true;
  aiOut.textContent = 'Pensando…';
  const started = performance.now();
  try {
    const sample = insideClaude ? await window.claude.use('sample') : null;
    if (!sample) {
      report('ai', 'IA al nivel rápido', insideClaude ? 'La IA no está disponible en esta vista' : 'No se puede probar fuera de Claude', 'warn');
      aiOut.textContent = 'La IA no está disponible aquí.';
      return;
    }
    const interests = $('interests').value.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 5);
    const answer = await sample(buildOptionsPrompt(interests), { modelTier: 'quick', cache: false });
    const seconds = ((performance.now() - started) / 1000).toFixed(1);
    const options = validateOptions(parseJsonArray(answer.text));
    if (!options) {
      report('ai', 'IA al nivel rápido', `Respondió en ${seconds} s pero con forma no válida (nivel aplicado: ${answer.modelTierApplied})`, 'bad');
      aiOut.textContent = answer.text.slice(0, 600);
      return;
    }
    report('ai', 'IA al nivel rápido', `3 opciones válidas en ${seconds} s (incluye el tiempo del permiso si se pidió; nivel aplicado: ${answer.modelTierApplied})`, 'ok');
    showOptions(options);
  } catch (e) {
    const code = e && e.code ? e.code : 'desconocido';
    const seconds = ((performance.now() - started) / 1000).toFixed(1);
    report('ai', 'IA al nivel rápido', `Falló con el código "${code}" a los ${seconds} s`, code === 'not_granted' ? 'warn' : 'bad');
    aiOut.textContent = ERROR_COPY[code] || 'No se pudo obtener respuesta de la IA.';
  } finally {
    aiBtn.disabled = false;
  }
});
report('ai', 'IA al nivel rápido', 'Sin probar todavía: pulsa el botón', 'idle');

// ---------- 6. Guided mode: the player uses their own AI and pastes the answer back
const LEFT_KEY = 'canonia-spike-guide-left';
let leftForAi = false;
let wentAway = false;

function readInterests() {
  return $('interests').value.split(',').map((s) => s.trim()).filter(Boolean).slice(0, 5);
}

// If the page was reloaded while the player was in the other app, the marker survives
// in browser storage but the in-memory state does not.
(function checkReturnAfterReload() {
  try {
    const at = Number(localStorage.getItem(LEFT_KEY) || '0');
    localStorage.removeItem(LEFT_KEY);
    if (at && Date.now() - at < 30 * 60 * 1000) {
      report('return', 'Ir a otra app y volver', 'La página se RECARGÓ al volver: el juego perdería el avance', 'bad');
      return;
    }
  } catch {
    // Storage unavailable: only the in-memory check below applies.
  }
  report('return', 'Ir a otra app y volver', 'Sin probar todavía: copia la pregunta y ve a otra app', 'idle');
})();

document.addEventListener('visibilitychange', () => {
  if (!leftForAi) return;
  if (document.hidden) {
    wentAway = true;
    return;
  }
  if (wentAway) {
    report('return', 'Ir a otra app y volver', 'Volviste y la página conservó su estado, sin recargar', 'ok');
    try { localStorage.removeItem(LEFT_KEY); } catch { /* ignore */ }
    leftForAi = false;
    wentAway = false;
  }
});

$('btn-guide-copy').addEventListener('click', async () => {
  const promptText = buildOptionsPrompt(readInterests());
  const area = $('guide-prompt');
  area.value = promptText;
  leftForAi = true;
  wentAway = false;
  try { localStorage.setItem(LEFT_KEY, String(Date.now())); } catch { /* ignore */ }
  try {
    await navigator.clipboard.writeText(promptText);
    area.hidden = true;
    $('guide-note').textContent = 'Pregunta copiada. Pégala en tu IA y trae la respuesta.';
  } catch {
    area.hidden = false;
    area.focus();
    area.select();
    $('guide-note').textContent = 'No se pudo copiar solo. La pregunta quedó seleccionada arriba: cópiala a mano.';
  }
});

$('btn-guide-check').addEventListener('click', () => {
  const raw = $('guide-answer').value.replace(/[“”„″]/g, '"');
  const out = $('guide-out');
  if (!raw.trim()) {
    $('guide-note').textContent = 'Primero pega la respuesta de tu IA.';
    return;
  }
  const options = validateOptions(parseJsonArray(raw));
  if (!options) {
    out.replaceChildren();
    $('guide-note').textContent = 'La respuesta no trae las tres opciones en el formato pedido. Pídele a tu IA que responda solo con el formato de la pregunta y vuelve a pegarla.';
    report('guide', 'Modo guía', `Respuesta pegada con forma no válida (${raw.length} caracteres)`, 'bad');
    return;
  }
  $('guide-note').textContent = 'Respuesta válida: estas son tus tres opciones.';
  showOptions(options, out);
  report('guide', 'Modo guía', 'Respuesta pegada válida: 3 opciones, una recomendada', 'ok');
});
report('guide', 'Modo guía', 'Sin probar todavía', 'idle');

// ---------- Copy results
$('btn-copy').addEventListener('click', async () => {
  const area = $('summary');
  try {
    await navigator.clipboard.writeText(area.value);
    $('copy-note').textContent = 'Copiado. Pégalo en el chat con Claude Code.';
  } catch {
    area.focus();
    area.select();
    $('copy-note').textContent = 'No se pudo copiar solo. El texto quedó seleccionado: cópialo a mano.';
  }
});

report('device', 'Dispositivo', `${window.innerWidth}×${window.innerHeight}, ${navigator.maxTouchPoints > 0 ? 'táctil' : 'sin táctil'}`, 'ok');
