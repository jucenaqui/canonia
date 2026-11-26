// Lógica pura del minijuego de patrocinios (T031): "La propuesta de la marca". Sin DOM.
// Pasos: media kit (números reales o inflados), la oferta, marcar la publicidad y qué hacer
// mientras crece la audiencia. La barra de confianza sube o baja con cada decisión.
import { MINIGAME_TEXTS } from '../../../content/world-1/minigames.js';
import { createMachine } from './machine.js';

export function createSponsorship({ example = 0, texts = MINIGAME_TEXTS } = {}) {
  const g = texts.sponsorship;
  const ex = g.examples[example];

  const kitItems = () => [
    { label: g.meters.audience, value: `${ex.kit.audience}%`, max: 100, bar: ex.kit.audience, tone: ex.kit.audience < 40 ? 'bad' : 'good' },
    { label: g.meters.fit, value: `${ex.kit.fit}%`, max: 100, bar: ex.kit.fit, tone: ex.kit.fit < 40 ? 'bad' : 'good' },
    { label: g.meters.work, value: `${ex.kit.work}%`, max: 100, bar: ex.kit.work, tone: ex.kit.work < 40 ? 'bad' : 'good' },
  ];

  const pick = (options, id) => options.find((o) => o.id === id);
  const toChoices = (options) => () => options.map((o) => ({ id: o.id, label: o.label }));
  const reactionOf = (o) => ({ text: o.reaction, trust: o.trust });

  const nodes = {
    intro: { heading: g.intro.heading, text: ex.proposal, items: kitItems, next: 'kit' },

    kit: {
      heading: g.kit.heading,
      text: `${g.kit.text} ${g.kit.question}`,
      items: kitItems,
      choices: toChoices(ex.kitOptions),
      onChoose: (ctx, id) => ({ next: 'offer', reaction: reactionOf(pick(ex.kitOptions, id)) }),
    },

    offer: {
      heading: g.offer.heading,
      text: ex.proposal,
      choices: toChoices(ex.offerOptions),
      onChoose: (ctx, id) => {
        const option = pick(ex.offerOptions, id);
        ctx.vars.accepted = id === 'accept';
        return { next: 'mark', reaction: reactionOf(option) };
      },
    },

    mark: {
      heading: g.mark.heading,
      text: (ctx) => (ctx.vars.accepted ? g.mark.accepted : g.mark.practice),
      choices: toChoices(g.mark.options),
      onChoose: (ctx, id) => ({ next: 'next', reaction: reactionOf(pick(g.mark.options, id)) }),
    },

    next: {
      heading: g.next.heading,
      text: g.next.question,
      choices: toChoices(g.next.options),
      onChoose: (ctx, id) => ({ next: null, reaction: reactionOf(pick(g.next.options, id)) }),
    },
  };

  return createMachine({ lessonId: g.lessonId, texts, example, learn: g.learn, totalSteps: g.totalSteps, trustStart: g.trustStart, first: 'intro', nodes });
}
