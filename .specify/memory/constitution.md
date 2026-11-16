# Constitución de Canonia

## Core Principles

### I. El jugador decide (NO NEGOCIABLE)

Ninguna pieza del influencer (nicho, concepto, nombre, biografía o cualquier otra) entra al
inventario sin la aprobación explícita del jugador.

- La IA propone; el jugador aprueba, edita o descarta.
- Ninguna acción de juego (un salto, un golpe, una caída) aprueba ni descarta una decisión.
- Nada se aprueba de forma automática ni por tiempo.
- Una pieza aprobada solo cambia si el jugador la reabre y la vuelve a aprobar.

Razón: es lo que hace que el influencer sea del jugador y no de la IA. Si esta regla falla,
Canonia no sirve.

### II. Fidelidad a la factoría

Todo lo que el juego enseña o pide en un mundo sale de la fase correspondiente de
`factoria-aiif/`. El juego resume la metodología a la profundidad mínima que la factoría define;
no inventa reglas de fase ni pasos nuevos.

- Cada mundo pide entre 3 y 5 decisiones.
- Si el juego necesita algo que la factoría no define, se registra como pregunta abierta en la
  especificación; no se improvisa.

### III. Arquitectura por capas

El código se organiza en capas con dependencias en un solo sentido:

1. **Dominio:** reglas del influencer, de las decisiones y del inventario. No conoce la pantalla,
   el canvas, Claude ni el almacenamiento.
2. **Aplicación (backend interno):** casos de uso del juego (abrir una puerta de decisión, pedir
   una propuesta, aprobar, exportar). Orquesta el dominio y usa los adaptadores.
3. **Adaptadores:** conexión con Claude, guardado de progreso y exportación. Cada uno detrás de
   una interfaz, para cambiarlo sin tocar dominio ni aplicación.
4. **Presentación (frontend):** motor de plataformas, canvas, controles táctiles, menús y textos.

Reglas:

- Una capa interna nunca importa una capa externa.
- En la primera versión no hay servidor: el "backend" es la capa de aplicación dentro de la misma
  página. La separación existe para que la versión con API pueda mover esa capa a un servidor sin
  reescribir el dominio.

### IV. Pruebas obligatorias de decisión e inventario

Nada que toque decisiones o inventario se da por terminado sin pruebas automáticas que demuestren:

- que ninguna pieza entra al inventario sin aprobación explícita;
- que una pieza aprobada no se pierde al fallar, morir, salir del mundo o recargar;
- que la exportación contiene exactamente las piezas aprobadas.

Las pruebas viven junto al dominio y la aplicación, y se ejecutan sin navegador.

### V. Simplicidad tecnológica

- HTML, CSS y JavaScript, sin paso de compilación obligatorio.
- El juego se dibuja en canvas.
- Sin servidor propio en la primera versión.
- Sin registro, cuentas ni base de datos propias: el jugador entra con su cuenta de Claude.
- Sin generación de imagen ni de video en la primera versión.
- Una dependencia externa solo entra si se justifica en el plan técnico y la aprueba el dueño.

### VI. Errores con personaje

El jugador nunca ve mensajes técnicos, códigos de error ni trazas.

- Cuando algo falla (por ejemplo, la IA no responde), un personaje del juego lo explica en el
  tono del juego y ofrece reintentar.
- Un error nunca borra decisiones aprobadas.
- El detalle técnico va al registro de depuración, nunca a la pantalla.

### VII. Idioma

- Todo texto que ve el jugador está en español.
- El código (nombres de variables, funciones, archivos y comentarios) está en inglés.
- Los textos del jugador viven separados del código, para poder traducir el juego después.

## Restricciones del producto

- **Móvil primero:** cada pantalla se diseña para teléfono y después se adapta a web.
- **Primera versión:** mundos 1 a 3, solo influencer virtual, jugado dentro de Claude con el plan
  del jugador.
- **Arte propio:** personajes, mundos, música y sonidos originales. No se recrea ningún juego
  existente ni se imita una red social concreta.
- **Tema visual:** "Dentro del teléfono", con acabado llamativo y profesional.
- **Privacidad:** el repositorio no contiene datos de ningún influencer real ni datos personales
  del dueño o de los jugadores. La factoría se mantiene genérica.
- **Licencias:** MIT para el código y CC BY-SA 4.0 para el contenido. Todo aporte se acepta bajo
  esas licencias.

## Flujo de trabajo y roles

El desarrollo lo hacen subagentes que trabajan en paralelo, cada uno con un rol fijo:

| Rol | Responsabilidad | Puede bloquear |
|---|---|---|
| PM | Mantiene la especificación, `ESTADO.md` y el orden de las tareas | Trabajo fuera de la especificación |
| Arquitecto | Cuida las capas y las interfaces entre ellas | Dependencias en sentido incorrecto |
| Arquitecto de seguridad | Revisa privacidad, datos guardados y uso de Claude | Exposición de datos o credenciales |
| Frontend | Presentación: motor de plataformas, canvas, controles, textos | — |
| Backend | Capas de dominio, aplicación y adaptadores | — |
| QA | Pruebas obligatorias y revisión en pantalla de móvil | Entregas sin las pruebas del principio IV |

Reglas:

- Dos subagentes nunca editan los mismos archivos al mismo tiempo.
- Ningún subagente aprueba su propio trabajo: QA revisa lo de frontend y backend; el arquitecto
  revisa los cambios de interfaces.
- Las decisiones de producto son del dueño. Ningún rol las toma.
- Los archivos de cada subagente se crean al llegar al plan técnico.
- Se sigue el ciclo de Spec Kit: especificación → aclaración → plan → tareas → análisis →
  implementación. Cada fase cierra con la aprobación del dueño.
- Cero código sombra: no se construye nada que la especificación no documente.

## Governance

- Esta constitución está por encima de cualquier otra práctica del proyecto.
- Antes de cualquier cambio se leen `ESTADO.md` y `ESPECIFICACION_JUEGO_AIIF.md`, como manda
  `CLAUDE.md`, y se dejan al día al terminar.
- Si una instrucción contradice esta constitución, se detiene el trabajo, se avisa y se propone
  enmendarla antes de tocar código.
- Una enmienda requiere la aprobación explícita del dueño y se registra en la especificación.
- Versionado semántico: MAJOR si se quita o redefine un principio; MINOR si se añade un principio
  o sección; PATCH para aclaraciones de redacción.
- Toda revisión (de QA, del arquitecto o del dueño) verifica el cumplimiento de los principios.

**Version**: 1.0.0 | **Ratified**: 2026-11-16 | **Last Amended**: 2026-11-16
