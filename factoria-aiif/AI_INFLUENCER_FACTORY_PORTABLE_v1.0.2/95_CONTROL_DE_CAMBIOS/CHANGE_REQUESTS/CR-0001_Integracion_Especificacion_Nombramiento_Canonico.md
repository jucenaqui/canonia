---
change_request_id: CR-0001
title: "Integración de la Especificación General del Sistema Inteligente de Nombramiento Canónico"
base_version: "AIIF_PORTABLE_v1.0 (FROZEN_COMMERCIAL_BASELINE)"
target_version: "AIIF_PORTABLE_v1.0.1"
change_type: CORRECCION_DE_OMISION
status: APROBADO_E_IMPLEMENTADO
requested_at: "2026-11-16"
approved_at: "2026-11-16"
approved_by: "Usuario propietario de la factoría (aprobación explícita en chat)"
---

# CR-0001 — Integración de la Especificación de Nombramiento Canónico

## 1. Problema detectado

La v1.0 reconoce el Sistema Inteligente de Nombramiento Canónico pero no incluye su especificación:

- El Registro Maestro de IDs define `NAME_CANON`, `VALIDADOR_DE_NOMBRE_CANONICO` y el rango de etapas `N00–N15` con propietario `F03:NAMING`.
- La especificación de F03 dice que `NAME_CANON` "permanece gobernado por el Sistema Inteligente de Nombramiento Canónico", sin indicar dónde están sus reglas.
- El documento `AI_INFLUENCER_FACTORY_Especificacion_General_Nombramiento_Canonico_v1.0.docx` existía fuera del paquete portable.
- En `90_HISTORICO_Y_LEGACY/Especificaciones_Reemplazadas/` solo estaba la fuente anterior, `UNIVERSAL_AI_CANONICAL_NAMING_SPEC(1).md`, sin su reemplazo vigente.
- Ni el Prompt de Arranque ni el INICIO_UNIVERSAL indicaban a la IA aplicar el sistema de nombramiento.
- Las plantillas portables solo guardaban `name_canon`, no el estado de un nombramiento en curso (sección 40 de la especificación).
- La matriz del piloto no tenía un caso de prueba para la ruta "sin nombre". El piloto interno partió con nombre definido.

Efecto: una IA que recibiera solo el paquete portable improvisaría el proceso de nombre, sin brief, territorios, filtros, Puntuación de Marca, pruebas de resistencia, revisión de marcas, estados de verificación ni validador.

## 2. Cambio aplicado

| Archivo | Cambio |
|---|---|
| `03_F03_BIOGRAFIA_E_IDENTIDAD/AI_INFLUENCER_FACTORY_Especificacion_General_Nombramiento_Canonico_v1.0.md` | **Nuevo.** Conversión fiel del .docx v1.0.0 a Markdown, con cabecera de metadatos. Contenido normativo sin cambios. |
| `03_F03_BIOGRAFIA_E_IDENTIDAD/..._Biografia_Identidad_Canonica_v1.0.md` | Referencia explícita al archivo de nombramiento (secciones 3, 6 y 7.4) y nota de búsqueda web para el subsistema de nombre (sección 33). |
| `00_SISTEMA_Y_CONTROL/00_06_REANUDACION/..._Prompt_Arranque_Universal_v1.0.md` y copia en `30_PORTABILIDAD/30_06_ACTIVACION/` | Párrafo que obliga a aplicar la especificación de nombramiento, usar búsqueda web si existe y no canonizar sin aprobación explícita. |
| `30_PORTABILIDAD/30_06_ACTIVACION/..._INICIO_UNIVERSAL_v1.0.md` | Nueva sección "Nombre de la influencer". |
| Plantilla de Estado del Proyecto (2 copias) | Nuevo bloque `naming_state`. `schema_version` 1.1.0. |
| Plantilla UNIVERSAL_RESUME (2 copias) | Nueva sección 7.1 "Nombramiento en curso". `schema_version` 1.1.0. |
| Plantilla Paquete Portable Completo (2 copias) | `state/naming-state.json` y regla 9. `schema_version` 1.1.0. |
| Matriz de Pruebas Piloto | Nuevo caso `TC-PHASE-F03-002` (ruta sin nombre). |
| Protocolo de Prueba Piloto | Nueva fila "F03 (nombramiento)" en la matriz F01–F13. |
| Guía Paso a Paso | Nota sobre el nombre en F03. |
| `README.md`, estructura canónica, árbol y manifest | Registro del nuevo archivo y de la versión 1.0.1. Manifest regenerado con tamaños y SHA-256. |

## 3. Lo que no cambia

- Arquitectura F01–F13, Sistema 00, estados globales y validadores existentes.
- `99_FREEZE_COMERCIAL_v1.0/` y la carpeta original `AI_INFLUENCER_FACTORY_PORTABLE_v1.0` quedan intactas como baseline congelada.
- Proyecto piloto interno (no incluido en este repositorio): no se modifica su canon. Su `NAME_CANON` sigue vigente; no tiene registro de decisión de nombre según la sección 29.1, lo que queda como pendiente no bloqueante.

## 4. Compatibilidad

- Paquetes con `schema_version` 1.0.0 siguen siendo válidos. La ausencia de `naming_state` se interpreta como "sin nombramiento en curso".
- El caso `TC-PHASE-F03-002` aún no se ha ejecutado (`result: null`). Hasta ejecutarlo, la ruta sin nombre queda implementada pero no validada en piloto.

## 5. Pendientes

1. Ejecutar `TC-PHASE-F03-002` en al menos una IA con búsqueda web y una sin ella.
2. Opcional: registrar en el proyecto piloto la decisión de nombre (sección 29.1) si se quiere trazabilidad completa.
