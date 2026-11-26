// Chispas (T038, spec 006/FR-031; D48): cuándo se recogen y cuáles se ven. Sin three.js.

export const SPARK = Object.freeze({
  REACH: 0.75,        // distancia horizontal para recogerla
  CHEST: 0.75,        // altura del pecho sobre los pies
  VERTICAL: 0.9,      // diferencia de altura aceptada entre el pecho y la chispa
});

/** ¿El personaje toca la chispa? `spark.y` es la altura absoluta del centro. */
export function canCollect(body, spark) {
  return Math.hypot(body.x - spark.x, body.z - spark.z) <= SPARK.REACH
    && Math.abs(spark.y - (body.y + SPARK.CHEST)) <= SPARK.VERTICAL;
}

/**
 * Chispas que se dibujan: las no recogidas y cuyo puente (si lo piden) ya existe.
 * @param {{ id: string, requiresBridge?: string }[]} sparks
 * @param {Iterable<string>} collected ids ya recogidos (guardados en la sesión)
 * @param {Set<string>} openBridges
 */
export function visibleSparks(sparks, collected, openBridges) {
  const done = new Set(collected);
  return sparks.filter((s) => !done.has(s.id) && (!s.requiresBridge || openBridges.has(s.requiresBridge)));
}

/** Texto plano de un consejo por su índice, o null. */
export function tipText(tips, index) {
  return Number.isInteger(index) && index >= 0 && index < tips.length ? tips[index] : null;
}
