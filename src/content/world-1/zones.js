// Zonas del Mundo 1 en la forma que usa la aplicación (ZoneContent, ver src/application/zone-flow.js).
// El contenido de cada zona se escribe una vez, con la forma que lee la pantalla (zone-income.js), y
// aquí se convierte de forma explícita a la forma de la aplicación. Datos y conversión pura: sin
// importar la aplicación.
//
// Reglas de la conversión:
//   - Niveles 1, 2, 3 → 'low', 'medium', 'high'.
//   - sheet.fields sale de la ficha con las claves de sheetFields; examples, de los dos ejemplos.
//   - "Sin pesos ocultos": de los pesos de cada respuesta de "Recomiéndame" solo se usa CUÁLES
//     criterios cuentan (peso distinto de 0). Su tamaño no se usa; todos los criterios valen lo mismo.
//     El signo de un peso debe coincidir con `better` del criterio (lo comprueba la prueba).
//   - nextZoneId sale de los puentes del layout: el que se abre al aprobar esta zona.

import { INCOME_ZONE } from './zone-income.js';
import { WORLD_1_LAYOUT } from './layout.js';

export const WORLD_1_ID = 'world-1';

const LEVEL_IDS = Object.freeze({ 1: 'low', 2: 'medium', 3: 'high' });

/**
 * Frase del porqué cuando una opción es buena en ese criterio (la usa el borrador de la recomendación).
 * Es la lectura directa de cada criterio de F01; no añade ningún dato nuevo.
 */
const STRENGTHS = Object.freeze({
  speed: 'se puede empezar pronto',
  audience: 'pide poca audiencia',
  effort: 'pide poco esfuerzo',
  growth: 'puede crecer mucho',
});

/** Id de la pregunta jugada de "Recomiéndame" en la forma de la aplicación. */
export const RECOMMEND_QUESTION_ID = 'timing';

/** Zona que se abre al aprobar `zoneId`, según los puentes del layout. */
export function nextZoneOf(zoneId, layout = WORLD_1_LAYOUT) {
  const bridge = layout.bridges.find((b) => b.opensAfter === zoneId && b.to !== 'plaza');
  return bridge ? bridge.to : null;
}

/** Nivel 1 a 3 → 'low' | 'medium' | 'high'. Un valor desconocido lanza: el contenido está mal. */
export function levelId(value) {
  const level = LEVEL_IDS[value];
  if (!level) throw new Error(`Nivel de criterio fuera de 1 a 3: ${value}`);
  return level;
}

/**
 * Convierte el contenido de una zona (forma de la pantalla) a ZoneContent (forma de la aplicación).
 * @param {typeof INCOME_ZONE} zone
 * @param {{ layout?: object, questionId?: string }} [options]
 */
export function toZoneContent(zone, { layout = WORLD_1_LAYOUT, questionId = RECOMMEND_QUESTION_ID } = {}) {
  const criteria = zone.criteriaKeys.map(({ key, label, better }) => ({
    id: key, label, better, ...(STRENGTHS[key] ? { strength: STRENGTHS[key] } : {}),
  }));
  const options = zone.options.map((option) => ({
    id: option.id,
    text: option.name,
    sheet: {
      fields: Object.fromEntries(zone.sheetFields.map(({ key }) => [key, option.sheet[key]])),
      examples: [...option.examples],
    },
    ...(option.play?.lessonId ? { minigame: { lessonId: option.play.lessonId } } : {}),
    ratings: Object.fromEntries(zone.criteriaKeys.map(({ key }) => [key, levelId(option.criteria[key])])),
  }));
  const recommend = zone.recommend;
  return {
    zoneId: zone.zoneId,
    question: zone.question,
    instruction: zone.instruction ?? zone.question,
    nextZoneId: nextZoneOf(zone.zoneId, layout),
    introTextId: `${zone.zoneId}.intro`,
    sheetFields: zone.sheetFields.map(({ key, label }) => ({ id: key, label })),
    criteria,
    options,
    ...(recommend ? {
      recommendation: {
        question: {
          id: questionId,
          prompt: recommend.question,
          answers: recommend.answers.map(({ id, label, weights }) => ({
            id,
            label,
            focus: zone.criteriaKeys.map(({ key }) => key).filter((key) => (weights?.[key] ?? 0) !== 0),
          })),
        },
      },
    } : {}),
  };
}

/** Contenido de pantalla de cada zona del Mundo 1 que ya existe, por id. */
export const WORLD_1_ZONE_SCREENS = Object.freeze({ [INCOME_ZONE.zoneId]: INCOME_ZONE });

/** Contenido de cada zona del Mundo 1 en la forma de la aplicación, por id. */
export const WORLD_1_ZONE_CONTENT = Object.freeze(Object.fromEntries(
  Object.values(WORLD_1_ZONE_SCREENS).map((zone) => [zone.zoneId, toZoneContent(zone)]),
));

/**
 * Textos que la aplicación pide decir a PIX con `say { textId }`. Ids con la forma `zona.clave`.
 * @returns {string | null}
 */
export function zoneText(textId) {
  const [zoneId, key] = String(textId).split('.');
  const zone = WORLD_1_ZONE_SCREENS[zoneId];
  if (!zone) return null;
  if (key === 'intro') return zone.intro ?? null;
  return zone.pix?.[key] ?? null;
}

/**
 * Lo que necesita la sesión del Mundo 1 (data-model.md de 005, "Contenido del Mundo 1"):
 * piezas con sus dependencias, una puerta por pieza (comparte id con su zona) y los criterios del jefe.
 */
export const WORLD_1_PIECES = Object.freeze([
  { id: 'incomeSource', worldId: WORLD_1_ID, dependsOn: [] },
  { id: 'niche', worldId: WORLD_1_ID, dependsOn: ['incomeSource'] },
  { id: 'audience', worldId: WORLD_1_ID, dependsOn: ['niche'] },
  { id: 'timeAvailable', worldId: WORLD_1_ID, dependsOn: [] },
  { id: 'goal90Days', worldId: WORLD_1_ID, dependsOn: ['incomeSource', 'niche', 'timeAvailable'] },
]);

export const WORLD_1_CRITERIA = Object.freeze(['clarity', 'incomeFit', 'audienceFit', 'contentCapacity', 'differentiation', 'timeAndGoalCoherence']);

/** Nombre de cada pieza del Mundo 1 para el jugador (zonas del diseño, docs/diseno/mundo-1-zonas.md). */
export const WORLD_1_PIECE_NAMES = Object.freeze({
  incomeSource: 'Fuente de ingreso',
  niche: 'Nicho',
  audience: 'Audiencia',
  timeAvailable: 'Tiempo disponible',
  goal90Days: 'Objetivo a 90 días',
});
