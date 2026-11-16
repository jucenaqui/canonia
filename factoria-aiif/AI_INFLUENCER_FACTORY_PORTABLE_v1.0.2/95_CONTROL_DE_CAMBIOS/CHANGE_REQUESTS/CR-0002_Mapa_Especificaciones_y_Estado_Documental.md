---
change_request_id: CR-0002
title: "Mapa de especificaciones en el arranque y estado documental aprobado de F01–F13"
base_version: "AIIF_PORTABLE_v1.0.1"
target_version: "AIIF_PORTABLE_v1.0.2"
change_type: CORRECCION_DOCUMENTAL
status: APROBADO_E_IMPLEMENTADO
requested_at: "2026-11-16"
approved_at: "2026-11-16"
approved_by: "Usuario propietario de la factoría (aprobación explícita en chat)"
---

# CR-0002 — Mapa de especificaciones y estado documental

## 1. Problemas

**P1. El arranque no indicaba qué especificación aplicar en cada fase.** El Prompt de Arranque y el INICIO_UNIVERSAL nombraban F01–F13, pero no decían qué archivo contiene las reglas de cada una. Una IA que no explorara el paquete por su cuenta, o que lo leyera de forma parcial (como Gemini con el paquete completo), podía improvisar fases enteras.

**P2. Las especificaciones de F01–F13 seguían diciendo que eran propuestas.** Su cabecera y su sección final "Estado de esta especificación" decían `PROPUESTA_LISTA_PARA_APROBACION` (F01: `PROPUESTA_INTEGRADA_PARA_APROBACION_DOCUMENTAL`). Algunas lo decían de forma explícita, por ejemplo F13: "no debe considerarse bloqueada", o F06: "todavía no debe considerarse canon". Esto ya estaba registrado como hallazgo H02 (`ALTO_PRE_FREEZE`) en la Auditoría Transversal F01–F13 Pre-Freeze. La misma auditoría marca F02–F13 como `APROBADA`, y el Commercial Freeze del 2026-08-17 aprobó la baseline completa.

## 2. Cambios

| Archivo | Cambio |
|---|---|
| Prompt de Arranque (2 copias) | Mapa "fase → archivo" con Sistema 00, F01–F13 y el subsistema de nombre. Regla para cuando un archivo no esté disponible: decirlo, seguir con las reglas mínimas y no inventar su contenido. |
| INICIO_UNIVERSAL | Nueva sección "Mapa de especificaciones" con la misma tabla y la misma regla. |
| 13 especificaciones F01–F13 | Cabecera: `status: APROBADA`, `estado_documental`, `estado_documental_anterior` y `base_aprobacion`. Subtítulo "Propuesta lista para aprobación" cambiado a "Aprobada (baseline comercial v1.0)" donde existía. Sección final "Estado de esta especificación" reescrita: indica que las reglas están vigentes y que aprobar la especificación no aprueba datos de ningún proyecto. |
| Especificación de Nombramiento | `status: APROBADA`, con base en la aprobación de CR-0001. |
| `90_HISTORICO_Y_LEGACY/Versiones_Anteriores/v1.0/` | Copia de las 13 especificaciones tal como estaban en la v1.0, como pide la acción recomendada de H02. |
| README, registro de cambios, estructura, árbol y manifest | Versión 1.0.2 y nuevos archivos. |

El contenido normativo de las especificaciones no cambia. Solo cambian su cabecera, su subtítulo y su sección de estado.

## 3. Fuera de alcance

- `Registro_Maestro_IDs_Propiedad_v1.0` (.md y .json) sigue con `status: PROPOSAL_READY_FOR_APPROVAL`. Contiene las normalizaciones H01–H09, y la auditoría no deja una línea explícita de aprobación para ellas. Queda como decisión pendiente del usuario.
- Otros documentos de uso (Prompt de Arranque, INICIO_UNIVERSAL, matriz y protocolo del piloto) conservan su estado `PROPUESTA_LISTA_PARA_APROBACION` en la cabecera. No definen reglas de fase.
- Las carpetas `Esquemas`, `Plantillas` y `Validadores` de cada fase siguen vacías. Los validadores existen como texto dentro de cada especificación.

## 4. Pendientes

1. Decidir si se aprueba el Registro Maestro de IDs.
2. Ejecutar `TC-PHASE-F03-002` (de CR-0001).
