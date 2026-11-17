# Investigación: versión jugable mínima

**Fecha**: 2026-11-16
**Fuente principal**: las definiciones del entorno de páginas publicadas dentro de Claude (contrato de ejecución 0.2.96), leídas de primera mano. Lo marcado como **sin probar** se verifica en la tarea de prueba técnica antes de construir nada encima.

## R1. Cómo habla el juego con la IA

- **Decision**: el juego usa la capacidad `sample` del entorno de Claude, detrás de un adaptador propio. Pide datos estructurados (`sample.json`) y valida la forma de la respuesta antes de usarla.
- **Rationale**: es la única vía para usar el plan del propio jugador. Hechos comprobados en las definiciones:
  - Cada llamada gasta el uso de Claude de quien mira la página; la primera llamada le pide permiso.
  - La IA de la página no navega, no recuerda nada entre llamadas y no tiene herramientas salvo las funciones que la página le pase.
  - No hay instrucciones de sistema: la instrucción, los datos y el formato van en cada llamada.
  - Tiempos: en el nivel rápido, uno o dos segundos; en el normal, de 5 a 60 segundos antes de la primera palabra.
  - Límite de 256 KiB de texto por llamada. Un exceso de llamadas se rechaza. No se debe llamar desde bucles ni temporizadores, solo tras una acción del jugador.
  - Las respuestas repetidas se sirven de una memoria de cinco minutos.
- **Consecuencias de diseño**:
  - Las opciones de una puerta se piden al nivel rápido; la revisión del jefe, al normal. **Comprobado (2026-11-17)**: el nivel rápido devolvió tres opciones válidas en español en 3,0 s, permiso incluido. La calidad del contenido se juzgará con el contenido real del Mundo 1.
  - "Pedir otras opciones" desactiva la memoria de respuestas, o devolvería las mismas.
  - La llamada se lanza cuando el jugador toca "ver opciones", no al abrir la puerta: así el permiso aparece tras un toque suyo.
  - Si el jugador niega el permiso, el adaptador lo informa como "IA no disponible" y el juego pasa al modo guía; escribir la propia respuesta sigue disponible (002/FR-042, D37).
- **Comprobado (2026-11-17, T004)**: con una cuenta gratuita, el entorno no entrega la IA a la página y no aparece la pregunta del permiso. Un servidor propio tampoco puede usar la suscripción del jugador: la política de Anthropic no permite usar el acceso de los planes Free, Pro o Max desde aplicaciones de terceros.

## R1b. Modo guía (D37, D38)

- **Decision**: sin IA en la página, el juego arma la misma pregunta como texto para copiar; el jugador la pega en la IA de chat que elija y trae la respuesta; el juego la lee y la valida igual que la de la IA directa. Solo para las opciones de cada puerta y la revisión del jefe.
- **Rationale**: es la única vía para que una cuenta gratuita cree con ayuda de la IA sin servidor ni claves (D34). Reutiliza `prompts.js` y `validate.js`, así que las reglas de seguridad de R8 se aplican igual al texto pegado.
- **Comprobado (2026-11-17, T004b en computadora, cuenta gratuita)**: la respuesta de otra IA pasó la validación (3 opciones, una recomendada) y la página no se recargó al cambiar de pestaña. En local se comprobó que acepta texto alrededor y comillas tipográficas y rechaza respuestas sin formato.
- **Comprobado (2026-11-17, T004b en el teléfono, cuenta gratuita)**: la respuesta pegada pasó la validación, pero **la app de Claude recargó la página al volver de la otra app**. El almacenamiento del navegador conservó sus datos tras la recarga.
- **Consecuencia**: con el progreso solo en memoria, el modo guía en el teléfono pierde el avance en cada puerta. Resuelto en D39: guardado automático en el almacenamiento del navegador (ver R2).
- **Alternatives considered**: servidor con la API (fuera de esta entrega y con costo, D34); solo escribir la propia respuesta (deja al jugador sin IA, contrario a la idea del juego).
- **Alternatives considered**: conversación libre por turnos (descartada en 002); llamar a la API desde un servidor (es la versión con API, fuera de esta entrega).

## R2. Guardado del progreso

- **Decision (enmendada por D39, 2026-11-17)**: la partida se guarda sola en el almacenamiento del navegador, detrás del puerto de guardado. No se usa la base de datos del entorno. Motivo del cambio: la app de Claude del teléfono recarga la página al volver de otra app (T004b), y el almacenamiento del navegador sobrevive a esa recarga.
- **Decisión original (2026-11-16)**: el progreso vivía solo en memoria.
- **Rationale**: las specs 001 a 004 dejan el guardado entre sesiones a su propia feature. Además, las definiciones muestran un límite importante para esa feature:
  - En la base de datos del entorno solo escriben el dueño de la página y los miembros de su organización. Un visitante de fuera, aunque tenga cuenta, solo lee; no puede escribir ni en su propia zona privada.
  - Por tanto, para jugadores públicos la base de datos del entorno **no sirve** para guardar partidas.
- **Reparto**: esta entrega guarda en el almacenamiento del navegador (D39); la feature de guardado añadirá exportar e importar la partida como archivo. El almacenamiento del navegador puede venir vacío o fallar, así que el juego debe funcionar sin él.
- **Alternatives considered**: base de datos del entorno (no vale para público); guardar la partida republicando la página (solo quien puede editar).

## R3. Búsqueda en internet para el nombre

- **Decision**: no afecta a esta entrega (es del Mundo 3), pero se deja registrado porque contradice parte de la decisión D25.
- **Hallazgo**: el navegador de la app de Claude se alcanza como un servidor del dispositivo, y las definiciones dicen que, por ahora, **solo el dueño de la página puede usar servidores del dispositivo**. Un jugador cualquiera no puede.
- **Consecuencia**: la búsqueda automática en la app de escritorio no está disponible para los jugadores. La búsqueda guiada (enlaces ya armados que el jugador revisa) es la única vía real para todos, en móvil y en escritorio.
- **Resuelto (D31)**: búsqueda guiada para todos; la automática queda detrás de un adaptador, para activarla si el entorno la abre a los jugadores o en la versión con servidor.

## R4. Cómo se publica y quién puede jugar

- **Decision**: el juego se publica como una página dentro de Claude, con la capacidad `sample` declarada, y se comparte por enlace público.
- **Rationale**: las definiciones indican que un visitante de fuera de la organización puede usar `sample` (le responde un modelo publicado). **Comprobado en T004 (2026-11-17)**: la segunda cuenta abre la página por enlace público, pero, por ser gratuita, no recibe la IA. Hace falta compartir por enlace público (si no, "Page not found") y tener la sesión de Claude iniciada; un enlace abierto desde WhatsApp pide iniciar sesión.
- **Restricciones comprobadas**: la página no tiene acceso a la red; los scripts externos solo cargan de una lista corta de sitios; la página y cada archivo de apoyo tienen un tope de tamaño de 16 MB.
- **Alternatives considered**: alojar el juego en un sitio propio (pierde el uso del plan del jugador; es la versión con API).

## R5. Lenguaje, módulos y dependencias

- **Decision**: JavaScript moderno en módulos, con tipos documentados en comentarios, sin compilación y sin dependencias externas.
- **Rationale**: la constitución pide HTML, CSS y JavaScript sin paso de compilación, y justificar cada dependencia. Un plataformas de tres botones no necesita un motor de juegos.
- **Comprobado (2026-11-17)**: una página publicada dentro de Claude carga varios módulos enlazados entre sí. No hace falta unir los archivos. Si no, se añade un paso opcional que une los archivos en uno solo para publicar; el código fuente no cambia.
- **Alternatives considered**: Phaser u otro motor (más peso y más que aprender para quien contribuye; el dueño eligió lo más simple); TypeScript (exige compilar).

## R6. Dibujo, bucle de juego y controles

- **Decision**: el nivel se dibuja en un lienzo (canvas 2D). La física avanza a paso fijo, independiente de la velocidad de dibujo. Las pantallas de texto (mini lección, tarjetas, inventario, resumen) son HTML normal encima del lienzo.
- **Rationale**:
  - Paso fijo: cumple que el personaje se mueva a la misma velocidad real en dispositivos lentos y no atraviese plataformas (001/FR-005).
  - HTML para el texto: escribir, seleccionar y leer funciona mejor con controles nativos del teléfono, y permite poner el texto de la IA como texto plano.
  - Controles táctiles como botones HTML fijos en la zona de los pulgares; teclado con flechas y espacio.
- **Arte**: formas vectoriales dibujadas por código, siguiendo el concepto visual aprobado. Sin imágenes externas en esta entrega.
- **Alternatives considered**: todo en el lienzo, incluido el texto (peor para escribir y para accesibilidad); WebGL (innecesario).

## R7. Pruebas

- **Decision**: el ejecutor de pruebas incluido en Node.js (`node --test`), sin dependencias. Dominio y aplicación se prueban sin navegador.
- **Rationale**: la constitución exige pruebas automáticas de decisión e inventario que corran sin navegador. Node 22 está instalado en el equipo de desarrollo.
- **Además**: una prueba de arquitectura revisa las importaciones y falla si una capa interna importa una externa.
- **Lo que no se puede automatizar**: los criterios que piden personas y teléfonos reales. Se cubren con una sesión de prueba guiada (ver `quickstart.md`).

## R8. Seguridad del texto de la IA

- **Decision**: toda respuesta de la IA se trata como no confiable.
- **Reglas**: se valida su forma (número de opciones, campos, longitudes); se muestra siempre como texto plano, nunca como HTML; se recorta a longitudes máximas; una respuesta que no cumple la forma se descarta y se trata como error (002/FR-043).
- **Límite conocido**: el juego no puede garantizar por sí solo que una propuesta sea apropiada. Se apoya en las salvaguardas del propio modelo y en instrucciones explícitas en cada llamada.

## R9. Modo de demostración fuera de Claude

- **Decision**: cuando la página no está dentro de Claude, el adaptador de IA se sustituye por uno de ejemplo con respuestas preparadas, y se muestra un aviso visible.
- **Rationale**: permite desarrollar, probar en el navegador y que los contribuyentes vean el juego sin publicar. El dominio y la aplicación no se enteran: solo cambia el adaptador.

## Verificaciones pendientes (prueba técnica previa)

Antes de construir el juego se publica una página mínima que comprueba, en un teléfono y con una segunda cuenta:

1. Que carga varios módulos enlazados.
2. Que el lienzo se mueve fluido y los botones táctiles responden.
3. Que una llamada a la IA al nivel rápido devuelve tres opciones válidas en español, y cuánto tarda.
4. Qué ocurre al negar el permiso de la IA.
5. Que un visitante de fuera, por enlace público, puede usar la IA.

Si alguna falla, el plan se ajusta antes de seguir.

## Resultados de la prueba técnica

Detalle en [spike-resultados.md](spike-resultados.md). Resumen al 2026-11-17:

| Supuesto | Estado |
|---|---|
| Varios módulos enlazados | Confirmado |
| Lienzo fluido en el teléfono | Confirmado: 64 cuadros por segundo |
| Botones táctiles | Confirmado por el dueño, sin medida de tiempo |
| IA rápida con tres opciones en español | Confirmado: 3,0 s |
| Negar el permiso de la IA | No verificado; se cubre con el adaptador de demostración y lleva al modo guía |
| Visitante de fuera usa la IA | **Falla** con cuenta gratuita (T004); resuelto con el modo guía (D37) |
| Almacenamiento del navegador | Confirmado |
| Modo guía: respuesta de otra IA válida | Confirmado en computadora (T004b) |
| Modo guía en el teléfono | Confirmado (T004b) |
| Volver de otra app sin recargar | Confirmado en computadora; **falla en el teléfono**: la página se recarga |
| Almacenamiento tras una recarga en el teléfono | Confirmado: los datos sobreviven |
