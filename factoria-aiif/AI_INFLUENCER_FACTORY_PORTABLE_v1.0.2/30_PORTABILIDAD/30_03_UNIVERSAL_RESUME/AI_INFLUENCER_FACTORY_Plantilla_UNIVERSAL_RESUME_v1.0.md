---
file_type: UNIVERSAL_RESUME
schema_version: "1.1.0"
system_version: "AIIF_PORTABLE_v1.0.1"
package_version: "[PACKAGE_VERSION]"
project_version: "[PROJECT_VERSION]"
project_id: "[PROJECT_ID]"
name_canon: "[NAME_CANON]"
generated_at: "[DATE_TIME]"
language: "[IDIOMA_INTERFAZ]"
---

# [Nombre Influencer] — Archivo Universal de Reanudación

## 1. Identificación

- PROJECT_ID: `[PROJECT_ID]`
- NAME_CANON: `[NAME_CANON]`
- PROJECT_VERSION: `[PROJECT_VERSION]`
- PACKAGE_VERSION: `[PACKAGE_VERSION]`
- SCHEMA_VERSION: `1.1.0`
- PROJECT_STATUS: `[PROJECT_STATUS]`
- IDIOMA_INTERFAZ: `[IDIOMA_INTERFAZ]`
- IDIOMA_CANONICO_DOCUMENTAL: `ES`

## 2. Estado de fases

| Fase | Estado | CANON_VERSION / documento | Pendiente principal |
|---|---|---|---|
| F01 | [ESTADO] | [REF] | [PENDIENTE] |
| F02 | [ESTADO] | [REF] | [PENDIENTE] |
| F03 | [ESTADO] | [REF] | [PENDIENTE] |
| F04 | [ESTADO] | [REF] | [PENDIENTE] |
| F05 | [ESTADO] | [REF] | [PENDIENTE] |
| F06 | [ESTADO] | [REF] | [PENDIENTE] |
| F07 | [ESTADO] | [REF] | [PENDIENTE] |
| F08 | [ESTADO] | [REF] | [PENDIENTE] |
| F09 | [ESTADO] | [REF] | [PENDIENTE] |
| F10 | [ESTADO] | [REF] | [PENDIENTE] |
| F11 | [ESTADO] | [REF] | [PENDIENTE] |
| F12 | [ESTADO] | [REF] | [PENDIENTE] |
| F13 | [ESTADO] | [REF] | [PENDIENTE] |

## 3. CANON_OBJECTS

```yaml
[INCLUIR SOLO OBJETOS CANONICAL APLICABLES CON OWNER_PHASE, CANON_VERSION Y VALOR/RESUMEN]
```

## 4. DYNAMIC_OBJECTS

```yaml
[INCLUIR ESTADO OPERATIVO VIGENTE NECESARIO PARA CONTINUAR]
```

## 5. DERIVED_OBJECTS

```yaml
[INCLUIR ARTEFACTOS DERIVADOS VIGENTES O REFERENCIAS A ELLOS]
```

## 6. HISTORICAL_OBJECTS

```yaml
[RESUMEN DE HISTORIAL RELEVANTE; NO INCLUIR TODO SI NO ES NECESARIO]
```

## 7. PENDING_OBJECTS

```yaml
[DECISIONES, DATOS, VALIDACIONES Y ACCIONES PENDIENTES]
```

### 7.1 Nombramiento en curso

Incluir solo si el Sistema Inteligente de Nombramiento Canónico está activo o incompleto. Si `NAME_CANON` ya está bloqueado, basta con la decisión registrada y el historial de candidatos.

```yaml
naming_state:
  ruta_entrada: [NOMBRE_EXISTENTE | VARIAS_IDEAS | SIN_NOMBRE]
  etapa_actual: [N00..N15]
  profundidad: [NUCLEO | AMPLIADO | PROFUNDO]
  brief: [RESUMEN]
  territorios_seleccionados: [LISTA]
  nombres_trabajo: [LISTA]
  candidatos: [LISTA]
  candidatos_rechazados: [NOMBRE + MOTIVO]
  preseleccion: [LISTA]
  finalistas: [LISTA]
  puntuaciones_marca: [PUNTUACIONES + PESOS DECLARADOS]
  verificaciones_realizadas: [COMPROBACION: VERIFICADO | PARCIALMENTE_VERIFICADO]
  verificaciones_pendientes: [COMPROBACION: NO_VERIFICADO | NO_DISPONIBLE]
  candidato_recomendado: [NOMBRE | null]
  estado_aprobacion: [PENDIENTE | APROBADO]
  historial: [RESUMEN]
  next_action: [ACCION]
```

## 8. Referencias y archivos

```yaml
[REF_ID]:
  status: ADJUNTA | REFERENCIA_NO_ADJUNTA | EXTERNA
  scope: [ALCANCE]
  location: [UBICACION/ID]
  notes: [NOTAS]
```

## 9. Último punto de control

- checkpoint_id: `[CHECKPOINT_ID]`
- fecha: `[DATE_TIME]`
- fase: `[FASE]`
- estado: `[ESTADO]`
- decisiones: `[RESUMEN]`
- pendientes: `[RESUMEN]`

## 10. Siguiente acción

`[NEXT_ACTION]`

## 11. Instrucción de reanudación

Al recibir este archivo:

1. No crear proyecto nuevo.
2. Cargar proyecto, versiones, canon, estado y pendientes.
3. Respetar objetos bloqueados y fases aprobadas.
4. Marcar cualquier referencia faltante; no fingir que está disponible.
5. No repetir preguntas ya resueltas salvo conflicto específico.
6. Mostrar un resumen breve de reanudación.
7. Continuar directamente con `[NEXT_ACTION]`.

Comando del usuario:

```text
Continuar [Nombre Influencer]
```
