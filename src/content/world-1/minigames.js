// Textos y guiones de los cinco minijuegos de la zona de fuente de ingreso (T027 a T031; D51, D54).
// Datos puros: sin importaciones. Cada minijuego tiene DOS ejemplos de alrededor de un minuto.
// Reglas de la factoría que respetan todos los textos: nada de promesas de dinero (los casos son
// ejemplos de "puede pasar si…"), transparencia cuando hay publicidad o enlaces de afiliado, y un
// influencer virtual no inventa títulos. Las marcas son inventadas.
//
// Los minijuegos solo informan: nunca aprueban una pieza (constitución, principio I).

export const MINIGAME_TEXTS = Object.freeze({
  ui: {
    pix: 'PIX',
    exit: 'Salir',
    next: 'Seguir',
    back: 'Volver a la sala',
    example: 'Ejemplo {n} de {total}',
    start: 'Empezar',
    learnsLabel: 'Lo que aprenderás',
    mute: 'Silenciar la voz de PIX',
    unmute: 'Activar la voz de PIX',
    step: 'Paso {n} de {total}',
    trust: 'Confianza de tu audiencia',
    trustUp: 'La confianza sube',
    trustDown: 'La confianza baja',
    endTitle: 'Esto te llevas',
    recap: 'Lo que decidiste',
    note: 'Es un ejemplo de lo que puede pasar, no una promesa de ingresos.',
    noChange: 'Sin cambio',
  },

  // ---------------------------------------------------------------- 1. UGC AI para marcas
  ugc: {
    lessonId: 'ugc-brief',
    title: 'El pedido de la marca',
    learn: 'En UGC se lee bien el pedido, las revisiones son normales y dejar que la marca use tu contenido en anuncios es un servicio aparte que se cobra.',
    totalSteps: 4,
    intro: {
      heading: 'Llega un pedido',
      text: 'Una marca te escribe con un pedido. Léelo con calma: la clave de este trabajo es entender qué te piden antes de crear nada.',
    },
    reads: { heading: 'Entiende el pedido', question: '¿Qué te pide la marca, en resumen?' },
    approach: { heading: 'Elige el enfoque', question: '¿Cómo lo harías?', again: 'Elige otro enfoque. Te quedan estas ideas.' },
    revision: { heading: 'La marca pide un cambio' },
    rights: { heading: 'Una pregunta de la marca' },
    examples: [
      {
        brand: 'Costa Fresca',
        brief: 'Costa Fresca, una marca de agua de coco, pide: "Un video de 15 segundos de nuestra botella, con ambiente fresco, para gente que hace deporte."',
        reads: [
          { id: 'right', label: 'Un video corto de la botella, fresco y pensado para gente deportista.', right: true, reaction: 'Eso es. Leer bien el pedido evita cambios después.' },
          { id: 'long', label: 'Un video largo con la historia de la marca.', right: false, reaction: 'Casi: pedían 15 segundos y centrado en la botella. Lo notaste a tiempo, antes de grabar.' },
          { id: 'photos', label: 'Fotos de varias bebidas distintas.', right: false, reaction: 'No: el pedido es sobre su botella y en video. Menos mal que lo revisaste antes de crear.' },
        ],
        approaches: [
          { id: 'story', label: 'Contar una mini historia de una mañana en la playa', fit: 'half', reaction: 'Les gusta el ambiente, pero la botella casi no se ve. La marca pide un cambio.' },
          { id: 'show', label: 'Mostrar la botella en una carrera matinal', fit: 'good', reaction: 'La marca aprueba: se ve la botella, el ambiente es fresco y es para gente deportista.' },
          { id: 'before-after', label: 'Hacer un antes y después de cansancio y energía', fit: 'miss', reaction: 'La marca lo rechaza: parece que la bebida da resultados mágicos y eso no lo pueden prometer. Elige otro enfoque.' },
        ],
        revision: {
          question: 'Piden que la botella se vea más. ¿Qué cambias?',
          options: [
            { id: 'bottle', label: 'Mostrar la botella desde el primer segundo', ok: true, reaction: 'Ahora sí: la marca aprueba tras una sola revisión. Pedir cambios es normal.' },
            { id: 'music', label: 'Ponerle música más fuerte', ok: false, reaction: 'La música no era el problema. Tras otra ronda, la marca acepta, pero tardaste más de lo necesario.' },
          ],
        },
        rights: {
          ask: 'La marca aprueba y pregunta: "¿Podemos usar el video también en nuestros anuncios pagados?"',
          options: [
            { id: 'free', label: 'Sí, sin costo', reaction: 'Aceptado, pero regalaste algo que vale: usar tu contenido en anuncios es un derecho aparte y se suele cobrar.' },
            { id: 'paid', label: 'Sí, con un pago extra por derechos de uso', reaction: 'Bien negociado: es un trabajo distinto y se paga distinto. Si la marca acepta, ambos salen ganando.' },
            { id: 'refuse', label: 'Mejor no: solo en sus cuentas', reaction: 'Es tu derecho, pero la marca podría buscar a otra persona. Puedes ofrecerlo con un precio.' },
          ],
        },
      },
      {
        brand: 'Habla Más',
        brief: 'Habla Más, una app para aprender idiomas, pide: "Cinco videos cortos que muestren cómo se usa la app, para quien está empezando a aprender inglés."',
        reads: [
          { id: 'right', label: 'Videos cortos que enseñen cómo se usa la app a quien empieza.', right: true, reaction: 'Exacto: cortos, sobre la app y para principiantes.' },
          { id: 'advanced', label: 'Videos largos con clases de inglés avanzado.', right: false, reaction: 'No: piden mostrar la app, y para quien empieza. Bien que lo revisaste antes.' },
          { id: 'logo', label: 'Un solo video con su logo muy grande.', right: false, reaction: 'No: son cinco videos y deben enseñar a usarla, no solo mostrar el logo.' },
        ],
        approaches: [
          { id: 'screen', label: 'Mostrar la pantalla de la app paso a paso', fit: 'good', reaction: 'La marca aprueba: se entiende cómo se usa y es fácil para quien empieza.' },
          { id: 'trip', label: 'Una mini historia: una viajera pide un café en inglés', fit: 'half', reaction: 'Es simpática, pero la app apenas aparece. La marca pide un cambio.' },
          { id: 'week', label: 'Prometer "aprendí inglés en una semana"', fit: 'miss', reaction: 'La marca lo rechaza: es una promesa que no pueden garantizar. Elige otro enfoque.' },
        ],
        revision: {
          question: 'Piden que la app se vea más. ¿Qué cambias?',
          options: [
            { id: 'app', label: 'Enseñar la app en pantalla desde el inicio', ok: true, reaction: 'Ahora sí: la marca aprueba tras una sola revisión.' },
            { id: 'filter', label: 'Cambiar el color del fondo', ok: false, reaction: 'No era eso. Tras otra ronda de cambios, la marca acepta, pero tardaste más de lo necesario.' },
          ],
        },
        rights: {
          ask: 'La marca aprueba y pregunta: "¿Podemos poner los videos en nuestra tienda de aplicaciones y en anuncios?"',
          options: [
            { id: 'free', label: 'Sí, sin costo', reaction: 'Aceptado, pero regalaste algo que vale: los derechos de uso en anuncios se suelen cobrar aparte.' },
            { id: 'paid', label: 'Sí, con un pago extra por derechos de uso', reaction: 'Bien negociado: usar tu contenido en anuncios es un trabajo distinto y se paga distinto.' },
            { id: 'refuse', label: 'Mejor no: solo en sus cuentas', reaction: 'Es tu derecho, pero la marca podría buscar a otra persona. Puedes ofrecerlo con un precio.' },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------- 2. Marketing de afiliados
  affiliate: {
    lessonId: 'affiliate-shelf',
    title: 'El estante de recomendaciones',
    learn: 'La confianza de tu audiencia vale más que una comisión, y los enlaces de afiliado siempre se dicen.',
    totalSteps: 4,
    trustStart: 60,
    intro: {
      heading: 'Un seguidor pregunta',
      text: 'Tus seguidores te piden consejos. Cada recomendación que haces sube o baja la confianza que tienen en ti. Cuídala.',
    },
    shelf: { heading: 'Elige del estante', question: '¿Qué le recomiendas?' },
    tag: {
      heading: 'Antes de dar el enlace',
      question: 'Este enlace te da una comisión si compran. ¿Qué haces?',
      yes: { label: 'Poner la etiqueta "enlace de afiliado" junto al enlace', reaction: 'Bien: decir que ganas una comisión es transparencia. Las reglas exactas dependen de tu país y de la red social, así que conviene revisarlas.', trust: 5 },
      no: { label: 'Dejarlo sin etiqueta, se ve más limpio', reaction: 'Alguien lo notó: "esto tiene comisión y no lo dijiste". Ocultarlo rompe la confianza y puede incumplir las reglas.', trust: -15 },
    },
    skeptic: 'Esta persona duda: "La otra vez recomendaste algo que no servía." ',
    examples: [
      {
        rounds: [
          {
            who: 'Lucía',
            ask: 'Lucía te escribe: "Quiero empezar a grabar videos, ¿qué me compro?"',
            products: [
              { id: 'pro', label: 'Cámara profesional de estudio', note: 'Comisión más alta', kind: 'wrong', trust: -25, reaction: 'Lucía la compra por tu recomendación, pero es demasiado para empezar y no la usa. Cobraste una vez, y ella ya no confía igual.' },
              { id: 'basic', label: 'Cámara sencilla para principiantes', note: 'Comisión media', kind: 'right', trust: 10, reaction: 'Lucía la compra y empieza a grabar esa misma semana. Tu consejo sirvió y te lo agradece.' },
              { id: 'tripod', label: 'Un trípode barato', note: 'Comisión baja', kind: 'half', trust: -8, reaction: 'Le sirve a medias: necesita una cámara y el trípode solo no resuelve su pregunta.' },
            ],
          },
          {
            who: 'Mateo',
            ask: 'Mateo te escribe: "Quiero editar mis videos desde el celular, ¿qué uso?"',
            products: [
              { id: 'suite', label: 'Programa de edición de cine', note: 'Comisión más alta', kind: 'wrong', trust: -25, reaction: 'Mateo lo compra y no entiende cómo usarlo: es para profesionales. Perdiste otro poco de confianza.' },
              { id: 'half', label: 'Paquete de efectos para videos', note: 'Comisión media', kind: 'half', trust: -8, reaction: 'Le gustan los efectos, pero todavía no sabe editar. Le sirve a medias.' },
              { id: 'app', label: 'App de edición sencilla para el celular', note: 'Comisión media', kind: 'right', trust: 10, reaction: 'Mateo edita su primer video esa tarde. Vuelve a escribirte para pedir más consejos.' },
            ],
          },
        ],
      },
      {
        rounds: [
          {
            who: 'Ana',
            ask: 'Ana te escribe: "Quiero leer más pero me distraigo, ¿qué libro me recomiendas?"',
            products: [
              { id: 'encyclopedia', label: 'Enciclopedia de lujo en varios tomos', note: 'Comisión más alta', kind: 'wrong', trust: -25, reaction: 'Ana la compra, pero es enorme y cara y acaba sin abrirla. Cobraste una vez, y ella ya no confía igual.' },
              { id: 'notebook', label: 'Un cuaderno para anotar lo que lees', note: 'Comisión baja', kind: 'half', trust: -8, reaction: 'Le gusta el cuaderno, pero todavía no tiene qué leer. Le sirve a medias.' },
              { id: 'stories', label: 'Un libro corto de cuentos, fácil de empezar', note: 'Comisión media', kind: 'right', trust: 10, reaction: 'Ana lo termina en una semana y te cuenta lo que le gustó. Tu consejo sirvió.' },
            ],
          },
          {
            who: 'Diego',
            ask: 'Diego te escribe: "Busco un libro de cocina para principiantes."',
            products: [
              { id: 'basic', label: 'Recetario básico con pasos sencillos', note: 'Comisión media', kind: 'right', trust: 10, reaction: 'Diego cocina su primera receta el fin de semana y te manda una foto.' },
              { id: 'chef', label: 'Colección de alta cocina en cinco tomos', note: 'Comisión más alta', kind: 'wrong', trust: -25, reaction: 'Diego la compra y se frustra: las recetas son muy difíciles. Perdiste otro poco de confianza.' },
              { id: 'apron', label: 'Un delantal con diseño bonito', note: 'Comisión baja', kind: 'half', trust: -8, reaction: 'Le gusta el delantal, pero sigue sin saber qué cocinar. Le sirve a medias.' },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 3. Productos digitales
  digital: {
    lessonId: 'digital-problem',
    title: 'Del problema al producto',
    learn: 'Un producto digital vende cuando resuelve un problema real que mucha gente repite, y un formato más grande no siempre es mejor.',
    totalSteps: 4,
    formats: {
      guide: { label: 'Guía', time: 'Rápida de hacer', pieces: 3 },
      template: { label: 'Plantilla', time: 'Tarda un tiempo medio', pieces: 4 },
      course: { label: 'Curso', time: 'Tarda mucho en hacerse', pieces: 6 },
    },
    intro: {
      heading: 'Escucha a la gente',
      text: 'Flotan globos con comentarios de tus seguidores. Algunos repiten el mismo problema; otros son casos sueltos. Un producto nace de un problema real.',
    },
    problem: { heading: 'Elige el problema', question: '¿Cuál quieres resolver?' },
    format: { heading: 'Elige el formato', question: '¿Cómo lo entregas?' },
    build: { heading: 'Arma el producto', text: 'Toca para añadir cada pieza. Más piezas significa más trabajo.', collect: 'Añadir una pieza', progress: 'Piezas {n} de {total}', done: 'Ya tienes todas las piezas.' },
    describe: { heading: 'Cómo lo presentas', question: '¿Qué dices al lanzarlo?' },
    launch: { heading: 'Se lanza' },
    update: { heading: 'Llegan comentarios' },
    sales: {
      good: 'Se vende bien: mucha gente tenía justo ese problema y el formato encaja. Es un ejemplo de lo que puede pasar, no una promesa.',
      ok: 'Se vende, pero menos de lo posible: el problema era real, aunque el formato no era el más adecuado.',
      dishonest: 'Además, lo que prometiste al presentarlo no era cierto: quien lo compre se sentirá engañado.',
      poor: 'Casi no se vende: ese problema lo tenía muy poca gente, y es un buen momento para aprender por qué.',
    },
    examples: [
      {
        comments: [
          { id: 'cook', text: '"No sé qué cocinar entre semana."', mentions: 6 },
          { id: 'cat', text: '"Mi gato tiene el pelo naranja."', mentions: 1 },
          { id: 'leftovers', text: '"Se me acaba la comida a mitad de semana."', mentions: 4 },
          { id: 'song', text: '"Hoy escuché una canción muy bonita."', mentions: 1 },
        ],
        problems: [
          { id: 'cook', label: 'No saben qué cocinar entre semana', repeated: true, ideal: 'template', reaction: 'Elegiste un problema que se repite en muchos comentarios. Buen comienzo.' },
          { id: 'cat', label: 'El color del pelo del gato', repeated: false, ideal: 'guide', reaction: 'Solo lo menciona una persona. Es un caso suelto; lo notarás al lanzar.' },
          { id: 'leftovers', label: 'Se les acaba la comida a mitad de semana', repeated: true, ideal: 'guide', reaction: 'Varias personas lo comentan. Es un problema real.' },
          { id: 'song', label: 'Una canción que les gustó', repeated: false, ideal: 'guide', reaction: 'Fue un comentario suelto, no un problema que resolver.' },
        ],
        describe: [
          { id: 'honest', label: 'Explicar qué incluye y qué problema ayuda a resolver', ok: true, reaction: 'Claro y honesto. La gente sabe qué compra.' },
          { id: 'guarantee', label: 'Prometer "garantizado: ahorrarás mucho dinero"', ok: false, reaction: 'No se puede garantizar un resultado así. Las promesas de dinero engañan y rompen la confianza.' },
          { id: 'title', label: 'Decir que lo diseñó una nutricionista titulada', ok: false, reaction: 'Un influencer virtual no puede inventarse un título profesional. Eso es engañar.' },
        ],
      },
      {
        comments: [
          { id: 'night', text: '"Mis fotos de noche salen oscuras."', mentions: 5 },
          { id: 'sky', text: '"Hoy el cielo estaba rosa."', mentions: 1 },
          { id: 'style', text: '"Quiero un estilo para mis fotos de viajes."', mentions: 4 },
          { id: 'dog', text: '"Me gusta tu gorra."', mentions: 1 },
        ],
        problems: [
          { id: 'night', label: 'Sus fotos de noche salen oscuras', repeated: true, ideal: 'template', reaction: 'Mucha gente lo repite. Es un problema real.' },
          { id: 'sky', label: 'El color del cielo de hoy', repeated: false, ideal: 'guide', reaction: 'Solo una persona lo dijo: es un comentario suelto.' },
          { id: 'style', label: 'No tienen un estilo para fotos de viajes', repeated: true, ideal: 'template', reaction: 'Varias personas lo piden. Es un problema real.' },
          { id: 'cap', label: 'Una gorra que les gustó', repeated: false, ideal: 'guide', reaction: 'Fue un comentario suelto, no un problema que resolver.' },
        ],
        describe: [
          { id: 'honest', label: 'Mostrar ejemplos de antes y después de fotos reales y qué incluye el pack', ok: true, reaction: 'Claro y honesto: la gente ve lo que compra.' },
          { id: 'guarantee', label: 'Prometer "garantizado: tendrás 10 mil seguidores"', ok: false, reaction: 'No se puede garantizar algo así. Las promesas falsas rompen la confianza.' },
          { id: 'title', label: 'Decir que es un curso "oficial y certificado"', ok: false, reaction: 'Eso no es verdad y un influencer virtual no puede inventar certificados.' },
        ],
        // Segundo lanzamiento: se actualiza con los comentarios de quienes lo compraron.
        update: {
          intro: 'Pasan unos días y llegan comentarios de quienes lo compraron.',
          comments: [
            { id: 'night-presets', text: '"Faltan ajustes para fotos de noche."', mentions: 4 },
            { id: 'color', text: '"Me encantó el color verde de tu portada."', mentions: 1 },
            { id: 'size', text: '"Me gustaría que fuera más pequeño."', mentions: 1 },
          ],
          question: '¿Qué actualizas?',
          options: [
            { id: 'add', label: 'Añadir los ajustes de noche que pidieron cuatro personas', kind: 'good', reaction: 'Actualizas lo que muchos pidieron: el producto mejora y quienes lo compraron lo agradecen.' },
            { id: 'redo', label: 'Rehacer todo desde cero por un comentario suelto', kind: 'bad', reaction: 'Mucho trabajo para un solo comentario. Escuchar a la gente es bueno, pero conviene ver qué se repite.' },
            { id: 'none', label: 'No cambiar nada', kind: 'meh', reaction: 'Se queda como estaba. Un producto vivo mejora con los comentarios; este se estanca.' },
          ],
        },
      },
    ],
  },

  // ---------------------------------------------------------------- 4. Suscripciones
  subscriptions: {
    lessonId: 'subscriptions-club',
    title: 'Cuatro semanas de club',
    learn: 'Un club se sostiene con constancia, no de un día para otro, y la comunidad también da trabajo.',
    totalSteps: 8,
    weeks: 4,
    startSubscribers: 3,
    startFlame: 5,
    maxFlame: 10,
    meters: { subscribers: 'Suscriptores', flame: 'Interés de la comunidad', effort: 'Tu trabajo' },
    intro: {
      heading: 'Abres el club',
      text: 'Empiezas con tres suscriptores. Cada semana haces dos cosas: entregar el contenido exclusivo y responder a la comunidad. Si cumples, el interés crece; si te saltas una semana, baja. Solo una parte pequeña de los seguidores se suscribe: es un ejemplo, no una promesa.',
    },
    content: {
      heading: 'Semana {week} de {weeks}: el contenido',
      question: 'Toca entregar el contenido exclusivo de la semana.',
      deliver: { label: 'Entregar la pieza exclusiva', reaction: 'Entregas a tiempo. Los suscriptores ven que el club vale la pena.' },
      skip: { label: 'Saltarte la semana', reaction: 'Nada llega esta semana. Alguien se pregunta para qué paga y el interés baja.' },
    },
    reply: { heading: 'Semana {week} de {weeks}: la comunidad' },
    summary: {
      both: 'Semana completa: el interés crece y llega alguien más.',
      onlyContent: 'Entregaste, pero sin responder la comunidad se siente poco escuchada.',
      onlyReply: 'Respondiste, pero sin contenido nuevo el interés baja.',
      none: 'Semana en blanco: baja el interés y se va gente.',
      left: ' Se fue un suscriptor.',
      joined: ' Se une un suscriptor nuevo.',
    },
    examples: [
      {
        club: 'Un club de rutinas exclusivas con chat privado',
        weeks: [
          { message: 'Un miembro escribe: "Me encantó la rutina de esta semana. ¿Puedes hacer una más corta?"', replies: [
            { id: 'reply', label: 'Responder con cariño y anotar la idea', kind: 'good', reaction: 'Se siente escuchado y te da ideas para el contenido.' },
            { id: 'later', label: 'Dejarlo para después', kind: 'skip', reaction: 'El mensaje se queda sin respuesta.' },
          ] },
          { message: 'Otro miembro pregunta: "¿Cuándo sale la próxima pieza?"', replies: [
            { id: 'reply', label: 'Responder con la fecha de la semana', kind: 'good', reaction: 'La comunidad sabe cuándo esperar. Dar un ritmo fijo da confianza.' },
            { id: 'later', label: 'Dejarlo para después', kind: 'skip', reaction: 'La pregunta queda en el aire.' },
          ] },
          { message: 'Alguien escribe: "Tuve un mal día. ¿Puedo desahogarme en el chat?"', replies: [
            { id: 'reply', label: 'Responder con amabilidad y recordar las reglas del chat', kind: 'good', reaction: 'Se siente acompañado. Cuidar a la comunidad da trabajo, pero se nota.' },
            { id: 'later', label: 'Dejarlo para después', kind: 'skip', reaction: 'Se siente ignorado.' },
          ] },
          { message: 'Un miembro escribe algo grosero a otro en el chat.', replies: [
            { id: 'reply', label: 'Recordar la regla amable y moderar el chat', kind: 'good', reaction: 'El chat vuelve a la calma. Moderar es parte del trabajo.' },
            { id: 'later', label: 'Dejarlo pasar', kind: 'skip', reaction: 'La grosería sigue y otros miembros se incomodan.' },
          ] },
        ],
      },
      {
        club: 'Un club de fotos y videos detrás de cámaras',
        weeks: [
          { message: 'Una miembro escribe: "¡Qué bueno el video de esta semana! ¿Cómo lo hiciste?"', replies: [
            { id: 'reply', label: 'Contarle cómo lo hiciste', kind: 'good', reaction: 'Le encanta saberlo y se siente parte del club.' },
            { id: 'later', label: 'Dejarlo para después', kind: 'skip', reaction: 'La pregunta se queda sin respuesta.' },
          ] },
          { message: 'Un miembro te pide: "¿Me pasas el contacto privado de otro miembro? Quiero escribirle."', replies: [
            { id: 'privacy', label: 'Decirle que no compartes datos de nadie, y que puede escribir en el chat del club', kind: 'good', reaction: 'Protegiste la privacidad de todos. Eso da seguridad a la comunidad.' },
            { id: 'share', label: 'Pasarle el contacto', kind: 'harm', reaction: 'El otro miembro se enteró y se siente traicionado. Los datos de las personas no se comparten sin permiso.' },
            { id: 'later', label: 'Dejarlo sin responder', kind: 'skip', reaction: 'Queda sin respuesta y la persona se queda con su duda.' },
          ] },
          { message: 'Otra miembro pregunta: "¿Habrá algo especial para el aniversario del club?"', replies: [
            { id: 'reply', label: 'Contarle que hay una sorpresa en camino', kind: 'good', reaction: 'La comunidad se anima. Dar un motivo para quedarse ayuda.' },
            { id: 'later', label: 'Dejarlo para después', kind: 'skip', reaction: 'La pregunta se pierde entre otros mensajes.' },
          ] },
          { message: 'Un miembro dice: "Estoy pensando en cancelar, no sé si me sirve."', replies: [
            { id: 'reply', label: 'Preguntarle qué le gustaría ver y escucharlo', kind: 'good', reaction: 'Se queda: escuchar a tiempo evita que se vaya.' },
            { id: 'later', label: 'Dejarlo para después', kind: 'skip', reaction: 'Nadie le responde y cancela.' },
          ] },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- 5. Patrocinios y colaboraciones
  sponsorship: {
    lessonId: 'sponsorships-offer',
    title: 'La propuesta de la marca',
    learn: 'Las marcas pagan por audiencia y por encaje, no toda oferta conviene, y una publicación pagada siempre se marca como publicidad.',
    totalSteps: 4,
    trustStart: 60,
    meters: { audience: 'Audiencia', fit: 'Encaje con tu tema', work: 'Trabajos que puedes mostrar' },
    intro: { heading: 'Llega una propuesta' },
    kit: {
      heading: 'Tu media kit',
      text: 'Un media kit es una hoja con tus datos: cuánta gente te sigue, de qué trata tu contenido y qué trabajos has hecho.',
      question: '¿Qué muestras en él?',
    },
    offer: { heading: 'La decisión' },
    mark: {
      heading: 'Marcar la publicidad',
      accepted: 'Toca preparar la publicación. ¿Cómo avisas que es publicidad?',
      practice: 'Para cuando llegue la próxima propuesta, practica: ¿cómo se avisa que una publicación es publicidad?',
      options: [
        { id: 'visible', label: 'Poner "Publicidad" o "Colaboración pagada" bien visible, al principio', kind: 'good', trust: 8, reaction: 'Así se hace: quien te ve sabe desde el primer momento que es una colaboración pagada. Las reglas exactas dependen de tu país y de la red social.' },
        { id: 'hidden', label: 'Ponerlo entre muchos hashtags, al final', kind: 'bad', trust: -10, reaction: 'Escondido no cuenta: la gente no lo ve y las reglas piden que sea claro.' },
        { id: 'none', label: 'No decir nada, la marca no lo pidió', kind: 'bad', trust: -20, reaction: 'Aunque la marca no lo pida, la obligación de avisar es tuya. Callar rompe la confianza y puede traer problemas.' },
      ],
    },
    next: {
      heading: 'Mientras tanto',
      question: '¿Qué haces para que más marcas se interesen en ti?',
      options: [
        { id: 'steady', label: 'Publicar con constancia y reunir tus mejores trabajos', kind: 'good', trust: 5, reaction: 'La audiencia crece despacio y tu media kit se llena de ejemplos reales. Así se ganan las marcas.' },
        { id: 'buy', label: 'Pagar por seguidores falsos para llenar el medidor', kind: 'bad', trust: -25, reaction: 'Los seguidores falsos no compran ni comentan, y las marcas lo notan. Es un atajo que sale caro.' },
        { id: 'spam', label: 'Escribir a muchas marcas pidiendo dinero sin mostrar nada', kind: 'meh', trust: 0, reaction: 'Casi nadie responde: sin audiencia ni trabajos que mostrar, no hay por qué elegirte.' },
      ],
    },
    examples: [
      {
        brand: 'Rayo Burger',
        proposal: 'Rayo Burger, una marca de comida rápida, te ofrece un pago pequeño por aparecer comiendo sus hamburguesas. Tu tema es el bienestar y la vida sana.',
        kit: { audience: 15, fit: 20, work: 10 },
        kitOptions: [
          { id: 'honest', label: 'Tus números reales, aunque sean pequeños', kind: 'good', trust: 5, reaction: 'Honesto y claro. Una marca seria prefiere datos reales.' },
          { id: 'inflate', label: 'Inflar un poco la audiencia para impresionar', kind: 'bad', trust: -20, reaction: 'La marca revisa tus números y no coinciden. Ya no confía en ti.' },
        ],
        offerOptions: [
          { id: 'accept', label: 'Aceptar la oferta pequeña', kind: 'poor', trust: -20, reaction: 'Cobras poco, y tu audiencia de bienestar se pregunta por qué promueves esto. Baja la confianza.' },
          { id: 'reject', label: 'Rechazarla y guardar la ruta para más adelante', kind: 'good', trust: 0, reaction: 'Esta ruta se activa mejor cuando suba tu audiencia y la marca encaje con tu tema. No toda oferta conviene.' },
        ],
      },
      {
        brand: 'Hoja Serena',
        proposal: 'Hoja Serena, una marca de té, te propone una colaboración pequeña de prueba. Encaja con tu tema, pero tu audiencia todavía es chica.',
        kit: { audience: 25, fit: 85, work: 30 },
        kitOptions: [
          { id: 'honest', label: 'Tus números reales, y dos trabajos propios como ejemplo', kind: 'good', trust: 5, reaction: 'Honesto y claro. La marca ve tu encaje y tu estilo.' },
          { id: 'inflate', label: 'Inflar un poco la audiencia para impresionar', kind: 'bad', trust: -20, reaction: 'La marca revisa tus números y no coinciden. Ya no confía en ti.' },
        ],
        offerOptions: [
          { id: 'accept', label: 'Aceptar la colaboración de prueba', kind: 'good', trust: 5, reaction: 'Cobras poco, pero encaja con tu tema y suma un trabajo real a tu media kit. Una primera vez pequeña es normal.' },
          { id: 'reject', label: 'Rechazarla y esperar a tener más audiencia', kind: 'meh', trust: 0, reaction: 'La marca queda en contacto. Pierdes la oportunidad de sumar un primer trabajo, y encajaba con tu tema.' },
          { id: 'demand', label: 'Pedir que te paguen como si tuvieras mucha audiencia', kind: 'bad', trust: -10, reaction: 'La marca ve tus datos y se retira. Se paga por la audiencia que se tiene, no por la que se desea.' },
        ],
      },
    ],
  },
});
