// Lógica pura del minijuego de productos digitales (T029): "Del problema al producto". Sin DOM.
// Pasos: elegir el problema entre comentarios, elegir el formato, armar las piezas, presentarlo
// con honestidad y ver cómo se vende. El segundo ejemplo añade la actualización por comentarios.
import { MINIGAME_TEXTS } from '../../../content/world-1/minigames.js';
import { createMachine, fill } from './machine.js';

/** Cómo se vende: según si el problema se repite y si el formato encaja. */
export function salesOutcome(problem, formatId) {
  if (!problem.repeated) return 'poor';
  return formatId === problem.ideal ? 'good' : 'ok';
}

const mentionItems = (comments) => comments.map((c) => ({ label: c.text, value: `×${c.mentions}`, max: 6, bar: c.mentions, tone: c.mentions > 1 ? 'good' : 'neutral' }));

export function createDigitalProduct({ example = 0, texts = MINIGAME_TEXTS } = {}) {
  const g = texts.digital;
  const ex = g.examples[example];
  const hasUpdate = Boolean(ex.update);
  const totalSteps = hasUpdate ? g.totalSteps : g.totalSteps - 1;
  const pieces = (ctx) => g.formats[ctx.vars.format].pieces;

  const nodes = {
    intro: { heading: g.intro.heading, text: g.intro.text, items: () => mentionItems(ex.comments), next: 'problem' },

    problem: {
      heading: g.problem.heading,
      text: g.problem.question,
      choices: () => ex.problems.map((p) => ({ id: p.id, label: p.label })),
      onChoose: (ctx, id) => {
        const problem = ex.problems.find((p) => p.id === id);
        ctx.vars.problem = problem;
        return { next: 'format', reaction: { text: problem.reaction } };
      },
    },

    format: {
      heading: g.format.heading,
      text: g.format.question,
      choices: () => Object.entries(g.formats).map(([id, f]) => ({ id, label: f.label, detail: `${f.time} · ${f.pieces} piezas` })),
      onChoose: (ctx, id) => {
        const f = g.formats[id];
        ctx.vars.format = id;
        ctx.vars.collected = 0;
        return { next: 'build', reaction: { text: `${f.label}: ${f.time.toLowerCase()}. Necesitas ${f.pieces} piezas.` } };
      },
    },

    build: {
      heading: g.build.heading,
      text: g.build.text,
      items: (ctx) => [{ label: fill(g.build.progress, { n: ctx.vars.collected, total: pieces(ctx) }), value: `${ctx.vars.collected}/${pieces(ctx)}`, max: pieces(ctx), bar: ctx.vars.collected, tone: 'good' }],
      choices: () => [{ id: 'collect', label: g.build.collect }],
      step: false,
      onChoose: (ctx) => {
        ctx.vars.collected += 1;
        return { next: ctx.vars.collected >= pieces(ctx) ? 'describe' : 'build', reaction: { text: g.build.done }, instant: true };
      },
    },

    describe: {
      heading: g.describe.heading,
      text: g.describe.question,
      choices: () => ex.describe.map((o) => ({ id: o.id, label: o.label })),
      onChoose: (ctx, id) => {
        const option = ex.describe.find((o) => o.id === id);
        ctx.vars.honest = option.ok;
        return { next: 'launch', reaction: { text: option.reaction } };
      },
    },

    launch: {
      heading: g.launch.heading,
      text: (ctx) => g.sales[salesOutcome(ctx.vars.problem, ctx.vars.format)] + (ctx.vars.honest ? '' : ` ${g.sales.dishonest}`),
      onAdvance: () => (hasUpdate ? 'comments' : null),
    },
  };

  if (hasUpdate) {
    nodes.comments = { heading: g.update.heading, text: ex.update.intro, items: () => mentionItems(ex.update.comments), next: 'update' };
    nodes.update = {
      heading: g.update.heading,
      text: ex.update.question,
      choices: () => ex.update.options.map((o) => ({ id: o.id, label: o.label })),
      onChoose: (ctx, id) => ({ next: null, reaction: { text: ex.update.options.find((o) => o.id === id).reaction } }),
    };
  }

  return createMachine({ lessonId: g.lessonId, texts, example, learn: g.learn, totalSteps, first: 'intro', nodes });
}
