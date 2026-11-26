// Lógica pura del minijuego UGC (T027): "El pedido de la marca". Sin DOM.
// Pasos: leer el pedido, elegir enfoque (con revisión si encaja a medias), derechos de uso.
import { MINIGAME_TEXTS } from '../../../content/world-1/minigames.js';
import { createMachine } from './machine.js';

export function createUgc({ example = 0, texts = MINIGAME_TEXTS } = {}) {
  const g = texts.ugc;
  const ex = g.examples[example];
  const tried = [];

  const nodes = {
    intro: { heading: g.intro.heading, text: ex.brief, pix: g.intro.text, next: 'read' },

    read: {
      heading: g.reads.heading,
      text: g.reads.question,
      choices: () => ex.reads.map((r) => ({ id: r.id, label: r.label })),
      onChoose: (ctx, id) => ({ next: 'approach', reaction: { text: ex.reads.find((r) => r.id === id).reaction } }),
    },

    approach: {
      heading: g.approach.heading,
      text: () => (tried.length ? g.approach.again : g.approach.question),
      choices: () => ex.approaches.filter((a) => !tried.includes(a.id)).map((a) => ({ id: a.id, label: a.label })),
      onChoose: (ctx, id) => {
        const approach = ex.approaches.find((a) => a.id === id);
        tried.push(id);
        ctx.vars.fit = approach.fit;
        if (approach.fit === 'good') return { next: 'rights', reaction: { text: approach.reaction } };
        if (approach.fit === 'half') return { next: 'revision', reaction: { text: approach.reaction } };
        return { next: 'approach', reaction: { text: approach.reaction } };
      },
    },

    revision: {
      heading: g.revision.heading,
      text: ex.revision.question,
      choices: () => ex.revision.options.map((o) => ({ id: o.id, label: o.label })),
      onChoose: (ctx, id) => ({ next: 'rights', reaction: { text: ex.revision.options.find((o) => o.id === id).reaction } }),
    },

    rights: {
      heading: g.rights.heading,
      text: ex.rights.ask,
      choices: () => ex.rights.options.map((o) => ({ id: o.id, label: o.label })),
      onChoose: (ctx, id) => ({ next: null, reaction: { text: ex.rights.options.find((o) => o.id === id).reaction } }),
    },
  };

  return createMachine({ lessonId: g.lessonId, texts, example, learn: g.learn, totalSteps: g.totalSteps, first: 'intro', nodes });
}
