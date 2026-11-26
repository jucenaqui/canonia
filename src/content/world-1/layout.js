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
  /** Reactor holográfico en el centro de la sala (D56). */
  reactor: { x: 0, z: 0, size: 4.4 },
  /** Núcleo de PIX Central, flotando sobre la plaza. */
  core: { x: 9, y: 14, z: 0 },
  /** Una zona por pieza de F01, en el orden de la factoría. `id` coincide con el id de la pieza. */
  zones: [
    { id: 'incomeSource', x: 0, z: -19, w: 12, d: 11, top: 0.5 },
    { id: 'niche', x: 19, z: -19, w: 12, d: 11, top: 1 },
    { id: 'audience', x: 19, z: 0, w: 12, d: 11, top: 1.5 },
    { id: 'timeAvailable', x: 19, z: 19, w: 12, d: 11, top: 1.5 },
    { id: 'goal90Days', x: 0, z: 19, w: 12, d: 11, top: 1 },
  ],
  /**
   * Puentes en orden: el primero va de la plaza a la primera zona y está abierto desde el inicio;
   * `opensAfter` es la zona que hay que aprobar para que aparezca.
   */
  bridges: [
    { to: 'incomeSource', opensAfter: null, x: 0, z: -11.4, w: 2.6, d: 4.6, top: 0.25 },
    { to: 'niche', opensAfter: 'incomeSource', x: 9.5, z: -19, w: 8, d: 2.6, top: 0.75 },
    { to: 'audience', opensAfter: 'niche', x: 19, z: -9.5, w: 2.6, d: 8, top: 1.25 },
    { to: 'timeAvailable', opensAfter: 'audience', x: 19, z: 9.5, w: 2.6, d: 8, top: 1.5 },
    { to: 'goal90Days', opensAfter: 'timeAvailable', x: 9.5, z: 19, w: 8, d: 2.6, top: 1.25 },
    { to: 'plaza', opensAfter: 'goal90Days', x: 0, z: 11.4, w: 2.6, d: 4.6, top: 0.5 },
  ],
});

/** Caja de colisión de un rectángulo del plano con su grosor. */
export function boxOf({ x, z, w, d, top }, thickness = 0.8) {
  return { minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, minY: top - thickness, maxY: top };
}
