# Canonia — Estado del proyecto

**Última actualización:** 2026-11-27
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
| 5. Plan técnico | `specs/005-version-jugable-minima/plan.md` y anexos | Aprobado (2026-11-16). Plan de la base 3D en `specs/006-motor-3d/plan.md`, aprobado el 2026-11-25 (D54) |
| 6. Tareas | `specs/005-version-jugable-minima/tasks.md` | Aprobado (82 tareas, 2026-11-16); ajustado tras la prueba técnica a 95 tareas (D40, 2026-11-17); tareas de la base 3D en `specs/006-motor-3d/tasks.md` (47, aprobada el 2026-11-25, D55) |
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
| `docs-entrada/04-prompt-maestro-aiif.md` | Prompt maestro con el que nació la factoría (aportado por el dueño) |
| `docs-entrada/05-especificacion-maestra-aiif.md` | Especificación maestra de la factoría: preguntas y opciones explícitas de cada fase. Fuente oficial para las zonas de cada mundo |
| `docs/concepto-visual/` | Concepto visual aprobado como dirección |
| `docs/diseno/mundo-1-zonas.md` | Propuesta de diseño de las cinco zonas del Mundo 1 (decidir jugando), alineada con las opciones oficiales de F01; pendiente de aprobación |
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
| 2026-11-25 | El dueño aporta el prompt maestro y la especificación maestra de la factoría; se guardan en `docs-entrada/04` y `05`. Confirman las opciones oficiales de F01: 5 fuentes de ingreso (UGC AI para marcas, afiliados, productos digitales, suscripciones, patrocinios) más "Otra" y "Recomiéndame", y 9 nichos. La maqueta del Mundo 1 (versión 3) rehace la zona 1 con esas 5 máquinas, una prueba corta en cada una, "Otra", y "Recomiéndame" con una pregunta jugada y tabla de criterios. Pendiente: llevarlo a la spec 004 y alinear la zona 2 con los 9 nichos. Sin commit. |
| 2026-11-25 | Propuesta de diseño de las cinco zonas del Mundo 1 en `docs/diseno/mundo-1-zonas.md`, con las opciones oficiales de F01, la prueba de cada opción, lo que se aprende y cinco decisiones pendientes del dueño. Sin commit. |
| 2026-11-25 | Zona 1 del Mundo 1 en detalle en `docs/diseno/mundo-1-zonas.md`: ficha de cada una de las 5 fuentes de ingreso (según F11: cómo entra el dinero, quién paga, qué hace falta, audiencia, ventajas, riesgos, para quién) y un juego de tres pasos con decisión y consecuencia por fuente; respeta las reglas de F11 de no prometer ingresos, transparencia y no inventar títulos. Tres decisiones pendientes del dueño. Sin commit. |
| 2026-11-25 | El dueño decide D51: en la zona de fuente de ingreso se puede elegir desde la ficha o probar antes; barra de confianza en afiliados y patrocinios; la duración de los juegos se decide tras probar una versión de un minuto y una larga en la maqueta. Sin commit. |
| 2026-11-25 | Maqueta del Mundo 1, versión 4: zona de fuente de ingreso con ficha de cada opción (elegir o probar), cinco juegos con decisiones y consecuencias (pedido de marca, estante de afiliados con barra de confianza, del problema al producto, club de suscripciones por semanas, propuesta de patrocinio), selector de duración (1 minuto o largo) para comparar. Probados todos en tamaño teléfono. Falta que el dueño elija la duración. Sin commit. |
| 2026-11-25 | El dueño decide D52: dos ejemplos por ficha y poder cambiar la fuente de ingreso después de elegirla (lo que depende queda "por revisar"). Maqueta versión 5 con ambos cambios, probada en tamaño teléfono. La zona 2 de la maqueta sigue con los intereses de la primera versión, no con los 9 nichos oficiales; se rehace como siguiente paso. Sin commit. |
| 2026-11-25 | El dueño decide D53: primero la base del juego 3D de verdad con la zona de fuente de ingreso como modelo; después cada fase como contenido. Reglas generales de las zonas en la spec 006 (FR-041 a FR-048). Se empieza el plan técnico de la spec 006. Sin commit. |
| 2026-11-25 | Borrador del plan técnico de la base del juego 3D en `specs/006-motor-3d/plan.md`: qué se conserva (dominio, aplicación, adaptadores, pantallas HTML, 142 pruebas), qué cambia (puerta pasa a zona, origen `catalog`, eventos nuevos) y qué es nuevo (`presentation/world3d/`, contenido de la zona de ingreso, empaquetado de modelos). Justifica three.js y propone enmendar el tema visual de la constitución. Pendiente: aprobación, duración de minijuegos, permiso para comprimir modelos. Sin commit. |
| 2026-11-25 | El dueño aprueba el plan técnico de la base 3D (D54): dos ejemplos jugables de un minuto por opción, comprimir los modelos si siguen funcionando bien, y constitución 1.0.1 con el tema The Influence Foundry. Siguiente: comprimir modelos y escribir la lista de tareas. Sin commit. |
| 2026-11-25 | Modelos 3D comprimidos con el sí del dueño (texturas JPEG de 1024 px y menos polígonos en los modelos sin esqueleto): de 19 MB a 7,8 MB, en `assets/models/`, con `scripts/shrink-glb.py`; comprobados en la maqueta (versión 6). Lista de tareas de la base 3D escrita: `specs/006-motor-3d/tasks.md`, 47 tareas en 7 fases, T001 hecha. Pendiente de aprobación. Sin commit. |
| 2026-11-25 | El dueño aprueba la lista de tareas de la base 3D (D55). Empieza la implementación por la Fase 1, en la rama `006-motor-3d`. |
| 2026-11-25 | Fase 1 de la base 3D hecha (T001 a T004) y T007 adelantada: `scripts/pack-models.js` empaqueta los modelos (8,9 MB, animaciones del protagonista sin malla repetida), three.js 0.160.0 con mapa de módulos en `index.html` y punto único `src/presentation/world3d/three.js`, prueba de arquitectura ampliada. `node --test`: 146 pruebas, 145 pasan, 1 pendiente, ninguna falla. Sin commit. |
| 2026-11-25 | Fase 2 de la base 3D hecha (T005, T006, T008 a T012): contrato de eventos del mundo 3D, origen `catalog` en zonas y piezas, guardado de chispas, consejos, minijuegos y confianza, escena 3D, cámara y carga de modelos por prioridad. `node --test`: 164 pruebas, 163 pasan, 1 pendiente, ninguna falla. Sin commit. |
| 2026-11-25 | Fase 3 de la base 3D (T013 a T018): física 3D probada, controles táctiles y de teclado, protagonista animado con PIX, distribución de PIX Central como contenido, cámara que no se tapa y mundo jugable en `src/presentation/world3d/world.js`. Vista previa local `mundo3d.html` y publicada en privado: https://claude.ai/artifact/H9zc9esXawrZDS2Zsn9fEt. `node --test`: 177 pruebas, 176 pasan, 1 pendiente. T019 espera la prueba del dueño en su teléfono. Sin commit. |
| 2026-11-25 | El dueño decide D56: ambientar PIX Central como su imagen de referencia antes de la fase 4 (sala circular con reactor, piezas de escenario y paisaje de la isla). Tareas T048 a T052 en una nueva Fase 3b. Fase 3 sin commit todavía. |
| 2026-11-25 | T048 hecha: prueba de ambientación de PIX Central con la imagen del dueño como referencia de estilo (paisaje de la isla de fondo, reactor holográfico, sala circular con columnas, balcón, cúpula, pantallas, cápsulas y jardineras). Unos 2.200 créditos. Vista previa actualizada (versión 2). Pendiente del dueño: revisar la prueba antes de generar el resto de piezas (T050). Sin commit. |
| 2026-11-25 | El dueño vio en su teléfono la unión de los bordes del paisaje de fondo. Corregido: el paisaje es continuo (mitad en espejo), con la proporción correcta, y la cámara ya no queda dentro del reactor (sube por encima si algo la tapa; el reactor choca con su tamaño real). Vista previa versión 3. Sin commit. |
| 2026-11-25 | Correcciones tras la prueba del dueño en su teléfono: objetos que tapan al avatar se vuelven transparentes, pero solo si lo tapan casi por completo (5 de 7 puntos del cuerpo); el suelo de la sala circular coincide con lo que se ve (franjas, con prueba de 72 puntos del borde); las cápsulas y jardineras chocan con su tamaño real y PIX vuela por encima de ellas. Vista previa versión 5. `node --test`: 177 pasan, 1 pendiente. Sin commit. |
| 2026-11-26 | A pedido del dueño, jardineras y cápsulas en proporción real con el avatar (1,55 m): matera hasta la rodilla con palmera a la altura del pecho, y cápsula de 2,1 m. Vista previa versión 6. Sin commit. |
| 2026-11-26 | El dueño decide D57: Opus para el plan y Sonnet para programar; campo `model` en los seis subagentes y sección "Modelos" en `CLAUDE.md`. Sin commit. |
| 2026-11-26 | T050 y T051 hechas (colocación de piezas): 2 portales en el borde de la sala (este y oeste, con hueco brillante animado), barandas de vidrio con pasamanos dorado en la sala (con choque), los puentes y las zonas (solo dibujo), 5 pantallas holográficas más sobre las zonas y 5 visitantes de fondo; los datos de posición están en `layout.js` y se cargan al final. `node --test`: 182 pasan, 1 pendiente; pruebas nuevas de que nada bloquea las salidas. Revisado en tamaño teléfono. Sin commit. |
| 2026-11-26 | Escenario completado (T050, T051): portales, barandas, pantallas por zona y cinco visitantes; 182 pruebas. El dueño decide D58: cristales sólidos en lugar de barandas y zonas más grandes. Sin commit. |
| 2026-11-26 | D58 aplicada: cristales limpios y sólidos en lugar de barandas (sala, puentes y zonas, 1,1 m, sin poder saltarlos) y zonas de 20 x 18 m con puentes de 3,2 m de ancho y 5 a 7 m de largo, el de vuelta nivelado (0,3 m). `layout.js` actualizado, núcleo y pantallas movidos. `node --test`: 185 pasan, 1 pendiente, con prueba de recorrido que comprueba que no hay huecos al vacío. Revisado en tamaño teléfono. Sin commit. |
| 2026-11-26 | Commit de la ambientación de PIX Central y D58 en `006-motor-3d`, subido a GitHub y unido a `main` por pedido del dueño. Siguiente: Fase 4 (zona de fuente de ingreso). |
| 2026-11-26 | D59: cristales de 0,9 m con choque a la misma altura; caminando no se atraviesan, saltando se pueden pasar y caer. `node --test`: 185 pasan. |
| 2026-11-26 | Fase 4 (T020–T032) hecha sin commit: `zone-flow.js` (elegir, recomendar por criterios sin pesos ocultos, "Otra", aprobar y cambiar), IA para el porqué y la ficha de "Otra", contenido `zone-income.js` y su conversión `zones.js`, pantalla de zona, objetos de la zona, marcador, registro y cinco minijuegos con dos ejemplos cada uno. Vista previa `mundo3d.html` arranca desde `main.js` (guardado `canonia.vista3d`). `node --test`: 302 pasan, 1 pendiente. Falta T033 (medir en teléfono). Huecos: vista de la ficha de "Otra" en pantalla, modo guía de "Otra", pantalla de la ficha del influencer, revisar textos de minijuegos y frases del porqué. |
| 2026-11-26 | D60: ficha liviana y PIX con voz (dos versiones para comparar: navegador y grabada). Tres muestras de voz generadas en Magnific (144 créditos) para que el dueño elija. Sin commit. |
| 2026-11-26 | D60 aplicada: ficha liviana (esencial + Ver más; ejemplos y lo que aprendes en la entrada de cada minijuego) y PIX con voz (`pix-voice.js`, modos navegador y grabada, subtítulo, Leer, silenciar, el dron pulsa al hablar). Voz elegida por el dueño: Norah (Magnific, eleven_v4); 33 frases de `pix-lines.js` grabadas en `assets/audio/pix/` (unos 1.100 créditos, 14 MB a 320 kbps; pendiente comprimir). `node --test`: 323 pasan. Sin commit. |
| 2026-11-26 | D61 aplicada: voz de Norah por defecto (sin selector; navegador solo respaldo y texto de IA), PIX vuela delante del avatar y mira a la cámara al hablar, texto solo si el audio no suena, botón con la cara de PIX (`voice-button.js`) para silenciar, haz de luz guía delgado que se apaga al entrar a la zona. `node --test`: 326 pasan. Sin commit. |
| 2026-11-26 | Ajustes tras prueba en celular: PIX vuela cerca de la pantalla (abajo a la derecha, grande, mirando a la cámara) mientras habla; botón Ficha abre el panel "Tu ficha del influencer" (`screens/sheet.js`); "Empezar de nuevo" en la vista previa; modelos de la sala y de la zona cargan a la vez. Pendiente: 5 máquinas propias por opción (esperando el sí del dueño al costo). 326 pruebas. Sin commit. |
| 2026-11-26 | Cinco máquinas propias para la zona de fuente de ingreso (UGC: set con cámara y aro de luz; afiliados: estante holográfico con enlace; digitales: fabricadora de la que sale una guía; suscripciones: arco de club con cordón y medidor; patrocinios: vitrina con escudo y apretón de manos). Imágenes con Nano Banana 2.1 a 1K y 3D con Tripo (unos 5.400 créditos). Originales en `docs/arte/3d/modelos/`, comprimidas en `assets/models/`. 326 pruebas. Sin commit. |
| 2026-11-26 | PIX mira de frente al hablar (el modelo tiene la cara hacia +X). Máquina propia para "No sé, recomiéndame" (consola de consejos con holograma de estrella; unos 1.085 créditos). El dueño reafirma que todo el código lo hace Sonnet, incluso los cambios pequeños. 326 pruebas. Sin commit. |
| 2026-11-26 | Corregido: PIX ya no repite la explicación de una máquina al volver de un minijuego o al acercarse otra vez (solo la primera vez; al salir de un minijuego a medias dice "Ya la probaste"). Hecho por Sonnet. 328 pruebas. Sin commit. |
| 2026-11-26 | Pantalla de carga en la vista previa (`loading.js`): tapa las formas de reserva hasta que cargan el avatar, PIX, la sala y las máquinas de la zona; la bienvenida de PIX y el consejo inicial esperan a que se quite. Hecho por Sonnet. 333 pruebas. Sin commit. |
| 2026-11-26 | D62 aplicada (Sonnet): presentación de PIX la primera vez que se entra a cada zona (`screens/intro.js`, cámara cerca, Saltar, tarjeta con Continuar si no hay audio), guardada en `world3d.zonesPresented`; PIX vuelve a explicar una máquina al regresar a ella después de ir a otra. 338 pruebas. Sin commit. |
| 2026-11-26 | La ficha y la voz de cada máquina se activan solo dentro de su aro de luz (`ringRadius`/`reachOf` en `zone-math.js`, 1,3 a 1,8 m). Hecho por Sonnet. 340 pruebas. Sin commit. |
| 2026-11-26 | Commit en `006-motor-3d` de la Fase 4 (zona de fuente de ingreso) y D60–D62, por pedido del dueño ("guarda cambios"). Sin subir a GitHub. Acuerdo del dueño: "sube cambios" = subir la rama local al repositorio y dejar pendiente la unión a main. |
| 2026-11-26 | Audios de PIX comprimidos con `scripts/shrink-audio.py` (lameenc + miniaudio, 64 kbps, 24 kHz): de 14,2 MB a 2,7 MB; duraciones verificadas. Hecho por Sonnet. Sin commit. |
| 2026-11-26 | Presentación de zona: si el audio aún espera el primer toque, ofrece "Escuchar a PIX" (desbloquea y habla en el mismo toque) y "Leer" (`introMode` en `zone-math.js`). Corregida la vista previa publicada, a la que le faltaban los estilos de la presentación. Hecho por Sonnet. 341 pruebas. Sin commit. |
| 2026-11-26 | La voz grabada no sonaba en la página publicada (sí en local). Ahora se empaqueta como los modelos (`scripts/pack-audio.js` → `assets/audio/pix/packed/`, fuera de git) y suena por Web Audio, con respaldo de la voz del navegador; línea de diagnóstico de voz visible en la vista previa. Hecho por Sonnet. 348 pruebas. Sin commit. |
| 2026-11-26 | D63 aplicada (Sonnet): al terminar la carga aparece el botón "Entrar a PIX Central", que desbloquea el sonido para toda la partida. 350 pruebas. Sin commit. |
| 2026-11-26 | El dueño confirma que la voz ya suena en su celular. Commit y subida de la rama `006-motor-3d` a GitHub ("sube cambios"); la unión a main queda pendiente. |
| 2026-11-26 | Quitada la línea de diagnóstico de voz de la vista previa (solo con ?diag=voz). Sin commit. |
| 2026-11-26 | Fase 4 unida a `main` y subida a GitHub por pedido del dueño. Siguiente: Fase 5 (caídas y sitio seguro, T034–T035) y Fase 6 (enemigo, chispas y consejos). |
| 2026-11-26 | Fase 5 (T034–T038, Sonnet): chispas y consejos en la sesión (`collectSpark`, `registerFailure`, 25 % por fallo, consejo cada 10), sitio seguro con suelo firme y frase de PIX al caer, dron de spam (`enemies.js`) que empuja o se vence pisándolo y reaparece al minuto, 20 chispas en el mundo y 9 consejos (`tips.js`) en la ficha. 389 pruebas. Sin commit. |
| 2026-11-26 | Fase 6 (T039–T041, Sonnet): oferta de ayuda tras 3 fallos seguidos en el mismo sitio (más fácil 90 s, llevar al siguiente sitio seguro sin saltar zonas, seguir intentando; interruptor en la pausa, guardado en el navegador), pausa manual y automática, y al recargar se vuelve a la sala o a la entrada de la zona en curso. Seis frases nuevas de PIX grabadas con Norah (unos 114 créditos). 411 pruebas. Sin commit. Siguiente: Fase 7 (integración en index.html, revisión de seguridad, prueba en teléfono real, publicación). |
| 2026-11-26 | Al terminar un minijuego se puede "Elegir esta" / "Cambiar a esta" (abre la tarjeta de aprobar; el minijuego no aprueba). Hecho por Sonnet. 413 pruebas. Sin commit. |
| 2026-11-26 | D64: los portales de la sala serán la puerta a los otros mundos al terminar el Mundo 1 (pendiente hasta que exista el Mundo 2). |
| 2026-11-26 | Cámara con giro vertical (arrastre arriba/abajo, T/G, entre -8° y 72°, vuelve sola tras 4 s caminando). Hecho por Sonnet. 417 pruebas. Sin commit. |
| 2026-11-26 | Fases 5 y 6, elegir tras el minijuego, cámara vertical y D64 guardados, subidos y unidos a `main` por pedido del dueño. Siguiente: Fase 7 (integración en index.html, seguridad, teléfono real, publicación). |
| 2026-11-26 | Los 9 consejos de PIX grabados con la voz de Norah (unos 300 créditos) y dichos con su clave `tips.<i>` (Sonnet). 418 pruebas. Sin commit. |
| 2026-11-26 | Consejos con voz subidos y unidos a `main` por pedido del dueño. Siguiente: Fase 7. |
| 2026-11-26 | Fase 7 (Sonnet salvo la revisión): T042 `index.html` es ya el juego 3D (carga → Entrar → mundo; guardado en `canonia.partida`), retirados el motor 2D, `art/`, `test-world.js`, `game-view.js`, `gate.js`, `start.js` y `mundo3d.html`. T044 revisión de seguridad (Opus): corregidos A1 (texto libre solo con voces locales), M2, M3 (filtro de promesas en la IA), B1–B5; D65 fuentes propias en `assets/fonts/`; D66 textos sin promesa y 11 audios de PIX regrabados (unos 500 créditos); modo guía conectado a "Otra" en 3D. 410 pruebas. Sin commit. Pendiente: M4 (integridad de three.js), T045 teléfono real, T046 README, T047 publicar. |
| 2026-11-27 | Fase 7 (T042–T044, D65–D66) guardada, subida y unida a `main` por pedido del dueño. Pendiente: M4, T045 teléfono real, T046 README, T047 publicar. |
| 2026-11-27 | El dueño probó el juego en su celular y confirma que todo está bien (T045). README actualizado a la base 3D (T046). Sin commit. Pendiente: T047 publicar dentro de Claude (requiere el sí del dueño) y M4 opcional (integridad de three.js). |
| 2026-11-27 | README y estado subidos y unidos a `main`; el juego se publica dentro de Claude (T047) por pedido del dueño. |
| 2026-11-27 | Juego publicado en privado dentro de Claude como "Canonia": https://claude.ai/artifact/K2f5fJyWLFMfbkzJhTE4XY (el dueño decide con quién compartirlo). Base 3D (spec 006) cerrada. Siguiente: zonas 2 a 5 del Mundo 1 como contenido (D53). |
