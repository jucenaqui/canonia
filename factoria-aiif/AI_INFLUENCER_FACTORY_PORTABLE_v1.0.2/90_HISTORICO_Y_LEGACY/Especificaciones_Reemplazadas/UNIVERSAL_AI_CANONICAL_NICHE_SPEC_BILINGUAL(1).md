---
spec_id: UNIVERSAL_AI_CANONICAL_NICHE_SPEC
spec_version: "1.0.0"
spec_type: AI_NICHE_RESEARCH_AND_CANONIZATION_SPEC
status: TEMPLATE
languages:
  - es
  - en
real_project_names_included: false
real_niches_included: false
---

# UNIVERSAL AI CANONICAL NICHE SPEC
## Especificación bilingüe para investigar, refinar y bloquear un nicho canónico
## Bilingual specification for researching, refining, and locking a canonical niche

---

# PARTE I — ESPAÑOL

## 1. Propósito

Esta especificación define el flujo reutilizable que una IA debe seguir para transformar un **nicho inicial o provisional** en un **nicho canónico** coherente con la estrategia, audiencia, monetización, personalidad, marca y sistema de contenido de un creador virtual.

La lógica recuperada no parte de buscar “el nicho perfecto” en una sola respuesta. El nicho se construye mediante refinamiento progresivo.

Flujo general:

```text
BRIEF ESTRATÉGICO
        ↓
NICHO PROVISIONAL
        ↓
DIAGNÓSTICO
        ↓
CONTRASTE CON NEGOCIO + AUDIENCIA
        ↓
REFINAMIENTO / ARQUITECTURA DE NICHO
        ↓
SIMULACIONES ALTERNATIVAS
        ↓
NICHO OPERATIVO
        ↓
POSICIONAMIENTO PÚBLICO
        ↓
VALIDACIÓN DE COHERENCIA
        ↓
RECOMENDACIÓN
        ↓
APROBACIÓN HUMANA
        ↓
NICHE_CANON
```

---

## 2. Principio clave

La IA debe distinguir tres conceptos:

```text
[NICHE_WORKING]
= nicho inicial o de trabajo

[NICHE_OPERATIONAL]
= definición interna usada para estrategia,
contenido, monetización y diferenciación

[PUBLIC_POSITIONING]
= formulación pública simplificada,
comercial y fácil de entender
```

Estos tres valores pueden estar relacionados sin ser idénticos.

La formulación pública NO debe reemplazar automáticamente el nicho operativo.

---

## 3. Fase 0 — Brief estratégico inicial

El proceso comienza recopilando como mínimo:

```json
{
  "income_source_initial": "[INCOME_SOURCE]",
  "niche_working": "[NICHE_WORKING]",
  "target_audience": {
    "regions": ["[REGION_01]", "[REGION_02]"],
    "age_range": "[AGE_RANGE]",
    "gender": "[GENDER_OR_ALL]",
    "interests": ["[INTEREST_01]", "[INTEREST_02]"]
  },
  "time_available": "[TIME_AVAILABLE]",
  "goal_90_days": "[GOAL_90_DAYS]",
  "primary_platform": "[PRIMARY_PLATFORM]",
  "secondary_platform": "[SECONDARY_PLATFORM]"
}
```

## Regla

No evaluar el nicho de forma aislada.

El nicho siempre debe leerse junto con:

```text
monetización
audiencia
plataforma
tiempo disponible
objetivo
```

---

## 4. Fase 1 — Registrar el nicho provisional

El primer nicho aportado por el usuario debe registrarse como:

```text
[NICHE_WORKING]
```

Estado:

```text
WORKING
```

No debe tratarse todavía como Canon.

La IA debe conservarlo como punto de partida histórico.

---

## 5. Fase 2 — Diagnóstico del nicho provisional

La IA debe revisar si `[NICHE_WORKING]` es:

```text
demasiado amplio
demasiado estrecho
demasiado genérico
difícil de monetizar
difícil de diferenciar
difícil de sostener con contenido
incompatible con la audiencia
incompatible con la personalidad
incompatible con la marca
incompatible con la plataforma
difícil de presentar públicamente
poco escalable
```

La salida debe ser diagnóstica, no todavía definitiva.

Ejemplo estructural:

```json
{
  "niche": "[NICHE_WORKING]",
  "diagnosis": {
    "clarity": "LOW|MEDIUM|HIGH",
    "differentiation": "LOW|MEDIUM|HIGH",
    "monetization_fit": "LOW|MEDIUM|HIGH",
    "audience_fit": "LOW|MEDIUM|HIGH",
    "content_depth": "LOW|MEDIUM|HIGH",
    "brand_fit": "LOW|MEDIUM|HIGH",
    "scalability": "LOW|MEDIUM|HIGH",
    "public_positioning_fit": "LOW|MEDIUM|HIGH"
  }
}
```

---

## 6. Fase 3 — Contraste con el modelo de negocio

Preguntas obligatorias:

```text
¿Este nicho permite activar [INCOME_SOURCE]?
¿Puede producir un portfolio comercial?
¿Permite colaboraciones o productos relacionados?
¿Existe suficiente variedad de contenido?
¿Puede sostenerse durante al menos 90 días?
¿Puede crecer sin destruir la identidad original?
```

La IA debe eliminar o reformular nichos que sean atractivos visualmente pero débiles comercialmente.

---

## 7. Fase 4 — Contraste con la audiencia

Evaluar:

```text
¿La audiencia entiende el nicho?
¿El nicho coincide con sus intereses?
¿La edad objetivo es coherente con el contenido?
¿Funciona en los mercados objetivo?
¿Puede comunicarse de forma natural en los idiomas públicos?
¿Existen sensibilidades culturales relevantes?
```

El objetivo no es adaptar toda la identidad a cada mercado, sino asegurar que el nicho pueda entenderse y escalar.

---

## 8. Fase 5 — Construcción de una arquitectura de nicho

En lugar de depender de una sola etiqueta, la IA puede construir una combinación controlada.

Plantilla:

```text
[NICHE_CORE]
    ×
[DIFFERENTIATION_LENS]
    ×
[AESTHETIC_OR_EDITORIAL_LENS]
```

La función de cada capa:

```text
[NICHE_CORE]
→ qué mercado o categoría central ocupa

[DIFFERENTIATION_LENS]
→ por qué este creador se siente distinto

[AESTHETIC_OR_EDITORIAL_LENS]
→ cómo se expresa visual y editorialmente
```

Resultado provisional:

```text
[NICHE_CANDIDATE]
```

Estado:

```text
CANDIDATE
```

---

## 9. Fase 6 — Simulaciones sin alterar el Canon

Antes de aprobar, probar alternativas:

```text
[MORE_ARTISTIC_VARIANT]
[MORE_COMMERCIAL_VARIANT]
[MORE_MAINSTREAM_VARIANT]
[MORE_SPECIALIZED_VARIANT]
```

La IA debe comparar:

```text
versión actual
vs
alternativa
```

sin aplicar el cambio.

Estado de una simulación:

```text
SIMULATED
```

No:

```text
CANONICAL
```

---

## 10. Fase 7 — Separar nicho operativo de posicionamiento público

La IA debe decidir si la formulación interna del nicho debe mostrarse literalmente al público.

Si la definición interna es:

```text
demasiado técnica
demasiado estrecha
demasiado explícita
difícil de entender
poco flexible comercialmente
```

crear una segunda capa:

```text
[NICHE_OPERATIONAL]
```

para uso interno, y:

```text
[PUBLIC_POSITIONING]
```

para bio, media kit, presentación de marca y comunicación externa.

Plantilla:

```json
{
  "niche_operational": "[NICHE_OPERATIONAL]",
  "public_positioning": "[PUBLIC_POSITIONING]",
  "same_meaning_family": true,
  "same_literal_wording_required": false
}
```

---

## 11. Fase 8 — Validación de coherencia

Antes de canonizar, validar dependencias.

### Validación estratégica

```text
nicho ↔ monetización
nicho ↔ audiencia
nicho ↔ objetivo 90 días
```

### Validación de identidad

```text
nicho ↔ personalidad
nicho ↔ intereses
nicho ↔ arquetipos
nicho ↔ biografía
```

### Validación de marca

```text
nicho ↔ propuesta de valor
nicho ↔ posicionamiento público
nicho ↔ identidad de marca
```

### Validación de contenido

```text
nicho ↔ pilares
nicho ↔ series
nicho ↔ formatos
nicho ↔ plataformas
```

### Validación operativa

```text
¿Puede generar suficiente contenido?
¿Puede monetizarse?
¿Puede crecer?
¿Puede mantenerse reconocible?
```

---

## 12. Fase 9 — Validación lingüística

Cuando el nicho o posicionamiento pueda funcionar en más de un idioma:

1. definir una formulación interna;
2. proponer una versión internacional solo si aporta valor;
3. evitar traducciones literales débiles;
4. decidir cuál queda como Canon interno;
5. decidir cuál se usa públicamente.

Plantilla:

```json
{
  "internal_niche_label": "[NICHE_INTERNAL_LANGUAGE]",
  "international_alias": "[NICHE_INTERNATIONAL_ALIAS]",
  "public_label": "[PUBLIC_POSITIONING]",
  "literal_translation_required": false
}
```

---

## 13. Fase 10 — Recomendación

La IA puede recomendar:

```json
{
  "recommended_niche": "[NICHE_CANDIDATE]",
  "recommended_operational_niche": "[NICHE_OPERATIONAL]",
  "recommended_public_positioning": "[PUBLIC_POSITIONING]",
  "why": [
    "[REASON_01]",
    "[REASON_02]",
    "[REASON_03]"
  ],
  "remaining_risks": [
    "[RISK_01]"
  ],
  "approval_required": true
}
```

La recomendación NO cambia el Canon.

Estado:

```text
RECOMMENDED
```

---

## 14. Fase 11 — Aprobación humana

La IA debe esperar una decisión explícita.

Aprobaciones válidas:

```text
"Aprueba [NICHE_CANDIDATE] como nicho oficial."
"Bloquea este nicho como canónico."
"Este será definitivamente el nicho."
"Queda aprobado."
"Hazlo canon."
```

No constituyen aprobación:

```text
"Me gusta."
"Se ve bien."
"Compáralo."
"Prueba otra versión."
"Simula algo más comercial."
"Muéstrame cómo quedaría."
```

---

## 15. Fase 12 — Bloqueo del nicho canónico

Después de aprobación explícita:

```json
{
  "niche_canon": "[NICHE_CANON]",
  "niche_operational": "[NICHE_OPERATIONAL]",
  "public_positioning": "[PUBLIC_POSITIONING]",
  "status": "LOCKED",
  "approved_by_user": true,
  "effective_date": "[DATE]"
}
```

Estados anteriores pasan a:

```text
HISTORICAL
RETIRED
SIMULATED
REJECTED
```

según corresponda.

---

## 16. Gobernanza de cambios posteriores

Una vez bloqueado:

```text
NICHE_CANON = [NICHE_CANON]
```

no debe cambiar automáticamente por:

```text
una nueva campaña
un nuevo outfit
un post viral
una nueva serie
un nuevo producto
una tendencia temporal
una recomendación informal
```

Cambiar el nicho requiere:

```text
INSTRUCCIÓN EXPLÍCITA
        ↓
SIMULACIÓN
        ↓
ANÁLISIS DE IMPACTO
        ↓
REVALIDACIÓN DE DEPENDENCIAS
        ↓
APROBACIÓN
        ↓
NUEVA VERSIÓN CANÓNICA
```

Si afecta fases posteriores, marcarlas para revisión en vez de borrarlas.

---

## 17. Qué método NO debe inventar la IA

El flujo recuperado NO demuestra que se haya utilizado:

```text
un NICHE_SCORE numérico obligatorio
una fórmula matemática de nicho
un ranking legal
un único benchmark externo
un ganador automático por popularidad
```

Por tanto, esta plantilla no debe afirmar que dichos métodos son obligatorios.

La selección se basa principalmente en:

```text
coherencia estratégica
ajuste comercial
ajuste de audiencia
diferenciación
capacidad de contenido
compatibilidad de marca
escalabilidad
validación humana
```

---

## 18. Estados recomendados

```text
WORKING
CANDIDATE
SIMULATED
RECOMMENDED
APPROVED
CANONICAL
LOCKED
RETIRED
REJECTED
```

Flujo:

```text
WORKING
  ↓
CANDIDATE
  ↓
SIMULATED / COMPARED
  ↓
RECOMMENDED
  ↓
APPROVED
  ↓
CANONICAL
  ↓
LOCKED
```

---

## 19. Algoritmo operativo

```pseudo
INPUT strategic_brief

niche_working = collect_initial_niche()

diagnose(niche_working)

validate_against_income_source()
validate_against_audience()
validate_against_platforms()
validate_against_time_and_90_day_goal()

niche_candidates = refine_into_niche_architectures()

for candidate in niche_candidates:
    simulate_more_artistic_version(candidate)
    simulate_more_commercial_version(candidate)
    validate_brand_fit(candidate)
    validate_personality_fit(candidate)
    validate_content_depth(candidate)
    validate_scalability(candidate)

niche_operational = select_best_operational_definition()

public_positioning = create_public_facing_expression(
    niche_operational
)

validate_dependencies(
    niche_operational,
    public_positioning,
    monetization,
    audience,
    personality,
    brand,
    content
)

present_recommendation()

WAIT_FOR_EXPLICIT_USER_APPROVAL()

if approved:
    NICHE_CANON = approved_niche
    STATUS = LOCKED
    preserve_history()
else:
    continue_refinement()
```

---

## 20. Resumen compacto para IA

```text
START:
Recoge el brief estratégico:
fuente de ingreso, nicho inicial, audiencia,
tiempo disponible, objetivo de 90 días y plataformas.

DIAGNOSE:
No aceptes automáticamente el nicho inicial.

CONTRAST:
Valida negocio, audiencia, contenido, marca y escalabilidad.

REFINE:
Convierte la etiqueta inicial en una arquitectura de nicho.

SIMULATE:
Prueba variantes más artísticas, comerciales,
amplias o especializadas sin modificar el Canon.

SEPARATE:
Mantén un nicho operativo interno y, cuando aporte valor,
un posicionamiento público más claro.

VALIDATE:
Comprueba coherencia con monetización, audiencia,
personalidad, marca y sistema de contenido.

RECOMMEND:
Presenta la opción más fuerte.

APPROVE:
Exige aprobación humana explícita.

LOCK:
Solo después de aprobación:

NICHE_CANON = [NICHE_CANON]
STATUS = LOCKED
```

---

# PART II — ENGLISH

## 1. Purpose

This specification defines a reusable workflow for an AI system to transform an **initial or working niche** into a **canonical niche** aligned with strategy, audience, monetization, personality, brand, and content architecture.

The recovered methodology does not treat niche selection as a one-shot answer. It uses progressive refinement.

General flow:

```text
STRATEGIC BRIEF
      ↓
WORKING NICHE
      ↓
DIAGNOSIS
      ↓
BUSINESS + AUDIENCE FIT
      ↓
NICHE REFINEMENT / ARCHITECTURE
      ↓
ALTERNATIVE SIMULATIONS
      ↓
OPERATIONAL NICHE
      ↓
PUBLIC POSITIONING
      ↓
COHERENCE VALIDATION
      ↓
RECOMMENDATION
      ↓
HUMAN APPROVAL
      ↓
NICHE_CANON
```

---

## 2. Core distinction

The AI must distinguish:

```text
[NICHE_WORKING]
= initial or provisional niche

[NICHE_OPERATIONAL]
= internal definition used for strategy,
content, monetization, and differentiation

[PUBLIC_POSITIONING]
= simplified external expression used
for public-facing brand communication
```

These values may belong to the same strategic family without using identical wording.

---

## 3. Phase 0 — Initial strategic brief

Collect at least:

```json
{
  "income_source_initial": "[INCOME_SOURCE]",
  "niche_working": "[NICHE_WORKING]",
  "target_audience": {
    "regions": ["[REGION_01]", "[REGION_02]"],
    "age_range": "[AGE_RANGE]",
    "gender": "[GENDER_OR_ALL]",
    "interests": ["[INTEREST_01]", "[INTEREST_02]"]
  },
  "time_available": "[TIME_AVAILABLE]",
  "goal_90_days": "[GOAL_90_DAYS]",
  "primary_platform": "[PRIMARY_PLATFORM]",
  "secondary_platform": "[SECONDARY_PLATFORM]"
}
```

Never evaluate the niche in isolation.

---

## 4. Phase 1 — Register the working niche

Store the first niche as:

```text
[NICHE_WORKING]
```

Status:

```text
WORKING
```

It is not Canon yet.

---

## 5. Phase 2 — Diagnose the working niche

Evaluate whether it is:

```text
too broad
too narrow
too generic
hard to monetize
hard to differentiate
hard to sustain with content
misaligned with the audience
misaligned with personality
misaligned with the brand
misaligned with the platform
difficult to communicate publicly
not scalable
```

Return a diagnosis, not a final decision.

---

## 6. Phase 3 — Validate against the business model

Required questions:

```text
Can this niche activate [INCOME_SOURCE]?
Can it support a commercial portfolio?
Can it support collaborations or related products?
Does it provide enough content variety?
Can it remain viable for at least 90 days?
Can it expand without destroying identity?
```

---

## 7. Phase 4 — Validate against the audience

Evaluate:

```text
Does the audience understand it?
Does it match audience interests?
Is the target age compatible with the content?
Can it work across target markets?
Can it be communicated naturally in public languages?
Are there relevant cultural sensitivities?
```

---

## 8. Phase 5 — Build a niche architecture

Instead of depending on a single label, build a controlled combination:

```text
[NICHE_CORE]
    ×
[DIFFERENTIATION_LENS]
    ×
[AESTHETIC_OR_EDITORIAL_LENS]
```

Functions:

```text
[NICHE_CORE]
→ the central market/category

[DIFFERENTIATION_LENS]
→ why this creator feels different

[AESTHETIC_OR_EDITORIAL_LENS]
→ how the niche is expressed visually/editorially
```

Result:

```text
[NICHE_CANDIDATE]
```

Status:

```text
CANDIDATE
```

---

## 9. Phase 6 — Simulate alternatives without changing Canon

Test alternatives such as:

```text
[MORE_ARTISTIC_VARIANT]
[MORE_COMMERCIAL_VARIANT]
[MORE_MAINSTREAM_VARIANT]
[MORE_SPECIALIZED_VARIANT]
```

Compare them with the current option.

Simulation status:

```text
SIMULATED
```

Never automatically:

```text
CANONICAL
```

---

## 10. Phase 7 — Separate operational niche from public positioning

Determine whether the internal niche definition should be shown literally to the public.

If the internal formulation is:

```text
too technical
too narrow
too explicit
hard to understand
commercially inflexible
```

create:

```text
[NICHE_OPERATIONAL]
```

for internal use, and:

```text
[PUBLIC_POSITIONING]
```

for bios, media kits, brand introductions, and public communication.

---

## 11. Phase 8 — Coherence validation

Validate:

```text
niche ↔ monetization
niche ↔ audience
niche ↔ 90-day objective
niche ↔ personality
niche ↔ interests
niche ↔ archetypes
niche ↔ biography
niche ↔ value proposition
niche ↔ public positioning
niche ↔ brand identity
niche ↔ content pillars
niche ↔ series
niche ↔ formats
niche ↔ platforms
```

---

## 12. Phase 9 — Language validation

When niche terminology may benefit from more than one language:

1. define the recommended internal wording;
2. propose an international alias only when useful;
3. avoid weak literal translations;
4. decide which version is internal Canon;
5. decide which version should be public-facing.

---

## 13. Phase 10 — Recommendation

The AI may output:

```json
{
  "recommended_niche": "[NICHE_CANDIDATE]",
  "recommended_operational_niche": "[NICHE_OPERATIONAL]",
  "recommended_public_positioning": "[PUBLIC_POSITIONING]",
  "why": [
    "[REASON_01]",
    "[REASON_02]",
    "[REASON_03]"
  ],
  "remaining_risks": [
    "[RISK_01]"
  ],
  "approval_required": true
}
```

Recommendation does not modify Canon.

---

## 14. Phase 11 — Human approval

Valid explicit approval examples:

```text
"Approve [NICHE_CANDIDATE] as the official niche."
"Lock this niche as canonical."
"This will be the definitive niche."
"Approve and make it Canon."
```

Not enough:

```text
"I like it."
"It looks good."
"Compare it."
"Try a more commercial option."
"Show me another version."
```

---

## 15. Phase 12 — Lock NICHE_CANON

Only after explicit approval:

```json
{
  "niche_canon": "[NICHE_CANON]",
  "niche_operational": "[NICHE_OPERATIONAL]",
  "public_positioning": "[PUBLIC_POSITIONING]",
  "status": "LOCKED",
  "approved_by_user": true,
  "effective_date": "[DATE]"
}
```

Preserve previous options as history.

---

## 16. Change governance

After locking:

```text
NICHE_CANON = [NICHE_CANON]
```

must not change automatically because of:

```text
a new campaign
a viral post
a new outfit
a temporary trend
a new series
a new product
an informal suggestion
```

A niche change requires:

```text
EXPLICIT REQUEST
      ↓
SIMULATION
      ↓
IMPACT ANALYSIS
      ↓
DEPENDENCY REVALIDATION
      ↓
APPROVAL
      ↓
NEW CANONICAL VERSION
```

---

## 17. Methods the AI must not fabricate

The recovered workflow does not establish a mandatory:

```text
numeric NICHE_SCORE
mathematical niche formula
automatic winner
single market benchmark
legal-style ranking
```

Therefore these methods must not be presented as historical requirements.

The decision process is primarily based on:

```text
strategic coherence
commercial fit
audience fit
differentiation
content depth
brand compatibility
scalability
human approval
```

---

## 18. Recommended states

```text
WORKING
CANDIDATE
SIMULATED
RECOMMENDED
APPROVED
CANONICAL
LOCKED
RETIRED
REJECTED
```

---

## 19. Operational algorithm

```pseudo
INPUT strategic_brief

niche_working = collect_initial_niche()

diagnose(niche_working)

validate_against_income_source()
validate_against_audience()
validate_against_platforms()
validate_against_time_and_90_day_goal()

niche_candidates = refine_into_niche_architectures()

for candidate in niche_candidates:
    simulate_more_artistic_version(candidate)
    simulate_more_commercial_version(candidate)
    validate_brand_fit(candidate)
    validate_personality_fit(candidate)
    validate_content_depth(candidate)
    validate_scalability(candidate)

niche_operational = select_best_operational_definition()

public_positioning = create_public_facing_expression(
    niche_operational
)

validate_dependencies()

present_recommendation()

WAIT_FOR_EXPLICIT_USER_APPROVAL()

if approved:
    NICHE_CANON = approved_niche
    STATUS = LOCKED
    preserve_history()
else:
    continue_refinement()
```

---

## 20. Final instruction for any AI

> Treat niche selection as a progressive strategic refinement process. Start from `[NICHE_WORKING]`, validate it against business, audience, identity, brand, content, and scalability, build a structured `[NICHE_OPERATIONAL]`, create a clearer `[PUBLIC_POSITIONING]` when useful, simulate alternatives without changing Canon, and require explicit human approval before setting `NICHE_CANON = [NICHE_CANON]`. Never expose or infer any real niche from this template.
