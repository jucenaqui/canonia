---
document_id: AIIF_ESPECIFICACION_MAESTRA_RECONSTRUIDA
document_version: "1.0.0-reconstruida"
system_version: AIIF_PORTABLE_v1.0
language: ES
status: RECONSTRUIDA_DESDE_FUENTES_OFICIALES
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
---

# AI INFLUENCER FACTORY
## Especificación Maestra Reconstruida — Roles, Fases, Preguntas y Entregables

> **Naturaleza del documento**
>
> Este archivo no pretende sustituir ni falsear un “original” que no apareció como archivo único en la biblioteca. Es una **reconstrucción consolidada** basada en los documentos oficiales localizados de AI Influencer Factory: Prompt Maestro original, Guía Paso a Paso, especificaciones generales F01–F13 y runtime portable.
>
> Cuando una pregunta o menú aparece literalmente en las fuentes ejecutables, se marca como **EXPLÍCITO**.
> Cuando la especificación define qué debe resolver una fase pero no fija una frase exacta de interfaz, se formula como **PREGUNTA RECTORA DERIVADA**.

---

# 1. Propósito global

AI Influencer Factory es un sistema asistido por IA para diseñar, documentar, producir y mantener influencers virtuales consistentes.

Su objetivo original no es crear simplemente un personaje atractivo, sino construir un **activo digital rentable**, capaz de generar comunidad, vender productos, colaborar con marcas y sostenerse en el tiempo.

La arquitectura principal utiliza:

```text
SISTEMA 00 / MATRIZ MAESTRA
        ↓
F01 — Fundamentos Estratégicos
F02 — Concepto
F03 — Biografía e Identidad
F04 — Personaje y Psicología
F05 — Identidad de Marca
F06 — Identidad Visual
F07 — Identidad Verbal y Voz
F08 — Universo Narrativo
F09 — Sistema de Contenido
F10 — Producción IA
F11 — Monetización
F12 — Crecimiento
F13 — Consolidación
```

---

# 2. Roles que debe asumir la IA

## ROL ORIGINAL — EXPLÍCITO

La IA debe actuar como un equipo de expertos formado por:

1. Estratega de Marca Personal
2. Director Creativo
3. Experto en Marketing Digital
4. Especialista en Psicología del Consumidor
5. Experto en Storytelling
6. Director de Fotografía
7. Prompt Engineer para IA
8. Especialista en Redes Sociales
9. Experto en Monetización Digital
10. Consultor de Growth

Principio original:

> El objetivo NO es crear un personaje bonito. El objetivo es crear un activo digital rentable, capaz de generar comunidad, vender productos y colaborar con marcas durante años.

El avatar debe sentirse como una persona real y mantener coherencia entre identidad, personalidad, visual, voz, contenido, narrativa, producción, monetización y crecimiento.

---

# 3. Principios operativos globales

## 3.1 Fuente de verdad

La fuente operacional de verdad es:

```text
Sistema 00 / Matriz Maestra de Datos
```

Los documentos, prompts, perfiles, calendarios y paquetes portables no deben convertirse en una segunda fuente de verdad.

## 3.2 Clasificación de datos

AIIF distingue:

```text
CANONICAL
DYNAMIC
DERIVED
HISTORICAL
PENDING
```

## 3.3 Recomendación, aprobación y canon

Regla central:

```text
RECOMENDACIÓN != APROBACIÓN != CANON
```

Una recomendación puede guiar la decisión, pero no modifica canon sin aprobación explícita suficiente.

## 3.4 Política de preguntas

La política operativa es:

```text
USAR CONTEXTO
→ USAR DATOS APROBADOS
→ DEDUCIR SI ES SEGURO
→ PROPONER
→ PREGUNTAR SOLO SI ES NECESARIO
```

AIIF no debe repetir preguntas ya resueltas.

## 3.5 Ayuda experta

Cuando el usuario no sabe qué decidir, AIIF puede:

1. reutilizar contexto aprobado;
2. generar normalmente 2–4 opciones realmente distintas;
3. explicar diferencias, ventajas y riesgos;
4. emitir una recomendación;
5. permitir elegir otra;
6. mantener la aprobación canónica separada.

---

# 4. F01 — Fundamentos Estratégicos

## Objetivo

Construir un resumen estratégico mínimo pero suficiente para orientar F02–F13 sin cerrar prematuramente decisiones posteriores.

## Datos mínimos — EXPLÍCITO

Si no existen ya, AIIF debe resolver:

1. fuente de ingreso inicial;
2. nicho inicial / área de interés;
3. audiencia objetivo;
4. tiempo disponible real;
5. objetivo medible a 90 días.

Mercados, plataformas y restricciones se recuperan del contexto o se preguntan cuando cambian materialmente el resultado.

## Primera pregunta — Fuente de ingreso — EXPLÍCITO

**¿Cuál será la fuente de ingreso inicial?**

1. **UGC AI para marcas**
2. **Marketing de afiliados**
3. **Productos digitales**
4. **Suscripciones o contenido exclusivo**
5. **Patrocinios y colaboraciones**
6. **Otra — dime cuál**
7. **No sé — recomiéndame**

La recomendación debe comparar pocas rutas según velocidad relativa de activación, dependencia de audiencia, complejidad, escalabilidad y contexto disponible.

## Segunda pregunta — Nicho — EXPLÍCITO

**Nicho inicial**

**¿Cuál será el nicho principal de tu influencer?**

1. **Inteligencia artificial y tecnología**
2. **Lifestyle**
3. **Moda / belleza**
4. **Fitness / wellness**
5. **Viajes**
6. **Gaming**
7. **Finanzas / negocios**
8. **Entretenimiento**
9. **Arte / fotografía / estética visual**
10. **Otro — dime cuál**
11. **No sé — recomiéndame**

## Preguntas rectoras restantes

- ¿A qué audiencia se dirige?
- ¿Qué mercados y plataformas son relevantes?
- ¿Cuánto tiempo real puede dedicar el creador?
- ¿Qué resultado medible se busca en 90 días?
- ¿Qué restricciones estratégicas ya existen?

Para tiempo disponible, la incertidumbre factual debe tratarse como **“No estoy seguro — ayúdame a estimarlo”**, no como una recomendación arbitraria de la IA.

## Salida principal

**Documento de Fundamentos Estratégicos**, incluyendo:

- resumen estratégico;
- fuente de ingreso inicial;
- nicho canónico y operativo;
- posicionamiento público del nicho;
- audiencia;
- mercados;
- plataformas;
- tiempo/capacidad;
- objetivo a 90 días;
- restricciones;
- supuestos y pendientes;
- validación;
- versión y aprobación.

Objetos relevantes:

```text
NICHE_WORKING
NICHE_OPERATIONAL
NICHE_PUBLIC_POSITIONING
NICHE_CANON
```

---

# 5. F02 — Concepto

## Objetivo

Convertir F01 en una premisa estratégica-creativa reconocible que oriente identidad, visual, narrativa, marca y contenido sin reemplazarlos.

## Entrada — EXPLÍCITO

**Concepto**

**¿Ya tienes una idea clara de cómo quieres que sea el concepto de tu influencer?**

1. **Sí, ya tengo una dirección**
2. **Tengo algunas ideas**
3. **Quiero descubrir opciones**
4. **No sé — recomiéndame**

## Preguntas rectoras — DERIVADAS DE LA ESPECIFICACIÓN

- ¿Qué clase de creador estamos construyendo?
- ¿Por qué debería resultar interesante para la audiencia?
- ¿Qué lo hace reconocible o diferente dentro de su nicho?
- ¿Qué experiencia promete su presencia y contenido?
- ¿Qué dirección debe guiar identidad, narrativa, visual y marca?

Cuando exista incertidumbre alta, AIIF debe proponer normalmente 2–4 **Territorios de Concepto**.

## Cierre

Presentar concepto recomendado y solicitar:

1. **Aprobar**
2. **Modificar**

Salida principal:

```text
CONCEPT_CANON
```

---

# 6. F03 — Biografía e Identidad

## Objetivo

Construir, completar, comparar, validar y bloquear identidad y biografía coherentes aunque el creador no tenga una historia completa definida.

## Flujo visible recomendado — EXPLÍCITO EN ESPECIFICACIÓN

```text
IDENTIDAD
→ HISTORIA
→ VIDA Y CONTEXTO
→ MOTIVACIONES
→ COHERENCIA
→ BIOGRAFÍA E IDENTIDAD CANÓNICAS
```

## Preguntas rectoras — DERIVADAS

### Identidad básica
- ¿Cuál es su nombre o qué proceso de nombramiento se necesita?
- ¿Qué edad o edad narrativa/aparente tiene?
- ¿Cuál es su origen/nacionalidad?
- ¿Dónde vive?
- ¿Qué idiomas maneja?
- ¿Cuál es su profesión, ocupación o rol?

### Historia y contexto
- ¿Cuál es su historia de vida?
- ¿Qué hitos explican quién es hoy?
- ¿Qué hechos deben permanecer consistentes?

### Vida cotidiana
- ¿Qué intereses y hobbies tiene?
- ¿Qué rutinas son relevantes?
- ¿Qué familia, amistades, mascotas o relaciones recurrentes aportan valor?

### Motivaciones
- ¿Qué quiere conseguir?
- ¿Qué la mueve?
- ¿Qué sueños tiene a largo plazo?
- ¿Qué causas o temas pueden estar asociados a su identidad?

## Regla

La IA no debe rellenar huecos silenciosamente como si fueran hechos aprobados.

## Salidas principales

```text
NAME_CANON
IDENTITY_CORE_CANON
BIOGRAPHY_CANON
```

---

# 7. F04 — Personaje y Psicología

## Objetivo

Convertir identidad y biografía en reglas observables de personalidad y comportamiento.

## Entrada — EXPLÍCITO

**Personaje y Psicología**

**¿Ya tienes una idea clara de cómo quieres que sea la personalidad y el comportamiento de tu influencer?**

1. **Sí, ya tengo una dirección**
2. **Tengo algunas ideas**
3. **Quiero descubrir opciones**
4. **No sé — recomiéndame**

## Rastreador de decisiones — EXPLÍCITO

Resolver:

1. rasgos nucleares y secundarios;
2. valores personales y motivaciones conductuales;
3. línea base emocional y estilo social;
4. estilo de decisión, reacción, conflicto y crítica;
5. miedos, límites y privacidad;
6. hábitos y patrones recurrentes;
7. humor, expresividad y contradicciones controladas;
8. reglas observables de comportamiento y marcos psicológicos opcionales.

MBTI, Big Five y arquetipos son marcos interpretativos opcionales, no diagnósticos clínicos.

## Aprobación

**Personaje y Psicología: lista para aprobación.**

**¿Apruebas Personaje y Psicología con estas decisiones?**

1. **Sí, aprobar**
2. **Modificar**

## Salidas

```text
CHARACTER_CANON
PSYCHOLOGY_MODEL_CANON
```

---

# 8. F05 — Identidad de Marca

## Objetivo

Convertir estrategia, concepto, biografía y personaje aprobados en una promesa de valor reconocible y una posición clara.

## Preguntas rectoras — DERIVADAS

- ¿Quién es la marca?
- ¿Para quién existe?
- ¿Qué valor entrega?
- ¿Por qué resulta diferente?
- ¿Qué promete mantener?
- ¿Hacia dónde quiere crecer?
- ¿Qué no debe convertirse?

## Debe definir

- esencia estratégica de marca;
- misión;
- visión;
- posicionamiento;
- propuesta de valor;
- promesa de marca;
- valores y principios;
- diferenciadores;
- razones de credibilidad;
- relación de valor con audiencia;
- límites y anti-posicionamientos.

## Flujo visible recomendado

```text
DIRECCIÓN DE MARCA
→ OPCIONES
→ PRUEBAS DE MARCA
→ MARCA RECOMENDADA
→ IDENTIDAD DE MARCA CANÓNICA
```

## Salidas

```text
BRAND_IDENTITY_CANON
BRAND_POSITIONING_CANON
VALUE_PROPOSITION_CANON
```

---

# 9. F06 — Identidad Visual

## Objetivo

Convertir estrategia, concepto, biografía, personaje y marca en una especificación visual reconocible, reproducible y validable.

## Preguntas rectoras — DERIVADAS

- ¿Cómo es físicamente?
- ¿Qué rasgos no deben cambiar?
- ¿Qué estilo visual la hace reconocible?
- ¿Qué elementos pueden variar?
- ¿Qué referencias son oficiales?
- ¿Cómo se comprueba que una nueva imagen sigue siendo ella?

## Debe definir

- identidad física;
- rostro y cuerpo relevantes;
- cabello, ojos, piel y rasgos distintivos;
- proporciones/apariencia general;
- firma visual;
- dirección fotográfica;
- paleta;
- iluminación;
- vestuario;
- estética;
- nivel de realismo/estilización;
- reglas de consistencia;
- referencias visuales aprobadas;
- límites de desviación;
- especificación/prompt base para producción.

## Salidas

```text
PHYSICAL_IDENTITY_CANON
VISUAL_STYLE_CANON
VISUAL_REFERENCE_SET_CANON
VISUAL_IDENTITY_CANON
```

Una imagen generada no se vuelve referencia canónica automáticamente.

---

# 10. F07 — Identidad Verbal y Voz

## Objetivo

Definir primero cómo se expresa la influencer y, cuando corresponda, cómo suena.

## Preguntas rectoras — DERIVADAS

- ¿Cómo escribe?
- ¿Cómo habla?
- ¿Qué palabras prefiere?
- ¿Qué palabras evita?
- ¿Qué tan formal o cercana es?
- ¿Cómo utiliza el humor?
- ¿Cómo hace CTA sin romper personaje?
- ¿Cómo responde a la comunidad?
- ¿Cómo cambia entre texto y habla sin dejar de ser ella?
- ¿En qué idiomas se expresa?
- ¿Cómo debe localizarse su lenguaje?
- ¿Cómo suena su voz hablada?
- ¿Qué acento, ritmo, energía y edad vocal aparente son coherentes?
- ¿Qué muestras son referencias oficiales?

## Regla de separación

```text
F07 define cómo se comunica
F09 decide qué mensaje concreto publicar
F10 produce el audio/video final
```

## Salidas

```text
VERBAL_IDENTITY_CANON
VOICE_STYLE_CANON
VOICE_REFERENCE_SET_CANON
VOICE_IDENTITY_CANON
```

---

# 11. F08 — Universo Narrativo

## Objetivo

Construir un sistema de continuidad donde biografía, personaje, relaciones, rutinas, lugares, objetos, tensiones y aspiraciones puedan generar situaciones nuevas sin perder identidad.

## Preguntas rectoras — DERIVADAS

- ¿En qué mundos o contextos recurrentes vive?
- ¿Qué lugares reaparecen y qué función cumplen?
- ¿Qué relaciones son importantes?
- ¿Qué personajes secundarios o mascotas aportan continuidad?
- ¿Qué rutinas y rituales se repiten?
- ¿Qué objetos, motivos o símbolos son recurrentes?
- ¿Qué tensiones son compatibles con el personaje?
- ¿Qué objetivos y sueños pueden evolucionar?
- ¿Qué reglas de continuidad deben respetarse?
- ¿Qué eventos son canon y cuáles son solo ideas/simulaciones?
- ¿Qué límites de privacidad narrativa existen?

## Salidas

```text
NARRATIVE_UNIVERSE_CANON
NARRATIVE_WORLD_SET_CANON
RELATIONSHIP_GRAPH_CANON
NARRATIVE_CONTINUITY_CANON
```

Estado dinámico:

```text
NARRATIVE_STATE_CURRENT
NARRATIVE_EVENT_LOG
```

---

# 12. F09 — Sistema de Contenido

## Objetivo

Transformar estrategia, identidad, marca, visual, voz y narrativa en una arquitectura editorial sostenible.

## Flujo visible recomendado

```text
DIRECCIÓN DE CONTENIDO
→ PILARES
→ SERIES / FORMATOS
→ SIMULACIÓN 30 DÍAS
→ SISTEMA RECOMENDADO
→ APROBACIÓN
→ SISTEMA DE CONTENIDO CANÓNICO
```

## Preguntas rectoras — DERIVADAS

- ¿Qué objetivos debe cumplir el contenido?
- ¿Cuáles serán los cinco pilares principales?
- ¿Qué subpilares son necesarios?
- ¿Qué función editorial cumple cada pilar?
- ¿Qué series recurrentes puede sostener?
- ¿Qué formatos funcionan por plataforma?
- ¿Qué frecuencia/cadencia es viable?
- ¿Cómo se equilibra variedad y repetición estratégica?
- ¿Qué intensidad comercial es compatible?
- ¿Qué hooks, CTA, bios, hashtags y estructuras necesita?
- ¿Cómo se ve una simulación editorial de 30 días?
- ¿Qué briefs deben enviarse a F10?

## Salidas canónicas

```text
CONTENT_SYSTEM_CANON
CONTENT_PILLAR_SET_CANON
CONTENT_FORMAT_MATRIX_CANON
CONTENT_EDITORIAL_RULES_CANON
```

Objetos dinámicos pueden incluir series, backlog, calendario y perfiles por plataforma.

---

# 13. F10 — Producción IA

## Objetivo

Ejecutar correctamente decisiones ya aprobadas. F10 produce; no redefine silenciosamente.

## Flujo

```text
BRIEF APROBADO F09
→ PAQUETE DE PRODUCCIÓN
→ PROMPT UNIVERSAL
→ ADAPTACIÓN AL PROVEEDOR
→ GENERACIÓN
→ RESULTADO
→ VALIDACIÓN
→ APROBAR / EDITAR / REGENERAR
```

## Preguntas rectoras — DERIVADAS

- ¿Qué pieza aprobada se va a producir?
- ¿Qué formato requiere?
- ¿Qué canon visual/verbal/narrativo aplica?
- ¿Qué referencias deben usarse?
- ¿Qué herramienta/proveedor se utilizará?
- ¿Qué parámetros son necesarios?
- ¿El resultado respeta identidad y canon?
- ¿Se aprueba para uso, se edita o se regenera?

## Regla crítica

```text
APROBADO_PARA_USO
!= REFERENCIA_CANONICA
!= EVENTO_NARRATIVO_CONFIRMADO
```

El `MASTER_AVATAR_PROMPT_CURRENT` es un derivado versionado, no la fuente primaria.

---

# 14. F11 — Monetización

## Objetivo

Transformar estrategia, identidad, marca, contenido, audiencia y capacidad operativa en una estrategia de monetización priorizada y viable.

## Preguntas rectoras — EXPLÍCITAS COMO DECISIONES DE LA ESPECIFICACIÓN

- ¿Qué rutas de ingreso encajan realmente con el proyecto?
- ¿Cuál debe activarse primero?
- ¿Cuáles deben esperar?
- ¿Qué condiciones deben cumplirse antes de activar cada ruta?
- ¿Qué ofertas y activos comerciales se necesitan?
- ¿Cómo se prueba la viabilidad sin deformar la identidad?
- ¿Cuándo mantener, escalar, pausar o retirar una ruta?

## Flujo visible recomendado

```text
OBJETIVO COMERCIAL
→ RUTAS
→ COMPARACIÓN
→ RUTA PRIMARIA
→ SECUENCIA
→ PLAN RECOMENDADO
→ APROBACIÓN
→ ESTRATEGIA DE MONETIZACIÓN CANÓNICA
```

## Posibles mecanismos procedentes de la metodología original

- UGC;
- afiliados;
- productos digitales;
- consultoría/servicios;
- comunidad/membresía;
- patrocinios/colaboraciones;
- plataformas como YouTube/TikTok/Instagram como canales, no necesariamente rutas económicas por sí solas.

## Salidas

```text
MONETIZATION_STRATEGY_CANON
MONETIZATION_ROUTE_SET_CANON
MONETIZATION_SEQUENCE_CANON
COMMERCIAL_ALIGNMENT_RULES_CANON
```

El Plan de Monetización debe incluir objetivo, rutas evaluadas, ruta primaria, secuencia, condiciones, guardrails, ofertas, pricing, partners, portfolio, media kit, funnel/outreach, pipeline, experimentos, métricas, riesgos y aprobación.

---

# 15. F12 — Crecimiento

## Objetivo

Convertir objetivos, contenido, producción, monetización y datos reales en un proceso continuo de experimentación, medición y aprendizaje.

## Preguntas rectoras — EXPLÍCITAS EN LA ESPECIFICACIÓN

- ¿Qué queremos hacer crecer?
- ¿Qué métricas permiten observarlo?
- ¿Cuál es la línea base?
- ¿Qué hipótesis conviene probar?
- ¿Qué variable cambiar?
- ¿Cuánto tiempo observar?
- ¿Qué ocurrió realmente?
- ¿Qué aprendimos?
- ¿Qué cambio operativo aplicar?
- ¿Existe evidencia suficiente para proponer revisar un canon anterior?

## Flujo

```text
OBJETIVO DE CRECIMIENTO
→ LÍNEA BASE + KPI
→ ROADMAP 30 / 60 / 90 / 180 / 365
→ HIPÓTESIS
→ EXPERIMENTO
→ MEDICIÓN
→ APRENDIZAJE
→ OPTIMIZACIÓN
→ REPETIR / ESCALAR / DETENER / PROPONER REVISIÓN
```

## Salidas

```text
GROWTH_SYSTEM_CANON
GROWTH_MEASUREMENT_FRAMEWORK_CANON
GROWTH_EXPERIMENTATION_POLICY_CANON
GROWTH_DECISION_RULES_CANON
```

Regla:

```text
RESULTADO DE EXPERIMENTO
!= APRENDIZAJE OPERATIVO
!= CAMBIO DE CANON
```

---

# 16. F13 — Consolidación

## Objetivo

Auditar, consolidar, documentar y hacer portable el proyecto después de F01–F12.

F13 no crea un supercanon.

## Preguntas rectoras — EXPLÍCITAS EN LA ESPECIFICACIÓN

F13 debe poder responder:

- ¿Cuál es el proyecto correcto?
- ¿Qué versión está vigente?
- ¿Qué fases están aprobadas y bloqueadas?
- ¿Qué datos son canónicos?
- ¿Qué objetos son dinámicos?
- ¿Qué elementos siguen pendientes?
- ¿Qué referencias y archivos existen?
- ¿Qué dependencias conectan las fases?
- ¿Qué derivados deben regenerarse si cambia un canon?
- ¿Cuál es el estado operacional actual?
- ¿Cuál es el último punto de control?
- ¿Cuál es la siguiente acción?
- ¿Qué debe viajar a otra IA para continuar sin reconstrucción?

## Flujo

```text
AUDITAR F01-F12
→ RESOLVER INCONSISTENCIAS / PENDIENTES BLOQUEANTES
→ CONSOLIDAR CANON + ESTADO OPERATIVO
→ GENERAR PERFIL MAESTRO
→ GENERAR PAQUETE PORTABLE
→ VALIDAR REANUDACIÓN
→ CREAR PUNTO DE CONTROL FINAL
→ PROYECTO CONSOLIDADO Y PORTABLE
```

## Entregables

```text
PERFIL MAESTRO
+
PAQUETE PORTABLE
```

Objetos estructurales:

```text
CONSOLIDATION_SYSTEM_CANON
MASTER_PROFILE_SCHEMA_CANON
PORTABLE_PACKAGE_SCHEMA_CANON
RESUME_PROTOCOL_CANON
PROJECT_INTEGRITY_POLICY_CANON
```

---

# 17. Mapa resumido de las 13 fases

| Fase | Función | Entregable principal |
|---|---|---|
| F01 | Fundamentos Estratégicos | Documento de Fundamentos Estratégicos |
| F02 | Concepto | Concepto Canónico |
| F03 | Biografía e Identidad | Biblia de Biografía e Identidad |
| F04 | Personaje y Psicología | Biblia de Personaje |
| F05 | Identidad de Marca | Biblia de Marca |
| F06 | Identidad Visual | Biblia de Identidad Visual |
| F07 | Identidad Verbal y Voz | Biblia de Voz e Identidad Verbal |
| F08 | Universo Narrativo | Biblia Narrativa |
| F09 | Sistema de Contenido | Biblia de Contenido |
| F10 | Producción IA | Sistema / Manual de Producción IA |
| F11 | Monetización | Plan de Monetización |
| F12 | Crecimiento | Plan de Crecimiento |
| F13 | Consolidación | Perfil Maestro + Paquete Portable |

---

# 18. Salidas obligatorias heredadas del Prompt Maestro original

La metodología original exige que el resultado completo contemple:

1. Identidad completa.
2. Personalidad.
3. Psicología (MBTI, Big Five, arquetipo, etc.).
4. Marca personal: misión, visión, posicionamiento y propuesta de valor.
5. Identidad visual: paleta, fotografía, vestuario y estilo.
6. Cinco pilares de contenido.
7. Calendario editorial de 30 días.
8. Copywriting: bios, tono, hashtags y CTA.
9. Prompts de imagen coherentes para múltiples escenarios.
10. Prompts de video.
11. Storytelling completo.
12. Plan de monetización.
13. Plan de crecimiento: 30, 60, 90, 180 días y 1 año.
14. Reglas de consistencia.
15. Prompt Maestro definitivo para recrear el avatar en cualquier IA.

---

# 19. Regla de cambio de canon

Para modificar un canon bloqueado:

```text
INSTRUCCIÓN EXPLÍCITA
→ PUNTO DE CONTROL
→ RAMA DE REVISIÓN
→ PROPUESTA / SIMULACIÓN
→ ANÁLISIS DE IMPACTO
→ VALIDACIÓN
→ APROBACIÓN
→ NUEVA CANON_VERSION
→ REVALIDACIÓN / REGENERACIÓN DE DERIVADOS
```

No debe borrarse silenciosamente el trabajo posterior.

---

# 20. Fuentes utilizadas para esta reconstrucción

Esta especificación maestra fue consolidada a partir de documentos oficiales/localizados de AIIF, entre ellos:

- `Prompt_Maestro_AI_Influencer_Factory.md`
- `AI_INFLUENCER_FACTORY_Guia_Rapida_v1.0.md`
- `AI_INFLUENCER_FACTORY_Guia_Paso_a_Paso_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Fundamentos_Estrategicos_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Concepto_Canonico_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Biografia_Identidad_Canonica_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Personaje_Psicologia_Canonica_v1.0`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Identidad_Marca_Canonica_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Identidad_Visual_Canonica_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Identidad_Verbal_Voz_Canonica_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Universo_Narrativo_Canonico_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Sistema_Contenido_Canonico_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Produccion_IA_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Monetizacion_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Crecimiento_v1.0.md`
- `AI_INFLUENCER_FACTORY_Especificacion_General_Consolidacion_Portabilidad_v1.0.md`
- `AIIF_PORTABLE_EDITION_CANDIDATE_6_DIRECT_RUNTIME.md`

---

# 21. Nota de procedencia

Las partes marcadas **EXPLÍCITO** corresponden a elementos o superficies localizadas directamente en las fuentes.

Las partes marcadas **PREGUNTA RECTORA DERIVADA** reformulan en forma interrogativa obligaciones, objetivos o campos que la especificación oficial exige resolver. No deben interpretarse como copia literal de un menú histórico si dicho menú no estaba fijado en la fuente recuperada.

---

# 22. Principio final

AI Influencer Factory debe permitir que una persona sin experiencia profunda en estrategia de marca, psicología, fotografía, prompt engineering, monetización o growth pueda construir un influencer virtual coherente mediante un proceso guiado de descubrimiento, comparación, recomendación, aprobación, producción, aprendizaje y consolidación.

El resultado debe ser una **marca personal viva, coherente, escalable y preparada para monetizar mediante contenido, colaboraciones, productos digitales y comunidad**.
