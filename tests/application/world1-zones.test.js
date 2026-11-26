// Integración de la Fase 4 (006): conversión del contenido de la zona a la forma de la aplicación,
// recomendación sin pesos ocultos, contratos de IA y eventos, y el registro de minijuegos.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INCOME_ZONE } from '../../src/content/world-1/zone-income.js';
import { toZoneContent, levelId, nextZoneOf, WORLD_1_ZONE_CONTENT, zoneText, RECOMMEND_QUESTION_ID } from '../../src/content/world-1/zones.js';
import { createZoneFlow, ZONE_GUIDE_KINDS } from '../../src/application/zone-flow.js';
import { createEventBus, WORLD3D_EVENTS, WORLD3D_COMMANDS, chosenForApprovalData } from '../../src/application/events.js';
import { GUIDE_KINDS, isAiPort } from '../../src/application/ports.js';
import { GameSession } from '../../src/application/game-session.js';
import { MemoryProgressStore } from '../../src/adapters/storage/memory-progress-store.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { ZONE_TASKS } from '../../src/adapters/ai/prompts.js';
import { WORLD_1_SESSION_CONTENT } from '../../src/main.js';
import { createMinigameRegistry, adaptMinigame, choiceStateOf } from '../../src/presentation/world3d/minigame-registry.js';
import { MINIGAMES } from '../../src/presentation/world3d/minigames/index.js';

const ZONE = WORLD_1_ZONE_CONTENT.incomeSource;

function setup({ ai = createDemoAiAdapter({ delayMs: 0 }) } = {}) {
  const events = createEventBus();
  const commands = [];
  for (const name of Object.values(WORLD3D_COMMANDS)) events.on(name, (data) => commands.push({ name, data }));
  const session = new GameSession({ content: WORLD_1_SESSION_CONTENT, store: new MemoryProgressStore(), ai, clock: () => '2026-11-25T12:00:00.000Z' });
  const zoneFlow = createZoneFlow({ session, zoneContent: WORLD_1_ZONE_CONTENT, events, autoBind: true });
  return { events, commands, session, zoneFlow };
}

// --- Conversión ---

test('los niveles 1, 2 y 3 pasan a low, medium y high; otro valor es un error del contenido', () => {
  assert.deepEqual([1, 2, 3].map(levelId), ['low', 'medium', 'high']);
  assert.throws(() => levelId(4));
});

test('la zona convertida tiene la forma ZoneContent y conserva los textos del contenido', () => {
  assert.equal(ZONE.zoneId, 'incomeSource');
  assert.equal(ZONE.question, INCOME_ZONE.question);
  assert.equal(ZONE.nextZoneId, 'niche');
  assert.deepEqual(ZONE.sheetFields.map((f) => f.id), INCOME_ZONE.sheetFields.map((f) => f.key));
  assert.deepEqual(ZONE.criteria.map((c) => [c.id, c.better]), INCOME_ZONE.criteriaKeys.map((c) => [c.key, c.better]));
  for (const [i, option] of ZONE.options.entries()) {
    const source = INCOME_ZONE.options[i];
    assert.equal(option.id, source.id);
    assert.equal(option.text, source.name, 'el texto que se guarda es el nombre de la opción');
    for (const { key } of INCOME_ZONE.sheetFields) assert.equal(option.sheet.fields[key], source.sheet[key]);
    assert.deepEqual(option.sheet.examples, source.examples);
    assert.equal(option.minigame.lessonId, source.play.lessonId);
    for (const { key } of INCOME_ZONE.criteriaKeys) assert.equal(option.ratings[key], levelId(source.criteria[key]));
  }
  assert.deepEqual(ZONE.options.find((o) => o.id === 'ugc').ratings, { speed: 'high', audience: 'low', effort: 'medium', growth: 'medium' });
});

test('el puente que se abre al aprobar sale del layout', () => {
  assert.equal(nextZoneOf('incomeSource'), 'niche');
  assert.equal(nextZoneOf('goal90Days'), null, 'el último puente vuelve a la plaza, no es una zona');
});

test('sin pesos ocultos: cada respuesta solo elige qué criterios cuentan (peso distinto de 0)', () => {
  const answers = Object.fromEntries(ZONE.recommendation.question.answers.map((a) => [a.id, a.focus]));
  assert.deepEqual(answers, { asap: ['speed', 'audience', 'effort'], canWait: ['growth'] });
  assert.equal(ZONE.recommendation.question.id, RECOMMEND_QUESTION_ID);
  // Cambiar el tamaño de los pesos no cambia nada; solo cuenta si son 0 o no.
  const scaled = { ...INCOME_ZONE, recommend: { ...INCOME_ZONE.recommend, answers: INCOME_ZONE.recommend.answers.map((a) => ({ ...a, weights: Object.fromEntries(Object.entries(a.weights).map(([k, w]) => [k, w * 7])) })) } };
  assert.deepEqual(toZoneContent(scaled).recommendation, ZONE.recommendation);
});

test('el signo de cada peso coincide con qué nivel conviene en el criterio', () => {
  const better = Object.fromEntries(INCOME_ZONE.criteriaKeys.map((c) => [c.key, c.better]));
  for (const answer of INCOME_ZONE.recommend.answers) {
    for (const [key, weight] of Object.entries(answer.weights)) {
      if (weight === 0) continue;
      assert.equal(weight > 0 ? 'high' : 'low', better[key], `${answer.id}.${key}`);
    }
  }
});

test('PIX dice la introducción de la zona por su id de texto', () => {
  assert.equal(zoneText(ZONE.introTextId), INCOME_ZONE.intro);
  assert.equal(zoneText('incomeSource.chosen'), INCOME_ZONE.pix.chosen);
  assert.equal(zoneText('nada.intro'), null);
});

// --- Recomendación con el flujo real (docs/diseno/mundo-1-zonas.md) ---

test('sin respuesta hay empate en lo más alto y se hace la pregunta jugada', async () => {
  const { zoneFlow, commands } = setup();
  const result = await zoneFlow.recommendOption('incomeSource');
  assert.equal(result.needsQuestion, true);
  assert.deepEqual(result.question.answers.map((a) => a.label), ['Lo antes posible', 'Puedo esperar unos meses']);
  assert.equal(commands.filter((c) => c.name === WORLD3D_COMMANDS.MARK_RECOMMENDED).length, 0);
});

test('"Lo antes posible" recomienda UGC o afiliados, y "Puedo esperar" productos digitales o suscripciones', async () => {
  const { zoneFlow, commands, session } = setup();
  const soon = await zoneFlow.recommendOption('incomeSource', { [RECOMMEND_QUESTION_ID]: 'asap' });
  assert.ok(['ugc', 'affiliate'].includes(soon.optionId), soon.optionId);
  assert.ok(soon.reason.includes('Lo antes posible'));
  const wait = await zoneFlow.recommendOption('incomeSource', { [RECOMMEND_QUESTION_ID]: 'canWait' });
  assert.ok(['digital', 'subscriptions'].includes(wait.optionId), wait.optionId);
  assert.deepEqual(commands.filter((c) => c.name === WORLD3D_COMMANDS.MARK_RECOMMENDED).map((c) => c.data.optionId), [soon.optionId, wait.optionId]);
  assert.equal(session.inventory.get('incomeSource').status, 'pending', 'recomendar no aprueba');
});

test('aprobar desde la tarjeta guarda el nombre, marca la elegida y abre el puente al nicho', async () => {
  const { zoneFlow, commands, session } = setup();
  const result = await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'affiliate' });
  assert.equal(result.ok, true);
  assert.equal(session.inventory.get('incomeSource').content, 'Marketing de afiliados');
  assert.deepEqual(commands.map((c) => c.name), [WORLD3D_COMMANDS.LIGHT_ZONE, WORLD3D_COMMANDS.SET_CHOSEN, WORLD3D_COMMANDS.OPEN_BRIDGE]);
  assert.deepEqual(commands[2].data, { zoneId: 'niche' });
});

test('"Otra" arma la ficha con los campos de la zona y no aprueba', async () => {
  const { zoneFlow, session } = setup();
  const result = await zoneFlow.explainOtherOption('incomeSource', 'Clases por videollamada');
  assert.equal(result.ok, true);
  assert.deepEqual(Object.keys(result.sheet.fields), INCOME_ZONE.sheetFields.map((f) => f.key));
  assert.equal(session.inventory.get('incomeSource').status, 'pending');
});

// --- Contratos ---

test('las tareas de modo guía de las zonas son las mismas en el puerto, el flujo y los adaptadores', () => {
  assert.equal(GUIDE_KINDS.OTHER_SHEET, ZONE_GUIDE_KINDS.OTHER_SHEET);
  assert.equal(GUIDE_KINDS.RECOMMEND_REASON, ZONE_GUIDE_KINDS.RECOMMEND_REASON);
  assert.equal(GUIDE_KINDS.OTHER_SHEET, ZONE_TASKS.OTHER_SHEET);
  assert.equal(GUIDE_KINDS.RECOMMEND_REASON, ZONE_TASKS.RECOMMEND_REASON);
});

test('el puerto de IA acepta las operaciones opcionales de las zonas, y si están deben ser funciones', () => {
  const demo = createDemoAiAdapter();
  assert.equal(isAiPort(demo), true);
  assert.equal(typeof demo.explainRecommendation, 'function');
  assert.equal(typeof demo.explainOther, 'function');
  const { explainOther, ...withoutOther } = demo;
  assert.equal(typeof explainOther, 'function');
  assert.equal(isAiPort(withoutOther), true, 'son opcionales');
  assert.equal(isAiPort({ ...demo, explainOther: 'no' }), false);
});

test('chosenForApproval lleva una opción o un texto propio, nunca los dos ni ninguno', () => {
  assert.deepEqual(chosenForApprovalData('incomeSource', { optionId: 'ugc' }), { zoneId: 'incomeSource', optionId: 'ugc' });
  assert.deepEqual(chosenForApprovalData('incomeSource', { ownText: 'Clases' }), { zoneId: 'incomeSource', ownText: 'Clases' });
  assert.equal(chosenForApprovalData('incomeSource', { optionId: 'ugc', ownText: 'Clases' }), null);
  assert.equal(chosenForApprovalData('incomeSource', {}), null);
  assert.equal(chosenForApprovalData('', { optionId: 'ugc' }), null);
});

// --- Registro de minijuegos ---

test('un minijuego anota su final una sola vez, sin aprobar, y se destruye al cerrarse', async () => {
  const { events, session } = setup();
  const registry = createMinigameRegistry();
  let destroyed = 0;
  let saw = null;
  registry.register('affiliate-shelf', (ctx) => {
    saw = ctx;
    return { destroy() { destroyed += 1; } };
  });
  const log = [];
  const started = registry.start('affiliate-shelf', { zoneId: 'incomeSource', optionId: 'affiliate', trust: session.world3d.trust }, {
    onFinish: ({ trustDelta }) => {
      log.push(trustDelta);
      events.emit(WORLD3D_EVENTS.MINIGAME_FINISHED, { zoneId: 'incomeSource', optionId: 'affiliate', lessonId: 'affiliate-shelf', trustDelta });
    },
    onExit: () => log.push('exit'),
  });
  assert.equal(started, true);
  assert.equal(saw.lessonId, 'affiliate-shelf');
  assert.equal(saw.example, 0);
  saw.finish({ trustDelta: 10 });
  saw.finish({ trustDelta: 99 });
  assert.equal(destroyed, 0, 'tras el final sigue a la vista con su resumen');
  saw.exit(); saw.exit();
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.deepEqual(log, [10, 'exit']);
  assert.equal(destroyed, 1);
  assert.ok(session.world3d.minigamesDone.includes('incomeSource:affiliate'));
  assert.equal(session.world3d.trust, 70);
  assert.equal(session.inventory.get('incomeSource').status, 'pending');
});

test('el ejemplo alterna 0 y 1 cada vez que se juega la misma lección; salir a mitad no anota', () => {
  const registry = createMinigameRegistry();
  const examples = [];
  registry.register('ugc-brief', (ctx) => { examples.push(ctx.example); ctx.exit(); });
  for (let i = 0; i < 3; i++) registry.start('ugc-brief', {}, { onFinish: () => assert.fail('no terminó') });
  assert.deepEqual(examples, [0, 1, 0]);
});

test('adaptMinigame traduce la firma de minigames/index.js al registro', () => {
  const registry = createMinigameRegistry();
  const calls = [];
  registry.register('digital-problem', adaptMinigame(({ container, example, onFinish, onExit }) => {
    calls.push(['start', container, example]);
    onFinish({ lessonId: 'digital-problem', trustDelta: -5, summary: 'x' });
    onExit();
    return { destroy() { calls.push(['destroy']); } };
  }));
  registry.start('digital-problem', { container: 'C' }, { onFinish: (r) => calls.push(['finish', r.trustDelta]), onExit: () => calls.push(['exit']) });
  assert.deepEqual(calls, [['start', 'C', 0], ['finish', -5], ['exit'], ['destroy']]);
});

test('choiceStateOf decide el botón de elegir de la pantalla final', () => {
  assert.equal(choiceStateOf({ chosenId: null, optionId: 'a' }), 'choose');
  assert.equal(choiceStateOf({ chosenId: 'b', optionId: 'a' }), 'change');
  assert.equal(choiceStateOf({ chosenId: 'a', optionId: 'a' }), 'current');
});

test('elegir desde el minijuego cierra el juego y pide la tarjeta; no aprueba nada', () => {
  const registry = createMinigameRegistry();
  const calls = [];
  let seen = null;
  registry.register('x', adaptMinigame((o) => { seen = o.choice; return { destroy() { calls.push('destroy'); } }; }));
  registry.start('x', { choice: { state: 'change' } }, {
    onFinish: () => calls.push('finish'),
    onExit: ({ choosing }) => calls.push(['exit', choosing]),
    onChoose: () => calls.push('choose'),
  });
  assert.equal(seen.state, 'change');
  seen.onChoose();
  seen.onChoose(); // una sola vez
  assert.deepEqual(calls, ['destroy', ['exit', true], 'choose']);
});

test('los cinco minijuegos de la zona están en el registro con el lessonId del contenido', () => {
  assert.deepEqual(Object.keys(MINIGAMES).sort(), INCOME_ZONE.options.map((o) => o.play.lessonId).sort());
});

test('sin minijuego registrado, start devuelve false; un minijuego que falla al arrancar sale sin anotar', () => {
  const registry = createMinigameRegistry();
  assert.equal(registry.start('ugc-brief', {}, { onFinish: () => assert.fail() }), false);
  registry.register('ugc-brief', () => { throw new Error('roto'); });
  let exited = false;
  assert.equal(registry.start('ugc-brief', {}, { onFinish: () => assert.fail(), onExit: () => { exited = true; } }), true);
  assert.equal(exited, true);
  assert.throws(() => registry.register('', () => {}));
  assert.throws(() => registry.register('x', null));
});
