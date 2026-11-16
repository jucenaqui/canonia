# Features principales: Canonia (primera versión)

**Fase de Spec Kit:** 3 · Features y no-objetivos
**Estado:** aprobado por el dueño el 2026-11-16
**Fecha:** 2026-11-16
**Fuentes:** brief aprobado, constitución v1.0.0 y especificaciones F01, F02 y F03 de `factoria-aiif/`.

Alcance de lectura de la factoría: F01 completa; de F02, F03 y nombramiento, las secciones de definición, rutas de entrada, datos requeridos, profundidades, validadores y experiencia para principiantes; de nombramiento, además, las de colisiones, marcas, verificación externa y bloqueo. Las etapas internas detalladas se leerán al especificar cada mundo.

## Decisiones por mundo

Todo sale de la factoría, a su profundidad mínima (NÚCLEO). **[Decidido, D26]**

### Mundo 1 · Nicho (F01)

Las cinco puertas son las cinco preguntas mínimas que F01 exige:

| Puerta | Decisión | Qué hace la IA |
|---|---|---|
| 1 | Fuente de ingreso que quiere activar primero | Explica las opciones y recomienda |
| 2 | Nicho | Propone pocas direcciones comparables; del elegido deriva el nicho interno y su etiqueta pública |
| 3 | Audiencia | Propone a quién le habla según el nicho |
| 4 | Tiempo disponible | Ajusta lo anterior a lo que el jugador puede sostener |
| 5 | Objetivo a 90 días | Propone una meta coherente con ingreso, nicho y tiempo |

Mercados y plataformas no tienen puerta propia: la IA los deduce y el jugador los confirma ante el jefe. Jefe: el Validador de Nicho.

### Mundo 2 · Concepto (F02)

| Puerta | Decisión | Qué hace la IA |
|---|---|---|
| 1 | Territorio de concepto | Muestra entre 2 y 4 direcciones con ventajas y riesgos |
| 2 | Promesa de experiencia | Qué obtiene o siente quien lo sigue |
| 3 | Diferenciación | Qué lo distingue; no vale "único" ni "auténtico" |
| 4 | Concepto final | Presenta de 1 a 3 conceptos armados para aprobar uno |

Jefe: el Validador de Concepto.

### Mundo 3 · Identidad (F03)

| Puerta | Decisión | Qué hace la IA |
|---|---|---|
| 1 | Dirección del nombre | Pregunta si ya tiene nombre, ideas o ninguno, y propone direcciones y opciones |
| 2 | Búsqueda de los finalistas | Reduce a finalistas y los busca: otros creadores, cuentas, dominios y marcas |
| 3 | Nombre | Compara los finalistas con lo encontrado, recomienda y pide la aprobación |
| 4 | Identidad básica e historia | Edad, origen, residencia, idiomas, ocupación o rol, e historia compacta |
| 5 | Intereses, objetivo y motivación | Qué le gusta, qué quiere y por qué |

Jefe: el validador de nombre y de biografía.

El nombre sigue el flujo completo de la especificación de nombramiento de la factoría (dirección → opciones → finalistas → nombre canónico), con búsqueda real **[Decidido, D25]**:

- **En el móvil, búsqueda guiada:** el juego abre enlaces ya armados con el nombre (redes sociales, buscador, registro de marcas). El jugador mira y marca lo que encontró.
- **En la app de escritorio de Claude, búsqueda automática:** el juego busca con el navegador de la app y muestra el resultado.
- Cada comprobación queda con su estado: verificado, parcialmente verificado, no verificado o no disponible.
- El juego nunca afirma que un nombre está legalmente libre. La revisión de marcas es preliminar y lo dice.

## Features principales

Ordenadas por dependencia.

### 1. Motor de plataformas y controles
- El jugador mueve al personaje a izquierda y derecha y salta, con tres botones táctiles o con teclado.
- Hay plataformas, enemigos que se esquivan o se vencen, y objetos para recoger.
- Al fallar, el jugador reaparece en el último punto seguro del nivel.
- Modo de ayuda: quien no es jugador puede activar una asistencia que le permite terminar el nivel.
- **Regla crítica:** fallar en la parte de habilidad nunca borra ni cambia una decisión aprobada.

### 2. Puertas de decisión e inventario del influencer
- Al llegar a una puerta, la acción se detiene y se abre la decisión de esa fase.
- La IA propone opciones explicadas en lenguaje simple; el jugador elige, edita, pide otras o escribe la suya.
- El jugador puede decir "no sé", "recomiéndame" o "decide tú": la IA recomienda, pero no aprueba.
- Solo lo que el jugador aprueba de forma explícita entra al inventario.
- El jugador puede ver su inventario y reabrir una pieza aprobada para cambiarla.
- Mientras la IA responde, el juego muestra una espera con personaje; si falla, un personaje lo explica y ofrece reintentar.
- **Regla crítica (el jugador decide):** ninguna pieza entra al inventario sin aprobación explícita, y ninguna pieza aprobada se pierde.

### 3. Jefe de mundo: validación de la fase
- Al final de cada mundo, el jefe revisa las piezas aprobadas con los criterios del validador de esa fase.
- Si encuentra un problema, lo señala con una explicación simple y lleva al jugador a la pieza que conviene revisar.
- El mundo se cierra cuando el jugador aprueba el resumen final de la fase.
- El jefe no cambia piezas: solo señala. Cambiarlas sigue siendo decisión del jugador.

### 4. Mapa de mundos y progreso del jugador
- El mapa muestra los mundos; cada uno se desbloquea al cerrar el anterior.
- El jugador gana puntos y sube de nivel al superar puertas, niveles y jefes.
- Las habilidades se desbloquean con validaciones superadas.
- Una barra muestra cuánto del influencer está creado.
- El progreso del jugador y el inventario del influencer son cosas separadas.

### 5. Mundo 1: Nicho
- Un mundo jugable con sus cinco puertas y su jefe, según la tabla de arriba.
- Introduce al jugador en los controles y en cómo funcionan las puertas.

### 6. Mundo 2: Concepto
- Un mundo jugable con sus cuatro puertas y su jefe.
- Usa lo aprobado en el Mundo 1 sin volver a preguntarlo.

### 7. Mundo 3: Identidad
- Un mundo jugable con sus cinco puertas y su jefe.
- El nombre recorre dirección, opciones, finalistas y aprobación, con búsqueda de los finalistas.
- La búsqueda es guiada en el móvil y automática en la app de escritorio de Claude.
- Un nombre con una colisión importante se señala aunque guste; el jugador decide si lo conserva.
- Al aprobar el nombre, la silueta del influencer gana nombre en todo el juego.
- **Regla crítica:** el juego nunca afirma disponibilidad que no se comprobó, ni disponibilidad legal.

### 8. Guardado y exportación
- El progreso y el inventario se conservan entre sesiones.
- El jugador puede exportar en cualquier momento un documento con lo aprobado hasta ahí.
- El documento sirve para continuar con cualquier IA y distingue lo aprobado de lo pendiente.

## Orden de construcción propuesto

Primero una versión jugable mínima: features 1, 2 y 3, más la 5 (Mundo 1) con un mapa de un solo mundo. Con eso se prueba si el juego divierte y enseña. Después: 4, 8, 6 y 7.

## Lo que NO se va a construir en esta iteración (Non-Goals)

- NO habrá mundos 4 a 13.
- NO habrá registro, cuentas ni base de datos propias.
- NO habrá servidor propio ni versión con API.
- NO habrá generación de imagen, video ni voz.
- NO habrá modo marca personal para personas reales.
- NO habrá academia, cursos ni diplomados.
- NO habrá pagos, compras ni anuncios dentro del juego.
- NO habrá funciones sociales: chat, rankings ni partidas compartidas.
- NO habrá editor de niveles ni contenido creado por jugadores.
- NO habrá varios influencers por jugador: una partida, un influencer.
- NO habrá traducción a otros idiomas, aunque los textos queden separados del código.
- NO habrá búsqueda automática de nombres en el móvil: ahí es guiada, porque la IA de una página dentro de Claude no puede navegar.
- NO habrá registro de cuentas, dominios ni marcas desde el juego.

## Preguntas abiertas que afectan a las features

1. Cómo se guarda el progreso dentro de Claude (feature 8). Se resuelve en el plan técnico.
2. Reglas de puntos y niveles, y catálogo de habilidades (feature 4).
3. Nombre y variación visual de los tres mundos, y diseño del protagonista.
4. Cuántos niveles de plataformas tiene cada mundo entre puerta y puerta.
5. Qué redes y qué registros de marcas entran en la búsqueda del nombre, según el mercado del jugador.
