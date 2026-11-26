// Ambientación de PIX Central (T048 y T051, D56): sala circular con cúpula de luz y reactor
// holográfico, cápsulas, jardineras, pantallas flotantes y, de fondo, la isla con montañas y cascadas.
// Referencia: docs-entrada/influence-foundry/mundo-y-escenas.webp. Solo decora: no decide nada.

import { THREE } from './three.js';
import { placeModel } from './assets.js';

/** Ruta del paisaje panorámico de fondo. */
export const BACKGROUND_PATH = 'assets/backgrounds/pix-central-isla.jpg';

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
function holoScreen() {
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

  // Suelo circular con anillos de luz
  const floor = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 0.97, 0.8, 64), [material(0xd3daee), material(0xf8fbff), material(0xd3daee)]);
  floor.position.y = top - 0.4; floor.receiveShadow = true;
  hall.add(floor); occluders.push(floor);
  for (const [r, color] of [[radius - 0.05, CYAN], [radius * 0.62, GOLD], [radius * 0.35, CYAN]]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 6, 96), glow(color, 1));
    ring.rotation.x = Math.PI / 2; ring.position.y = top + 0.01; hall.add(ring);
  }

  // Columnas con remate dorado, balcón y cúpula de anillos de luz
  for (const a of anglesAvoiding(10, exits, 0.3)) {
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
  for (const a of anglesAvoiding(6, exits, 0.45)) {
    const s = holoScreen();
    s.position.set(Math.sin(a) * (radius - 1.2), top + 3.2, Math.cos(a) * (radius - 1.2));
    s.lookAt(0, top + 3.2, 0);
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
  const capsuleAngles = anglesAvoiding(6, exits, 0.5).map((a) => a + 0.12);
  const capsuleBoxes = capsuleAngles.map((a) => addCollider(Math.sin(a) * (radius - 1.6), Math.cos(a) * (radius - 1.6), 0.7, 2.6));
  const planterAngles = anglesAvoiding(4, exits, 0.5).map((a) => a + 0.55);
  const planterBoxes = planterAngles.map((a) => addCollider(Math.sin(a) * (radius - 2.4), Math.cos(a) * (radius - 2.4), 1, 1));

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
    screens.forEach((s, i) => { s.position.y = top + 3.2 + Math.sin(time * 1.2 + i) * 0.12; });
  }

  return { hall, loadModels, update, colliders };
}
