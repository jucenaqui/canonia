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
import { openSheetScreen } from '../screens/sheet.js';
import { createSpokenSet, createFocusMemory, shouldSayPlayed, shouldPresentZone } from './zone-math.js';
import { openIntroScreen } from '../screens/intro.js';
import { createMinigameRegistry } from './minigame-registry.js';
import { createPixVoice, modeFromLocation } from './pix-voice.js';
import { PIX_LINES, pixKey } from '../../content/world-1/pix-lines.js';

const NEEDS_REVIEW = 'needsReview';

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
 * @param {() => void} [deps.onFail]
 * @param {Record<string, string>} [deps.pixLines] Frases fijas de PIX por clave (content/world-1/pix-lines.js).
 * @param {(() => void) | null} [deps.onRestart] Si existe, la ficha ofrece "Empezar de nuevo" (solo la vista previa).
 * @param {(name: string) => void} [deps.onModelSettled] Cada modelo que termina de cargar (bien o mal).
 * @param {Promise<unknown> | null} [deps.loadingGate] Mientras no se cumpla, hay pantalla de carga: el jugador no se mueve y PIX no habla.
 * @param {ReturnType<typeof createPixVoice>} [deps.voice] Voz de PIX (por defecto, la grabada; ?voz=navegador para probar el respaldo).
 */
export function startZoneView({
  dom, layout, zoneScreens, zoneContent, texts, session, zoneFlow, events, sayText,
  pieceNames = {}, minigames = createMinigameRegistry(), modelsPath, onProgress, onModelSettled, onFail = () => {},
  pixLines = PIX_LINES, voice: voiceDep = null, onRestart = null, loadingGate = null,
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

  const world = createWorld3d({
    canvas: dom.canvas, overlay: dom.overlay, layout, modelsPath, onProgress, onModelSettled,
    onFail: (reason) => { events.emit(WORLD3D_EVENTS.PLAYER_FAILED, { reason }); onFail(reason); },
    zones: {
      content: zoneScreens,
      texts,
      hudZones: layout.zones.map((z) => ({ id: z.id, name: pieceNames[z.id] })),
      onSheet: showInventory,
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
    const showCard = () => { if (presenting === run && !ui.cardShown) ui.showCard(pixLines[key]); };
    updateTalking();
    if (!voice.canSound()) { showCard(); return; }
    voice.say(key, { onFail: showCard }).then((heard) => {
      if (presenting !== run) return; // la saltaron
      if (heard) finish(); else showCard(); // lo cortó otra cosa: que se pueda leer
    });
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
  /** Panel "Tu ficha del influencer": las piezas del mundo en orden. Nada va al globo de PIX. */
  function showInventory() {
    if (sheetPanel || screen || presenting) return;
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
      container: dom.screens, texts, rows, onRestart,
      onClose: () => { sheetPanel = null; world.setScreenOpen(false); },
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
    world.hud.say('');
    // Al llegar al final se anota (el minijuego sigue mostrando su resumen); al cerrarse, vuelve el mundo.
    let finished = false;
    minigames.start(lessonId, {
      container: dom.screens, zoneId, optionId, option, trust: session.world3d.trust, voice,
    }, {
      onFinish: ({ trustDelta }) => { finished = true; events.emit(WORLD3D_EVENTS.MINIGAME_FINISHED, { zoneId, optionId, lessonId, trustDelta }); },
      onExit: () => {
        voice.stop(); world.setScreenOpen(false);
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
          chosenForApproval({ ownText });
          const { fields, missing } = result.sheet;
          const what = fields.what ?? Object.values(fields)[0];
          // Ficha escrita por la IA: voz del navegador o solo texto.
          pixSay([what, missing.length ? `${t.otherMissing} ${missing.join(', ')}.` : ''].filter(Boolean).join(' '), { keep: true });
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

  // Lo ya aprobado en una partida cargada se ve en el mundo.
  zoneFlow.restoreWorld();
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
    destroy() { for (const off of offs.splice(0)) off(); presenting?.ui?.close(); presenting = null; dom.overlay.classList.remove('is-presenting'); closeScreen(); voice.destroy(); world.destroy(); },
  };
}
