// Máquina de estados común de los minijuegos (T026 a T031). Lógica pura: sin DOM ni three.js.
// Un minijuego es un grafo de nodos. Cada nodo muestra una escena (texto, datos, opciones) y, al
// elegir, devuelve la consecuencia y el siguiente nodo. La máquina cuenta las decisiones, lleva la
// barra de confianza (si el juego la usa) y guarda un resumen de lo decidido.
//
// Un minijuego NO aprueba nada: lo único que sale de aquí es `result()`, que informa lo aprendido.
//
// Nodo: {
//   heading, text, pix?          string o (ctx) => string
//   items?                       (ctx) => [{ label, value, max?, tone? }]   datos que se ven (medidores)
//   choices?                     (ctx) => [{ id, label, detail? }]          si falta, es un nodo informativo
//   advanceLabel?                texto del botón "seguir" de un nodo informativo
//   onChoose?(ctx, id)           => { next, reaction?: { text, trust?, tone? }, instant?: true }
//   next? | onAdvance?(ctx)      siguiente nodo de un nodo informativo
//   step?: false                 la elección no cuenta como decisión (p. ej. añadir una pieza)
// }
// `next` null o 'end' termina el juego. `ctx` = { example, vars, trust }.

const MAX_TRANSITIONS = 200;
export const END = 'end';

/**
 * @param {object} options
 * @param {string} options.lessonId
 * @param {object} options.texts Textos del juego (content/world-1/minigames.js) y `ui`.
 * @param {number} options.example Índice del ejemplo (0 o 1).
 * @param {string} options.learn La frase de lo que se aprende.
 * @param {number} options.totalSteps Decisiones previstas (para "Paso n de N").
 * @param {number|null} [options.trustStart] Confianza inicial (0 a 100) o null si el juego no la usa.
 * @param {string} options.first Id del primer nodo.
 * @param {Record<string, object>} options.nodes
 * @param {(ctx: object) => void} [options.init] Prepara `ctx.vars` antes del primer nodo.
 */
export function createMachine({ lessonId, texts, example, learn, totalSteps, trustStart = null, first, nodes, init }) {
  const ui = texts.ui;
  const ctx = { example, vars: {}, trust: trustStart };
  if (init) init(ctx);
  const log = [];
  let nodeId = first;
  let pending = null;
  let finished = false;
  let transitions = 0;
  let answered = 0;

  const call = (value) => (typeof value === 'function' ? value(ctx) : value);
  const clampTrust = (value) => Math.max(0, Math.min(100, value));

  function go(next) {
    transitions += 1;
    if (next === null || next === undefined || next === END || transitions > MAX_TRANSITIONS) {
      finished = true;
      nodeId = null;
      return;
    }
    if (!nodes[next]) throw new Error(`Nodo desconocido: ${next}`);
    nodeId = next;
  }

  function progress() {
    return { step: Math.min(answered + 1, totalSteps), total: totalSteps };
  }

  /** La escena que se ve ahora. Es un objeto nuevo en cada llamada. */
  function scene() {
    if (finished) {
      return {
        phase: 'end',
        heading: ui.endTitle,
        text: learn,
        items: [],
        choices: [],
        recap: log.map((entry) => ({ label: entry.label, text: entry.text })),
        trust: ctx.trust,
        trustDelta: trustStart === null ? 0 : ctx.trust - trustStart,
        progress: { step: totalSteps, total: totalSteps },
      };
    }
    const node = nodes[nodeId];
    if (pending) {
      const delta = pending.trustDelta;
      return {
        phase: 'reaction',
        heading: call(node.heading) ?? '',
        text: pending.text,
        tone: pending.tone ?? (delta > 0 ? 'good' : delta < 0 ? 'bad' : 'neutral'),
        trustChange: delta,
        items: call(node.items) ?? [],
        choices: [],
        continueLabel: ui.next,
        trust: ctx.trust,
        progress: progress(),
      };
    }
    const choices = (call(node.choices) ?? []).map((c) => ({ id: c.id, label: c.label, detail: c.detail ?? '' }));
    return {
      phase: choices.length ? 'choice' : 'info',
      heading: call(node.heading) ?? '',
      text: call(node.text) ?? '',
      pix: call(node.pix) ?? '',
      items: call(node.items) ?? [],
      choices,
      continueLabel: choices.length ? null : (call(node.advanceLabel) ?? ui.next),
      trust: ctx.trust,
      progress: progress(),
    };
  }

  /** El jugador elige una opción. Ignora lo que no corresponde a la escena actual. */
  function choose(id) {
    if (finished || pending || !nodeId) return scene();
    const node = nodes[nodeId];
    const choice = (call(node.choices) ?? []).find((c) => c.id === id);
    if (!choice || !node.onChoose) return scene();

    const outcome = node.onChoose(ctx, id) ?? {};
    const reaction = outcome.reaction;
    let delta = 0;
    if (ctx.trust !== null && reaction?.trust) {
      const before = ctx.trust;
      ctx.trust = clampTrust(before + reaction.trust);
      delta = ctx.trust - before;
    }
    if (node.step !== false) {
      answered += 1;
      log.push({ nodeId, choiceId: id, label: choice.label, text: reaction?.text ?? '', trustDelta: delta });
    }
    if (reaction && !outcome.instant) {
      pending = { text: reaction.text, tone: reaction.tone, trustDelta: delta, next: outcome.next };
    } else {
      go(outcome.next);
    }
    return scene();
  }

  /** Sigue después de leer una escena informativa o una consecuencia. */
  function advance() {
    if (finished || !nodeId) return scene();
    if (pending) {
      const { next } = pending;
      pending = null;
      go(next);
      return scene();
    }
    const node = nodes[nodeId];
    if (node.choices) return scene();
    go(node.onAdvance ? node.onAdvance(ctx) : node.next);
    return scene();
  }

  return {
    scene,
    choose,
    advance,
    isDone: () => finished,
    trust: () => ctx.trust,
    /** Lo que se informa al terminar. Null mientras el juego sigue. */
    result() {
      if (!finished) return null;
      return {
        lessonId,
        trustDelta: trustStart === null ? 0 : ctx.trust - trustStart,
        summary: learn,
      };
    },
  };
}

/** Sustituye {nombre} por su valor en un texto de plantilla. */
export function fill(template, values) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => (key in values ? String(values[key]) : `{${key}}`));
}
