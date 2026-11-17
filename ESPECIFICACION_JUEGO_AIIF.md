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

**[Decidido]** La primera versión cubre solo el influencer virtual. La marca personal de una persona real queda como segundo modo, porque cambia la identidad visual (F06) y la producción con IA (F10).

## 3. Objetivos

**[Decidido]** Dos objetivos con el mismo peso:

1. Que el jugador aprenda.
2. Que el jugador salga con el influencer hecho.

**[Decidido]** Tiene que ser divertido, no un formulario disfrazado.

## 4. Mecánica

**[Decidido]** Plataformas clásico (caminar, saltar, esquivar, enemigos) con un mapa de mundos como centro de navegación.

Reglas de diseño **[Propuesto]**:

- **Puertas de decisión.** Dentro de cada nivel hay puertas que detienen la acción y abren el reto de la fase (elegir, comparar, escribir, aprobar).
- **Las decisiones nunca se toman por reflejo.** Ningún dato del influencer queda fijado por un salto. Todo lo que se vuelve definitivo pasa por una aprobación explícita, como exige la factoría.
- **Jefe de mundo = validador de la fase.** Para cerrar un mundo, el jugador presenta lo que creó y el validador de esa fase lo revisa.
- **Una mecánica nueva por mundo.** Cada mundo añade un elemento de juego ligado a su fase, para dar variedad sin construir 13 juegos distintos.
- **Fallar en la parte de habilidad no bloquea la creación.** Se puede reintentar sin perder lo ya decidido. Modo de ayuda para quien no es jugador.
- **Controles táctiles simples:** izquierda, derecha y saltar.

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

**[Decidido]** Tema visual: "Dentro del teléfono". Los mundos son el interior de una red social: plataformas hechas de publicaciones, corazones para recoger, trolls y notificaciones como enemigos, y el algoritmo como jefe. El influencer acompaña al jugador como una silueta que gana rasgos en cada mundo. El acabado debe ser llamativo y profesional, que atraiga a primera vista. No debe parecerse a ninguna red social concreta.

**[Abierto]** Nombre y variación visual de cada mundo.

## 6. Progresión

**[Propuesto]** Dos cosas separadas:

- **Progreso del jugador:** puntos, niveles y habilidades. Mide lo que aprende. **[Decidido]** Las habilidades se ganan con validaciones superadas o cursos completados.
- **Inventario del influencer:** las piezas aprobadas en cada mundo (nicho, concepto, nombre, etc.). Es lo que se exporta al final.

**[Propuesto]** El premio final es real: el Perfil Maestro y el paquete portable, para continuar con cualquier IA usando "Continuar [Nombre Influencer]".

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

1. Nombre del personaje y subtítulo del juego.
2. Nombre y variación visual de cada mundo.
3. Guardado de progreso y cuentas de usuario en la versión dentro de Claude.
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
| D07 | 2026-11-16 | Mecánica: plataformas clásico con mapa de mundos. |
| D08 | 2026-11-16 | Primera versión: solo mundos 1 a 3. |
| D09 | 2026-11-16 | Primera versión: solo influencer virtual. |
| D10 | 2026-11-16 | Entre 3 y 5 decisiones por mundo. |
| D11 | 2026-11-16 | Proyecto de código abierto, con contribuciones económicas voluntarias. |
| D12 | 2026-11-16 | Repositorio público en GitHub (`jucenaqui`) y trabajo con Spec Kit desde el inicio. |
| D13 | 2026-11-16 | El juego se llama Canonia. |
| D14 | 2026-11-16 | Se publica juego + factoría AIIF sin el piloto; la factoría queda genérica, sin influencer específico. |
| D15 | 2026-11-16 | Licencias: MIT (código) y CC BY-SA (contenido). |
| D16 | 2026-11-16 | Tema visual: "Dentro del teléfono", con acabado llamativo y profesional. |
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
| D27 | 2026-11-16 | Motor de plataformas: al fallar se reaparece cerca y sin vidas; los enemigos se vencen saltando encima; la ayuda se ofrece tras tres fallos en un tramo; cada tramo dura de 1 a 2 minutos. Detalle en `specs/001-motor-plataformas/spec.md`. |
| D28 | 2026-11-16 | Puertas de decisión: mini lección de una pantalla, tres tarjetas con una recomendada, y aprobación explícita. Al reabrir una pieza, las que dependían de ella se conservan y quedan por revisar. Durante la espera, un personaje muestra un dato útil. Detalle en `specs/002-puertas-decision-inventario/spec.md`. |
| D29 | 2026-11-16 | Jefe de mundo: pelea corta de plataformas y después revisión con los criterios del validador de la fase. El jefe avisa y el jugador decide; solo bloquea si falta una pieza o hay piezas por revisar. El mundo se cierra con la aprobación explícita del resumen, y la recompensa es ese resumen. Detalle en `specs/003-jefe-mundo-validacion/spec.md`. |
| D30 | 2026-11-16 | Mundo 1 (Nicho): ambientado en la pestaña Explorar; el jefe es el Generalista y el Algoritmo se reserva para el jefe final del juego; antes de la primera puerta el jugador elige de 3 a 5 intereses con toques. Detalle en `specs/004-mundo-1-nicho/spec.md`. |
| D31 | 2026-11-16 | Enmienda a D25: la búsqueda del nombre es guiada para todos, en móvil y en escritorio. Motivo: dentro de Claude, el navegador de la app solo puede usarlo quien publicó la página, no los jugadores. La búsqueda automática queda para la versión con servidor. |
| D32 | 2026-11-16 | La versión jugable mínima incluye tres añadidos: mapa mínimo de un mundo, aviso de que el progreso no se guarda, y modo de demostración fuera de Claude. Detalle en `specs/005-version-jugable-minima/spec.md`. |
| D33 | 2026-11-16 | Aprobado el plan técnico de la versión jugable mínima: JavaScript en módulos sin compilación ni dependencias, cuatro capas más contenido, IA por la capacidad del entorno de Claude, pruebas con Node, seis subagentes. Detalle en `specs/005-version-jugable-minima/plan.md`. |
| D34 | 2026-11-16 | Se evaluó pasar ya a una app con servidor (búsqueda automática y guardado para todos). El dueño decidió mantener el orden de D06: primero dentro de Claude, después con servidor. Motivo: fuera de Claude la IA solo funciona por API de pago. |
| D35 | 2026-11-16 | Aprobada la lista de tareas de la versión jugable mínima: 82 tareas en 10 fases, empezando por una prueba técnica dentro de Claude. Detalle en `specs/005-version-jugable-minima/tasks.md`. |
| D36 | 2026-11-16 | Los puntos de aprendizaje se aplazan a la feature de mapa y progreso. La versión jugable mínima solo registra qué mini lecciones se completaron. |
| D37 | 2026-11-17 | La prueba T004 mostró que, con una cuenta gratuita de Claude, la página no recibe la IA. Además, un servidor propio no puede usar la suscripción del jugador. El dueño decide que la IA es central y debe llegar a todos: IA directa dentro de Claude cuando la cuenta la ofrece y, si no, modo guía (el jugador pega la pregunta en cualquier IA gratuita y trae la respuesta, que el juego valida igual). El modo guía entra en la primera versión. Se mantiene D34: sin servidor por ahora. |
