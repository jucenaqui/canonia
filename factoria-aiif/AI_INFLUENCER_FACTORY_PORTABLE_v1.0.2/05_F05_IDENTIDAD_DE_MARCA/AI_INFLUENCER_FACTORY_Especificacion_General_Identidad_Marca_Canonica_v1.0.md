---
spec_id: AIIF_GENERAL_BRAND_IDENTITY_CANON_SPEC
spec_version: "1.0.0"
spec_type: AIIF_BRAND_IDENTITY_DISCOVERY_AND_CANONIZATION_SPEC
status: APROBADA
estado_documental: APROBADA
estado_documental_anterior: PROPUESTA_LISTA_PARA_APROBACION
base_aprobacion: "Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17"
revision_documental: "AIIF_PORTABLE_v1.0.2 (CR-0002)"
phase: "F05 - Identidad de Marca"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "Biografía Influencer Digital con IA.docx"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Definición y Canonización de Identidad de Marca
### Versión 1.0.0 — Aprobada (baseline comercial v1.0)

## 1. Propósito

Esta especificación define un sistema reutilizable para que AI Influencer Factory (AIIF) pueda ayudar a **descubrir, construir, comparar, probar, validar y bloquear la identidad estratégica de marca** de una influencer virtual, incluso cuando el creador no sepa formular una misión, visión, posicionamiento o propuesta de valor.

El sistema se integra principalmente en **F05 - Identidad de Marca** y utiliza como fundamento metodológico la especificación original de expertos proporcionada al inicio del proyecto.

La fuente experta exige construir una **marca personal** que incluya expresamente:

- misión;
- visión;
- posicionamiento;
- propuesta de valor;
- coherencia con identidad, personalidad, visual, contenido, storytelling y monetización.

AIIF conserva esos elementos y los convierte en un sistema asistido, trazable, comparable y canonizable.

Flujo visible recomendado:

```text
DIRECCION DE MARCA
        ->
OPCIONES
        ->
PRUEBAS DE MARCA
        ->
MARCA RECOMENDADA
        ->
IDENTIDAD DE MARCA CANONICA
```

La complejidad técnica permanece interna.

---

## 2. Procedencia y regla de fidelidad experta

### 2.1 Base experta

La especificación original establece que el resultado no debe ser solamente un personaje atractivo, sino un **activo digital rentable**, coherente y capaz de construir comunidad, vender productos y colaborar con marcas.

Dentro de sus salidas obligatorias incluye:

```text
Marca personal:
- mision
- vision
- posicionamiento
- propuesta de valor
```

La biografía experta también aporta valores, creencias, objetivos, motivaciones y sueños como fuentes para construir una marca coherente.

### 2.2 Adaptación AIIF

AIIF conserva esa intención y añade mecanismos de decisión asistida para que el usuario no tenga que dominar estrategia de marca.

La adaptación introduce:

- tres rutas de entrada;
- Territorios de Marca;
- arquitectura estratégica de marca;
- pruebas de posicionamiento y diferenciación;
- Matriz de Comparación de Marca;
- etapas internas `MA00-MA16`;
- `BRAND_IDENTITY_CANON`;
- `BRAND_POSITIONING_CANON`;
- `VALUE_PROPOSITION_CANON`;
- `VALIDADOR_DE_IDENTIDAD_DE_MARCA`;
- gobernanza, revalidación y portabilidad.

Estos mecanismos son extensiones de AIIF y no deben atribuirse a la fuente experta original como si hubieran estado formalizados allí.

---

## 3. Ubicación en la arquitectura

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
        ->
F06 - Identidad Visual
F07 - Identidad Verbal y Voz
F08 - Universo Narrativo
F09 - Sistema de Contenido
F11 - Monetizacion
F12 - Crecimiento
```

F05 no crea una fase global adicional.

---

## 4. Principio central

> **La marca no debe ser una colección decorativa de frases. AIIF debe convertir la estrategia, concepto, biografía y personaje ya aprobados en una promesa de valor reconocible, una posición clara en la mente de la audiencia y un conjunto de principios que puedan guiar visual, voz, narrativa, contenido, colaboraciones y monetización.**

El objetivo es que la influencer pueda responder coherentemente:

```text
QUIEN ES
PARA QUIEN EXISTE
QUE VALOR ENTREGA
POR QUE RESULTA DIFERENTE
QUE PROMETE MANTENER
HACIA DONDE QUIERE CRECER
QUE NO DEBE CONVERTIRSE
```

---

## 5. Qué es y qué no es F05

### 5.1 F05 sí define

- esencia estratégica de marca;
- misión;
- visión;
- posicionamiento;
- propuesta de valor;
- promesa de marca cuando aporte valor;
- valores y principios de marca;
- diferenciadores;
- razones de credibilidad sustentadas en canon real del proyecto;
- relación de valor con audiencia;
- relación de valor comercial cuando corresponda;
- límites y anti-posicionamientos;
- arquitectura de marca necesaria para guiar fases posteriores.

### 5.2 F05 no debe cerrar prematuramente

- paleta, fotografía, vestuario o sistema visual completo -> F06;
- vocabulario, tono verbal detallado, ritmo o voz sintética -> F07;
- mundo narrativo y relaciones desarrolladas -> F08;
- pilares, formatos, calendario o CTA -> F09;
- paquetes, precios, ofertas o embudos comerciales detallados -> F11;
- tácticas de crecimiento y experimentación -> F12.

F05 define **qué significa la marca, qué valor ocupa y qué principios debe conservar**. Las fases posteriores convierten esa estrategia en sistemas especializados.

---

## 6. Fuente de verdad y capas del sistema

Sistema 00 / Matriz Maestra de Datos continúa siendo la fuente operacional de verdad.

F05 utiliza estas capas conceptuales:

```text
BRAND_WORKING
= marca todavía en exploracion

BRAND_CORE
= esencia, mision, vision, valores y promesa

BRAND_POSITIONING
= posicion estrategica interna

VALUE_PROPOSITION
= razon de valor para audiencia y, cuando aplique, socios comerciales

BRAND_BOUNDARIES
= limites y anti-posicionamientos

BRAND_IDENTITY_CANON
= identidad de marca aprobada y bloqueada

BRAND_POSITIONING_CANON
= posicionamiento aprobado y bloqueado

VALUE_PROPOSITION_CANON
= propuesta de valor aprobada y bloqueada
```

---

## 7. Dependencias de entrada

### 7.1 Requeridos o recuperables

F05 debe recuperar automáticamente cuando estén disponibles:

- `NICHE_CANON`;
- `CONCEPT_CANON`;
- `IDENTITY_CORE_CANON`;
- `BIOGRAPHY_CANON`;
- `CHARACTER_CANON`;
- `PSYCHOLOGY_MODEL_CANON` cuando exista;
- audiencia;
- mercados;
- idiomas públicos;
- monetización inicial;
- objetivo a 90 días;
- restricciones;
- decisiones ya bloqueadas.

### 7.2 Deseables

- valores expresados por el usuario;
- marcas o estilos de posicionamiento que admira, sin copiar identidad;
- percepción deseada;
- nivel aspiracional deseado;
- relación deseada con comunidad;
- tipos de colaboraciones deseadas;
- límites reputacionales o comerciales.

### 7.3 Regla de no repetición

Si el sistema ya posee un dato válido, no debe volver a preguntarlo.

---

## 8. Tres rutas de entrada

### Ruta A - El usuario ya tiene identidad de marca

Ejemplos abstractos:

```text
"Ya tengo mision, vision y propuesta de valor."
"Quiero mantener este posicionamiento."
```

AIIF debe:

1. extraer componentes;
2. separar marca de visual o copy accidentalmente mezclados;
3. detectar contradicciones;
4. validar con F01-F04;
5. completar solo faltantes críticos;
6. proponer aprobación.

### Ruta B - El usuario tiene ideas parciales

Ejemplos:

```text
"Quiero que se sienta premium pero cercana."
"Debe inspirar sin parecer inalcanzable."
```

AIIF conserva esas instrucciones y propone únicamente las piezas faltantes.

### Ruta C - El usuario no sabe

Ejemplos:

```text
"No se."
"Recomiendame."
"Decide tu."
"Haz lo mejor."
```

AIIF construye Territorios de Marca a partir de F01-F04.

---

## 9. Inicio Fácil aplicado a F05

Mensaje conceptual recomendado:

> No necesitas saber escribir una misión, visión o propuesta de valor. Primero definiremos qué debe representar tu influencer, qué valor debe ofrecer y cómo quieres que sea percibida. Después convertiré esas decisiones en una identidad de marca estructurada.

La IA debe evitar pedir definiciones académicas al usuario principiante.

---

## 10. Territorios de Marca

Cuando el usuario parte desde cero o existe incertidumbre, AIIF debe generar normalmente **2 a 4 Territorios de Marca** estratégicamente distintos.

Un territorio de marca es una dirección de significado y posicionamiento, no una identidad completa.

Ejemplos abstractos no obligatorios:

```text
EDITORIAL / ASPIRACIONAL
CERCANA / EXPERTA
ARTISTICA / CULTURAL
PREMIUM / MINIMALISTA
ENERGICA / COMUNITARIA
INTIMA / CINEMATOGRAFICA
```

Cada territorio debería explicar brevemente:

- percepción central;
- tipo de valor para la audiencia;
- nivel de aspiración/cercanía;
- diferenciación frente a alternativas;
- compatibilidad con `CONCEPT_CANON` y `CHARACTER_CANON`;
- oportunidades comerciales;
- riesgos de exageración o confusión.

AIIF debe generar territorios específicos para el proyecto, no seleccionar siempre de una lista fija.

---

## 11. Arquitectura estratégica de marca

AIIF puede estructurar F05 mediante:

```text
ESENCIA DE MARCA
+
MISION
+
VISION
+
POSICIONAMIENTO
+
PROPUESTA DE VALOR
+
PROMESA DE MARCA
+
VALORES / PRINCIPIOS
+
DIFERENCIADORES
+
RAZONES DE CREDIBILIDAD
+
LIMITES DE MARCA
```

No todos los elementos necesitan una formulación pública literal.

---

## 12. Esencia de Marca

La Esencia de Marca resume el significado central que debe permanecer reconocible aunque cambien campañas, formatos o plataformas.

Debe ser:

- breve;
- coherente con `CONCEPT_CANON`;
- suficientemente distintiva;
- útil para orientar decisiones;
- no dependiente de una tendencia temporal.

Puede existir un alias creativo en otro idioma cuando sea comercialmente útil, pero la descripción estructural canónica se mantiene en español.

---

## 13. Misión

La misión responde principalmente:

```text
QUE HACE LA MARCA AHORA
PARA QUIEN
QUE VALOR ENTREGA
COMO LO HACE DE FORMA COHERENTE
```

La misión debe ser operativa, no grandilocuente.

No debe inventar credenciales, impacto real, experiencias humanas o logros inexistentes.

---

## 14. Visión

La visión describe hacia dónde quiere evolucionar la marca en el largo plazo.

Puede incluir:

- tipo de comunidad que desea construir;
- territorio de expansión;
- clase de impacto creativo o comercial;
- evolución desde influencer hacia productos, propiedad intelectual, entretenimiento u otras extensiones cuando sea coherente.

La visión no equivale a una promesa de resultados.

---

## 15. Posicionamiento

El posicionamiento es una formulación **interna y estratégica** de la posición que la marca busca ocupar en la mente de su audiencia y mercado.

AIIF debe poder responder:

```text
PARA QUIEN
EN QUE CONTEXTO / CATEGORIA
QUE OFRECE
QUE LA DIFERENCIA
POR QUE ESA DIFERENCIA ES CREIBLE
```

Plantilla conceptual:

```text
Para [AUDIENCIA], [MARCA] es [MARCO/CATEGORIA]
que ofrece [VALOR CENTRAL],
a diferencia de [ALTERNATIVAS/ENFOQUES],
porque [DIFERENCIADOR SUSTENTADO EN CANON].
```

Esta plantilla es interna. F07 puede convertirla más adelante en lenguaje público natural.

---

## 16. Relación con la Etiqueta Pública del Nicho

La **Etiqueta Pública del Nicho** definida en F01 no debe confundirse con el posicionamiento de marca.

```text
ETIQUETA PUBLICA DEL NICHO
= como se explica de forma simple la categoria/nicho

BRAND_POSITIONING
= lugar estrategico que la marca busca ocupar dentro de esa categoria y audiencia
```

Una puede existir sin usar literalmente la redacción de la otra.

---

## 17. Propuesta de Valor

La propuesta de valor debe explicar por qué alguien tendría una razón clara para seguir, consumir, recomendar o colaborar con la marca.

### 17.1 Propuesta de valor para audiencia

Puede combinar:

- utilidad;
- inspiración;
- entretenimiento;
- identidad/afinidad;
- estética;
- conocimiento;
- acceso a una perspectiva distintiva;
- experiencia emocional.

### 17.2 Propuesta de valor comercial

Cuando el modelo de negocio lo requiera, F05 puede definir una capa comercial de alto nivel para marcas o socios.

Debe responder qué tipo de valor estratégico puede aportar la identidad a colaboraciones, sin definir todavía precios, paquetes u ofertas de F11.

---

## 18. Promesa de Marca

La promesa de marca es opcional pero recomendable cuando mejora consistencia.

Responde:

```text
QUE EXPERIENCIA O VALOR DEBE PODER ESPERAR LA AUDIENCIA DE FORMA RECURRENTE
```

Debe ser sostenible y verificable mediante el comportamiento real del proyecto.

No debe prometer resultados imposibles, bienestar garantizado, éxito financiero ni otras afirmaciones no sustentadas.

---

## 19. Valores y Principios de Marca

Los valores de marca describen **qué principios deben guiar las decisiones de la identidad**.

No son sinónimos de rasgos de personalidad.

Ejemplo conceptual:

```text
PERSONAJE: curioso
VALOR DE MARCA: exploracion responsable
```

AIIF debe preferir pocos valores operativos y explicar cómo afectan decisiones.

Cada valor importante debería poder traducirse a una regla observable.

---

## 20. Diferenciadores

Los diferenciadores describen por qué la marca resulta reconocible o preferible frente a alternativas cercanas.

Pueden provenir de:

- combinación de nicho y concepto;
- personaje;
- enfoque editorial;
- experiencia de contenido;
- relación con audiencia;
- perspectiva cultural;
- sistema creativo;
- otras propiedades realmente sustentadas en canon.

### Regla

No declarar "única en el mercado", "la primera" o equivalentes sin verificación externa suficiente.

---

## 21. Razones de Credibilidad

El posicionamiento puede requerir razones que hagan creíble la propuesta.

Deben provenir de datos canónicos reales del proyecto, por ejemplo:

- conocimientos o contexto narrativo aprobado;
- consistencia de especialización;
- sistema de contenido;
- metodología;
- identidad estética;
- transparencia sobre naturaleza virtual.

No inventar:

- títulos académicos;
- clientes;
- premios;
- colaboraciones;
- resultados comerciales;
- experiencias humanas reales;
- autoridad profesional inexistente.

---

## 22. Límites y Anti-posicionamientos

F05 debe definir qué no debe convertirse la marca.

Ejemplos abstractos:

```text
NO elitista
NO excesivamente comercial
NO infantilizada
NO guru infalible
NO copia de una celebridad real
NO dependencia de una sola tendencia
```

Estos límites protegen coherencia al crecer.

---

## 23. Coherencia Marca-Personaje

La marca no puede contradecir silenciosamente `CHARACTER_CANON`.

Ejemplos de conflicto:

```text
PERSONAJE: reservado y sereno
MARCA PROPUESTA: hiperactiva, agresiva y confrontacional
```

AIIF debe:

1. detectar conflicto;
2. determinar si es diferencia legítima entre persona y marca o contradicción;
3. proponer ajuste;
4. no modificar F04 automáticamente.

---

## 24. Coherencia Marca-Biografía

Misión, visión y razones de credibilidad deben ser compatibles con `BIOGRAPHY_CANON`.

La marca no puede utilizar una historia que no exista en F03 para fabricar autoridad.

---

## 25. Coherencia Marca-Nicho y Concepto

Antes de bloquear F05, validar:

```text
MARCA <-> NICHE_CANON
MARCA <-> CONCEPT_CANON
MARCA <-> AUDIENCIA
MARCA <-> MONETIZACION
MARCA <-> CHARACTER_CANON
```

La identidad de marca debe reforzar la estrategia, no crear un segundo proyecto distinto.

---

## 26. Simulaciones de Marca

Antes de aprobar, AIIF puede simular variantes como:

```text
MAS ASPIRACIONAL
MAS CERCANA
MAS PREMIUM
MAS ARTISTICA
MAS COMERCIAL
MAS CULTURAL
MAS MAINSTREAM
MAS ESPECIALIZADA
```

Una simulación:

- no modifica el canon;
- debe conservar datos bloqueados;
- debe explicar implicaciones y riesgos;
- puede comparar impacto en audiencia, contenido y monetización.

---

## 27. Pruebas de Marca

Los candidatos fuertes deben someterse a pruebas de uso.

### 27.1 Prueba de claridad

¿Puede una persona entender qué representa la marca sin una explicación extensa?

### 27.2 Prueba de diferenciación

¿Existe una razón identificable para distinguirla de alternativas cercanas?

### 27.3 Prueba de audiencia

¿La propuesta tiene valor para la audiencia definida en F01?

### 27.4 Prueba comercial

¿Puede convivir con la fuente de ingreso prevista sin deformar la identidad?

### 27.5 Prueba de contenido

¿La marca puede generar múltiples contenidos y formatos sin repetirse?

### 27.6 Prueba de colaboración

¿Puede integrarse de forma natural con marcas o socios compatibles cuando corresponda?

### 27.7 Prueba de expansión

¿Puede evolucionar a nuevas series, productos o plataformas sin perder su núcleo?

### 27.8 Prueba de reputación

¿Los límites y valores reducen el riesgo de decisiones incoherentes o dañinas para la identidad?

---

## 28. Matriz de Comparación de Marca

Cuando existan alternativas, utilizar una matriz como:

| Criterio | Marca A | Marca B | Marca C |
|---|---|---|---|
| Coherencia con F01-F04 | [NIVEL] | [NIVEL] | [NIVEL] |
| Claridad | [NIVEL] | [NIVEL] | [NIVEL] |
| Diferenciación | [NIVEL] | [NIVEL] | [NIVEL] |
| Valor para audiencia | [NIVEL] | [NIVEL] | [NIVEL] |
| Compatibilidad comercial | [NIVEL] | [NIVEL] | [NIVEL] |
| Potencial de contenido | [NIVEL] | [NIVEL] | [NIVEL] |
| Escalabilidad | [NIVEL] | [NIVEL] | [NIVEL] |
| Credibilidad | [NIVEL] | [NIVEL] | [NIVEL] |
| Riesgo de confusión | [NIVEL] | [NIVEL] | [NIVEL] |

No se requiere un `BRAND_SCORE` numérico obligatorio.

La IA puede recomendar una alternativa, pero debe explicar las razones.

---

## 29. Investigación externa opcional

F05 puede beneficiarse de investigación actual cuando la decisión dependa del mercado, por ejemplo:

- categorías de marcas;
- referentes competitivos;
- saturación de posicionamientos;
- lenguaje habitual de categoría;
- oportunidades de colaboración;
- sensibilidades culturales o reputacionales.

La investigación externa no es obligatoria para construir F05.

Estados de verificación:

```text
VERIFICADO
PARCIALMENTE_VERIFICADO
NO_VERIFICADO
NO_DISPONIBLE
```

Si la plataforma no puede investigar, AIIF continúa con análisis estratégico y declara lo pendiente.

---

## 30. Benchmarking: regla anti-copia

Cuando se estudien marcas o creadores de referencia:

- analizar patrones, no copiar identidad;
- no replicar slogans, nombres, visuales o posicionamientos distintivos;
- separar inspiración de imitación;
- priorizar combinación original del canon del proyecto.

---

## 31. Idioma y localización

La documentación estructural canónica de F05 se mantiene en español.

Misión, visión y posicionamiento pueden tener representaciones localizadas para otros mercados cuando sea necesario.

Reglas:

- no traducir literalmente si cambia el sentido;
- conservar el mismo núcleo semántico;
- no convertir una traducción en nuevo canon sin necesidad;
- distinguir idioma documental, idioma de interfaz e idioma público.

---

## 32. Etapas internas del subsistema

Para no confundirse con F01-F13, F05 utiliza etapas internas `MA00-MA16`.

```text
MA00 - Detectar ruta de entrada
MA01 - Cargar contexto F01-F04
MA02 - Diagnosticar marca existente o faltantes
MA03 - Crear Territorios de Marca
MA04 - Generar candidatos de identidad
MA05 - Definir esencia de marca
MA06 - Construir mision y vision
MA07 - Construir posicionamiento
MA08 - Construir propuesta de valor
MA09 - Definir promesa, valores y principios
MA10 - Definir diferenciadores y limites
MA11 - Ejecutar simulaciones
MA12 - Ejecutar Pruebas de Marca
MA13 - Comparar alternativas
MA14 - Validar dependencias
MA15 - Recomendar y solicitar aprobacion
MA16 - Bloquear canon y registrar derivados
```

La complejidad permanece interna salvo que el usuario solicite verla.

---

## 33. Estados y roles

F05 no crea estados globales nuevos.

Usa el ciclo canónico:

```text
NO_DEFINIDO
-> PROPUESTO
-> BORRADOR
-> VALIDADO
-> APROBADO
-> BLOQUEADO
```

Puede utilizar:

```text
ROL_MARCA:
TRABAJO
CANDIDATA
SIMULADA
RECOMENDADA
CANONICA
RETIRADA
RECHAZADA
```

Ejemplo final:

```text
ESTADO_DATO = BLOQUEADO
ROL_MARCA = CANONICA
BRAND_IDENTITY_CANON = [...]
```

---

## 34. Profundidad

F05 reutiliza:

### NUCLEO

- misión;
- visión;
- posicionamiento;
- propuesta de valor;
- coherencia básica con F01-F04.

### AMPLIADO - predeterminado

Añade:

- Territorios de Marca;
- promesa;
- valores/principios;
- diferenciadores;
- límites;
- simulaciones;
- Pruebas de Marca;
- Matriz de Comparación.

### PROFUNDO

Puede añadir:

- benchmarking externo;
- múltiples mercados;
- análisis reputacional ampliado;
- arquitectura de expansión;
- pruebas adicionales de colaboración y crecimiento.

---

## 35. Validación inicial

Antes de bloquear F05, validar al menos:

- marca <-> `NICHE_CANON`;
- marca <-> `CONCEPT_CANON`;
- marca <-> `BIOGRAPHY_CANON`;
- marca <-> `CHARACTER_CANON`;
- misión <-> realidad canónica del proyecto;
- visión <-> escalabilidad;
- posicionamiento <-> audiencia;
- propuesta de valor <-> necesidad/interés de audiencia;
- diferenciadores <-> evidencia canónica;
- marca <-> monetización inicial;
- ausencia de promesas no sustentadas;
- ausencia de autoridad ficticia no autorizada;
- claridad y consistencia interna.

---

## 36. Validador de Identidad de Marca

Se propone:

```text
VALIDADOR_DE_IDENTIDAD_DE_MARCA
```

Debe comprobar:

- contexto mínimo;
- presencia de misión, visión, posicionamiento y propuesta de valor;
- coherencia con F01-F04;
- claridad estratégica;
- diferenciación suficiente;
- credibilidad;
- consistencia de valores y límites;
- compatibilidad comercial;
- ausencia de afirmaciones inventadas;
- aprobación suficiente antes del bloqueo;
- respeto de datos ya bloqueados.

Resultados:

```text
VALIDA
VALIDA_CON_OBSERVACIONES
REQUIERE_AJUSTES
REQUIERE_DECISION_USUARIO
NO_APTA_PARA_BLOQUEO
```

---

## 37. Aprobación granular

F05 puede aprobar por:

- esencia;
- misión;
- visión;
- posicionamiento;
- propuesta de valor;
- valores/principios;
- límites;
- bloque estratégico;
- fase completa.

Una valoración informal como:

```text
"Me gusta."
"Suena bien."
"Probemos esa."
```

no equivale necesariamente a canonización.

---

## 38. Bloqueo canónico

Solo una aprobación explícita suficiente permite bloquear.

Estructura conceptual:

```json
{
  "BRAND_IDENTITY_CANON": {
    "brand_essence": "[ESENCIA]",
    "mission": "[MISION]",
    "vision": "[VISION]",
    "brand_promise": "[PROMESA]",
    "values": ["[VALOR_01]", "[VALOR_02]"],
    "principles": ["[PRINCIPIO_01]"],
    "differentiators": ["[DIFERENCIADOR_01]"],
    "boundaries": ["[LIMITE_01]"]
  },
  "BRAND_POSITIONING_CANON": "[POSICIONAMIENTO]",
  "VALUE_PROPOSITION_CANON": {
    "audience": "[PROPUESTA_AUDIENCIA]",
    "commercial": "[PROPUESTA_COMERCIAL_O_NO_APLICA]"
  },
  "ESTADO_DATO": "BLOQUEADO"
}
```

---

## 39. Revalidación progresiva

Después de F05, la marca debe revalidarse conforme se desarrollan:

```text
F06 - marca <-> identidad visual
F07 - marca <-> identidad verbal y voz
F08 - marca <-> universo narrativo
F09 - marca <-> sistema de contenido
F10 - marca <-> produccion
F11 - marca <-> monetizacion
F12 - marca <-> crecimiento
F13 - marca <-> perfil maestro
```

Una contradicción posterior no modifica F05 silenciosamente.

Debe utilizarse:

```text
REQUIERE_VALIDACION
```

o:

```text
REQUIERE_REVISION
```

según impacto.

---

## 40. Gobernanza de cambios

Modificar un dato bloqueado de F05 requiere, según impacto:

```text
INSTRUCCION EXPLICITA
        ->
PUNTO DE CONTROL
        ->
PROPUESTA / SIMULACION
        ->
ANALISIS DE IMPACTO
        ->
REVALIDACION
        ->
APROBACION
        ->
REGISTRO DE CAMBIO
        ->
NUEVA VERSION
```

Si el cambio afecta fases posteriores, estas se marcan para revisión. No se borran silenciosamente.

---

## 41. Impacto de cambios de marca

Ejemplos:

| Cambio | Impacto probable |
|---|---|
| Ajuste menor de redacción de misión sin cambiar sentido | ACTUALIZAR |
| Cambio de posicionamiento | REVALIDAR / REGENERAR F06-F12 |
| Cambio de propuesta de valor | REVALIDAR F07-F12 |
| Cambio de valores centrales | REVALIDAR personaje, voz, narrativa y contenido |
| Cambio completo de esencia | REQUIERE_REVISION amplia |

Debe usarse el sistema general de impacto de AIIF.

---

## 42. Historial

Los territorios, candidatos, simulaciones, versiones y decisiones retiradas relevantes deben conservarse para trazabilidad.

La marca anterior no debe desaparecer del historial cuando se apruebe una nueva versión.

---

## 43. Compatibilidad de plataforma

F05 debe funcionar en **Modo Básico Universal**.

No requiere:

- suscripción premium;
- navegación;
- memoria persistente;
- API;
- herramientas de diseño.

Si faltan capacidades de investigación externa, el sistema debe aplicar degradación elegante y mantener las verificaciones como `NO_VERIFICADO` o `NO_DISPONIBLE`.

---

## 44. Portabilidad

El estado de F05 debe incluirse cuando corresponda en:

- Paquete Portable;
- Paquete Portable Ligero;
- Archivo Universal de Reanudación.

Contenido portable recomendado:

```text
BRAND_WORKING
TERRITORIOS_DE_MARCA
CANDIDATOS
SIMULACIONES
MATRIZ_DE_COMPARACION
BRAND_CORE
BRAND_POSITIONING
VALUE_PROPOSITION
BRAND_BOUNDARIES
BRAND_IDENTITY_CANON
BRAND_POSITIONING_CANON
VALUE_PROPOSITION_CANON
VALIDACIONES
PENDIENTES
HISTORIAL
PROXIMA_ACCION
```

---

## 45. UX simplificada

El usuario normal no necesita ver `MA00-MA16`.

La experiencia visible recomendada:

```text
DIRECCION
   ->
OPCIONES
   ->
PRUEBAS
   ->
RECOMENDACION
   ->
APROBACION
```

Cuando sea útil, mostrar:

```text
QUE SABEMOS
QUE FALTA
QUE SIGUE
```

---

## 46. No sobreayuda

Si el usuario proporciona una identidad de marca completa y consistente, AIIF no debe obligarlo a recorrer todos los Territorios de Marca ni todas las simulaciones.

Debe:

1. validar;
2. señalar faltantes reales;
3. proponer solo ajustes necesarios;
4. solicitar aprobación.

---

## 47. Algoritmo operativo

```pseudo
INPUT context_F01_F04

route = detect_brand_entry_route()
load_locked_canon()

if route == NO_BRAND:
    territories = generate_brand_territories(context_F01_F04)
    present_small_set(territories)

brand_candidates = build_brand_candidates()

for candidate in brand_candidates:
    build_brand_essence(candidate)
    build_mission(candidate)
    build_vision(candidate)
    build_positioning(candidate)
    build_value_proposition(candidate)
    define_values_and_boundaries(candidate)
    run_brand_tests(candidate)
    validate_against_F01_F04(candidate)

recommended = compare_and_recommend(brand_candidates)
present_recommendation(recommended)
WAIT_FOR_EXPLICIT_APPROVAL()

if approved:
    lock(BRAND_IDENTITY_CANON)
    lock(BRAND_POSITIONING_CANON)
    lock(VALUE_PROPOSITION_CANON)
    sync_system00()
    mark_downstream_dependencies()
else:
    continue_refinement()
```

---

## 48. Estructura JSON de referencia

```json
{
  "brand_identity": {
    "brand_essence": "",
    "mission": "",
    "vision": "",
    "positioning": {
      "audience": "",
      "category_context": "",
      "central_value": "",
      "difference": "",
      "reason_to_believe": ""
    },
    "value_proposition": {
      "audience": "",
      "commercial": ""
    },
    "brand_promise": "",
    "values": [],
    "principles": [],
    "differentiators": [],
    "boundaries": []
  },
  "validation": {
    "status": "BORRADOR|VALIDADO|APROBADO|BLOQUEADO",
    "external_checks": "VERIFICADO|PARCIALMENTE_VERIFICADO|NO_VERIFICADO|NO_DISPONIBLE",
    "approval_required": true
  }
}
```

---

## 49. Entregable de F05

Nombre oficial:

> **Biblia de Marca**

Debe incluir como mínimo:

1. contexto y dependencias;
2. esencia de marca;
3. misión;
4. visión;
5. posicionamiento;
6. propuesta de valor para audiencia;
7. propuesta de valor comercial cuando aplique;
8. promesa de marca cuando se utilice;
9. valores y principios;
10. diferenciadores;
11. razones de credibilidad;
12. límites y anti-posicionamientos;
13. reglas de coherencia;
14. puentes para F06-F12;
15. estado de validación y aprobación;
16. versión e historial relevante.

---

## 50. Mapeo fuente experta -> AIIF

| Fuente experta | Tratamiento en F05 |
|---|---|
| Marca personal | Se convierte en identidad estratégica estructurada |
| Misión | Núcleo obligatorio F05 |
| Visión | Núcleo obligatorio F05 |
| Posicionamiento | `BRAND_POSITIONING` / `BRAND_POSITIONING_CANON` |
| Propuesta de valor | `VALUE_PROPOSITION` / `VALUE_PROPOSITION_CANON` |
| Valores y creencias de biografía | Se recuperan como insumo, no se copian automáticamente como valores de marca |
| Personalidad | F04 alimenta percepción y comportamiento de marca |
| Identidad visual | Se deriva posteriormente en F06 |
| Copywriting y tono | Se deriva posteriormente en F07/F09 |
| Storytelling | Se deriva posteriormente en F08 |
| Monetización | Se valida estratégicamente en F05 y se desarrolla en F11 |
| Reglas de consistencia | Se traducen a principios, límites y validaciones |

---

## 51. Principio final

> **AI Influencer Factory debe poder construir una identidad de marca sólida aunque el usuario no conozca estrategia de marca. Debe partir del nicho, concepto, biografía y personaje ya aprobados, convertirlos en una esencia, misión, visión, posicionamiento y propuesta de valor coherentes, comparar direcciones alternativas, probar claridad, diferenciación, credibilidad, contenido, colaboración y expansión, y exigir aprobación suficiente antes de bloquear `BRAND_IDENTITY_CANON`, `BRAND_POSITIONING_CANON` y `VALUE_PROPOSITION_CANON`. La marca estratégica guía las fases posteriores, pero no sustituye identidad visual, voz, narrativa, contenido ni monetización especializada.**

---

## 52. Estado de esta especificación

```text
ESTADO_DOCUMENTAL = APROBADA
```

Esta especificación forma parte de la baseline comercial aprobada de AI Influencer Factory (Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17). La auditoría pre-freeze ya había señalado (hallazgo H02) que su estado anterior, `PROPUESTA_LISTA_PARA_APROBACION`, quedó desactualizado: el texto se redactó antes de la aprobación de F05.

Por eso la IA debe tratar los sistemas, identificadores, etapas internas y validadores definidos aquí como reglas vigentes de F05, no como propuestas.

Aprobar la especificación no aprueba datos de ningún proyecto. Cada objeto canónico de un influencer concreto sigue necesitando su propia aprobación explícita del usuario, según las reglas de este documento.

La versión con el estado anterior se conserva en `90_HISTORICO_Y_LEGACY/Versiones_Anteriores/v1.0/05_F05_IDENTIDAD_DE_MARCA/AI_INFLUENCER_FACTORY_Especificacion_General_Identidad_Marca_Canonica_v1.0.md`, sin precedencia vigente.
