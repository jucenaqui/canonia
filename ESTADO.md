# Canonia — Estado del proyecto

**Última actualización:** 2026-11-16
**Regla:** este archivo se lee antes de cualquier cambio y se actualiza al cerrar cada bloque de trabajo. Ver `CLAUDE.md`.

Sirve para retomar el proyecto desde cualquier sesión o IA sin depender del historial de un chat.

---

## 1. Dónde estamos

**Etapa:** especificación. No existe código del juego.

**Fase de Spec Kit:** Fase 1 (brief) aprobada. Fase 2 (constitución v1.0.0) aprobada. Fase 3 (features) por empezar.

**Siguiente acción:** Fase 3, features y no-objetivos. Primer paso: leer a fondo las especificaciones F01, F02 y F03 de la factoría para definir las 3 a 5 decisiones de cada mundo. Una spec por feature, en una rama por feature.

**Repositorio público:** https://github.com/jucenaqui/canonia (rama `main`).

**Esperando al dueño del proyecto:** nada bloqueante. Ver preguntas abiertas en la sección 6.

## 2. Qué es Canonia

Juego didáctico de plataformas, por mundos, donde el jugador termina con un influencer virtual completamente creado. Cada mundo es una fase de AI Influencer Factory (AIIF, F01–F13). Para personas sin conocimientos previos que quieren crear contenido en redes sociales.

El detalle y las decisiones están en `ESPECIFICACION_JUEGO_AIIF.md`. Ese archivo es la fuente de verdad del producto; este solo resume el estado.

## 3. Decisiones vigentes (resumen)

El registro completo, con número y fecha, está en la sección 14 de la especificación.

| Tema | Decisión |
|---|---|
| Nombre | Canonia. Subtítulo propuesto, sin aprobar: "Crea tu influencer" |
| Mecánica | Plataformas clásico con mapa de mundos; puertas de decisión; jefe de mundo = validador de la fase |
| Tema visual | "Dentro del teléfono": publicaciones como plataformas, corazones, trolls, el algoritmo como jefe |
| Plataformas | Móvil primero; web después |
| IA | Primera versión dentro de Claude (usa el plan del jugador); después, versión con API |
| Primera versión | Mundos 1 a 3 (nicho, concepto, nombre y biografía); solo influencer virtual; 3 a 5 decisiones por mundo |
| Después del juego | Cursos, capacitaciones y diplomados |
| Modelo | Código abierto; contribuciones económicas voluntarias |
| Licencias | MIT (código) y CC BY-SA 4.0 (contenido) |
| Repositorio | Público en GitHub: `jucenaqui/canonia` |
| Método | Spec Kit desde el inicio; cada decisión se registra en la especificación |

## 4. Hecho

- [x] Idea validada en conversación y especificación del juego escrita (17 decisiones registradas).
- [x] Concepto visual del tema "Dentro del teléfono" en `docs/concepto-visual/dentro-del-telefono.html`.
- [x] Factoría AIIF copiada a `factoria-aiif/` y limpiada del proyecto piloto interno.
- [x] Spec Kit inicializado (integración Claude, scripts PowerShell, extensión de git).
- [x] README, licencias, `.gitignore` y `.gitattributes`.
- [x] Repositorio git local, rama `main`, primer commit `ca9ee47`.
- [x] `ESTADO.md` y `CLAUDE.md` creados.
- [x] Repositorio publicado en GitHub como `jucenaqui/canonia`, público.
- [x] Brief del producto aprobado (`docs-entrada/00-brief.md`).
- [x] Constitución v1.0.0 aprobada (`.specify/memory/constitution.md`).

## 5. Pendiente

### Flujo de Spec Kit

| Fase | Salida | Estado |
|---|---|---|
| 1. Brief del producto | `docs-entrada/00-brief.md` | Aprobado (2026-11-16) |
| 2. Constitución | `.specify/memory/constitution.md` | Aprobada v1.0.0 (2026-11-16) |
| 3. Features y no-objetivos | `specs/NNN-feature/spec.md` | Pendiente (siguiente) |
| 4. Aclaración | spec actualizada | Pendiente |
| 5. Plan técnico | `plan.md` y anexos | Pendiente |
| 6. Tareas | `tasks.md` | Pendiente |
| 7. Análisis | reporte de consistencia | Pendiente |
| 8. Implementación | código | Pendiente |

Cada fase termina con un resumen y la aprobación explícita del dueño. No se encadenan fases sin aprobación.

### Otros

- [ ] Confirmar en la documentación oficial de Anthropic la restricción sobre usar la suscripción de Claude desde apps de terceros.
- [ ] Leer a fondo las especificaciones F01–F03 de la factoría antes de diseñar los mundos 1 a 3 (hasta ahora solo se revisó su estructura).

## 6. Preguntas abiertas

1. Nombre del personaje y aprobación del subtítulo.
2. Diseño del protagonista (el del concepto visual es provisional).
3. Nombre y variación visual de cada mundo.
4. Guardado de progreso y cuentas de usuario en la versión dentro de Claude.
5. Medio para las contribuciones voluntarias (por ejemplo GitHub Sponsors o Ko-fi).
6. Si el "modo guía" (copiar y pegar en cualquier IA) entra y en qué versión.
7. Reglas de puntos, niveles y catálogo de habilidades.
8. Ideas del dueño para la etapa posterior al juego, aún sin contar.

## 7. Mapa del repositorio

| Ruta | Qué es |
|---|---|
| `ESTADO.md` | Este archivo: estado actual y siguiente acción |
| `ESPECIFICACION_JUEGO_AIIF.md` | Especificación del producto y registro de decisiones |
| `CLAUDE.md` | Reglas de trabajo para la IA |
| `docs-entrada/00-brief.md` | Brief del producto (Fase 1 de Spec Kit) |
| `docs/concepto-visual/` | Concepto visual aprobado como dirección |
| `factoria-aiif/AI_INFLUENCER_FACTORY_PORTABLE_v1.0.2/` | Metodología AIIF, edición pública. Punto de entrada: `30_PORTABILIDAD/30_06_ACTIVACION/` |
| `.specify/` | Plantillas, scripts y memoria de Spec Kit |
| `.claude/skills/speckit-*` | Comandos de Spec Kit |

## 8. Cosas que no se deben romper

- **El piloto no vuelve al repositorio.** La factoría es genérica: sin proyecto de influencer específico, sin sus imágenes, videos ni evidencias. El zip original completo queda fuera del repositorio, en poder del dueño.
- **Arte y personajes propios.** Se toma el género de plataformas, no un juego existente. El tema visual no debe parecerse a ninguna red social concreta.
- **Las decisiones del influencer nunca se toman por reflejo.** Todo lo definitivo pasa por una aprobación explícita del jugador.
- **Finales de línea LF.** El manifiesto de la factoría guarda huellas sha256 de cada archivo; `.gitattributes` las mantiene válidas. Si se edita un archivo de `factoria-aiif/`, hay que regenerar `FOLDER_STRUCTURE_MANIFEST_v1.0.json`, `FOLDER_TREE_v1.0.txt` y el árbol dentro del documento de estructura.
- **Restricción de IA.** Una app propia para el público no puede usar la suscripción de Claude de cada jugador; por eso la primera versión vive dentro de Claude.

## 9. Bitácora

| Fecha | Qué pasó |
|---|---|
| 2026-11-16 | Se validó la idea, se escribió la especificación (D01–D17), se eligió nombre, mecánica, tema visual, licencias y alcance de la primera versión. Se limpió la factoría del piloto, se inicializó Spec Kit y se hizo el primer commit local (`ca9ee47`). Se creó este archivo de estado y la regla canónica de leerlo antes de cualquier cambio (D18). El repositorio se publicó en GitHub como `jucenaqui/canonia`. |
| 2026-11-16 | Se escribió el borrador del brief del producto (`docs-entrada/00-brief.md`). Pendiente de aprobación; sin commit. |
| 2026-11-16 | El dueño aprobó el brief del producto. Fase 1 de Spec Kit cerrada; sigue la constitución. |
| 2026-11-16 | Primer bloque de respuestas para la constitución registrado. Brief y estado con commit en `main` y subidos a GitHub. |
| 2026-11-16 | Segundo bloque de respuestas: arquitectura por capas con subagentes en paralelo (PM, arquitecto, arquitecto de seguridad, frontend, backend, QA), errores explicados por un personaje, pruebas obligatorias de decisión e inventario, juego en español y código en inglés. El backend es una capa interna, sin servidor. Constitución v1.0.0 redactada. |
| 2026-11-16 | El dueño aprobó la constitución v1.0.0. Fase 2 cerrada; sigue la Fase 3 (features). |
