# Tasks: Versión jugable mínima

**Input**: documentos de diseño en `specs/005-version-jugable-minima/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/puertos.md](contracts/puertos.md), [quickstart.md](quickstart.md)

**Tests**: obligatorias. El principio IV de la constitución exige pruebas automáticas de decisión e inventario, y se escriben antes que el código que prueban.

**Organización**: por historia de usuario de las specs 001 a 004, para poder construir y probar cada una por separado.

## Formato: `[ID] [P?] [Historia] (dueño) Descripción`

- **[P]**: se puede hacer en paralelo con otras tareas [P] de su fase (archivos distintos, sin dependencia entre ellas).
- **[Historia]**: spec e historia a la que sirve, por ejemplo `[002-US1]`.
- **(dueño)**: el subagente responsable: `pm`, `arquitecto`, `seguridad`, `frontend`, `backend` o `qa`. Nadie edita archivos fuera de su reparto ([plan.md](plan.md), "Reparto entre subagentes").
- Cada tarea nombra los archivos que toca.

---

## Fase 0: Prueba técnica dentro de Claude

**Propósito**: verificar los cinco supuestos sin probar de [research.md](research.md) antes de construir nada encima.

**⚠️ Bloqueante**: si alguna comprobación falla, se ajusta el plan antes de seguir. Publicar la página de prueba requiere la confirmación del dueño.

- [x] T001 (arquitecto) Crear una página mínima de prueba en `spike/index.html`, `spike/main.js` y `spike/extra.js`: dos módulos enlazados, un lienzo con un cuadro que se mueve con tres botones táctiles, y un botón que pide a la IA tres opciones de nicho en español al nivel rápido y muestra el tiempo que tardó.
- [x] T002 (arquitecto) Publicar `spike/` como página dentro de Claude con la capacidad de IA declarada, y compartirla por enlace. Requiere el sí del dueño.
- [x] T003 (qa) Probar la página en la app de Claude de un teléfono y registrar en `specs/005-version-jugable-minima/spike-resultados.md`: (1) si cargan los dos módulos, (2) fluidez y respuesta táctil, (3) tiempo y calidad de las tres opciones, (4) qué ocurre al negar el permiso de la IA.
- [x] T004 (qa) Repetir la prueba con una segunda cuenta de Claude, ajena al dueño, por el enlace público, y registrar si puede usar la IA. Necesita que el dueño consiga esa segunda cuenta o a una persona que ayude.
- [x] T004b (qa) Probar el modo guía de la página de prueba con la cuenta gratuita: que la respuesta de otra IA pase la validación y que la página no se recargue al volver. Resultado: la validación funciona en computadora y teléfono; en el teléfono la página se recarga al volver.
- [x] T005 (pm) Con los resultados, confirmar el plan o proponer los ajustes al dueño; actualizar `research.md` cambiando cada "sin probar" por su resultado, y `ESTADO.md`.

**Checkpoint**: supuestos verificados. El dueño decide si se sigue.

---

## Fase 1: Preparación

**Propósito**: estructura del proyecto.

- [x] T006 (arquitecto) Crear la estructura de carpetas de [plan.md](plan.md): `src/domain/`, `src/application/`, `src/adapters/ai/`, `src/adapters/storage/`, `src/presentation/engine/`, `src/presentation/screens/`, `src/presentation/art/`, `src/content/world-1/`, `tests/domain/`, `tests/application/`, `tests/adapters/`, `tests/engine/`.
- [x] T007 (arquitecto) Crear `package.json` con `"type": "module"` y el comando `test` que ejecuta `node --test`; sin dependencias.
- [x] T008 [P] (arquitecto) Crear `index.html` mínimo: lienzo, capa para pantallas y carga de `src/main.js`. Es un documento HTML completo para verlo en local; al publicarlo (T079) hay que comprobar cómo lo envuelve Claude, porque la página de prueba se publicó como fragmento sin `<!doctype>`.
- [x] T009 [P] (pm) Añadir a `README.md` cómo ejecutar las pruebas y el modo de demostración, y actualizar la sección "Qué hay en este repositorio".

---

## Fase 2: Cimientos

**Propósito**: contratos y reglas centrales de las que depende todo lo demás.

**⚠️ Bloqueante**: ninguna historia empieza antes de terminar esta fase.

### Contratos y arquitectura

- [x] T010 (arquitecto) Definir los puertos `AiPort` y `ProgressStore` con sus tipos en `src/application/ports.js`, según [contracts/puertos.md](contracts/puertos.md).
- [x] T011 [P] (arquitecto) Definir los eventos entre motor y aplicación en `src/application/events.js`, con un emisor simple.
- [x] T012 [P] (arquitecto) Escribir `tests/architecture.test.js`: recorre las importaciones de `src/` y falla si se incumplen las reglas de dependencia del plan.

### Dominio (pruebas primero)

- [x] T013 [P] (qa) Pruebas de `Piece` en `tests/domain/piece.test.js`: transiciones de estado, aprobar no crea versiones duplicadas, la versión reemplazada va al historial, el contenido no puede ser vacío ni exceder la longitud máxima.
- [x] T014 [P] (qa) Pruebas de `Inventory` en `tests/domain/inventory.test.js`: al cambiar una pieza, las que dependen de ella (directa o indirectamente) quedan por revisar y conservan su contenido; ninguna se borra; aprobar el mismo contenido no marca nada.
- [x] T015 [P] (qa) Pruebas de `Gate` y `World` en `tests/domain/gate.test.js` y `tests/domain/world.test.js`: una puerta resuelta no vuelve atrás; el jefe no es accesible con piezas pendientes o por revisar; el mundo solo se cierra con el resumen aprobado y una sola vez; cambiar una pieza de un mundo cerrado lo deja pendiente de revisión.
- [x] T016 (backend) Implementar `src/domain/piece.js` hasta que pase T013.
- [x] T017 (backend) Implementar `src/domain/inventory.js` hasta que pase T014.
- [x] T018 (backend) Implementar `src/domain/gate.js`, `src/domain/world.js` y `src/domain/observation.js` hasta que pase T015.

### Base de aplicación y adaptadores

- [x] T019 (backend) Implementar `src/application/game-session.js`: crea la partida con el inventario y los mundos a partir de un contenido dado, usa `ProgressStore`, e incluye `setInterests` (de 3 a 5 intereses más uno escrito; cambiarlos no toca ninguna pieza).
- [x] T020 [P] (backend) Implementar `src/adapters/storage/memory-progress-store.js`.
- [x] T021 [P] (backend) Implementar `src/adapters/ai/demo-ai-adapter.js` con respuestas preparadas para las cuatro operaciones de `AiPort` y un modo que simula IA no disponible, lenta y fallida, y otro que simula el modo guía (`mode: "guide"`).

### Base de presentación

- [x] T022 [P] (frontend) Crear `src/content/es.js` con la estructura de textos y los textos comunes (botones, avisos, errores con personaje).
- [x] T023 [P] (frontend) Crear `src/presentation/styles.css` con los colores y tipografías del concepto visual, el lienzo a pantalla completa en vertical y la capa de pantallas.
- [x] T024 (arquitecto) Escribir `src/main.js`: elige `ClaudeSampleAdapter` o `DemoAiAdapter` según el entorno, fija el modo de IA (`direct` si la página recibe la IA, `guide` si no, `demo` fuera de Claude), usa `BrowserProgressStore` con respaldo en `MemoryProgressStore`, y conecta sesión, eventos y presentación.

### Guardado en el navegador (005/FR-014 a FR-019, D39)

- [x] T090 [P] [005-US2] (qa) Pruebas en `tests/adapters/browser-progress-store.test.js`, con un almacenamiento simulado: guardar y cargar devuelve la misma partida; sin almacenamiento o con error al escribir, `save` devuelve `unavailable` y no lanza; datos ilegibles o de otra versión dan error en `load` y no se borran; `clear` borra solo la clave del juego.
- [ ] T091 [P] [005-US2] (qa) Pruebas en `tests/application/resume.test.js`: aprobar, cambiar intereses, aceptar una observación y cerrar un mundo guardan; `getGuidePrompt` guarda antes de devolver la pregunta, con el punto de retorno en esa puerta; continuar restaura la puerta con sus opciones mostradas y el recuadro de pegar; empezar de nuevo exige confirmación; un fallo al guardar no deshace una aprobación. *En curso: escritas y pasando las partes de la sesión; quedan como pendientes (`test.todo`) las de aprobar (T037), jefe (T060) y modo guía (T086).*
- [x] T092 (backend) Implementar `src/adapters/storage/browser-progress-store.js` hasta que pase T090. Cada lectura y escritura dentro de un manejo de errores.
- [x] T093 (backend) Añadir a `src/application/game-session.js` `loadSavedGame`, `continueSavedGame`, `startNewGame`, el punto de retorno y un `saveNow()` que usan los flujos. Las llamadas a `saveNow()` se añaden en cada flujo al construirlo (T037, T060, T086, T088). Las partes de T091 que dependen de esos flujos se cumplen cuando existan.

**Checkpoint**: `node --test` pasa con las pruebas de dominio y de arquitectura. *Cumplido (2026-11-17): 77 pruebas, 74 pasan y 3 quedan pendientes de los flujos (T091); ninguna falla.*

---

## Fase 3: Recorrer un tramo y llegar a la puerta — [001-US1] y [001-US5] (P1)

**Meta**: el personaje se mueve y salta con tres botones, recorre un tramo de prueba y llega a una puerta; el juego se pausa y continúa.

**Prueba independiente**: en un tramo de prueba sin enemigos, se llega del inicio a la puerta solo con los botones táctiles, y solo con el teclado.

- [x] T025 [P] [001-US1] (qa) Pruebas de física en `tests/engine/physics.test.js`: avance y parada, salto variable con mínimo y máximo, sin segundo salto en el aire, no atravesar plataformas con pasos de tiempo grandes.
- [x] T026 [001-US1] (frontend) Implementar `src/presentation/engine/loop.js`: bucle a paso fijo independiente del dibujo.
- [x] T027 [001-US1] (frontend) Implementar `src/presentation/engine/physics.js` hasta que pase T025.
- [x] T028 [P] [001-US1] (frontend) Implementar `src/presentation/engine/input.js`: tres botones táctiles y teclado; izquierda y derecha a la vez dejan quieto al personaje.
- [x] T029 [P] [001-US1] (frontend) Implementar `src/presentation/engine/camera.js`: la vista sigue al personaje.
- [x] T030 [001-US1] (frontend) Implementar `src/presentation/engine/level.js` y `src/presentation/engine/entities.js`: tramos, plataformas, puntos seguros y marcadores de puerta; al tocar una puerta sin resolver, el motor se detiene y emite `gateReached`; con `resumeLevel` continúa.
- [x] T031 [001-US1] (frontend) Implementar `src/presentation/engine/render.js` y el personaje provisional en `src/presentation/art/`: dibujo del tramo, plataformas como publicaciones, personaje, puerta y botones táctiles en la zona de los pulgares.
- [x] T032 [001-US5] (frontend) Pausa manual y pausa automática al perder visibilidad, con menú de pausa, en `src/presentation/engine/loop.js` y `src/presentation/screens/`.
- [ ] T033 [001-US1] (qa) Revisar en tamaño de teléfono y escritorio con capturas; medir el tiempo de un tramo de prueba (objetivo: 1 a 2 minutos). *En curso: revisadas en tamaño de teléfono las pantallas de inicio y de puerta, y el tramo dibujado. Falta jugar el tramo con movimiento real (el navegador de la sesión estaba oculto y no corre el bucle) y medir su tiempo: lo hace el dueño en su teléfono o en el navegador.*

**Checkpoint**: un tramo de prueba es jugable hasta la puerta.

---

## Fase 4: Decidir en una puerta — [002-US1], [002-US2] y [002-US3] (P1)

**Meta**: mini lección, tres tarjetas con una recomendada, elegir, editar, escribir la propia, pedir recomendación y aprobar de forma explícita.

**Prueba independiente**: con una puerta de prueba y la IA de demostración, la pieza aparece en el inventario solo tras la acción de aprobar.

### Pruebas primero

- [x] T034 [P] [002-US1] (qa) Pruebas del flujo de puerta en `tests/application/gate-flow.test.js`: seleccionar no aprueba; cerrar sin aprobar no guarda nada; aprobar guarda exactamente el texto aprobado y resuelve la puerta; aprobar dos veces guarda una sola pieza; las opciones nuevas excluyen las ya mostradas; se puede volver a opciones anteriores.
- [x] T035 [P] [002-US3] (qa) Añadir a `tests/application/gate-flow.test.js`: una recomendación no aprueba nada; con la IA no disponible, el jugador puede escribir y aprobar su respuesta; una respuesta vacía o demasiado larga se rechaza.
- [x] T036 [P] [002-US1] (qa) Pruebas de validación en `tests/adapters/validate.test.js`: se descartan respuestas con forma inválida, con opciones repetidas, sin exactamente una recomendada o fuera de las longitudes máximas.

### Implementación

- [x] T037 [002-US1] (backend) Implementar `src/application/gate-flow.js`: `openGate`, `completeLesson`, `requestOptions`, `askRecommendation`, `submitOwnAnswer`, `approvePiece` y `closeGate`, hasta que pasen T034 y T035. Las puertas con opciones fijas ya explicadas no llaman a la IA.
- [x] T038 [P] [002-US1] (backend) Implementar `src/adapters/ai/validate.js` hasta que pase T036.
- [x] T039 [P] [002-US1] (backend) Implementar `src/adapters/ai/prompts.js`: arma la instrucción de cada operación con las piezas aprobadas, el contexto del jugador y el formato de respuesta; el texto del jugador va delimitado como dato. En las puertas que lo definan, pide también los `extras` (en el nicho, `publicLabel`). Cada instrucción pide de forma explícita contenido apropiado y limitado a la decisión en curso.
- [x] T040 [002-US1] (backend) Implementar `src/adapters/ai/claude-sample-adapter.js`: nivel rápido para opciones, comentario y recomendación; traduce cada fallo a `{ ok: false, reason }`; nunca lanza excepciones; "pedir otras" no usa la memoria de respuestas. Depende de T038 y T039.
- [x] T041 [002-US1] (frontend) Implementar `src/presentation/screens/gate.js`: mini lección que se puede saltar, tres tarjetas con ventajas y riesgos y la recomendada marcada, selección sin aprobar, botón de aprobar, cerrar. En la puerta del nicho muestra la etiqueta pública de la opción elegida y permite editarla antes de aprobar.
- [x] T042 [002-US2] (frontend) Añadir a `src/presentation/screens/gate.js`: pedir otras opciones, volver a las anteriores, editar una tarjeta, escribir la propia respuesta y mostrar el comentario de la IA sin bloquear la aprobación.
- [x] T043 [002-US3] (frontend) Añadir a `src/presentation/screens/gate.js`: "no sé, recomiéndame", que destaca una opción con su motivo.
- [x] T044 [002-US1] (seguridad) Revisar T038, T039, T040, T085 y las pantallas de T041 a T043 y T087: texto de la IA, del jugador y el pegado en modo guía siempre como texto plano, entrada del jugador delimitada, longitudes máximas.

### Modo guía (005/FR-006 a FR-013)

- [x] T083 [P] [005-US2] (qa) Pruebas en `tests/adapters/guide.test.js`: la pregunta de opciones incluye instrucción, piezas necesarias y formato; la lectura acepta el bloque con texto alrededor, entre marcas de código y con comillas tipográficas; rechaza con `badAnswer` lo que no cumple; una respuesta válida da exactamente el mismo resultado que la operación directa con el mismo contenido.
- [x] T084 [P] [005-US2] (qa) Pruebas en `tests/application/guide-flow.test.js`: `unavailable` pasa la sesión a modo guía una sola vez; `busy` y `failed` no cambian de modo; una respuesta pegada válida muestra opciones y no aprueba nada; una inválida conserva el texto pegado; en modo guía, "recomiéndame" usa la opción ya recomendada sin llamar a la IA y la respuesta propia no pide comentario; escribir la propia respuesta y salir siguen disponibles.
- [x] T085 [005-US2] (backend) Implementar `src/adapters/ai/guide.js` (`guidePrompt` y `readGuideAnswer` para `options`), usando `prompts.js` y `validate.js`, y conectarlo en los dos adaptadores, hasta que pase T083. Depende de T038 y T039.
- [x] T086 [005-US2] (backend) Implementar `src/application/guide-flow.js` (`aiMode`, `getGuidePrompt`, `submitGuideAnswer`) y el cambio de modo en `gate-flow.js`, hasta que pase T084.
- [x] T087 [005-US2] (frontend) Implementar `src/presentation/screens/guide.js`: aviso de una vez de por qué se usa el modo guía; pasos; aviso de que la pregunta incluye las decisiones del jugador; "Copiar pregunta" con respaldo de mostrarla seleccionada; recuadro para pegar; "Revisar respuesta"; mensaje con personaje ante `badAnswer`. Las opciones válidas se muestran con las tarjetas de T041.

**Checkpoint**: un tramo con una puerta de prueba se juega de principio a fin en modo de demostración, con IA directa simulada y con modo guía. *Comprobado (2026-11-17) en tamaño de teléfono con el mundo de prueba (`src/content/test-world.js`): lección, tarjetas, edición, recomendación, aprobar y guardar; modo guía con cuenta simulada sin IA, copia con respaldo, recarga y vuelta al recuadro de pegar, respuesta inválida y válida con comillas tipográficas. T044 lo revisó el agente principal: todo texto se muestra con `textContent`, los datos van delimitados y las longitudes se validan.*

---

## Fase 5: Fallar sin perder lo importante, enemigos y ayuda — [001-US2], [001-US3] y [001-US4]

**Meta**: sin vidas ni fin de juego; reaparecer en el punto seguro; enemigos que se vencen cayéndoles encima; corazones; modo de ayuda tras tres fallos.

**Prueba independiente**: tras cualquier número de fallos, el inventario es idéntico.

- [ ] T045 [P] [001-US2] (qa) Pruebas en `tests/engine/failure.test.js`: reaparecer en el último punto seguro; perder una cuarta parte de los corazones sin bajar de cero; una puerta ya resuelta no se repite; los enemigos vencidos siguen vencidos.
- [ ] T046 [P] [001-US4] (qa) Pruebas en `tests/engine/assist.test.js`: la oferta aparece al tercer fallo desde el mismo punto seguro; "seguir intentando" la retrasa otros tres fallos; "saltar el tramo" lleva al siguiente punto seguro o ante la puerta y nunca salta una puerta.
- [ ] T047 [P] [001-US2] (qa) Prueba en `tests/application/failure-isolation.test.js`: ninguno de los eventos del motor cambia el inventario.
- [ ] T048 [001-US2] (frontend) Fallos y reaparición en `src/presentation/engine/level.js`, hasta que pase T045.
- [ ] T049 [001-US3] (frontend) Enemigos y corazones en `src/presentation/engine/entities.js`: caer encima vence y rebota; tocar de lado es un fallo; el contacto dudoso se resuelve a favor del jugador; contador de corazones visible.
- [ ] T050 [001-US4] (frontend) Modo de ayuda en `src/presentation/engine/assist.js` y su pantalla de oferta en `src/presentation/screens/`, hasta que pase T046; activable también desde el menú.
- [ ] T051 [P] [001-US3] (frontend) Arte provisional de enemigos (troll y notificación) y corazones en `src/presentation/art/`. *Tras D41, los enemigos y objetos deben encajar en The Influence Foundry; sigue siendo arte provisional.*

**Checkpoint**: el tramo de prueba tiene reto, y fallar no cambia nada de lo aprobado.

---

## Fase 6: Inventario, reabrir, espera y errores — [002-US4], [002-US5] y [002-US6]

**Meta**: ver el inventario, reabrir una pieza con sus dependientes marcadas por revisar, y esperas y errores explicados por un personaje.

- [ ] T052 [P] [002-US5] (qa) Pruebas en `tests/application/inventory-flow.test.js`: reabrir avisa de las piezas dependientes; reabrir sin aprobar no cambia nada; aprobar una versión nueva deja las dependientes por revisar; confirmar una pieza por revisar la devuelve a aprobada.
- [ ] T053 [P] [002-US6] (qa) Pruebas en `tests/application/ai-failure.test.js`: con IA lenta, fallida y no disponible, las piezas aprobadas y el texto escrito se conservan, y siempre queda una forma de continuar.
- [ ] T054 [002-US4] (backend) Implementar `src/application/inventory-flow.js`: `viewInventory` y `reopenPiece`, hasta que pase T052.
- [ ] T055 [002-US4] (frontend) Implementar `src/presentation/screens/inventory.js`: piezas con su estado (pendiente, aprobada, por revisar), abrible desde el mapa y desde un nivel, con vuelta al mismo punto.
- [ ] T056 [002-US5] (frontend) Añadir a `src/presentation/screens/inventory.js` el aviso de dependientes antes de reabrir y la confirmación de piezas por revisar.
- [ ] T057 [P] [002-US6] (frontend) Implementar `src/presentation/screens/waiting.js`: personaje con un dato útil de la puerta mientras responde la IA.
- [ ] T058 [P] [002-US6] (frontend) Implementar `src/presentation/screens/error.js`: personaje que explica el fallo según su motivo y ofrece reintentar, escribir la propia respuesta o salir.

**Checkpoint**: el flujo de decisión está completo y resiste los fallos de la IA.

---

## Fase 7: Jefe de mundo — [003-US1] a [003-US4]

**Meta**: pelea corta, revisión con los criterios de la fase, observaciones que el jugador revisa o acepta, y cierre del mundo con el resumen aprobado.

- [ ] T059 [P] [003-US2] (qa) Pruebas en `tests/application/boss-flow.test.js`: el jefe se niega con una pieza faltante o por revisar; aceptar las observaciones permite cerrar; el mundo se cierra solo con el resumen aprobado y una vez; la revisión no cambia el inventario; se descartan observaciones sobre piezas inexistentes; con IA no disponible se cierra marcando "no revisado". También: si se cambia una pieza tras una observación, la revisión se repite sin repetir la pelea; salir del resumen y volver no repite pelea ni revisión; el resumen contiene exactamente las piezas vigentes, también tras cambiar una pieza de un mundo cerrado; al cerrar se emite `worldClosed`.
- [ ] T060 [003-US1] (backend) Implementar `src/application/boss-flow.js`: `requestBoss`, `runReview`, `acceptObservation`, `confirmDeducedData` y `approveSummary`, hasta que pase T059. Emite `worldClosed` al aprobarse el resumen.
- [ ] T061 [P] [003-US1] (backend) Añadir `reviewWorld` a `src/adapters/ai/claude-sample-adapter.js`, `prompts.js` y `validate.js`, al nivel normal de la IA.
- [ ] T062 [003-US4] (frontend) Implementar `src/presentation/engine/boss-fight.js`: pelea con los tres controles, tres golpes para vencer, reaparecer sin perder el daño hecho, modo de ayuda con opción de saltar la pelea, y sin repetirla una vez vencida. Con `denyBoss`, el motor lleva al jugador a la puerta de la pieza que falta o le indica abrir el inventario si hay piezas por revisar.
- [ ] T063 [003-US1] (frontend) Implementar `src/presentation/screens/boss-review.js`: puntos sólidos y observaciones con su explicación; por cada observación, revisar la pieza o aceptarla; confirmación de los datos deducidos.
- [ ] T064 [003-US3] (frontend) Implementar `src/presentation/screens/summary.js`: resumen con las piezas exactas, observaciones aceptadas, aprobación explícita y tarjeta de resumen que se puede volver a ver.
- [ ] T088 [005-US2] (backend) Añadir `review` a `src/adapters/ai/guide.js` y `getGuideReviewPrompt` y `submitGuideReview` a `guide-flow.js`, con pruebas en `tests/adapters/guide.test.js` y `tests/application/boss-flow.test.js`: la revisión pegada se valida igual que la directa, descarta observaciones sobre piezas inexistentes y, si no se logra, se puede cerrar como "no revisado".
- [ ] T089 [005-US2] (frontend) Usar `src/presentation/screens/guide.js` desde `boss-review.js` cuando la sesión está en modo guía.

**Checkpoint**: un mundo de prueba se cierra de principio a fin.

---

## Fase 8: Mundo 1, Nicho — [004-US1] a [004-US5]

**Meta**: el contenido real del primer mundo, tomado de la fase F01 de la factoría.

- [ ] T065 [P] [004-US2] (frontend) Definir piezas y dependencias en `src/content/world-1/pieces.js`, según [data-model.md](data-model.md).
- [ ] T066 [P] [004-US1] (frontend) Definir la lista fija de intereses (de 20 a 30 temas) en `src/content/world-1/interests.js`.
- [ ] T067 [004-US2] (frontend) Escribir en `src/content/world-1/gates.js` las cinco puertas: mini lección con ejemplo, datos útiles de espera, instrucción para la IA y opciones fijas donde aplique (rutas de ingreso de la factoría, opciones de tiempo semanal). Las opciones de tiempo semanal llevan su explicación ya escrita; la puerta del nicho declara el extra `publicLabel`.
- [ ] T068 [P] [004-US4] (frontend) Escribir en `src/content/world-1/boss.js` los seis criterios del Generalista y los datos a deducir (mercados y plataformas).
- [ ] T069 [004-US2] (pm) Revisar T067 y T068 contra `factoria-aiif/.../01_F01_FUNDAMENTOS_ESTRATEGICOS/`: cada lección y cada criterio sale de la factoría, sin jerga sin explicar y sin afirmar datos de mercado no comprobados.
- [ ] T070 [P] [004-US2] (qa) Prueba en `tests/domain/world-1-dependencies.test.js`: con el contenido real, cambiar cada pieza deja por revisar exactamente las que dependen de ella.
- [ ] T071 [004-US1] (frontend) Implementar `src/presentation/screens/interests.js`: elegir de 3 a 5 intereses, añadir uno escrito y cambiarlos después. Usa `setInterests` de T019.
- [ ] T072 [004-US5] (frontend) Diseñar en `src/content/world-1/level.js` los seis tramos y la arena del jefe: el primero enseña a moverse, saltar y recoger sin enemigos peligrosos; cada tramo añade como máximo un elemento nuevo.
- [ ] T073 [004-US5] (frontend) Arte del mundo en `src/presentation/art/`: mosaico de publicaciones de la pestaña Explorar y el Generalista, sin parecerse a ninguna red social concreta. *Replanteada por D41 y D44: arte de PIX Central apagado y encendido, de PIX y del Generalista como holograma inestable, con la dirección de arte de `docs-entrada/03-influence-foundry.md`. Bloqueada hasta decidir cómo se produce el arte.*
- [ ] T095 [004-US5] (frontend) Sectores que se encienden (004/FR-041): cada puerta resuelta enciende un sector visible de PIX Central, y al cerrar el mundo se enciende la primera cápsula del influencer. Lo dispara `setGateResolved` y `worldClosed`; no toca el inventario. Prueba en `tests/engine/` de que el estado visual sigue a las puertas resueltas. *En curso (2026-11-17): los sectores ya se encienden con las puertas resueltas, con su prueba en `tests/engine/level.test.js`; falta la cápsula al cerrar el mundo, que llega con el jefe (fase 7).*
- [ ] T074 [004-US1] (frontend) Indicaciones de aprendizaje dentro del primer tramo y explicación de cómo funciona una puerta la primera vez, dichas por PIX (004/FR-042); no se repiten al volver.
- [ ] T075 [005-US1] (frontend) Implementar `src/presentation/screens/map.js`: mapa mínimo de un mundo y aviso de modo de demostración cuando corresponda. Muestra el Mundo 1 como completado al recibir `worldClosed`.
- [x] T094 [005-US2] (frontend) Implementar `src/presentation/screens/start.js`: aviso de que la partida se guarda solo en este navegador (005/FR-004), continuar o empezar de nuevo con confirmación dentro de la página, aviso de una vez si no se puede guardar o leer; y, al continuar, reabrir el punto de retorno con el personaje en el punto seguro anterior a la puerta o ante el jefe.

**Checkpoint**: el Mundo 1 se juega completo en modo de demostración.

---

## Fase 9: Integración, revisión y publicación

- [ ] T076 (arquitecto) Integrar todo en `src/main.js` y recorrer el Mundo 1 de principio a fin; confirmar que `tests/architecture.test.js` pasa.
- [ ] T077 [P] (qa) Ejecutar `node --test` completo y recorrer la sección 2 de [quickstart.md](quickstart.md); reportar el resultado real con capturas en teléfono y escritorio. Medir cada uno de los seis tramos del Mundo 1 y la pelea (objetivo: 1 a 2 minutos cada uno).
- [ ] T078 [P] (seguridad) Revisión completa antes de publicar: manejo del texto no confiable, privacidad, ausencia de credenciales y de datos personales en el repositorio, que la partida guardada no sale del navegador ni se trata como código al cargarla, y que el juego no afirma hechos no comprobados.
- [ ] T079 (arquitecto) Publicar el juego dentro de Claude y compartirlo por enlace. Requiere el sí del dueño.
- [ ] T080 (qa) Recorrer la sección 3 de [quickstart.md](quickstart.md) dentro de Claude, en un teléfono y con una segunda cuenta: con permiso de IA, negándolo y con una cuenta gratuita en modo guía, usando al menos dos IA gratuitas distintas (005/SC-005). Comprobar que, al volver de la otra IA, el juego retoma la misma puerta sin perder piezas (005/SC-006). Medir tiempos de respuesta y fluidez.
- [ ] T081 (pm) Organizar con el dueño la prueba con una persona real de la sección 4 de [quickstart.md](quickstart.md) y registrar los resultados.
- [ ] T082 (pm) Actualizar `ESTADO.md`, `README.md` y la especificación con el resultado de la entrega y lo aprendido. Retirar la carpeta `spike/` del repositorio.

---

## Dependencias y orden

- **Fase 0** va primero y sola. Bloquea todo.
- **Fase 1** y después **Fase 2**. La Fase 2 bloquea todas las historias.
- **Fases 3 y 4** pueden avanzar a la vez: la 3 es casi toda de frontend (motor) y la 4 reparte backend (flujo e IA) y frontend (pantallas). El frontend hace primero la 3 y después las pantallas de la 4.
- **Fase 5** depende de la 3. **Fase 6** depende de la 4. Pueden ir en paralelo entre sí.
- **Fase 7** depende de las fases 5 y 6.
- **Fase 8**: T065 a T070 solo dependen de la Fase 2 y pueden adelantarse; el resto depende de la Fase 7.
- **Fase 9** al final.

### Dentro de cada fase

- Las pruebas se escriben antes y deben fallar antes de implementar.
- Dominio antes que aplicación; aplicación antes que pantallas.
- Una fase no se da por terminada sin la revisión de QA.

## Ejemplo de trabajo en paralelo

Tras la Fase 2, en un mismo turno:

```text
backend:   T037 flujo de puerta  →  T038, T039  →  T040 adaptador de Claude
frontend:  T026 a T031 motor     →  T041 a T043 pantallas de la puerta
qa:        T025, T034, T035, T036 pruebas     →  T033 revisión en teléfono
```

Ningún par de tareas de esa lista toca el mismo archivo.

## Estrategia

1. **Fase 0**: comprobar el terreno. Decisión del dueño.
2. **Fases 1 a 4**: primer momento jugable, un tramo con una puerta en modo de demostración. Conviene enseñárselo al dueño aquí.
3. **Fases 5 a 7**: el juego completo con contenido de prueba.
4. **Fase 8**: el contenido real del Mundo 1.
5. **Fase 9**: revisión, publicación y prueba con una persona.

## Notas

- Total: 96 tareas (82 originales, T004b, T083 a T089 del modo guía por D37 y D38, T090 a T094 del guardado en el navegador por D39, y T095 de los sectores que se encienden por D44). Los números nuevos van al final para no renumerar; cada tarea está en la fase donde se hace.
- Publicar (T002 y T079) y todo commit o subida requieren el sí explícito del dueño.
- Lo que una tarea descubra que no está en la especificación se reporta al PM; no se construye.
- Los criterios que piden personas o teléfonos reales no se pueden marcar como cumplidos con pruebas automáticas.
