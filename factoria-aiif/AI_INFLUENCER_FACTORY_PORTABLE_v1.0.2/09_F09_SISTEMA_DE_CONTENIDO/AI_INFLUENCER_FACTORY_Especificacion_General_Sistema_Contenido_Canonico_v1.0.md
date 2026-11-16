---
spec_id: AIIF_GENERAL_CONTENT_SYSTEM_CANON_SPEC
spec_version: "1.0.0"
spec_type: AIIF_CONTENT_SYSTEM_DEFINITION_AND_CANONIZATION_SPEC
status: APROBADA
estado_documental: APROBADA
estado_documental_anterior: PROPUESTA_LISTA_PARA_APROBACION
base_aprobacion: "Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17"
revision_documental: "AIIF_PORTABLE_v1.0.2 (CR-0002)"
phase: "F09 - Sistema de Contenido"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "Biografía Influencer Digital con IA.docx"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Definición y Canonización del Sistema de Contenido
### Versión 1.0.0 — Aprobada (baseline comercial v1.0)

## 1. Propósito

Esta especificación define un sistema general y reutilizable para que AI Influencer Factory (AIIF) pueda **descubrir, diseñar, comparar, probar, validar, recomendar y, únicamente después de aprobación explícita, bloquear un Sistema de Contenido coherente** para un influencer virtual.

F09 convierte la estrategia, identidad, marca, visual, voz y universo narrativo ya aprobados en una arquitectura editorial capaz de sostener publicaciones durante meses sin improvisación, repetición mecánica ni deriva de identidad.

El sistema debe funcionar tanto cuando el creador ya sabe qué contenido quiere producir como cuando tiene ideas parciales o no sabe por dónde empezar.

Flujo visible recomendado:

```text
DIRECCION DE CONTENIDO
        ->
PILARES
        ->
SERIES / FORMATOS
        ->
SIMULACION 30 DIAS
        ->
SISTEMA RECOMENDADO
        ->
APROBACION
        ->
SISTEMA DE CONTENIDO CANONICO
```

La complejidad interna debe permanecer dentro de AIIF.

## 2. Fundamento experto de origen

La especificación original de expertos exige expresamente como salidas obligatorias:

- cinco pilares de contenido;
- calendario editorial de 30 días;
- copywriting con bios, tono, hashtags y CTA;
- prompts de imagen para múltiples escenarios;
- prompts de video;
- storytelling completo;
- reglas de consistencia.

También establece que el resultado debe ser una **marca personal viva, coherente, escalable y preparada para monetizar mediante contenido, colaboraciones, productos digitales y comunidad**.

La plantilla experta de biografía añade que hobbies, rutinas, relaciones y elementos recurrentes generan ideas de contenido, escenarios recurrentes y relaciones narrativas; asimismo, la biografía debe utilizarse para escribir captions y guiones y evitar improvisación incoherente.

### 2.1 Adaptación AIIF

La fuente experta no formaliza:

- un identificador `CONTENT_SYSTEM_CANON`;
- una taxonomía entre pilar, serie, formato y objetivo;
- una simulación editorial como prueba de estrés;
- separación entre calendario estructural y calendario operativo actual;
- validadores especializados de variedad y coherencia;
- etapas internas de canonización;
- gobernanza y portabilidad del sistema editorial.

Estas son **extensiones arquitectónicas de AIIF** para preservar y operacionalizar la intención experta original.

Regla de procedencia:

> AIIF debe preservar la exigencia experta de cinco pilares, calendario de 30 días, copywriting y consistencia, sin atribuir a la fuente original mecanismos técnicos que no estén allí formalizados.

## 3. Ubicación en la arquitectura

F09 pertenece a:

```text
F01 - Fundamentos Estrategicos
  -> F02 - Concepto
  -> F03 - Biografia e Identidad
  -> F04 - Personaje y Psicologia
  -> F05 - Identidad de Marca
  -> F06 - Identidad Visual
  -> F07 - Identidad Verbal y Voz
  -> F08 - Universo Narrativo
  -> F09 - Sistema de Contenido
  -> F10 - Produccion IA
  -> F11 - Monetizacion
  -> F12 - Crecimiento
  -> F13 - Consolidacion
```

F09 no crea una fase global adicional.

## 4. Dependencias principales

F09 debe intentar recuperar automáticamente, según disponibilidad y estado:

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
NARRATIVE_UNIVERSE_CANON
NARRATIVE_WORLD_SET_CANON
RELATIONSHIP_GRAPH_CANON
NARRATIVE_CONTINUITY_CANON
NARRATIVE_STATE_CURRENT
```

Además:

- audiencia;
- mercados;
- plataformas prioritarias;
- tiempo disponible;
- objetivo de 90 días;
- objetivo de monetización;
- restricciones de plataforma;
- capacidad de producción;
- idioma público;
- recursos disponibles.

## 5. Principio central

> **El sistema de contenido no debe ser una lista de ideas sueltas ni un calendario construido antes de definir su lógica. AIIF debe crear una arquitectura editorial estable que transforme el canon del influencer en contenido variado, reconocible, producible y escalable.**

El sistema debe permitir variedad sin perder identidad y repetición estratégica sin volverse mecánico.

## 6. Qué es y qué no es F09

### 6.1 F09 sí define

- cinco pilares principales de contenido;
- subpilares cuando aporten profundidad;
- función editorial de cada pilar;
- biblioteca o arquitectura de series;
- formatos compatibles;
- adaptación por plataforma;
- objetivos de contenido;
- mezcla o distribución editorial cuando aporte valor;
- frecuencia y cadencia recomendada;
- reglas de variedad;
- reglas de repetición;
- intensidad comercial permitida;
- CTA concreto por pieza;
- hashtags concretos cuando se planifique la pieza;
- bio pública específica por plataforma cuando corresponda;
- hooks y estructuras editoriales;
- briefs de contenido;
- calendario editorial de 30 días;
- backlog de ideas;
- reglas de consistencia;
- criterios para enviar piezas a F10.

### 6.2 F09 no debe redefinir

- nicho -> F01;
- concepto -> F02;
- biografía -> F03;
- personalidad -> F04;
- marca -> F05;
- identidad visual -> F06;
- identidad verbal -> F07;
- mundo y continuidad narrativa -> F08;
- generación final de imagen/video/audio -> F10;
- estrategia de monetización detallada -> F11;
- experimentos y tácticas de growth -> F12.

## 7. Distinciones editoriales obligatorias

F09 debe mantener separados los siguientes conceptos:

```text
PILAR
!= SERIE
!= FORMATO
!= OBJETIVO
!= MUNDO NARRATIVO
!= PIEZA
```

### 7.1 Pilar

Territorio editorial estable que organiza **qué tipo de valor, tema o experiencia** aporta el contenido.

### 7.2 Subpilar

Subdivisión útil de un pilar. No es obligatorio si solo añade complejidad.

### 7.3 Serie

Concepto editorial recurrente con una premisa reconocible que puede repetirse con variaciones.

### 7.4 Formato

Forma de empaquetar la pieza: reel, carrusel, story, foto, video corto, live, etc.

### 7.5 Objetivo de contenido

Razón estratégica por la que existe una pieza: atraer, conectar, educar, demostrar, narrar, convertir u otra función definida para el proyecto.

No existe una taxonomía universal obligatoria; AIIF debe adaptar los objetivos al proyecto.

### 7.6 Mundo narrativo

Contexto de F08 donde puede ocurrir una pieza. Un mundo narrativo no debe convertirse automáticamente en pilar.

### 7.7 Pieza

Unidad concreta planificada para publicación o producción.

## 8. Tres rutas de entrada

### Ruta A - El usuario ya tiene un sistema de contenido

AIIF debe:

1. extraer pilares, series, formatos y frecuencia;
2. clasificar qué es canon previo y qué es preferencia actual;
3. detectar duplicaciones o confusiones;
4. validar contra F01-F08;
5. completar solo huecos críticos;
6. someter el sistema a simulación de 30 días.

### Ruta B - El usuario tiene ideas parciales

AIIF debe preservar las ideas útiles y organizarlas en una arquitectura coherente antes de pedir información adicional.

### Ruta C - El usuario no sabe qué contenido crear

AIIF debe activar Inicio Fácil y construir primero **Territorios de Contenido**, no lanzar 30 publicaciones arbitrarias.

## 9. Inicio Fácil aplicado a F09

Mensaje conceptual:

> No necesitas saber todavía qué publicar cada día. Usaré el nicho, concepto, personalidad, marca, identidad visual, voz y universo narrativo ya aprobados para proponerte direcciones de contenido. Primero construiremos la lógica; después probaremos si puede sostener 30 días sin repetirse.

Activadores naturales:

```text
No se
Dame opciones
Recomiendame
Decide tu
Haz lo mejor
No tengo ideas
```

## 10. Territorios de Contenido

Cuando el usuario parte desde cero, AIIF puede proponer normalmente entre 2 y 4 direcciones editoriales globales.

Un Territorio de Contenido debe explicar:

- qué experiencia editorial produce;
- qué parte del canon activa;
- qué tipo de audiencia puede atraer;
- qué fortalezas comerciales tiene;
- qué riesgo de repetición presenta;
- qué capacidad narrativa y visual ofrece;
- qué exigencia de producción implica.

Los territorios son candidatos, no canon.

## 11. Regla de los cinco pilares

La fuente experta exige **cinco pilares de contenido**.

Por fidelidad metodológica, F09 debe producir normalmente:

```text
5 PILARES PRINCIPALES
```

Cada pilar debe ser suficientemente distinto y suficientemente profundo.

### 11.1 Excepción controlada

Si un proyecto necesita desviarse de cinco pilares, la desviación debe:

1. ser explícita;
2. justificarse;
3. registrarse como adaptación respecto a la fuente experta;
4. recibir aprobación del usuario.

La IA no debe cambiar silenciosamente el número solo por preferencia propia.

## 12. Anatomía de un pilar

Cada pilar debe documentar, como mínimo:

```json
{
  "pillar_id": "[ID]",
  "name_visible": "[NOMBRE]",
  "strategic_function": "[FUNCION]",
  "audience_value": "[VALOR]",
  "brand_connection": "[CONEXION]",
  "narrative_sources": ["..."],
  "subpillars": [],
  "compatible_formats": [],
  "commercial_capacity": "[BAJA|MEDIA|ALTA|VARIABLE]",
  "production_difficulty": "[BAJA|MEDIA|ALTA]",
  "risks": [],
  "boundaries": []
}
```

## 13. Criterios de calidad de un pilar

Un pilar sólido debe:

- encajar con `NICHE_CANON`;
- expresar `CONCEPT_CANON`;
- ser coherente con la marca;
- poder usar el universo narrativo sin depender totalmente de él;
- tener suficiente profundidad;
- no ser un formato disfrazado de tema;
- no ser una campaña temporal;
- no depender de una sola plataforma;
- permitir variedad de piezas;
- ser producible con los recursos disponibles.

## 14. Subpilares

Los subpilares se crean solo cuando:

- aumentan claridad;
- reducen repetición;
- facilitan planificación;
- permiten separar tipos de valor dentro de un pilar.

No deben multiplicarse hasta volver inmanejable el sistema.

## 15. Arquitectura de Series

F09 puede crear una biblioteca de series recurrentes.

Una serie debe tener:

- premisa;
- pilar principal;
- objetivo habitual;
- estructura reconocible;
- variables que cambian;
- elementos que permanecen;
- frecuencia sugerida;
- límites de repetición;
- formatos compatibles.

### 15.1 Serie no es canon obligatorio por defecto

Las series pueden evolucionar más rápido que los pilares.

Por ello, AIIF puede mantener:

```text
CONTENT_SERIES_LIBRARY
```

con series en distintos estados.

Solo las series estratégicamente centrales que el usuario apruebe expresamente deben bloquearse como parte del sistema canónico.

## 16. Formatos

F09 debe definir una Matriz de Formatos compatible con las plataformas del proyecto.

Ejemplos genéricos:

- imagen individual;
- carrusel;
- reel/video corto;
- story;
- video hablado;
- UGC;
- live;
- post de texto;
- formato editorial específico de plataforma.

Los formatos cambian más rápido que la identidad, por lo que deben revalidarse cuando cambien plataformas o capacidades.

## 17. Matriz Pilar x Formato

La matriz debe comprobar que el sistema no dependa de una sola forma de publicación.

```text
              FOTO  CARRUSEL  REEL  STORY  HABLADO  UGC
PILAR 01       ...     ...     ...    ...     ...    ...
PILAR 02       ...     ...     ...    ...     ...    ...
...
```

No es obligatorio que todos los pilares funcionen en todos los formatos.

## 18. Objetivos de contenido

AIIF debe definir un conjunto de objetivos editoriales adaptado al proyecto.

Ejemplos posibles, no catálogo obligatorio:

```text
DESCUBRIMIENTO
CONEXION
CONFIANZA
EDUCACION
ENTRETENIMIENTO
NARRATIVA
PRUEBA / DEMOSTRACION
COMUNIDAD
CONVERSION
RETENCION
```

La selección debe responder a la estrategia del influencer.

## 19. Matriz Pilar x Objetivo

Cada pilar debe poder contribuir a uno o varios objetivos sin que todos intenten vender o educar a la vez.

La matriz ayuda a prevenir:

- monotonía;
- sobrecomercialización;
- pilares sin función;
- falta de conexión emocional;
- contenido sin dirección estratégica.

## 20. Mezcla y distribución editorial

F09 puede definir pesos o rangos de distribución entre pilares cuando aporte valor.

Regla:

> **No usar pesos ocultos.**

Si no existen pesos aportados por el usuario, AIIF puede:

1. trabajar cualitativamente;
2. proponer una mezcla explícita y justificable;
3. permitir que el usuario la apruebe o modifique.

No existe un porcentaje universal correcto.

## 21. Cadencia y frecuencia

F09 puede proponer:

- publicaciones por semana;
- distribución por plataforma;
- proporción entre formatos;
- ritmo de stories;
- frecuencia de series;
- días de descanso editorial;
- intensidad comercial.

Debe considerar:

- tiempo disponible;
- capacidad de producción;
- reutilización entre plataformas;
- objetivo de 90 días;
- sostenibilidad.

La frecuencia no debe imponerse solo por una tendencia de plataforma.

## 22. Regla de sostenibilidad

Un sistema de contenido es inválido si exige una carga que el creador no puede sostener razonablemente.

F09 debe contrastar:

```text
VOLUMEN DE CONTENIDO
<-> TIEMPO DISPONIBLE
<-> CAPACIDAD DE PRODUCCION
<-> COMPLEJIDAD DE F10
```

## 23. Contenido y universo narrativo

Regla canónica propuesta:

> **F08 define qué existe en su mundo. F09 decide qué parte convertir en contenido.**

F09 puede usar:

- mundos;
- rutinas;
- relaciones;
- lugares;
- motivos;
- hilos narrativos;
- estado narrativo actual.

Pero no debe convertir cada elemento de F08 en un pilar ni crear nuevos hechos narrativos de forma automática.

## 24. Impacto narrativo de una pieza

Todo brief narrativo puede declarar:

```text
NARRATIVE_IMPACT:
NONE
CONTEXTUAL
STATE_CHANGE
CANON_CHANGE
```

Si una pieza propone `STATE_CHANGE` o `CANON_CHANGE`, debe respetar el flujo de continuidad de F08 antes de tratarla como hecho confirmado.

## 25. Contenido privado y límites narrativos

F09 debe respetar las reglas de visibilidad de F08.

Un elemento puede existir en canon y no ser publicable.

La planificación no debe convertir automáticamente intimidad narrativa en materia de contenido.

## 26. Relación F07 / F09

F07 define **cómo se comunica**.

F09 define:

- qué mensaje concreto se publica;
- CTA concreto;
- hashtags concretos;
- hook concreto;
- bio específica de plataforma cuando se actualiza;
- testing de copy;
- guion editorial de la pieza.

F09 no debe cambiar `VERBAL_IDENTITY_CANON` para mejorar una métrica puntual.

## 27. Hooks

F09 puede definir familias de hooks compatibles con identidad y plataforma.

Ejemplos de función, no frases obligatorias:

- curiosidad;
- contraste;
- pregunta;
- observación;
- promesa de valor;
- confesión narrativa compatible;
- demostración;
- escena en progreso;
- microhistoria.

Evitar hooks que rompan marca o prometan algo falso solo por captar atención.

## 28. CTA concretos

F09 selecciona el CTA concreto de cada pieza usando las reglas de F07.

Puede clasificar el CTA por función:

- guardar;
- comentar;
- compartir;
- seguir;
- visitar enlace;
- preguntar;
- responder;
- comprar/convertir cuando corresponda;
- ningún CTA explícito.

No toda pieza necesita CTA explícito.

## 29. Hashtags

F09 puede seleccionar hashtags concretos por pieza o plataforma.

Reglas:

- respetar estilo F07;
- no tratar hashtags como identidad canónica;
- poder actualizarlos sin recanonizar F09;
- evitar listas mecánicas permanentes;
- distinguir hashtags de marca, categoría, tema, serie o campaña cuando corresponda.

## 30. Bios por plataforma

F07 define la identidad de bio; F09 puede mantener versiones operativas específicas para cada plataforma.

Se propone:

```text
PUBLIC_PROFILE_COPY_CURRENT
```

como objeto actualizable.

Una actualización de bio no modifica automáticamente `BRAND_POSITIONING_CANON` ni `VERBAL_IDENTITY_CANON`.

## 31. Estructuras editoriales

F09 puede definir patrones de pieza reutilizables, por ejemplo:

```text
HOOK
-> CONTEXTO
-> VALOR / ESCENA / IDEA
-> GIRO O CIERRE
-> CTA, SI APLICA
```

No debe obligar a que toda publicación siga la misma fórmula.

## 32. Brief de Contenido

Antes de producción, cada pieza aprobada debería poder resumirse en un objeto portable:

```json
{
  "content_id": "[ID]",
  "status": "BORRADOR|VALIDADO|APROBADO_PARA_PRODUCCION",
  "platform": "[PLATAFORMA]",
  "format": "[FORMATO]",
  "pillar": "[PILAR]",
  "subpillar": "[SUBPILAR_OPCIONAL]",
  "series": "[SERIE_OPCIONAL]",
  "objective": "[OBJETIVO]",
  "narrative_world": "[MUNDO_OPCIONAL]",
  "narrative_impact": "NONE|CONTEXTUAL|STATE_CHANGE|CANON_CHANGE",
  "core_message": "[MENSAJE]",
  "hook": "[HOOK]",
  "cta": "[CTA_OPCIONAL]",
  "hashtags": [],
  "verbal_rules_ref": "VERBAL_IDENTITY_CANON",
  "visual_rules_ref": "VISUAL_IDENTITY_CANON",
  "narrative_rules_ref": "NARRATIVE_CONTINUITY_CANON",
  "production_notes": [],
  "approval_required": true
}
```

F10 debe poder trabajar a partir de este brief sin inventar estrategia editorial adicional.

## 33. Selector de combinaciones

Como extensión opcional, AIIF puede usar un selector estructurado para combinar variables sin perder trazabilidad:

```text
PLATAFORMA
x FORMATO
x PILAR
x OBJETIVO
x MUNDO / ESTADO NARRATIVO
x LOCALIZACION
x ACCION
x VESTUARIO
x EXPRESION
```

Las variables visuales deben respetar F06 y las narrativas F08.

El producto cartesiano es una herramienta de exploración, no una obligación de generar todas las combinaciones.

## 34. Backlog de Contenido

Se propone:

```text
CONTENT_BACKLOG
```

como repositorio dinámico de ideas, briefs y oportunidades.

No es canon estructural.

Los elementos pueden estar:

- idea;
- candidato;
- borrador;
- validado;
- aprobado para producción;
- producido;
- publicado;
- archivado;
- rechazado.

Estos estados son estados del objeto editorial, no nuevos estados globales del proyecto.

## 35. Simulación Editorial de 30 días

Antes de bloquear F09, AIIF debe construir una **simulación editorial de 30 días**.

Su objetivo no es adelantar producción final, sino comprobar que el sistema puede sostenerse.

Se propone:

```text
EDITORIAL_SIMULATION_30D
```

Debe incluir 30 días o un período de 30 días con la cadencia real propuesta, según la estrategia.

Si no se publica todos los días, el calendario puede contener días sin publicación o actividades editoriales no públicas.

## 36. Qué valida la simulación de 30 días

Debe revisar:

- cobertura de los cinco pilares;
- profundidad suficiente de cada pilar;
- variedad de formatos;
- variedad de objetivos;
- balance entre narrativa y valor directo;
- intensidad comercial;
- repetición de lugares y rutinas;
- variación visual;
- coherencia verbal;
- sostenibilidad de producción;
- continuidad narrativa;
- adaptación a plataforma;
- ausencia de contradicciones.

## 37. Regla anti-repetición

AIIF debe detectar repetición en varios niveles:

- mismo tema;
- mismo hook;
- misma estructura;
- mismo escenario;
- misma pose/acción cuando dependa del brief;
- mismo CTA;
- mismo objetivo;
- misma serie con frecuencia excesiva;
- misma intensidad emocional.

Repetir estratégicamente una serie es válido.
Repetir mecánicamente una pieza no lo es.

## 38. Regla de variedad coherente

Variedad no significa aleatoriedad.

Una pieza puede cambiar formato, escenario y objetivo sin dejar de pertenecer al mismo sistema de marca.

El objetivo es:

```text
CONSISTENCIA + VARIACION
```

no:

```text
CONSISTENCIA = REPETICION
```

y tampoco:

```text
VARIACION = CAMBIO DE IDENTIDAD
```

## 39. Calendario operativo actual

Después de aprobar el sistema, AIIF puede mantener:

```text
EDITORIAL_CALENDAR_CURRENT
```

Este calendario es operativo y evolutivo.

Puede cambiar por:

- eventos;
- disponibilidad de producción;
- campañas;
- oportunidades;
- aprendizaje de F12;
- cambios de plataforma;
- estado narrativo.

Modificarlo no implica recanonizar `CONTENT_SYSTEM_CANON`.

## 40. Diferencia entre simulación y calendario actual

```text
EDITORIAL_SIMULATION_30D
= prueba de estrés previa o periódica

EDITORIAL_CALENDAR_CURRENT
= plan operativo vigente
```

Ninguno sustituye el canon estructural.

## 41. Contenido evergreen, recurrente y oportunista

F09 puede clasificar piezas como:

- evergreen;
- recurrentes;
- narrativas;
- comerciales;
- oportunistas;
- campaña;
- respuesta a comunidad;
- experimentales.

Las categorías son adaptables al proyecto.

## 42. Contenido comercial

F09 puede definir espacio editorial para contenido comercial compatible con `VALUE_PROPOSITION_CANON`.

Pero F11 sigue definiendo:

- ofertas;
- productos;
- servicios;
- pricing;
- secuencia de monetización;
- paquetes comerciales.

F09 planifica **cómo integrar comercialmente el contenido sin romper la marca**.

## 43. Intensidad comercial

AIIF puede definir una política de intensidad comercial por pilar, formato o período.

No se requiere una regla matemática universal.

Debe evitar:

- convertir todas las piezas en venta;
- ocultar toda posibilidad de conversión;
- introducir ofertas incompatibles con la narrativa;
- usar urgencia artificial contraria a F07/F05.

## 44. Adaptación por plataforma

F09 puede mantener perfiles operativos por plataforma:

```text
PLATFORM_CONTENT_PROFILE
```

Puede incluir:

- formatos disponibles;
- duración típica;
- profundidad de caption;
- rol de stories;
- CTA compatibles;
- frecuencia;
- restricciones;
- reutilización/cross-post.

Estos perfiles son revalidables y no deben congelar para siempre reglas de plataformas cambiantes.

## 45. Reutilización entre plataformas

AIIF debe distinguir:

```text
MISMA IDEA
!= MISMA EJECUCION IDENTICA
```

Una idea puede adaptarse a varias plataformas conservando:

- mensaje;
- pilar;
- identidad;
- objetivo;

pero cambiando:

- duración;
- formato;
- hook;
- montaje;
- CTA;
- caption.

## 46. Localización de contenido

Cuando existan varios idiomas o mercados, F09 puede localizar piezas usando F07.

No debe traducir literalmente cuando eso reduzca naturalidad o claridad.

Debe conservar:

- intención editorial;
- pilar;
- objetivo;
- personalidad;
- posicionamiento;
- límites culturales aprobados.

## 47. Pruebas de Sistema de Contenido

Antes de recomendar F09, AIIF debe ejecutar pruebas como:

### 47.1 Prueba de 30 días

¿Puede sostener un mes sin agotarse o repetirse?

### 47.2 Prueba de profundidad por pilar

¿Cada pilar puede generar suficientes ángulos distintos?

### 47.3 Prueba multiplataforma

¿Puede adaptarse sin perder identidad?

### 47.4 Prueba de contenido hablado

¿F07 y F10 pueden soportar las piezas cuando hay voz?

### 47.5 Prueba narrativa

¿F08 aporta contexto sin que todo contenido dependa de una trama?

### 47.6 Prueba comercial

¿Puede integrar colaboraciones o conversión sin romper confianza?

### 47.7 Prueba de producción

¿Es viable con tiempo, herramientas y complejidad disponibles?

### 47.8 Prueba de privacidad

¿Respeta lo que F08 marcó como privado o no compartible?

### 47.9 Prueba anti-clonación

¿Las piezas se sienten distintas entre sí aunque compartan identidad?

### 47.10 Prueba de expansión

¿El sistema puede crecer sin depender de una tendencia puntual?

## 48. Matriz de Comparación de Sistemas de Contenido

Si existen alternativas, se puede comparar:

| Criterio | Opción A | Opción B | Opción C |
|---|---|---|---|
| Coherencia con F01-F08 | | | |
| Claridad de pilares | | | |
| Profundidad | | | |
| Variedad | | | |
| Potencial narrativo | | | |
| Potencial comercial | | | |
| Ajuste a audiencia | | | |
| Sostenibilidad | | | |
| Factibilidad de producción | | | |
| Flexibilidad multiplataforma | | | |
| Riesgo de repetición | | | |
| Escalabilidad | | | |

No se requiere un `CONTENT_SCORE` numérico obligatorio.

## 49. Recomendación experta

AIIF puede presentar:

```json
{
  "recommended_content_system": "[CANDIDATO]",
  "why": ["..."],
  "strengths": ["..."],
  "risks": ["..."],
  "thirty_day_test_result": "[RESULTADO]",
  "approval_required": true
}
```

Regla:

```text
RECOMENDADO != CANONICO
```

## 50. Identificadores técnicos propuestos

Se proponen:

```text
CONTENT_SYSTEM_CANON
CONTENT_PILLAR_SET_CANON
CONTENT_FORMAT_MATRIX_CANON
CONTENT_EDITORIAL_RULES_CANON
```

Objetos dinámicos:

```text
CONTENT_SERIES_LIBRARY
CONTENT_BACKLOG
EDITORIAL_SIMULATION_30D
EDITORIAL_CALENDAR_CURRENT
PUBLIC_PROFILE_COPY_CURRENT
PLATFORM_CONTENT_PROFILE
```

## 51. Nombres visibles/documentales

Con `IDIOMA_CANONICO_DOCUMENTAL = ES`:

- `CONTENT_SYSTEM_CANON` -> Sistema de Contenido Canónico;
- `CONTENT_PILLAR_SET_CANON` -> Conjunto Canónico de Pilares de Contenido;
- `CONTENT_FORMAT_MATRIX_CANON` -> Matriz Canónica de Formatos de Contenido;
- `CONTENT_EDITORIAL_RULES_CANON` -> Reglas Editoriales Canónicas;
- `CONTENT_SERIES_LIBRARY` -> Biblioteca de Series de Contenido;
- `CONTENT_BACKLOG` -> Backlog de Contenido / Banco de Contenido;
- `EDITORIAL_SIMULATION_30D` -> Simulación Editorial de 30 Días;
- `EDITORIAL_CALENDAR_CURRENT` -> Calendario Editorial Actual;
- `PUBLIC_PROFILE_COPY_CURRENT` -> Copy Público Actual de Perfil;
- `PLATFORM_CONTENT_PROFILE` -> Perfil de Contenido por Plataforma.

Los IDs técnicos pueden permanecer en inglés por interoperabilidad; la documentación visible se mantiene en español.

## 52. Validadores propuestos

Se proponen:

```text
VALIDADOR_DE_SISTEMA_DE_CONTENIDO
VALIDADOR_DE_VARIACION_Y_NO_REPETICION
VALIDADOR_DE_COHERENCIA_DE_CONTENIDO_CON_CANON
```

### 52.1 Validador de Sistema de Contenido

Comprueba:

- existencia de cinco pilares o desviación explícitamente aprobada;
- función de cada pilar;
- profundidad;
- relación con audiencia;
- formatos;
- series;
- objetivos;
- calendario de prueba;
- sostenibilidad;
- coherencia comercial;
- aprobación suficiente.

### 52.2 Validador de Variación y No Repetición

Comprueba:

- diversidad temática;
- diversidad de hooks;
- diversidad de estructura;
- diversidad de formato;
- diversidad narrativa/visual cuando corresponda;
- repetición estratégica vs mecánica;
- saturación de series o CTA.

### 52.3 Validador de Coherencia de Contenido con Canon

Comprueba coherencia con:

```text
NICHE_CANON
CONCEPT_CANON
BIOGRAPHY_CANON
CHARACTER_CANON
BRAND_IDENTITY_CANON
VISUAL_IDENTITY_CANON
VERBAL_IDENTITY_CANON
NARRATIVE_UNIVERSE_CANON
NARRATIVE_CONTINUITY_CANON
```

## 53. Resultados de validación

Se reutilizan los resultados generales:

```text
VALIDA
VALIDA_CON_OBSERVACIONES
REQUIERE_AJUSTES
REQUIERE_DECISION_USUARIO
NO_APTA_PARA_BLOQUEO
```

## 54. Aprobación granular

F09 puede aprobar por:

- pilar;
- conjunto de pilares;
- subpilar;
- serie central;
- matriz de formatos;
- regla editorial;
- mezcla;
- política de CTA;
- sistema completo.

La aprobación de un calendario no equivale por sí sola a aprobación del sistema completo.

## 55. Bloqueo

Tras aprobación suficiente:

```text
ESTADO_DATO = BLOQUEADO
CONTENT_SYSTEM_CANON = [...]
CONTENT_PILLAR_SET_CANON = [...]
CONTENT_FORMAT_MATRIX_CANON = [...]
CONTENT_EDITORIAL_RULES_CANON = [...]
```

Los objetos dinámicos continúan evolucionando sin quedar congelados como estructuras inmutables.

## 56. Qué NO convierte algo en canon

No constituyen canonización por sí mismos:

```text
"Me gusta este post"
"Haz otro parecido"
"Publica esta semana asi"
"Prueba mas reels"
"Usa este hashtag"
"Este calendario se ve bien"
```

Debe existir aprobación explícita de la estructura correspondiente.

## 57. Relación F05 / F09

F05 define la estrategia de marca.
F09 traduce esa estrategia a arquitectura editorial.

Una publicación de alto rendimiento no debe cambiar automáticamente `BRAND_POSITIONING_CANON`.

## 58. Relación F06 / F09

F06 define identidad visual.
F09 puede pedir variaciones visuales dentro de lo permitido.

F09 no puede modificar:

- rostro;
- cuerpo;
- estilo visual;
- referencias canónicas;
- firma visual;

para obtener variedad editorial.

## 59. Relación F07 / F09

Regla:

> **F07 define cómo se comunica. F09 define qué mensaje concreto se publica, en qué formato, con qué objetivo, CTA y adaptación editorial.**

## 60. Relación F08 / F09

Regla:

> **F08 define qué existe en el mundo del influencer. F09 decide qué parte convertir en contenido.**

F09 no puede confirmar un evento narrativo por el simple hecho de planificarlo.

## 61. Relación F09 / F10

Regla:

> **F09 diseña y aprueba el brief editorial; F10 produce el activo.**

F09 entrega a F10:

- objetivo;
- pilar;
- formato;
- mensaje;
- hook;
- CTA;
- contexto narrativo;
- restricciones visuales/verbal/narrativas;
- requisitos de producción.

F10 no debe inventar un nuevo pilar ni cambiar el propósito editorial de la pieza silenciosamente.

## 62. Relación F09 / F11

F09 puede reservar espacio y formatos para monetización.
F11 define qué se monetiza, cuándo y mediante qué ruta.

Si F11 introduce una oferta nueva, F09 puede requerir revalidación parcial de piezas comerciales, no de todo el sistema.

## 63. Relación F09 / F12

F12 puede experimentar con:

- frecuencia;
- hooks;
- formatos;
- horarios;
- duración;
- distribución;
- plataforma;
- variantes de CTA.

Pero un experimento exitoso no cambia automáticamente el canon de F09.

Los aprendizajes sostenidos pueden abrir una propuesta de revisión controlada.

## 64. Etapas internas del subsistema

Para no confundirse con F01-F13, F09 utiliza etapas internas `CT00-CT20`:

```text
CT00 - Detectar ruta de entrada
CT01 - Cargar canon F01-F08
CT02 - Construir Brief de Contenido
CT03 - Generar Territorios de Contenido
CT04 - Diseñar cinco Pilares candidatos
CT05 - Definir Subpilares
CT06 - Construir Series
CT07 - Construir Matriz de Formatos
CT08 - Definir Objetivos de Contenido
CT09 - Definir Mezcla y Cadencia
CT10 - Definir Adaptacion por Plataforma
CT11 - Definir reglas de Hooks / CTA / Hashtags
CT12 - Construir Brief de Contenido portable
CT13 - Generar Simulacion Editorial de 30 Dias
CT14 - Ejecutar prueba de variacion / repeticion
CT15 - Ejecutar prueba de sostenibilidad / produccion
CT16 - Comparar sistemas alternativos
CT17 - Ejecutar validadores
CT18 - Presentar recomendacion
CT19 - Aprobar y Bloquear
CT20 - Generar calendario actual y puente a F10
```

Estas etapas son internas.

## 65. Brief de Contenido de F09

Estructura conceptual:

```json
{
  "project_id": "[ID]",
  "canon_refs": {
    "niche": "[NICHE_CANON]",
    "concept": "[CONCEPT_CANON]",
    "brand": "[BRAND_IDENTITY_CANON]",
    "visual": "[VISUAL_IDENTITY_CANON]",
    "verbal": "[VERBAL_IDENTITY_CANON]",
    "narrative": "[NARRATIVE_UNIVERSE_CANON]"
  },
  "audience": {},
  "markets": [],
  "platforms": [],
  "time_available": "",
  "goal_90_days": "",
  "monetization_direction": "",
  "production_capacity": "",
  "existing_content_ideas": [],
  "restrictions": [],
  "open_questions": []
}
```

## 66. Profundidad de trabajo

Se reutilizan:

### NUCLEO

- cinco pilares;
- función de cada uno;
- formatos principales;
- cadencia básica;
- prueba compacta de 30 días;
- reglas esenciales.

### AMPLIADO - predeterminado

- subpilares;
- series;
- matrices de objetivos y formatos;
- mezcla;
- adaptación por plataforma;
- CTA/hashtags;
- simulación completa de 30 días;
- validadores.

### PROFUNDO

- múltiples escenarios de mezcla;
- varias arquitecturas comparadas;
- biblioteca extensa de series;
- matrices multiplataforma/multilingües;
- reglas de reutilización;
- pruebas de producción y comercialización más detalladas.

## 67. Simulaciones de sistema

Antes de canonizar, AIIF puede simular versiones:

```text
MAS EDUCATIVA
MAS NARRATIVA
MAS ASPIRACIONAL
MAS COTIDIANA
MAS COMERCIAL
MAS COMUNITARIA
MAS VIDEO-FIRST
MAS VISUAL
MAS SERIALIZADA
MAS LIGERA DE PRODUCCION
```

Cada simulación debe mostrar qué cambia, qué permanece y qué impacto tiene.

Una simulación no cambia el canon.

## 68. Investigación externa

F09 puede usar investigación externa cuando la plataforma lo permita y aporte valor para:

- observar formatos emergentes;
- estudiar patrones de categoría;
- detectar saturación;
- comprender comportamientos de audiencia;
- revisar convenciones de plataforma.

La investigación externa **no debe sustituir el canon ni copiar a otro creador**.

El sistema debe distinguir:

```text
VERIFICADO
PARCIALMENTE_VERIFICADO
NO_VERIFICADO
NO_DISPONIBLE
```

## 69. Regla anti-copia

Referencias de contenido sirven para analizar:

- estructura;
- ritmo;
- formato;
- categoría;
- oportunidad;

no para duplicar:

- identidad;
- captions;
- guiones;
- series distintivas;
- conceptos propietarios;
- estética canónica ajena.

## 70. Historial y trazabilidad

F09 debe conservar cuando sea relevante:

- territorios descartados;
- pilares candidatos;
- cambios de nombres de pilares;
- series retiradas;
- simulaciones;
- calendarios de prueba;
- motivos de aprobación;
- resultados de validadores;
- revisiones de mezcla;
- cambios estructurales.

## 71. Gobernanza de cambios

Modificar un elemento bloqueado de F09 requiere, según impacto:

```text
INSTRUCCION EXPLICITA
-> CHECKPOINT
-> PROPUESTA / SIMULACION
-> ANALISIS DE IMPACTO
-> REVALIDACION
-> APROBACION
-> REGISTRO DE CAMBIO
-> NUEVA VERSION
-> REVALIDACION DE DERIVADOS
```

Cambiar una pieza del calendario actual normalmente no requiere cambiar canon.

## 72. Impacto de cambios

Ejemplos:

- cambiar un hashtag -> normalmente `SIN_IMPACTO_CANONICO`;
- cambiar CTA de una pieza -> `SIN_IMPACTO_CANONICO`;
- cambiar frecuencia semanal -> revisar política/capacidad, puede ser operativo;
- retirar una serie no central -> actualización de biblioteca;
- sustituir un pilar -> `REVALIDAR` múltiples dependencias;
- cambiar objetivo editorial global -> posible revisión de `CONTENT_SYSTEM_CANON`;
- convertir contenido narrativo en comercial masivo -> revisar F05/F08/F11.

## 73. Revalidación progresiva

F09 debe revalidarse con:

- F10: factibilidad y resultados de producción;
- F11: rutas de monetización;
- F12: aprendizajes de crecimiento;
- F13: consolidación.

Los cambios no se aplican silenciosamente.

## 74. Compatibilidad de plataforma

F09 debe funcionar en Modo Básico Universal.

No requiere:

- acceso nativo a redes;
- publicación automática;
- analítica integrada;
- generador de imagen/video;
- plan premium.

Puede producir calendario, briefs y reglas para ejecución manual.

## 75. Portabilidad

F09 debe incluirse en:

- Paquete Portable;
- Paquete Portable Ligero;
- Archivo Universal de Reanudación.

Debe poder transportar:

- `CONTENT_SYSTEM_CANON`;
- `CONTENT_PILLAR_SET_CANON`;
- `CONTENT_FORMAT_MATRIX_CANON`;
- `CONTENT_EDITORIAL_RULES_CANON`;
- biblioteca de series relevante;
- mezcla/cadencia;
- perfiles de plataforma;
- calendario actual;
- backlog prioritario;
- reglas de CTA/hashtags;
- resultados de la simulación 30 días;
- pendientes;
- próxima acción.

## 76. Output técnico antes de aprobación

```json
{
  "f09_content_system": {
    "status": "BORRADOR|VALIDADO|REQUIERE_AJUSTES",
    "route": "EXISTING|PARTIAL|DISCOVERY",
    "content_territories": [],
    "pillar_candidates": [],
    "series_library": [],
    "format_matrix": {},
    "objective_matrix": {},
    "content_mix": {},
    "platform_profiles": {},
    "editorial_rules": {},
    "editorial_simulation_30d": [],
    "validator_results": {},
    "approval_required": true
  }
}
```

## 77. Output técnico después de aprobación

```json
{
  "f09_canonical_content": {
    "content_system_canon": {},
    "content_pillar_set_canon": [],
    "content_format_matrix_canon": {},
    "content_editorial_rules_canon": {},
    "series_library": [],
    "editorial_calendar_current": [],
    "content_backlog": [],
    "status": "BLOQUEADO",
    "approved_by_user": true,
    "version": "[VERSION]",
    "effective_date": "[DATE]",
    "historical_variants_preserved": true
  }
}
```

## 78. Algoritmo operativo

```text
INPUT: canon F01-F08 + audiencia + plataformas + capacidad + objetivo

1. recuperar contexto existente
2. detectar si usuario sabe / tiene ideas / no sabe
3. construir Brief de Contenido
4. generar Territorios de Contenido si hace falta
5. proponer cinco Pilares principales
6. definir subpilares solo cuando aporten valor
7. construir series candidatas
8. construir matriz de formatos
9. definir objetivos de contenido
10. definir mezcla y cadencia explicitas
11. adaptar por plataforma
12. definir reglas de hook / CTA / hashtags
13. generar briefs de prueba
14. construir simulacion editorial de 30 dias
15. validar variedad, profundidad y sostenibilidad
16. validar coherencia con canon F01-F08
17. comparar alternativas si existen
18. presentar recomendacion
19. esperar aprobacion explicita
20. bloquear solo la estructura aprobada
21. generar EDITORIAL_CALENDAR_CURRENT
22. preparar briefs aprobados para F10
23. conservar historial y portabilidad
```

## 79. Mapeo fuente experta -> arquitectura AIIF

| Elemento de fuente experta | Tratamiento en F09 |
|---|---|
| Cinco pilares de contenido | Núcleo obligatorio por defecto; `CONTENT_PILLAR_SET_CANON` |
| Calendario editorial de 30 días | Simulación de validación + calendario operativo derivado |
| Copywriting: bios, tono | Tono viene de F07; F09 aplica versión concreta por pieza/plataforma |
| Hashtags | F09 selecciona concretos; no son canon permanente |
| CTA | F07 define estilo; F09 selecciona CTA concreto |
| Storytelling | F08 define mundo/continuidad; F09 editorializa |
| Prompts imagen/video | F09 aporta brief; F10 genera prompt/producción final |
| Reglas de consistencia | Reglas editoriales + validadores + referencias a canon F01-F08 |
| Comunidad/monetización | F09 integra objetivos; F11 define estrategia de monetización |
| Growth | F12 experimenta sobre el sistema sin cambiarlo automáticamente |

## 80. Entregable oficial

El entregable oficial de F09 es:

# Biblia de Contenido

Debe contener como mínimo:

1. resumen del sistema;
2. cinco pilares principales;
3. subpilares cuando existan;
4. biblioteca de series relevante;
5. matriz de formatos;
6. objetivos editoriales;
7. mezcla y cadencia;
8. perfiles por plataforma;
9. reglas de hooks;
10. reglas y ejemplos de CTA;
11. reglas de hashtags;
12. integración narrativa;
13. reglas visuales/verbal por referencia;
14. política comercial editorial;
15. simulación editorial de 30 días;
16. calendario editorial actual o plantilla para generarlo;
17. brief de contenido estándar;
18. reglas anti-repetición;
19. validadores y resultados;
20. versión y estado de aprobación.

Puede complementarse con:

```text
content-system.json
content-pillars.json
content-series-library.json
editorial-calendar.json
content-backlog.json
content-brief-template.json
```

## 81. UX simplificada

La experiencia visible recomendada:

```text
DIRECCION DE CONTENIDO
-> PILARES
-> SERIES / FORMATOS
-> PRUEBA DE 30 DIAS
-> SISTEMA RECOMENDADO
-> APROBACION
-> SISTEMA DE CONTENIDO CANONICO
```

## 82. Principio final propuesto

> **AI Influencer Factory debe poder construir un sistema de contenido sólido aunque el usuario no sepa qué publicar. Debe usar nicho, concepto, biografía, personaje, marca, identidad visual, identidad verbal y universo narrativo ya aprobados para definir cinco pilares principales, subpilares cuando aporten profundidad, series, formatos, objetivos, mezcla y reglas editoriales. Antes de bloquear el sistema debe demostrar mediante una simulación de 30 días que puede sostener variedad, coherencia, factibilidad de producción y continuidad sin repetición mecánica. El calendario actual, los hashtags concretos y las piezas individuales son derivados operativos y pueden evolucionar sin recanonizar toda la arquitectura. F09 diseña el brief editorial y F10 produce el activo final.**

## 83. Estado de esta especificación

```text
ESTADO_DOCUMENTAL = APROBADA
```

Esta especificación forma parte de la baseline comercial aprobada de AI Influencer Factory (Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17). La auditoría pre-freeze ya había señalado (hallazgo H02) que su estado anterior, `PROPUESTA_LISTA_PARA_APROBACION`, quedó desactualizado: el texto se redactó antes de la aprobación de F09.

Por eso la IA debe tratar los sistemas, identificadores, etapas internas y validadores definidos aquí como reglas vigentes de F09, no como propuestas.

Aprobar la especificación no aprueba datos de ningún proyecto. Cada objeto canónico de un influencer concreto sigue necesitando su propia aprobación explícita del usuario, según las reglas de este documento.

La versión con el estado anterior se conserva en `90_HISTORICO_Y_LEGACY/Versiones_Anteriores/v1.0/09_F09_SISTEMA_DE_CONTENIDO/AI_INFLUENCER_FACTORY_Especificacion_General_Sistema_Contenido_Canonico_v1.0.md`, sin precedencia vigente.
