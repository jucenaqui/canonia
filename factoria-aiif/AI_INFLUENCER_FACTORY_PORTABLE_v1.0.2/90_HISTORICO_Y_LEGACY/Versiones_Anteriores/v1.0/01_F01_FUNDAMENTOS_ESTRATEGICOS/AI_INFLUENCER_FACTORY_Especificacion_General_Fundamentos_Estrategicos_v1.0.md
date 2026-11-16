---
document_id: AIIF_ESPECIFICACION_GENERAL_F01_FUNDAMENTOS_ESTRATEGICOS
document_version: "1.0.0"
system_version: AIIF_PORTABLE_v1.0
status: PROPUESTA_INTEGRADA_PARA_APROBACION_DOCUMENTAL
language: ES
owner_phase: F01
---

# AI INFLUENCER FACTORY
## Especificación General F01 — Fundamentos Estratégicos

**Versión:** 1.0.0  
**Entregable oficial:** Documento de Fundamentos Estratégicos  
**Naturaleza:** consolidación documental del canon F01 ya aprobado; no rediseño de la fase.

## 0. Regla de procedencia

F01 se construye sobre dos fuentes:

1. la metodología experta original, que exige partir de nicho, objetivo del negocio, audiencia y objetivos temporales antes de desarrollar identidad, marca, contenido, monetización y crecimiento;
2. la especificación universal de definición/canonización de nicho, adaptada al ciclo de estados, portabilidad, idioma y gobernanza de AIIF.

Las estructuras de `NICHE_CANON`, estados, roles, etapas internas, validadores y portabilidad son adaptaciones arquitectónicas de AIIF.

## 1. Propósito de F01

F01 debe construir un **resumen estratégico mínimo pero suficiente** para orientar todas las fases posteriores sin intentar completarlas prematuramente. Debe responder:

- ¿Qué objetivo económico se quiere activar primero?
- ¿En qué nicho competirá el creador?
- ¿A qué audiencia y mercados se dirige?
- ¿Qué plataformas son relevantes al inicio?
- ¿Qué capacidad de tiempo/recursos existe?
- ¿Qué resultado se busca en 90 días?
- ¿Qué restricciones estratégicas ya existen?

## 2. Qué sí define F01

F01 puede definir y registrar:

- fuente de ingreso inicial / prioridad económica;
- `NICHE_WORKING`;
- diagnóstico del nicho;
- `NICHE_OPERATIONAL`;
- `NICHE_CANON`;
- posicionamiento público del nicho;
- audiencia objetivo;
- mercados;
- plataformas relevantes;
- tiempo disponible;
- objetivo a 90 días;
- restricciones estratégicas;
- supuestos y pendientes;
- dependencias hacia F02–F13.

## 3. Qué no debe cerrar F01

F01 no debe definir de forma definitiva:

- concepto creativo completo → F02;
- nombre canónico → subsistema de nombramiento / F03;
- biografía → F03;
- personalidad/psicología → F04;
- marca → F05;
- identidad visual → F06;
- voz → F07;
- universo narrativo → F08;
- cinco pilares/calendario → F09;
- instrucciones de generación y producción → F10;
- estrategia especializada de monetización → F11;
- sistema de crecimiento/medición → F12;
- Perfil Maestro/Portable → F13.

F01 puede registrar restricciones o señales para esas fases, pero no apropiarse de sus canones.

## 4. Datos base de entrada

Cuando no existan ya en Sistema 00, las cinco preguntas mínimas son:

1. fuente de ingreso que se quiere activar primero;
2. nicho inicial o área de interés;
3. audiencia objetivo;
4. tiempo disponible;
5. objetivo a 90 días.

Plataformas, mercados y restricciones se recuperan del contexto o se preguntan únicamente si cambian materialmente el resultado.

## 5. Tres rutas de entrada

### Ruta A — Fundamentos ya definidos

El usuario ya conoce negocio, nicho y audiencia. AIIF valida, estructura y pregunta solo por faltantes críticos.

### Ruta B — Información parcial

AIIF conserva lo ya definido, diagnostica huecos y propone únicamente decisiones faltantes.

### Ruta C — El usuario no sabe

AIIF activa Inicio Fácil, utiliza el contexto existente y presenta pocas direcciones comparables antes de recomendar.

## 6. Inicio Fácil aplicado a F01

> No necesitas conocer estrategia de nicho. Puedo usar tu objetivo, audiencia, tiempo y preferencias para proponerte unas pocas direcciones, comparar sus ventajas y riesgos, y recomendar la más coherente antes de pedirte aprobación.

Activadores naturales: “No sé”, “Dame opciones”, “Recomiéndame”, “Decide tú”, “Haz lo mejor”.

## 7. Arquitectura de nicho

La metodología de nicho puede utilizar:

```text
NICHE_CORE
    ×
DIFFERENTIATION_LENS
    ×
AESTHETIC_OR_EDITORIAL_LENS
```

para transformar una etiqueta amplia en una definición interna más útil para estrategia, contenido y monetización.

## 8. Capas del nicho normalizadas

```text
NICHE_WORKING
= entrada inicial/provisional

NICHE_OPERATIONAL
= formulación interna útil para estrategia, contenido, monetización y diferenciación

NICHE_PUBLIC_POSITIONING
= expresión pública simplificada del nicho

NICHE_CANON
= nicho oficial aprobado y bloqueado
```

### 8.1 Compatibilidad con alias heredados

`PUBLIC_POSITIONING` permanece como alias histórico/contextual de `NICHE_PUBLIC_POSITIONING`. No equivale a `BRAND_POSITIONING_CANON`.

## 9. Posicionamiento público del nicho y posicionamiento de marca

```text
NICHE_PUBLIC_POSITIONING
!=
BRAND_POSITIONING_CANON
```

El primero simplifica **qué territorio/nicho ocupa** el creador para comunicación externa. El segundo, propiedad de F05, define el posicionamiento estratégico completo de la marca.

## 10. Etapas internas `NI00–NI14`

La arquitectura aprobada ya reserva el rango `NI00–NI14`. Como parte de la normalización pre-freeze se propone esta rotulación estable:

| ID | Etapa normalizada |
|---|---|
| NI00 | Detectar ruta de entrada |
| NI01 | Recuperar o crear resumen estratégico |
| NI02 | Registrar `NICHE_WORKING` |
| NI03 | Diagnosticar nicho provisional |
| NI04 | Contrastar con modelo de negocio |
| NI05 | Contrastar con audiencia, mercados y plataformas |
| NI06 | Construir territorios / arquitectura de nicho |
| NI07 | Crear o refinar candidatos |
| NI08 | Simular variantes sin alterar canon |
| NI09 | Separar `NICHE_OPERATIONAL` y `NICHE_PUBLIC_POSITIONING` |
| NI10 | Validar idioma, localización y escalabilidad |
| NI11 | Ejecutar coherencia y dependencias |
| NI12 | Comparar y emitir recomendación experta |
| NI13 | Aprobación humana explícita |
| NI14 | Bloquear `NICHE_CANON`, propagar dependencias y crear punto de control |

**Nota de procedencia:** el rango `NI00–NI14` ya pertenece al canon aprobado; la rotulación exacta de estas quince etapas es una normalización AIIF de implementación y requiere aprobación en esta etapa.

## 11. Estados y roles

F01 no crea estados globales nuevos. Utiliza:

```text
NO_DEFINIDO → PROPUESTO → BORRADOR → VALIDADO → APROBADO → BLOQUEADO
```

y `ROL_NICHO`, por ejemplo:

```text
TRABAJO
CANDIDATO
SIMULADO
RECOMENDADO
CANONICO
RETIRADO
RECHAZADO
```

## 12. Mapeo de estados de la especificación fuente

| Fuente universal | AIIF `ESTADO_DATO` | `ROL_NICHO` |
|---|---|---|
| WORKING | PROPUESTO / BORRADOR | TRABAJO |
| CANDIDATE | BORRADOR | CANDIDATO |
| SIMULATED | BORRADOR / VALIDADO | SIMULADO |
| RECOMMENDED | VALIDADO | RECOMENDADO |
| APPROVED | APROBADO | mantener rol vigente hasta bloqueo |
| CANONICAL | APROBADO | CANONICO |
| LOCKED | BLOQUEADO | CANONICO |
| RETIRED | último estado válido + histórico | RETIRADO |
| REJECTED | trazabilidad histórica | RECHAZADO |

Los términos fuente no se incorporan como ciclo de estados global paralelo.

## 13. Validador de Nicho Canónico

Identificador:

```text
VALIDADOR_DE_NICHO_CANONICO
```

Debe comprobar, como mínimo:

- claridad del nicho;
- ajuste a modelo de negocio;
- ajuste a audiencia;
- compatibilidad con mercados/plataformas;
- capacidad de contenido;
- diferenciación;
- escalabilidad;
- coherencia con tiempo y objetivo a 90 días;
- separación entre nicho operativo y expresión pública;
- procedencia de datos;
- aprobación suficiente antes del bloqueo.

Puede utilizar los resultados generales: `VALIDA`, `VALIDA_CON_OBSERVACIONES`, `REQUIERE_AJUSTES`, `REQUIERE_DECISION_USUARIO`, `NO_APTA_PARA_BLOQUEO`.

## 14. Investigación y verificación externa

F01 puede construirse sin navegación. Cuando la decisión dependa de saturación, tendencias, terminología actual, plataformas, mercado o riesgos de actualidad, AIIF puede investigar externamente cuando la plataforma lo permita.

La verificación externa debe distinguir `VERIFICADO`, `PARCIALMENTE_VERIFICADO`, `NO_VERIFICADO` y `NO_DISPONIBLE` cuando corresponda. Una señal externa informa; no sustituye la coherencia estratégica ni la aprobación humana.

## 15. Aprobación y bloqueo

Una recomendación no cambia canon. Solo después de aprobación válida:

```text
ESTADO_DATO = BLOQUEADO
ROL_NICHO = CANONICO
NICHE_CANON = [NICHO_APROBADO]
```

El sistema conserva variantes relevantes como histórico.

## 16. Objetos y datos de F01

### 16.1 Objetos estables / canónicos

- `NICHE_CANON`;
- `NICHE_OPERATIONAL`;
- `NICHE_PUBLIC_POSITIONING` (ID normalizado propuesto; alias heredado `PUBLIC_POSITIONING`).

### 16.2 Datos estratégicos en Matriz Maestra

F01 también registra, sin crear un `STRATEGIC_FOUNDATIONS_CANON` redundante:

- fuente de ingreso inicial;
- audiencia;
- mercados;
- plataformas;
- tiempo disponible;
- objetivo a 90 días;
- restricciones;
- supuestos;
- pendientes.

Estos datos conservan `ESTADO`, `ORIGEN`, `IMPORTANCIA`, `ESTABILIDAD`, `CONFIANZA`, dependencias y versionado de Sistema 00.

## 17. Dependencias hacia adelante

F01 alimenta como mínimo:

- F02: concepto;
- F03: nombre, biografía e identidad;
- F04: personaje y psicología;
- F05: marca;
- F06: identidad visual;
- F07: idioma/voz;
- F08: universo narrativo;
- F09: contenido;
- F10: factibilidad/productividad;
- F11: monetización especializada;
- F12: objetivo/línea base de crecimiento;
- F13: consolidación.

Una contradicción posterior no modifica `NICHE_CANON` automáticamente; abre revalidación o revisión según impacto.

## 18. Gobernanza de cambios

Cambiar un nicho bloqueado requiere:

```text
INSTRUCCIÓN EXPLÍCITA
→ PUNTO DE CONTROL
→ SIMULACIÓN / PROPUESTA
→ ANÁLISIS DE IMPACTO
→ REVALIDACIÓN DE DEPENDENCIAS
→ APROBACIÓN
→ NUEVA CANON_VERSION
→ REVALIDACIÓN / REGENERACIÓN DE DERIVADOS
```

No borrar las fases posteriores; marcarlas para revisión si se ven afectadas.

## 19. Portabilidad de F01

Un paquete portable debe incluir, según nivel de detalle:

- estado de F01;
- fuente de ingreso inicial;
- `NICHE_CANON`;
- `NICHE_OPERATIONAL`;
- `NICHE_PUBLIC_POSITIONING`;
- audiencia/mercados;
- plataformas relevantes;
- tiempo disponible;
- objetivo a 90 días;
- restricciones;
- validaciones;
- pendientes;
- historial relevante;
- último punto de control;
- próxima acción.

Debe ser suficiente para que otra IA continúe F02+ sin volver a investigar desde cero los fundamentos ya aprobados.

## 20. Entregable oficial

# Documento de Fundamentos Estratégicos

Debe incluir como mínimo:

1. resumen estratégico;
2. modelo/fuente de ingreso inicial;
3. nicho canónico y operativo;
4. posicionamiento público del nicho;
5. audiencia;
6. mercados;
7. plataformas;
8. tiempo/capacidad;
9. objetivo a 90 días;
10. restricciones;
11. supuestos y pendientes;
12. validación;
13. versión, aprobación e historial relevante.

## 21. Algoritmo operativo resumido

```pseudo
INPUT project_context
load_system00()
recover_existing_strategic_data()
route = detect_F01_entry_route()
if missing_core_data:
    apply_USAR_DEDUCIR_PROPONER_PREGUNTAR()
build_or_recover_strategic_summary()
register_NICHE_WORKING_if_needed()
diagnose_niche()
validate_business_audience_platform_time_goal()
build_niche_architecture_and_candidates_if_needed()
simulate_without_applying()
derive_NICHE_OPERATIONAL()
derive_NICHE_PUBLIC_POSITIONING_if_useful()
run_VALIDADOR_DE_NICHO_CANONICO()
present_recommendation()
WAIT_FOR_EXPLICIT_USER_APPROVAL()
if approved_and_valid:
    lock_NICHE_CANON()
    sync_system00()
    mark_downstream_dependencies()
    create_checkpoint()
    prepare_F01_deliverable()
else:
    preserve_current_state()
```

## 22. Principio final

> **AI Influencer Factory debe poder construir Fundamentos Estratégicos suficientes aunque el usuario no sea estratega. F01 debe transformar objetivo de negocio, nicho inicial, audiencia, mercados, plataformas, capacidad y meta de 90 días en una base coherente y trazable; refinar el nicho mediante diagnóstico, comparación y aprobación humana; separar el nicho interno de su expresión pública; y entregar contexto suficiente para que F02–F13 puedan desarrollarse sin volver a preguntar lo ya resuelto. F01 orienta el sistema, pero no debe anticipar ni apropiarse de los canones especializados de las fases posteriores.**

## 23. Estado de esta especificación

```text
ESTADO = PROPUESTA_INTEGRADA_PARA_APROBACION_DOCUMENTAL
```

El contenido sustantivo de F01 ya deriva del canon aprobado. Requieren aprobación en esta etapa la normalización del ID `NICHE_PUBLIC_POSITIONING`, la rotulación exacta de `NI00–NI14` y el mapeo técnico de compatibilidad con estados heredados.
