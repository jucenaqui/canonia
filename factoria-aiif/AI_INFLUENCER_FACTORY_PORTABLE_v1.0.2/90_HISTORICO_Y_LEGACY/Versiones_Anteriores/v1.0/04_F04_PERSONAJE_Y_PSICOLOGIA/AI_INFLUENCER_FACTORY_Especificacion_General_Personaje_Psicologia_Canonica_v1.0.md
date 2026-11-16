---
spec_id: AIIF_GENERAL_CHARACTER_PSYCHOLOGY_CANON_SPEC
spec_version: "1.0.0"
spec_type: AIIF_CHARACTER_PSYCHOLOGY_DISCOVERY_AND_CANONIZATION_SPEC
status: PROPUESTA_LISTA_PARA_APROBACION
phase: "F04 - Personaje y Psicología"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "Biografía Influencer Digital con IA.docx"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Definición y Canonización de Personaje y Psicología
### Versión 1.0.0 - Propuesta lista para aprobación

## 1. Propósito

Esta especificación define un sistema reutilizable para que AI Influencer Factory (AIIF) pueda ayudar a **descubrir, construir, comparar, probar, validar y bloquear el personaje y el modelo psicológico operativo** de una influencer virtual, incluso cuando el creador no sepa definir rasgos de personalidad, comportamiento, energía emocional, humor, estilo social, arquetipos o marcos como Big Five y MBTI.

El sistema se integra principalmente en **F04 - Personaje y Psicología** y utiliza como fundamento metodológico la especificación original de expertos proporcionada al inicio del proyecto.

La fuente experta exige generar **Personalidad** y **Psicología (MBTI, Big Five, arquetipo, etc.)** y establece que personalidad y tono determinan cómo se comporta el avatar, incluyendo rasgos de carácter, forma de expresarse, energía emocional y humor. AIIF conserva esa intención y la convierte en un sistema asistido, trazable y canonizable.

Flujo visible recomendado:

```text
DIRECCION DE PERSONAJE
        ->
OPCIONES
        ->
PRUEBAS DE COMPORTAMIENTO
        ->
PERSONAJE RECOMENDADO
        ->
PERSONAJE Y PSICOLOGIA CANONICOS
```

La complejidad técnica permanece interna.

---

## 2. Procedencia y regla de fidelidad experta

### 2.1 Base experta

La especificación original de expertos define como elementos relevantes:

- identidad completa;
- personalidad;
- psicología mediante MBTI, Big Five, arquetipo u otros marcos;
- marca personal;
- identidad visual;
- contenido;
- storytelling;
- monetización;
- reglas de consistencia.

La plantilla experta de biografía añade que la personalidad y el tono incluyen:

- rasgos de carácter;
- forma de expresarse;
- energía emocional;
- tipo de humor cuando aplique;
- impacto sobre captions, videos hablados, audios y roleplay.

### 2.2 Adaptación AIIF

AIIF conserva esos componentes, pero establece una distinción necesaria:

```text
RASGOS Y REGLAS DE COMPORTAMIENTO APROBADOS
= verdad canónica del personaje

MARCOS PSICOLOGICOS INTERPRETATIVOS
= herramientas para describir, comprobar o resumir el personaje
```

Por tanto:

> Un resultado de MBTI, Big Five o arquetipo nunca debe sobrescribir rasgos, biografía, concepto o comportamiento ya aprobados.

### 2.3 Extensiones propias de AIIF

Los siguientes elementos son adaptaciones arquitectónicas de AIIF y no deben atribuirse a la fuente experta original como si hubieran estado formalizados allí:

- tres rutas de entrada;
- Territorios de Personaje;
- Matriz de Comportamiento Contextual;
- Pruebas de Comportamiento;
- etapas internas `PS00-PS16`;
- `CHARACTER_CANON`;
- `PSYCHOLOGY_MODEL_CANON`;
- `VALIDADOR_DE_PERSONAJE_Y_PSICOLOGIA`;
- gobernanza de cambios y portabilidad bajo Sistema 00.

---

## 3. Ubicación en la arquitectura

El sistema pertenece a:

```text
F01 - Fundamentos Estrategicos
        ->
F02 - Concepto
        ->
F03 - Biografia e Identidad
        ->
F04 - Personaje y Psicologia
        ->
F05 - Identidad de Marca
F06 - Identidad Visual
F07 - Identidad Verbal y Voz
F08 - Universo Narrativo
F09 - Sistema de Contenido
```

No crea una fase global adicional.

---

## 4. Principio central

> **El usuario no debe necesitar conocimientos de psicología para diseñar un personaje consistente. AIIF debe convertir el nicho, concepto, biografía, motivaciones y preferencias del creador en opciones de personalidad y comportamiento, probarlas en situaciones reales de uso, explicar sus implicaciones y exigir aprobación antes de bloquear el personaje canónico.**

El objetivo no es crear una colección de etiquetas psicológicas.

El objetivo es crear un personaje que:

- se comporte de manera reconocible;
- conserve una energía emocional coherente;
- reaccione de forma consistente;
- tenga matices suficientes para no sentirse plano;
- pueda sostener contenido y relaciones narrativas;
- sea compatible con marca, voz y monetización;
- pueda recrearse en distintas IAs sin perder identidad conductual.

---

## 5. Qué es y qué no es F04

### 5.1 F04 sí define

- rasgos nucleares de carácter;
- rasgos secundarios;
- baseline o línea base emocional;
- orientación social;
- forma general de relacionarse;
- nivel de espontaneidad o control;
- estilo de toma de decisiones;
- estilo general frente a conflicto, crítica, error y presión narrativa;
- tipo y límites de humor;
- grados de apertura, reserva, calidez, energía y asertividad;
- contradicciones humanas controladas;
- reglas de comportamiento;
- comportamientos prohibidos o incompatibles;
- arquetipos de personaje cuando aporten valor;
- perfil Big Five operativo cuando aporte valor;
- MBTI u otros marcos como descriptor opcional;
- matriz de comportamiento contextual;
- puentes para F05, F07, F08 y F09.

### 5.2 F04 no debe cerrar prematuramente

- misión, visión o propuesta de valor de marca -> F05;
- estilo visual, rostro, paleta y vestuario -> F06;
- vocabulario, ritmo verbal, pronunciación y voz sintética -> F07;
- mundo narrativo completo y relaciones desarrolladas -> F08;
- pilares, formatos y calendario de contenido -> F09;
- estrategia comercial completa -> F11.

F04 define **cómo es y cómo tiende a comportarse** el personaje. Las otras fases convierten esa psicología en sistemas especializados.

---

## 6. Fuente de verdad y capas del sistema

Sistema 00 / Matriz Maestra de Datos continúa siendo la fuente operacional de verdad.

F04 utiliza las siguientes capas conceptuales:

```text
CHARACTER_WORKING
= personaje todavía en exploración

CHARACTER_PROFILE
= perfil operativo estructurado

PSYCHOLOGY_MODEL
= representación interpretativa del perfil

BEHAVIORAL_RULES
= reglas de comportamiento observables y reutilizables

CHARACTER_CANON
= personaje aprobado y bloqueado

PSYCHOLOGY_MODEL_CANON
= modelo psicológico operativo aprobado
```

`PSYCHOLOGY_MODEL_CANON` no es un diagnóstico médico ni clínico.

---

## 7. Dependencias de entrada

### 7.1 Requeridos o recuperables

F04 debe recuperar automáticamente cuando estén disponibles:

- `NICHE_CANON`;
- `CONCEPT_CANON`;
- `IDENTITY_CORE_CANON`;
- `BIOGRAPHY_CANON` o biografía operativa vigente;
- objetivos y motivaciones del personaje;
- intereses y rutinas relevantes;
- audiencia;
- mercados;
- monetización inicial;
- restricciones y decisiones ya bloqueadas.

### 7.2 Deseables

- rasgos de personalidad aportados por el usuario;
- referencias de energía o actitud;
- arquetipos deseados;
- personajes o estilos de comportamiento de referencia, sin copiar identidades reales;
- límites de humor;
- nivel deseado de cercanía con audiencia;
- preferencias sobre reserva, espontaneidad o autoridad.

### 7.3 Regla de no repetición

Si el sistema ya posee un dato válido, no debe volver a preguntarlo.

---

## 8. Tres rutas de entrada

### Ruta A - El usuario ya sabe cómo es el personaje

Ejemplos:

```text
"Quiero que sea serena, segura, observadora y cercana."
"Ya tengo toda su personalidad."
```

AIIF debe:

1. extraer los rasgos y reglas;
2. detectar contradicciones;
3. separar comportamiento observable de etiquetas interpretativas;
4. probar consistencia contextual;
5. completar solo faltantes críticos;
6. validar;
7. proponer aprobación.

### Ruta B - El usuario tiene ideas parciales

Ejemplos:

```text
"Quiero que sea elegante pero no fria."
"Debe ser extrovertida, pero no exagerada."
```

AIIF conserva esas instrucciones y propone únicamente las dimensiones faltantes.

### Ruta C - El usuario no sabe

Ejemplos:

```text
"No se."
"Recomiendame."
"Decide tu."
"Haz lo mejor."
```

AIIF construye **Territorios de Personaje** a partir del contexto F01-F03.

---

## 9. Inicio Fácil aplicado a F04

Mensaje conceptual recomendado:

> No necesitas conocer MBTI, Big Five ni teoría de arquetipos. Primero definiremos cómo quieres que se sienta y se comporte tu influencer. Después, si aporta valor, usaré esos marcos para comprobar y documentar la coherencia.

La IA debe evitar convertir F04 en un cuestionario psicológico técnico para principiantes.

---

## 10. Territorios de Personaje

Cuando el usuario parte desde cero o existe incertidumbre, AIIF debe generar normalmente **2 a 4 Territorios de Personaje** estratégicamente distintos.

Un territorio no es un personaje completo. Es una dirección conductual.

Ejemplos abstractos no obligatorios:

```text
SERENA / MAGNETICA
CALIDA / ESPONTANEA
SOFISTICADA / RESERVADA
ENERGICA / SOCIAL
CURIOSA / OBSERVADORA
SEGURA / DIDACTICA
```

Cada territorio debería explicar brevemente:

- impresión emocional;
- rasgos dominantes;
- estilo social;
- fortalezas para contenido;
- compatibilidad con `CONCEPT_CANON`;
- compatibilidad con audiencia y monetización;
- riesgos de exageración o incoherencia.

AIIF debe crear territorios específicos para el proyecto, no seleccionar siempre de una lista fija.

---

## 11. Arquitectura del Personaje

AIIF puede construir el personaje mediante capas:

```text
RASGOS NUCLEARES
+
LINEA BASE EMOCIONAL
+
ESTILO SOCIAL
+
ESTILO DE DECISION
+
HUMOR Y EXPRESIVIDAD
+
RESPUESTAS CONTEXTUALES
+
MATICES / CONTRADICCIONES CONTROLADAS
+
REGLAS DE COMPORTAMIENTO
```

El objetivo es producir un sistema conductual utilizable, no una descripción literaria extensa.

---

## 12. Rasgos nucleares y secundarios

### 12.1 Rasgos nucleares

Normalmente deben existir entre **3 y 5 rasgos nucleares** suficientemente distintivos.

Son rasgos que deberían permanecer reconocibles en la mayoría de situaciones.

Ejemplo abstracto:

```text
serena
curiosa
segura
cercana
observadora
```

### 12.2 Rasgos secundarios

Pueden modular situaciones específicas sin definir toda la personalidad.

### 12.3 Regla de operacionalización

Cada rasgo importante debe poder traducirse a comportamiento.

No basta con:

```text
"es carismatica"
```

AIIF debería poder documentar:

```text
RASGO: carismatica
SE MANIFIESTA COMO:
- presta atencion al interlocutor;
- responde con energia moderada;
- expresa entusiasmo sin dominar la conversacion.
```

---

## 13. Línea base emocional

La línea base emocional describe el estado predominante desde el que el personaje suele interactuar.

Ejemplos de dimensiones:

- serenidad;
- calidez;
- seguridad;
- optimismo;
- energía;
- curiosidad;
- reserva;
- intensidad emocional.

No significa que el personaje tenga una sola emoción.

> La línea base es un punto de retorno, no una prohibición de variación emocional.

---

## 14. Estilo social e interpersonal

F04 debe definir cómo tiende a relacionarse.

Puede considerar:

- introversión / extroversión funcional;
- distancia social;
- nivel de apertura;
- calidez;
- asertividad;
- cooperación;
- necesidad de privacidad;
- forma de recibir atención;
- estilo ante desconocidos, comunidad y colaboradores.

El objetivo no es etiquetar clínicamente, sino producir reglas observables.

---

## 15. Humor y expresividad

La fuente experta incluye el tipo de humor cuando aplica.

F04 debe poder definir:

- presencia o ausencia de humor;
- frecuencia;
- intensidad;
- estilos compatibles;
- estilos prohibidos;
- grado de ironía;
- autoironía;
- juego verbal;
- límites frente a sarcasmo, burla o agresividad.

F04 define la **función conductual** del humor. F07 definirá su realización verbal detallada.

---

## 16. Estilo de decisión y reacción

AIIF debe definir tendencias de comportamiento en situaciones que revelan personalidad.

Dimensiones útiles:

- reflexiva vs. impulsiva;
- estructurada vs. improvisadora;
- directa vs. diplomática;
- prudente vs. exploradora;
- orientada a personas vs. tarea;
- competitiva vs. cooperativa;
- tolerancia narrativa al riesgo;
- respuesta a equivocaciones;
- respuesta a crítica;
- respuesta a conflicto.

Estas dimensiones no son diagnósticos. Son reglas de diseño del personaje.

---

## 17. Contradicciones humanas controladas

Un personaje completamente uniforme puede sentirse artificial.

AIIF puede aprobar **contradicciones controladas** que aporten profundidad, por ejemplo:

```text
segura en publico + reservada con su vida privada
sofisticada + disfruta rituales cotidianos simples
social + necesita momentos de soledad
ambiciosa + evita presumir
```

Una contradicción válida debe ser explicable y estable.

No debe convertirse en inconsistencia aleatoria.

---

## 18. Matriz de Comportamiento Contextual

AIIF debe poder representar cómo se expresa el mismo personaje en distintos contextos.

| Contexto | Estado / postura | Conducta esperada | Evitar |
|---|---|---|---|
| Comunidad cotidiana | [BASELINE] | [CONDUCTA] | [EVITAR] |
| Colaboración de marca | [BASELINE] | [CONDUCTA] | [EVITAR] |
| Tutorial o explicación | [BASELINE] | [CONDUCTA] | [EVITAR] |
| Celebración | [VARIACION] | [CONDUCTA] | [EVITAR] |
| Crítica o desacuerdo | [VARIACION] | [CONDUCTA] | [EVITAR] |
| Error propio | [VARIACION] | [CONDUCTA] | [EVITAR] |
| Situación íntima narrativa | [VARIACION] | [CONDUCTA] | [EVITAR] |

No todos los contextos son obligatorios.

La matriz debe demostrar **consistencia con variación**, no repetición mecánica.

---

## 19. Marcos psicológicos: principio de uso

La fuente experta pide psicología mediante MBTI, Big Five, arquetipo, etc.

AIIF los conserva como **marcos de diseño e interpretación**, con estas reglas:

1. son secundarios frente al comportamiento aprobado;
2. no son diagnósticos clínicos;
3. no son obligatorios si no aportan valor;
4. no deben forzarse para hacer coincidir al personaje con una etiqueta;
5. pueden cambiar como representación si los rasgos canónicos no cambian;
6. deben documentar nivel de confianza o grado de ajuste cuando corresponda.

---

## 20. Big Five operativo

Big Five puede utilizarse como una representación dimensional del personaje.

AIIF puede expresar cada dimensión de forma cualitativa o semicuantitativa, por ejemplo:

```text
APERTURA: BAJA | MEDIA | ALTA
RESPONSABILIDAD: BAJA | MEDIA | ALTA
EXTRAVERSION: BAJA | MEDIA | ALTA
AMABILIDAD: BAJA | MEDIA | ALTA
REACTIVIDAD_EMOCIONAL: BAJA | MEDIA | ALTA
```

### Regla

El perfil debe derivarse de rasgos y comportamiento definidos, no al revés.

No se requiere un porcentaje artificial si no existe base para él.

---

## 21. MBTI como descriptor opcional

MBTI puede usarse cuando el usuario lo solicita o cuando resulte útil como shorthand creativo.

La salida debe tratarse como:

```text
MBTI_DESCRIPTOR
= descriptor orientativo del personaje
```

No como:

```text
DIAGNOSTICO
VERDAD CIENTIFICA ABSOLUTA
REGLA QUE OBLIGA A CAMBIAR EL PERSONAJE
```

Si un código MBTI contradice el perfil conductual aprobado, prevalece el perfil conductual.

---

## 22. Arquetipos: desambiguación obligatoria

La fuente experta utiliza “ARQUETIPO” en más de un sentido potencial: como tipo de creador o rol (por ejemplo, categorías temáticas/profesionales) y como parte de la psicología.

AIIF debe distinguir:

```text
ARQUETIPO_DE_CREADOR
= rol, categoria o identidad funcional del creador

ARQUETIPO_DE_PERSONAJE
= patron narrativo o psicologico usado para describir conducta
```

No deben mezclarse automáticamente.

Un arquetipo puede orientar, pero no reemplaza `CHARACTER_CANON`.

---

## 23. Etapas internas del subsistema

Para no confundirse con F01-F13, F04 utiliza etapas internas `PS00-PS16`.

```text
PS00 - Detectar ruta de entrada
PS01 - Cargar contexto F01-F03
PS02 - Crear Brief de Personaje
PS03 - Generar Territorios de Personaje
PS04 - Definir Rasgos Nucleares
PS05 - Definir Linea Base Emocional
PS06 - Definir Estilo Social e Interpersonal
PS07 - Definir Humor y Expresividad
PS08 - Definir Decision, Conflicto y Reaccion
PS09 - Construir Contradicciones Controladas
PS10 - Construir Matriz de Comportamiento Contextual
PS11 - Derivar Marcos Psicologicos
PS12 - Ejecutar Pruebas de Comportamiento
PS13 - Comparar Alternativas
PS14 - Construir Perfil Operativo
PS15 - Validar y Recomendar
PS16 - Aprobar y Bloquear
```

Los códigos son internos.

---

## 24. PS02 - Brief de Personaje

Estructura conceptual:

```json
{
  "project_id": "[PROJECT_ID]",
  "niche_canon": "[NICHE_CANON]",
  "concept_canon": "[CONCEPT_CANON]",
  "identity_core_canon": "[IDENTITY_CORE_CANON]",
  "biography_canon": "[BIOGRAPHY_CANON]",
  "audience": "[AUDIENCE]",
  "markets": ["[MARKET_01]"],
  "monetization_initial": "[MONETIZATION]",
  "known_personality_traits": [],
  "known_behavioral_rules": [],
  "user_preferences": [],
  "user_restrictions": [],
  "open_questions": []
}
```

La mayoría de los campos deben recuperarse automáticamente.

---

## 25. Pruebas de Comportamiento

Antes de aprobar, AIIF debe poder probar el personaje en situaciones hipotéticas.

Estas pruebas no generan todavía la voz final de F07 ni el contenido final de F09.

Ejemplos:

```text
PRUEBA 1: alguien elogia su trabajo
PRUEBA 2: recibe una critica razonable
PRUEBA 3: comete un error publico menor
PRUEBA 4: una marca propone una colaboracion
PRUEBA 5: explica algo a su comunidad
PRUEBA 6: celebra un logro
PRUEBA 7: protege un limite de privacidad
```

La IA debe evaluar:

- coherencia;
- naturalidad;
- reconocibilidad;
- estabilidad de rasgos;
- capacidad de variar sin cambiar de personalidad;
- compatibilidad con biografía y concepto.

---

## 26. Simulaciones sin alterar el canon

Antes del bloqueo, AIIF puede simular variantes como:

```text
MAS CALIDA
MAS RESERVADA
MAS JUGUETONA
MAS SEGURA
MAS MISTERIOSA
MAS ENERGICA
MAS DIDACTICA
MAS ESPONTANEA
```

La comparación debe mostrar qué cambia y qué se mantiene.

Una simulación nunca modifica automáticamente `CHARACTER_CANON`.

---

## 27. Matriz de Comparación de Personaje

Cuando existan alternativas significativas, se recomienda comparar cualitativamente.

| Criterio | Opción A | Opción B | Opción C |
|---|---|---|---|
| Coherencia con `CONCEPT_CANON` | [ ] | [ ] | [ ] |
| Coherencia con biografía | [ ] | [ ] | [ ] |
| Diferenciación | [ ] | [ ] | [ ] |
| Naturalidad | [ ] | [ ] | [ ] |
| Potencial narrativo | [ ] | [ ] | [ ] |
| Compatibilidad con audiencia | [ ] | [ ] | [ ] |
| Compatibilidad de marca futura | [ ] | [ ] | [ ] |
| Capacidad de voz futura | [ ] | [ ] | [ ] |
| Capacidad de contenido | [ ] | [ ] | [ ] |
| Estabilidad contextual | [ ] | [ ] | [ ] |

No se requiere un `CHARACTER_SCORE` numérico obligatorio.

---

## 28. Perfil Operativo de Personaje

Antes de la canonización, AIIF debe poder producir una versión compacta y utilizable:

```json
{
  "character_profile": {
    "core_traits": ["[TRAIT_01]", "[TRAIT_02]"],
    "secondary_traits": [],
    "emotional_baseline": ["[BASELINE_01]"],
    "social_style": "[SOCIAL_STYLE]",
    "decision_style": "[DECISION_STYLE]",
    "humor": {
      "presence": "[LOW|MEDIUM|HIGH]",
      "compatible_styles": [],
      "prohibited_styles": []
    },
    "controlled_contradictions": [],
    "behavioral_rules": [],
    "prohibited_behaviors": []
  }
}
```

Este perfil debe ser suficientemente corto para reutilizarse en prompts y paquetes portables.

---

## 29. Reglas de comportamiento

Las reglas de comportamiento deben transformar personalidad en instrucciones reutilizables.

Ejemplos estructurales:

```text
MANTENER:
- [BEHAVIOR_RULE_01]
- [BEHAVIOR_RULE_02]

EVITAR:
- [PROHIBITED_BEHAVIOR_01]
- [PROHIBITED_BEHAVIOR_02]
```

Deben ser observables y accionables.

Evitar reglas vagas como:

```text
"ser interesante"
"tener buena personalidad"
```

---

## 30. Validación inicial

Antes de bloquear F04, validar al menos:

```text
personaje <-> NICHE_CANON
personaje <-> CONCEPT_CANON
personaje <-> BIOGRAPHY_CANON
personaje <-> objetivos y motivaciones
personaje <-> audiencia
personaje <-> monetizacion inicial
rasgos <-> comportamiento contextual
marcos psicologicos <-> rasgos aprobados
```

También validar:

- ausencia de contradicciones críticas;
- diferenciación suficiente;
- naturalidad;
- capacidad de sostener variación emocional;
- capacidad narrativa;
- compatibilidad con fases posteriores.

---

## 31. VALIDADOR_DE_PERSONAJE_Y_PSICOLOGIA

Se propone incorporar:

```text
VALIDADOR_DE_PERSONAJE_Y_PSICOLOGIA
```

### 31.1 Debe comprobar

- contexto mínimo suficiente;
- coherencia con F01-F03;
- que los rasgos tengan manifestaciones conductuales;
- que la línea base emocional no impida variación natural;
- que no existan contradicciones no resueltas;
- que los marcos psicológicos no gobiernen sobre el canon conductual;
- que no se presenten etiquetas clínicas no justificadas;
- que el personaje sea reconocible en varios contextos;
- que no se invadan F05-F09;
- que exista aprobación explícita antes del bloqueo.

### 31.2 Resultados

Utiliza los resultados generales canónicos:

```text
VALIDA
VALIDA_CON_OBSERVACIONES
REQUIERE_AJUSTES
REQUIERE_DECISION_USUARIO
NO_APTA_PARA_BLOQUEO
```

---

## 32. Diagnóstico clínico y salud mental

Por defecto, F04 **no debe diagnosticar** trastornos, condiciones de salud mental ni patologías para hacer al personaje más interesante.

Marcos como MBTI, Big Five o arquetipos no deben presentarse como diagnósticos médicos.

Si un proyecto introduce explícitamente un atributo clínico o de salud, debe tratarse con el nivel de cuidado, trazabilidad y políticas aplicables, y no inferirse a partir de rasgos comunes.

---

## 33. Aprobación y bloqueo

Una recomendación no cambia el canon.

Frases como:

```text
"Me gusta."
"Se siente bien."
"Prueba otra version."
"Comparalos."
```

no constituyen necesariamente bloqueo canónico.

Aprobaciones explícitas válidas incluyen equivalentes de:

```text
"Aprueba este personaje."
"Hazlo canon."
"Bloquea esta personalidad."
"Este sera su personaje definitivo."
```

Después de aprobación y validación:

```text
ESTADO_DATO = BLOQUEADO
CHARACTER_CANON = [CHARACTER_PROFILE_APPROVED]
PSYCHOLOGY_MODEL_CANON = [PSYCHOLOGY_MODEL_APPROVED]
```

Los marcos opcionales solo se bloquean si realmente forman parte del perfil aprobado.

---

## 34. Aprobación granular

F04 puede aprobar por atributo o bloque:

- rasgos nucleares;
- línea base emocional;
- estilo social;
- humor;
- reglas conductuales;
- contradicciones controladas;
- perfil psicológico interpretativo;
- personaje completo.

Ejemplo:

```text
Rasgos nucleares -> aprobado
Humor -> en revision
Big Five -> validado
MBTI -> omitido
```

La omisión de MBTI no impide completar F04.

---

## 35. Revalidación progresiva

Después de F04, las siguientes fases deben contrastarse contra el personaje aprobado:

```text
F05 <-> personaje / propuesta de marca
F06 <-> personaje / expresividad visual
F07 <-> personaje / tono verbal / voz
F08 <-> personaje / relaciones / conflictos / narrativa
F09 <-> personaje / contenido / captions / guiones
F11 <-> personaje / monetizacion y colaboraciones
```

Si una fase posterior detecta contradicción crítica:

1. no modificar F04 silenciosamente;
2. registrar conflicto;
3. marcar `REQUIERE_VALIDACION` o `REQUIERE_REVISION`;
4. abrir flujo de cambio cuando corresponda.

---

## 36. Gobernanza de cambios

Una tendencia, campaña, nueva serie o cambio temporal de humor no modifica automáticamente `CHARACTER_CANON`.

Modificar un rasgo o regla bloqueada requiere, según impacto:

```text
INSTRUCCION EXPLICITA
-> PUNTO DE CONTROL
-> RAMA DE REVISION
-> PROPUESTA
-> ANALISIS DE IMPACTO
-> VALIDACION
-> APROBACION
-> REGISTRO DE CAMBIO
-> ACTUALIZACION DE VERSION
-> REVALIDACION DE DERIVADOS
```

Cambios menores de expresión contextual no requieren renombrar el personaje si respetan el canon.

---

## 37. Historial y trazabilidad

Deben conservarse cuando sean relevantes:

- Territorios de Personaje;
- alternativas comparadas;
- simulaciones;
- rasgos descartados;
- cambios posteriores;
- razones de aprobación;
- resultados de validadores.

No borrar silenciosamente el perfil anterior cuando exista una revisión canónica.

---

## 38. Compatibilidad de plataforma

F04 debe funcionar en **Modo Básico Universal**.

No requiere navegación web, memoria premium ni herramientas externas para su flujo base.

Si una IA no puede conservar contexto largo, el Paquete Portable debe incluir el perfil operativo y las reglas conductuales esenciales.

La falta de capacidades avanzadas no bloquea la construcción del personaje.

---

## 39. Idioma y localización

La documentación estructural canónica se mantiene en español.

Los rasgos y modelos psicológicos pueden tener aliases internacionales cuando aporten valor, pero las etiquetas visibles principales deben respetar `IDIOMA_INTERFAZ`.

No traducir ciegamente conceptos si la traducción altera su significado.

El idioma del personaje se desarrolla principalmente en F07; F04 solo define las características conductuales que la voz deberá expresar.

---

## 40. UX visible recomendada

El usuario normal no necesita ver `PS00-PS16`.

Experiencia sugerida:

```text
¿YA SABES COMO QUIERES QUE SEA?
        |
        |-- Si -> validar y probar
        |-- Tengo ideas -> completar y comparar
        `-- No -> descubrir juntos

DIRECCION
-> OPCIONES
-> PRUEBAS
-> RECOMENDACION
-> APROBACION
```

Después de varias decisiones, AIIF puede mostrar:

```text
QUE SABEMOS
QUE FALTA
QUE SIGUE
```

---

## 41. Profundidades

Se reutilizan las profundidades canónicas.

### NUCLEO

- 3-5 rasgos nucleares;
- línea base emocional;
- estilo social;
- reglas esenciales;
- prueba básica de coherencia.

### AMPLIADO - predeterminado

- Territorios de Personaje;
- rasgos secundarios;
- humor;
- estilo de decisión;
- contradicciones controladas;
- matriz contextual;
- Big Five operativo cuando aporte valor;
- pruebas y comparación.

### PROFUNDO

- mayor número de escenarios de prueba;
- modelado conductual más detallado;
- arquetipos múltiples cuando sean útiles;
- MBTI u otros marcos interpretativos;
- tensiones internas y límites;
- documentación más extensa de puentes hacia F05-F09.

Profundidad no significa patologizar ni añadir complejidad artificial.

---

## 42. Portabilidad

El Paquete Portable, Paquete Portable Ligero o Archivo Universal de Reanudación debe incluir, según nivel de detalle:

- estado de F04;
- `CHARACTER_CANON` o perfil operativo vigente;
- `PSYCHOLOGY_MODEL_CANON` cuando exista;
- rasgos nucleares;
- línea base emocional;
- reglas conductuales;
- comportamientos prohibidos;
- contradicciones controladas;
- matriz contextual compacta;
- marcos psicológicos relevantes;
- pendientes;
- historial de cambios relevante;
- próximo paso.

La información debe ser suficiente para que otra IA mantenga el mismo personaje sin reconstruir su psicología desde cero.

---

## 43. Algoritmo operativo resumido

```pseudo
INPUT project_context

load_system00()
load_F01()
load_F02()
load_F03()

route = detect_character_input_route()

if route == DEFINED:
    extract_user_traits_and_rules()
elif route == PARTIAL:
    preserve_known_traits()
    identify_critical_gaps()
else:
    build_character_brief()
    generate_character_territories()
    present_small_option_set()

build_core_traits()
build_emotional_baseline()
build_social_style()
build_humor_and_expressivity()
build_decision_and_reaction_style()
build_controlled_contradictions()
build_contextual_behavior_matrix()

derive_optional_psychology_frameworks()
run_behavior_tests()

if meaningful_alternatives_exist:
    simulate_without_applying()
    compare_options()

build_character_profile()
run_VALIDADOR_DE_PERSONAJE_Y_PSICOLOGIA()
present_recommendation()

WAIT_FOR_EXPLICIT_USER_APPROVAL()

if approved_and_valid:
    lock_CHARACTER_CANON()
    lock_PSYCHOLOGY_MODEL_CANON_if_used()
    update_master_data_matrix()
    create_checkpoint()
    prepare_character_bible()
else:
    preserve_current_state()
    continue_refinement()
```

---

## 44. Output técnico antes de aprobación

```json
{
  "f04_character_psychology": {
    "status": "BORRADOR|VALIDADO|REQUIERE_AJUSTES",
    "route": "DEFINED|PARTIAL|DISCOVERY",
    "character_territories": [],
    "character_working": {},
    "core_traits": [],
    "emotional_baseline": [],
    "behavioral_rules": [],
    "contextual_behavior_matrix": [],
    "psychology_model": {
      "big_five": null,
      "mbti_descriptor": null,
      "character_archetypes": []
    },
    "simulations": [],
    "open_questions": [],
    "validator_result": "[RESULT]",
    "approval_required": true
  }
}
```

---

## 45. Output técnico después de aprobación

```json
{
  "f04_canonical_character": {
    "character_canon": {},
    "psychology_model_canon": {},
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

## 46. Mapeo de la especificación experta a AIIF

| Elemento de la fuente experta | Tratamiento en AIIF |
|---|---|
| Personalidad | Núcleo de F04 |
| Rasgos de carácter | Rasgos nucleares/secundarios y reglas observables |
| Forma de expresarse | Conducta general en F04; verbalización detallada en F07 |
| Energía emocional | Línea base emocional de F04 |
| Tipo de humor | F04 como función y límites; realización verbal en F07 |
| MBTI | Descriptor opcional; no gobierna el canon |
| Big Five | Modelo dimensional opcional derivado de comportamiento |
| Arquetipo | Se desambigua entre arquetipo de creador y de personaje |
| Captions / videos / audios / roleplay | F04 define comportamiento; F07/F09 ejecutan lenguaje y contenido |
| Intereses / rutinas / motivaciones | Se recuperan de F03 como dependencias |
| Marca personal | F05 debe ser coherente con F04 |
| Storytelling | F08 debe ser coherente con F04 |
| Reglas de consistencia | F04 aporta reglas conductuales al sistema global |

---

## 47. Entregable de F04

Cuando F04 esté completa, el entregable oficial es:

# Biblia de Personaje

Debe contener como mínimo:

1. resumen del personaje;
2. rasgos nucleares;
3. rasgos secundarios relevantes;
4. línea base emocional;
5. estilo social e interpersonal;
6. humor y expresividad;
7. estilo de decisión y reacción;
8. contradicciones controladas;
9. reglas de comportamiento;
10. comportamientos prohibidos;
11. Matriz de Comportamiento Contextual;
12. modelo Big Five si se utiliza;
13. MBTI descriptor si se utiliza;
14. arquetipos de personaje si se utilizan;
15. puentes hacia F05-F09;
16. reglas de consistencia;
17. versión, validación y estado de aprobación.

---

## 48. Principio final

> **AI Influencer Factory debe poder construir un personaje consistente aunque el usuario no conozca teoría de personalidad. Debe partir de la estrategia, concepto y biografía ya aprobados, transformar rasgos deseados en comportamiento observable, probar ese comportamiento en distintos contextos y utilizar MBTI, Big Five o arquetipos solo como marcos interpretativos cuando aporten valor. La verdad canónica reside en los rasgos y reglas aprobados, no en una etiqueta psicológica. Solo una aprobación explícita permite bloquear `CHARACTER_CANON` y, cuando corresponda, `PSYCHOLOGY_MODEL_CANON`.**

---

## 49. Estado de esta especificación

**Estado:** `PROPUESTA_LISTA_PARA_APROBACION`.

Esta especificación no se convierte en canon funcional de AIIF hasta recibir aprobación explícita del usuario conforme a las reglas de gobernanza vigentes.
