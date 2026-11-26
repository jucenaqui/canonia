// Voz de PIX (D60, D61). Dos modos:
//   'grabada'    (por defecto) audio pregrabado de Norah, assets/audio/pix/<clave>.mp3; si falta el
//                archivo, cae al navegador.
//   'navegador'  síntesis de voz del navegador (speechSynthesis), voz es-*. Solo respaldo y pruebas
//                (?voz=navegador); el texto libre de la IA siempre va por aquí.
// Si no hay ninguna voz disponible, no suena nada y quien llama muestra solo el texto.
//
// Reglas:
//   - Lo que pasa por say(clave) con una clave del manifiesto es una frase fija: respeta el modo.
//   - Lo que no es clave (texto libre, p. ej. lo que escribe la IA) se dice SIEMPRE con la voz del
//     navegador: no hay audio grabado de ello, y nunca se pide un archivo con ese texto.
//   - El audio solo empieza tras el primer toque o tecla del usuario (los navegadores lo exigen).
//   - Silenciar se recuerda en localStorage (con try/catch: puede no estar disponible).
//   - El modo ya no se elige en la interfaz ni se guarda: solo ?voz= o la opción `mode` lo cambian.
//   - canSound() dice, antes de hablar, si va a sonar; quien llama muestra el texto si no (D61).
//
// Sin DOM propio ni three.js. Todo lo del entorno se puede inyectar para probarlo en Node.

export const VOICE_MODES = Object.freeze(['navegador', 'grabada']);
export const DEFAULT_VOICE_MODE = 'grabada';
export const MUTE_KEY = 'canonia.pixVoz.silencio';
const PREFERRED = ['es-419', 'es-us', 'es-es'];

/** Valor válido de modo o null. */
export function normalizeMode(value) {
  const v = String(value ?? '').trim().toLowerCase();
  return VOICE_MODES.includes(v) ? v : null;
}

/** Elige la mejor voz en español: es-419, es-US, es-ES, otra es-*. Null si no hay ninguna. */
export function pickVoice(voices) {
  const list = Array.from(voices ?? []).filter((v) => /^es([-_]|$)/i.test(String(v.lang ?? '')));
  if (list.length === 0) return null;
  const rank = (v) => {
    const lang = String(v.lang).toLowerCase().replace('_', '-');
    const i = PREFERRED.indexOf(lang);
    return i === -1 ? PREFERRED.length : i;
  };
  return [...list].sort((a, b) => rank(a) - rank(b))[0];
}

function safeGet(storage, key) {
  try { return storage?.getItem(key) ?? null; } catch { return null; }
}
function safeSet(storage, key, value) {
  try { storage?.setItem(key, value); } catch { /* sin almacenamiento: no se recuerda */ }
}

/**
 * @param {object} [options]
 * @param {Record<string, string>} [options.lines] Manifiesto { clave: texto } (content/world-1/pix-lines.js).
 * @param {string} [options.basePath] Carpeta de los audios pregrabados.
 * @param {string} [options.mode] 'navegador' | 'grabada'.
 * @param {Storage | null} [options.storage] localStorage (inyectable).
 * @param {SpeechSynthesis | null} [options.speech] speechSynthesis (inyectable).
 * @param {typeof SpeechSynthesisUtterance} [options.Utterance]
 * @param {typeof Audio} [options.AudioCtor]
 * @param {{ addEventListener: Function, removeEventListener: Function } | null} [options.gestureTarget] Dónde esperar el primer toque.
 * @param {(speaking: boolean) => void} [options.onSpeaking] Avisa cuando PIX empieza o deja de hablar.
 * @param {() => void} [options.onChange] Avisa cuando cambia el modo o el silencio.
 */
export function createPixVoice({
  lines = {},
  basePath = 'assets/audio/pix/',
  mode,
  storage = globalThis.localStorage ?? null,
  speech = globalThis.speechSynthesis ?? null,
  Utterance = globalThis.SpeechSynthesisUtterance,
  AudioCtor = globalThis.Audio,
  gestureTarget = globalThis.document ?? null,
  onSpeaking = () => {},
  onChange = () => {},
} = {}) {
  let currentMode = normalizeMode(mode) ?? DEFAULT_VOICE_MODE;
  let muted = safeGet(storage, MUTE_KEY) === '1';
  let unlocked = false;
  let token = 0;
  let stopCurrent = null; // cancela lo que suena ahora y resuelve su promesa
  let speaking = false;
  const listeners = new Set();
  const notify = () => { for (const fn of [...listeners]) { try { fn(); } catch { /* un oyente roto no frena a PIX */ } } };
  function setSpeaking(value) {
    if (speaking === value) return;
    speaking = value;
    onSpeaking(value);
    notify();
  }
  const missing = new Set(); // claves cuyo audio no existe: no se pide otra vez
  const GESTURES = ['pointerdown', 'touchend', 'keydown', 'click'];

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    for (const name of GESTURES) gestureTarget?.removeEventListener?.(name, unlock, true);
  }
  for (const name of GESTURES) gestureTarget?.addEventListener?.(name, unlock, true);

  const canSpeak = () => Boolean(speech && typeof Utterance === 'function');
  const canPlay = () => typeof AudioCtor === 'function';

  /** Habla con la voz del navegador. Resuelve true si terminó, false si no pudo o lo cortaron. */
  function speakBrowser(text, myToken) {
    return new Promise((resolve) => {
      if (!canSpeak()) { resolve(false); return; }
      const voice = pickVoice(speech.getVoices?.());
      if (!voice && (speech.getVoices?.().length ?? 0) > 0) { resolve(false); return; } // hay voces, pero ninguna en español
      let done = false;
      const finish = (ok) => { if (done) return; done = true; if (stopCurrent === cancel) stopCurrent = null; resolve(ok); };
      const utterance = new Utterance(text);
      utterance.lang = voice?.lang ?? 'es-419';
      if (voice) utterance.voice = voice;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onend = () => finish(myToken === token);
      utterance.onerror = () => finish(false);
      const cancel = () => { try { speech.cancel(); } catch { /* nada que cancelar */ } finish(false); };
      stopCurrent = cancel;
      try { speech.speak(utterance); } catch { finish(false); }
    });
  }

  /** Reproduce el audio pregrabado. Resuelve true / false, o 'missing' si no hay archivo. */
  function playRecorded(key, myToken) {
    return new Promise((resolve) => {
      if (!canPlay() || missing.has(key)) { resolve('missing'); return; }
      let audio;
      try { audio = new AudioCtor(`${basePath}${encodeURIComponent(key)}.mp3`); } catch { resolve('missing'); return; }
      let done = false;
      const finish = (value) => { if (done) return; done = true; if (stopCurrent === cancel) stopCurrent = null; resolve(value); };
      const cancel = () => { try { audio.pause(); } catch { /* ya terminó */ } finish(false); };
      audio.addEventListener?.('ended', () => finish(myToken === token));
      audio.addEventListener?.('error', () => { missing.add(key); finish('missing'); });
      stopCurrent = cancel;
      try {
        const started = audio.play();
        if (started && typeof started.catch === 'function') started.catch(() => { missing.add(key); finish('missing'); });
      } catch { missing.add(key); finish('missing'); }
    });
  }

  const api = {
    /**
     * PIX dice algo. `keyOrText` es una clave del manifiesto o un texto libre (que siempre va por el
     * navegador). Devuelve una promesa: true si se dijo completo; false si no sonó (silenciado, sin
     * voz, sin toque previo) o lo cortó otra frase o stop().
     * @param {string} keyOrText
     * @param {{ text?: string, onFail?: () => void }} [options] `text` fuerza el texto a decir (y que sea
     *   libre). `onFail` se llama si de verdad no pudo sonar (sin voz, sin archivo ni navegador), no si
     *   lo cortaron otra frase, stop() o silenciar.
     */
    async say(keyOrText, { text, onFail } = {}) {
      api.stop();
      const myToken = ++token;
      const key = typeof keyOrText === 'string' && Object.hasOwn(lines, keyOrText) ? keyOrText : null;
      const spoken = typeof text === 'string' && text ? text : (key ? lines[key] : String(keyOrText ?? ''));
      if (!spoken.trim() || muted || !unlocked) return false;
      setSpeaking(true);
      let ok = false;
      try {
        if (key && !text && currentMode === 'grabada') {
          const result = await playRecorded(key, myToken);
          if (myToken !== token) return false;
          ok = result === 'missing' ? await speakBrowser(spoken, myToken) : result;
        } else {
          ok = await speakBrowser(spoken, myToken);
        }
      } finally {
        if (myToken === token) setSpeaking(false);
      }
      if (!ok && myToken === token) { try { onFail?.(); } catch { /* quien llama falló: PIX sigue */ } }
      return ok;
    },

    /** Corta lo que suena. */
    stop() {
      token += 1;
      const cancel = stopCurrent;
      stopCurrent = null;
      cancel?.();
      setSpeaking(false);
    },

    setMuted(value) {
      muted = Boolean(value);
      safeSet(storage, MUTE_KEY, muted ? '1' : '0');
      if (muted) api.stop();
      onChange();
      notify();
    },
    isMuted: () => muted,

    setMode(value) {
      const next = normalizeMode(value);
      if (!next || next === currentMode) return currentMode;
      currentMode = next;
      api.stop();
      onChange();
      return currentMode;
    },
    getMode: () => currentMode,

    /** Hay alguna forma de que PIX suene: voz del navegador o audios (en modo grabada). */
    isSupported() {
      return canSpeak() || (currentMode === 'grabada' && canPlay());
    },

    /** Va a sonar si se le pide algo ahora: no está silenciada, hubo un primer toque y hay cómo sonar. */
    canSound() { return !muted && unlocked && api.isSupported(); },
    isSpeaking: () => speaking,
    /** Avisa cuando PIX empieza o deja de hablar y cuando se silencia o se activa. Devuelve cómo dejar de avisar. */
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },

    /** El primer toque ya ocurrió y el audio puede empezar. */
    isUnlocked: () => unlocked,
    /** Para probar sin esperar un toque. */
    unlock,

    destroy() { api.stop(); listeners.clear(); for (const name of GESTURES) gestureTarget?.removeEventListener?.(name, unlock, true); },
  };
  return api;
}

/** Modo pedido en la dirección (?voz=navegador|grabada), o null. */
export function modeFromLocation(location = globalThis.location) {
  try { return normalizeMode(new URLSearchParams(location?.search ?? '').get('voz')); } catch { return null; }
}
