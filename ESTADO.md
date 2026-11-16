# Canonia — Estado del proyecto

**Última actualización:** 2026-11-16
**Regla:** este archivo se lee antes de cualquier cambio y se actualiza al cerrar cada bloque de trabajo. Ver `CLAUDE.md`.

Sirve para retomar el proyecto desde cualquier sesión o IA sin depender del historial de un chat.

---

## 1. Dónde estamos

**Etapa:** especificación. No existe código del juego.

**Fase de Spec Kit:** inicializado; la Fase 1 (brief del producto) todavía no empieza.

**Siguiente acción:** escribir el brief del producto en `docs-entrada/00-brief.md` a partir de `ESPECIFICACION_JUEGO_AIIF.md`, y pedir aprobación antes de pasar a la constitución.

**Esperando al dueño del proyecto:**

1. Si se publica el repositorio en GitHub como `jucenaqui/canonia` (público). Antes de publicar: decidir si los commits llevan su correo real o la dirección anónima de GitHub.

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
| Repositorio | Público en GitHub, cuenta `jucenaqui` |
| Método | Spec Kit desde el inicio; cada decisión se registra en la especificación |

## 4. Hecho

- [x] Idea validada en conversación y especificación del juego escrita (17 decisiones registradas).
- [x] Concepto visual del tema "Dentro del teléfono" en `docs/concepto-visual/dentro-del-telefono.html`.
- [x] Factoría AIIF copiada a `factoria-aiif/` y limpiada del proyecto piloto interno.
- [x] Spec Kit inicializado (integración Claude, scripts PowerShell, extensión de git).
- [x] README, licencias, `.gitignore` y `.gitattributes`.
- [x] Repositorio git local, rama `main`, primer commit `ca9ee47`.
- [x] `ESTADO.md` y `CLAUDE.md` creados y con commit local.

## 5. Pendiente

### Flujo de Spec Kit

| Fase | Salida | Estado |
|---|---|---|
| 1. Brief del producto | `docs-entrada/00-brief.md` | Pendiente (siguiente) |
| 2. Constitución | `.specify/memory/constitution.md` | Pendiente (hoy es la plantilla en blanco) |
| 3. Features y no-objetivos | `specs/NNN-feature/spec.md` | Pendiente |
| 4. Aclaración | spec actualizada | Pendiente |
| 5. Plan técnico | `plan.md` y anexos | Pendiente |
| 6. Tareas | `tasks.md` | Pendiente |
| 7. Análisis | reporte de consistencia | Pendiente |
| 8. Implementación | código | Pendiente |

Cada fase termina con un resumen y la aprobación explícita del dueño. No se encadenan fases sin aprobación.

### Otros

- [ ] Publicar el repositorio en GitHub (requiere confirmación).
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
| 2026-11-16 | Se validó la idea, se escribió la especificación (D01–D17), se eligió nombre, mecánica, tema visual, licencias y alcance de la primera versión. Se limpió la factoría del piloto, se inicializó Spec Kit y se hizo el primer commit local (`ca9ee47`). Se creó este archivo de estado y la regla canónica de leerlo antes de cualquier cambio (D18). |
