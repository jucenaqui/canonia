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

  pieceStatus: {
    pending: 'Pendiente',
    approved: 'Aprobada',
    needsReview: 'Por revisar',
  },
});
