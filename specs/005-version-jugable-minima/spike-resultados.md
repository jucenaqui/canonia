# Resultados de la prueba técnica

**Página probada:** `spike/` publicada en privado dentro de Claude.
**Fecha:** 2026-11-17
**Quién probó:** el dueño del proyecto, en la app de Claude de su teléfono, con su propia cuenta.

## T003 — Prueba en el teléfono del dueño

| Supuesto (research.md) | Resultado | Estado |
|---|---|---|
| R5. Una página publicada carga varios módulos enlazados | Cargaron los dos archivos | Confirmado |
| R6. El lienzo se mueve fluido en el teléfono | 64 cuadros por segundo; el peor salto entre cuadros fue de 17 ms | Confirmado |
| R6. Los botones táctiles responden | El dueño confirma que el cuadro se movió y saltó con los botones. El resumen copiado no registró el tiempo de respuesta porque se copió antes de pulsar | Confirmado (sin medida de tiempo) |
| R1. La IA al nivel rápido da tres opciones válidas en español | 3 opciones válidas en 3,0 s, nivel aplicado `quick`; el tiempo incluye el permiso | Confirmado |
| R1. Qué pasa al negar el permiso de la IA | No se pudo probar: Claude recuerda la decisión aceptada y al recargar no vuelve a preguntar | No verificado |
| R2. Almacenamiento del navegador | Disponible; el contador subió de 1 a 2 al recargar | Confirmado |

Pantalla útil del teléfono dentro de la app de Claude: 375 × 682 píxeles, táctil.

### Sobre negar el permiso

El permiso de la IA queda guardado por página y por persona. Para volver a probar el rechazo hay dos caminos:

- Retirar el permiso desde el menú de permisos de la página en Claude y volver a pedir opciones.
- Probarlo con la segunda cuenta en T004, negando el permiso la primera vez.

No bloquea el plan: el camino "IA no disponible" se construye y se prueba de todas formas con el adaptador de demostración (tareas T021 y T053).

## T004 — Prueba con una segunda cuenta

En curso. Falta lo principal: la IA con la cuenta de otra persona.

**Primer resultado (2026-11-17), en el navegador de una computadora:**

| Supuesto (research.md) | Resultado | Estado |
|---|---|---|
| R4. Otra cuenta abre la página compartida | Abrió en el navegador con la dirección correcta, ya compartida por enlace público | Confirmado |
| R5. Carga de varios módulos enlazados | Cargaron los dos archivos | Confirmado |
| R6. Fluidez del lienzo en computadora | 60 cuadros por segundo; peor salto entre cuadros, 18 ms | Confirmado |
| R2. Almacenamiento del navegador | Disponible; visita número 3 | Confirmado |
| R1. IA con la cuenta de otra persona (aceptar y negar) | Al pulsar el botón, la página muestra "La IA no está disponible aquí" y Claude nunca pide permiso | **Falla** |

Pantalla: 1920 × 900 píxeles, sin táctil.

**Hallazgo principal (2026-11-17, video de la prueba):** la página se ve dentro del visor de Claude, con la segunda cuenta iniciada. Al pulsar "Pedir 3 opciones de nicho", el entorno no entrega la IA a la página y por eso no aparece la pregunta del permiso. La pregunta solo llega cuando la página consigue la IA y hace su primera petición.

Según la documentación del entorno, eso pasa cuando la IA no se ofrece en esa vista o a esa persona. La página no puede distinguir la causa: por diseño, todos los casos se ven igual. Las causas posibles:

- La cuenta es gratuita y su plan no incluye la IA dentro de las páginas.
- La persona entra por enlace público desde fuera de la organización del dueño, y a esos visitantes no se les ofrece.

**Dato del dueño (2026-11-17):** la segunda cuenta es **gratuita**. La causa más probable es el plan gratuito. No queda probado del todo: para descartar la otra causa haría falta una cuenta de pago de fuera de la organización del dueño.

Consecuencia: con la cuenta de una persona cualquiera, el juego dentro de Claude puede quedarse sin IA. Esto toca D06 y D34 (primero dentro de Claude). El dueño decide cómo seguir; no se cambia ninguna decisión sin su aprobación.

## T004b — Modo guía en el teléfono (D37, D38)

Hecho (2026-11-17). El modo guía funciona en el teléfono, pero la app de Claude recarga la página al volver de otra app. La página de prueba ya tiene un modo guía, publicado en el mismo enlace (versión 2):

1. "Copiar pregunta" copia la misma pregunta de las tres opciones de nicho.
2. El jugador la pega en otra IA gratuita y vuelve con la respuesta.
3. "Revisar respuesta" la valida con las mismas reglas que la IA directa.

Qué se mide:

- **Modo guía:** si la respuesta de una IA gratuita, copiada desde el teléfono, pasa la validación.
- **Ir a otra app y volver:** si la app de Claude conserva la página al cambiar de app, o la recarga. Si la recarga, el juego perdería el avance, porque esta entrega no guarda.

Probado en local (2026-11-17): acepta una respuesta válida aunque venga con texto alrededor o con comillas tipográficas; rechaza una respuesta sin el formato pedido; detecta una recarga después de copiar.

**Primer resultado (2026-11-17), segunda cuenta (gratuita), en el navegador de una computadora:**

| Supuesto | Resultado | Estado |
|---|---|---|
| Modo guía: la respuesta de otra IA pasa la validación | Respuesta pegada válida: 3 opciones, una recomendada | Confirmado |
| Ir a otra app y volver sin perder la página | Volvió y la página conservó su estado, sin recargar | Confirmado en computadora |
| IA directa con esta cuenta | "La IA no está disponible en esta vista" (igual que en T004) | Falla, como se esperaba |
| R5. Módulos enlazados | Cargaron los dos | Confirmado |
| R2. Almacenamiento | Disponible; visita número 4 | Confirmado |
| R6. Lienzo y controles | 60 cuadros por segundo; peor salto 17 ms; respuesta al toque 7 ms | Confirmado |

Pantalla: 1920 × 900 píxeles, sin táctil. El viaje de ida y vuelta funciona en computadora con una cuenta gratuita. Falta el teléfono: allí cambiar de app es distinto (la app de Claude puede descargar la página al pasar a otra app), y es donde jugará la mayoría.

**Segundo resultado (2026-11-17), segunda cuenta (gratuita), en la app de Claude del teléfono:**

| Supuesto | Resultado | Estado |
|---|---|---|
| Modo guía: la respuesta de otra IA pasa la validación | Respuesta pegada válida: 3 opciones, una recomendada. La respuesta vino como JSON limpio, en español, con ventajas y riesgos claros | Confirmado |
| Ir a otra app y volver sin perder la página | **La página se recargó al volver** | **Falla** |
| R2. Almacenamiento del navegador | Disponible, y sobrevivió a la recarga: la propia página detectó la recarga gracias a la marca que guardó antes de salir | Confirmado |
| R5. Módulos enlazados | Cargaron los dos | Confirmado |
| R6. Lienzo y controles | 55 cuadros por segundo; peor salto 25 ms; respuesta al toque 8 ms | Confirmado, algo por debajo de 60 |

Pantalla: 384 × 656 píxeles, táctil.

**Consecuencia:** en el teléfono, cada vez que el jugador va a su IA, la página vuelve a empezar. Con el plan actual (progreso solo en memoria) perdería todo lo hecho en cada puerta del modo guía. El almacenamiento del navegador sí conserva los datos tras la recarga, así que es la vía para no perder el avance. Decide el dueño.

Nota: la respuesta que el probador pegó incluía una opción con un interés escrito por él; la página la validó igual. No se guardan en el repositorio el nombre del probador ni sus datos.

**Sobre la app de Claude:** la primera vez que falló, la dirección tenía una letra de más al final (`...2boBa`). Queda por confirmar si la app abre la página con la dirección correcta.

**Hallazgo de entrada (2026-11-17):** al abrir el enlace desde WhatsApp, la segunda persona ve la pantalla de inicio de sesión de Claude en vez de la página. Es lo esperado: la página usa la IA con el plan de quien juega, así que hace falta una cuenta de Claude con la sesión iniciada. Consecuencias para el juego:

- Todo jugador necesita una cuenta de Claude. Era conocido (D06), pero ahora se ve el primer paso real: iniciar sesión.
- Un enlace compartido por WhatsApp se abre en el navegador interno de la aplicación, sin sesión de Claude. Conviene que la página de presentación del juego explique "abre el enlace en la app de Claude o en tu navegador con tu cuenta iniciada".
- Pendiente de saber, tras iniciar sesión, si la página entra directamente (enlace público activo) o muestra "sin acceso" (página aún privada).

**Segundo intento (2026-11-17):** la segunda persona creó su cuenta en el teléfono y, con la sesión iniciada, el enlace mostró "Page not found". Es lo que muestra Claude a quien no tiene acceso a una página privada: hay que activar el acceso por enlace público desde el menú Compartir de la página. Para el juego real: publicar no basta, hay que compartir por enlace público.

**Pregunta abierta: ¿funciona con una cuenta gratuita de Claude?** La documentación del entorno no excluye los planes gratuitos: la IA de la página gasta el uso del jugador como lo haría un mensaje en el chat, y si su plan no tiene el modelo pedido, el entorno usa uno cercano. Si una cuenta no tiene acceso, la llamada falla con `sampling_disabled`; si agota su límite de uso, con `rate_limited`. Por eso conviene que la segunda cuenta sea gratuita: es el caso de la mayoría de los jugadores. A comprobar también: si el límite de uso gratuito alcanza para un Mundo 1 completo (unas 15 a 20 llamadas a la IA).
