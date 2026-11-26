// Chispas del mundo (T038, D48): piezas doradas que giran y brillan; al tocarlas se recogen.
// La vista no sabe de consejos ni de la sesión: avisa con `onCollect(id)` y quien integra decide.
// Las ya recogidas (ids que pasa quien integra) no se dibujan, ni tras recargar.

import { THREE } from './three.js';
import { canCollect, visibleSparks } from './spark-math.js';

/**
 * @param {object} options
 * @param {THREE.Scene} options.scene
 * @param {{ id: string, x: number, y: number, z: number, requiresBridge?: string }[]} options.sparks
 * @param {Iterable<string>} options.collected Ids ya recogidos.
 * @param {() => Set<string>} options.openBridges Puentes abiertos ahora.
 * @param {(id: string) => void} options.onCollect Se llama una vez al tocar una chispa.
 */
export function createSparks({ scene, sparks, collected, openBridges, onCollect }) {
  const taken = new Set(collected);
  const coreGeometry = new THREE.OctahedronGeometry(0.22, 0);
  const haloGeometry = new THREE.SphereGeometry(0.42, 14, 10);
  const items = sparks.map((spark, i) => {
    const group = new THREE.Group();
    group.position.set(spark.x, spark.y, spark.z);
    const mesh = new THREE.Mesh(coreGeometry, new THREE.MeshStandardMaterial({
      color: 0xffd25a, emissive: 0xffb62e, emissiveIntensity: 1.6, metalness: 0.3, roughness: 0.25, transparent: true,
    }));
    const glow = new THREE.Mesh(haloGeometry, new THREE.MeshBasicMaterial({ color: 0xffe9a8, transparent: true, opacity: 0.22, depthWrite: false }));
    group.add(mesh, glow);
    group.visible = false;
    scene.add(group);
    return { spark, group, mesh, glow, state: 'idle', t: 0, phase: i * 1.7 };
  });

  let lastKey = null;
  function refreshVisibility() {
    const shown = new Set(visibleSparks(sparks, taken, openBridges()).map((s) => s.id));
    for (const item of items) item.group.visible = item.state === 'popping' || shown.has(item.spark.id);
  }

  return {
    /** @param {number} time @param {number} dt @param {{ x: number, y: number, z: number }} body */
    update(time, dt, body) {
      const key = [...openBridges()].sort().join('|');
      if (key !== lastKey) { lastKey = key; refreshVisibility(); }
      for (const item of items) {
        if (!item.group.visible) continue;
        if (item.state === 'popping') {
          // Efecto al recogerla: crece, se aclara y se va.
          item.t += dt / 0.35;
          const k = Math.min(1, item.t);
          item.group.scale.setScalar(1 + k * 1.2);
          item.glow.material.opacity = 0.5 * (1 - k);
          item.mesh.material.opacity = 1 - k;
          if (k >= 1) { item.group.visible = false; item.state = 'gone'; }
          continue;
        }
        item.mesh.rotation.y = time * 2.2 + item.phase;
        item.mesh.rotation.x = Math.sin(time * 1.3 + item.phase) * 0.3;
        item.group.position.y = item.spark.y + Math.sin(time * 2 + item.phase) * 0.08;
        item.glow.scale.setScalar(1 + Math.sin(time * 3.4 + item.phase) * 0.12);
        if (!taken.has(item.spark.id) && canCollect(body, item.spark)) {
          taken.add(item.spark.id);
          item.state = 'popping';
          item.t = 0;
          onCollect(item.spark.id);
        }
      }
    },
    isTaken: (id) => taken.has(id),
    destroy() {
      for (const item of items) { scene.remove(item.group); item.mesh.material.dispose(); item.glow.material.dispose(); }
      coreGeometry.dispose(); haloGeometry.dispose();
    },
  };
}
