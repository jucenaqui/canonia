---
spec_id: UNIVERSAL_AI_CANONICAL_NAMING_SPEC
spec_version: "1.0.0"
spec_type: AI_NAMING_RESEARCH_AND_CANONIZATION_SPEC
status: TEMPLATE
scope: "Proceso general para investigar, comparar, seleccionar y bloquear un nombre canónico"
real_names_included: false
---

# UNIVERSAL AI CANONICAL NAMING SPEC
## Especificación para investigación y selección de un nombre canónico

## 1. Propósito

Esta especificación define un proceso reutilizable para que una IA pueda ayudar a encontrar, investigar, comparar, validar y finalmente bloquear un **nombre canónico** para una identidad virtual, influencer AI, marca personal, personaje digital o proyecto similar.

El objetivo no es generar un nombre al azar, sino avanzar mediante un flujo controlado:

```text
NOMBRES DE TRABAJO
        ↓
VARIANTES
        ↓
INVESTIGACIÓN Y FILTROS
        ↓
SHORTLIST
        ↓
BRAND SCORE
        ↓
STRESS TEST FINAL
        ↓
REVISIÓN PRELIMINAR DE CONFLICTOS
        ↓
APROBACIÓN HUMANA
        ↓
NAME_CANON
```

La IA NO debe convertir un candidato en nombre canónico sin aprobación explícita.

---

# 2. Variables de plantilla

La IA debe trabajar con variables genéricas.

```json
{
  "project": "[PROJECT]",
  "creator_type": "[CREATOR_TYPE]",
  "niche": "[NICHE]",
  "brand_positioning": "[BRAND_POSITIONING]",
  "audience_regions": ["[REGION_1]", "[REGION_2]"],
  "audience_languages": ["[LANGUAGE_1]", "[LANGUAGE_2]"],
  "working_names": [
    "[WORKING_NAME_01]",
    "[WORKING_NAME_02]"
  ],
  "candidate_pool": [],
  "shortlist": [],
  "finalists": [],
  "name_canon": null
}
```

No utilizar nombres reales dentro de esta plantilla.

---

# 3. Principio del proceso

El proceso debe tratar el naming como una combinación de:

```text
IDENTIDAD
+
MARCA
+
MEMORABILIDAD
+
FONÉTICA
+
BUSCABILIDAD
+
DISPONIBILIDAD
+
ESCALABILIDAD
+
RIESGO DE COLISIÓN
```

Un nombre atractivo visualmente no es suficiente.

Debe funcionar también como:

- nombre pronunciable;
- nombre recordable;
- username potencial;
- hashtag;
- firma visual;
- watermark;
- nombre de marca;
- nombre de campaña;
- nombre adaptable a diferentes mercados.

---

# 4. Fase 0 — Contexto previo al naming

Antes de investigar nombres, la IA debe reunir el mínimo contexto estratégico.

## Inputs requeridos

```json
{
  "identity_concept": "[IDENTITY_CONCEPT]",
  "niche": "[NICHE]",
  "public_positioning": "[PUBLIC_POSITIONING]",
  "personality_keywords": [
    "[TRAIT_01]",
    "[TRAIT_02]",
    "[TRAIT_03]"
  ],
  "target_regions": [
    "[REGION_01]",
    "[REGION_02]"
  ],
  "primary_languages": [
    "[LANGUAGE_01]",
    "[LANGUAGE_02]"
  ],
  "desired_name_style": [
    "[STYLE_01]",
    "[STYLE_02]"
  ],
  "avoid": [
    "[AVOID_01]",
    "[AVOID_02]"
  ]
}
```

## Regla

No generar o comparar nombres ignorando el posicionamiento del personaje o marca.

---

# 5. Fase 1 — Nombres de trabajo

El proceso comienza con uno o más **nombres de trabajo**.

Pueden provenir de:

- ideas iniciales del usuario;
- apodos provisionales;
- conceptos semánticos;
- combinaciones exploratorias;
- nombres heredados de etapas tempranas.

Ejemplo genérico:

```text
[WORKING_NAME_A]
[WORKING_NAME_B]
```

Estos nombres NO son todavía Canon.

Estado:

```text
WORKING
```

---

# 6. Fase 2 — Variantes y exploración

A partir de los nombres de trabajo, crear variantes razonables.

La IA puede explorar:

```text
variaciones fonéticas
variaciones ortográficas
nombre + apellido
nombre corto + apellido
formas más internacionales
formas más memorables
formas más visuales
```

Ejemplo:

```text
[WORKING_NAME_A]
→ [VARIANT_A1]
→ [VARIANT_A2]
→ [VARIANT_A3]
```

## Regla

No crear cientos de variantes sin filtro.

El objetivo es producir un grupo manejable de candidatos suficientemente distintos para comparar.

Estado:

```text
CANDIDATE
```

---

# 7. Fase 3 — Cribado inicial de colisiones

Antes de evaluar estética o gusto, eliminar candidatos con conflictos evidentes.

## Revisar coincidencias exactas o casi exactas en:

```text
Instagram
TikTok
YouTube
X
plataformas sociales relevantes
Spotify / entretenimiento
creadores o influencers existentes
marcas de fashion
marcas de beauty
marcas de lifestyle
otras marcas cercanas al nicho
dominios relevantes
resultados generales de búsqueda
```

## Resultado por candidato

```json
{
  "candidate": "[CANDIDATE]",
  "exact_collision": false,
  "near_collision": false,
  "social_collision_risk": "LOW|MEDIUM|HIGH",
  "brand_collision_risk": "LOW|MEDIUM|HIGH",
  "search_confusion_risk": "LOW|MEDIUM|HIGH",
  "status": "KEEP|REVIEW|REJECT"
}
```

## Regla

Una colisión importante puede eliminar un nombre incluso si creativamente es fuerte.

---

# 8. Fase 4 — Validación lingüística y fonética

Cada candidato superviviente debe revisarse en los mercados objetivo.

Evaluar:

```text
facilidad de pronunciación
claridad al escucharlo
facilidad para escribirlo
riesgo de errores ortográficos
sonoridad
ritmo
fonética internacional
dobles sentidos
significados no deseados
conflictos lingüísticos
```

Si existen mercados con alfabetos o sistemas fonéticos distintos, revisar también:

```text
transliteración
pronunciación aproximada
lectura local
riesgo de deformación del nombre
```

Ejemplos de mercados que pueden requerir este test:

```text
[MARKET_WITH_TRANSLITERATION_01]
[MARKET_WITH_TRANSLITERATION_02]
```

## Resultado

```json
{
  "candidate": "[CANDIDATE]",
  "pronunciation": "STRONG|ACCEPTABLE|WEAK",
  "international_phonetics": "STRONG|ACCEPTABLE|WEAK",
  "transliteration": "STRONG|ACCEPTABLE|WEAK|NOT_APPLICABLE",
  "unwanted_meaning": false,
  "notes": []
}
```

---

# 9. Fase 5 — Buscabilidad y memorabilidad

Evaluar si el nombre puede encontrarse y recordarse.

## Criterios

```text
memorabilidad
facilidad de escritura
distintividad
claridad sonora
facilidad de búsqueda
riesgo de autocorrector
riesgo de confusión con palabras comunes
capacidad de asociarlo con una sola identidad
```

Preguntas de prueba:

```text
¿Una persona recuerda el nombre después de verlo una vez?
¿Puede escribirlo después de escucharlo?
¿Es suficientemente distintivo para buscarlo?
¿Los resultados de búsqueda quedarían mezclados con otro concepto?
¿Puede convertirse en una identidad reconocible?
```

---

# 10. Fase 6 — Shortlist

Después de los filtros iniciales, reducir los candidatos a una shortlist.

Recomendación:

```text
3 a 7 candidatos
```

Estado:

```text
SHORTLIST
```

Ejemplo:

```json
{
  "shortlist": [
    "[SHORTLIST_01]",
    "[SHORTLIST_02]",
    "[SHORTLIST_03]"
  ]
}
```

La IA debe explicar por qué cada candidato sobrevivió.

---

# 11. Fase 7 — Brand Score

Aplicar una evaluación comparativa cuantificada.

Escala recomendada:

```text
0–100
```

## Dimensiones recomendadas

El flujo recuperado utilizó una comparación de marca y viabilidad. Para convertirlo en plantilla general, evaluar al menos:

```text
MEMORABILITY
PRONUNCIATION
INTERNATIONAL_FIT
SEARCHABILITY
DISTINCTIVENESS
SOCIAL_HANDLE_POTENTIAL
BRAND_FIT
VISUAL_IDENTITY_FIT
VIRALITY_POTENTIAL
EXPANSION_POTENTIAL
COLLISION_RISK
```

## Importante

Si no existen pesos definidos por el proyecto:

```text
NO INVENTAR PESOS OCULTOS.
```

La IA debe:

1. usar pesos iguales; o
2. pedir/aplicar pesos proporcionados por el usuario; o
3. declarar claramente los pesos propuestos.

## Estructura

```json
{
  "candidate": "[CANDIDATE]",
  "scores": {
    "memorability": "[0-10]",
    "pronunciation": "[0-10]",
    "international_fit": "[0-10]",
    "searchability": "[0-10]",
    "distinctiveness": "[0-10]",
    "social_handle_potential": "[0-10]",
    "brand_fit": "[0-10]",
    "visual_identity_fit": "[0-10]",
    "virality_potential": "[0-10]",
    "expansion_potential": "[0-10]"
  },
  "collision_penalty": "[0-XX]",
  "brand_score_100": "[0-100]"
}
```

## Regla

El score sirve para comparar.

NO constituye:

```text
registro de marca
opinión jurídica
garantía de disponibilidad
garantía comercial
```

---

# 12. Fase 8 — Selección de finalistas

Reducir la shortlist a:

```text
3 finalistas
```

Estado:

```text
FINALIST
```

No declarar ganador todavía.

---

# 13. Fase 9 — Stress Test final

Los finalistas deben probarse en situaciones reales de uso.

## 13.1 Username test

Simular:

```text
@[CANDIDATE]
@[CANDIDATE]official
@[CANDIDATE]ai
```

No para adoptar automáticamente variantes, sino para comprobar robustez.

Evaluar:

```text
legibilidad
longitud
confusión
disponibilidad potencial
```

---

## 13.2 Search test

Simular búsquedas como:

```text
"[CANDIDATE]"
"[CANDIDATE] AI"
"[CANDIDATE] creator"
"[CANDIDATE] model"
```

Evaluar si el nombre puede dominar resultados futuros o si quedará mezclado con entidades previas.

---

## 13.3 Pronunciation test

Probar:

```text
persona que lo lee
persona que solo lo escucha
persona no nativa del idioma original
```

Pregunta:

```text
¿Se puede repetir correctamente después de escucharlo una vez?
```

---

## 13.4 Transliteration test

Para mercados relevantes, simular transliteraciones.

Ejemplo abstracto:

```text
[CANDIDATE]
→ [TRANSLITERATION_MARKET_A]
→ [TRANSLITERATION_MARKET_B]
```

Evaluar:

```text
sonoridad
deformación
ambigüedad
facilidad de lectura
```

---

## 13.5 Logo / watermark test

Simular:

```text
[CANDIDATE]
[CANDIDATE]™
@ [CANDIDATE]
```

Evaluar:

```text
balance visual
longitud
legibilidad en pequeño
fuerza como firma
compatibilidad con fotografía y video
```

---

## 13.6 Hashtag test

Simular:

```text
#[CANDIDATE]
#[CANDIDATE]Style
#[CANDIDATE]Daily
```

Evaluar:

```text
claridad
memorabilidad
riesgo de colisiones
facilidad de escritura
```

---

## 13.7 Collaboration test

Insertar el nombre en colaboraciones hipotéticas:

```text
[BRAND] x [CANDIDATE]
[CANDIDATE] for [BRAND]
```

Evaluar si suena natural como identidad comercial.

---

## 13.8 Campaign test

Simular:

```text
[CANDIDATE] — [CAMPAIGN]
The [CANDIDATE] Edit
Inside [CANDIDATE]
```

Evaluar escalabilidad editorial.

---

## 13.9 Fandom / community test

Explorar si el nombre permite crear comunidad sin sonar forzado.

Ejemplo abstracto:

```text
[CANDIDATE] community
[CANDIDATE] club
[CANDIDATE] world
```

No convertir automáticamente ninguna variante en naming oficial.

---

## 13.10 Expansion test

Preguntar:

```text
¿Funciona si el proyecto pasa de influencer a marca?
¿Funciona en fashion?
¿Funciona en beauty?
¿Funciona en lifestyle?
¿Funciona en entretenimiento?
¿Funciona en productos?
¿Funciona como marca personal?
```

Un nombre excesivamente atado a un solo formato puede limitar crecimiento futuro.

---

# 14. Fase 10 — Revisión preliminar de marcas

Antes de recomendar el finalista principal, hacer una revisión preliminar en bases relevantes.

Ejemplos de fuentes que pueden corresponder según jurisdicción:

```text
WIPO
USPTO
EUIPO
otros registros nacionales relevantes
```

## Clasificación

```json
{
  "candidate": "[FINALIST]",
  "preliminary_trademark_risk": "LOW|MEDIUM|HIGH|UNKNOWN",
  "exact_match_found": false,
  "similar_match_found": false,
  "notes": []
}
```

## Advertencia obligatoria

> Esta revisión es preliminar y no sustituye una búsqueda jurídica profesional de marcas ni una opinión legal.

La IA no debe declarar:

```text
"el nombre está legalmente libre"
```

salvo que exista una validación jurídica real externa y explícita.

---

# 15. Fase 11 — Matriz final comparativa

Crear una tabla final.

| Criterio | [FINALIST_A] | [FINALIST_B] | [FINALIST_C] |
|---|---:|---:|---:|
| Memorabilidad | [] | [] | [] |
| Pronunciación | [] | [] | [] |
| Internacional | [] | [] | [] |
| Buscabilidad | [] | [] | [] |
| Distintividad | [] | [] | [] |
| Handles | [] | [] | [] |
| Logo / watermark | [] | [] | [] |
| Hashtag | [] | [] | [] |
| Colaboraciones | [] | [] | [] |
| Campañas | [] | [] | [] |
| Fandom | [] | [] | [] |
| Expansión | [] | [] | [] |
| Riesgo colisión | [] | [] | [] |
| Riesgo preliminar marca | [] | [] | [] |
| **Brand Score** | **[]** | **[]** | **[]** |

---

# 16. Fase 12 — Recomendación

La IA puede producir:

```json
{
  "recommended_candidate": "[FINALIST_X]",
  "confidence": "HIGH|MEDIUM|LOW",
  "why": [
    "[REASON_01]",
    "[REASON_02]",
    "[REASON_03]"
  ],
  "remaining_risks": [
    "[RISK_01]"
  ]
}
```

## Regla crítica

La recomendación NO cambia el estado del nombre.

Estado:

```text
RECOMMENDED
```

Todavía no:

```text
CANONICAL
```

---

# 17. Fase 13 — Aprobación humana

La IA debe solicitar o detectar una aprobación explícita.

Ejemplos genéricos de aprobación válida:

```text
"Aprueba [FINALIST_X] como nombre canónico."
"Bloquea [FINALIST_X] como NAME_CANON."
"Este será definitivamente el nombre."
"Queda aprobado como nombre oficial."
```

Ejemplos que NO constituyen aprobación:

```text
"Me gusta."
"Suena bien."
"Creo que puede servir."
"Compáralo con otro."
"Busca si está disponible."
"Simula cómo se vería."
```

---

# 18. Fase 14 — Bloqueo de NAME_CANON

Solo después de aprobación explícita:

```json
{
  "name_canon": "[APPROVED_NAME]",
  "name_status": "LOCKED",
  "approval_status": "APPROVED",
  "effective_date": "[DATE]"
}
```

Los candidatos anteriores pasan a:

```text
HISTORICAL_CANDIDATE
RETIRED
```

No eliminarlos del historial.

---

# 19. Gobernanza posterior

Una vez bloqueado:

```text
NAME_CANON = [APPROVED_NAME]
```

la IA debe asumir que es estable.

## No cambia por:

```text
nuevo handle
nueva red social
nuevo logo
nuevo nicho secundario
nuevo idioma
nuevo contenido
nueva campaña
nueva preferencia temporal
```

## Renaming requiere:

```text
INSTRUCCIÓN EXPLÍCITA
+
ANÁLISIS DE IMPACTO
+
APROBACIÓN
+
REGISTRO DEL CAMBIO
```

---

# 20. Estados del naming

```text
WORKING
CANDIDATE
SHORTLIST
FINALIST
RECOMMENDED
APPROVED
CANONICAL
LOCKED
RETIRED
REJECTED
```

## Flujo permitido

```text
WORKING
  ↓
CANDIDATE
  ↓
SHORTLIST
  ↓
FINALIST
  ↓
RECOMMENDED
  ↓
APPROVED
  ↓
CANONICAL
  ↓
LOCKED
```

No saltar automáticamente de:

```text
CANDIDATE → CANONICAL
```

---

# 21. Reglas de IA

La IA que utilice esta especificación debe cumplir:

1. No inventar un nombre canónico sin investigación.
2. No confundir un nombre de trabajo con el nombre final.
3. No descartar conflictos de búsqueda o redes por preferencia estética.
4. No basar la decisión solo en disponibilidad de username.
5. No considerar un score como dictamen jurídico.
6. No declarar disponibilidad legal sin validación profesional.
7. No activar un candidato sin aprobación explícita.
8. Conservar los candidatos descartados como historial.
9. Diferenciar `RECOMMENDED` de `CANONICAL`.
10. Diferenciar cambio de handle de cambio de nombre.
11. Repetir pruebas internacionales cuando los mercados objetivo cambien.
12. Mantener trazabilidad de por qué ganó el candidato final.

---

# 22. Algoritmo operativo resumido

```pseudo
INPUT project_context

working_names = collect_working_names()

candidates = generate_reasonable_variants(working_names)

for candidate in candidates:
    check_exact_and_near_collisions(candidate)
    check_social_platforms(candidate)
    check_search_engines(candidate)
    check_creators_and_entertainment(candidate)
    check_related_brands(candidate)
    check_domain_context(candidate)
    check_language_and_phonetics(candidate)

survivors = reject_high_risk_candidates(candidates)

shortlist = rank_for_brand_fit(survivors)

for candidate in shortlist:
    calculate_brand_score(candidate)

finalists = select_top_candidates(shortlist, target=3)

for candidate in finalists:
    run_username_test(candidate)
    run_search_test(candidate)
    run_pronunciation_test(candidate)
    run_transliteration_test(candidate)
    run_logo_watermark_test(candidate)
    run_hashtag_test(candidate)
    run_collaboration_test(candidate)
    run_campaign_test(candidate)
    run_fandom_test(candidate)
    run_expansion_test(candidate)
    run_preliminary_trademark_review(candidate)

recommended = compare(finalists)

present_recommendation(recommended)

WAIT_FOR_EXPLICIT_USER_APPROVAL()

if approved:
    name_canon = approved_candidate
    status = LOCKED
    archive_other_candidates()
else:
    continue_research()
```

---

# 23. Output esperado de la IA

Antes de canonizar, devolver:

```json
{
  "naming_research": {
    "working_names": ["[...]"],
    "candidates_reviewed": ["[...]"],
    "rejected_candidates": [
      {
        "name": "[...]",
        "reason": "[...]"
      }
    ],
    "shortlist": ["[...]"],
    "finalists": ["[...]"],
    "brand_scores": {},
    "stress_test": {},
    "preliminary_trademark_review": {},
    "recommended_candidate": "[...]",
    "approval_required": true
  }
}
```

Después de aprobación:

```json
{
  "naming_decision": {
    "name_canon": "[APPROVED_NAME]",
    "status": "LOCKED",
    "approved_by_user": true,
    "effective_date": "[DATE]",
    "historical_candidates_preserved": true
  }
}
```

---

# 24. Resumen compacto para otra IA

```text
START:
Use one or more working names.

EXPLORE:
Create controlled variants.

FILTER:
Check exact/near collisions across social platforms,
search, creators, entertainment, related brands and domains.

LANGUAGE:
Test pronunciation, spelling, international phonetics,
unwanted meanings and transliteration when relevant.

SHORTLIST:
Keep only viable candidates.

SCORE:
Apply a transparent Brand Score.

FINALISTS:
Reduce to approximately three.

STRESS TEST:
Test username, search, pronunciation, transliteration,
logo/watermark, hashtag, collaborations, campaigns,
community/fandom and future expansion.

TRADEMARK:
Perform only a preliminary registry review and state that
it is not legal clearance.

RECOMMEND:
Select a preferred candidate, but do not canonize it.

APPROVE:
Require explicit human approval.

LOCK:
Only after approval set:

NAME_CANON = [APPROVED_NAME]
STATUS = LOCKED

ARCHIVE:
Preserve earlier names as historical candidates.

NEVER:
Turn a suggestion, score, availability check or simulation
into canonical approval automatically.
```

---

# 25. Principio final

> El nombre canónico no se obtiene en un único paso creativo. Se construye mediante exploración, filtrado de colisiones, validación lingüística, comparación estratégica, pruebas de uso real, revisión preliminar de riesgo y una aprobación humana explícita. La IA puede investigar y recomendar; únicamente la aprobación final convierte `[CANDIDATE_NAME]` en `[NAME_CANON]`.
