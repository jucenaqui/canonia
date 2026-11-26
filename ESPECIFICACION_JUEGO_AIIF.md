# Canonia — Especificación del juego didáctico sobre AI Influencer Factory

**Versión:** borrador 0.2 · 2026-11-16
**Estado:** en conversación. Nada de este documento está cerrado.
**Nombre del juego:** Canonia **[Decidido]**. Subtítulo propuesto: "Crea tu influencer" **[Propuesto]**.

Cada punto lleva una marca:

- **[Decidido]** lo dijo el dueño del proyecto.
- **[Propuesto]** es una recomendación pendiente de aprobar.
- **[Abierto]** falta definirlo.

---

## 1. Qué es

**[Decidido]** Un juego didáctico de plataformas por mundos. El jugador recorre los mundos, gana puntos, sube de nivel y desbloquea habilidades. Al terminar el último mundo tiene un influencer virtual completamente creado, listo para trabajar en redes sociales.

**[Decidido]** La base de contenido es AI Influencer Factory Portable v1.0.2 (Sistema 00 + fases F01–F13). El jugador pasa por todas las etapas.

**[Decidido]** El juego no termina al crear el influencer. Después viene una etapa de cursos, capacitaciones y diplomados para seguir creciendo con el influencer ya creado.

**[Propuesto]** Personaje, mundos, arte y música propios. Se toma el género de plataformas, no un juego existente.

## 2. Para quién

**[Decidido]** Cualquier persona sin conocimientos previos que quiera crear su influencer para redes sociales (Instagram y otras): nicho, micronicho y todo lo necesario para crear contenido.

**[Decidido]** (D41) El público es adulto. El tono, los textos y el arte no deben verse infantiles.

**[Decidido]** La primera versión cubre solo el influencer virtual. La marca personal de una persona real queda como segundo modo, porque cambia la identidad visual (F06) y la producción con IA (F10).

## 3. Objetivos

**[Decidido]** Dos objetivos con el mismo peso:

1. Que el jugador aprenda.
2. Que el jugador salga con el influencer hecho.

**[Decidido]** Tiene que ser divertido, no un formulario disfrazado.

## 4. Mecánica

**[Decidido]** Plataformas clásico (caminar, saltar, esquivar, enemigos) con un mapa de mundos como centro de navegación.

**[Decidido]** (D46) El juego pasa a un **mundo 3D abierto con la cámara detrás del personaje**: el jugador camina en todas direcciones, salta y explora, en lugar de avanzar de izquierda a derecha. Se mantienen las puertas de decisión, los jefes, el mapa de mundos, PIX y el resto de las reglas de esta sección. Cómo se construye quedó decidido en D50: three.js como herramienta 3D, se conserva todo el juego salvo la presentación del mundo, arte 3D generado con IA, y la especificación del motor es `specs/006-motor-3d/spec.md`.

Reglas de diseño **[Propuesto]**:

- ~~**Puertas de decisión.** Dentro de cada nivel hay puertas que detienen la acción y abren el reto de la fase (elegir, comparar, escribir, aprobar).~~ *Enmendado por D47.*
- **[Decidido]** (D47) **Decidir jugando: cada pregunta es una zona.** Cada pregunta de la fase es una zona pequeña dentro del distrito, donde el jugador explora y hace acciones que construyen la respuesta (encender una máquina, recoger intereses, llevar personas a su cápsula, subir a un piso, elegir un camino). PIX explica y la IA propone las opciones dentro de la zona. Al terminar, la respuesta se confirma con una aprobación explícita. Las preguntas de cada mundo siguen siendo las de D26. Las acciones concretas de cada zona se validan con una maqueta jugable **[Propuesto]**.
- **Las decisiones nunca se toman por reflejo.** Ningún dato del influencer queda fijado por un salto. Todo lo que se vuelve definitivo pasa por una aprobación explícita, como exige la factoría.
- **Jefe de mundo = validador de la fase.** Para cerrar un mundo, el jugador presenta lo que creó y el validador de esa fase lo revisa.
- **Una mecánica nueva por mundo.** Cada mundo añade un elemento de juego ligado a su fase, para dar variedad sin construir 13 juegos distintos.
- **Fallar en la parte de habilidad no bloquea la creación.** Se puede reintentar sin perder lo ya decidido. Modo de ayuda para quien no es jugador.
- ~~**Controles táctiles simples:** izquierda, derecha y saltar.~~ *Enmendado por D46.*
- **[Decidido]** (D46, D50) **Controles táctiles:** palanca a la izquierda para moverse en todas direcciones, botón de saltar y botón de acción a la derecha, y deslizar el dedo por la escena para girar la cámara. En el ordenador, flechas o WASD, espacio para saltar, E para la acción, y Q y R para la cámara. Es el esquema de la maqueta que probó el dueño.

## 5. Mundos

**[Propuesto]** Un mundo por fase, en el orden de la factoría.

| Mundo | Fase | Lo que el jugador crea |
|---|---|---|
| 1 | F01 Fundamentos Estratégicos | Fuente de ingreso, nicho, audiencia, tiempo disponible, objetivo a 90 días |
| 2 | F02 Concepto | Concepto del influencer |
| 3 | F03 Biografía e Identidad | Nombre, identidad básica, biografía |
| 4 | F04 Personaje y Psicología | Personalidad y reglas de comportamiento |
| 5 | F05 Identidad de Marca | Posicionamiento y propuesta de valor |
| 6 | F06 Identidad Visual | Identidad física, estilo y referencias visuales |
| 7 | F07 Identidad Verbal y Voz | Cómo escribe y cómo suena |
| 8 | F08 Universo Narrativo | Mundos, relaciones, rutinas y continuidad |
| 9 | F09 Sistema de Contenido | Pilares, formatos y reglas editoriales |
| 10 | F10 Producción IA | Prompts, paquetes de producción y primeros activos |
| 11 | F11 Monetización | Rutas y secuencia de monetización |
| 12 | F12 Crecimiento | Metas, métricas y experimentos |
| 13 | F13 Consolidación | Perfil Maestro + Paquete Portable (mundo final) |

**[Decidido]** Cada mundo pide entre 3 y 5 decisiones, usando la profundidad mínima que la factoría define. Las especificaciones completas son demasiado largas para un principiante.

~~**[Decidido]** Tema visual: "Dentro del teléfono". Los mundos son el interior de una red social: plataformas hechas de publicaciones, corazones para recoger, trolls y notificaciones como enemigos, y el algoritmo como jefe.~~ Reemplazado por D41.

**[Decidido]** (D41) El mundo del juego es **The Influence Foundry**, la ciudad-fábrica del documento del dueño (`AI_Influencer_Factory_World_Spec_v1`): un núcleo central, PIX Central, conectado a distritos especializados. Se adopta su mundo, sus personajes y su dirección de arte, **no** su género: Canonia sigue siendo un juego de plataformas con puertas de decisión (D07), y la gestión, la economía y las cifras simuladas del documento no entran.

- **[Decidido]** PIX Central es el mapa de mundos: desde allí se entra a cada distrito.
- **[Decidido]** Personajes: **PIX** es el guía del jugador (explica, avisa los errores, acompaña). El **Avatar Smith** y la **Prompt Mechanic** son maestros de sus distritos.
- **[Decidido]** Se mantiene: el influencer acompaña al jugador como una silueta que gana rasgos en cada mundo.
- **[Decidido]** Dirección de arte, la del documento: futurista luminoso, premium, colorido y legible; personajes estilizados con proporciones semi-realistas y siluetas claras; blanco, cyan, violeta y acentos dorados; nada de cyberpunk oscuro ni suciedad industrial. El acabado debe ser llamativo y profesional. No debe parecerse a ninguna red social concreta.
- **[Decidido]** (D42) El documento y las imágenes de referencia son del dueño y se publican con la licencia del contenido (CC BY-SA). Están en `docs-entrada/03-influence-foundry.md` y `docs-entrada/influence-foundry/`.
- **[Decidido]** (D45) El arte se produce en dos pasos: primero se redibuja con código en la paleta y el estilo de The Influence Foundry; en paralelo, el dueño genera ilustraciones siguiendo el encargo de `docs/arte/encargo-ilustraciones.md`, y esas ilustraciones reemplazan al dibujo por código cuando estén.
- **[Decidido]** (D45) El protagonista que corre y salta es **el influencer del jugador**, que empieza como silueta y gana rasgos en cada mundo. PIX lo acompaña volando.
- **[Abierto]** Nombres de los distritos en español: el juego está en español (D23) y el documento los nombra en inglés.

**[Decidido]** (D43) Qué distrito es cada mundo. Los jefes o maestros "por definir" se deciden al especificar cada mundo:

| Mundo | Fase | Distrito | Maestro o jefe |
|---|---|---|---|
| 1 | F01 Fundamentos Estratégicos | PIX Central, el núcleo apagado que el jugador enciende | El Generalista (D44) |
| 2 | F02 Concepto | The Forge | Avatar Smith |
| 3 | F03 Biografía e Identidad | The Forge, con sello en The Vault | Avatar Smith |
| 4 | F04 Personaje y Psicología | The Forge, banco de personalidad | Avatar Smith |
| 5 | F05 Identidad de Marca | Brand Avenue | Por definir |
| 6 | F06 Identidad Visual | The Forge, cámara de cuerpo y rostro | Avatar Smith |
| 7 | F07 Identidad Verbal y Voz | The Forge, estación de voz | Avatar Smith |
| 8 | F08 Universo Narrativo | Simulation City | Por definir |
| 9 | F09 Sistema de Contenido | Content District | Por definir |
| 10 | F10 Producción IA | Prompt Garage | Prompt Mechanic |
| 11 | F11 Monetización | Brand Avenue y Deal Room | Por definir |
| 12 | F12 Crecimiento | Growth Tower | Por definir |
| 13 | F13 Consolidación | The Vault | Por definir |

**[Abierto]** Variación visual de cada mundo.

## 6. Progresión

**[Propuesto]** Dos cosas separadas:

- **Progreso del jugador:** puntos, niveles y habilidades. Mide lo que aprende. **[Decidido]** Las habilidades se ganan con validaciones superadas o cursos completados.
- **Inventario del influencer:** las piezas aprobadas en cada mundo (nicho, concepto, nombre, etc.). Es lo que se exporta al final.

**[Propuesto]** El premio final es real: el Perfil Maestro y el paquete portable, para continuar con cualquier IA usando "Continuar [Nombre Influencer]".

**[Decidido]** (D48) **Chispas.** Lo que el jugador recoge por el mundo son chispas. Cada cierto número de chispas, PIX desbloquea un consejo extra de creación de contenido; un consejo desbloqueado no se pierde nunca. Cada fallo cuesta un porcentaje de las chispas que se llevan, nunca todas.

**[Decidido, para más adelante]** (D48) **Creator Market.** Las chispas servirán como moneda para personalizar al influencer (ropa, escenarios, accesorios) en el Creator Market. Se diseña cuando el influencer tenga aspecto, a partir del Mundo 6 (identidad visual).

**[Abierto]** Reglas concretas de puntos, niveles y catálogo de habilidades.

## 7. Inteligencia artificial

**[Decidido]** El juego debe poder funcionar con la IA integrada o con la IA del propio jugador, y admitir tanto suscripción como API.

**[Decidido]** Orden de construcción: primera versión dentro de Claude; después, la versión con API.

| Modo | Cómo funciona | Quién paga | Cuándo |
|---|---|---|---|
| Dentro de Claude, IA directa | El juego se publica como página dentro de Claude y usa la IA del plan del jugador, cuando su cuenta la ofrece | El jugador, con su suscripción | Primera versión |
| Dentro de Claude, modo guía | El juego arma la pregunta, el jugador la pega en cualquier IA (el chat de Claude, ChatGPT, Gemini u otra), pega la respuesta de vuelta y el juego la valida igual | Nadie: sirve con cuentas gratuitas | **[Decidido]** Primera versión (D37) |
| App propia con API | App independiente que llama a Claude por API | El dueño del juego, o el jugador con su propia clave | Segunda versión |

**[Decidido]** (D37) El juego usa la IA directa cuando la cuenta del jugador la ofrece y, si no, pasa al modo guía. La IA sigue siendo central en ambos casos: el jugador nunca crea su influencer sin ayuda de una IA.

**[Decidido]** (D38) En el modo guía pasan por la IA del jugador solo las opciones de cada puerta y la revisión del jefe.

**[Decidido]** (D39) Desde la versión jugable mínima, la partida se guarda sola en el almacenamiento del navegador del jugador, porque la app de Claude del teléfono recarga la página al volver de otra app. Exportar e importar la partida sigue siendo de la feature de guardado.

Restricciones confirmadas (2026-11-17):

- Con una cuenta gratuita de Claude, la página del juego no recibe la IA (prueba T004).
- Una app propia no puede usar la suscripción de Claude del jugador (Free, Pro o Max) ni ofrecer "iniciar sesión con Claude". Las apps de terceros usan claves de API, que se pagan por uso. Fuente: documentación legal de Claude Code.

## 8. Plataformas

**[Decidido]** Móvil y web. Se diseña primero para móvil y luego se adapta a web.

Consecuencia de empezar dentro de Claude: la primera versión es una página que se juega desde la app de Claude en el teléfono, no una app de tienda. La app de tienda llega con la versión de API.

## 9. Después del juego

**[Decidido]** Con el influencer creado, el jugador accede a cursos, capacitaciones y diplomados para seguir creciendo.

**[Abierto]** Contenido, formato, certificación y si es gratis o de pago. El dueño del proyecto tiene más ideas pendientes de contar.

## 10. Alcance de la primera versión

**[Decidido]** La especificación cubre la visión completa, pero la primera versión construye solo los mundos 1 a 3 (nicho, concepto, nombre y biografía), dentro de Claude. Sirve para comprobar si el juego divierte y enseña antes de construir los otros diez mundos.

Fuera de la primera versión **[Decidido]**: versión con API, app de tienda, modo marca personal, academia posterior al juego.

## 11. Modelo y forma de trabajo

**[Decidido]** Proyecto de código abierto, pensado para que otras personas lo extiendan y mejoren con el tiempo. El modelo de negocio no está definido.

**[Decidido]** Contribuciones económicas voluntarias, nunca obligatorias. **[Abierto]** Por qué medio.

**[Decidido]** Repositorio público en GitHub, en la cuenta `jucenaqui`.

**[Decidido]** Se publica el juego y la factoría AIIF, sin el proyecto piloto. La factoría queda genérica: no enlazada a ningún influencer específico.

**[Decidido]** Licencias: MIT para el código y Creative Commons BY-SA para el contenido.

**[Decidido]** Se trabaja con Spec Kit (desarrollo guiado por especificación) desde el inicio, para dejar traza. Cada decisión se registra en este documento.

**[Decidido]** El archivo `ESTADO.md` guarda siempre el estado actual del proyecto, para poder retomarlo desde cualquier sesión sin depender del historial de un chat. Es regla canónica leer `ESTADO.md` y esta especificación antes de hacer cualquier cambio, y dejarlos al día al terminar. Las reglas están en `CLAUDE.md`.

## 12. Riesgos

- **Controles táctiles.** El plataformas clásico es el más exigente para alguien que no juega. Se mitiga con controles simples y modo de ayuda.
- **Ritmo.** Las respuestas de la IA tardan; hay que diseñar qué hace el jugador mientras espera.
- **Volumen.** Reducir cada fase a 3–5 decisiones sin perder lo esencial de la metodología.
- **Tamaño del proyecto.** Trece mundos, dos plataformas, varios modos de IA y una academia. Por eso la primera versión es pequeña.
- **Costos.** En la versión con API cada partida cuesta dinero.

## 13. Preguntas abiertas

1. ~~Nombre del personaje~~ y subtítulo del juego. *El personaje guía es PIX (D41); sigue abierto el subtítulo.*
2. Nombre y variación visual de cada mundo. *Distrito de cada mundo decidido en D43 (sección 5); siguen abiertos los nombres en español y la variación visual.*
3. Guardado de progreso y cuentas de usuario en la versión dentro de Claude. *En parte resuelta por D39: guardado automático en el navegador del jugador; siguen abiertas las cuentas y el paso de la partida a otro dispositivo.*
4. Medio para las contribuciones voluntarias.
5. ~~Si el modo guía entra y en qué versión.~~ Resuelta en D37: entra en la primera versión.
6. Las ideas pendientes para después del juego.

## 14. Registro de decisiones

| # | Fecha | Decisión |
|---|---|---|
| D01 | 2026-11-16 | El juego es didáctico, de plataformas por mundos, y termina con un influencer virtual creado a partir de AIIF F01–F13. |
| D02 | 2026-11-16 | Público: personas sin conocimientos previos que quieren crear contenido en redes. |
| D03 | 2026-11-16 | Doble objetivo: aprender y salir con el influencer hecho. |
| D04 | 2026-11-16 | Móvil primero; web después. |
| D05 | 2026-11-16 | Después del juego hay cursos, capacitaciones y diplomados. |
| D06 | 2026-11-16 | IA: primera versión dentro de Claude; después, versión con API. |
| D07 | 2026-11-16 | Mecánica: plataformas clásico con mapa de mundos. *Enmendada por D46: mundo 3D abierto.* |
| D08 | 2026-11-16 | Primera versión: solo mundos 1 a 3. |
| D09 | 2026-11-16 | Primera versión: solo influencer virtual. |
| D10 | 2026-11-16 | Entre 3 y 5 decisiones por mundo. |
| D11 | 2026-11-16 | Proyecto de código abierto, con contribuciones económicas voluntarias. |
| D12 | 2026-11-16 | Repositorio público en GitHub (`jucenaqui`) y trabajo con Spec Kit desde el inicio. |
| D13 | 2026-11-16 | El juego se llama Canonia. |
| D14 | 2026-11-16 | Se publica juego + factoría AIIF sin el piloto; la factoría queda genérica, sin influencer específico. |
| D15 | 2026-11-16 | Licencias: MIT (código) y CC BY-SA (contenido). |
| D16 | 2026-11-16 | Tema visual: "Dentro del teléfono", con acabado llamativo y profesional. *Reemplazada por D41.* |
| D17 | 2026-11-16 | La copia pública de la factoría se limpió del piloto interno y de sus evidencias. |
| D18 | 2026-11-16 | `ESTADO.md` guarda el estado del proyecto; es regla canónica leerlo junto con esta especificación antes de cualquier cambio y mantenerlo al día. |
| D19 | 2026-11-16 | Arquitectura por capas robusta (dominio, aplicación, adaptadores, presentación). El "backend" de la primera versión es una capa interna, sin servidor. |
| D20 | 2026-11-16 | Desarrollo con subagentes en paralelo: PM, arquitecto, arquitecto de seguridad, frontend, backend y QA. Sus archivos se crean en el plan técnico. |
| D21 | 2026-11-16 | Los errores los explica un personaje del juego; el jugador nunca ve mensajes técnicos. |
| D22 | 2026-11-16 | Pruebas automáticas obligatorias de decisión e inventario. |
| D23 | 2026-11-16 | Juego en español; código en inglés. |
| D24 | 2026-11-16 | No se construye registro ni cuentas propias, ni generación de imagen o video en la primera versión. |
| D25 | 2026-11-16 | El nombre del influencer sigue el flujo completo de la especificación de nombramiento, con búsqueda real: guiada en el móvil (enlaces ya armados que el jugador revisa) y automática en la app de escritorio de Claude. Motivo: la IA de una página dentro de Claude no puede navegar. |
| D26 | 2026-11-16 | Aprobado el mapa de features: 8 features, puertas por mundo (5, 4 y 5), no-objetivos y orden de construcción (1, 2, 3 y 5 primero; después 4, 8, 6 y 7). Detalle en `docs-entrada/02-features.md`. |
| D27 | 2026-11-16 | *Motor reemplazado por la spec 006 (D50); se mantienen sin vidas, reaparecer cerca, ayuda tras tres fallos y tramos de 1 a 2 minutos.* Motor de plataformas: al fallar se reaparece cerca y sin vidas; los enemigos se vencen saltando encima; la ayuda se ofrece tras tres fallos en un tramo; cada tramo dura de 1 a 2 minutos. Detalle en `specs/001-motor-plataformas/spec.md`. |
| D28 | 2026-11-16 | *Forma de la puerta enmendada por D47 (zonas jugables).* Puertas de decisión: mini lección de una pantalla, tres tarjetas con una recomendada, y aprobación explícita. Al reabrir una pieza, las que dependían de ella se conservan y quedan por revisar. Durante la espera, un personaje muestra un dato útil. Detalle en `specs/002-puertas-decision-inventario/spec.md`. |
| D29 | 2026-11-16 | Jefe de mundo: pelea corta de plataformas y después revisión con los criterios del validador de la fase. El jefe avisa y el jugador decide; solo bloquea si falta una pieza o hay piezas por revisar. El mundo se cierra con la aprobación explícita del resumen, y la recompensa es ese resumen. Detalle en `specs/003-jefe-mundo-validacion/spec.md`. |
| D30 | 2026-11-16 | *Ambientación enmendada por D44.* Mundo 1 (Nicho): ambientado en la pestaña Explorar; el jefe es el Generalista y el Algoritmo se reserva para el jefe final del juego; antes de la primera puerta el jugador elige de 3 a 5 intereses con toques. Detalle en `specs/004-mundo-1-nicho/spec.md`. |
| D31 | 2026-11-16 | Enmienda a D25: la búsqueda del nombre es guiada para todos, en móvil y en escritorio. Motivo: dentro de Claude, el navegador de la app solo puede usarlo quien publicó la página, no los jugadores. La búsqueda automática queda para la versión con servidor. |
| D32 | 2026-11-16 | La versión jugable mínima incluye tres añadidos: mapa mínimo de un mundo, aviso de que el progreso no se guarda, y modo de demostración fuera de Claude. Detalle en `specs/005-version-jugable-minima/spec.md`. |
| D33 | 2026-11-16 | *"Sin dependencias" enmendado por D50 (three.js).* Aprobado el plan técnico de la versión jugable mínima: JavaScript en módulos sin compilación ni dependencias, cuatro capas más contenido, IA por la capacidad del entorno de Claude, pruebas con Node, seis subagentes. Detalle en `specs/005-version-jugable-minima/plan.md`. |
| D34 | 2026-11-16 | Se evaluó pasar ya a una app con servidor (búsqueda automática y guardado para todos). El dueño decidió mantener el orden de D06: primero dentro de Claude, después con servidor. Motivo: fuera de Claude la IA solo funciona por API de pago. |
| D35 | 2026-11-16 | Aprobada la lista de tareas de la versión jugable mínima: 82 tareas en 10 fases, empezando por una prueba técnica dentro de Claude. Detalle en `specs/005-version-jugable-minima/tasks.md`. |
| D36 | 2026-11-16 | Los puntos de aprendizaje se aplazan a la feature de mapa y progreso. La versión jugable mínima solo registra qué mini lecciones se completaron. |
| D37 | 2026-11-17 | La prueba T004 mostró que, con una cuenta gratuita de Claude, la página no recibe la IA. Además, un servidor propio no puede usar la suscripción del jugador. El dueño decide que la IA es central y debe llegar a todos: IA directa dentro de Claude cuando la cuenta la ofrece y, si no, modo guía (el jugador pega la pregunta en cualquier IA gratuita y trae la respuesta, que el juego valida igual). El modo guía entra en la primera versión. Se mantiene D34: sin servidor por ahora. |
| D38 | 2026-11-17 | En el modo guía solo pasan por la IA del jugador las tres opciones de cada puerta y la revisión del jefe. "Recomiéndame" usa la opción recomendada que ya viene con las opciones, y el comentario a la respuesta escrita se omite, porque nunca bloquea. Antes de ajustar el plan, se prueba el viaje de ida y vuelta en el teléfono con la página de prueba (T004b). |
| D39 | 2026-11-17 | T004b mostró que la app de Claude del teléfono recarga la página al volver de otra app, y que el almacenamiento del navegador sobrevive a la recarga. El dueño decide adelantar a la versión jugable mínima un guardado automático en el almacenamiento del navegador: se guarda al aprobar y antes de copiar una pregunta del modo guía, y al volver el juego reabre la misma puerta o la revisión del jefe. Si el navegador no deja guardar, el juego lo avisa. Exportar e importar siguen en la feature de guardado. |
| D40 | 2026-11-17 | El dueño aprueba el ajuste de la versión jugable mínima tras la prueba técnica (T005): modo guía (D37, D38) y guardado en el navegador (D39) en la spec, el contrato, el plan, el modelo de datos, la investigación y las tareas de 005 (95 tareas), con notas de enmienda en 002, 003 y 004. La Fase 0 queda cerrada; sigue la Fase 1. |
| D41 | 2026-11-17 | El dueño ve el arte provisional y las propuestas demasiado infantiles: el público es adulto. Comparte su documento "The Influence Foundry" (mundo, personajes y jugabilidad de gestión) e imágenes de referencia. Elige adoptar su **mundo, personajes y dirección de arte** manteniendo el juego de plataformas con puertas: PIX Central es el mapa, cada distrito es un mundo, PIX es el guía, el Avatar Smith y la Prompt Mechanic son maestros de distrito. Reemplaza el tema "Dentro del teléfono" (D16) y obliga a revisar la ambientación del Mundo 1 (D30). La gestión, la economía y las cifras simuladas del documento no entran. |
| D42 | 2026-11-17 | El documento "The Influence Foundry" y sus imágenes son del dueño, hechos con IA, y se publican en el repositorio con CC BY-SA. Entran como documento de entrada (`docs-entrada/03-influence-foundry.md`) con las imágenes en `docs-entrada/influence-foundry/`. La propuesta de distrito por mundo queda pendiente: el dueño quiere cambiarla. |
| D43 | 2026-11-17 | El dueño aprueba sin cambios el reparto de distritos por mundo de la sección 5: Mundo 1 en PIX Central; 2, 3, 4, 6 y 7 en The Forge; 5 en Brand Avenue; 8 en Simulation City; 9 en Content District; 10 en Prompt Garage; 11 en Brand Avenue y Deal Room; 12 en Growth Tower; 13 en The Vault. Los jefes marcados "por definir" se deciden al especificar cada mundo. |
| D44 | 2026-11-17 | Mundo 1 en PIX Central: "encender la fábrica". El núcleo empieza apagado; el jugador recorre anillos y pasarelas de luz, cada puerta resuelta enciende un sector y al cerrar el mundo se enciende la primera cápsula de su influencer. PIX enseña los controles y la primera puerta. El jefe sigue siendo el Generalista, rehecho como un holograma inestable de todos los temas mezclados: un influencer "sin forjar". Enmienda la ambientación de D30 y de la spec 004 (FR-004, FR-034, nuevos FR-041 y FR-042); las puertas no cambian. Nueva tarea T095. |
| D45 | 2026-11-17 | El dueño probó el tramo y vio que el aspecto no había cambiado: D41 a D44 estaban decididas pero sin dibujar. Decide producir el arte en dos pasos: redibujar ya con código en la paleta de The Influence Foundry y, en paralelo, generar él las ilustraciones con un encargo escrito; las ilustraciones reemplazan al código cuando lleguen. Decide también que el protagonista que corre es su influencer en silueta, con PIX volando a su lado. |
| D46 | 2026-11-24 | El dueño quiere mejorar el diseño con personajes en 3D. Se generó a PIX en 3D con Magnific como prueba y se publicó una maqueta jugable con tres vistas (de lado, en diagonal y mundo abierto). Tras probarla, el dueño elige el **mundo 3D abierto con cámara detrás**. Enmienda D07 (de "plataformas clásico" a plataformas en mundo 3D abierto) y los controles de la sección 4, y obliga a revisar D27 (motor), D33 (plan técnico sin dependencias), D45 (arte) y la spec 001. Quedan abiertos: la herramienta 3D, el destino del motor 2D actual, cómo se produce el arte 3D y el orden de trabajo. Maqueta: https://claude.ai/artifact/7XkP3mU9C9yEk7ufj6EQec |
| D47 | 2026-11-24 | El dueño quiere que cada fase y sus preguntas sean mundos pequeños donde se decide jugando. Aprueba la propuesta: cada pregunta de la fase es una zona del distrito con acciones que construyen la respuesta (Mundo 1: máquinas de ingreso, chispas de interés que dan los nichos, plaza de audiencia, torre del tiempo, camino de metas a 90 días), y cada respuesta se confirma con aprobación explícita. Enmienda D28 (la puerta como pantalla que detiene el juego con tres tarjetas) y obliga a revisar las specs 002 y 004. D26 no cambia. Se valida primero con una maqueta jugable. |
| D48 | 2026-11-25 | Chispas: lo que se recoge por el mundo son chispas y sirven para desbloquear consejos extra de PIX sobre creación de contenido (un consejo desbloqueado no se pierde). Cada fallo cuesta un porcentaje de las chispas, nunca todas. Queda decidido para más adelante usar las chispas como moneda del Creator Market para personalizar al influencer, a partir del Mundo 6. Reemplaza a los corazones de la feature 1. Cuántas chispas por consejo y qué porcentaje se pierde se fijan en el plan técnico (valor de partida: un consejo cada 10 chispas y un 25 % por fallo). |
| D49 | 2026-11-25 | Enemigos en el mundo 3D (dron de spam): tocarlo de lado o desde abajo empuja al personaje y cuenta como fallo (pierde el porcentaje de chispas de D48 y reaparece en el último sitio seguro); caerle encima lo vence, desaparece y vuelve a aparecer en su recorrido al cabo de un minuto. Mantiene la regla de D27 de vencer enemigos saltando encima, pero el enemigo vencido ya no queda vencido para siempre. Llevado a la spec 006 (historia 4, FR-023, FR-029 a FR-029b). |
| D50 | 2026-11-25 | El dueño aprueba la especificación del motor 3D y zonas de decisión (`specs/006-motor-3d/spec.md`), que reemplaza a la feature 1, con sus tres supuestos: three.js como herramienta 3D (primera dependencia externa; enmienda la regla "sin dependencias" de D33), se conserva todo el juego (dominio, aplicación, adaptadores, guardado, IA, modo guía, pantallas y pruebas) y solo se rehace la presentación del mundo, y el arte 3D se genera con IA (Magnific) y se comprime para el juego final. Resuelve las preguntas abiertas 10 a 13. Sigue el plan técnico. |
| D51 | 2026-11-25 | Zona de fuente de ingreso del Mundo 1: cada opción tiene una ficha detallada y un juego corto con decisiones y consecuencias (diseño en `docs/diseno/mundo-1-zonas.md`). El jugador puede elegir una opción directamente desde su ficha o probarla antes. Se usa una barra de confianza para mostrar las consecuencias en afiliados y patrocinios. La duración de los juegos (alrededor de un minuto o una versión larga) se decide tras probar las dos en la maqueta. |
| D52 | 2026-11-25 | Zona de fuente de ingreso: cada ficha trae dos ejemplos. La elección se puede cambiar después volviendo a la sala de máquinas; al aprobar el cambio, nicho, audiencia y objetivo a 90 días quedan "por revisar" sin borrarse (como D28). |
| D53 | 2026-11-25 | Orden de trabajo: primero se construye la base del juego 3D de verdad (motor, zonas con ficha, prueba, recomendación, aprobar y cambiar, guardado e IA), usando la zona de fuente de ingreso ya validada como modelo. Después se diseña y se llena cada fase por separado (zonas 2 a 5 del Mundo 1 y los mundos siguientes) como contenido. Se detiene el trabajo en maquetas de las demás zonas. Las reglas generales de las zonas pasan a la spec 006 (FR-041 a FR-048). |
| D54 | 2026-11-25 | El dueño aprueba el plan técnico de la base del juego 3D (`specs/006-motor-3d/plan.md`). Duración de los minijuegos: cada opción tiene dos ejemplos jugables, de un minuto en promedio cada uno (cierra la duración pendiente de D51). Se comprimen los modelos 3D con una herramienta de desarrollo, siempre que sigan viéndose y funcionando bien. Se enmienda la constitución a la versión 1.0.1: el tema visual pasa a The Influence Foundry (D41). |
| D55 | 2026-11-25 | El dueño aprueba la lista de tareas de la base del juego 3D (`specs/006-motor-3d/tasks.md`, 47 tareas en 7 fases). Empieza la implementación por la Fase 1. |
| D56 | 2026-11-25 | El dueño nota que el mundo 3D no se parece a su imagen de referencia de The Influence Foundry (`docs-entrada/influence-foundry/mundo-y-escenas.webp`): solo tenía personajes y colores. Decide ambientar PIX Central antes de la fase 4: la plaza pasa a ser la sala circular con cúpula y reactor holográfico, las zonas quedan alrededor unidas por pasarelas con barandas de vidrio, se generan con IA unas 10 piezas de escenario (cúpula, reactor, cápsulas, barandas, jardineras con palmeras, pantallas holográficas, portales, arcos y gente de fondo) y se pone de fondo el paisaje de la isla con montañas y cascadas. Se usa su imagen como referencia de estilo. Primero una prueba rápida de la sala. |
| D57 | 2026-11-26 | Modelos de IA para el trabajo: Opus para todo lo del plan (especificación, plan, tareas, análisis y revisiones de arquitectura y seguridad) y Sonnet para programar. Los subagentes `pm`, `arquitecto` y `seguridad` usan Opus; `frontend`, `backend` y `qa` usan Sonnet. Registrado en `CLAUDE.md`. |
| D58 | 2026-11-26 | Tras ver el escenario completo, el dueño pide: cambiar las barandas (le parecen feas) por cristales limpios, sólidos y que no se puedan atravesar en la sala, los puentes y las zonas, para que se sienta real; y agrandar las plataformas de las zonas, que eran pequeñas y dejarían sus objetos demasiado juntos. |
| D59 | 2026-11-26 | Al probar, el dueño pide cristales un poco más bajos (0,9 m) y que se puedan pasar saltando: si el avatar salta por encima, puede caer al vacío (vuelve al último sitio seguro). Los cristales siguen siendo sólidos al caminar. Ajusta D58. |
| D60 | 2026-11-26 | Al ver las fichas, el dueño pide: (1) ficha más liviana, la primera vista solo con lo esencial (qué es, cómo se gana, para quién encaja) y "Ver más"; los dos ejemplos y "lo que aprendes" pasan a la entrada de cada minijuego; (2) darle uso a PIX: que hable lo que hoy es texto, con opción de leerlo completo y de silenciarlo. Se preparan dos versiones para comparar y elegir: voz del navegador y voz grabada con Magnific. Lo que arma la IA en el momento va con voz del navegador o solo texto. Ajusta D52 (contenido de la ficha). |
| D61 | 2026-11-26 | Tras probar la voz en el celular, el dueño decide: la voz grabada de Norah es la voz de PIX (queda por defecto; la del navegador solo para lo que arma la IA y como respaldo). PIX debe verse hablando: se pone de frente a la cámara junto al avatar mientras habla. El texto solo aparece si el audio está apagado o no puede sonar. El control de voz pasa a un botón con la cara de PIX en el marcador (tocar = silenciar o activar). La columna de luz de la zona en curso se ve solo desde lejos, como guía, y se apaga al entrar. |
| D62 | 2026-11-26 | Presentación de cada zona: solo la primera vez que el jugador entra a una zona, el avatar se detiene, la cámara se acerca a PIX y él da el resumen de lo que se hace ahí (10 a 15 s). Siempre hay un botón "Saltar" y tocar la pantalla adelanta; si el audio está apagado o falla, el resumen sale en una tarjeta con "Continuar". Las siguientes veces no se bloquea nada. Además, PIX vuelve a explicar una máquina cuando el jugador regresa a ella después de ir a otra; solo calla justo al cerrar una pantalla de esa misma máquina. |
