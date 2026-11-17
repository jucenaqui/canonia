# Feature Specification: Mundo 1 — Nicho

**Feature Branch**: `004-mundo-1-nicho`

**Created**: 2026-11-16

**Status**: Approved (2026-11-16)

**Numeración**: es la feature 5 del mapa aprobado (`docs-entrada/02-features.md`) y la cuarta especificación escrita, por eso su carpeta es `004`.

**Input**: "Un mundo jugable con sus cinco puertas y su jefe. Introduce al jugador en los controles y en cómo funcionan las puertas." Las cinco puertas son las cinco preguntas mínimas de la fase F01 de la factoría: fuente de ingreso, nicho, audiencia, tiempo disponible y objetivo a 90 días. Respuestas del dueño: el mundo es la pestaña Explorar; el jefe es el Generalista; antes de la primera puerta el jugador elige sus intereses con toques.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Aprender a jugar mientras se empieza (Priority: P1)

El jugador abre Canonia por primera vez y entra al Mundo 1, la pestaña Explorar: un mosaico enorme de publicaciones de todos los temas. En el primer tramo aprende a moverse y saltar con indicaciones dentro del propio nivel, y al final elige con toques los temas que le interesan.

**Why this priority**: es la primera impresión y lo que permite todo lo demás. Sin saber moverse ni decir qué le interesa, las puertas no funcionan.

**Independent Test**: una persona que nunca vio el juego recorre el primer tramo, sin instrucciones externas, y termina con sus intereses elegidos.

**Acceptance Scenarios**:

1. **Given** el jugador entra por primera vez, **When** empieza el nivel, **Then** el primer tramo le enseña a moverse, saltar y recoger con indicaciones cortas dentro del nivel, sin enemigos peligrosos al inicio.
2. **Given** el primer tramo, **When** el jugador llega a su final, **Then** se le pide elegir entre 3 y 5 temas que le interesan de una lista, con la opción de añadir uno escrito.
3. **Given** la lista de intereses, **When** el jugador elige menos de 3, **Then** no puede continuar y se le explica por qué hacen falta.
4. **Given** el jugador eligió sus intereses, **When** continúa, **Then** quedan guardados como contexto y el juego explica que con eso le propondrá ideas.
5. **Given** el jugador ya hizo este tramo, **When** vuelve al Mundo 1, **Then** no tiene que repetir las indicaciones ni volver a elegir intereses, aunque puede cambiarlos.

---

### User Story 2 - Decidir la fuente de ingreso y el nicho (Priority: P1)

En la primera puerta el jugador decide cómo quiere ganar dinero primero con su influencer. En la segunda decide el nicho: la IA le propone direcciones a partir de sus intereses y de la fuente de ingreso, y del elegido se obtiene el nicho interno y su etiqueta pública.

**Why this priority**: son las dos decisiones de las que depende todo el resto del influencer, en este mundo y en los siguientes.

**Independent Test**: con intereses elegidos y respuestas de IA simuladas, se resuelven las puertas 1 y 2 y se comprueba qué piezas quedan en el inventario.

**Acceptance Scenarios**:

1. **Given** la puerta 1, **When** se abre, **Then** la mini lección explica qué significa "fuente de ingreso inicial" con un ejemplo, y por qué se elige una sola para empezar.
2. **Given** la puerta 1, **When** se muestran las opciones, **Then** son tres rutas de ingreso de las que define la factoría, explicadas sin jerga, con una recomendada.
3. **Given** la puerta 2, **When** se abre, **Then** la mini lección explica qué es un nicho y por qué uno concreto funciona mejor que uno amplio.
4. **Given** la puerta 2, **When** se muestran las opciones, **Then** son tres direcciones de nicho basadas en los intereses del jugador y coherentes con la fuente de ingreso aprobada.
5. **Given** el jugador aprueba un nicho, **When** se guarda, **Then** el inventario registra el nicho y, junto a él, la etiqueta pública corta con la que se presentaría.
6. **Given** el jugador ya trae una idea de nicho, **When** la escribe en la puerta 2, **Then** el juego la toma como punto de partida y no le obliga a elegir entre alternativas.

---

### User Story 3 - Decidir audiencia, tiempo y objetivo (Priority: P1)

En las puertas 3, 4 y 5 el jugador decide a quién le habla su influencer, cuánto tiempo puede dedicarle y qué quiere lograr en 90 días. Cada propuesta de la IA tiene en cuenta lo ya aprobado.

**Why this priority**: completan los cinco fundamentos que la factoría exige para cerrar la fase.

**Independent Test**: con las piezas de las puertas 1 y 2 aprobadas, se resuelven las puertas 3, 4 y 5 y se comprueba la coherencia de las propuestas con lo anterior.

**Acceptance Scenarios**:

1. **Given** la puerta 3, **When** se muestran las opciones, **Then** son tres audiencias posibles para el nicho aprobado, descritas como personas concretas y no como categorías abstractas.
2. **Given** la puerta 4, **When** se abre, **Then** el jugador elige cuánto tiempo puede dedicar por semana entre opciones simples, y el juego le explica qué es realista con cada una.
3. **Given** el tiempo aprobado es poco, **When** llega la puerta 5, **Then** los objetivos propuestos son alcanzables con ese tiempo.
4. **Given** la puerta 5, **When** se muestran las opciones, **Then** son tres objetivos a 90 días, concretos y medibles, coherentes con la fuente de ingreso, el nicho y el tiempo.
5. **Given** las cinco puertas resueltas, **When** el jugador mira su inventario, **Then** ve cinco piezas aprobadas del Mundo 1.

---

### User Story 4 - Enfrentar al Generalista (Priority: P1)

Con las cinco piezas aprobadas, el jugador enfrenta al Generalista: un jefe hecho de publicaciones de todos los temas mezclados, que quiere hablarle a todo el mundo. Tras vencerlo, el jefe revisa el nicho con los criterios de la factoría, presenta los mercados y las plataformas que la IA dedujo, y el jugador cierra el mundo aprobando el resumen.

**Why this priority**: es el cierre de la fase y la lección del mundo: quien le habla a todos no le habla a nadie.

**Independent Test**: con las cinco piezas aprobadas y una revisión simulada, se recorre el encuentro completo hasta el cierre del mundo.

**Acceptance Scenarios**:

1. **Given** la revisión del Generalista, **When** evalúa, **Then** comprueba los criterios del validador de nicho de la factoría que se pueden evaluar con las piezas del mundo.
2. **Given** el nicho no encaja con el tiempo disponible, **When** termina la revisión, **Then** el Generalista lo señala nombrando ambas piezas y explicando el desajuste.
3. **Given** la revisión, **When** se presentan mercados y plataformas, **Then** el jugador ve los que la IA dedujo y puede confirmarlos o cambiarlos antes de cerrar.
4. **Given** el jugador aprueba el resumen, **When** se cierra el mundo, **Then** el resumen contiene las cinco piezas, la etiqueta pública del nicho, y los mercados y plataformas confirmados.
5. **Given** el mundo se cerró, **When** el jugador vuelve al mapa, **Then** el Mundo 1 aparece como completado.

---

### User Story 5 - Recorrer la pestaña Explorar (Priority: P2)

Entre puerta y puerta, el jugador recorre tramos cortos por el mosaico de Explorar, con enemigos y corazones. Cada tramo sube un poco la dificultad.

**Why this priority**: es lo que hace del mundo un juego y no un formulario. Las puertas y el jefe se pueden probar con tramos simples.

**Independent Test**: se recorre el mundo completo saltando las puertas con respuestas preparadas y se mide la duración de cada tramo y del mundo.

**Acceptance Scenarios**:

1. **Given** el mundo completo, **When** se cuentan sus tramos, **Then** hay un tramo antes de cada una de las cinco puertas y uno antes del jefe.
2. **Given** un jugador que conoce los controles, **When** recorre cada tramo, **Then** tarda entre 1 y 2 minutos en cada uno.
3. **Given** los tramos en orden, **When** se comparan, **Then** cada uno introduce como máximo un elemento nuevo respecto al anterior.
4. **Given** el mundo, **When** se mira su aspecto, **Then** se reconoce como una pantalla de explorar contenido, sin parecerse a la de ninguna red social concreta.

---

### Edge Cases

- El jugador escribe un interés que no es un tema (una palabra suelta sin sentido): se le pide otro, sin mensaje técnico.
- El jugador elige intereses muy distintos entre sí: la IA propone direcciones que usen uno o combinen dos, sin forzar los cinco.
- El jugador aprueba un nicho amplísimo ("estilo de vida"): se le permite; el Generalista lo señalará en la revisión.
- El jugador cambia la fuente de ingreso después de aprobar el nicho: nicho, audiencia y objetivo quedan por revisar; el tiempo disponible no.
- El jugador cambia sus intereses después de aprobar el nicho: el nicho no cambia solo; el juego le pregunta si quiere reabrirlo.
- El jugador declara muy poco tiempo y elige un objetivo ambicioso escrito por él: se le permite; el Generalista lo señalará.
- La IA propone un nicho o una audiencia que implica contenido inapropiado o dañino: no se muestra.
- La IA no está disponible en la puerta 2: el juego ofrece el modo guía (005/FR-006, D37), y el jugador también puede escribir su nicho y aprobarlo. En modo guía, la etiqueta pública llega en la misma respuesta pegada y sigue siendo editable.
- El jugador abandona a mitad del mundo y vuelve: retoma con las piezas aprobadas y las puertas resueltas.

## Requirements *(mandatory)*

### Functional Requirements

**Estructura del mundo**

- **FR-001**: El Mundo 1 DEBE tener cinco puertas de decisión, en este orden: fuente de ingreso inicial, nicho, audiencia, tiempo disponible y objetivo a 90 días.
- **FR-002**: El Mundo 1 DEBE tener un tramo de plataformas antes de cada puerta y uno antes del jefe.
- **FR-003**: Cada tramo DEBE introducir como máximo un elemento de juego nuevo respecto al anterior.
- **FR-004**: El mundo DEBE estar ambientado como una pantalla de explorar contenido: un mosaico de publicaciones de todos los temas.
- **FR-005**: El aspecto del mundo NO DEBE reproducir la pantalla de ninguna red social concreta.

**Inicio y aprendizaje de los controles**

- **FR-006**: El primer tramo DEBE enseñar a moverse, saltar y recoger mediante indicaciones cortas dentro del nivel.
- **FR-007**: El primer tramo NO DEBE tener enemigos que causen fallos antes de que el jugador haya saltado al menos una vez.
- **FR-008**: La primera puerta DEBE explicar, la primera vez, cómo funciona una puerta: que la IA propone y que nada se guarda sin aprobar.
- **FR-009**: Las indicaciones de aprendizaje NO DEBEN repetirse cuando el jugador vuelve al mundo.

**Intereses del jugador**

- **FR-010**: Antes de la primera puerta, el jugador DEBE elegir entre 3 y 5 temas de interés de una lista, tocándolos.
- **FR-011**: El jugador DEBE poder añadir un interés escrito por él.
- **FR-012**: Los intereses DEBEN usarse como contexto para las propuestas de la IA, y NO DEBEN contar como pieza del influencer.
- **FR-013**: El jugador DEBE poder cambiar sus intereses más tarde; cambiarlos NO DEBE modificar ninguna pieza aprobada.

**Puerta 1 — Fuente de ingreso inicial**

- **FR-014**: La mini lección DEBE explicar qué es la fuente de ingreso inicial y por qué se elige una sola para empezar.
- **FR-015**: Las opciones DEBEN salir de las rutas de ingreso que define la factoría, explicadas en lenguaje simple.
- **FR-016**: La pieza aprobada DEBE registrar una sola fuente de ingreso inicial.

**Puerta 2 — Nicho**

- **FR-017**: La mini lección DEBE explicar qué es un nicho y por qué uno concreto funciona mejor que uno amplio.
- **FR-018**: Las opciones DEBEN ser direcciones de nicho basadas en los intereses del jugador y coherentes con la fuente de ingreso aprobada.
- **FR-019**: Si el jugador escribe su propio nicho, el sistema DEBE tomarlo como punto de partida y NO DEBE obligarle a elegir alternativas.
- **FR-020**: Al aprobarse el nicho, el sistema DEBE registrar también una etiqueta pública corta del nicho, visible para el jugador y editable por él.
- **FR-021**: El sistema NO DEBE afirmar datos de mercado, tendencias o saturación que no se hayan comprobado.

**Puerta 3 — Audiencia**

- **FR-022**: La mini lección DEBE explicar qué es la audiencia objetivo y por qué conviene imaginarla como una persona concreta.
- **FR-023**: Las opciones DEBEN describir audiencias posibles para el nicho aprobado, como personas concretas.

**Puerta 4 — Tiempo disponible**

- **FR-024**: La mini lección DEBE explicar por qué el tiempo disponible condiciona lo que se puede sostener.
- **FR-025**: El jugador DEBE elegir su tiempo semanal entre opciones simples, o indicar el suyo.
- **FR-026**: Cada opción de tiempo DEBE explicar qué es realista con esa dedicación. Las opciones y sus explicaciones son fijas y vienen del contenido del mundo, no de la IA.

**Puerta 5 — Objetivo a 90 días**

- **FR-027**: La mini lección DEBE explicar qué es un objetivo a 90 días y qué lo hace concreto y medible.
- **FR-028**: Las opciones DEBEN ser objetivos concretos y medibles, coherentes con la fuente de ingreso, el nicho y el tiempo aprobados.
- **FR-029**: El sistema NO DEBE prometer resultados: los objetivos son metas, no garantías.

**Dependencias entre piezas**

- **FR-030**: El nicho DEBE depender de la fuente de ingreso inicial.
- **FR-031**: La audiencia DEBE depender del nicho.
- **FR-032**: El objetivo a 90 días DEBE depender de la fuente de ingreso, del nicho y del tiempo disponible.
- **FR-033**: El tiempo disponible NO DEBE depender de ninguna otra pieza.

**Jefe — el Generalista**

- **FR-034**: El jefe del Mundo 1 DEBE ser el Generalista: un personaje hecho de publicaciones de todos los temas mezclados.
- **FR-035**: La revisión DEBE comprobar, de los criterios del validador de nicho de la factoría, los que se pueden evaluar con las piezas del mundo: claridad del nicho, ajuste a la fuente de ingreso, ajuste a la audiencia, capacidad de generar contenido, diferenciación, y coherencia con el tiempo y con el objetivo a 90 días.
- **FR-036**: El jefe DEBE presentar los mercados y las plataformas que la IA dedujo, para que el jugador los confirme o los cambie.
- **FR-037**: El resumen del mundo DEBE contener las cinco piezas, la etiqueta pública del nicho, y los mercados y plataformas confirmados.

**Contenido y tono**

- **FR-038**: Las mini lecciones, los datos útiles de la espera y los textos del jefe DEBEN basarse en la fase F01 de la factoría.
- **FR-039**: Ningún texto DEBE usar jerga sin explicarla la primera vez.
- **FR-040**: Las peticiones de nicho y de audiencia DEBEN pedir de forma explícita evitar propuestas inapropiadas o dañinas, y toda respuesta que no cumpla la forma esperada DEBE descartarse sin mostrarse (ver 002/FR-043).

### Key Entities

- **Mundo 1 — Explorar**: el primer mundo. Tiene seis tramos, cinco puertas y un jefe.
- **Intereses del jugador**: de 3 a 5 temas que el jugador elige. Son contexto, no una pieza del influencer.
- **Fuente de ingreso inicial**: pieza. La ruta por la que el jugador quiere empezar a ganar dinero.
- **Nicho**: pieza. El territorio temático del influencer. Lleva asociada su etiqueta pública.
- **Etiqueta pública del nicho**: frase corta con la que se presenta el nicho hacia fuera.
- **Audiencia**: pieza. A quién le habla el influencer, descrita como persona concreta.
- **Tiempo disponible**: pieza. Dedicación semanal del jugador.
- **Objetivo a 90 días**: pieza. Meta concreta y medible.
- **Mercados y plataformas**: datos deducidos por la IA, que el jugador confirma ante el jefe.
- **El Generalista**: jefe del mundo; representa al validador de nicho.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Una persona sin conocimientos previos ni experiencia en juegos completa el Mundo 1 en una sola sesión de menos de 30 minutos.
- **SC-002**: Al menos 8 de cada 10 personas de prueba terminan el primer tramo sin pedir ayuda externa.
- **SC-003**: Al cerrar el mundo, el 100 % de los jugadores tiene las cinco piezas aprobadas, la etiqueta pública del nicho, y mercados y plataformas confirmados.
- **SC-004**: Al menos 8 de cada 10 personas de prueba pueden decir, al terminar, cuál es su nicho y por qué lo eligieron.
- **SC-005**: Al menos 7 de cada 10 personas de prueba dicen que las propuestas de nicho tenían que ver con sus intereses.
- **SC-006**: En el 100 % de los casos probados, cambiar una pieza deja por revisar exactamente las piezas que dependen de ella, y ninguna otra.
- **SC-007**: Al menos 7 de cada 10 personas de prueba dicen que querrían jugar el siguiente mundo.
- **SC-008**: Ninguna persona de prueba confunde el mundo con una red social real.

## Assumptions

- Este mundo usa los mecanismos de las features 1 (motor), 2 (puertas e inventario) y 3 (jefe); aquí solo se define su contenido.
- Se usa la profundidad mínima de la factoría para F01. Las etapas internas de la fase (diagnóstico, simulaciones, comparación) las hace la IA por dentro y el jugador ve solo opciones y explicaciones.
- La lista de intereses para elegir es fija y la define el proyecto; el número de partida es entre 20 y 30 temas.
- Las opciones de tiempo semanal de partida son: menos de 3 horas, de 3 a 7, de 7 a 15 y más de 15.
- De los criterios del validador de nicho de la factoría, no se evalúan aquí los que dependen de otras cosas: la escalabilidad y la compatibilidad con mercados se tratan al confirmar mercados y plataformas; la procedencia de los datos y la aprobación suficiente las garantiza el mecanismo de puertas.
- El juego no investiga en internet tendencias ni saturación de nichos. La factoría permite construir F01 sin navegación.
- Restricciones estratégicas, supuestos y pendientes que la factoría contempla en F01 no tienen puerta propia en esta versión.
- El guardado entre sesiones pertenece a la feature de guardado y exportación; marcar el mundo como completado en el mapa pertenece a la feature de mapa y progreso. Para probar este mundo basta un mapa de un solo mundo.
- El diseño del protagonista y el arte definitivo del mundo y del Generalista se hacen durante la implementación, siguiendo el concepto visual aprobado.

## No-objetivos de esta feature

- NO se define concepto, nombre ni biografía: pertenecen a los mundos 2 y 3.
- NO se define estrategia completa de monetización, ofertas ni precios: pertenecen a una fase posterior de la factoría.
- NO se eligen pilares de contenido ni calendario.
- NO hay investigación de mercado en internet.
- NO hay más de un nicho por influencer.
- NO hay prueba de personalidad ni cuestionario largo al jugador: solo la elección de intereses.
- NO hay niveles secretos, coleccionables especiales ni rutas alternativas.

## Dependencias

- Requiere: feature 1 (motor), feature 2 (puertas e inventario) y feature 3 (jefe de mundo).
- La usan: Mundo 2 (concepto) y Mundo 3 (identidad), que parten de las piezas aprobadas aquí.
