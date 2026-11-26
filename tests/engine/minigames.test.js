// T026: los cinco minijuegos como máquinas de estados puras (sin DOM ni three.js).
// Cada uno termina, cada decisión tiene su consecuencia (y cambio de confianza cuando aplica) y
// ninguno aprueba nada: solo informa su resultado.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { MINIGAME_TEXTS } from '../../src/content/world-1/minigames.js';
import { INCOME_ZONE } from '../../src/content/world-1/zone-income.js';
import { createUgc } from '../../src/presentation/world3d/minigames/ugc-logic.js';
import { createAffiliate } from '../../src/presentation/world3d/minigames/affiliate-logic.js';
import { createDigitalProduct, salesOutcome } from '../../src/presentation/world3d/minigames/digital-product-logic.js';
import { createSubscriptions } from '../../src/presentation/world3d/minigames/subscriptions-logic.js';
import { createSponsorship } from '../../src/presentation/world3d/minigames/sponsorship-logic.js';
import { MINIGAMES } from '../../src/presentation/world3d/minigames/index.js';

const GAMES = [
  { name: 'ugc', lessonId: 'ugc-brief', create: createUgc, trust: false },
  { name: 'affiliate', lessonId: 'affiliate-shelf', create: createAffiliate, trust: true },
  { name: 'digital', lessonId: 'digital-problem', create: createDigitalProduct, trust: false },
  { name: 'subscriptions', lessonId: 'subscriptions-club', create: createSubscriptions, trust: false },
  { name: 'sponsorship', lessonId: 'sponsorships-offer', create: createSponsorship, trust: true },
];
const MAX_ACTIONS = 80;

/** Avanza por escenas informativas y consecuencias hasta la siguiente decisión o el final. */
function settle(machine) {
  for (let guard = 0; guard < MAX_ACTIONS; guard += 1) {
    const scene = machine.scene();
    if (scene.phase === 'choice' || scene.phase === 'end') return scene;
    machine.advance();
  }
  assert.fail('el minijuego no termina');
}

/** Reproduce un camino (índices de opción) desde el inicio y deja la máquina en la siguiente decisión. */
function replay(create, example, path) {
  const machine = create({ example });
  for (const index of path) machine.choose(settle(machine).choices[index].id);
  return { machine, scene: settle(machine) };
}

/**
 * Recorre TODOS los caminos posibles de un minijuego. Llama a `onChoiceScene(create, example, path, scene)`
 * en cada decisión y devuelve las máquinas que llegaron al final.
 */
function exploreAll(create, example, onChoiceScene) {
  const finished = [];
  const stack = [[]];
  while (stack.length) {
    const path = stack.pop();
    const { machine, scene } = replay(create, example, path);
    if (scene.phase === 'end') { finished.push({ path, machine }); continue; }
    onChoiceScene?.(create, example, path, scene);
    for (let i = 0; i < scene.choices.length; i += 1) stack.push([...path, i]);
  }
  return finished;
}

for (const game of GAMES) {
  for (const example of [0, 1]) {
    test(`${game.name} (ejemplo ${example + 1}): todos los caminos terminan y la confianza queda entre 0 y 100`, () => {
      const finished = exploreAll(game.create, example);
      assert.ok(finished.length >= 2, 'debe haber más de un camino');
      for (const { machine } of finished) {
        const result = machine.result();
        assert.equal(result.lessonId, game.lessonId);
        assert.equal(typeof result.summary, 'string');
        assert.ok(result.summary.length > 20);
        assert.ok(Number.isFinite(result.trustDelta));
        if (!game.trust) assert.equal(result.trustDelta, 0);
        else {
          const t = machine.trust();
          assert.ok(t >= 0 && t <= 100);
        }
      }
    });

    test(`${game.name} (ejemplo ${example + 1}): cada decisión tiene su consecuencia, distinta según lo elegido`, () => {
      let decisions = 0;
      exploreAll(game.create, example, (create, ex, path, scene) => {
        if (scene.choices.length === 1 && scene.choices[0].id === 'collect') return; // añadir una pieza no decide nada
        decisions += 1;
        const reactions = scene.choices.map((choice) => {
          const { machine } = replay(create, ex, path);
          const after = machine.choose(choice.id);
          assert.equal(after.phase, 'reaction', `la decisión "${choice.label}" no tiene consecuencia`);
          assert.ok(after.text.length > 10);
          return after.text;
        });
        assert.equal(new Set(reactions).size, reactions.length, 'dos opciones tienen la misma consecuencia');
      });
      assert.ok(decisions >= 3, 'cada ejemplo tiene al menos 3 decisiones');
    });
  }

  test(`${game.name}: no aprueba nada y solo informa lessonId, trustDelta y summary`, () => {
    const machine = game.create({ example: 0 });
    assert.equal(machine.result(), null, 'no hay resultado antes de terminar');
    for (const key of Object.keys(machine)) assert.doesNotMatch(key, /approve|pieza|piece|fix|aprob/i);
    // Termina con la primera opción de cada decisión.
    for (let i = 0; i < MAX_ACTIONS && !machine.isDone(); i += 1) {
      const scene = machine.scene();
      if (scene.phase === 'choice') machine.choose(scene.choices[0].id);
      else machine.advance();
    }
    assert.ok(machine.isDone());
    assert.deepEqual(Object.keys(machine.result()).sort(), ['lessonId', 'summary', 'trustDelta']);
    assert.equal(machine.scene().phase, 'end');
  });

  test(`${game.name}: ignora acciones fuera de lugar y no avanza una vez terminado`, () => {
    const machine = game.create({ example: 1 });
    const first = machine.scene();
    machine.choose('no-existe');
    assert.deepEqual(machine.scene(), first);
    for (let i = 0; i < MAX_ACTIONS && !machine.isDone(); i += 1) {
      const scene = machine.scene();
      if (scene.phase === 'choice') machine.choose(scene.choices[0].id);
      else machine.advance();
    }
    const result = machine.result();
    machine.advance();
    machine.choose('lo-que-sea');
    assert.deepEqual(machine.result(), result);
  });
}

test('MINIGAMES tiene un inicio por cada lessonId de la zona de ingreso', () => {
  const lessons = INCOME_ZONE.options.map((o) => o.play.lessonId).sort();
  assert.deepEqual(Object.keys(MINIGAMES).sort(), lessons);
  for (const start of Object.values(MINIGAMES)) assert.equal(typeof start, 'function');
  assert.deepEqual(GAMES.map((g) => g.lessonId).sort(), lessons);
});

test('cada minijuego tiene dos ejemplos', () => {
  assert.equal(MINIGAME_TEXTS.ugc.examples.length, 2);
  assert.equal(MINIGAME_TEXTS.affiliate.examples.length, 2);
  assert.equal(MINIGAME_TEXTS.digital.examples.length, 2);
  assert.equal(MINIGAME_TEXTS.subscriptions.examples.length, 2);
  assert.equal(MINIGAME_TEXTS.sponsorship.examples.length, 2);
});

// --- Consecuencias propias de cada juego -------------------------------------------------------

/** Juega eligiendo, en cada decisión, la opción cuyo id esté en `plan` (o la primera). */
function play(create, example, plan = {}) {
  const machine = create({ example });
  const taken = [];
  for (let i = 0; i < MAX_ACTIONS && !machine.isDone(); i += 1) {
    const scene = machine.scene();
    if (scene.phase === 'choice') {
      const wanted = plan[scene.heading] ?? plan['*'];
      const choice = scene.choices.find((c) => wanted?.includes(c.id)) ?? scene.choices[0];
      taken.push(choice.id);
      machine.choose(choice.id);
    } else machine.advance();
  }
  assert.ok(machine.isDone());
  return { machine, taken };
}

test('UGC: elegir un enfoque que no encaja obliga a elegir otro; el que encaja a medias pide una revisión', () => {
  for (const example of [0, 1]) {
    const m = createUgc({ example });
    m.advance(); // lee el pedido
    m.choose('right'); m.advance();
    const miss = MINIGAME_TEXTS.ugc.examples[example].approaches.find((a) => a.fit === 'miss');
    const after = m.choose(miss.id);
    assert.equal(after.phase, 'reaction');
    m.advance();
    const again = m.scene();
    assert.equal(again.phase, 'choice');
    assert.ok(!again.choices.some((c) => c.id === miss.id), 'no se repite el enfoque rechazado');
    const half = MINIGAME_TEXTS.ugc.examples[example].approaches.find((a) => a.fit === 'half');
    m.choose(half.id); m.advance();
    assert.equal(m.scene().heading, MINIGAME_TEXTS.ugc.revision.heading);
  }
});

test('UGC: los derechos de uso para anuncios se cobran aparte (la consecuencia lo dice)', () => {
  for (const example of [0, 1]) {
    const rights = MINIGAME_TEXTS.ugc.examples[example].rights.options;
    assert.match(rights.find((o) => o.id === 'free').reaction, /derecho|cobr/i);
    assert.match(rights.find((o) => o.id === 'paid').reaction, /pago|distinto|negoci/i);
  }
});

test('afiliados: el producto equivocado baja la confianza, el correcto la sube y sin etiqueta también baja', () => {
  for (const example of [0, 1]) {
    const rounds = MINIGAME_TEXTS.affiliate.examples[example].rounds;
    const kind = (round, k) => round.products.find((p) => p.kind === k).id;

    const good = play(createAffiliate, example, { '*': [kind(rounds[0], 'right'), kind(rounds[1], 'right'), 'yes'] });
    const bad = play(createAffiliate, example, { '*': [kind(rounds[0], 'wrong'), kind(rounds[1], 'wrong'), 'no'] });
    const noTag = play(createAffiliate, example, { '*': [kind(rounds[0], 'right'), kind(rounds[1], 'right'), 'no'] });

    assert.ok(good.machine.result().trustDelta > 0, 'recomendar bien y etiquetar sube la confianza');
    assert.ok(bad.machine.result().trustDelta < 0, 'recomendar mal baja la confianza');
    assert.ok(noTag.machine.result().trustDelta < good.machine.result().trustDelta, 'sin etiqueta la confianza es menor');
    assert.equal(good.machine.trust(), 60 + 10 + 5 + 10 + 5);
  }
});

test('afiliados: tras recomendar mal, el siguiente seguidor duda', () => {
  const example = 0;
  const rounds = MINIGAME_TEXTS.affiliate.examples[example].rounds;
  const m = createAffiliate({ example });
  m.advance();
  m.choose(rounds[0].products.find((p) => p.kind === 'wrong').id); m.advance();
  m.choose('no'); m.advance();
  assert.ok(m.trust() < 50);
  assert.match(m.scene().text, /duda/i);
});

test('afiliados: la confianza no sale del rango 0 a 100', () => {
  const m = play(createAffiliate, 0, { '*': ['pro', 'suite', 'no'] }).machine;
  assert.ok(m.trust() >= 0 && m.trust() <= 100);
});

test('productos digitales: un problema que se repite vende mejor que un caso suelto', () => {
  for (const example of [0, 1]) {
    const problems = MINIGAME_TEXTS.digital.examples[example].problems;
    const repeated = problems.find((p) => p.repeated);
    const lone = problems.find((p) => !p.repeated);
    assert.equal(salesOutcome(repeated, repeated.ideal), 'good');
    assert.equal(salesOutcome(lone, 'guide'), 'poor');
    assert.equal(salesOutcome(repeated, repeated.ideal === 'course' ? 'guide' : 'course'), 'ok', 'un formato más grande no siempre es mejor');
  }
});

test('productos digitales: más formato, más piezas que armar', () => {
  const lengths = ['guide', 'template', 'course'].map((format) => {
    const m = createDigitalProduct({ example: 0 });
    m.advance();
    m.choose('cook'); m.advance();
    m.choose(format); m.advance();
    let taps = 0;
    while (m.scene().choices[0]?.id === 'collect') { m.choose('collect'); taps += 1; }
    return taps;
  });
  assert.deepEqual(lengths, [3, 4, 6]);
});

test('productos digitales: solo el segundo ejemplo trae la actualización por comentarios', () => {
  const headings = (example) => {
    const seen = [];
    const m = createDigitalProduct({ example });
    for (let i = 0; i < MAX_ACTIONS && !m.isDone(); i += 1) {
      const s = m.scene();
      seen.push(s.heading);
      if (s.phase === 'choice') m.choose(s.choices[0].id); else m.advance();
    }
    return seen;
  };
  const update = MINIGAME_TEXTS.digital.update.heading;
  assert.ok(!headings(0).includes(update));
  assert.ok(headings(1).includes(update));
});

test('productos digitales: prometer resultados garantizados o inventar un título no es lo correcto', () => {
  for (const example of [0, 1]) {
    const options = MINIGAME_TEXTS.digital.examples[example].describe;
    assert.equal(options.filter((o) => o.ok).length, 1);
    assert.match(options.find((o) => o.id === 'guarantee').reaction, /garantiz|promesa/i);
  }
});

test('suscripciones: son cuatro semanas con dos decisiones cada una', () => {
  for (const example of [0, 1]) {
    const m = createSubscriptions({ example });
    let decisions = 0;
    for (let i = 0; i < MAX_ACTIONS && !m.isDone(); i += 1) {
      const s = m.scene();
      if (s.phase === 'choice') { decisions += 1; m.choose(s.choices[0].id); } else m.advance();
    }
    assert.equal(decisions, 8);
  }
});

test('suscripciones: cumplir cada semana hace crecer la llama y los suscriptores; saltarse las semanas los baja', () => {
  const value = (m, label) => m.scene().items.find((i) => i.label === label);
  for (const example of [0, 1]) {
    const names = MINIGAME_TEXTS.subscriptions.meters;
    const run = (deliver) => {
      const m = createSubscriptions({ example });
      m.advance();
      let last;
      for (let i = 0; i < MAX_ACTIONS && !m.isDone(); i += 1) {
        const s = m.scene();
        last = s;
        if (s.phase === 'choice') {
          const pick = s.choices.find((c) => (deliver ? ['deliver', 'reply', 'privacy'] : ['skip', 'later']).includes(c.id));
          m.choose(pick.id);
        } else m.advance();
      }
      return { subs: Number(last.items.find((i) => i.label === names.subscribers).value), flame: Number(last.items.find((i) => i.label === names.flame).value.split('/')[0]) };
    };
    const diligent = run(true);
    const absent = run(false);
    assert.ok(diligent.subs > 3 && diligent.flame > 5, 'cumplir hace crecer');
    assert.ok(absent.subs < 3 && absent.flame < 5, 'faltar baja');
    void value;
  }
});

test('suscripciones: pasar el contacto privado de otro miembro es dañino', () => {
  const m = createSubscriptions({ example: 1 });
  m.advance();
  // Semana 1: entrega y responde bien.
  m.choose('deliver'); m.advance();
  m.choose('reply'); m.advance();
  // Semana 2: entrega y comparte el contacto.
  m.choose('deliver'); m.advance();
  const share = m.choose('share');
  assert.equal(share.tone, 'bad');
  m.advance();
  const subs = Number(m.scene().items.find((i) => i.label === MINIGAME_TEXTS.subscriptions.meters.subscribers).value);
  assert.equal(subs, 3 + 1 - 1, 'ganó uno en la semana 1 y perdió uno por compartir el contacto');
});

test('patrocinios: aceptar una oferta que no encaja baja la confianza; rechazarla no', () => {
  const accept = play(createSponsorship, 0, { '*': ['honest', 'accept', 'visible', 'steady'] });
  const reject = play(createSponsorship, 0, { '*': ['honest', 'reject', 'visible', 'steady'] });
  assert.ok(accept.machine.result().trustDelta < reject.machine.result().trustDelta);
  assert.ok(accept.machine.trust() < 60 + 5 + 8 + 5, 'aceptar la que no encaja cuesta confianza');
});

test('patrocinios: en los dos casos se enseña a marcar la publicidad, y esconderla baja la confianza', () => {
  for (const example of [0, 1]) {
    for (const offer of ['accept', 'reject']) {
      const m = createSponsorship({ example });
      m.advance(); m.choose('honest'); m.advance(); m.choose(offer); m.advance();
      const mark = m.scene();
      assert.equal(mark.heading, MINIGAME_TEXTS.sponsorship.mark.heading);
      assert.deepEqual(mark.choices.map((c) => c.id), ['visible', 'hidden', 'none']);
      const before = m.trust();
      m.choose('hidden');
      assert.ok(m.trust() < before);
    }
  }
});

test('patrocinios: inflar el media kit y comprar seguidores falsos bajan la confianza', () => {
  for (const example of [0, 1]) {
    const honest = play(createSponsorship, example, { '*': ['honest', 'accept', 'visible', 'steady'] });
    const cheat = play(createSponsorship, example, { '*': ['inflate', 'accept', 'visible', 'buy'] });
    assert.ok(cheat.machine.result().trustDelta < honest.machine.result().trustDelta);
  }
});

test('patrocinios: el media kit del primer ejemplo tiene la audiencia casi vacía', () => {
  const m = createSponsorship({ example: 0 });
  const audience = m.scene().items.find((i) => i.label === MINIGAME_TEXTS.sponsorship.meters.audience);
  assert.ok(audience.bar <= 20);
});

test('los textos no prometen dinero con cifras de ingresos', () => {
  const all = JSON.stringify(MINIGAME_TEXTS);
  assert.doesNotMatch(all, /[$€]\s?\d|\d\s?(€|USD|euros|dólares|pesos)/i);
  assert.doesNotMatch(all, /ganar[áa]s \d|ingresos garantizados/i);
});

test('la lógica de los minijuegos no importa la aplicación ni toca el DOM', async () => {
  const dir = new URL('../../src/presentation/world3d/minigames/', import.meta.url);
  for (const file of ['machine.js', 'ugc-logic.js', 'affiliate-logic.js', 'digital-product-logic.js', 'subscriptions-logic.js', 'sponsorship-logic.js']) {
    const source = await readFile(new URL(file, dir), 'utf8');
    assert.doesNotMatch(source, /application\//, `${file} importa la aplicación`);
    assert.doesNotMatch(source, /\b(document|window)\b|from 'three'/, `${file} usa DOM o three.js`);
  }
});
