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

  /**
   * Mueve la cámara hacia su sitio detrás del personaje.
   * @param {{ x: number, y: number, z: number }} player
   * @param {number} yaw
   * @param {number} dt
   */
  function followPlayer(player, yaw, dt) {
    const { position, lookAt } = cameraTarget(player, yaw, camera.aspect);
    const k = snap ? 1 : followFactor(dt);
    camPos.lerp(new THREE.Vector3(position.x, position.y, position.z), k);
    camLook.lerp(new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z), k);
    snap = false;
    camera.position.copy(camPos);
    camera.lookAt(camLook);
    sun.position.set(player.x - 6, player.y + 16, player.z + 6);
    sun.target.position.set(player.x, player.y, player.z);
  }

  /** La próxima vez la cámara salta a su sitio sin animar (al empezar o al reaparecer). */
  function snapCamera() { snap = true; }

  function render() { renderer.render(scene, camera); }

  if (typeof ResizeObserver === 'function') new ResizeObserver(resize).observe(canvas);
  resize();

  return { THREE, renderer, scene, camera, sun, resize, followPlayer, snapCamera, render };
}
