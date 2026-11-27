// Frases fijas que PIX dice en voz en la zona 1 del Mundo 1 (D60). Datos puros: solo importa los consejos de tips.js.
// Cada clave es estable: es también el nombre del audio pregrabado, assets/audio/pix/<clave>.mp3.
// Si cambia el texto de una clave, hay que volver a generar su audio.
// Textos cortos, en español neutro, para decirse en voz alta. Nada de cifras ni promesas de dinero.
//
// Claves:
//   incomeSource.intro | firstApproach | recommended | played | chosen | changeWarn
//   incomeSource.focus.<opción>   al acercarse a un objeto (ugc, affiliate, digital, subscriptions, sponsorships, other, recommend)
//   incomeSource.sheet.<opción>   la ficha esencial al abrirla (qué es, cómo se gana, para quién encaja)
//   <lessonId>.entry.0 | .entry.1 pantalla de entrada del minijuego: el ejemplo de turno y lo que se aprende
//   world.fell | enemy | defeated  caídas y dron de spam (sin audio grabado: voz del navegador)
//   world.assistOffer | assistEasier | assistSkip  ayuda tras varios fallos seguidos (sin audio grabado: voz del navegador)
//   <lessonId>.end                resumen al terminar el minijuego
//   tips.<índice>                 consejo desbloqueado con las chispas ("Nuevo consejo de PIX: " + TIPS[índice])
// Lo que genera la IA (el porqué de la recomendación, la ficha de "Otra") no va aquí: no tiene audio grabado.

import { TIPS } from './tips.js';

// Mismo texto que `texts.tipUnlocked` (es.js); aquí va aparte porque el audio grabado lo dice tal cual.
const TIP_PREFIX = 'Nuevo consejo de PIX:';

export const PIX_LINES = Object.freeze({
  // --- El mundo (T035, T036): caídas y dron. Sin audio grabado todavía: suenan con la voz del navegador ---
  'world.fell': 'Tranquilo, te devolví a un sitio seguro. A todos nos pasa. Vuelve a intentarlo.',
  'world.enemy': 'Ese dron de spam empuja fuerte. Si le caes encima, lo vences.',
  'world.defeated': 'Bien hecho. Lo venciste, aunque el spam siempre vuelve.',
  'world.assistOffer': 'Este tramo se está poniendo difícil. Puedo echarte una mano, o sigues intentando. Tú eliges.',
  'world.assistEasier': 'Listo, por un rato lo hice más fácil. Tómalo con calma.',
  'world.assistSkip': 'Te llevé un poco más adelante. Lo que decidiste sigue igual.',

  // --- La zona ---
  'incomeSource.intro': 'Bienvenido a la sala de fuentes de ingreso. Hay cinco máquinas, una por cada forma posible de tener ingresos con un influencer virtual. Acércate a una y te cuento qué hace. Puedes probarla antes de elegir.',
  'incomeSource.firstApproach': 'Acércate a una máquina y te cuento qué hace.',
  'incomeSource.recommended': 'Esta es la que te recomiendo. Es solo una sugerencia: tú decides.',
  'incomeSource.played': 'Ya la probaste. Si te convence, elígela.',
  'incomeSource.chosen': 'Es tu elección actual.',
  'incomeSource.changeWarn': 'Si cambias de fuente, lo que dependía de ella quedará por revisar. No se borra nada.',

  // --- Al acercarse a un objeto ---
  'incomeSource.focus.ugc': 'Esta es la de contenido para marcas. Creas fotos y videos para una marca, y ella te paga por cada pieza.',
  'incomeSource.focus.affiliate': 'Esta es la de afiliados. Recomiendas productos de otras empresas, y puedes ganar una comisión por cada compra hecha con tu enlace.',
  'incomeSource.focus.digital': 'Esta es la de productos digitales. Creas y vendes algo tuyo, como una guía o una plantilla.',
  'incomeSource.focus.subscriptions': 'Esta es la de suscripciones. Tus seguidores pueden pagar cada mes por contenido exclusivo o una comunidad privada.',
  'incomeSource.focus.sponsorships': 'Esta es la de patrocinios. Una marca te paga por aparecer o hablar de ella en tus cuentas.',
  'incomeSource.focus.other': 'Esta terminal es para otra fuente. Si la tuya no está entre las cinco, escríbela y la miramos juntos.',
  'incomeSource.focus.recommend': 'Si no sabes cuál elegir, yo te ayudo. Comparo las cinco y te marco una con una estrella.',

  // --- La ficha esencial, al abrirla ---
  'incomeSource.sheet.ugc': 'Contenido para marcas. Creas fotos y videos para una marca, y ella los publica en sus cuentas o en sus anuncios. La marca te paga por cada pieza o por un paquete. Encaja si quieres empezar a cobrar por encargos sin esperar a tener mucha audiencia y disfrutas creando por encargo.',
  'incomeSource.sheet.affiliate': 'Marketing de afiliados. Recomiendas productos de otras empresas con un enlace propio, y puedes ganar una comisión por cada compra hecha con él. Encaja si ya conoces productos de tu tema y quieres empezar sin inversión.',
  'incomeSource.sheet.digital': 'Productos digitales. Creas y vendes algo tuyo, como una guía, una plantilla o un curso, y cada persona que lo compra te paga directamente. Encaja si sabes hacer algo que otros quieren aprender y puedes esperar unos meses.',
  'incomeSource.sheet.subscriptions': 'Suscripciones. Tus seguidores pagan una cuota cada mes por contenido que los demás no ven, o por una comunidad privada. Encaja si ya tienes una comunidad que pide más y puedes mantener un ritmo fijo.',
  'incomeSource.sheet.sponsorships': 'Patrocinios y colaboraciones. Una marca te paga por aparecer o hablar de ella en tus cuentas, por publicación, por campaña o por un acuerdo más largo. Encaja como segunda fuente, cuando ya tienes audiencia.',

  // --- Minijuego 1: UGC para marcas ---
  'ugc-brief.entry.0': 'Ejemplo uno. Una marca de agua de coco te paga por tres videos cortos mostrando la botella en una mañana de playa. Aquí aprenderás a leer bien el pedido, que las revisiones son normales y que los derechos de uso valen dinero.',
  'ugc-brief.entry.1': 'Ejemplo dos. Una app de idiomas te paga por cinco videos cortos mostrando cómo se usa. Aquí aprenderás a leer bien el pedido, que las revisiones son normales y que los derechos de uso valen dinero.',
  'ugc-brief.end': 'Listo. Esto te llevas: en UGC se lee bien el pedido, las revisiones son normales y dejar que la marca use tu contenido en anuncios es un servicio aparte que se cobra. Recuerda que es un ejemplo, no una promesa.',

  // --- Minijuego 2: afiliados ---
  'affiliate-shelf.entry.0': 'Ejemplo uno. Recomiendas una cámara para principiantes y puedes ganar un porcentaje de cada venta. Aquí aprenderás que la confianza vale más que la comisión, y que los enlaces de afiliado se dicen.',
  'affiliate-shelf.entry.1': 'Ejemplo dos. Enlazas los libros que recomiendas y la librería en línea te paga una comisión. Aquí aprenderás que la confianza vale más que la comisión, y que los enlaces de afiliado se dicen.',
  'affiliate-shelf.end': 'Listo. Esto te llevas: la confianza de tu audiencia vale más que una comisión, y los enlaces de afiliado siempre se dicen. Recuerda que es un ejemplo, no una promesa.',

  // --- Minijuego 3: productos digitales ---
  'digital-problem.entry.0': 'Ejemplo uno. Una plantilla para planificar las comidas de la semana. Aquí aprenderás que un producto tiene más opciones de vender si resuelve un problema real que mucha gente tiene, y que más formato no siempre es mejor.',
  'digital-problem.entry.1': 'Ejemplo dos. Un pack de filtros de foto con el estilo de tu influencer. Aquí aprenderás que un producto tiene más opciones de vender si resuelve un problema real que mucha gente tiene, y que más formato no siempre es mejor.',
  'digital-problem.end': 'Listo. Esto te llevas: un producto digital tiene más opciones de vender cuando resuelve un problema real que mucha gente repite, y un formato más grande no siempre es mejor. Recuerda que es un ejemplo, no una promesa.',

  // --- Minijuego 4: suscripciones ---
  'subscriptions-club.entry.0': 'Ejemplo uno. Un club con una rutina exclusiva cada semana y un chat privado. Aquí aprenderás que depende de la constancia, no de un día para otro, y que la comunidad también da trabajo.',
  'subscriptions-club.entry.1': 'Ejemplo dos. Fotos y videos detrás de cámaras, solo para miembros, cada semana. Aquí aprenderás que depende de la constancia, no de un día para otro, y que la comunidad también da trabajo.',
  'subscriptions-club.end': 'Listo. Esto te llevas: un club se sostiene con constancia, no de un día para otro, y la comunidad también da trabajo. Recuerda que es un ejemplo, no una promesa.',

  // --- Minijuego 5: patrocinios ---
  'sponsorships-offer.entry.0': 'Ejemplo uno. Una marca de ropa deportiva te paga por aparecer con su chaqueta en tres publicaciones. Aquí aprenderás que las marcas pagan por audiencia y por encaje, y que no toda oferta conviene.',
  'sponsorships-offer.entry.1': 'Ejemplo dos. Una marca de té te paga una campaña de dos meses, con una publicación por semana. Aquí aprenderás que las marcas pagan por audiencia y por encaje, y que no toda oferta conviene.',
  'sponsorships-offer.end': 'Listo. Esto te llevas: las marcas pagan por audiencia y por encaje, no toda oferta conviene, y una publicación pagada siempre se marca como publicidad. Recuerda que es un ejemplo, no una promesa.',

  // --- Consejos de PIX (tips.js): "Nuevo consejo de PIX: " + el consejo, generados desde TIPS para no duplicar texto ---
  ...Object.fromEntries(TIPS.map((tip, index) => [`tips.${index}`, `${TIP_PREFIX} ${tip}`])),
});

/** Claves de las frases que dependen de una zona, un objeto, una opción o un minijuego. */
export const pixKey = Object.freeze({
  focus: (zoneId, id) => `${zoneId}.focus.${id}`,
  sheet: (zoneId, optionId) => `${zoneId}.sheet.${optionId}`,
  entry: (lessonId, example) => `${lessonId}.entry.${example}`,
  end: (lessonId) => `${lessonId}.end`,
  tip: (index) => `tips.${index}`,
});
