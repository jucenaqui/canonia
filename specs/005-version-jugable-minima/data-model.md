# Modelo de datos: versión jugable mínima

Describe las entidades del dominio y sus reglas. Los nombres técnicos van en inglés, como pide la constitución. Las reglas citan el requisito del que salen con el formato `carpeta/FR`.

## Capa de dominio

### Piece (pieza del influencer)

| Campo | Tipo | Regla |
|---|---|---|
| `id` | texto | Identificador fijo de la pieza, por ejemplo `niche`. Único en el inventario. |
| `worldId` | texto | Mundo al que pertenece. |
| `status` | `pending` · `approved` · `needsReview` | Ver transiciones. |
| `content` | texto o nulo | Nulo mientras está `pending`. Exactamente lo que el jugador aprobó (002/FR-022). |
| `extras` | mapa de texto | Datos asociados que se aprueban junto a la pieza, por ejemplo la etiqueta pública del nicho (004/FR-020). |
| `origin` | `ai` · `aiEdited` · `player` | Quién originó el texto aprobado. |
| `approvedAt` | fecha o nulo | Momento de la aprobación. |
| `dependsOn` | lista de `id` | Piezas de las que se decidió a partir. Fija por contenido del mundo. |
| `history` | lista de versiones | Versiones reemplazadas, la más reciente al final (002/FR-036). |

**Transiciones de estado**

```text
pending ──approve──▶ approved
approved ──(se aprueba una versión nueva de una pieza de la que depende)──▶ needsReview
needsReview ──approve (confirmar tal cual o cambiar)──▶ approved
approved ──approve (versión nueva tras reabrir)──▶ approved   [la anterior pasa a history]
```

**Invariantes**

- Solo `approve` cambia `content`, y solo se invoca tras la acción explícita del jugador (002/FR-018 a FR-021).
- `approve` con el mismo texto repetido no crea una segunda versión (002/FR-023).
- Ninguna transición borra una pieza (002/FR-034).
- Reabrir sin aprobar no cambia nada (002/FR-032).
- `content` aprobado no está vacío y no supera la longitud máxima (002/FR-015).

### Inventory (inventario)

| Campo | Tipo | Regla |
|---|---|---|
| `pieces` | mapa `id` → `Piece` | Contiene todas las piezas de los mundos existentes, desde el inicio en `pending`. |

**Operaciones**

- `approve(pieceId, content, origin, extras)`: aplica la aprobación y marca `needsReview` las piezas `approved` que dependen, directa o indirectamente, de la cambiada, solo si el contenido cambió (002/FR-033).
- `dependentsOf(pieceId)`: piezas que dependen de una dada; se usa para avisar antes de reabrir (002/FR-031).
- `piecesOfWorld(worldId)`, `hasPending(worldId)`, `hasNeedsReview(worldId)` (002/FR-037).

### Gate (puerta de decisión)

| Campo | Tipo | Regla |
|---|---|---|
| `id` | texto | Único en el mundo. |
| `pieceId` | texto | Pieza que resuelve. Una puerta, una pieza. |
| `status` | `unresolved` · `resolved` | `resolved` cuando su pieza se aprueba (002/FR-024). |
| `lessonSeen` | sí/no | Registra que la mini lección se completó, una sola vez (002/FR-003). Los puntos llegan con la feature de mapa y progreso. |
| `shownOptions` | lista de `Option` | Todas las opciones mostradas en esta puerta, para poder volver a ellas (002/FR-011). |

Una puerta resuelta no vuelve a `unresolved` por un fallo de juego (001/FR-019). Si su pieza queda `needsReview`, la puerta sigue resuelta y la revisión se hace desde el inventario.

### Option (opción)

| Campo | Tipo | Regla |
|---|---|---|
| `text` | texto | Lo que se aprobaría. |
| `pros` | texto | Ventajas, en lenguaje simple. |
| `risks` | texto | Riesgos, en lenguaje simple. |
| `recommended` | sí/no | Exactamente una por tanda de tres (002/FR-006). |
| `source` | `ai` · `player` | |
| `extras` | mapa de texto, opcional | Datos que se aprueban junto a la opción, por ejemplo `publicLabel` en la puerta del nicho. |

### World (mundo)

| Campo | Tipo | Regla |
|---|---|---|
| `id` | texto | |
| `status` | `open` · `pendingReview` · `closed` | Ver transiciones. |
| `bossFight` | `pending` · `won` · `skipped` | No vuelve a `pending` (003/FR-009). |
| `observations` | lista de `Observation` | De la última revisión. |
| `deducedData` | mapa | Datos sin puerta propia, confirmados ante el jefe: mercados y plataformas (003/FR-014). |
| `reviewed` | sí/no | Falso si se cerró sin revisión por IA no disponible (003/FR-031). |

**Transiciones**

```text
open ──(resumen aprobado)──▶ closed
closed ──(cambia una pieza del mundo)──▶ pendingReview
pendingReview ──(resumen aprobado)──▶ closed
```

**Reglas de cierre** (se comprueban sin IA)

- No se puede iniciar el encuentro con el jefe si alguna pieza del mundo está `pending` o `needsReview` (003/FR-001 a FR-003).
- El mundo solo pasa a `closed` con la aprobación explícita del resumen, una sola vez (003/FR-023, FR-024).
- Toda observación debe estar `resolved` o `accepted` para llegar al resumen (003/FR-020).

### Observation (observación del jefe)

| Campo | Tipo | Regla |
|---|---|---|
| `criterionId` | texto | Criterio del validador de la fase. |
| `pieceIds` | lista de `id` | Piezas señaladas. Deben existir y ser de este mundo; si no, se descarta (003/FR-015). |
| `explanation` | texto | Una o dos frases. |
| `status` | `open` · `resolved` · `accepted` | `accepted`: el jugador la acepta tal como está (003/FR-019). |

### PlayerContext (contexto del jugador)

| Campo | Tipo | Regla |
|---|---|---|
| `interests` | lista de texto | Entre 3 y 5 de la lista fija, más uno escrito opcional (004/FR-010, FR-011). No es una pieza (004/FR-012). |
| `tutorialSeen` | sí/no | Para no repetir las indicaciones (004/FR-009). |
| `assistMode` | sí/no | Modo de ayuda activado desde el menú (001/FR-029). |

### AiMode (modo de IA de la sesión)

Pertenece a la sesión de aplicación, no al dominio: no toca piezas ni mundos.

| Valor | Cuándo | Regla |
|---|---|---|
| `direct` | La página recibe la IA del entorno | Pasa a `guide` ante el primer `unavailable` (005/FR-006). |
| `guide` | La página no recibe la IA, o el jugador negó el permiso | No vuelve a `direct` hasta recargar. Solo opciones y revisión pasan por la IA del jugador (D38). |
| `demo` | Fuera de Claude | Respuestas preparadas; puede simular `guide` para pruebas. |

`guideNoticeSeen` (sí/no): el aviso de por qué se usa el modo guía se muestra una sola vez por carga.

### ResumePoint (punto de retorno, D39)

Dónde reabrir la partida tras una recarga. Se guarda con la partida.

| Campo | Tipo | Regla |
|---|---|---|
| `worldId` | texto | Mundo en curso. |
| `screen` | `map` · `level` · `gate` · `bossReview` · `summary` | Pantalla abierta al guardar. |
| `gateId` | texto o nulo | Puerta abierta, si `screen` es `gate`. |
| `awaitingGuideAnswer` | sí/no | Se copió una pregunta del modo guía y falta pegar la respuesta. Al continuar, se abre directamente el recuadro de pegar. |

Al continuar, el motor coloca al personaje en el punto seguro anterior a esa puerta o ante el jefe (005/FR-016, FR-017).

## Capa de presentación (estado del nivel)

Este estado es del motor y no toca el dominio (001/FR-012).

| Entidad | Campos principales |
|---|---|
| `LevelState` | tramo actual, último punto seguro, corazones, fallos seguidos desde el punto seguro, enemigos vencidos |
| `PlayerBody` | posición, velocidad, en el suelo o en el aire |
| `Enemy` | tipo, recorrido, vencido o no |
| `Checkpoint` | posición, alcanzado o no |
| `GateMarker` | posición, `gateId` |

Reglas propias del motor: los corazones no bajan de cero y se pierde una cuarta parte, redondeada hacia abajo, al fallar (001/FR-016); tres fallos seguidos desde el mismo punto seguro disparan la oferta de ayuda (001/FR-024).

## Contenido del Mundo 1

Datos, no código. Viven separados para poder añadir mundos sin tocar el motor ni el dominio.

| Pieza (`id`) | Depende de | Extras |
|---|---|---|
| `incomeSource` | — | — |
| `niche` | `incomeSource` | `publicLabel` |
| `audience` | `niche` | — |
| `timeAvailable` | — | — |
| `goal90Days` | `incomeSource`, `niche`, `timeAvailable` | — |

Por cada puerta: texto de la mini lección, datos útiles para la espera, instrucción para la IA y, si aplica, opciones fijas (rutas de ingreso de la factoría, opciones de tiempo semanal).

Criterios del Generalista: `clarity`, `incomeFit`, `audienceFit`, `contentCapacity`, `differentiation`, `timeAndGoalCoherence` (004/FR-035).

## Qué se conserva

*Enmienda D39.* `Inventory`, `World`, `Gate`, `PlayerContext` y `ResumePoint` se guardan juntos como `SavedGame` en el almacenamiento del navegador, detrás del puerto de guardado (`BrowserProgressStore`).

- `SavedGame.version` empieza en 1. Una partida de otra versión no se carga ni se borra: el juego avisa y ofrece empezar de nuevo (005/FR-018).
- No se guarda el estado del motor (`LevelState`, `PlayerBody`, enemigos): tras recargar, los enemigos vuelven y los corazones se llenan.
- La feature de guardado añadirá exportar e importar sobre esta misma forma.
