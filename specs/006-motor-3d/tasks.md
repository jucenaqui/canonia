# Tasks: Base del juego 3D (motor 3D y zonas de decisión)

**Input**: documentos de diseño en `specs/006-motor-3d/`

**Prerequisites**: [plan.md](plan.md) (aprobado en D54), [spec.md](spec.md), diseño de la zona en `docs/diseno/mundo-1-zonas.md`, maqueta validada en `docs/arte/3d/maquetas/mundo1-zonas.html`.

**Estado**: aprobada por el dueño (D55, 2026-11-25).

**Tests**: obligatorias (principio IV). Se escriben antes que el código que prueban.

**Organización**: por historia de usuario de la spec 006, para construir y probar cada una por separado.

## Formato: `[ID] [P?] [Historia] (dueño) Descripción`

- **[P]**: se puede hacer en paralelo con otras tareas [P] de su fase (archivos distintos, sin dependencia entre ellas).
- **[Historia]**: historia de la spec 006, por ejemplo `[US2]`.
- **(dueño)**: el subagente responsable (`pm`, `arquitecto`, `seguridad`, `frontend`, `backend`, `qa`). Nadie edita archivos fuera de su reparto ([plan.md](plan.md)).
- Cada tarea nombra los archivos que toca.

---

## Fase 1: Preparación

**Propósito**: dejar listos los modelos, la rama y la carga de three.js.

- [x] T001 (frontend) Comprimir los modelos 3D de esta entrega: texturas a 1024 px en JPEG y menos polígonos en los que no tienen esqueleto. Resultado en `assets/models/` (de 19 MB a 7,8 MB), con el script `scripts/shrink-glb.py`. Comprobado en la maqueta que se ven y se animan igual. Hecho el 2026-11-25 con el sí del dueño (D54).
- [x] T002 [P] (frontend) Escribir `scripts/pack-models.js`: convierte cada `.glb` de `assets/models/` en un `.js` para la página publicada, que no sirve archivos `.glb`. Salida en `assets/models/packed/` (fuera de git), 8,9 MB en 13 archivos; pruebas en `tests/scripts/pack-models.test.js`.
- [x] T003 [P] (arquitecto) Cargar three.js 0.160.0 desde `cdn.jsdelivr.net` en `index.html` con un mapa de módulos de versión fija, y comprobar que carga en la página publicada dentro de Claude. Punto único de entrada: `src/presentation/world3d/three.js`. Comprobado en local (revisión 160, el juego actual sigue igual) y dentro de Claude con las maquetas publicadas, que usan la misma versión y el mismo servidor. La prueba de arquitectura ya permite three.js solo en `presentation/world3d/` (adelanta parte de T007).
- [x] T004 [P] (frontend) Quitar al protagonista animado la malla repetida de los archivos de quieto y saltar, para que solo viajen sus animaciones, en `scripts/pack-models.js`. Quieto pasa de 710 a 117 KB y saltar de 682 a 89 KB; comprobado que las 72 pistas se aplican al modelo que corre.

**Checkpoint**: modelos listos para publicar y three.js cargando dentro de Claude.

---

## Fase 2: Cimientos

**Propósito**: contratos y lo que todas las historias necesitan. **⚠️ Bloqueante.**

- [x] T005 (arquitecto) Añadir a `specs/006-motor-3d/contracts/eventos-3d.md` los eventos y comandos del plan (`zoneEntered`, `optionInspected`, `minigameFinished`, `recommendationAsked`, `chosenForApproval`, `sparkCollected`, `playerFailed`, `openBridge`, `lightZone`, `markRecommended`, `setChosen`, `showBoss`, `say`). Hecho.
- [x] T006 (arquitecto) Llevar esos eventos a `src/application/events.js`, conservando los de pausa. Hecho, con pruebas en `tests/application/events-3d.test.js`; conviven con los eventos 2D hasta T042.
- [x] T007 (arquitecto) Ampliar `tests/architecture.test.js`: three.js solo se importa desde `src/presentation/world3d/`, y `src/presentation/world3d/minigames/` no importa nada de `src/application/` ni de `src/domain/`. Hecha junto con T003.
- [x] T008 [P] (qa) Pruebas en `tests/domain/gate.test.js` del origen `catalog`: una opción de la lista de la factoría se aprueba igual que una de la IA y queda con su origen. Hecho, en `tests/domain/catalog.test.js`.
- [x] T009 [P] (backend) Añadir el origen `catalog` en `src/domain/gate.js`. Hecho; también en el origen de las piezas (`src/domain/piece.js`).
- [x] T010 [P] (qa) Pruebas en `tests/application/session-3d.test.js`: la sesión guarda y recupera chispas, consejos desbloqueados, pruebas hechas, confianza y piezas por revisar tras una recarga. Hecho.
- [x] T011 (backend) Ampliar `src/application/game-session.js` y `src/adapters/storage/browser-progress-store.js` para guardar esos datos. Hecho: `world3d` en la partida guardada; las partidas anteriores se abren con valores de partida. El guardado del navegador no necesitó cambios.
- [x] T012 [P] (frontend) Crear `src/presentation/world3d/` con `scene.js` (escena, luces, cámara detrás, tamaño de pantalla) y `assets.js` (carga por prioridad y formas simples mientras llegan). Hecho, con `camera-math.js` (probado en `tests/engine/camera-math.test.js`). Comprobado en el navegador: los modelos cargan, uno que falta no rompe nada, y los modelos con esqueleto se copian sin deformarse.

**Checkpoint**: contratos acordados; frontend y backend pueden trabajar a la vez.

---

## Fase 3: Moverse por el mundo 3D — [US1] (P1)

**Objetivo**: caminar, saltar, girar la cámara y llegar a la primera zona en la plaza de PIX Central.

**Prueba independiente**: con la plaza y un puente, una persona va de la plaza a la zona 1 solo con controles táctiles, y solo con teclado.

- [x] T013 [P] [US1] (qa) Pruebas de `tests/engine/physics3d.test.js`: avance en todas direcciones relativo a la cámara, salto variable, sin segundo salto en el aire, margen al borde, salto recordado, subir escalones bajos, no atravesar cajas con pasos de tiempo grandes. Hecho.
- [x] T014 [US1] (frontend) Crear `src/presentation/world3d/physics3d.js` llevando el paso fijo, el margen al borde y el salto recordado del motor 2D. Hecho.
- [x] T015 [P] [US1] (frontend) Crear `src/presentation/world3d/controls.js`: palanca táctil, saltar, botón de acción, girar la cámara deslizando el dedo y teclado (flechas o WASD, espacio, E, Q y R). Hecho, con estilos en `src/presentation/styles.css`.
- [x] T016 [P] [US1] (frontend) Crear `src/presentation/world3d/hero.js`: protagonista con animaciones de quieto, correr y saltar, y PIX que lo sigue volando. Hecho.
- [x] T017 [US1] (frontend) Crear `src/content/world-1/layout.js` con la plaza, las cinco zonas y los puentes, y dibujar las plataformas con el modelo de plataforma. Hecho, con pruebas en `tests/engine/layout.test.js`. El mundo jugable vive en `src/presentation/world3d/world.js`; hasta T042 se prueba en la vista previa `mundo3d.html`.
- [x] T018 [US1] (frontend) Cámara que se acerca cuando algo la tapa, en `scene.js` (006/FR-006). Hecho: la cámara se acerca si una plataforma la tapa.
- [ ] T019 [US1] (qa) Revisión en tamaño teléfono: controles al alcance de los pulgares, cámara sin marear, animaciones correctas (006/SC-008). Revisado en tamaño teléfono con el navegador de pruebas (caminar, saltar, girar, cruzar puentes, animaciones). Falta la prueba del dueño en su teléfono con la vista previa publicada en privado: https://claude.ai/artifact/H9zc9esXawrZDS2Zsn9fEt

**Checkpoint**: se puede pasear por PIX Central.

---

## Fase 3b: Ambientación de PIX Central (D56)

**Objetivo**: que PIX Central se parezca a la imagen de referencia del dueño (`docs-entrada/influence-foundry/mundo-y-escenas.webp`) antes de construir las zonas dentro.

- [x] T048 (frontend) Prueba rápida: fondo panorámico de la isla (montañas, cascadas, vegetación), reactor holográfico y sala circular con cúpula, generados con IA usando la imagen del dueño como referencia de estilo. Mostrarla al dueño. Hecho: paisaje de fondo `assets/backgrounds/pix-central-isla.jpg`, modelos `reactor` y `jardinera`, y la sala circular dibujada en `src/presentation/world3d/decor.js` (suelo con anillos de luz, columnas, balcón, cúpula, pantallas holográficas, cápsulas y jardineras). La distribución ya usa la sala circular (adelanta T049). Vista previa: https://claude.ai/artifact/H9zc9esXawrZDS2Zsn9fEt
- [ ] T049 (frontend, revisa pm) Rehacer `src/content/world-1/layout.js`: la plaza es la sala circular con el reactor en el centro; las cinco zonas quedan alrededor, unidas por pasarelas con barandas de vidrio. Actualizar `tests/engine/layout.test.js`.
- [x] T050 (frontend) Generar, comprimir y empaquetar las demás piezas de escenario: cápsulas con influencers, barandas de vidrio, jardineras con palmeras, pantallas holográficas, portales a los distritos, arcos y gente de fondo. Hecho: modelos `portal`, `visitante-a` y `visitante-b` comprimidos y empaquetados; las barandas de vidrio y las pantallas holográficas se dibujan con three.js (`rails.js`, `decor.js`).
- [x] T051 (frontend) Colocar el escenario en `src/presentation/world3d/` (nuevo `decor.js`), con carga por prioridad y sin tapar el camino ni la cámara. Hecho: 2 portales en el borde de la sala (con hueco brillante animado y fragmento suelto quitado con `dropStrayParts`), barandas de vidrio en la sala (con choque), puentes y zonas (solo dibujo), 5 pantallas más sobre las zonas y 5 visitantes con vaivén; todo con choque donde corresponde, `addFadeable`, datos en `layout.js` y carga al final (`loadExtras`). Pruebas nuevas en `tests/engine/layout.test.js`. Falta la revisión de T052. D58 (2026-11-26): las barandas pasan a cristales limpios y continuos de 1,1 m (sin postes ni pasamanos, canto con brillo suave y franja cyan), sólidos y con cajas de 3 m en la sala, los puentes y las zonas, sin ser obstáculo de cámara; las zonas pasan a 20 x 18 m y los puentes a 3,2 m de ancho y de 5 a 7 m de largo; el puente de vuelta (0,3 m) se sube desde la sala y se baja desde la última zona. Pruebas: tamaños, ancho útil de puentes y recorrido que prueba que no se llega al vacío. D59 (2026-11-26): el cristal baja a 0,9 m y sus cajas de choque tienen la misma altura, así que se puede saltar por encima y caer.
- [ ] T052 (qa) Revisión en tamaño teléfono: fluidez con el escenario completo, peso total y que se parezca a la referencia. Prueba del dueño.

**Checkpoint**: PIX Central reconocible como el de la imagen de referencia.

---

## Fase 4: Decidir jugando en una zona — [US2] (P1), con la zona de fuente de ingreso

**Objetivo**: la zona genérica y la primera zona real: fichas, minijuegos, recomendación, "Otra", aprobar y cambiar.

**Prueba independiente**: en la zona de fuente de ingreso se abre una ficha, se prueba un minijuego, se pide recomendación, se aprueba, se abre el puente, y después se cambia la elección y lo dependiente queda "por revisar".

- [x] T020 [P] [US2] (qa) Pruebas en `tests/application/zone-flow.test.js`: ningún evento de minijuego aprueba; aprobar solo desde `approveZoneChoice`; cambiar reabre y aprueba, y deja "por revisar" nicho, audiencia y objetivo; "Otra" exige texto válido; recomendar usa los criterios del contenido sin pesos ocultos.
- [x] T021 [US2] (backend) Crear `src/application/zone-flow.js` a partir de `gate-flow.js`: `enterZone`, `inspectOption`, `recordMinigame`, `recommendOption`, `approveZoneChoice`, `changeZoneChoice`, `explainOtherOption`.
- [x] T022 [US2] (backend) Ampliar `src/adapters/ai/prompts.js` y `validate.js` para dos tareas nuevas: redactar el porqué de la recomendación y armar la ficha de "Otra" (con modo guía).
- [x] T023 [P] [US2] (frontend) Crear `src/presentation/world3d/zone-runtime.js`: objetos con acción, botón de acción con el nombre de lo que hace, PIX explicando, columna de luz en la zona en curso, puentes que se abren y sectores que se encienden.
- [x] T024 [P] [US2] (frontend) Crear `src/presentation/screens/zone.js` a partir de `gate.js`: ficha (con dos ejemplos), tarjeta de aprobar con tabla de criterios, "Otra", "Cambiar a esta" y "Es tu elección actual".
- [x] T025 [US2] (frontend, revisa pm) Crear `src/content/world-1/zone-income.js`: las 5 opciones de F01, sus fichas, los criterios y la pregunta jugada de "Recomiéndame", tal como en `docs/diseno/mundo-1-zonas.md`.
- [x] T026 [P] [US2] (qa) Pruebas de los minijuegos como máquinas de estados en `tests/engine/minigames.test.js`: cada uno termina, cada decisión tiene su consecuencia y ninguno aprueba.
- [x] T027 [US2] (frontend) Minijuego UGC en `src/presentation/world3d/minigames/ugc.js`: dos pedidos de marca de alrededor de un minuto cada uno (D54).
- [x] T028 [P] [US2] (frontend) Minijuego afiliados en `minigames/affiliate.js`: dos seguidores, etiqueta de afiliado y barra de confianza.
- [x] T029 [P] [US2] (frontend) Minijuego productos digitales en `minigames/digital-product.js`: dos lanzamientos (el segundo con la actualización por comentarios).
- [x] T030 [P] [US2] (frontend) Minijuego suscripciones en `minigames/subscriptions.js`: dos meses de club de unas cuatro semanas cada uno.
- [x] T031 [P] [US2] (frontend) Minijuego patrocinios en `minigames/sponsorship.js`: dos propuestas, media kit y marcar como publicidad.
- [x] T032 [US2] (frontend) Crear `src/presentation/world3d/hud.js`: progreso de zonas, chispas, barra de confianza y botón Ficha con "por revisar".
- [ ] T033 [US2] (qa) Revisión en tamaño teléfono de la zona completa y medición: cada minijuego dura alrededor de un minuto por ejemplo (D54).

**Checkpoint**: la zona de fuente de ingreso funciona de principio a fin con la IA de demostración.

---

## Fase 5: Fallar sin perder lo importante, enemigos y chispas — [US3] y [US4]

- [x] T034 [P] [US3] (qa) Pruebas: caer devuelve al último sitio seguro en menos de 2 s, nunca toca piezas ni zonas aprobadas.
- [x] T035 [US3] (frontend) Sitio seguro y reaparición en `physics3d.js`, con la frase amable de PIX.
- [x] T036 [P] [US4] (frontend) Crear `src/presentation/world3d/enemies.js`: dron de spam con recorrido fijo; tocarlo de lado empuja y cuenta como fallo; caerle encima lo vence y reaparece al minuto (D49).
- [x] T037 [P] [US4] (backend) Chispas y consejos en la sesión: contar, desbloquear un consejo cada 10 chispas y perder un 25 % por fallo sin perder consejos (D48), con pruebas en `tests/application/sparks.test.js`.
- [x] T038 [P] [US4] (frontend) Crear `src/content/world-1/tips.js` con los consejos de PIX y repartir chispas por el mundo.

---

## Fase 6: Modo de ayuda y pausa — [US5] y [US6]

- [x] T039 [P] [US5] (qa) Pruebas: tres fallos seguidos desde el mismo sitio ofrecen ayuda; ninguna opción salta una zona.
- [x] T040 [US5] (frontend) Oferta de ayuda (hacer más fácil, llevar al siguiente sitio seguro, seguir intentando) y su interruptor en el menú.
- [x] T041 [US6] (frontend) Pausa manual y automática al perder visibilidad; al recargar, volver a la plaza o a la entrada de la zona en curso.

---

## Fase 7: Integración, revisión y publicación

- [ ] T042 (arquitecto) Conectar todo en `src/main.js` y retirar `src/presentation/engine/`, `src/presentation/art/` y `src/content/test-world.js`.
- [ ] T043 (qa) Correr todas las pruebas (las 142 anteriores más las nuevas) y la de arquitectura.
- [ ] T044 (seguridad) Revisar la carga de three.js y los textos de la IA en fichas y recomendaciones.
- [ ] T045 (qa) Prueba en un teléfono real: carga en menos de 10 segundos jugable, fluidez y una persona de fuera recorre la zona de fuente de ingreso.
- [ ] T046 (pm) Actualizar `ESTADO.md`, la especificación y `README.md`.
- [ ] T047 (arquitecto) Publicar dentro de Claude. Requiere el sí del dueño.

---

## Dependencias y orden

- Fase 1 → Fase 2 → Fase 3 → Fase 3b (ambientación, D56) → Fase 4 → Fases 5 y 6 → Fase 7. El backend de la Fase 4 puede avanzar en paralelo con la Fase 3b.
- En la Fase 4, T021 depende de T020; T027 a T031 dependen de T026; T025 depende de T024.
- Dominio antes que aplicación; aplicación antes que pantallas. Las pruebas se escriben antes y deben fallar antes de implementar.

## Estrategia

1. **Fases 1 a 3**: pasear por PIX Central en 3D. Conviene enseñárselo al dueño aquí.
2. **Fase 4**: la zona de fuente de ingreso completa, que es el modelo para todas las demás.
3. **Fases 5 y 6**: el resto de la base (fallos, enemigos, chispas, ayuda, pausa).
4. **Fase 7**: integración, revisión y publicación.
5. **Después (D53)**: cada zona y cada mundo nuevos se agregan como contenido en `src/content/`.

## Notas

- Total: 52 tareas (47 originales y T048 a T052 de la ambientación, D56).
- Publicar y todo commit o subida requieren el sí explícito del dueño.
- Lo que una tarea descubra que no está en la especificación se reporta al PM; no se construye.
- Los criterios que piden personas o teléfonos reales no se marcan como cumplidos con pruebas automáticas.
