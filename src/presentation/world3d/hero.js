// Protagonista animado y PIX que lo acompaña volando (T016, spec 006/FR-009; D45).
// Mientras los modelos no llegan, se ven formas simples.

import { THREE } from './three.js';
import { fitToHeight } from './assets.js';

const HERO_HEIGHT = 1.55;
const PIX_SIZE = 0.75;
// Mientras PIX habla se acerca a la pantalla (D61): vuela a un punto delante de la cámara, en el tercio
// inferior derecho, sin tapar el centro ni el avatar ni los botones. Todo es relativo a la cámara.
const NEAR_DISTANCE = 1.4; // metros delante de la cámara (el plano cercano es 0,1)
const NEAR_X = { portrait: 0.5, landscape: 0.34 }; // posición horizontal: -1 izquierda, 1 derecha
const NEAR_Y = -0.38; // posición vertical: -1 abajo, 1 arriba
const NEAR_WIDTH_FRACTION = 0.38; // lo máximo que ocupa de ancho de pantalla
const NEAR_HEIGHT_FRACTION = 0.3; // lo máximo que ocupa de alto de pantalla
// El modelo de PIX tiene la cara hacia su +X (no hacia +Z): este giro la pone mirando al frente.
const PIX_FACE_YAW = -Math.PI / 2;

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
  // Cuando PIX habla, pulsa y brilla un poco (D60).
  const talkLight = new THREE.PointLight(0x19c6e6, 0, 3.5);
  pix.add(talkLight);
  const pixBase = new THREE.Vector3(1, 1, 1);
  let talking = false;
  let talkAmount = 0;
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
  const scratch = { right: new THREE.Vector3(), up: new THREE.Vector3(), forward: new THREE.Vector3() };

  /**
   * Punto del mundo delante de la cámara donde PIX se ve "hablando a la pantalla", y la escala que lo
   * deja con un tamaño cómodo según la forma de la pantalla.
   */
  function nearTarget(camera, time, out) {
    const q = camera.quaternion;
    scratch.right.set(1, 0, 0).applyQuaternion(q);
    scratch.up.set(0, 1, 0).applyQuaternion(q);
    scratch.forward.set(0, 0, -1).applyQuaternion(q);
    const aspect = camera.aspect || 1;
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * NEAR_DISTANCE;
    const halfW = halfH * aspect;
    const ndcX = aspect < 1 ? NEAR_X.portrait : NEAR_X.landscape;
    // Vaivén suave: sube y baja y se balancea un poco de lado.
    const bobX = Math.sin(time * 1.7) * 0.04;
    const bobY = Math.sin(time * 2.6) * 0.05;
    out.copy(camera.position)
      .addScaledVector(scratch.forward, NEAR_DISTANCE)
      .addScaledVector(scratch.right, ndcX * halfW + bobX)
      .addScaledVector(scratch.up, NEAR_Y * halfH + bobY);
    // El modelo mide PIX_SIZE; que no pase de cierta parte del ancho ni del alto de la pantalla.
    const byWidth = (NEAR_WIDTH_FRACTION * 2 * halfW) / PIX_SIZE;
    const byHeight = (NEAR_HEIGHT_FRACTION * 2 * halfH) / PIX_SIZE;
    return Math.min(byWidth, byHeight, 1);
  }

  const nearPoint = new THREE.Vector3();
  let nearScale = 1;
  let nearAmount = 0;
  /**
   * @param {ReturnType<import('./physics3d.js').createBody>} body
   * @param {number} dt
   * @param {number} time segundos desde el inicio, para el vaivén de PIX
   * @param {THREE.PerspectiveCamera | null} [camera] La cámara del juego: mientras PIX habla, vuela delante de ella.
   */
  function update(body, dt, time, boxes = [], camera = null) {
    group.position.set(body.x, body.y, body.z);
    group.rotation.y = turnToward(group.rotation.y, body.face, 0.2);
    if (mixer) {
      mixer.update(dt);
      play(heroState(body));
      if (actions.run) actions.run.timeScale = Math.max(0.6, Math.hypot(body.vx, body.vz) / 4.5);
    }
    const r = group.rotation.y;
    // En reposo, detrás del hombro; hablando (D61), delante de la cámara. En ese modo no se aplican las
    // cajas de choque: está a 1,4 m de la cámara, que ya se mantiene fuera de los objetos.
    const facing = talking && camera;
    let target;
    if (facing) {
      nearScale = nearTarget(camera, time, nearPoint);
      target = nearPoint;
    } else {
      target = new THREE.Vector3(
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
    }
    // Al hablar sigue a la cámara con más prisa (la cámara se mueve); en reposo, con calma.
    pix.position.lerp(target, snap ? 1 : Math.min(1, dt * (facing ? 7 : 4.5)));
    // Mientras habla mira a la cámara; si no, hacia donde mira el avatar.
    const look = (facing ? Math.atan2(camera.position.x - pix.position.x, camera.position.z - pix.position.z) : r) + PIX_FACE_YAW;
    pix.rotation.y = turnToward(pix.rotation.y, look, Math.min(1, dt * 6));
    // Y se inclina hacia la cámara (que lo ve desde arriba) para que parezca que mira a la pantalla.
    pix.rotation.order = 'YXZ';
    let pitch = 0;
    if (facing) {
      const dx = camera.position.x - pix.position.x;
      const dz = camera.position.z - pix.position.z;
      pitch = -Math.atan2(camera.position.y - pix.position.y, Math.hypot(dx, dz) || 1);
    }
    // Con la cara hacia +X, inclinarla hacia la cámara es girar sobre Z (con el signo contrario).
    pix.rotation.z += (-pitch - pix.rotation.z) * Math.min(1, dt * 6);
    // Cerca de la pantalla se ajusta el tamaño; el pulso suave sigue mientras habla y vuelve al callar.
    nearAmount += ((facing ? 1 : 0) - nearAmount) * Math.min(1, dt * 6);
    talkAmount += ((talking ? 1 : 0) - talkAmount) * Math.min(1, dt * 8);
    const pulse = 1 + talkAmount * (0.07 + Math.sin(time * 14) * 0.05);
    pix.scale.copy(pixBase).multiplyScalar(pulse * (1 + (nearScale - 1) * nearAmount));
    talkLight.intensity = talkAmount * (1.4 + Math.sin(time * 14) * 0.6);
    snap = false;
  }

  return { group, pix, loadModels, update, snapPix() { snap = true; }, setTalking(value) { talking = Boolean(value); } };
}
