// Zona 1 del Mundo 1: fuente de ingreso inicial (F01). T025; D47, D51, D52.
// Fuente: docs/diseno/mundo-1-zonas.md. Datos puros: sin importaciones y sin lógica de pantalla.
// Reglas de la factoría que respetan todos los textos: nada de promesas de dinero (las cifras son
// ejemplos de "puede pasar si…"), transparencia comercial cuando hay publicidad o enlaces, y un
// influencer virtual no inventa títulos.
//
// Forma de los datos:
//   zoneId        id de la pieza que decide esta zona (coincide con la puerta del dominio).
//   options[]     las cinco opciones oficiales: { id, name, short, sheet, examples[2], play, criteria }.
//                 Ficha liviana (D60): la primera vista muestra `sheetEssential`; "Ver más" muestra el resto.
//                 `examples` y `play.learns` se ven al entrar al minijuego, no en la ficha.
//   criteria      valores de 1 (bajo) a 3 (alto) para speed, audience, effort y growth.
//   criteriaKeys  orden y etiquetas de la tabla de comparación; `better` dice qué valor conviene:
//                 'high' (más es mejor: rapidez, crecimiento) o 'low' (menos es mejor: audiencia, esfuerzo).
//   levels        etiqueta de cada valor 1 a 3 (levelsByKey la cambia para un criterio concreto).
//   other         la terminal "Otra fuente": cómo se escribe y qué pide la ficha.
//   recommend     la pregunta jugada de "No sé, recomiéndame": { question, answers[] }. Cada respuesta
//                 trae `weights` por criterio: un peso positivo premia el valor alto, uno negativo el bajo.

export const INCOME_ZONE = Object.freeze({
  zoneId: 'incomeSource',
  title: 'Fuente de ingreso inicial',
  question: '¿Cuál será la fuente de ingreso inicial?',
  intro: 'Esta sala tiene cinco máquinas, una por cada forma posible de tener ingresos con un influencer virtual. Acércate a una y te cuento qué hace. Puedes probarla antes de elegir.',
  note: 'Las cifras y los casos son ejemplos de lo que puede pasar si todo sale bien. No son una promesa de ingresos.',

  criteriaKeys: [
    { key: 'speed', label: 'Rapidez para empezar', better: 'high' },
    { key: 'audience', label: 'Audiencia que pide', better: 'low' },
    { key: 'effort', label: 'Esfuerzo', better: 'low' },
    { key: 'growth', label: 'Cuánto puede crecer', better: 'high' },
  ],
  levels: { 1: 'Baja', 2: 'Media', 3: 'Alta' },
  levelsByKey: {
    effort: { 1: 'Bajo', 2: 'Medio', 3: 'Alto' },
  },

  options: [
    {
      id: 'ugc',
      name: 'UGC AI para marcas',
      short: 'Creas fotos y videos para una marca y ella te paga por cada pieza.',
      criteria: { speed: 3, audience: 1, effort: 2, growth: 2 },
      sheet: {
        what: 'Creas fotos y videos para una marca, y ella los publica en sus propias cuentas o en sus anuncios.',
        money: 'La marca te paga por cada pieza o por un paquete (por ejemplo, tres videos). Si quiere usarlos en anuncios pagados, se negocia un extra por los derechos de uso.',
        payer: 'La marca.',
        needs: 'Unas cuantas piezas de muestra (portafolio) y saber leer un pedido de marca.',
        audience: 'Poca o ninguna. La marca compra el contenido, no tus seguidores.',
        pros: 'Se puede empezar pronto; un influencer virtual produce rápido con IA.',
        risks: 'Depende de conseguir clientes; cada marca pide cambios; hay que cuidar que el contenido no choque con tu estilo.',
        fit: 'Quien quiere empezar a cobrar por encargos sin esperar a tener mucha audiencia, y disfruta creando contenido por encargo.',
      },
      examples: [
        'Una marca de agua de coco te paga por tres videos cortos mostrando la botella en una mañana de playa.',
        'Una app de idiomas te paga por cinco videos cortos mostrando cómo se usa.',
      ],
      play: {
        lessonId: 'ugc-brief',
        title: 'El pedido de la marca',
        learns: 'Leer bien el pedido, que las revisiones son normales y que los derechos de uso valen dinero.',
      },
    },
    {
      id: 'affiliate',
      name: 'Marketing de afiliados',
      short: 'Recomiendas productos de otras empresas con tu enlace y ganas una comisión por cada compra.',
      criteria: { speed: 3, audience: 2, effort: 1, growth: 2 },
      sheet: {
        what: 'Recomiendas productos de otras empresas con un enlace o código propio.',
        money: 'Ganas una comisión por cada compra hecha con tu enlace.',
        payer: 'La empresa del producto, a través de su programa de afiliados.',
        needs: 'Unirte a un programa de afiliados y tener productos que encajen con tu audiencia.',
        audience: 'Algo de audiencia; con pocos seguidores las ventas son pocas.',
        pros: 'Es fácil de empezar y no necesitas crear un producto propio.',
        risks: 'Las comisiones son pequeñas; si recomiendas por la comisión y no por la calidad, pierdes la confianza; dependes de las reglas del programa.',
        fit: 'Quien ya usa y conoce productos de su tema y quiere empezar sin inversión.',
      },
      examples: [
        'Recomiendas una cámara para principiantes y puedes ganar un porcentaje de cada venta.',
        'Enlazas los libros que recomiendas y la librería en línea te paga una comisión.',
      ],
      play: {
        lessonId: 'affiliate-shelf',
        title: 'El estante de recomendaciones',
        learns: 'La confianza vale más que la comisión, y los enlaces de afiliado se dicen.',
      },
    },
    {
      id: 'digital',
      name: 'Productos digitales',
      short: 'Creas y vendes algo tuyo en formato digital: una guía, una plantilla, un curso.',
      criteria: { speed: 1, audience: 2, effort: 3, growth: 3 },
      sheet: {
        what: 'Creas y vendes algo tuyo en formato digital: una guía, una plantilla, un curso, un pack de presets.',
        money: 'Cada persona que lo compra te paga directamente.',
        payer: 'Tus seguidores o clientes.',
        needs: 'Saber qué problema resuelve tu producto y crearlo; después, darle soporte y actualizarlo.',
        audience: 'Media; hay que tener a quién vendérselo.',
        pros: 'Cada venta deja casi todo el dinero; puede venderse muchas veces sin rehacerlo.',
        risks: 'Mucho trabajo antes de la primera venta; si nadie tenía ese problema, no se vende; un influencer virtual no puede vender lo que exige un título profesional.',
        fit: 'Quien sabe hacer algo que otros quieren aprender y puede esperar unos meses.',
      },
      examples: [
        'Una plantilla para planificar las comidas de la semana.',
        'Un pack de filtros de foto con el estilo de tu influencer.',
      ],
      play: {
        lessonId: 'digital-problem',
        title: 'Del problema al producto',
        learns: 'Un producto tiene más opciones de vender si resuelve un problema real que mucha gente tiene, y más formato no siempre es mejor.',
      },
    },
    {
      id: 'subscriptions',
      name: 'Suscripciones o contenido exclusivo',
      short: 'Tus seguidores pagan cada mes por contenido que los demás no ven o por una comunidad privada.',
      criteria: { speed: 1, audience: 3, effort: 2, growth: 3 },
      sheet: {
        what: 'Tus seguidores pagan cada mes para recibir contenido que los demás no ven o para estar en una comunidad privada.',
        money: 'Una cuota mensual por persona, mientras siga suscrita.',
        payer: 'Tus seguidores más fieles.',
        needs: 'Una razón clara para pagar cada mes y la capacidad de entregar contenido nuevo con regularidad.',
        audience: 'Bastante; solo una parte pequeña de los seguidores se suscribe.',
        pros: 'Puede repetirse cada mes mientras la gente siga suscrita, y da una relación cercana con la comunidad.',
        risks: 'Si dejas de entregar, se van; moderar una comunidad da trabajo; hay que cuidar la privacidad.',
        fit: 'Quien ya tiene una comunidad que pide más y puede comprometerse con un ritmo fijo.',
      },
      examples: [
        'Un club con una rutina exclusiva cada semana y un chat privado.',
        'Fotos y videos detrás de cámaras, solo para miembros, cada semana.',
      ],
      play: {
        lessonId: 'subscriptions-club',
        title: 'Cuatro semanas de club',
        learns: 'Depende de la constancia, no de un día para otro, y la comunidad también da trabajo.',
      },
    },
    {
      id: 'sponsorships',
      name: 'Patrocinios y colaboraciones',
      short: 'Una marca te paga por aparecer o hablar de ella en tus propias cuentas.',
      criteria: { speed: 1, audience: 3, effort: 1, growth: 2 },
      sheet: {
        what: 'Una marca te paga por aparecer o hablar de ella en tus propias cuentas.',
        money: 'Un pago por publicación, por campaña o por un acuerdo de varios meses.',
        payer: 'La marca.',
        needs: 'Una audiencia que le interese a la marca, datos que lo muestren (un "media kit") y un estilo que encaje con ella.',
        audience: 'Mucha; la marca paga por llegar a tus seguidores.',
        pros: 'Pagos más altos por pieza cuando ya tienes audiencia; da prestigio.',
        risks: 'Sin audiencia no llega; aceptar marcas que no encajan daña la confianza; siempre hay que marcar que es publicidad.',
        fit: 'Como segunda fuente, cuando ya hay audiencia. Rara vez como primera.',
      },
      examples: [
        'Una marca de ropa deportiva te paga por aparecer con su chaqueta en tres publicaciones.',
        'Una marca de té te paga una campaña de dos meses, con una publicación por semana.',
      ],
      play: {
        lessonId: 'sponsorships-offer',
        title: 'La propuesta de la marca',
        learns: 'Las marcas pagan por audiencia y por encaje, y no toda oferta conviene.',
      },
    },
  ],

  /**
   * Campos que se ven en la primera vista de la ficha (qué es, cómo se gana, para quién encaja, D60).
   * El resto se despliega con "Ver más". Los dos ejemplos y lo que se aprende no están en la ficha:
   * se muestran en la pantalla de entrada de cada minijuego.
   */
  sheetEssential: ['what', 'money', 'fit'],

  /** Etiquetas de los campos de la ficha (todos), en el orden en que se muestran. */
  sheetFields: [
    { key: 'what', label: 'Qué es' },
    { key: 'money', label: 'Cómo entra el dinero' },
    { key: 'payer', label: 'Quién paga' },
    { key: 'needs', label: 'Qué necesitas antes' },
    { key: 'audience', label: 'Audiencia que pide' },
    { key: 'pros', label: 'Ventajas' },
    { key: 'risks', label: 'Riesgos' },
    { key: 'fit', label: 'Para quién conviene' },
  ],

  other: {
    id: 'other',
    name: 'Otra fuente',
    short: 'Si tu fuente de ingreso no está en las cinco, escríbela y la miramos juntos.',
    label: 'Cuéntame cuál sería tu fuente de ingreso',
    hint: 'Escríbela con tus palabras. Te la explico con el mismo formato de ficha o te digo qué datos me faltan.',
  },

  recommend: {
    id: 'recommend',
    name: 'No sé, recomiéndame',
    short: 'Comparo las cinco con rapidez, audiencia, esfuerzo y crecimiento, y te marco una con una estrella.',
    question: 'Para recomendarte bien me falta un dato: ¿cuánto puedes esperar para ver tus primeros ingresos?',
    answers: [
      { id: 'asap', label: 'Lo antes posible', weights: { speed: 3, audience: -2, effort: -1, growth: 0 } },
      { id: 'canWait', label: 'Puedo esperar unos meses', weights: { speed: 0, audience: 0, effort: 0, growth: 3 } },
    ],
    footer: 'Es una recomendación, no una decisión: puedes elegir cualquier otra.',
  },

  /** Lo que PIX dice en la zona. */
  pix: {
    firstApproach: 'Acércate a una máquina y te cuento qué hace.',
    recommended: 'Esta es la que te recomiendo. Es solo una sugerencia: tú decides.',
    played: 'Ya la probaste. Si te convence, elígela.',
    chosen: 'Es tu elección actual.',
    changeWarn: 'Si cambias de fuente, lo que dependía de ella (nicho, audiencia y objetivo a 90 días) quedará por revisar. No se borra nada.',
  },
});

/** Opción por id. */
export function incomeOption(id) {
  return INCOME_ZONE.options.find((option) => option.id === id) ?? null;
}
