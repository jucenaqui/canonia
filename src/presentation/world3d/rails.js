// Cristales de borde (T050/T051, D58): paneles de vidrio claro y continuos, sin postes ni pasamanos,
// con un brillo muy suave en el canto de arriba y una franja cyan fina abajo. Cada juego de cristales
// es un grupo de mallas instanciadas (pocas llamadas de dibujo aunque haya decenas de tramos).
// Solo dibujan: el choque lo deciden quienes los colocan, y no cuentan como obstáculo de cámara
// (son transparentes: no se añaden a `occluders`).

import { THREE } from './three.js';

const CYAN = 0x19c6e6;

let shared = null;
function sharedParts() {
  if (shared) return shared;
  shared = {
    panel: new THREE.BoxGeometry(1, 1, 0.04),
    edge: new THREE.BoxGeometry(1, 0.04, 0.06),
    strip: new THREE.BoxGeometry(1, 0.06, 0.07),
    glass: new THREE.MeshStandardMaterial({ color: 0xd6f1ff, transparent: true, opacity: 0.2, metalness: 0.1, roughness: 0.05, side: THREE.DoubleSide, depthWrite: false }),
    glow: new THREE.MeshBasicMaterial({ color: 0xeafcff, transparent: true, opacity: 0.55, fog: false }),
    cyan: new THREE.MeshStandardMaterial({ color: CYAN, emissive: CYAN, emissiveIntensity: 1.3 }),
  };
  return shared;
}

/**
 * @param {{ x1: number, z1: number, x2: number, z2: number, y: number }[]} segments
 * @param {number} [height] Altura del cristal en metros.
 */
export function createRails(segments, height = 1.1) {
  const parts = sharedParts();
  const group = new THREE.Group();
  if (!segments.length) return group;
  const panels = new THREE.InstancedMesh(parts.panel, parts.glass, segments.length);
  const edges = new THREE.InstancedMesh(parts.edge, parts.glow, segments.length);
  const strips = new THREE.InstancedMesh(parts.strip, parts.cyan, segments.length);
  const m = new THREE.Matrix4(); const q = new THREE.Quaternion(); const up = new THREE.Vector3(0, 1, 0);
  const scale = new THREE.Vector3(); const pos = new THREE.Vector3();
  segments.forEach((s, i) => {
    const dx = s.x2 - s.x1; const dz = s.z2 - s.z1;
    // Un poco más largo que el tramo para que los cristales se toquen sin rendijas.
    const length = Math.hypot(dx, dz) + 0.02;
    q.setFromAxisAngle(up, -Math.atan2(dz, dx));
    const cx = (s.x1 + s.x2) / 2; const cz = (s.z1 + s.z2) / 2;
    m.compose(pos.set(cx, s.y + height / 2, cz), q, scale.set(length, height, 1)); panels.setMatrixAt(i, m);
    m.compose(pos.set(cx, s.y + height, cz), q, scale.set(length, 1, 1)); edges.setMatrixAt(i, m);
    m.compose(pos.set(cx, s.y + 0.03, cz), q, scale.set(length, 1, 1)); strips.setMatrixAt(i, m);
  });
  for (const mesh of [panels, edges, strips]) { mesh.frustumCulled = false; mesh.instanceMatrix.needsUpdate = true; group.add(mesh); }
  panels.renderOrder = 2;
  return group;
}
