// Cálculos puros de las zonas con acción (T023): qué zona pisa el personaje y qué objeto tiene a su alcance.
// Sin three.js, para poder probarlos en Node.

/** Zona (del layout) que pisa el personaje, con un margen dentro de su borde, o null. */
export function zoneAt(zones, x, z, margin = 0.5) {
  return zones.find((zone) => (
    Math.abs(x - zone.x) <= zone.w / 2 - margin && Math.abs(z - zone.z) <= zone.d / 2 - margin
  )) ?? null;
}

/** Radio del aro de luz que rodea a un objeto: lo dibuja zone-runtime y de él sale el alcance. */
export function ringRadius(object) {
  return Math.max(object.solid ?? 0, 0.5) + 0.55;
}

/** Margen sobre el aro dentro del cual el objeto ya se enfoca (el avatar está en la máquina, no cerca). */
export const RING_REACH_MARGIN = 0.25;

/** Distancia horizontal máxima del avatar al centro del objeto para enfocarlo. */
export function reachOf(object) {
  return ringRadius(object) + RING_REACH_MARGIN;
}

/** Objeto a su alcance más cercano (o null): el avatar debe estar dentro o sobre su aro de luz. */
export function nearestObject(objects, x, z) {
  let best = null; let bestDistance = Infinity;
  for (const object of objects) {
    const distance = Math.hypot(object.x - x, object.z - z);
    if (distance <= reachOf(object) && distance < bestDistance) { best = object; bestDistance = distance; }
  }
  return best;
}

/** Texto del botón de acción de un objeto, con el nombre de lo que hace (006/FR-014). */
export function actionLabel(object, content, texts) {
  const t = texts.zone;
  if (object.kind === 'other') return t.actionOther;
  if (object.kind === 'recommend') return t.actionRecommend;
  const option = content.options.find((o) => o.id === object.id);
  return option ? `${t.actionSheet} ${option.name}` : null;
}

/** Lo que dice PIX al acercarse: la frase de la opción, o la de "Otra" / "Recomiéndame". */
export function focusLine(object, content) {
  if (object.kind === 'other') return content.other.short;
  if (object.kind === 'recommend') return content.recommend.short;
  return content.options.find((o) => o.id === object.id)?.short ?? '';
}

/** Caja de choque de un objeto sólido, o null si no choca. */
export function solidBox(object, top) {
  if (!object.solid) return null;
  return { minX: object.x - object.solid, maxX: object.x + object.solid, minZ: object.z - object.solid, maxZ: object.z + object.solid, minY: top - 1, maxY: top + object.height };
}

/** Memoria de frases "ya dichas": cada clave se dice una sola vez por partida (no se guarda en disco). */
export function createSpokenSet() {
  const spoken = new Set();
  return { has: (key) => spoken.has(key), add: (key) => { spoken.add(key); } };
}

/**
 * Memoria del último objeto enfocado (D62): PIX explica un objeto al acercarse, salvo que sea el mismo
 * del último foco (cerrar su pantalla o quedarse junto a él no repite). Al enfocar otro, el anterior
 * vuelve a poder sonar.
 */
export function createFocusMemory() {
  let last = null;
  return {
    /** true si hay que decir la frase de este objeto; lo anota como último foco. */
    shouldSay(key) { if (key === last) return false; last = key; return true; },
    get last() { return last; },
  };
}

/** Presentación de una zona (D62): solo la primera vez, si tiene frase y no está ya aprobada. */
export function shouldPresentZone({ seen, approved, hasIntro }) {
  return Boolean(hasIntro) && !approved && !seen;
}

/**
 * Cómo arranca la presentación según el audio: 'voice' (suena ya), 'ask' (falta el primer toque: se ofrece
 * "Escuchar a PIX" o "Leer") o 'card' (silenciado o sin soporte: solo texto).
 */
export function introMode({ muted, unlocked, supported }) {
  if (muted || !supported) return 'card';
  return unlocked ? 'voice' : 'ask';
}

/** PIX dice "ya la probaste" una sola vez por opción, si quedó jugada y no elegida, y el cierre del minijuego no habló. */
export function shouldSayPlayed({ played, chosen, closeSpoke, alreadySaid }) {
  return Boolean(played) && !chosen && !closeSpoke && !alreadySaid;
}
