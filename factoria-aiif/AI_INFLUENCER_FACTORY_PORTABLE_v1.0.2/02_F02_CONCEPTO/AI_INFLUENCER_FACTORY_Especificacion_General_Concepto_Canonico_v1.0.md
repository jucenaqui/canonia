---
spec_id: AIIF_SISTEMA_INTELIGENTE_CONCEPTO_CANONICO
spec_version: "1.0.0"
spec_type: AIIF_CONCEPT_DEFINITION_AND_CANONIZATION_SPEC
status: APROBADA
estado_documental: APROBADA
estado_documental_anterior: PROPUESTA_LISTA_PARA_APROBACION
base_aprobacion: "Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17"
revision_documental: "AIIF_PORTABLE_v1.0.2 (CR-0002)"
idioma_canonico_documental: ES
fase_principal: "F02 — Concepto"
project_specific_data_included: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Definición y Canonización del Concepto
### Versión 1.0.0

## 1. Propósito

Esta especificación define un proceso general y reutilizable para que AI Influencer Factory (AIIF) ayude a descubrir, construir, comparar, validar, recomendar y, únicamente después de aprobación explícita, bloquear el concepto estratégico-creativo de un influencer virtual.

El sistema está diseñado para tres situaciones reales del creador:

1. ya tiene un concepto definido;
2. tiene varias ideas pero no sabe cuál elegir;
3. no sabe todavía qué concepto debería tener su influencer.

El objetivo no es producir una frase creativa llamativa ni un personaje “bonito”. El concepto debe servir como puente entre los Fundamentos Estratégicos de F01 y las decisiones posteriores de identidad, personaje, marca, visual, voz, narrativa, contenido, monetización y crecimiento.

Flujo visible simplificado:

```text
DIRECCIÓN
  ↓
OPCIONES
  ↓
COMPARACIÓN
  ↓
CONCEPTO RECOMENDADO
  ↓
APROBACIÓN
  ↓
CONCEPTO CANÓNICO
```

La complejidad interna permanece dentro de AIIF.

---

## 2. Fundamento experto de origen

La especificación original de expertos de AI Influencer Factory establece que el sistema debe actuar como un equipo multidisciplinario de estrategia de marca personal, dirección creativa, marketing digital, psicología del consumidor, storytelling, fotografía, prompt engineering, redes sociales, monetización y growth.

Su objetivo es construir un activo digital rentable, coherente y escalable, no solo una apariencia. La metodología experta original exige considerar, entre otros elementos:

- identidad;
- descripción física;
- arquetipo;
- nicho principal, subnicho y micronicho;
- objetivo del negocio;
- audiencia;
- objetivos temporales;
- personalidad y psicología;
- marca personal;
- identidad visual;
- contenido;
- copywriting;
- storytelling;
- monetización;
- crecimiento;
- reglas de consistencia.

La fuente experta original no define formalmente un campo llamado `CONCEPT_CANON` ni un algoritmo de canonización del concepto. Por tanto, el sistema descrito en este documento es una **adaptación metodológica de AIIF** construida sobre esa base experta, no una atribución retroactiva a la fuente original.

Regla de procedencia:

> AIIF debe preservar la intención y metodología experta original. Las estructuras añadidas para descubrimiento, comparación, estados, validación, portabilidad y canonización son adaptaciones arquitectónicas de AIIF.

---

## 3. Ubicación dentro de AIIF

El sistema pertenece principalmente a:

```text
F02 — Concepto
```

Dependencias previas principales:

```text
F01 — Fundamentos Estratégicos
        ↓
F02 — Concepto
        ↓
F03+ — Identidad, Personaje, Marca, Visual, Voz, Narrativa, Contenido...
```

F02 no debe intentar completar anticipadamente F03–F09.

Su función es establecer una **dirección estratégica-creativa suficientemente clara** para que las fases posteriores puedan desarrollarse sin improvisar ni contradecir la estrategia inicial.

---

## 4. Qué significa “Concepto” en AIIF

En AIIF, el concepto es la premisa estratégica-creativa que responde de forma compacta a preguntas como:

```text
¿Qué clase de creador estamos construyendo?
¿Por qué debería resultar interesante para la audiencia?
¿Qué lo hace reconocible o diferente dentro de su nicho?
¿Qué experiencia promete su presencia y contenido?
¿Qué dirección debe guiar identidad, narrativa, visual y marca sin definirlas todavía por completo?
```

El concepto NO es equivalente a:

- nicho;
- nombre;
- biografía completa;
- personalidad completa;
- posicionamiento de marca completo;
- identidad visual completa;
- tagline;
- bio de Instagram;
- pilar de contenido;
- campaña.

El concepto debe poder orientar esas decisiones posteriores sin reemplazarlas.

---

## 5. Variables conceptuales principales

AIIF debe distinguir:

```text
CONCEPTO_DE_TRABAJO
= idea inicial o provisional aportada por el usuario o propuesta por AIIF.

CONCEPTO_OPERATIVO
= formulación interna suficientemente precisa para orientar las fases posteriores.

CONCEPT_CANON
= concepto aprobado y bloqueado como verdad canónica del proyecto.
```

No es obligatorio que las tres formulaciones sean literalmente idénticas.

Ejemplo genérico estructural:

```json
{
  "concepto_de_trabajo": "[IDEA_INICIAL]",
  "concepto_operativo": "[PREMISA_ESTRATEGICA_CREATIVA]",
  "concept_canon": null
}
```

`CONCEPT_CANON` se mantiene como identificador técnico estable. En documentación española, el término visible primario es **Concepto Canónico**.

---

## 6. Tres rutas de entrada

### 6.1 Ruta A — El usuario ya tiene concepto

Ejemplos:

- “Ya sé exactamente qué quiero.”
- “Quiero una creadora que combine [X] y [Y].”
- “El concepto es [idea].”

AIIF debe:

1. registrar la idea como `CONCEPTO_DE_TRABAJO`;
2. validar coherencia con F01;
3. detectar ambigüedades, clichés o contradicciones;
4. proponer refinamiento solo si aporta valor;
5. no obligar al usuario a generar alternativas innecesarias.

### 6.2 Ruta B — El usuario tiene varias ideas

AIIF debe:

1. registrar cada idea como candidato conceptual;
2. normalizar el nivel de detalle para compararlas justamente;
3. realizar una Matriz de Comparación Conceptual;
4. simular diferencias importantes;
5. recomendar una dirección sin canonizarla automáticamente.

### 6.3 Ruta C — El usuario no sabe qué concepto elegir

Activadores naturales:

- “No sé.”
- “Dame opciones.”
- “Recomiéndame.”
- “Decide tú.”
- “Haz lo mejor.”
- equivalentes semánticos según `IDIOMA_INTERFAZ`.

AIIF debe activar Inicio Fácil y construir Territorios de Concepto a partir del contexto disponible.

---

## 7. Inputs para F02

### 7.1 Requeridos o preferentes desde F01

AIIF debe reutilizar lo ya definido y no volver a preguntarlo innecesariamente:

```text
NICHE_CANON o nicho validado disponible
fuente de ingreso inicial
mercados y audiencia objetivo
tiempo disponible
objetivo a 90 días
plataformas principales si están definidas
tipo de creador/proyecto
restricciones estratégicas relevantes
```

### 7.2 Deseables

Pueden mejorar la definición, pero no deben bloquear F02 si todavía no existen:

```text
arquetipo preliminar
referencias creativas
preferencias estéticas generales
intereses temáticos
nivel aspiracional vs cercano
nivel educativo vs entretenimiento
límites de identidad o contenido
```

### 7.3 No requeridos para cerrar F02

No exigir que ya estén terminados:

```text
F03 — Biografía completa
F04 — Psicología completa
F05 — Marca completa
F06 — Identidad visual completa
F07 — Voz completa
F08 — Universo narrativo completo
F09 — Sistema de contenido completo
```

Estas fases revalidarán el concepto posteriormente.

---

## 8. Territorios de Concepto

Cuando el usuario parte de cero o existe alta incertidumbre, AIIF debe generar un conjunto pequeño de **Territorios de Concepto** antes de formular conceptos definitivos.

Un territorio es una dirección estratégica-creativa amplia, no un concepto canónico.

Ejemplos genéricos de clases de territorio:

```text
ASPIRACIONAL / EDITORIAL
CERCANO / COTIDIANO
EXPERTO / EDUCATIVO
PERSONALIDAD / ENTRETENIMIENTO
EXPLORACIÓN / LIFESTYLE
ARTÍSTICO / EXPERIMENTAL
```

Los territorios reales deben derivarse del proyecto y no de una lista fija.

Reglas:

- presentar normalmente entre 2 y 4 territorios;
- explicar la diferencia esencial entre ellos;
- indicar ventajas, riesgos y compatibilidad con F01;
- no convertir un territorio en concepto final automáticamente;
- permitir combinar dos territorios cuando exista coherencia real.

---

## 9. Arquitectura del Concepto

Como adaptación metodológica de AIIF, un concepto puede construirse mediante cuatro capas funcionales:

```text
ROL / IDENTIDAD CONCEPTUAL
        ×
PROMESA DE EXPERIENCIA
        ×
LENTE DE DIFERENCIACIÓN
        ×
DIRECCIÓN EXPRESIVA
```

### 9.1 Rol / Identidad conceptual

Qué clase de presencia ocupa el creador dentro del nicho.

No sustituye la profesión o biografía.

### 9.2 Promesa de experiencia

Qué obtiene o siente la audiencia al seguirlo:

- inspiración;
- conocimiento;
- entretenimiento;
- aspiración;
- intimidad editorial;
- pertenencia;
- descubrimiento;
- otra experiencia coherente.

### 9.3 Lente de diferenciación

Qué hace que el creador se perciba distinto de alternativas cercanas.

Debe ser más concreto que “único”, “auténtico” o “diferente”.

### 9.4 Dirección expresiva

Cómo debe sentirse la futura ejecución de identidad, contenido, visual y narrativa, sin cerrarlas prematuramente.

Ejemplo abstracto:

```text
[ROL]
× [EXPERIENCIA]
× [DIFERENCIACIÓN]
× [DIRECCIÓN EXPRESIVA]
```

No todos los conceptos deben mostrarse al usuario con esta fórmula. Es una herramienta interna para mejorar claridad y coherencia.

---

## 10. Etapas internas del subsistema

Para no crear conflicto con F01–F13, el sistema usa el prefijo `CO`:

```text
CO00 — Detectar ruta de entrada
CO01 — Recuperar brief estratégico
CO02 — Diagnosticar idea inicial, si existe
CO03 — Crear Territorios de Concepto
CO04 — Crear conceptos candidatos
CO05 — Contrastar con nicho, negocio y audiencia
CO06 — Construir arquitectura del concepto
CO07 — Simular variantes
CO08 — Ejecutar pruebas de robustez conceptual
CO09 — Crear Matriz de Comparación Conceptual
CO10 — Seleccionar concepto operativo
CO11 — Validación inicial de coherencia
CO12 — Recomendación experta
CO13 — Aprobación humana
CO14 — Bloqueo de CONCEPT_CANON
```

La revalidación posterior es transversal y no constituye una nueva fase lineal.

---

## 11. CO00 — Detección de ruta

AIIF debe determinar si:

```text
RUTA_CONCEPTO = DEFINIDO
RUTA_CONCEPTO = MULTIPLES_IDEAS
RUTA_CONCEPTO = SIN_DEFINIR
```

La detección puede ser implícita a partir de la conversación.

No obligar al usuario a elegir códigos técnicos.

---

## 12. CO01 — Brief estratégico

Estructura conceptual recomendada:

```json
{
  "nicho": "[NICHO]",
  "fuente_ingreso": "[FUENTE]",
  "audiencia": "[AUDIENCIA]",
  "mercados": ["[MERCADO_01]"],
  "objetivo_90_dias": "[OBJETIVO]",
  "plataformas": ["[PLATAFORMA]"],
  "tiempo_disponible": "[TIEMPO]",
  "restricciones": [],
  "referencias_creativas": [],
  "concepto_de_trabajo": null
}
```

Regla:

> No diseñar el concepto ignorando el nicho, el negocio o la audiencia.

---

## 13. CO02 — Diagnóstico de concepto existente

Si el usuario aporta una idea, evaluar si es:

```text
demasiado genérica
demasiado amplia
demasiado estrecha
confundible con el nicho
dependiente de una tendencia temporal
cliché o intercambiable
difícil de sostener narrativamente
difícil de expresar visualmente
difícil de convertir en contenido
débil para monetización
difícil de entender para la audiencia
incompatible con el objetivo del negocio
incompatible con el tiempo/recursos disponibles
excesivamente dependiente de rasgos todavía no definidos
```

La salida debe ser diagnóstica, no una sustitución automática.

---

## 14. CO03 — Territorios de Concepto

Para cada territorio, AIIF debe poder explicar:

```json
{
  "territorio": "[NOMBRE_DESCRIPTIVO]",
  "idea_central": "[...]",
  "ajuste_nicho": "ALTO|MEDIO|BAJO",
  "ajuste_audiencia": "ALTO|MEDIO|BAJO",
  "potencial_contenido": "ALTO|MEDIO|BAJO",
  "potencial_marca": "ALTO|MEDIO|BAJO",
  "riesgos": ["..."],
  "por_que_considerarlo": ["..."]
}
```

No es obligatorio usar puntuación numérica.

---

## 15. CO04 — Conceptos candidatos

AIIF debe convertir los territorios seleccionados en un conjunto reducido de conceptos comparables.

Recomendación operativa:

```text
3 a 5 conceptos candidatos
```

Cada candidato debe poder expresarse al menos como:

```text
UNA FRASE OPERATIVA
+
3–5 RASGOS CONCEPTUALES
+
DIFERENCIADOR PRINCIPAL
+
RIESGO PRINCIPAL
```

Evitar listas de decenas de opciones.

---

## 16. CO05 — Contraste estratégico

Cada concepto candidato debe contrastarse como mínimo con:

### Estrategia

```text
concepto <-> NICHE_CANON
concepto <-> monetización inicial
concepto <-> objetivo 90 días
concepto <-> tiempo disponible
```

### Audiencia

```text
concepto <-> intereses
a concepto <-> deseos/problemas relevantes
concepto <-> mercados
concepto <-> idiomas públicos
```

### Operación

```text
¿Puede sostenerse con los recursos disponibles?
¿Puede producir contenido recurrente?
¿Obliga a una producción demasiado compleja?
¿Permite colaboración con marcas coherentes?
```

---

## 17. CO06 — Arquitectura del concepto

Para candidatos fuertes, estructurar:

```json
{
  "rol_identidad_conceptual": "[...]",
  "promesa_experiencia": "[...]",
  "lente_diferenciacion": "[...]",
  "direccion_expresiva": "[...]",
  "concepto_operativo": "[...]"
}
```

La formulación debe ser suficientemente precisa para orientar las fases posteriores, pero lo bastante flexible para permitir que F03–F09 desarrollen sus propios canones.

---

## 18. CO07 — Simulaciones

AIIF puede simular variantes sin modificar canon:

```text
más aspiracional
más cercana
más editorial
más comercial
más educativa
más entretenida
más artística
más mainstream
más especializada
```

No todas las variantes aplican a todos los proyectos.

La simulación debe responder:

```text
¿Qué gana?
¿Qué pierde?
¿Qué fases posteriores cambiarían de dirección?
¿Qué riesgo introduce?
```

Una simulación nunca equivale a aprobación.

---

## 19. CO08 — Pruebas de robustez conceptual

Los candidatos finalistas deben someterse, cuando corresponda, a pruebas de uso real.

### 19.1 Prueba de una frase

¿Puede explicarse el concepto en una frase clara sin depender de un párrafo de justificación?

### 19.2 Prueba de audiencia

¿Una persona del público objetivo entiende rápidamente por qué seguiría a este creador?

### 19.3 Prueba de diferenciación

¿Podría reemplazarse el nombre por cualquier otro influencer del mismo nicho sin notar diferencia?

Si sí, el concepto probablemente sea demasiado genérico.

### 19.4 Prueba de contenido

¿El concepto puede producir suficiente variedad de reels, carruseles, stories, imágenes, videos o formatos relevantes durante al menos un horizonte inicial de 90 días?

### 19.5 Prueba narrativa

¿Permite desarrollar situaciones, rutinas, motivaciones, mundos y storytelling sin contradecirse rápidamente?

### 19.6 Prueba visual

¿Puede inspirar una dirección visual reconocible sin depender de un único outfit, escenario o pose?

### 19.7 Prueba de marca

¿Puede evolucionar posteriormente hacia una marca personal coherente, colaboraciones, UGC, productos o servicios según el modelo del proyecto?

### 19.8 Prueba de expansión

¿Puede crecer sin que el concepto se vuelva inútil en cuanto cambie una plataforma, campaña o tendencia?

### 19.9 Prueba de factibilidad

¿Es viable con el tiempo, presupuesto y herramientas disponibles?

### 19.10 Prueba anti-cliché

¿La combinación conceptual aporta una razón clara de diferenciación o simplemente recompone etiquetas genéricas?

---

## 20. CO09 — Matriz de Comparación Conceptual

No se establece un `CONCEPT_SCORE` numérico obligatorio.

Matriz recomendada:

| Criterio | Candidato A | Candidato B | Candidato C |
|---|---|---|---|
| Coherencia con nicho | [ALTO/MEDIO/BAJO] | [] | [] |
| Ajuste a monetización | [] | [] | [] |
| Ajuste a audiencia | [] | [] | [] |
| Diferenciación | [] | [] | [] |
| Claridad | [] | [] | [] |
| Profundidad de contenido | [] | [] | [] |
| Potencial narrativo | [] | [] | [] |
| Potencial visual | [] | [] | [] |
| Escalabilidad de marca | [] | [] | [] |
| Factibilidad de producción | [] | [] | [] |
| Riesgo de cliché | [] | [] | [] |
| Riesgos principales | [] | [] | [] |

Regla:

> La matriz ayuda a comparar. No es una fórmula científica ni un ganador automático.

Si en un proyecto se proponen pesos o puntuaciones, deben declararse explícitamente y justificarse; nunca usar pesos ocultos.

---

## 21. CO10 — Concepto Operativo

AIIF debe seleccionar, como recomendación técnica previa, una formulación suficientemente clara para alimentar F03–F09.

Estructura sugerida:

```json
{
  "concepto_operativo": "[FRASE]",
  "rol": "[...]",
  "experiencia_audiencia": "[...]",
  "diferenciador": "[...]",
  "direccion_expresiva": "[...]",
  "limites": ["..."],
  "oportunidades": ["..."]
}
```

El Concepto Operativo todavía puede estar `VALIDADO` o `RECOMENDADO` sin ser canónico.

---

## 22. CO11 — Validación inicial

Antes de recomendar el bloqueo, comprobar al menos:

```text
concepto <-> nicho
concepto <-> monetización
concepto <-> audiencia
concepto <-> objetivo
concepto <-> plataformas
concepto <-> tiempo/recursos
concepto <-> capacidad de contenido
concepto <-> diferenciación
concepto <-> escalabilidad
```

No exigir todavía validación completa contra fases futuras inexistentes.

---

## 23. CO12 — Recomendación experta

Salida conceptual:

```json
{
  "concepto_recomendado": "[CONCEPTO]",
  "confianza": "ALTA|MEDIA|BAJA",
  "por_que": [
    "[RAZON_01]",
    "[RAZON_02]",
    "[RAZON_03]"
  ],
  "riesgos_restantes": [
    "[RIESGO_01]"
  ],
  "requiere_aprobacion": true
}
```

Regla crítica:

> RECOMENDACIÓN ≠ CANON.

---

## 24. CO13 — Aprobación humana

AIIF debe detectar una aprobación inequívoca antes del bloqueo.

Aprobaciones válidas, según contexto:

```text
“Aprueba este concepto.”
“Hazlo canon.”
“Bloquea este concepto como canónico.”
“Este será definitivamente el concepto.”
“Queda aprobado como concepto oficial.”
```

No constituyen aprobación automática:

```text
“Me gusta.”
“Suena bien.”
“Está interesante.”
“Compáralo con otro.”
“Muéstrame otra versión.”
“Hazlo más comercial.”
“Simula cómo quedaría.”
```

---

## 25. CO14 — Bloqueo de CONCEPT_CANON

Solo después de aprobación explícita y validación correspondiente:

```json
{
  "concept_canon": "[CONCEPTO_APROBADO]",
  "concepto_operativo": "[CONCEPTO_OPERATIVO]",
  "estado_dato": "BLOQUEADO",
  "rol_concepto": "CANONICO",
  "aprobado_por_usuario": true,
  "fecha_efectiva": "[FECHA]"
}
```

El Concepto Canónico debe quedar disponible para las fases posteriores.

---

## 26. Estados y roles

No crear estados globales paralelos.

Utilizar el ciclo de datos canónico de AIIF:

```text
NO_DEFINIDO
→ PROPUESTO
→ BORRADOR
→ VALIDADO
→ APROBADO
→ BLOQUEADO
```

Añadir la propiedad:

```text
ROL_CONCEPTO
```

Valores conceptuales:

```text
TRABAJO
TERRITORIO
CANDIDATO
SIMULADO
RECOMENDADO
CANONICO
RETIRADO
RECHAZADO
```

Ejemplo:

```json
{
  "valor": "[CONCEPTO]",
  "estado_dato": "VALIDADO",
  "rol_concepto": "RECOMENDADO",
  "origen": "PROPUESTO_POR_IA"
}
```

---

## 27. Procedencia de datos

Conservar las reglas generales de AIIF:

```text
PROPORCIONADO_POR_USUARIO
EXTRAIDO_DE_CONTEXTO
DEDUCIDO
PROPUESTO_POR_IA
```

Si el usuario dice “Decide tú”, AIIF puede seleccionar la recomendación preferida cuando sea seguro, pero no debe interpretar esta autorización como permiso general para sobrescribir canones bloqueados ni saltarse aprobaciones obligatorias.

---

## 28. Profundidades

Se reutilizan las profundidades canónicas:

### NUCLEO

- diagnóstico básico;
- coherencia con F01;
- 1–3 opciones cuando sean necesarias;
- concepto operativo;
- validación esencial;
- recomendación.

### AMPLIADO — predeterminado

- Territorios de Concepto;
- 3–5 candidatos;
- simulaciones relevantes;
- pruebas de contenido, narrativa, visual y marca;
- Matriz de Comparación Conceptual;
- validación inicial completa.

### PROFUNDO

- mayor exploración conceptual;
- referencias/benchmarks cuando sean útiles;
- investigación externa actual cuando sea necesaria y posible;
- más simulaciones;
- pruebas multi-mercado;
- análisis de riesgos y expansión más exhaustivo.

---

## 29. Investigación externa y actualidad

El concepto puede construirse sin navegación web.

Cuando el proyecto dependa de tendencias, saturación cultural, señales actuales o comparación competitiva, AIIF puede realizar investigación externa si la plataforma lo permite.

Toda verificación externa debe registrar:

```text
VERIFICADO
PARCIALMENTE_VERIFICADO
NO_VERIFICADO
NO_DISPONIBLE
```

Reglas:

- nunca inventar tendencias, competencia o benchmarks;
- la popularidad de una tendencia no decide automáticamente el concepto;
- una señal de mercado puede informar, no sustituir la coherencia estratégica;
- aplicar degradación elegante si no existe navegación.

---

## 30. Validador de Concepto Canónico

Identificador técnico propuesto:

```text
VALIDADOR_DE_CONCEPTO_CANONICO
```

Debe comprobar como mínimo:

1. existencia de contexto estratégico suficiente;
2. coherencia con `NICHE_CANON` o nicho vigente;
3. coherencia con monetización y objetivo;
4. compatibilidad con audiencia y mercados;
5. diferenciación suficiente;
6. claridad conceptual;
7. capacidad de producir contenido;
8. potencial narrativo suficiente;
9. potencial visual suficiente sin cerrar F06;
10. factibilidad operativa;
11. escalabilidad;
12. ausencia de verificaciones externas inventadas;
13. aprobación explícita antes de bloqueo;
14. respeto de un `CONCEPT_CANON` previamente bloqueado.

Utiliza los resultados generales de validación de AIIF:

```text
VALIDA
VALIDA_CON_OBSERVACIONES
REQUIERE_AJUSTES
REQUIERE_DECISION_USUARIO
NO_APTA_PARA_BLOQUEO
```

---

## 31. Revalidación progresiva

El concepto se define en F02 pero se revalida a medida que aparecen nuevas dependencias.

### F03 — Biografía e Identidad

```text
concepto <-> historia
concepto <-> profesión/rol biográfico
concepto <-> intereses y motivaciones
```

### F04 — Personaje y Psicología

```text
concepto <-> personalidad
concepto <-> arquetipos
concepto <-> energía emocional
```

### F05 — Identidad de Marca

```text
concepto <-> misión
concepto <-> propuesta de valor
concepto <-> posicionamiento
concepto <-> personalidad de marca
```

### F06 — Identidad Visual

```text
concepto <-> dirección estética
concepto <-> lenguaje fotográfico
concepto <-> firma visual
```

### F07 — Identidad Verbal y Voz

```text
concepto <-> tono
concepto <-> estilo verbal
concepto <-> energía de voz
```

### F08 — Universo Narrativo

```text
concepto <-> mundos
concepto <-> rutinas
concepto <-> relaciones
concepto <-> storytelling
```

### F09 — Sistema de Contenido

```text
concepto <-> pilares
concepto <-> series
concepto <-> formatos
concepto <-> recurrencia
```

Una contradicción posterior no modifica automáticamente `CONCEPT_CANON`.

Debe activar, según impacto:

```text
REQUIERE_VALIDACION
REQUIERE_REVISION
```

---

## 32. Gobernanza de cambios

Un `CONCEPT_CANON` bloqueado no cambia automáticamente por:

```text
una campaña
una tendencia
un post viral
un nuevo outfit
una serie temporal
una nueva plataforma
una preferencia estética pasajera
una sugerencia informal
```

Modificarlo requiere el flujo general de cambio de AIIF:

```text
INSTRUCCIÓN EXPLÍCITA
↓
PUNTO DE CONTROL
↓
RAMA DE REVISIÓN
↓
SIMULACIÓN
↓
ANÁLISIS DE IMPACTO
↓
VALIDACIÓN
↓
APROBACIÓN
↓
REGISTRO DE CAMBIO
↓
NUEVA VERSIÓN
↓
REVALIDACIÓN / REGENERACIÓN DE DERIVADOS
```

No borrar fases posteriores. Marcar las afectadas para revisión.

---

## 33. Historial

Conservar cuando aporte trazabilidad:

- conceptos de trabajo;
- Territorios de Concepto;
- candidatos;
- simulaciones;
- recomendaciones anteriores;
- motivos de descarte;
- concepto canónico anterior si existe renaming conceptual;
- impacto del cambio.

No eliminar silenciosamente decisiones históricas relevantes.

---

## 34. Portabilidad

El subsistema debe poder continuar en otra IA sin reconstrucción manual.

Cuando sea relevante, los paquetes portables pueden incluir:

```text
ruta de entrada
brief estratégico
territorios
candidatos
simulaciones
matriz comparativa
concepto operativo
concepto recomendado
CONCEPT_CANON
validaciones
pendientes
historial
próxima acción
```

En Modo Universal Básico, una representación compacta debe ser suficiente para retomar F02.

---

## 35. UX para principiantes

Ejemplo de inicio:

> Ahora vamos a definir el concepto de tu influencer. No necesitas tenerlo pensado. Ya puedo utilizar el nicho, la audiencia y los objetivos que definimos para proponerte direcciones coherentes.

Si el usuario no sabe:

> Te mostraré primero unas pocas direcciones conceptuales, no una lista enorme de ideas.

Después de varias decisiones, AIIF puede mostrar:

```text
QUÉ SABEMOS
- Nicho: [...]
- Monetización: [...]
- Audiencia: [...]
- Territorio conceptual preferido: [...]

QUÉ FALTA
- Elegir concepto final

QUÉ SIGUE
- Comparar los conceptos finalistas
```

---

## 36. UX para usuarios avanzados

Si el usuario aporta un concepto preciso:

> Concepto recibido. Puedo validarlo directamente contra nicho, audiencia y objetivo, sin pasar por generación de alternativas.

AIIF debe respetar la regla de no sobreayuda.

---

## 37. Algoritmo operativo resumido

```pseudo
INPUT contexto_F01 + contexto_disponible

ruta = detectar_ruta_concepto()

if ruta == DEFINIDO:
    concepto_trabajo = registrar_concepto_usuario()
    diagnosticar(concepto_trabajo)

if ruta == MULTIPLES_IDEAS:
    candidatos = normalizar_y_registrar_ideas()

if ruta == SIN_DEFINIR:
    territorios = generar_territorios_desde_contexto()
    territorio_preferido = seleccionar_o_recomendar(territorios)
    candidatos = generar_conceptos_controlados(territorio_preferido)

for candidato in candidatos:
    validar_con_nicho(candidato)
    validar_con_negocio(candidato)
    validar_con_audiencia(candidato)
    validar_factibilidad(candidato)
    construir_arquitectura_conceptual(candidato)
    ejecutar_pruebas_de_robustez(candidato)

comparacion = construir_matriz_comparativa(candidatos)
recomendado = seleccionar_recomendacion_experta(comparacion)

presentar_recomendacion(recomendado)
WAIT_FOR_EXPLICIT_USER_APPROVAL()

if approved:
    ejecutar_VALIDADOR_DE_CONCEPTO_CANONICO()
    if apto_para_bloqueo:
        CONCEPT_CANON = concepto_aprobado
        ESTADO_DATO = BLOQUEADO
        ROL_CONCEPTO = CANONICO
        preservar_historial()
else:
    continuar_refinamiento()
```

---

## 38. Output mínimo antes de canonizar

```json
{
  "investigacion_conceptual": {
    "ruta_entrada": "[DEFINIDO|MULTIPLES_IDEAS|SIN_DEFINIR]",
    "brief": {},
    "territorios": [],
    "candidatos": [],
    "simulaciones": [],
    "matriz_comparativa": {},
    "concepto_operativo": "[...]",
    "concepto_recomendado": "[...]",
    "validacion": "[...]",
    "requiere_aprobacion": true
  }
}
```

Después de aprobación válida:

```json
{
  "decision_conceptual": {
    "concept_canon": "[CONCEPTO_APROBADO]",
    "estado_dato": "BLOQUEADO",
    "rol_concepto": "CANONICO",
    "aprobado_por_usuario": true,
    "historico_preservado": true
  }
}
```

---

## 39. Reglas que la IA no debe inventar

Esta especificación NO establece que la metodología experta original hubiera utilizado históricamente:

```text
un CONCEPT_SCORE obligatorio
una fórmula matemática del concepto
un ranking científico de creatividad
un ganador automático por popularidad
una taxonomía psicológica obligatoria dentro de F02
un benchmark externo obligatorio
```

Por tanto, AIIF no debe presentar esos mecanismos como requisitos expertos originales.

La decisión se basa principalmente en:

```text
coherencia estratégica
claridad
diferenciación
ajuste con audiencia
ajuste comercial
profundidad de contenido
potencial narrativo
potencial visual
factibilidad
escalabilidad
validación humana
```

---

## 40. Límites entre F02 y fases posteriores

### F02 puede definir

```text
premisa estratégica-creativa
territorio conceptual
rol conceptual
promesa de experiencia
diferenciador conceptual
dirección expresiva
límites generales
```

### F02 no debe cerrar por sí sola

```text
historia biográfica detallada
MBTI / Big Five finales
misión/visión definitivas
paleta final
rasgos físicos finales
voz sintética final
mundos narrativos completos
pilares de contenido finales
calendario editorial
```

Esto evita contaminación de responsabilidades entre fases.

---

## 41. Relación con el Sistema de Decisión Asistida

El subsistema de Concepto utiliza el patrón general que AIIF está consolidando:

```text
¿EL USUARIO YA LO SABE?
│
├─ SÍ → VALIDAR / REFINAR
├─ TIENE IDEAS → COMPARAR
└─ NO SABE → DESCUBRIR

CONTEXTO
↓
DIRECCIONES / TERRITORIOS
↓
CANDIDATOS
↓
SIMULACIONES
↓
COMPARACIÓN
↓
RECOMENDACIÓN EXPERTA
↓
APROBACIÓN
↓
CANON
```

Cada subsistema adapta este patrón a su dominio y no tiene obligación de utilizar todas las etapas si no aportan valor.

---

## 42. Principio final

> El concepto de un influencer virtual no debe improvisarse ni convertirse en Canon por una única sugerencia creativa. AI Influencer Factory debe construirlo a partir de los Fundamentos Estratégicos y de la metodología experta original, ayudar al usuario tanto si ya tiene una idea como si no sabe por dónde empezar, comparar direcciones coherentes, probar su robustez estratégica, narrativa, visual, comercial y operativa, recomendar la opción más fuerte y exigir una aprobación explícita antes de bloquear `CONCEPT_CANON`. Una vez bloqueado, el concepto guía las fases posteriores y se revalida progresivamente sin ser modificado de forma silenciosa.

---

## 43. Estado de esta especificación

```text
ESTADO_DOCUMENTAL = APROBADA
```

Esta especificación forma parte de la baseline comercial aprobada de AI Influencer Factory (Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17). La auditoría pre-freeze ya había señalado (hallazgo H02) que su estado anterior, `PROPUESTA_LISTA_PARA_APROBACION`, quedó desactualizado: el texto se redactó antes de la aprobación de F02.

Por eso la IA debe tratar los sistemas, identificadores, etapas internas y validadores definidos aquí como reglas vigentes de F02, no como propuestas.

Aprobar la especificación no aprueba datos de ningún proyecto. Cada objeto canónico de un influencer concreto sigue necesitando su propia aprobación explícita del usuario, según las reglas de este documento.

La versión con el estado anterior se conserva en `90_HISTORICO_Y_LEGACY/Versiones_Anteriores/v1.0/02_F02_CONCEPTO/AI_INFLUENCER_FACTORY_Especificacion_General_Concepto_Canonico_v1.0.md`, sin precedencia vigente.
