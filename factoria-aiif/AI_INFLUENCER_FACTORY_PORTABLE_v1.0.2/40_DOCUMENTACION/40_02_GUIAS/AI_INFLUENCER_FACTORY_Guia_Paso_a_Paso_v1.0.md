---
document_id: AIIF_GUIA_PASO_A_PASO
document_version: "1.0.0"
schema_version: "1.0.0"
system_version: "AIIF_PORTABLE_v1.0"
language: ES
category: GUIA
status: PROPUESTA_LISTA_PARA_APROBACION
---

# AI INFLUENCER FACTORY — Guía paso a paso v1.0

## 1. Propósito

Esta guía explica el flujo completo de AI Influencer Factory desde la creación de un proyecto hasta su consolidación y operación portable. Resume cómo debe usar el creador el sistema; no reemplaza las especificaciones técnicas de cada fase.

## 2. Antes de empezar

AIIF puede operar en una IA conversacional compatible sin exigir una suscripción de pago para el flujo base. Si faltan capacidades nativas de imagen, video o audio, la producción puede realizarse externamente manteniendo el diseño y la validación dentro del flujo AIIF.

No necesitas conocer estrategia de marca, psicología, fotografía, ingeniería de prompts, monetización o crecimiento. El sistema debe ayudarte a descubrir, comparar, decidir y aprobar.

## 3. Crear el proyecto

Escribe:

```text
Crear influencer
```

AIIF debe:

1. crear un `PROJECT_ID`;
2. iniciar Sistema 00;
3. recuperar contexto ya proporcionado;
4. registrar procedencia de los datos;
5. solicitar solo fundamentos críticos faltantes;
6. comenzar F01.

`PROJECT_ID`, `NAME_CANON`, nombre visible y handle son conceptos distintos.

## 4. Fundamentos mínimos

Si no están disponibles, la IA debe obtener:

1. fuente de ingreso inicial;
2. nicho;
3. audiencia;
4. tiempo disponible;
5. objetivo a 90 días.

La política de preguntas es:

```text
USAR CONTEXTO
→ USAR DATOS APROBADOS
→ DEDUCIR SI ES SEGURO
→ PROPONER
→ PREGUNTAR SOLO SI ES NECESARIO
```

## 5. F01 — Fundamentos Estratégicos

Define el terreno estratégico del proyecto: negocio inicial, nicho, audiencia, mercados, plataformas, capacidad, objetivo a 90 días y restricciones.

Objetos de nicho normalizados:

```text
NICHE_WORKING
NICHE_OPERATIONAL
NICHE_PUBLIC_POSITIONING
NICHE_CANON
```

El Posicionamiento Público del Nicho no es el mismo objeto que `BRAND_POSITIONING_CANON` de F05.

F01 culmina cuando el nicho y los fundamentos necesarios están suficientemente definidos para alimentar F02.

## 6. F02 — Concepto

Convierte F01 en una premisa estratégica-creativa reconocible. El concepto orienta identidad, visual, narrativa, marca y contenido, pero no los reemplaza.

Salida principal:

```text
CONCEPT_CANON
```

## 7. F03 — Biografía e Identidad

Construye identidad básica e historia funcional del personaje.

El nombre de la influencer se trabaja aquí con la Especificación de Nombramiento Canónico (`03_F03_BIOGRAFIA_E_IDENTIDAD/AI_INFLUENCER_FACTORY_Especificacion_General_Nombramiento_Canonico_v1.0.md`). No necesitas llegar con un nombre: la factoría puede proponerte direcciones, reducir opciones a finalistas y revisar en internet colisiones y marcas cuando la IA tenga búsqueda web.

Incluye:

- identidad básica;
- historia/contexto;
- profesión o rol;
- intereses y rutinas;
- relaciones relevantes;
- objetivos y motivaciones;
- hitos y elementos recurrentes;
- restricciones de continuidad biográfica.

Objetos principales:

```text
NAME_CANON
IDENTITY_CORE_CANON
BIOGRAPHY_CANON
```

Las restricciones de continuidad biográfica no sustituyen `NARRATIVE_CONTINUITY_CANON` de F08.

## 8. F04 — Personaje y Psicología

Convierte identidad y biografía en reglas de comportamiento observables y coherentes.

Objetos principales:

```text
CHARACTER_CANON
PSYCHOLOGY_MODEL_CANON
```

Los modelos psicológicos son interpretativos; no deben convertirse en diagnósticos clínicos.

## 9. F05 — Identidad de Marca

Define qué representa la marca personal y qué valor promete.

Objetos principales:

```text
BRAND_IDENTITY_CANON
BRAND_POSITIONING_CANON
VALUE_PROPOSITION_CANON
```

F05 no sustituye F11: valida compatibilidad comercial; F11 desarrolla la monetización.

## 10. F06 — Identidad Visual

Separa identidad física estable, estilo visual y variables de producción.

Objetos principales:

```text
PHYSICAL_IDENTITY_CANON
VISUAL_STYLE_CANON
VISUAL_REFERENCE_SET_CANON
VISUAL_IDENTITY_CANON
```

Una imagen generada no se vuelve referencia canónica automáticamente. Cada referencia debe tener alcance y aprobación.

## 11. F07 — Identidad Verbal y Voz

Define cómo se expresa y, cuando corresponda, cómo suena el influencer.

Objetos principales:

```text
VERBAL_IDENTITY_CANON
VOICE_STYLE_CANON
VOICE_REFERENCE_SET_CANON
VOICE_IDENTITY_CANON
```

Regla:

```text
F07 define cómo se comunica
F09 decide qué mensaje concreto publicar
F10 produce el audio/video final
```

## 12. F08 — Universo Narrativo

Organiza mundos, relaciones, rutinas, lugares, motivos, tensiones y continuidad estructurada.

Objetos principales:

```text
NARRATIVE_UNIVERSE_CANON
NARRATIVE_WORLD_SET_CANON
RELATIONSHIP_GRAPH_CANON
NARRATIVE_CONTINUITY_CANON
```

Estado dinámico:

```text
NARRATIVE_STATE_CURRENT
NARRATIVE_EVENT_LOG
```

Un borrador de contenido no se convierte automáticamente en evento narrativo confirmado.

## 13. F09 — Sistema de Contenido

Transforma estrategia, identidad y narrativa en un sistema editorial sostenible.

La metodología base utiliza cinco pilares superiores salvo desviación explícita y justificada.

Objetos canónicos:

```text
CONTENT_SYSTEM_CANON
CONTENT_PILLAR_SET_CANON
CONTENT_FORMAT_MATRIX_CANON
CONTENT_EDITORIAL_RULES_CANON
```

Objetos dinámicos incluyen series, banco de contenido, simulación de 30 días, calendario vigente y perfiles por plataforma.

Regla:

```text
F08 define qué existe en el mundo
F09 decide qué parte convertir en contenido
```

## 14. F10 — Producción IA

F10 ejecuta; no redefine silenciosamente.

Flujo:

```text
BRIEF APROBADO F09
→ PAQUETE DE PRODUCCIÓN
→ PROMPT UNIVERSAL
→ ADAPTACIÓN AL PROVEEDOR
→ GENERACIÓN
→ RESULTADO
→ VALIDACIÓN
→ APROBAR / EDITAR / REGENERAR
```

El `MASTER_AVATAR_PROMPT_CURRENT` es un derivado versionado del canon, no una fuente primaria.

Regla crítica:

```text
APROBADO_PARA_USO
≠ REFERENCIA_CANONICA
≠ EVENTO_NARRATIVO_CONFIRMADO
```

## 15. F11 — Monetización

Define qué monetizar, cómo y en qué secuencia.

Objetos canónicos:

```text
MONETIZATION_STRATEGY_CANON
MONETIZATION_ROUTE_SET_CANON
MONETIZATION_SEQUENCE_CANON
COMMERCIAL_ALIGNMENT_RULES_CANON
```

Regla:

```text
RUTA DE MONETIZACIÓN
≠ OFERTA
≠ CANAL DE ADQUISICIÓN
≠ PLATAFORMA
```

Precios, portafolio, embudo comercial, prospección y registro de oportunidades permanecen operativos/dinámicos.

## 16. F12 — Crecimiento

F12 aprende y recomienda; no reescribe canon automáticamente.

Debe cubrir horizontes:

```text
30 / 60 / 90 / 180 / 365 días
```

Objetos canónicos:

```text
GROWTH_SYSTEM_CANON
GROWTH_MEASUREMENT_FRAMEWORK_CANON
GROWTH_EXPERIMENTATION_POLICY_CANON
GROWTH_DECISION_RULES_CANON
```

Regla:

```text
RESULTADO DE EXPERIMENTO
≠ APRENDIZAJE OPERATIVO
≠ CAMBIO DE CANON
```

Si la evidencia sugiere un cambio estructural, F12 abre revisión en la fase propietaria.

## 17. F13 — Consolidación

F13 audita y empaqueta; no crea un supercanon.

Produce:

```text
PERFIL MAESTRO
+
PAQUETE PORTABLE
```

Objetos estructurales incluyen:

```text
CONSOLIDATION_SYSTEM_CANON
MASTER_PROFILE_SCHEMA_CANON
PORTABLE_PACKAGE_SCHEMA_CANON
RESUME_PROTOCOL_CANON
PROJECT_INTEGRITY_POLICY_CANON
```

El Perfil Maestro y los paquetes son derivados del Sistema 00 y de los canones propietarios.

## 18. Aprobaciones y bloqueos

AIIF puede aprobar por atributo, subfase o fase. Una aprobación suficiente convierte la decisión en canónica/bloqueada según corresponda.

Para cambiar canon bloqueado:

```text
INSTRUCCIÓN EXPLÍCITA
→ PUNTO DE CONTROL
→ RAMA DE REVISIÓN
→ PROPUESTA / SIMULACIÓN
→ ANÁLISIS DE IMPACTO
→ VALIDACIÓN
→ APROBACIÓN
→ NUEVA CANON_VERSION
→ REVALIDACIÓN / REGENERACIÓN DE DERIVADOS
```

## 19. Versionado

Usa campos específicos:

```text
SYSTEM_VERSION
PROJECT_VERSION
CANON_VERSION
PACKAGE_VERSION
DOCUMENT_VERSION
SCHEMA_VERSION
```

No confundas una nueva versión documental con una nueva versión del canon.

## 20. Puntos de control y reanudación

Un punto de control debe permitir recuperar:

- proyecto;
- versión;
- fase/estado;
- decisiones bloqueadas;
- pendientes;
- referencias;
- siguiente acción.

Cuando el proyecto se reanuda, la IA debe mostrar un resumen discreto y continuar desde la siguiente acción válida.

## 21. Migración a otra IA

Solicita:

```text
Prepara el contexto para otra IA.
```

AIIF debe seleccionar el formato adecuado:

1. Paquete Portable Completo;
2. Paquete Portable Ligero;
3. Archivo Universal de Reanudación;
4. Contexto Portable Copiable.

En destino:

```text
Continuar [Nombre Influencer]
```

Regla:

```text
MIGRACIÓN = CONTINUIDAD
MIGRACIÓN ≠ RECONSTRUCCIÓN
```

## 22. Validación del paquete portable

Antes de entregarlo comprobar:

- proyecto correcto;
- versiones explícitas;
- canon presente;
- clases de objeto diferenciadas;
- estado/fase/subfase;
- pendientes;
- punto de control;
- siguiente acción;
- idioma/localización;
- referencias adjuntas o marcadas;
- instrucciones de reanudación.

Prueba crítica:

> La IA destino no conoce el chat anterior.

Si no puede continuar a partir del paquete, el paquete falla.

## 23. Producción manual / externa

Cuando la IA principal no tenga la capacidad de producción:

1. generar Paquete de Producción;
2. incluir referencias necesarias;
3. adaptar prompt/proveedor;
4. producir externamente;
5. guardar/exportar activo;
6. devolver activo y metadatos disponibles;
7. validar contra canon;
8. aprobar, editar o generar plan de regeneración.

## 24. Operación después de F13

Cerrar F13 completa la arquitectura inicial, no la vida del influencer.

```text
OPERACIÓN CONTINUA
→ CONTENIDO
→ PRODUCCIÓN
→ MONETIZACIÓN
→ CRECIMIENTO
→ APRENDIZAJE
→ REVISIONES CONTROLADAS
→ NUEVAS VERSIONES
```

## 25. Documentación oficial

```text
01-manuales
02-guias
03-documentacion-uso
04-plantillas
05-especificaciones-tecnicas
```

Nombres oficiales de entregables permanecen en español. Los IDs técnicos estables pueden conservar inglés cuando aporta interoperabilidad.

## 26. Comandos útiles

```text
Continuar.
Muéstrame el estado.
¿Qué falta?
Aprueba esta fase.
Simula este cambio sin aplicarlo.
Valida todo.
Dame el canon actual.
Crea el siguiente entregable.
Genera el contenido de hoy.
Crea el prompt.
Prepara el contexto para otra IA.
Genera el Perfil Maestro completo.
Crea el paquete portable de [Nombre Influencer].
```

## 27. Criterio de cierre del proyecto inicial

El proyecto puede considerarse consolidable cuando:

- no existen contradicciones bloqueantes conocidas;
- los canones están identificados y versionados;
- los objetos dinámicos están separados;
- pendientes y dependencias son trazables;
- existe siguiente acción;
- existe suficiente contexto para reanudar.

La validación comercial de Portable v1.0 requiere además las pruebas end-to-end, migración limpia y producción externa → retorno → validación definidas en el protocolo de producto.
