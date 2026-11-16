---
document_id: AIIF_PILOT_TEST_PROTOCOL
document_version: "1.0.0"
system_version: AIIF_PORTABLE_v1.0
status: PROPUESTA_LISTA_PARA_APROBACION
language: ES
date: 2026-08-17
---

# AI INFLUENCER FACTORY
## Protocolo Formal de Prueba del Influencer Piloto — v1.0

**Estado:** `PROPUESTA_LISTA_PARA_APROBACION`  
**Propósito:** comprobar que AI Influencer Factory funciona de extremo a extremo antes del freeze comercial de Portable v1.0.

> Este protocolo **no modifica F01–F13 ni el canon del sistema**. Define cómo probar la implementación aprobada y cómo decidir si un hallazgo es documental, operativo, de portabilidad, de validación o arquitectónico.

## 1. Principio de prueba

```text
ARQUITECTURA APROBADA
        ↓
IMPLEMENTACIÓN PRE-PILOTO
        ↓
INFLUENCER PILOTO REAL
        ↓
EVIDENCIA
        ↓
INCIDENCIAS / APRENDIZAJES
        ↓
CORRECCIONES CONTROLADAS
        ↓
REGRESIÓN
        ↓
CANDIDATO A FREEZE COMERCIAL
```

**Regla:** completar F01–F13 no equivale por sí mismo a demostrar que el producto funciona.

## 2. Alcance obligatorio

El piloto debe probar cinco suites:

1. `SUITE_A_PHASE_CONTRACTS` — contratos F01–F13.
2. `SUITE_B_SYSTEM00_CONTINUITY` — estado, persistencia, aprobación, cambios y puntos de control.
3. `SUITE_C_PORTABILITY_RESUME` — los cuatro formatos portables y reanudación en contexto limpio.
4. `SUITE_D_EXTERNAL_PRODUCTION_RETURN` — F09 → F10 → producción externa → retorno → validación.
5. `SUITE_E_REGRESSION` — repetición de pruebas críticas después de corregir fallos.

## 3. Estados de resultado

| Resultado | Uso |
|---|---|
| `PASS` | Cumple el criterio y existe evidencia suficiente. |
| `PASS_WITH_OBSERVATIONS` | Cumple el objetivo principal, pero existe una observación no bloqueante registrada. |
| `FAIL` | El criterio no se cumple o el comportamiento contradice el contrato esperado. |
| `BLOCKED` | No puede ejecutarse todavía por una dependencia externa o precondición faltante; no equivale a PASS. |

### 3.1 Regla para freeze

`PASS_WITH_OBSERVATIONS` solo puede convivir con un candidato a freeze si todas las observaciones abiertas son `INFORMATIVO` o `MENOR`. Un `MODERADO`, `CRITICO` o `BLOQUEANTE` abierto impide el freeze.

## 4. Severidad de incidencias

Se reutiliza la escala canónica:

```text
INFORMATIVO
MENOR
MODERADO
CRITICO
BLOQUEANTE
```

## 5. Tipo de incidencia

Cada incidencia debe clasificarse por causa primaria:

- `DOCUMENTAL` — archivo, etiqueta, explicación o estado documental incorrecto.
- `IMPLEMENTACION` — plantilla, serialización, prompt de sistema o lógica ejecutable no refleja el canon.
- `ESTADO_DATOS` — pérdida, duplicación, procedencia, versión o lifecycle incorrectos.
- `UX_FLUJO` — preguntas repetidas, sobreayuda, falta de siguiente acción o fricción innecesaria.
- `VALIDACION` — validador no detecta un conflicto o genera un falso bloqueo relevante.
- `PORTABILIDAD` — contexto insuficiente, referencias ambiguas, migración o reanudación defectuosa.
- `PRODUCCION` — paquete, resultado, retorno, diagnóstico o regeneración de F10 defectuosos.
- `ARQUITECTONICA` — la causa real está en fronteras, propiedad o reglas F01–F13 y podría requerir revisión canónica.

**Regla:** no clasificar como `ARQUITECTONICA` un defecto que puede corregirse en documento, plantilla o implementación sin cambiar la intención aprobada.

## 6. Identificadores de prueba

```text
PILOT_RUN_ID   = PILOT-001
TEST_CASE_ID   = TC-[SUITE]-[NNN]
ISSUE_ID       = ISS-[NNN]
EVIDENCE_ID    = EVD-[NNN]
REGRESSION_ID  = REG-[NNN]
```

No son estados globales de AIIF; son identificadores del protocolo de QA.

## 7. Precondiciones del piloto

Antes de comenzar:

- seleccionar un influencer piloto real;
- crear `PROJECT_ID` independiente;
- registrar `SYSTEM_VERSION`, `PROJECT_VERSION` y `SCHEMA_VERSION`;
- registrar qué archivos/documentos forman la build bajo prueba;
- conservar copia de la build pre-piloto;
- abrir `PILOT_RUN_ID`;
- crear registro de incidencias vacío;
- crear índice de evidencias vacío;
- definir qué capacidades externas están disponibles para imagen/video/voz;
- no utilizar información del piloto como excusa para modificar silenciosamente el sistema.

## 8. Evidencia mínima

Una prueba no debe declararse `PASS` únicamente por memoria del evaluador. Según el caso debe conservar:

- salida visible de la IA;
- objeto/archivo generado;
- estado antes/después;
- resultado del validador;
- punto de control;
- referencias usadas;
- ID de paquete;
- versión;
- activo retornado;
- diagnóstico/regeneración;
- incidencia relacionada;
- observaciones.

La evidencia puede ser textual, archivo, imagen, audio, video o referencia resoluble. Si no viaja físicamente, debe quedar identificada sin fingir disponibilidad.

## 9. Matriz F01–F13

| Fase | Área | Criterio de PASS | Evidencia mínima |
|---|---|---|---|
| F01 | Fundamentos Estratégicos | Fundamentos recuperados/definidos; NICHE_CANON coherente; no preguntas redundantes; NICHE_PUBLIC_POSITIONING separado de BRAND_POSITIONING_CANON. | Documento F01 + estado + validación + punto de control |
| F02 | Concepto | CONCEPT_CANON distinto de nicho; orienta fases posteriores sin reemplazarlas; aprobación humana explícita; no cierre prematuro de identidad/visual/contenido. | Concepto aprobado + validador + historial de candidatos |
| F03 | Biografía e Identidad | Identidad básica y siete áreas biográficas suficientemente resueltas; cronología coherente; NAME_CANON cuando aplique; biographical_continuity_constraints no se confunde con continuidad narrativa. | Biblia F03 + matriz de hechos + validación cronológica + checkpoint |
| F03 (nombramiento) | Nombramiento Canónico | Ruta sin nombre: brief, territorios, candidatos limitados, Puntuación de Marca con pesos declarados, finalistas con pruebas de resistencia, verificaciones externas reales o marcadas NO_VERIFICADO, NAME_CANON solo con aprobación explícita y validador. | Transcripción + naming_state + matriz de finalistas + registro de decisión |
| F04 | Personaje y Psicología | Comportamiento consistente por contexto; modelo psicológico interpretativo y no clínico; reglas conductuales reutilizables; no contradice biografía. | Biblia F04 + matriz contextual + validación |
| F05 | Identidad de Marca | Misión, visión, posicionamiento y propuesta de valor coherentes; límites y diferenciadores; compatibilidad comercial sin inventar autoridad o claims. | Biblia F05 + validación estratégica/comercial |
| F06 | Identidad Visual | Separación identidad física / estilo estable / variables de producción; referencias con alcance; generado no se autocanoniza; prompt base derivado. | Biblia F06 + referencias + prueba visual + validación |
| F07 | Identidad Verbal y Voz | Identidad verbal consistente; voz opcional según VOICE_REQUIRED; provider bindings no se confunden con identidad; puede continuar sin síntesis integrada. | Biblia F07 + voice-bible opcional + prueba de texto/voz |
| F08 | Universo Narrativo | Canon narrativo separado de NARRATIVE_STATE_CURRENT y NARRATIVE_EVENT_LOG; borradores no se vuelven eventos; continuidad coherente con biografía. | Biblia F08 + estado narrativo + event log + validación |
| F09 | Sistema de Contenido | Cinco pilares como base salvo excepción aprobada; profundidad/variación; simulación editorial de 30 días; brief portable; límites F07/F08/F10 respetados. | Biblia F09 + simulación 30D + brief de producción |
| F10 | Producción IA | Brief F09 aprobado se convierte en PRODUCTION_PACKAGE autocontenido; ruta externa funciona; retorno se registra/valida; regeneración mínima; activo aprobado no se autocanoniza. | Production job/package/run + activo retornado + validación + regen plan si aplica |
| F11 | Monetización | Ruta primaria y secuencia coherentes; guardrails; ofertas/precios permanecen dinámicos; no se garantizan ingresos; relación con marca/contenido/producción. | Plan F11 + rutas + condiciones + activos comerciales requeridos |
| F12 | Crecimiento | Baseline real o ausencia declarada; KPI bien definidos; roadmap 30/60/90/180/365; experimentos interpretables; evidencia no cambia canon automáticamente. | Plan F12 + dashboard + experimento/simulación + learning log |
| F13 | Consolidación | Auditoría transversal; Perfil Maestro derivado; paquetes coherentes; referencias trazables; siguiente acción explícita; reanudación sin historial posible. | Perfil Maestro + Portable + integridad + punto de control final + prueba de reanudación |


## 10. Criterios transversales que se prueban en todas las fases

Cada fase debe demostrar, cuando aplique:

1. **recuperación de contexto:** no volver a pedir datos válidos ya registrados;
2. **procedencia:** propuesta de IA no aparece como dato proporcionado por el usuario;
3. **aprobación:** recomendación/simulación no equivale a canon;
4. **propiedad:** una fase no modifica silenciosamente el canon de otra;
5. **versionado:** cambios relevantes dejan trazabilidad;
6. **dependencias:** un cambio bloqueado propaga revalidación donde corresponde;
7. **idioma:** capa estructural/documental en español; IDs técnicos estables preservados;
8. **siguiente acción:** el proyecto sabe qué sigue;
9. **persistencia:** punto de control y estado permiten reanudar;
10. **clasificación:** CANONICAL / DYNAMIC / DERIVED / HISTORICAL / PENDING no se mezclan.

## 11. Casos de prueba obligatorios de Sistema 00

### TC-S00-001 — Usuario aporta respuesta completa

**Objetivo:** comprobar la regla de no sobreayuda.  
**PASS:** la IA valida y utiliza la información sin obligar a recorrer opciones innecesarias.

### TC-S00-002 — Usuario dice “No sé”

**Objetivo:** comprobar Inicio Fácil integrado.  
**PASS:** AIIF ayuda a descubrir/comparar/decidir sin perder fase ni estado.

### TC-S00-003 — Aprobación explícita

**PASS:** propuesta → validación → aprobación → bloqueo; se registra versión/punto de control.

### TC-S00-004 — Mensaje ambiguo de agrado

Ejemplo: “me gusta”.  
**PASS:** no se canoniza automáticamente.

### TC-S00-005 — Cambio sobre canon bloqueado

**PASS:** punto de control → rama/revisión → impacto → validación → aprobación → nueva versión → revalidación de derivados.

### TC-S00-006 — Pausa y reanudación en la misma plataforma

**PASS:** recupera proyecto, fase, canon, pendientes y siguiente acción sin reconstrucción ni preguntas repetidas.

## 12. Suite de portabilidad y reanudación

La premisa obligatoria es:

> **La IA destino no conoce el chat anterior.**

Se deben probar los cuatro formatos aprobados:

| Caso | Formato | PASS mínimo |
|---|---|---|
| `TC-PORT-001` | Paquete Portable Completo | Identifica proyecto/versión/canon/estado/pendientes/referencias/siguiente acción y continúa. |
| `TC-PORT-002` | Paquete Portable Ligero | Continúa con compresión semántica sin perder decisiones críticas. |
| `TC-PORT-003` | Archivo Universal de Reanudación | Un único archivo es suficiente para recuperar estado y actuar. |
| `TC-PORT-004` | Contexto Portable Copiable | Texto pegado en sesión limpia recupera el núcleo mínimo sin inventar archivos ausentes. |

### 12.1 Pruebas obligatorias dentro de cada formato

La IA destino debe poder responder correctamente:

```text
¿Qué proyecto es?
¿Qué SYSTEM/PROJECT/PACKAGE/SCHEMA version corresponde?
¿Qué está CANONICAL?
¿Qué está DYNAMIC?
¿Qué es DERIVED?
¿Qué es HISTORICAL?
¿Qué está PENDING?
¿Qué fases están aprobadas?
¿Cuál es la fase/estado actual?
¿Cuál fue el último punto de control?
¿Qué referencias faltan físicamente?
¿Qué no debe volver a preguntar?
¿Cuál es la siguiente acción?
```

### 12.2 Control de sesión limpia y migración real

Para validar comercialmente v1.0 deben existir al menos:

- **una prueba en sesión limpia** sin historial como control;
- **una migración real entre dos contextos/IA compatibles** cuando la plataforma lo permita;
- pruebas de los cuatro formatos portables, aunque puedan repartirse entre sesiones limpias compatibles.

Una simulación dentro del mismo hilo no sustituye la prueba limpia.

## 13. Suite de producción externa → retorno → validación

Flujo obligatorio:

```text
F09 BRIEF APROBADO
        ↓
F10 PRODUCTION_PACKAGE
        ↓
HERRAMIENTA EXTERNA
        ↓
ACTIVO
        ↓
RETORNO A AIIF
        ↓
REGISTRO
        ↓
VALIDACIÓN CONTRA CANON + BRIEF
        ↓
APROBAR PARA USO | EDITAR | REGENERAR | PEDIR DECISIÓN
```

### 13.1 Activos mínimos

- `TC-PROD-001` — **imagen**: obligatorio.
- `TC-PROD-002` — **video corto**: obligatorio para validar el alcance general de AIIF v1.0.
- `TC-PROD-003` — **voz/audio**: obligatorio si `VOICE_REQUIRED = true` para el piloto; si no aplica, el protocolo registra la razón y no finge que fue probado.

### 13.2 PASS del Paquete de Producción

Debe ser suficientemente autocontenido para ejecutar el activo sin reconstruir el proyecto completo e incluir, cuando aplique:

- `PROJECT_ID` y contenido/pieza;
- objetivo, plataforma y formato;
- brief/mensaje/hook/CTA;
- referencias canónicas pertinentes;
- identidad visual/verbal relevante;
- contexto narrativo;
- variables permitidas/prohibidas;
- prompt universal;
- adaptación de proveedor;
- parámetros;
- referencias necesarias;
- checklist de validación;
- versión de dependencias.

### 13.3 PASS del retorno

Al volver el activo:

- se crea/actualiza el `PRODUCTION_RUN`;
- se registra `ASSET_RESULT`;
- se identifica el proveedor/herramienta y versión cuando sea material;
- se ejecutan validadores aplicables;
- se clasifican fallos;
- si el fallo es localizado, se utiliza regeneración de delta mínimo;
- `APROBADO_PARA_USO` no se convierte automáticamente en `REFERENCIA_CANONICA` ni en evento narrativo.

## 14. Prueba de referencias ausentes

Crear al menos un caso donde una referencia externa no viaje con el paquete.

**PASS:** AIIF registra `REFERENCIA_NO_ADJUNTA` con ID, tipo, función, alcance e impacto; la IA destino no afirma haber visto/recibido el archivo.

## 15. Prueba de datos incompletos

Introducir deliberadamente un dato no crítico ausente.

**PASS:** AIIF aplica `USAR / DEDUCIR / PROPONER / PREGUNTAR / OMITIR / POSPONER` conforme a importancia y no detiene el flujo por faltantes no críticos.

Introducir después un dato crítico ausente.

**PASS:** pregunta únicamente lo necesario o bloquea con una razón específica.

## 16. Prueba de contradicción

Introducir deliberadamente una instrucción incompatible con un canon bloqueado.

**PASS:** detecta la contradicción, identifica la fase propietaria, no reescribe silenciosamente y propone revisión controlada.

## 17. Registro de incidencias

Cada incidencia debe incluir como mínimo:

```json
{
  "issue_id": "ISS-001",
  "pilot_run_id": "PILOT-001",
  "test_case_id": "TC-...",
  "phase_owner": "Fxx|SYSTEM_00",
  "issue_type": "DOCUMENTAL|IMPLEMENTACION|ESTADO_DATOS|UX_FLUJO|VALIDACION|PORTABILIDAD|PRODUCCION|ARQUITECTONICA",
  "severity": "INFORMATIVO|MENOR|MODERADO|CRITICO|BLOQUEANTE",
  "summary": "",
  "expected": "",
  "actual": "",
  "evidence_refs": [],
  "suspected_root_cause": "",
  "proposed_fix": "",
  "canon_impact": "SIN_IMPACTO|ACTUALIZAR|REVALIDAR|REGENERAR|INVALIDAR",
  "status": "OPEN",
  "regression_required": true
}
```

## 18. Regla de corrección

```text
INCIDENCIA
   ↓
CAUSA RAÍZ
   ├─ DOCUMENTAL / IMPLEMENTACIÓN / UX
   │       → corregir sin reabrir canon si la intención aprobada permanece intacta
   ├─ PORTABILIDAD / PRODUCCIÓN / VALIDACIÓN
   │       → corregir contrato/plantilla/ejecución y revalidar dependencias
   └─ ARQUITECTÓNICA
           → propuesta de revisión de la fase propietaria
           → aprobación explícita antes de cambiar canon
```

No usar el piloto como permiso para “arreglar” automáticamente el canon.

## 19. Suite de regresión

Toda incidencia `MODERADO`, `CRITICO` o `BLOQUEANTE`, y cualquier cambio de esquema/portabilidad, requiere regresión.

La regresión debe repetir:

1. caso que falló;
2. caso anterior de la misma fase;
3. dependencias descendentes afectadas;
4. prueba de estado/punto de control;
5. al menos un formato portable si el cambio toca serialización/contexto;
6. ciclo de producción si el cambio toca F06–F10;
7. reanudación si el cambio toca Sistema 00/F13.

**PASS de regresión:** el defecto desaparece sin introducir una regresión crítica nueva.

## 20. Gate por fase

Una fase del piloto queda `PASS` cuando:

- todos sus criterios críticos cumplen;
- no tiene incidencias `CRITICO` o `BLOQUEANTE` abiertas;
- la evidencia mínima existe;
- su salida puede alimentar a la fase siguiente;
- las observaciones abiertas no alteran su significado canónico.

Si existe una incidencia `MODERADO`, puede quedar `PASS_WITH_OBSERVATIONS` para continuar el piloto, pero debe cerrarse y pasar regresión antes del freeze si afecta portabilidad, producción, integridad o reproducibilidad.

## 21. Gates globales

### GATE-01 — End-to-End

```text
F01 → F13 ejecutables
sin reconstrucción manual externa del estado
```

### GATE-02 — Persistencia

Pausa/reanudación conserva canon, estado, pendientes, versiones y siguiente acción.

### GATE-03 — Portabilidad

Los cuatro formatos pasan sus criterios y existe una prueba limpia real.

### GATE-04 — Producción externa

Imagen y video completan el ciclo F09→F10→externo→retorno→validación; voz cuando aplique.

### GATE-05 — Integridad

No hay mezcla silenciosa de CANONICAL/DYNAMIC/DERIVED/HISTORICAL/PENDING ni versiones ambiguas.

### GATE-06 — Regresión

Correcciones relevantes fueron reprobadas y no introducen defectos bloqueantes.

## 22. Criterio de candidato a freeze comercial

Solo puede proponerse:

```text
COMMERCIAL_FREEZE_CANDIDATE = YES
```

cuando:

- `GATE-01..GATE-06 = PASS`;
- no existan incidencias `MODERADO`, `CRITICO` o `BLOQUEANTE` abiertas;
- toda observación restante sea `INFORMATIVO` o `MENOR`, tenga owner y quede registrada;
- documentos/plantillas modificados estén versionados;
- se haya ejecutado regresión después de la última corrección relevante;
- el usuario apruebe explícitamente el freeze en una acción posterior.

El protocolo **nunca congela por sí mismo** Portable v1.0.

## 23. Reporte final del piloto

Debe contener:

1. identificación del piloto/build;
2. resumen ejecutivo;
3. matriz F01–F13;
4. casos ejecutados;
5. evidencias;
6. incidencias por severidad/tipo;
7. correcciones aplicadas;
8. regresiones;
9. resultados de los seis gates;
10. riesgos/limitaciones conocidas;
11. recomendación: `READY_FOR_FREEZE_REVIEW` o `NOT_READY`;
12. siguiente acción.

## 24. Archivos técnicos de esta recomendación

- `AI_INFLUENCER_FACTORY_Protocolo_Prueba_Influencer_Piloto_v1.0.docx`
- `AI_INFLUENCER_FACTORY_Protocolo_Prueba_Influencer_Piloto_v1.0.md`
- `AI_INFLUENCER_FACTORY_Matriz_Pruebas_Piloto_v1.0.json`
- `AI_INFLUENCER_FACTORY_Plantilla_Registro_Incidencias_v1.0.json`
- `AI_INFLUENCER_FACTORY_Plantilla_Indice_Evidencias_v1.0.json`
- `AI_INFLUENCER_FACTORY_Plantilla_Reporte_Final_Piloto_v1.0.json`
- `AI_INFLUENCER_FACTORY_Kit_Pruebas_Piloto_v1.0.zip`

## 25. Estado de esta recomendación

```text
RECOMMENDATION_04 = PROPUESTA_LISTA_PARA_APROBACION
PILOT_TEST_PROTOCOL = BUILT
PILOT_SELECTED = NO
PILOT_EXECUTED = NO
COMMERCIAL_FREEZE = BLOCKED
```
