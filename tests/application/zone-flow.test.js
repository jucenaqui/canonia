// T020: flujo de una zona de decisión (006/FR-015, FR-016, FR-017, FR-041 a FR-046).
// Escritas antes que src/application/zone-flow.js.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { setupZoneFlow, INCOME_ZONE, ZONE_CONTENT } from '../fixtures/zone-fixture.js';
import { createDemoAiAdapter } from '../../src/adapters/ai/demo-ai-adapter.js';
import { WORLD3D_EVENTS } from '../../src/application/events.js';
import { AI_MODES } from '../../src/application/ports.js';
import { SAMPLE_TEXT, NOW } from '../fixtures/world-fixture.js';

const statusOf = (session, id) => session.inventory.get(id).status;

function approveDependents(session) {
  for (const id of ['niche', 'audience', 'timeAvailable', 'goal90Days']) {
    session.inventory.approve(id, { content: SAMPLE_TEXT[id], origin: 'player', now: NOW });
  }
}

// --- Ningún evento del mundo aprueba ---

test('ningún evento del mundo 3D aprueba ni cambia una pieza (006/FR-015, FR-043)', async () => {
  const { session, events } = setupZoneFlow();
  const before = JSON.stringify(session.inventory.toData());
  events.emit(WORLD3D_EVENTS.ZONE_ENTERED, { zoneId: 'incomeSource' });
  events.emit(WORLD3D_EVENTS.OPTION_INSPECTED, { zoneId: 'incomeSource', optionId: 'ugc' });
  events.emit(WORLD3D_EVENTS.MINIGAME_FINISHED, { zoneId: 'incomeSource', optionId: 'ugc', lessonId: 'ugc-brief', trustDelta: 10 });
  events.emit(WORLD3D_EVENTS.RECOMMENDATION_ASKED, { zoneId: 'incomeSource', answers: { timing: 'soon' } });
  events.emit(WORLD3D_EVENTS.CHOSEN_FOR_APPROVAL, { zoneId: 'incomeSource', optionId: 'ugc' });
  events.emit(WORLD3D_EVENTS.CHOSEN_FOR_APPROVAL, { zoneId: 'incomeSource', ownText: 'Mi propia fuente' });
  events.emit(WORLD3D_EVENTS.SPARK_COLLECTED, {});
  events.emit(WORLD3D_EVENTS.PLAYER_FAILED, { reason: 'fall' });
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(JSON.stringify(session.inventory.toData()), before);
  assert.equal(statusOf(session, 'incomeSource'), 'pending');
  assert.equal(session.gates.get('incomeSource').status, 'unresolved');
});

test('el evento de un minijuego terminado se anota por el flujo, sin aprobar', async () => {
  const { session, events } = setupZoneFlow();
  events.emit(WORLD3D_EVENTS.MINIGAME_FINISHED, { zoneId: 'incomeSource', optionId: 'ugc', lessonId: 'ugc-brief', trustDelta: 10 });
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.deepEqual(session.world3d.minigamesDone, ['incomeSource:ugc']);
  assert.equal(session.world3d.trust, 70);
  assert.equal(statusOf(session, 'incomeSource'), 'pending');
});

test('terminar un minijuego lo anota y ajusta la confianza, sin aprobar (006/FR-043, FR-048)', async () => {
  const { zoneFlow, session } = setupZoneFlow();
  const result = await zoneFlow.recordMinigame('incomeSource', 'ugc', { lessonId: 'ugc-brief', trustDelta: -15 });
  assert.equal(result.ok, true);
  assert.equal(session.world3d.trust, 45);
  assert.deepEqual(session.world3d.minigamesDone, ['incomeSource:ugc']);
  assert.equal(statusOf(session, 'incomeSource'), 'pending');
});

test('un minijuego repetido no se duplica en la lista y la confianza se mantiene entre 0 y 100', async () => {
  const { zoneFlow, session } = setupZoneFlow();
  await zoneFlow.recordMinigame('incomeSource', 'ugc', { lessonId: 'ugc-brief', trustDelta: 90 });
  await zoneFlow.recordMinigame('incomeSource', 'ugc', { lessonId: 'ugc-brief', trustDelta: 90 });
  assert.deepEqual(session.world3d.minigamesDone, ['incomeSource:ugc']);
  assert.equal(session.world3d.trust, 100);
  await zoneFlow.recordMinigame('incomeSource', 'affiliate', { lessonId: 'affiliate-shelf', trustDelta: -500 });
  assert.equal(session.world3d.trust, 0);
});

test('un minijuego de una zona u opción desconocida se rechaza sin tocar nada', async () => {
  const { zoneFlow, session } = setupZoneFlow();
  assert.equal((await zoneFlow.recordMinigame('nope', 'ugc', { lessonId: 'x', trustDelta: 5 })).ok, false);
  assert.equal((await zoneFlow.recordMinigame('incomeSource', 'nope', { lessonId: 'x', trustDelta: 5 })).ok, false);
  assert.equal((await zoneFlow.recordMinigame('incomeSource', 'ugc', { lessonId: 'x', trustDelta: Number.NaN })).ok, false);
  assert.deepEqual(session.world3d, { sparks: 0, tipsUnlocked: [], minigamesDone: [], zonesPresented: [], trust: 60 });
});

// --- Entrar e inspeccionar ---

test('entrar en una zona devuelve su estado, guarda el punto de retorno y no aprueba', () => {
  const { zoneFlow, session, commands } = setupZoneFlow();
  const result = zoneFlow.enterZone('incomeSource');
  assert.equal(result.ok, true);
  assert.equal(result.zone.zoneId, 'incomeSource');
  assert.deepEqual(result.zone.options.map((o) => o.id), ['ugc', 'affiliate', 'digital']);
  assert.equal(result.zone.currentOptionId, null);
  assert.deepEqual(session.resume, { worldId: 'world-1', screen: 'level', gateId: 'incomeSource', awaitingGuideAnswer: false });
  assert.deepEqual(commands, [{ name: 'say', data: { textId: 'zone.incomeSource.intro', vars: {} } }]);
  assert.equal(zoneFlow.enterZone('nope').ok, false);
});

test('inspeccionar una opción da su ficha con dos ejemplos y dice si es la elección actual (006/FR-041)', async () => {
  const { zoneFlow } = setupZoneFlow();
  const first = zoneFlow.inspectOption('incomeSource', 'ugc');
  assert.equal(first.ok, true);
  assert.equal(first.option.sheet.examples.length, 2);
  assert.equal(first.isCurrent, false);
  assert.equal(first.canChange, false);
  await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc' });
  assert.equal(zoneFlow.inspectOption('incomeSource', 'ugc').isCurrent, true);
  const other = zoneFlow.inspectOption('incomeSource', 'digital');
  assert.equal(other.isCurrent, false);
  assert.equal(other.canChange, true);
  assert.equal(zoneFlow.inspectOption('incomeSource', 'nope').ok, false);
});

// --- Aprobar solo desde approveZoneChoice ---

test('approveZoneChoice fija la pieza con el texto del contenido, resuelve la zona y guarda (006/FR-016, FR-017)', async () => {
  const { zoneFlow, session, commands, store } = setupZoneFlow();
  const result = await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc' });
  assert.equal(result.ok, true);
  const piece = session.inventory.get('incomeSource');
  assert.equal(piece.status, 'approved');
  assert.equal(piece.content, 'UGC AI para marcas');
  assert.equal(piece.origin, 'catalog');
  assert.equal(session.gates.get('incomeSource').status, 'resolved');
  assert.deepEqual(commands.map((c) => c.name), ['lightZone', 'setChosen', 'openBridge']);
  assert.deepEqual(commands[2].data, { zoneId: 'niche' });
  assert.equal((await store.load()).inventory.find((p) => p.id === 'incomeSource').content, 'UGC AI para marcas');
});

test('aprobar con una opción desconocida o una elección mal formada no cambia nada', async () => {
  const { zoneFlow, session } = setupZoneFlow();
  assert.deepEqual(await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'nope' }), { ok: false, reason: 'unknownOption' });
  assert.deepEqual(await zoneFlow.approveZoneChoice('incomeSource', {}), { ok: false, reason: 'invalidChoice' });
  assert.deepEqual(await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc', ownText: 'otra' }), { ok: false, reason: 'invalidChoice' });
  assert.deepEqual(await zoneFlow.approveZoneChoice('nope', { optionId: 'ugc' }), { ok: false, reason: 'unknownZone' });
  assert.equal(statusOf(session, 'incomeSource'), 'pending');
});

test('aprobar dos veces la misma opción no crea otra versión', async () => {
  const { zoneFlow, session } = setupZoneFlow();
  await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc' });
  await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc' });
  assert.deepEqual(session.inventory.get('incomeSource').history, []);
});

test('si la pieza ya está aprobada con otra opción, aprobar exige usar "cambiar"', async () => {
  const { zoneFlow, session } = setupZoneFlow();
  await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc' });
  assert.deepEqual(await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'digital' }), { ok: false, reason: 'useChange' });
  assert.equal(session.inventory.get('incomeSource').content, 'UGC AI para marcas');
});

// --- Cambiar ---

test('cambiar reabre y aprueba la otra opción; nicho, audiencia y objetivo quedan por revisar sin borrarse (006/FR-046, D52)', async () => {
  const { zoneFlow, session, commands } = setupZoneFlow();
  await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc' });
  approveDependents(session);
  commands.length = 0;

  const result = await zoneFlow.changeZoneChoice('incomeSource', { optionId: 'digital' });
  assert.equal(result.ok, true);
  assert.equal(result.contentChanged, true);
  assert.deepEqual([...result.markedForReview].sort(), ['audience', 'goal90Days', 'niche']);
  assert.equal(session.inventory.get('incomeSource').content, 'Productos digitales');
  for (const id of ['niche', 'audience', 'goal90Days']) {
    assert.equal(statusOf(session, id), 'needsReview', id);
    assert.equal(session.inventory.get(id).content, SAMPLE_TEXT[id], `${id} conserva su contenido`);
  }
  assert.equal(statusOf(session, 'timeAvailable'), 'approved', 'lo independiente no se toca');
  assert.equal(session.inventory.get('incomeSource').history.length, 1, 'la versión anterior se conserva');
  assert.ok(commands.some((c) => c.name === 'setChosen' && c.data.optionId === 'digital'));
});

test('cambiar a la misma opción, o en una zona sin aprobar, no hace nada', async () => {
  const { zoneFlow, session } = setupZoneFlow();
  assert.deepEqual(await zoneFlow.changeZoneChoice('incomeSource', { optionId: 'ugc' }), { ok: false, reason: 'notApproved' });
  await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc' });
  assert.deepEqual(await zoneFlow.changeZoneChoice('incomeSource', { optionId: 'ugc' }), { ok: false, reason: 'sameChoice' });
  assert.equal(session.inventory.get('incomeSource').history.length, 0);
});

test('lo cambiado y las piezas por revisar quedan guardados', async () => {
  const { zoneFlow, session, store } = setupZoneFlow();
  await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc' });
  approveDependents(session);
  await zoneFlow.changeZoneChoice('incomeSource', { optionId: 'digital' });
  const saved = await store.load();
  assert.equal(saved.inventory.find((p) => p.id === 'niche').status, 'needsReview');
  assert.equal(saved.inventory.find((p) => p.id === 'incomeSource').content, 'Productos digitales');
});

test('volver a aprobar una pieza por revisar con su mismo contenido la deja aprobada', async () => {
  const nicheZone = { ...INCOME_ZONE, zoneId: 'niche', nextZoneId: null, introTextId: undefined, options: [{ ...INCOME_ZONE.options[0], id: 'n1', text: SAMPLE_TEXT.niche }] };
  const { zoneFlow, session } = setupZoneFlow({ zoneContent: { ...ZONE_CONTENT, niche: nicheZone } });
  await zoneFlow.approveZoneChoice('incomeSource', { optionId: 'ugc' });
  await zoneFlow.approveZoneChoice('niche', { optionId: 'n1' });
  await zoneFlow.changeZoneChoice('incomeSource', { optionId: 'digital' });
  assert.equal(statusOf(session, 'niche'), 'needsReview');
  await zoneFlow.approveZoneChoice('niche', { optionId: 'n1' });
  assert.equal(statusOf(session, 'niche'), 'approved');
});

// --- "Otra" ---

test('"Otra" exige un texto válido (006/FR-044)', async () => {
  const { zoneFlow, session } = setupZoneFlow();
  assert.deepEqual(await zoneFlow.explainOtherOption('incomeSource', '   '), { ok: false, reason: 'tooShort' });
  assert.deepEqual(await zoneFlow.explainOtherOption('incomeSource', 'a'), { ok: false, reason: 'tooShort' });
  assert.deepEqual(await zoneFlow.explainOtherOption('incomeSource', 'x'.repeat(501)), { ok: false, reason: 'tooLong' });
  assert.deepEqual(await zoneFlow.approveZoneChoice('incomeSource', { ownText: ' ' }), { ok: false, reason: 'tooShort' });
  assert.deepEqual(await zoneFlow.approveZoneChoice('incomeSource', { ownText: 'y'.repeat(501) }), { ok: false, reason: 'tooLong' });
  assert.equal(statusOf(session, 'incomeSource'), 'pending');
});

test('"Otra" arma la ficha con la IA y no aprueba; aprobar el texto propio lo guarda con origen del jugador', async () => {
  const { zoneFlow, session } = setupZoneFlow();
  const explained = await zoneFlow.explainOtherOption('incomeSource', 'Clases particulares por videollamada');
  assert.equal(explained.ok, true);
  assert.ok(explained.sheet.fields.what, 'la ficha trae al menos un campo');
  assert.equal(statusOf(session, 'incomeSource'), 'pending');
  const approved = await zoneFlow.approveZoneChoice('incomeSource', { ownText: 'Clases particulares por videollamada' });
  assert.equal(approved.ok, true);
  assert.equal(session.inventory.get('incomeSource').origin, 'player');
  assert.equal(session.inventory.get('incomeSource').content, 'Clases particulares por videollamada');
});

test('si la IA no puede armar la ficha de "Otra", dice qué datos faltan y se puede seguir', async () => {
  const ai = { ...createDemoAiAdapter(), explainOther: async () => ({ ok: false, reason: 'failed' }) };
  const { zoneFlow } = setupZoneFlow({ ai });
  const result = await zoneFlow.explainOtherOption('incomeSource', 'Clases por videollamada');
  assert.equal(result.ok, true);
  assert.equal(result.fromFallback, true);
  assert.deepEqual(result.sheet.missing, ['Qué es', 'Cómo entra el dinero', 'Qué necesitas antes']);
  assert.equal(result.reason, 'failed');
});

test('una ficha de "Otra" incompleta indica qué campos faltan', async () => {
  const partial = { ...createDemoAiAdapter(), explainOther: async () => ({ ok: true, sheet: { fields: { what: 'Clases en línea.' }, examples: ['Uno'] } }) };
  const result = await setupZoneFlow({ ai: partial }).zoneFlow.explainOtherOption('incomeSource', 'Clases por videollamada');
  assert.equal(result.ok, true);
  assert.equal(result.fromFallback, false);
  assert.deepEqual(result.sheet.missing, ['Cómo entra el dinero', 'Qué necesitas antes']);
});

test('en modo guía "Otra" no llama a la IA: da la ficha de respaldo y la petición para el modo guía', async () => {
  let calls = 0;
  const ai = { ...createDemoAiAdapter({ mode: AI_MODES.GUIDE }), explainOther: async () => { calls += 1; return { ok: true, sheet: { fields: {}, examples: [] } }; } };
  const { zoneFlow } = setupZoneFlow({ ai });
  const result = await zoneFlow.explainOtherOption('incomeSource', 'Clases por videollamada');
  assert.equal(calls, 0);
  assert.equal(result.ok, true);
  assert.equal(result.fromFallback, true);
  assert.equal(result.guide.kind, 'otherSheet');
  assert.equal(result.guide.request.text, 'Clases por videollamada');
  const prompt = ai.guidePrompt(result.guide.kind, result.guide.request);
  assert.equal(prompt.ok, true);
  assert.ok(prompt.text.includes('Clases por videollamada'));
});

test('la respuesta pegada en modo guía para "Otra" se lee y valida', async () => {
  const ai = createDemoAiAdapter({ mode: AI_MODES.GUIDE });
  const { zoneFlow } = setupZoneFlow({ ai });
  const pasted = 'Claro:\n```json\n{"fields":{"what":"Clases en línea.","money":"Pagan por hora."},"examples":["Clases de inglés."]}\n```';
  const result = await zoneFlow.readOtherGuideAnswer('incomeSource', 'Clases por videollamada', pasted);
  assert.equal(result.ok, true);
  assert.deepEqual(result.sheet.missing, ['Qué necesitas antes']);
  assert.deepEqual(await zoneFlow.readOtherGuideAnswer('incomeSource', 'Clases por videollamada', 'no es json'), { ok: false, reason: 'badAnswer' });
});

// --- Recomendar ---

test('recomendar usa los criterios del contenido: la puntuación es la suma visible de sus puntos', async () => {
  const { zoneFlow } = setupZoneFlow();
  const result = await zoneFlow.recommendOption('incomeSource', { timing: 'soon' });
  assert.equal(result.ok, true);
  assert.equal(result.optionId, 'affiliate'); // rapidez alta (2) + esfuerzo bajo (2) = 4; UGC: 2 + 1 = 3
  const byId = Object.fromEntries(result.comparison.map((row) => [row.optionId, row.score]));
  assert.deepEqual(byId, { ugc: 3, affiliate: 4, digital: 0 });
  const later = await zoneFlow.recommendOption('incomeSource', { timing: 'wait' });
  assert.equal(later.optionId, 'digital');
});

test('con empate en los criterios y una pregunta jugada en el contenido, pregunta una sola vez', async () => {
  const { zoneFlow } = setupZoneFlow();
  const result = await zoneFlow.recommendOption('incomeSource', {});
  assert.equal(result.ok, true);
  assert.equal(result.needsQuestion, true);
  assert.equal(result.question.id, 'timing');
  assert.deepEqual(result.question.answers.map((a) => a.id), ['soon', 'wait']);
  assert.deepEqual(await zoneFlow.recommendOption('incomeSource', { timing: 'nope' }), { ok: false, reason: 'unknownAnswer' });
});

test('si una opción gana claramente sin preguntar, no pregunta', async () => {
  const clear = { ...INCOME_ZONE, options: INCOME_ZONE.options.filter((o) => o.id !== 'affiliate') };
  const { zoneFlow } = setupZoneFlow({ zoneContent: { incomeSource: clear } });
  const result = await zoneFlow.recommendOption('incomeSource', {});
  assert.equal(result.needsQuestion, undefined);
  assert.equal(result.optionId, 'ugc');
});

test('cambiar los criterios del contenido cambia la recomendación: no hay pesos ocultos', async () => {
  const inverted = {
    ...INCOME_ZONE,
    criteria: INCOME_ZONE.criteria.map((c) => ({ ...c, better: c.better === 'high' ? 'low' : 'high' })),
    recommendation: undefined,
  };
  const { zoneFlow } = setupZoneFlow({ zoneContent: { incomeSource: inverted } });
  const result = await zoneFlow.recommendOption('incomeSource', {});
  assert.equal(result.optionId, 'digital');
  assert.deepEqual(Object.fromEntries(result.comparison.map((r) => [r.optionId, r.score])), { ugc: 2, affiliate: 2, digital: 5 });
});

test('la IA solo redacta el porqué: no puede cambiar la opción recomendada', async () => {
  let received;
  const ai = {
    ...createDemoAiAdapter(),
    explainRecommendation: async (request) => { received = request; return { ok: true, reason: 'Porque sí, y además elige otra: Productos digitales.' }; },
  };
  const { zoneFlow, commands } = setupZoneFlow({ ai });
  const result = await zoneFlow.recommendOption('incomeSource', { timing: 'soon' });
  assert.equal(result.optionId, 'affiliate');
  assert.equal(result.reason, 'Porque sí, y además elige otra: Productos digitales.');
  assert.equal(result.fromFallback, false);
  assert.equal(received.recommended.id, 'affiliate');
  assert.ok(received.draftReason.length > 0);
  assert.deepEqual(commands.filter((c) => c.name === 'markRecommended'), [{ name: 'markRecommended', data: { zoneId: 'incomeSource', optionId: 'affiliate' } }]);
});

test('si la IA falla o no está, el porqué sale de los criterios, sin reintentos; recomendar no aprueba', async () => {
  let calls = 0;
  const ai = { ...createDemoAiAdapter(), explainRecommendation: async () => { calls += 1; return { ok: false, reason: 'busy' }; } };
  const { zoneFlow, session } = setupZoneFlow({ ai });
  const result = await zoneFlow.recommendOption('incomeSource', { timing: 'soon' });
  assert.equal(result.ok, true);
  assert.equal(result.fromFallback, true);
  assert.equal(result.explanationFailed, 'busy');
  assert.equal(calls, 1);
  assert.ok(result.reason.includes('Marketing de afiliados'));
  assert.ok(result.reason.includes('se puede empezar pronto'));
  assert.equal(statusOf(session, 'incomeSource'), 'pending');

  const guide = setupZoneFlow({ ai: createDemoAiAdapter({ mode: AI_MODES.GUIDE }) });
  const inGuide = await guide.zoneFlow.recommendOption('incomeSource', { timing: 'soon' });
  assert.equal(inGuide.ok, true);
  assert.equal(inGuide.fromFallback, true);
});
