// Lógica pura del minijuego de afiliados (T028): "El estante de recomendaciones". Sin DOM.
// Dos seguidores; en cada uno se elige el producto y si se pone la etiqueta de afiliado.
// La barra de confianza sube o baja según lo que decides.
import { MINIGAME_TEXTS } from '../../../content/world-1/minigames.js';
import { createMachine } from './machine.js';

export function createAffiliate({ example = 0, texts = MINIGAME_TEXTS } = {}) {
  const g = texts.affiliate;
  const rounds = g.examples[example].rounds;
  const lastRound = rounds.length - 1;

  const nodes = { intro: { heading: g.intro.heading, text: rounds[0].ask, pix: g.intro.text, next: 'shelf0' } };

  rounds.forEach((round, i) => {
    nodes[`shelf${i}`] = {
      heading: g.shelf.heading,
      text: g.shelf.question,
      pix: round.ask,
      choices: () => round.products.map((p) => ({ id: p.id, label: p.label, detail: p.note })),
      onChoose: (ctx, id) => {
        const product = round.products.find((p) => p.id === id);
        return { next: `tag${i}`, reaction: { text: product.reaction, trust: product.trust } };
      },
    };
    nodes[`tag${i}`] = {
      heading: g.tag.heading,
      text: g.tag.question,
      choices: () => [{ id: 'yes', label: g.tag.yes.label }, { id: 'no', label: g.tag.no.label }],
      onChoose: (ctx, id) => {
        const option = id === 'yes' ? g.tag.yes : g.tag.no;
        return { next: i < lastRound ? `between${i}` : null, reaction: { text: option.reaction, trust: option.trust } };
      },
    };
    if (i < lastRound) {
      const upcoming = rounds[i + 1];
      nodes[`between${i}`] = {
        heading: g.intro.heading,
        text: (ctx) => (ctx.trust < 50 ? g.skeptic : '') + upcoming.ask,
        next: `shelf${i + 1}`,
      };
    }
  });

  return createMachine({ lessonId: g.lessonId, texts, example, learn: g.learn, totalSteps: g.totalSteps, trustStart: g.trustStart, first: 'intro', nodes });
}
