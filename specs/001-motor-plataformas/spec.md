# Feature Specification: Motor de plataformas y controles

**Feature Branch**: `001-motor-plataformas`

**Created**: 2026-11-16

**Status**: Approved (2026-11-16)

**Input**: Feature 1 del mapa aprobado (`docs-entrada/02-features.md`): "El jugador mueve al personaje a izquierda y derecha y salta, con tres botones táctiles o con teclado. Hay plataformas, enemigos que se esquivan o se vencen, y objetos para recoger. Al fallar, el jugador reaparece en el último punto seguro. Modo de ayuda para quien no es jugador. Fallar en la parte de habilidad nunca borra ni cambia una decisión aprobada." Respuestas del dueño: al fallar reaparece cerca y sin vidas; los enemigos se vencen saltando encima; la ayuda se ofrece al fallar varias veces; los tramos duran de 1 a 2 minutos.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Recorrer un tramo y llegar a la puerta (Priority: P1)

El jugador abre un nivel en su teléfono, mueve al personaje con tres botones (izquierda, derecha y saltar), avanza por plataformas hechas de publicaciones y llega a la puerta de decisión del final del tramo.

**Why this priority**: sin moverse y llegar a la puerta no hay juego. Es la base de todas las demás features.

**Independent Test**: se carga un tramo de prueba sin enemigos y se comprueba que una persona llega del inicio a la puerta usando solo los tres botones táctiles, y también usando solo el teclado.

**Acceptance Scenarios**:

1. **Given** el personaje quieto sobre una plataforma, **When** el jugador mantiene pulsado derecha, **Then** el personaje avanza hacia la derecha y se detiene al soltar.
2. **Given** el personaje sobre una plataforma, **When** el jugador pulsa saltar, **Then** el personaje salta y vuelve a caer; mantener pulsado más tiempo produce un salto más alto.
3. **Given** el personaje en el aire, **When** el jugador pulsa saltar de nuevo, **Then** no ocurre un segundo salto.
4. **Given** el personaje junto a la puerta de decisión, **When** la toca, **Then** la acción se detiene y el motor avisa que se alcanzó esa puerta.
5. **Given** un tramo de prueba, **When** lo recorre alguien que ya conoce los controles, **Then** llega a la puerta en un tiempo de entre 1 y 2 minutos.

---

### User Story 2 - Fallar sin perder lo importante (Priority: P1)

El jugador cae al vacío o toca un enemigo de lado. No hay vidas ni pantalla de fin de juego: reaparece en el último punto seguro, pierde algunos corazones recogidos y sigue.

**Why this priority**: el público no es jugador. Si fallar castiga fuerte, abandona antes de crear su influencer. Y la constitución exige que fallar nunca toque una decisión aprobada.

**Independent Test**: en un tramo con un vacío y un punto seguro, se deja caer al personaje y se comprueba dónde reaparece, cuántos corazones pierde y que las decisiones aprobadas siguen intactas.

**Acceptance Scenarios**:

1. **Given** el personaje pasó por un punto seguro, **When** cae al vacío, **Then** reaparece en ese punto seguro en menos de 2 segundos.
2. **Given** el jugador tiene corazones recogidos, **When** falla, **Then** pierde una parte de ellos, nunca todos, y nunca baja de cero.
3. **Given** el jugador tiene piezas del influencer aprobadas, **When** falla cualquier número de veces, **Then** todas las piezas aprobadas siguen exactamente igual.
4. **Given** el jugador ya cruzó una puerta de decisión en este nivel, **When** falla después, **Then** reaparece después de esa puerta y no tiene que repetirla.
5. **Given** cualquier situación de juego, **When** el jugador falla, **Then** nunca aparece una pantalla de fin de juego ni se reinicia el nivel completo.

---

### User Story 3 - Enemigos y objetos (Priority: P2)

En el tramo hay enemigos (trolls y notificaciones) y corazones. El jugador vence a un enemigo cayéndole encima y recoge corazones al tocarlos.

**Why this priority**: da reto y recompensa, que es lo que hace divertido el recorrido. El juego se puede probar sin esto, por eso va después.

**Independent Test**: en un tramo con un enemigo y tres corazones, se comprueba qué pasa al caer sobre el enemigo, al tocarlo de lado y al tocar cada corazón.

**Acceptance Scenarios**:

1. **Given** un enemigo en una plataforma, **When** el personaje cae sobre él desde arriba, **Then** el enemigo desaparece, el personaje rebota y no recibe daño.
2. **Given** un enemigo en una plataforma, **When** el personaje lo toca de lado o desde abajo, **Then** cuenta como un fallo (User Story 2).
3. **Given** un corazón en el tramo, **When** el personaje lo toca, **Then** el corazón desaparece y el contador de corazones sube en uno.
4. **Given** un enemigo vencido, **When** el jugador falla y reaparece, **Then** ese enemigo sigue vencido.

---

### User Story 4 - Modo de ayuda (Priority: P2)

Si el jugador falla tres veces en el mismo tramo, el juego le ofrece ayuda. Puede aceptar que el tramo se vuelva más fácil, saltarlo, o seguir intentando. También puede activar la ayuda desde el menú en cualquier momento.

**Why this priority**: garantiza que una persona sin experiencia en juegos termine el mundo. Depende de que existan los fallos (User Story 2).

**Independent Test**: se falla tres veces seguidas en el mismo tramo y se comprueba que aparece la oferta, y que cada una de las tres respuestas hace lo que promete.

**Acceptance Scenarios**:

1. **Given** el jugador falló tres veces desde el mismo punto seguro, **When** reaparece, **Then** el juego le ofrece ayuda con tres opciones: hacerlo más fácil, saltar el tramo o seguir intentando.
2. **Given** la oferta de ayuda, **When** el jugador elige hacerlo más fácil, **Then** aparecen plataformas adicionales y los enemigos se mueven más lento durante ese tramo.
3. **Given** la oferta de ayuda, **When** el jugador elige saltar el tramo, **Then** el personaje aparece en el siguiente punto seguro o ante la puerta, lo que esté primero.
4. **Given** la oferta de ayuda, **When** el jugador elige seguir intentando, **Then** el juego continúa igual y no vuelve a ofrecer ayuda hasta otros tres fallos.
5. **Given** el jugador usó la ayuda, **When** termina el nivel, **Then** conserva los mismos puntos de aprendizaje que si no la hubiera usado.
6. **Given** cualquier momento del nivel, **When** el jugador abre el menú, **Then** puede activar o desactivar el modo de ayuda.
7. **Given** un tramo saltado con la ayuda, **When** se revisa el nivel, **Then** ninguna puerta de decisión quedó saltada: las puertas nunca se saltan.

---

### User Story 5 - Pausar y volver (Priority: P3)

El jugador pausa el nivel, o recibe una llamada, o cambia de app. Al volver, el juego está en pausa y lo retoma donde estaba.

**Why this priority**: en el teléfono las interrupciones son constantes. No impide probar el juego, pero sin esto la experiencia real falla.

**Independent Test**: con el personaje en mitad de un salto, se cambia de app y se vuelve; se comprueba que el juego estaba detenido y continúa desde el mismo punto.

**Acceptance Scenarios**:

1. **Given** el nivel en curso, **When** el jugador pulsa pausa, **Then** todo movimiento se detiene y aparece el menú de pausa.
2. **Given** el nivel en curso, **When** la pantalla del juego deja de estar visible, **Then** el juego se pausa solo.
3. **Given** el juego en pausa, **When** el jugador elige continuar, **Then** el nivel sigue desde el mismo estado.

---

### Edge Cases

- El jugador pulsa izquierda y derecha a la vez: el personaje se queda quieto.
- El jugador gira el teléfono a horizontal: el juego sigue siendo jugable o pide volver a vertical, pero no pierde el estado del nivel.
- La pantalla es muy pequeña o muy grande: los tres botones siguen al alcance de los pulgares y no tapan al personaje.
- El personaje cae al vacío antes de pasar por ningún punto seguro: reaparece al inicio del nivel.
- El jugador falla con cero corazones: reaparece igual y el contador sigue en cero.
- El jugador toca un enemigo en el mismo instante en que le cae encima: se resuelve a favor del jugador.
- El jugador se queda quieto mucho tiempo: no pasa nada; no hay límite de tiempo.
- El jugador usa "saltar tramo" y lo siguiente es la puerta: aparece ante la puerta, no detrás.
- El dispositivo va lento: el personaje se mueve a la misma velocidad real, no más lento ni atravesando plataformas.

## Requirements *(mandatory)*

### Functional Requirements

**Movimiento y controles**

- **FR-001**: El jugador DEBE poder mover al personaje a izquierda y derecha y hacerlo saltar con exactamente tres controles táctiles en pantalla.
- **FR-002**: El jugador DEBE poder hacer lo mismo con teclado cuando lo tenga.
- **FR-003**: El salto DEBE variar de altura según cuánto tiempo se mantenga pulsado el control, con una altura mínima y una máxima.
- **FR-004**: El personaje NO DEBE poder saltar de nuevo mientras está en el aire.
- **FR-005**: El personaje DEBE apoyarse en las plataformas y NO DEBE atravesarlas, a cualquier velocidad de juego del dispositivo.
- **FR-006**: Los controles táctiles DEBEN quedar al alcance de los pulgares en un teléfono sostenido en vertical y NO DEBEN tapar al personaje ni a la puerta.
- **FR-007**: La vista DEBE seguir al personaje a lo largo del nivel.

**Nivel**

- **FR-008**: Un nivel DEBE estar compuesto por tramos; cada tramo termina en una puerta de decisión o en el final del nivel.
- **FR-009**: Un tramo DEBE poder recorrerse en 1 a 2 minutos por alguien que conoce los controles.
- **FR-010**: Cada tramo DEBE tener al menos un punto seguro, y el inicio del nivel cuenta como punto seguro.
- **FR-011**: Al tocar una puerta de decisión, el motor DEBE detener la acción y avisar qué puerta se alcanzó; DEBE reanudar la acción cuando se le indique que la puerta quedó resuelta.
- **FR-012**: El motor NO DEBE aprobar, cambiar ni descartar ninguna pieza del influencer. Solo avisa que se llegó a una puerta.
- **FR-013**: NO DEBE existir límite de tiempo para completar un tramo.

**Fallos**

- **FR-014**: Caer al vacío, o tocar un enemigo de lado o desde abajo, DEBE contar como un fallo.
- **FR-015**: Tras un fallo, el personaje DEBE reaparecer en el último punto seguro alcanzado, en menos de 2 segundos.
- **FR-016**: Tras un fallo, el jugador DEBE perder una parte de sus corazones, nunca todos, y el contador NO DEBE bajar de cero.
- **FR-017**: NO DEBEN existir vidas, pantalla de fin de juego ni reinicio obligatorio del nivel.
- **FR-018**: Un fallo NO DEBE modificar ninguna pieza aprobada del influencer ni el progreso de aprendizaje ya ganado.
- **FR-019**: Una puerta de decisión ya resuelta NO DEBE tener que repetirse por un fallo posterior.

**Enemigos y objetos**

- **FR-020**: Caer sobre un enemigo desde arriba DEBE eliminarlo y hacer rebotar al personaje, sin daño.
- **FR-021**: Un enemigo vencido DEBE seguir vencido después de un fallo dentro del mismo nivel.
- **FR-022**: Tocar un corazón DEBE recogerlo y sumar uno al contador.
- **FR-023**: Un contacto simultáneo que pueda leerse como "encima" o "de lado" DEBE resolverse a favor del jugador.

**Modo de ayuda**

- **FR-024**: Tras tres fallos desde el mismo punto seguro, el juego DEBE ofrecer ayuda con tres opciones: hacerlo más fácil, saltar el tramo o seguir intentando.
- **FR-025**: "Hacerlo más fácil" DEBE añadir plataformas y reducir la velocidad de los enemigos en ese tramo.
- **FR-026**: "Saltar el tramo" DEBE llevar al personaje al siguiente punto seguro o ante la siguiente puerta, lo que esté primero.
- **FR-027**: El modo de ayuda NO DEBE saltar ninguna puerta de decisión.
- **FR-028**: Usar la ayuda NO DEBE reducir los puntos de aprendizaje del jugador.
- **FR-029**: El jugador DEBE poder activar o desactivar el modo de ayuda desde el menú en cualquier momento.
- **FR-030**: Tras elegir "seguir intentando", la oferta NO DEBE repetirse hasta acumular otros tres fallos.

**Pausa e información en pantalla**

- **FR-031**: El jugador DEBE poder pausar y continuar el nivel.
- **FR-032**: El juego DEBE pausarse solo cuando su pantalla deja de estar visible.
- **FR-033**: Durante el nivel DEBE verse el contador de corazones.
- **FR-034**: Todo texto que vea el jugador DEBE estar en español.

### Key Entities

- **Personaje**: a quien controla el jugador. Tiene posición, dirección y si está en el suelo o en el aire.
- **Nivel**: recorrido completo dentro de un mundo. Se divide en tramos.
- **Tramo**: parte del nivel entre dos puertas. Tiene plataformas, enemigos, corazones y al menos un punto seguro.
- **Plataforma**: superficie donde el personaje se apoya; su aspecto es el de una publicación.
- **Punto seguro**: lugar donde el personaje reaparece tras un fallo.
- **Enemigo**: obstáculo móvil (troll o notificación). Se vence cayéndole encima.
- **Corazón**: objeto para recoger. Suma al contador y se pierde en parte al fallar.
- **Puerta de decisión**: punto del nivel que detiene la acción. Su contenido pertenece a la feature 2; aquí solo es un lugar que se alcanza.
- **Estado del modo de ayuda**: si está activo, y cuántos fallos seguidos lleva el jugador desde el punto seguro actual.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Una persona que nunca ha jugado un juego de plataformas llega del inicio a la primera puerta en su primer intento de sesión, con o sin modo de ayuda, en menos de 5 minutos.
- **SC-002**: Una persona que conoce los controles recorre cada tramo en un tiempo de entre 1 y 2 minutos.
- **SC-003**: En pruebas con cualquier número de fallos seguidos, el 100 % de las piezas aprobadas del influencer permanece sin cambios.
- **SC-004**: Tras un fallo, el jugador vuelve a tener el control en menos de 2 segundos.
- **SC-005**: Los tres controles se pueden usar con los pulgares, sin mover las manos, en teléfonos desde 5 hasta 6,9 pulgadas en vertical.
- **SC-006**: El 100 % de los jugadores que fallan tres veces en un tramo recibe la oferta de ayuda.
- **SC-007**: Con el modo de ayuda, ningún jugador queda bloqueado en un tramo: siempre existe una forma de llegar a la siguiente puerta.
- **SC-008**: El movimiento se percibe fluido y el personaje responde a un control en menos de una décima de segundo.

## Assumptions

- El juego se usa sobre todo con el teléfono en vertical; la orientación horizontal no es un objetivo de esta feature.
- "Una parte de los corazones" que se pierde al fallar se fija en el plan técnico; el valor de partida es una cuarta parte, redondeada hacia abajo.
- Los corazones son una recompensa de juego. Cómo se convierten en puntos, niveles o habilidades pertenece a la feature 4.
- Qué ocurre dentro de una puerta de decisión pertenece a la feature 2; el jefe de mundo pertenece a la feature 3.
- El guardado entre sesiones pertenece a la feature 8. Dentro de una misma sesión, el estado del nivel se mantiene.
- El diseño concreto de los niveles del Mundo 1 pertenece a la feature 5. Esta feature se prueba con tramos de prueba.
- Hay sonido y música solo si no retrasan la entrega; no son requisito de esta feature.
- El aspecto visual sigue el concepto "Dentro del teléfono" (`docs/concepto-visual/`); el protagonista definitivo está por diseñar.
- Según la constitución, este motor es parte de la capa de presentación y no conoce las reglas del influencer.

## No-objetivos de esta feature

- NO hay vidas, puntuación por tiempo ni tabla de récords.
- NO hay un cuarto botón de acción (lanzar, correr, agacharse).
- NO hay doble salto, salto en pared ni otros movimientos avanzados.
- NO hay jefes: pertenecen a la feature 3.
- NO hay mapa de mundos: pertenece a la feature 4.
- NO hay mando ni controles configurables.
- NO hay editor de niveles.
- NO hay multijugador.

## Dependencias

- Requiere: ninguna feature previa.
- La usan: feature 2 (puertas de decisión), feature 3 (jefe de mundo), features 5, 6 y 7 (mundos).
