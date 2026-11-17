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
  "fixedChoices": null
}
```

Resultado correcto:

```json
{
  "ok": true,
  "options": [
    { "text": "...", "pros": "...", "risks": "...", "recommended": true },
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

### Errores (comunes a las cuatro operaciones)

Nunca se lanza una excepción hacia la aplicación. Se devuelve:

```json
{ "ok": false, "reason": "unavailable" }
```

| `reason` | Cuándo | Qué hace la aplicación |
|---|---|---|
| `unavailable` | No hay IA en esta vista, o el jugador negó el permiso | Ofrece escribir la propia respuesta; no vuelve a pedir permiso |
| `busy` | Demasiadas llamadas | Personaje explica; ofrece reintentar más tarde |
| `failed` | Fallo, respuesta con forma inválida o contenido descartado | Personaje explica; ofrece reintentar |
| `cancelled` | El jugador salió de la puerta | Nada |

La aplicación nunca reintenta sola: solo tras un toque del jugador.

### Adaptadores

- `ClaudeSampleAdapter`: usa la capacidad `sample` del entorno. Nivel rápido para opciones, comentario y recomendación; nivel normal para la revisión.
- `DemoAiAdapter`: respuestas preparadas, para desarrollo, pruebas y modo de demostración.

## 2. Puerto de guardado (`ProgressStore`)

```text
load() → Promise<SavedGame | null>
save(game: SavedGame) → Promise<void>
```

`SavedGame` contiene `version`, `inventory`, `worlds`, `gates` y `playerContext`, con las formas de `data-model.md`. No incluye el estado del nivel en curso.

- En esta entrega solo existe `MemoryProgressStore`.
- `save` no falla hacia la aplicación: un fallo de guardado no puede romper una aprobación ya hecha en memoria.

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
