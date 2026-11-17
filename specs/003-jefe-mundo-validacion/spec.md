# Feature Specification: Jefe de mundo — validación de la fase

**Feature Branch**: `003-jefe-mundo-validacion`

**Created**: 2026-11-16

**Status**: Approved (2026-11-16)

**Input**: Feature 3 del mapa aprobado (`docs-entrada/02-features.md`): "Al final de cada mundo, el jefe revisa las piezas aprobadas con los criterios del validador de esa fase. Si encuentra un problema, lo señala con una explicación simple y lleva al jugador a la pieza que conviene revisar. El mundo se cierra cuando el jugador aprueba el resumen final. El jefe no cambia piezas: solo señala." Respuestas del dueño: pelea corta de plataformas y después revisión; ante un problema, el jefe avisa y el jugador decide; al cerrar el mundo, el jugador recibe un resumen de lo creado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - La revisión del jefe (Priority: P1)

El jugador termina las puertas de un mundo y llega al jefe. Tras vencerlo, el jefe revisa las piezas aprobadas de ese mundo con los criterios del validador de la fase y le dice, en lenguaje simple, qué está sólido y qué conviene ajustar.

**Why this priority**: es lo que convierte un conjunto de decisiones sueltas en una fase coherente. Sin revisión, el jugador no sabe si lo que creó se sostiene.

**Independent Test**: con un conjunto de piezas de prueba y respuestas de revisión simuladas, se comprueba que el jugador ve un resultado por criterio, con explicación, y que ninguna pieza cambió.

**Acceptance Scenarios**:

1. **Given** todas las piezas del mundo están aprobadas, **When** empieza la revisión, **Then** el jefe evalúa las piezas con los criterios del validador de esa fase de la factoría.
2. **Given** la revisión terminó, **When** se muestra el resultado, **Then** el jugador ve qué está sólido y qué tiene observaciones, cada punto con una explicación de una o dos frases.
3. **Given** una observación, **When** el jugador la lee, **Then** la observación nombra la pieza a la que se refiere y dice por qué conviene revisarla.
4. **Given** la revisión terminó, **When** se compara el inventario con el de antes, **Then** ninguna pieza cambió: el jefe solo señala.
5. **Given** datos que la IA dedujo sin puerta propia (por ejemplo mercados y plataformas en el Mundo 1), **When** llega la revisión, **Then** el jefe se los presenta al jugador para que los confirme o los cambie.

---

### User Story 2 - Avisar y dejar decidir (Priority: P1)

El jefe encontró un problema. El jugador puede ir a revisar la pieza señalada, o confirmar que la acepta tal como está y seguir. El jefe solo impide cerrar el mundo si falta una pieza o hay piezas por revisar.

**Why this priority**: respeta el principio de que el jugador decide. Un validador que bloquea por opinión le quita el influencer al jugador.

**Independent Test**: con una observación simulada, se prueba cada camino (revisar, aceptar tal cual) y se comprueba que ambos permiten cerrar el mundo.

**Acceptance Scenarios**:

1. **Given** una observación del jefe, **When** el jugador elige revisar la pieza, **Then** se abre esa pieza para decidir de nuevo, con el flujo normal de una puerta.
2. **Given** el jugador cambió una pieza tras una observación, **When** vuelve al jefe, **Then** la revisión se repite sobre las piezas actuales, sin repetir la pelea.
3. **Given** una observación del jefe, **When** el jugador elige aceptarla tal como está, **Then** la observación queda registrada como aceptada y deja de impedir el cierre.
4. **Given** falta una pieza del mundo, **When** el jugador llega al jefe, **Then** el jefe le indica cuál falta y lo lleva a su puerta; el mundo no se puede cerrar.
5. **Given** hay piezas por revisar en el mundo, **When** el jugador llega al jefe, **Then** el jefe le pide revisarlas primero; el mundo no se puede cerrar.
6. **Given** todas las observaciones están resueltas o aceptadas, **When** el jugador continúa, **Then** pasa al resumen final.

---

### User Story 3 - Cerrar el mundo con el resumen (Priority: P1)

El jefe muestra un resumen de lo creado en el mundo. El jugador lo lee y lo aprueba de forma explícita. El mundo queda cerrado y el jugador recibe su resumen.

**Why this priority**: es el momento en que la fase queda terminada. Sin aprobación del resumen no hay cierre, igual que en la factoría.

**Independent Test**: con piezas de prueba aprobadas, se llega al resumen y se comprueba que el mundo se cierra solo tras la aprobación explícita.

**Acceptance Scenarios**:

1. **Given** el jugador pasó la revisión, **When** se muestra el resumen, **Then** ve todas las piezas del mundo con su contenido exacto y las observaciones que aceptó.
2. **Given** el resumen, **When** el jugador lo aprueba de forma explícita, **Then** el mundo queda cerrado.
3. **Given** el resumen, **When** el jugador sale sin aprobar, **Then** el mundo sigue abierto y puede volver al resumen sin repetir la pelea ni la revisión.
4. **Given** el mundo se cerró, **When** termina el cierre, **Then** el jugador recibe una tarjeta de resumen de lo creado que puede volver a ver más tarde.
5. **Given** un mundo cerrado, **When** el jugador reabre una de sus piezas y la cambia, **Then** el mundo vuelve a quedar pendiente de revisión del jefe, sin repetir la pelea.

---

### User Story 4 - La pelea con el jefe (Priority: P2)

Antes de la revisión, el jugador enfrenta al jefe en una pelea corta de plataformas, con los mismos tres controles. Si le cuesta, el modo de ayuda también funciona aquí.

**Why this priority**: es el clímax del mundo y lo que lo hace sentir como un juego. La revisión y el cierre funcionan sin la pelea, por eso va después.

**Independent Test**: en un escenario de pelea de prueba, se comprueba que se puede vencer al jefe con los tres controles, que fallar no cambia el inventario y que la ayuda permite pasar.

**Acceptance Scenarios**:

1. **Given** todas las piezas del mundo están aprobadas y ninguna está por revisar, **When** el jugador llega al final del nivel, **Then** empieza la pelea con el jefe.
2. **Given** la pelea, **When** el jugador golpea al jefe el número de veces necesario, **Then** el jefe queda vencido y empieza la revisión.
3. **Given** la pelea, **When** el jugador falla, **Then** reaparece dentro de la pelea sin perder el daño ya hecho al jefe y sin pantalla de fin de juego.
4. **Given** el jugador falló tres veces en la pelea, **When** reaparece, **Then** se le ofrece la ayuda: hacerla más fácil, saltarla o seguir intentando.
5. **Given** el jugador saltó la pelea con la ayuda, **When** continúa, **Then** pasa a la revisión igual; la revisión y el resumen nunca se saltan.
6. **Given** el jugador ya venció al jefe de ese mundo, **When** vuelve por cualquier motivo, **Then** no tiene que repetir la pelea.

---

### Edge Cases

- La IA no responde durante la revisión: un personaje lo explica y ofrece reintentar; el jugador también puede pasar al resumen sin revisión, y el resumen indica que no fue revisado.
- La revisión no encuentra nada que observar: el jefe lo dice con claridad y se pasa al resumen.
- La revisión devuelve una observación sobre una pieza que no existe o de otro mundo: no se muestra.
- El jugador acepta una observación y después cambia de opinión: puede reabrir la pieza desde el inventario en cualquier momento.
- El jugador cambia una pieza y eso deja otras del mismo mundo por revisar: el jefe pide revisarlas antes de repetir la revisión.
- El jugador cambia una pieza de un mundo anterior ya cerrado: ese mundo vuelve a quedar pendiente de revisión, y las piezas dependientes de este mundo quedan por revisar.
- El jugador cambia de app en mitad de la pelea o de la revisión: al volver, sigue donde estaba.
- El jugador toca aprobar el resumen dos veces: el mundo se cierra una sola vez.
- La revisión se repite muchas veces: el juego sigue respondiendo y no castiga al jugador por ello.

## Requirements *(mandatory)*

### Functional Requirements

**Acceso al jefe**

- **FR-001**: El jefe DEBE estar disponible solo cuando todas las piezas del mundo están aprobadas y ninguna está por revisar.
- **FR-002**: Si falta una pieza, el sistema DEBE indicar cuál es y llevar al jugador a su puerta.
- **FR-003**: Si hay piezas por revisar, el sistema DEBE pedir al jugador que las revise antes de enfrentar al jefe.

**Pelea**

- **FR-004**: El encuentro con el jefe DEBE empezar con una pelea corta de plataformas que usa los mismos tres controles del resto del juego.
- **FR-005**: La pelea DEBE poder ganarse en 1 a 2 minutos por alguien que conoce los controles.
- **FR-006**: Fallar en la pelea DEBE seguir las reglas de fallo del motor: reaparecer sin vidas ni fin de juego, y sin perder el daño ya hecho al jefe.
- **FR-007**: El modo de ayuda DEBE funcionar en la pelea, incluida la opción de saltarla.
- **FR-008**: La pelea NO DEBE aprobar, cambiar ni descartar ninguna pieza.
- **FR-009**: Una vez vencido o saltado el jefe de un mundo, el jugador NO DEBE tener que repetir la pelea.

**Revisión**

- **FR-010**: Tras la pelea, el jefe DEBE revisar las piezas aprobadas del mundo con los criterios del validador de esa fase de la factoría.
- **FR-011**: El resultado DEBE mostrar qué está sólido y qué tiene observaciones, cada punto con una explicación en lenguaje simple.
- **FR-012**: Cada observación DEBE nombrar la pieza a la que se refiere y explicar por qué conviene revisarla.
- **FR-013**: El jefe NO DEBE cambiar, aprobar ni descartar ninguna pieza.
- **FR-014**: El jefe DEBE presentar al jugador los datos de la fase que no tuvieron puerta propia, para que los confirme o los cambie con aprobación explícita.
- **FR-015**: El sistema NO DEBE mostrar observaciones sobre piezas inexistentes o de otro mundo.
- **FR-016**: La revisión NO DEBE afirmar hechos externos que no se comprobaron.

**Avisar y dejar decidir**

- **FR-017**: Ante cada observación, el jugador DEBE poder elegir entre revisar la pieza o aceptarla tal como está.
- **FR-018**: Elegir revisar DEBE abrir la pieza con el flujo normal de una puerta de decisión.
- **FR-019**: Elegir aceptar DEBE registrar la observación como aceptada por el jugador.
- **FR-020**: Una observación NO DEBE impedir el cierre del mundo una vez resuelta o aceptada.
- **FR-021**: Si el jugador cambia una pieza tras una observación, la revisión DEBE repetirse sobre las piezas actuales, sin repetir la pelea.

**Resumen y cierre**

- **FR-022**: Tras la revisión, el sistema DEBE mostrar un resumen con todas las piezas del mundo, con su contenido exacto, y las observaciones aceptadas.
- **FR-023**: El mundo DEBE cerrarse solo tras la aprobación explícita del resumen por el jugador.
- **FR-024**: Aprobar el resumen DEBE cerrar el mundo una sola vez, aunque la acción se repita.
- **FR-025**: Si el jugador sale sin aprobar, el mundo DEBE seguir abierto y el jugador DEBE poder volver al resumen sin repetir pelea ni revisión.
- **FR-026**: Al cerrarse el mundo, el jugador DEBE recibir una tarjeta de resumen de lo creado, que puede volver a ver más tarde.
- **FR-027**: El sistema DEBE informar que el mundo quedó cerrado, para que otras partes del juego reaccionen.

**Después del cierre**

- **FR-028**: Si el jugador cambia una pieza de un mundo cerrado, ese mundo DEBE volver a quedar pendiente de revisión del jefe, sin repetir la pelea.
- **FR-029**: Las tarjetas de resumen de mundos cerrados DEBEN reflejar siempre las piezas vigentes.

**Errores**

- **FR-030**: Si la IA falla durante la revisión, un personaje DEBE explicarlo en el tono del juego y ofrecer reintentar.
- **FR-031**: Si la IA no está disponible, el jugador DEBE poder pasar al resumen sin revisión, y el resumen DEBE indicar que no fue revisado. *Enmienda D37 (2026-11-17, aprobada en D40): antes se ofrece la revisión en modo guía, con la IA que el jugador elija (005/FR-006 a FR-013); cerrar sin revisión sigue disponible.*
- **FR-032**: Un error durante la pelea, la revisión o el resumen NO DEBE cambiar ni borrar piezas aprobadas.
- **FR-033**: Todo texto que vea el jugador DEBE estar en español y sin mensajes técnicos.

### Key Entities

- **Jefe de mundo**: el personaje final de un mundo. Representa al validador de la fase.
- **Pelea**: enfrentamiento corto de plataformas contra el jefe. Tiene un estado: pendiente, vencida o saltada.
- **Criterio de validación**: una comprobación que la factoría define para esa fase, por ejemplo "coherencia con el tiempo disponible".
- **Revisión**: resultado de evaluar las piezas del mundo con los criterios. Contiene puntos sólidos y observaciones.
- **Observación**: señalamiento sobre una pieza concreta, con su explicación. Tiene un estado: abierta, resuelta o aceptada por el jugador.
- **Dato deducido**: información de la fase que la IA dedujo sin puerta propia y que el jugador confirma ante el jefe.
- **Resumen del mundo**: las piezas del mundo con su contenido, más las observaciones aceptadas y si hubo revisión.
- **Estado del mundo**: abierto, pendiente de revisión o cerrado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En el 100 % de los casos probados, el inventario es idéntico antes y después de la pelea y de la revisión.
- **SC-002**: En el 100 % de los casos probados, un mundo se cierra solo tras la aprobación explícita del resumen.
- **SC-003**: En el 100 % de los casos probados, el jugador puede cerrar el mundo aceptando las observaciones, sin estar obligado a cambiar ninguna pieza.
- **SC-004**: En el 100 % de los casos probados, un mundo con una pieza faltante o por revisar no se puede cerrar.
- **SC-005**: Una persona sin conocimientos previos completa el encuentro, de la pelea al cierre, en menos de 6 minutos cuando no cambia ninguna pieza.
- **SC-006**: Al menos 8 de cada 10 personas de prueba entienden, sin ayuda, qué les señaló el jefe y por qué.
- **SC-007**: Ningún jugador queda bloqueado en la pelea: con el modo de ayuda siempre se llega a la revisión.
- **SC-008**: Ante un fallo de la IA, el jugador siempre puede continuar: reintentar o cerrar con el resumen marcado como no revisado.

## Assumptions

- Qué criterios revisa cada jefe sale del validador de la fase correspondiente en la factoría; la lista concreta por mundo pertenece a las features 5, 6 y 7.
- El aspecto y el nombre de cada jefe pertenecen a la feature de su mundo. El tema visual sugiere al algoritmo como jefe.
- El número de golpes para vencer al jefe se fija en el plan técnico; el valor de partida es tres.
- La pelea reutiliza el motor de la feature 1 y sus reglas de fallo y de ayuda.
- Revisar una pieza reutiliza el flujo de puertas de la feature 2.
- Desbloquear el siguiente mundo, los puntos y las habilidades pertenecen a la feature 4. Esta feature solo avisa que el mundo se cerró.
- Guardar el estado del mundo entre sesiones y exportar el resumen fuera del juego pertenecen a la feature 8.
- La revisión la hace la IA con los criterios de la factoría; las reglas que no dependen de opinión (pieza faltante, piezas por revisar) se comprueban sin IA.
- Según la constitución, las reglas de cierre del mundo viven en la capa de dominio y tienen pruebas automáticas obligatorias.

## No-objetivos de esta feature

- El jefe NO bloquea el cierre por opinión: solo por pieza faltante o por revisar.
- El jefe NO corrige piezas por su cuenta.
- NO hay preguntas de examen al jugador.
- NO hay varios jefes por mundo ni fases de pelea.
- NO hay recompensas de habilidad, rasgos del influencer ni puntos en esta feature; la recompensa es el resumen.
- NO hay verificación en internet durante la revisión.
- NO se comparte el resumen fuera del juego desde esta feature.

## Dependencias

- Requiere: feature 1 (motor, fallos y modo de ayuda) y feature 2 (piezas, estados, dependencias y flujo de puertas).
- La usan: feature 4 (mapa y progreso), features 5, 6 y 7 (mundos), feature 8 (guardado y exportación).
