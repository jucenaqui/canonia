// Mundo 3D jugable: plaza, zonas y puentes, personaje, cámara y bucle (T017, Fase 3).
// Recibe la distribución desde content/ y no conoce las reglas del influencer: las zonas de
// decisión (zone-runtime.js) y el marcador (hud.js) se montan aquí si llega `zones`, y avisan con
// callbacks; quien integra los traduce a eventos de la aplicación.

import { THREE } from './three.js';
import { createScene } from './scene.js';
import { createAssetLoader, placeModel } from './assets.js';
import { createControls } from './controls.js';
import { clampPitch, PITCH } from './camera-math.js';
import { createHero } from './hero.js';
import { createHall } from './decor.js';
import { createBody, advance, respawn, moveFromStick } from './physics3d.js';
import { createZoneRuntime } from './zone-runtime.js';
import { createHud } from './hud.js';
import { createSparks } from './sparks.js';
import { createEnemies } from './enemies.js';
import { boxOf } from '../../content/world-1/layout.js';

const MATERIALS = () => ({
  top: new THREE.MeshStandardMaterial({ color: 0xf8fbff, metalness: 0.2, roughness: 0.35 }),
  side: new THREE.MeshStandardMaterial({ color: 0xd3daee, metalness: 0.4, roughness: 0.4 }),
  edgeOn: new THREE.MeshStandardMaterial({ color: 0x19c6e6, emissive: 0x19c6e6, emissiveIntensity: 1.2 }),
  edgeOff: new THREE.MeshStandardMaterial({ color: 0x9aa3c2, emissive: 0x3b3f63, emissiveIntensity: 0.2 }),
  ringOff: new THREE.MeshStandardMaterial({ color: 0x9aa3c2, emissive: 0x3b3f63, emissiveIntensity: 0.2 }),
});

/**
 * @param {object} options
 * @param {HTMLCanvasElement} options.canvas
 * @param {HTMLElement} options.overlay Capa HTML sobre el lienzo (controles).
 * @param {typeof import('../../content/world-1/layout.js').WORLD_1_LAYOUT} options.layout
 * @param {string} [options.modelsPath]
 * @param {(loaded: number, total: number) => void} [options.onProgress]
 * @param {(name: string) => void} [options.onModelSettled] Cada modelo que termina de cargar (bien o mal).
 * @param {(reason: 'fall' | 'enemy') => void} [options.onFail] El personaje cayó al vacío o lo empujó un dron.
 * @param {string[]} [options.collectedSparks] Ids de chispas ya recogidas (no se dibujan).
 * @param {(id: string) => void} [options.onSpark] El personaje recogió una chispa.
 * @param {() => void} [options.onEnemyDefeated] El personaje venció a un dron.
 * @param {(dt: number) => void} [options.onFrame] Cada cuadro de juego (no corre en pausa): lo usa la ayuda para contar su tiempo.
 * @param {object} [options.zones] Zonas con acción y marcador (Fase 4). Sin esto, el mundo solo se recorre.
 * @param {Record<string, object>} options.zones.content Contenido de pantalla de cada zona por id (p. ej. INCOME_ZONE).
 * @param {object} options.zones.texts Textos comunes (content/es.js).
 * @param {object} [options.zones.callbacks] Callbacks de zone-runtime.js (onZoneEntered, onFocus, onAction).
 * @param {{ id: string, name?: string }[]} [options.zones.hudZones] Zonas del marcador, en orden.
 * @param {() => void} [options.zones.onSheet] Botón Ficha del marcador.
 * @param {() => void} [options.zones.onPause] Botón de pausa del marcador (T041).
 * @param {object} [options.zones.voice] Controles de voz de PIX del marcador (ver hud.js).
 */
export function createWorld3d({ canvas, overlay, layout, modelsPath, onProgress, onModelSettled, onFail = () => {}, collectedSparks = [], onSpark = () => {}, onEnemyDefeated = () => {}, onFrame = () => {}, zones = null }) {
  const view = createScene(canvas);
  const { scene } = view;
  const M = MATERIALS();
  const loader = createAssetLoader({ basePath: modelsPath, onProgress, onSettled: onModelSettled });
  const boxes = [];
  const platforms = [];
  const growing = [];

  function addPlatform(rect, { edge = M.edgeOn, thickness = 0.8, dress = true, visible = true } = {}) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(rect.w, thickness, rect.d), [M.side, M.side, M.top, M.side, M.side, M.side]);
    mesh.position.set(rect.x, rect.top - thickness / 2, rect.z);
    mesh.receiveShadow = true; mesh.castShadow = true;
    const strip = new THREE.Mesh(new THREE.BoxGeometry(rect.w + 0.04, 0.06, rect.d + 0.04), edge);
    strip.position.set(rect.x, rect.top - 0.1, rect.z);
    mesh.visible = visible; strip.visible = visible;
    scene.add(mesh, strip);
    if (visible) view.occluders.push(mesh);
    const box = boxOf(rect, thickness);
    boxes.push(box);
    const platform = { rect, mesh, strip, box, dress, dressed: null };
    platforms.push(platform);
    if (dress) dressPlatform(platform);
    return platform;
  }

  function dressPlatform(platform) {
    const model = loader.get('plataforma');
    if (!model || platform.dressed) return;
    const copy = model.scene.clone(true);
    copy.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    const bounds = new THREE.Box3().setFromObject(copy);
    const size = bounds.getSize(new THREE.Vector3());
    copy.position.sub(bounds.getCenter(new THREE.Vector3()));
    const holder = new THREE.Group();
    holder.add(copy);
    const b = platform.box;
    holder.scale.set((b.maxX - b.minX) / size.x, (b.maxY - b.minY) / size.y, (b.maxZ - b.minZ) / size.z);
    holder.position.set((b.minX + b.maxX) / 2, (b.minY + b.maxY) / 2, (b.minZ + b.maxZ) / 2);
    scene.add(holder);
    platform.mesh.visible = false;
    platform.dressed = holder;
  }

  // Sala de PIX Central (D56): el suelo redondo lo dibuja decor.js; aquí solo sus cajas de choque.
  for (const rect of layout.plazaBoxes) addPlatform(rect, { visible: false, dress: false });
  const hall = createHall({ scene, loader, layout, occluders: view.occluders, boxes, addFadeable: view.addFadeable });
  const zonePlatforms = new Map(layout.zones.map((zone) => [zone.id, addPlatform(zone, { edge: M.edgeOff })]));

  // Puentes: los abiertos desde el inicio, y los demás cuando la aplicación lo pida.
  const openBridges = new Set();
  function openBridge(to, { animate = true } = {}) {
    const bridge = layout.bridges.find((b) => b.to === to);
    if (!bridge || openBridges.has(to)) return false;
    openBridges.add(to);
    const platform = addPlatform(bridge, { thickness: 0.5, dress: false });
    if (animate) { platform.mesh.scale.y = 0.01; growing.push({ platform, t: 0, onDone: () => hall.addBridgeRails(bridge) }); }
    else hall.addBridgeRails(bridge);
    return true;
  }
  for (const bridge of layout.bridges) if (bridge.opensAfter === null) openBridge(bridge.to, { animate: false });

  /** Enciende el borde de una zona (spec 006/FR-018). */
  function lightZone(zoneId) {
    const platform = zonePlatforms.get(zoneId);
    if (platform) platform.strip.material = M.edgeOn;
  }

  // Núcleo de PIX Central
  const core = new THREE.Group();
  core.position.set(layout.core.x, layout.core.y, layout.core.z);
  const coreRings = [];
  for (let i = 0; i < layout.zones.length; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.2 + i * 0.9, 0.1, 8, 64), M.ringOff.clone());
    ring.rotation.x = Math.PI / 2 + i * 0.32; ring.rotation.y = i * 0.7;
    core.add(ring); coreRings.push(ring);
  }
  scene.add(core);

  // Personaje
  const body = createBody(layout.spawn);
  const hero = createHero({ scene, loader });
  const controls = createControls({ container: overlay, dragSurface: canvas });
  let yaw = 0;
  let pitch = 0;
  let cameraIdle = 0;

  // Chispas (T038) y dron de spam (T036).
  const sparks = createSparks({ scene, sparks: layout.sparks ?? [], collected: collectedSparks, openBridges: () => openBridges, onCollect: onSpark });
  const enemies = createEnemies({ scene, loader, enemies: layout.enemies ?? [], onHit: onFail, onDefeat: onEnemyDefeated });
  let screenOpen = false;

  // Zonas con acción (T023) y marcador (T032).
  const zoneRuntime = zones ? createZoneRuntime({
    scene, loader, layout, boxes, controls,
    world: { openBridge: (zoneId) => openBridge(zoneId), lightZone },
    content: zones.content, texts: zones.texts, addFadeable: view.addFadeable, callbacks: zones.callbacks ?? {},
  }) : null;
  const hud = zones ? createHud({
    container: overlay, texts: zones.texts,
    zones: zones.hudZones ?? layout.zones.map((z) => ({ id: z.id })), onSheet: zones.onSheet, onPause: zones.onPause, voice: zones.voice ?? null,
  }) : null;

  /** Con una pantalla abierta, el personaje no se mueve y no hay botón de acción. */
  function setScreenOpen(open) {
    screenOpen = open;
    controls.setEnabled(!open);
    zoneRuntime?.setPaused(open);
  }

  async function loadModels() {
    await hero.loadModels();
    enemies.loadModels();
    await loader.load('plataforma');
    for (const platform of platforms) if (platform.dress) dressPlatform(platform);
    // Las máquinas de la zona cargan a la vez que la sala: antes tardaban hasta el final y se veían columnas.
    await Promise.all([hall.loadModels(), zoneRuntime?.loadModels()]);
    const nucleo = await loader.load('nucleo');
    if (nucleo) core.add(placeModel(nucleo, 5.5, { ground: false }));
    // Lo último: portales y gente de fondo.
    await hall.loadExtras();
  }

  let running = false;
  let last = 0;
  let time = 0;
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.1, (now - last) / 1000 || 0);
    last = now; time += dt;
    const input = controls.snapshot(dt);
    yaw += input.yawDelta;
    pitch = clampPitch(pitch + input.pitchDelta);
    // Si el jugador camina sin tocar la cámara unos segundos, la inclinación vuelve despacio a la normal.
    if (input.yawDelta !== 0 || input.pitchDelta !== 0) cameraIdle = 0;
    else if (Math.hypot(input.stick.x, input.stick.y) > 0.2) cameraIdle += dt;
    if (cameraIdle > PITCH.idleSeconds && pitch !== 0) {
      const step = PITCH.returnPerSecond * dt;
      pitch = Math.abs(pitch) <= step ? 0 : pitch - Math.sign(pitch) * step;
    }
    const move = moveFromStick(input.stick, yaw);
    const { fell } = advance(body, { ...move, jumpHeld: input.jumpHeld, jumpPressed: input.jumpPressed }, boxes, dt);
    if (fell) { respawn(body); view.snapCamera(); hero.snapPix(); onFail('fall'); }
    for (const item of growing) {
      item.t = Math.min(1, item.t + dt * 1.5);
      item.platform.mesh.scale.y = Math.max(0.01, item.t);
      if (item.t >= 1 && item.onDone) { item.onDone(); item.onDone = null; }
    }
    core.rotation.y = time * 0.08;
    enemies.update(time, dt, body, screenOpen);
    sparks.update(time, dt, body);
    enemies.endFrame(body);
    onFrame(dt);
    // Tras un empujón el personaje parpadea mientras es invulnerable.
    hero.group.visible = !enemies.invulnerable || Math.floor(time * 10) % 2 === 0;
    hall.update(time);
    zoneRuntime?.update(time, body, input.actionPressed);
    view.followPlayer(body, yaw, dt, pitch);
    // Después de la cámara: PIX, al hablar, se coloca respecto a donde ya quedó.
    hero.update(body, dt, time, boxes, view.camera);
    view.render();
    requestAnimationFrame(frame);
  }

  // Pausa (T041): el mundo queda congelado en su último cuadro hasta `resume()`. Mientras esté pausado,
  // volver a ver la página no lo reanuda (lo decide el menú de pausa).
  let paused = false;
  function pause() { paused = true; stop(); }
  function resume() { paused = false; start(); }
  function onVisibility() { if (document.hidden) stop(); else if (!paused) start(); }

  /** Pone al personaje en un sitio firme (reaparecer al recargar, o "llevarme al siguiente sitio seguro"). */
  function placeAt({ x, y, z }) {
    Object.assign(body, { x, y, z, vx: 0, vy: 0, vz: 0, onGround: true, coyote: 0, jumpBuffer: 0, accumulator: 0, forcedLift: false, safe: { x, y, z } });
    view.snapCamera(); hero.snapPix();
  }

  /** Ayuda "hacerlo más fácil" (T040): más margen al saltar y el dron más lento. `null` = todo normal. */
  function setTuning(tuning) {
    body.tune = tuning && (tuning.coyote !== null || tuning.jump !== null) ? { coyote: tuning.coyote, jump: tuning.jump } : null;
    enemies.setSpeedScale(tuning?.enemyScale ?? 1);
  }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(frame);
  }
  function stop() { running = false; controls.reset(); }
  document.addEventListener('visibilitychange', onVisibility);

  return {
    start, stop, pause, resume, placeAt, setTuning, get paused() { return paused; }, loadModels, openBridge, lightZone, body, controls, view,
    scene, loader, boxes, addFadeable: view.addFadeable, zoneRuntime, hud, hero, setScreenOpen, sparks, enemies,
    destroy() { stop(); document.removeEventListener('visibilitychange', onVisibility); zoneRuntime?.destroy(); sparks.destroy(); enemies.destroy(); hud?.destroy(); controls.destroy(); },
  };
}
