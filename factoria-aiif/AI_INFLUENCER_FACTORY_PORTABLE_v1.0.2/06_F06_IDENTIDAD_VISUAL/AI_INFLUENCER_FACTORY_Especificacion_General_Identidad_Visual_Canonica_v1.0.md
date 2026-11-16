---
spec_id: AIIF_GENERAL_VISUAL_IDENTITY_CANON_SPEC
spec_version: "1.0.0"
spec_type: AIIF_VISUAL_IDENTITY_DISCOVERY_REFERENCE_AND_CANONIZATION_SPEC
status: APROBADA
estado_documental: APROBADA
estado_documental_anterior: PROPUESTA_LISTA_PARA_APROBACION
base_aprobacion: "Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17"
revision_documental: "AIIF_PORTABLE_v1.0.2 (CR-0002)"
phase: "F06 - Identidad Visual"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "Biografía Influencer Digital con IA.docx"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Definición y Canonización de Identidad Visual
### Versión 1.0.0 — Aprobada (baseline comercial v1.0)

## 1. Propósito

Esta especificación define un sistema reutilizable para que AI Influencer Factory (AIIF) pueda ayudar a **descubrir, construir, comparar, probar, validar, documentar y bloquear la identidad visual** de una influencer virtual, incluso cuando el creador no sepa describir un rostro, cuerpo, estilo fotográfico, paleta o vestuario de forma técnica.

El sistema se integra principalmente en **F06 - Identidad Visual** y utiliza como fundamento metodológico la especificación original de expertos proporcionada al inicio del proyecto.

La fuente experta exige expresamente:

- descripción física: cabello, ojos, piel, altura, complexión, ropa, accesorios, expresión, postura y rasgos únicos;
- identidad visual: paleta, fotografía, vestuario y estilo;
- conversión de estos datos en prompt base, firma visual y consistencia estética;
- prompts de imagen coherentes para múltiples escenarios;
- reglas de consistencia para recrear el avatar en distintas producciones.

AIIF conserva esos elementos y los convierte en un sistema asistido, trazable y canonizable.

Flujo visible recomendado:

```text
DIRECCION VISUAL
        ->
OPCIONES / REFERENCIAS
        ->
PRUEBAS VISUALES
        ->
DIRECCION RECOMENDADA
        ->
APROBACION
        ->
IDENTIDAD VISUAL CANONICA
```

La complejidad técnica permanece interna.

---

## 2. Procedencia y regla de fidelidad experta

### 2.1 Base experta

La especificación original establece que la apariencia del avatar no es decorativa: debe mantener coherencia suficiente para que la influencer sea reconocible a través de imágenes, videos, contenido y futuros procesos de producción con IA.

Los campos visuales explícitos de la metodología incluyen:

```text
cabello
color de ojos
piel
altura
complexion
ropa
accesorios
expresion
postura
rasgos unicos
paleta
fotografia
vestuario
estilo
lugares frecuentes
elementos visuales recurrentes
```

La metodología también relaciona la descripción física con:

```text
prompt base
firma visual
consistencia estetica
```

### 2.2 Adaptación AIIF

AIIF conserva esa intención y añade mecanismos necesarios para evitar que una identidad visual cambie de manera accidental entre generadores, sesiones o producciones.

La adaptación introduce:

- tres rutas de entrada;
- Territorios Visuales;
- separación entre identidad física, sistema visual y variables de producción;
- clasificación permanente/variable;
- especificación visual estructurada;
- Sistema de Referencias Visuales Canónicas;
- pruebas visuales y de consistencia;
- Matriz de Comparación Visual;
- etapas internas `VI00-VI18`;
- `PHYSICAL_IDENTITY_CANON`;
- `VISUAL_STYLE_CANON`;
- `VISUAL_REFERENCE_SET_CANON`;
- `VISUAL_IDENTITY_CANON`;
- `VALIDADOR_DE_IDENTIDAD_VISUAL`;
- `VALIDADOR_DE_CONSISTENCIA_VISUAL_CON_REFERENCIAS`;
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
        ->
F07 - Identidad Verbal y Voz
F08 - Universo Narrativo
F09 - Sistema de Contenido
F10 - Produccion IA
```

F06 no crea una fase global adicional.

---

## 4. Principio central

> **La identidad visual no debe ser una imagen bonita ni un prompt aislado. AIIF debe convertir estrategia, concepto, biografía, personaje y marca en una especificación visual reconocible, reproducible y validable, separando aquello que define permanentemente al influencer de aquello que puede variar en cada producción.**

El objetivo es que el sistema pueda responder con precisión:

```text
COMO ES FISICAMENTE
QUE RASGOS NO DEBEN CAMBIAR
QUE ESTILO VISUAL LA HACE RECONOCIBLE
QUE ELEMENTOS PUEDEN VARIAR
QUE REFERENCIAS SON OFICIALES
COMO SE COMPRUEBA QUE UNA NUEVA IMAGEN SIGUE SIENDO ELLA
```

---

## 5. Qué es y qué no es F06

### 5.1 F06 sí define

- identidad física canónica;
- rasgos faciales y corporales relevantes;
- cabello, ojos, piel y rasgos distintivos;
- proporciones y apariencia general cuando sean relevantes;
- firma visual;
- dirección fotográfica;
- paleta visual;
- lenguaje de iluminación;
- estilo de vestuario a nivel de identidad;
- estética general;
- nivel de realismo o estilización;
- reglas visuales de consistencia;
- referencias visuales aprobadas;
- referencias por rostro, cuerpo, ángulo o detalle cuando aporten valor;
- límites visuales y desviaciones no permitidas;
- prompt base o especificación base necesaria para F10.

### 5.2 F06 no debe cerrar prematuramente

- tono verbal, vocabulario o voz sintética -> F07;
- mundos, relaciones o escenas narrativas -> F08;
- pilares, calendario o formatos de contenido -> F09;
- prompts finales de cada publicación, parámetros del generador o lotes de producción -> F10;
- entrenamiento concreto de modelos, LoRAs o datasets -> F10, salvo que F06 suministre la identidad de referencia;
- tácticas de crecimiento -> F12.

F06 define **quién debe verse y cuál es su sistema visual**. F10 decide **cómo producir una pieza específica** respetando ese canon.

---

## 6. Fuente de verdad y capas del sistema

Sistema 00 / Matriz Maestra de Datos continúa siendo la fuente operacional de verdad.

F06 utiliza estas capas conceptuales:

```text
VISUAL_WORKING
= direccion visual todavia en exploracion

PHYSICAL_IDENTITY
= rasgos fisicos estables de identidad

VISUAL_STYLE
= reglas esteticas y fotograficas reconocibles

VISUAL_SIGNATURE
= combinacion de rasgos visuales que hace reconocible al avatar

VISUAL_REFERENCE_SET
= conjunto de referencias visuales aprobadas con alcance explicito

VISUAL_VARIABLES
= elementos que pueden cambiar por produccion

PHYSICAL_IDENTITY_CANON
= identidad fisica aprobada y bloqueada

VISUAL_STYLE_CANON
= estilo visual aprobado y bloqueado

VISUAL_REFERENCE_SET_CANON
= conjunto de referencias visuales oficiales

VISUAL_IDENTITY_CANON
= vista consolidada de identidad fisica + estilo + reglas + referencias
```

---

## 7. Política de idioma y nomenclatura

Se mantiene:

```text
IDIOMA_CANONICO_DOCUMENTAL = ES
```

Los identificadores técnicos pueden permanecer en inglés cuando favorezcan estabilidad entre IAs, esquemas y paquetes portables.

Nombres visibles/documentales canónicos propuestos:

| ID técnico | Nombre visible en español |
|---|---|
| `PHYSICAL_IDENTITY_CANON` | Identidad Física Canónica |
| `VISUAL_STYLE_CANON` | Estilo Visual Canónico |
| `VISUAL_REFERENCE_SET_CANON` | Conjunto Canónico de Referencias Visuales |
| `VISUAL_IDENTITY_CANON` | Identidad Visual Canónica |
| `VALIDADOR_DE_IDENTIDAD_VISUAL` | Validador de Identidad Visual |
| `VALIDADOR_DE_CONSISTENCIA_VISUAL_CON_REFERENCIAS` | Validador de Consistencia Visual con Referencias |

La documentación visible para el creador debe usar principalmente los nombres españoles.

---

## 8. Dependencias de entrada

### 8.1 Requeridos o recuperables

F06 debe recuperar automáticamente cuando estén disponibles:

- `NICHE_CANON`;
- `CONCEPT_CANON`;
- `IDENTITY_CORE_CANON`;
- `BIOGRAPHY_CANON`;
- `CHARACTER_CANON`;
- `BRAND_IDENTITY_CANON`;
- `BRAND_POSITIONING_CANON`;
- audiencia;
- mercados;
- restricciones visuales;
- información física ya proporcionada;
- referencias aportadas previamente por el usuario;
- decisiones ya bloqueadas.

### 8.2 Deseables

- imágenes de referencia;
- estilos fotográficos preferidos;
- preferencias de realismo/estilización;
- rasgos que el usuario quiere preservar;
- rasgos que desea evitar;
- tipo de vestuario predominante;
- contextos visuales frecuentes;
- ejemplos de iluminación o encuadre;
- necesidades de producción futuras.

### 8.3 Regla de no repetición

Si un atributo ya existe y está aprobado o bloqueado, F06 no debe preguntarlo nuevamente salvo que exista contradicción o solicitud explícita de cambio.

---

## 9. Tres rutas de entrada

### Ruta A - El usuario ya tiene identidad visual o referencias claras

Puede llegar con:

```text
una especificacion escrita
una imagen de referencia
varias vistas coherentes
una identidad ya generada
un conjunto de rasgos definidos
```

AIIF debe:

1. registrar la fuente;
2. separar hechos explícitos de inferencias visuales;
3. detectar si la imagen es referencia de rostro, cuerpo, estilo o todo el conjunto;
4. extraer atributos solo con trazabilidad;
5. detectar contradicciones con F01-F05;
6. proponer una especificación estructurada;
7. validar antes de bloquear.

### Ruta B - El usuario tiene ideas parciales o varias alternativas

AIIF debe:

1. ordenar las preferencias;
2. separar atributos permanentes de gustos variables;
3. construir 2-4 direcciones visuales comparables;
4. explicar diferencias;
5. simular/promptear pruebas cuando sea útil;
6. recomendar una dirección;
7. pedir aprobación antes del bloqueo.

### Ruta C - El usuario no sabe cómo debe verse

AIIF utiliza Inicio Fácil y deriva Territorios Visuales desde:

```text
NICHO
+
CONCEPTO
+
BIOGRAFIA
+
PERSONAJE
+
MARCA
+
AUDIENCIA
```

El usuario no necesita conocer terminología de fotografía, anatomía artística o dirección de arte.

---

## 10. Inicio Fácil para identidad visual

Activadores:

```text
"No se como debe verse."
"Dame opciones."
"Recomiendame."
"Decide tu."
"Haz lo mejor."
"No tengo referencia."
```

AIIF debe responder con lenguaje accesible y pocas decisiones por vez.

Ejemplo de progresión:

```text
1. percepcion general
2. rostro y rasgos
3. cabello / ojos / piel
4. cuerpo y proporciones
5. estilo visual
6. fotografia
7. vestuario
8. referencia
```

No exigir al usuario especificaciones técnicas que la IA pueda traducir desde preferencias simples.

---

## 11. Territorios Visuales

Cuando el usuario parte desde cero o existe alta incertidumbre, AIIF debe crear un conjunto pequeño de Territorios Visuales.

Un Territorio Visual combina de forma provisional:

```text
PERCEPCION
+
RASGOS GENERALES
+
DIRECCION FOTOGRAFICA
+
ESTETICA
+
VESTUARIO
+
NIVEL DE REALISMO
```

Ejemplos abstractos de dirección, no plantillas obligatorias:

```text
EDITORIAL SERENA
COTIDIANA CINEMATOGRAFICA
SOFISTICADA MINIMALISTA
CREATIVA ARTISTICA
ENERGETICA CONTEMPORANEA
```

Los territorios ayudan a comparar direcciones; no son todavía identidad canónica.

---

## 12. Clasificación permanente / variable

Esta separación es obligatoria para evitar deriva visual.

### 12.1 Identidad permanente

Ejemplos de datos que normalmente requieren estabilidad:

- estructura facial general;
- forma de ojos;
- color base de ojos;
- tono y subtono de piel;
- estructura corporal general;
- altura cuando forme parte de la identidad;
- proporciones corporales relevantes;
- rasgos distintivos;
- cabello canónico base cuando sea identitario;
- señales particulares aprobadas.

### 12.2 Sistema visual relativamente estable

- dirección fotográfica;
- grado de realismo;
- tratamiento de piel;
- contraste;
- temperatura visual;
- comportamiento habitual de luz;
- estética de vestuario;
- paleta orientativa;
- nivel de maquillaje;
- firma visual.

### 12.3 Variables de producción

Pueden cambiar sin modificar la identidad, salvo bloqueo específico:

- outfit concreto;
- color de una prenda;
- pose;
- acción;
- localización;
- hora del día;
- lente;
- encuadre;
- expresión puntual;
- peinado temporal compatible;
- accesorios temporales;
- clima;
- props;
- composición.

Una variable de producción no debe convertirse automáticamente en rasgo canónico por repetición accidental.

---

## 13. Identidad Física

F06 debe poder estructurar, cuando sean pertinentes:

### 13.1 Rostro

- forma general;
- proporciones relevantes;
- mandíbula;
- pómulos;
- nariz;
- labios;
- cejas;
- ojos;
- rasgos distintivos;
- simetrías/asimetrías naturales relevantes;
- edad aparente coherente con F03.

### 13.2 Ojos

- forma;
- tamaño relativo;
- color principal;
- matices o anillos si son identitarios;
- saturación;
- expresión base.

### 13.3 Cabello

- color base;
- longitud;
- textura;
- densidad aparente;
- patrón habitual;
- movimiento natural;
- peinado canónico base cuando exista.

### 13.4 Piel

- tono;
- subtono;
- textura;
- nivel de realismo;
- pecas, lunares u otros rasgos solo si están definidos y aprobados.

No inventar una marca física permanente solo para “hacerla única”.

### 13.5 Cuerpo

- altura cuando sea relevante;
- complexión;
- proporciones generales;
- estructura de hombros/cintura/cadera cuando sea necesaria para consistencia;
- musculatura o suavidad corporal;
- postura base;
- distribución visual general.

Usar lenguaje neutral y anatómicamente coherente. Evitar convertir medidas innecesarias en requisitos si una descripción proporcional reproduce mejor la identidad.

---

## 14. Sistema visual y firma estética

La fuente experta exige paleta, fotografía, vestuario y estilo. AIIF los organiza así:

### 14.1 Dirección fotográfica

Puede definir:

- natural / editorial / cinematográfica / documental / estudio;
- realismo;
- profundidad de campo habitual;
- relación sujeto-entorno;
- encuadres predominantes;
- textura de imagen;
- acabado;
- sensación de cámara.

### 14.2 Iluminación

- natural o artificial predominante;
- suave/dura;
- frontal/lateral/contraluz cuando sea parte de la firma;
- hora del día típica;
- contraste;
- manejo de sombras;
- restricciones de iluminación incompatibles con la marca.

### 14.3 Paleta

La paleta puede incluir:

- colores dominantes;
- colores secundarios;
- neutros;
- temperatura;
- saturación;
- colores a evitar cuando sea relevante.

La paleta no obliga a que todas las imágenes repitan los mismos colores.

### 14.4 Vestuario

F06 define el **lenguaje de vestuario**, no cada outfit futuro.

Puede incluir:

- familias de prendas;
- nivel de formalidad;
- siluetas habituales;
- materiales;
- relación con nicho/marca;
- prendas incompatibles;
- accesorios habituales si son parte de identidad.

### 14.5 Maquillaje y grooming

Definir solo cuando sea relevante:

- naturalidad;
- intensidad;
- acabado;
- elementos característicos;
- límites.

### 14.6 Firma visual

`VISUAL_SIGNATURE` sintetiza aquello que permite reconocer la dirección visual incluso cuando cambian escenario, outfit o pose.

No debe depender de un único elemento superficial.

---

## 15. Sistema de Referencias Visuales Canónicas

### 15.1 Principio

> **Una referencia visual ayuda a reproducir el canon, pero no se convierte en canon automáticamente.**

Toda imagen debe tener un estado y un alcance.

### 15.2 Roles de referencia

Se proponen:

```text
REFERENCIA_FUENTE
REFERENCIA_CANDIDATA
REFERENCIA_APROBADA
REFERENCIA_CANONICA
REFERENCIA_RETIRADA
REFERENCIA_RECHAZADA
```

Estos roles no crean estados globales paralelos; describen el rol del recurso visual dentro del ciclo de vida de AIIF.

### 15.3 Alcance de una referencia

Una referencia puede aprobarse solo para:

```text
ROSTRO
CUERPO
CABELLO
OJOS
PIEL
ESTILO_FOTOGRAFICO
VESTUARIO
ILUMINACION
EXPRESION
POSE
VISTA_ANGULAR
IDENTIDAD_COMPLETA
```

Una imagen excelente de rostro no debe usarse automáticamente como verdad corporal o de vestuario.

### 15.4 Conjunto Canónico

`VISUAL_REFERENCE_SET_CANON` puede contener varias imágenes complementarias.

Ejemplo conceptual:

```json
{
  "face_reference": "[REF_ID]",
  "body_reference": "[REF_ID]",
  "three_quarter_reference": "[REF_ID]",
  "profile_reference": "[REF_ID]",
  "style_references": ["[REF_ID]"],
  "notes": []
}
```

No es obligatorio tener todas estas vistas.

### 15.5 Referencias externas

Si una imagen proviene de una fuente externa o de una persona diferente, debe utilizarse por atributos o dirección visual según el caso. No debe afirmarse que constituye la identidad del proyecto hasta que el usuario haya aprobado explícitamente la adaptación resultante.

### 15.6 Resultado generado

Una imagen generada en F10 vuelve a F06/F10 como:

```text
RESULTADO_GENERADO
        ->
CANDIDATO_VISUAL
        ->
VALIDACION
        ->
APROBADO PARA USO
```

Solo mediante instrucción/aprobación explícita puede además convertirse en nueva Referencia Canónica.

---

## 16. Creación de identidad desde una referencia

Cuando el usuario aporta una imagen y solicita construir la identidad a partir de ella:

1. registrar la referencia y su procedencia;
2. identificar qué atributos pueden describirse con confianza;
3. separar hechos visibles de inferencias;
4. no inventar medidas exactas que no sean observables;
5. proponer especificación física;
6. proponer sistema visual cuando la imagen aporte evidencia suficiente;
7. marcar elementos ambiguos como pendientes;
8. solicitar o usar aprobación explícita para bloquear;
9. crear referencias adicionales solo si aportan valor y el usuario lo desea.

Una sola imagen no demuestra automáticamente todos los ángulos, proporciones o detalles no visibles.

---

## 17. Creación sin referencia visual

Si no existen imágenes, AIIF puede construir una especificación textual completa y producir prompts de prueba.

Flujo:

```text
CONTEXTO F01-F05
        ->
TERRITORIOS VISUALES
        ->
ESPECIFICACION CANDIDATA
        ->
PROMPT DE PRUEBA
        ->
RESULTADO GENERADO EXTERNAMENTE
        ->
VALIDACION
        ->
AJUSTE
        ->
APROBACION
```

La falta de generador de imágenes no bloquea F06: puede aprobarse una especificación textual suficiente y dejar las referencias visuales como `PENDIENTE_DE_VALIDACION` o equivalente de fase.

---

## 18. Pruebas visuales

Antes de bloquear una identidad visual, AIIF debe probar, cuando sea posible, su robustez.

### 18.1 Prueba de rostro

¿Los rasgos centrales siguen siendo reconocibles con cambios razonables de expresión y encuadre?

### 18.2 Prueba de ángulo

Comprobar cuando sea necesario:

```text
frontal
45 grados
perfil
```

No es obligatorio producir todos los ángulos si el proyecto no los necesita todavía.

### 18.3 Prueba de cuerpo

¿Las proporciones generales se mantienen al cambiar pose o vestuario?

### 18.4 Prueba de escenario

¿La identidad sigue siendo reconocible en ambientes distintos?

### 18.5 Prueba de vestuario

¿Un cambio de outfit altera accidentalmente cuerpo, edad aparente o estilo de marca?

### 18.6 Prueba de iluminación

¿La piel, ojos y rasgos se mantienen razonablemente consistentes con luz diferente?

### 18.7 Prueba de estilo

¿El sistema visual puede variar sin perder la firma reconocible?

### 18.8 Prueba de plataforma

¿La identidad funciona en retratos, cuerpo entero, vertical corto y otros formatos previstos?

---

## 19. Matriz de Comparación Visual

Cuando existan varias direcciones, AIIF debe compararlas cualitativamente.

Criterios posibles:

- coherencia con `CONCEPT_CANON`;
- coherencia con `CHARACTER_CANON`;
- coherencia con `BRAND_IDENTITY_CANON`;
- reconocibilidad;
- diferenciación;
- reproducibilidad con IA;
- robustez entre ángulos;
- robustez entre escenarios;
- flexibilidad de vestuario;
- adecuación a plataformas;
- capacidad editorial;
- escalabilidad de producción;
- claridad del prompt base;
- riesgo de deriva visual.

No se requiere un `VISUAL_SCORE` numérico obligatorio.

Si se utilizan puntuaciones auxiliares, deben declararse los criterios y no presentarse como verdad objetiva.

---

## 20. Simulaciones sin alterar el canon

Antes de aprobar, AIIF puede simular variantes como:

```text
mas editorial
mas natural
mas cinematografica
mas minimalista
mas comercial
mas artistica
mas cotidiana
mas sofisticada
```

También puede simular cambios controlados de:

```text
cabello
maquillaje
vestuario
paleta
iluminacion
```

Una simulación no cambia datos bloqueados.

---

## 21. Prompt base y especificación visual

La fuente experta pide un prompt base. AIIF distingue:

```text
ESPECIFICACION_VISUAL
= fuente estructurada y portable

PROMPT_BASE_VISUAL
= representacion operativa para un generador
```

El prompt nunca debe convertirse en la única fuente de verdad porque:

- puede perder detalles;
- puede variar entre plataformas;
- puede exceder límites de caracteres;
- diferentes generadores interpretan distinto.

La especificación estructurada gobierna; el prompt se deriva de ella.

---

## 22. Consistencia visual y tolerancia controlada

Consistencia no significa producir imágenes idénticas.

AIIF debe distinguir:

### Coincidencia de identidad

Debe preservar los atributos canónicos de la persona virtual.

### Variación permitida

Puede cambiar pose, expresión, vestuario, entorno, encuadre y otros elementos variables.

### Deriva visual

Existe cuando un resultado altera de manera no aprobada atributos identitarios, por ejemplo:

- forma facial;
- color/forma de ojos;
- tono de piel;
- estructura corporal;
- edad aparente;
- rasgo distintivo;
- cabello canónico cuando está bloqueado.

La validación debe centrarse en la identidad, no en coincidencia pixel a pixel.

---

## 23. Etapas internas F06

Se propone el siguiente flujo interno:

```text
VI00 - detectar ruta de entrada
VI01 - recuperar contexto F01-F05
VI02 - recopilar referencias y preferencias
VI03 - separar permanente / variable
VI04 - generar Territorios Visuales
VI05 - construir candidatos visuales
VI06 - definir identidad fisica candidata
VI07 - definir sistema visual candidato
VI08 - estructurar referencias por alcance
VI09 - generar prompts / pruebas cuando sea posible
VI10 - validar rostro y cuerpo
VI11 - validar estilo y fotografia
VI12 - probar variacion controlada
VI13 - comparar candidatos
VI14 - recomendacion
VI15 - aprobacion de atributos / referencias
VI16 - bloquear identidad fisica
VI17 - bloquear estilo y referencias
VI18 - consolidar Identidad Visual Canonica
```

Estas etapas son internas y no deben confundirse con F01-F13.

---

## 24. Estados y roles

No crear estados globales paralelos.

Datos visuales utilizan el ciclo general:

```text
NO_DEFINIDO
-> PROPUESTO
-> BORRADOR
-> VALIDADO
-> APROBADO
-> BLOQUEADO
```

Roles visuales auxiliares posibles:

```text
TRABAJO
CANDIDATO
SIMULADO
RECOMENDADO
CANONICO
RETIRADO
RECHAZADO
```

Las referencias usan roles específicos definidos en la sección 15.

---

## 25. Validador de Identidad Visual

Se incorpora conceptualmente:

```text
VALIDADOR_DE_IDENTIDAD_VISUAL
```

Debe comprobar al menos:

### Coherencia previa

- visual <-> `CONCEPT_CANON`;
- visual <-> `BIOGRAPHY_CANON`;
- visual <-> `CHARACTER_CANON`;
- visual <-> `BRAND_IDENTITY_CANON`;
- visual <-> audiencia y mercados cuando corresponda.

### Identidad física

- rasgos suficientes para reproducibilidad;
- ausencia de contradicciones internas;
- edad aparente coherente;
- rostro/cuerpo compatibles;
- atributos permanentes claramente separados de variables;
- no inventar rasgos únicos no aprobados.

### Sistema visual

- fotografía coherente;
- estilo reconocible;
- paleta compatible;
- vestuario compatible con concepto y marca;
- flexibilidad suficiente para contenido futuro;
- no depender de una sola escena.

### Operación

- especificación portable;
- referencias con alcance explícito;
- prompt base derivable;
- capacidad de validación posterior.

Resultados generales:

```text
VALIDA
VALIDA_CON_OBSERVACIONES
REQUIERE_AJUSTES
REQUIERE_DECISION_USUARIO
NO_APTA_PARA_BLOQUEO
```

---

## 26. Validador de Consistencia Visual con Referencias

Se incorpora conceptualmente:

```text
VALIDADOR_DE_CONSISTENCIA_VISUAL_CON_REFERENCIAS
```

Su función es comparar un candidato o resultado generado contra:

- especificación canónica;
- referencias canónicas aplicables;
- alcance de cada referencia;
- tolerancia de variación permitida.

Debe poder emitir, por ejemplo:

```text
CONSISTENTE
CONSISTENTE_CON_VARIACIONES
REQUIERE_REVISION
INCONSISTENTE
REFERENCIA_INSUFICIENTE
```

Estas salidas son específicas del análisis visual y deben mapearse al sistema general cuando se actualice el estado de fase.

No debe usar una referencia de estilo para invalidar un rostro, ni una referencia facial para imponer un outfit.

---

## 27. Aprobación granular

F06 debe permitir aprobación por:

- atributo físico;
- bloque facial;
- ojos;
- cabello;
- piel;
- cuerpo/proporciones;
- sistema fotográfico;
- paleta;
- vestuario;
- firma visual;
- referencia individual;
- conjunto de referencias;
- identidad visual completa.

Una expresión como:

```text
"se ve bien"
"me gusta esta"
"prueba otra pose"
```

no debe convertir automáticamente una imagen en referencia canónica.

Aprobaciones explícitas válidas pueden adoptar formas como:

```text
"Aprueba este rostro como referencia canonica."
"Bloquea estos ojos como parte de la identidad."
"Esta sera la referencia corporal oficial."
"Aprueba la identidad visual completa."
```

---

## 28. Bloqueo canónico

Después de validación y aprobación suficiente:

```text
PHYSICAL_IDENTITY_CANON = [ESPECIFICACION_APROBADA]
VISUAL_STYLE_CANON = [SISTEMA_VISUAL_APROBADO]
VISUAL_REFERENCE_SET_CANON = [REFERENCIAS_APROBADAS]
VISUAL_IDENTITY_CANON = [VISTA_CONSOLIDADA]
ESTADO_DATO = BLOQUEADO
```

No todos los proyectos requieren referencias canónicas para bloquear una identidad textual; en ese caso:

```text
VISUAL_REFERENCE_SET_CANON = NO_DEFINIDO / PENDIENTE
```

sin impedir necesariamente que la especificación textual esté aprobada.

---

## 29. Gobernanza de cambios

Cambiar un atributo visual bloqueado requiere, según impacto:

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
        ->
REVALIDAR / REGENERAR DERIVADOS
```

Ejemplos de cambios de alto impacto:

- estructura facial;
- color de ojos canónico;
- estructura corporal;
- edad aparente;
- rasgo distintivo;
- cambio completo de dirección fotográfica;
- reemplazo de referencia facial principal.

Ejemplos de cambio sin modificación de canon, salvo regla específica:

- outfit de una publicación;
- pose;
- escenario;
- lente;
- expresión puntual;
- prop;
- color temporal de iluminación.

---

## 30. Impacto y dependencias

Utilizar el sistema general de impacto:

```text
SIN_IMPACTO
ACTUALIZAR
REVALIDAR
REGENERAR
INVALIDAR
```

Ejemplos:

| Cambio | Impacto posible |
|---|---|
| nueva referencia de 45 grados consistente | ACTUALIZAR |
| cambio de color de ojos canónico | REVALIDAR / REGENERAR |
| nuevo outfit compatible | SIN_IMPACTO |
| cambio importante de cuerpo | REVALIDAR / REGENERAR |
| cambio completo de estética | REVALIDAR F09/F10 |

Nunca borrar silenciosamente trabajos posteriores.

---

## 31. Revalidación progresiva

Después de F06:

```text
F07 - visual <-> identidad verbal cuando la percepcion de marca lo requiera
F08 - visual <-> universo narrativo
F09 - visual <-> sistema de contenido
F10 - visual <-> produccion y resultados generados
F11 - visual <-> colaboraciones / monetizacion cuando corresponda
F12 - visual <-> crecimiento y plataformas cuando corresponda
F13 - consolidacion y paquete maestro
```

F10 es la dependencia más crítica porque debe utilizar el canon visual para producir y validar activos.

---

## 32. Relación F06 - F10

Principio:

> **F06 define la identidad visual; F10 la ejecuta.**

F06 entrega a F10:

- identidad física;
- estilo visual;
- firma visual;
- referencias;
- variables permitidas;
- variables prohibidas;
- prompt base;
- reglas de consistencia.

F10 devuelve:

- resultado generado;
- metadatos de producción cuando existan;
- comparación con canon;
- estado de validación;
- candidato a referencia, si corresponde.

Un resultado de producción no puede cambiar F06 por sí solo.

---

## 33. Investigación externa y referencias de inspiración

La investigación externa puede utilizarse para:

- estilos fotográficos;
- tendencias visuales;
- categorías de moda;
- técnicas de iluminación;
- referencias editoriales;
- benchmarks de plataforma.

Debe diferenciarse:

```text
INSPIRACION
!=
REFERENCIA DE IDENTIDAD
!=
REFERENCIA CANONICA
```

No copiar una identidad visual completa de otra persona o marca.

Cuando no haya navegación, F06 debe seguir funcionando con conocimiento general, preferencias del usuario y referencias proporcionadas.

---

## 34. Compatibilidad de plataforma y degradación elegante

F06 debe funcionar en Modo Básico Universal.

### Si la IA puede analizar imágenes

Puede ayudar a describir y comparar referencias.

### Si la IA puede generar imágenes

Puede producir pruebas dentro del flujo, respetando aprobación.

### Si no puede generar imágenes

Debe:

1. crear la especificación;
2. preparar el prompt de prueba;
3. indicar qué debe producirse externamente;
4. recibir el resultado en una sesión compatible;
5. validar.

La ausencia de generación propia no impide completar el diseño de F06.

---

## 35. Portabilidad

F06 debe incluirse cuando corresponda en:

- Paquete Portable Completo;
- Paquete Portable Ligero;
- Archivo Universal de Reanudación.

Contenido portable recomendado:

```text
PHYSICAL_IDENTITY_CANON
VISUAL_STYLE_CANON
VISUAL_SIGNATURE
VISUAL_REFERENCE_SET_CANON
atributos permanentes
variables permitidas
restricciones
prompt base visual
referencias y sus alcances
version de referencias
pendientes
historial relevante
proxima accion
```

### 35.1 Referencias y archivos

El paquete debe conservar identificadores y descripciones suficientes para no confundir referencias.

Si las imágenes no pueden viajar físicamente con el paquete, declarar:

```text
REFERENCIA_NO_ADJUNTA
```

y describir el impacto.

Nunca fingir que una IA destino ha recibido una imagen que no está disponible.

---

## 36. Estructura JSON conceptual

```json
{
  "phase": "F06",
  "visual_identity": {
    "physical_identity_canon": {
      "face": {},
      "eyes": {},
      "hair": {},
      "skin": {},
      "body": {},
      "distinctive_features": []
    },
    "visual_style_canon": {
      "photography": {},
      "lighting": {},
      "palette": {},
      "wardrobe_language": {},
      "grooming": {},
      "visual_signature": []
    },
    "visual_reference_set_canon": [
      {
        "reference_id": "[REF_ID]",
        "scope": ["FACE"],
        "status": "CANONICAL",
        "version": "[VERSION]"
      }
    ],
    "production_variables": {
      "allowed": [],
      "restricted": []
    },
    "base_visual_prompt": "[PROMPT]",
    "validator_status": "[STATUS]"
  }
}
```

Los nombres exactos de claves pueden normalizarse posteriormente en el esquema técnico general sin cambiar la semántica aprobada.

---

## 37. Algoritmo operativo

```pseudo
INPUT project_context

recover_locked_context(F01, F02, F03, F04, F05)
route = detect_visual_entry_route()

if route == HAS_VISUAL_IDENTITY_OR_REFERENCES:
    register_sources()
    extract_explicit_visual_attributes()
    separate_observed_from_inferred()
    define_reference_scope()

elif route == PARTIAL_VISUAL_IDEAS:
    organize_preferences()
    separate_permanent_from_variable()
    create_visual_candidates()

else:
    create_visual_territories_from_context()
    create_visual_candidates()

for candidate in candidates:
    define_physical_identity(candidate)
    define_visual_style(candidate)
    test_identity_consistency(candidate)
    test_style_flexibility(candidate)
    test_production_feasibility(candidate)

compare_candidates()
present_recommendation()
WAIT_FOR_EXPLICIT_APPROVAL()

if approved:
    lock_approved_attributes()
    PHYSICAL_IDENTITY_CANON = approved_physical_identity
    VISUAL_STYLE_CANON = approved_visual_style
    if canonical_references_approved:
        VISUAL_REFERENCE_SET_CANON = approved_references
    VISUAL_IDENTITY_CANON = consolidate_visual_identity()
    sync_with_system_00()
else:
    continue_refinement()
```

---

## 38. Resumen compacto para IA

```text
START:
Recupera F01-F05 y toda referencia visual ya aportada.

ROUTE:
Detecta si el usuario ya tiene identidad/referencias, tiene ideas parciales o parte desde cero.

SEPARATE:
Distingue identidad fisica permanente, sistema visual estable y variables de produccion.

DISCOVER:
Si hace falta, crea Territorios Visuales.

DEFINE:
Construye rostro, ojos, cabello, piel, cuerpo, fotografia, paleta, vestuario y firma visual.

REFERENCE:
Registra cada imagen con alcance y estado. Ninguna imagen se vuelve Canon automaticamente.

TEST:
Comprueba rostro, cuerpo, angulos, escenarios, vestuario, iluminacion y estilo segun necesidad.

COMPARE:
Compara alternativas por coherencia, reconocibilidad, reproducibilidad y flexibilidad.

RECOMMEND:
Presenta la direccion mas fuerte sin cambiar Canon.

APPROVE:
Exige aprobacion suficiente para atributos y referencias.

LOCK:
Bloquea PHYSICAL_IDENTITY_CANON, VISUAL_STYLE_CANON, VISUAL_REFERENCE_SET_CANON cuando exista y VISUAL_IDENTITY_CANON.

PRODUCE:
F10 ejecuta el Canon; un resultado generado no cambia F06 automaticamente.
```

---

## 39. UX simplificada

La experiencia normal del creador debe verse así:

```text
DIRECCION VISUAL
        ->
OPCIONES / REFERENCIAS
        ->
PRUEBAS
        ->
RECOMENDACION
        ->
APROBACION
        ->
IDENTIDAD VISUAL CANONICA
```

La IA no debe mostrar `VI00-VI18` salvo documentación técnica o solicitud explícita.

---

## 40. Qué no debe hacer la IA

1. No convertir una imagen bonita en referencia canónica sin aprobación.
2. No inferir medidas exactas desde una fotografía cuando no sean observables.
3. No inventar lunares, cicatrices u otros rasgos permanentes para aumentar distintividad.
4. No confundir pose, outfit o escenario con identidad permanente.
5. No usar una referencia facial como referencia corporal si su alcance no lo permite.
6. No modificar un atributo bloqueado para “mejorar” una nueva generación.
7. No sustituir el canon por el prompt de un proveedor.
8. No exigir una herramienta de generación concreta.
9. No declarar consistencia perfecta cuando las referencias sean insuficientes.
10. No borrar versiones o referencias anteriores relevantes.
11. No copiar la identidad visual completa de una referencia externa.
12. No permitir que F10 reescriba silenciosamente F06.
13. No asumir que un cambio de vestuario implica un cambio de identidad.
14. No exigir referencias múltiples si el proyecto todavía puede funcionar con una especificación textual suficiente.

---

## 41. Entregable de F06

Entregable oficial:

# Biblia de Identidad Visual

Debe poder contener, según el proyecto:

1. Resumen visual.
2. Identidad Física Canónica.
3. Rostro.
4. Ojos.
5. Cabello.
6. Piel.
7. Cuerpo y proporciones.
8. Rasgos distintivos.
9. Dirección fotográfica.
10. Iluminación.
11. Paleta.
12. Lenguaje de vestuario.
13. Maquillaje/grooming.
14. Firma visual.
15. Variables permitidas.
16. Restricciones.
17. Conjunto Canónico de Referencias Visuales.
18. Prompt base visual.
19. Reglas de consistencia.
20. Historial/versionado relevante.

La Biblia de Identidad Visual es una representación documental. Sistema 00 / Matriz Maestra de Datos continúa siendo la fuente operacional de verdad.

---

## 42. Mapeo de la metodología experta a AIIF

| Fuente experta | Adaptación F06 |
|---|---|
| Cabello, ojos, piel, altura, complexión | Identidad Física Canónica |
| Ropa y accesorios | Lenguaje de vestuario + variables |
| Expresión y postura | línea base + variables de producción |
| Rasgos únicos | rasgos distintivos aprobados |
| Paleta | sistema de paleta |
| Fotografía | dirección fotográfica |
| Vestuario | lenguaje de vestuario |
| Estilo | Estilo Visual Canónico |
| Prompt base | Prompt Base Visual derivado |
| Firma visual | `VISUAL_SIGNATURE` |
| Consistencia estética | validadores + pruebas visuales |
| Prompts coherentes en escenarios | conexión F06 -> F10 |
| Lugares/elementos recurrentes | señales de contexto para F08/F09/F10, sin convertirlos automáticamente en identidad permanente |

AIIF no elimina la metodología original; la hace operable, trazable y portable.

---

## 43. Decisiones propuestas para aprobación

Esta versión propone aprobar como arquitectura F06:

1. F06 como fase principal del sistema visual.
2. Separación obligatoria identidad física / estilo visual / variables de producción.
3. `PHYSICAL_IDENTITY_CANON`.
4. `VISUAL_STYLE_CANON`.
5. `VISUAL_REFERENCE_SET_CANON`.
6. `VISUAL_IDENTITY_CANON`.
7. Sistema de Referencias Visuales Canónicas con alcance por referencia.
8. Ningún resultado generado se vuelve referencia canónica automáticamente.
9. Etapas internas `VI00-VI18`.
10. Matriz de Comparación Visual sin score obligatorio.
11. `VALIDADOR_DE_IDENTIDAD_VISUAL`.
12. `VALIDADOR_DE_CONSISTENCIA_VISUAL_CON_REFERENCIAS`.
13. Aprobación granular de atributos y referencias.
14. Gobernanza de cambios e impacto.
15. F06 define; F10 produce.
16. Modo Básico Universal y degradación elegante.
17. Portabilidad de especificaciones y referencias.
18. Nombres documentales visibles en español con IDs técnicos estables cuando aporten interoperabilidad.

---

## 44. Principio final propuesto

> **AI Influencer Factory debe poder construir una identidad visual coherente incluso cuando el usuario no sepa describir técnicamente un rostro, cuerpo o estilo fotográfico. Debe utilizar estrategia, concepto, biografía, personaje y marca ya aprobados para proponer direcciones visuales, separar atributos permanentes de variables de producción, estructurar identidad física y estilo, registrar referencias con alcance explícito, probar consistencia y exigir aprobación suficiente antes de bloquear la Identidad Visual Canónica. Una imagen generada o una referencia atractiva nunca modifica el Canon por sí sola; F06 define la identidad y F10 la ejecuta.**

---

## 45. Estado de esta especificación

```text
ESTADO_DOCUMENTAL = APROBADA
```

Esta especificación forma parte de la baseline comercial aprobada de AI Influencer Factory (Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17). La auditoría pre-freeze ya había señalado (hallazgo H02) que su estado anterior, `PROPUESTA_LISTA_PARA_APROBACION`, quedó desactualizado: el texto se redactó antes de la aprobación de F06.

Por eso la IA debe tratar los sistemas, identificadores, etapas internas y validadores definidos aquí como reglas vigentes de F06, no como propuestas.

Aprobar la especificación no aprueba datos de ningún proyecto. Cada objeto canónico de un influencer concreto sigue necesitando su propia aprobación explícita del usuario, según las reglas de este documento.

La versión con el estado anterior se conserva en `90_HISTORICO_Y_LEGACY/Versiones_Anteriores/v1.0/06_F06_IDENTIDAD_VISUAL/AI_INFLUENCER_FACTORY_Especificacion_General_Identidad_Visual_Canonica_v1.0.md`, sin precedencia vigente.
