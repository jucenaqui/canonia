// Carga de los modelos 3D por orden de prioridad (T012, plan 006 decisión 5; spec 006/FR-039).
// Cada modelo llega como un archivo .js que guarda el GLB en window.CANONIA_MODELS[nombre]
// (lo genera scripts/pack-models.js). Mientras un modelo no llega, el juego usa formas simples.

import { THREE, GLTFLoader, SkeletonUtils } from './three.js';

/** Base de las rutas de los modelos empaquetados. */
export const MODELS_PATH = 'assets/models/packed/';

function decodeBase64(text) {
  const binary = atob(text);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

/**
 * @param {{ basePath?: string, onProgress?: (loaded: number, total: number) => void }} [options]
 */
export function createAssetLoader({ basePath = MODELS_PATH, onProgress = () => {} } = {}) {
  const loader = new GLTFLoader();
  /** @type {Map<string, Promise<object|null>>} */
  const pending = new Map();
  /** @type {Map<string, object>} */
  const ready = new Map();
  let requested = 0;
  let finished = 0;

  function injectScript(name) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `${basePath}${name}.js`;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  /**
   * Carga un modelo. Nunca lanza: si falla, devuelve null y el juego sigue con formas simples.
   * @param {string} name
   */
  function load(name) {
    if (pending.has(name)) return pending.get(name);
    requested++;
    onProgress(finished, requested);
    const promise = (async () => {
      try {
        const store = globalThis.CANONIA_MODELS || {};
        if (!store[name] && !(await injectScript(name))) return null;
        const text = (globalThis.CANONIA_MODELS || {})[name];
        if (!text) return null;
        const gltf = await new Promise((resolve, reject) => loader.parse(decodeBase64(text), '', resolve, reject));
        delete globalThis.CANONIA_MODELS[name];
        ready.set(name, gltf);
        return gltf;
      } catch {
        return null;
      } finally {
        finished++;
        onProgress(finished, requested);
      }
    })();
    pending.set(name, promise);
    return promise;
  }

  /** Carga varias tandas en orden: la primera tanda entera antes de empezar la segunda. */
  async function loadInOrder(batches) {
    for (const batch of batches) await Promise.all(batch.map(load));
  }

  return { load, loadInOrder, get: (name) => ready.get(name) ?? null, has: (name) => ready.has(name) };
}

/**
 * Escala un objeto a una altura dada y lo apoya en el suelo (o lo centra), dentro de un grupo.
 * @param {THREE.Object3D} object
 * @param {number} height
 * @param {{ ground?: boolean }} [options]
 */
export function fitToHeight(object, height, { ground = true } = {}) {
  object.traverse((child) => { if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; child.frustumCulled = false; } });
  object.updateMatrixWorld(true);
  let box = new THREE.Box3().setFromObject(object, true);
  const size = box.getSize(new THREE.Vector3());
  object.scale.multiplyScalar(height / (size.y || 1));
  object.updateMatrixWorld(true);
  box = new THREE.Box3().setFromObject(object, true);
  const center = box.getCenter(new THREE.Vector3());
  object.position.x -= center.x;
  object.position.z -= center.z;
  object.position.y -= ground ? box.min.y : center.y;
  const group = new THREE.Group();
  group.add(object);
  return group;
}

/**
 * Copia de un modelo cargado, escalada, lista para poner en la escena.
 * Los modelos con esqueleto se copian con SkeletonUtils: una copia normal comparte los huesos
 * con el original y sale deformada.
 */
export function placeModel(gltf, height, options) {
  const copy = gltf.parser?.json?.skins?.length ? SkeletonUtils.clone(gltf.scene) : gltf.scene.clone(true);
  return fitToHeight(copy, height, options);
}
