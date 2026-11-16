---
spec_id: AIIF_GENERAL_AI_PRODUCTION_SYSTEM_SPEC
spec_version: "1.0.0"
spec_type: AIIF_AI_PRODUCTION_EXECUTION_VALIDATION_SPEC
status: APROBADA
estado_documental: APROBADA
estado_documental_anterior: PROPUESTA_LISTA_PARA_APROBACION
base_aprobacion: "Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17"
revision_documental: "AIIF_PORTABLE_v1.0.2 (CR-0002)"
phase: "F10 - Producción IA"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "Biografía Influencer Digital con IA.docx"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Producción IA y Validación de Activos
### Versión 1.0.0 — Aprobada (baseline comercial v1.0)

## 1. Propósito

Esta especificación define el sistema general y reutilizable mediante el cual AI Influencer Factory (AIIF) transforma un brief editorial aprobado y los cánones ya existentes en **activos de imagen, video, voz y piezas audiovisuales reproducibles, trazables y validables**.

F10 no existe para volver a diseñar la influencer. Su función es **ejecutar correctamente decisiones ya aprobadas**.

Flujo visible recomendado:

```text
BRIEF APROBADO
      ->
PAQUETE DE PRODUCCION
      ->
GENERACION / PRODUCCION
      ->
RESULTADO
      ->
VALIDACION CONTRA CANON
      ->
APROBAR PARA USO | REGENERAR | PEDIR DECISION
```

La producción puede ocurrir dentro de la misma IA o en herramientas externas. La arquitectura debe funcionar en ambos casos.

## 2. Fundamento experto de origen

La especificación original de expertos exige como salidas:

- prompts de imagen coherentes para múltiples escenarios;
- prompts de video;
- reglas de consistencia;
- un Prompt Maestro definitivo para recrear el avatar en cualquier IA.

También exige que la influencer funcione como una marca personal viva, coherente, escalable y preparada para monetización.

F10 conserva esa intención. Las estructuras de trabajos de producción, paquetes portables, adaptadores de proveedor, registro de parámetros, retorno de resultados, validación multimodal, regeneración dirigida y registro de activos son **extensiones arquitectónicas de AIIF** necesarias para hacer operable y portable la metodología experta.

## 3. Regla de procedencia

> AIIF debe preservar la intención experta de producir imágenes, videos y demás activos coherentes. La arquitectura de ejecución, estados, validadores, paquetes, adaptadores, trazabilidad y control de cambios es una extensión de AIIF y no debe atribuirse retroactivamente a la fuente original.

## 4. Ubicación en la arquitectura

```text
F01-F09 = DISEÑO / ESTRATEGIA / CANON
              ↓
F09 = BRIEF EDITORIAL APROBADO
              ↓
F10 = PRODUCCION IA + VALIDACION DE RESULTADOS
              ↓
F11 = MONETIZACION
F12 = CRECIMIENTO
F13 = CONSOLIDACION
```

F10 no crea una fase global adicional.

## 5. Principio central

> **F10 produce; no redefine silenciosamente.**

Un activo generado puede revelar un problema, sugerir una mejora o convertirse en candidato a referencia, pero no modifica por sí solo:

- identidad física;
- personaje;
- marca;
- identidad visual;
- identidad verbal;
- universo narrativo;
- pilares de contenido;
- otros elementos bloqueados.

## 6. Separación formal Diseño / Producción / Validación

F10 formaliza dentro de AIIF tres responsabilidades distintas:

```text
DISEÑO
= lo que debe existir y por que

PRODUCCION
= como se ejecuta un activo concreto

VALIDACION
= comprobar si el resultado respeta diseño, brief y requisitos
```

Esta separación es funcional, no una nueva división de fases globales.

### 6.1 Diseño

Gobernado principalmente por F01-F09.

### 6.2 Producción

Gobernada principalmente por F10.

### 6.3 Validación

F10 orquesta validadores propios y reutiliza los validadores especializados de fases anteriores.

## 7. Dependencias principales de entrada

F10 debe recuperar, cuando correspondan:

- `IDENTITY_CORE_CANON`;
- `BIOGRAPHY_CANON`;
- `CHARACTER_CANON`;
- `BRAND_IDENTITY_CANON`;
- `BRAND_POSITIONING_CANON`;
- `PHYSICAL_IDENTITY_CANON`;
- `VISUAL_STYLE_CANON`;
- `VISUAL_REFERENCE_SET_CANON`;
- `VISUAL_IDENTITY_CANON`;
- `VERBAL_IDENTITY_CANON`;
- `VOICE_STYLE_CANON`;
- `VOICE_REFERENCE_SET_CANON`;
- `VOICE_IDENTITY_CANON`;
- `NARRATIVE_UNIVERSE_CANON`;
- `NARRATIVE_CONTINUITY_CANON`;
- `NARRATIVE_STATE_CURRENT`;
- `CONTENT_SYSTEM_CANON`;
- `CONTENT_EDITORIAL_RULES_CANON`;
- Brief de Contenido aprobado de F09;
- requisitos de plataforma;
- restricciones legales, contractuales o de marca aportadas al proyecto;
- capacidades reales de la herramienta de producción.

F10 no debe pedir de nuevo información ya disponible.

## 8. Qué sí define F10

F10 sí puede definir y ejecutar:

- plan de activos de una pieza;
- paquete de producción;
- prompts derivados para imagen;
- prompts derivados para video;
- brief técnico de voz;
- instrucciones de lip-sync cuando aplique;
- instrucciones de edición y ensamblaje;
- subtítulos y requisitos de exportación cuando formen parte de la pieza;
- adaptación de instrucciones a un proveedor;
- metadatos de producción;
- registro de resultados;
- validación de activos;
- diagnóstico de fallos;
- regeneración dirigida;
- selección de mejor variante;
- aprobación para uso;
- registro de activos finales;
- derivación del Prompt Maestro de Recreación vigente.

## 9. Qué no debe redefinir F10

F10 no debe cerrar o modificar por sí solo:

- nicho;
- concepto;
- nombre;
- biografía;
- personaje/psicología;
- marca;
- identidad física;
- identidad visual;
- identidad verbal;
- identidad vocal;
- universo narrativo;
- pilares editoriales;
- estrategia de monetización;
- estrategia de crecimiento.

Si producción descubre un conflicto, F10 debe **reportar impacto y abrir revisión**, no corregir el canon silenciosamente.

## 10. Objetos estructurales propuestos

Se proponen como elementos canónicos de arquitectura de F10:

```text
AI_PRODUCTION_SYSTEM_CANON
PRODUCTION_PACKAGE_SCHEMA_CANON
PRODUCTION_PROMPT_RULES_CANON
PRODUCTION_VALIDATION_POLICY_CANON
```

Nombres visibles:

- Sistema Canónico de Producción IA;
- Esquema Canónico del Paquete de Producción;
- Reglas Canónicas de Construcción de Prompts;
- Política Canónica de Validación de Producción.

Estos objetos gobiernan **cómo producir**, no la identidad de una influencer concreta.

## 11. Objetos operativos dinámicos

F10 utiliza objetos que cambian por trabajo o herramienta:

```text
PRODUCTION_JOB
PRODUCTION_PACKAGE
PRODUCTION_RUN
ASSET_RESULT
ASSET_REGISTRY
PROVIDER_ADAPTER_PROFILE
CAPABILITY_MAP_CURRENT
MASTER_AVATAR_PROMPT_CURRENT
```

No deben tratarse como canon identitario permanente.

## 12. PRODUCTION_JOB

Cada unidad de producción debe poder representarse mediante un trabajo trazable.

Estructura conceptual:

```json
{
  "production_job": {
    "production_id": "[ID]",
    "content_id": "[CONTENT_ID]",
    "status": "[ESTADO]",
    "target_platform": "[PLATAFORMA]",
    "target_format": "[FORMATO]",
    "asset_plan": [],
    "dependencies": [],
    "production_package_id": "[PACKAGE_ID]",
    "runs": [],
    "selected_asset_ids": [],
    "approval_required": true
  }
}
```

## 13. Estados específicos de un trabajo de producción

Estos estados pertenecen al objeto `PRODUCTION_JOB`; no sustituyen estados globales del proyecto.

```text
PENDIENTE_DE_PRODUCCION
EN_PREPARACION
LISTO_PARA_GENERAR
EN_EJECUCION
RESULTADO_RECIBIDO
EN_VALIDACION
REQUIERE_REGENERACION
REQUIERE_DECISION_USUARIO
APROBADO_PARA_USO
FINALIZADO
RECHAZADO
ARCHIVADO
```

Si una herramienta externa no permite conocer si está “EN_EJECUCION”, AIIF puede omitir ese estado.

## 14. Plan de activos

Una sola pieza editorial puede requerir uno o varios activos:

```text
IMAGEN
VIDEO
VOZ
MUSICA / AUDIO AUTORIZADO
SUBTITULOS
LIP_SYNC
PORTADA
THUMBNAIL
CAPTION / COPY FINAL
ARCHIVO MAESTRO EDITADO
VARIANTES POR PLATAFORMA
```

No todos los proyectos necesitan todos los tipos.

## 15. Paquete de Producción

El `PRODUCTION_PACKAGE` es el puente portable entre diseño y ejecución.

Debe ser suficientemente autocontenido para que otra IA o herramienta pueda producir la pieza **sin tener que reconstruir todo el proyecto**.

## 16. Contenido mínimo del Paquete de Producción

Según el tipo de activo puede incluir:

- ID de proyecto;
- ID de pieza/contenido;
- objetivo editorial;
- plataforma/formato;
- especificación de salida;
- mensaje/hook/CTA;
- contexto narrativo;
- referencias a canon;
- identidad física relevante;
- reglas visuales relevantes;
- referencias visuales aplicables y alcance;
- identidad verbal relevante;
- voz, si aplica;
- continuidad narrativa relevante;
- variables permitidas;
- variables prohibidas;
- prompt universal;
- prompt adaptado al proveedor;
- negative constraints cuando la herramienta los admita;
- parámetros técnicos conocidos;
- archivos/referencias requeridos;
- checklist de validación;
- versión de dependencias.

## 17. Esquema conceptual del Paquete

```json
{
  "production_package": {
    "package_id": "[ID]",
    "content_brief_ref": "[CONTENT_ID]",
    "asset_type": "IMAGE|VIDEO|AUDIO|COMPOSITE",
    "target": {
      "platform": "[PLATAFORMA]",
      "format": "[FORMATO]",
      "aspect_ratio": "[RATIO]",
      "duration": "[SI_APLICA]"
    },
    "canon_refs": {
      "visual": "VISUAL_IDENTITY_CANON",
      "verbal": "VERBAL_IDENTITY_CANON",
      "voice": "VOICE_IDENTITY_CANON|NO_APLICA",
      "narrative": "NARRATIVE_CONTINUITY_CANON",
      "content": "CONTENT_SYSTEM_CANON"
    },
    "reference_assets": [],
    "allowed_variables": [],
    "prohibited_variables": [],
    "universal_prompt": "[PROMPT]",
    "provider_prompt": "[PROMPT_ADAPTADO]",
    "provider_parameters": {},
    "validation_checklist": [],
    "dependency_versions": {}
  }
}
```

## 18. Regla de autocontención para producción externa

Cuando la herramienta productora no dispone de los archivos de contexto de AIIF, **no se le envía solo un prompt aislado**.

Se le entrega lo mínimo necesario mediante:

```text
PAQUETE DE PRODUCCION
+
REFERENCIAS NECESARIAS
+
PROMPT ADAPTADO
+
PARAMETROS / RESTRICCIONES
```

Esto responde al principio de portabilidad y evita depender de memoria invisible de otra IA.

## 19. Construcción de prompts

Los prompts de F10 deben derivarse de información estructurada.

Flujo:

```text
CANON + BRIEF + VARIABLES PERMITIDAS
             ↓
COMPOSITOR DE PROMPT
             ↓
PROMPT UNIVERSAL
             ↓
ADAPTADOR DE PROVEEDOR
             ↓
PROMPT / PARAMETROS EJECUTABLES
```

## 20. Regla: prompt ≠ fuente de verdad

Se reafirma la regla aprobada en F06:

> **El prompt es un derivado de la especificación canónica.**

Si el prompt contradice el canon, se corrige el prompt.

No se corrige el canon para que coincida con un prompt defectuoso.

## 21. Reglas Canónicas de Construcción de Prompts

`PRODUCTION_PROMPT_RULES_CANON` puede gobernar:

- orden lógico de información;
- separación identidad / escena / estilo / cámara / restricciones;
- inclusión de atributos invariantes solo cuando sean relevantes;
- inclusión de variables permitidas;
- tratamiento de referencias;
- prevención de contradicciones;
- adaptación por modalidad;
- adaptación por proveedor;
- localización de idioma de prompt;
- control de longitud;
- evitar redundancia destructiva;
- versionado.

No debe imponer una sintaxis universal rígida a proveedores con capacidades diferentes.

## 22. Prompt universal vs prompt de proveedor

AIIF debe distinguir:

```text
UNIVERSAL_PRODUCTION_PROMPT
= intención portable y proveedor-agnóstica

PROVIDER_RENDERED_PROMPT
= traducción de esa intención a una herramienta concreta
```

Cambiar de herramienta puede cambiar `PROVIDER_RENDERED_PROMPT` sin cambiar el brief ni el canon.

## 23. Prompt Maestro de Recreación

La fuente experta solicita un Prompt Maestro definitivo para recrear el avatar en cualquier IA.

AIIF lo conserva como artefacto derivado:

```text
MASTER_AVATAR_PROMPT_CURRENT
```

Nombre visible recomendado:

**Prompt Maestro de Recreación Vigente**.

## 24. Por qué no se propone MASTER_AVATAR_PROMPT_CANON

El canon estructurado es más estable que la sintaxis de un prompt.

Por tanto:

```text
CANON ESTRUCTURADO
      ↓
MASTER_AVATAR_PROMPT_CURRENT
      ↓
ADAPTACION POR PROVEEDOR
```

El Prompt Maestro debe regenerarse cuando cambien de forma aprobada:

- identidad física;
- estilo visual;
- restricciones;
- voz relevante;
- reglas de portabilidad;
- sintaxis/limitaciones del proveedor.

No debe convertirse en una copia inmutable que quede desactualizada.

## 25. Producción de imagen

El paquete de imagen puede incluir:

- identidad física aplicable;
- referencia facial/corporal aplicable;
- estilo fotográfico;
- vestuario;
- expresión;
- pose;
- acción;
- localización;
- cámara/encuadre;
- iluminación;
- relación de aspecto;
- nivel de realismo;
- variables prohibidas;
- restricciones de plataforma;
- requisitos editoriales.

F10 debe mantener separación entre identidad permanente y variables de escena.

## 26. Producción de video

El paquete de video puede incluir:

- imagen o referencia de inicio cuando corresponda;
- identidad visual;
- acción principal;
- microacciones;
- movimiento corporal;
- movimiento de cámara;
- duración;
- ritmo;
- continuidad temporal;
- expresión;
- lip-sync si aplica;
- audio/voz si aplica;
- ambiente;
- encuadre;
- restricciones de deformación;
- requisitos de salida.

## 27. Producción de voz

F10 solo genera voz cuando exista especificación suficiente de F07.

Si:

```text
VOICE_REQUIRED = false
```

o la voz está incompleta, F10 no debe inventarla.

Cuando exista voz, F10 consume:

- `VOICE_STYLE_CANON`;
- `VOICE_REFERENCE_SET_CANON`;
- `VOICE_IDENTITY_CANON`;
- `VOICE_PROVIDER_BINDINGS` cuando sean útiles;
- guion de F09;
- reglas de pronunciación.

## 28. Producción de lip-sync

Cuando aplique, F10 debe distinguir:

```text
IDENTIDAD DE VOZ
!=
ARCHIVO DE AUDIO
!=
RESULTADO DE LIP-SYNC
```

Un error de sincronización no es un cambio de voz ni de personaje.

## 29. Edición y ensamblaje

F10 puede preparar instrucciones para:

- selección de tomas;
- montaje;
- duración final;
- ritmo de edición;
- inserción de audio;
- subtítulos;
- texto en pantalla;
- transiciones;
- portada;
- exportación;
- versiones por plataforma.

No debe modificar el mensaje central del brief sin volver a F09.

## 30. Subtítulos y texto en pantalla

Cuando formen parte del activo final, deben respetar:

- `VERBAL_IDENTITY_CANON`;
- idioma/locale;
- legibilidad;
- límites de plataforma;
- sincronización;
- coherencia con guion.

Los subtítulos pueden corregir errores de transcripción, pero no reescribir el discurso silenciosamente.

## 31. Adaptadores de proveedor

Se adopta el objeto dinámico:

```text
PROVIDER_ADAPTER_PROFILE
```

Describe cómo mapear el paquete universal a capacidades de una herramienta concreta.

Puede incluir:

- modalidad disponible;
- formato de prompt;
- referencias admitidas;
- parámetros;
- límites;
- aspect ratios;
- duración;
- seed si existe;
- negative prompt si existe;
- restricciones de archivos;
- observaciones de compatibilidad.

No es canon de identidad.

## 32. Mapa de capacidades

Se adopta:

```text
CAPABILITY_MAP_CURRENT
```

Puede registrar capacidades actuales como:

- generación de imagen;
- image-to-image;
- reference image;
- inpainting/editing;
- generación de video;
- image-to-video;
- text-to-video;
- control de cámara;
- TTS;
- referencia de voz;
- lip-sync;
- edición;
- subtítulos;
- exportación.

Debe actualizarse cuando cambie de plataforma o plan.

## 33. Selección de ruta de ejecución

F10 puede operar por:

```text
RUTA_A - PRODUCCION INTEGRADA
RUTA_B - PRODUCCION EXTERNA
RUTA_C - PRODUCCION HIBRIDA
```

### Ruta A
La IA actual puede producir y analizar el activo.

### Ruta B
AIIF prepara instrucciones; otra herramienta produce; el resultado vuelve para validación.

### Ruta C
Algunos pasos se hacen integrados y otros externamente.

## 34. Degradación elegante

La ausencia de una capacidad nunca debe destruir el flujo completo.

Ejemplo:

```text
NO VIDEO NATIVO
-> generar paquete y prompt de video
-> producir externamente
-> devolver clip
-> validar
```

La plataforma puede ser `COMPATIBLE_CON_LIMITACIONES` sin bloquear el sistema.

## 35. PRODUCTION_RUN

Cada intento de generación debe registrarse cuando aporte trazabilidad.

```json
{
  "production_run": {
    "run_id": "[ID]",
    "production_id": "[ID]",
    "provider": "[PROVEEDOR]",
    "model_or_mode": "[MODELO_O_MODO]",
    "prompt_version": "[VERSION]",
    "reference_ids": [],
    "parameters": {},
    "outputs": [],
    "notes": [],
    "timestamp": "[FECHA]"
  }
}
```

No inventar parámetros que la herramienta no exponga.

## 36. Registro de resultados

Cada resultado relevante puede registrarse como `ASSET_RESULT`.

```json
{
  "asset_result": {
    "asset_id": "[ID]",
    "run_id": "[RUN_ID]",
    "asset_type": "[TIPO]",
    "status": "RESULTADO_RECIBIDO",
    "source_file_ref": "[REF]",
    "validation": {},
    "issues": [],
    "approval": null
  }
}
```

## 37. Trazabilidad de activos

F10 debe poder responder:

- ¿qué brief originó este activo?;
- ¿qué versión del canon se usó?;
- ¿qué referencias se aplicaron?;
- ¿qué proveedor/modelo se utilizó cuando se conoce?;
- ¿qué prompt o paquete se ejecutó?;
- ¿qué validación recibió?;
- ¿qué variante fue seleccionada?;
- ¿por qué se rechazaron otras?;
- ¿si es apto solo para uso o además candidato a referencia?

## 38. ASSET_REGISTRY

Se adopta `ASSET_REGISTRY` como registro operativo de activos producidos.

Puede contener:

- activos finales;
- variantes;
- miniaturas;
- audio;
- masters;
- exports;
- estados;
- relaciones padre/hijo;
- versión;
- ubicación o referencia de archivo;
- derechos/notas cuando el usuario los aporte.

No convierte automáticamente activos en canon.

## 39. Validación de preproducción

Antes de generar, AIIF debe comprobar:

- brief en estado suficiente;
- dependencias canónicas disponibles;
- referencias requeridas accesibles o identificadas;
- ausencia de contradicciones;
- proveedor capaz o ruta alternativa;
- formato/plataforma definidos;
- voz suficiente si se necesita audio;
- continuidad narrativa compatible;
- requisitos de producción completos.

## 40. Validador del Paquete de Producción

Se propone incorporar:

```text
VALIDADOR_DE_PAQUETE_DE_PRODUCCION
```

Posibles resultados:

```text
LISTO_PARA_PRODUCCION
LISTO_CON_OBSERVACIONES
REQUIERE_DATOS
REQUIERE_REFERENCIA
REQUIERE_ADAPTACION_DE_PLATAFORMA
BLOQUEADO_POR_CONTRADICCION
```

## 41. Validador de Producción IA

`VALIDADOR_DE_PRODUCCION_IA` ya existe en el marco transversal de AIIF. F10 define su operación práctica.

Debe orquestar comprobaciones de:

- identidad;
- fidelidad al brief;
- calidad técnica;
- coherencia visual;
- coherencia verbal;
- coherencia vocal;
- continuidad narrativa;
- formato/plataforma;
- restricciones;
- completitud del activo.

## 42. Reutilización de validadores anteriores

F10 no duplica validadores especializados.

Puede llamar, según activo:

- `VALIDADOR_DE_CONSISTENCIA_VISUAL_CON_REFERENCIAS`;
- `VALIDADOR_DE_IDENTIDAD_VISUAL`;
- `VALIDADOR_DE_IDENTIDAD_VERBAL_Y_VOZ`;
- `VALIDADOR_DE_CONSISTENCIA_DE_VOZ_CON_REFERENCIAS`;
- `VALIDADOR_DE_CONTINUIDAD_NARRATIVA`;
- `VALIDADOR_DE_COHERENCIA_DE_CONTENIDO_CON_CANON`;
- otros validadores globales aplicables.

## 43. Validador de Activo Final

Se propone:

```text
VALIDADOR_DE_ACTIVO_FINAL
```

Su función es decidir si un resultado compuesto está suficientemente completo para uso/publicación según el brief.

Resultados posibles:

```text
APROBABLE
APROBABLE_CON_OBSERVACIONES
REQUIERE_REGENERACION
REQUIERE_REEDICION
REQUIERE_DECISION_USUARIO
RECHAZAR
```

## 44. Jerarquía de validación

Un activo no debe aprobarse solo porque “se ve bien”.

Orden conceptual:

```text
1. FIDELIDAD A IDENTIDAD
2. FIDELIDAD AL BRIEF
3. CONTINUIDAD / MARCA / VOZ
4. CALIDAD TECNICA
5. COMPATIBILIDAD DE PLATAFORMA
6. PREFERENCIA ESTETICA ENTRE CANDIDATOS VALIDOS
```

La preferencia estética no debe justificar contradicciones críticas.

## 45. Taxonomía de fallos

F10 puede clasificar problemas como:

```text
IDENTITY_DRIFT
FACE_DRIFT
BODY_DRIFT
STYLE_DRIFT
WARDROBE_MISMATCH
VOICE_DRIFT
VERBAL_MISMATCH
NARRATIVE_CONTRADICTION
CONTENT_BRIEF_MISMATCH
TECHNICAL_DEFECT
MOTION_DEFECT
LIPSYNC_DEFECT
SUBTITLE_DEFECT
PLATFORM_MISMATCH
REFERENCE_MISUSE
UNKNOWN_CAUSE
```

La lista es extensible.

## 46. Severidad del fallo

Se reutiliza la severidad global:

```text
INFORMATIVO
MENOR
MODERADO
CRITICO
BLOQUEANTE
```

Un defecto menor puede permitir edición; un fallo crítico de identidad normalmente exige regeneración.

## 47. Regeneración dirigida

Cuando un resultado falla, F10 debe intentar el **cambio mínimo necesario**.

Principio:

> **No reescribir todo el prompt si el problema está localizado.**

Ejemplo conceptual:

```text
PROBLEMA = iluminacion
MANTENER = rostro + cuerpo + outfit + escena
CAMBIAR = iluminacion / parametros relacionados
```

Esto reduce deriva accidental.

## 48. REGENERATION_PLAN

Se adopta como objeto operativo:

```text
REGENERATION_PLAN
```

Puede documentar:

- fallos detectados;
- atributos a conservar;
- variables a cambiar;
- referencias que deben reforzarse;
- cambios de prompt;
- cambios de parámetros;
- necesidad o no de cambiar proveedor;
- criterio de éxito.

## 49. Cuándo editar vs regenerar

AIIF debe distinguir:

### EDITAR
Cuando el activo base es correcto y el problema puede corregirse sin alterar identidad.

### REGENERAR
Cuando el defecto pertenece a generación base: rostro, cuerpo, movimiento, composición esencial, voz equivocada, etc.

### PEDIR DECISIÓN
Cuando existen varias salidas válidas con tradeoffs reales o el cambio podría afectar canon.

## 50. Selección entre variantes

Si existen varias variantes válidas, AIIF puede compararlas según:

- fidelidad al brief;
- fidelidad a referencias;
- naturalidad;
- calidad técnica;
- fuerza editorial;
- compatibilidad de plataforma;
- continuidad;
- facilidad de edición;
- preferencia del usuario.

No se requiere un score numérico obligatorio.

## 51. Aprobación de activos

Se adopta la separación:

```text
APROBADO_PARA_USO
!=
REFERENCIA_CANONICA
!=
EVENTO_NARRATIVO_CONFIRMADO
```

Un activo puede usarse en contenido sin convertirse en referencia de identidad ni alterar la continuidad.

## 52. Promoción a referencia canónica

Si un resultado es especialmente útil como referencia:

```text
ASSET_RESULT
-> CANDIDATO_A_REFERENCIA
-> validacion F06 o F07
-> aprobacion explicita
-> referencia canonica
```

F10 no realiza la promoción silenciosamente.

## 53. Impacto narrativo después de producción

Si el brief tiene:

```text
narrative_impact = NONE | CONTEXTUAL
```

la producción no cambia el estado narrativo.

Si propone:

```text
STATE_CHANGE | CANON_CHANGE
```

F10 debe devolver el caso a F08 para confirmación conforme a sus reglas.

## 54. Publicación no equivale automáticamente a canon

Incluso si una pieza llega a publicarse, el sistema no debe asumir automáticamente que cada detalle visual o accidental pasa a ser canon.

Los hechos relevantes para continuidad deben registrarse deliberadamente.

## 55. Producción por lotes

F10 puede operar en batch cuando:

- cada pieza conserva `content_id`;
- cada job conserva dependencias;
- los resultados no se mezclan;
- la validación puede rastrear cada activo;
- los errores de una pieza no contaminan las demás.

Batch no significa usar un único prompt genérico para todo.

## 56. Consistencia entre un lote

Cuando varias piezas pertenecen a una misma sesión/campaña, F10 puede validar:

- identidad constante;
- vestuario/escena según continuidad;
- gradación/estilo compatible;
- voz consistente;
- continuidad temporal;
- diversidad suficiente;
- ausencia de clones visuales mecánicos.

## 57. Variantes por plataforma

Una pieza madre puede generar derivados:

```text
MASTER_ASSET
-> INSTAGRAM_VARIANT
-> TIKTOK_VARIANT
-> YOUTUBE_VARIANT
-> OTROS
```

Las variantes pueden cambiar:

- duración;
- crop;
- caption;
- CTA;
- subtítulos;
- portada;
- safe zones;

sin cambiar identidad ni mensaje central salvo aprobación editorial.

## 58. Control de versión

El paquete y los activos deben registrar versiones relevantes.

Ejemplo:

```text
package_v1
prompt_v3
run_04
asset_candidate_04b
final_asset_v2
```

No es obligatorio usar exactamente esta nomenclatura, pero sí mantener trazabilidad suficiente.

## 59. Cambios de proveedor

Cambiar generador no debe obligar a rediseñar el proyecto.

Flujo:

```text
MISMO CANON
+
MISMO BRIEF
+
MISMO PAQUETE UNIVERSAL
-> NUEVO ADAPTADOR
-> NUEVO PROMPT DE PROVEEDOR
```

Luego se valida el resultado contra el mismo canon.

## 60. Investigación y capacidades cambiantes

Los proveedores y capacidades pueden cambiar con el tiempo.

Por ello:

- `CAPABILITY_MAP_CURRENT` es dinámico;
- `PROVIDER_ADAPTER_PROFILE` es actualizable;
- el canon no debe depender de una función temporal de una sola plataforma;
- si se requiere información actual de una herramienta, debe verificarse al momento de uso.

## 61. Producción manual universal

En Modo Básico Universal:

```text
AIIF
1. crea el Paquete de Produccion
2. genera prompt e instrucciones
3. identifica referencias necesarias
4. el usuario copia todo al generador externo
5. genera el activo
6. guarda/exporta resultado
7. devuelve resultado a una IA compatible con validacion
8. AIIF compara con canon
9. aprueba, pide ajuste o genera REGENERATION_PLAN
```

Este flujo no requiere integración API.

## 62. Qué debe devolver el usuario desde una herramienta externa

Idealmente:

- archivo o imagen/video/audio resultante;
- proveedor/herramienta;
- modelo/modo si se conoce;
- prompt usado si fue modificado;
- seed/parámetros si están disponibles;
- referencias usadas;
- observaciones.

Pero F10 debe poder validar parcialmente aunque algunos metadatos no estén disponibles, marcando la limitación.

## 63. Referencia no disponible

Si una referencia requerida no puede trasladarse:

```text
REFERENCIA_NO_ADJUNTA
```

F10 debe explicar el impacto y no fingir que la herramienta productora la recibió.

## 64. Privacidad, licencias y procedencia

F10 debe conservar procedencia de referencias/activos cuando sea relevante.

No debe asumir automáticamente derechos de uso sobre:

- fotografías de terceros;
- voces de terceros;
- música;
- marcas;
- material protegido.

La documentación de F10 puede registrar restricciones aportadas por el usuario o proveedor, pero no sustituye asesoría jurídica.

## 65. Seguridad y restricciones de plataforma

El paquete de producción debe transportar restricciones aplicables del proyecto y de la plataforma cuando sean conocidas.

Una limitación de herramienta debe gestionarse mediante adaptación o alternativa, no mediante alteración silenciosa del canon.

## 66. Criterio de finalización de un trabajo

Un `PRODUCTION_JOB` puede cerrarse cuando:

- los activos requeridos existen;
- fueron validados;
- las observaciones aceptadas están registradas;
- existe aprobación suficiente para uso;
- los archivos finales están identificados;
- metadatos mínimos están registrados;
- cualquier impacto narrativo/canónico pendiente fue remitido a la fase correspondiente.

## 67. Estructura del resultado de validación

```json
{
  "production_validation": {
    "production_id": "[ID]",
    "asset_id": "[ID]",
    "result": "APROBABLE|REQUIERE_REGENERACION|REQUIERE_REEDICION|REQUIERE_DECISION_USUARIO|RECHAZAR",
    "issues": [
      {
        "type": "[TIPO]",
        "severity": "[SEVERIDAD]",
        "evidence": "[DESCRIPCION]",
        "recommended_action": "[ACCION]"
      }
    ],
    "canon_change_required": false,
    "candidate_for_reference": false
  }
}
```

## 68. Política de Validación de Producción

`PRODUCTION_VALIDATION_POLICY_CANON` debe fijar principios como:

- validar contra el alcance real del brief;
- usar solo referencias aplicables;
- no exigir invariancia donde F06/F07 permiten variación;
- distinguir error técnico de cambio identitario;
- priorizar fallos críticos;
- no convertir gusto subjetivo en contradicción canónica;
- mantener evidencia y trazabilidad;
- permitir aprobación con observaciones cuando no exista defecto bloqueante.

## 69. Aprobación humana

La aprobación de un activo puede ser explícita, por ejemplo:

```text
"Aprueba esta imagen para usarla en la pieza."
"Este video queda aprobado para publicar."
"Usa la variante B como activo final."
```

Esto no significa:

```text
REFERENCIA_CANONICA
CANON_CHANGE
```

salvo instrucción explícita adicional.

## 70. Regla de no autocanonización

Ningún resultado generado puede convertirse automáticamente en:

- rostro canónico;
- cuerpo canónico;
- referencia canónica;
- identidad vocal canónica;
- nuevo hecho biográfico;
- nuevo evento narrativo;
- nuevo pilar;
- nueva regla de marca.

## 71. Revalidación hacia atrás

Si F10 detecta un problema estructural real, debe marcar la dependencia afectada:

```text
F06_REQUIERE_REVISION
F07_REQUIERE_REVISION
F08_REQUIERE_REVISION
F09_REQUIERE_REVISION
```

El sistema conserva el trabajo existente y abre revisión controlada; no borra resultados automáticamente.

## 72. Revalidación hacia adelante

Los activos y aprendizajes de F10 pueden alimentar:

- F11: capacidad real para piezas comerciales;
- F12: pruebas de formato, frecuencia y performance;
- F13: consolidación de manuales, perfiles y paquetes portables.

El rendimiento comercial o algorítmico no debe cambiar F10 automáticamente; F12 procesa aprendizajes de crecimiento.

## 73. Etapas internas del subsistema

F10 utiliza etapas internas `PR00-PR22`:

```text
PR00 - Recibir brief aprobado
PR01 - Cargar dependencias canonicas
PR02 - Construir plan de activos
PR03 - Detectar capacidades de plataforma
PR04 - Seleccionar ruta integrada / externa / hibrida
PR05 - Construir Paquete de Produccion universal
PR06 - Componer prompt de imagen cuando aplique
PR07 - Componer prompt de video cuando aplique
PR08 - Preparar voz / audio cuando aplique
PR09 - Aplicar Adaptador de Proveedor
PR10 - Ejecutar validacion de preproduccion
PR11 - Generar o enviar a produccion externa
PR12 - Recibir resultados
PR13 - Registrar metadatos y runs
PR14 - Validar identidad visual
PR15 - Validar voz / verbal cuando aplique
PR16 - Validar narrativa y brief editorial
PR17 - Ejecutar Validador de Produccion IA
PR18 - Clasificar fallos
PR19 - Aprobar / editar / regenerar / pedir decision
PR20 - Finalizar montaje y exportacion
PR21 - Registrar activo final y candidatos derivados
PR22 - Cerrar job, historial y puente a F11/F12/F13
```

Estas etapas son internas.

## 74. Algoritmo operativo general

```text
INPUT: Brief F09 aprobado + canon aplicable

1. validar brief y dependencias
2. decidir activos requeridos
3. detectar capacidades de la herramienta
4. seleccionar ruta de ejecucion
5. construir Production Package
6. derivar prompts / instrucciones
7. adaptar a proveedor
8. preflight
9. producir
10. recibir y registrar resultados
11. ejecutar validadores especializados
12. ejecutar VALIDADOR_DE_PRODUCCION_IA
13. clasificar problemas
14. si problema localizado -> REGENERATION_PLAN minimo
15. si candidato valido -> comparar variantes
16. esperar/aplicar aprobacion para uso
17. editar/ensamblar/exportar si aplica
18. registrar activo final
19. si candidato a referencia -> enviar a F06/F07
20. si impacto narrativo -> enviar a F08
21. preservar historial y metadatos
22. cerrar job
```

## 75. Matriz mínima de tipos de activo

| Tipo | Fuente principal | Validación primaria | Resultado |
|---|---|---|---|
| Imagen | F06 + F09 + F08 | visual + brief | imagen aprobada/rechazada |
| Video | F06 + F08 + F09 | visual + movimiento + narrativa | clip aprobado/rechazado |
| Voz | F07 + F09 | voz + pronunciación + guion | audio aprobado/rechazado |
| Lip-sync | F06 + F07 + audio | sincronía + identidad | clip sincronizado |
| Pieza compuesta | F06-F09 | producción integral | master final |

## 76. Matriz mínima de problemas y acción

| Problema | Acción preferida |
|---|---|
| identidad correcta, color leve incorrecto | editar o regeneración mínima |
| rostro incorrecto | regenerar reforzando referencias aplicables |
| mensaje editorial incorrecto | volver a F09 / corregir brief |
| evento narrativo contradictorio | volver a F08 |
| voz inconsistente | revisar F07 / proveedor / referencia |
| crop incorrecto | reeditar |
| proveedor sin capacidad | cambiar adaptador/ruta |
| referencia ausente | adjuntar o declarar limitación |

## 77. Niveles de profundidad

F10 reutiliza:

```text
NUCLEO
AMPLIADO
PROFUNDO
```

### NÚCLEO
Producción de una pieza con paquete mínimo y validación esencial.

### AMPLIADO
Incluye alternativas, metadatos, validación completa y registro de activo.

### PROFUNDO
Incluye batch, múltiples proveedores, comparativas, control fino de versiones y análisis extendido de consistencia.

El nivel no debe reducir requisitos de seguridad o identidad crítica.

## 78. Modos de trabajo

F10 hereda:

```text
GUIADO
COLABORATIVO
EXPERTO
```

En modo experto, AIIF puede tomar decisiones operativas reversibles sin preguntar cada parámetro, pero no puede cambiar canon bloqueado ni promover referencias sin aprobación.

## 79. Compatibilidad con tiempo y recursos

F10 debe adaptar complejidad a:

- horas disponibles;
- número de publicaciones;
- herramientas;
- presupuesto cuando el usuario lo indique;
- capacidad manual;
- necesidad de batch;
- nivel de calidad requerido.

No debe diseñar un pipeline imposible de operar.

## 80. Portabilidad

El estado F10 debe incluirse, cuando corresponda, en:

- Paquete Portable Completo;
- Paquete Portable Ligero;
- Archivo Universal de Reanudación.

Puede incluir:

- `AI_PRODUCTION_SYSTEM_CANON`;
- `PRODUCTION_PACKAGE_SCHEMA_CANON`;
- `PRODUCTION_PROMPT_RULES_CANON`;
- `PRODUCTION_VALIDATION_POLICY_CANON`;
- plantillas de Production Package;
- jobs activos;
- assets finales identificados;
- provider adapters útiles;
- `MASTER_AVATAR_PROMPT_CURRENT`;
- reglas de regeneración;
- historial relevante;
- pendientes;
- próxima acción.

Los archivos multimedia pesados pueden almacenarse fuera del texto portable; el paquete debe conservar referencias suficientes.

## 81. Entregable oficial

El entregable oficial de F10 sigue siendo:

# Sistema / Manual de Producción IA

Debe contener como mínimo:

1. propósito y fronteras;
2. arquitectura Diseño / Producción / Validación;
3. dependencias canónicas;
4. esquema de Production Job;
5. esquema de Paquete de Producción;
6. reglas de construcción de prompts;
7. imagen;
8. video;
9. voz/audio;
10. lip-sync/edición;
11. adaptadores y capacidades;
12. flujo externo universal;
13. registro de runs y activos;
14. validadores;
15. taxonomía de fallos;
16. regeneración dirigida;
17. aprobación de activos;
18. portabilidad;
19. Prompt Maestro de Recreación vigente;
20. versionado e historial.

## 82. Archivos técnicos complementarios

F10 puede complementarse con:

```text
production-system.json
production-package-template.json
production-job.json
provider-adapters.json
asset-registry.json
production-validation.json
master-avatar-prompt.md
```

cuando aporten valor.

## 83. Política de idioma

Se mantiene:

```text
IDIOMA_CANONICO_DOCUMENTAL = ES
```

Los IDs técnicos pueden permanecer en inglés por interoperabilidad.

Los prompts pueden generarse en el idioma más apropiado para la herramienta, de acuerdo con `IDIOMA_PROMPT_IMAGEN` y `IDIOMA_PROMPT_VIDEO`, sin cambiar el idioma documental del sistema.

## 84. UX simplificada

La experiencia visible recomendada:

```text
PIEZA APROBADA
-> PREPARAR PRODUCCION
-> GENERAR
-> VALIDAR
-> AJUSTAR SI HACE FALTA
-> APROBAR ACTIVO
-> EXPORTAR / REGISTRAR
```

El usuario no necesita conocer `PR00-PR22`.

## 85. Mapeo de la fuente experta a F10

| Elemento fuente experta | Tratamiento en AIIF F10 |
|---|---|
| Prompts de imagen coherentes | prompts derivados de F06/F08/F09 + adaptación de proveedor |
| Prompts de video | paquetes y prompts de video derivados del brief/canon |
| Reglas de consistencia | validadores + políticas + referencias + regeneración dirigida |
| Prompt Maestro definitivo | `MASTER_AVATAR_PROMPT_CURRENT`, derivado y versionado |
| Avatar recreable en cualquier IA | Paquete universal + adaptador de proveedor + validación |
| Coherencia total | trazabilidad de dependencias y validación multimodal |

## 86. Decisiones propuestas para aprobación

Esta versión propone aprobar como arquitectura de F10:

1. F10 como sistema de ejecución, no de rediseño.
2. Separación formal Diseño / Producción / Validación dentro del flujo AIIF.
3. `AI_PRODUCTION_SYSTEM_CANON`.
4. `PRODUCTION_PACKAGE_SCHEMA_CANON`.
5. `PRODUCTION_PROMPT_RULES_CANON`.
6. `PRODUCTION_VALIDATION_POLICY_CANON`.
7. `PRODUCTION_JOB`.
8. `PRODUCTION_PACKAGE`.
9. `PRODUCTION_RUN`.
10. `ASSET_RESULT`.
11. `ASSET_REGISTRY`.
12. `PROVIDER_ADAPTER_PROFILE`.
13. `CAPABILITY_MAP_CURRENT`.
14. `MASTER_AVATAR_PROMPT_CURRENT` como derivado, no fuente de verdad.
15. rutas integrada / externa / híbrida.
16. flujo universal de producción externa y retorno.
17. `VALIDADOR_DE_PAQUETE_DE_PRODUCCION`.
18. implementación operativa de `VALIDADOR_DE_PRODUCCION_IA`.
19. `VALIDADOR_DE_ACTIVO_FINAL`.
20. taxonomía de fallos.
21. `REGENERATION_PLAN` con principio de cambio mínimo.
22. separación `APROBADO_PARA_USO != REFERENCIA_CANONICA != EVENTO_NARRATIVO_CONFIRMADO`.
23. etapas internas `PR00-PR22`.
24. portabilidad de paquetes y trazabilidad de activos.
25. entregable oficial Sistema / Manual de Producción IA.

## 87. Principio final propuesto

> **AI Influencer Factory debe poder producir activos consistentes aunque la plataforma conversacional no disponga de generación nativa. F10 debe recibir un brief aprobado, construir un Paquete de Producción autocontenido, derivar prompts e instrucciones desde el canon, adaptar la ejecución a las capacidades reales del proveedor, registrar resultados y parámetros disponibles, validar cada activo contra identidad, narrativa y objetivo editorial, y aplicar regeneración dirigida cuando exista deriva. Los prompts, IDs de proveedor y resultados generados son implementaciones del canon, no fuentes de verdad. Un activo aprobado para uso no se convierte automáticamente en referencia canónica ni en evento narrativo confirmado.**

## 88. Estado de esta especificación

```text
ESTADO_DOCUMENTAL = APROBADA
```

Esta especificación forma parte de la baseline comercial aprobada de AI Influencer Factory (Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17). La auditoría pre-freeze ya había señalado (hallazgo H02) que su estado anterior, `PROPUESTA_LISTA_PARA_APROBACION`, quedó desactualizado: el texto se redactó antes de la aprobación de F10.

Por eso la IA debe tratar los sistemas, identificadores, etapas internas y validadores definidos aquí como reglas vigentes de F10, no como propuestas.

Aprobar la especificación no aprueba datos de ningún proyecto. Cada objeto canónico de un influencer concreto sigue necesitando su propia aprobación explícita del usuario, según las reglas de este documento.

La versión con el estado anterior se conserva en `90_HISTORICO_Y_LEGACY/Versiones_Anteriores/v1.0/10_F10_PRODUCCION_IA/AI_INFLUENCER_FACTORY_Especificacion_General_Produccion_IA_v1.0.md`, sin precedencia vigente.
