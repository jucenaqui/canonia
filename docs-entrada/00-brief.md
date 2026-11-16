# Brief del producto: Canonia

**Fase de Spec Kit:** 1 · Brief del producto
**Estado:** aprobado por el dueño el 2026-11-16
**Fecha:** 2026-11-16
**Fuente:** `ESPECIFICACION_JUEGO_AIIF.md` (decisiones D01–D18). Lo que no viene de una decisión registrada está marcado como **[Propuesto]** o **[Abierto]**.

## 1. Naturaleza del proyecto

- **Qué es:** un juego didáctico de plataformas por mundos en el que el jugador termina con un influencer virtual completamente creado.
- **Para quién:** cualquier persona sin conocimientos previos que quiera crear contenido en Instagram y otras redes sociales.
- **Problema que resuelve:** crear un influencer virtual bien pensado exige decidir nicho, concepto, identidad, marca, imagen, voz, contenido, monetización y crecimiento. La metodología que lo cubre (AI Influencer Factory, F01–F13) existe, pero son cientos de páginas que un principiante no va a leer ni a seguir.
- **Propósito:** que el jugador recorra los mundos, aprenda en cada uno lo necesario para decidir, tome sus decisiones con ayuda de la IA y las apruebe, y salga con las piezas de su influencer listas para seguir trabajando con cualquier IA.
- **Dos objetivos con el mismo peso:** que aprenda y que salga con el influencer hecho. Tiene que ser divertido, no un formulario disfrazado.

## 2. Alcance de esta iteración

- **Objetivo medible de la primera entrega [Propuesto]:** una persona sin conocimientos previos completa los mundos 1 a 3 desde el teléfono, dentro de Claude, y exporta su nicho, su concepto, y el nombre y la biografía de su influencer, todos aprobados por ella.
- **Qué entra:**
  - Mapa de mundos y tres mundos jugables: 1 Nicho (F01), 2 Concepto (F02), 3 Identidad (F03: nombre y biografía).
  - Mecánica de plataformas clásico: caminar, saltar, esquivar, enemigos.
  - Puertas de decisión, entre 3 y 5 decisiones por mundo.
  - Jefe de mundo que actúa como validador de la fase.
  - Progreso del jugador (puntos, niveles, habilidades) separado del inventario del influencer.
  - Solo influencer virtual.
  - Tema visual "Dentro del teléfono".
- **Qué queda fuera** (el detalle irá en la plantilla de features):
  - Mundos 4 a 13.
  - Versión con API y app de tienda.
  - Modo marca personal para personas reales.
  - Academia posterior al juego (cursos, capacitaciones, diplomados).
  - Generación de imagen, video o voz dentro del juego.
- **Plazo o restricciones externas:**
  - Sin fecha definida. **[Abierto]**
  - Sin presupuesto para pagar IA por jugador: por eso la primera versión usa el plan de Claude de cada jugador.
  - Una app propia para el público no puede usar la suscripción de Claude de cada jugador; por eso la primera versión vive dentro de Claude. Pendiente de confirmar en la documentación oficial de Anthropic.

## 3. Catálogos y datos cerrados

- **Mundos:** 13, uno por fase de la factoría y en su mismo orden. En esta entrega solo existen los tres primeros.

  | Mundo | Fase | Lo que el jugador crea |
  |---|---|---|
  | 1 | F01 Fundamentos Estratégicos | Fuente de ingreso, nicho, audiencia, tiempo disponible, objetivo a 90 días |
  | 2 | F02 Concepto | Concepto del influencer |
  | 3 | F03 Biografía e Identidad | Nombre, identidad básica, biografía |

- **Estados de una pieza del influencer [Propuesto]:** propuesta → aprobada. Solo lo aprobado por el jugador entra al inventario. Nada se aprueba por reflejo ni de forma automática.
- **Contenido de cada fase:** sale de `factoria-aiif/`. El juego no inventa metodología; la resume a la profundidad mínima que la factoría define.
- **Nombres de los mundos, reglas de puntos y catálogo de habilidades:** **[Abierto]**

## 4. Roles y autenticación

- **Roles:** uno solo, el jugador. No hay administrador ni panel de gestión en esta entrega.
- **Método de acceso:** sin registro propio. El juego se abre dentro de Claude con la cuenta que el jugador ya tiene.
- **Qué puede hacer el jugador:** jugar, decidir, aprobar, ver su inventario y exportar lo creado. Solo ve su propia partida.
- **Guardado de progreso entre sesiones:** **[Abierto]**. Depende de lo que permita una página publicada dentro de Claude; se resuelve en el plan técnico.

## 5. Stack deseado

El dueño no fijó tecnologías. Lo que sigue son restricciones que salen de decisiones ya tomadas y una propuesta para discutir en el plan técnico.

- **Entorno [Decidido]:** una página web que se juega dentro de Claude, pensada primero para móvil.
- **Frontend [Propuesto]:** HTML, CSS y JavaScript sin paso de compilación obligatorio, con el juego dibujado en canvas. Controles táctiles: izquierda, derecha y saltar.
- **Backend [Propuesto]:** ninguno en esta entrega.
- **IA [Decidido]:** Claude, con el plan del propio jugador.
- **Base de datos [Propuesto]:** ninguna propia; el guardado usa lo que ofrezca el entorno de Claude.
- **Lenguaje:** decide la IA en el plan técnico.
- **Arte [Decidido]:** propio y original. No se recrea ningún juego existente ni se imita una red social concreta.
- **Licencias [Decidido]:** MIT para el código, CC BY-SA 4.0 para el contenido.

## 6. Documentos existentes

- `ESPECIFICACION_JUEGO_AIIF.md` — especificación del producto y registro de decisiones.
- `ESTADO.md` — estado actual del proyecto.
- `docs/concepto-visual/dentro-del-telefono.html` — concepto visual aprobado como dirección.
- `factoria-aiif/AI_INFLUENCER_FACTORY_PORTABLE_v1.0.2/` — metodología de origen. Para esta entrega importan:
  - `01_F01_FUNDAMENTOS_ESTRATEGICOS/` — especificación de F01.
  - `02_F02_CONCEPTO/` — especificación de F02.
  - `03_F03_BIOGRAFIA_E_IDENTIDAD/` — especificaciones de biografía y de nombramiento.
  - `40_DOCUMENTACION/40_02_GUIAS/` — guía rápida y guía paso a paso.

## 7. Preguntas abiertas

1. Nombre del personaje protagonista y aprobación del subtítulo "Crea tu influencer".
2. Diseño del protagonista (el del concepto visual es provisional).
3. Nombre y variación visual de cada uno de los tres mundos.
4. Reglas de puntos y niveles, y catálogo de habilidades.
5. Cómo se guarda el progreso dentro de Claude y qué pasa si el jugador cambia de dispositivo.
6. Qué hace el jugador mientras la IA responde, para no cortar el ritmo.
7. En qué formato se exporta lo creado al terminar el mundo 3, si el Perfil Maestro completo solo existe al final del mundo 13.
8. Qué 3 a 5 decisiones concretas pide cada mundo. Requiere leer a fondo las especificaciones F01, F02 y F03.
9. Si el "modo guía" (copiar y pegar en cualquier IA) entra y en qué versión.
10. Medio para las contribuciones económicas voluntarias.
