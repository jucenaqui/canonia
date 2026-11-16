---
spec_id: AIIF_GENERAL_NARRATIVE_UNIVERSE_CANON_SPEC
spec_version: "1.0.0"
spec_type: AIIF_NARRATIVE_UNIVERSE_CONTINUITY_DISCOVERY_AND_CANONIZATION_SPEC
status: PROPUESTA_LISTA_PARA_APROBACION
phase: "F08 - Universo Narrativo"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "Biografía Influencer Digital con IA.docx"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Construcción y Canonización del Universo Narrativo
### Versión 1.0.0 - Propuesta lista para aprobación

## 1. Propósito

Esta especificación define un sistema general y reutilizable para que AI Influencer Factory (AIIF) pueda ayudar a **descubrir, construir, comparar, probar, validar, documentar y bloquear un universo narrativo coherente** para una influencer virtual, incluso cuando el creador no sepa inventar mundos, relaciones, rutinas, tensiones o reglas de continuidad.

El sistema se integra principalmente en **F08 - Universo Narrativo** y utiliza como fundamento metodológico la especificación original de expertos proporcionada al inicio del proyecto.

La metodología experta exige de forma explícita:

- storytelling completo;
- coherencia del avatar en todo el sistema;
- biografía e historia suficientes para sostener identidad;
- hobbies, rutinas, amistades, familia, mascotas y colaboraciones cuando aporten valor;
- escenarios recurrentes;
- relaciones narrativas;
- lugares y elementos recurrentes;
- objetivos, motivaciones y sueños capaces de generar conexión emocional;
- reglas de consistencia.

F08 conserva esa intención y la convierte en un **sistema narrativo estructurado**, capaz de mantener continuidad entre sesiones, publicaciones y plataformas sin confundir narrativa con calendario de contenido.

Flujo visible recomendado:

```text
DIRECCION NARRATIVA
        ->
MUNDOS Y VINCULOS
        ->
RUTINAS, MOTIVOS Y TENSIONES
        ->
PRUEBAS DE CONTINUIDAD
        ->
UNIVERSO RECOMENDADO
        ->
APROBACION
        ->
UNIVERSO NARRATIVO CANONICO
```

La complejidad técnica permanece interna.

## 2. Procedencia y regla de fidelidad experta

### 2.1 Base experta

La especificación original de AI Influencer Factory establece que el resultado debe ser una marca personal viva, coherente y escalable, y exige entre sus salidas obligatorias un **storytelling completo** y reglas de consistencia.

La plantilla experta de biografía añade que los siguientes elementos pueden generar ideas de contenido, escenarios recurrentes y relaciones narrativas:

```text
hobbies
rutinas
amigos o familia
mascotas
colaboraciones
lugares frecuentes
elementos recurrentes
objetivos y motivaciones
```

F03 ya conserva estos elementos como hechos biográficos o puentes, pero reserva para F08 la construcción de **mundos narrativos completos**.

### 2.2 Adaptación AIIF

AIIF conserva esa intención y establece una distinción necesaria:

```text
BIOGRAFIA CANONICA
= hechos e historia de vida aprobados

UNIVERSO NARRATIVO CANONICO
= sistema de mundos, relaciones, rutinas, motivos, tensiones y reglas que permite vivir esa biografia de forma coherente

ESTADO NARRATIVO ACTUAL
= situacion vigente que puede evolucionar con eventos confirmados sin reescribir automaticamente el canon base
```

Esta separación evita que cada publicación modifique accidentalmente la historia oficial.

### 2.3 Extensiones propias de AIIF

Los siguientes elementos son adaptaciones arquitectónicas de AIIF y no deben atribuirse a la fuente experta original como si hubieran estado formalizados allí:

- tres rutas de entrada;
- Territorios Narrativos;
- Conjunto de Mundos Narrativos;
- Grafo de Relaciones;
- Estado Narrativo Actual;
- Registro de Eventos Narrativos;
- Matriz de Visibilidad Narrativa;
- pruebas de continuidad;
- clasificación del impacto narrativo de eventos;
- etapas internas `NR00-NR18`;
- `NARRATIVE_UNIVERSE_CANON`;
- `NARRATIVE_WORLD_SET_CANON`;
- `RELATIONSHIP_GRAPH_CANON`;
- `NARRATIVE_CONTINUITY_CANON`;
- `VALIDADOR_DE_UNIVERSO_NARRATIVO`;
- `VALIDADOR_DE_CONTINUIDAD_NARRATIVA`;
- gobernanza de cambios y portabilidad bajo Sistema 00.

## 3. Ubicación en la arquitectura

```text
F01 - Fundamentos Estrategicos
        ->
F02 - Concepto
        ->
F03 - Biografia e Identidad
        ->
F04 - Personaje y Psicologia
        ->
F05 - Identidad de Marca
        ->
F06 - Identidad Visual
        ->
F07 - Identidad Verbal y Voz
        ->
F08 - Universo Narrativo
        ->
F09 - Sistema de Contenido
F10 - Produccion IA
```

F08 no crea una fase global adicional.

Dependencias principales hacia atrás:

```text
NICHE_CANON
CONCEPT_CANON
IDENTITY_CORE_CANON
BIOGRAPHY_CANON
CHARACTER_CANON
PSYCHOLOGY_MODEL_CANON, cuando exista
BRAND_IDENTITY_CANON
BRAND_POSITIONING_CANON
VALUE_PROPOSITION_CANON
VISUAL_IDENTITY_CANON
VERBAL_IDENTITY_CANON
VOICE_IDENTITY_CANON, cuando exista
```

Dependencias principales hacia adelante:

```text
F09 -> convierte el universo en pilares, series, formatos y calendario
F10 -> produce escenas, audio y video sin reescribir continuidad
F11 -> usa contextos y relaciones compatibles con monetizacion
F12 -> experimenta formatos/plataformas sin romper la narrativa
F13 -> consolida universo y estado de continuidad en Perfil Maestro y Portable
```

## 4. Principio central

> **El universo narrativo no es una lista de lugares ni una sucesión de historias inventadas. AIIF debe construir un sistema de continuidad donde biografía, personaje, relaciones, rutinas, espacios, objetos, tensiones y aspiraciones puedan generar situaciones nuevas sin que la influencer deje de sentirse como la misma persona. El canon define qué mundo existe y qué reglas lo gobiernan; el estado narrativo registra qué está ocurriendo ahora.**

El objetivo no es maximizar drama ni cantidad de detalles.

El objetivo es crear suficiente estructura para que el influencer pueda:

- vivir situaciones cotidianas reconocibles;
- sostener relaciones recurrentes;
- tener memoria de eventos relevantes;
- evolucionar sin contradecir su biografía;
- habitar varios contextos sin parecer personajes distintos;
- generar contenido durante meses sin repetición mecánica;
- mantener coherencia entre texto, imagen, voz y video;
- ser portable entre IAs y sesiones.

## 5. Qué es y qué no es F08

### 5.1 F08 sí define

- arquitectura general del universo narrativo;
- mundos o contextos narrativos recurrentes;
- lugares recurrentes y su función;
- relaciones narrativas y grado de visibilidad;
- personajes secundarios relevantes;
- mascotas cuando aporten continuidad;
- rutinas y rituales narrativos;
- objetos, motivos y símbolos recurrentes;
- tensiones narrativas compatibles con el personaje;
- objetivos y sueños como hilos de evolución;
- reglas de continuidad;
- modelo temporal;
- estado narrativo actual;
- registro de eventos relevantes;
- límites de privacidad narrativa;
- reglas para distinguir idea, simulación y evento confirmado;
- puentes hacia F09 y F10.

### 5.2 F08 no debe cerrar prematuramente

- pilares de contenido -> F09;
- series de contenido -> F09;
- calendario editorial -> F09;
- frecuencia de publicación -> F09;
- formato concreto de cada pieza -> F09;
- CTA, hashtags o copy final de una publicación -> F09;
- guion final de un reel específico -> F09/F10;
- prompt final de imagen/video para una pieza -> F10;
- producción final de escenas, audio o video -> F10;
- pricing o paquetes comerciales -> F11;
- tácticas de crecimiento -> F12.

F08 define **qué existe en el mundo narrativo y cómo mantiene continuidad**. F09 decide qué parte de ese mundo convertir en contenido.

## 6. Fuente de verdad y capas narrativas

Sistema 00 / Matriz Maestra de Datos continúa siendo la fuente operacional de verdad.

F08 utiliza las siguientes capas conceptuales:

```text
NARRATIVE_UNIVERSE_WORKING
= universo todavia en exploracion

NARRATIVE_WORLD_SET
= conjunto de contextos narrativos recurrentes

RELATIONSHIP_GRAPH
= relaciones, roles, cercania, tensiones y limites

NARRATIVE_CONTINUITY
= reglas temporales, causales y de consistencia

NARRATIVE_STATE_CURRENT
= situacion narrativa vigente y mutable

NARRATIVE_EVENT_LOG
= historial cronologico de eventos confirmados

NARRATIVE_UNIVERSE_CANON
= arquitectura narrativa aprobada y bloqueada

NARRATIVE_WORLD_SET_CANON
= mundos narrativos oficiales aprobados

RELATIONSHIP_GRAPH_CANON
= relaciones estructurales aprobadas

NARRATIVE_CONTINUITY_CANON
= reglas de continuidad aprobadas y bloqueadas
```

`NARRATIVE_STATE_CURRENT` y `NARRATIVE_EVENT_LOG` son objetos dinámicos de continuidad. No deben confundirse con el canon estructural bloqueado.

## 7. Canon estructural vs estado narrativo dinámico

Esta distinción es obligatoria.

### 7.1 Canon estructural

Define elementos relativamente estables:

```text
quien existe
que relacion tiene con quien
que mundos existen
que rutinas son recurrentes
que lugares son compatibles
que limites existen
que hechos biograficos no pueden contradecirse
que tensiones son plausibles
que reglas temporales se deben respetar
```

### 7.2 Estado narrativo actual

Define elementos que pueden evolucionar:

```text
proyecto que esta desarrollando
viaje actual o reciente
objetivo de corto plazo
relacion en una etapa determinada
nuevo habito temporal
colaboracion en curso
reto o aprendizaje activo
estado de una trama narrativa
```

Cambiar el estado no equivale automáticamente a modificar el canon estructural.

## 8. Tres rutas de entrada

### Ruta A - El usuario ya tiene universo narrativo

AIIF debe:

1. extraer mundos, relaciones, rutinas, motivos y reglas;
2. separar hechos biográficos de expansiones narrativas;
3. detectar contradicciones;
4. identificar elementos estables y dinámicos;
5. validar continuidad;
6. preguntar solo por vacíos críticos.

### Ruta B - El usuario tiene ideas parciales

AIIF debe:

1. preservar lo proporcionado;
2. clasificarlo por función narrativa;
3. completar solamente capas necesarias;
4. proponer vínculos entre elementos;
5. comparar alternativas cuando exista una decisión real.

### Ruta C - El usuario no sabe qué universo construir

AIIF activa Inicio Fácil y construye primero **Territorios Narrativos**, no un mundo completo arbitrario en una sola respuesta.

## 9. Inicio Fácil aplicado a F08

Mensaje conceptual recomendado:

> **No necesitas inventar una serie ni escribir una novela. Usaré la biografía, personalidad, marca, identidad visual y voz ya aprobadas para proponerte pocos mundos, relaciones, rutinas y tensiones capaces de generar continuidad. Solo tendremos que aprobar los elementos que realmente definan su vida narrativa.**

El usuario puede activar ayuda con:

```text
No se
Dame opciones
Recomiendame
Decide tu
Haz lo mejor
```

La IA debe evitar interrogatorios extensos cuando el canon anterior permita inferir direcciones seguras.

## 10. Dependencias de entrada

### 10.1 Requeridas o recuperables

F08 debe intentar recuperar automáticamente:

- `BIOGRAPHY_CANON`;
- `CHARACTER_CANON`;
- `BRAND_IDENTITY_CANON`;
- `BRAND_POSITIONING_CANON`;
- `VISUAL_IDENTITY_CANON`;
- `VERBAL_IDENTITY_CANON`;
- objetivos y motivaciones del personaje;
- intereses, hobbies y rutinas ya aprobados;
- relaciones ya aprobadas;
- lugares recurrentes ya aprobados;
- restricciones de continuidad;
- mercados e idioma cuando afecten contexto narrativo.

### 10.2 Deseables

- referencias narrativas proporcionadas por el usuario;
- temas que desea explorar;
- temas prohibidos;
- grado de ficción permitido;
- nivel de privacidad deseado;
- necesidad de storytelling seriado;
- plataformas principales.

No repetir preguntas si la información ya existe.

## 11. Brief Narrativo

Estructura conceptual:

```json
{
  "project_id": "[PROJECT_ID]",
  "biography_canon": "[REFERENCE]",
  "character_canon": "[REFERENCE]",
  "brand_identity_canon": "[REFERENCE]",
  "visual_identity_canon": "[REFERENCE]",
  "verbal_identity_canon": "[REFERENCE]",
  "existing_relations": [],
  "existing_places": [],
  "existing_routines": [],
  "existing_milestones": [],
  "character_goals": [],
  "privacy_limits": [],
  "narrative_preferences": [],
  "narrative_restrictions": [],
  "open_questions": []
}
```

El brief no es canon. Es una vista de trabajo.

## 12. Territorios Narrativos

Cuando el usuario parte desde cero o existe incertidumbre, AIIF debe proponer normalmente entre **2 y 4 Territorios Narrativos** suficientemente distintos.

Un Territorio Narrativo describe una dirección de vida y experiencia, no una lista de publicaciones.

Ejemplos abstractos de dirección, no catálogo obligatorio:

```text
COTIDIANO / INTIMO
URBANO / SOCIAL
CREATIVO / ARTISTICO
PROFESIONAL / CONSTRUCTOR
EXPLORADOR / VIAJERO
NOCTURNO / EDITORIAL
COMUNITARIO / COLABORATIVO
```

Cada territorio debería explicar:

- qué faceta del personaje revela;
- qué mundos puede contener;
- qué relaciones activa;
- qué rutinas favorece;
- qué tensiones naturales permite;
- qué fortalezas narrativas ofrece;
- riesgos de artificialidad o repetición;
- compatibilidad con marca, visual, voz y monetización.

## 13. Arquitectura del Universo Narrativo

AIIF puede estructurar F08 mediante:

```text
HECHOS BIOGRAFICOS CANONICOS
+
MUNDOS NARRATIVOS
+
RELACIONES
+
RUTINAS Y RITUALES
+
LUGARES
+
OBJETOS Y MOTIVOS RECURRENTES
+
OBJETIVOS Y ASPIRACIONES
+
TENSIONES CONTROLADAS
+
MODELO TEMPORAL
+
REGLAS DE CONTINUIDAD
```

El objetivo es producir un sistema narrativo reutilizable, no una novela cerrada.

## 14. Mundos Narrativos

Un **Mundo Narrativo** es un contexto recurrente suficientemente reconocible para concentrar ciertas relaciones, rutinas, emociones, lugares y tipos de situación.

Ejemplos abstractos:

```text
MUNDO PRIVADO
MUNDO CIUDAD
MUNDO PROFESIONAL
MUNDO CREATIVO
MUNDO ESCAPE
MUNDO NOCHE
```

Los nombres reales deben ser específicos al proyecto.

Un mundo no equivale necesariamente a un lugar físico. Puede representar una zona de vida.

## 15. Ficha de Mundo Narrativo

Cada mundo puede documentarse como:

```json
{
  "world_id": "[WORLD_ID]",
  "name_visible": "[NOMBRE]",
  "narrative_function": "",
  "core_places": [],
  "secondary_places": [],
  "typical_activities": [],
  "recurring_relationships": [],
  "emotional_range": [],
  "visual_bridge": [],
  "verbal_bridge": [],
  "recurring_objects": [],
  "allowed_tensions": [],
  "privacy_level": "",
  "continuity_rules": [],
  "prohibited_inconsistencies": []
}
```

No todos los campos son obligatorios en profundidad NUCLEO.

## 16. Cantidad de mundos

No se debe maximizar el número de mundos.

Recomendación general:

```text
NUCLEO -> 2 a 4 mundos suficientemente diferenciados
AMPLIADO -> 3 a 6 mundos cuando aporten variedad real
PROFUNDO -> mas mundos solo si existe una necesidad narrativa clara
```

Un mundo que no aporte relaciones, situaciones, estética, emoción o continuidad debe eliminarse o fusionarse.

## 17. Lugares y jerarquía de espacios

F08 puede clasificar lugares como:

```text
BASE
= lugar central y recurrente

FRECUENTE
= aparece con regularidad

OCASIONAL
= útil para variación

EVENTUAL
= aparece por un evento específico

SIMULADO
= solo se está probando
```

La existencia narrativa de un lugar no obliga a utilizar siempre la misma representación visual.

F06 sigue gobernando coherencia visual y F10 la producción de escenas.

## 18. Visibilidad narrativa y privacidad

Cada elemento puede registrar una capa de visibilidad:

```text
PUBLICO
= puede mostrarse y explicarse abiertamente

SEMIPRIVADO
= puede insinuarse o mostrarse parcialmente

PRIVADO
= existe en continuidad, pero normalmente no se publica

NO_PUBLICABLE
= no debe utilizarse como contenido salvo cambio explícito
```

La privacidad narrativa ayuda a evitar que el personaje parezca contar absolutamente todo de su vida.

## 19. Rutinas y rituales

Las rutinas crean continuidad cotidiana.

F08 debe preferir un conjunto pequeño y reconocible de:

- hábitos de mañana o noche;
- prácticas creativas;
- rutinas profesionales;
- ejercicio o bienestar cuando corresponda;
- consumo cultural;
- desplazamientos;
- encuentros recurrentes;
- rituales de descanso;
- pequeñas costumbres.

### 19.1 Rutina vs ritual

```text
RUTINA
= accion recurrente funcional

RITUAL
= accion recurrente con valor emocional, simbolico o identitario
```

No todas las rutinas deben aparecer en contenido.

## 20. Objetos, motivos y símbolos recurrentes

Pueden incluir:

- objetos cotidianos;
- accesorios;
- libros;
- bebidas;
- herramientas;
- elementos de trabajo;
- objetos sentimentales;
- patrones ambientales;
- símbolos visuales;
- sonidos o canciones asociadas cuando su uso sea legal y apropiado.

Su función es reforzar reconocimiento y memoria, no convertir cada escena en una repetición literal.

## 21. Grafo de Relaciones

Las relaciones deben modelarse como una red funcional.

Por cada relación relevante, AIIF puede registrar:

```text
QUIEN ES
TIPO DE RELACION
ORIGEN DEL VINCULO
NIVEL DE CERCANIA
GRADO DE CONFIANZA
VISIBILIDAD PUBLICA
FRECUENCIA DE INTERACCION
TEMAS COMPARTIDOS
TENSIONES POSIBLES
LIMITES
CONOCIMIENTO MUTUO
ROL NARRATIVO
```

El objetivo no es construir un árbol social enciclopédico.

## 22. Tipos de relaciones

Según el proyecto pueden existir:

```text
familia
amistad
mentor / referente
colega
colaborador
vecindad
comunidad
cliente o marca
rivalidad ligera
relacion romantica, solo si el proyecto la requiere y se define de forma adulta y coherente
otros vinculos narrativos
```

No todos los tipos deben existir.

## 23. Personajes secundarios

Un personaje secundario solo debe crearse si cumple una función clara, por ejemplo:

- revelar una faceta distinta del influencer;
- sostener una relación recurrente;
- crear contraste;
- activar un mundo narrativo;
- generar continuidad;
- explicar una rutina;
- permitir colaboración o conversación.

Definir pocos personajes secundarios y evitar inventar nombres, trabajos o historias extensas sin necesidad.

## 24. Mascotas y elementos vivos recurrentes

Una mascota puede aportar:

- rutina;
- afecto;
- escenas cotidianas;
- continuidad;
- relaciones con lugares;
- contraste emocional.

No debe añadirse una mascota por obligación estética.

Si existe, su especie, nombre, apariencia básica y relación con el personaje deben mantenerse coherentes.

## 25. Autoridad narrativa, profesión y afirmaciones públicas

F08 puede utilizar la profesión o experiencia narrativa definida en F03 como fuente de situaciones.

Debe mantener la distinción:

```text
PROFESION_NARRATIVA
!=
CREDENCIAL_VERIFICABLE
```

Una escena narrativa no debe convertir automáticamente una ocupación ficticia en una afirmación pública de credenciales reales.

## 26. Modelo temporal

F08 debe elegir un modelo temporal suficientemente claro.

Opciones conceptuales:

```text
CONTINUIDAD LIGERA
= la mayoria de publicaciones funcionan de forma independiente, pero recuerdan hechos relevantes

CONTINUIDAD SECUENCIAL
= ciertos eventos tienen orden y consecuencias

CONTINUIDAD HIBRIDA
= vida cotidiana flexible + algunos arcos secuenciales
```

La opción debe adaptarse al proyecto y a la capacidad operativa del creador.

## 27. Línea temporal narrativa

La línea temporal debe integrar al menos:

```text
PASADO CANONICO
= hechos de BIOGRAPHY_CANON

PRESENTE NARRATIVO
= situacion actual

FUTURO ASPIRACIONAL
= objetivos, sueños e hilos potenciales
```

F08 no debe reescribir la cronología biográfica de F03.

## 28. Estado Narrativo Actual

`NARRATIVE_STATE_CURRENT` debe resumir solamente lo que sea necesario para continuar correctamente.

Ejemplo abstracto:

```json
{
  "current_location_context": "",
  "active_projects": [],
  "active_relationship_states": [],
  "active_goals": [],
  "recent_confirmed_events": [],
  "open_threads": [],
  "temporary_constraints": [],
  "last_update": "[DATE]"
}
```

No convertirlo en un diario infinito.

## 29. Registro de Eventos Narrativos

`NARRATIVE_EVENT_LOG` conserva eventos que realmente deben recordarse.

Cada evento puede registrar:

```json
{
  "event_id": "[EVENT_ID]",
  "date_or_sequence": "",
  "event_type": "",
  "world_id": "",
  "participants": [],
  "summary": "",
  "continuity_impact": "NONE|CONTEXTUAL|STATE_CHANGE|CANON_CHANGE",
  "status": "SIMULATED|APPROVED_FOR_CONTINUITY|CONFIRMED|RETIRED",
  "source": "",
  "consequences": [],
  "notes": []
}
```

Los valores anteriores son roles internos del evento y no sustituyen los estados globales del proyecto.

## 30. Impacto narrativo de un evento

### NONE

La pieza no introduce ningún hecho que deba recordarse.

### CONTEXTUAL

Añade contexto momentáneo, pero no cambia relaciones, objetivos ni estado persistente.

### STATE_CHANGE

Modifica el estado narrativo actual y debe registrarse.

Ejemplos abstractos:

```text
comienza un curso
adopta una nueva rutina
inicia una colaboracion
viaja durante una semana
reconcilia una tension menor
```

### CANON_CHANGE

Contradice o pretende modificar un elemento estructural bloqueado.

Debe activar gobernanza formal de cambios y no puede aplicarse como un evento normal.

## 31. Una publicación no equivale automáticamente a un evento

Regla central:

```text
BORRADOR DE CONTENIDO
!=
EVENTO NARRATIVO CONFIRMADO
```

Una imagen en un café no obliga a registrar un nuevo hito.

Un guion donde el personaje dice que se mudó de ciudad sí podría implicar un cambio narrativo importante y debe validarse antes de convertirse en continuidad.

## 32. Flujo de promoción de un evento

```text
IDEA NARRATIVA
        ->
SIMULACION
        ->
PIEZA / ESCENARIO APROBADO
        ->
VALIDACION DE IMPACTO
        ->
APROBADO PARA CONTINUIDAD, SI CORRESPONDE
        ->
EVENTO CONFIRMADO
        ->
ACTUALIZAR NARRATIVE_STATE_CURRENT
        ->
REGISTRAR EN NARRATIVE_EVENT_LOG
```

Una simulación no modifica el estado.

## 33. Objetivos, sueños y hilos de evolución

F08 utiliza los objetivos del personaje definidos en F03 para crear **hilos narrativos**.

Un hilo puede ser:

- aprender una habilidad;
- completar un proyecto;
- mejorar un hábito;
- explorar una ciudad;
- desarrollar una relación;
- construir una colección;
- preparar una colaboración;
- alcanzar un objetivo creativo;
- otro proceso coherente.

Los hilos generan dirección sin exigir un final predeterminado.

## 34. Tensiones narrativas

Una narrativa sostenible necesita fricción moderada, no drama permanente.

Tensiones posibles:

```text
tiempo vs ambicion
vida publica vs privacidad
perfeccion vs espontaneidad
trabajo vs descanso
exploracion vs estabilidad
independencia vs colaboracion
rutina vs novedad
seguridad vs curiosidad
```

Deben derivarse de `CHARACTER_CANON`, biografía y objetivos.

## 35. Regla anti-drama artificial

AIIF no debe inventar de forma predeterminada:

- traumas;
- enfermedades;
- tragedias;
- violencia;
- conflictos familiares extremos;
- rupturas sentimentales;
- escándalos;
- eventos altamente sensibles;

solo para hacer al personaje más interesante.

Si el usuario desea abordar temas sensibles, deben tratarse como decisiones explícitas y con coherencia suficiente.

## 36. Contradicciones controladas y tensiones internas

F04 puede haber definido contradicciones humanas controladas.

F08 puede convertirlas en contextos narrativos sin cambiar la personalidad.

Ejemplo abstracto:

```text
PERSONAJE: segura en publico + reservada en intimidad

F08:
- escenario social donde toma iniciativa
- momento privado donde procesa sola
```

La contradicción se muestra, no se resuelve artificialmente en cada historia.

## 37. Memoria narrativa

AIIF debe distinguir:

```text
HECHO QUE DEBE RECORDARSE
HECHO CONTEXTUAL QUE PUEDE OLVIDARSE
MOTIVO RECURRENTE
ESTADO ACTIVO
ARCO CERRADO
```

La memoria debe ser suficiente para evitar contradicciones, pero compacta para mantener portabilidad.

## 38. Repetición vs recurrencia

Un elemento recurrente debe reaparecer con variación.

No hacer:

```text
mismo cafe
misma frase
misma pose
misma rutina
misma emocion
```

en cada publicación.

Preferir:

```text
MISMO MOTIVO
+
NUEVO CONTEXTO
+
NUEVA MICRO-SITUACION
+
MISMA IDENTIDAD
```

F09 operacionalizará la variedad de contenido.

## 39. Matriz de Visibilidad Narrativa

AIIF puede mantener una matriz compacta:

| Elemento | Existe en canon | Puede mostrarse | Puede explicarse | Puede evolucionar | Observaciones |
|---|---|---|---|---|---|
| Lugar base | Sí/No | Sí/No | Sí/No | Limitado | |
| Relación recurrente | Sí/No | Sí/No | Sí/No | Sí/No | |
| Rutina | Sí/No | Sí/No | Sí/No | Sí/No | |
| Objetivo personal | Sí/No | Sí/No | Sí/No | Sí | |
| Tema privado | Sí/No | No/Parcial | No/Parcial | Según regla | |

La matriz no obliga a revelar elementos privados.

## 40. Relación F03 / F08

Regla:

> **F03 establece quién es y qué le ocurrió; F08 establece en qué mundo vive narrativamente, con quién se relaciona, qué patrones se repiten y cómo evoluciona sin contradecir esos hechos.**

F08 no puede cambiar silenciosamente `BIOGRAPHY_CANON`.

Si necesita cambiar un hecho biográfico, debe abrir revisión controlada de F03.

## 41. Relación F04 / F08

Regla:

> **F04 define cómo se comporta; F08 crea situaciones y relaciones donde ese comportamiento puede manifestarse.**

F08 no inventa reacciones incompatibles para hacer una escena más dramática.

## 42. Relación F05 / F08

La marca puede orientar qué facetas del universo son más útiles públicamente.

Pero:

```text
BRAND_POSITIONING_CANON
!=
UNIVERSO NARRATIVO COMPLETO
```

El personaje puede tener vida narrativa más amplia que el mensaje comercial de marca.

## 43. Relación F06 / F08

F08 puede definir contextos y lugares recurrentes.

F06 sigue gobernando:

- identidad física;
- fotografía;
- estilo;
- paleta;
- vestuario;
- referencias visuales.

F08 no puede convertir un nuevo escenario en nueva identidad visual canónica.

## 44. Relación F07 / F08

Regla:

> **F07 define cómo se expresa; F08 define con quién, dónde y en qué situación se expresa.**

F08 puede crear diálogos o roleplay de prueba, pero debe usar `VERBAL_IDENTITY_CANON` y `VOICE_IDENTITY_CANON` cuando aplique.

## 45. Relación F08 / F09

Esta frontera es crítica.

### F08 define

```text
mundos
relaciones
rutinas
lugares
motivos
tensiones
hilos narrativos
continuidad
estado actual
```

### F09 define

```text
pilares
subpilares
series
formatos
frecuencia
calendario
pieza concreta
CTA
hashtags
distribucion de contenido
```

F09 debe extraer contenido del universo sin convertir cada elemento narrativo en un pilar.

## 46. Relación F08 / F10

F08 entrega contexto narrativo.

F10 produce la escena.

F10 puede variar:

- pose;
- cámara;
- localización equivalente;
- iluminación;
- ejecución audiovisual;

pero no debe cambiar hechos narrativos, relaciones o continuidad sin aprobación.

## 47. Simulaciones narrativas

Antes de aprobar un universo, AIIF puede simular alternativas como:

```text
MAS COTIDIANO
MAS SOCIAL
MAS PRIVADO
MAS PROFESIONAL
MAS ARTISTICO
MAS COSMOPOLITA
MAS AVENTURERO
MAS SERIALIZADO
MAS LIGERO EN CONTINUIDAD
```

Cada simulación debe explicar:

- qué cambia;
- qué permanece;
- fortalezas;
- riesgos;
- impacto en F09;
- impacto en producción.

Una simulación nunca modifica automáticamente el canon.

## 48. Pruebas de Universo Narrativo

Antes del bloqueo, AIIF debe probar varios escenarios hipotéticos.

### 48.1 Día ordinario

¿Existe suficiente estructura para describir un día sin inventar todo desde cero?

### 48.2 Cambio menor de rutina

¿Puede variar sin perder identidad?

### 48.3 Interacción con relación recurrente

¿La dinámica es reconocible y coherente?

### 48.4 Crítica o desacuerdo ligero

¿F04 y F07 siguen gobernando comportamiento y voz?

### 48.5 Colaboración de marca

¿Puede integrarse sin romper el mundo narrativo?

### 48.6 Viaje o salida temporal

¿Puede salir de sus lugares habituales sin parecer otro personaje?

### 48.7 Logro o celebración

¿Puede evolucionar un objetivo sin resolver toda la narrativa?

### 48.8 Momento privado

¿Existen límites y matices suficientes para no convertir todo en contenido público?

## 49. Prueba de Continuidad Secuencial

AIIF puede simular una secuencia de 8 a 12 eventos hipotéticos, no publicaciones finales.

Debe comprobar:

- orden temporal;
- consecuencias;
- memoria de eventos;
- continuidad de relaciones;
- coherencia con objetivos;
- ausencia de contradicciones;
- capacidad de volver a la vida cotidiana;
- variedad entre mundos.

No es un calendario editorial de F09.

## 50. Prueba de Capacidad Narrativa

Preguntas:

```text
¿Puede sostener meses de situaciones sin inventar una nueva personalidad?
¿Existen suficientes mundos para variar?
¿Hay demasiados mundos para poder recordarlos?
¿Las relaciones tienen funciones claras?
¿Los objetivos generan direccion?
¿Las tensiones generan movimiento sin drama artificial?
¿La continuidad puede resumirse de forma portable?
¿El universo funciona aunque una plataforma o formato cambie?
```

## 51. Matriz de Comparación Narrativa

Cuando existan alternativas, usar una matriz cualitativa.

| Criterio | Pregunta |
|---|---|
| Coherencia biográfica | ¿Respeta F03? |
| Coherencia de personaje | ¿Permite manifestar F04 sin forzarlo? |
| Coherencia de marca | ¿Apoya F05 sin parecer publicidad permanente? |
| Compatibilidad visual | ¿Puede expresarse dentro de F06? |
| Compatibilidad verbal | ¿Permite usar F07 de forma natural? |
| Profundidad | ¿Tiene vida suficiente sin volverse enciclopédico? |
| Variedad | ¿Permite contextos distintos? |
| Continuidad | ¿Es fácil recordar qué ocurrió? |
| Potencial de contenido | ¿Alimenta F09? |
| Compatibilidad comercial | ¿Puede integrar colaboraciones coherentes? |
| Escalabilidad | ¿Puede evolucionar durante meses? |
| Riesgo de contradicción | ¿Cuánto mantenimiento exige? |

No se requiere un `NARRATIVE_SCORE` numérico obligatorio.

## 52. Validación inicial

Antes de bloquear F08, validar al menos:

```text
universo <-> BIOGRAPHY_CANON
universo <-> CHARACTER_CANON
universo <-> BRAND_IDENTITY_CANON
universo <-> BRAND_POSITIONING_CANON
universo <-> VISUAL_IDENTITY_CANON
universo <-> VERBAL_IDENTITY_CANON
relaciones <-> biografia y personalidad
lugares <-> residencia/contexto
rutinas <-> personaje y estilo de vida
objetivos <-> trayectoria
hitos <-> cronologia
estado actual <-> eventos confirmados
continuidad <-> ausencia de contradicciones
universo <-> capacidad de alimentar F09
```

También validar:

- cantidad manejable de elementos;
- funciones claras;
- privacidad;
- ausencia de drama artificial innecesario;
- capacidad de expansión;
- portabilidad.

## 53. Validador de Universo Narrativo

Se incorpora como propuesta:

```text
VALIDADOR_DE_UNIVERSO_NARRATIVO
```

Debe comprobar:

1. contexto mínimo disponible;
2. coherencia con F03-F07;
3. mundos suficientemente diferenciados;
4. relaciones funcionales y no arbitrarias;
5. rutinas y motivos reutilizables;
6. objetivos/hilos coherentes;
7. tensiones compatibles con personaje;
8. límites de privacidad;
9. no invasión de F09/F10;
10. aprobación suficiente antes del bloqueo.

## 54. Validador de Continuidad Narrativa

Se incorpora como propuesta:

```text
VALIDADOR_DE_CONTINUIDAD_NARRATIVA
```

Debe comprobar:

- cronología;
- causalidad básica;
- estado de relaciones;
- ubicación/contexto temporal;
- eventos previos relevantes;
- objetivos activos;
- arcos abiertos/cerrados;
- contradicciones con hechos bloqueados;
- impacto narrativo de eventos;
- consistencia de `NARRATIVE_STATE_CURRENT` con `NARRATIVE_EVENT_LOG`.

Cuando detecte una contradicción con canon bloqueado, no debe corregirla silenciosamente.

## 55. Resultados y severidad

F08 reutiliza resultados generales:

```text
VALIDA
VALIDA_CON_OBSERVACIONES
REQUIERE_AJUSTES
REQUIERE_DECISION_USUARIO
NO_APTA_PARA_BLOQUEO
```

y severidades generales:

```text
INFORMATIVO
MENOR
MODERADO
CRITICO
BLOQUEANTE
```

No crear un sistema paralelo de estados.

## 56. Recomendación

AIIF puede recomendar una arquitectura narrativa, pero la recomendación no cambia el canon.

Estructura sugerida:

```json
{
  "recommended_narrative_universe": "[CANDIDATE]",
  "why": [],
  "worlds": [],
  "key_relationships": [],
  "continuity_model": "",
  "remaining_risks": [],
  "approval_required": true
}
```

## 57. Aprobación humana

La canonización requiere aprobación explícita suficiente.

Ejemplos válidos:

```text
Aprueba este universo narrativo
Hazlo canon
Bloquea estos mundos y relaciones
Esta sera su Biblia Narrativa definitiva
```

No constituyen necesariamente aprobación:

```text
Me gusta
Se siente bien
Muestrame otro
Simula como quedaria
Hazlo mas cotidiano
```

## 58. Aprobación granular

F08 puede aprobar por:

- mundo narrativo;
- lugar;
- relación;
- personaje secundario;
- rutina;
- ritual;
- objeto/motivo recurrente;
- regla de continuidad;
- modelo temporal;
- bloque narrativo;
- fase completa.

La aprobación granular debe conservar dependencias.

## 59. Bloqueo canónico

Después de aprobación suficiente:

```text
ESTADO_DATO = BLOQUEADO
NARRATIVE_UNIVERSE_CANON = [...]
NARRATIVE_WORLD_SET_CANON = [...]
RELATIONSHIP_GRAPH_CANON = [...]
NARRATIVE_CONTINUITY_CANON = [...]
```

según lo efectivamente aprobado.

`NARRATIVE_STATE_CURRENT` no necesita permanecer inmóvil; se actualiza mediante eventos confirmados compatibles con el canon.

## 60. Cambio de estado vs cambio de canon

### Cambio de estado

Ejemplo:

```text
esta semana esta viajando
inicio una colaboracion temporal
esta preparando un proyecto
```

Puede actualizar `NARRATIVE_STATE_CURRENT` sin redefinir el universo.

### Cambio de canon

Ejemplo:

```text
cambia residencia permanente
se elimina una relacion central
se redefine profesion biografica
aparece una nueva familia estructural
se cambia una regla esencial del mundo
```

Debe abrir gobernanza formal de cambios y revalidar dependencias.

## 61. Gobernanza de cambios

Modificar `NARRATIVE_UNIVERSE_CANON`, `NARRATIVE_WORLD_SET_CANON`, `RELATIONSHIP_GRAPH_CANON` o `NARRATIVE_CONTINUITY_CANON` bloqueados requiere, según impacto:

```text
INSTRUCCION EXPLICITA
        ->
PUNTO DE CONTROL
        ->
PROPUESTA / SIMULACION
        ->
ANALISIS DE IMPACTO
        ->
REVALIDACION
        ->
APROBACION
        ->
REGISTRO DEL CAMBIO
        ->
NUEVA VERSION
        ->
REVALIDAR DERIVADOS
```

No borrar historia anterior.

## 62. Revalidación progresiva

F08 debe revalidarse conforme se desarrollan:

```text
F09 -> narrativa <-> pilares, series, calendario y variedad
F10 -> narrativa <-> escenas y produccion
F11 -> narrativa <-> colaboraciones y monetizacion
F12 -> narrativa <-> formatos/plataformas/crecimiento
F13 -> narrativa <-> consolidacion portable
```

Si F09 descubre que el universo no tiene suficiente profundidad, debe marcar F08 para revisión, no inventar silenciosamente nuevos hechos canónicos.

## 63. Historial

Conservar cuando sea relevante:

- Territorios Narrativos descartados;
- mundos candidatos;
- relaciones retiradas;
- simulaciones;
- versiones del grafo;
- reglas de continuidad modificadas;
- eventos confirmados;
- arcos cerrados;
- razones de aprobación;
- resultados de validadores.

El historial debe ser trazable pero portable.

## 64. Idioma y localización

La documentación estructural permanece en español conforme a `IDIOMA_CANONICO_DOCUMENTAL = ES`.

Los nombres visibles de mundos, lugares o relaciones pueden existir en el idioma público del influencer cuando corresponda.

La localización no debe cambiar:

- hechos;
- relaciones;
- continuidad;
- significado de un mundo;
- límites de privacidad.

## 65. Compatibilidad de plataforma

F08 debe funcionar en Modo Básico Universal.

No requiere:

- navegación web;
- generación de imágenes;
- generación de audio;
- memoria persistente premium;
- integraciones directas.

Cuando la plataforma tenga poco contexto, AIIF debe utilizar una versión compacta del universo y del estado narrativo.

## 66. Portabilidad

F08 debe poder incluir en el Paquete Portable, Portable Ligero y Archivo Universal de Reanudación:

```text
NARRATIVE_UNIVERSE_CANON
NARRATIVE_WORLD_SET_CANON
RELATIONSHIP_GRAPH_CANON
NARRATIVE_CONTINUITY_CANON
NARRATIVE_STATE_CURRENT
resumen de NARRATIVE_EVENT_LOG
mundos
lugares
relaciones
rutinas
rituales
motivos recurrentes
objetivos / hilos activos
limites de privacidad
eventos recientes relevantes
pendientes
proxima accion
```

No es necesario transportar todos los eventos históricos si un resumen preserva continuidad suficiente.

## 67. Profundidad

### NUCLEO

Debe incluir al menos:

- 2-4 mundos;
- relaciones centrales;
- lugares principales;
- rutinas/rituales esenciales;
- objetivos narrativos;
- modelo temporal;
- reglas básicas de continuidad;
- estado actual compacto.

### AMPLIADO - predeterminado

Añade:

- personajes secundarios útiles;
- motivos recurrentes;
- privacidad;
- tensiones controladas;
- grafo de relaciones;
- prueba secuencial;
- matriz de comparación;
- registro de eventos compacto.

### PROFUNDO

Puede añadir:

- más mundos;
- arcos narrativos largos;
- estados relacionales detallados;
- cronología más extensa;
- múltiples capas de visibilidad;
- reglas avanzadas de continuidad;
- variantes por mercado o plataforma cuando tengan sentido.

No utilizar PROFUNDO si añade complejidad sin valor operativo.

## 68. Etapas internas `NR00-NR18`

```text
NR00 - Detectar ruta de entrada
NR01 - Cargar canon F01-F07
NR02 - Construir Brief Narrativo
NR03 - Generar Territorios Narrativos
NR04 - Seleccionar arquitectura general
NR05 - Construir Mundos Narrativos
NR06 - Definir lugares y visibilidad
NR07 - Construir Grafo de Relaciones
NR08 - Definir rutinas, rituales y motivos
NR09 - Traducir objetivos en hilos narrativos
NR10 - Definir tensiones controladas
NR11 - Definir modelo temporal y continuidad
NR12 - Construir Estado Narrativo Actual
NR13 - Simular eventos y secuencias
NR14 - Comparar alternativas
NR15 - Ejecutar validadores
NR16 - Construir Universo Narrativo Operativo
NR17 - Presentar recomendacion
NR18 - Aprobar y bloquear
```

Las etapas son internas y no deben mostrarse innecesariamente al usuario.

## 69. Universo Narrativo Operativo

Antes de una Biblia extensa, AIIF debe poder generar una versión compacta útil para otras fases.

Ejemplo:

```json
{
  "worlds": [],
  "core_places": [],
  "relationships": [],
  "routines": [],
  "recurring_motifs": [],
  "active_goals": [],
  "controlled_tensions": [],
  "privacy_rules": [],
  "temporal_model": "HYBRID",
  "continuity_rules": [],
  "current_state": {},
  "recent_events_summary": []
}
```

Esta versión es especialmente importante para portabilidad y producción.

## 70. Output técnico antes de aprobación

```json
{
  "f08_narrative_universe": {
    "status": "BORRADOR|VALIDADO|REQUIERE_AJUSTES",
    "route": "EXISTING|PARTIAL|DISCOVERY",
    "narrative_territories": [],
    "world_candidates": [],
    "relationship_graph_working": {},
    "continuity_working": {},
    "narrative_state_current": {},
    "simulations": [],
    "validator_result": "[RESULT]",
    "open_questions": [],
    "approval_required": true
  }
}
```

## 71. Output técnico después de aprobación

```json
{
  "f08_canonical_narrative": {
    "narrative_universe_canon": {},
    "narrative_world_set_canon": [],
    "relationship_graph_canon": {},
    "narrative_continuity_canon": {},
    "narrative_state_current": {},
    "narrative_event_log_summary": [],
    "status": "BLOQUEADO",
    "approved_by_user": true,
    "version": "[VERSION]",
    "effective_date": "[DATE]",
    "downstream_revalidation_required": []
  }
}
```

## 72. Algoritmo operativo

```text
INPUT: canon F01-F07 + preferencias narrativas + restricciones

1. recuperar contexto existente
2. detectar si usuario sabe / tiene ideas / no sabe
3. construir Brief Narrativo
4. generar Territorios Narrativos si hace falta
5. construir candidatos de mundos y relaciones
6. definir rutinas, lugares, motivos y privacidad
7. traducir objetivos en hilos narrativos
8. definir tensiones controladas
9. construir modelo temporal y continuidad
10. construir NARRATIVE_STATE_CURRENT
11. simular eventos y secuencias
12. clasificar impacto narrativo
13. comprobar que borradores no cambian continuidad automaticamente
14. ejecutar validadores
15. recomendar arquitectura narrativa
16. esperar aprobacion explicita
17. bloquear solo elementos aprobados
18. conservar estado/eventos dinamicos por separado
19. propagar F08 hacia F09-F10
20. preservar historial y portabilidad
```

## 73. Mapeo fuente experta -> arquitectura AIIF

| Elemento fuente experta | Tratamiento en AIIF F08 |
|---|---|
| Storytelling completo | F08 construye el universo y continuidad; F09 lo convierte en contenido |
| Historia y contexto | Viene de F03; F08 no la reescribe |
| Hobbies y rutinas | F03 puede canonizarlos; F08 los integra en mundos y continuidad |
| Amigos/familia/mascotas | F03 registra hechos; F08 desarrolla relaciones funcionales |
| Colaboraciones | F08 puede modelarlas como relaciones/contextos; F11 define monetización |
| Escenarios recurrentes | F08 los organiza como lugares y mundos |
| Relaciones narrativas | Grafo de Relaciones y reglas de interacción |
| Objetivos y motivaciones | Se convierten en hilos de evolución, sin confundirlos con objetivos de negocio |
| Lugares frecuentes | F03 registra hechos; F08 define función narrativa y visibilidad |
| Elementos recurrentes | Motivos, objetos, rituales y símbolos con variación |
| Reglas de consistencia | `NARRATIVE_CONTINUITY_CANON` + validadores + Event Log |
| Pilares/calendario | No pertenecen a F08; F09 |
| Producción de escenas | No pertenece a F08; F10 |

## 74. Entregable oficial de F08

El entregable oficial es:

# Biblia Narrativa

Debe contener como mínimo:

1. resumen del universo;
2. principios de continuidad;
3. mundos narrativos;
4. lugares y niveles de visibilidad;
5. relaciones y personajes secundarios;
6. rutinas y rituales;
7. objetos y motivos recurrentes;
8. objetivos e hilos narrativos;
9. tensiones controladas;
10. modelo temporal;
11. estado narrativo actual;
12. resumen de eventos relevantes;
13. reglas de privacidad;
14. puentes hacia F09/F10;
15. versión, validación y estado de aprobación.

Puede complementarse con archivos técnicos como:

```text
narrative-universe.json
narrative-state.json
narrative-event-log.json
```

cuando aporten portabilidad.

## 75. UX simplificada

La experiencia visible recomendada:

```text
¿YA SABES COMO ES SU MUNDO?
        ->
SI -> validar y estructurar
IDEAS -> completar y comparar
NO -> descubrir juntos

DIRECCION NARRATIVA
        ->
MUNDOS Y VINCULOS
        ->
PRUEBAS
        ->
UNIVERSO RECOMENDADO
        ->
APROBACION
        ->
UNIVERSO NARRATIVO CANONICO
```

El usuario no necesita aprender `NR00-NR18` ni los objetos técnicos para usar la factoría.

## 76. Principio final propuesto

> **AI Influencer Factory debe poder construir un universo narrativo coherente aunque el usuario no sepa escribir storytelling. Debe partir de la biografía, personaje, marca, visual y voz ya aprobados para organizar pocos mundos reconocibles, relaciones funcionales, rutinas, lugares, motivos, objetivos y tensiones capaces de generar situaciones nuevas sin romper la identidad. Debe separar el canon estructural del estado narrativo dinámico, registrar solo los eventos que realmente afecten continuidad y evitar que borradores o publicaciones aisladas reescriban automáticamente la vida del personaje. F08 define qué existe en su mundo y cómo evoluciona; F09 decide qué convertir en contenido y F10 produce la escena.**

## 77. Estado de esta especificación

```text
ESTADO = PROPUESTA_LISTA_PARA_APROBACION
```

Hasta que el usuario diga de forma explícita que la aprueba o la vuelve canon:

- `NARRATIVE_UNIVERSE_CANON` es un identificador propuesto;
- `NARRATIVE_WORLD_SET_CANON` es un identificador propuesto;
- `RELATIONSHIP_GRAPH_CANON` es un identificador propuesto;
- `NARRATIVE_CONTINUITY_CANON` es un identificador propuesto;
- `NARRATIVE_STATE_CURRENT` y `NARRATIVE_EVENT_LOG` son objetos operativos propuestos;
- los validadores nuevos son propuestas;
- ninguna regla nueva de F08 debe considerarse bloqueada como canon global de AIIF.
