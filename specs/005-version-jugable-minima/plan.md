# Implementation Plan: Versión jugable mínima

**Branch**: `005-version-jugable-minima` | **Date**: 2026-11-16, ajustado el 2026-11-17 por D37, D38 y D39 (aprobado en D40) | **Spec**: [spec.md](spec.md)

**Input**: specs [001](../001-motor-plataformas/spec.md), [002](../002-puertas-decision-inventario/spec.md), [003](../003-jefe-mundo-validacion/spec.md) y [004](../004-mundo-1-nicho/spec.md), reunidas en [spec.md](spec.md).

## Summary

Construir el Mundo 1 de Canonia jugable de principio a fin dentro de Claude, en el teléfono: un nivel de plataformas con cinco puertas de decisión, un inventario con cinco piezas y el jefe que valida la fase.

Enfoque técnico: una página web sin compilación, organizada en cuatro capas. Las reglas del influencer (aprobación, estados, dependencias, cierre del mundo) viven en un dominio puro y probado sin navegador. La IA de Claude, el guardado y el motor de plataformas quedan detrás de contratos, de modo que frontend y backend se construyen en paralelo y la versión con API pueda reutilizar dominio y aplicación.

## Technical Context

**Language/Version**: JavaScript (ES2022) en módulos, con tipos documentados en comentarios JSDoc. HTML y CSS. Sin compilación.

**Primary Dependencies**: ninguna en ejecución. La IA llega por la capacidad `sample` del entorno de páginas de Claude cuando la cuenta del jugador la ofrece; si no, por el modo guía, con la IA de chat que el jugador elija (D37).

**Storage**: almacenamiento del navegador del jugador, detrás del puerto `ProgressStore`, con respaldo en memoria si el navegador no deja guardar (D39). Exportar e importar son de otra feature.

**Testing**: ejecutor de pruebas incluido en Node.js 22 (`node --test`), sin dependencias. Pruebas manuales guiadas en teléfono para lo que exige personas reales.

**Target Platform**: página publicada dentro de Claude, usada sobre todo en la app de Claude del teléfono en vertical; también en navegador de escritorio. Fuera de Claude, modo de demostración.

**Project Type**: aplicación web de una sola página (juego), sin servidor.

**Performance Goals**: 60 cuadros por segundo en un teléfono de gama media; respuesta a un control en menos de 100 ms; reaparición tras un fallo en menos de 2 s.

**Constraints**: sin acceso a la red desde la página; sin servidor; sin cuentas propias; la IA no navega y no recuerda entre llamadas; página y archivos de apoyo de 16 MB como máximo cada uno; llamadas a la IA solo tras una acción del jugador.

**Scale/Scope**: un mundo, seis tramos de plataformas, cinco puertas, un jefe, cinco piezas, unas ocho pantallas. Un jugador por partida.

La prueba técnica verificó los supuestos del entorno (ver [research.md](research.md) y [spike-resultados.md](spike-resultados.md)). Uno falló: una cuenta gratuita no recibe la IA en la página. De ahí el modo guía (D37, D38). Queda una comprobación abierta: si la app de Claude del teléfono recarga la página al volver de otra app (T004b).

## Constitution Check

*GATE: comprobado antes de la investigación y de nuevo tras el diseño.*

| Principio | Cómo lo cumple el plan | Estado |
|---|---|---|
| I. El jugador decide | `approve` es la única operación que cambia una pieza y solo la invoca el caso de uso `approvePiece`, llamado por el botón de aprobar. El motor no tiene acceso al dominio: se comunica por eventos que no incluyen aprobar. | Cumple |
| II. Fidelidad a la factoría | El contenido del mundo (puertas, lecciones, criterios, rutas de ingreso) es un conjunto de datos tomado de F01, separado del código. | Cumple |
| III. Arquitectura por capas | Cuatro carpetas, una por capa, más una prueba automática que falla si una capa interna importa una externa. | Cumple |
| IV. Pruebas obligatorias | Pruebas sin navegador de dominio y aplicación para: nada entra sin aprobar, nada aprobado se pierde, dependencias y cierre del mundo. Se escriben antes que el código que prueban. | Cumple |
| V. Simplicidad tecnológica | Sin compilación, sin dependencias, sin servidor, sin cuentas, sin generación de imagen ni video. | Cumple |
| VI. Errores con personaje | El puerto de IA nunca lanza excepciones: devuelve un motivo, y la interfaz lo traduce a un mensaje de personaje. | Cumple |
| VII. Idioma | Textos del jugador en un archivo de textos en español; código en inglés. | Cumple |
| Flujo y roles | Reparto de carpetas por subagente, sin solapes (ver más abajo). | Cumple |

Sin violaciones que justificar. Tras el diseño, el resultado es el mismo.

[spec.md](spec.md) añade tres requisitos que no estaban en las specs 001 a 004: un mapa mínimo de un mundo, un aviso de que el progreso no se guarda y un modo de demostración fuera de Claude. El dueño los aceptó al decidir seguir con el plan (D32). Añade también el modo guía (005/FR-006 a FR-013), decidido en D37 y D38, y el guardado en el navegador (005/FR-014 a FR-019), decidido en D39. Sigue sin servidor ni dependencias, así que el principio V se mantiene.

## Project Structure

### Documentation (this feature)

```text
specs/005-version-jugable-minima/
├── spec.md              # Integración de las specs 001 a 004
├── plan.md              # Este archivo
├── research.md          # Decisiones técnicas y hallazgos del entorno
├── data-model.md        # Entidades, estados y reglas
├── quickstart.md        # Cómo ejecutar, probar y validar
├── contracts/
│   └── puertos.md       # Puerto de IA, puerto de guardado, eventos del motor, casos de uso
├── tasks.md             # Lista de tareas
└── spike-resultados.md  # Resultados de la prueba técnica (lo crea la Fase 0)
```

### Source Code (repository root)

```text
spike/                        # Prueba técnica de la Fase 0. Temporal: se retira al cerrar la entrega.

index.html                    # Página única: lienzo, capa de pantallas, arranque
package.json                  # Solo para el comando de pruebas; sin dependencias

src/
├── domain/                   # Capa 1. Reglas puras. No importa nada de fuera.
│   ├── piece.js              # Pieza: estados, aprobar, historial
│   ├── inventory.js          # Inventario: dependencias, marcar por revisar
│   ├── gate.js               # Puerta: estado, opciones mostradas
│   ├── world.js              # Mundo: estados, reglas de acceso al jefe y de cierre
│   └── observation.js        # Observación del jefe
│
├── application/              # Capa 2. Casos de uso. Importa solo domain.
│   ├── ports.js              # Definición de AiPort y ProgressStore
│   ├── game-session.js       # Partida en curso: inventario, mundos, contexto
│   ├── gate-flow.js          # Abrir puerta, opciones, recomendar, aprobar, cerrar
│   ├── inventory-flow.js     # Ver inventario, reabrir pieza
│   ├── boss-flow.js          # Acceso al jefe, revisión, observaciones, resumen, cierre
│   ├── guide-flow.js         # Modo guía: cambio de modo, pregunta, respuesta pegada
│   └── events.js             # Eventos entre motor y aplicación
│
├── adapters/                 # Capa 3. Importa application (los puertos) y domain.
│   ├── ai/
│   │   ├── claude-sample-adapter.js
│   │   ├── demo-ai-adapter.js
│   │   ├── prompts.js        # Arma la instrucción de cada llamada
│   │   ├── validate.js       # Valida y limpia la respuesta de la IA
│   │   └── guide.js          # Modo guía: pregunta para copiar y lectura de la respuesta pegada
│   └── storage/
│       ├── browser-progress-store.js   # Almacenamiento del navegador (D39)
│       └── memory-progress-store.js
│
├── presentation/             # Capa 4. Importa application. Nunca domain directo.
│   ├── engine/               # Motor de plataformas
│   │   ├── loop.js           # Bucle a paso fijo
│   │   ├── physics.js        # Movimiento, salto, colisiones
│   │   ├── input.js          # Táctil y teclado
│   │   ├── camera.js
│   │   ├── level.js          # Tramos, puntos seguros, puertas
│   │   ├── entities.js       # Personaje, enemigos, corazones
│   │   ├── assist.js         # Modo de ayuda
│   │   ├── boss-fight.js     # Pelea con el jefe
│   │   └── render.js         # Dibujo en el lienzo
│   ├── screens/              # Pantallas HTML sobre el lienzo
│   │   ├── map.js            # Mapa mínimo de un mundo
│   │   ├── start.js          # Continuar o empezar de nuevo; aviso de guardado
│   │   ├── interests.js
│   │   ├── gate.js           # Mini lección, tarjetas, edición, aprobar
│   │   ├── guide.js          # Modo guía: pasos, copiar pregunta, pegar respuesta
│   │   ├── waiting.js        # Personaje con dato útil
│   │   ├── inventory.js
│   │   ├── boss-review.js
│   │   ├── summary.js
│   │   └── error.js          # Personaje que explica un fallo
│   ├── art/                  # Dibujo vectorial del personaje, enemigos y mundo
│   └── styles.css
│
├── content/                  # Datos. No importa nada.
│   ├── es.js                 # Todos los textos del jugador, en español
│   └── world-1/
│       ├── pieces.js         # Piezas y dependencias
│       ├── gates.js          # Puertas: lección, datos útiles, instrucción, opciones fijas
│       ├── boss.js           # El Generalista: criterios de revisión
│       ├── interests.js      # Lista fija de intereses
│       └── level.js          # Los seis tramos y la arena del jefe
│
└── main.js                   # Punto de composición: elige adaptadores y conecta las capas

tests/
├── domain/                   # Reglas de pieza, inventario, puerta y mundo
├── application/              # Flujos con el adaptador de demostración
├── adapters/                 # Validación de respuestas de la IA
├── engine/                   # Física y reglas de fallo, sin lienzo
└── architecture.test.js      # Falla si una capa importa lo que no debe
```

**Structure Decision**: una sola aplicación en `src/`, dividida en las cuatro capas de la constitución más una carpeta de contenido. El "backend" es `domain`, `application` y `adapters`, dentro de la misma página; en la versión con API, esas tres carpetas pueden moverse a un servidor y `presentation` hablarle por red sin cambiar las reglas.

**Reglas de dependencia** (las comprueba `architecture.test.js`):

```text
domain        → nada
content       → nada
application   → domain
adapters      → application, domain
presentation  → application, content
main.js       → todo (único lugar donde se conectan las capas)
```

## Decisiones de diseño clave

1. **El motor no conoce el inventario.** Se comunica con la aplicación solo por los eventos de [contracts/puertos.md](contracts/puertos.md). Ninguno de esos eventos aprueba, cambia ni descarta una pieza. Así, "fallar no toca el inventario" no depende de la disciplina de quien programe: es imposible por construcción.
2. **Una sola puerta de entrada para aprobar.** `approvePiece` es el único caso de uso que llama a `approve`, y la interfaz solo lo invoca desde el botón de aprobar.
3. **La IA nunca decide ni rompe.** Su respuesta se valida y se muestra como texto plano; un fallo devuelve un motivo, no una excepción; y siempre queda el camino de escribir la propia respuesta.
4. **Física a paso fijo.** El movimiento avanza en pasos iguales aunque el dibujo vaya lento, para que el personaje no atraviese plataformas ni cambie de velocidad en teléfonos lentos.
5. **Texto en HTML, juego en lienzo.** Las pantallas de decisión son HTML sobre el lienzo: se escribe y se lee con los controles normales del teléfono.
6. **Contenido como datos.** Añadir el Mundo 2 será añadir una carpeta en `content/`, no tocar el motor ni el dominio.
7. **Modelos de IA por tarea.** Nivel rápido para opciones, comentario y recomendación (uno o dos segundos); nivel normal para la revisión del jefe, que se hace una vez por mundo.
8. **Modo guía con las mismas reglas.** Cuando la IA no llega a la página, el juego arma la misma pregunta, el jugador la lleva a la IA que quiera y trae la respuesta. Esa respuesta pasa por el mismo validador y llega a la aplicación con la misma forma que la de la IA directa. Así, las pantallas de tarjetas y de revisión no cambian. Solo pasan por el modo guía las opciones y la revisión del jefe (D38).
9. **Guardar antes de salir.** La partida se guarda en el navegador al aprobar y, sobre todo, justo antes de copiar una pregunta del modo guía, con el punto de retorno. Así, aunque el teléfono recargue la página al volver, el jugador cae en la misma puerta listo para pegar (D39).

## Reparto entre subagentes

Cada subagente es dueño de unas carpetas y no edita las de otro. Los contratos se acuerdan primero; después frontend y backend trabajan a la vez.

| Subagente | Es dueño de | No toca |
|---|---|---|
| PM | `specs/`, `ESTADO.md`, `ESPECIFICACION_JUEGO_AIIF.md`, `tasks.md` | `src/`, `tests/` |
| Arquitecto | `contracts/`, `src/application/ports.js`, `src/application/events.js`, `tests/architecture.test.js`, `src/main.js` | El interior de las capas |
| Backend | `src/domain/`, `src/application/` (salvo puertos y eventos), `src/adapters/` | `src/presentation/`, `src/content/` |
| Frontend | `src/presentation/`, `src/content/`, `index.html` | `src/domain/`, `src/application/`, `src/adapters/` |
| QA | `tests/` (salvo la prueba de arquitectura), `quickstart.md` | `src/` |
| Arquitecto de seguridad | Revisa; no es dueño de código. Puede bloquear `src/adapters/ai/` y lo que muestre texto de la IA | — |

`src/content/` es del frontend porque es texto y diseño de niveles, pero el PM revisa que cada lección y cada criterio salga de la factoría.

Los archivos de cada subagente están en `.claude/agents/`.

## Orden de construcción

1. **Prueba técnica** (un solo agente): página mínima publicada dentro de Claude que verifica los cinco supuestos sin probar de [research.md](research.md). Si alguno falla, se ajusta el plan antes de seguir.
2. **Contratos y esqueleto** (arquitecto): puertos, eventos, estructura de carpetas, prueba de arquitectura.
3. **En paralelo:**
   - Backend: dominio con sus pruebas primero, después aplicación, después adaptadores.
   - Frontend: motor con tramos de prueba, después pantallas contra el adaptador de demostración.
   - QA: pruebas de aceptación de las specs 001 a 003 a medida que haya algo que probar.
4. **Integración** (arquitecto): conectar todo en `main.js`.
5. **Contenido del Mundo 1** (frontend, con revisión del PM): lecciones, datos útiles, tramos y el Generalista.
6. **Revisión de seguridad** y **prueba guiada en teléfono** con una persona de fuera del proyecto.
7. **Publicación** dentro de Claude y enlace público, con la confirmación del dueño.

## Riesgos

| Riesgo | Efecto | Qué se hace |
|---|---|---|
| El nivel rápido de la IA da propuestas pobres en español | Las opciones no ayudan | Se mide en la prueba técnica; si falla, se usa el nivel normal y se alarga la espera con más datos útiles |
| Una página dentro de Claude no carga varios módulos | El código no arranca publicado | Paso opcional que une los archivos en uno para publicar |
| El lienzo va lento en la app de Claude del teléfono | El juego se siente mal | Se mide en la prueba técnica; se reduce el detalle del dibujo |
| El jugador recarga y pierde todo | Frustración en una sesión de 30 minutos | Guardado automático en el navegador (D39) |
| El jugador borra los datos del navegador o cambia de dispositivo | Pierde la partida | Aviso antes de empezar (005/FR-004); exportar e importar llegan con la feature de guardado |
| ~~Un visitante de fuera no puede usar la IA~~ | Ocurrió con una cuenta gratuita (T004) | Resuelto con el modo guía (D37) |
| La app de Claude del teléfono recarga la página al volver de otra IA | El jugador en modo guía pierde el avance en cada puerta | **Ocurrió en T004b.** Resuelto con el guardado en el navegador y el punto de retorno (D39) |
| La IA del jugador no respeta el formato | El modo guía se vuelve tedioso | Pregunta con el formato explicado y un ejemplo; lectura tolerante (texto alrededor, comillas); medir con dos IA gratuitas (005/SC-005) |
| Preguntas largas en el teléfono | Copiar y pegar falla o se corta | Pregunta corta, con solo las piezas que la decisión necesita; respaldo de seleccionar el texto |
| La IA propone algo inapropiado | Daño al jugador y al proyecto | Instrucción explícita, validación de forma y revisión del arquitecto de seguridad; límite reconocido en research R8 |

## Hallazgos que afectan decisiones anteriores

Salieron de leer las definiciones del entorno. No bloquean esta entrega.

1. **Búsqueda del nombre (D25).** La búsqueda automática con el navegador de la app solo puede usarla el dueño de la página, no los jugadores. Para los jugadores, la única vía real es la búsqueda guiada. Resuelto en D31: búsqueda guiada para todos; la automática queda para la versión con servidor.
2. **Guardado.** La base de datos del entorno no deja escribir a visitantes de fuera, así que no sirve para guardar partidas de jugadores públicos. Desde D39, esta entrega ya guarda en el almacenamiento del navegador; la feature de guardado añadirá exportar e importar.

## Complexity Tracking

Sin violaciones de la constitución que justificar.
