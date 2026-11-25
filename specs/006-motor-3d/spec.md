# Feature Specification: Motor 3D y zonas de decisión

**Feature Branch**: `006-motor-3d`

**Created**: 2026-11-25

**Status**: Approved (2026-11-25, D50), con sus tres supuestos propuestos.

**Numeración**: reemplaza a la feature 1 del mapa aprobado (`docs-entrada/02-features.md`), cuya especificación es `specs/001-motor-plataformas/spec.md`. Es la sexta especificación escrita, por eso su carpeta es `006`.

**Input**: decisiones D46, D47, D48 y D49 del dueño (2026-11-24 y 2026-11-25). D46: el juego pasa a un mundo 3D abierto con la cámara detrás del personaje. D47: cada pregunta de la fase es una zona del distrito donde el jugador decide haciendo acciones, y cada respuesta se confirma con una aprobación explícita. Se mantienen las reglas de D27 (sin vidas, reaparecer cerca, ayuda tras tres fallos, tramos de 1 a 2 minutos) y la regla de la constitución de que fallar nunca toca una decisión aprobada. Referencia jugable: la maqueta del Mundo 1 (`docs/arte/3d/maquetas/mundo1-zonas.html`).

## Qué cambia respecto a la feature 1

| Tema | Feature 1 (2D) | Esta feature (3D) |
|---|---|---|
| Vista | De lado, de izquierda a derecha | Mundo abierto, cámara detrás del personaje |
| Controles | Tres botones: izquierda, derecha, saltar | Palanca, saltar, botón de acción y girar la cámara |
| Decisiones | Una puerta detiene el juego y abre una pantalla | Una zona del mundo donde se decide jugando (D47) |
| Recorrido | Tramos en línea | Zonas unidas por puentes que se abren al aprobar |

Lo que no cambia: sin vidas, reaparecer en el último punto seguro, ayuda tras tres fallos, pausa automática, y fallar nunca toca lo aprobado.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Moverse por el mundo 3D (Priority: P1)

El jugador abre un mundo en su teléfono, mueve a su influencer en cualquier dirección con una palanca, salta con un botón, gira la cámara deslizando el dedo por la escena y llega a la primera zona.

**Why this priority**: sin moverse no hay juego. Es la base de todo lo demás.

**Independent Test**: en un mundo de prueba sin enemigos, una persona va de la plaza central a la primera zona usando solo los controles táctiles, y también usando solo el teclado.

**Acceptance Scenarios**:

1. **Given** el personaje quieto, **When** el jugador inclina la palanca en cualquier dirección, **Then** el personaje camina hacia ese lado, relativo a la cámara, y se detiene al soltar.
2. **Given** el personaje en el suelo, **When** el jugador pulsa saltar, **Then** salta y vuelve a caer; mantener pulsado produce un salto más alto.
3. **Given** el personaje en el aire, **When** pulsa saltar de nuevo, **Then** no ocurre un segundo salto.
4. **Given** el jugador desliza el dedo por la escena, fuera de los controles, **When** lo mueve a los lados, **Then** la cámara gira alrededor del personaje.
5. **Given** el personaje camina, salta o está quieto, **When** se le mira, **Then** se ve la animación que corresponde a cada estado.
6. **Given** un pequeño escalón de altura, **When** el personaje camina contra él, **Then** lo sube sin tener que saltar.

---

### User Story 2 - Decidir jugando en una zona (Priority: P1)

El jugador llega a una zona del mundo. PIX le explica qué se decide allí. El jugador hace acciones dentro de la zona (acercarse, recoger, invitar, subir, elegir), aparece un botón de acción cuando algo se puede usar, y al final confirma su respuesta con una tarjeta de aprobación.

**Why this priority**: es el centro del juego según D47. Sin esto no se crea el influencer.

**Independent Test**: en la zona de fuente de ingreso del Mundo 1, se acerca el personaje a una máquina, se pulsa el botón de acción y se aprueba; se comprueba que la pieza queda guardada y que se abre el puente a la siguiente zona.

**Acceptance Scenarios**:

1. **Given** el jugador entra en una zona, **When** llega, **Then** PIX le explica en una o dos frases qué se decide allí y qué tiene que hacer.
2. **Given** el personaje cerca de un objeto con el que se puede hacer algo, **When** está a su alcance, **Then** aparece el botón de acción con lo que hará (por ejemplo "Encender"), y PIX explica ese objeto.
3. **Given** el jugador pulsa el botón de acción que lleva a una decisión, **When** se abre la tarjeta de aprobación, **Then** el juego se detiene y la tarjeta muestra la respuesta y por qué importa, con "Aprobar" y "Seguir explorando".
4. **Given** la tarjeta de aprobación, **When** el jugador elige "Seguir explorando", **Then** vuelve al juego sin que nada quede decidido.
5. **Given** la tarjeta de aprobación, **When** el jugador aprueba, **Then** la pieza queda en el inventario, la zona se marca como hecha, algo del mundo se enciende y se abre el camino a la siguiente zona.
6. **Given** cualquier acción dentro de una zona (recoger, tocar, subir), **When** ocurre, **Then** ninguna pieza del influencer queda decidida sin pasar por la tarjeta de aprobación.
7. **Given** una zona ya aprobada, **When** el jugador vuelve a ella, **Then** sus objetos de decisión ya no están activos; cambiar una pieza aprobada se hace con "reabrir" (feature 2).

---

### User Story 3 - Fallar sin perder lo importante (Priority: P1)

El jugador cae de una plataforma o lo empuja un enemigo. No hay vidas ni fin del juego: reaparece en el último sitio seguro y sigue.

**Why this priority**: el público no es jugador. La constitución exige que fallar nunca toque una decisión aprobada.

**Independent Test**: se deja caer al personaje desde una plataforma alta y se comprueba dónde reaparece y que las piezas aprobadas siguen intactas.

**Acceptance Scenarios**:

1. **Given** el personaje estuvo de pie en una plataforma, **When** cae al vacío, **Then** reaparece en el último sitio donde estuvo de pie de forma segura, en menos de 2 segundos.
2. **Given** el jugador tiene piezas aprobadas, **When** falla cualquier número de veces, **Then** todas siguen exactamente igual.
3. **Given** el jugador ya aprobó una zona, **When** falla después, **Then** nunca tiene que repetir esa zona.
4. **Given** cualquier situación, **When** el jugador falla, **Then** nunca aparece una pantalla de fin de juego ni se reinicia el mundo.
5. **Given** el jugador falla, **When** reaparece, **Then** PIX le dice con una frase amable que no perdió nada.

---

### User Story 4 - Enemigos y objetos (Priority: P2)

Por el mundo vuelan enemigos, como los drones de spam, y hay chispas para recoger (D48). Los enemigos son un obstáculo que se esquiva o se vence. Las chispas desbloquean consejos extra de PIX, y cada fallo cuesta una parte de ellas.

**Why this priority**: dan reto y ritmo al recorrido entre zonas. Se puede probar el juego sin ellos.

**Independent Test**: en un puente con un dron, se comprueba qué pasa al tocarlo de lado y al caerle encima.

**Acceptance Scenarios**:

1. **Given** un dron de spam que patrulla, **When** el personaje lo toca de lado, **Then** el dron empuja al personaje hacia atrás y cuenta como un fallo: pierde un porcentaje de sus chispas y reaparece en el último sitio seguro (D49).
2. **Given** un dron de spam, **When** el personaje le cae encima, **Then** el dron queda vencido y desaparece, el personaje rebota y no recibe daño (D49).
3. **Given** un dron vencido, **When** pasa un minuto, **Then** vuelve a aparecer en su recorrido, lejos del personaje si este está cerca (D49).
4. **Given** una chispa, **When** el personaje la toca, **Then** desaparece y el contador de chispas sube en uno.
5. **Given** el contador llega a la cantidad que desbloquea un consejo, **When** ocurre, **Then** PIX cuenta un consejo nuevo de creación de contenido, que queda guardado para volver a leerlo.
6. **Given** el jugador tiene chispas, **When** falla, **Then** pierde un porcentaje de ellas, nunca todas, y el contador nunca baja de cero.
7. **Given** el jugador ya desbloqueó consejos, **When** pierde chispas, **Then** conserva todos los consejos desbloqueados.

---

### User Story 5 - Modo de ayuda (Priority: P2)

Si el jugador falla tres veces seguidas en el mismo tramo, el juego le ofrece ayuda: hacerlo más fácil, llevarlo al siguiente sitio seguro, o seguir intentando.

**Why this priority**: garantiza que una persona sin experiencia termine el mundo (D27).

**Independent Test**: se falla tres veces seguidas el mismo salto y se comprueba que aparece la oferta y que cada opción hace lo que promete.

**Acceptance Scenarios**:

1. **Given** tres fallos seguidos desde el mismo sitio seguro, **When** el jugador reaparece, **Then** el juego le ofrece las tres opciones.
2. **Given** "hacerlo más fácil", **When** se elige, **Then** aparecen plataformas extra en ese tramo y los enemigos van más lento.
3. **Given** "llevarme al siguiente sitio seguro", **When** se elige, **Then** el personaje aparece al otro lado del obstáculo, en la siguiente plataforma segura o a la entrada de la siguiente zona.
4. **Given** la ayuda, **When** se usa de cualquier forma, **Then** nunca salta una zona de decisión: las zonas siempre se juegan y se aprueban.
5. **Given** el menú, **When** el jugador lo abre, **Then** puede activar o desactivar la ayuda en cualquier momento.

---

### User Story 6 - Pausar y volver (Priority: P3)

El jugador pausa, recibe una llamada o cambia de app. Al volver, el juego está en pausa y sigue donde estaba.

**Why this priority**: en el teléfono las interrupciones son constantes.

**Independent Test**: con el personaje en mitad de un salto, se cambia de app y se vuelve.

**Acceptance Scenarios**:

1. **Given** el mundo en curso, **When** el jugador pulsa pausa, **Then** todo se detiene y aparece el menú de pausa.
2. **Given** el mundo en curso, **When** la pantalla deja de estar visible, **Then** el juego se pausa solo.
3. **Given** la app de Claude recarga la página al volver (D39), **When** el jugador regresa, **Then** aparece en la plaza o en la entrada de la última zona en curso, con todo lo aprobado guardado.

---

### Edge Cases

- El jugador mueve la palanca y gira la cámara a la vez con dos dedos: ambas cosas funcionan juntas.
- La cámara queda detrás de una pared o de un modelo grande: la cámara se acerca al personaje para no perderlo de vista.
- El jugador cae antes de pisar ninguna plataforma segura: reaparece en la plaza central.
- Dos objetos con acción están a la vez al alcance: el botón muestra el más cercano.
- El jugador abre la tarjeta de aprobación y la app se recarga: al volver, la pieza no quedó aprobada y la zona sigue abierta.
- Los modelos 3D todavía no terminaron de cargar: se ven formas simples y el juego ya se puede jugar; los modelos aparecen cuando llegan.
- El dispositivo va lento: el personaje se mueve a la misma velocidad real y no atraviesa plataformas.
- El jugador se queda quieto mucho tiempo: no pasa nada; no hay límite de tiempo.
- El jugador gira el teléfono a horizontal: el juego sigue siendo jugable y no pierde el estado.

## Requirements *(mandatory)*

### Functional Requirements

**Movimiento, controles y cámara**

- **FR-001**: El jugador DEBE poder mover al personaje en cualquier dirección del suelo con una palanca táctil en pantalla, relativa a la cámara.
- **FR-002**: El jugador DEBE poder saltar con un botón táctil. El salto DEBE variar de altura según cuánto se mantenga pulsado, con una altura mínima y una máxima.
- **FR-003**: El personaje NO DEBE poder saltar otra vez en el aire. DEBE poder saltar justo después de salir de un borde y DEBE recordar un salto pulsado un instante antes de aterrizar.
- **FR-004**: El jugador DEBE poder girar la cámara deslizando el dedo por la escena, fuera de los controles.
- **FR-005**: El jugador DEBE poder hacer todo lo anterior con teclado: flechas o WASD para moverse, espacio para saltar, E para la acción, Q y R para girar la cámara.
- **FR-006**: La cámara DEBE seguir al personaje desde atrás y un poco por encima, con movimiento suave, y DEBE acercarse cuando algo la tape.
- **FR-007**: El personaje DEBE subir solo los escalones bajos, de hasta una cuarta parte de su altura, sin saltar.
- **FR-008**: El personaje NO DEBE atravesar plataformas ni paredes, a cualquier velocidad del dispositivo.
- **FR-009**: El personaje DEBE mostrar animaciones distintas al estar quieto, al correr y al saltar.
- **FR-010**: Los controles táctiles DEBEN quedar al alcance de los pulgares con el teléfono en vertical y NO DEBEN tapar al personaje.

**Zonas de decisión (D47)**

- **FR-011**: Un mundo DEBE estar formado por una plaza central y una zona por cada pregunta de su fase, unidas por caminos.
- **FR-012**: Al empezar, solo DEBE estar abierto el camino a la primera zona. Aprobar una zona DEBE abrir el camino a la siguiente, siguiendo el orden de la factoría.
- **FR-013**: Una señal visible desde lejos DEBE indicar la zona en curso.
- **FR-014**: Cuando el personaje esté al alcance de un objeto con acción, DEBE aparecer un botón con el nombre de esa acción, y PIX DEBE explicar el objeto en una o dos frases.
- **FR-015**: Las acciones dentro de una zona DEBEN servir para explorar y elegir. Ninguna acción DEBE fijar una pieza del influencer sin pasar por la tarjeta de aprobación.
- **FR-016**: La tarjeta de aprobación DEBE detener el juego, mostrar la respuesta y por qué importa, y ofrecer "Aprobar" y "Seguir explorando".
- **FR-017**: Al aprobar, el motor DEBE avisar a la capa de aplicación qué zona se resolvió y con qué respuesta. El motor NO DEBE guardar ni validar piezas por su cuenta: eso lo hace la feature 2.
- **FR-018**: Cada zona aprobada DEBE encender una parte visible del mundo (por ejemplo, un anillo del núcleo).
- **FR-019**: Las opciones que propone la IA DEBEN aparecer dentro de la zona como objetos del mundo (caminos, metas, personas), no como una lista en una pantalla aparte.
- **FR-020**: Mientras la IA prepara sus opciones, la zona DEBE mostrar que está trabajando, y PIX DEBE contar un dato útil (D28).
- **FR-021**: Un botón "Ficha" DEBE mostrar en cualquier momento lo que el jugador lleva decidido.
- **FR-022**: Tras aprobar todas las zonas, DEBE aparecer el jefe del mundo en la plaza central. Lo que pasa con el jefe pertenece a la feature 3.

**Fallos**

- **FR-023**: Caer al vacío o tocar un enemigo de lado o desde abajo DEBE contar como un fallo.
- **FR-024**: Tras un fallo, el personaje DEBE reaparecer en el último sitio donde estuvo de pie de forma segura, en menos de 2 segundos.
- **FR-025**: NO DEBEN existir vidas, pantalla de fin de juego ni reinicio obligatorio del mundo.
- **FR-026**: Un fallo NO DEBE modificar ninguna pieza aprobada ni obligar a repetir una zona aprobada.
- **FR-027**: NO DEBE existir límite de tiempo.

**Enemigos y objetos**

- **FR-028**: Los enemigos DEBEN moverse por recorridos fijos y visibles, para que el jugador pueda anticiparlos.
- **FR-029**: Tocar un enemigo de lado o desde abajo DEBE empujar al personaje hacia atrás y contar como un fallo: resta el porcentaje de chispas (FR-031b), cuenta para la oferta de ayuda y hace reaparecer al personaje en el último sitio seguro (D49).
- **FR-029a**: Caer sobre un enemigo desde arriba DEBE vencerlo: desaparece, el personaje rebota y no recibe daño (D49).
- **FR-029b**: Un enemigo vencido DEBE volver a aparecer en su recorrido un minuto después, sin aparecer encima del personaje. Un fallo del jugador no adelanta su regreso (D49).
- **FR-030**: Un contacto dudoso con un enemigo DEBE resolverse a favor del jugador.
- **FR-031**: Tocar una chispa DEBE recogerla y sumar uno al contador de chispas, visible durante el juego (D48).
- **FR-031a**: Cada cierto número de chispas, PIX DEBE desbloquear un consejo extra de creación de contenido. Un consejo desbloqueado NO DEBE perderse nunca y DEBE poder releerse.
- **FR-031b**: Cada fallo DEBE restar un porcentaje de las chispas que se llevan, redondeado hacia abajo, sin llegar nunca a quitar todas ni bajar de cero.
- **FR-031c**: Las chispas NO DEBEN servir todavía para comprar nada. Su uso como moneda del Creator Market está decidido para más adelante (D48).

**Modo de ayuda**

- **FR-032**: Tras tres fallos seguidos desde el mismo sitio seguro, el juego DEBE ofrecer: hacerlo más fácil, llevar al personaje al siguiente sitio seguro, o seguir intentando.
- **FR-033**: "Hacerlo más fácil" DEBE añadir plataformas y hacer más lentos a los enemigos en ese tramo.
- **FR-034**: La ayuda NUNCA DEBE saltar una zona de decisión.
- **FR-035**: El jugador DEBE poder activar o desactivar la ayuda desde el menú en cualquier momento.
- **FR-036**: Tras elegir "seguir intentando", la oferta NO DEBE repetirse hasta otros tres fallos.

**Pausa, carga y pantalla**

- **FR-037**: El jugador DEBE poder pausar y continuar.
- **FR-038**: El juego DEBE pausarse solo cuando su pantalla deja de estar visible.
- **FR-039**: El mundo DEBE poder jugarse antes de que terminen de cargar los modelos 3D, con formas simples que se reemplazan cuando llegan, y DEBE mostrar cuánto falta por cargar.
- **FR-040**: Todo texto que vea el jugador DEBE estar en español.

### Key Entities

- **Personaje**: el influencer del jugador, en silueta de luz (D45). Tiene posición en el espacio, dirección, si está en el suelo o en el aire, y su animación.
- **Cámara**: sigue al personaje desde atrás. Tiene un giro que el jugador controla.
- **Mundo**: un distrito de The Influence Foundry. Tiene una plaza central, zonas, caminos y un jefe.
- **Zona de decisión**: parte del mundo ligada a una pregunta de la fase. Tiene objetos con acción, un estado (cerrada, en curso, aprobada) y una pieza del influencer que produce.
- **Objeto con acción**: algo de la zona que el personaje puede usar (una máquina, una chispa, una persona, un piso, una meta). Tiene el nombre de la acción y una explicación de PIX.
- **Tarjeta de aprobación**: confirma una respuesta. Es la única forma de fijar una pieza.
- **Camino**: puente o pasarela entre zonas. Se abre al aprobar la zona anterior.
- **Sitio seguro**: el último lugar donde el personaje estuvo de pie a salvo. Ahí reaparece.
- **Enemigo**: obstáculo móvil con un recorrido fijo, como el dron de spam.
- **Chispa**: objeto para recoger. Suma al contador, desbloquea consejos de PIX y se pierde en parte al fallar.
- **Consejo de PIX**: consejo extra de creación de contenido que se desbloquea con chispas y no se pierde.
- **Estado del modo de ayuda**: si está activo, y cuántos fallos seguidos lleva el jugador desde el sitio seguro actual.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Una persona que nunca jugó un juego en 3D llega de la plaza a la primera zona en menos de 2 minutos, sin instrucciones externas.
- **SC-002**: Una persona que conoce los controles recorre cada camino entre dos zonas en 1 a 2 minutos.
- **SC-003**: El 100 % de las piezas aprobadas queda sin cambios tras cualquier número de fallos.
- **SC-004**: Tras un fallo, el jugador recupera el control en menos de 2 segundos.
- **SC-005**: Ninguna pieza del influencer queda fijada sin que el jugador pulse "Aprobar".
- **SC-006**: En un teléfono de gama media, el juego se mueve con fluidez, el personaje responde a los controles en menos de una décima de segundo y el mundo se puede jugar a los 10 segundos de abrirlo.
- **SC-007**: Con el modo de ayuda, ningún jugador queda bloqueado: siempre puede llegar a la siguiente zona.
- **SC-008**: La palanca, el botón de saltar y el botón de acción se usan con los pulgares, sin mover las manos, en teléfonos de 5 a 6,9 pulgadas en vertical.

## Assumptions

- La herramienta 3D sería three.js, la de las maquetas, cargada desde un servidor público de librerías. Enmienda la regla "sin dependencias" del plan técnico (D33) **[Decidido, D50]**.
- Se conservan del juego actual el dominio, la aplicación, los adaptadores, el guardado, la IA, el modo guía y las pantallas. Solo se rehace la presentación del mundo (motor, cámara, dibujo) **[Decidido, D50]**.
- El arte 3D se genera con IA (Magnific) y vive en `docs/arte/3d/`. Para el juego final los modelos se comprimen para que el mundo cargue rápido **[Decidido, D50]**.
- El juego se usa sobre todo con el teléfono en vertical.
- Las acciones concretas de cada zona del Mundo 1 se definen en la especificación del Mundo 1 (feature 5, carpeta `004`), que debe enmendarse para D47. Esta feature define cómo funcionan las zonas en general.
- Qué pasa dentro de la decisión (validación, reabrir, dependencias) pertenece a la feature 2; el jefe, a la feature 3; el guardado entre sesiones, a D39 y a la feature 8.
- Cuántas chispas desbloquean un consejo y qué porcentaje se pierde por fallo se fijan en el plan técnico. Valor de partida: un consejo cada 10 chispas y un 25 % por fallo.
- Hay sonido solo si no retrasa la entrega.
- Este motor es parte de la capa de presentación y no conoce las reglas del influencer (constitución).

## No-objetivos de esta feature

- NO hay vidas, puntuación por tiempo ni tabla de récords.
- NO hay tienda ni Creator Market todavía: se diseña a partir del Mundo 6 (D48).
- NO hay doble salto, salto en pared, nadar, volar ni agacharse.
- NO hay combate con armas ni ataques.
- NO hay mundo continuo sin cargas entre distritos: cada mundo es un espacio aparte.
- NO hay mando ni controles configurables.
- NO hay editor de niveles.
- NO hay multijugador.
- NO hay realidad virtual ni aumentada.

## Dependencias

- Reemplaza a: feature 1 (`specs/001-motor-plataformas`).
- Decisiones previas: D46 a D50.
- La usan: feature 2 (puertas de decisión e inventario, que pasan a ser zonas), feature 3 (jefe de mundo), features 5, 6 y 7 (mundos).
