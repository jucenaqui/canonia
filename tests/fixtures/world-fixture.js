// Contenido de prueba con la misma forma de piezas y dependencias del Mundo 1
// (data-model.md, "Contenido del Mundo 1"). No es el contenido real: ese llega en T065.

export const PIECES = [
  { id: 'incomeSource', worldId: 'world-1', dependsOn: [] },
  { id: 'niche', worldId: 'world-1', dependsOn: ['incomeSource'] },
  { id: 'audience', worldId: 'world-1', dependsOn: ['niche'] },
  { id: 'timeAvailable', worldId: 'world-1', dependsOn: [] },
  { id: 'goal90Days', worldId: 'world-1', dependsOn: ['incomeSource', 'niche', 'timeAvailable'] },
];

export const GATES = PIECES.map((piece) => ({ id: piece.id, worldId: piece.worldId, pieceId: piece.id }));

export const CRITERIA = ['clarity', 'incomeFit', 'audienceFit', 'contentCapacity', 'differentiation', 'timeAndGoalCoherence'];

export const INTERESTS = ['cocina', 'plantas', 'viajes', 'música', 'deporte', 'tecnología', 'moda'];

export const CONTENT = {
  worlds: [{ id: 'world-1', criteria: CRITERIA, deduce: ['markets', 'platforms'] }],
  pieces: PIECES,
  gates: GATES,
  interests: INTERESTS,
};

/** Textos aprobables para cada pieza. */
export const SAMPLE_TEXT = {
  incomeSource: 'Contenido patrocinado por marcas',
  niche: 'Cocina casera rápida para gente de ciudad',
  audience: 'Personas de 25 a 35 años que cocinan poco',
  timeAvailable: 'Entre 5 y 10 horas a la semana',
  goal90Days: 'Publicar 3 veces por semana y llegar a 1000 seguidores',
};

export const NOW = '2026-11-17T12:00:00.000Z';
