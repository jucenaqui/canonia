# Implementation Plan: Base del juego 3D (motor 3D y zonas de decisión)

**Branch**: `006-motor-3d` | **Date**: 2026-11-25 | **Spec**: [spec.md](spec.md)

**Estado**: aprobado por el dueño (D54, 2026-11-25).

**Input**: [spec.md](spec.md) (aprobada en D50 y ampliada en D53), decisiones D46 a D53, el plan anterior [005/plan.md](../005-version-jugable-minima/plan.md) y la maqueta validada de la zona de fuente de ingreso (`docs/arte/3d/maquetas/mundo1-zonas.html`, diseño en `docs/diseno/mundo-1-zonas.md`).

## Summary

Construir la **base del juego de verdad** en 3D: el mundo abierto con cámara detrás, el sistema de zonas donde se decide jugando (ficha, minijuego, recomendación, aprobar y cambiar), el guardado y la IA. La primera zona construida es la de **fuente de ingreso**, ya validada en la maqueta. El resto de zonas y mundos llegan después **como contenido**, sin reescribir código (D53).

Enfoque: se conserva todo lo que no depende de la vista (dominio, aplicación, adaptadores, pruebas) y se rehace solo la presentación del mundo. three.js dibuja el mundo; el HTML sigue mostrando fichas, tarjetas y textos encima.

## Qué es "la base" y qué no

| Entra en esta entrega | Queda para después (contenido, D53) |
|---|---|
| Motor 3D: movimiento, salto, cámara, choques, sitio seguro, pausa | Zonas 2 a 5 del Mundo 1 (nicho, audiencia, tiempo, meta) |
| Sistema genérico de zonas: entrar, PIX explica, objetos con acción, ficha, minijuego, recomendación, aprobar, cambiar, puentes que se abren | Mundos 2 y 3 |
| Zona de fuente de ingreso completa, con sus 5 fichas y 5 minijuegos | Jefe del mundo en 3D (feature 3): se deja el punto de entrada |
| Chispas y consejos de PIX (D48), dron de spam (D49), barra de confianza (D51) | Creator Market (D48) |
| Guardado en el navegador e IA (directa y modo guía) adaptados a zonas | Comprimir todo el arte del juego final (solo lo que use esta entrega) |
| Modelos 3D de esta entrega, comprimidos | Sonido |

## Technical Context

**Language/Version**: JavaScript (ES2022) en módulos, tipos en JSDoc. HTML y CSS. Sin compilación (igual que 005).

**Primary Dependencies**: **three.js 0.160.0**, cargada desde un servidor público de librerías (`cdn.jsdelivr.net`), con su cargador de modelos GLTF. Es la primera dependencia externa del juego; la aprobó el dueño en D50. Ver "Justificación de la dependencia".

**Storage**: igual que 005: almacenamiento del navegador detrás de `ProgressStore` (D39). Se amplía para guardar zonas, pruebas hechas, chispas, consejos y piezas por revisar.

**Testing**: `node --test` para dominio, aplicación, adaptadores y la lógica pura del motor (física, cámara, minijuegos como máquinas de estado). Revisión en pantalla de teléfono con el navegador de pruebas para lo visual.

**Target Platform**: igual que 005: página dentro de Claude, sobre todo en el teléfono en vertical.

**Performance Goals**: 30 a 60 cuadros por segundo en un teléfono de gama media; jugable a los 10 segundos de abrir aunque falten modelos (spec 006, SC-006 y FR-039); respuesta a un control en menos de 100 ms.

**Constraints**: página y cada archivo de apoyo de 16 MB como máximo; la página publicada no sirve archivos `.glb`, así que cada modelo viaja como archivo `.js` (descubierto en las maquetas); sin servidor; la IA solo tras una acción del jugador.

**Scale/Scope**: un mundo con plaza central y cinco zonas, de las que esta entrega llena una; unos 15 modelos 3D; cinco minijuegos.

## Constitution Check

| Principio | Cómo lo cumple el plan | Estado |
|---|---|---|
| I. El jugador decide | Igual que 005: `approvePiece` es la única forma de fijar una pieza. Los minijuegos y la barra de confianza viven en presentación y no pueden aprobar: se comunican por eventos que no incluyen aprobar. Cambiar una pieza usa `reopenPiece` + `approvePiece`. | Cumple |
| II. Fidelidad a la factoría | Las opciones, fichas y criterios de cada zona son datos en `content/`, tomados de F01, F11 y la especificación maestra. Las cifras de los minijuegos se marcan como ejemplos (F11). | Cumple |
| III. Arquitectura por capas | Se mantienen las cuatro capas y la prueba de arquitectura. three.js solo se importa en `presentation/`. | Cumple |
| IV. Pruebas obligatorias | Se conservan las 142 pruebas y se añaden las de zonas: ninguna acción de minijuego aprueba, cambiar marca dependientes "por revisar", lo aprobado sobrevive a fallos y recargas. | Cumple |
| V. Simplicidad tecnológica | Sin compilación ni servidor. **Una dependencia externa** (three.js), justificada abajo y aprobada por el dueño (D50). "El juego se dibuja en canvas" se sigue cumpliendo: three.js dibuja en un canvas. | Cumple con justificación |
| VI. Errores con personaje | Sin cambios: PIX explica cualquier fallo, también si un modelo no carga. | Cumple |
| VII. Idioma | Textos del jugador en `content/es.js` y en los datos de cada zona. | Cumple |

**Constitución**: enmendada a la versión 1.0.1 al aprobar este plan: el tema visual pasa a The Influence Foundry (D41, D54).

### Justificación de la dependencia (three.js)

- **Por qué hace falta:** dibujar un mundo 3D con luces, sombras, modelos animados y cámara en el teléfono exige un motor 3D. Escribirlo a mano tomaría meses y sería peor.
- **Por qué three.js:** es la librería 3D más usada en la web, gratuita (MIT), sin compilación, funciona dentro de Claude (probado en las maquetas) y carga los modelos GLB que genera Magnific.
- **Cómo se limita su alcance:** solo se importa en `presentation/world3d/`. Dominio, aplicación y adaptadores no la conocen. La versión queda fija (0.160.0) para que no cambie sola.

## Qué se conserva, qué cambia y qué es nuevo

### Se conserva sin cambios (salvo nombres)

- `src/domain/piece.js`, `inventory.js`, `world.js`, `observation.js`: piezas, aprobación, dependencias, cierre del mundo.
- `src/adapters/ai/*`: IA directa, modo guía, validación, demostración.
- `src/adapters/storage/*`: guardado en el navegador y en memoria.
- `src/application/guide-flow.js`, `ports.js` y casi todo `game-session.js`.
- `src/presentation/screens/dom.js`, `guide.js`, `pause.js`, `start.js`: pantallas HTML.
- Las 142 pruebas existentes.

### Cambia

| Archivo | Cambio |
|---|---|
| `src/domain/gate.js` | La "puerta" pasa a representar una **zona de decisión**. Se añade el origen de opción `catalog` para las listas explícitas de la factoría, además de `ai` y `own`. |
| `src/application/gate-flow.js` → `zone-flow.js` | Casos de uso de una zona: abrir, ver ficha, recomendar con criterios, aprobar, cambiar (reabrir y aprobar otra opción). |
| `src/application/events.js` | Eventos nuevos entre el mundo 3D y la aplicación (ver "Contratos"). |
| `src/application/game-session.js` | Guarda también chispas, consejos desbloqueados, pruebas hechas y confianza. |
| `src/presentation/screens/gate.js` → `zone.js` | Ficha, tarjeta de aprobación con tabla de criterios, "Otra", recomendación. |
| `src/content/es.js` | Textos nuevos de PIX, fichas y minijuegos. |
| `index.html` | Carga three.js y el nuevo `presentation/world3d/`. |

### Se retira

- `src/presentation/engine/*` y `src/presentation/art/*` (motor y dibujo 2D). Antes de borrarlos se pasan al motor 3D las partes reutilizables: el paso fijo de `loop.js`, el margen al borde y el salto recordado de `physics.js`, y la lectura de controles de `input.js`.
- `src/content/test-world.js` (mundo de prueba 2D).

### Nuevo

```text
src/presentation/world3d/
├── scene.js          # Escena, luces, cámara detrás, tamaño de pantalla
├── physics3d.js      # Movimiento y choques en 3D (cajas), escalones, sitio seguro
├── controls.js       # Palanca táctil, saltar, acción, girar la cámara, teclado
├── assets.js         # Carga de modelos por orden de prioridad, formas simples mientras llegan
├── hero.js           # Protagonista animado (quieto, correr, saltar) y PIX que lo sigue
├── zone-runtime.js   # Zona genérica: objetos con acción, botón de acción, puentes, columna de luz
├── minigames/        # Un archivo por minijuego, como máquina de estados sin three.js dentro
├── hud.js            # Chispas, barra de confianza, progreso de zonas, botón Ficha
└── enemies.js        # Dron de spam: recorrido, empuje, vencido y reaparece al minuto
src/content/world-1/
├── layout.js         # Plaza, zonas, puentes, posiciones
├── zone-income.js    # Zona de fuente de ingreso: 5 opciones, fichas, criterios, minijuegos
└── tips.js           # Consejos de PIX que se desbloquean con chispas
assets/models/        # Modelos .glb comprimidos (fuente) y su versión .js para publicar
scripts/pack-models.js  # Convierte cada .glb en .js para la página publicada
```

### Ambientación de PIX Central (D56)

PIX Central debe parecerse a la imagen de referencia del dueño: sala circular con cúpula y reactor holográfico, cápsulas, barandas de vidrio, vegetación, pantallas flotantes y, de fondo, la isla con montañas y cascadas. Las piezas se generan con IA usando esa imagen como referencia de estilo, se comprimen igual que las demás y se colocan con `src/presentation/world3d/decor.js`. El fondo es una imagen panorámica sobre una esfera alrededor del mundo. Tareas T048 a T052.

## Contratos

### Eventos del mundo 3D a la aplicación

| Evento | Datos | Cuándo |
|---|---|---|
| `zoneEntered` | `zoneId` | El personaje entra en una zona. La aplicación dice a PIX qué explicar. |
| `optionInspected` | `zoneId`, `optionId` | El jugador abre una ficha. |
| `minigameFinished` | `zoneId`, `optionId`, `lessonId`, `trustDelta` | Terminó un minijuego. Solo informa; **no aprueba**. |
| `recommendationAsked` | `zoneId`, `answers` | El jugador respondió la pregunta jugada de "Recomiéndame". |
| `chosenForApproval` | `zoneId`, `optionId` o `ownText` | El jugador pulsó "Elegir" o "Cambiar a esta". Abre la tarjeta; aún no aprueba. |
| `sparkCollected` | — | Recogió una chispa. |
| `playerFailed` | `reason` | Cayó o lo empujó un dron. |
| `levelPaused` / `levelResumed` | — | Igual que 005. |

### Comandos de la aplicación al mundo 3D

| Comando | Datos | Efecto |
|---|---|---|
| `openBridge` | `zoneId` | Abre el camino a la siguiente zona. |
| `lightZone` | `zoneId` | Enciende el sector y el anillo del núcleo. |
| `markRecommended` | `zoneId`, `optionId` | Pone la estrella sobre la opción recomendada. |
| `setChosen` | `zoneId`, `optionId` | Marca la opción aprobada (pantalla encendida). |
| `showBoss` | `worldId` | Aparece el jefe en la plaza. |
| `say` | `textId`, `vars` | PIX dice un texto del archivo de textos. |

### Casos de uso nuevos o cambiados

| Caso de uso | Requisito |
|---|---|
| `enterZone(zoneId)` | 006/FR-011 a FR-014 |
| `inspectOption(zoneId, optionId)` | 006/FR-041 |
| `recordMinigame(zoneId, optionId, result)` | 006/FR-043, FR-048 |
| `recommendOption(zoneId, answers)` | 006/FR-045 (usa criterios del contenido; la IA solo redacta el porqué) |
| `approveZoneChoice(zoneId, choice)` | 006/FR-016, FR-017 (llama a `approvePiece`) |
| `changeZoneChoice(zoneId, choice)` | 006/FR-046 (llama a `reopenPiece` y `approvePiece`; dependientes "por revisar") |
| `explainOtherOption(zoneId, text)` | 006/FR-044: la IA arma la ficha de "Otra" |
| `collectSpark()` / `unlockTip()` | D48 |

## Decisiones de diseño clave

1. **La zona es genérica; el contenido la llena.** Una zona nueva es un archivo en `content/` con sus opciones, fichas, criterios y minijuegos. Así, después de esta entrega, las fases se añaden sin tocar el motor (D53).
2. **Los minijuegos no aprueban.** Son máquinas de estados en `presentation/world3d/minigames/` que solo emiten `minigameFinished`. La prueba de arquitectura comprueba que no importan nada de la aplicación.
3. **Listas de la factoría como datos.** Si la factoría da una lista explícita, sus opciones se guardan con origen `catalog`. La IA no inventa opciones ahí; solo ayuda a recomendar y a explicar "Otra".
4. **Recomendar con reglas claras.** La puntuación sale de los criterios de la fase (en el contenido), sin pesos ocultos (F11). La IA, si está, redacta el porqué en lenguaje natural; si no, se usa un texto de plantilla.
5. **Carga por prioridad.** Primero el protagonista y lo de la zona en curso; después el resto. Mientras tanto se ven formas simples y se puede jugar (FR-039).
6. **Modelos comprimidos.** Cada modelo se reduce (texturas a 1024 px y menos polígonos) antes de empaquetarlo. Objetivo: el mundo completo por debajo de 12 MB. Para comprimir se necesita una herramienta de desarrollo (gltf-transform); usarla requiere el sí del dueño. Alternativa sin instalar nada: reducir con las herramientas de Magnific (remesh y resize).
7. **Paso fijo y lo bueno del motor 2D.** Se conservan el paso fijo de física, el margen al borde y el salto recordado, ya probados.

## Reparto entre subagentes

Igual que 005, con estas carpetas nuevas:

| Subagente | Es dueño de |
|---|---|
| Arquitecto | Contratos nuevos, `events.js`, `main.js`, prueba de arquitectura (incluye la regla de minijuegos) |
| Backend | `domain/gate.js`, `application/zone-flow.js`, `game-session.js`, adaptadores |
| Frontend | `presentation/world3d/`, `presentation/screens/zone.js`, `content/world-1/`, `index.html`, `assets/` |
| QA | Pruebas nuevas y revisión en tamaño teléfono |
| Seguridad | Revisa la carga de three.js y los textos de la IA en fichas y recomendaciones |
| PM | Spec, `ESTADO.md`, que el contenido salga de la factoría |

## Orden de construcción

1. **Contratos y esqueleto** (arquitecto): eventos nuevos, carpeta `world3d/`, prueba de arquitectura ampliada, three.js cargando en la página publicada.
2. **En paralelo:**
   - Backend: zona en el dominio (origen `catalog`), `zone-flow.js`, cambiar con dependientes, guardado ampliado. Pruebas primero.
   - Frontend: motor 3D (escena, física, controles, cámara, protagonista y PIX) con la plaza vacía; después el sistema de zona genérico.
   - Arte: comprimir y empaquetar los modelos de esta entrega.
3. **Zona de fuente de ingreso** (frontend + PM): contenido de las 5 opciones, fichas, criterios y los 5 minijuegos.
4. **Chispas, consejos, dron y barra de confianza.**
5. **Integración** (arquitecto) en `main.js` y retiro del motor 2D.
6. **Revisión** de seguridad, pruebas completas y prueba guiada en teléfono.
7. **Publicación** dentro de Claude, con la confirmación del dueño.

## Riesgos

| Riesgo | Efecto | Qué se hace |
|---|---|---|
| El mundo pesa mucho y tarda en cargar en el teléfono | Abandono antes de jugar | Compresión de modelos, carga por prioridad y formas simples mientras llegan |
| three.js va lento en teléfonos sencillos | El juego se traba | Sombras simples, límite de resolución, medir en teléfono real en el paso 6 |
| El servidor de librerías no responde | El juego no abre | Versión fija; si se repite, copiar three.js como archivo propio de la página |
| Los minijuegos crecen y retrasan la base | La base no llega | Solo los de la zona validada: dos ejemplos de un minuto por opción (D54) |
| Cambiar la fuente de ingreso deja el resto incoherente | Confusión | Las piezas dependientes quedan "por revisar" y el jefe no deja cerrar el mundo hasta revisarlas (003) |
| Comprimir modelos exige una herramienta no aprobada | Archivos pesados | Pedir el sí del dueño o usar las herramientas de Magnific |

## Decisiones del dueño al aprobar (D54)

1. Plan aprobado.
2. Minijuegos: dos ejemplos jugables por opción, de un minuto en promedio cada uno.
3. Se comprimen los modelos con gltf-transform, siempre que sigan viéndose y funcionando bien.
4. Constitución enmendada a la versión 1.0.1 (tema visual The Influence Foundry).

## Complexity Tracking

| Excepción | Por qué | Alternativa descartada |
|---|---|---|
| Dependencia externa three.js (principio V) | Un mundo 3D en el teléfono necesita un motor 3D | Escribir un motor 3D propio: meses de trabajo y peor resultado |
