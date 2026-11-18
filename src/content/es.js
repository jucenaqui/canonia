// Textos comunes del jugador, en español (T022). Constitución, principio VII; 002/FR-044.
// El código usa las claves; nunca muestra mensajes técnicos (002/FR-040).
// Los textos de cada mundo (lecciones, datos útiles, jefe) viven en su carpeta de contenido.
// El personaje que explica los errores todavía no tiene nombre (pregunta abierta 1): se le llama "tu guía".

export const es = Object.freeze({
  game: {
    title: 'Canonia',
    tagline: 'Crea tu influencer',
  },

  buttons: {
    start: 'Empezar',
    continue: 'Continuar mi partida',
    startOver: 'Empezar de nuevo',
    confirmStartOver: 'Sí, borrar y empezar de nuevo',
    cancel: 'Cancelar',
    approve: 'Aprobar',
    close: 'Cerrar',
    skipLesson: 'Saltar la lección',
    seeOptions: 'Ver opciones',
    otherOptions: 'Pedir otras opciones',
    previousOptions: 'Ver las anteriores',
    recommend: 'No sé, recomiéndame',
    writeOwn: 'Escribir mi respuesta',
    edit: 'Editar',
    retry: 'Reintentar',
    exitGate: 'Salir y volver después',
    inventory: 'Inventario',
    pause: 'Pausa',
    resume: 'Seguir jugando',
    copyQuestion: 'Copiar pregunta',
    checkAnswer: 'Revisar respuesta',
  },

  notices: {
    demoMode: 'Modo de demostración: las propuestas son ejemplos, no vienen de una IA.',
    savedHere: 'Tu partida se guarda solo en este navegador y en este dispositivo. Si borras los datos del navegador, se pierde.',
    cannotSave: 'Este navegador no me deja guardar tu partida. Puedes seguir jugando, pero si cierras o recargas la página, empezarás de cero.',
    savedGameUnreadable: 'Encontré una partida guardada que no puedo leer. No la borré. Puedes empezar una nueva.',
    savedGameOtherVersion: 'Tu partida guardada es de otra versión del juego. No la borré. Puedes empezar una nueva.',
    confirmStartOver: 'Se borrará tu partida guardada en este navegador. No se puede deshacer.',
    copied: 'Pregunta copiada.',
    copyFallback: 'No pude copiarla sola. Mantén el dedo sobre el texto, elige "Seleccionar todo" y cópialo.',
  },

  guide: {
    why: 'Tu cuenta no me deja usar la IA dentro del juego. No pasa nada: te doy la pregunta, la pegas en la IA que prefieras y me traes su respuesta.',
    privacy: 'La pregunta incluye tus decisiones del juego. Se la darás a la IA que tú elijas.',
    steps: [
      'Toca "Copiar pregunta".',
      'Abre una IA de chat (por ejemplo, el chat de Claude), pega la pregunta y envíala.',
      'Copia toda la respuesta, vuelve aquí y pégala abajo.',
    ],
    pasteLabel: 'Pega aquí la respuesta de la IA',
  },

  validation: {
    tooShort: 'Escribe un poco más: con una o dos letras no puedo guardarlo.',
    tooLong: 'Es un texto largo. Intenta decirlo en menos palabras.',
    invalidOrigin: 'No pude guardar esa elección. Inténtalo otra vez.',
    interestsTooFew: 'Elige al menos 3 intereses.',
    interestsTooMany: 'Elige como máximo 5 intereses.',
    customInterestInvalid: 'Tu interés escrito debe tener entre 2 y 40 letras.',
  },

  /** Errores de la IA explicados por tu guía, según su motivo (contracts/puertos.md). */
  aiErrors: {
    unavailable: 'No puedo usar la IA aquí. Vamos con el modo guía, o escribe tu propia respuesta.',
    busy: 'La IA está atendiendo a mucha gente. Espera un momento y vuelve a intentarlo.',
    failed: 'La respuesta de la IA se perdió por el camino. ¿Lo intentamos otra vez?',
    badAnswer: 'No encontré las opciones en esa respuesta. Pide a la IA que conteste solo con el bloque que indica la pregunta, y pega toda su respuesta.',
  },

  start: {
    lead: 'Recorre el mundo, abre cada puerta y decide con ayuda de la IA. Al final tendrás las primeras piezas de tu influencer.',
  },

  pause: {
    title: 'Pausa',
    hint: 'El juego está detenido. Sigue cuando quieras: no hay prisa.',
  },

  gate: {
    eyebrow: 'Puerta de decisión',
    example: 'Ejemplo:',
    thinking: 'Pensando opciones para ti…',
    tip: 'Mientras tanto:',
    options: 'Opciones',
    recommended: 'Recomendada',
    pros: 'A favor:',
    risks: 'Ojo con:',
    yourChoice: 'Tu elección',
    editHint: 'Puedes cambiar el texto antes de aprobar. Nada se guarda hasta que toques "Aprobar".',
    publicLabel: 'Etiqueta pública',
    publicLabelHint: 'Cómo lo presentarás en pocas palabras (de 2 a 40 letras).',
    labelRequired: 'Escribe una etiqueta pública de 2 a 40 letras.',
    recommendation: 'Te recomiendo:',
    recommendationFromAnswer: 'La IA la marcó como recomendada:',
    hidePrevious: 'Ocultar las anteriores',
    ownTitle: 'Tu respuesta',
    checkOwn: 'Revisar mi respuesta',
    commentTitle: 'Un comentario (puedes aprobar igual):',
    backToOptions: 'Volver a las opciones',
    approved: '¡Guardado en tu inventario!',
  },

  levelEnd: {
    title: 'Fin del tramo de prueba',
    text: 'Aquí estará el jefe del mundo. Este tramo es de prueba: el Mundo 1 completo llega en las próximas fases.',
    again: 'Volver a empezar el tramo',
  },

  pieceStatus: {
    pending: 'Pendiente',
    approved: 'Aprobada',
    needsReview: 'Por revisar',
  },
});
