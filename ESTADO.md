# Canonia — Estado del proyecto

**Última actualización:** 2026-11-16
**Regla:** este archivo se lee antes de cualquier cambio y se actualiza al cerrar cada bloque de trabajo. Ver `CLAUDE.md`.

Sirve para retomar el proyecto desde cualquier sesión o IA sin depender del historial de un chat.

---

## 1. Dónde estamos

**Etapa:** especificación. No existe código del juego.

**Fase de Spec Kit:** Fases 1 (brief) y 2 (constitución v1.0.0) aprobadas. Fase 3: mapa de features aprobado (`docs-entrada/02-features.md`); faltan las specs por feature.

**Siguiente acción:** especificar la feature 3 (jefe de mundo: validación de la fase) con `speckit-specify`, en su propia rama. Con las features 1, 2 y 3 aprobadas se hace el plan técnico, que define las capas. Orden acordado: features 1, 2, 3 y 5 primero; después 4, 8, 6 y 7.

**Ramas:** `main` tiene todo lo aprobado, incluidas las specs de las features 1 y 2. Regla: mientras solo haya especificaciones, cada rama de feature se une a `main` al aprobarse; cuando haya código, se une solo después de pasar las pruebas.

**Repositorio público:** https://github.com/jucenaqui/canonia (rama `main`).

**Esperando al dueño del proyecto:** respuestas de diseño para la feature 3.

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
- [x] Mapa de features y decisiones por mundo aprobados (`docs-entrada/02-features.md`).

## 5. Pendiente

### Flujo de Spec Kit

| Fase | Salida | Estado |
|---|---|---|
| 1. Brief del producto | `docs-entrada/00-brief.md` | Aprobado (2026-11-16) |
| 2. Constitución | `.specify/memory/constitution.md` | Aprobada v1.0.0 (2026-11-16) |
| 3. Features y no-objetivos | `docs-entrada/02-features.md` y `specs/NNN-feature/spec.md` | Mapa aprobado (8 features). Specs 001 y 002 aprobadas y en `main`; faltan 003 a 008 |
| 4. Aclaración | spec actualizada | Pendiente |
| 5. Plan técnico | `plan.md` y anexos | Pendiente |
| 6. Tareas | `tasks.md` | Pendiente |
| 7. Análisis | reporte de consistencia | Pendiente |
| 8. Implementación | código | Pendiente |

Cada fase termina con un resumen y la aprobación explícita del dueño. No se encadenan fases sin aprobación.

### Otros

- [ ] Confirmar en la documentación oficial de Anthropic la restricción sobre usar la suscripción de Claude desde apps de terceros.
- [ ] Leer las etapas internas detalladas de F02, F03 y nombramiento al especificar cada mundo (ya se leyó F01 completa y las secciones clave de las demás).

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
- **La IA del juego no navega.** Dentro de Claude, la IA que usa la página no puede buscar en internet. La búsqueda del nombre es guiada en el móvil y automática solo en la app de escritorio (D25).
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
| 2026-11-16 | Se leyeron F01 completa y las secciones clave de F02, F03 y nombramiento. Borrador del mapa de features: decisiones por mundo (5, 4 y 5 puertas), 8 features, orden de construcción y no-objetivos. Pendiente de aprobación; sin commit. |
| 2026-11-16 | Corrección del dueño: el nombre debe incluir la búsqueda. Se comprobó que la IA de una página dentro de Claude no navega; se decidió búsqueda guiada en móvil y automática en la app de escritorio (D25). Mapa de features corregido; sigue pendiente de aprobación. |
| 2026-11-16 | El dueño aprobó el mapa de features, las decisiones por mundo y el orden de construcción (D26). |
| 2026-11-16 | Feature 1: el dueño decidió reaparecer sin vidas, vencer enemigos saltando encima, ayuda ofrecida tras tres fallos y tramos de 1 a 2 minutos (D27). Rama `001-motor-plataformas` creada y spec escrita: 5 historias, 34 requisitos, 8 criterios de éxito. Pendiente de aprobación; sin commit. |
| 2026-11-16 | El dueño aprobó la spec de la feature 1. Commit local en la rama `001-motor-plataformas`. |
| 2026-11-16 | Rama `001-motor-plataformas` unida a `main` y subida a GitHub. |
| 2026-11-16 | Feature 2: el dueño decidió tres tarjetas con una recomendada, mini lección de una pantalla, piezas dependientes marcadas por revisar al reabrir, y personaje con dato útil durante la espera (D28). Rama `002-puertas-decision-inventario` creada y spec escrita: 6 historias, 44 requisitos, 8 criterios de éxito. Pendiente de aprobación; sin commit. |
| 2026-11-16 | El dueño aprobó la spec de la feature 2. Rama `002-puertas-decision-inventario` unida a `main` y subida a GitHub. |
