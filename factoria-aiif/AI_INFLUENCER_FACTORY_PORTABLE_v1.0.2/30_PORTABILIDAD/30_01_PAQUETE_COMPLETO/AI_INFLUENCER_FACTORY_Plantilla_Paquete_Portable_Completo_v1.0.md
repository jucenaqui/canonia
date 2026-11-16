---
file_type: PAQUETE_PORTABLE_COMPLETO
schema_version: "1.1.0"
system_version: "AIIF_PORTABLE_v1.0.1"
package_version: "[PACKAGE_VERSION]"
project_version: "[PROJECT_VERSION]"
project_id: "[PROJECT_ID]"
name_canon: "[NAME_CANON]"
---

# [Nombre Influencer] — Plantilla de Paquete Portable Completo

## Estructura recomendada

```text
[Nombre_Influencer]_PORTABLE_v[PACKAGE_VERSION]/
├── portable-manifest.json
├── project-state.json
├── master-profile.md
├── canon-registry.json
├── dependency-graph.json
├── pending-items.json
├── document-index.json
├── derived-artifact-index.json
├── project-integrity-report.json
├── universal-resume.md
├── canon/
│   ├── F01.json
│   ├── F02.json
│   ├── ...
│   └── F13.json
├── state/
│   ├── dynamic-objects.json
│   ├── naming-state.json
│   └── current-checkpoint.json
├── references/
│   └── references-index.json
└── docs/
    └── [documentos necesarios o referencias]
```

## Reglas

1. Incluir solo objetos que realmente existan y apliquen.
2. Separar `CANON_OBJECTS`, `DYNAMIC_OBJECTS`, `DERIVED_OBJECTS`, `HISTORICAL_OBJECTS` y `PENDING_OBJECTS`.
3. No duplicar archivos multimedia pesados si pueden conservarse mediante referencias resolubles.
4. Toda referencia ausente debe quedar marcada `REFERENCIA_NO_ADJUNTA`.
5. `master-profile.md` es una vista derivada; el canon propietario sigue teniendo precedencia.
6. El manifiesto debe identificar `PROJECT_VERSION`, `PACKAGE_VERSION` y `SCHEMA_VERSION`.
7. El paquete debe terminar con una `next_action` o estado explícito de operación continua.
8. Validar el paquete como si la IA destino no conociera el chat anterior.
9. Si el nombramiento está activo o incompleto, incluir `state/naming-state.json` con los campos de la sección 40 de la Especificación de Nombramiento Canónico (ver `naming_state` en la Plantilla de Estado del Proyecto). Si `NAME_CANON` ya está bloqueado, este archivo puede omitirse.
