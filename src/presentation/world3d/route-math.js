// Camino del Mundo 1 como datos puros (T040, T041): en qué zona o puente está un punto, la lista ordenada de
// sitios seguros a lo largo del camino y a dónde se puede llevar al jugador. Sin three.js: se prueba en Node.
//
// Reglas (spec 006/FR-034): "llevarme al siguiente sitio seguro" solo avanza por el camino ya abierto y NUNCA
// entra a otra zona ni salta una zona: si el siguiente sitio está en otra zona o detrás de un puente cerrado,
// no hay destino y la opción no se ofrece.

const ENTRY_INSET = 2.5;      // metros hacia dentro de la zona (o de la sala) desde el borde del puente
const BRIDGE_FRACTIONS = [0.25, 0.75];
const MIN_AHEAD = 1.5;        // el destino debe quedar al menos a esta distancia, a lo largo del camino, por delante

/**
 * ¿Dónde está el punto? 'zone:<id>', 'bridge:<destino>', 'plaza' o null (vacío).
 * Las zonas ganan a los puentes y estos a la sala, porque se tocan en el borde.
 */
export function areaOf(layout, x, z) {
  for (const zone of layout.zones) {
    if (Math.abs(x - zone.x) <= zone.w / 2 && Math.abs(z - zone.z) <= zone.d / 2) return `zone:${zone.id}`;
  }
  for (const bridge of layout.bridges) {
    if (Math.abs(x - bridge.x) <= bridge.w / 2 && Math.abs(z - bridge.z) <= bridge.d / 2) return `bridge:${bridge.to}`;
  }
  const plaza = layout.plaza;
  if (Math.hypot(x - plaza.x, z - plaza.z) <= plaza.radius) return 'plaza';
  return null;
}

const isZoneArea = (area) => typeof area === 'string' && area.startsWith('zone:');

/**
 * Sitios seguros del camino, en orden: la sala, cada puente (dos puntos), la entrada y la salida de cada zona,
 * y la vuelta a la sala. `requiresOpen` es el puente (por su destino) que debe estar abierto para llegar ahí.
 * Cada sitio trae `s`, los metros recorridos a lo largo del camino hasta él.
 * @returns {{ id: string, area: string, x: number, y: number, z: number, requiresOpen: string | null, s: number }[]}
 */
export function buildRoute(layout) {
  const points = [{ id: 'plaza-start', area: 'plaza', x: layout.spawn.x, y: layout.plaza.top, z: layout.spawn.z, requiresOpen: null }];
  const centerOf = (id) => (id === 'plaza' ? layout.plaza : layout.zones.find((z) => z.id === id));
  let from = 'plaza';
  for (const bridge of layout.bridges) {
    const horizontal = bridge.w > bridge.d;
    const length = horizontal ? bridge.w : bridge.d;
    const axis = horizontal ? 'x' : 'z';
    const dest = centerOf(bridge.to);
    const dir = Math.sign(dest[axis] - centerOf(from)[axis]) || 1;
    const at = (along) => ({ x: horizontal ? bridge.x + dir * along : bridge.x, z: horizontal ? bridge.z : bridge.z + dir * along });
    const exitSpot = at(-length / 2 - ENTRY_INSET);
    const entrySpot = at(length / 2 + ENTRY_INSET);
    const fromTop = from === 'plaza' ? layout.plaza.top : centerOf(from).top;
    const fromArea = from === 'plaza' ? 'plaza' : `zone:${from}`;
    points.push({ id: `exit:${from}`, area: fromArea, ...exitSpot, y: fromTop, requiresOpen: bridge.to });
    BRIDGE_FRACTIONS.forEach((f, i) => {
      points.push({ id: `bridge:${bridge.to}:${i}`, area: `bridge:${bridge.to}`, ...at((f - 0.5) * length), y: bridge.top, requiresOpen: bridge.to });
    });
    const toArea = bridge.to === 'plaza' ? 'plaza' : `zone:${bridge.to}`;
    points.push({ id: `entry:${bridge.to}`, area: toArea, ...entrySpot, y: dest.top, requiresOpen: bridge.to });
    from = bridge.to;
  }
  let s = 0;
  return points.map((p, i) => {
    if (i > 0) s += Math.hypot(p.x - points[i - 1].x, p.z - points[i - 1].z);
    return { ...p, s };
  });
}

/** Metros recorridos a lo largo del camino por el punto más cercano a (x, z). */
export function routeProgress(route, x, z) {
  let best = { dist: Infinity, s: 0 };
  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1]; const b = route[i];
    const dx = b.x - a.x; const dz = b.z - a.z;
    const len2 = dx * dx + dz * dz;
    const t = len2 > 0 ? Math.max(0, Math.min(1, ((x - a.x) * dx + (z - a.z) * dz) / len2)) : 0;
    const dist = Math.hypot(x - (a.x + dx * t), z - (a.z + dz * t));
    if (dist < best.dist) best = { dist, s: a.s + Math.sqrt(len2) * t };
  }
  return best.s;
}

/**
 * Siguiente sitio seguro hacia adelante, o null si no hay uno permitido.
 * @param {object} options
 * @param {ReturnType<typeof buildRoute>} options.route
 * @param {object} options.layout
 * @param {{ x: number, z: number }} options.from Sitio seguro desde el que se falló.
 * @param {(bridgeTo: string) => boolean} options.isOpen ¿El puente que lleva a ese destino está abierto?
 */
export function nextSafeSpot({ route, layout, from, isOpen }) {
  const area = areaOf(layout, from.x, from.z);
  if (area === null) return null;
  const progress = routeProgress(route, from.x, from.z);
  for (const spot of route) {
    if (spot.s <= progress + MIN_AHEAD) continue;
    // El primer sitio por delante decide: si no se puede ir ahí, tampoco más lejos (nunca se salta nada).
    if (spot.requiresOpen && !isOpen(spot.requiresOpen)) return null;
    if (isZoneArea(spot.area) && spot.area !== area) return null;
    return { id: spot.id, area: spot.area, x: spot.x, y: spot.y, z: spot.z };
  }
  return null;
}

/**
 * Dónde reaparece el jugador al recargar (T041): la entrada de la zona en curso si su puente está abierto
 * y, en cualquier otro caso, la sala. Nunca sobre un puente ni en el vacío.
 * @param {object} options
 * @param {object} options.layout
 * @param {{ screen?: string, gateId?: string | null } | null} options.resume Punto de retorno guardado en la sesión.
 * @param {(bridgeTo: string) => boolean} options.isOpen
 * @returns {{ x: number, y: number, z: number, area: string }}
 */
export function spawnPoint({ layout, resume, isOpen }) {
  const plaza = { x: layout.spawn.x, y: layout.spawn.y, z: layout.spawn.z, area: 'plaza' };
  const zoneId = resume?.screen === 'gate' ? resume.gateId : null;
  if (!zoneId || !isOpen(zoneId)) return plaza;
  const entry = buildRoute(layout).find((p) => p.id === `entry:${zoneId}` && isZoneArea(p.area));
  return entry ? { x: entry.x, y: entry.y, z: entry.z, area: entry.area } : plaza;
}
