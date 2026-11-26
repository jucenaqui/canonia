// Voz de PIX (D60, D61). Dos modos:
//   'grabada'    (por defecto) audio pregrabado de Norah. Se reproduce con Web Audio: los bytes del mp3
//                vienen de assets/audio/pix/packed/<clave>.js (base64 en un <script>, que la página
//                publicada sí deja cargar; scripts/pack-audio.js) y se decodifican en un AudioContext
//                que se crea y reanuda en el primer toque. Si algo falla, cae a la voz del navegador.
//                Sin Web Audio (pruebas, navegadores viejos) usa un elemento Audio con el .mp3.
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
const PRELOAD_RE = /\.(intro|firstApproach)$|\.focus\./;

function decodeBase64(text) {
  const binary = atob(text);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

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
 * @param {typeof AudioContext} [options.AudioContextCtor] Web Audio (inyectable).
 * @param {(key: string) => Promise<ArrayBuffer | null>} [options.loadRecorded] Bytes del mp3 de una clave (inyectable).
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
  AudioContextCtor = globalThis.AudioContext ?? globalThis.webkitAudioContext,
  loadRecorded = null,
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

  // --- Diagnóstico (?diag=voz): qué pasó con la última frase ---
  let trail = [];
  const diag = (step) => { trail.push(step); if (trail.length > 8) trail.shift(); notify(); };
  const errName = (e) => String(e?.name || e?.message || e || 'desconocido').slice(0, 40);

  // --- Web Audio ---
  let ctx = null;
  let ctxFailed = false;
  const buffers = new Map(); // clave -> AudioBuffer decodificado
  const decoding = new Map(); // clave -> promesa en curso
  function ensureContext() {
    if (ctx || ctxFailed || typeof AudioContextCtor !== 'function') return ctx;
    try { ctx = new AudioContextCtor(); } catch (e) { ctxFailed = true; diag(`error ctx: ${errName(e)}`); }
    return ctx;
  }
  /** Reanuda el contexto. Se llama de forma síncrona dentro de un gesto; el resultado se ignora. */
  function resumeContext() {
    const c = ensureContext();
    if (!c || c.state === 'running') return;
    try { const p = c.resume?.(); p?.catch?.((e) => diag(`error resume: ${errName(e)}`)); } catch (e) { diag(`error resume: ${errName(e)}`); }
  }

  function injectScript(src) {
    return new Promise((resolve) => {
      if (typeof document === 'undefined') { resolve(false); return; }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }
  /** Bytes del mp3: del .js empaquetado (base64) y, si no está, del .mp3 servido. */
  async function defaultLoad(key) {
    const read = () => { const t = globalThis.CANONIA_AUDIO?.[key]; return t ? decodeBase64(t) : null; };
    let bytes = read();
    if (!bytes && await injectScript(`${basePath}packed/${key}.js`)) bytes = read();
    if (bytes) { diag('js ok'); try { delete globalThis.CANONIA_AUDIO[key]; } catch { /* ya no está */ } return bytes; }
    try {
      const response = await globalThis.fetch?.(`${basePath}${encodeURIComponent(key)}.mp3`);
      if (response?.ok) { diag('mp3 ok'); return await response.arrayBuffer(); }
    } catch { /* sin red ni archivo */ }
    return null;
  }
  const load = loadRecorded ?? defaultLoad;

  /** AudioBuffer de la clave (cacheado) o null. */
  function getBuffer(key) {
    if (buffers.has(key)) return Promise.resolve(buffers.get(key));
    if (decoding.has(key)) return decoding.get(key);
    const c = ensureContext();
    if (!c) return Promise.resolve(null);
    const p = (async () => {
      try {
        const bytes = await load(key);
        if (!bytes) { diag('sin archivo'); return null; }
        const buffer = await new Promise((resolve, reject) => {
          const r = c.decodeAudioData(bytes, resolve, reject);
          r?.then?.(resolve, reject);
        });
        buffers.set(key, buffer);
        diag('decode ok');
        return buffer;
      } catch (e) { diag(`error decode: ${errName(e)}`); return null; } finally { decoding.delete(key); }
    })();
    decoding.set(key, p);
    return p;
  }

  /** Decodifica en segundo plano las frases probables, de una en una. */
  let preloading = false;
  async function preload(keys = Object.keys(lines).filter((k) => PRELOAD_RE.test(k))) {
    if (preloading || !ensureContext()) return;
    preloading = true;
    try { for (const key of keys) { if (!buffers.has(key)) await getBuffer(key); } } finally { preloading = false; }
  }

  function unlock() {
    if (unlocked) { resumeContext(); return; }
    unlocked = true;
    for (const name of GESTURES) gestureTarget?.removeEventListener?.(name, unlock, true);
    resumeContext();
    diag(`unlock ctx=${ctx ? ctx.state : (typeof AudioContextCtor === 'function' ? 'falló' : 'no hay')}`);
    if (ctx) setTimeout(() => { preload().catch(() => {}); }, 300);
  }
  for (const name of GESTURES) gestureTarget?.addEventListener?.(name, unlock, true);

  const canSpeak = () => Boolean(speech && typeof Utterance === 'function');
  const canPlay = () => typeof AudioContextCtor === 'function' || typeof AudioCtor === 'function';

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

  /** Reproduce con Web Audio. Resuelve true / false, o 'missing' si no se pudo (cae al siguiente respaldo). */
  async function playWebAudio(key, myToken) {
    resumeContext();
    const buffer = await getBuffer(key);
    if (myToken !== token) return false;
    if (!buffer) return 'missing';
    if (ctx.state === 'suspended') {
      try { await ctx.resume(); } catch (e) { diag(`error resume: ${errName(e)}`); }
      if (myToken !== token) return false;
    }
    return new Promise((resolve) => {
      let done = false;
      let source;
      const finish = (value) => { if (done) return; done = true; if (stopCurrent === cancel) stopCurrent = null; resolve(value); };
      const cancel = () => { try { source?.stop(); } catch { /* ya terminó */ } finish(false); };
      try {
        source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => finish(myToken === token);
        stopCurrent = cancel;
        source.start(0);
        diag(`webaudio ok (${ctx.state})`);
      } catch (e) { diag(`error play: ${errName(e)}`); finish('missing'); }
    });
  }

  /** Reproduce el audio pregrabado. Resuelve true / false, o 'missing' si no hay archivo. */
  async function playRecorded(key, myToken) {
    if (ensureContext() && !missing.has(key)) {
      const result = await playWebAudio(key, myToken);
      if (result !== 'missing') return result;
      if (myToken !== token) return false;
      missing.add(key);
      diag('fallback navegador');
      return 'missing';
    }
    return playElement(key, myToken);
  }

  function playElement(key, myToken) {
    return new Promise((resolve) => {
      if (typeof AudioCtor !== 'function' || missing.has(key)) { resolve('missing'); return; }
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
      if (unlocked) resumeContext(); // síncrono, antes de cualquier await: si viene de un toque, cuenta como gesto
      trail = [];
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
    /** Para probar sin esperar un toque. También reanuda el AudioContext (llamar dentro del gesto). */
    unlock,
    /** Decodifica frases por adelantado (por defecto, intro y objetos de zona). */
    preload,
    /** Qué pasó con la última frase, en una línea (para ?diag=voz). */
    getDiag: () => `voz: ${trail.join(' / ') || 'sin actividad'}`,

    destroy() { api.stop(); listeners.clear(); for (const name of GESTURES) gestureTarget?.removeEventListener?.(name, unlock, true); },
  };
  return api;
}

/** Modo pedido en la dirección (?voz=navegador|grabada), o null. */
export function modeFromLocation(location = globalThis.location) {
  try { return normalizeMode(new URLSearchParams(location?.search ?? '').get('voz')); } catch { return null; }
}
