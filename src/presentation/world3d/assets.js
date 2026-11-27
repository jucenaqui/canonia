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
 * @param {{ basePath?: string, onProgress?: (loaded: number, total: number) => void, onSettled?: (name: string) => void }} [options]
 *   `onSettled` avisa de cada modelo que termina, haya llegado o haya fallado.
 */
export function createAssetLoader({ basePath = MODELS_PATH, onProgress = () => {}, onSettled = () => {} } = {}) {
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
    if (typeof name !== 'string' || !/^[a-z0-9-]+$/.test(name)) return Promise.resolve(null); // el nombre va a una ruta: solo letras, cifras y guiones
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
        onSettled(name);
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

/**
 * Quita de un modelo los fragmentos sueltos: partes que no tocan a ninguna otra y cuya caja queda
 * separada del resto (por ejemplo, un resto de la generación con IA junto a la base de un portal).
 * Trabaja una sola vez sobre el modelo cargado; las copias que se hagan después ya salen limpias.
 * @param {THREE.Object3D} root
 * @returns {number} cuántos fragmentos quitó
 */
export function dropStrayParts(root, gap = 0.02) {
  let removed = 0;
  root.traverse((mesh) => {
    const geometry = mesh.geometry;
    if (!mesh.isMesh || !geometry?.index || mesh.userData.strayChecked) return;
    mesh.userData.strayChecked = true;
    const pos = geometry.attributes.position; const index = geometry.index;
    // Partes conectadas, soldando vértices que están en el mismo punto.
    const parent = Array.from({ length: pos.count }, (_, i) => i);
    const find = (a) => { while (parent[a] !== a) { parent[a] = parent[parent[a]]; a = parent[a]; } return a; };
    const seen = new Map();
    for (let i = 0; i < pos.count; i++) {
      const key = `${pos.getX(i).toFixed(4)},${pos.getY(i).toFixed(4)},${pos.getZ(i).toFixed(4)}`;
      if (seen.has(key)) parent[find(i)] = find(seen.get(key)); else seen.set(key, i);
    }
    for (let t = 0; t < index.count; t += 3) { parent[find(index.getX(t + 1))] = find(index.getX(t)); parent[find(index.getX(t + 2))] = find(index.getX(t)); }
    const parts = new Map();
    for (let t = 0; t < index.count; t += 3) {
      const root = find(index.getX(t));
      if (!parts.has(root)) parts.set(root, { triangles: [], min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] });
      const part = parts.get(root);
      part.triangles.push(t);
      for (let k = 0; k < 3; k++) {
        const v = index.getX(t + k);
        [pos.getX(v), pos.getY(v), pos.getZ(v)].forEach((value, axis) => { part.min[axis] = Math.min(part.min[axis], value); part.max[axis] = Math.max(part.max[axis], value); });
      }
    }
    const list = [...parts.values()];
    const apart = (a, b) => [0, 1, 2].some((axis) => a.min[axis] > b.max[axis] + gap || b.min[axis] > a.max[axis] + gap);
    const keep = list.filter((part) => list.some((other) => other !== part && !apart(part, other)) || list.length === 1);
    if (keep.length === list.length) return;
    removed += list.length - keep.length;
    // Geometría nueva solo con las partes que se quedan (así la caja del modelo tampoco cuenta el fragmento).
    const used = new Map(); const order = [];
    const indices = [];
    for (const part of keep) for (const t of part.triangles) for (let k = 0; k < 3; k++) {
      const v = index.getX(t + k);
      if (!used.has(v)) { used.set(v, order.length); order.push(v); }
      indices.push(used.get(v));
    }
    const clean = new THREE.BufferGeometry();
    for (const [name, attribute] of Object.entries(geometry.attributes)) {
      // Se copia con getX/getY/getZ/getW: sirve también para atributos intercalados o normalizados.
      const array = new Float32Array(order.length * attribute.itemSize);
      order.forEach((v, i) => { for (let c = 0; c < attribute.itemSize; c++) array[i * attribute.itemSize + c] = [attribute.getX, attribute.getY, attribute.getZ, attribute.getW][c].call(attribute, v); });
      clean.setAttribute(name, new THREE.BufferAttribute(array, attribute.itemSize));
    }
    clean.setIndex(indices);
    mesh.geometry = clean;
  });
  return removed;
}
