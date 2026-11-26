// Escena 3D: dibujo, luces, cámara detrás del personaje y tamaño de pantalla (T012).
// Aspecto de The Influence Foundry: luminoso, blanco, cyan, violeta y dorado (D41).

import { THREE } from './three.js';
import { cameraTarget, followFactor } from './camera-math.js';

export const SKY = 0xdfe7f4;

/**
 * Crea la escena sobre un lienzo.
 * @param {HTMLCanvasElement} canvas
 */
export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SKY);
  scene.fog = new THREE.Fog(SKY, 30, 80);

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xaeb8de, 1.05));
  const sun = new THREE.DirectionalLight(0xffffff, 2.1);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 60 });
  scene.add(sun, sun.target);

  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  let snap = true;

  function resize() {
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  const raycaster = new THREE.Raycaster();
  /** Superficies que la cámara no puede atravesar (suelos y plataformas). */
  const occluders = [];
  /**
   * Objetos que se vuelven transparentes cuando quedan entre la cámara y el personaje
   * (reactor, columnas, cápsulas, jardineras), para no perder de vista al personaje.
   * @type {{ root: THREE.Object3D, materials: THREE.Material[], faded: boolean }[]}
   */
  const fadeables = [];
  function addFadeable(root) {
    const materials = [];
    root.traverse((child) => {
      if (!child.isMesh) return;
      child.material = Array.isArray(child.material) ? child.material.map((m) => m.clone()) : child.material.clone();
      for (const m of [].concat(child.material)) { m.userData.baseOpacity = m.opacity; m.userData.baseTransparent = m.transparent; materials.push(m); }
      child.userData.fadeRoot = root;
    });
    fadeables.push({ root, materials, faded: false });
  }
  function setFaded(entry, faded) {
    if (entry.faded === faded) return;
    entry.faded = faded;
    for (const m of entry.materials) {
      m.transparent = faded ? true : m.userData.baseTransparent;
      m.opacity = faded ? 0.25 : m.userData.baseOpacity;
      m.depthWrite = !faded;
      m.needsUpdate = true;
    }
  }
  /**
   * Un objeto solo se vuelve transparente si tapa casi todo el cuerpo del personaje: se miran
   * siete puntos del cuerpo (pies, cadera, pecho, cabeza y los lados) y hacen falta cinco tapados.
   * Así un objeto que solo tapa los pies o medio cuerpo se queda como está.
   */
  const COVER_NEEDED = 5;
  function bodyPoints(player) {
    const right = new THREE.Vector3().subVectors(camera.position, new THREE.Vector3(player.x, camera.position.y, player.z))
      .cross(new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(0.25);
    const at = (h, side = 0) => new THREE.Vector3(player.x, player.y + h, player.z).addScaledVector(right, side);
    return [at(0.15), at(0.6), at(1.0), at(1.4), at(1.75), at(1.0, -1), at(1.0, 1)];
  }
  function updateFading(player) {
    if (!fadeables.length) return;
    const roots = fadeables.map((f) => f.root);
    const counts = new Map();
    for (const point of bodyPoints(player)) {
      const direction = point.clone().sub(camera.position);
      const distance = direction.length();
      raycaster.set(camera.position, direction.normalize());
      raycaster.far = Math.max(0, distance - 0.2);
      const blockers = new Set(raycaster.intersectObjects(roots, true).map((h) => h.object.userData.fadeRoot));
      for (const root of blockers) counts.set(root, (counts.get(root) || 0) + 1);
    }
    for (const entry of fadeables) setFaded(entry, (counts.get(entry.root) || 0) >= COVER_NEEDED);
  }

  /**
   * Mueve la cámara hacia su sitio detrás del personaje. Si algo la tapa, se acerca
   * al personaje para no perderlo de vista (spec 006/FR-006, T018).
   * @param {{ x: number, y: number, z: number }} player
   * @param {number} yaw
   * @param {number} dt
   */
  function followPlayer(player, yaw, dt) {
    const { position, lookAt } = cameraTarget(player, yaw, camera.aspect);
    const look = new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z);
    const wanted = new THREE.Vector3(position.x, position.y, position.z);
    if (occluders.length) {
      // Si algo tapa la cámara, primero se prueba subirla (mirar más desde arriba); si sigue
      // tapada, se acerca al personaje. Así no queda dentro de un objeto grande como el reactor.
      const firstHit = (target) => {
        const direction = target.clone().sub(look);
        const full = direction.length();
        raycaster.set(look, direction.clone().normalize());
        raycaster.far = full;
        const hit = raycaster.intersectObjects(occluders, true)[0];
        return hit ? { distance: hit.distance, direction: direction.normalize() } : null;
      };
      let hit = firstHit(wanted);
      if (hit) {
        for (const lift of [3, 6, 9]) {
          const raised = wanted.clone().add(new THREE.Vector3(0, lift, 0));
          if (!firstHit(raised)) { wanted.copy(raised); hit = null; break; }
        }
      }
      // Acercarse solo si el obstáculo deja sitio; si no, mejor quedarse arriba que dentro de él.
      if (hit && hit.distance > 3) wanted.copy(look).addScaledVector(hit.direction, hit.distance - 0.4);
      else if (hit) wanted.add(new THREE.Vector3(0, 9, 0));
    }
    const k = snap ? 1 : followFactor(dt);
    camPos.lerp(wanted, k);
    camLook.lerp(new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z), k);
    snap = false;
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    updateFading(player);
    sun.position.set(player.x - 6, player.y + 16, player.z + 6);
    sun.target.position.set(player.x, player.y, player.z);
  }

  /** La próxima vez la cámara salta a su sitio sin animar (al empezar o al reaparecer). */
  function snapCamera() { snap = true; }

  function render() { renderer.render(scene, camera); }

  if (typeof ResizeObserver === 'function') new ResizeObserver(resize).observe(canvas);
  resize();

  return { THREE, renderer, scene, camera, sun, occluders, addFadeable, resize, followPlayer, snapCamera, render };
}
