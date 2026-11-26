// Objetos con acción de las zonas del mundo 3D (T023, spec 006/US2, FR-014, FR-018; D47).
// Coloca los objetos de cada zona (máquinas, terminal "Otra", punto de recomendación), muestra el botón
// de acción con el nombre de lo que hace, deja que PIX explique al acercarse, pone la columna de luz
// en la zona en curso y ejecuta las órdenes del mundo (puentes, sectores, estrella, elección).
// No conoce la aplicación ni el dominio: avisa con callbacks y recibe órdenes con applyCommand().
// Nunca aprueba nada (006/FR-015): solo pide abrir la ficha.

import { THREE } from './three.js';
import { placeModel } from './assets.js';
import { zoneAt, nearestObject, actionLabel, focusLine, solidBox, ringRadius } from './zone-math.js';

const GOLD = 0xd9b25a;
const CYAN = 0x19c6e6;
const BEAM = 0x6fe8ff;
const GREY = 0x9aa3c2;
const VIOLET = 0x7b5cff;

/** Giro que lleva el frente de cada modelo hacia +z. Se ajusta al ver cada modelo (como en decor.js). */
const FRONT = { maquina: -Math.PI / 2, terminal: 0 }; // maquina: su pantalla mira a +x en el modelo (revisado en pantalla); terminal: es redonda

const glow = (color, intensity = 1.2) => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity, metalness: 0.3, roughness: 0.35 });

/** Cartel con un texto, dibujado en un lienzo (texto plano, sin HTML). */
function labelSprite(text, { width = 2.6 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 128;
  const g = canvas.getContext('2d');
  g.fillStyle = 'rgba(30,27,58,0.82)';
  g.beginPath(); g.roundRect?.(4, 4, 504, 120, 22); if (!g.roundRect) g.rect(4, 4, 504, 120); g.fill();
  g.strokeStyle = 'rgba(25,198,230,0.9)'; g.lineWidth = 4; g.stroke();
  g.fillStyle = '#ffffff'; g.textAlign = 'center'; g.textBaseline = 'middle';
  // Dos líneas como mucho: se parte el texto por palabras.
  g.font = '700 34px "Space Grotesk", "Segoe UI", sans-serif';
  const words = String(text).split(' '); const lines = [''];
  for (const word of words) {
    const test = `${lines.at(-1)} ${word}`.trim();
    if (g.measureText(test).width > 460 && lines.at(-1)) lines.push(word); else lines[lines.length - 1] = test;
  }
  const shown = lines.slice(0, 2);
  if (lines.length > 2) shown[1] = `${shown[1]}…`;
  shown.forEach((line, i) => g.fillText(line, 256, 64 + (i - (shown.length - 1) / 2) * 40));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.scale.set(width, width / 4, 1);
  return sprite;
}

/** Estrella de cinco puntas, para marcar la opción recomendada. */
function starMesh() {
  const shape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 0.32 : 0.14; const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
    if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r); else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  shape.closePath();
  const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: false }), glow(GOLD, 1.6));
  mesh.visible = false;
  return mesh;
}

/**
 * @param {object} deps
 * @param {THREE.Scene} deps.scene
 * @param {ReturnType<import('./assets.js').createAssetLoader>} deps.loader
 * @param {typeof import('../../content/world-1/layout.js').WORLD_1_LAYOUT} deps.layout
 * @param {object[]} deps.boxes Cajas de choque del mundo: se añaden las de los objetos sólidos.
 * @param {{ setAction: (text: string | null) => void }} deps.controls
 * @param {{ openBridge: (zoneId: string) => void, lightZone: (zoneId: string) => void }} deps.world
 * @param {Record<string, object>} deps.content Contenido de cada zona por id (p. ej. INCOME_ZONE).
 * @param {object} deps.texts Textos comunes (content/es.js).
 * @param {(object: THREE.Object3D) => void} [deps.addFadeable] Lo que se aclara si tapa a la cámara.
 * @param {object} [deps.callbacks]
 * @param {(zoneId: string) => void} [deps.callbacks.onZoneEntered] El personaje entró en una zona.
 * @param {(info: { zoneId: string, id: string, kind: string, text: string }) => void} [deps.callbacks.onFocus] PIX explica el objeto que tiene a su alcance.
 * @param {(info: { zoneId: string, id: string, kind: string }) => void} [deps.callbacks.onAction] Se pulsó el botón de acción.
 */
export function createZoneRuntime({ scene, loader, layout, boxes, controls, world, content, texts, addFadeable = () => {}, callbacks = {} }) {
  const root = new THREE.Group();
  scene.add(root);
  const mats = { off: glow(GREY, 0.25), on: glow(CYAN, 1.4), chosen: glow(GOLD, 1.6) };

  /** @type {{ zoneId: string, spec: object, top: number, holder: THREE.Group, ring: THREE.Mesh, star: THREE.Mesh, state: string, placeholder: THREE.Object3D | null }[]} */
  const objects = [];
  const zoneRects = new Map(layout.zones.map((z) => [z.id, z]));

  for (const [zoneId, specs] of Object.entries(layout.zoneObjects ?? {})) {
    const zone = zoneRects.get(zoneId);
    if (!zone || !content[zoneId]) continue;
    const entry = { x: zone.x, z: zone.z + zone.d / 2 };
    for (const spec of specs) {
      const holder = new THREE.Group();
      holder.position.set(spec.x, zone.top, spec.z);
      // De cara a la entrada de la zona, donde llega el personaje.
      holder.rotation.y = Math.atan2(entry.x - spec.x, entry.z - spec.z);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(ringRadius(spec), 0.05, 8, 48), mats.off);
      ring.rotation.x = Math.PI / 2; ring.position.y = 0.03;
      holder.add(ring);
      let placeholder = null;
      if (spec.kind === 'recommend') {
        // Sin modelo: un pedestal con una luz, que PIX marca con la estrella.
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.55, 0.9, 24), new THREE.MeshStandardMaterial({ color: 0xf8fbff, metalness: 0.3, roughness: 0.35 }));
        base.position.y = 0.45; base.castShadow = true;
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 14), glow(VIOLET, 1.4));
        orb.position.y = 1.15;
        // Reserva: se retira cuando el modelo carga (si no carga, se queda el pedestal).
        placeholder = new THREE.Group();
        placeholder.add(base, orb);
        holder.add(placeholder);
      } else {
        placeholder = new THREE.Mesh(new THREE.BoxGeometry(1.1, spec.height, 0.8), new THREE.MeshStandardMaterial({ color: 0xd3daee }));
        placeholder.position.y = spec.height / 2;
        holder.add(placeholder);
      }
      const name = spec.kind === 'option' ? content[zoneId].options.find((o) => o.id === spec.id)?.name
        : spec.kind === 'other' ? content[zoneId].other.name : content[zoneId].recommend.name;
      const label = labelSprite(name ?? '', { width: spec.kind === 'option' ? 2.8 : 2.4 });
      label.position.y = spec.height + 0.7;
      holder.add(label);
      const star = starMesh();
      star.position.y = spec.height + 1.5;
      holder.add(star);
      root.add(holder);
      const box = solidBox(spec, zone.top);
      if (box) boxes.push(box);
      objects.push({ zoneId, spec, top: zone.top, holder, ring, star, state: 'idle', placeholder });
    }
  }

  // Guía de la zona en curso (D61): un haz de luz delgado con un brillo suave en el suelo. Se ve solo
  // desde lejos y se apaga con un fundido al entrar. Sin choques ni sombras.
  function gradientTexture(draw) {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 128;
    draw(canvas.getContext('2d'), canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }
  const beamMaterial = (map, opacity) => new THREE.MeshBasicMaterial({
    map, color: BEAM, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, fog: false, toneMapped: false,
  });
  // Más fuerte abajo, se disuelve hacia arriba.
  const rayMap = gradientTexture((ctx, w, hgt) => {
    const g = ctx.createLinearGradient(0, 0, 0, hgt);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.6, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, hgt);
  });
  const glowMap = gradientTexture((ctx, w, hgt) => {
    const g = ctx.createRadialGradient(w / 2, hgt / 2, 0, w / 2, hgt / 2, w / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, hgt);
  });
  const BEAM_HEIGHT = 14;
  const beam = new THREE.Group();
  const beamCore = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, BEAM_HEIGHT, 16, 1, true), beamMaterial(rayMap, 0.95));
  const beamHalo = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, BEAM_HEIGHT, 20, 1, true), beamMaterial(rayMap, 0.28));
  beamCore.position.y = beamHalo.position.y = BEAM_HEIGHT / 2;
  const beamBase = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), beamMaterial(glowMap, 0.9));
  beamBase.rotation.x = -Math.PI / 2;
  beamBase.position.y = 0.06;
  beam.add(beamCore, beamHalo, beamBase);
  for (const part of beam.children) part.renderOrder = 5;
  beam.visible = false;
  root.add(beam);
  let beamFade = 0;
  let activeZone = null;

  /** Carga los modelos de los objetos y cambia las formas provisionales por ellos. Nunca lanza. */
  async function loadModels() {
    for (const name of new Set(objects.map((o) => o.spec.model).filter(Boolean))) {
      const gltf = await loader.load(name);
      if (!gltf) continue;
      for (const object of objects.filter((o) => o.spec.model === name)) {
        const model = placeModel(gltf, object.spec.height);
        model.rotation.y = FRONT[name] ?? 0;
        if (object.placeholder) { object.holder.remove(object.placeholder); object.placeholder = null; }
        object.holder.add(model);
        addFadeable(model);
      }
    }
  }

  // --- Estado visible de cada objeto ---

  const byId = (zoneId, id) => objects.find((o) => o.zoneId === zoneId && o.spec.id === id);
  function paint(object) {
    object.ring.material = object.state === 'chosen' ? mats.chosen : object.state === 'lit' ? mats.on : mats.off;
  }

  /** Enciende la opción probada. */
  function setPlayed(zoneId, optionId) {
    const object = byId(zoneId, optionId);
    if (object && object.state !== 'chosen') { object.state = 'lit'; paint(object); }
  }

  /** Marca la opción recomendada con la estrella (o quita la estrella con null). */
  function markRecommended(zoneId, optionId) {
    for (const object of objects.filter((o) => o.zoneId === zoneId)) object.star.visible = object.spec.id === optionId;
  }

  /** Marca la opción aprobada: se enciende y las demás de la zona se apagan. */
  function setChosen(zoneId, optionId) {
    for (const object of objects.filter((o) => o.zoneId === zoneId && o.spec.kind === 'option')) {
      object.state = object.spec.id === optionId ? 'chosen' : 'idle';
      paint(object);
    }
  }

  /** Columna de luz sobre la zona indicada; null la apaga. */
  function setActiveZone(zoneId) {
    activeZone = zoneId;
    const zone = zoneRects.get(zoneId);
    if (zone) beam.position.set(zone.x, zone.top, zone.z);
    else beamFade = 0;
    beam.visible = Boolean(zone) && beamFade > 0.01;
  }

  /** Órdenes de la aplicación al mundo (WORLD3D_COMMANDS). `say` y `showBoss` los atiende quien lo integra. */
  function applyCommand(name, data = {}) {
    switch (name) {
      case 'openBridge': world.openBridge(data.zoneId); return true;
      case 'lightZone': world.lightZone(data.zoneId); if (activeZone === data.zoneId) setActiveZone(null); return true;
      case 'markRecommended': markRecommended(data.zoneId, data.optionId); return true;
      case 'setChosen': setChosen(data.zoneId, data.optionId); return true;
      default: return false;
    }
  }

  // --- Cuadro a cuadro ---

  let paused = false;
  let inZone = null;
  let focused = null;

  function setFocus(object) {
    if (object === focused) return;
    focused = object;
    controls.setAction(object ? actionLabel(object.spec, content[object.zoneId], texts) : null);
    if (object) callbacks.onFocus?.({ zoneId: object.zoneId, id: object.spec.id, kind: object.spec.kind, text: focusLine(object.spec, content[object.zoneId]) });
  }

  /**
   * @param {number} time segundos desde el inicio
   * @param {{ x: number, y: number, z: number }} body posición del personaje
   * @param {boolean} actionPressed el jugador pulsó acción en este cuadro
   */
  let lastTime = 0;
  function update(time, body, actionPressed) {
    const zone = zoneAt(layout.zones, body.x, body.z);
    if ((zone?.id ?? null) !== inZone) {
      inZone = zone?.id ?? null;
      if (inZone) callbacks.onZoneEntered?.(inZone);
    }
    if (paused || !zone || body.y < zone.top - 0.6) setFocus(null);
    else setFocus(nearestObject(objects.filter((o) => o.zoneId === zone.id).map((o) => ({ ...o.spec, object: o })), body.x, body.z)?.object ?? null);
    if (actionPressed && focused && !paused) callbacks.onAction?.({ zoneId: focused.zoneId, id: focused.spec.id, kind: focused.spec.kind });

    for (const object of objects) {
      const near = object === focused;
      object.ring.scale.setScalar(near ? 1 + Math.sin(time * 5) * 0.05 : 1);
      if (object.star.visible) { object.star.rotation.y = time * 1.6; object.star.position.y = object.spec.height + 1.5 + Math.sin(time * 2) * 0.08; }
    }
    // Guía: se ve solo si hay una zona en curso y el jugador está fuera de ella; se apaga con un fundido al entrar.
    const dt = Math.min(0.1, Math.max(0, time - lastTime));
    lastTime = time;
    const wanted = activeZone && zoneRects.has(activeZone) && inZone !== activeZone ? 1 : 0;
    beamFade += (wanted - beamFade) * Math.min(1, dt * 3.5);
    if (Math.abs(wanted - beamFade) < 0.01) beamFade = wanted;
    beam.visible = beamFade > 0;
    if (beam.visible) {
      const pulse = 0.88 + Math.sin(time * 2) * 0.12;
      beamCore.material.opacity = 0.95 * beamFade * pulse;
      beamHalo.material.opacity = 0.28 * beamFade * pulse;
      beamBase.material.opacity = 0.9 * beamFade;
      beamBase.scale.setScalar(1 + Math.sin(time * 2) * 0.06);
    }
  }

  return {
    group: root,
    loadModels, update, applyCommand,
    setPlayed, markRecommended, setChosen, setActiveZone,
    /** Con una pantalla abierta no hay botón de acción ni acciones. */
    setPaused(value) { paused = value; if (value) setFocus(null); },
    objects: objects.map((o) => o.spec),
    destroy() { scene.remove(root); controls.setAction(null); },
  };
}
