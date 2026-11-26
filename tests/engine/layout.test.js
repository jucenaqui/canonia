// T017: la distribución del Mundo 1 se puede recorrer (spec 006/FR-011, FR-012).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORLD_1_LAYOUT, boxOf, polar, plazaRailSegments, bridgeRailSegments, zoneRailSegments, railColliderBoxes } from '../../src/content/world-1/layout.js';
import { PHYSICS3D } from '../../src/presentation/world3d/physics3d.js';

const pieces = ['incomeSource', 'niche', 'audience', 'timeAvailable', 'goal90Days'];

test('hay una zona por pieza de F01, en el orden de la factoría', () => {
  assert.deepEqual(WORLD_1_LAYOUT.zones.map((z) => z.id), pieces);
});

test('solo el primer puente está abierto al empezar; cada zona abre el siguiente', () => {
  const [first, ...rest] = WORLD_1_LAYOUT.bridges;
  assert.equal(first.opensAfter, null);
  assert.deepEqual(rest.map((b) => b.opensAfter), pieces);
});

test('la sala circular tiene suelo en todo su borde: nadie se cae donde se ve suelo', () => {
  const strips = WORLD_1_LAYOUT.plazaBoxes.map((s) => boxOf(s));
  const r = WORLD_1_LAYOUT.plaza.radius - PHYSICS3D.RADIUS;
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const x = Math.sin(a) * r; const z = Math.cos(a) * r;
    assert.ok(strips.some((b) => x >= b.minX && x <= b.maxX && z >= b.minZ && z <= b.maxZ), `sin suelo en ${(a * 180 / Math.PI).toFixed(0)}°`);
  }
});

test('el personaje aparece sobre la plaza', () => {
  const plaza = boxOf(WORLD_1_LAYOUT.plaza);
  const { x, z } = WORLD_1_LAYOUT.spawn;
  assert.ok(x > plaza.minX && x < plaza.maxX && z > plaza.minZ && z < plaza.maxZ);
});

test('cada puente toca sus dos orillas y, en el sentido del recorrido, las subidas se hacen sin saltar', () => {
  const places = new Map([['plaza', WORLD_1_LAYOUT.plaza], ...WORLD_1_LAYOUT.zones.map((z) => [z.id, z])]);
  let from = 'plaza';
  for (const bridge of WORLD_1_LAYOUT.bridges) {
    const b = boxOf(bridge);
    for (const id of [from, bridge.to]) {
      const p = boxOf(places.get(id));
      const gapX = Math.max(0, p.minX - b.maxX, b.minX - p.maxX);
      const gapZ = Math.max(0, p.minZ - b.maxZ, b.minZ - p.maxZ);
      assert.ok(gapX < PHYSICS3D.RADIUS * 2 && gapZ < PHYSICS3D.RADIUS * 2, `${bridge.to}: hueco con ${id}`);
    }
    // Bajar se puede siempre; subir, solo escalones bajos (spec 006/FR-007).
    assert.ok(bridge.top - places.get(from).top <= PHYSICS3D.STEP_UP, `${bridge.to}: subida al puente`);
    assert.ok(places.get(bridge.to).top - bridge.top <= PHYSICS3D.STEP_UP, `${bridge.to}: subida a la orilla`);
    from = bridge.to;
  }
});

// --- Ambientación de PIX Central (T050/T051): lo colocado no cierra las salidas ------------------

const L = WORLD_1_LAYOUT;
const BRIDGE_HALF = 1.38; // medio ancho útil de los puentes que salen de la sala (entre las caras de sus cristales)

/** Objetos redondos que se colocan en la sala: centro y radio aproximado de su huella. */
function roundObstacles() {
  return [
    ...L.plazaPortals.map((p) => ({ name: `portal ${p.id}`, ...polar(p.angle, p.radius), r: 1.8 })),
    ...L.plazaVisitors.map((v, i) => ({ name: `visitante ${i}`, ...polar(v.angle, v.radius), r: 0.4 })),
    ...L.plazaCapsules.map((a, i) => ({ name: `cápsula ${i}`, ...polar(a, L.plaza.radius - 1.6), r: 1 })),
    ...L.plazaPlanters.map((a, i) => ({ name: `jardinera ${i}`, ...polar(a, L.plaza.radius - 2.4), r: 1.41 })),
  ];
}

/** Franja de una salida: las salidas van a 0 o 180 grados, así que la franja está alineada con un eje. */
function exitStrip(angle) {
  const dx = Math.round(Math.sin(angle)); const dz = Math.round(Math.cos(angle));
  assert.ok(Math.abs(dx) + Math.abs(dz) === 1, 'las salidas de la sala van en la dirección de un eje');
  // Desde el borde del reactor hasta el final del borde de la sala.
  const reach = [2.6, L.plaza.radius + 1.7];
  return dx === 0
    ? { minX: -BRIDGE_HALF, maxX: BRIDGE_HALF, minZ: Math.min(dz * reach[0], dz * reach[1]), maxZ: Math.max(dz * reach[0], dz * reach[1]) }
    : { minZ: -BRIDGE_HALF, maxZ: BRIDGE_HALF, minX: Math.min(dx * reach[0], dx * reach[1]), maxX: Math.max(dx * reach[0], dx * reach[1]) };
}
const boxesOverlap = (a, b) => a.minX < b.maxX && a.maxX > b.minX && a.minZ < b.maxZ && a.maxZ > b.minZ;

test('portales, visitantes, cápsulas y jardineras no tapan la salida de ningún puente', () => {
  for (const exit of L.plazaExits) {
    const strip = exitStrip(exit);
    for (const o of roundObstacles()) {
      assert.ok(!boxesOverlap(strip, { minX: o.x - o.r, maxX: o.x + o.r, minZ: o.z - o.r, maxZ: o.z + o.r }), `${o.name} tapa la salida a ${(exit * 180 / Math.PI).toFixed(0)}°`);
    }
  }
});

test('el cristal del borde de la sala deja libre cada salida y cada portal, y sus cajas de choque también', () => {
  const segments = plazaRailSegments(L);
  assert.ok(segments.length > 20, 'hay cristal alrededor de la sala');
  const boxes = railColliderBoxes(segments);
  for (const exit of L.plazaExits) {
    const strip = exitStrip(exit);
    assert.ok(boxes.every((b) => !boxesOverlap(strip, b)), `una caja de la cristal cierra la salida a ${(exit * 180 / Math.PI).toFixed(0)}°`);
  }
  for (const p of L.plazaPortals) {
    const at = polar(p.angle, p.radius);
    assert.ok(boxes.every((b) => !boxesOverlap({ minX: at.x - 1.64, maxX: at.x + 1.64, minZ: at.z - 1.64, maxZ: at.z + 1.64 }, b)), `el cristal choca con el portal ${p.id}`);
  }
  // La cristal queda dentro del suelo: nadie llega al borde.
  for (const s of segments) assert.ok(Math.hypot(s.x1, s.z1) < L.plaza.radius && Math.hypot(s.x2, s.z2) < L.plaza.radius);
});

test('los portales miran al centro, no coinciden con las salidas y entran enteros en la sala', () => {
  assert.ok(L.plazaPortals.length >= 2 && L.plazaPortals.length <= 3);
  for (const p of L.plazaPortals) {
    for (const exit of L.plazaExits) assert.ok(Math.abs(Math.atan2(Math.sin(p.angle - exit), Math.cos(p.angle - exit))) > 0.8, `${p.id} está demasiado cerca de una salida`);
    assert.ok(p.radius + 0.9 <= L.plaza.radius, `${p.id} se sale del suelo`);
  }
});

test('hay de 4 a 6 visitantes con altura de persona, dentro de la sala y sin pisarse entre sí ni con el resto', () => {
  const visitors = L.plazaVisitors;
  assert.ok(visitors.length >= 4 && visitors.length <= 6);
  for (const v of visitors) {
    assert.ok(v.height >= 1.65 && v.height <= 1.75, `altura ${v.height}`);
    assert.ok(v.radius > L.reactor.size / 2 + 0.8 && v.radius < L.plaza.radius - 2, 'en la sala, fuera del reactor y del borde');
  }
  assert.deepEqual([...new Set(visitors.map((v) => v.model))].sort(), ['visitante-a', 'visitante-b']);
  const all = roundObstacles();
  for (const [i, a] of all.entries()) {
    for (const b of all.slice(i + 1)) assert.ok(Math.hypot(a.x - b.x, a.z - b.z) >= Math.min(a.r, b.r) + 0.4, `${a.name} y ${b.name} se pisan`);
  }
});


test('los puentes miden de 4 a 7 m de largo, 3 m o más de ancho y las zonas son grandes y no se solapan', () => {
  for (const bridge of L.bridges) {
    const length = Math.max(bridge.w, bridge.d); const width = Math.min(bridge.w, bridge.d);
    assert.ok(length >= 4 && length <= 7, `${bridge.to}: largo ${length}`);
    assert.ok(width >= 3, `${bridge.to}: ancho ${width}`);
  }
  for (const z of L.zones) assert.ok(z.w >= 20 && z.d >= 18, `${z.id} es pequeña`);
  const rects = [L.plaza, ...L.zones].map((p) => boxOf(p));
  for (const [i, a] of rects.entries()) for (const b of rects.slice(i + 1)) assert.ok(!boxesOverlap(a, b), 'dos zonas se solapan');
  // Entre dos zonas contiguas hay sitio para un puente.
  for (const [i, a] of L.zones.entries()) for (const b of L.zones.slice(i + 1)) {
    const A = boxOf(a); const B = boxOf(b);
    const gap = Math.max(B.minX - A.maxX, A.minX - B.maxX, B.minZ - A.maxZ, A.minZ - B.maxZ);
    assert.ok(gap >= 4, `${a.id} y ${b.id} están muy juntas`);
  }
});

test('los puentes conservan un ancho útil de 1,6 m o más entre sus cristales', () => {
  for (const bridge of L.bridges) {
    const boxes = railColliderBoxes(bridgeRailSegments(bridge));
    assert.ok(boxes.length > 0);
    const alongZ = bridge.d >= bridge.w;
    const centre = alongZ ? bridge.x : bridge.z;
    const inner = boxes.map((b) => (alongZ ? (b.minX > centre ? b.minX - centre : centre - b.maxX) : (b.minZ > centre ? b.minZ - centre : centre - b.maxZ)));
    assert.ok(Math.min(...inner) * 2 >= 1.6, `${bridge.to}: ancho útil ${(Math.min(...inner) * 2).toFixed(2)}`);
  }
});

test('el cristal de cada zona deja hueco solo donde llega un puente', () => {
  for (const zone of L.zones) {
    const boxes = railColliderBoxes(zoneRailSegments(zone, L.bridges));
    assert.ok(boxes.length > 0);
    for (const bridge of L.bridges) {
      const walk = { minX: bridge.x - bridge.w / 2 + 0.3, maxX: bridge.x + bridge.w / 2 - 0.3, minZ: bridge.z - bridge.d / 2 + 0.3, maxZ: bridge.z + bridge.d / 2 - 0.3 };
      for (const b of boxes) assert.ok(!boxesOverlap(walk, b), `${zone.id}: cristal sobre el puente a ${bridge.to}`);
    }
  }
});

/**
 * Recorre todo lo que se puede caminar (con todos los puentes abiertos) con un personaje de radio 0,3 m
 * y comprueba que, con los cristales y los objetos sólidos puestos, nunca llega a un punto sin suelo.
 */
test('los cristales no dejan huecos por donde caerse: desde cualquier punto alcanzable no se llega al vacío', () => {
  const floors = [...L.plazaBoxes, ...L.zones, ...L.bridges].map((p) => boxOf(p));
  const solids = [
    ...railColliderBoxes(plazaRailSegments(L)),
    ...L.zones.flatMap((z) => railColliderBoxes(zoneRailSegments(z, L.bridges))),
    ...L.bridges.flatMap((b) => railColliderBoxes(bridgeRailSegments(b))),
    { minX: -L.reactor.size / 2, maxX: L.reactor.size / 2, minZ: -L.reactor.size / 2, maxZ: L.reactor.size / 2 },
    // Portales: caja aproximada de su huella (3,3 m de ancho por 1,6 de fondo), girada según el ángulo.
    ...L.plazaPortals.map((p) => {
      const c = polar(p.angle, p.radius); const alongX = Math.abs(Math.sin(p.angle)) < 0.5;
      const hx = alongX ? 1.64 : 0.8; const hz = alongX ? 0.8 : 1.64;
      return { minX: c.x - hx, maxX: c.x + hx, minZ: c.z - hz, maxZ: c.z + hz };
    }),
    ...roundObstacles().filter((o) => !o.name.startsWith('portal')).map((o) => ({ minX: o.x - o.r * 0.7, maxX: o.x + o.r * 0.7, minZ: o.z - o.r * 0.7, maxZ: o.z + o.r * 0.7 })),
  ];
  const R = PHYSICS3D.RADIUS; const step = 0.2;
  const standing = (x, z) => floors.some((f) => x >= f.minX && x <= f.maxX && z >= f.minZ && z <= f.maxZ);
  const blocked = (x, z) => solids.some((b) => x + R > b.minX && x - R < b.maxX && z + R > b.minZ && z - R < b.maxZ);
  const key = (i, j) => `${i},${j}`;
  const start = [Math.round(L.spawn.x / step), Math.round(L.spawn.z / step)];
  const seen = new Set([key(...start)]);
  const queue = [start];
  const falls = [];
  while (queue.length) {
    const [i, j] = queue.pop();
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const ni = i + di; const nj = j + dj; const k = key(ni, nj);
      if (seen.has(k)) continue;
      const x = ni * step; const z = nj * step;
      if (blocked(x, z)) continue;
      seen.add(k);
      if (!standing(x, z)) { falls.push([x.toFixed(1), z.toFixed(1)]); continue; }
      queue.push([ni, nj]);
    }
  }
  assert.deepEqual(falls.slice(0, 5), [], `se puede caer al vacío en ${falls.length} puntos`);
  for (const zone of L.zones) assert.ok(seen.has(key(Math.round(zone.x / step), Math.round(zone.z / step))), `no se llega a ${zone.id}`);
});
