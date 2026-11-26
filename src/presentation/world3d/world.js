// Mundo 3D jugable: plaza, zonas y puentes, personaje, cámara y bucle (T017, Fase 3).
// Recibe la distribución desde content/ y no conoce las reglas del influencer: las zonas de
// decisión se añaden en la Fase 4 (zone-runtime.js) y hablan con la aplicación por eventos.

import { THREE } from './three.js';
import { createScene } from './scene.js';
import { createAssetLoader, placeModel } from './assets.js';
import { createControls } from './controls.js';
import { createHero } from './hero.js';
import { createHall } from './decor.js';
import { createBody, advance, respawn, moveFromStick } from './physics3d.js';
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
 * @param {(reason: 'fall') => void} [options.onFail]
 */
export function createWorld3d({ canvas, overlay, layout, modelsPath, onProgress, onFail = () => {} }) {
  const view = createScene(canvas);
  const { scene } = view;
  const M = MATERIALS();
  const loader = createAssetLoader({ basePath: modelsPath, onProgress });
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
    if (animate) { platform.mesh.scale.y = 0.01; growing.push({ platform, t: 0 }); }
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

  async function loadModels() {
    await hero.loadModels();
    await loader.load('plataforma');
    for (const platform of platforms) if (platform.dress) dressPlatform(platform);
    await hall.loadModels();
    const nucleo = await loader.load('nucleo');
    if (nucleo) core.add(placeModel(nucleo, 5.5, { ground: false }));
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
    const move = moveFromStick(input.stick, yaw);
    const { fell } = advance(body, { ...move, jumpHeld: input.jumpHeld, jumpPressed: input.jumpPressed }, boxes, dt);
    if (fell) { respawn(body); view.snapCamera(); hero.snapPix(); onFail('fall'); }
    for (const item of growing) {
      item.t = Math.min(1, item.t + dt * 1.5);
      item.platform.mesh.scale.y = Math.max(0.01, item.t);
    }
    core.rotation.y = time * 0.08;
    hall.update(time);
    hero.update(body, dt, time, boxes);
    view.followPlayer(body, yaw, dt);
    view.render();
    requestAnimationFrame(frame);
  }

  function onVisibility() { if (document.hidden) stop(); else start(); }

  function start() {
    if (running) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(frame);
  }
  function stop() { running = false; controls.reset(); }
  document.addEventListener('visibilitychange', onVisibility);

  return {
    start, stop, loadModels, openBridge, lightZone, body, controls, view,
    destroy() { stop(); document.removeEventListener('visibilitychange', onVisibility); controls.destroy(); },
  };
}
