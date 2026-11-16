# Feature Specification: Puertas de decisión e inventario del influencer

**Feature Branch**: `002-puertas-decision-inventario`

**Created**: 2026-11-16

**Status**: Approved (2026-11-16)

**Input**: Feature 2 del mapa aprobado (`docs-entrada/02-features.md`): "Al llegar a una puerta, la acción se detiene y se abre la decisión de esa fase. La IA propone opciones explicadas en lenguaje simple; el jugador elige, edita, pide otras o escribe la suya. Solo lo que el jugador aprueba de forma explícita entra al inventario. Puede ver su inventario y reabrir una pieza aprobada." Respuestas del dueño: tres tarjetas con una recomendada; mini lección de una pantalla antes de decidir; al reabrir, lo posterior se marca para revisar; durante la espera, un personaje muestra un dato útil.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Decidir en una puerta (Priority: P1)

El jugador llega a una puerta. La acción se detiene, una pantalla le explica en pocas líneas de qué trata la decisión, y después la IA le muestra tres opciones en tarjetas, una de ellas recomendada. El jugador elige una, la aprueba de forma explícita, y la pieza entra a su inventario. El juego continúa.

**Why this priority**: es el corazón de Canonia. Aquí se cumple el principio "el jugador decide" y aquí se crea el influencer.

**Independent Test**: con una puerta de prueba y respuestas de IA simuladas, se recorre el flujo completo y se comprueba que la pieza aparece en el inventario solo después de la aprobación explícita.

**Acceptance Scenarios**:

1. **Given** el jugador toca una puerta sin resolver, **When** se abre, **Then** ve primero una mini lección de una sola pantalla sobre esa decisión, con un ejemplo.
2. **Given** la mini lección, **When** el jugador la termina o la salta, **Then** ve tres opciones en tarjetas; cada una trae una explicación corta con sus ventajas y sus riesgos, y una está marcada como recomendada.
3. **Given** las tres tarjetas, **When** el jugador toca una, **Then** queda seleccionada pero todavía no aprobada, y aparece la acción de aprobar.
4. **Given** una opción seleccionada, **When** el jugador confirma con la acción de aprobar, **Then** la pieza entra al inventario como aprobada, la puerta queda resuelta y el nivel se reanuda.
5. **Given** una opción seleccionada, **When** el jugador cierra la puerta sin aprobar, **Then** nada entra al inventario y la puerta sigue sin resolver.
6. **Given** la decisión depende de piezas ya aprobadas, **When** la IA propone, **Then** las opciones son coherentes con esas piezas y no vuelven a preguntar lo ya decidido.

---

### User Story 2 - Pedir otras opciones, editar o escribir la propia (Priority: P1)

Ninguna de las tres opciones convence al jugador. Puede pedir otras tres, editar el texto de una, o escribir la suya desde cero. En todos los casos, lo que queda solo entra al inventario cuando lo aprueba.

**Why this priority**: sin esto el jugador solo elige entre lo que la IA quiso, y el influencer no es suyo.

**Independent Test**: en una puerta de prueba se usa cada camino (otras opciones, editar, escribir) y se comprueba que la pieza aprobada coincide exactamente con el texto final del jugador.

**Acceptance Scenarios**:

1. **Given** las tres tarjetas, **When** el jugador pide otras opciones, **Then** recibe tres opciones nuevas, distintas de las anteriores.
2. **Given** una tarjeta, **When** el jugador la edita y aprueba, **Then** la pieza guardada es el texto editado, no el original.
3. **Given** las tres tarjetas, **When** el jugador elige escribir la suya, **Then** puede escribir su propia respuesta y aprobarla.
4. **Given** una respuesta escrita por el jugador, **When** la envía, **Then** la IA le comenta en lenguaje simple si ve algún problema, sin impedirle aprobarla.
5. **Given** el jugador pidió otras opciones varias veces, **When** quiere volver a una anterior, **Then** puede verla y elegirla.

---

### User Story 3 - "No sé, recomiéndame" (Priority: P1)

El jugador no sabe qué elegir y lo dice. La IA le recomienda una opción y le explica por qué. La recomendación no aprueba nada: el jugador sigue teniendo que aprobar.

**Why this priority**: el público no tiene conocimientos previos. La factoría exige esta ayuda y a la vez prohíbe que sustituya la aprobación.

**Independent Test**: en una puerta de prueba se pide recomendación y se comprueba que el inventario sigue vacío hasta que el jugador aprueba.

**Acceptance Scenarios**:

1. **Given** las tres tarjetas, **When** el jugador indica que no sabe o pide que decidan por él, **Then** la IA destaca una opción y explica en una o dos frases por qué la recomienda.
2. **Given** una recomendación, **When** el jugador no hace nada más, **Then** nada entra al inventario.
3. **Given** una recomendación, **When** el jugador la aprueba, **Then** entra al inventario igual que cualquier otra pieza aprobada.

---

### User Story 4 - Ver el inventario (Priority: P2)

En cualquier momento el jugador abre su inventario y ve las piezas de su influencer: las aprobadas, las que están por revisar y las que faltan.

**Why this priority**: muestra el avance real y da sentido al recorrido. Se puede probar el flujo de decisión sin esta pantalla.

**Independent Test**: con dos piezas aprobadas y una por revisar, se abre el inventario y se comprueba que cada una aparece con su estado correcto.

**Acceptance Scenarios**:

1. **Given** el jugador en el mapa o en un nivel, **When** abre el inventario, **Then** ve cada pieza con su contenido y su estado.
2. **Given** el inventario, **When** una pieza aún no se ha decidido, **Then** aparece como pendiente, sin contenido inventado.
3. **Given** el inventario, **When** el jugador lo cierra, **Then** vuelve exactamente a donde estaba.

---

### User Story 5 - Reabrir una pieza aprobada (Priority: P2)

El jugador cambia de opinión sobre algo ya aprobado, por ejemplo el nicho. Lo reabre desde el inventario, decide de nuevo y aprueba. Las piezas que dependían de la anterior no se borran: quedan marcadas "por revisar" y el jugador las confirma o las cambia.

**Why this priority**: cambiar de opinión es normal al aprender. La factoría pide revalidar, no borrar.

**Independent Test**: con nicho, audiencia y concepto aprobados, se reabre el nicho, se aprueba uno distinto y se comprueba qué piezas quedan por revisar y que ninguna se borró.

**Acceptance Scenarios**:

1. **Given** una pieza aprobada, **When** el jugador la reabre, **Then** el juego le avisa qué otras piezas dependen de ella antes de continuar.
2. **Given** el jugador reabrió una pieza, **When** cierra sin aprobar nada nuevo, **Then** la pieza original sigue aprobada y nada cambia.
3. **Given** el jugador aprueba una versión nueva, **When** se guarda, **Then** las piezas que dependían de la anterior conservan su contenido y pasan a "por revisar".
4. **Given** una pieza por revisar, **When** el jugador la abre, **Then** puede confirmarla tal cual o cambiarla; al aprobar deja de estar por revisar.
5. **Given** existen piezas por revisar, **When** el jugador intenta enfrentar al jefe de ese mundo, **Then** el juego le pide revisarlas primero.
6. **Given** una pieza se reemplazó, **When** se consulta el historial, **Then** la versión anterior se conserva como histórica.

---

### User Story 6 - Esperar y recuperarse de un error (Priority: P2)

La IA tarda unos segundos en responder. Mientras tanto, un personaje muestra un dato útil sobre la decisión. Si la IA falla, un personaje lo explica y ofrece reintentar, sin que se pierda nada.

**Why this priority**: la espera y los fallos van a ocurrir siempre. Bien resueltos no rompen el ritmo; mal resueltos, el jugador se va.

**Independent Test**: se simula una respuesta lenta y luego una fallida, y se comprueba qué ve el jugador y que el inventario no cambia.

**Acceptance Scenarios**:

1. **Given** el jugador espera una respuesta de la IA, **When** pasa más de un instante, **Then** un personaje muestra un dato útil relacionado con esa decisión.
2. **Given** la IA no responde o falla, **When** se detecta, **Then** un personaje lo explica en el tono del juego y ofrece reintentar, sin mensajes técnicos.
3. **Given** un error de la IA, **When** ocurre en cualquier momento, **Then** las piezas ya aprobadas y lo que el jugador llevaba escrito se conservan.
4. **Given** la IA falla varias veces seguidas, **When** el jugador no quiere esperar, **Then** puede escribir su propia respuesta y aprobarla, o salir de la puerta y volver después.

---

### Edge Cases

- El jugador aprueba y, en el mismo instante, toca cerrar: la pieza queda aprobada una sola vez o no queda; nunca a medias ni duplicada.
- El jugador toca aprobar dos veces seguidas: se guarda una sola pieza.
- La IA devuelve menos de tres opciones, o dos casi iguales: se muestran las válidas y se ofrece pedir otras.
- La IA devuelve algo que no corresponde a la decisión, o contenido inapropiado: no se muestra, y se trata como un error.
- El jugador escribe una respuesta vacía o de un solo carácter: no puede aprobarla y se le explica por qué.
- El jugador escribe un texto muy largo: se le pide acortarlo a un límite razonable.
- El jugador cambia de app en mitad de una puerta: al volver, la puerta sigue como estaba.
- El jugador no ha dado permiso para usar la IA: el juego le explica que la necesita para proponer, y le deja escribir sus propias respuestas.
- El jugador reabre una pieza de la que depende todo lo demás: todas las posteriores pasan a "por revisar", ninguna se borra.
- El jugador pide otras opciones muchas veces: el juego sigue respondiendo, pero puede sugerir una recomendación.

## Requirements *(mandatory)*

### Functional Requirements

**Flujo de una puerta**

- **FR-001**: Al abrirse una puerta sin resolver, el sistema DEBE mostrar primero una mini lección de una sola pantalla sobre esa decisión, con un ejemplo.
- **FR-002**: El jugador DEBE poder saltar la mini lección.
- **FR-003**: Completar una mini lección DEBE dar puntos de aprendizaje, una sola vez por puerta.
- **FR-004**: Después de la mini lección, el sistema DEBE presentar tres opciones en tarjetas.
- **FR-005**: Cada tarjeta DEBE incluir una explicación corta, en lenguaje simple, de las ventajas y los riesgos de esa opción.
- **FR-006**: Exactamente una de las tres tarjetas DEBE estar marcada como recomendada.
- **FR-007**: Las opciones DEBEN ser coherentes con las piezas ya aprobadas y NO DEBEN volver a preguntar lo ya decidido.
- **FR-008**: El contenido y los criterios de cada decisión DEBEN venir de la fase correspondiente de la factoría.

**Elegir, editar y escribir**

- **FR-009**: El jugador DEBE poder seleccionar una tarjeta sin que eso la apruebe.
- **FR-010**: El jugador DEBE poder pedir otras tres opciones, distintas de las ya mostradas.
- **FR-011**: El jugador DEBE poder volver a ver y elegir opciones mostradas antes en esa puerta.
- **FR-012**: El jugador DEBE poder editar el texto de una opción antes de aprobarla.
- **FR-013**: El jugador DEBE poder escribir su propia respuesta en lugar de elegir una tarjeta.
- **FR-014**: Ante una respuesta escrita por el jugador, el sistema DEBE comentar si ve algún problema, y NO DEBE impedir que la apruebe.
- **FR-015**: El sistema NO DEBE aceptar una respuesta vacía, y DEBE limitar su longitud máxima.

**Ayuda para decidir**

- **FR-016**: Cuando el jugador indique que no sabe, pida opciones, pida recomendación o pida que decidan por él, el sistema DEBE recomendar una opción y explicar por qué.
- **FR-017**: Una recomendación NO DEBE aprobar nada por sí sola.

**Aprobación (el jugador decide)**

- **FR-018**: Una pieza DEBE entrar al inventario solo tras una acción explícita de aprobar hecha por el jugador.
- **FR-019**: Seleccionar, editar, pedir recomendación, esperar o cerrar la puerta NO DEBEN aprobar nada.
- **FR-020**: Ninguna acción de juego (saltar, caer, fallar, vencer a un enemigo) DEBE aprobar, cambiar ni descartar una pieza.
- **FR-021**: Nada DEBE aprobarse de forma automática ni por el paso del tiempo.
- **FR-022**: La pieza guardada DEBE ser exactamente el texto que el jugador aprobó.
- **FR-023**: Aprobar DEBE guardar una sola pieza, aunque la acción se repita.
- **FR-024**: Al aprobarse la pieza, la puerta DEBE quedar resuelta y el nivel DEBE reanudarse.
- **FR-025**: Si el jugador cierra la puerta sin aprobar, la puerta DEBE seguir sin resolver y el jugador DEBE poder volver a abrirla.

**Inventario**

- **FR-026**: El jugador DEBE poder abrir su inventario desde el mapa y desde un nivel, y volver a donde estaba.
- **FR-027**: El inventario DEBE mostrar cada pieza con su contenido y su estado: pendiente, aprobada o por revisar.
- **FR-028**: Una pieza pendiente NO DEBE mostrar contenido inventado.
- **FR-029**: Una pieza aprobada NO DEBE perderse ni cambiar por fallar, salir de un nivel, cerrar una puerta ni por un error de la IA.

**Reabrir**

- **FR-030**: El jugador DEBE poder reabrir una pieza aprobada desde el inventario.
- **FR-031**: Antes de reabrir, el sistema DEBE avisar qué piezas dependen de la que se va a cambiar.
- **FR-032**: Si el jugador reabre y no aprueba nada nuevo, la pieza original DEBE seguir aprobada.
- **FR-033**: Al aprobarse una versión nueva, las piezas que dependían de la anterior DEBEN conservar su contenido y pasar a "por revisar".
- **FR-034**: El sistema NO DEBE borrar piezas por causa de un cambio en otra.
- **FR-035**: El jugador DEBE poder confirmar una pieza por revisar tal cual, o cambiarla; al aprobarla deja de estar por revisar.
- **FR-036**: La versión reemplazada de una pieza DEBE conservarse como histórica.
- **FR-037**: El sistema DEBE poder informar si existen piezas por revisar en un mundo, para que el jefe de ese mundo no se enfrente con piezas sin revisar.

**Espera y errores**

- **FR-038**: Mientras la IA responde, un personaje DEBE mostrar un dato útil relacionado con la decisión en curso.
- **FR-039**: Si la IA falla o no responde, un personaje DEBE explicarlo en el tono del juego y ofrecer reintentar.
- **FR-040**: El jugador NO DEBE ver mensajes técnicos, códigos de error ni trazas.
- **FR-041**: Un error de la IA NO DEBE borrar piezas aprobadas ni el texto que el jugador llevaba escrito.
- **FR-042**: Si la IA no está disponible, el jugador DEBE poder escribir y aprobar su propia respuesta, o salir de la puerta y volver después.
- **FR-043**: El sistema NO DEBE mostrar una respuesta de la IA que no corresponda a la decisión en curso o que sea inapropiada.

**Idioma**

- **FR-044**: Todo texto que vea el jugador, incluidas las propuestas de la IA, DEBE estar en español.

### Key Entities

- **Puerta de decisión**: una decisión concreta de una fase. Tiene un tema, una mini lección, de qué piezas depende y un estado: sin resolver o resuelta.
- **Mini lección**: explicación de una pantalla sobre el tema de la puerta, con un ejemplo.
- **Opción**: propuesta para una puerta. Tiene texto, explicación de ventajas y riesgos, quién la originó (la IA o el jugador) y si es la recomendada.
- **Pieza del influencer**: resultado aprobado de una puerta, por ejemplo el nicho. Tiene contenido, estado (pendiente, aprobada o por revisar), origen y fecha de aprobación.
- **Inventario**: el conjunto de piezas del influencer del jugador.
- **Dependencia**: relación que indica que una pieza se decidió a partir de otra.
- **Versión histórica**: contenido anterior de una pieza que fue reemplazada.
- **Dato útil**: consejo corto ligado al tema de una puerta, que se muestra durante la espera.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En el 100 % de los casos probados, ninguna pieza entra al inventario sin una acción explícita de aprobar.
- **SC-002**: En el 100 % de los casos probados, una pieza aprobada sigue intacta tras fallos de juego, errores de la IA, cierre de puertas y cambio de app.
- **SC-003**: Una persona sin conocimientos previos resuelve una puerta, de la mini lección a la aprobación, en menos de 3 minutos.
- **SC-004**: Al menos 8 de cada 10 personas de prueba pueden explicar con sus palabras, después de una puerta, de qué trataba la decisión.
- **SC-005**: Al reabrir una pieza, el 100 % de las piezas dependientes conserva su contenido y queda marcada por revisar; ninguna se borra.
- **SC-006**: Ante un fallo de la IA, el jugador siempre tiene una forma de continuar: reintentar, escribir su respuesta o salir y volver.
- **SC-007**: El jugador nunca ve un mensaje técnico, en ninguno de los escenarios de error probados.
- **SC-008**: La pieza guardada coincide carácter por carácter con lo que el jugador aprobó, en el 100 % de los casos.

## Assumptions

- La IA es Claude con el plan del propio jugador; la primera vez puede pedirle permiso, y eso se trata como parte normal del flujo.
- Qué decisiones concretas tiene cada mundo y el texto de sus mini lecciones pertenecen a las features 5, 6 y 7. Esta feature define el mecanismo común y se prueba con puertas de prueba.
- Las dependencias entre piezas las fija cada mundo según la factoría (por ejemplo, el concepto depende del nicho).
- Los datos útiles de la espera son textos preparados por tema, no generados en el momento.
- El límite de longitud de una respuesta escrita se fija en el plan técnico; el valor de partida es 500 caracteres.
- La validación de la fase completa pertenece a la feature 3 (jefe de mundo). Aquí solo se comenta la respuesta individual.
- Guardar el inventario entre sesiones pertenece a la feature 8. Dentro de una sesión, el inventario se mantiene.
- Cuántos puntos da una mini lección y cómo se convierten en niveles pertenece a la feature 4.
- La búsqueda del nombre en internet es propia del Mundo 3 (feature 7) y no forma parte de este mecanismo común.
- Según la constitución, las reglas de aprobación, estados y dependencias viven en la capa de dominio y tienen pruebas automáticas obligatorias.

## No-objetivos de esta feature

- NO hay conversación libre con la IA: el formato es tarjetas, edición y texto propio.
- NO hay pregunta de comprobación al final de la mini lección.
- NO hay minijuego durante la espera.
- NO hay aprobación por voz ni por gesto de juego.
- NO se borran piezas automáticamente al cambiar otra.
- NO hay varios influencers ni varias versiones activas de una misma pieza.
- NO hay generación de imagen, video ni voz.
- NO se comparte el inventario con otras personas desde esta feature; la exportación es la feature 8.

## Dependencias

- Requiere: feature 1 (el motor avisa que se alcanzó una puerta y reanuda el nivel al resolverse).
- La usan: feature 3 (jefe de mundo), features 5, 6 y 7 (mundos), feature 8 (guardado y exportación).
