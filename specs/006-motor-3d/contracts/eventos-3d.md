# Contrato: eventos entre el mundo 3D y la aplicación

**Feature**: 006-motor-3d · **Tarea**: T005 · **Plan**: [plan.md](../plan.md), "Contratos"

Sustituye a la sección 3 de [005/contracts/puertos.md](../../005-version-jugable-minima/contracts/puertos.md) cuando el mundo 3D reemplace al motor 2D (T042). Mientras tanto conviven los dos juegos de eventos en `src/application/events.js`. Los puertos de IA y de guardado (secciones 1 y 2 de 005) no cambian.

## Regla de oro

**Ningún evento del mundo 3D aprueba, cambia ni descarta una pieza.** El mundo 3D, la ficha y los minijuegos solo informan. Fijar una pieza sigue siendo exclusivo de `approvePiece`, llamado desde el botón "Aprobar" de la tarjeta (constitución, principio I; spec 006/FR-015, FR-043).

## Del mundo 3D a la aplicación (`WORLD3D_EVENTS`)

| Evento | Datos | Cuándo | Qué hace la aplicación |
|---|---|---|---|
| `zoneEntered` | `{ zoneId }` | El personaje entra en una zona abierta. | Pide a PIX la explicación de la zona; guarda el punto de retorno. |
| `optionInspected` | `{ zoneId, optionId }` | El jugador abre la ficha de una opción. | Nada que guardar; sirve para la ayuda de PIX. |
| `minigameFinished` | `{ zoneId, optionId, lessonId, trustDelta }` | Termina un minijuego. | Anota el minijuego como hecho y ajusta la confianza. **No aprueba.** |
| `recommendationAsked` | `{ zoneId, answers }` | El jugador respondió la pregunta jugada de "Recomiéndame". | Calcula la recomendación con los criterios del contenido y responde con `markRecommended`. |
| `chosenForApproval` | `{ zoneId, optionId }` o `{ zoneId, ownText }` | El jugador pulsó "Elegir esta", "Cambiar a esta" u "Otra". | Abre la tarjeta de aprobación. **Aún no aprueba.** |
| `sparkCollected` | `{}` | El personaje recoge una chispa. | Suma la chispa y, si toca, desbloquea un consejo (D48). |
| `playerFailed` | `{ reason: 'fall' \| 'enemy' }` | El personaje cae o lo empuja un dron. | Resta el porcentaje de chispas (D48) y cuenta el fallo para la ayuda. Nunca toca piezas. |
| `levelPaused` / `levelResumed` | `{}` | Pausa del jugador o por perder visibilidad. | Igual que en 005. |

## De la aplicación al mundo 3D (`WORLD3D_COMMANDS`)

| Comando | Datos | Efecto en el mundo |
|---|---|---|
| `openBridge` | `{ zoneId }` | Abre el camino hacia la zona indicada. |
| `lightZone` | `{ zoneId }` | Enciende el sector de la zona y su anillo del núcleo. |
| `markRecommended` | `{ zoneId, optionId }` | Pone la estrella sobre la opción recomendada. |
| `setChosen` | `{ zoneId, optionId }` | Marca la opción aprobada (pantalla encendida) y apaga las demás. |
| `showBoss` | `{ worldId }` | Hace aparecer al jefe en la plaza. |
| `say` | `{ textId, vars }` | PIX dice un texto del archivo de textos (`content/es.js` o el contenido de la zona). |

## Identificadores

- `zoneId`: el id de la pieza que decide esa zona (`incomeSource`, `niche`, `audience`, `timeAvailable`, `goal90Days` en el Mundo 1). Así la zona y la puerta del dominio comparten id.
- `optionId`: el id de la opción en el contenido de la zona (por ejemplo `ugc`, `affiliate`). Para "Otra" no hay `optionId`: se envía `ownText`.
- `lessonId`: el id de la lección del minijuego en el contenido.

## Datos que guarda la sesión (T011)

`world3d = { sparks, tipsUnlocked, minigamesDone, trust }` en la partida guardada. `minigamesDone` usa la forma `zoneId:optionId`. Las piezas "por revisar" se siguen guardando en el inventario, como en 005.
