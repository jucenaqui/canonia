---
spec_id: AIIF_GENERAL_BIOGRAPHY_IDENTITY_CANON_SPEC
spec_version: "1.0.0"
spec_type: AIIF_BIOGRAPHY_IDENTITY_DISCOVERY_AND_CANONIZATION_SPEC
status: PROPUESTA_LISTA_PARA_APROBACION
phase: "F03 — Biografía e Identidad"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "Biografía Influencer Digital con IA.docx"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Construcción y Canonización de Biografía e Identidad
### Versión 1.0.0 — Propuesta lista para aprobación

## 1. Propósito

Esta especificación define un sistema reutilizable para que AI Influencer Factory (AIIF) pueda ayudar a construir, completar, comparar, validar y bloquear la **biografía e identidad canónica** de una influencer virtual, incluso cuando el creador no tenga una historia, profesión, contexto vital, intereses, motivaciones o círculo narrativo definidos.

El sistema se integra principalmente en **F03 — Biografía e Identidad** y utiliza como fundamento metodológico la especificación original de expertos proporcionada al inicio del proyecto.

La fuente experta establece que un influencer digital no debe tratarse como una simple apariencia, sino como una marca personal viva y coherente; además, sitúa la biografía como una base activa para apariencia, comportamiento, captions, contenido, monetización, prompts y continuidad. AIIF conserva esa intención experta, pero la adapta a su arquitectura actual para evitar conflictos con Sistema 00, F01–F13, estados, validadores, portabilidad y las fases especializadas posteriores.

Flujo visible recomendado:

```text
IDENTIDAD
    ↓
HISTORIA
    ↓
VIDA Y CONTEXTO
    ↓
MOTIVACIONES
    ↓
COHERENCIA
    ↓
BIOGRAFÍA E IDENTIDAD CANÓNICAS
```

La complejidad técnica permanece interna.

---

## 2. Procedencia y regla de fidelidad experta

### 2.1 Base experta

La especificación original de expertos exige, entre otros elementos:

- identidad completa;
- descripción física;
- arquetipo;
- nicho;
- objetivo del negocio;
- audiencia;
- objetivos;
- personalidad y psicología;
- marca personal;
- identidad visual;
- pilares de contenido;
- storytelling;
- monetización;
- crecimiento;
- reglas de consistencia.

La plantilla experta específica de biografía organiza la información en siete áreas:

1. identidad básica;
2. historia y contexto;
3. apariencia física y estilo visual;
4. personalidad y tono;
5. intereses, hobbies y vida social;
6. objetivos y motivaciones;
7. detalles narrativos y visuales para IA.

### 2.2 Adaptación AIIF

AIIF **no elimina** ninguna de esas funciones. Las distribuye entre las fases especializadas para evitar que F03 duplique trabajo posterior:

- F03 conserva y canoniza la identidad básica, la historia, el contexto, la vida social relevante, intereses, rutinas, objetivos, motivaciones y hechos biográficos.
- F04 desarrolla en profundidad personaje, psicología y rasgos conductuales.
- F05 desarrolla la identidad de marca.
- F06 desarrolla la identidad visual completa.
- F07 desarrolla identidad verbal y voz.
- F08 desarrolla el universo narrativo.
- F09 desarrolla el sistema de contenido.

Cuando la fuente experta coloca un dato en la biografía y AIIF lo desarrolla más tarde en otra fase, F03 puede registrar ese dato como **restricción, pista, hecho proporcionado o descriptor preliminar**, pero no debe fingir que la fase especializada ya está completa.

### 2.3 Regla de fuente de verdad

La documentación experta original describe la biografía como “documento maestro del avatar”. En AIIF, la función metodológica se conserva, pero la **fuente de verdad operacional** es:

```text
SISTEMA 00
+
MATRIZ MAESTRA DE DATOS
+
ESTADO DEL PROYECTO
```

Por tanto:

> La Biblia de Biografía e Identidad es la referencia biográfica fundamental del avatar, pero no sustituye la Matriz Maestra de Datos ni se convierte en una fuente de verdad paralela.

---

## 3. Ubicación en la arquitectura

El sistema pertenece a:

```text
F01 — Fundamentos Estratégicos
        ↓
F02 — Concepto
        ↓
F03 — Biografía e Identidad
        ├── Sistema Inteligente de Nombramiento Canónico
        └── Sistema Inteligente de Construcción y Canonización de Biografía e Identidad
        ↓
F04 — Personaje y Psicología
F05 — Identidad de Marca
F06 — Identidad Visual
F07 — Identidad Verbal y Voz
F08 — Universo Narrativo
F09 — Sistema de Contenido
```

No crea una nueva fase global.

---

## 4. Principio central

> **El usuario no debe tener que inventar por sí solo una vida completa para su influencer. AIIF debe poder convertir estrategia, concepto y datos parciales en opciones biográficas coherentes, explicar sus implicaciones, completar lo que falte, detectar contradicciones y exigir aprobación antes de bloquear los hechos canónicos.**

La IA no debe rellenar huecos silenciosamente como si fueran hechos aprobados.

Todo dato nuevo debe conservar procedencia y estado conforme a la Matriz Maestra de Datos.

---

## 5. Qué es y qué no es F03

### 5.1 F03 sí define

- identidad básica;
- nombre canónico cuando ya haya sido resuelto por el sistema de nombramiento;
- edad o edad narrativa/aparente según el proyecto;
- nacionalidad/origen narrativo;
- lugar de nacimiento cuando sea relevante;
- residencia actual narrativa;
- idiomas;
- profesión, ocupación o rol narrativo;
- historia de vida;
- hitos biográficos relevantes;
- valores y creencias biográficas cuando sean necesarios para explicar decisiones o historia;
- intereses y hobbies;
- rutinas relevantes;
- familia, amistades, mascotas y relaciones recurrentes cuando aporten valor;
- objetivos personales del personaje;
- motivaciones;
- sueños a largo plazo;
- causas o temas asociados cuando correspondan;
- hechos narrativos recurrentes;
- restricciones de continuidad para fases posteriores.

### 5.2 F03 no debe cerrar prematuramente

- perfil psicológico completo;
- MBTI o Big Five definitivos;
- arquetipos conductuales completos;
- misión, visión, propuesta de valor o posicionamiento de marca definitivos;
- geometría facial, cuerpo, paleta, fotografía y vestuario como sistema visual completo;
- tono de voz y voz sintética definitivos;
- mundos narrativos completos;
- pilares, series y formatos de contenido definitivos.

Estos elementos pertenecen a F04–F09.

---

## 6. Capas de información de F03

AIIF debe distinguir al menos:

```text
IDENTITY_CORE
= datos estructurados que identifican al avatar

BIOGRAPHY_WORKING
= historia o datos provisionales todavía en construcción

BIOGRAPHY_OPERATIONAL
= versión interna compacta que guía fases posteriores

BIOGRAPHY_CANON
= hechos e historia aprobados y bloqueados

IDENTITY_CORE_CANON
= identidad básica aprobada y bloqueada
```

`NAME_CANON` permanece gobernado por el Sistema Inteligente de Nombramiento Canónico.

La Biblia de Biografía e Identidad combina `IDENTITY_CORE_CANON` + `BIOGRAPHY_CANON` + restricciones/puentes relevantes.

---

## 7. Dependencias de entrada

### 7.1 Requeridos o recuperables

F03 debe intentar recuperar automáticamente del proyecto:

- `NICHE_CANON` o el mejor estado disponible del nicho;
- `CONCEPT_CANON` o el mejor estado disponible del concepto;
- audiencia;
- mercados;
- idioma público;
- objetivo de monetización inicial;
- objetivo a 90 días;
- restricciones del proyecto;
- cualquier información personal/narrativa ya proporcionada por el usuario.

### 7.2 Deseables

- `NAME_CANON`;
- tipo de creador;
- preferencias de edad/origen/residencia;
- profesión o rol deseado;
- referencias narrativas;
- límites de temas que el usuario no quiere usar.

### 7.3 Regla de no repetición

Si AIIF ya posee un dato válido y vigente, no debe volver a preguntarlo.

### 7.4 Si NAME_CANON aún no existe

La biografía puede continuar utilizando `ID_PROYECTO` o una etiqueta temporal no canónica.

La ausencia de nombre no obliga a detener toda F03.

---

## 8. Tres rutas de entrada

### Ruta A — El usuario ya tiene biografía

Ejemplos:

```text
“Ya tengo toda la historia.”
“Esta es su biografía.”
```

AIIF debe:

1. extraer los hechos;
2. clasificar procedencia y estado;
3. detectar contradicciones;
4. separar F03 de datos pertenecientes a fases posteriores;
5. preguntar solo por faltantes críticos;
6. validar;
7. proponer bloqueo cuando corresponda.

### Ruta B — El usuario tiene ideas parciales

Ejemplos:

```text
“Quiero que sea de [lugar], pero no sé qué estudió.”
“Tengo la edad y profesión, pero no su historia.”
```

AIIF debe conservar lo aportado y completar únicamente las áreas necesarias mediante propuestas claramente identificadas como `PROPUESTO_POR_IA`.

### Ruta C — El usuario no sabe qué historia crear

Ejemplos:

```text
“No sé.”
“Créala tú.”
“Recomiéndame.”
“Haz lo mejor.”
```

AIIF activa ayuda guiada y construye primero **Territorios Biográficos**, no una vida completa arbitraria en un único salto.

---

## 9. Inicio Fácil aplicado a F03

Mensaje conceptual recomendado:

> No necesitas tener inventada toda su historia. Usaré el nicho, el concepto, la audiencia y los objetivos que ya definimos para proponerte direcciones biográficas coherentes. Solo te pediré decisiones cuando realmente sean necesarias.

La IA debe variar el nivel de ayuda según la precisión del usuario.

No debe sobreexplicar cuando la instrucción sea clara.

---

## 10. Territorios Biográficos

Cuando el usuario parte desde cero, AIIF debe generar normalmente entre **2 y 4 Territorios Biográficos** suficientemente distintos.

Un Territorio Biográfico no es todavía una biografía completa. Es una dirección de vida plausible y estratégicamente compatible.

Ejemplos abstractos de tipos de dirección —no catálogo obligatorio—:

```text
CREATIVA / ARTÍSTICA
PROFESIONAL / ESPECIALISTA
COTIDIANA / CERCANA
COSMOPOLITA / ASPIRACIONAL
EMPRENDEDORA / CONSTRUCTORA
EXPLORADORA / VIAJERA
```

AIIF debe generar territorios específicos para el proyecto, no reutilizar siempre estas etiquetas.

Cada territorio debería explicar brevemente:

- tipo de origen/contexto;
- posible formación u ocupación;
- estilo de vida compatible;
- fortalezas narrativas;
- oportunidades de contenido;
- compatibilidad con monetización;
- riesgos de artificialidad o incoherencia.

---

## 11. Arquitectura de Biografía

AIIF puede estructurar la biografía mediante capas:

```text
IDENTIDAD BÁSICA
+
ORIGEN Y CONTEXTO
+
TRAYECTORIA / OCUPACIÓN
+
VIDA COTIDIANA Y VÍNCULOS
+
INTERESES Y RUTINAS
+
OBJETIVOS Y MOTIVACIONES
+
HITOS Y ELEMENTOS RECURRENTES
```

El objetivo no es maximizar cantidad de detalles.

> Solo se deben canonizar datos que aporten identidad, coherencia, storytelling, producción o continuidad.

---

## 12. Datos requeridos, deseables y opcionales

### 12.1 Requeridos para una F03 suficientemente definida

- identidad básica suficiente;
- edad/edad narrativa definida cuando sea necesaria;
- origen o contexto de procedencia suficiente;
- idiomas relevantes;
- ocupación/rol o explicación equivalente del estilo de vida;
- breve historia coherente;
- intereses/rutinas suficientes para sostener vida cotidiana;
- objetivos y motivaciones principales;
- ausencia de contradicciones críticas con F01/F02.

### 12.2 Deseables

- lugar de nacimiento;
- hitos relevantes;
- valores biográficos;
- relaciones recurrentes;
- mascotas;
- causas asociadas;
- sueños a largo plazo;
- lugares frecuentes;
- elementos recurrentes.

### 12.3 Opcionales

- árbol familiar detallado;
- cronología extensa;
- múltiples amistades con nombre;
- estudios completos;
- detalles de infancia;
- eventos secundarios que no afecten contenido ni identidad.

No bloquear F03 por información decorativa innecesaria.

---

## 13. Etapas internas del subsistema

Para no confundirse con F01–F13, el sistema utiliza etapas internas `BI00–BI16`.

```text
BI00 — Detectar ruta de entrada
BI01 — Cargar contexto y dependencias
BI02 — Crear Brief Biográfico
BI03 — Generar Territorios Biográficos
BI04 — Definir Identidad Básica
BI05 — Construir Origen y Contexto
BI06 — Construir Trayectoria / Ocupación
BI07 — Construir Intereses, Rutinas y Vida Social
BI08 — Construir Objetivos y Motivaciones
BI09 — Seleccionar Hitos y Elementos Recurrentes
BI10 — Crear Puentes hacia F04–F08
BI11 — Validar Cronología y Plausibilidad
BI12 — Simular Alternativas
BI13 — Construir Biografía Operativa
BI14 — Ejecutar Validación Canónica
BI15 — Presentar Recomendación
BI16 — Aprobar y Bloquear
```

Estas etapas son internas. El usuario no necesita aprender sus códigos.

---

## 14. BI02 — Brief Biográfico

Estructura conceptual:

```json
{
  "project_id": "[PROJECT_ID]",
  "name_canon": "[NAME_CANON_OR_NULL]",
  "niche_canon": "[NICHE_CANON]",
  "concept_canon": "[CONCEPT_CANON]",
  "audience": "[AUDIENCE]",
  "markets": ["[MARKET_01]"],
  "public_languages": ["[LANGUAGE_01]"],
  "monetization_initial": "[MONETIZATION]",
  "goal_90_days": "[GOAL]",
  "known_identity_facts": [],
  "known_biography_facts": [],
  "user_restrictions": [],
  "open_questions": []
}
```

La mayoría de campos deben recuperarse del proyecto.

---

## 15. BI04 — Identidad Básica

La identidad básica debe incluir únicamente lo necesario para definir quién es el avatar.

Estructura recomendada:

```json
{
  "name_canon": "[NAME_CANON_OR_NULL]",
  "age_or_apparent_age": "[AGE]",
  "nationality_or_origin": "[ORIGIN]",
  "birthplace": "[OPTIONAL]",
  "current_residence": "[RESIDENCE]",
  "languages": ["[LANGUAGE]"],
  "occupation_or_role": "[ROLE]"
}
```

No todo campo tiene que existir en todos los proyectos.

---

## 16. BI05–BI06 — Historia, contexto y trayectoria

La fuente experta indica que la historia, profesión, hitos, valores y creencias deben ayudar al storytelling, autoridad y justificación del estilo de vida. AIIF conserva esa función.

La historia debe responder, cuando sea útil:

- ¿de dónde viene?;
- ¿qué experiencias explican su presente?;
- ¿por qué ocupa su rol actual?;
- ¿cómo llegó al tipo de vida que muestra?;
- ¿qué hitos son relevantes para el contenido?;
- ¿qué elementos no deben contradecirse posteriormente?

### Regla contra biografías infladas

No inventar logros, títulos, tragedias, viajes, familias o credenciales solo para “hacerla interesante”.

Cada elemento debería justificar al menos una de estas funciones:

```text
IDENTIDAD
STORYTELLING
CONTENIDO
COHERENCIA
AUTORIDAD NARRATIVA
MONETIZACIÓN
CONTINUIDAD
```

---

## 17. Profesión, conocimientos y autoridad narrativa

La fuente experta permite una profesión real o ficticia dentro de la construcción del avatar.

AIIF debe distinguir:

```text
PROFESION_NARRATIVA
= parte de la historia del personaje

ROL_PUBLICO
= forma en que se presenta al público

CREDENCIAL_VERIFICABLE
= afirmación que requeriría respaldo real
```

Una profesión narrativa no debe convertirse automáticamente en una afirmación engañosa de credenciales reales.

Cuando el proyecto requiera autoridad técnica o profesional, las afirmaciones públicas deben revisarse conforme a las reglas aplicables del sistema y de la plataforma.

---

## 18. BI07 — Intereses, hobbies, rutinas y vida social

La fuente experta establece que hobbies, rutinas, amistades, familia, mascotas y colaboraciones pueden originar ideas de contenido, escenarios recurrentes y relaciones narrativas.

AIIF debe utilizarlos con intención.

### Selección recomendada

Definir un conjunto pequeño y reconocible de:

- intereses nucleares;
- hobbies;
- rutinas;
- lugares frecuentes;
- relaciones recurrentes;
- mascotas cuando aporten valor;
- rituales cotidianos;
- objetos o hábitos narrativos recurrentes.

### Regla

No convertir la vida social en una lista enciclopédica.

Preferir pocos elementos reutilizables y coherentes.

---

## 19. BI08 — Objetivos y motivaciones

La fuente experta indica que los objetivos y motivaciones humanizan el avatar, generan conexión emocional y permiten vender productos coherentes.

AIIF debe distinguir:

```text
OBJETIVO_DEL_NEGOCIO
= objetivo estratégico del proyecto, normalmente definido en F01

OBJETIVO_DEL_PERSONAJE
= lo que la influencer quiere lograr dentro de su narrativa

MOTIVACION
= por qué lo quiere

SUEÑO_A_LARGO_PLAZO
= dirección narrativa futura
```

Los cuatro pueden relacionarse, pero no deben confundirse.

---

## 20. BI09 — Hitos y elementos recurrentes

Los hitos deben ser pocos y funcionales.

Posibles categorías:

- hito de formación;
- cambio de ciudad/país;
- inicio de profesión/actividad;
- momento creativo relevante;
- decisión que explique el estilo de vida actual;
- logro narrativo que pueda referenciarse en contenido.

Los elementos recurrentes pueden incluir lugares, objetos, rituales o situaciones asociadas al avatar.

Su función es reforzar continuidad, no producir repetición mecánica.

---

## 21. BI10 — Puentes hacia fases posteriores

Para conservar la metodología experta original sin duplicar fases, F03 debe crear **puentes**.

### 21.1 Puente a F04 — Personaje y Psicología

Puede registrar:

- rasgos mencionados explícitamente por el usuario;
- comportamientos inferibles de la historia;
- contradicciones que F04 debe resolver;
- valores narrativos relevantes.

No debe declarar perfil psicológico definitivo.

### 21.2 Puente a F06 — Identidad Visual

Puede registrar:

- rasgos físicos proporcionados explícitamente;
- restricciones de apariencia;
- señales de estilo derivadas de biografía;
- lugares/contextos visuales recurrentes.

No debe cerrar fotografía, paleta, vestuario o cuerpo completo si F06 no los ha validado.

### 21.3 Puente a F07 — Voz

Puede registrar:

- idiomas;
- procedencia relevante para acento;
- educación/contexto que pueda influir en vocabulario.

No debe fijar la voz sintética definitiva.

### 21.4 Puente a F08 — Narrativa

Puede registrar:

- relaciones;
- lugares;
- hitos;
- conflictos leves o tensiones narrativas;
- sueños;
- objetivos.

F08 los convierte posteriormente en universo narrativo estructurado.

---

## 22. Cronología y plausibilidad

Antes de aprobar, AIIF debe revisar:

- edad <-> estudios/experiencia;
- edad <-> hitos;
- origen <-> idiomas;
- residencia <-> contexto;
- profesión <-> estilo de vida;
- historia <-> nicho;
- historia <-> concepto;
- objetivos <-> trayectoria;
- vida social <-> contenido propuesto;
- ausencia de contradicciones temporales.

No se exige realismo documental absoluto para una identidad virtual, pero sí **coherencia interna suficiente**.

---

## 23. Simulaciones biográficas

Antes de canonizar, AIIF puede comparar variantes sin aplicarlas.

Ejemplos:

```text
MÁS COTIDIANA
MÁS ASPIRACIONAL
MÁS PROFESIONAL
MÁS CREATIVA
MÁS COSMOPOLITA
MÁS MINIMALISTA
```

Las simulaciones deben cambiar únicamente las variables necesarias y explicar el impacto.

Una simulación nunca modifica automáticamente el canon.

---

## 24. Matriz de Comparación Biográfica

No se requiere una puntuación numérica obligatoria.

Matriz recomendada:

| Criterio | Opción A | Opción B | Opción C |
|---|---|---|---|
| Coherencia con F01 | [ ] | [ ] | [ ] |
| Coherencia con CONCEPT_CANON | [ ] | [ ] | [ ] |
| Naturalidad | [ ] | [ ] | [ ] |
| Potencial de storytelling | [ ] | [ ] | [ ] |
| Potencial de contenido | [ ] | [ ] | [ ] |
| Compatibilidad comercial | [ ] | [ ] | [ ] |
| Diferenciación | [ ] | [ ] | [ ] |
| Sostenibilidad | [ ] | [ ] | [ ] |
| Facilidad de continuidad | [ ] | [ ] | [ ] |
| Riesgo de contradicción | [ ] | [ ] | [ ] |

La recomendación debe explicar por qué una opción es preferible.

---

## 25. Biografía Operativa

Antes del texto largo o de la Biblia final, AIIF debe poder producir una versión compacta:

```json
{
  "identity_core": {
    "name": "[NAME]",
    "age": "[AGE]",
    "origin": "[ORIGIN]",
    "residence": "[RESIDENCE]",
    "languages": ["[LANGUAGE]"],
    "occupation": "[OCCUPATION]"
  },
  "biography_operational": {
    "origin_context": "[SUMMARY]",
    "trajectory": "[SUMMARY]",
    "interests": ["[INTEREST]"],
    "routines": ["[ROUTINE]"],
    "relationships": ["[RELATIONSHIP]"],
    "goals": ["[GOAL]"],
    "motivations": ["[MOTIVATION]"],
    "recurring_elements": ["[ELEMENT]"],
    "continuity_rules": ["[RULE]"]
  }
}
```

Esta versión sirve para contexto, portabilidad y fases posteriores.

---

## 26. Estados y roles

No se crean estados globales nuevos.

Se reutiliza:

```text
NO_DEFINIDO
→ PROPUESTO
→ BORRADOR
→ VALIDADO
→ APROBADO
→ BLOQUEADO
```

Cuando sea útil, se pueden usar propiedades de rol específicas:

```text
ROL_BIOGRAFIA:
TRABAJO
CANDIDATA
SIMULADA
RECOMENDADA
CANONICA
RETIRADA
RECHAZADA
```

Los hechos individuales conservan su propio `ESTADO`, `ORIGEN`, `CONFIANZA` y `ESTABILIDAD` en la Matriz Maestra.

---

## 27. Validador propuesto

Identificador técnico:

```text
VALIDADOR_DE_BIOGRAFIA_E_IDENTIDAD
```

Debe comprobar al menos:

### Completitud
- identidad básica suficiente;
- historia suficiente;
- ocupación/rol o explicación equivalente;
- intereses/rutinas mínimos;
- objetivos/motivaciones.

### Coherencia estratégica
- F03 <-> `NICHE_CANON`;
- F03 <-> `CONCEPT_CANON`;
- F03 <-> audiencia/mercados;
- F03 <-> monetización cuando corresponda.

### Coherencia interna
- cronología;
- edad;
- lugares;
- idiomas;
- profesión;
- hitos;
- relaciones;
- objetivos.

### Procedencia
- distinguir usuario / contexto / deducción / propuesta IA;
- no presentar propuesta como hecho aprobado.

### Límites de fase
- no cerrar F04–F09 de forma prematura;
- registrar puentes y restricciones en vez de duplicar fases.

### Canon
- exigir aprobación válida antes de bloqueo;
- impedir sobrescritura silenciosa de hechos bloqueados.

Resultados generales permitidos:

```text
VALIDA
VALIDA_CON_OBSERVACIONES
REQUIERE_AJUSTES
REQUIERE_DECISION_USUARIO
NO_APTA_PARA_BLOQUEO
```

---

## 28. Aprobación y canonización

Una recomendación no cambia el canon.

No constituyen aprobación suficiente por sí solas:

```text
“Me gusta.”
“Suena bien.”
“Puede funcionar.”
“Compárala.”
“Haz otra versión.”
```

Ejemplos de aprobación explícita válida:

```text
“Aprueba esta biografía.”
“Hazla canon.”
“Bloquea esta identidad y biografía.”
“Esta será su biografía definitiva.”
```

Después de validación y aprobación:

```json
{
  "identity_core_canon": "[APPROVED_IDENTITY_CORE]",
  "biography_canon": "[APPROVED_BIOGRAPHY]",
  "status": "BLOQUEADO",
  "approved_by_user": true,
  "effective_date": "[DATE]"
}
```

---

## 29. Aprobación granular

F03 contiene muchos hechos. No todo necesita aprobarse en un único acto.

AIIF puede permitir:

- aprobación de un atributo;
- aprobación de un bloque;
- aprobación de una subfase;
- aprobación final de F03.

Ejemplo:

```text
Origen → aprobado
Idiomas → aprobado
Profesión → en revisión
Historia → borrador
```

El cierre completo de F03 solo ocurre cuando los datos críticos están suficientemente aprobados y validados.

---

## 30. Revalidación progresiva

Una vez cerrada F03, las fases posteriores deben contrastarse contra ella.

```text
F04 <-> Biografía / identidad
F05 <-> Biografía / objetivos / historia
F06 <-> Rasgos físicos y estilo de vida
F07 <-> Idiomas / contexto / procedencia
F08 <-> Hitos / relaciones / lugares / motivaciones
F09 <-> Rutinas / intereses / objetivos / contenido
F11 <-> Objetivos / profesión / monetización
```

Si una fase posterior detecta una contradicción crítica:

1. no modificar F03 silenciosamente;
2. registrar el conflicto;
3. marcar los datos/fases correspondientes `REQUIERE_VALIDACION` o `REQUIERE_REVISION`;
4. abrir flujo de cambio si es necesario.

---

## 31. Gobernanza de cambios posteriores

Una nueva publicación, campaña, outfit, hobby temporal o tendencia no modifica automáticamente `BIOGRAPHY_CANON`.

Modificar un hecho bloqueado requiere:

```text
INSTRUCCIÓN EXPLÍCITA
→ PUNTO DE CONTROL
→ RAMA DE REVISIÓN
→ PROPUESTA
→ ANÁLISIS DE IMPACTO
→ VALIDACIÓN
→ APROBACIÓN
→ REGISTRO DEL CAMBIO
→ ACTUALIZACIÓN DE VERSIÓN
→ REVALIDACIÓN DE DERIVADOS
```

Los datos anteriores deben conservarse como historial cuando sean relevantes.

---

## 32. Qué no debe hacer AIIF

1. No inventar una vida completa y marcarla como aprobada.
2. No añadir tragedias, logros o familiares solo para aumentar dramatismo.
3. No confundir un hobby temporal con un rasgo permanente.
4. No confundir profesión narrativa con credencial real verificable.
5. No cerrar personalidad profunda dentro de F03.
6. No cerrar identidad visual completa dentro de F03.
7. No convertir detalles de una simulación en canon.
8. No repetir preguntas ya resueltas.
9. No sobrescribir `NAME_CANON`, `NICHE_CANON` o `CONCEPT_CANON`.
10. No borrar historial para simplificar el proyecto.
11. No usar datos específicos de otro influencer como plantilla implícita.
12. No afirmar que una propuesta proviene de la fuente experta si fue añadida como adaptación de AIIF.

---

## 33. Compatibilidad de plataforma

F03 debe funcionar en el **Modo Básico Universal**.

No requiere navegación web para su flujo base.

Cuando sea útil verificar información externa —por ejemplo, plausibilidad cultural, geográfica o profesional— la plataforma puede hacerlo si dispone de capacidad y si la verificación es relevante.

Estados de verificación externa:

```text
VERIFICADO
PARCIALMENTE_VERIFICADO
NO_VERIFICADO
NO_DISPONIBLE
```

La falta de navegación no bloquea la construcción biográfica.

---

## 34. Idioma y localización

La documentación canónica del sistema se mantiene en español.

La biografía puede contener:

- `IDIOMA_SISTEMA`;
- `IDIOMA_INTERFAZ`;
- `IDIOMA_PUBLICO_INFLUENCER`;
- idiomas secundarios;
- idiomas narrativamente hablados por el avatar.

No inferir automáticamente nacionalidad, residencia o cultura por el idioma de interfaz.

Las versiones localizadas de la biografía son representaciones del mismo canon, no biografías independientes.

---

## 35. UX visible recomendada

El usuario normal no debe ver `BI00–BI16` salvo que solicite detalle técnico.

Experiencia sugerida:

```text
¿YA TIENES SU HISTORIA?
       │
       ├── Sí → validar y estructurar
       ├── Tengo partes → completar
       └── No → descubrir juntos

IDENTIDAD
↓
HISTORIA
↓
VIDA Y CONTEXTO
↓
MOTIVACIONES
↓
COHERENCIA
↓
APROBACIÓN
```

Después de varias decisiones, AIIF puede mostrar:

```text
QUÉ SABEMOS
QUÉ FALTA
QUÉ SIGUE
```

---

## 36. Profundidades

Se reutilizan las profundidades canónicas.

### NUCLEO

- identidad básica;
- historia compacta;
- ocupación/rol;
- intereses principales;
- objetivo/motivación;
- validación esencial.

### AMPLIADO — predeterminado

- territorios biográficos;
- historia más desarrollada;
- rutinas;
- relaciones relevantes;
- hitos;
- sueños;
- elementos recurrentes;
- matriz comparativa cuando haga falta.

### PROFUNDO

- cronología ampliada;
- relaciones más completas;
- múltiples hitos;
- simulaciones alternativas;
- mayor revisión de coherencia cultural/profesional;
- puentes documentados hacia fases posteriores.

Profundidad no significa inventar más información de la necesaria.

---

## 37. Portabilidad

El Paquete Portable, Paquete Portable Ligero o Archivo Universal de Reanudación debe incluir, según nivel de detalle:

- estado de F03;
- `IDENTITY_CORE_CANON`;
- `BIOGRAPHY_CANON` o `BIOGRAPHY_OPERATIONAL`;
- hechos bloqueados;
- hechos pendientes;
- restricciones;
- procedencia de decisiones relevantes;
- relaciones/hitos necesarios para continuidad;
- puentes a F04–F08;
- último punto de control;
- próxima acción.

El paquete debe ser suficiente para continuar F03 o consumir sus resultados en otra IA sin reconstruir la historia desde cero.

---

## 38. Algoritmo operativo resumido

```pseudo
INPUT project_context

load_system00()
load_F01()
load_F02()
load_naming_state()

route = detect_biography_input_route()

if route == FULL_BIOGRAPHY:
    extract_and_classify_user_facts()
elif route == PARTIAL_BIOGRAPHY:
    preserve_known_facts()
    identify_critical_gaps()
else:
    build_biography_brief()
    generate_biographical_territories()
    present_small_option_set()

build_identity_core()
build_origin_and_context()
build_trajectory_or_role()
build_interests_routines_social_context()
build_goals_and_motivations()
select_relevant_milestones_and_recurring_elements()

create_bridges_to_F04_F08()
validate_chronology_and_internal_coherence()
validate_against_niche_and_concept()

if meaningful_alternatives_exist:
    simulate_without_applying()
    compare_options()

build_biography_operational()
run_VALIDADOR_DE_BIOGRAFIA_E_IDENTIDAD()
present_recommendation()

WAIT_FOR_EXPLICIT_USER_APPROVAL()

if approved_and_valid:
    lock_identity_core_canon()
    lock_biography_canon()
    update_master_data_matrix()
    create_checkpoint()
    prepare_F03_deliverable()
else:
    preserve_current_state()
    continue_refinement()
```

---

## 39. Output técnico antes de aprobación

```json
{
  "f03_biography_identity": {
    "status": "BORRADOR|VALIDADO|REQUIERE_AJUSTES",
    "route": "EXISTING|PARTIAL|DISCOVERY",
    "identity_core": {},
    "biographical_territories": [],
    "biography_working": {},
    "biography_operational": {},
    "simulations": [],
    "continuity_rules": [],
    "bridges": {
      "F04": [],
      "F06": [],
      "F07": [],
      "F08": []
    },
    "open_questions": [],
    "validator_result": "[RESULT]",
    "approval_required": true
  }
}
```

---

## 40. Output técnico después de aprobación

```json
{
  "f03_canonical_identity": {
    "identity_core_canon": {},
    "biography_canon": {},
    "name_canon_reference": "[NAME_CANON]",
    "status": "BLOQUEADO",
    "approved_by_user": true,
    "version": "[VERSION]",
    "effective_date": "[DATE]",
    "historical_variants_preserved": true,
    "downstream_revalidation_required": []
  }
}
```

---

## 41. Mapeo de la especificación experta a AIIF

| Elemento de la fuente experta | Tratamiento en AIIF |
|---|---|
| Identidad básica | F03, canónica |
| Historia y contexto | F03, canónica |
| Profesión real o ficticia | F03 como profesión/rol narrativo; controlar afirmaciones públicas |
| Logros/hitos | F03, solo los funcionales |
| Valores y creencias | F03 como hechos/puentes; desarrollo psicológico en F04 |
| Apariencia física | Hechos explícitos pueden registrarse en F03; sistema visual completo en F06 |
| Personalidad y tono | Pistas/restricciones en F03; desarrollo completo en F04/F07 |
| Intereses y hobbies | F03, canónicos cuando se aprueben |
| Familia/amigos/mascotas | F03 si aportan continuidad; expansión narrativa en F08 |
| Objetivos y motivaciones | F03, distinguiendo personaje de negocio |
| Paleta/estética | Puente; definición completa en F06 |
| Lugares frecuentes | F03 como hechos recurrentes; expansión en F08/F09 |
| Elementos recurrentes | F03 como continuidad; operacionalización en F08/F09 |
| Biografía como “documento maestro” | Referencia biográfica fundamental; fuente de verdad operacional sigue siendo Sistema 00 / Matriz Maestra |

---

## 42. Entregable de F03

Cuando F03 esté completa, el entregable oficial sigue siendo:

# Biblia de Biografía e Identidad

Debe contener como mínimo:

1. resumen de identidad;
2. identidad básica canónica;
3. biografía canónica;
4. cronología esencial;
5. profesión/rol;
6. intereses y rutinas;
7. vida social relevante;
8. objetivos y motivaciones;
9. hitos y elementos recurrentes;
10. reglas de continuidad;
11. puentes hacia fases posteriores;
12. datos pendientes no bloqueantes;
13. versión y estado de aprobación.

---

## 43. Principio final

> **AI Influencer Factory debe poder construir una biografía e identidad coherentes aunque el usuario no sepa inventarlas. Debe conservar toda información proporcionada por el creador, recuperar el contexto ya aprobado, proponer únicamente lo necesario, comparar direcciones cuando exista incertidumbre, mantener trazabilidad de cada hecho y exigir aprobación antes de bloquear `IDENTITY_CORE_CANON` y `BIOGRAPHY_CANON`. F03 constituye la base biográfica de continuidad, mientras F04–F09 desarrollan personalidad, marca, visual, voz, narrativa y contenido sin sobrescribir silenciosamente los hechos aprobados.**

---

## 44. Estado de esta especificación

**Estado:** `PROPUESTA_LISTA_PARA_APROBACION`. Esta especificación no se convierte en canon funcional de AIIF hasta recibir aprobación explícita del usuario conforme a las reglas de gobernanza vigentes.
