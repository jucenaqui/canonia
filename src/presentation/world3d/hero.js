// Protagonista animado y PIX que lo acompaña volando (T016, spec 006/FR-009; D45).
// Mientras los modelos no llegan, se ven formas simples.

import { THREE } from './three.js';
import { fitToHeight } from './assets.js';

const HERO_HEIGHT = 1.55;
const PIX_SIZE = 0.75;

/** Elige la animación según el estado del cuerpo. */
export function heroState(body) {
  if (!body.onGround) return 'jump';
  return Math.hypot(body.vx, body.vz) > 1 ? 'run' : 'idle';
}

/** Gira un ángulo hacia otro por el camino más corto. */
export function turnToward(current, target, k) {
  const diff = ((target - current + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return current + diff * k;
}

/**
 * @param {{ scene: THREE.Scene, loader: ReturnType<import('./assets.js').createAssetLoader> }} deps
 */
export function createHero({ scene, loader }) {
  const group = new THREE.Group();
  const placeholderMat = new THREE.MeshStandardMaterial({ color: 0x3a3170, metalness: 0.5, roughness: 0.25 });
  const placeholder = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.7, 6, 16), placeholderMat);
  torso.position.y = 0.65;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 14), placeholderMat);
  head.position.y = 1.32;
  placeholder.add(torso, head);
  placeholder.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  group.add(placeholder);
  scene.add(group);

  const pix = new THREE.Group();
  const pixPlaceholder = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
  pix.add(pixPlaceholder);
  scene.add(pix);

  let mixer = null;
  const actions = {};
  let current = '';

  function play(state) {
    if (state === current || !actions[state]) return;
    const next = actions[state];
    const prev = actions[current];
    next.reset().play();
    if (prev) prev.crossFadeTo(next, 0.15, false);
    current = state;
  }

  /** Carga los modelos y las animaciones. Nunca lanza. */
  async function loadModels() {
    const run = await loader.load('heroe-correr');
    if (run) {
      group.add(fitToHeight(run.scene, HERO_HEIGHT));
      placeholder.visible = false;
      mixer = new THREE.AnimationMixer(run.scene);
      actions.run = mixer.clipAction(run.animations[0]);
    }
    const [idle, jump] = await Promise.all([loader.load('heroe-quieto'), loader.load('heroe-saltar')]);
    if (mixer && idle) actions.idle = mixer.clipAction(idle.animations[0]);
    if (mixer && jump) {
      actions.jump = mixer.clipAction(jump.animations[0]);
      actions.jump.setLoop(THREE.LoopOnce);
      actions.jump.clampWhenFinished = true;
      actions.jump.timeScale = 1.4;
    }
    if (mixer) play(actions.idle ? 'idle' : 'run');
    const pixModel = await loader.load('pix');
    if (pixModel) {
      pix.add(fitToHeight(pixModel.scene, PIX_SIZE, { ground: false }));
      pixPlaceholder.visible = false;
    }
  }

  let snap = true;
  /**
   * @param {ReturnType<import('./physics3d.js').createBody>} body
   * @param {number} dt
   * @param {number} time segundos desde el inicio, para el vaivén de PIX
   */
  function update(body, dt, time, boxes = []) {
    group.position.set(body.x, body.y, body.z);
    group.rotation.y = turnToward(group.rotation.y, body.face, 0.2);
    if (mixer) {
      mixer.update(dt);
      play(heroState(body));
      if (actions.run) actions.run.timeScale = Math.max(0.6, Math.hypot(body.vx, body.vz) / 4.5);
    }
    const r = group.rotation.y;
    const target = new THREE.Vector3(
      body.x - Math.sin(r) * 0.9 + Math.cos(r) * 0.5,
      body.y + 1.9 + Math.sin(time * 3) * 0.12,
      body.z - Math.cos(r) * 0.9 - Math.sin(r) * 0.5,
    );
    // PIX no atraviesa objetos: si su sitio cae dentro de algo, vuela por encima.
    for (const b of boxes) {
      const over = target.x > b.minX - 0.3 && target.x < b.maxX + 0.3 && target.z > b.minZ - 0.3 && target.z < b.maxZ + 0.3;
      // Solo objetos bajos (cápsulas, jardineras, reactor); las columnas altas no lo mandan al techo.
      if (over && b.maxY - b.minY < 5 && target.y < b.maxY + 0.5 && target.y > b.minY) target.y = b.maxY + 0.7;
    }
    pix.position.lerp(target, snap ? 1 : 0.08);
    pix.rotation.y = turnToward(pix.rotation.y, r, 0.08);
    snap = false;
  }

  return { group, pix, loadModels, update, snapPix() { snap = true; } };
}
