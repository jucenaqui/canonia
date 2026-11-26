// Ambientación de PIX Central (T048 y T051, D56): sala circular con cúpula de luz y reactor
// holográfico, cápsulas, jardineras, pantallas flotantes y, de fondo, la isla con montañas y cascadas.
// Referencia: docs-entrada/influence-foundry/mundo-y-escenas.webp. Solo decora: no decide nada.

import { THREE } from './three.js';
import { placeModel, dropStrayParts } from './assets.js';
import { createRails } from './rails.js';
import { plazaRailSegments, bridgeRailSegments, zoneRailSegments, railColliderBoxes, polar } from '../../content/world-1/layout.js';

/** Ruta del paisaje panorámico de fondo. */
export const BACKGROUND_PATH = 'assets/backgrounds/pix-central-isla.jpg';

/** Giro que lleva el frente de cada modelo de visitante hacia +z (cada uno se generó mirando a un lado distinto). */
const VISITOR_FRONT = { 'visitante-a': Math.PI, 'visitante-b': -Math.PI / 2 };

const GOLD = 0xd9b25a;
const CYAN = 0x19c6e6;
const VIOLET = 0x7b5cff;

function material(color, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, metalness: 0.3, roughness: 0.35, ...extra });
}
const glow = (color, intensity = 1.2) => material(color, { emissive: color, emissiveIntensity: intensity });

/** Ángulos repartidos en un círculo, saltando los que caen cerca de una salida. */
export function anglesAvoiding(count, exits, margin = 0.35) {
  const result = [];
  for (let i = 0; i < count * 4 && result.length < count; i++) {
    const a = (i / (count * 4)) * Math.PI * 2;
    if (exits.every((e) => Math.abs(Math.atan2(Math.sin(a - e), Math.cos(a - e))) > margin)) {
      if (result.every((b) => Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b))) > (Math.PI * 2) / (count + 2))) result.push(a);
    }
  }
  return result;
}

/** Pantalla holográfica con un dibujo simple de ficha de influencer. */
function holoScreen(width = 1.6) {
  const canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = 160;
  const g = canvas.getContext('2d');
  g.fillStyle = 'rgba(25,198,230,0.18)'; g.fillRect(0, 0, 256, 160);
  g.strokeStyle = 'rgba(160,240,255,0.9)'; g.lineWidth = 4; g.strokeRect(4, 4, 248, 152);
  g.fillStyle = 'rgba(200,250,255,0.95)';
  g.beginPath(); g.arc(52, 62, 24, 0, Math.PI * 2); g.fill();
  g.fillRect(28, 96, 48, 30);
  for (let i = 0; i < 4; i++) g.fillRect(100, 40 + i * 24, 120 - i * 18, 10);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1), new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
  mesh.scale.setScalar(width / 1.6);
  return mesh;
}

/**
 * Construye la sala de PIX Central y el fondo.
 * @param {object} deps
 * @param {THREE.Scene} deps.scene
 * @param {ReturnType<import('./assets.js').createAssetLoader>} deps.loader
 * @param {typeof import('../../content/world-1/layout.js').WORLD_1_LAYOUT} deps.layout
 * @param {THREE.Object3D[]} deps.occluders
 * @param {{ minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number }[]} deps.boxes
 * @param {string} [deps.backgroundPath]
 */
export function createHall({ scene, loader, layout, occluders, boxes, addFadeable = () => {}, backgroundPath = BACKGROUND_PATH }) {
  const hall = new THREE.Group();
  const { radius, top } = layout.plaza;
  const exits = layout.plazaExits;
  // Salidas de los puentes y portales: ahí no se pone nada que estorbe.
  const blocked = [...exits, ...layout.plazaPortals.map((p) => p.angle)];

  // Suelo circular con anillos de luz
  const floor = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.97, 0.8, 64), [material(0xd3daee), material(0xf8fbff), material(0xd3daee)]);
  floor.position.y = top - 0.4; floor.receiveShadow = true;
  hall.add(floor); occluders.push(floor);
  for (const [r, color] of [[radius - 0.05, CYAN], [radius * 0.62, GOLD], [radius * 0.35, CYAN]]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 6, 96), glow(color, 1));
    ring.rotation.x = Math.PI / 2; ring.position.y = top + 0.01; hall.add(ring);
  }

  // Columnas con remate dorado, balcón y cúpula de anillos de luz
  for (const a of anglesAvoiding(10, blocked, 0.3)) {
    const x = Math.sin(a) * (radius + 1.6); const z = Math.cos(a) * (radius + 1.6);
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 7, 16), material(0xf5f7ff));
    pillar.position.set(x, top + 3.5, z); pillar.castShadow = true; hall.add(pillar);
    addFadeable(pillar);
    boxes.push({ minX: x - 0.45, maxX: x + 0.45, minZ: z - 0.45, maxZ: z + 0.45, minY: top - 1, maxY: top + 7 });
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.4, 0.4, 16), material(GOLD, { metalness: 0.7 }));
    cap.position.set(x, top + 7.1, z); hall.add(cap);
  }
  const balcony = new THREE.Mesh(new THREE.RingGeometry(radius + 0.8, radius + 2.6, 64), material(0xf8fbff, { side: THREE.DoubleSide }));
  balcony.rotation.x = -Math.PI / 2; balcony.position.y = top + 7.3; hall.add(balcony);
  const rail = new THREE.Mesh(new THREE.TorusGeometry(radius + 0.85, 0.06, 6, 96), glow(VIOLET, 1));
  rail.rotation.x = Math.PI / 2; rail.position.y = top + 8.1; hall.add(rail);
  const glass = new THREE.Mesh(new THREE.SphereGeometry(radius + 2.6, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xcfe8ff, transparent: true, opacity: 0.08, metalness: 0.1, roughness: 0.05, side: THREE.DoubleSide, depthWrite: false }));
  glass.position.y = top + 7.3; hall.add(glass);
  for (let i = 0; i < 4; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry((radius + 2.4) * Math.cos(0.25 + i * 0.32), 0.07, 6, 96), glow(i % 2 ? VIOLET : CYAN, 0.9));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = top + 7.3 + (radius + 2.4) * Math.sin(0.25 + i * 0.32);
    hall.add(ring);
  }

  // Pantallas holográficas flotando alrededor
  const screens = [];
  for (const a of anglesAvoiding(6, blocked, 0.45)) {
    const s = holoScreen();
    s.position.set(Math.sin(a) * (radius - 1.2), top + 3.2, Math.cos(a) * (radius - 1.2));
    s.userData.baseY = s.position.y;
    s.lookAt(0, top + 3.2, 0);
    hall.add(s); screens.push(s);
  }
  // Más pantallas sobre las zonas, en su borde exterior, mirando hacia ellas.
  for (const spec of layout.holoScreens) {
    const s = holoScreen(spec.width);
    s.position.set(spec.x, spec.y, spec.z);
    s.userData.baseY = spec.y;
    s.lookAt(spec.look.x, spec.y, spec.look.z);
    hall.add(s); screens.push(s);
  }
  scene.add(hall);

  // Fondo: la isla con montañas y cascadas, en un cilindro lejano alrededor del mundo.
  // La imagen ya viene continua (la mitad derecha es la izquierda en espejo), así que no hay
  // unión al dar la vuelta. La altura del cilindro respeta la proporción de la imagen (4:1).
  new THREE.TextureLoader().load(backgroundPath, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1; // visto desde dentro, se invierte para que no salga al revés
    const radius = 160;
    const height = (2 * Math.PI * radius) / 4;
    const sky = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 96, 1, true),
      new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide, fog: false, depthWrite: false }));
    sky.position.y = 8; sky.renderOrder = -1;
    scene.add(sky);
  }, undefined, () => {});

  // Modelos: reactor en el centro, cápsulas y jardineras alrededor
  const colliders = [];
  const addCollider = (x, z, half, height) => {
    const box = { minX: x - half, maxX: x + half, minZ: z - half, maxZ: z + half, minY: top, maxY: top + height };
    boxes.push(box); colliders.push(box);
    return box;
  };
  /** Ajusta la caja de choque a la huella real del modelo colocado (90 % de su ancho y fondo). */
  const fitCollider = (box, object) => {
    object.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(object);
    const shrinkX = (b.max.x - b.min.x) * 0.05;
    const shrinkZ = (b.max.z - b.min.z) * 0.05;
    Object.assign(box, { minX: b.min.x + shrinkX, maxX: b.max.x - shrinkX, minZ: b.min.z + shrinkZ, maxZ: b.max.z - shrinkZ, maxY: b.max.y });
  };
  addCollider(layout.reactor.x, layout.reactor.z, layout.reactor.size / 2, 3.5);
  const capsuleAngles = layout.plazaCapsules;
  const capsuleBoxes = capsuleAngles.map((a) => addCollider(Math.sin(a) * (radius - 1.6), Math.cos(a) * (radius - 1.6), 0.7, 2.6));
  const planterAngles = layout.plazaPlanters;
  const planterBoxes = planterAngles.map((a) => addCollider(Math.sin(a) * (radius - 2.4), Math.cos(a) * (radius - 2.4), 1, 1));

  // Cristales de borde (D58): sólidos en todas partes, sin poder atravesarlos ni saltarlos. En el borde de
  // la sala quedan huecos en las salidas y los portales; en cada zona, solo donde llega un puente.
  const railHeight = layout.rail.height;
  const plazaRails = plazaRailSegments(layout);
  hall.add(createRails(plazaRails, railHeight));
  boxes.push(...railColliderBoxes(plazaRails));
  for (const zone of layout.zones) {
    const segments = zoneRailSegments(zone, layout.bridges);
    hall.add(createRails(segments, railHeight));
    boxes.push(...railColliderBoxes(segments));
  }
  /** Cristales a los dos lados de un puente que se acaba de abrir (también sólidos). */
  function addBridgeRails(bridge) {
    const segments = bridgeRailSegments(bridge);
    const group = createRails(segments, railHeight);
    hall.add(group);
    boxes.push(...railColliderBoxes(segments));
    return group;
  }

  const portals = []; const visitors = [];
  /** Plano brillante que rellena el hueco del arco: degradado violeta y cyan con franjas que suben. */
  function portalGlow() {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 256;
    const g = canvas.getContext('2d');
    const gradient = g.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, 'rgba(123,92,255,0.85)'); gradient.addColorStop(0.5, 'rgba(25,198,230,0.55)'); gradient.addColorStop(1, 'rgba(123,92,255,0.85)');
    g.fillStyle = gradient; g.fillRect(0, 0, 64, 256);
    g.fillStyle = 'rgba(255,255,255,0.35)';
    for (let y = 0; y < 256; y += 64) g.fillRect(0, y, 64, 10);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    // Hueco en forma de arco: rectángulo con la parte de arriba redondeada (medidas del modelo ya a escala).
    const shape = new THREE.Shape();
    shape.moveTo(-0.95, 0.3); shape.lineTo(0.95, 0.3); shape.lineTo(0.95, 1.65);
    shape.absarc(0, 1.65, 0.95, 0, Math.PI, false); shape.lineTo(-0.95, 0.3);
    const geometry = new THREE.ShapeGeometry(shape, 24);
    // Coordenadas de textura: de 0 a 1 en vertical.
    const p = geometry.attributes.position; const uv = geometry.attributes.uv;
    for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) + 0.95) / 1.9, (p.getY(i) - 0.3) / 2.3);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false, fog: false }));
    mesh.userData.texture = texture;
    return mesh;
  }

  /** Portales y gente de fondo: lo último en cargar, cuando el protagonista, el reactor y las cápsulas ya están. */
  async function loadExtras() {
    const portal = await loader.load('portal');
    if (portal) {
      try { dropStrayParts(portal.scene); } catch { /* si falla, el portal se ve con su fragmento suelto */ }
      for (const spec of layout.plazaPortals) {
        // Medidas reales: arco de 3,2 m, bastante más alto que el avatar (1,55 m) como una puerta grande.
        const model = placeModel(portal, 3.2);
        model.rotation.y = Math.PI / 2; // el arco mira hacia +z
        const holder = new THREE.Group();
        holder.add(model);
        const at = polar(spec.angle, spec.radius);
        holder.position.set(at.x, top, at.z);
        holder.rotation.y = spec.angle + Math.PI; // mirando al centro de la sala
        scene.add(holder);
        addFadeable(model);
        const box = addCollider(at.x, at.z, 1, 3.2);
        fitCollider(box, holder);
        const glowPlane = portalGlow();
        glowPlane.position.y = 0;
        holder.add(glowPlane);
        portals.push({ glow: glowPlane, texture: glowPlane.userData.texture });
      }
    }
    const models = new Map();
    for (const name of new Set(layout.plazaVisitors.map((v) => v.model))) models.set(name, await loader.load(name));
    layout.plazaVisitors.forEach((spec, i) => {
      const gltf = models.get(spec.model);
      if (!gltf) return;
      const person = placeModel(gltf, spec.height);
      person.rotation.y = VISITOR_FRONT[spec.model] ?? 0; // gira el modelo para que su frente quede en +z
      const at = polar(spec.angle, spec.radius);
      const holder = new THREE.Group();
      holder.add(person);
      holder.position.set(at.x, top, at.z);
      // De cara al punto de interés.
      const facing = Math.atan2(spec.look.x - at.x, spec.look.z - at.z);
      holder.rotation.y = facing;
      scene.add(holder);
      addFadeable(person);
      const box = addCollider(at.x, at.z, 0.3, spec.height);
      fitCollider(box, holder);
      visitors.push({ holder, facing, phase: i * 1.7 });
    });
  }

  async function loadModels() {
    const reactor = await loader.load('reactor');
    if (reactor) {
      const r = placeModel(reactor, 4.2);
      r.position.set(layout.reactor.x, top, layout.reactor.z); scene.add(r);
      addFadeable(r);
    }
    const capsule = await loader.load('capsula');
    if (capsule) {
      for (const a of capsuleAngles) {
        // Una cápsula para una persona: algo más alta que el avatar.
        const c = placeModel(capsule, 2.1);
        c.position.set(Math.sin(a) * (radius - 1.6), top, Math.cos(a) * (radius - 1.6));
        c.rotation.y = a + Math.PI; scene.add(c);
        fitCollider(capsuleBoxes[capsuleAngles.indexOf(a)], c);
        addFadeable(c);
      }
    }
    const planter = await loader.load('jardinera');
    if (planter) {
      for (const a of planterAngles) {
        // Tamaño real junto al avatar (1,55 m): matera hasta la rodilla y palmera a la altura del pecho.
        const p = placeModel(planter, 1.2);
        p.position.set(Math.sin(a) * (radius - 2.4), top, Math.cos(a) * (radius - 2.4));
        p.rotation.y = a; scene.add(p);
        const box = planterBoxes[planterAngles.indexOf(a)];
        fitCollider(box, p);
        box.maxY = top + 0.55;
        addFadeable(p);
      }
    }
  }

  function update(time) {
    screens.forEach((s, i) => { s.position.y = s.userData.baseY + Math.sin(time * 1.2 + i) * 0.12; });
    // Brillo del portal: las franjas suben despacio y la luz respira un poco.
    for (const p of portals) { p.texture.offset.y = -time * 0.12; p.glow.material.opacity = 0.78 + Math.sin(time * 2.1) * 0.1; }
    // La gente de fondo se mece apenas y gira un poco la cabeza.
    for (const v of visitors) {
      v.holder.rotation.y = v.facing + Math.sin(time * 0.5 + v.phase) * 0.08;
      v.holder.rotation.z = Math.sin(time * 1.1 + v.phase) * 0.012;
      v.holder.position.y = top + Math.max(0, Math.sin(time * 1.6 + v.phase)) * 0.012;
    }
  }

  return { hall, loadModels, loadExtras, addBridgeRails, update, colliders };
}
