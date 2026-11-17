# Feature Specification: Versión jugable mínima (integración)

**Feature Branch**: `005-version-jugable-minima`

**Created**: 2026-11-16

**Status**: Approved (2026-11-16). Enmienda por D37, D38 y D39 aprobada (2026-11-17, D40).

**Input**: Orden de construcción aprobado en el mapa de features (D26): "Primero una versión jugable mínima: motor, puertas e inventario, jefe y Mundo 1, con un mapa de un solo mundo. Con eso se prueba si el juego divierte y enseña."

## Propósito

Esta especificación no añade requisitos nuevos. Reúne cuatro especificaciones ya aprobadas en una sola entrega, para que tengan un único plan técnico y una única lista de tareas:

| Spec | Qué aporta | Requisitos |
|---|---|---|
| [001](../001-motor-plataformas/spec.md) | Motor de plataformas y controles | FR-001 a FR-034 |
| [002](../002-puertas-decision-inventario/spec.md) | Puertas de decisión e inventario | FR-001 a FR-044 |
| [003](../003-jefe-mundo-validacion/spec.md) | Jefe de mundo: validación de la fase | FR-001 a FR-033 |
| [004](../004-mundo-1-nicho/spec.md) | Mundo 1: Nicho | FR-001 a FR-040 |

Para citar un requisito de otra spec se usa su carpeta como prefijo, por ejemplo `002/FR-018`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Jugar el Mundo 1 de principio a fin (Priority: P1)

Una persona sin conocimientos previos abre Canonia dentro de Claude en su teléfono, juega el Mundo 1 completo y termina con sus cinco piezas aprobadas y el resumen del mundo.

**Why this priority**: es la prueba de la idea. Si esto no divierte ni enseña, no tiene sentido construir los otros doce mundos.

**Independent Test**: una persona que nunca vio el juego lo abre desde un enlace, lo juega hasta cerrar el mundo y muestra su resumen.

**Acceptance Scenarios**:

1. **Given** el juego publicado dentro de Claude, **When** una persona con cuenta de Claude lo abre en el teléfono, **Then** puede empezar a jugar sin registrarse en nada más.
2. **Given** el jugador recorre el mundo, **When** resuelve las cinco puertas y enfrenta al Generalista, **Then** cierra el mundo y ve su resumen con las cinco piezas.
3. **Given** la cuenta del jugador no ofrece la IA dentro de la página (por ejemplo, una cuenta gratuita) o el jugador niega el permiso, **When** llega a una puerta, **Then** el juego pasa al modo guía: le da la pregunta para pegar en la IA que elija, valida la respuesta que trae de vuelta y le muestra las tres opciones, y el jugador termina el mundo igual.
4. **Given** el jugador está en modo guía, **When** prefiere no usar ninguna IA en una puerta, **Then** puede escribir y aprobar su propia respuesta.

### User Story 2 - Crear con ayuda de la IA sin cuenta de pago (Priority: P1)

Una persona con una cuenta gratuita de Claude, que no recibe la IA dentro de la página, juega el Mundo 1 usando una IA gratuita en otra pestaña o aplicación (D37).

**Why this priority**: la IA es el centro del juego, y la mayoría de los jugadores tendrá una cuenta gratuita. Sin este modo, esas personas crearían su influencer sin ayuda (spike T004).

**Independent Test**: con una cuenta gratuita, el jugador copia la pregunta de una puerta, la pega en otra IA, vuelve con la respuesta y ve tres opciones válidas con una recomendada.

**Acceptance Scenarios**:

1. **Given** la IA no está disponible en la página, **When** el juego arranca o recibe el primer "no disponible", **Then** explica una vez, con el tono del juego, que usará el modo guía y por qué, y no vuelve a pedir el permiso.
2. **Given** el jugador está en una puerta en modo guía, **When** toca "Copiar pregunta", **Then** la pregunta queda copiada o, si el teléfono no lo permite, se muestra seleccionada para copiarla a mano.
3. **Given** el jugador pega una respuesta con el formato pedido, aunque traiga texto alrededor, **When** toca "Revisar respuesta", **Then** ve las tres opciones como si vinieran de la IA directa, sin que nada se apruebe.
4. **Given** el jugador pega una respuesta sin el formato pedido, **When** toca "Revisar respuesta", **Then** un personaje explica qué pedirle a la IA, y el texto pegado se conserva.
5. **Given** el jugador llega al jefe en modo guía, **When** pide la revisión, **Then** recibe la pregunta de revisión, pega la respuesta y ve los puntos sólidos y las observaciones; si no lo logra, puede cerrar con el resumen marcado como no revisado (003/FR-031).

### Edge Cases

- El jugador recarga la página a mitad del mundo: el juego retoma la partida guardada en su navegador (D39). Lo que no se guarda es la posición exacta dentro del tramo: reaparece ante la puerta o el jefe donde estaba.
- El navegador no deja guardar o devuelve datos ilegibles: el juego lo avisa con el tono del juego, sigue funcionando en memoria y nunca se rompe. Datos ilegibles no se borran solos.
- El juego se abre fuera de Claude (por ejemplo, el archivo en un navegador): funciona en modo de demostración con respuestas de ejemplo, claramente señalado, para poder desarrollar y probar.
- El jugador va a otra aplicación a usar su IA y, al volver, la página se recargó (ocurre en la app de Claude del teléfono, T004b): el juego reabre la misma puerta en modo guía, con las opciones ya mostradas, listo para pegar la respuesta (FR-016).
- La IA directa falla con `busy` o `failed`: no se pasa al modo guía; se ofrece reintentar, como dice 002. Solo `unavailable` lleva al modo guía.
- En modo guía, el jugador pide "no sé, recomiéndame": se destaca la opción que la IA ya marcó como recomendada, con su motivo, sin otra pregunta (D38).
- En modo guía, el jugador escribe su propia respuesta: se acepta sin comentario de la IA (D38); 002/FR-014 se cumple solo con IA directa.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La entrega DEBE cumplir todos los requisitos de las specs 001, 002, 003 y 004.
- **FR-002**: La entrega DEBE incluir un mapa mínimo de un solo mundo, que permita entrar al Mundo 1 y verlo como completado al cerrarlo.
- **FR-003**: La entrega DEBE poder jugarse dentro de Claude con la cuenta del jugador, sin registro propio.
- **FR-004**: Antes de empezar, el juego DEBE avisar que la partida se guarda solo en este navegador y este dispositivo, y que se pierde si se borran los datos del navegador. *Enmienda D39: sustituye el aviso de que el progreso no se conserva.*
- **FR-005**: Fuera de Claude, el juego DEBE funcionar en un modo de demostración con respuestas de ejemplo, señalado de forma visible.

#### Modo guía (D37, D38)

- **FR-006**: El juego DEBE usar la IA directa cuando la página la recibe, y pasar al modo guía cuando no la recibe o cuando una llamada responde "no disponible". El cambio dura hasta que se recargue la página.
- **FR-007**: En modo guía, el juego DEBE dar al jugador, para las opciones de cada puerta y para la revisión del jefe, una pregunta completa en español que funcione pegada en cualquier IA de chat: instrucción, datos y formato de respuesta en el mismo texto.
- **FR-008**: El juego DEBE validar la respuesta pegada con las mismas reglas que la de la IA directa (002/FR-043), aceptando texto alrededor del bloque pedido y comillas tipográficas, y mostrarla solo como texto plano.
- **FR-009**: Una respuesta pegada que no pase la validación NO DEBE mostrarse; un personaje DEBE explicar qué pedirle a la IA, y el texto pegado DEBE conservarse.
- **FR-010**: En modo guía, "no sé, recomiéndame" DEBE destacar la opción que ya vino recomendada, con su motivo, sin pedir otra pregunta; y la respuesta escrita por el jugador NO DEBE recibir comentario (D38).
- **FR-011**: La pantalla del modo guía DEBE decir, antes de copiar, que la pregunta incluye las decisiones del jugador y que se la dará a la IA que él elija.
- **FR-012**: El modo guía NO DEBE quitar ninguna otra salida: el jugador siempre puede escribir su propia respuesta, salir de la puerta o, ante el jefe, cerrar sin revisión (002/FR-042, 003/FR-031).
- **FR-013**: Copiar la pregunta DEBE funcionar en el teléfono; si el sistema no deja copiar, la pregunta DEBE mostrarse seleccionada para copiarla a mano.

#### Guardado en el navegador (D39)

- **FR-014**: El juego DEBE guardar la partida en el almacenamiento del navegador cada vez que se aprueba una pieza, se cambian los intereses, se resuelve una observación, se cierra un mundo y justo antes de copiar una pregunta del modo guía.
- **FR-015**: Al abrir la página con una partida guardada, el juego DEBE ofrecer continuarla o empezar de nuevo; empezar de nuevo DEBE pedir una confirmación dentro de la página.
- **FR-016**: Si la partida se guardó con una puerta o la revisión del jefe abierta, al continuar el juego DEBE reabrirla en el mismo punto: la misma puerta, con las opciones ya mostradas y, en modo guía, lista para pegar la respuesta.
- **FR-017**: Lo guardado DEBE ser lo mismo que vive en memoria: inventario, mundos, puertas (con sus opciones mostradas), contexto del jugador y punto de retorno. NO DEBE guardarse la posición dentro del tramo ni el estado del motor.
- **FR-018**: Si el navegador no deja guardar o leer, o los datos son ilegibles o de otra versión, el juego DEBE avisarlo una vez con el tono del juego y seguir funcionando en memoria. Nunca DEBE romperse ni borrar en silencio datos que no entiende.
- **FR-019**: La partida guardada NO DEBE salir del navegador del jugador: no se envía a ningún servidor ni a la IA. Exportar e importar siguen siendo de la feature de guardado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Se cumplen los criterios de éxito de las specs 001 a 004.
- **SC-002**: Una persona de fuera del proyecto, con su propia cuenta de Claude, abre el enlace en su teléfono y completa el Mundo 1.
- **SC-003**: Las pruebas automáticas obligatorias de decisión e inventario pasan al 100 %.
- **SC-004**: Una persona de fuera del proyecto, con una cuenta gratuita de Claude, completa el Mundo 1 en su teléfono con el modo guía, usando una IA gratuita.
- **SC-005**: Las respuestas de al menos dos IA de chat gratuitas distintas a la pregunta de opciones pasan la validación al primer intento en 4 de cada 5 casos.
- **SC-006**: En la app de Claude del teléfono, tras ir a otra IA y volver, el jugador no pierde ninguna pieza aprobada y regresa a la misma puerta en el 100 % de los intentos de la prueba guiada.

## Assumptions

- El mapa completo, los puntos, niveles y habilidades siguen perteneciendo a la feature de mapa y progreso.
- El guardado automático en el navegador entra en esta entrega (D39). La exportación, la importación y el paso de la partida a otro dispositivo siguen perteneciendo a la feature de guardado y exportación.
- Los mundos 2 y 3 no forman parte de esta entrega.

## No-objetivos

- NO se añaden funciones que no estén en las specs 001 a 004, salvo el mapa mínimo, el aviso de guardado, el modo de demostración, el modo guía y el guardado en el navegador descritos aquí.
- El modo guía NO usa servidor ni claves de API, y NO conecta con ninguna IA por su cuenta: el jugador copia y pega (D34, D37).
