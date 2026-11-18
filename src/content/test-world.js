// Mundo de prueba para las fases 3 y 4: un tramo con dos puertas, para jugar el motor y el flujo
// de una puerta en modo de demostración. NO es el Mundo 1: su contenido real (sacado de la fase
// F01 de la factoría) llega con T065 a T072, y este archivo se retira al integrarlo (T076).

export const TEST_WORLD_ID = 'world-test';

/** Tramo en casillas (ver buildLevel en presentation/engine/level.js). */
export const testLevel = {
  id: 'test-segment',
  worldId: TEST_WORLD_ID,
  rows: 13,
  groundRow: 10,
  spawn: { col: 2 },
  ground: [[0, 20], [24, 49], [54, 88]],
  posts: [
    { col: 11, row: 7, width: 4 },
    { col: 16, row: 5, width: 3 },
    { col: 21, row: 8, width: 2 },
    { col: 30, row: 7, width: 3 },
    { col: 44, row: 7, width: 3 },
    { col: 48, row: 5, width: 3 },
    { col: 51, row: 7, width: 2 },
    { col: 62, row: 7, width: 4 },
    { col: 67, row: 5, width: 3 },
  ],
  blocks: [
    { col: 34, row: 8, width: 2, height: 2 },
    { col: 58, row: 9, width: 1, height: 1 },
  ],
  checkpoints: [{ col: 26 }, { col: 56 }],
  gates: [
    { col: 40, gateId: 'incomeSource' },
    { col: 76, gateId: 'niche' },
  ],
  end: { col: 86 },
};

/** Contenido que necesita la sesión (application/game-session.js). */
export const testSessionContent = {
  worlds: [{ id: TEST_WORLD_ID, criteria: [] }],
  pieces: [
    { id: 'incomeSource', worldId: TEST_WORLD_ID, dependsOn: [] },
    { id: 'niche', worldId: TEST_WORLD_ID, dependsOn: ['incomeSource'] },
  ],
  gates: [
    { id: 'incomeSource', worldId: TEST_WORLD_ID, pieceId: 'incomeSource' },
    { id: 'niche', worldId: TEST_WORLD_ID, pieceId: 'niche' },
  ],
  interests: ['cocina', 'plantas', 'viajes', 'música', 'deporte', 'tecnología', 'moda', 'mascotas'],
};

/** Textos de las puertas de prueba. Provisionales: los definitivos salen de la factoría (T067, T069). */
export const testGates = {
  incomeSource: {
    title: '¿Cómo ganará dinero tu influencer al principio?',
    lesson: {
      text: 'Antes de elegir el tema, conviene saber de dónde saldrán los primeros ingresos. Cada camino pide un tipo de contenido distinto.',
      example: 'Ejemplo: si vas a recomendar productos con un enlace, tu contenido tendrá que mostrar cosas que la gente quiera comprar.',
    },
    tips: ['Un solo camino al principio es más fácil de sostener que varios a la vez.'],
    instruction: 'Elige y explica tres de las fuentes de ingreso permitidas que mejor encajen con los intereses de la persona.',
    fixedChoices: {
      values: ['Colaboraciones con marcas', 'Enlaces de afiliado', 'Productos digitales propios', 'Suscripciones de seguidores'],
    },
  },
  niche: {
    title: '¿De qué tratará tu influencer?',
    lesson: {
      text: 'El nicho es el tema central. Uno claro ayuda a que la gente sepa qué esperar y a que tú tengas ideas para publicar.',
      example: 'Ejemplo: "cocina" es muy amplio; "cocina rápida para gente que vive sola en la ciudad" es un nicho.',
    },
    tips: ['Un buen nicho une algo que te interesa con algo que otras personas buscan.'],
    instruction: 'Propón tres nichos distintos para el influencer, coherentes con su fuente de ingreso y con los intereses de la persona.',
    extrasWanted: ['publicLabel'],
  },
};
