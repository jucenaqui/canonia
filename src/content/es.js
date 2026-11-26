// Textos comunes del jugador, en español (T022). Constitución, principio VII; 002/FR-044.
// El código usa las claves; nunca muestra mensajes técnicos (002/FR-040).
// Los textos de cada mundo (lecciones, datos útiles, jefe) viven en su carpeta de contenido.
// Quien explica los errores y acompaña es PIX, el guía (D41). Tono para adultos: directo, sin infantilizar.

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
    lead: 'La fábrica está apagada. Recórrela, abre cada puerta y decide con ayuda de la IA: con cada decisión se enciende un sector y tu influencer toma forma.',
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

  /** Zonas de decisión del mundo 3D (T024): ficha, aprobación y "Otra". */
  zone: {
    eyebrow: 'Zona de decisión',
    sheetEyebrow: 'Ficha',
    examples: 'Dos ejemplos',
    tryIt: 'Probar',
    seeMore: 'Ver más',
    seeLess: 'Ver menos',
    chooseThis: 'Elegir esta',
    changeToThis: 'Cambiar a esta',
    currentChoice: 'Es tu elección actual',
    played: 'Ya la probaste',
    recommended: 'Recomendada por PIX',
    learns: 'Qué aprendes:',
    back: 'Volver a las máquinas',
    approveTitle: 'Aprobar tu elección',
    approveLead: 'Si la apruebas, queda guardada en tu inventario. Mientras no toques "Aprobar", no se guarda nada.',
    compareTitle: 'Así se comparan',
    compareHint: 'Son valores de partida, una orientación y no una promesa.',
    keepExploring: 'Seguir explorando',
    changeWarning: 'Al cambiar de elección, lo que dependía de ella queda "por revisar". No se borra nada.',
    changeDependents: 'Por revisar:',
    otherTitle: 'Otra fuente',
    otherSubmit: 'Ver mi fuente',
    otherBlank: 'Escribe tu fuente de ingreso para poder seguir.',
    ownChoiceLabel: 'Tu fuente de ingreso',
    recommendTitle: 'No sé, recomiéndame',
    recommendSubmit: 'Recomiéndame una',
    seeRecommended: 'Ver su ficha',
    recommendWhy: 'Por qué:',
    recommendPick: 'Elige una respuesta para que pueda recomendarte.',
    actionSheet: 'Ver ficha:',
    actionOther: 'Escribir otra fuente',
    actionRecommend: 'Pedir recomendación',
    working: 'Un momento…',
    notPromise: 'Es un ejemplo, no una promesa.',
    minigameSoon: 'El juego de esta máquina está en camino. Mientras tanto, puedes leer su ficha y elegirla si te convence.',
    otherMissing: 'Para completar la ficha me falta:',
    inventoryEmpty: 'Tu influencer aún no tiene piezas aprobadas. Elige en una zona y pulsa "Aprobar".',
  },

  /** Marcador sobre el mundo 3D (T032). */
  hud: {
    zones: 'Zonas',
    zoneDone: 'aprobada',
    zoneCurrent: 'en curso',
    zonePending: 'pendiente',
    sparks: 'Chispas',
    sparksLost: 'Chispas perdidas',
    trust: 'Confianza',
    sheet: 'Ficha',
    toReview: 'por revisar',
    sheetLabel: 'Abrir la ficha de tu influencer',
    pixLabel: 'PIX dice',
    pauseLabel: 'Pausar el juego',
  },

  /** Menú de pausa del mundo 3D (T041), con el interruptor de la ayuda (T040). */
  pauseMenu: {
    title: 'Pausa',
    hint: 'El mundo está detenido. Sigue cuando quieras: no hay prisa.',
    resume: 'Seguir',
    sheet: 'Ficha',
    assistLabel: 'Ofrecerme ayuda',
    assistHelp: 'Si fallas tres veces seguidas en el mismo sitio, PIX te propone una mano.',
    assistOn: 'Sí',
    assistOff: 'No',
    restart: 'Empezar de nuevo',
    restartAsk: 'Esto borra tu partida guardada en este navegador y vuelve al principio. ¿Seguro?',
    restartYes: 'Sí, borrar y empezar',
    restartNo: 'No, volver',
  },

  /** Oferta de ayuda tras tres fallos seguidos en el mismo sitio (T040). Nada de esto cambia lo que ya aprobaste. */
  assist: {
    label: 'PIX te ofrece ayuda',
    title: 'Te echo una mano',
    note: 'Lo que ya decidiste no cambia.',
    easier: 'Hacerlo más fácil',
    easierHint: 'Un rato con más margen para saltar y el dron más lento.',
    skip: 'Llevarme al siguiente sitio seguro',
    skipHint: 'Solo hacia adelante, por el camino que ya abriste.',
    keep: 'Seguir intentando',
  },

  /** Presentación de una zona (D62): solo la primera vez que se entra. */
  zoneIntro: {
    label: 'PIX presenta la zona',
    skip: 'Saltar',
    continue: 'Continuar',
    listen: 'Escuchar a PIX',
    read: 'Leer',
  },

  /** Pantalla de carga del mundo 3D (el mismo texto inicial está en mundo3d.html). */
  loading: {
    name: 'PIX Central',
    text: 'Cargando el mundo…',
    enter: 'Entrar a PIX Central',
  },

  /** Panel de la ficha del influencer (botón Ficha del marcador). */
  sheetPanel: {
    title: 'Tu ficha del influencer',
    lead: 'Las cinco piezas del Mundo 1, en orden.',
    pending: 'Por decidir',
    toReview: 'Por revisar',
    close: 'Cerrar',
    restart: 'Empezar de nuevo',
    restartAsk: 'Esto borra tu partida guardada en este navegador y vuelve al principio. ¿Seguro?',
    restartYes: 'Sí, borrar y empezar',
    restartNo: 'No, volver',
    tips: 'Consejos de PIX',
    tipsEmpty: 'Recoge chispas para desbloquear consejos de PIX.',
  },

  /** Consejos que PIX dice al desbloquearlos. */
  tipUnlocked: 'Nuevo consejo de PIX:',

  /** Voz de PIX (D60, D61): globo con subtítulo, botón Leer y botón con su cara para silenciar o activar. */
  voice: {
    read: 'Leer',
    close: 'Cerrar',
    mute: 'Silenciar la voz de PIX',
    unmute: 'Activar la voz de PIX',
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
