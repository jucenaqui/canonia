# Canonia — Estado del proyecto

**Última actualización:** 2026-11-25
**Regla:** este archivo se lee antes de cualquier cambio y se actualiza al cerrar cada bloque de trabajo. Ver `CLAUDE.md`.

Sirve para retomar el proyecto desde cualquier sesión o IA sin depender del historial de un chat.

---

## 1. Dónde estamos

**Etapa:** implementación. Fase 0 (prueba técnica) cerrada con el ajuste aprobado en D40. Fase 1 (preparación) hecha. Fase 2 (cimientos) hecha: puertos, eventos, prueba de arquitectura, dominio (pieza, inventario, puerta, mundo, observación), sesión con guardado en el navegador, adaptador de IA de demostración, textos comunes, estilos y `main.js`. Fases 3 y 4 hechas (salvo medir el tramo, T033): motor de plataformas (física a paso fijo, controles táctiles y de teclado, cámara, nivel con puntos seguros y puertas, dibujo y personaje provisional, pausa), flujo de una puerta con IA directa y modo guía, adaptador de Claude, pantallas de inicio, puerta y pausa. Hay un **tramo de prueba jugable** en modo de demostración (`src/content/test-world.js`, dos puertas), que se sustituye por el Mundo 1 en T076. `node --test`: 142 pruebas, 141 pasan, 1 pendiente del jefe (T060), ninguna falla. Existe la página de prueba en `spike/`.

**Fase de Spec Kit:** fases 1 a 7 hechas para la versión jugable mínima: brief, constitución v1.0.0, mapa de features, specs 001 a 004, plan técnico, tareas y análisis de consistencia con sus correcciones. Tras la prueba técnica, el plan se ajustó con el modo guía y el guardado en el navegador (D37 a D40): 95 tareas. Falta la fase 8, implementación. Quedan sin especificar: mapa y progreso, Mundo 2, Mundo 3, guardado y exportación.

**Cambio de rumbo (D46, 2026-11-24):** el dueño eligió un **mundo 3D abierto con cámara detrás** en lugar del plataformas de lado, tras probar una maqueta con tres vistas (https://claude.ai/artifact/7XkP3mU9C9yEk7ufj6EQec) y un PIX en 3D generado con Magnific. Afecta al motor 2D de las fases 3 y 4, al plan técnico (D33, sin dependencias) y al arte (D45). Cómo se construye quedó decidido en D50. Además (D47) las decisiones se toman jugando: cada pregunta de la fase es una zona del distrito con acciones, confirmada con aprobación. Se está validando con una maqueta jugable del Mundo 1 (https://claude.ai/artifact/2vwqHYCpUEnEZ3VqRRoV94).

**Especificación del motor 3D (2026-11-25):** `specs/006-motor-3d/spec.md`, rama `006-motor-3d`, **aprobada (D50)**. Reemplaza a la feature 1. Chispas en D48, enemigos en D49, y three.js, qué se conserva y el arte 3D en D50. Sigue el plan técnico del motor 3D, con el sí del dueño.

**Siguiente acción:** el dueño prueba el tramo de prueba (`python -m http.server 8000` en la raíz y abrir `http://localhost:8000`, en el ordenador o en el teléfono de la misma red): moverse, saltar, llegar a las dos puertas, decidir y aprobar; y mide cuánto tarda (T033). Con su visto bueno y su sí, commit de las fases 3 y 4. Después, las fases 5 y 6: fallos, enemigos y ayuda; inventario, reabrir, espera y errores.

**Página de prueba técnica (T001, T002):** publicada en privado dentro de Claude: https://claude.ai/artifact/AH1p3NJ4JsPEqhUePo2boB. Solo la ve el dueño hasta que la comparta desde el menú Compartir de la página. Archivos: `spike/index.html`, `spike/main.js`, `spike/extra.js`. `spike/preview-local.html` es solo para verla en local y no se publica.

**Rama de trabajo actual:** `005-version-jugable-minima`. La prueba técnica y sus resultados están en `main` y en GitHub.

**Numeración:** las carpetas de `specs/` siguen el orden en que se especifica, no el número del mapa de features. `004-mundo-1-nicho` es la feature 5 del mapa.

**Ramas:** `main` tiene todo lo aprobado: specs 001 a 004, el plan técnico y las tareas (005) con el ajuste de D37 a D40, la prueba técnica con sus resultados y los seis subagentes. Regla: mientras solo haya especificaciones, cada rama de feature se une a `main` al aprobarse; cuando haya código, se une solo después de pasar las pruebas.

**Repositorio público:** https://github.com/jucenaqui/canonia (rama `main`).

**Esperando al dueño del proyecto:** que pruebe el tramo jugable y dé su sí para el commit de las fases 3 y 4; y tras D45 (arte en dos pasos): ver el redibujo por código de The Influence Foundry y generar las ilustraciones del encargo `docs/arte/encargo-ilustraciones.md`, que reemplazarán al código pieza por pieza. El lienzo de direcciones de arte (https://claude.ai/artifact/JRHu7tgVV6xqwyozQfCaco) queda superado por D41. Las fases 1 a 4 y las decisiones D41 a D44 están en los commits `9a3234d`, `83ec0ad` y `50cfa99` de la rama `005-version-jugable-minima`, subida a GitHub y sin unir a `main`; con código en la rama, se une a `main` solo cuando pasen las pruebas. El cierre de la Fase 0 (commit `685e6ae`) está en `main` y en GitHub.

**Para compartir la página de prueba:** activar el enlace público desde el menú Compartir; si sigue privada, otras cuentas ven "Page not found".

## 2. Qué es Canonia

Juego didáctico de plataformas, por mundos, donde el jugador termina con un influencer virtual completamente creado. Cada mundo es una fase de AI Influencer Factory (AIIF, F01–F13). Para personas sin conocimientos previos que quieren crear contenido en redes sociales.

El detalle y las decisiones están en `ESPECIFICACION_JUEGO_AIIF.md`. Ese archivo es la fuente de verdad del producto; este solo resume el estado.

## 3. Decisiones vigentes (resumen)

El registro completo, con número y fecha, está en la sección 14 de la especificación.

| Tema | Decisión |
|---|---|
| Nombre | Canonia. Subtítulo propuesto, sin aprobar: "Crea tu influencer" |
| Mecánica | Plataformas en un mundo 3D abierto con cámara detrás (D46, enmienda D07) y mapa de mundos; cada pregunta de la fase es una zona donde se decide jugando, con aprobación explícita (D47, enmienda D28); jefe de mundo = validador de la fase |
| Camino técnico | Primero dentro de Claude, después con servidor (D06, confirmado en D34) |
| Búsqueda del nombre | Guiada para todos; la automática queda para la versión con servidor (D31) |
| Mundo y arte | The Influence Foundry (D41, reemplaza a "Dentro del teléfono"): PIX Central es el mapa, cada distrito un mundo de plataformas; PIX es el guía; Avatar Smith y Prompt Mechanic, maestros de distrito. Arte futurista luminoso y premium, público adulto |
| Plataformas | Móvil primero; web después |
| IA | Central en el juego. Primera versión dentro de Claude: IA directa si la cuenta del jugador la ofrece; si no, modo guía con cualquier IA gratuita (D37). Después, versión con API |
| Guardado | Automático en el almacenamiento del navegador desde la versión jugable mínima (D39). Exportar e importar, en su propia feature |
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
| 3. Features y no-objetivos | `docs-entrada/02-features.md` y `specs/NNN-feature/spec.md` | Mapa aprobado (8 features). Specs 001 a 004 aprobadas y en `main` (versión jugable mínima). Spec 006 (motor 3D, reemplaza a la 001) aprobada el 2026-11-25 (D50); falta enmendar 002 y 004 para D47. Faltan: mapa y progreso, Mundo 2, Mundo 3, guardado y exportación |
| 4. Aclaración | spec actualizada | Pendiente |
| 5. Plan técnico | `specs/005-version-jugable-minima/plan.md` y anexos | Aprobado (2026-11-16) |
| 6. Tareas | `specs/005-version-jugable-minima/tasks.md` | Aprobado (82 tareas, 2026-11-16); ajustado tras la prueba técnica a 95 tareas (D40, 2026-11-17) |
| 7. Análisis | reporte de consistencia | Hecho (2026-11-16): sin conflictos con la constitución; diez hallazgos corregidos |
| 8. Implementación | código | En curso: Fase 0 cerrada (D40); sigue la Fase 1 |

Cada fase termina con un resumen y la aprobación explícita del dueño. No se encadenan fases sin aprobación.

### Otros

- [x] Confirmada (2026-11-17) la restricción: una app propia con servidor no puede usar la suscripción de Claude del jugador (Free, Pro o Max), ni ofrecer "iniciar sesión con Claude". Las apps de terceros usan claves de API, que se pagan por uso. Fuente: https://code.claude.com/docs/en/legal-and-compliance.md
- [ ] Leer las etapas internas detalladas de F02, F03 y nombramiento al especificar cada mundo (ya se leyó F01 completa y las secciones clave de las demás).

## 6. Preguntas abiertas

1. Nombre del personaje y aprobación del subtítulo.
2. Diseño del protagonista (el del concepto visual es provisional).
3. Nombre y variación visual de cada mundo.
4. Guardado de progreso y cuentas de usuario en la versión dentro de Claude. *En parte resuelta por D39 (guardado en el navegador); siguen abiertas las cuentas y el paso a otro dispositivo.*
5. Medio para las contribuciones voluntarias (por ejemplo GitHub Sponsors o Ko-fi).
6. ~~Si el "modo guía" entra y en qué versión.~~ Resuelta en D37: entra en la primera versión.
7. Reglas de puntos, niveles y catálogo de habilidades. *En parte resuelta por D48: las chispas desbloquean consejos de PIX y se pierden en parte al fallar; el Creator Market queda para el Mundo 6.*
8. Ideas del dueño para la etapa posterior al juego, aún sin contar.
9. ~~La IA no llega a otras cuentas dentro de Claude.~~ Resuelta en D37 (IA directa + modo guía). Contexto: **(T004, 2026-11-17).** Con la segunda cuenta, la página no recibe la IA. La cuenta era gratuita, así que la causa más probable es el plan gratuito (no descartado del todo: entrar desde fuera de la organización del dueño). Afecta a D06 y D34. Caminos posibles, a decidir por el dueño: exigir una cuenta de pago para la IA, jugar sin IA con respuestas escritas por el jugador, o adelantar la versión con servidor.
10. ~~**(D46)** Herramienta para el 3D: three.js en el navegador (propuesto, mantiene el juego dentro de Claude y en el teléfono) u otra. Rompe la regla "sin dependencias" del plan técnico (D33).~~ Resuelta en D50.
11. ~~**(D46)** Qué pasa con el motor 2D ya hecho (fases 3 y 4): se reemplaza, o se conserva lo que sirve (puertas, guardado, IA, pantallas y dominio no dependen de la vista).~~ Resuelta en D50.
12. ~~**(D46)** Cómo se produce el arte 3D: generado con IA (Magnific, como el PIX de prueba) a partir del encargo de `docs/arte/`, o de otra forma. El encargo actual está pensado para 2D.~~ Resuelta en D50.
13. ~~**(D46)** Orden de trabajo: nueva spec del motor 3D (enmienda de la 001) y plan técnico ajustado antes de programar, siguiendo Spec Kit.~~ Resuelta en D50.

## 7. Mapa del repositorio

| Ruta | Qué es |
|---|---|
| `ESTADO.md` | Este archivo: estado actual y siguiente acción |
| `ESPECIFICACION_JUEGO_AIIF.md` | Especificación del producto y registro de decisiones |
| `CLAUDE.md` | Reglas de trabajo para la IA |
| `docs-entrada/00-brief.md` | Brief del producto (Fase 1 de Spec Kit) |
| `docs/concepto-visual/` | Concepto visual aprobado como dirección |
| `docs/arte/3d/` | Modelos 3D generados con IA (personajes y piezas del Mundo 1) y código de las maquetas jugables de D46 y D47 |
| `factoria-aiif/AI_INFLUENCER_FACTORY_PORTABLE_v1.0.2/` | Metodología AIIF, edición pública. Punto de entrada: `30_PORTABILIDAD/30_06_ACTIVACION/` |
| `.specify/` | Plantillas, scripts y memoria de Spec Kit |
| `.claude/skills/speckit-*` | Comandos de Spec Kit |
| `.claude/agents/` | Los seis subagentes: pm, arquitecto, seguridad, frontend, backend, qa |
| `specs/` | Una carpeta por especificación; `005` reúne las cuatro primeras y tiene el plan técnico |

## 8. Cosas que no se deben romper

- **El piloto no vuelve al repositorio.** La factoría es genérica: sin proyecto de influencer específico, sin sus imágenes, videos ni evidencias. El zip original completo queda fuera del repositorio, en poder del dueño.
- **Arte y personajes propios.** Se toma el género de plataformas, no un juego existente. El tema visual no debe parecerse a ninguna red social concreta.
- **Las decisiones del influencer nunca se toman por reflejo.** Todo lo definitivo pasa por una aprobación explícita del jugador.
- **Finales de línea LF.** El manifiesto de la factoría guarda huellas sha256 de cada archivo; `.gitattributes` las mantiene válidas. Si se edita un archivo de `factoria-aiif/`, hay que regenerar `FOLDER_STRUCTURE_MANIFEST_v1.0.json`, `FOLDER_TREE_v1.0.txt` y el árbol dentro del documento de estructura.
- **Solo el dueño de la página usa servidores del dispositivo.** Por eso el navegador de la app de Claude no sirve para los jugadores.
- **Los visitantes de fuera no escriben en la base de datos del entorno.** No sirve para guardar partidas de jugadores públicos.
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
| 2026-11-16 | Feature 3: el dueño decidió pelea corta de plataformas y después revisión; ante un problema el jefe avisa y el jugador decide; la recompensa al cerrar es el resumen de lo creado (D29). Rama `003-jefe-mundo-validacion` creada y spec escrita: 4 historias, 33 requisitos, 8 criterios de éxito. Pendiente de aprobación; sin commit. |
| 2026-11-16 | El dueño aprobó la spec de la feature 3. Rama `003-jefe-mundo-validacion` unida a `main` y subida a GitHub. Quedan especificadas las tres piezas centrales. |
| 2026-11-16 | Mundo 1: el dueño decidió que es la pestaña Explorar, que el jefe es el Generalista y que el jugador elige sus intereses con toques antes de la primera puerta (D30). Rama `004-mundo-1-nicho` creada y spec escrita: 5 historias, 40 requisitos, 8 criterios de éxito. Pendiente de aprobación; sin commit. |
| 2026-11-16 | El dueño aprobó la spec del Mundo 1. Rama `004-mundo-1-nicho` unida a `main` y subida a GitHub. La versión jugable mínima queda especificada completa. |
| 2026-11-16 | Plan técnico escrito en la rama `005-version-jugable-minima`: investigación del entorno de Claude, modelo de datos, contratos, plan y guía de validación. Creados los seis subagentes en `.claude/agents/`. Dos hallazgos del entorno contradicen supuestos anteriores (búsqueda automática y guardado). Pendiente de aprobación; sin commit. |
| 2026-11-16 | El dueño preguntó por pasar a una app con servidor; tras ver el costo decidió seguir con lo planeado (D34). Aprobado el plan técnico (D33), enmendada la búsqueda del nombre a guiada para todos (D31) y aceptados los tres añadidos de la entrega (D32). Con el sí explícito del dueño, la rama `005-version-jugable-minima` se unió a `main` y se subió a GitHub. |
| 2026-11-16 | Lista de tareas escrita: 82 tareas en 10 fases, cada una con su subagente dueño y sus archivos. La Fase 0 es la prueba técnica dentro de Claude. Pendiente de aprobación; sin commit. |
| 2026-11-16 | El dueño aprobó la lista de tareas (D35). Unida a `main` y subida a GitHub. |
| 2026-11-16 | Análisis de consistencia: sin conflictos con la constitución; 150 de 156 requisitos tenían tarea. Diez hallazgos corregidos: puntos de aprendizaje aplazados (D36), etiqueta pública del nicho en el contrato de IA, evento de mundo cerrado, tareas y pruebas que faltaban del jefe, requisito de contenido inapropiado reescrito como comprobable, opciones de tiempo fijas, carpeta de prueba técnica declarada como temporal, y una línea atrasada de este archivo. Unido a `main` y subido a GitHub con el sí del dueño. |
| 2026-11-17 | T001 hecho: página de prueba técnica en `spike/`, revisada en local en tamaño de teléfono (módulos, controles y almacenamiento funcionan; la IA no se puede probar fuera de Claude). T002: publicada en privado dentro de Claude con la capacidad de IA; compartirla queda en manos del dueño. Sin commit. |
| 2026-11-17 | T003: el dueño probó la página en su teléfono. Confirmado: módulos enlazados, 64 cuadros por segundo, IA rápida con tres opciones válidas en 3,0 s, almacenamiento del navegador. No verificado: negar el permiso (Claude recuerda la decisión). Resultados en `specs/005-version-jugable-minima/spike-resultados.md`. Sin commit. |
| 2026-11-17 | El dueño confirmó que los botones táctiles mueven y hacen saltar el cuadro. |
| 2026-11-17 | El dueño tiene una segunda cuenta para T004. Prueba técnica y resultados con commit, unidos a `main` y subidos a GitHub con su sí. |
| 2026-11-17 | T004 con la segunda cuenta: la página abre por enlace público, carga sus módulos y va a 60 cuadros por segundo, pero la IA no está disponible y Claude no pide permiso. Anotado como pregunta abierta 9; sin commit. |
| 2026-11-17 | Confirmado que un servidor propio no puede usar la suscripción del jugador. El dueño decide D37: IA directa cuando la cuenta la ofrece y, si no, modo guía con cualquier IA gratuita, ya en la primera versión. Sin commit. |
| 2026-11-17 | Commit `da47e7a` con T004 y D37, rama subida a GitHub. El dueño decide D38: en modo guía solo pasan las opciones y la revisión del jefe, y se prueba antes en el teléfono. Página de prueba republicada (versión 2) con el modo guía. Sin commit. |
| 2026-11-17 | T004b en computadora con la cuenta gratuita: el modo guía funciona (respuesta de otra IA válida, 3 opciones con una recomendada) y la página no se recargó al cambiar de pestaña. La IA directa sigue sin estar disponible para esa cuenta. Falta el teléfono. Sin commit. |
| 2026-11-17 | El dueño pidió seguir con T005 sin esperar al teléfono. Ajuste redactado: modo guía en la spec 005 (historia 2, FR-006 a FR-013, SC-004 y SC-005), contrato (`guidePrompt`, `readGuideAnswer`, modo de sesión, motivo `badAnswer`), plan, investigación (R1b), modelo de datos, guía de validación, tareas T004b y T083 a T089 (90 en total), y notas de enmienda en 002, 003 y 004. Pendiente de aprobación; sin commit. |
| 2026-11-17 | T004b en el teléfono con la cuenta gratuita: la respuesta de otra IA pasó la validación, pero la app de Claude recargó la página al volver; el almacenamiento del navegador conservó sus datos. 55 cuadros por segundo. Se propone al dueño adelantar el guardado en el navegador. Sin commit. |
| 2026-11-17 | El dueño decide D39: guardado automático en el almacenamiento del navegador desde la versión jugable mínima. Llevado a la spec 005 (FR-004 enmendado, FR-014 a FR-019, SC-006), contrato (`BrowserProgressStore`, `clear`, punto de retorno), modelo de datos, investigación, plan y tareas T090 a T094. Pendiente de aprobación del ajuste completo; sin commit. |
| 2026-11-17 | El dueño aprueba el ajuste completo (D40). T005 hecho y Fase 0 cerrada; sigue la Fase 1. Sin commit. |
| 2026-11-17 | Commit `685e6ae` con el cierre de la Fase 0 y rama subida a GitHub, con el sí del dueño. |
| 2026-11-17 | Con el sí del dueño, la rama `005-version-jugable-minima` se unió a `main` en local (avance directo, sin conflictos). Después, con su sí, `main` se subió a GitHub. |
| 2026-11-17 | Fase 1 hecha (T006 a T009): carpetas de las cuatro capas y de pruebas, `package.json` sin dependencias (`node --test` corre, sin pruebas aún), `index.html` mínimo con lienzo y capa de pantallas (carga sin errores en local), `src/main.js` vacío a la espera de T024, y README con cómo ejecutarlo. Corregido en la guía de validación el aviso de guardado (D39). |
| 2026-11-17 | Commit local `9a3234d` con la Fase 1, con el sí del dueño. Sin subir a GitHub. |
| 2026-11-17 | Fase 2 hecha (T010 a T024, T090, T092, T093; T091 en parte). Pruebas escritas antes que el código. Detalles fijados al programar y anotados en el modelo de datos y el contrato: longitud de una pieza (2 a 500 caracteres), interés escrito (2 a 40), estado de revisión del mundo (`reviewStatus`), confirmación de datos deducidos y el campo `extrasWanted`. Hasta T040 y T085, `main.js` usa la IA de demostración también dentro de Claude. La página carga sus 12 módulos sin errores. |
| 2026-11-17 | Commit local `83ec0ad` con la Fase 2, con el sí del dueño. Sin subir a GitHub. |
| 2026-11-17 | Fases 3 y 4 hechas (T025 a T032, T034 a T044, T083 a T087 y T094; T033 en curso). Primer tramo jugable en modo de demostración con un mundo de prueba de dos puertas. Comprobado en tamaño de teléfono: pantallas de inicio y puerta, aprobar y guardar, y el modo guía con una cuenta simulada sin IA, incluida la recarga al volver de otra app. No se pudo jugar el tramo con movimiento real porque el navegador de la sesión estaba oculto. 142 pruebas, 141 pasan, 1 pendiente. Sin commit. |
| 2026-11-17 | El dueño preguntó si el aspecto actual es el diseño final: no, es provisional. A su pedido se prepararon tres direcciones de arte dentro del tema decidido (D16), cada una con nivel, puerta y personaje en tamaño de teléfono, en un lienzo privado de Claude (https://claude.ai/artifact/JRHu7tgVV6xqwyozQfCaco). Arte propio, sin imitar redes sociales. Pendiente de elección. |
| 2026-11-17 | El dueño prefiere B, pero la ve demasiado infantil: el juego es más para adultos que crean un avatar. Se añadió B+ "Pop adulto": misma claridad y colores planos, con papel cálido, bordes finos, tipografía editorial, un guía simbólico en vez de mascota y el influencer como protagonista adulto. Pendiente de elección. Nota para la especificación: el público es adulto; se registrará con la decisión de arte. |
| 2026-11-17 | El dueño comparte su documento "The Influence Foundry" e imágenes de personajes y mundo. Se le avisó que cambiaba decisiones registradas (D01, D07, D16, D08). Elige la opción 1: adoptar el mundo, los personajes y la dirección de arte, manteniendo el juego de plataformas (D41). Registrado en la especificación con el público adulto, PIX como guía y una propuesta de distrito por mundo; spec 004 y tareas T051 y T073 marcadas para revisar. Sin commit. |
| 2026-11-17 | D42: el documento y las imágenes son del dueño y se publican con CC BY-SA. Añadidos `docs-entrada/03-influence-foundry.md` (texto del documento con la nota de qué se adopta) y las cuatro imágenes en `docs-entrada/influence-foundry/`. El dueño quiere cambiar la propuesta de distrito por mundo. Sin commit. |
| 2026-11-17 | Al final el dueño aprueba el reparto de distritos sin cambios (D43). Sigue revisar la ambientación del Mundo 1 en PIX Central y decidir su jefe. Sin commit. |
| 2026-11-17 | D44: Mundo 1 "encender la fábrica" en PIX Central, jefe el Generalista como holograma inestable, PIX enseña los controles. Spec 004 enmendada (FR-004, FR-034, FR-041, FR-042), tareas T073 y T074 ajustadas y nueva T095 (96 en total). |
| 2026-11-17 | Commit `50cfa99` con las fases 3 y 4 y las decisiones D41 a D44, con el sí del dueño. Rama subida a GitHub con su sí; sin unir a `main`. |
| 2026-11-17 | El dueño probó el tramo y vio el aspecto anterior: D41 a D44 estaban decididas pero sin dibujar. Decide D45: arte en dos pasos (código ahora, ilustraciones suyas después) y el protagonista es su influencer en silueta, con PIX volando al lado. Redibujado por código: fondo luminoso de PIX Central con reactor y cápsulas, suelo pulido, pasarelas de luz, portal holográfico, postes de luz, silueta de proporciones adultas y PIX. Los sectores se encienden con cada puerta resuelta (T095, en parte; 143 pruebas, 142 pasan, 1 pendiente). Pantallas en estilo claro con Space Grotesk e Inter. Encargo de 16 piezas en `docs/arte/encargo-ilustraciones.md`. Comprobado en el navegador, en escritorio y en tamaño de teléfono: recorrido hasta la primera puerta en unos 10 s con juego automático, aprobar enciende el sector. Sin commit. |
| 2026-11-17 | El dueño seguía viendo la versión anterior: su servidor ya servía los archivos nuevos, pero el navegador tenía los módulos viejos en caché. Se añadió `scripts/serve.js` (`npm run serve`), un servidor de desarrollo sin dependencias que pide no guardar caché y muestra la dirección para el teléfono. README y guía de validación actualizados. Sin commit. |
| 2026-11-24 | El dueño pidió usar el repositorio claude-code-game-studios: se estudió y se recomendó tomar solo piezas sueltas (sin copiar nada aún). Quiso mejorar el diseño con 3D: se generó a PIX en 3D con Magnific (1.170 créditos) y una maqueta jugable con tres vistas. El dueño eligió el mundo 3D abierto (D46). Quedan abiertas las preguntas 10 a 13. Sin commit. |
| 2026-11-24 | El dueño decide D47: cada pregunta de la fase es una zona jugable del distrito donde se decide con acciones y se confirma con aprobación. Maqueta jugable del Mundo 1 con las cinco zonas publicada en privado: https://claude.ai/artifact/2vwqHYCpUEnEZ3VqRRoV94 (recorrido completo comprobado en tamaño de teléfono; opciones ya escritas, sin IA). Falta que el dueño la pruebe. Sin commit. |
| 2026-11-24 | Se generaron con Magnific (unos 13.400 créditos) los modelos 3D de: protagonista en silueta (con esqueleto y animaciones de correr, saltar y estar quieto), Avatar Smith, Prompt Mechanic, el Generalista, el dron de spam, y las piezas del Mundo 1 (máquina de ingreso, terminal, cápsula, núcleo, plataforma). Integrados en la maqueta del Mundo 1 (versión 2, mismo enlace). Con el sí del dueño, los modelos (GLB) y el código de las dos maquetas quedan en `docs/arte/3d/` con su README; `.gitattributes` marca `*.glb` como binario. Sin commit. |
| 2026-11-24 | Commit local `d1573aa` en `005-version-jugable-minima` con el arte por código, `scripts/serve.js`, D46, D47 y `docs/arte/3d/`, con el sí del dueño. `node --test`: 142 pasan, 1 pendiente, ninguna falla. Sin subir a GitHub. |
| 2026-11-25 | Borrador de la especificación del motor 3D y zonas de decisión (`specs/006-motor-3d/spec.md`, rama `006-motor-3d`): 6 historias, 40 requisitos, 8 criterios de éxito. Tres aclaraciones pendientes (si los enemigos empujan o cuentan como fallo, si se vencen saltando encima, corazones o chispas). Pendiente de aprobación; sin commit. |
| 2026-11-25 | El dueño decide D48: chispas que desbloquean consejos extra de PIX y se pierden en un porcentaje por fallo; el Creator Market (chispas como moneda para personalizar al influencer) queda decidido para más adelante. Llevado a la sección 6 de la especificación y a la spec 006 (historia 4, FR-031 a FR-031c). Sin commit. |
| 2026-11-25 | El dueño decide D49: el dron de spam empuja y cuenta como fallo (pierde chispas y reaparece en el sitio seguro), y se vence cayéndole encima. Spec 006 sin puntos por aclarar; pendiente de aprobación junto con los tres supuestos propuestos (three.js, qué se conserva, arte 3D). Sin commit. |
| 2026-11-25 | Ajuste de D49 a pedido del dueño: el dron vencido desaparece y reaparece al minuto (spec 006, historia 4 y FR-029b). Sin commit. |
| 2026-11-25 | El dueño aprueba la spec 006 del motor 3D con sus tres supuestos (D50): three.js, conservar todo salvo la presentación del mundo, arte 3D con IA. Resueltas las preguntas abiertas 10 a 13. Siguiente: plan técnico del motor 3D y enmiendas de 002 y 004 para D47. Sin commit. |
