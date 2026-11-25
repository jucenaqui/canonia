# Mundo 1 · Zonas para decidir jugando

**Estado:** propuesta de diseño para revisar con el dueño. Cuando la apruebe, pasa a la especificación del Mundo 1 (`specs/004-mundo-1-nicho/spec.md`), que hay que enmendar para D47.
**Fuentes:** `docs-entrada/05-especificacion-maestra-aiif.md` (preguntas y opciones explícitas de F01), `docs-entrada/04-prompt-maestro-aiif.md` y la especificación de F01 en `factoria-aiif/`.
**Maqueta:** https://claude.ai/artifact/2vwqHYCpUEnEZ3VqRRoV94 (tiene una versión simple de la zona 1; los juegos detallados de este documento todavía no están construidos).

## Reglas comunes a las cinco zonas

- **Hacer, ver la consecuencia y elegir.** Cada zona tiene una acción corta (1 a 2 minutos) que enseña el concepto antes de decidir.
- **Las opciones son las de la factoría.** Donde la factoría da una lista explícita, se usa esa lista, con "Otra" y "No sé, recomiéndame".
- **Recomendar no es aprobar.** PIX puede recomendar, pero la pieza solo queda fijada al pulsar "Aprobar" (principio 3.3 de la especificación maestra).
- **Preguntar solo lo necesario.** Primero se usa lo que el jugador ya decidió; solo se pregunta lo que falta, y jugando (principio 3.4).
- **La IA ajusta los textos** a las respuestas anteriores. En la maqueta los textos vienen escritos.

## Zona 1 · Fuente de ingreso inicial

**Pregunta oficial:** ¿Cuál será la fuente de ingreso inicial?

**Opciones oficiales:** 1. UGC AI para marcas · 2. Marketing de afiliados · 3. Productos digitales · 4. Suscripciones o contenido exclusivo · 5. Patrocinios y colaboraciones · 6. Otra, dime cuál · 7. No sé, recomiéndame.

### Cómo funciona la zona

1. El jugador llega a una sala con **cinco máquinas**, una por opción, más una terminal **"Otra fuente"** y un punto **"No sé, recomiéndame"**.
2. Al acercarse a una máquina, PIX resume la opción en una frase. El botón **"Ver ficha"** abre la ficha completa (abajo).
3. Desde la ficha, el jugador puede **"Elegir esta"** directamente o **"Probar"**, que arranca el juego de esa máquina: tres pasos cortos con una decisión y su consecuencia. Dura alrededor de un minuto.
4. Al terminar, la máquina queda encendida y PIX dice qué se aprendió.
5. Con **"Elegir esta"** se abre la tarjeta de aprobación: la ficha resumida, la tabla que compara las cinco opciones y los botones "Aprobar" y "Seguir explorando".
6. **Cambiar después:** la sala de máquinas sigue abierta. Si el jugador abre la ficha de otra opción, aparece "Cambiar a esta". Al aprobar el cambio, lo que dependía de la fuente de ingreso (nicho, audiencia y objetivo a 90 días) queda marcado "por revisar" en la ficha del influencer; no se borra nada (D28, D52).

**Reglas de la factoría que se respetan en todas las fichas y juegos:**
- **Nada de promesas de dinero.** Las cifras son ejemplos y se presentan como "puede pasar si…", nunca como garantía (F11, regla anti-garantías).
- **Transparencia.** Cuando hay publicidad o enlaces de afiliado, el juego enseña a marcarlo (F11, transparencia comercial). Las reglas exactas dependen del país y de la red social, y el juego lo dice.
- **Un influencer virtual no inventa títulos.** No puede vender lo que exija ser médico, nutricionista o asesor financiero titulado (F11, productos digitales y servicios).

### Ficha y juego de cada opción

Cada ficha trae dos ejemplos (D52) y responde lo que F11 pide explicar de cada fuente: cómo entra el dinero, quién paga, qué hace falta antes, cuánta audiencia pide, ventajas, riesgos y para quién conviene.

---

#### 1. UGC AI para marcas

**Ficha**
- **Qué es:** creas fotos y videos para una marca, y ella los publica en sus propias cuentas o en sus anuncios.
- **Cómo entra el dinero:** la marca te paga por cada pieza o por un paquete (por ejemplo, tres videos). Si los quiere usar en anuncios pagados, se negocia un extra por los derechos de uso.
- **Quién paga:** la marca.
- **Qué necesitas antes:** unas cuantas piezas de muestra (portafolio) y saber leer un pedido de marca.
- **Audiencia que pide:** poca o ninguna. La marca compra el contenido, no tus seguidores.
- **Ventajas:** se puede empezar pronto; un influencer virtual produce rápido con IA.
- **Riesgos:** depende de conseguir clientes; cada marca pide cambios; hay que cuidar que el contenido no choque con tu estilo.
- **Para quién conviene:** quien quiere ingresos pronto y disfruta crear contenido por encargo.
- **Ejemplos:** "Una marca de agua de coco te paga por tres videos cortos mostrando la botella en una mañana de playa." · "Una app de idiomas te paga por cinco videos cortos mostrando cómo se usa."

**Juego · El pedido de la marca**
1. **Llega el pedido:** en la cabina aparece un holograma: "Video de 15 segundos de nuestra botella, ambiente fresco, para gente que hace deporte."
2. **Eliges el enfoque** entre tres: mostrar el producto, contar una mini historia o hacer un antes y después. Solo uno encaja de verdad con el pedido; otro encaja a medias.
3. **La marca revisa:** si encaja, aprueba y paga; si encaja a medias, pide un cambio y vuelves a elegir; si no encaja, explica por qué. Al final la marca pregunta: "¿Podemos usarlo también en anuncios?" y el jugador descubre que eso se cobra aparte.

**Qué aprende:** leer bien el pedido, que las revisiones son normales y que los derechos de uso valen dinero.

---

#### 2. Marketing de afiliados

**Ficha**
- **Qué es:** recomiendas productos de otras empresas con un enlace o código propio.
- **Cómo entra el dinero:** ganas una comisión por cada compra hecha con tu enlace.
- **Quién paga:** la empresa del producto, a través de su programa de afiliados.
- **Qué necesitas antes:** unirte a un programa de afiliados y tener productos que encajen con tu audiencia.
- **Audiencia que pide:** algo de audiencia; con pocos seguidores las ventas son pocas.
- **Ventajas:** fácil de empezar, sin crear un producto propio.
- **Riesgos:** comisiones pequeñas; si recomiendas por comisión y no por calidad, pierdes la confianza; dependes de las reglas del programa.
- **Para quién conviene:** quien ya usa y conoce productos de su tema y quiere empezar sin inversión.
- **Ejemplos:** "Recomiendas una cámara para principiantes y ganas un porcentaje de cada venta." · "Enlazas los libros que recomiendas y la librería en línea te paga una comisión."

**Juego · El estante de recomendaciones**
1. **Un seguidor pregunta:** "Quiero empezar a grabar videos, ¿qué me compro?"
2. **Eliges del estante** entre tres productos: uno que resuelve justo su necesidad (comisión media), uno caro con la comisión más alta pero que no le sirve, y uno barato que le sirve a medias.
3. **Antes de entregar el enlace**, el juego pide ponerle la etiqueta "enlace de afiliado". Si recomiendas el que no le sirve, cobras una vez pero baja tu **barra de confianza** y el siguiente seguidor ya no te compra. Si recomiendas el correcto, la confianza sube y llegan más compras pequeñas.

**Qué aprende:** la confianza vale más que la comisión, y los enlaces de afiliado se dicen.

---

#### 3. Productos digitales

**Ficha**
- **Qué es:** creas y vendes algo tuyo en formato digital: una guía, una plantilla, un curso, un pack de presets.
- **Cómo entra el dinero:** cada persona que lo compra te paga directamente.
- **Quién paga:** tus seguidores o clientes.
- **Qué necesitas antes:** saber qué problema resuelve tu producto y crearlo; después, darle soporte y actualizarlo.
- **Audiencia que pide:** media; hay que tener a quién vendérselo.
- **Ventajas:** cada venta deja casi todo el dinero; se vende muchas veces sin rehacerlo.
- **Riesgos:** mucho trabajo antes de la primera venta; si nadie tenía ese problema, no se vende; un influencer virtual no puede vender lo que exige un título profesional.
- **Para quién conviene:** quien sabe hacer algo que otros quieren aprender y puede esperar unos meses.
- **Ejemplos:** "Una plantilla para planificar las comidas de la semana." · "Un pack de filtros de foto con el estilo de tu influencer."

**Juego · Del problema al producto**
1. **Escucha a la gente:** flotan globos con comentarios de seguidores. Algunos repiten el mismo problema ("no sé qué cocinar entre semana"); otros son casos sueltos.
2. **Elige problema y formato:** el problema y una de tres formas: guía (rápida), plantilla (media) o curso (lenta). Cada una muestra cuánto tarda en hacerse.
3. **Arma y lanza:** recoges las piezas por la sala (más piezas cuanto más grande el formato) y lanzas el producto. Si elegiste un problema que se repetía, se vende bien; si era un caso suelto, casi no se vende y PIX explica por qué.

**Qué aprende:** un producto vende si resuelve un problema real que mucha gente tiene, y más formato no siempre es mejor.

---

#### 4. Suscripciones o contenido exclusivo

**Ficha**
- **Qué es:** tus seguidores pagan cada mes para recibir contenido que los demás no ven o para estar en una comunidad privada.
- **Cómo entra el dinero:** una cuota mensual por persona, mientras siga suscrita.
- **Quién paga:** tus seguidores más fieles.
- **Qué necesitas antes:** una razón clara para pagar cada mes y la capacidad de entregar contenido nuevo con regularidad.
- **Audiencia que pide:** bastante; solo una parte pequeña de los seguidores se suscribe.
- **Ventajas:** ingreso que se repite cada mes; relación cercana con la comunidad.
- **Riesgos:** si dejas de entregar, se van; moderar una comunidad da trabajo; hay que cuidar la privacidad.
- **Para quién conviene:** quien ya tiene una comunidad que pide más y puede comprometerse con un ritmo fijo.
- **Ejemplos:** "Un club con una rutina exclusiva cada semana y un chat privado." · "Fotos y videos detrás de cámaras, solo para miembros, cada semana."

**Juego · Cuatro semanas de club**
1. **Abre el club** con tres suscriptores. Una llama representa su interés.
2. **Cada semana** (unos 15 segundos) haces dos cosas: entregar el contenido exclusivo (llevar una pieza al altar) y responder un mensaje de la comunidad. Si cumples, la llama crece y llega alguien más; si te saltas una semana, la llama baja y alguien se va.
3. **Al final del mes** ves cuántos quedaron y cuánto trabajo costó.

**Qué aprende:** se gana con constancia, no de un día para otro, y la comunidad también da trabajo.

---

#### 5. Patrocinios y colaboraciones

**Ficha**
- **Qué es:** una marca te paga por aparecer o hablar de ella en tus propias cuentas.
- **Cómo entra el dinero:** un pago por publicación, por campaña o por un acuerdo de varios meses.
- **Quién paga:** la marca.
- **Qué necesitas antes:** una audiencia que le interese a la marca, datos que lo muestren (un "media kit") y un estilo que encaje con ella.
- **Audiencia que pide:** mucha; la marca paga por llegar a tus seguidores.
- **Ventajas:** pagos más altos por pieza cuando ya tienes audiencia; da prestigio.
- **Riesgos:** sin audiencia no llega; aceptar marcas que no encajan daña la confianza; siempre hay que marcar que es publicidad.
- **Para quién conviene:** como segunda fuente, cuando ya hay audiencia. Rara vez como primera.
- **Ejemplos:** "Una marca de ropa deportiva te paga por aparecer con su chaqueta en tres publicaciones." · "Una marca de té te paga una campaña de dos meses, con una publicación por semana."

**Juego · La propuesta de la marca**
1. **Llega una propuesta** y la máquina muestra el media kit con tres medidores: audiencia, encaje con tu tema y ejemplos de trabajos. Al empezar, el de audiencia está casi vacío.
2. **Decides** entre aceptar una oferta pequeña de una marca que no encaja con tu tema, o rechazarla y guardar la ruta para más adelante.
3. **Consecuencia:** si aceptas la que no encaja, cobras poco y baja la confianza de tu audiencia; si rechazas, PIX explica que esta ruta se activa mejor cuando suba tu audiencia. En los dos casos el juego muestra cómo se marca una publicación como "publicidad".

**Qué aprende:** las marcas pagan por audiencia y por encaje, y no toda oferta conviene.

---

### "Otra fuente" y "No sé, recomiéndame"

- **Otra fuente:** el jugador la escribe. La IA la explica con el mismo formato de ficha y, si no puede, dice qué datos faltan. Se aprueba igual que las demás.
- **No sé, recomiéndame:** PIX compara las cinco con los criterios de F01 (rapidez para empezar, cuánta audiencia pide, esfuerzo, cuánto puede crecer y el contexto del jugador). Si le falta un dato, hace **una sola pregunta jugada**: dos plataformas, "Lo antes posible" o "Puedo esperar unos meses". Marca con una estrella la recomendada y explica por qué en dos frases. El jugador puede elegir cualquier otra.

### Tabla de comparación (en la tarjeta de aprobación)

| Opción | Rapidez para empezar | Audiencia que pide | Esfuerzo | Cuánto puede crecer |
|---|---|---|---|---|
| UGC AI para marcas | Alta | Baja | Medio | Medio |
| Marketing de afiliados | Alta | Media | Bajo | Medio |
| Productos digitales | Baja | Media | Alto | Alto |
| Suscripciones o contenido exclusivo | Baja | Alta | Medio | Alto |
| Patrocinios y colaboraciones | Baja | Alta | Bajo | Medio |

Son valores de partida. En el juego, la IA los ajusta al contexto del jugador y los presenta como orientación, no como promesa.

### Decisiones de la zona 1 (D51, 2026-11-25)

1. **Elegir o probar:** desde la ficha de cada opción se puede elegir directamente o probar el juego antes. Probar no es obligatorio.
2. **Duración:** se construyen dos versiones en la maqueta, de alrededor de un minuto y larga, para que el dueño las compare antes de decidir.
3. **Barra de confianza:** sí, para mostrar las consecuencias en afiliados y patrocinios.

## Zona 2 · Nicho

**Pregunta oficial:** ¿Cuál será el nicho principal de tu influencer?

**Opciones oficiales (11):** inteligencia artificial y tecnología; lifestyle; moda y belleza; fitness y wellness; viajes; gaming; finanzas y negocios; entretenimiento; arte, fotografía y estética visual; otro; no sé, recomiéndame.

**Juego · El radar de demanda**
1. Los nueve nichos son **chispas** repartidas por la zona. El jugador recoge las que le llaman la atención.
2. Al lanzar una chispa al radar, ve **cuánta gente busca ese tema** (luces) y **cuánta competencia hay** (torres altas).
3. En el **yunque** combina el nicho con un tema suyo para bajar de nivel: nicho principal, subnicho y micro nicho (como pide el prompt maestro). El ejemplo muestra que al ser más específico bajan las torres.
4. La IA ofrece entre 2 y 4 caminos con su ventaja y su riesgo, uno recomendado. El jugador sube al que prefiere y aprueba.

**Qué aprende:** ser específico hace más fácil destacar. La IA tiene en cuenta la fuente de ingreso ya aprobada (por ejemplo, con UGC conviene un nicho donde las marcas compran contenido).

**Recomiéndame:** PIX usa la fuente de ingreso y las chispas recogidas para proponer los caminos.

## Zona 3 · Audiencia objetivo

**Pregunta rectora:** ¿A qué audiencia se dirige? La factoría no fija una lista; el prompt maestro pide edad, sexo, países, intereses, problemas, deseos y poder adquisitivo.

**Juego · La plaza de conversaciones**
1. La IA crea de 4 a 6 personas posibles a partir del nicho. Cada una lleva un **globo con su problema o su deseo**.
2. Al hablarles, PIX muestra su ficha corta: edad, país, qué busca y cuánto puede gastar.
3. Se **iluminan** las que el nicho puede ayudar de verdad.
4. El jugador lleva **una o dos** a su cápsula y aprueba.

**Qué aprende:** la audiencia es la gente a la que ayudas, no "todo el mundo".

**Mercados y plataformas:** no tienen zona propia. La IA los deduce de la audiencia y el jugador los confirma ante el jefe (como ya dice la spec del Mundo 1).

## Zona 4 · Tiempo disponible

**Pregunta rectora:** ¿Cuánto tiempo real puede dedicar? Si no lo sabe, la factoría pide "No estoy seguro, ayúdame a estimarlo", no que la IA lo invente.

**Juego · La balanza y la torre**
1. **La balanza de la semana** (la ayuda para estimar): el jugador coloca bloques de su semana (trabajo, familia, descanso, estudio). Lo que sobra es su tiempo real.
2. **La torre:** cada piso es una cantidad de horas a la semana y muestra la rutina que exige (cuántas publicaciones, grabar, editar, responder).
3. El jugador sube hasta el piso que de verdad puede sostener y aprueba.

**Qué aprende:** es mejor poco y constante que mucho y abandonar.

## Zona 5 · Objetivo a 90 días

**Pregunta rectora:** ¿Qué resultado medible se busca en 90 días? El prompt maestro habla de seguidores a 90 días, ingresos mensuales y publicaciones.

**Juego · El detector de metas**
1. Aparecen metas posibles, algunas buenas y algunas trampa (por ejemplo "ser famoso" o "hacerme viral").
2. El jugador pasa cada meta por el **detector**: las vagas se rompen como una imagen con errores; las buenas se iluminan si tienen un número, si son realistas con su tiempo y si van ligadas a su fuente de ingreso.
3. La IA arma tres metas buenas con lo ya decidido. El jugador elige una y aprueba.

**Qué aprende:** una buena meta tiene un número y una fecha, y cabe en el tiempo que tiene.

## Decisiones que quedan para el dueño

1. Las de la zona 1 están en su propia sección.
2. **Zona 2:** ¿se usan como chispas los nueve nichos oficiales, tal cual?
3. **Zona 3:** ¿una o dos personas en la cápsula, o solo una?
4. **Zona 4:** ¿qué pisos tiene la torre? Propuesta: 2, 5 y 10 horas a la semana.
5. **Zona 5:** ¿se incluyen metas trampa para aprender a descartarlas?
