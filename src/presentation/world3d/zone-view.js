// Vista del mundo 3D con zonas de decisión (006, Fase 4): une el mundo, el marcador, la pantalla de
// la zona y los minijuegos con la aplicación. Traduce los callbacks de la presentación a eventos del
// mundo 3D y las órdenes de la aplicación (WORLD3D_COMMANDS) al mundo.
//
// Regla de oro (006/FR-015, FR-043): de aquí solo sale una aprobación, desde el botón "Aprobar" de la
// tarjeta (onApprove de screens/zone.js), que llama a approveZoneChoice o changeZoneChoice. El resto
// solo informa: zoneEntered, optionInspected, minigameFinished, chosenForApproval.

import { WORLD3D_EVENTS, WORLD3D_COMMANDS, chosenForApprovalData } from '../../application/events.js';
import { createWorld3d } from './world.js';
import { openZoneScreen } from '../screens/zone.js';
import { createOtherGuideBridge } from './guide-bridge.js';
import { openSheetScreen } from '../screens/sheet.js';
import { openWorldPauseScreen } from '../screens/pause.js';
import { openAssistScreen } from '../screens/assist.js';
import { createAssist, recordFailure, noteProgress, startEasier, tickEasier, setAssistEnabled, assistTuning } from './assist-math.js';
import { areaOf, buildRoute, nextSafeSpot, spawnPoint } from './route-math.js';
import { createSpokenSet, createFocusMemory, shouldSayPlayed, shouldPresentZone, introMode } from './zone-math.js';
import { openIntroScreen } from '../screens/intro.js';
import { createMinigameRegistry, choiceStateOf } from './minigame-registry.js';
import { createPixVoice, modeFromLocation } from './pix-voice.js';
import { PIX_LINES, pixKey } from '../../content/world-1/pix-lines.js';
import { TIPS } from '../../content/world-1/tips.js';
import { tipText } from './spark-math.js';

const NEEDS_REVIEW = 'needsReview';
const ASSIST_PREF_KEY = 'canonia.assistOffers';

/** Recuerda el interruptor de la ayuda en este navegador. Si no se puede guardar, queda activo y no se rompe nada. */
function browserAssistPref() {
  return {
    load() { try { return globalThis.localStorage?.getItem(ASSIST_PREF_KEY) !== 'off'; } catch { return true; } },
    save(enabled) { try { globalThis.localStorage?.setItem(ASSIST_PREF_KEY, enabled ? 'on' : 'off'); } catch { /* sin almacenamiento */ } },
  };
}

/**
 * @param {object} deps
 * @param {{ canvas: HTMLCanvasElement, overlay: HTMLElement, screens: HTMLElement }} deps.dom
 * @param {object} deps.layout Distribución del mundo (content/world-1/layout.js).
 * @param {Record<string, object>} deps.zoneScreens Contenido de pantalla de cada zona (forma de zone-income.js).
 * @param {Record<string, object>} deps.zoneContent Las mismas zonas en la forma de la aplicación (ZoneContent).
 * @param {object} deps.texts Textos comunes (content/es.js).
 * @param {object} deps.session Sesión de juego (solo se lee: piezas, confianza, minijuegos hechos).
 * @param {ReturnType<import('../../application/zone-flow.js').createZoneFlow>} deps.zoneFlow Creado con autoBind.
 * @param {ReturnType<import('../../application/events.js').createEventBus>} deps.events
 * @param {(textId: string) => string | null} deps.sayText Texto de PIX para `say { textId }`.
 * @param {Record<string, string>} [deps.pieceNames] Nombre de cada pieza para el jugador.
 * @param {ReturnType<typeof createMinigameRegistry>} [deps.minigames]
 * @param {string} [deps.modelsPath]
 * @param {(loaded: number, total: number) => void} [deps.onProgress]
 * @param {(reason: 'fall' | 'enemy') => void} [deps.onFail] Aviso extra tras un fallo (la sesión ya se actualizó).
 * @param {readonly string[]} [deps.tips] Consejos de PIX por índice (content/world-1/tips.js).
 * @param {Record<string, string>} [deps.pixLines] Frases fijas de PIX por clave (content/world-1/pix-lines.js).
 * @param {(() => void) | null} [deps.onRestart] Si existe, la ficha ofrece "Empezar de nuevo" (solo la vista previa).
 * @param {(name: string) => void} [deps.onModelSettled] Cada modelo que termina de cargar (bien o mal).
 * @param {Promise<unknown> | null} [deps.loadingGate] Mientras no se cumpla, hay pantalla de carga: el jugador no se mueve y PIX no habla.
 * @param {boolean} [deps.showVoiceDiag] Muestra siempre la línea de diagnóstico de voz (solo la vista previa); también con ?diag=voz.
 * @param {string} [deps.worldId] Id del mundo: con él se guarda dónde reaparecer al recargar (T041).
 * @param {{ load: () => boolean, save: (enabled: boolean) => void }} [deps.assistPref] Dónde se recuerda el interruptor de la ayuda (por defecto, el navegador).
 * @param {ReturnType<typeof createPixVoice>} [deps.voice] Voz de PIX (por defecto, la grabada; ?voz=navegador para probar el respaldo).
 */
export function startZoneView({
  dom, layout, zoneScreens, zoneContent, texts, session, zoneFlow, events, sayText,
  pieceNames = {}, minigames = createMinigameRegistry(), modelsPath, onProgress, onModelSettled, onFail = () => {},
  pixLines = PIX_LINES, tips = TIPS, worldId = null, assistPref = browserAssistPref(), voice: voiceDep = null, onRestart = null, loadingGate = null, showVoiceDiag = false,
}) {
  const t = texts.zone;
  let screen = null;
  let currentZone = null;
  // Lo que PIX dice tras aprobar no lo tapa la frase del objeto cercano.
  const KEEP_MS = 5000;
  let keepUntil = 0;
  let sayChosenAfterClose = false;
  const spoken = createSpokenSet(); // frases de "ya la probaste" ya dichas en esta partida
  const focusMemory = createFocusMemory(); // último objeto explicado: no se repite al cerrar su pantalla (D62)
  // Presentaciones de zona ya hechas (D62): en memoria para esta visita y, además, lo guardado en la
  // sesión (`world3d.zonesPresented`), para que no vuelva a salir al recargar la página.
  const introduced = createSpokenSet();
  let presenting = null;

  // Voz de PIX (D60, D61). Mientras habla, el dron se pone de frente junto al avatar; el botón con su
  // cara del marcador la silencia o la activa.
  const refs = { hero: null };
  const voice = voiceDep ?? createPixVoice({
    lines: pixLines,
    mode: modeFromLocation(),
  });
  const speechMs = (text) => Math.min(20000, Math.max(KEEP_MS, 2500 + text.length * 65));

  /**
   * PIX dice algo: la clave de una frase fija (con su audio si el modo es "grabada") o un texto libre
   * (lo de la IA: siempre con la voz del navegador). El texto solo se ve si el audio no suena (D61):
   * silenciado, sin primer toque o sin voz; y también si la voz falla a mitad. Con subtítulo corto y "Leer".
   * `bubble: false` si hay una pantalla encima; `keep` evita que la frase de un objeto cercano la tape.
   * @param {string} idOrText
   * @param {{ bubble?: boolean, keep?: boolean, text?: string }} [options]
   */
  let held = Boolean(loadingGate);
  let heldSay = null;
  function pixSay(idOrText, options = {}) {
    // Con la pantalla de carga puesta PIX espera: se recuerda lo último que debía decir y suena al quitarla.
    if (held) { heldSay = [idOrText, options]; return Promise.resolve(false); }
    return speak(idOrText, options);
  }
  function speak(idOrText, { bubble = true, keep = false, text } = {}) {
    const known = Object.hasOwn(pixLines, idOrText);
    const shown = known ? pixLines[idOrText] : (text ?? String(idOrText ?? ''));
    if (!shown) return Promise.resolve(false);
    const ms = speechMs(shown);
    const willSound = voice.canSound();
    const showText = () => world.hud.say(shown, { ms });
    if (keep) keepUntil = Date.now() + ms;
    if (bubble) { if (willSound) world.hud.say(''); else showText(); }
    return voice.say(known ? idOrText : shown, { onFail: () => { if (bubble && willSound) showText(); } }).then((heard) => {
      if (keep && heard) keepUntil = Math.min(keepUntil, Date.now() + 700);
      return heard;
    });
  }

  const pieceOf = (zoneId) => session.inventory.get(zoneId);
  const isApproved = (zoneId) => { const p = pieceOf(zoneId); return p.status !== 'pending' && p.content !== null; };
  /**
   * Elección aprobada de una zona: id de la opción, el id de "Otra" (`other`) si el jugador escribió
   * la suya, o null si no hay nada aprobado. Con "Otra" la ficha de las máquinas ofrece "Cambiar a esta".
   */
  function chosenOptionOf(zoneId) {
    if (!isApproved(zoneId)) return null;
    const zone = zoneScreens[zoneId];
    return zone?.options.find((o) => o.name === pieceOf(zoneId).content)?.id ?? zone?.other?.id ?? 'other';
  }
  const playedOf = (zoneId) => session.world3d.minigamesDone
    .filter((key) => key.startsWith(`${zoneId}:`)).map((key) => key.slice(zoneId.length + 1));
  /** Piezas que dependen (directa o indirectamente) de esta y ya tienen contenido. */
  function dependentsOf(zoneId) {
    const all = session.inventory.list();
    const found = new Set();
    const visit = (id) => {
      for (const piece of all) {
        if (piece.dependsOn.includes(id) && !found.has(piece.id)) { found.add(piece.id); visit(piece.id); }
      }
    };
    visit(zoneId);
    return [...found].filter((id) => pieceOf(id).content !== null).map((id) => pieceNames[id] ?? id);
  }

  // --- Caídas, dron y chispas (T035, T036, T038) ---
  // La sesión descuenta las chispas (25 %, D48); aquí solo se muestra y PIX consuela. Nunca toca piezas.
  // No se emite `playerFailed`: la sesión se llama directamente, y un oyente lo contaría dos veces.
  let lastFailSay = 0;
  let lastDefeatSay = 0;
  async function handleFailure(reason) {
    const result = await session.registerFailure?.(reason);
    if (result?.ok) { world.hud.setSparks(result.sparks); world.hud.flashLoss(result.lost); }
    // Tres fallos seguidos desde el mismo sitio seguro: PIX ofrece ayuda en lugar del consuelo de siempre (T040).
    const safe = world.body.safe;
    const failure = recordFailure(assist, { area: areaOf(layout, safe.x, safe.z), x: safe.x, z: safe.z, reason });
    if (failure.offer && offerAssist(safe)) { onFail(reason); return; }
    const now = Date.now();
    if (now - lastFailSay > 8000) { lastFailSay = now; pixSay(reason === 'enemy' ? 'world.enemy' : 'world.fell'); }
    onFail(reason);
  }
  function handleDefeat() {
    const now = Date.now();
    if (now - lastDefeatSay > 8000) { lastDefeatSay = now; pixSay('world.defeated'); }
  }
  async function handleSpark(sparkId) {
    events.emit(WORLD3D_EVENTS.SPARK_COLLECTED, { sparkId });
    world.hud.pulseSparks();
    const result = await session.collectSpark?.(sparkId);
    if (!result?.ok) return;
    world.hud.setSparks(result.sparks);
    const text = tipText(tips, result.tipUnlocked);
    if (!text) return;
    const key = pixKey.tip(result.tipUnlocked);
    // Con grabación (tips.<índice>) suena la voz de PIX; un consejo futuro sin clave se dice con la voz del navegador.
    if (Object.hasOwn(pixLines, key)) pixSay(key, { keep: true });
    else pixSay(`${texts.tipUnlocked} ${text}`, { text: `${texts.tipUnlocked} ${text}`, keep: true });
  }
  /** Consejos ya desbloqueados (`tip-<índice>`), en orden, para la ficha. */
  const unlockedTips = () => session.world3d.tipsUnlocked.map((id) => tipText(tips, Number(String(id).slice(4)))).filter(Boolean);

  // --- Ayuda y pausa (T040, T041): estado del motor, sin eventos hacia la aplicación ---
  const assist = createAssist({ enabled: assistPref.load() });
  const route = buildRoute(layout);
  const isBridgeOpen = (to) => {
    const bridge = layout.bridges.find((b) => b.to === to);
    return Boolean(bridge) && (bridge.opensAfter === null || isApproved(bridge.opensAfter));
  };
  let assistScreen = null;
  let pauseUi = null;
  let pauseActive = false;
  let minigameOpen = false;

  const world = createWorld3d({
    canvas: dom.canvas, overlay: dom.overlay, layout, modelsPath, onProgress, onModelSettled,
    onFrame(dt) { if (tickEasier(assist, dt)) world.setTuning(null); },
    collectedSparks: session.world3d.sparksCollected ?? [],
    onFail: handleFailure,
    onSpark: handleSpark,
    onEnemyDefeated: handleDefeat,
    zones: {
      content: zoneScreens,
      texts,
      hudZones: layout.zones.map((z) => ({ id: z.id, name: pieceNames[z.id] })),
      onSheet: () => showInventory(),
      onPause: () => pauseGame(),
      voice,
      callbacks: {
        onZoneEntered(zoneId) {
          currentZone = zoneId;
          world.zoneRuntime.setActiveZone(isApproved(zoneId) ? null : zoneId);
          refreshHud();
          events.emit(WORLD3D_EVENTS.ZONE_ENTERED, { zoneId });
          greetZone(zoneId);
        },
        onFocus({ zoneId, id, text }) {
          if (Date.now() < keepUntil) return;
          const key = pixKey.focus(zoneId, id);
          if (!focusMemory.shouldSay(key)) return; // el mismo objeto del último foco no se repite (D62)
          if (Object.hasOwn(pixLines, key)) pixSay(key); else world.hud.say(text);
        },
        onAction({ zoneId, id, kind }) {
          if (kind === 'option') openScreen(zoneId, { type: 'sheet', optionId: id });
          else if (kind === 'other') openScreen(zoneId, { type: 'other' });
          else if (kind === 'recommend') openScreen(zoneId, { type: 'recommend' });
        },
      },
    },
  });

  refs.hero = world.hero;

  // --- Presentación de la zona (D62) ---
  const updateTalking = () => refs.hero?.setTalking(voice.isSpeaking() || Boolean(presenting));
  /** Primera entrada: presentación con PIX. Después: como mucho una frase corta por visita. */
  function greetZone(zoneId) {
    if (held) { pendingGreet = zoneId; return; }
    if (presenting || screen || sheetPanel) return;
    const introKey = `${zoneId}.intro`;
    if (shouldPresentZone({ seen: introduced.has(zoneId) || session.world3d.zonesPresented.includes(zoneId), approved: isApproved(zoneId), hasIntro: Object.hasOwn(pixLines, introKey) })) {
      introduced.add(zoneId);
      presentZone(zoneId, introKey);
    } else if (!isApproved(zoneId) && Object.hasOwn(pixLines, `${zoneId}.firstApproach`)) {
      pixSay(`${zoneId}.firstApproach`, { keep: true });
    }
  }
  let pendingGreet = null;

  function presentZone(zoneId, key) {
    const run = {};
    presenting = run;
    world.setScreenOpen(true);
    world.hud.say('');
    world.view.setCloseUp(true);
    dom.overlay.classList.add('is-presenting'); // sin palanca ni salto debajo del botón "Saltar"
    const ui = openIntroScreen({
      container: dom.screens, texts: texts.zoneIntro,
      onDone() { finish(); },
    });
    run.ui = ui;
    function finish() {
      if (presenting !== run) return;
      presenting = null;
      session.markZonePresented(zoneId); // terminó, la saltaron o siguió: ya no se repite, ni al recargar
      ui.close();
      voice.stop();
      world.view.setCloseUp(false);
      dom.overlay.classList.remove('is-presenting');
      world.setScreenOpen(false);
      updateTalking();
    }
    const showCard = () => { if (presenting === run && (!ui.cardShown || ui.choiceShown)) ui.showCard(pixLines[key]); };
    const speakIntro = () => voice.say(key, { onFail: showCard }).then((heard) => {
      if (presenting !== run) return; // la saltaron
      if (heard) finish(); else showCard(); // lo cortó otra cosa: que se pueda leer
    });
    updateTalking();
    const mode = introMode({ muted: voice.isMuted(), unlocked: voice.isUnlocked(), supported: voice.isSupported() });
    if (mode === 'card') { showCard(); return; }
    if (mode === 'voice') { speakIntro(); return; }
    // Falta el primer toque: "Escuchar a PIX" es ese toque, y la voz arranca en el mismo gesto (lo exige el celular).
    ui.setHandlers({
      onListen() { voice.unlock(); ui.showVoice(); speakIntro(); },
      onRead: showCard,
    });
    ui.showChoice();
  }

  // Pantalla de carga: el jugador no se mueve hasta que se quita.
  if (loadingGate) {
    world.setScreenOpen(true);
    loadingGate.then(() => {
      held = false;
      world.setScreenOpen(false);
      // Si apareció dentro de una zona, la presentación (o su saludo) va primero y la frase retenida se descarta.
      if (pendingGreet && currentZone === pendingGreet) { const zoneId = pendingGreet; pendingGreet = null; heldSay = null; greetZone(zoneId); }
      if (heldSay) { const [id, options] = heldSay; heldSay = null; speak(id, options); }
    });
  }

  // Órdenes de la aplicación al mundo.
  const offs = [];
  offs.push(voice.subscribe(updateTalking));
  // ?diag=voz: una línea pequeña con lo que pasó con la voz (para reportar fallos desde el celular).
  if ((showVoiceDiag || (typeof location !== 'undefined' && /(^|[?&])diag=voz(&|$)/.test(location.search ?? ''))) && voice.getDiag) {
    const line = document.createElement('div');
    line.setAttribute('aria-hidden', 'true');
    line.style.cssText = 'position:fixed;left:4px;right:4px;bottom:2px;opacity:.85;z-index:99999;font:10px/1.2 monospace;color:#fff;background:rgba(0,0,0,.6);padding:2px 4px;pointer-events:none;overflow-wrap:anywhere';
    const refresh = () => { line.textContent = voice.getDiag(); };
    refresh();
    document.body.append(line);
    offs.push(voice.subscribe(refresh), () => line.remove());
  }
  for (const name of [WORLD3D_COMMANDS.OPEN_BRIDGE, WORLD3D_COMMANDS.LIGHT_ZONE, WORLD3D_COMMANDS.MARK_RECOMMENDED, WORLD3D_COMMANDS.SET_CHOSEN]) {
    offs.push(events.on(name, (data) => { world.zoneRuntime.applyCommand(name, data); refreshHud(); }));
  }
  offs.push(events.on(WORLD3D_COMMANDS.SAY, ({ textId }) => {
    // La introducción de la zona la presenta esta vista solo la primera vez (D62); la aplicación la pide en cada entrada.
    if (typeof textId === 'string' && textId.endsWith('.intro')) return;
    const text = sayText(textId);
    if (text || Object.hasOwn(pixLines, textId)) pixSay(textId, { text, keep: true });
  }));
  // Después de que el flujo (autoBind) anote el minijuego: se enciende la máquina y se ve la confianza.
  offs.push(events.on(WORLD3D_EVENTS.MINIGAME_FINISHED, ({ zoneId, optionId }) => {
    world.zoneRuntime.setPlayed(zoneId, optionId);
    world.hud.setTrust(session.world3d.trust);
    screen?.setPlayed(playedOf(zoneId));
    // Lo que se aprende lo dice PIX en el resumen final del minijuego (minigames/view.js), no aquí.
  }));

  function refreshHud() {
    const states = {};
    for (const zone of layout.zones) states[zone.id] = isApproved(zone.id) ? 'done' : zone.id === currentZone ? 'current' : 'pending';
    world.hud.setProgress(states);
    world.hud.setSparks(session.world3d.sparks);
    world.hud.setReviewCount(session.inventory.list().filter((p) => p.status === NEEDS_REVIEW).length);
  }

  let sheetPanel = null;
  /**
   * Panel "Tu ficha del influencer": las piezas del mundo en orden. Nada va al globo de PIX.
   * @param {{ fromPause?: boolean }} [options] Si se abrió desde la pausa, al cerrarla vuelve el menú de pausa.
   */
  function showInventory({ fromPause = false } = {}) {
    if (sheetPanel || screen || presenting || assistScreen || (pauseActive && !fromPause)) return;
    const rows = layout.zones.map((zone) => {
      const piece = pieceOf(zone.id);
      return {
        name: pieceNames[zone.id] ?? zone.id,
        value: piece.content !== null ? piece.content : null,
        review: piece.status === NEEDS_REVIEW,
      };
    });
    world.setScreenOpen(true);
    world.hud.say('');
    voice.stop();
    sheetPanel = openSheetScreen({
      container: dom.screens, texts, rows, onRestart, tips: unlockedTips(),
      onClose: () => { sheetPanel = null; if (fromPause) renderPauseMenu(); else world.setScreenOpen(false); },
    });
  }

  function closeScreen() {
    screen?.close();
  }

  function startMinigame(zoneId, optionId) {
    const option = zoneScreens[zoneId]?.options.find((o) => o.id === optionId);
    const lessonId = option?.play?.lessonId;
    closeScreen();
    if (!lessonId || !minigames.has(lessonId)) { world.hud.say(t.minigameSoon); return; }
    world.setScreenOpen(true);
    minigameOpen = true;
    world.hud.say('');
    // Al llegar al final se anota (el minijuego sigue mostrando su resumen); al cerrarse, vuelve el mundo.
    let finished = false;
    minigames.start(lessonId, {
      container: dom.screens, zoneId, optionId, option, trust: session.world3d.trust, voice,
      choice: { state: choiceStateOf({ chosenId: chosenOptionOf(zoneId), optionId }) },
    }, {
      onFinish: ({ trustDelta }) => { finished = true; events.emit(WORLD3D_EVENTS.MINIGAME_FINISHED, { zoneId, optionId, lessonId, trustDelta }); },
      // "Elegir esta" desde el final: la tarjeta de aprobar se abre directo; el minijuego no aprueba nada (FR-043).
      onChoose: () => openScreen(zoneId, { type: 'approve', optionId }),
      onExit: ({ choosing = false } = {}) => {
        voice.stop(); minigameOpen = false; world.setScreenOpen(false);
        if (choosing) return; // la tarjeta de aprobar sigue; PIX no repite la explicación
        // El resumen del minijuego ya lo dijo si llegó al final; si no, PIX recuerda una vez que ya se probó.
        const playedKey = `${zoneId}.played`;
        if (shouldSayPlayed({ played: playedOf(zoneId).includes(optionId), chosen: chosenOptionOf(zoneId) === optionId, closeSpoke: finished, alreadySaid: spoken.has(`${playedKey}:${optionId}`) })
          && Object.hasOwn(pixLines, playedKey)) {
          spoken.add(`${playedKey}:${optionId}`);
          pixSay(playedKey, { keep: true });
        }
      },
    });
  }

  function openScreen(zoneId, view) {
    const zone = zoneScreens[zoneId];
    if (!zone || screen) return;
    const questionId = zoneContent[zoneId]?.recommendation?.question?.id ?? null;
    world.setScreenOpen(true);
    world.hud.say('');
    const chosenForApproval = (choice) => {
      const data = chosenForApprovalData(zoneId, choice);
      if (data) events.emit(WORLD3D_EVENTS.CHOSEN_FOR_APPROVAL, data);
    };
    screen = openZoneScreen({
      container: dom.screens,
      zone,
      texts,
      view,
      chosenId: chosenOptionOf(zoneId),
      playedIds: playedOf(zoneId),
      dependents: dependentsOf(zoneId),
      callbacks: {
        onInspect: (optionId) => {
          events.emit(WORLD3D_EVENTS.OPTION_INSPECTED, { zoneId, optionId });
          // La ficha esencial se dice al abrirla. La pantalla ya muestra el texto: sin globo.
          pixSay(pixKey.sheet(zoneId, optionId), { bubble: false });
        },
        onTry: (optionId) => startMinigame(zoneId, optionId),
        onChoose: (optionId) => chosenForApproval({ optionId }),
        onChange: (optionId) => chosenForApproval({ optionId }),
        async onOther(ownText) {
          const result = await zoneFlow.explainOtherOption(zoneId, ownText);
          if (!result.ok) return result;
          // Ficha escrita por la IA (o leída del modo guía): voz del navegador o solo texto.
          const accept = (sheet) => {
            chosenForApproval({ ownText });
            const { fields, missing } = sheet;
            const what = fields.what ?? Object.values(fields)[0];
            pixSay([what, missing.length ? `${t.otherMissing} ${missing.join(', ')}.` : ''].filter(Boolean).join(' '), { keep: true });
          };
          // Modo guía: el jugador copia la pregunta, pega la respuesta y solo entonces se arma la ficha.
          if (result.guide) {
            return { ok: true, guide: createOtherGuideBridge({ ai: session.ai, zoneFlow, zoneId, ownText, guide: result.guide, onSheet: accept }) };
          }
          accept(result.sheet);
          return { ok: true };
        },
        async onRecommend(answerId) {
          const result = await zoneFlow.recommendOption(zoneId, questionId ? { [questionId]: answerId } : {});
          if (!result.ok) return result;
          if (result.optionId) {
            screen?.setRecommended(result.optionId, result.reason);
            // El porqué lo escribe la IA: siempre con la voz del navegador, nunca con audio grabado.
            const name = zone.options.find((o) => o.id === result.optionId)?.name ?? '';
            if (result.reason) pixSay(`${t.recommended}: ${name}. ${t.recommendWhy} ${result.reason}`, { bubble: false });
            else pixSay(`${zoneId}.recommended`, { bubble: false });
          }
          return { ok: true };
        },
        async onApprove(choice) {
          const changing = isApproved(zoneId) && (choice.optionId
            ? chosenOptionOf(zoneId) !== choice.optionId
            : pieceOf(zoneId).content !== choice.ownText);
          const result = changing ? await zoneFlow.changeZoneChoice(zoneId, choice) : await zoneFlow.approveZoneChoice(zoneId, choice);
          if (!result.ok) return result;
          if (currentZone === zoneId) world.zoneRuntime.setActiveZone(null);
          refreshHud();
          sayChosenAfterClose = true; // se dice cuando la pantalla ya se cerró
          return { ok: true };
        },
        onClose() {
          screen = null;
          voice.stop();
          world.setScreenOpen(false);
          if (sayChosenAfterClose) {
            sayChosenAfterClose = false;
            const pix = zoneScreens[zoneId]?.pix;
            if (pix?.chosen) pixSay(`${zoneId}.chosen`, { text: pix.chosen, keep: true });
          }
        },
      },
    });
  }

  // --- Oferta de ayuda (T040) ---
  /** ¿Se puede poner una tarjeta encima del mundo ahora? Nunca se pisa otra pantalla ni la carga. */
  const worldFree = () => !held && !screen && !presenting && !sheetPanel && !assistScreen && !pauseActive && !minigameOpen;

  /** Muestra la oferta de ayuda. Devuelve false si no pudo (otra pantalla abierta): no se pierde nada. */
  function offerAssist(safe) {
    if (!worldFree()) return false;
    const spot = nextSafeSpot({ route, layout, from: safe, isOpen: isBridgeOpen });
    world.setScreenOpen(true);
    world.hud.say('');
    const close = () => { assistScreen = null; voice.stop(); world.setScreenOpen(false); };
    assistScreen = openAssistScreen({
      container: dom.screens, texts, lead: pixLines['world.assistOffer'], canSkip: Boolean(spot),
      onEasier() { close(); startEasier(assist); world.setTuning(assistTuning(true)); pixSay('world.assistEasier', { keep: true }); },
      onSkip() { close(); if (spot) world.placeAt(spot); pixSay('world.assistSkip', { keep: true }); },
      onKeep() { close(); },
    });
    pixSay('world.assistOffer', { bubble: false });
    return true;
  }

  /** Interruptor del menú de pausa: apagarlo corta la oferta y la ayuda en curso (FR-035). */
  function setAssistOffers(enabled) {
    setAssistEnabled(assist, enabled);
    if (!enabled) world.setTuning(null);
    assistPref.save(enabled);
  }

  // --- Pausa (T041) ---
  function renderPauseMenu() {
    pauseUi = openWorldPauseScreen({
      container: dom.screens, texts, onResume: resumeGame,
      onSheet: () => { pauseUi?.close(); pauseUi = null; showInventory({ fromPause: true }); },
      assist: { enabled: assist.enabled, onToggle: setAssistOffers },
      onRestart,
    });
  }

  /** Congela el mundo, para la voz y muestra el menú. Solo si el mundo está libre (sin otra pantalla encima). */
  function pauseGame() {
    if (!worldFree()) return false;
    pauseActive = true;
    world.pause();
    world.setScreenOpen(true);
    world.hud.say('');
    voice.stop();
    renderPauseMenu();
    return true;
  }

  function resumeGame() {
    if (!pauseActive) return;
    pauseUi?.close(); pauseUi = null;
    pauseActive = false;
    world.setScreenOpen(false);
    world.resume();
  }

  // Al dejar de verse la página (o la ventana) el juego se pausa solo (FR-038). Con otra pantalla encima ya
  // está quieto: solo se calla la voz.
  function onAutoPause() { if (!pauseGame()) voice.stop(); }
  const onVisibilityChange = () => { if (document.hidden) onAutoPause(); };
  const onKey = (event) => {
    if (event.key !== 'Escape' && event.key !== 'p' && event.key !== 'P') return;
    if (pauseActive && pauseUi) resumeGame(); else pauseGame();
  };
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('blur', onAutoPause);
  window.addEventListener('keydown', onKey);

  // Lo ya aprobado en una partida cargada se ve en el mundo.
  zoneFlow.restoreWorld();

  // Al recargar, el personaje vuelve a la sala o a la entrada de la zona en curso: nunca a medio puente (T041).
  const spawn = spawnPoint({ layout, resume: session.resume ?? null, isOpen: isBridgeOpen });
  if (spawn.area !== 'plaza') world.placeAt(spawn);
  let lastArea = areaOf(layout, world.body.x, world.body.z);
  /** Guarda dónde reaparecer: la sala o la entrada de la zona en que está; en un puente se conserva lo anterior. */
  function rememberPlace(area) {
    if (!worldId || !session.setResume) return;
    const next = area === 'plaza' ? { screen: 'map', gateId: null } : area?.startsWith('zone:') ? { screen: 'gate', gateId: area.slice(5) } : null;
    if (!next) return;
    try { session.setResume({ worldId, ...next }); session.saveNow?.(); } catch { /* sin guardado: se reaparece en la sala */ }
  }
  const watcher = setInterval(() => {
    if (world.paused) return;
    const { x, z } = world.body;
    const area = areaOf(layout, x, z);
    noteProgress(assist, { area, x, z });
    if (area !== lastArea) { lastArea = area; rememberPlace(area); }
  }, 500);
  for (const key of session.world3d.minigamesDone) {
    const [zoneId, optionId] = key.split(':');
    world.zoneRuntime.setPlayed(zoneId, optionId);
  }
  if (session.world3d.minigamesDone.length > 0) world.hud.setTrust(session.world3d.trust);
  refreshHud();

  return {
    world,
    minigames,
    start() { world.start(); return world.loadModels(); },
    voice,
    destroy() {
      clearInterval(watcher);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onAutoPause);
      window.removeEventListener('keydown', onKey);
      assistScreen?.close(); pauseUi?.close();
      for (const off of offs.splice(0)) off(); presenting?.ui?.close(); presenting = null; dom.overlay.classList.remove('is-presenting'); closeScreen(); voice.destroy(); world.destroy(); },
  };
}
