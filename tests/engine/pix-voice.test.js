// D60: la voz de PIX (modos, desbloqueo, silencio, texto libre solo por el navegador) y sus frases fijas.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createPixVoice, pickVoice, normalizeMode, modeFromLocation, MUTE_KEY, DEFAULT_VOICE_MODE } from '../../src/presentation/world3d/pix-voice.js';
import { subtitleOf } from '../../src/presentation/world3d/hud.js';
import { PIX_LINES, pixKey } from '../../src/content/world-1/pix-lines.js';
import { INCOME_ZONE } from '../../src/content/world-1/zone-income.js';
import { MINIGAME_TEXTS } from '../../src/content/world-1/minigames.js';
import { WORLD_1_LAYOUT } from '../../src/content/world-1/layout.js';
import { zoneText } from '../../src/content/world-1/zones.js';

// --- Dobles del entorno ---

function fakeStorage(initial = {}) {
  const data = { ...initial };
  return { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = String(v); }, data };
}

function fakeSpeech(voices = [{ lang: 'es-MX', name: 'a' }, { lang: 'es-US', name: 'b' }, { lang: 'en-US', name: 'c' }]) {
  const spoken = [];
  const speech = {
    spoken,
    cancelled: 0,
    getVoices: () => voices,
    speak(u) { spoken.push(u); queueMicrotask(() => u.onend?.()); },
    cancel() { this.cancelled += 1; },
  };
  class Utterance { constructor(text) { this.text = text; } }
  return { speech, Utterance };
}

function fakeAudio({ fail = false } = {}) {
  const created = [];
  class AudioCtor {
    constructor(src) { this.src = src; this.listeners = {}; created.push(this); }
    addEventListener(name, fn) { this.listeners[name] = fn; }
    pause() {}
    play() {
      if (fail) { queueMicrotask(() => this.listeners.error?.()); return Promise.reject(new Error('no file')); }
      queueMicrotask(() => this.listeners.ended?.());
      return Promise.resolve();
    }
  }
  return { AudioCtor, created };
}

const LINES = { 'a.b': 'Hola, soy PIX.' };
const make = (opts = {}) => {
  const sp = fakeSpeech(opts.voices);
  const au = fakeAudio(opts.audio);
  const voice = createPixVoice({
    lines: LINES, storage: fakeStorage(opts.stored), gestureTarget: null,
    speech: opts.noSpeech ? null : sp.speech, Utterance: sp.Utterance, AudioCtor: opts.noAudio ? undefined : au.AudioCtor,
    mode: 'navegador', // los dobles de prueba asumen el navegador salvo que se pida otro modo
    ...opts.extra,
  });
  if (opts.unlocked !== false) voice.unlock();
  return { voice, sp, au };
};

// --- Modos ---

test('modo por defecto grabada (D61); ?voz= lo cambia, lo inválido se ignora y lo guardado no cuenta', () => {
  const bare = (opts = {}) => createPixVoice({ lines: LINES, storage: fakeStorage(opts.stored), gestureTarget: null, speech: null, AudioCtor: undefined, ...opts.extra });
  assert.equal(DEFAULT_VOICE_MODE, 'grabada');
  assert.equal(bare().getMode(), 'grabada');
  assert.equal(bare({ extra: { mode: 'navegador' } }).getMode(), 'navegador');
  assert.equal(bare({ extra: { mode: 'robot' } }).getMode(), 'grabada');
  assert.equal(bare({ stored: { 'canonia.pixVoz.modo': 'navegador' } }).getMode(), 'grabada');
  assert.equal(normalizeMode(' Grabada '), 'grabada');
  assert.equal(modeFromLocation({ search: '?voz=grabada' }), 'grabada');
  assert.equal(modeFromLocation({ search: '?voz=navegador' }), 'navegador');
  assert.equal(modeFromLocation({ search: '?voz=x' }), null);
  assert.equal(modeFromLocation(undefined), null);
});

test('canSound: solo si no está silenciada, hubo un primer toque y hay cómo sonar', () => {
  assert.equal(make().voice.canSound(), true);
  assert.equal(make({ unlocked: false }).voice.canSound(), false);
  assert.equal(make({ stored: { [MUTE_KEY]: '1' } }).voice.canSound(), false);
  assert.equal(make({ noSpeech: true, noAudio: true }).voice.canSound(), false);
  const { voice } = make({ extra: { mode: 'grabada' }, noSpeech: true });
  assert.equal(voice.canSound(), true);
  voice.setMuted(true);
  assert.equal(voice.canSound(), false);
});

test('onFail se llama solo si de verdad no sonó, no si lo cortaron', async () => {
  const calls = [];
  const bad = make({ voices: [{ lang: 'en-US' }] });
  assert.equal(await bad.voice.say('a.b', { onFail: () => calls.push('bad') }), false);
  assert.deepEqual(calls, ['bad']);
  const good = make();
  assert.equal(await good.voice.say('a.b', { onFail: () => calls.push('good') }), true);
  const cut = make();
  const pending = cut.voice.say('a.b', { onFail: () => calls.push('cut') });
  cut.voice.stop();
  await pending;
  assert.deepEqual(calls, ['bad']);
});

test('subscribe avisa cuando PIX habla o se silencia, y se puede dejar de avisar', async () => {
  const { voice } = make();
  let n = 0;
  const off = voice.subscribe(() => { n += 1; });
  await voice.say('a.b');
  assert.ok(n >= 2);
  assert.equal(voice.isSpeaking(), false);
  const before = n;
  voice.setMuted(true);
  assert.ok(n > before);
  off();
  const after = n;
  voice.setMuted(false);
  assert.equal(n, after);
});

test('setMode cambia el modo y rechaza uno inválido', () => {
  const { voice } = make();
  voice.setMode('grabada');
  assert.equal(voice.getMode(), 'grabada');
  assert.equal(voice.setMode('otro'), 'grabada');
});

test('elige la voz en español: es-419, luego es-US, es-ES, otra es-*; nunca otro idioma', () => {
  assert.equal(pickVoice([{ lang: 'en-US' }, { lang: 'es-ES' }, { lang: 'es-419' }]).lang, 'es-419');
  assert.equal(pickVoice([{ lang: 'es-ES' }, { lang: 'es-US' }]).lang, 'es-US');
  assert.equal(pickVoice([{ lang: 'es-MX' }, { lang: 'es-ES' }]).lang, 'es-ES');
  assert.equal(pickVoice([{ lang: 'es_AR' }]).lang, 'es_AR');
  assert.equal(pickVoice([{ lang: 'en-US' }]), null);
  assert.equal(pickVoice([]), null);
});

// --- Navegador ---

test('modo navegador: dice la frase de la clave con voz es-* y velocidad natural', async () => {
  const { voice, sp } = make();
  assert.equal(await voice.say('a.b'), true);
  assert.equal(sp.speech.spoken.length, 1);
  assert.equal(sp.speech.spoken[0].text, 'Hola, soy PIX.');
  assert.equal(sp.speech.spoken[0].voice.lang, 'es-US');
  assert.equal(sp.speech.spoken[0].rate, 1);
});

test('sin voces en español no suena nada: solo texto', async () => {
  const { voice, sp } = make({ voices: [{ lang: 'en-US' }] });
  assert.equal(await voice.say('a.b'), false);
  assert.equal(sp.speech.spoken.length, 0);
});

test('sin síntesis ni audio, isSupported es falso y say no falla', async () => {
  const { voice } = make({ noSpeech: true, noAudio: true });
  assert.equal(voice.isSupported(), false);
  assert.equal(await voice.say('a.b'), false);
});

// --- Grabada ---

test('modo grabada: reproduce assets/audio/pix/<clave>.mp3 y no usa el navegador', async () => {
  const { voice, sp, au } = make({ extra: { mode: 'grabada' } });
  assert.equal(await voice.say('a.b'), true);
  assert.equal(au.created[0].src, 'assets/audio/pix/a.b.mp3');
  assert.equal(sp.speech.spoken.length, 0);
});

test('modo grabada: si falta el archivo cae al navegador, y no lo vuelve a pedir', async () => {
  const { voice, sp, au } = make({ extra: { mode: 'grabada' }, audio: { fail: true } });
  assert.equal(await voice.say('a.b'), true);
  assert.equal(sp.speech.spoken.length, 1);
  assert.equal(await voice.say('a.b'), true);
  assert.equal(au.created.length, 1, 'el archivo que falta no se pide otra vez');
  assert.equal(sp.speech.spoken.length, 2);
});

test('modo grabada sin archivo ni voz: solo texto', async () => {
  const { voice } = make({ extra: { mode: 'grabada' }, audio: { fail: true }, noSpeech: true });
  assert.equal(await voice.say('a.b'), false);
});

test('el texto libre (lo de la IA) va siempre por el navegador, aun en modo grabada, y nunca pide un archivo', async () => {
  const { voice, sp, au } = make({ extra: { mode: 'grabada' } });
  assert.equal(await voice.say('Te recomiendo esta porque es rápida.'), true);
  assert.equal(au.created.length, 0);
  assert.equal(sp.speech.spoken[0].text, 'Te recomiendo esta porque es rápida.');
  // `text` fuerza texto libre aunque haya clave.
  await voice.say('a.b', { text: 'Otro texto' });
  assert.equal(au.created.length, 0);
});

// --- Desbloqueo, silencio, stop ---

test('no suena antes del primer toque; después sí', async () => {
  const listeners = {};
  const target = { addEventListener: (n, f) => { listeners[n] = f; }, removeEventListener: () => {} };
  const sp = fakeSpeech();
  const voice = createPixVoice({ lines: LINES, storage: fakeStorage(), gestureTarget: target, speech: sp.speech, Utterance: sp.Utterance });
  assert.equal(await voice.say('a.b'), false);
  assert.equal(sp.speech.spoken.length, 0);
  assert.equal(voice.isUnlocked(), false);
  listeners.pointerdown();
  assert.equal(voice.isUnlocked(), true);
  assert.equal(await voice.say('a.b'), true);
});

test('silenciar se recuerda, corta lo que suena y no deja decir nada', async () => {
  const storage = fakeStorage();
  const { voice, sp } = make({ extra: { storage } });
  voice.setMuted(true);
  assert.equal(storage.data[MUTE_KEY], '1');
  assert.equal(await voice.say('a.b'), false);
  assert.equal(sp.speech.spoken.length, 0);
  assert.equal(make({ stored: { [MUTE_KEY]: '1' } }).voice.isMuted(), true);
  voice.setMuted(false);
  assert.equal(await voice.say('a.b'), true);
});

test('sin localStorage (lanza) todo sigue funcionando', () => {
  const broken = { getItem() { throw new Error('bloqueado'); }, setItem() { throw new Error('bloqueado'); } };
  const { voice } = make({ extra: { storage: broken } });
  voice.setMuted(true);
  voice.setMuted(false);
  voice.setMode('grabada');
  assert.equal(voice.getMode(), 'grabada');
});

test('una frase nueva corta la anterior; stop() cancela y avisa que dejó de hablar', async () => {
  const events = [];
  const sp = fakeSpeech();
  sp.speech.speak = function speak(u) { this.spoken.push(u); }; // no termina sola
  const voice = createPixVoice({ lines: LINES, storage: fakeStorage(), gestureTarget: null, speech: sp.speech, Utterance: sp.Utterance, onSpeaking: (s) => events.push(s) });
  voice.unlock();
  const first = voice.say('a.b');
  const second = voice.say('Otra cosa');
  assert.equal(await first, false, 'la primera se cortó');
  voice.stop();
  assert.equal(await second, false);
  assert.ok(sp.speech.cancelled >= 1);
  assert.equal(events.at(-1), false);
});

test('onSpeaking avisa al empezar y al terminar', async () => {
  const events = [];
  const { voice } = make({ extra: { onSpeaking: (s) => events.push(s) } });
  await voice.say('a.b');
  assert.deepEqual(events.filter((e, i, a) => i === 0 || e !== a[i - 1]), [true, false]);
});

// --- Subtítulo ---

test('el subtítulo es la primera frase y se corta en una palabra si es larga', () => {
  assert.equal(subtitleOf('Hola. Esto es largo.'), 'Hola.');
  assert.equal(subtitleOf('Una frase corta sin punto'), 'Una frase corta sin punto');
  const long = subtitleOf('Esta es una frase muy larga que no cabe en el globo de PIX y que debe cortarse limpiamente en una palabra completa.');
  assert.ok(long.length <= 85 && long.endsWith('…') && !/\s…$/.test(long), long);
  assert.equal(subtitleOf(''), '');
});

// --- Frases fijas de la zona 1 ---

const TEXT_KEYS = ['intro', 'firstApproach', 'recommended', 'played', 'chosen', 'changeWarn'];

test('hay frase para la zona, cada objeto, cada ficha y cada minijuego, y coinciden con los textos de PIX', () => {
  const zoneId = INCOME_ZONE.zoneId;
  for (const key of TEXT_KEYS) {
    assert.ok(PIX_LINES[`${zoneId}.${key}`], `falta ${zoneId}.${key}`);
    assert.ok(zoneText(`${zoneId}.${key}`), `${zoneId}.${key} no es un texto que la aplicación pueda pedir`);
  }
  for (const object of WORLD_1_LAYOUT.zoneObjects[zoneId]) assert.ok(PIX_LINES[pixKey.focus(zoneId, object.id)], `falta el objeto ${object.id}`);
  for (const option of INCOME_ZONE.options) {
    assert.ok(PIX_LINES[pixKey.sheet(zoneId, option.id)], `falta la ficha de ${option.id}`);
    for (const n of [0, 1]) {
      const line = PIX_LINES[pixKey.entry(option.play.lessonId, n)];
      assert.ok(line, `falta la entrada ${n} de ${option.id}`);
      assert.ok(line.includes(option.examples[n]), `la entrada ${n} de ${option.id} no trae su ejemplo`);
    }
    assert.ok(PIX_LINES[pixKey.end(option.play.lessonId)], `falta el resumen de ${option.id}`);
  }
});

test('el resumen de cada minijuego repite lo que aprendes, tal como se ve en pantalla', () => {
  for (const game of ['ugc', 'affiliate', 'digital', 'subscriptions', 'sponsorship']) {
    const g = MINIGAME_TEXTS[game];
    const line = PIX_LINES[pixKey.end(g.lessonId)].toLowerCase();
    const learn = g.learn.slice(0, -1).toLowerCase(); // sin el punto final
    assert.ok(line.includes(learn.charAt(0) + learn.slice(1)), g.lessonId);
  }
});

test('las frases son cortas, sin cifras ni promesas, y no hay claves sin usar', () => {
  const used = new Set();
  const zoneId = INCOME_ZONE.zoneId;
  for (const key of TEXT_KEYS) used.add(`${zoneId}.${key}`);
  for (const o of WORLD_1_LAYOUT.zoneObjects[zoneId]) used.add(pixKey.focus(zoneId, o.id));
  for (const o of INCOME_ZONE.options) {
    used.add(pixKey.sheet(zoneId, o.id)); used.add(pixKey.end(o.play.lessonId));
    used.add(pixKey.entry(o.play.lessonId, 0)); used.add(pixKey.entry(o.play.lessonId, 1));
  }
  assert.deepEqual(Object.keys(PIX_LINES).filter((k) => !used.has(k)), [], 'claves sin usar');
  for (const [key, text] of Object.entries(PIX_LINES)) {
    assert.ok(text.length > 10 && text.length <= 330, `${key}: ${text.length} caracteres`);
    assert.doesNotMatch(text, /\d/, `${key}: lleva cifras`);
    assert.doesNotMatch(text, /garantiz|seguro que ganas|ganar[áa]s|ingresos? asegurad/i, `${key}: promete resultados`);
    assert.match(key, /^[A-Za-z0-9.-]+$/, `${key}: clave no apta como nombre de archivo`);
  }
});

// --- Entrada del minijuego (D60) ---

test('adaptMinigame pasa al minijuego el ejemplo de turno, lo que se aprende, sus claves de voz y la voz', async () => {
  const { adaptMinigame } = await import('../../src/presentation/world3d/minigame-registry.js');
  let received = null;
  const option = INCOME_ZONE.options[1];
  const voice = { say() {}, stop() {} };
  adaptMinigame((options) => { received = options; })({ option, lessonId: option.play.lessonId, example: 1, voice, container: null, finish() {}, exit() {} });
  assert.deepEqual(received.intro, {
    exampleText: option.examples[1], learns: option.play.learns, entryKey: 'affiliate-shelf.entry.1', endKey: 'affiliate-shelf.end',
  });
  assert.equal(received.voice, voice);
  assert.equal(received.example, 1);
});
