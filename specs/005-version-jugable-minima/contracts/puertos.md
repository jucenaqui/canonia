# Contratos entre capas

Tres contratos internos. Son lo que permite que frontend y backend trabajen en paralelo sin pisarse: cada lado programa contra el contrato, no contra el código del otro.

Los nombres técnicos van en inglés. Las formas se describen como objetos JSON.

## 1. Puerto de IA (`AiPort`)

Lo define la capa de aplicación; lo implementan los adaptadores. La aplicación nunca conoce el entorno de Claude.

### `proposeOptions(request) → Promise<OptionsResult>`

```json
{
  "gateId": "niche",
  "instruction": "texto de la instrucción de la puerta, del contenido del mundo",
  "approvedPieces": { "incomeSource": "..." },
  "playerContext": { "interests": ["..."] },
  "exclude": ["textos ya mostrados en esta puerta"],
  "fixedChoices": null,
  "extrasWanted": ["publicLabel"]
}
```

Resultado correcto:

```json
{
  "ok": true,
  "options": [
    { "text": "...", "pros": "...", "risks": "...", "recommended": true, "extras": { "publicLabel": "..." } },
    { "text": "...", "pros": "...", "risks": "...", "recommended": false },
    { "text": "...", "pros": "...", "risks": "...", "recommended": false }
  ]
}
```

Reglas que el adaptador garantiza antes de devolver `ok: true`:

- De 1 a 3 opciones; si son menos de 3, la aplicación ofrece pedir otras.
- Exactamente una con `recommended: true`.
- Ningún `text` repetido ni incluido en `exclude`.
- Todos los campos son texto plano, no vacío, dentro de las longitudes máximas.
- `extras` es opcional. Solo se pide cuando la puerta lo define en su contenido, y la petición lo indica en `extrasWanted` (campo opcional, añadido en T010): en el Mundo 1, la puerta del nicho pide `publicLabel`, la etiqueta pública corta (004/FR-020). El jugador puede editarla antes de aprobar.

**Opciones fijas.** Cuando la puerta define `fixedChoices` con sus explicaciones ya escritas (en el Mundo 1, el tiempo disponible), la aplicación las muestra directamente y **no llama a la IA**. Cuando define solo la lista de valores permitidos (las rutas de ingreso de la factoría), la IA elige y explica tres de esa lista.

### `commentOnAnswer(request) → Promise<CommentResult>`

Para la respuesta escrita por el jugador (002/FR-014). Devuelve `{ "ok": true, "comment": "..." }` o `{ "ok": true, "comment": null }` si no hay nada que señalar. Nunca bloquea la aprobación.

### `recommend(request) → Promise<RecommendResult>`

Para "no sé, recomiéndame" (002/FR-016). Recibe las opciones visibles y devuelve `{ "ok": true, "index": 0, "reason": "..." }`.

### `reviewWorld(request) → Promise<ReviewResult>`

```json
{
  "worldId": "world-1",
  "criteria": [{ "id": "clarity", "description": "..." }],
  "pieces": { "niche": "...", "audience": "..." },
  "deduce": ["markets", "platforms"]
}
```

Resultado:

```json
{
  "ok": true,
  "solid": [{ "criterionId": "clarity", "explanation": "..." }],
  "observations": [{ "criterionId": "timeAndGoalCoherence", "pieceIds": ["timeAvailable", "goal90Days"], "explanation": "..." }],
  "deduced": { "markets": "...", "platforms": "..." }
}
```

El adaptador descarta las observaciones cuyo `criterionId` o `pieceIds` no existan en la petición.

### Modo guía (D37, D38)

Dos operaciones más, para cuando la IA no llega a la página. No llaman a ninguna IA: arman la pregunta y leen la respuesta que el jugador trae de otra. Solo cubren `options` y `review` (D38).

#### `guidePrompt(kind, request) → { ok: true, text }`

- `kind`: `"options"` o `"review"`.
- `request`: la misma petición de `proposeOptions` o `reviewWorld`.
- `text`: la pregunta completa en español (instrucción, datos y formato), lista para pegar en cualquier IA de chat. El formato pedido es un único bloque JSON.
- Usa la misma construcción de instrucciones que la IA directa (`prompts.js`), con el formato explicado en palabras para una IA que no conoce el juego.

#### `readGuideAnswer(kind, request, rawText) → OptionsResult | ReviewResult`

- Busca el bloque JSON dentro del texto pegado, aunque venga con texto alrededor, entre marcas de código o con comillas tipográficas.
- Lo valida con las mismas reglas que la operación directa (`validate.js`) y devuelve exactamente la misma forma de resultado.
- Si no encuentra un bloque válido, devuelve `{ ok: false, reason: "badAnswer" }`. Nunca lanza.

#### Modo de la sesión

`AiPort.mode` vale `"direct"`, `"guide"` o `"demo"`. Lo fija `main.js` al arrancar:

- `"direct"` si el entorno entrega la IA a la página.
- `"guide"` si no la entrega.
- `"demo"` fuera de Claude. El adaptador de demostración también puede simular `"guide"` para las pruebas.

Si en modo `"direct"` una llamada devuelve `unavailable` (permiso negado), la aplicación pasa la sesión a `"guide"` y no vuelve a llamar a la IA directa hasta recargar.

### Errores (comunes a las cuatro operaciones)

Nunca se lanza una excepción hacia la aplicación. Se devuelve:

```json
{ "ok": false, "reason": "unavailable" }
```

| `reason` | Cuándo | Qué hace la aplicación |
|---|---|---|
| `unavailable` | No hay IA en esta vista, o el jugador negó el permiso | Pasa la sesión al modo guía y lo explica una vez; no vuelve a pedir permiso. Escribir la propia respuesta sigue disponible |
| `badAnswer` | Solo en modo guía: el texto pegado no trae un bloque válido | Personaje explica qué pedirle a la IA; conserva el texto pegado |
| `busy` | Demasiadas llamadas | Personaje explica; ofrece reintentar más tarde |
| `failed` | Fallo, respuesta con forma inválida o contenido descartado | Personaje explica; ofrece reintentar |
| `cancelled` | El jugador salió de la puerta | Nada |

La aplicación nunca reintenta sola: solo tras un toque del jugador.

### Adaptadores

- `ClaudeSampleAdapter`: usa la capacidad `sample` del entorno. Nivel rápido para opciones, comentario y recomendación; nivel normal para la revisión. Implementa `guidePrompt` y `readGuideAnswer` con el módulo compartido `guide.js`.
- `DemoAiAdapter`: respuestas preparadas, para desarrollo, pruebas y modo de demostración. Usa el mismo `guide.js`, de modo que el modo guía se prueba sin Claude.

`prompts.js`, `validate.js` y `guide.js` son módulos compartidos de `src/adapters/ai/`: la IA directa y el modo guía arman y validan igual.

## 2. Puerto de guardado (`ProgressStore`)

```text
load() → Promise<SavedGame | null>
save(game: SavedGame) → Promise<void>
```

`SavedGame` contiene `version`, `inventory`, `worlds`, `gates`, `playerContext` y `resume`, con las formas de `data-model.md`. No incluye el estado del nivel en curso.

- Dos adaptadores (D39):
  - `BrowserProgressStore`: guarda en el almacenamiento del navegador, con una sola clave propia del juego, como JSON. Es el que usa `main.js` dentro de Claude.
  - `MemoryProgressStore`: para pruebas y como respaldo cuando el navegador no deja guardar.
- `save` no falla hacia la aplicación: un fallo de guardado no puede romper una aprobación ya hecha en memoria. Devuelve `{ ok: true }` o `{ ok: false, reason: "unavailable" }`, para que la aplicación avise una vez.
- `load` devuelve `null` si no hay partida, `{ error: "unreadable" | "otherVersion" }` si hay datos que no entiende, y `{ error: "unavailable" }` si el navegador no deja leer; en ese caso `main.js` usa `MemoryProgressStore` y la partida avisa que no puede guardar. No borra nada: solo `clear()`, tras la confirmación del jugador, borra la partida.
- `clear() → Promise<void>`: para "empezar de nuevo".

## 3. Eventos entre el motor y la aplicación

El motor (presentación) no llama al dominio. Se comunica con la aplicación por eventos.

### Del motor a la aplicación

| Evento | Datos | Significado |
|---|---|---|
| `gateReached` | `gateId` | El personaje tocó una puerta sin resolver. El motor ya se detuvo. |
| `bossReached` | `worldId` | El personaje llegó al final del nivel. |
| `bossDefeated` | `worldId`, `skipped` | Pelea ganada o saltada con la ayuda. |
| `levelPaused` / `levelResumed` | — | Pausa por el jugador o por perder visibilidad. |

### De la aplicación al motor

| Orden | Datos | Significado |
|---|---|---|
| `resumeLevel` | — | La puerta quedó resuelta o el jugador la cerró; se reanuda. |
| `startBossFight` | `worldId` | Las reglas de acceso al jefe se cumplen. |
| `denyBoss` | `reason`, `pieceIds` | Falta una pieza o hay piezas por revisar; el motor lleva al jugador a su puerta. |
| `setGateResolved` | `gateId` | Para que el motor no vuelva a detenerse en ella. |
| `worldClosed` | `worldId` | El jugador aprobó el resumen. El mapa muestra el mundo como completado (003/FR-027). |

Reglas:

- Fallos, corazones, puntos seguros, enemigos y modo de ayuda **no generan eventos hacia el dominio**: son estado del motor. Así se garantiza que fallar no toca el inventario (001/FR-018).
- El modo de ayuda puede saltar un tramo o la pelea; nunca emite `gateReached` resuelto ni salta una puerta (001/FR-027).

## Casos de uso de la aplicación

Lo que la interfaz puede pedir. Cada uno devuelve el nuevo estado visible o un error con `reason`.

| Caso de uso | Requisitos principales |
|---|---|
| `openGate(gateId)` | 002/FR-001 |
| `completeLesson(gateId)` | 002/FR-003 |
| `requestOptions(gateId, { fresh })` | 002/FR-004 a FR-011 |
| `askRecommendation(gateId)` | 002/FR-016, FR-017 |
| `submitOwnAnswer(gateId, text)` | 002/FR-013 a FR-015 |
| `approvePiece(gateId, { text, origin, extras })` | 002/FR-018 a FR-024 |
| `closeGate(gateId)` | 002/FR-025 |
| `viewInventory()` | 002/FR-026 a FR-028 |
| `reopenPiece(pieceId)` | 002/FR-030 a FR-036 |
| `setInterests(list)` | 004/FR-010 a FR-013 |
| `requestBoss(worldId)` | 003/FR-001 a FR-003 |
| `runReview(worldId)` | 003/FR-010 a FR-016 |
| `acceptObservation(worldId, criterionId)` | 003/FR-019 |
| `confirmDeducedData(worldId, data)` | 003/FR-014 |
| `approveSummary(worldId)` | 003/FR-022 a FR-027 |
| `aiMode()` | 005/FR-006 |
| `loadSavedGame()` / `continueSavedGame()` / `startNewGame()` | 005/FR-015, FR-016, FR-018 |
| `getGuidePrompt(gateId)` / `getGuideReviewPrompt(worldId)` | 005/FR-007, FR-011 |
| `submitGuideAnswer(gateId, rawText)` / `submitGuideReview(worldId, rawText)` | 005/FR-008, FR-009 |

En modo guía, `askRecommendation` usa la opción ya recomendada sin llamar a la IA, y `submitOwnAnswer` no pide comentario (005/FR-010).

Guardado (005/FR-014): `approvePiece`, `setInterests`, `acceptObservation`, `approveSummary` y `getGuidePrompt` / `getGuideReviewPrompt` llaman a `ProgressStore.save` al terminar. `getGuidePrompt` guarda **antes** de devolver la pregunta, con `resume` apuntando a esa puerta.
