---
spec_id: AIIF_GENERAL_CONSOLIDATION_PORTABILITY_SPEC
spec_version: "1.0.0"
spec_type: AIIF_CONSOLIDATION_AUDIT_PORTABILITY_SPEC
status: APROBADA
estado_documental: APROBADA
estado_documental_anterior: PROPUESTA_LISTA_PARA_APROBACION
base_aprobacion: "Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17"
revision_documental: "AIIF_PORTABLE_v1.0.2 (CR-0002)"
phase: "F13 - Consolidacion"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "AI_INFLUENCER_FACTORY_Arquitectura_Fases_y_Entregables_v1.0.md"
  - "AI_INFLUENCER_FACTORY_Especificacion_Tecnica_Migracion_Continuidad_v1.1.md"
  - "AI_INFLUENCER_FACTORY_Especificacion_Tecnica_Politica_Idioma_v1.1.md"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Consolidación, Auditoría y Portabilidad
### Versión 1.0.0 — Aprobada (baseline comercial v1.0)

## 1. Propósito

Esta especificación define cómo AI Influencer Factory (AIIF) debe **cerrar, auditar, consolidar, documentar y hacer portable** un proyecto después de construir F01-F12.

F13 debe poder responder con precisión:

- cuál es el proyecto correcto;
- qué versión está vigente;
- qué fases están aprobadas y bloqueadas;
- qué datos son canónicos;
- qué objetos son dinámicos;
- qué elementos siguen pendientes;
- qué referencias y archivos existen;
- qué dependencias conectan las fases;
- qué derivados deben regenerarse si cambia un canon;
- cuál es el estado operacional actual;
- cuál es el último punto de control;
- cuál es la siguiente acción;
- qué debe viajar a otra IA para continuar sin reconstrucción.

Flujo visible recomendado:

```text
AUDITAR F01-F12
      ->
RESOLVER INCONSISTENCIAS / PENDIENTES BLOQUEANTES
      ->
CONSOLIDAR CANON + ESTADO OPERATIVO
      ->
GENERAR PERFIL MAESTRO
      ->
GENERAR PAQUETE PORTABLE
      ->
VALIDAR REANUDACION
      ->
CREAR PUNTO DE CONTROL FINAL
      ->
PROYECTO CONSOLIDADO Y PORTABLE
```

## 2. Fundamento experto de origen

La fuente experta original no contiene una fase denominada F13 ni define formalmente un Perfil Maestro o un Paquete Portable.

Sí exige que el resultado completo reúna:

- identidad;
- personalidad;
- psicología;
- marca personal;
- identidad visual;
- cinco pilares de contenido;
- calendario editorial;
- copywriting;
- prompts de imagen;
- prompts de video;
- storytelling;
- monetización;
- crecimiento;
- reglas de consistencia;
- Prompt Maestro definitivo para recrear el avatar.

Además, el resultado final debe ser una marca personal viva, coherente, escalable y preparada para monetización.

F13 es la **adaptación arquitectónica de AIIF** que reúne esos resultados ya aprobados, verifica su coherencia y los convierte en una representación portable.

## 3. Regla de procedencia

> **F13 no sustituye la metodología experta ni inventa una segunda identidad. Consolida los resultados desarrollados en F01-F12 y añade auditoría, versionado, manifiestos, perfiles consolidados, portabilidad, reanudación y migración como extensiones propias de AIIF.**

## 4. Ubicación en la arquitectura

```text
F01 - Fundamentos Estrategicos
      ↓
F02 - Concepto
      ↓
F03 - Biografia e Identidad
      ↓
F04 - Personaje y Psicologia
      ↓
F05 - Identidad de Marca
      ↓
F06 - Identidad Visual
      ↓
F07 - Identidad Verbal y Voz
      ↓
F08 - Universo Narrativo
      ↓
F09 - Sistema de Contenido
      ↓
F10 - Produccion IA
      ↓
F11 - Monetizacion
      ↓
F12 - Crecimiento
      ↓
F13 - Consolidacion
```

F13 es la fase global final de la arquitectura principal.

## 5. Entregable oficial

El entregable canónico global ya definido para F13 es:

# Perfil Maestro + Paquete Portable

F13 puede además generar variantes de portabilidad y archivos técnicos derivados.

## 6. Principio central

> **Consolidar no significa copiar todos los documentos en un archivo enorme. F13 debe construir una vista coherente, trazable y portable del proyecto, conservando la separación entre canon, estado operativo, historial, referencias, derivados y pendientes.**

## 7. F13 no crea un supercanon

Se adopta conceptualmente:

```text
SISTEMA 00 / MATRIZ MAESTRA
        >
CANONES DE FASE PROPIETARIOS
        >
ESTADOS OPERATIVOS VIGENTES
        >
PERFIL MAESTRO / PAQUETE PORTABLE
        >
PROMPTS Y OTROS DERIVADOS
```

Por tanto:

```text
MASTER_PROFILE_CURRENT
!=
FUENTE_DE_VERDAD_PRIMARIA
```

Si una vista consolidada contradice un canon propietario, debe regenerarse la vista.

## 8. Fuente de verdad

F13 debe usar como fuente operacional:

- Sistema 00;
- Matriz Maestra de Datos;
- objetos canónicos aprobados de F01-F12;
- objetos dinámicos vigentes;
- Registro de Decisiones;
- Registro de Cambios;
- historial de versiones;
- referencias y manifiestos disponibles.

No debe reconstruir el proyecto desde recuerdos informales cuando existen fuentes estructuradas.

## 9. Qué sí define F13

F13 define:

- política de consolidación;
- esquema del Perfil Maestro;
- esquema del Paquete Portable;
- protocolo de reanudación;
- reglas de auditoría transversal;
- reglas de precedencia;
- inventario canónico;
- separación canon / operativo / derivado / histórico;
- mapa de dependencias;
- índice documental;
- manifiesto portable;
- validación del paquete;
- validación de reanudación;
- punto de control de consolidación;
- criterio de cierre de la arquitectura principal.

## 10. Qué no redefine F13

F13 no redefine por sí solo:

- nicho;
- concepto;
- nombre;
- biografía;
- personaje;
- marca;
- identidad visual;
- voz;
- narrativa;
- pilares;
- producción;
- monetización;
- growth.

Si detecta una contradicción, la remite a la fase propietaria.

## 11. Dependencias de entrada

F13 debe intentar recuperar automáticamente todos los objetos relevantes de F01-F12 y Sistema 00.

Como mínimo:

```text
PROJECT_ID
VERSION
PROJECT_STATUS
NAME_CANON
NICHE_CANON
CONCEPT_CANON
IDENTITY_CORE_CANON
BIOGRAPHY_CANON
CHARACTER_CANON
PSYCHOLOGY_MODEL_CANON, si existe
BRAND_IDENTITY_CANON
BRAND_POSITIONING_CANON
VALUE_PROPOSITION_CANON
PHYSICAL_IDENTITY_CANON
VISUAL_STYLE_CANON
VISUAL_REFERENCE_SET_CANON
VISUAL_IDENTITY_CANON
VERBAL_IDENTITY_CANON
VOICE_STYLE_CANON, si aplica
VOICE_REFERENCE_SET_CANON, si aplica
VOICE_IDENTITY_CANON, si aplica
NARRATIVE_UNIVERSE_CANON
NARRATIVE_WORLD_SET_CANON
RELATIONSHIP_GRAPH_CANON
NARRATIVE_CONTINUITY_CANON
CONTENT_SYSTEM_CANON
CONTENT_PILLAR_SET_CANON
CONTENT_FORMAT_MATRIX_CANON
CONTENT_EDITORIAL_RULES_CANON
AI_PRODUCTION_SYSTEM_CANON
PRODUCTION_PACKAGE_SCHEMA_CANON
PRODUCTION_PROMPT_RULES_CANON
PRODUCTION_VALIDATION_POLICY_CANON
MONETIZATION_STRATEGY_CANON
MONETIZATION_ROUTE_SET_CANON
MONETIZATION_SEQUENCE_CANON
COMMERCIAL_ALIGNMENT_RULES_CANON
GROWTH_SYSTEM_CANON
GROWTH_MEASUREMENT_FRAMEWORK_CANON
GROWTH_EXPERIMENTATION_POLICY_CANON
GROWTH_DECISION_RULES_CANON
```

Debe incluir únicamente objetos que realmente existan y apliquen.

## 12. Objetos dinámicos relevantes

F13 debe consolidar por separado los objetos dinámicos vigentes, por ejemplo:

- `NARRATIVE_STATE_CURRENT`;
- `NARRATIVE_EVENT_LOG`;
- `CONTENT_SERIES_LIBRARY`;
- `CONTENT_BACKLOG`;
- `EDITORIAL_CALENDAR_CURRENT`;
- `PUBLIC_PROFILE_COPY_CURRENT`;
- `PLATFORM_CONTENT_PROFILE`;
- `ASSET_REGISTRY`;
- `CAPABILITY_MAP_CURRENT`;
- `MASTER_AVATAR_PROMPT_CURRENT`;
- `MONETIZATION_ROADMAP_CURRENT`;
- `OFFER_CATALOG_CURRENT`;
- `PRICING_CURRENT`;
- `COMMERCIAL_PIPELINE`;
- `GROWTH_ROADMAP_CURRENT`;
- `KPI_DASHBOARD_CURRENT`;
- `GROWTH_EXPERIMENT_LOG`;
- `GROWTH_LEARNING_LOG`;
- otros objetos vigentes.

No deben presentarse como canon si su fase los define como dinámicos.

## 13. Tres situaciones de entrada

### Situación A - F01-F12 completas

F13 realiza auditoría, consolidación y empaquetado final.

### Situación B - Algunas fases tienen pendientes no bloqueantes

F13 puede consolidar si la integridad mínima está preservada y los pendientes están declarados.

### Situación C - Existen contradicciones o pendientes bloqueantes

F13 no debe fingir cierre.
Debe emitir un informe de integridad y devolver los problemas a las fases propietarias.

## 14. Criterio de consolidabilidad

Un proyecto puede considerarse consolidable cuando:

- las fases requeridas para su alcance están suficientemente definidas;
- no existen contradicciones bloqueantes conocidas;
- los canones aprobados están identificados;
- los objetos dinámicos están separados;
- los pendientes están registrados;
- las dependencias críticas son trazables;
- existe estado y versión;
- existe una siguiente acción válida;
- existe suficiente contexto para reanudar.

## 15. Objetos canónicos propuestos de F13

Se proponen:

```text
CONSOLIDATION_SYSTEM_CANON
MASTER_PROFILE_SCHEMA_CANON
PORTABLE_PACKAGE_SCHEMA_CANON
RESUME_PROTOCOL_CANON
PROJECT_INTEGRITY_POLICY_CANON
```

Estos objetos gobiernan **la forma de consolidar y transportar**, no la identidad del influencer.

## 16. Nombres visibles/documentales

Con `IDIOMA_CANONICO_DOCUMENTAL = ES`:

| ID técnico | Nombre visible |
|---|---|
| CONSOLIDATION_SYSTEM_CANON | Sistema Canónico de Consolidación |
| MASTER_PROFILE_SCHEMA_CANON | Esquema Canónico del Perfil Maestro |
| PORTABLE_PACKAGE_SCHEMA_CANON | Esquema Canónico del Paquete Portable |
| RESUME_PROTOCOL_CANON | Protocolo Canónico de Reanudación |
| PROJECT_INTEGRITY_POLICY_CANON | Política Canónica de Integridad del Proyecto |

Los IDs técnicos pueden permanecer estables en inglés.

## 17. Objetos operativos propuestos

Se proponen como vistas o artefactos dinámicos:

```text
MASTER_PROFILE_CURRENT
PORTABLE_PACKAGE_CURRENT
PORTABLE_LITE_CURRENT
UNIVERSAL_RESUME_CURRENT
COPYABLE_PORTABLE_CONTEXT_CURRENT
PROJECT_INTEGRITY_REPORT_CURRENT
CANON_REGISTRY_CURRENT
DEPENDENCY_GRAPH_CURRENT
DOCUMENT_INDEX_CURRENT
PENDING_ITEMS_REGISTER_CURRENT
PORTABLE_MANIFEST_CURRENT
PROJECT_SNAPSHOT_CURRENT
DERIVED_ARTIFACT_INDEX_CURRENT
FINAL_CHECKPOINT_CURRENT
```

No son nuevas fuentes de verdad.

## 18. `MASTER_PROFILE_CURRENT`

El Perfil Maestro es una **vista consolidada vigente**.

Debe permitir comprender el proyecto sin leer todos los documentos, pero debe preservar referencias hacia la fuente propietaria.

Estructura conceptual:

```text
IDENTIFICACION DEL PROYECTO
ESTADO / VERSION
ESTRATEGIA
IDENTIDAD
PERSONAJE
MARCA
VISUAL
VOZ
NARRATIVA
CONTENIDO
PRODUCCION
MONETIZACION
CRECIMIENTO
ESTADO OPERATIVO
PENDIENTES
REFERENCIAS
HISTORIAL RESUMIDO
SIGUIENTE ACCION
```

## 19. Perfil Maestro ≠ documentación completa

El Perfil Maestro no debe duplicar palabra por palabra las Biblias y manuales.

Debe:

- sintetizar;
- enlazar;
- identificar fuentes;
- conservar IDs y versión;
- declarar pendientes;
- mostrar decisiones vigentes;
- permitir operación cotidiana.

Los documentos especializados conservan el detalle profundo.

## 20. Registro de Canon

Se propone:

```text
CANON_REGISTRY_CURRENT
```

Debe poder enumerar cada objeto canónico con:

```text
CANON_ID
OWNER_PHASE
STATUS
VERSION
APPROVED_AT
SOURCE_REF
DEPENDENCIES
DOWNSTREAM_DEPENDENTS
LAST_VALIDATED
NOTES
```

## 21. Regla de propiedad

Cada canon mantiene una fase propietaria.

Ejemplos:

```text
BIOGRAPHY_CANON -> F03
CHARACTER_CANON -> F04
VISUAL_IDENTITY_CANON -> F06
CONTENT_SYSTEM_CANON -> F09
MONETIZATION_STRATEGY_CANON -> F11
```

F13 registra y consolida; no se apropia de ellos.

## 22. Mapa de dependencias

Se propone:

```text
DEPENDENCY_GRAPH_CURRENT
```

Debe permitir responder:

- qué depende de qué;
- qué debe revalidarse si cambia un canon;
- qué derivados deben regenerarse;
- qué documentos pueden quedar desactualizados.

## 23. Regla de impacto

F13 debe reutilizar el sistema de impacto:

```text
SIN_IMPACTO
ACTUALIZAR
REVALIDAR
REGENERAR
INVALIDAR
```

Un cambio no debe propagarse mediante reemplazo masivo sin análisis.

## 24. Índice documental

Se propone:

```text
DOCUMENT_INDEX_CURRENT
```

Puede registrar:

- entregable;
- fase;
- versión;
- idioma;
- estado;
- ubicación/referencia;
- dependencia;
- vigencia;
- si forma parte del paquete portable.

## 25. Nomenclatura documental

Antes de entregar F13 debe ejecutarse:

```text
VALIDADOR_DE_IDIOMA_Y_LOCALIZACION
+
VALIDAR_NOMENCLATURA_DOCUMENTAL
```

Los nombres oficiales visibles deben permanecer en español.

## 26. `PROJECT_INTEGRITY_REPORT_CURRENT`

F13 debe producir una auditoría de integridad.

Puede revisar:

- fases presentes;
- estados;
- aprobación;
- contradicciones;
- canon ausente;
- dependencias rotas;
- referencias ausentes;
- objetos dinámicos no actualizados;
- documentos desactualizados;
- derivados obsoletos;
- pendientes;
- versión;
- idioma;
- reanudación.

## 27. Resultados de integridad

Se proponen resultados específicos:

```text
INTEGRO
INTEGRO_CON_PENDIENTES
REQUIERE_REVALIDACION
REQUIERE_CORRECCION
NO_CONSOLIDABLE
```

Estos resultados se mapean al sistema general de validación.

## 28. Pendientes

Se propone:

```text
PENDING_ITEMS_REGISTER_CURRENT
```

Cada pendiente puede registrar:

```text
PENDING_ID
OWNER_PHASE
DESCRIPTION
SEVERITY
BLOCKING
DEPENDENCIES
NEXT_ACTION
REQUIRES_USER_DECISION
STATUS
```

## 29. Pendiente no bloqueante

Un pendiente no bloqueante puede convivir con un paquete portable si:

- se declara;
- no contradice canon;
- no impide la siguiente acción;
- la IA destino sabe cómo tratarlo.

## 30. Pendiente bloqueante

Si un pendiente impide continuar correctamente, F13 debe marcar el proyecto como no consolidable o consolidable solo para reanudación de reparación, según el caso.

No debe ocultarlo para obtener un estado “completo”.

## 31. Referencias y archivos

F13 debe mantener un inventario suficiente de:

- referencias visuales;
- referencias de voz;
- activos relevantes;
- documentos;
- archivos externos;
- datasets/conjuntos de datos cuando apliquen;
- paquetes de producción;
- prompts derivados.

No es obligatorio incrustar archivos pesados dentro del texto portable.

## 32. Referencias no adjuntas

Se conserva la regla:

```text
REFERENCIA_NO_ADJUNTA
```

Debe acompañarse de:

- ID;
- tipo;
- función;
- alcance;
- descripción;
- impacto de ausencia;
- ubicación cuando exista.

Nunca fingir que la IA destino tiene acceso a un archivo no transferido.

## 33. Índice de derivados

Se propone:

```text
DERIVED_ARTIFACT_INDEX_CURRENT
```

Puede contener:

- `MASTER_AVATAR_PROMPT_CURRENT`;
- prompts base;
- plantillas;
- briefs;
- calendarios;
- media kit;
- portafolio;
- roadmaps;
- dashboards;
- manifests;
- otros derivados.

Debe registrar de qué versión canónica derivan.

## 34. Artefacto obsoleto

Si cambia un canon propietario y un derivado ya no corresponde:

```text
DERIVADO_VIGENTE
->
DESACTUALIZADO
->
REGENERAR
```

F13 no debe dejar un prompt antiguo marcado como vigente.

## 35. Paquete Portable Completo

El **Paquete Portable Completo** es la representación más rica del proyecto.

Puede contener:

- manifiesto;
- Perfil Maestro;
- estado del proyecto;
- Matriz Maestra resumida o exportable;
- canones F01-F12;
- objetos operativos vigentes relevantes;
- biblias/planes/manuales;
- referencias o sus identificadores;
- historial resumido;
- Registro de Decisiones;
- Registro de Cambios;
- pendientes;
- punto de control;
- próxima acción;
- instrucciones de reanudación.

## 36. Paquete Portable Ligero

Se adopta como variante compacta visible:

**Paquete Portable Ligero**

ID técnico estable ya existente:

```text
PAQUETE_PORTABLE_LITE
```

Debe contener el contexto mínimo suficiente para continuar sin cargar toda la documentación profunda.

## 37. Archivo Universal de Reanudación

Nombre visible:

**Archivo Universal de Reanudación**

Nombre técnico de archivo:

```text
[Nombre_Influencer]_UNIVERSAL_RESUME.md
```

Uso principal:

- plataformas que aceptan un solo archivo;
- reanudación rápida;
- migración con contexto limitado.

## 38. Contexto Portable Copiable

Nombre visible:

**Contexto Portable Copiable**

ID técnico existente:

```text
CONTEXTO_PORTABLE_COPIABLE
```

Uso:

- plataformas sin adjuntos;
- interfaces que solo admiten texto pegado;
- fallback de emergencia.

## 39. Regla de equivalencia funcional

Los cuatro formatos pueden tener diferente nivel de detalle, pero deben preservar el mismo núcleo semántico:

```text
IDENTIDAD DEL PROYECTO
VERSION
CANON ESENCIAL
ESTADO
PENDIENTES
PUNTO DE CONTROL
SIGUIENTE ACCION
IDIOMA / LOCALIZACION
REGLAS DE REANUDACION
```

## 40. `PORTABLE_MANIFEST_CURRENT`

Todo paquete estructurado debería incluir un manifiesto.

Puede contener:

```json
{
  "project_id": "[ID]",
  "project_name": "[NAME_CANON]",
  "package_type": "[FULL|LITE|UNIVERSAL_RESUME|COPYABLE]",
  "package_version": "[VERSION]",
  "project_version": "[VERSION]",
  "created_at": "[DATE]",
  "system_version": "AIIF_PORTABLE_v1.0",
  "language": "ES",
  "files": [],
  "canon_refs": [],
  "pending_items": [],
  "resume_instruction": "Continuar [Nombre Influencer]"
}
```

Los campos exactos pueden normalizarse posteriormente sin cambiar la semántica.

## 41. Versión del proyecto vs versión del paquete

Se debe distinguir:

```text
PROJECT_VERSION
!=
PACKAGE_VERSION
!=
DOCUMENT_VERSION
!=
SCHEMA_VERSION
```

Un paquete puede regenerarse sin que haya cambiado el canon del proyecto.

## 42. Paquete más reciente

La migración debe utilizar preferentemente la versión portable más reciente y válida.

Una versión anterior puede conservarse históricamente, pero no presentarse como vigente por defecto.

## 43. `PROJECT_SNAPSHOT_CURRENT`

Se propone una instantánea resumida del estado al momento de empaquetar.

Puede contener:

- versión;
- fases;
- canones;
- objetos dinámicos principales;
- pendientes;
- métricas operativas relevantes;
- activos abiertos;
- roadmap;
- próxima acción.

Es una instantánea, no un nuevo canon.

## 44. Punto de control final

Se propone:

```text
FINAL_CHECKPOINT_CURRENT
```

Es una vista del Punto de Control de Sistema 00 creada al consolidar.

Debe registrar:

- fecha;
- versión;
- estado;
- fase F13;
- canones vigentes;
- pendientes;
- paquete generado;
- siguiente acción;
- observaciones.

## 45. Cierre de F13 no significa fin del proyecto

F13 cierra la **arquitectura de creación inicial**, no la vida del influencer.

Después puede existir:

```text
OPERACION CONTINUA
CONTENIDO
PRODUCCION
MONETIZACION
GROWTH
REVISIONES CONTROLADAS
NUEVAS VERSIONES
```

El proyecto puede seguir activo indefinidamente.

## 46. Reanudación

Se propone:

```text
RESUME_PROTOCOL_CANON
```

Debe gobernar cómo una IA compatible carga y continúa un proyecto.

## 47. Flujo origen

```text
USUARIO PIDE MIGRACION / REANUDACION
-> IDENTIFICAR PROYECTO
-> VERIFICAR VERSION
-> CREAR PUNTO DE CONTROL SI APLICA
-> VALIDAR CANON / ESTADO / PENDIENTES
-> SELECCIONAR FORMATO
-> GENERAR PAQUETE
-> VALIDAR PAQUETE
-> ENTREGAR INSTRUCCION SIMPLE
```

## 48. Flujo destino

Al recibir un paquete y la instrucción `Continuar [Nombre Influencer]`:

1. no crear un proyecto nuevo;
2. cargar manifiesto y estado;
3. verificar versión;
4. respetar canones y fases bloqueadas;
5. recuperar pendientes;
6. ejecutar compatibilidad de plataforma;
7. ejecutar preparación operativa cuando aplique;
8. identificar siguiente acción;
9. continuar;
10. no repetir preguntas ya respondidas.

## 49. Respuesta inicial de reanudación

Formato visible recomendado:

```text
Proyecto: [Nombre Influencer]
Versión: [Versión]
Fases aprobadas: [Fases]
Fase actual: [Fase]
Último punto de control: [Punto]
Pendientes críticos: [Ninguno / Resumen]
Siguiente acción: [Acción]

Documentación disponible: Guía rápida · Guía paso a paso
```

Después debe continuar el trabajo.

## 50. Reanudación ≠ revalidación total

Una IA destino no debe reabrir F01-F12 solo por ser una sesión nueva.

Debe respetar estados aprobados y ejecutar validaciones únicamente cuando:

- falte contexto;
- exista incompatibilidad;
- haya una contradicción;
- se solicite una revisión;
- una dependencia haya cambiado.

## 51. Migración multiproveedor

Regla:

> **El influencer pertenece a AI Influencer Factory y a su estado portable, no a un proveedor específico.**

Flujo válido:

```text
IA A -> IA B -> IA C -> Otra IA
```

## 52. Compatibilidad de plataforma

Antes de reanudar en destino, utilizar cuando corresponda:

- `VALIDADOR_DE_COMPATIBILIDAD_DE_PLATAFORMA`;
- `VALIDADOR_DE_PREPARACION_OPERATIVA`;
- `VALIDADOR_DE_ACTIVACION_DE_FACTORÍA`.

La falta de una capacidad debe activar degradación elegante.

## 53. Degradación elegante de portabilidad

Si la plataforma:

- limita archivos -> Paquete Portable Ligero o Archivo Universal de Reanudación;
- no admite archivos -> Contexto Portable Copiable;
- no soporta un formato -> alternativa equivalente;
- tiene poco contexto -> reducir al mínimo suficiente;
- no genera imagen/video/audio -> conservar diseño y producir externamente.

## 54. Auditoría transversal

F13 debe ejecutar una auditoría transversal, no solo una suma de validadores.

Debe verificar:

```text
ESTRATEGIA <-> IDENTIDAD
IDENTIDAD <-> PERSONAJE
PERSONAJE <-> MARCA
MARCA <-> VISUAL
MARCA/PERSONAJE <-> VOZ
BIOGRAFIA <-> NARRATIVA
NARRATIVA <-> CONTENIDO
CONTENIDO <-> PRODUCCION
MARCA/CONTENIDO <-> MONETIZACION
CONTENIDO/MONETIZACION <-> CRECIMIENTO
```

## 55. `VALIDADOR_GLOBAL`

F13 debe utilizar el `VALIDADOR_GLOBAL` ya existente como orquestador de coherencia final.

No se sustituye por un nuevo validador redundante.

## 56. Validador de Consolidación

Se propone adicionalmente:

```text
VALIDADOR_DE_CONSOLIDACION_DEL_PROYECTO
```

Su función no es volver a validar cada disciplina desde cero, sino comprobar que sus resultados están correctamente consolidados, versionados y referenciados.

## 57. Validador de Paquete Portable

Se propone:

```text
VALIDADOR_DE_PAQUETE_PORTABLE
```

Debe comprobar:

- proyecto correcto;
- versión vigente;
- canon presente;
- estado presente;
- fase/subfase presentes;
- pendientes presentes;
- idioma/localización;
- instrucción de reanudación;
- referencias no ambiguas;
- contexto suficiente;
- manifiesto coherente;
- ausencia de secretos o archivos no declarados como disponibles.

## 58. Validador de Reanudación

Se propone:

```text
VALIDADOR_DE_REANUDACION_PORTABLE
```

Debe simular o comprobar que una IA destino pueda responder:

- qué proyecto es;
- qué versión;
- qué está bloqueado;
- qué está en curso;
- qué falta;
- qué debe hacer a continuación;
- qué no debe preguntar otra vez.

## 59. Prueba de reanudación sin historial

Antes de considerar F13 lista, AIIF debe probar el paquete bajo esta premisa:

> **La IA destino no conoce el chat anterior.**

El paquete debe ser suficiente para continuar sin reconstruir manualmente la historia.

## 60. Prueba de identidad

La IA destino debe poder identificar sin ambigüedad:

- `PROJECT_ID`;
- `NAME_CANON`;
- tipo de proyecto;
- versión;
- estado.

## 61. Prueba de canon

Debe poder distinguir:

```text
CANON
OPERATIVO
DERIVADO
HISTORICO
PENDIENTE
```

Si todo aparece como “canon”, el paquete falla la prueba.

## 62. Prueba de siguiente acción

Después de cargar el paquete, debe existir una siguiente acción clara o un estado explícito de operación continua.

No debe terminar en:

```text
"¿Qué quieres hacer?"
```

si el proyecto ya tiene una próxima acción registrada.

## 63. Prueba de preguntas repetidas

La IA destino no debe volver a preguntar información ya presente y válida.

Si necesita confirmación por conflicto, debe explicar el conflicto específico.

## 64. Prueba de referencias

Cada referencia mencionada debe estar:

- adjunta;
- identificada por una referencia resoluble;
- o marcada `REFERENCIA_NO_ADJUNTA`.

No deben existir referencias fantasma.

## 65. Prueba de idioma

La documentación estructural debe respetar el idioma canónico documental.

El idioma público del influencer puede ser distinto.

Los prompts exportados pueden usar el idioma requerido por la herramienta.

## 66. Prueba de derivados

F13 debe comprobar que derivados críticos corresponden a la versión vigente, especialmente:

- Prompt Maestro de Recreación;
- prompts base;
- perfiles públicos;
- calendarios;
- roadmaps;
- pricing;
- media kit;
- dashboards;
- paquetes de producción.

## 67. Prueba de contradicciones silenciosas

F13 debe detectar, por ejemplo:

- dos edades distintas marcadas como vigentes;
- nombre viejo en un entregable vigente;
- voz incompatible con biografía;
- pilar retirado presente como activo;
- pricing histórico presentado como actual;
- roadmap anterior presentado como vigente;
- prompt derivado de canon antiguo.

## 68. Política de resolución

Cuando existe contradicción:

```text
DETECTAR
-> IDENTIFICAR FASE PROPIETARIA
-> DETERMINAR VERSION VIGENTE
-> ANALIZAR IMPACTO
-> PROPONER CORRECCION
-> REVALIDAR SI APLICA
-> APROBAR SI CAMBIA CANON
-> REGENERAR DERIVADOS
```

F13 no elige silenciosamente entre dos canones contradictorios.

## 69. Conflicto documental sin conflicto canónico

Si el canon está claro y un documento derivado quedó viejo, F13 puede normalmente:

```text
MARCAR DESACTUALIZADO
-> REGENERAR DOCUMENTO
```

sin reabrir la fase propietaria.

## 70. Conflicto canónico real

Si existen dos decisiones aprobadas incompatibles sin una regla de versión clara, F13 debe solicitar o recuperar la decisión que determine vigencia.

No fusionar ambas arbitrariamente.

## 71. Historial

F13 debe preservar suficiente historial para explicar:

- qué cambió;
- cuándo;
- por qué;
- qué versión reemplazó a cuál;
- qué se retiró;
- qué sigue vigente.

El paquete ligero puede resumir historial; el completo puede conservar más detalle.

## 72. Registro de decisiones y cambios

F13 consume, no reemplaza:

- Registro de Decisiones;
- Registro de Cambios.

El Perfil Maestro puede mostrar solo las decisiones de mayor impacto, enlazadas al registro completo.

## 73. Seguridad de compactación

Reducir un paquete no debe eliminar:

- identidad esencial;
- restricciones críticas;
- canon necesario para la siguiente acción;
- pendientes bloqueantes;
- versión;
- procedencia suficiente;
- instrucción de reanudación.

## 74. Compresión semántica

El Paquete Portable Ligero y el Archivo Universal deben usar **compresión semántica**, no eliminación ciega.

Prioridad sugerida:

```text
1. IDENTIFICACION / VERSION
2. CANON CRITICO
3. ESTADO ACTUAL
4. RESTRICCIONES
5. PENDIENTES
6. SIGUIENTE ACCION
7. DERIVADOS NECESARIOS
8. HISTORIAL RESUMIDO
9. DOCUMENTACION SECUNDARIA
```

## 75. Profundidades

F13 reutiliza:

### NUCLEO

- auditoría mínima;
- Perfil Maestro compacto;
- Portable Ligero;
- estado;
- canon esencial;
- pendientes;
- siguiente acción.

### AMPLIADO - predeterminado

- Perfil Maestro completo;
- Paquete Portable Completo;
- manifiesto;
- inventario de canon;
- mapa de dependencias;
- índice documental;
- auditoría transversal;
- prueba de reanudación.

### PROFUNDO

- historial ampliado;
- matriz completa de dependencias;
- índice de derivados;
- múltiples formatos portables;
- simulación de migración;
- auditorías de referencias y versiones más detalladas.

Profundidad no significa duplicar todos los documentos sin necesidad.

## 76. Modos de trabajo

F13 hereda:

```text
GUIADO
COLABORATIVO
EXPERTO
```

En modo experto AIIF puede corregir derivados claramente obsoletos y preparar paquetes sin preguntar cada detalle reversible, pero no puede resolver un conflicto canónico real sin gobernanza.

## 77. Etapas internas propuestas

Para no crear nuevas fases globales, F13 puede usar `CS00-CS22`:

```text
CS00 - Cargar Sistema 00 y F01-F12
CS01 - Verificar identidad/version del proyecto
CS02 - Inventariar fases y entregables
CS03 - Construir Registro de Canon
CS04 - Separar canon / operativo / derivado / historico / pendiente
CS05 - Construir mapa de dependencias
CS06 - Auditar referencias y archivos
CS07 - Auditar idioma y nomenclatura
CS08 - Auditar derivados y vigencia
CS09 - Ejecutar validadores de fase requeridos
CS10 - Ejecutar Validador Global
CS11 - Construir Informe de Integridad
CS12 - Resolver o remitir inconsistencias
CS13 - Construir Perfil Maestro
CS14 - Construir manifiesto portable
CS15 - Generar Paquete Portable Completo
CS16 - Generar Paquete Portable Ligero
CS17 - Generar Archivo Universal de Reanudacion
CS18 - Generar Contexto Portable Copiable
CS19 - Ejecutar validacion de paquete
CS20 - Ejecutar prueba de reanudacion
CS21 - Crear punto de control final
CS22 - Entregar consolidacion y siguiente accion
```

Son etapas internas.

## 78. Esquema conceptual del Perfil Maestro

```json
{
  "project": {
    "project_id": "[ID]",
    "name_canon": "[NAME_CANON]",
    "project_version": "[VERSION]",
    "status": "[STATUS]"
  },
  "canon_registry_ref": "CANON_REGISTRY_CURRENT",
  "strategy": {},
  "identity": {},
  "character": {},
  "brand": {},
  "visual": {},
  "verbal_voice": {},
  "narrative": {},
  "content": {},
  "production": {},
  "monetization": {},
  "growth": {},
  "operational_state": {},
  "pending": [],
  "references": [],
  "last_checkpoint": "[ID]",
  "next_action": "[ACTION]"
}
```

Es una vista derivada.

## 79. Esquema conceptual del paquete portable

```text
/manifest
/master-profile
/canon
/operational-state
/references
/derived-artifacts
/documents
/history
/pending
/resume
```

La implementación física puede variar por plataforma.

## 80. Paquete Portable y archivos multimedia

Los multimedia pesados pueden quedar externos si el paquete conserva:

- ID;
- nombre;
- tipo;
- alcance;
- estado;
- ubicación o referencia;
- disponibilidad;
- impacto si falta.

## 81. Privacidad y mínimo necesario

F13 no debe incluir más información sensible de la necesaria para operar el proyecto.

Si un dato es privado pero necesario para continuidad, debe conservar su clasificación de visibilidad y no convertirse automáticamente en contenido público.

## 82. Integridad de nombres

F13 debe comprobar propagación de `NAME_CANON` hacia:

- Perfil Maestro;
- entregables vigentes;
- paquetes portables;
- archivos de reanudación;
- prompts derivados relevantes.

Un nombre histórico puede conservarse solo como histórico claramente marcado.

## 83. Integridad de versión

F13 debe poder contestar:

```text
¿Cual es la version vigente?
¿Que paquete corresponde a esa version?
¿Que documentos estan desactualizados?
¿Que cambios posteriores existen?
```

## 84. Criterio de finalización de F13

F13 puede considerarse completa cuando:

- el proyecto es consolidable;
- el Informe de Integridad no contiene bloqueantes sin resolver;
- el Registro de Canon está construido;
- el Perfil Maestro está actualizado;
- existe al menos un formato portable válido;
- el paquete pasó validación;
- la reanudación puede ejecutarse sin historial de chat;
- existe punto de control;
- existe siguiente acción o estado de operación continua;
- documentación e idioma son consistentes.

## 85. Estado después de F13

Un proyecto puede pasar a:

```text
COMPLETADO
```

para la arquitectura inicial, mientras continúa activo operacionalmente.

Si faltan elementos no bloqueantes puede existir una consolidación con observaciones claramente registradas.

## 86. Reapertura posterior

Después de F13, una solicitud como:

```text
"Cambia el nicho"
"Actualiza la voz"
"Modifica el rostro canonico"
"Cambia la ruta principal de monetizacion"
```

debe abrir la fase propietaria, no editar directamente el Perfil Maestro.

## 87. Regeneración de F13

Después de un cambio aprobado relevante:

```text
CAMBIO EN FASE PROPIETARIA
-> REVALIDAR DEPENDENCIAS
-> ACTUALIZAR SISTEMA 00
-> REGENERAR DERIVADOS
-> REGENERAR PERFIL MAESTRO
-> REGENERAR PAQUETE PORTABLE
-> NUEVO PUNTO DE CONTROL
```

## 88. Documentación siempre accesible

La experiencia de F13 debe respetar:

> **La documentación debe estar siempre accesible, pero no siempre visible.**

Al consolidar, debe quedar claro dónde obtener:

- Guía rápida;
- Guía paso a paso;
- entregables de fase;
- Perfil Maestro;
- Paquete Portable.

## 89. Portabilidad no dependiente de suscripción

F13 debe poder operar en Modo Básico Universal.

La creación de un paquete textual y una reanudación no requieren una IA de pago.

Las limitaciones de adjuntos, memoria o contexto deben resolverse mediante los formatos alternativos existentes.

## 90. Validación de activación en destino

Cuando una nueva IA recibe el paquete puede ejecutar:

```text
VALIDADOR_DE_ACTIVACION_DE_FACTORÍA
```

Resultados existentes:

```text
ACTIVA
ACTIVA_CON_LIMITACIONES
REQUIERE_RECARGA
NO_ACTIVA
```

F13 debe transportar suficiente contexto para que ese validador pueda operar.

## 91. Mapeo de fuente experta a F13

| Elemento de fuente experta | Tratamiento en F13 |
|---|---|
| Identidad completa | consolidación de F03 y objetos propietarios |
| Personalidad / psicología | consolidación de F04 |
| Marca personal | consolidación de F05 |
| Identidad visual | consolidación de F06 |
| Pilares / calendario / copy | consolidación de F09 y estado operativo |
| Prompts de imagen/video | índice de derivados F10 |
| Storytelling | consolidación de F08 |
| Plan de monetización | consolidación de F11 |
| Plan de crecimiento | consolidación de F12 |
| Reglas de consistencia | auditoría transversal y validadores |
| Prompt Maestro definitivo | MASTER_AVATAR_PROMPT_CURRENT, derivado de F10 |
| Marca personal viva y escalable | Perfil Maestro + estado operativo + continuidad portable |
| Perfil Maestro / Paquete Portable | extensión arquitectónica propia de AIIF, no explicitada en la fuente original |

## 92. Archivos técnicos complementarios

F13 puede generar:

```text
master-profile.json
canon-registry.json
project-state.json
dependency-graph.json
project-integrity-report.json
portable-manifest.json
pending-items.json
document-index.json
derived-artifact-index.json
[Nombre_Influencer]_UNIVERSAL_RESUME.md
```

Además de las carpetas/archivos del Paquete Portable Completo o Ligero.

## 93. Decisiones propuestas para aprobación

Esta versión propone aprobar como arquitectura F13:

1. F13 como fase de consolidación, auditoría y portabilidad, no como nueva fuente identitaria.
2. Separación estricta entre Sistema 00, canon propietario, estado operativo y vistas consolidadas.
3. `CONSOLIDATION_SYSTEM_CANON`.
4. `MASTER_PROFILE_SCHEMA_CANON`.
5. `PORTABLE_PACKAGE_SCHEMA_CANON`.
6. `RESUME_PROTOCOL_CANON`.
7. `PROJECT_INTEGRITY_POLICY_CANON`.
8. `MASTER_PROFILE_CURRENT` como vista derivada y versionada.
9. `CANON_REGISTRY_CURRENT`.
10. `DEPENDENCY_GRAPH_CURRENT`.
11. `PROJECT_INTEGRITY_REPORT_CURRENT`.
12. `PORTABLE_MANIFEST_CURRENT`.
13. `PENDING_ITEMS_REGISTER_CURRENT`.
14. `DOCUMENT_INDEX_CURRENT`.
15. `DERIVED_ARTIFACT_INDEX_CURRENT`.
16. `PROJECT_SNAPSHOT_CURRENT`.
17. `FINAL_CHECKPOINT_CURRENT` como vista del punto de control de Sistema 00.
18. Paquete Portable Completo, Paquete Portable Ligero, Archivo Universal de Reanudación y Contexto Portable Copiable como formatos de continuidad.
19. `VALIDADOR_DE_CONSOLIDACION_DEL_PROYECTO`.
20. `VALIDADOR_DE_PAQUETE_PORTABLE`.
21. `VALIDADOR_DE_REANUDACION_PORTABLE`.
22. uso del `VALIDADOR_GLOBAL` existente como orquestador transversal.
23. etapas internas `CS00-CS22`.
24. prueba obligatoria de reanudación sin historial de chat.
25. regla “continuidad, no reconstrucción”.
26. regeneración del Perfil Maestro y paquetes después de cambios canónicos aprobados.

## 94. UX simplificada

La experiencia visible recomendada:

```text
VALIDAR TODO
-> RESOLVER BLOQUEANTES
-> CONSOLIDAR
-> PERFIL MAESTRO
-> PAQUETE PORTABLE
-> PROBAR REANUDACION
-> PUNTO DE CONTROL
-> LISTO PARA OPERAR / MIGRAR
```

El usuario no necesita interactuar con `CS00-CS22`.

## 95. Principio final propuesto

> **AI Influencer Factory debe poder cerrar la arquitectura inicial de un influencer sin convertir la consolidación en una segunda fuente de verdad. F13 debe recuperar Sistema 00 y los canones propietarios de F01-F12, auditar coherencia, separar canon de estado operativo e historial, identificar dependencias y derivados, declarar pendientes y referencias, generar un Perfil Maestro vigente y producir formatos portables suficientes para continuar en otra IA sin reconstruir el proyecto. El Perfil Maestro y el Paquete Portable son vistas derivadas y versionadas; cuando cambia un canon aprobado, deben regenerarse. F13 consolida y transporta la verdad del proyecto, no la reemplaza.**

## 96. Estado de esta especificación

```text
ESTADO_DOCUMENTAL = APROBADA
```

Esta especificación forma parte de la baseline comercial aprobada de AI Influencer Factory (Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17). La auditoría pre-freeze ya había señalado (hallazgo H02) que su estado anterior, `PROPUESTA_LISTA_PARA_APROBACION`, quedó desactualizado: el texto se redactó antes de la aprobación de F13.

Por eso la IA debe tratar los sistemas, identificadores, etapas internas y validadores definidos aquí como reglas vigentes de F13, no como propuestas.

Aprobar la especificación no aprueba datos de ningún proyecto. Cada objeto canónico de un influencer concreto sigue necesitando su propia aprobación explícita del usuario, según las reglas de este documento.

La versión con el estado anterior se conserva en `90_HISTORICO_Y_LEGACY/Versiones_Anteriores/v1.0/13_F13_CONSOLIDACION/AI_INFLUENCER_FACTORY_Especificacion_General_Consolidacion_Portabilidad_v1.0.md`, sin precedencia vigente.
