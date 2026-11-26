// Distribución del Mundo 1, PIX Central (T017; D43, D44, D47).
// Una plaza central y cinco zonas en anillo, unidas por puentes que se abren al aprobar cada zona.
// Datos puros: el mundo 3D los convierte en plataformas. Medidas en metros; y es la altura de la cara superior.

/**
 * Cubre un círculo con franjas estrechas para chocar con él casi exactamente: cada franja llega
 * hasta el borde del círculo, así que el personaje no se cae donde se ve suelo.
 */
export function circleStrips(radius, width, top = 0) {
  const strips = [];
  for (let x = -radius + width / 2; x < radius; x += width) {
    const inner = Math.max(Math.abs(x) - width / 2, 0);
    const half = Math.sqrt(Math.max(0, radius * radius - inner * inner));
    strips.push({ x, z: 0, w: width, d: half * 2, top });
  }
  return strips;
}

export const WORLD_1_LAYOUT = Object.freeze({
  spawn: { x: 0, y: 0, z: 6 },
  /**
   * Sala circular de PIX Central (D56). `w` y `d` son el cuadrado que la contiene; para chocar se usan
   * `plazaBoxes`, franjas que cubren el círculo.
   */
  plaza: { id: 'plaza', x: 0, z: 0, radius: 9.3, w: 18.6, d: 18.6, top: 0 },
  plazaBoxes: circleStrips(9.3, 0.5),
  /** Ángulos (x = sen, z = cos) por donde salen los puentes de la sala: hacia -z y hacia +z. */
  plazaExits: [Math.PI, 0],
  /**
   * Portales del borde de la sala: puertas hacia los otros distritos (D56). Miran al centro y no
   * coinciden con las salidas de los puentes. `radius` es la distancia al centro hasta el eje del arco.
   */
  plazaPortals: [
    { id: 'districtEast', angle: Math.PI / 2, radius: 8.3 },
    { id: 'districtWest', angle: -Math.PI / 2, radius: 8.3 },
  ],
  /** Ángulos de las cápsulas con influencers (a 1,6 m del borde) y de las jardineras (a 2,4 m). */
  plazaCapsules: [0.95, Math.PI - 0.95, Math.PI + 0.95, Math.PI * 2 - 0.95],
  plazaPlanters: [0.45, Math.PI - 0.45, Math.PI + 0.45, Math.PI * 2 - 0.45],
  /** Gente de fondo: de pie, mirando a un punto de interés. Alturas entre 1,65 y 1,75 m. */
  plazaVisitors: [
    { model: 'visitante-a', height: 1.68, angle: 1.25, radius: 6.0, look: { x: 8.3, z: 0 } },
    { model: 'visitante-b', height: 1.74, angle: 1.85, radius: 6.2, look: { x: 0, z: 0 } },
    { model: 'visitante-a', height: 1.65, angle: -1.25, radius: 6.0, look: { x: -8.3, z: 0 } },
    { model: 'visitante-b', height: 1.72, angle: -1.85, radius: 6.2, look: { x: 0, z: 0 } },
    { model: 'visitante-a', height: 1.7, angle: Math.PI + 0.95, radius: 5.8, look: { x: Math.sin(Math.PI + 0.95) * 7.7, z: Math.cos(Math.PI + 0.95) * 7.7 } },
  ],

  /** Pantallas holográficas sobre las zonas, en su borde exterior y mirando a la zona. `y` es absoluta. */
  holoScreens: [
    { x: 0, y: 4, z: -32.2, look: { x: 0, z: -23 }, width: 4 },
    { x: 36.2, y: 4.5, z: -23, look: { x: 26, z: -23 }, width: 4 },
    { x: 36.2, y: 5, z: 1, look: { x: 26, z: 1 }, width: 4 },
    { x: 36.2, y: 5, z: 25, look: { x: 26, z: 25 }, width: 4 },
    { x: 0, y: 4.5, z: 34.2, look: { x: 0, z: 25 }, width: 4 },
  ],
  /** Cristales de borde (D58): altura y huecos (en radianes) que se dejan junto a salidas y portales. */
  rail: { height: 0.9, exitGap: 0.22, portalGap: 0.2, inset: 0.2 },
  /** Reactor holográfico en el centro de la sala (D56). */
  reactor: { x: 0, z: 0, size: 4.4 },
  /** Núcleo de PIX Central, flotando sobre la plaza. */
  core: { x: 14, y: 16, z: 0 },
  /** Una zona por pieza de F01, en el orden de la factoría. `id` coincide con el id de la pieza. */
  zones: [
    { id: 'incomeSource', x: 0, z: -23, w: 20, d: 18, top: 0.5 },
    { id: 'niche', x: 26, z: -23, w: 20, d: 18, top: 1 },
    { id: 'audience', x: 26, z: 1, w: 20, d: 18, top: 1.5 },
    { id: 'timeAvailable', x: 26, z: 25, w: 20, d: 18, top: 1.5 },
    { id: 'goal90Days', x: 0, z: 25, w: 20, d: 18, top: 1 },
  ],
  /**
   * Objetos con acción dentro de cada zona (T023). Entran por el puente del lado +z (a x = 0), así que el
   * pasillo central queda libre y los objetos van al fondo y a los lados. `kind` es 'option' (una opción de
   * la zona: su id es el de la opción en el contenido), 'other' ("Otra") o 'recommend' ("No sé, recomiéndame").
   * `height` es la altura del modelo; `solid` es el radio del choque (0 = no choca). El alcance del botón
   * de acción sale del aro de luz (ringRadius en zone-math.js), no se declara aquí.
   */
  zoneObjects: {
    incomeSource: [
      { id: 'ugc', kind: 'option', model: 'maquina-ugc', x: -8.4, z: -26.2, height: 1.9, solid: 1.0 },
      { id: 'affiliate', kind: 'option', model: 'maquina-afiliados', x: -4.4, z: -27.6, height: 2.4, solid: 0.8 },
      { id: 'digital', kind: 'option', model: 'maquina-digitales', x: 0, z: -28.2, height: 2.0, solid: 0.8 },
      { id: 'subscriptions', kind: 'option', model: 'maquina-suscripciones', x: 4.4, z: -27.6, height: 2.1, solid: 1.0 },
      { id: 'sponsorships', kind: 'option', model: 'maquina-patrocinios', x: 8.4, z: -26.2, height: 2.3, solid: 0.9 },
      { id: 'other', kind: 'other', model: 'terminal', x: -7.4, z: -19, height: 1.5, solid: 0.5 },
      { id: 'recommend', kind: 'recommend', model: 'maquina-recomendar', x: 7.4, z: -19, height: 1.8, solid: 0.8 },
    ],
  },
  /**
   * Chispas repartidas por el mundo (T038, D48). `y` es la altura absoluta del centro: las de 0,9 m sobre el suelo
   * se recogen caminando y las de 1,9 m o más piden un salto. `requiresBridge`: solo se ve si ese puente ya está
   * abierto. El id es estable: la sesión guarda los recogidos y no reaparecen.
   */
  sparks: [
    { id: 'plaza-1', x: 3.2, z: 4, y: 0.9 },
    { id: 'plaza-2', x: 4.2, z: -3, y: 0.9 },
    { id: 'plaza-3', x: -4.2, z: 0, y: 1.9 },
    { id: 'plaza-4', x: 0, z: -7.2, y: 0.9 },
    { id: 'plaza-5', x: -2.4, z: 7, y: 0.9 },
    { id: 'plaza-6', x: -5.5, z: -7.5, y: 0.9 },
    { id: 'bridge1-1', x: 0, z: -10.8, y: 1.15 },
    { id: 'bridge1-2', x: 0, z: -12.4, y: 2.15 },
    { id: 'income-1', x: -3.5, z: -22, y: 1.4 },
    { id: 'income-2', x: 3.5, z: -22, y: 1.4 },
    { id: 'income-3', x: 0, z: -24.5, y: 2.4 },
    { id: 'income-4', x: -8.5, z: -15.5, y: 1.4 },
    { id: 'income-5', x: 8.5, z: -15.5, y: 1.4 },
    { id: 'income-6', x: -9, z: -22.5, y: 1.4 },
    { id: 'income-7', x: 9, z: -22.5, y: 1.4 },
    { id: 'income-8', x: -1.5, z: -17.5, y: 1.4 },
    { id: 'income-9', x: 1.5, z: -17.5, y: 1.4 },
    { id: 'bridge2-1', x: 13, z: -23, y: 1.65, requiresBridge: 'niche' },
    { id: 'plaza-7', x: -2.2, z: -6.2, y: 0.9 },
    { id: 'income-10', x: -6, z: -29.5, y: 1.4 },
  ],
  /**
   * Dron de spam (T036, D49): recorrido fijo de ida y vuelta. Va por el oeste de la sala, a 4 m del eje por el que
   * se cruza de la entrada a la salida norte, y no cierra ningún puente. `base` es la altura del dron sobre el suelo.
   */
  enemies: [
    { id: 'spam-plaza', model: 'spam', height: 1.1, base: 0.4, speed: 2.1, pause: 0.8, path: [{ x: -4.2, z: 5.5 }, { x: -4.2, z: -5.5 }], respawnSeconds: 60 },
  ],
  /**
   * Puentes en orden: el primero va de la plaza a la primera zona y está abierto desde el inicio;
   * `opensAfter` es la zona que hay que aprobar para que aparezca. Miden 3,2 m de ancho y de 5 a 7 m de
   * largo, y tocan las dos orillas. El último baja de la última zona a la sala: desde la sala se sube
   * caminando (0,3 m) y desde la zona se baja.
   */
  bridges: [
    { to: 'incomeSource', opensAfter: null, x: 0, z: -11.5, w: 3.2, d: 5, top: 0.25 },
    { to: 'niche', opensAfter: 'incomeSource', x: 13, z: -23, w: 6, d: 3.2, top: 0.75 },
    { to: 'audience', opensAfter: 'niche', x: 26, z: -11, w: 3.2, d: 6, top: 1.25 },
    { to: 'timeAvailable', opensAfter: 'audience', x: 26, z: 13, w: 3.2, d: 6, top: 1.5 },
    { to: 'goal90Days', opensAfter: 'timeAvailable', x: 13, z: 25, w: 6, d: 3.2, top: 1.25 },
    { to: 'plaza', opensAfter: 'goal90Days', x: 0, z: 12.5, w: 3.2, d: 7, top: 0.3 },
  ],
});

/** Caja de colisión de un rectángulo del plano con su grosor. */
export function boxOf({ x, z, w, d, top }, thickness = 0.8) {
  return { minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, minY: top - thickness, maxY: top };
}

// --- Cristales de borde (T050/T051, D58) -------------------------------------------------------------
// Cada tramo es un segmento recto {x1, z1, x2, z2, y}. Los datos de las barandas salen de la
// distribución, así las pruebas comprueban que ninguna cierra una salida.

/** Parte un segmento en tramos de como mucho `maxLength` metros. */
export function splitSegment(x1, z1, x2, z2, y, maxLength = 3) {
  const parts = Math.max(1, Math.ceil(Math.hypot(x2 - x1, z2 - z1) / maxLength));
  const out = [];
  for (let i = 0; i < parts; i++) {
    const a = i / parts; const b = (i + 1) / parts;
    out.push({ x1: x1 + (x2 - x1) * a, z1: z1 + (z2 - z1) * a, x2: x1 + (x2 - x1) * b, z2: z1 + (z2 - z1) * b, y });
  }
  return out;
}

/** Cristal en el borde de la sala: un anillo con huecos junto a las salidas de los puentes y a los portales. */
export function plazaRailSegments(layout = WORLD_1_LAYOUT, step = 0.1) {
  const { radius, top } = layout.plaza;
  const r = radius - layout.rail.inset;
  const gaps = [
    ...layout.plazaExits.map((angle) => ({ angle, half: layout.rail.exitGap })),
    ...layout.plazaPortals.map((p) => ({ angle: p.angle, half: layout.rail.portalGap })),
  ].map((g) => ({ ...g, angle: ((g.angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) })).sort((a, b) => a.angle - b.angle);
  const segments = [];
  for (let i = 0; i < gaps.length; i++) {
    const from = gaps[i].angle + gaps[i].half;
    let to = gaps[(i + 1) % gaps.length].angle - gaps[(i + 1) % gaps.length].half;
    if (to <= from) to += Math.PI * 2;
    const n = Math.max(1, Math.ceil((to - from) / step));
    for (let k = 0; k < n; k++) {
      const a = from + ((to - from) * k) / n; const b = from + ((to - from) * (k + 1)) / n;
      segments.push({ x1: Math.sin(a) * r, z1: Math.cos(a) * r, x2: Math.sin(b) * r, z2: Math.cos(b) * r, y: top });
    }
  }
  return segments;
}

/** Cristales a los dos lados de un puente. */
export function bridgeRailSegments(bridge, inset = 0.1) {
  const { x, z, w, d, top } = bridge;
  if (d >= w) {
    return [-1, 1].flatMap((s) => splitSegment(x + s * (w / 2 - inset), z - d / 2, x + s * (w / 2 - inset), z + d / 2, top));
  }
  return [-1, 1].flatMap((s) => splitSegment(x - w / 2, z + s * (d / 2 - inset), x + w / 2, z + s * (d / 2 - inset), top));
}

/** Cristal en el contorno de una zona, con hueco donde llega un puente. */
export function zoneRailSegments(zone, bridges = WORLD_1_LAYOUT.bridges, inset = 0.2) {
  const { x, z, w, d, top } = zone;
  const x0 = x - w / 2 + inset; const x1 = x + w / 2 - inset;
  const z0 = z - d / 2 + inset; const z1 = z + d / 2 - inset;
  const sides = [
    { axis: 'x', fixed: z0, lo: x0, hi: x1, edge: z - d / 2 },
    { axis: 'x', fixed: z1, lo: x0, hi: x1, edge: z + d / 2 },
    { axis: 'z', fixed: x0, lo: z0, hi: z1, edge: x - w / 2 },
    { axis: 'z', fixed: x1, lo: z0, hi: z1, edge: x + w / 2 },
  ];
  const segments = [];
  for (const side of sides) {
    // Huecos: los puentes que tocan este lado, con 0,1 m de margen.
    const holes = bridges.map((b) => {
      const bMin = side.axis === 'x' ? b.z - b.d / 2 : b.x - b.w / 2;
      const bMax = side.axis === 'x' ? b.z + b.d / 2 : b.x + b.w / 2;
      if (side.edge < bMin - 0.3 || side.edge > bMax + 0.3) return null;
      const lo = side.axis === 'x' ? b.x - b.w / 2 : b.z - b.d / 2;
      const hi = side.axis === 'x' ? b.x + b.w / 2 : b.z + b.d / 2;
      return lo > side.hi || hi < side.lo ? null : [lo - 0.1, hi + 0.1];
    }).filter(Boolean).sort((a, b) => a[0] - b[0]);
    let cursor = side.lo;
    for (const [lo, hi] of [...holes, [side.hi, side.hi]]) {
      if (lo > cursor + 0.05) {
        segments.push(...(side.axis === 'x' ? splitSegment(cursor, side.fixed, lo, side.fixed, top) : splitSegment(side.fixed, cursor, side.fixed, lo, top)));
      }
      cursor = Math.max(cursor, hi);
    }
  }
  return segments;
}

/**
 * Cajas de choque de un cristal (mismo formato que `boxOf`): tan altas como el cristal (0,9 m, D59), así que con
 * un salto se puede pasar por encima y caer. Un tramo recto alineado con un eje es una sola caja; uno en diagonal (el anillo de
 * la sala) se reparte en cajas pequeñas de unos 0,3 m.
 */
export function railColliderBoxes(segments, height = WORLD_1_LAYOUT.rail.height, piece = 0.3) {
  const boxes = [];
  const pad = 0.12;
  for (const s of segments) {
    const dx = Math.abs(s.x2 - s.x1); const dz = Math.abs(s.z2 - s.z1);
    if (dx < 1e-6 || dz < 1e-6) {
      boxes.push({ minX: Math.min(s.x1, s.x2) - pad, maxX: Math.max(s.x1, s.x2) + pad, minZ: Math.min(s.z1, s.z2) - pad, maxZ: Math.max(s.z1, s.z2) + pad, minY: s.y - 1, maxY: s.y + height });
      continue;
    }
    const parts = Math.max(1, Math.ceil(Math.hypot(dx, dz) / piece));
    for (let i = 0; i < parts; i++) {
      const t = (i + 0.5) / parts;
      const cx = s.x1 + (s.x2 - s.x1) * t; const cz = s.z1 + (s.z2 - s.z1) * t;
      boxes.push({ minX: cx - dx / parts / 2 - pad, maxX: cx + dx / parts / 2 + pad, minZ: cz - dz / parts / 2 - pad, maxZ: cz + dz / parts / 2 + pad, minY: s.y - 1, maxY: s.y + height });
    }
  }
  return boxes;
}

/** Posición en la sala de un punto dado por ángulo y distancia al centro (x = sen, z = cos). */
export const polar = (angle, radius) => ({ x: Math.sin(angle) * radius, z: Math.cos(angle) * radius });
