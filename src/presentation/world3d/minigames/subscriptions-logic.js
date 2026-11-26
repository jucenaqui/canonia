// Lógica pura del minijuego de suscripciones (T030): "Cuatro semanas de club". Sin DOM.
// Cada semana: entregar el contenido exclusivo y responder a la comunidad. Se llevan tres cifras:
// suscriptores, interés de la comunidad (la "llama") y el trabajo que te costó.
import { MINIGAME_TEXTS } from '../../../content/world-1/minigames.js';
import { createMachine, fill } from './machine.js';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function createSubscriptions({ example = 0, texts = MINIGAME_TEXTS } = {}) {
  const g = texts.subscriptions;
  const ex = g.examples[example];
  const names = g.meters;

  const items = (ctx) => [
    { label: names.subscribers, value: String(ctx.vars.subscribers) },
    { label: names.flame, value: `${ctx.vars.flame}/${g.maxFlame}`, max: g.maxFlame, bar: ctx.vars.flame, tone: ctx.vars.flame <= 3 ? 'bad' : 'good' },
    { label: names.effort, value: `${ctx.vars.effort}/${g.weeks * 2}`, max: g.weeks * 2, bar: ctx.vars.effort, tone: 'neutral' },
  ];
  const head = (template, week) => fill(template, { week: week + 1, weeks: g.weeks });

  const nodes = {
    intro: {
      heading: g.intro.heading,
      text: `${ex.club}. ${g.intro.text}`,
      items,
      onAdvance: () => 'content0',
    },
  };

  ex.weeks.forEach((week, w) => {
    nodes[`content${w}`] = {
      heading: head(g.content.heading, w),
      text: g.content.question,
      items,
      choices: () => [{ id: 'deliver', label: g.content.deliver.label }, { id: 'skip', label: g.content.skip.label }],
      onChoose: (ctx, id) => {
        const delivered = id === 'deliver';
        ctx.vars.delivered = delivered;
        if (delivered) {
          ctx.vars.effort += 1;
          ctx.vars.flame = clamp(ctx.vars.flame + 1, 0, g.maxFlame);
          return { next: `reply${w}`, reaction: { text: g.content.deliver.reaction } };
        }
        ctx.vars.flame = clamp(ctx.vars.flame - 2, 0, g.maxFlame);
        ctx.vars.subscribers = Math.max(0, ctx.vars.subscribers - 1);
        return { next: `reply${w}`, reaction: { text: g.content.skip.reaction + g.summary.left } };
      },
    };

    nodes[`reply${w}`] = {
      heading: head(g.reply.heading, w),
      text: week.message,
      items,
      choices: () => week.replies.map((r) => ({ id: r.id, label: r.label })),
      onChoose: (ctx, id) => {
        const reply = week.replies.find((r) => r.id === id);
        const v = ctx.vars;
        const delivered = v.delivered;
        let summary;
        if (reply.kind === 'good') {
          v.effort += 1;
          v.flame = clamp(v.flame + 1, 0, g.maxFlame);
          if (delivered) {
            v.subscribers += 1;
            summary = g.summary.both + g.summary.joined;
          } else {
            summary = g.summary.onlyReply;
          }
        } else if (reply.kind === 'harm') {
          v.flame = clamp(v.flame - 2, 0, g.maxFlame);
          v.subscribers = Math.max(0, v.subscribers - 1);
          summary = g.summary.left.trim();
        } else {
          v.flame = clamp(v.flame - 1, 0, g.maxFlame);
          summary = delivered ? g.summary.onlyContent : g.summary.none;
        }
        return { next: w < ex.weeks.length - 1 ? `content${w + 1}` : null, reaction: { text: `${reply.reaction} ${summary}`, tone: reply.kind === 'good' ? 'good' : 'bad' } };
      },
    };
  });

  return createMachine({ lessonId: g.lessonId, texts, example, learn: g.learn, totalSteps: g.totalSteps, first: 'intro', nodes, init: (ctx) => Object.assign(ctx.vars, { subscribers: g.startSubscribers, flame: g.startFlame, effort: 0 }) });
}
