# Canonia — Reglas de trabajo

## Regla canónica: leer antes de cambiar

Antes de hacer cualquier cambio en este proyecto, lee en este orden:

1. `ESTADO.md` — dónde estamos, qué falta y cuál es la siguiente acción.
2. `ESPECIFICACION_JUEGO_AIIF.md` — qué es el producto y qué decisiones están tomadas.

No dependas del historial de un chat. Si algo no está en esos dos archivos, no está decidido: pregúntale al dueño del proyecto.

## Mantener el estado al día

Al cerrar cada bloque de trabajo, en el mismo cambio:

- **Decisión nueva del dueño:** añádela al registro de decisiones de la especificación (sección 14, siguiente número `Dnn`, con fecha) y cambia su marca a **[Decidido]** donde corresponda.
- **`ESTADO.md`:** actualiza la fecha, "Dónde estamos", la siguiente acción, lo hecho, lo pendiente, las preguntas abiertas y añade una línea a la bitácora.

Un cambio que no deja `ESTADO.md` al día no está terminado.

## La especificación manda

- No se escribe código que la especificación no documente.
- Las marcas **[Decidido]**, **[Propuesto]** y **[Abierto]** de la especificación se respetan: solo el dueño convierte algo en decidido.
- Si una instrucción contradice una decisión registrada, detente, avisa y propón actualizar la especificación antes de tocar nada.

## Flujo de Spec Kit

Se sigue el ciclo brief → constitución → features → aclaración → plan → tareas → análisis → implementación. Cada fase termina con un resumen y la aprobación explícita del dueño; no se encadenan fases.

## Git

- Nada de commit, push, merge, rebase ni borrado de ramas sin un "sí" explícito del dueño, dado en el momento.
- Publicar en GitHub es un paso aparte que siempre se confirma.
- No trabajar directo sobre `main` para features; usar una rama por fase o por feature.

## Límites del repositorio

- No añadir el proyecto piloto ni datos de ningún influencer específico a `factoria-aiif/`.
- No añadir datos personales, credenciales ni rutas locales del dueño.
- Arte, personajes y música propios; no recrear un juego existente ni imitar una red social concreta.
- Si editas un archivo dentro de `factoria-aiif/`, regenera su manifiesto y su árbol (ver `ESTADO.md`, sección 8).

## Idioma

Documentos y conversación en español. Los identificadores técnicos pueden quedar en inglés.

## Modelos

Decisión del dueño (2026-11-26): Opus para todo lo del plan (especificación, plan técnico, tareas, análisis y revisiones de arquitectura y seguridad) y Sonnet para programar. Por eso los subagentes `pm`, `arquitecto` y `seguridad` usan Opus, y `frontend`, `backend` y `qa` usan Sonnet (campo `model` en `.claude/agents/`). Las tareas de programación se delegan a esos subagentes.
