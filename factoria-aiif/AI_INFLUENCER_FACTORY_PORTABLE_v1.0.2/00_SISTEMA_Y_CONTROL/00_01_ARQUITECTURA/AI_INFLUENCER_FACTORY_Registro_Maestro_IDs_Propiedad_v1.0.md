---
document_id: AIIF_MASTER_ID_OWNERSHIP_REGISTRY
document_version: "1.0.0"
system_version: AIIF_PORTABLE_v1.0
status: PROPUESTA_LISTA_PARA_APROBACION
language: ES
scope: "Normalización pre-freeze H01-H09"
---

# AI INFLUENCER FACTORY
## Registro Maestro de IDs, Propiedad, Tipos de Objeto y Versionado — v1.0

**Estado:** `PROPUESTA_LISTA_PARA_APROBACION`  
**Propósito:** consolidar la nomenclatura técnica de AI Influencer Factory antes del freeze comercial, sin rediseñar F01–F13 ni sustituir Sistema 00.

> **Regla de precedencia:** Sistema 00 / Matriz Maestra → canon de la fase propietaria → estado operativo vigente → artefactos derivados. Este registro describe y enruta la verdad; no se convierte en una segunda fuente de verdad.

## 1. Alcance de esta normalización

Esta especificación resuelve o estructura los hallazgos H01–H09 de la Auditoría Transversal Pre-Freeze. En particular:

- paridad documental de F01;
- nomenclatura y alias técnicos;
- modelo de versionado;
- propiedad de canones;
- inventario exhaustivo de objetos;
- mapeo de estados fuente de nicho al ciclo de estados AIIF;
- localización de términos visibles;
- reglas de compatibilidad con paquetes ya existentes.

**No modifica por sí sola ningún valor concreto del canon de un influencer.**

## 2. Taxonomía maestra de objetos

| Clase | Significado | Fuente de verdad | ¿Puede cambiar sin recanonizar? |
|---|---|---|---|
| `CANONICAL` | Verdad semántica aprobada/bloqueada; autoridad en fase propietaria. | Fase propietaria / Sistema 00 | No |
| `DYNAMIC` | Estado operativo mutable; puede evolucionar sin recanonizar. | Sistema 00 / estado operativo | Sí, con trazabilidad según impacto |
| `DERIVED` | Artefacto regenerable desde canon/estado; nunca fuente primaria. | Canon + estado fuente | Sí, con trazabilidad según impacto |
| `HISTORICAL` | Versión retirada, rechazada, sustituida o instantánea histórica. | Historial / Registro de Cambios | Sí, con trazabilidad según impacto |
| `PENDING` | Dato, decisión, validación o acción no resuelta. | Sistema 00 / estado operativo | Sí, con trazabilidad según impacto |

### 2.1 Regla de clasificación

Un objeto no se clasifica por su nombre sino por su función y autoridad. El sufijo `_CURRENT` normalmente indica estado vigente, pero la clasificación oficial la determina este registro. Un archivo con la palabra “master” o “profile” no adquiere autoridad canónica por su nombre.

## 3. Modelo normalizado de versiones

| ID de versión | Uso |
|---|---|
| `SYSTEM_VERSION` | Versión del producto AI Influencer Factory. |
| `PROJECT_VERSION` | Versión integral de un proyecto/influencer. |
| `CANON_VERSION` | Versión de un objeto canónico concreto. |
| `PACKAGE_VERSION` | Versión de un paquete portable/producción. |
| `DOCUMENT_VERSION` | Versión editorial/documental de un archivo. |
| `SCHEMA_VERSION` | Versión de un esquema técnico/serialización. |

### 3.1 Regla antiambigüedad

El campo genérico `VERSION` queda **desaconsejado para nuevos esquemas**. Los documentos históricos pueden conservarlo, pero toda serialización nueva debe utilizar el campo especializado correspondiente.

```text
SYSTEM_VERSION
PROJECT_VERSION
CANON_VERSION
PACKAGE_VERSION
DOCUMENT_VERSION
SCHEMA_VERSION
```

Una actualización de `DOCUMENT_VERSION` o `PACKAGE_VERSION` no implica por sí misma un cambio de `PROJECT_VERSION` ni de `CANON_VERSION`.

## 4. Mapa Maestro de Propiedad Canónica

| Fase propietaria | ID canónico/estable | Nombre visible | Portabilidad | Nota |
|---|---|---|---|---|
| F01 | `NICHE_CANON` | Nicho Canónico | REQUERIDA | Fuente de verdad del nicho aprobado. |
| F01 | `NICHE_OPERATIONAL` | Nicho Operativo | REQUERIDA | Definición interna estable usada por estrategia, contenido, monetización y diferenciación. |
| F01 | `NICHE_PUBLIC_POSITIONING` | Posicionamiento Público del Nicho | OPCIONAL | ID normalizado propuesto para la formulación pública del nicho; alias legado: PUBLIC_POSITIONING. |
| F02 | `CONCEPT_CANON` | Concepto Canónico | REQUERIDA | Premisa estratégico-creativa aprobada. |
| F03:NAMING | `NAME_CANON` | Nombre Canónico | REQUERIDA | Nombre oficial aprobado; subsistema de nombramiento ubicado principalmente en F03. |
| F03 | `IDENTITY_CORE_CANON` | Núcleo Canónico de Identidad | REQUERIDA | Identidad básica aprobada. |
| F03 | `BIOGRAPHY_CANON` | Biografía Canónica | REQUERIDA | Biografía aprobada y bloqueada. |
| F04 | `CHARACTER_CANON` | Personaje Canónico | REQUERIDA | Personaje y reglas conductuales aprobadas. |
| F04 | `PSYCHOLOGY_MODEL_CANON` | Modelo Psicológico Canónico | OPCIONAL | Modelo interpretativo aprobado cuando aporte valor; no diagnóstico clínico. |
| F05 | `BRAND_IDENTITY_CANON` | Identidad de Marca Canónica | REQUERIDA | Identidad estratégica de marca aprobada. |
| F05 | `BRAND_POSITIONING_CANON` | Posicionamiento de Marca Canónico | REQUERIDA | Posicionamiento estratégico completo de marca. |
| F05 | `VALUE_PROPOSITION_CANON` | Propuesta de Valor Canónica | REQUERIDA | Propuesta de valor aprobada. |
| F06 | `PHYSICAL_IDENTITY_CANON` | Identidad Física Canónica | REQUERIDA | Rasgos físicos estables aprobados. |
| F06 | `VISUAL_STYLE_CANON` | Estilo Visual Canónico | REQUERIDA | Sistema estético/fotográfico aprobado. |
| F06 | `VISUAL_REFERENCE_SET_CANON` | Conjunto Canónico de Referencias Visuales | CONDICIONAL | Referencias visuales oficiales aprobadas cuando existan. |
| F06 | `VISUAL_IDENTITY_CANON` | Identidad Visual Canónica | REQUERIDA | Vista consolidada del sistema visual aprobado. |
| F07 | `VERBAL_IDENTITY_CANON` | Identidad Verbal Canónica | REQUERIDA | Reglas estables de lenguaje y tono aprobadas. |
| F07 | `VOICE_STYLE_CANON` | Estilo Vocal Canónico | CONDICIONAL | Estilo vocal aprobado cuando el proyecto requiera voz. |
| F07 | `VOICE_REFERENCE_SET_CANON` | Conjunto Canónico de Referencias de Voz | OPCIONAL | Muestras/referencias de voz aprobadas cuando existan. |
| F07 | `VOICE_IDENTITY_CANON` | Identidad de Voz Canónica | CONDICIONAL | Vista consolidada del sistema vocal aprobado. |
| F08 | `NARRATIVE_UNIVERSE_CANON` | Universo Narrativo Canónico | REQUERIDA | Estructura narrativa aprobada. |
| F08 | `NARRATIVE_WORLD_SET_CANON` | Conjunto Canónico de Mundos Narrativos | REQUERIDA | Mundos narrativos aprobados. |
| F08 | `RELATIONSHIP_GRAPH_CANON` | Grafo Canónico de Relaciones | REQUERIDA | Relaciones narrativas estructurales aprobadas. |
| F08 | `NARRATIVE_CONTINUITY_CANON` | Continuidad Narrativa Canónica | REQUERIDA | Reglas estructuradas de continuidad narrativa. |
| F09 | `CONTENT_SYSTEM_CANON` | Sistema de Contenido Canónico | REQUERIDA | Sistema editorial estructural aprobado. |
| F09 | `CONTENT_PILLAR_SET_CANON` | Conjunto Canónico de Pilares de Contenido | REQUERIDA | Cinco pilares principales salvo excepción aprobada. |
| F09 | `CONTENT_FORMAT_MATRIX_CANON` | Matriz Canónica de Formatos de Contenido | REQUERIDA | Relaciones estructurales pilar/formato. |
| F09 | `CONTENT_EDITORIAL_RULES_CANON` | Reglas Editoriales Canónicas | REQUERIDA | Reglas estables del sistema editorial. |
| F10 | `AI_PRODUCTION_SYSTEM_CANON` | Sistema Canónico de Producción IA | REQUERIDA | Gobierna ejecución y validación de producción. |
| F10 | `PRODUCTION_PACKAGE_SCHEMA_CANON` | Esquema Canónico del Paquete de Producción | REQUERIDA | Estructura portable del paquete de producción. |
| F10 | `PRODUCTION_PROMPT_RULES_CANON` | Reglas Canónicas de Construcción de Prompts | REQUERIDA | Reglas de compilación de prompts desde canon. |
| F10 | `PRODUCTION_VALIDATION_POLICY_CANON` | Política Canónica de Validación de Producción | REQUERIDA | Política de evaluación de activos. |
| F11 | `MONETIZATION_STRATEGY_CANON` | Estrategia de Monetización Canónica | REQUERIDA | Lógica general de monetización aprobada. |
| F11 | `MONETIZATION_ROUTE_SET_CANON` | Conjunto Canónico de Rutas de Monetización | REQUERIDA | Rutas aprobadas y roles estratégicos. |
| F11 | `MONETIZATION_SEQUENCE_CANON` | Secuencia Canónica de Monetización | REQUERIDA | Orden estratégico de activación. |
| F11 | `COMMERCIAL_ALIGNMENT_RULES_CANON` | Reglas Canónicas de Alineación Comercial | REQUERIDA | Guardrails comerciales aprobados. |
| F12 | `GROWTH_SYSTEM_CANON` | Sistema Canónico de Crecimiento | REQUERIDA | Sistema estable de crecimiento/aprendizaje. |
| F12 | `GROWTH_MEASUREMENT_FRAMEWORK_CANON` | Marco Canónico de Medición de Crecimiento | REQUERIDA | Define medición y comparabilidad. |
| F12 | `GROWTH_EXPERIMENTATION_POLICY_CANON` | Política Canónica de Experimentación de Crecimiento | REQUERIDA | Gobierna experimentos. |
| F12 | `GROWTH_DECISION_RULES_CANON` | Reglas Canónicas de Decisión y Aprendizaje | REQUERIDA | Convierte evidencia en decisiones. |
| F13 | `CONSOLIDATION_SYSTEM_CANON` | Sistema Canónico de Consolidación | REQUERIDA | Gobierna consolidación sin crear supercanon. |
| F13 | `MASTER_PROFILE_SCHEMA_CANON` | Esquema Canónico del Perfil Maestro | REQUERIDA | Estructura del Perfil Maestro derivado. |
| F13 | `PORTABLE_PACKAGE_SCHEMA_CANON` | Esquema Canónico del Paquete Portable | REQUERIDA | Estructura de portabilidad. |
| F13 | `RESUME_PROTOCOL_CANON` | Protocolo Canónico de Reanudación | REQUERIDA | Gobierna carga y continuidad en otra IA. |
| F13 | `PROJECT_INTEGRITY_POLICY_CANON` | Política Canónica de Integridad del Proyecto | REQUERIDA | Controles de integridad transversal. |

### 4.1 Regla de propiedad

- La fase propietaria decide y gobierna el objeto canónico.
- F13 lo registra, consolida y transporta.
- F12 puede proponer revisiones por evidencia, pero no cambiarlo directamente.
- F10 puede detectar desviación, pero no corregir el canon silenciosamente.
- Un objeto derivado nunca adquiere propiedad sobre el canon que lo originó.

## 5. Inventario Maestro de Objetos Dinámicos / Operativos

| Fase | ID | Nombre visible / función | Nota |
|---|---|---|---|
| F02 | `CONCEPTO_OPERATIVO` | Concepto Operativo | Representación interna seleccionada durante trabajo conceptual. |
| F03 | `BIOGRAPHY_OPERATIONAL` | Biografía Operativa | Vista compacta para contexto y portabilidad. |
| F04 | `CHARACTER_PROFILE` | Perfil de Personaje | Perfil operativo estructurado. |
| F04 | `BEHAVIORAL_RULES` | Reglas Conductuales | Reglas observables reutilizables; alimentan CHARACTER_CANON cuando se aprueban. |
| F05 | `BRAND_CORE` | Núcleo de Marca | Objeto de trabajo estructurado. |
| F05 | `BRAND_POSITIONING` | Posicionamiento de Marca de Trabajo | Objeto previo al bloqueo canónico. |
| F05 | `VALUE_PROPOSITION` | Propuesta de Valor de Trabajo | Objeto previo al bloqueo canónico. |
| F05 | `BRAND_BOUNDARIES` | Límites de Marca | Objeto de trabajo/soporte. |
| F06 | `VISUAL_SIGNATURE` | Firma Visual | Combinación reconocible derivada del sistema visual. |
| F06 | `VISUAL_VARIABLES` | Variables Visuales de Producción | Elementos permitidos/restringidos que cambian por producción. |
| F07 | `VOICE_PROVIDER_BINDINGS` | Asociaciones de Proveedor de Voz | IDs/configuraciones de proveedor; no identidad. |
| F07 | `CHANNEL_EXPRESSION_RULES` | Reglas de Expresión por Canal | Adaptación de la identidad verbal a canales. |
| F08 | `NARRATIVE_STATE_CURRENT` | Estado Narrativo Actual | Estado narrativo vigente. |
| F08 | `NARRATIVE_EVENT_LOG` | Registro de Eventos Narrativos | Eventos confirmados que afectan continuidad. |
| F09 | `CONTENT_SERIES_LIBRARY` | Biblioteca de Series de Contenido | Series activas, pausadas, probadas o retiradas. |
| F09 | `CONTENT_BACKLOG` | Banco de Contenido | Ideas, borradores y oportunidades. |
| F09 | `EDITORIAL_SIMULATION_30D` | Simulación Editorial de 30 Días | Prueba de sostenibilidad; no calendario vigente. |
| F09 | `EDITORIAL_CALENDAR_CURRENT` | Calendario Editorial Actual | Calendario operativo vigente. |
| F09 | `PUBLIC_PROFILE_COPY_CURRENT` | Copy Público Actual de Perfil | Copy operativo por plataforma. |
| F09 | `PLATFORM_CONTENT_PROFILE` | Perfil de Contenido por Plataforma | Adaptación operativa por plataforma. |
| F10 | `PRODUCTION_JOB` | Trabajo de Producción | Unidad trazable de ejecución. |
| F10 | `PRODUCTION_RUN` | Ejecución de Producción | Intento individual de generación/edición. |
| F10 | `ASSET_RESULT` | Resultado de Activo | Activo producido antes de decisión final. |
| F10 | `ASSET_REGISTRY` | Registro de Activos | Registro operativo de activos y metadatos. |
| F10 | `PROVIDER_ADAPTER_PROFILE` | Perfil Adaptador de Proveedor | Traduce especificación portable a proveedor. |
| F10 | `CAPABILITY_MAP_CURRENT` | Mapa Actual de Capacidades | Capacidades vigentes de herramienta/plataforma. |
| F11 | `MONETIZATION_ROADMAP_CURRENT` | Hoja de Ruta Actual de Monetización | Plan operativo vigente. |
| F11 | `OFFER_CATALOG_CURRENT` | Catálogo Actual de Ofertas | Ofertas activas/candidatas/pausadas. |
| F11 | `PRICING_CURRENT` | Estructura Actual de Precios | Precios y paquetes vigentes. |
| F11 | `PARTNER_TARGET_PROFILE_CURRENT` | Perfil Actual de Socio/Marca Objetivo | Características de socios/marcas objetivo. |
| F11 | `PORTFOLIO_CURRENT` | Portafolio Actual | Demos/ejemplos y activos comerciales. |
| F11 | `MEDIA_KIT_CURRENT` | Kit de Medios Actual | Presentación comercial vigente. |
| F11 | `COMMERCIAL_FUNNEL_CURRENT` | Embudo Comercial Actual | Etapas vigentes de conversión comercial. |
| F11 | `OUTREACH_PLAYBOOK_CURRENT` | Guía Actual de Prospección Comercial | Mensajes, secuencia y seguimiento. |
| F11 | `COMMERCIAL_PIPELINE` | Registro de Oportunidades Comerciales | Oportunidades concretas. |
| F11 | `MONETIZATION_EXPERIMENT_LOG` | Registro de Experimentos de Monetización | Pruebas y resultados. |
| F11 | `MONETIZATION_ASSUMPTIONS_CURRENT` | Supuestos Actuales de Monetización | Separa hipótesis de hechos. |
| F11 | `REVENUE_TRACKER_CURRENT` | Registro Actual de Ingresos | Datos reales cuando existan. |
| F12 | `GROWTH_ROADMAP_CURRENT` | Hoja de Ruta Actual de Crecimiento | Plan 30/60/90/180/365 vigente. |
| F12 | `BASELINE_SNAPSHOT_CURRENT` | Instantánea Actual de Línea Base | Línea base vigente. |
| F12 | `KPI_DASHBOARD_CURRENT` | Panel Actual de KPI | Vista de KPI prioritarios. |
| F12 | `PLATFORM_GROWTH_PROFILE` | Perfil de Crecimiento por Plataforma | Objetivos, señales y experimentos por plataforma. |
| F12 | `DISTRIBUTION_PLAN_CURRENT` | Plan Actual de Distribución | Canales y tácticas de distribución vigentes. |
| F12 | `GROWTH_EXPERIMENT_BACKLOG` | Banco de Experimentos de Crecimiento | Hipótesis pendientes priorizadas. |
| F12 | `GROWTH_EXPERIMENT_LOG` | Registro de Experimentos de Crecimiento | Ejecuciones y resultados. |
| F12 | `GROWTH_LEARNING_LOG` | Registro de Aprendizajes de Crecimiento | Aprendizajes reutilizables. |
| F12 | `WEEKLY_GROWTH_REVIEW_CURRENT` | Revisión Semanal Actual de Crecimiento | Revisión operativa periódica. |
| F12 | `GROWTH_ASSUMPTIONS_CURRENT` | Supuestos Actuales de Crecimiento | Hipótesis operativas. |
| F12 | `GROWTH_RECOMMENDATIONS_CURRENT` | Recomendaciones Actuales de Crecimiento | Acciones propuestas desde evidencia. |
| F12 | `PERFORMANCE_SNAPSHOT_LOG` | Registro de Instantáneas de Rendimiento | Instantáneas comparables por período. |
| F13 | `PROJECT_INTEGRITY_REPORT_CURRENT` | Informe Actual de Integridad del Proyecto | Resultado vigente de auditoría de integridad. |
| F13 | `CANON_REGISTRY_CURRENT` | Registro Actual de Canon | Índice de objetos canónicos y propietarios. |
| F13 | `DEPENDENCY_GRAPH_CURRENT` | Grafo Actual de Dependencias | Mapa vigente de dependencias. |
| F13 | `DOCUMENT_INDEX_CURRENT` | Índice Actual de Documentos | Registro de documentos y vigencia. |
| F13 | `PENDING_ITEMS_REGISTER_CURRENT` | Registro Actual de Pendientes | Pendientes relevantes y fase propietaria. |
| F13 | `DERIVED_ARTIFACT_INDEX_CURRENT` | Índice Actual de Artefactos Derivados | Derivados y necesidad de regeneración. |

## 6. Inventario Maestro de Artefactos Derivados

| Fase | ID | Nombre visible | Función / nota |
|---|---|---|---|
| F06 | `PROMPT_BASE_VISUAL` | Prompt Base Visual | Derivado del canon visual; no fuente de verdad. |
| F10 | `MASTER_AVATAR_PROMPT_CURRENT` | Prompt Maestro de Recreación Vigente | Derivado y versionado desde canon. |
| F10 | `PRODUCTION_PACKAGE` | Paquete de Producción | Compilado portable de resumen aprobado + canon + referencias + parámetros. |
| F10 | `REGENERATION_PLAN` | Plan de Regeneración | Corrección dirigida derivada de validación. |
| F13 | `MASTER_PROFILE_CURRENT` | Perfil Maestro Actual | Vista consolidada derivada. |
| F13 | `PORTABLE_PACKAGE_CURRENT` | Paquete Portable Actual | Paquete completo derivado. |
| F13 | `PORTABLE_LITE_CURRENT` | Paquete Portable Ligero Actual | Vista comprimida derivada. |
| F13 | `UNIVERSAL_RESUME_CURRENT` | Archivo Universal de Reanudación Actual | Derivado textual portable. |
| F13 | `COPYABLE_PORTABLE_CONTEXT_CURRENT` | Contexto Portable Copiable Actual | Derivado mínimo para plataformas sin archivos. |
| F13 | `PORTABLE_MANIFEST_CURRENT` | Manifiesto Portable Actual | Manifiesto del paquete. |
| F13 | `PROJECT_SNAPSHOT_CURRENT` | Instantánea Actual del Proyecto | Vista temporal del proyecto. |
| F13 | `FINAL_CHECKPOINT_CURRENT` | Punto de Control Final Actual | Vista del checkpoint de Sistema 00 al consolidar. |

### 6.1 Regla de derivación

Cuando cambia un canon propietario, los artefactos derivados afectados deben marcarse para `REGENERAR` o `REVALIDAR` según el sistema de impacto. El derivado anterior puede conservarse como histórico, pero no presentarse como vigente.

## 7. Objetos históricos y pendientes

### 7.1 `HISTORICAL_OBJECTS`

No es un único objeto global obligatorio, sino una **clase de almacenamiento lógico**. Incluye versiones retiradas, candidatos rechazados, simulaciones históricas, canones reemplazados y instantáneas que deban conservarse para trazabilidad.

### 7.2 `PENDING_OBJECTS`

Incluye preguntas abiertas, referencias no adjuntas, validaciones pendientes, decisiones no resueltas, tareas bloqueantes y próximas acciones. F13 los consolida mediante `PENDING_ITEMS_REGISTER_CURRENT`.

## 8. Registro consolidado de validadores

| Ámbito / fase | ID del validador |
|---|---|
| GLOBAL | `VALIDADOR_DE_COMPLETITUD` |
| GLOBAL | `VALIDADOR_DE_PROCEDENCIA` |
| GLOBAL | `VALIDADOR_DE_COHERENCIA_INTERNA` |
| GLOBAL | `VALIDADOR_CRONOLOGICO` |
| GLOBAL | `VALIDADOR_DE_DEPENDENCIAS` |
| GLOBAL | `VALIDADOR_CANONICO` |
| GLOBAL | `VALIDADOR_ESTRATEGICO` |
| F10/GLOBAL | `VALIDADOR_DE_PRODUCCION_IA` |
| F13/GLOBAL | `VALIDADOR_GLOBAL` |
| TRANSVERSAL | `VALIDADOR_DE_IDIOMA_Y_LOCALIZACION` |
| TRANSVERSAL | `VALIDADOR_DE_COMPATIBILIDAD_DE_PLATAFORMA` |
| TRANSVERSAL | `VALIDADOR_DE_PREPARACION_OPERATIVA` |
| TRANSVERSAL | `VALIDADOR_DE_ACTIVACION_DE_FACTORÍA` |
| F03:NAMING | `VALIDADOR_DE_NOMBRE_CANONICO` |
| F01 | `VALIDADOR_DE_NICHO_CANONICO` |
| F02 | `VALIDADOR_DE_CONCEPTO_CANONICO` |
| F03 | `VALIDADOR_DE_BIOGRAFIA_E_IDENTIDAD` |
| F04 | `VALIDADOR_DE_PERSONAJE_Y_PSICOLOGIA` |
| F05 | `VALIDADOR_DE_IDENTIDAD_DE_MARCA` |
| F06 | `VALIDADOR_DE_IDENTIDAD_VISUAL` |
| F06 | `VALIDADOR_DE_CONSISTENCIA_VISUAL_CON_REFERENCIAS` |
| F07 | `VALIDADOR_DE_IDENTIDAD_VERBAL_Y_VOZ` |
| F07 | `VALIDADOR_DE_CONSISTENCIA_DE_VOZ_CON_REFERENCIAS` |
| F08 | `VALIDADOR_DE_UNIVERSO_NARRATIVO` |
| F08 | `VALIDADOR_DE_CONTINUIDAD_NARRATIVA` |
| F09 | `VALIDADOR_DE_SISTEMA_DE_CONTENIDO` |
| F09 | `VALIDADOR_DE_VARIACION_Y_NO_REPETICION` |
| F09 | `VALIDADOR_DE_COHERENCIA_DE_CONTENIDO_CON_CANON` |
| F10 | `VALIDADOR_DE_PAQUETE_DE_PRODUCCION` |
| F10 | `VALIDADOR_DE_ACTIVO_FINAL` |
| F11 | `VALIDADOR_DE_ESTRATEGIA_DE_MONETIZACION` |
| F11 | `VALIDADOR_DE_AJUSTE_COMERCIAL_CON_CANON` |
| F11 | `VALIDADOR_DE_VIABILIDAD_DE_RUTA_DE_INGRESO` |
| F12 | `VALIDADOR_DE_ESTRATEGIA_DE_CRECIMIENTO` |
| F12 | `VALIDADOR_DE_EXPERIMENTO_DE_CRECIMIENTO` |
| F12 | `VALIDADOR_DE_EVIDENCIA_DE_CRECIMIENTO` |
| F13 | `VALIDADOR_DE_CONSOLIDACION_DEL_PROYECTO` |
| F13 | `VALIDADOR_DE_PAQUETE_PORTABLE` |
| F13 | `VALIDADOR_DE_REANUDACION_PORTABLE` |

## 9. Prefijos y rangos de etapas internas

| Sistema / fase | Rango | Uso |
|---|---|---|
| F03:NAMING | `N00–N15` | Etapas internas; no fases globales |
| F01 | `NI00–NI14` | Etapas internas; no fases globales |
| F02 | `CO00–CO14` | Etapas internas; no fases globales |
| F03 | `BI00–BI16` | Etapas internas; no fases globales |
| F04 | `PS00–PS16` | Etapas internas; no fases globales |
| F05 | `MA00–MA16` | Etapas internas; no fases globales |
| F06 | `VI00–VI18` | Etapas internas; no fases globales |
| F07 | `VV00–VV18` | Etapas internas; no fases globales |
| F08 | `NR00–NR18` | Etapas internas; no fases globales |
| F09 | `CT00–CT20` | Etapas internas; no fases globales |
| F10 | `PR00–PR22` | Etapas internas; no fases globales |
| F11 | `MO00–MO20` | Etapas internas; no fases globales |
| F12 | `GR00–GR22` | Etapas internas; no fases globales |
| F13 | `CS00–CS22` | Etapas internas; no fases globales |

> Las etapas internas no crean estados globales nuevos ni deben imponerse al usuario en la interfaz normal.

## 10. Normalización H03 — Posicionamiento público del nicho

La especificación fuente de nicho utiliza `PUBLIC_POSITIONING` para la expresión pública simplificada del nicho. F05 utiliza `BRAND_POSITIONING_CANON` para el posicionamiento estratégico de marca. Para eliminar la colisión semántica se propone:

```text
ID normalizado: NICHE_PUBLIC_POSITIONING
Alias legacy aceptado: PUBLIC_POSITIONING
Fase propietaria: F01
NO EQUIVALE A: BRAND_POSITIONING_CANON
```

**Regla de compatibilidad:** un paquete antiguo que contenga `PUBLIC_POSITIONING` se interpreta como `NICHE_PUBLIC_POSITIONING` únicamente cuando el contexto confirme que pertenece al subsistema de nicho. No se hace una conversión ciega.

## 11. Normalización H04 — Continuidad biográfica F03

La clave/etiqueta histórica de F03 `continuity_rules` o “reglas de continuidad” puede confundirse con `NARRATIVE_CONTINUITY_CANON` de F08. Se propone:

```text
Nombre visible: Restricciones de continuidad biográfica
Clave recomendada: biographical_continuity_constraints
Fase propietaria: F03
NO EQUIVALE A: NARRATIVE_CONTINUITY_CANON
```

F03 conserva hechos y restricciones necesarios para no contradecir la biografía; F08 gobierna la continuidad narrativa estructurada, eventos, mundos y estado narrativo.

## 12. Integración H09 — estados de la fuente de nicho

La especificación universal de nicho conserva términos propios. AIIF no los adopta como estados globales. Se propone este mapeo de compatibilidad:

| Estado fuente | `ESTADO_DATO` AIIF | `ROL_NICHO` | Almacenamiento / nota |
|---|---|---|---|
| `WORKING` | `PROPUESTO / BORRADOR` | `TRABAJO` | Activo según etapa |
| `CANDIDATE` | `BORRADOR` | `CANDIDATO` | Activo según etapa |
| `SIMULATED` | `BORRADOR / VALIDADO` | `SIMULADO` | Activo según etapa |
| `RECOMMENDED` | `VALIDADO` | `RECOMENDADO` | Activo según etapa |
| `APPROVED` | `APROBADO` | mantener rol vigente hasta bloqueo | Activo según etapa |
| `CANONICAL` | `APROBADO` | `CANONICO` | Activo según etapa |
| `LOCKED` | `BLOQUEADO` | `CANONICO` | Activo según etapa |
| `RETIRED` | preservar último estado válido | `RETIRADO` | `HISTORICAL` |
| `REJECTED` | preservar trazabilidad sin crear estado global nuevo | `RECHAZADO` | `HISTORICAL` |

La combinación `ESTADO_DATO + ROL_NICHO` es la interfaz AIIF. Los términos fuente se conservan solo para migración, procedencia y lectura de documentos históricos.

## 13. Nomenclatura visible normalizada

| Término técnico / heredado | Preferencia visible en español |
|---|---|
| `portfolio` | portafolio |
| `pricing` | precios / estructura de precios |
| `funnel` | embudo comercial |
| `outreach` | prospección comercial / contacto comercial |
| `checkpoint` | punto de control |
| `snapshot` | instantánea |
| `backlog` | banco / lista priorizada, según contexto |
| `growth` | crecimiento (salvo ID técnico o alias internacional autorizado) |

IDs técnicos, nombres oficiales de plataformas, contratos de API y aliases internacionales autorizados pueden mantenerse en inglés. La capa visible/documental debe preferir español.

## 14. Reglas mínimas de serialización Portable v1.0

Todo objeto serializado debería poder declarar, cuando aplique:

```json
{
  "id": "[OBJECT_ID]",
  "object_class": "CANONICAL|DYNAMIC|DERIVED|HISTORICAL|PENDING",
  "owner_phase": "[F01-F13|SYSTEM_00]",
  "status": "[ESTADO]",
  "project_version": "[PROJECT_VERSION]",
  "canon_version": "[CANON_VERSION|null]",
  "schema_version": "[SCHEMA_VERSION]",
  "source_refs": [],
  "dependencies": [],
  "last_validated": "[DATE|null]"
}
```

No todos los campos son obligatorios para todos los objetos; el esquema concreto debe omitir campos no aplicables en lugar de inventar valores.

## 15. Regla de alias y deprecación

```text
LEGACY_ID
   ↓ interpretar con contexto
NORMALIZED_ID
   ↓ usar en nuevos paquetes
```

- Los aliases heredados se conservan para leer paquetes anteriores.
- Los nuevos documentos deben escribir el ID normalizado.
- No se elimina historial.
- Si un alias es ambiguo, se requiere contexto de fase/objeto antes de mapear.

## 16. F01 — paridad documental

Como parte de esta recomendación se acompaña una **Especificación General de F01 — Fundamentos Estratégicos**. Su función es reunir en un solo documento el canon de F01 ya aprobado y la metodología fuente de nicho.

No introduce un nuevo `STRATEGIC_FOUNDATIONS_CANON`: los fundamentos estratégicos continúan registrados en Sistema 00 / Matriz Maestra, mientras `NICHE_CANON` y sus objetos asociados conservan su propiedad específica.

## 17. H02 — actualización física de documentos post-aprobación

Esta recomendación fija la regla de actualización documental, pero **no reescribe todavía todos los DOCX F02–F13**. Tras aprobar esta normalización, conviene regenerar una sola vez las versiones finales para evitar duplicar trabajo si algún ID de esta propuesta cambia durante la aprobación.

Cabecera recomendada para documentos finales:

```text
Estado documental: APROBADA
Estado funcional: CANÓNICA / BLOQUEADA según corresponda
DOCUMENT_VERSION: [x.y.z]
SYSTEM_VERSION: AIIF_PORTABLE_v1.0
```

## 18. Compatibilidad y no ruptura

- No romper paquetes existentes.
- Conservar aliases heredados.
- No crear nuevos estados globales.
- No convertir el Perfil Maestro en fuente de verdad.
- No convertir objetos dinámicos en canon por serializarlos.
- No cambiar una fase propietaria sin gobernanza explícita.

## 19. Decisiones que esta propuesta solicita aprobar

1. La taxonomía de cinco clases: `CANONICAL`, `DYNAMIC`, `DERIVED`, `HISTORICAL`, `PENDING`.
2. El modelo de versiones especializado.
3. El Mapa Maestro de Propiedad Canónica.
4. El inventario exhaustivo v1.0 de objetos dinámicos y derivados.
5. `NICHE_PUBLIC_POSITIONING` como ID normalizado de F01, manteniendo `PUBLIC_POSITIONING` como alias heredado contextual.
6. `biographical_continuity_constraints` / “Restricciones de continuidad biográfica” como normalización F03, manteniendo `continuity_rules` como alias heredado.
7. El mapeo de estados de la fuente de nicho a `ESTADO_DATO + ROL_NICHO`.
8. La política de nomenclatura visible española retrospectiva.
9. La creación de la Especificación General F01 como documentación integrada del canon ya aprobado.
10. Regenerar posteriormente las versiones documentales F02–F13 con estado post-aprobación y estos IDs normalizados.

## 20. Estado de esta especificación

```text
ESTADO = PROPUESTA_LISTA_PARA_APROBACION
```

Hasta aprobación explícita, los IDs normalizados nuevos y el mapeo de compatibilidad descritos aquí no sustituyen los nombres históricos existentes.
