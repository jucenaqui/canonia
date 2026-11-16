---
spec_id: AIIF_GENERAL_GROWTH_SYSTEM_SPEC
spec_version: "1.0.0"
spec_type: AIIF_GROWTH_EXPERIMENTATION_OPTIMIZATION_SPEC
status: APROBADA
estado_documental: APROBADA
estado_documental_anterior: PROPUESTA_LISTA_PARA_APROBACION
base_aprobacion: "Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17"
revision_documental: "AIIF_PORTABLE_v1.0.2 (CR-0002)"
phase: "F12 - Crecimiento"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "AI_INFLUENCER_FACTORY_Guia_Peticiones_General_v1.md"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Crecimiento, Experimentación y Optimización
### Versión 1.0.0 — Aprobada (baseline comercial v1.0)

## 1. Propósito

Esta especificación define el sistema general mediante el cual AI Influencer Factory (AIIF) convierte objetivos, contenido, producción, monetización y datos reales en un **proceso continuo de crecimiento, experimentación, medición y aprendizaje**.

F12 no debe ser una lista fija de trucos de growth. Debe responder de forma gobernada:

- qué queremos hacer crecer;
- qué métricas permiten observarlo;
- cuál es la línea base;
- qué hipótesis conviene probar;
- qué variable cambiar;
- cuánto tiempo observar;
- qué ocurrió realmente;
- qué aprendimos;
- qué cambio operativo aplicar;
- cuándo existe evidencia suficiente para proponer revisar un canon anterior.

Flujo visible recomendado:

```text
OBJETIVO DE CRECIMIENTO
      ->
LINEA BASE + KPI
      ->
ROADMAP 30 / 60 / 90 / 180 / 365
      ->
HIPOTESIS
      ->
EXPERIMENTO
      ->
MEDICION
      ->
APRENDIZAJE
      ->
OPTIMIZACION
      ->
REPETIR / ESCALAR / DETENER / PROPONER REVISION
```

## 2. Fundamento experto de origen

La especificación original de expertos exige como salida obligatoria un **Plan de Crecimiento de 30, 60, 90, 180 días y 1 año**.

El rol original incorpora además un **Consultor de Growth**, y el objetivo global del sistema es construir un activo digital capaz de generar comunidad, monetizar y sostenerse durante años.

La documentación operativa posterior de AIIF también contempla acciones como:

- definir KPI;
- definir métricas semanales;
- diseñar experimentos;
- decidir qué probar primero;
- analizar resultados;
- decidir qué series mantener o eliminar;
- reoptimizar la estrategia con datos.

F12 conserva esa intención.

La fuente experta original no formaliza:

- una arquitectura de métricas;
- línea base y snapshots;
- backlog de experimentos;
- protocolo de hipótesis;
- niveles de evidencia;
- reglas de adopción;
- separación entre aprendizaje operativo y revisión canónica;
- trazabilidad de experimentos;
- tratamiento de datos faltantes o no comparables.

Esos elementos son **extensiones arquitectónicas de AIIF**.

## 3. Regla de procedencia

> **AIIF debe conservar el objetivo experto de crear un Plan de Crecimiento en horizontes 30/60/90/180/365, pero la arquitectura de KPI, experimentación, evidencia, aprendizaje, snapshots, decisión y gobernanza corresponde a una adaptación propia de AIIF.**

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

F12 no crea una fase global adicional.

## 5. Principio central

> **Growth no es cambiar continuamente de identidad hasta que una métrica suba. F12 debe experimentar sobre variables operativas y de distribución, aprender con evidencia y proteger el canon mientras optimiza aquello que sí puede cambiar.**

## 6. F12 es una fase de aprendizaje

F12 se diferencia de muchas fases anteriores.

F01-F11 construyen y gobiernan estrategia, identidad, sistema de contenido, producción y monetización.

F12 principalmente:

```text
OBSERVA
PRUEBA
MIDE
COMPARA
APRENDE
OPTIMIZA
PROPONE
```

Por ello, no todo lo utilizado en F12 debe bloquearse como canon.

## 7. Qué sí define F12

F12 puede definir:

- sistema general de crecimiento;
- objetivos de crecimiento y su jerarquía;
- marco de medición;
- definición de KPI;
- baseline inicial;
- roadmap 30/60/90/180/365;
- cadencia de revisión;
- política de experimentación;
- backlog de hipótesis;
- diseño de experimentos;
- priorización de pruebas;
- reglas de interpretación;
- niveles de evidencia;
- reglas de adopción operativa;
- reglas para escalar, pausar o descartar tácticas;
- distribución y adquisición;
- optimización por plataforma;
- integración con métricas comerciales de F11;
- aprendizaje acumulado;
- criterios para proponer revisiones controladas de fases anteriores.

## 8. Qué no debe congelar F12

F12 no debe convertir automáticamente en canon permanente:

- horario exacto de publicación;
- frecuencia exacta vigente;
- formato ganador de una semana;
- hook ganador de una pieza;
- duración exacta;
- plataforma prioritaria temporal;
- hashtag concreto;
- CTA experimental;
- presupuesto de prueba;
- tendencia;
- benchmark temporal;
- algoritmo supuesto de una plataforma;
- tactic playbook del momento;
- KPI objetivo operativo de un período concreto.

Estos elementos pueden cambiar con datos, plataforma, mercado o etapa.

## 9. Dependencias de entrada

F12 debe recuperar automáticamente, cuando existan:

- objetivo de 90 días de F01;
- mercados y audiencia;
- `BRAND_POSITIONING_CANON`;
- `CONTENT_SYSTEM_CANON`;
- `CONTENT_PILLAR_SET_CANON`;
- `CONTENT_FORMAT_MATRIX_CANON`;
- `CONTENT_EDITORIAL_RULES_CANON`;
- `CONTENT_SERIES_LIBRARY`;
- `EDITORIAL_CALENDAR_CURRENT`;
- `PLATFORM_CONTENT_PROFILE`;
- `AI_PRODUCTION_SYSTEM_CANON`;
- `ASSET_REGISTRY`;
- `MONETIZATION_STRATEGY_CANON`;
- `MONETIZATION_SEQUENCE_CANON`;
- `MONETIZATION_ROADMAP_CURRENT`;
- `COMMERCIAL_PIPELINE` cuando exista;
- `REVENUE_TRACKER_CURRENT` cuando exista;
- capacidad de producción;
- tiempo disponible;
- métricas reales disponibles;
- restricciones.

No volver a preguntar datos válidos ya registrados.

## 10. Tres rutas de entrada

### Ruta A - Ya existen datos

AIIF debe partir de datos reales y construir baseline, diagnóstico y prioridades.

### Ruta B - Existen métricas parciales

AIIF debe usar lo disponible, marcar huecos y evitar inventar denominadores o históricos.

### Ruta C - Proyecto nuevo sin datos

AIIF construye un plan inicial de adquisición y aprendizaje.

No debe fingir que existe una baseline histórica.

## 11. Inicio Fácil

El usuario no necesita saber analítica o experimentación.

Mensaje conceptual recomendado:

> No necesitas saber qué KPI mirar ni cómo diseñar un experimento. Usaré tus objetivos, contenido, plataformas y capacidad para proponerte qué medir, qué probar primero y cómo interpretar los resultados sin cambiar tu identidad por una sola métrica.

## 12. Capas de F12

Se propone separar:

```text
GROWTH_SYSTEM
= reglas estables de crecimiento y aprendizaje

GROWTH_MEASUREMENT_FRAMEWORK
= cómo se definen y relacionan métricas

GROWTH_EXPERIMENTATION_POLICY
= cómo se diseñan y evalúan pruebas

GROWTH_DECISION_RULES
= cómo convertir evidencia en acciones

GROWTH_ROADMAP_CURRENT
= plan vigente 30/60/90/180/365

GROWTH_DATA_CURRENT
= datos y snapshots actuales

GROWTH_LEARNING_CURRENT
= aprendizajes vigentes
```

## 13. Objetos canónicos propuestos

```text
GROWTH_SYSTEM_CANON
GROWTH_MEASUREMENT_FRAMEWORK_CANON
GROWTH_EXPERIMENTATION_POLICY_CANON
GROWTH_DECISION_RULES_CANON
```

Nombres visibles:

- Sistema Canónico de Crecimiento;
- Marco Canónico de Medición de Crecimiento;
- Política Canónica de Experimentación de Crecimiento;
- Reglas Canónicas de Decisión y Aprendizaje.

## 14. Objetos dinámicos propuestos

```text
GROWTH_ROADMAP_CURRENT
BASELINE_SNAPSHOT_CURRENT
KPI_DASHBOARD_CURRENT
PLATFORM_GROWTH_PROFILE
DISTRIBUTION_PLAN_CURRENT
GROWTH_EXPERIMENT_BACKLOG
GROWTH_EXPERIMENT_LOG
GROWTH_LEARNING_LOG
WEEKLY_GROWTH_REVIEW_CURRENT
GROWTH_ASSUMPTIONS_CURRENT
GROWTH_RECOMMENDATIONS_CURRENT
PERFORMANCE_SNAPSHOT_LOG
```

Estos pueden evolucionar sin recanonizar F12.

## 15. Objetivo de crecimiento

F12 debe distinguir:

```text
BUSINESS_GOAL
AUDIENCE_GROWTH_GOAL
CONTENT_PERFORMANCE_GOAL
COMMUNITY_GOAL
COMMERCIAL_GROWTH_GOAL
LEARNING_GOAL
```

El crecimiento de seguidores es solo una dimensión.

## 16. Jerarquía de objetivos

AIIF debe evitar optimizar métricas secundarias contra el objetivo real.

Ejemplo abstracto:

```text
OBJETIVO PRINCIPAL
comunidad cualificada

METRICA DE APOYO
seguidores

RIESGO
crecer seguidores no cualificados mediante contenido incompatible
```

La optimización nunca debe justificar ruptura de canon solo para maximizar volumen.

## 17. Roadmap 30 / 60 / 90 / 180 / 365

La estructura temporal experta se conserva explícitamente.

### 30 días - Establecer línea base

Objetivos típicos:

- ejecutar sistema de contenido;
- recoger baseline;
- comprobar producción sostenible;
- identificar señales iniciales;
- evitar cambios excesivos simultáneos.

### 60 días - Comparar y enfocar

- repetir formatos prometedores;
- descartar hipótesis débiles;
- mejorar distribución;
- comenzar optimización por segmento/plataforma.

### 90 días - Evaluar objetivo inicial

- revisar progreso frente al objetivo F01;
- separar resultado de aprendizaje;
- consolidar tácticas repetibles;
- revisar monetización si corresponde.

### 180 días - Escalar aprendizajes

- ampliar lo replicado;
- diversificar adquisición de forma controlada;
- revisar eficiencia;
- evaluar riesgo de concentración.

### 365 días - Sistema sostenible

- revisar posicionamiento, audiencia y negocio con datos acumulados;
- consolidar playbooks;
- evaluar expansión de plataformas/rutas;
- preparar una revisión estratégica mayor si la evidencia lo justifica.

## 18. `GROWTH_ROADMAP_CURRENT`

Se adopta como plan operativo vigente.

Puede incluir:

- horizonte;
- objetivo;
- hipótesis prioritarias;
- acciones;
- experimentos;
- owner cuando aplique;
- dependencias;
- KPI;
- hitos;
- estado;
- revisión programada.

Es dinámico.

## 19. Baseline

Se propone:

```text
BASELINE_SNAPSHOT_CURRENT
```

Debe registrar lo disponible antes de evaluar mejoras.

Puede incluir:

- período;
- plataforma;
- audiencia inicial;
- publicaciones;
- alcance;
- impresiones;
- vistas;
- engagement;
- guardados;
- compartidos;
- follows;
- visitas de perfil;
- clics;
- leads;
- conversiones;
- otros datos disponibles.

No rellenar métricas faltantes con estimaciones silenciosas.

## 20. Métrica, KPI y objetivo no son lo mismo

Se adopta:

```text
METRIC
= dato observado

KPI
= métrica prioritaria para una decisión

TARGET
= valor objetivo para un período
```

Una métrica puede existir sin ser KPI.

## 21. `GROWTH_MEASUREMENT_FRAMEWORK_CANON`

Debe gobernar:

- definiciones de métricas;
- unidades;
- denominadores;
- período de medición;
- fuente;
- nivel de confianza;
- comparabilidad;
- relación con objetivos;
- reglas de datos faltantes.

No debe congelar valores objetivo eternos.

## 22. Diccionario de métricas

F12 debe poder documentar para cada métrica:

```text
METRIC_ID
NAME
DEFINITION
SOURCE
UNIT
DENOMINATOR
WINDOW
PLATFORM
OBJECTIVE_LINK
KNOWN_LIMITATIONS
```

Esto reduce errores al comparar métricas con nombres similares entre plataformas.

## 23. Categorías de métricas

Según el proyecto pueden existir:

### Descubrimiento

- reach;
- impressions;
- views;
- unique viewers;
- profile visits.

### Atención

- watch time;
- completion;
- retention;
- dwell time cuando exista.

### Engagement

- likes;
- comments;
- saves;
- shares;
- replies.

### Conversión de audiencia

- follows;
- follow rate;
- link clicks;
- subscriptions;
- opt-ins.

### Comunidad

- repeat commenters;
- replies;
- DMs relevantes;
- participación recurrente;
- señales cualitativas.

### Negocio

- leads;
- qualified opportunities;
- proposals;
- close rate;
- revenue;
- repurchase.

No todas deben usarse como KPI simultáneamente.

## 24. Métricas absolutas y tasas

AIIF debe distinguir volumen de eficiencia.

Ejemplo conceptual:

```text
1000 visualizaciones
50 follows

!=

10000 visualizaciones
60 follows
```

Sin contexto, mayor volumen no implica mejor conversión.

## 25. Denominadores

Una tasa debe conservar su denominador.

No comparar silenciosamente:

```text
engagement / followers
```

con:

```text
engagement / reach
```

como si fueran la misma métrica.

## 26. Ventanas temporales

F12 debe registrar ventanas comparables:

```text
24H
7D
28D
30D
90D
CUSTOM
```

La ventana depende de plataforma, formato y decisión.

## 27. Datos reales, estimados y objetivos

Se reutiliza la separación:

```text
REAL
ESTIMATED
TARGET
SIMULATED
```

Nunca mezclar categorías sin etiqueta.

## 28. `KPI_DASHBOARD_CURRENT`

Es una vista dinámica.

Puede contener:

- KPI principal;
- KPI secundarios;
- baseline;
- target;
- actual;
- período;
- cambio;
- interpretación;
- fuente;
- confianza;
- próxima acción.

No es un nuevo canon.

## 29. KPI por etapa

Los KPI pueden cambiar con la etapa.

Ejemplo abstracto:

```text
ETAPA 1
produccion + baseline

ETAPA 2
retencion + conversion a follow

ETAPA 3
comunidad + repetibilidad

ETAPA 4
conversion comercial + eficiencia
```

Cambiar KPI no implica cambiar identidad.

## 30. Cadencia de revisión

F12 puede definir:

- revisión breve semanal;
- revisión mensual;
- checkpoint 30/60/90;
- revisión 180;
- revisión anual.

No se exige observar todas las métricas diariamente.

## 31. `WEEKLY_GROWTH_REVIEW_CURRENT`

Puede resumir:

```text
WHAT_HAPPENED
WHAT_CHANGED
WHAT_WORKED
WHAT_DID_NOT_WORK
WHAT_IS_INCONCLUSIVE
WHAT_TO_KEEP
WHAT_TO_STOP
WHAT_TO_TEST_NEXT
RISKS
CANON_IMPACT
```

## 32. Regla anti-reacción

> **Una semana mala no debe provocar una nueva identidad; una semana buena no debe canonizar una táctica.**

F12 debe distinguir variabilidad de aprendizaje repetible.

## 33. Política de experimentación

Se propone:

```text
GROWTH_EXPERIMENTATION_POLICY_CANON
```

Debe gobernar:

- hipótesis explícita;
- variable cambiada;
- baseline;
- audiencia/período comparable;
- métricas primarias;
- métricas de guardrail;
- duración mínima razonable;
- criterio de parada;
- interpretación;
- registro de incertidumbre;
- impacto potencial sobre canon.

## 34. Un experimento cambia pocas variables

Regla:

> **Cambiar pocas variables por experimento facilita atribuir el aprendizaje.**

No siempre es posible aislar una variable perfecta, pero AIIF debe declarar cuando existe confusión.

## 35. Estructura de experimento

```json
{
  "experiment_id": "[ID]",
  "hypothesis": "[HIPOTESIS]",
  "objective": "[OBJETIVO]",
  "variable_changed": ["[VARIABLE]"],
  "baseline": "[BASELINE_REF]",
  "primary_metrics": [],
  "guardrail_metrics": [],
  "start": "[DATE]",
  "planned_end": "[DATE]",
  "scope": "[PLATFORM/FORMAT/SEGMENT]",
  "status": "PLANNED",
  "canon_refs": [],
  "constraints": []
}
```

## 36. Backlog de experimentos

Se propone:

```text
GROWTH_EXPERIMENT_BACKLOG
```

Puede contener hipótesis candidatas ordenadas por prioridad.

## 37. Priorización

La prioridad puede considerar:

- impacto potencial;
- confianza;
- esfuerzo;
- coste;
- tiempo de aprendizaje;
- riesgo de canon;
- dependencia;
- facilidad de medición.

No se impone una fórmula universal.

## 38. Variables que F12 puede experimentar

F09 ya permite que F12 experimente con:

- frecuencia;
- hooks;
- formatos;
- horarios;
- duración;
- distribución;
- plataforma;
- variantes de CTA.

F12 también puede probar, cuando corresponda:

- orden de series;
- proporción de pilares dentro de límites;
- cross-posting;
- intensidad de interacción comunitaria;
- apertura del caption;
- portada;
- primera escena;
- tipo de colaboración;
- canal de adquisición comercial;
- variables operativas de F11.

## 39. Variables protegidas

F12 no debe experimentar libremente con:

- edad canónica;
- rostro/cuerpo canónicos;
- valores de marca bloqueados;
- personalidad central;
- hechos biográficos;
- voz canónica;
- posicionamiento canónico;
- identidad visual bloqueada;
- otros datos críticos.

Si una hipótesis requiere cambiar estos elementos, debe abrir propuesta de revisión, no ejecutarse como test ordinario.

## 40. Métricas de guardrail

Un experimento puede mejorar una métrica y empeorar otra crítica.

Ejemplo:

```text
PRIMARY
views

GUARDRAIL
follow quality
brand consistency
commercial trust
```

AIIF no debe declarar ganador un experimento que rompa guardrails críticos.

## 41. Resultados de experimento

Se proponen estados interpretativos:

```text
INCONCLUSIVE
NEGATIVE_SIGNAL
POSITIVE_SIGNAL
MIXED_SIGNAL
REQUIRES_REPLICATION
REPLICATED_LEARNING
OPERATIONALLY_ADOPTED
REJECTED
ESCALATE_TO_CANON_REVIEW
```

Estos son estados locales del experimento/aprendizaje, no estados globales del proyecto.

## 42. No fingir significancia

F12 no debe utilizar lenguaje como:

```text
"estadisticamente significativo"
```

salvo que existan datos y método suficientes para sostenerlo.

Cuando no existan, usar lenguaje como:

```text
señal inicial
resultado inconcluso
patrón observado
requiere replicación
```

## 43. Muestras pequeñas

Con pocos posts, pocos leads o poco tráfico:

- reducir certeza;
- evitar conclusiones definitivas;
- acumular evidencia;
- priorizar aprendizaje cualitativo y direccional;
- replicar cuando sea viable.

## 44. Escalera de evidencia

Se propone:

```text
OBSERVATION
      ↓
SIGNAL
      ↓
REPEATED_SIGNAL
      ↓
OPERATIONAL_LEARNING
      ↓
REPLICATED_LEARNING
      ↓
CANON_REVIEW_CANDIDATE
```

No todos los aprendizajes necesitan llegar al último nivel.

## 45. `GROWTH_EXPERIMENT_LOG`

Debe conservar, cuando corresponda:

- experimento;
- hipótesis;
- baseline;
- cambio;
- métricas;
- resultado;
- contexto;
- incertidumbre;
- conclusión;
- decisión;
- repetición;
- impacto sobre canon.

## 46. `GROWTH_LEARNING_LOG`

Registra aprendizajes reutilizables, no solo resultados crudos.

Ejemplo de estructura:

```text
LEARNING
EVIDENCE
SCOPE
CONFIDENCE
VALID_UNTIL / REVIEW_DATE
APPLIES_TO
DOES_NOT_APPLY_TO
NEXT_TEST
CANON_IMPACT
```

## 47. Aprendizaje no es canon

Se adopta:

```text
EXPERIMENT_RESULT
!=
OPERATIONAL_LEARNING
!=
CANON_CHANGE
```

Un resultado puede convertirse en aprendizaje operativo sin cambiar ninguna fase canónica.

## 48. Reglas de decisión

Se propone:

```text
GROWTH_DECISION_RULES_CANON
```

Debe gobernar cuándo:

- repetir;
- escalar;
- adoptar operacionalmente;
- pausar;
- descartar;
- pedir más datos;
- cambiar roadmap;
- abrir revisión controlada de F09/F11 u otra fase.

## 49. Decisiones operativas de bajo impacto

Normalmente pueden aplicarse sin reabrir canon:

- ajustar horario;
- cambiar frecuencia dentro de límites;
- cambiar duración;
- variar hook;
- pausar una serie;
- activar otra serie compatible;
- ajustar CTA;
- redistribuir cross-post;
- cambiar un canal de adquisición;
- modificar un playbook comercial.

## 50. Cambios que pueden requerir revisión

Puede requerirse revisión si la evidencia sugiere:

- redefinir un pilar canónico;
- cambiar posicionamiento;
- cambiar audiencia estratégica;
- modificar identidad verbal;
- modificar identidad visual;
- cambiar ruta primaria de monetización;
- alterar guardrails;
- cambiar concepto;
- modificar hechos narrativos.

F12 propone; no cambia silenciosamente.

## 51. `VALIDADOR_DE_ESTRATEGIA_DE_CRECIMIENTO`

Se propone incorporar:

```text
VALIDADOR_DE_ESTRATEGIA_DE_CRECIMIENTO
```

Debe comprobar:

- vínculo entre objetivos y métricas;
- roadmap 30/60/90/180/365;
- factibilidad con recursos;
- coherencia con F09/F11;
- baseline suficiente o claramente ausente;
- revisión periódica;
- protección del canon;
- capacidad de aprendizaje.

## 52. `VALIDADOR_DE_EXPERIMENTO_DE_CRECIMIENTO`

Se propone:

```text
VALIDADOR_DE_EXPERIMENTO_DE_CRECIMIENTO
```

Debe comprobar:

- hipótesis explícita;
- variable identificable;
- métrica primaria;
- guardrails;
- baseline/contexto;
- duración/alcance razonables;
- datos comparables cuando sea posible;
- riesgos;
- ausencia de cambio canónico no autorizado.

## 53. `VALIDADOR_DE_EVIDENCIA_DE_CRECIMIENTO`

Se propone:

```text
VALIDADOR_DE_EVIDENCIA_DE_CRECIMIENTO
```

Puede emitir:

```text
EVIDENCIA_INSUFICIENTE
SEÑAL_DEBIL
SEÑAL_MODERADA
SEÑAL_REPETIDA
APRENDIZAJE_OPERATIVO
CANDIDATO_A_REVISION_CANONICA
```

No debe presentar estos niveles como pruebas estadísticas universales.

## 54. Relación F09 / F12

Regla:

> **F09 define la arquitectura editorial; F12 experimenta sobre variables operativas y propone revisiones solo cuando la evidencia acumulada lo justifica.**

F12 puede experimentar con frecuencia, hooks, formatos, horarios, duración, distribución, plataforma y CTA, pero un experimento exitoso no cambia automáticamente F09.

## 55. Relación F10 / F12

F10 aporta:

- capacidad real de producción;
- tiempos;
- fallos;
- outputs;
- variantes;
- coste cuando se registra.

F12 puede analizar si una táctica de growth es sostenible operacionalmente.

No debe recomendar un sistema imposible de producir de forma consistente.

## 56. Relación F11 / F12

Regla:

> **F11 define qué monetizar, cómo y en qué secuencia; F12 aprende cómo crecer, distribuir, adquirir y optimizar esa estrategia con datos.**

F12 puede usar:

- leads;
- respuestas;
- oportunidades;
- propuestas;
- cierres;
- recompra;
- ingresos por ruta;
- conversión.

Una caída o mejora aislada no cambia F11 automáticamente.

## 57. Relación F12 / F13

F12 entrega a F13:

- roadmap vigente;
- baseline;
- KPI;
- experimentos;
- aprendizajes;
- tácticas adoptadas;
- revisiones propuestas;
- riesgos;
- snapshots;
- estado de crecimiento.

F13 consolida, pero no debe confundir tácticas actuales con identidad permanente.

## 58. Distribución

Se propone:

```text
DISTRIBUTION_PLAN_CURRENT
```

Puede contener:

- plataformas;
- función de cada plataforma;
- formato prioritario;
- cross-posting;
- frecuencia;
- reutilización;
- discovery loops;
- comunidad;
- colaboración;
- tráfico hacia activos propios;
- objetivos.

Es dinámico.

## 59. `PLATFORM_GROWTH_PROFILE`

Puede registrar por plataforma:

- objetivos;
- formatos probados;
- hooks;
- frecuencia vigente;
- métricas disponibles;
- ventanas;
- experimentos activos;
- restricciones;
- señales aprendidas;
- próxima revisión.

No debe congelar reglas cambiantes de plataforma.

## 60. Dependencia de plataforma

F12 debe detectar concentración excesiva en una sola plataforma.

Pero diversificar no significa publicar en todas partes desde el día uno.

La diversificación debe seguir capacidad y evidencia.

## 61. Crecimiento orgánico y crecimiento pagado

F12 puede distinguir:

```text
ORGANIC
PAID
PARTNERSHIP
REFERRAL
OWNED_AUDIENCE
```

No todas las vías aplican a todos los proyectos.

Si se utiliza paid growth, presupuesto y ROI deben basarse en datos y supuestos explícitos.

## 62. Colaboraciones para crecimiento

Las colaboraciones deben pasar guardrails de F05/F11.

F12 puede evaluar:

- audiencia complementaria;
- alcance;
- calidad de asociación;
- contenido conjunto;
- conversión;
- repetibilidad.

No recomendar colaboraciones incompatibles solo por alcance.

## 63. Series y crecimiento

F12 puede evaluar `CONTENT_SERIES_LIBRARY` para decidir:

```text
KEEP
SCALE
REFINE
PAUSE
RETIRE
RETEST
```

Esto es una decisión operativa sobre una serie, no necesariamente sobre un pilar.

## 64. Calidad de audiencia

F12 debe evitar optimizar solo crecimiento bruto.

Señales de calidad pueden incluir, según proyecto:

- retención;
- saves/shares;
- comentarios relevantes;
- repetición de interacción;
- visitas de perfil;
- conversiones;
- leads cualificados;
- compatibilidad geográfica;
- afinidad con nicho;
- otras.

## 65. Crecimiento y privacidad narrativa

F12 no puede usar métricas para justificar revelar elementos privados bloqueados en F08.

La privacidad y continuidad prevalecen sobre una oportunidad táctica.

## 66. Crecimiento y consistencia visual

Un formato que mejora alcance pero genera `IDENTITY_DRIFT` recurrente debe revaluarse.

F12 no puede sacrificar F06 para maximizar views.

## 67. Crecimiento y voz

Un hook que eleva clicks pero contradice `VERBAL_IDENTITY_CANON` o guardrails de marca no debe adoptarse como estándar.

## 68. Crecimiento y monetización

Una táctica que aumenta audiencia pero reduce calidad comercial puede ser negativa para el objetivo global.

F12 debe observar objetivos jerárquicos, no una métrica aislada.

## 69. `GROWTH_ASSUMPTIONS_CURRENT`

Se adopta para registrar supuestos como:

- frecuencia sostenible;
- capacidad de publicación;
- audiencia disponible;
- conversión esperada;
- impacto esperado;
- coste;
- tiempo de aprendizaje;
- disponibilidad de plataforma.

Los supuestos deben poder actualizarse.

## 70. `GROWTH_RECOMMENDATIONS_CURRENT`

Puede resumir las recomendaciones vigentes:

```text
KEEP
START
STOP
TEST
SCALE
WAIT
REVIEW_CANON
```

Debe enlazar cada recomendación con evidencia.

## 71. `PERFORMANCE_SNAPSHOT_LOG`

Permite conservar snapshots comparables en checkpoints.

Puede registrar:

- fecha;
- período;
- audiencia;
- volumen de contenido;
- KPI;
- métricas;
- monetización relevante;
- experimentos activos;
- contexto.

## 72. Comparación antes/después

AIIF debe evitar comparar períodos con condiciones radicalmente distintas sin advertencia.

Posibles confusores:

- diferente número de publicaciones;
- campaña pagada;
- viral externo;
- colaboración grande;
- cambio de mercado;
- cambio de plataforma;
- cambio de oferta;
- estacionalidad.

## 73. Atribución imperfecta

En redes sociales la atribución suele ser incompleta.

F12 debe declarar:

```text
KNOWN
INFERRED
UNKNOWN
```

cuando no pueda asignar causalidad con confianza.

## 74. No perseguir cada tendencia

Una tendencia puede probarse si:

- encaja con identidad;
- es producible;
- tiene objetivo;
- no rompe narrativa;
- no desplaza todo el sistema.

Trend fit prevalece sobre trend chasing.

## 75. Benchmarking

F12 puede usar benchmarks externos cuando existan y estén suficientemente actualizados.

Pero:

```text
BENCHMARK
!=
TARGET OBLIGATORIO
```

El desempeño debe interpretarse con contexto propio.

## 76. Investigación externa

Cuando la plataforma permita investigación, F12 puede consultar:

- formatos emergentes;
- cambios de plataforma;
- prácticas de distribución;
- benchmarks;
- tendencias;
- casos comparables.

La investigación externa no sustituye datos propios ni canon.

## 77. Compatibilidad de plataforma

F12 debe funcionar en Modo Básico Universal.

Si la IA no tiene acceso a analytics:

1. define el marco;
2. entrega plantilla de métricas;
3. usuario exporta/copia datos;
4. AIIF analiza;
5. actualiza snapshots y aprendizajes.

No requiere integración API para funcionar.

## 78. Datos faltantes

Si falta una métrica:

- no inventarla;
- usar proxy solo si se declara;
- marcar `DATA_MISSING`;
- explicar impacto;
- continuar con lo disponible cuando sea suficiente.

## 79. Datos inconsistentes

Si dos fuentes difieren:

- registrar origen;
- preferir fuente definida como oficial del proyecto;
- no promediar silenciosamente;
- marcar discrepancia;
- evitar conclusión hasta resolver si es material.

## 80. Profundidad de trabajo

Se reutilizan:

### NUCLEO

- objetivo;
- roadmap;
- 3-5 KPI;
- baseline;
- 1-3 experimentos prioritarios;
- revisión semanal básica.

### AMPLIADO - predeterminado

- marco completo de KPI;
- perfiles por plataforma;
- backlog;
- guardrails;
- learning log;
- snapshots;
- experimentación estructurada;
- validadores.

### PROFUNDO

- múltiples segmentos/plataformas;
- cohortes cuando existan datos;
- análisis de funnel;
- experimentos concurrentes controlados;
- escenarios de distribución;
- revisión de eficiencia comercial.

## 81. Etapas internas

Se propone `GR00-GR22`:

```text
GR00 - Detectar ruta de entrada
GR01 - Cargar canon F01-F11
GR02 - Definir objetivo de crecimiento
GR03 - Construir baseline
GR04 - Definir marco de medicion
GR05 - Seleccionar KPI
GR06 - Construir roadmap 30/60/90/180/365
GR07 - Definir perfiles de plataforma
GR08 - Construir plan de distribucion
GR09 - Generar backlog de hipotesis
GR10 - Priorizar experimentos
GR11 - Diseñar experimento
GR12 - Validar experimento
GR13 - Ejecutar / registrar periodo
GR14 - Recoger resultados
GR15 - Interpretar evidencia
GR16 - Registrar aprendizaje
GR17 - Decidir keep/stop/scale/retest
GR18 - Actualizar roadmap operativo
GR19 - Evaluar impacto sobre F09/F11 y canon
GR20 - Ejecutar revision 30/60/90/180/365
GR21 - Consolidar Plan de Crecimiento
GR22 - Preparar puente a F13
```

Son etapas internas.

## 82. Estados locales de experimento

Pueden existir:

```text
IDEA
PLANNED
READY
RUNNING
PAUSED
COMPLETED
INCONCLUSIVE
REPLICATE
ADOPTED
REJECTED
ARCHIVED
```

No crean nuevos estados globales del proyecto.

## 83. Aprobación

F12 puede requerir aprobación explícita para:

- marco general de crecimiento;
- política de experimentación;
- reglas de decisión;
- cambio que afecte presupuesto/materialmente recursos;
- experimento que toque un límite estratégico;
- propuesta de revisión canónica.

No necesita aprobación formal de cada microajuste operativo si está dentro de reglas ya aprobadas.

## 84. Bloqueo propuesto

Después de aprobación suficiente:

```text
GROWTH_SYSTEM_CANON = [SISTEMA]
GROWTH_MEASUREMENT_FRAMEWORK_CANON = [MARCO]
GROWTH_EXPERIMENTATION_POLICY_CANON = [POLITICA]
GROWTH_DECISION_RULES_CANON = [REGLAS]
ESTADO_DATO = BLOQUEADO
```

Los objetos actuales/dinámicos permanecen versionables.

## 85. Revalidación de fases anteriores

F12 no modifica canon automáticamente.

Flujo:

```text
EVIDENCIA ACUMULADA
      ↓
PROPUESTA DE REVISION
      ↓
ANALISIS DE IMPACTO
      ↓
FASE PROPIETARIA
      ↓
VALIDACION
      ↓
APROBACION
      ↓
NUEVA VERSION
```

## 86. Riesgo de sobreoptimización

F12 debe detectar cuando el sistema empieza a optimizar para una métrica local a costa de:

- marca;
- audiencia correcta;
- monetización;
- sostenibilidad;
- producción;
- narrativa;
- privacidad;
- confianza.

## 87. Riesgo de fatiga experimental

No convertir cada publicación en un test distinto.

Debe existir suficiente contenido estable para:

- mantener identidad;
- sostener audiencia;
- construir memoria de marca;
- comparar resultados.

## 88. Registro de cambios

Cuando F12 aplique un cambio operativo relevante debe poder registrar:

- cambio;
- motivo;
- evidencia;
- fecha;
- alcance;
- objetos afectados;
- revisión prevista.

## 89. Historial

Debe preservarse historial relevante de:

- roadmaps;
- baselines;
- KPI;
- experimentos;
- aprendizajes;
- decisiones;
- cambios operativos;
- propuestas de revisión;
- snapshots.

## 90. Portabilidad

F12 debe incluirse cuando corresponda en:

- Paquete Portable;
- Paquete Portable Ligero;
- Archivo Universal de Reanudación.

Contenido portable recomendado:

```text
GROWTH_SYSTEM_CANON
GROWTH_MEASUREMENT_FRAMEWORK_CANON
GROWTH_EXPERIMENTATION_POLICY_CANON
GROWTH_DECISION_RULES_CANON
GROWTH_ROADMAP_CURRENT
BASELINE_SNAPSHOT_CURRENT
KPI_DASHBOARD_CURRENT
PLATFORM_GROWTH_PROFILE
DISTRIBUTION_PLAN_CURRENT
GROWTH_EXPERIMENT_BACKLOG
GROWTH_EXPERIMENT_LOG
GROWTH_LEARNING_LOG
GROWTH_RECOMMENDATIONS_CURRENT
PERFORMANCE_SNAPSHOT_LOG
pendientes
proxima accion
```

## 91. Archivos técnicos complementarios

El sistema puede complementar el entregable con:

```text
growth-system.json
growth-roadmap.json
kpi-dashboard.json
growth-experiments.json
growth-learning-log.json
performance-snapshots.json
distribution-plan.json
```

## 92. Algoritmo operativo

```text
INPUT: canon F01-F11 + objetivos + datos disponibles

1. recuperar objetivo y contexto
2. comprobar disponibilidad de datos
3. construir baseline o declarar ausencia
4. definir marco de medicion
5. elegir pocos KPI prioritarios
6. construir roadmap 30/60/90/180/365
7. identificar hipotesis
8. priorizar pruebas
9. validar que experimento no rompa canon
10. ejecutar / registrar periodo
11. comparar contra baseline/contexto
12. clasificar evidencia
13. registrar aprendizaje
14. decidir mantener / detener / escalar / repetir
15. actualizar objetos operativos
16. si evidencia sugiere cambio estructural, abrir propuesta de revision
17. no cambiar canon automaticamente
18. repetir ciclo
19. preparar consolidacion F13
```

## 93. Mapeo fuente experta -> AIIF

| Elemento fuente experta | Tratamiento en F12 |
|---|---|
| Consultor de Growth | Base metodológica para fase de crecimiento |
| Seguidores a 90 días | Objetivo recuperable, no único KPI posible |
| Plan 30 días | Primer horizonte del roadmap |
| Plan 60 días | Segundo horizonte |
| Plan 90 días | Checkpoint del objetivo inicial |
| Plan 180 días | Escalado y revisión semestral |
| Plan 1 año | Consolidación de sistema sostenible |
| Comunidad | Métricas de calidad y recurrencia |
| Monetización | F11 define estrategia; F12 optimiza adquisición/conversión |
| Reglas de consistencia | Guardrails + protección del canon |
| KPI / métricas semanales | Arquitectura AIIF de medición y review |
| Experimentos | Política y logs de experimentación AIIF |
| Reoptimización | Decisiones operativas basadas en evidencia |

## 94. Entregable oficial

El entregable oficial de F12 es:

# Plan de Crecimiento

Debe contener como mínimo:

1. resumen de crecimiento;
2. objetivo principal y secundarios;
3. baseline o estado `SIN_BASELINE`;
4. marco de medición;
5. KPI prioritarios;
6. roadmap 30 días;
7. roadmap 60 días;
8. roadmap 90 días;
9. roadmap 180 días;
10. roadmap 1 año;
11. perfiles de plataforma;
12. distribución;
13. backlog de experimentos;
14. experimentos prioritarios;
15. métricas de guardrail;
16. cadencia de revisión;
17. reglas de interpretación;
18. learning log inicial;
19. reglas de adopción/revisión;
20. riesgos y supuestos;
21. versión, validación y estado.

## 95. UX simplificada

La experiencia visible recomendada:

```text
OBJETIVO
-> LINEA BASE
-> KPI
-> ROADMAP
-> QUE PROBAR
-> RESULTADOS
-> QUE APRENDIMOS
-> QUE CAMBIAR
-> SIGUIENTE CICLO
```

El usuario no necesita interactuar con `GR00-GR22`.

## 96. Principio final propuesto

> **AI Influencer Factory debe poder construir y ejecutar un sistema de crecimiento aunque el usuario no sea analista ni especialista en growth. F12 debe conservar los horizontes expertos de 30, 60, 90, 180 días y 1 año, traducir objetivos en un marco de medición claro, establecer una línea base, seleccionar pocos KPI útiles, diseñar experimentos interpretables, registrar evidencia y convertirla en aprendizaje operativo. Debe proteger el canon frente a reacciones impulsivas: una métrica aislada no reescribe identidad, marca, contenido o monetización. Los aprendizajes repetidos pueden abrir una revisión controlada de la fase propietaria, pero F12 optimiza mediante evidencia; no cambia silenciosamente el canon.**

## 97. Estado de esta especificación

```text
ESTADO_DOCUMENTAL = APROBADA
```

Esta especificación forma parte de la baseline comercial aprobada de AI Influencer Factory (Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17). La auditoría pre-freeze ya había señalado (hallazgo H02) que su estado anterior, `PROPUESTA_LISTA_PARA_APROBACION`, quedó desactualizado: el texto se redactó antes de la aprobación de F12.

Por eso la IA debe tratar los sistemas, identificadores, etapas internas y validadores definidos aquí como reglas vigentes de F12, no como propuestas.

Aprobar la especificación no aprueba datos de ningún proyecto. Cada objeto canónico de un influencer concreto sigue necesitando su propia aprobación explícita del usuario, según las reglas de este documento.

La versión con el estado anterior se conserva en `90_HISTORICO_Y_LEGACY/Versiones_Anteriores/v1.0/12_F12_CRECIMIENTO/AI_INFLUENCER_FACTORY_Especificacion_General_Crecimiento_v1.0.md`, sin precedencia vigente.
