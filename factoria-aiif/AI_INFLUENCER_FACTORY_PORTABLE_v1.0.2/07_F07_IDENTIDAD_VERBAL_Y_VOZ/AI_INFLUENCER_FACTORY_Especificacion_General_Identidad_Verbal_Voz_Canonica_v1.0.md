---
spec_id: AIIF_GENERAL_VERBAL_VOICE_CANON_SPEC
spec_version: "1.0.0"
spec_type: AIIF_VERBAL_IDENTITY_VOICE_DISCOVERY_REFERENCE_AND_CANONIZATION_SPEC
status: APROBADA
estado_documental: APROBADA
estado_documental_anterior: PROPUESTA_LISTA_PARA_APROBACION
base_aprobacion: "Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17"
revision_documental: "AIIF_PORTABLE_v1.0.2 (CR-0002)"
phase: "F07 - Identidad Verbal y Voz"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "Biografía Influencer Digital con IA.docx"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Definición y Canonización de Identidad Verbal y Voz
### Versión 1.0.0 — Aprobada (baseline comercial v1.0)

## 1. Propósito

Esta especificación define un sistema general y reutilizable para que AI Influencer Factory (AIIF) pueda ayudar a **descubrir, construir, comparar, probar, validar, documentar y bloquear la identidad verbal y la identidad de voz** de una influencer virtual, incluso cuando el creador no sepa describir técnicamente cómo debería escribir, hablar o sonar.

El sistema se integra principalmente en **F07 - Identidad Verbal y Voz** y utiliza como fundamento metodológico la especificación original de expertos proporcionada al inicio del proyecto.

La metodología experta exige de forma explícita:

- personalidad y tono;
- forma de expresarse;
- energía emocional;
- tipo de humor cuando aplique;
- coherencia de esa personalidad en captions, videos hablados, audios y roleplay;
- copywriting para bios, tono, hashtags y CTA;
- reglas de consistencia para que el avatar mantenga una identidad reconocible.

La fuente experta **no formaliza parámetros técnicos de síntesis de voz** como acento detallado, edad vocal aparente, pitch, velocidad, timbre, referencias de audio o identificadores de proveedor. AIIF incorpora esas capas como una extensión arquitectónica necesaria para poder producir voz sintética de forma consistente y portable.

Flujo visible recomendado:

```text
DIRECCION VERBAL
        ->
OPCIONES Y MUESTRAS DE TEXTO
        ->
IDENTIDAD VERBAL RECOMENDADA
        ->
DIRECCION DE VOZ, SI APLICA
        ->
MUESTRAS DE VOZ
        ->
VALIDACION Y APROBACION
        ->
IDENTIDAD VERBAL Y VOZ CANONICAS
```

La complejidad técnica permanece interna.

---

## 2. Procedencia y regla de fidelidad experta

### 2.1 Base experta

La especificación original de AI Influencer Factory establece que el sistema debe construir un activo digital coherente y escalable, no solo una apariencia. Dentro de sus salidas obligatorias aparecen expresamente:

```text
Personalidad
Psicologia
Marca personal
Identidad visual
Copywriting: bios, tono, hashtags, CTA
Storytelling
Reglas de consistencia
```

La plantilla experta de biografía añade que la personalidad y el tono incluyen:

```text
rasgos de caracter
forma de expresarse
energia emocional
tipo de humor
```

y que estos elementos afectan:

```text
captions
videos hablados
audios
roleplay
```

Por tanto, la **identidad verbal** sí está directamente respaldada por la metodología original.

### 2.2 Adaptación AIIF

AIIF conserva esa intención y la transforma en una arquitectura separada en dos capas:

```text
IDENTIDAD VERBAL
= que palabras usa, como estructura mensajes y que relacion verbal mantiene con la audiencia

IDENTIDAD DE VOZ
= como suena cuando esa identidad verbal se expresa mediante audio sintetico o hablado
```

Esta distinción evita errores como:

- confundir una voz agradable con una personalidad adecuada;
- cambiar el vocabulario por elegir un proveedor de audio distinto;
- convertir una muestra de voz en la fuente de verdad del personaje;
- asumir que un acento define por sí solo la identidad verbal;
- hacer que el estilo hablado contradiga a F04 o F05.

### 2.3 Extensiones propias de AIIF

Los siguientes elementos son adaptaciones arquitectónicas de AIIF y no deben atribuirse a la fuente experta original como si hubieran estado formalizados allí:

- tres rutas de entrada;
- Territorios Verbales;
- Direcciones Vocales;
- Matriz de Canal Verbal;
- Matriz de Respuesta Conversacional;
- pruebas de voz y de lenguaje;
- perfil vocal estructurado;
- referencias de voz con alcance;
- etapas internas `VV00-VV18`;
- `VERBAL_IDENTITY_CANON`;
- `VOICE_STYLE_CANON`;
- `VOICE_REFERENCE_SET_CANON`;
- `VOICE_IDENTITY_CANON`;
- `VALIDADOR_DE_IDENTIDAD_VERBAL_Y_VOZ`;
- `VALIDADOR_DE_CONSISTENCIA_DE_VOZ_CON_REFERENCIAS`;
- gobernanza de cambios y portabilidad bajo Sistema 00.

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
        ->
F08 - Universo Narrativo
F09 - Sistema de Contenido
F10 - Produccion IA
```

F07 no crea una fase global adicional.

Dependencias principales hacia atrás:

```text
NICHE_CANON
CONCEPT_CANON
IDENTITY_CORE_CANON
BIOGRAPHY_CANON
CHARACTER_CANON
PSYCHOLOGY_MODEL_CANON, cuando exista
BRAND_IDENTITY_CANON
BRAND_POSITIONING_CANON
VALUE_PROPOSITION_CANON
VISUAL_IDENTITY_CANON, cuando afecte percepcion o produccion
```

Dependencias principales hacia adelante:

```text
F08 -> como habla dentro de historias y relaciones
F09 -> captions, guiones, CTA, bios, comentarios y piezas de contenido
F10 -> generacion de audio, lip-sync, video hablado y activos finales
F11 -> comunicacion comercial y colaboraciones
F12 -> experimentacion de formatos sin romper la voz de marca
F13 -> consolidacion en Perfil Maestro y Paquete Portable
```

---

## 4. Principio central

> **La voz de un influencer no es solo un archivo de audio. AIIF debe definir primero una identidad verbal coherente con personaje y marca, y solo después, cuando sea necesario, seleccionar o construir una identidad vocal capaz de expresarla. El lenguaje aprobado gobierna el mensaje; la voz aprobada gobierna cómo suena. Ninguna muestra aislada puede sustituir la especificación estructurada.**

El sistema debe poder responder con claridad:

```text
COMO ESCRIBE
COMO HABLA
QUE PALABRAS PREFIERE
QUE PALABRAS EVITA
QUE TAN FORMAL O CERCANA ES
COMO USA EL HUMOR
COMO HACE CTA SIN ROMPER PERSONAJE
COMO RESPONDE A LA COMUNIDAD
COMO CAMBIA ENTRE TEXTO Y HABLA SIN DEJAR DE SER ELLA
EN QUE IDIOMAS SE EXPRESA
COMO SE LOCALIZA SU VOZ VERBAL
COMO SUENA SU VOZ HABLADA
QUE ACENTO, RITMO, ENERGIA Y EDAD VOCAL APARENTE SON COHERENTES
QUE MUESTRAS SON REFERENCIAS OFICIALES
```

---

## 5. Qué es y qué no es F07

### 5.1 F07 sí define

- identidad verbal general;
- tono verbal base;
- vocabulario y registro;
- nivel de formalidad;
- longitud y estructura habitual de frases;
- ritmo lingüístico;
- densidad de información;
- relación verbal con la audiencia;
- grado de intimidad, distancia o autoridad;
- realización verbal del humor definido en F04;
- expresiones compatibles e incompatibles;
- estilo de CTA a nivel de identidad;
- estilo de bio a nivel de identidad;
- principios de uso de hashtags cuando corresponda;
- estilo de respuesta en comentarios, cumplidos, crítica y colaboración;
- reglas para texto escrito y habla;
- localización multilingüe de la identidad verbal;
- perfil de voz hablada cuando el proyecto necesite audio;
- muestras y referencias de voz aprobadas;
- límites de pronunciación, energía, velocidad y estilo vocal;
- reglas de consistencia para producción posterior.

### 5.2 F07 no debe cerrar prematuramente

- pilares, series, calendario editorial y frecuencia -> F09;
- selección concreta de hashtags por publicación -> F09;
- CTA concreto de cada pieza -> F09;
- guion final de un reel específico -> F09/F10;
- mundo, relaciones y continuidad narrativa -> F08;
- generación final de audio, lip-sync y montaje -> F10;
- selección de herramienta específica de voz como fuente de verdad -> F10 / adaptador de plataforma;
- pricing, pitch comercial detallado o paquetes UGC -> F11;
- tácticas de growth -> F12.

F07 define **cómo debe expresarse y sonar**. F09 decide **qué mensaje concreto debe publicar**. F10 decide **cómo producir físicamente el audio o video**.

---

## 6. Fuente de verdad y capas del sistema

Sistema 00 / Matriz Maestra de Datos continúa siendo la fuente operacional de verdad.

F07 utiliza estas capas conceptuales:

```text
VERBAL_WORKING
= direccion verbal todavia en exploracion

VERBAL_IDENTITY
= reglas estables de lenguaje, tono, vocabulario, sintaxis y relacion verbal

CHANNEL_EXPRESSION_RULES
= adaptacion de la misma identidad a captions, comentarios, bio, guion hablado, etc.

VOICE_STYLE
= especificacion de como debe sonar la voz hablada

VOICE_REFERENCE_SET
= muestras de voz aprobadas con alcance explicito

VOICE_PROVIDER_BINDINGS
= asociaciones operativas con proveedores o voice IDs; no son la identidad en si misma

VERBAL_IDENTITY_CANON
= identidad verbal aprobada y bloqueada

VOICE_STYLE_CANON
= estilo vocal aprobado y bloqueado, si aplica

VOICE_REFERENCE_SET_CANON
= referencias de voz oficiales aprobadas, si existen

VOICE_IDENTITY_CANON
= vista consolidada del sistema vocal aprobado
```

### 6.1 Regla de precedencia

```text
Sistema 00 / Matriz Maestra
        >
VERBAL_IDENTITY_CANON / VOICE_IDENTITY_CANON
        >
reglas derivadas de canal
        >
prompts, scripts o configuraciones de proveedor
        >
resultado generado aislado
```

Un audio generado que suene distinto no modifica el canon. Se trata inicialmente como un problema de producción, configuración o validación.

---

## 7. Política de idioma y nomenclatura

Se mantiene:

```text
IDIOMA_CANONICO_DOCUMENTAL = ES
```

Los identificadores técnicos pueden permanecer en inglés cuando mejoren interoperabilidad, estabilidad de esquemas y portabilidad.

Nombres visibles/documentales propuestos:

| ID técnico | Nombre visible en español |
|---|---|
| `VERBAL_IDENTITY_CANON` | Identidad Verbal Canónica |
| `VOICE_STYLE_CANON` | Estilo Vocal Canónico |
| `VOICE_REFERENCE_SET_CANON` | Conjunto Canónico de Referencias de Voz |
| `VOICE_IDENTITY_CANON` | Identidad de Voz Canónica |
| `VALIDADOR_DE_IDENTIDAD_VERBAL_Y_VOZ` | Validador de Identidad Verbal y Voz |
| `VALIDADOR_DE_CONSISTENCIA_DE_VOZ_CON_REFERENCIAS` | Validador de Consistencia de Voz con Referencias |

La documentación visible para el creador debe usar principalmente los nombres españoles.

---

## 8. Dependencias de entrada

### 8.1 Requeridos o recuperables

Antes de construir F07, AIIF debe intentar recuperar automáticamente:

- idioma público principal;
- idiomas públicos secundarios, si existen;
- mercados prioritarios;
- `CHARACTER_CANON`;
- línea base emocional y humor de F04;
- `BRAND_IDENTITY_CANON`;
- `BRAND_POSITIONING_CANON`;
- `VALUE_PROPOSITION_CANON`;
- biografía, profesión, educación o contexto que afecten registro lingüístico;
- audiencia;
- plataformas principales;
- restricciones de identidad;
- necesidad o no de contenido hablado.

### 8.2 Datos que no deben volver a preguntarse

Si ya existen y siguen válidos, no preguntar nuevamente:

```text
pais / origen
idiomas
mercados
edad narrativa
personalidad
humor
posicionamiento
nivel de sofisticacion
objetivo de negocio
```

### 8.3 Cuando falte información

Aplicar la política general:

```text
USAR -> DEDUCIR -> PROPONER -> PREGUNTAR -> OMITIR / POSPONER
```

Preguntar solo cuando la respuesta pueda cambiar materialmente el resultado.

---

## 9. Tres rutas de entrada

### Ruta A - El usuario ya sabe cómo habla

Ejemplos:

- "Quiero que sea calmada, directa y cálida."
- "Habla inglés internacional simple, sin slang fuerte."
- "No usa emojis casi nunca."
- "Su humor es seco y sutil."

AIIF debe:

1. registrar como información de trabajo;
2. comprobar coherencia con F03-F05;
3. convertir adjetivos en reglas observables;
4. generar muestras;
5. detectar vacíos importantes;
6. validar y solicitar aprobación.

### Ruta B - El usuario tiene referencias o ideas parciales

AIIF debe:

1. separar lo que le gusta de cada referencia;
2. evitar copiar literalmente una voz ajena;
3. extraer atributos funcionales;
4. combinar solo atributos compatibles;
5. producir 2-4 direcciones verbales diferenciadas;
6. probarlas con los mismos escenarios.

### Ruta C - El usuario no sabe

AIIF debe construir Territorios Verbales desde el canon existente y presentar pocas alternativas claras antes de entrar en parámetros técnicos.

---

## 10. Inicio Fácil

El creador no necesita saber qué es registro, prosodia, timbre o densidad sintáctica.

Preguntas sencillas pueden ser suficientes:

```text
¿Quieres que suene mas cercana o mas editorial?
¿Habla como una amiga, una experta, una musa o una anfitriona?
¿Prefieres frases cortas o mas reflexivas?
¿Humor frecuente, ocasional o casi nunca?
¿Debe sonar internacional o muy local?
¿Va a hablar en videos o solo escribir por ahora?
```

Si el usuario responde:

```text
"No se"
"Dame opciones"
"Recomiendame"
"Decide tu"
```

AIIF debe usar el contexto ya aprobado y proponer una dirección razonada sin canonizarla automáticamente.

---

## 11. Territorios Verbales

Un Territorio Verbal es una dirección de expresión amplia que permite comparar estilos antes de definir microreglas.

Ejemplos abstractos:

```text
CERCANA Y SERENA
EDITORIAL Y PRECISA
CURIOSA Y CONVERSACIONAL
SOFISTICADA Y MINIMALISTA
ENERGICA Y DIRECTA
CALIDA Y DIDACTICA
MISTERIOSA Y ECONOMICA EN PALABRAS
```

Cada territorio debe explicar:

- relación con `CHARACTER_CANON`;
- relación con posicionamiento de marca;
- ventaja principal;
- riesgo de exageración;
- tipo de audiencia que lo entendería mejor;
- ejemplo corto escrito;
- ejemplo corto hablado.

No generar demasiados territorios. Normalmente 3-5 son suficientes.

---

## 12. Arquitectura de la Identidad Verbal

AIIF puede estructurar la identidad verbal mediante:

```text
TONO VERBAL BASE
+
REGISTRO Y FORMALIDAD
+
VOCABULARIO
+
SINTAXIS Y LONGITUD
+
RITMO LINGUISTICO
+
DENSIDAD DE INFORMACION
+
HUMOR VERBAL
+
RELACION CON AUDIENCIA
+
REGLAS DE CANAL
+
EXPRESIONES PREFERIDAS / PROHIBIDAS
+
ESTILO DE CTA
+
REGLAS MULTILINGUES
```

La finalidad es producir un sistema operativo, no una descripción literaria de "voz de marca".

---

## 13. Tono verbal base

El tono verbal base describe la actitud lingüística predominante.

Puede expresarse mediante 3-5 atributos priorizados, por ejemplo:

```text
sereno
cercano
seguro
curioso
preciso
```

Cada atributo importante debe operacionalizarse.

Ejemplo:

```text
ATRIBUTO: cercano
SE MANIFIESTA COMO:
- habla de tu a tu cuando el idioma lo permite;
- evita distancia corporativa innecesaria;
- reconoce preguntas sin sonar condescendiente;
- usa calidez moderada, no exceso de entusiasmo.

NO SE MANIFIESTA COMO:
- sobrecompartir intimidad;
- llamar "bestie" a desconocidos si no corresponde;
- usar afecto excesivo en cada frase.
```

El tono verbal debe ser compatible con la línea base emocional de F04, pero no es idéntico a ella.

---

## 14. Registro, formalidad y distancia social

F07 debe definir:

- nivel de formalidad habitual;
- uso de tú/usted u otras formas locales;
- distancia emocional;
- grado de autoridad;
- nivel de tecnicismo;
- uso de jerga;
- tolerancia a slang;
- grado de espontaneidad;
- nivel de corrección gramatical intencional.

La identidad puede ser cercana sin ser infantil y sofisticada sin ser rígida.

---

## 15. Vocabulario y léxico

F07 puede documentar:

```text
VOCABULARIO PREFERIDO
VOCABULARIO NEUTRO
VOCABULARIO RESTRINGIDO
VOCABULARIO PROHIBIDO
PALABRAS FIRMA, si existen
MULETILLAS PERMITIDAS, si aportan naturalidad
MULETILLAS PROHIBIDAS
SLANG PERMITIDO POR IDIOMA / MERCADO
TECNICISMOS PERMITIDOS
```

### 15.1 Regla de naturalidad

No crear una lista artificial de 50 frases que deban repetirse. Una identidad verbal reconocible debe emerger de patrones, no de copiar siempre las mismas expresiones.

### 15.2 Expresiones firma

Pueden existir, pero deben ser:

- pocas;
- naturales;
- compatibles con audiencia y mercados;
- no obligatorias en cada publicación;
- suficientemente distintivas sin parecer un slogan forzado.

---

## 16. Sintaxis, longitud y ritmo lingüístico

AIIF debe poder definir tendencias como:

- frases cortas / medias / largas;
- cantidad habitual de ideas por oración;
- uso de fragmentos;
- uso de preguntas;
- uso de pausas gráficas;
- ritmo lento, medio o dinámico;
- preferencia por párrafos breves o desarrollados;
- nivel de explicación;
- grado de repetición intencional.

Estas reglas deben adaptarse al canal.

Ejemplo:

```text
CAPTION:
frases medias + una linea breve de cierre

COMENTARIO:
respuesta corta, natural y directa

VIDEO HABLADO:
frases mas cortas que en texto
+ pausas funcionales
+ una idea principal por bloque
```

---

## 17. Humor verbal

F04 define la función conductual del humor. F07 define su realización lingüística.

F07 puede especificar:

- frecuencia;
- intensidad;
- ironía permitida;
- autoironía;
- juego de palabras;
- observación cotidiana;
- humor seco;
- humor absurdo;
- humor coqueto cuando sea coherente;
- límites de sarcasmo;
- temas que no deben usarse como broma.

Regla:

> El humor nunca debe obligar al personaje a comportarse en contradicción con `CHARACTER_CANON`.

---

## 18. Puntuación, emojis y señales paralingüísticas

Cuando sean relevantes, F07 puede definir:

- uso de emojis;
- frecuencia;
- familias de emojis compatibles;
- uso de mayúsculas;
- signos de exclamación;
- puntos suspensivos;
- guiones y pausas;
- risas escritas;
- abreviaturas;
- onomatopeyas;
- otros marcadores de oralidad.

No convertir estos elementos en una plantilla mecánica.

---

## 19. Estilo de CTA, bios y hashtags

La fuente experta incluye bios, tono, hashtags y CTA dentro del copywriting. AIIF separa **reglas de identidad** de **ejecución de contenido**.

### 19.1 F07 define

- cuánto puede vender sin perder naturalidad;
- si el CTA es directo, suave, invitacional, educativo o lúdico;
- palabras comerciales compatibles;
- palabras comerciales que rompen la marca;
- estructura general de una bio coherente;
- uso de hashtags a nivel de estilo y presentación.

### 19.2 F09 define

- CTA concreto de cada pieza;
- hashtags concretos;
- bio específica por plataforma cuando se actualice como parte del sistema de contenido;
- testing de variaciones de copy.

Ejemplo de regla F07:

```text
CTA_COMPATIBLE:
"si te sirve, guardalo para despues"

CTA_INCOMPATIBLE:
"COMPRA YA ANTES DE QUE SEA TARDE!!!"
```

Los ejemplos son abstractos; no constituyen frases canónicas por sí mismos.

---

## 20. Matriz de Canal Verbal

La misma identidad debe adaptarse sin convertirse en personajes diferentes.

| Canal | Objetivo verbal | Ajustes permitidos | Lo que no debe cambiar |
|---|---|---|---|
| Bio | síntesis | máxima compresión | posicionamiento, tono base |
| Caption | conexión/contexto | longitud y storytelling | identidad verbal |
| Comentarios | conversación | brevedad, espontaneidad | respeto, humor, personalidad |
| DM / respuesta privada | cercanía | más contexto | límites y seguridad |
| Video hablado | claridad oral | frases más cortas, pausas | vocabulario y personalidad |
| UGC / colaboración | claridad comercial | más estructura | credibilidad y estilo propio |
| Entrevista / live | espontaneidad | mayor variabilidad | reglas de carácter y voz |

La matriz puede ampliarse por proyecto.

---

## 21. Matriz de Respuesta Conversacional

AIIF debe poder probar la identidad en interacciones comunes.

Escenarios recomendados:

```text
cumplido
pregunta genuina
critica constructiva
comentario hostil
confusion
solicitud de recomendacion
pregunta personal
colaboracion de marca
error propio
logro
CTA comercial
comentario divertido
```

Para cada escenario se puede documentar:

```text
ACTITUD
LONGITUD
NIVEL DE HUMOR
FORMALIDAD
LIMITE
EJEMPLO DE RESPUESTA
```

La finalidad es validar la voz, no convertir todos los ejemplos en scripts rígidos.

---

## 22. Idioma público y localización multilingüe

F07 debe integrarse con el Sistema de Idioma y Localización.

Variables relevantes:

```text
IDIOMA_PUBLICO_INFLUENCER
IDIOMAS_PUBLICOS_SECUNDARIOS
IDIOMA_VOZ
LOCALE_PUBLICO, cuando aplique
```

### 22.1 Regla de localización

La identidad verbal no debe traducirse palabra por palabra cuando eso destruya naturalidad.

Debe preservarse:

```text
personalidad
funcion del humor
distancia social
nivel de formalidad
energia
claridad
posicionamiento
```

Puede adaptarse:

```text
slang
muletillas
formas de tratamiento
ritmo
idiomas locales
referencias culturales
emoji / puntuacion
```

### 22.2 Núcleo verbal versus realización por idioma

```text
VERBAL_CORE
= principios estables entre idiomas

VERBAL_PROFILE_BY_LANGUAGE
= realizacion lingüistica de esos principios en cada idioma
```

Una versión localizada no debe convertirse en una personalidad distinta.

---

## 23. Identidad escrita versus identidad hablada

Texto y habla comparten el mismo núcleo, pero no deben sonar idénticos mecánicamente.

### Texto escrito puede usar

- estructura visual;
- saltos de línea;
- puntuación expresiva;
- emojis;
- mayor densidad de información;
- edición más precisa.

### Habla puede usar

- frases más cortas;
- repeticiones naturales controladas;
- pausas;
- respiración;
- conectores más simples;
- variación prosódica.

Regla:

> **La voz hablada debe sentirse como la misma persona que escribe, no como un locutor contratado para leer su copy.**

---

## 24. ¿Cuándo es obligatoria la voz sintética?

La identidad verbal es un componente central de F07.

La voz sintética solo es obligatoria cuando el alcance del proyecto requiere producción hablada.

AIIF debe poder registrar:

```text
VOICE_REQUIRED = true | false
```

Si `VOICE_REQUIRED = false`:

- `VERBAL_IDENTITY_CANON` puede aprobarse y bloquearse;
- la selección de voz puede posponerse;
- no se debe inventar una voz para cerrar una casilla;
- F10 no debe generar audio hasta que exista una especificación suficiente.

Si más adelante el proyecto incorpora reels hablados, UGC hablado, narración o lives sintéticos, se reabre el bloque de voz de F07.

---

## 25. Arquitectura de la Identidad de Voz

Cuando se requiera voz hablada, F07 debe convertir personaje, biografía, idioma y marca en una especificación vocal.

Dimensiones posibles:

```text
presentacion vocal de genero
edad vocal aparente
idioma / locale
acento
timbre
pitch
resonancia
velocidad
energia
linea base emocional
articulacion
claridad
pausas
ritmo prosodico
intensidad
grados de calidez / brillo / aire
estilos prohibidos
reglas de identidad
```

No todos los proveedores permitirán controlar cada dimensión directamente. La especificación debe ser **proveedor-agnóstica** y luego mapearse a lo que cada herramienta soporte.

---

## 26. Presentación vocal, edad aparente y coherencia identitaria

### 26.1 Presentación vocal de género

`gender_presentation` describe la percepción vocal deseada, no una afirmación biológica.

Debe ser coherente con la identidad pública del personaje cuando corresponda.

### 26.2 Edad vocal aparente

`apparent_age` debe ser coherente con `IDENTITY_CORE_CANON` y con la percepción deseada.

No debe utilizarse una voz que haga que un personaje adulto parezca inequívocamente menor si eso contradice su canon.

### 26.3 Acento

El acento puede derivarse de:

- origen;
- residencia;
- idiomas;
- mercado;
- posicionamiento;
- intención de inteligibilidad internacional.

No se debe asumir automáticamente que nacionalidad = acento público dominante.

---

## 27. Perfil técnico de voz hablado

Estructura general propuesta:

```json
{
  "voice_audio": {
    "gender_presentation": "",
    "accent": "",
    "apparent_age": "",
    "timbre": "",
    "pitch": "",
    "speed": {
      "style": "",
      "words_per_minute_min": null,
      "words_per_minute_max": null
    },
    "energy": "",
    "emotional_baseline": [],
    "articulation": "",
    "pauses": "",
    "pronunciation_rules": [],
    "identity_rules": [],
    "prohibited_styles": []
  }
}
```

### 27.1 Palabras por minuto

Los valores numéricos de velocidad son opcionales. Solo deben utilizarse cuando ayuden a reproducibilidad.

No inventar precisión innecesaria. Una descripción como "ritmo medio, pausado" puede ser suficiente para una primera fase.

### 27.2 Estilos prohibidos

Pueden incluir, según proyecto:

- infantilización;
- tono robótico;
- euforia excesiva;
- sensualización marcada si contradice la marca;
- agresividad;
- urgencia comercial permanente;
- tono autoritario;
- caricatura de un acento;
- cualquier estilo incompatible con `CHARACTER_CANON`.

Estas prohibiciones son configurables por proyecto, no una lista universal obligatoria.

---

## 28. Direcciones Vocales

Antes de escoger una voz concreta, AIIF puede proponer 2-4 Direcciones Vocales.

Cada dirección debe describir:

```text
TIMBRE
RITMO
ENERGIA
EDAD APARENTE
ACENTO
CALIDEZ
CLARIDAD
VENTAJA
RIESGO
```

Ejemplos abstractos:

```text
VOZ A - calida, clara, media-baja, ritmo sereno
VOZ B - luminosa, conversacional, ritmo medio
VOZ C - editorial, precisa, energia contenida
```

La comparación debe hacerse con el mismo texto de prueba cuando sea posible.

---

## 29. Sistema de Muestras y Referencias de Voz

### 29.1 Principio

> **Una muestra de voz ayuda a reproducir la identidad vocal, pero no se convierte automáticamente en canon.**

### 29.2 Flujo

```text
MUESTRA_GENERADA
        ->
CANDIDATO_DE_VOZ
        ->
PRUEBAS DE VOZ
        ->
APROBADA_PARA_USO
        ->
opcionalmente REFERENCIA_CANONICA_DE_VOZ
```

### 29.3 Texto comparable

Durante selección inicial, se recomienda generar varias voces con **el mismo texto** para poder comparar voz y no copy.

Después de seleccionar finalistas, se deben probar textos distintos para comprobar robustez.

### 29.4 Alcance de referencia

Cada referencia puede declarar uno o varios alcances:

```text
TIMBRE
ACENTO
RITMO
ENERGIA
ARTICULACION
PRONUNCIACION
EMOCION_NEUTRA
EMOCION_CALIDA
CTA
IDIOMA_ESPECIFICO
IDENTIDAD_COMPLETA
```

Una muestra aprobada para acento no debe imponer automáticamente energía o emoción si esos aspectos no fueron aprobados.

---

## 30. Identificadores de proveedor y portabilidad

Un proveedor puede entregar:

```text
voice_id
model_id
preset
style_id
seed
speaker_profile
```

Estos datos pueden guardarse como `VOICE_PROVIDER_BINDINGS` para facilitar producción, pero:

```text
VOICE_PROVIDER_BINDING
!=
VOICE_IDENTITY_CANON
```

Si el proveedor desaparece o cambia de modelo, AIIF debe poder reconstruir una voz suficientemente cercana usando:

- `VOICE_STYLE_CANON`;
- referencias aprobadas cuando sean portables y utilizables;
- reglas de pronunciación;
- idioma y acento;
- pruebas comparables.

---

## 31. Pruebas de Identidad Verbal

Antes del bloqueo, probar al menos varios de estos escenarios:

```text
BIO CORTA
CAPTION COTIDIANO
CAPTION EDITORIAL
COMENTARIO A UN CUMPLIDO
RESPUESTA A PREGUNTA
RESPUESTA A CRITICA
CTA SUAVE
CTA COMERCIAL
GUION HABLADO 15-30 SEGUNDOS
COLABORACION DE MARCA
```

Evaluar:

- reconocibilidad;
- coherencia con F04;
- coherencia con F05;
- naturalidad;
- claridad;
- diferenciación;
- ausencia de contradicciones;
- utilidad en varios canales;
- capacidad de mantener tono sin repetición mecánica.

---

## 32. Pruebas de Voz

Cuando `VOICE_REQUIRED = true`, probar:

### 32.1 Texto neutro

Comprueba timbre, acento, articulación y velocidad.

### 32.2 Texto emocional moderado

Comprueba si la línea base emocional se conserva sin dramatización excesiva.

### 32.3 Texto comercial / CTA

Comprueba si puede vender sin convertirse en una voz publicitaria ajena al personaje.

### 32.4 Texto conversacional

Comprueba naturalidad y pausas.

### 32.5 Nombres propios y términos clave

Comprueba pronunciación de:

- nombre del influencer;
- marcas;
- ciudades;
- términos del nicho;
- palabras en idiomas secundarios.

### 32.6 Prueba multilingüe

Cuando aplique, comprobar que la misma identidad se mantiene en cada idioma sin exigir que acento, velocidad o resonancia sean idénticos artificialmente.

---

## 33. Matriz de Comparación Verbal y Vocal

Cuando existan alternativas, AIIF puede usar una matriz cualitativa.

| Criterio | Pregunta |
|---|---|
| Coherencia con personaje | ¿Parece la misma personalidad aprobada? |
| Coherencia con marca | ¿Expresa el posicionamiento sin sonar corporativa? |
| Claridad | ¿Se entiende con facilidad? |
| Diferenciación | ¿Tiene patrones propios sin ser caricaturesca? |
| Naturalidad | ¿Puede sostener conversaciones y contenido? |
| Flexibilidad | ¿Funciona en captions, comentarios y video? |
| Ajuste de audiencia | ¿La relación verbal es adecuada? |
| Ajuste internacional | ¿Puede localizarse sin perder identidad? |
| Compatibilidad comercial | ¿Puede hacer colaboraciones sin romper el tono? |
| Reproducibilidad vocal | ¿La voz puede recrearse con consistencia? |

No se requiere un `VOICE_SCORE` o `VERBAL_SCORE` numérico obligatorio.

Si se usan puntuaciones, deben declararse como comparativas y no como verdad objetiva.

---

## 34. Recomendación

La IA puede recomendar una dirección, pero la recomendación no cambia el canon.

Estructura sugerida:

```json
{
  "recommended_verbal_direction": "[DIRECCION]",
  "recommended_voice_direction": "[DIRECCION_O_NO_APLICA]",
  "why": [
    "[RAZON_01]",
    "[RAZON_02]",
    "[RAZON_03]"
  ],
  "remaining_risks": ["[RIESGO]"] ,
  "approval_required": true
}
```

---

## 35. Validación inicial

Antes de bloquear F07, validar al menos:

```text
identidad verbal <-> CHARACTER_CANON
identidad verbal <-> BIOGRAPHY_CANON
identidad verbal <-> BRAND_IDENTITY_CANON
identidad verbal <-> BRAND_POSITIONING_CANON
identidad verbal <-> VALUE_PROPOSITION_CANON
identidad verbal <-> audiencia
identidad verbal <-> idioma / mercado
humor verbal <-> humor conductual F04
CTA <-> marca y nivel de confianza
voz hablada <-> edad / idioma / personaje, si aplica
voz hablada <-> identidad verbal
referencias <-> especificacion vocal
```

También validar:

- que no existan expresiones incompatibles con el canon;
- que las muestras no dependan de un único guion favorable;
- que la voz no cambie la edad o personalidad percibida de forma crítica;
- que la localización no introduzca una personalidad nueva;
- que F07 no invada F09 o F10.

---

## 36. Validadores

Se proponen:

```text
VALIDADOR_DE_IDENTIDAD_VERBAL_Y_VOZ
VALIDADOR_DE_CONSISTENCIA_DE_VOZ_CON_REFERENCIAS
```

### 36.1 Validador de Identidad Verbal y Voz

Debe comprobar:

- contexto mínimo;
- coherencia con F03-F05;
- tono verbal claro;
- reglas observables;
- vocabulario compatible;
- humor compatible;
- matriz de canal suficiente;
- localización coherente;
- voz hablada suficiente cuando sea requerida;
- ausencia de contradicciones críticas;
- aprobación suficiente antes del bloqueo.

### 36.2 Validador de Consistencia de Voz con Referencias

Debe comprobar, según el alcance declarado:

- timbre;
- acento;
- velocidad;
- energía;
- articulación;
- pronunciación;
- emoción;
- identidad completa cuando corresponda.

No debe penalizar diferencias fuera del alcance de la referencia.

### 36.3 Resultados

Usar resultados generales AIIF:

```text
VALIDA
VALIDA_CON_OBSERVACIONES
REQUIERE_AJUSTES
REQUIERE_DECISION_USUARIO
NO_APTA_PARA_BLOQUEO
```

---

## 37. Aprobación granular

F07 puede aprobar por:

- atributo verbal;
- bloque de vocabulario;
- humor;
- reglas de canal;
- idioma;
- dirección verbal completa;
- atributo vocal;
- muestra de voz;
- conjunto de referencias;
- identidad vocal completa;
- fase.

Ejemplos de aprobación suficiente:

```text
"Aprueba esta identidad verbal."
"Bloquea esta voz como la voz oficial."
"Aprueba estas dos muestras como referencias de voz."
"Aprueba F07 completa."
```

No constituyen necesariamente aprobación:

```text
"Me gusta."
"Suena bien."
"Prueba otra."
"Hazla un poco mas calida."
"Compara A y B."
```

---

## 38. Bloqueo canónico

Después de aprobación suficiente:

```json
{
  "verbal_identity_canon": "[VERBAL_IDENTITY_CANON]",
  "voice_required": true,
  "voice_style_canon": "[VOICE_STYLE_CANON_OR_NULL]",
  "voice_reference_set_canon": "[VOICE_REFERENCE_SET_CANON_OR_NULL]",
  "voice_identity_canon": "[VOICE_IDENTITY_CANON_OR_NULL]",
  "status": "LOCKED",
  "approved_by_user": true
}
```

Si la voz no es necesaria todavía:

```text
VERBAL_IDENTITY_CANON = BLOQUEADO
VOICE_REQUIRED = false
VOICE_STYLE_CANON = no definido / pospuesto
```

No inventar una voz para completar el esquema.

---

## 39. Etapas internas VV00-VV18

```text
VV00 - recuperar contexto y dependencias
VV01 - detectar ruta de entrada
VV02 - construir brief verbal
VV03 - generar Territorios Verbales
VV04 - construir candidatos verbales
VV05 - definir tono, vocabulario y sintaxis
VV06 - definir humor y relacion con audiencia
VV07 - construir Matriz de Canal Verbal
VV08 - definir reglas multilingues
VV09 - validar necesidad de voz sintetica
VV10 - construir Direcciones Vocales
VV11 - generar / importar muestras comparables
VV12 - ejecutar pruebas verbales y vocales
VV13 - comparar candidatos
VV14 - presentar recomendacion
VV15 - ejecutar validadores
VV16 - solicitar / registrar aprobacion
VV17 - bloquear canon y propagar dependencias
VV18 - preservar historial, referencias y portabilidad
```

Estas etapas son internas y no deben mostrarse al usuario salvo que aporten valor.

---

## 40. Estados y roles

No se crean nuevos estados globales.

Se reutiliza:

```text
NO_DEFINIDO -> PROPUESTO -> BORRADOR -> VALIDADO -> APROBADO -> BLOQUEADO
```

Roles internos opcionales:

```text
TRABAJO
CANDIDATO
SIMULADO
RECOMENDADO
CANONICO
RETIRADO
RECHAZADO
```

Para muestras de voz se pueden usar roles documentales adicionales sin crear estados globales:

```text
MUESTRA_GENERADA
CANDIDATO_DE_VOZ
APROBADA_PARA_USO
REFERENCIA_CANONICA
RETIRADA
```

---

## 41. Gobernanza de cambios

Una vez bloqueados:

```text
VERBAL_IDENTITY_CANON
VOICE_STYLE_CANON
VOICE_REFERENCE_SET_CANON
VOICE_IDENTITY_CANON
```

no deben cambiar automáticamente por:

- una campaña;
- un trend;
- un nuevo generador de voz;
- un cambio de plataforma;
- un audio viral;
- una traducción;
- una colaboración;
- una preferencia temporal;
- una mala generación.

Cambiar un elemento bloqueado requiere, según impacto:

```text
INSTRUCCION EXPLICITA
        ->
CHECKPOINT
        ->
PROPUESTA / SIMULACION
        ->
ANALISIS DE IMPACTO
        ->
REVALIDACION
        ->
APROBACION
        ->
NUEVA VERSION
        ->
REVALIDACION / REGENERACION DE DERIVADOS
```

---

## 42. Revalidación progresiva

F07 debe revalidarse cuando se desarrollan fases posteriores:

### F08 - Universo Narrativo

```text
voz <-> relaciones
voz <-> mundos
voz <-> escenas intimas / publicas
```

### F09 - Contenido

```text
voz <-> pilares
voz <-> captions
voz <-> guiones
voz <-> CTA
voz <-> respuestas
```

### F10 - Producción IA

```text
voz <-> audio generado
voz <-> lip-sync
voz <-> interpretacion
voz <-> proveedor
```

### F11 - Monetización

```text
voz <-> colaboraciones
voz <-> venta
voz <-> credibilidad comercial
```

### F12 - Crecimiento

Los experimentos de hooks, duración o edición no deben transformar automáticamente la identidad verbal.

Una contradicción posterior debe abrir revisión, no modificar F07 silenciosamente.

---

## 43. Relación F07 / F09 / F10

Regla canónica propuesta:

> **F07 define la identidad verbal y de voz; F09 decide qué decir en cada contenido; F10 ejecuta cómo producirlo.**

### F07 entrega

- identidad verbal;
- reglas lingüísticas;
- humor;
- vocabulario;
- matriz de canales;
- reglas multilingües;
- estilo vocal;
- referencias de voz;
- pronunciación;
- restricciones.

### F09 entrega

- tema concreto;
- hook;
- caption;
- CTA;
- hashtags;
- guion;
- variaciones de copy.

### F10 entrega

- audio generado;
- configuración del proveedor;
- interpretación final;
- lip-sync;
- edición;
- archivo exportado.

Un resultado de F10 se valida contra F07. No reescribe F07 por defecto.

---

## 44. Portabilidad

F07 debe poder continuar en otra IA aunque el proveedor de audio original no esté disponible.

El Paquete Portable puede incluir:

```text
VERBAL_IDENTITY_CANON
VOICE_REQUIRED
VOICE_STYLE_CANON
VOICE_REFERENCE_SET_CANON, si es portable
VOICE_PROVIDER_BINDINGS, como datos operativos
idiomas y perfiles por idioma
reglas de pronunciacion
matriz de canales
expresiones permitidas / prohibidas
muestras o referencias identificadas
historial
pendientes
proxima accion
```

Las muestras de audio pueden almacenarse fuera del texto portable; el paquete debe conservar suficiente metadata para identificarlas y explicar su alcance.

---

## 45. Compatibilidad de plataforma y degradación elegante

F07 debe funcionar en Modo Básico Universal.

Si la IA no puede generar audio:

1. define completamente la identidad verbal;
2. define la especificación vocal;
3. genera un brief de voz;
4. prepara texto de prueba;
5. indica que las muestras se producirán en una herramienta externa;
6. el usuario devuelve las muestras o resultados;
7. AIIF valida y continúa.

Estado de compatibilidad puede ser:

```text
COMPATIBLE
COMPATIBLE_CON_LIMITACIONES
REQUIERE_ALTERNATIVA
NO_COMPATIBLE
```

La ausencia de síntesis de voz integrada no bloquea el diseño de F07.

---

## 46. Privacidad y procedencia de referencias de voz

Cuando una referencia provenga de una voz real o de un archivo externo, AIIF debe registrar su procedencia cuando sea relevante para el proyecto.

La especificación no presupone derechos de uso sobre voces de terceros.

Preferencia operativa para un influencer virtual:

- voz sintética creada para el proyecto;
- licencia o permiso suficiente cuando corresponda;
- documentación del proveedor y uso permitido cuando sea relevante.

Este apartado es una regla de gobernanza y no reemplaza asesoría jurídica.

---

## 47. UX simplificada

La experiencia visible debe ser mucho más simple que `VV00-VV18`.

Propuesta:

```text
DIRECCION VERBAL
        ->
OPCIONES
        ->
MUESTRAS
        ->
DIRECCION RECOMENDADA
        ->
VOZ HABLADA, SI APLICA
        ->
APROBACION
        ->
IDENTIDAD VERBAL Y VOZ CANONICAS
```

Si el usuario no va a usar voz hablada:

```text
DIRECCION VERBAL
-> OPCIONES
-> MUESTRAS DE TEXTO
-> APROBACION
-> IDENTIDAD VERBAL CANONICA
```

---

## 48. Entregable oficial

El entregable oficial de F07 es:

# Biblia de Voz e Identidad Verbal

Debe poder incluir, según alcance:

1. resumen de identidad verbal;
2. tono verbal base;
3. registro y formalidad;
4. vocabulario;
5. sintaxis y ritmo;
6. humor;
7. puntuación/emojis;
8. expresiones preferidas y prohibidas;
9. estilo de CTA;
10. reglas de bio y hashtags;
11. Matriz de Canal Verbal;
12. Matriz de Respuesta Conversacional;
13. reglas multilingües;
14. identidad escrita versus hablada;
15. especificación de voz hablada;
16. referencias de voz y alcance;
17. pronunciación;
18. estilos prohibidos;
19. reglas de consistencia;
20. historial y versión.

También puede producirse un archivo técnico complementario:

```text
voice-bible.json
```

o equivalente, derivado de la Biblia de Voz e Identidad Verbal.

---

## 49. Estructura JSON de referencia

```json
{
  "verbal_identity": {
    "core_tone": [],
    "formality": "",
    "social_distance": "",
    "vocabulary": {
      "preferred": [],
      "restricted": [],
      "prohibited": []
    },
    "syntax": {
      "sentence_length": "",
      "rhythm": "",
      "information_density": ""
    },
    "humor": {
      "frequency": "",
      "compatible_styles": [],
      "prohibited_styles": []
    },
    "cta_style": "",
    "channel_rules": {},
    "languages": {
      "primary": "",
      "secondary": [],
      "profiles_by_language": {}
    }
  },
  "voice_identity": {
    "required": true,
    "voice_audio": {
      "gender_presentation": "",
      "accent": "",
      "apparent_age": "",
      "timbre": "",
      "pitch": "",
      "speed": {
        "style": "",
        "words_per_minute_min": null,
        "words_per_minute_max": null
      },
      "energy": "",
      "emotional_baseline": [],
      "articulation": "",
      "pauses": "",
      "pronunciation_rules": [],
      "identity_rules": [],
      "prohibited_styles": []
    },
    "reference_set": [],
    "provider_bindings": []
  }
}
```

---

## 50. Algoritmo operativo

```text
INPUT: canon F01-F06 + idioma + audiencia + necesidad de voz

1. recuperar contexto existente
2. detectar si usuario sabe / tiene ideas / no sabe
3. construir brief verbal
4. generar Territorios Verbales si hace falta
5. construir candidatos verbales
6. operacionalizar tono, vocabulario, sintaxis y humor
7. probar en varios canales y escenarios
8. construir reglas multilingues
9. validar coherencia con personaje y marca
10. recomendar identidad verbal
11. determinar VOICE_REQUIRED
12. si VOICE_REQUIRED = true:
      a. construir Direcciones Vocales
      b. generar o importar muestras comparables
      c. probar neutral / emocional / comercial / conversacional
      d. validar pronunciacion y referencias
      e. recomendar voz
13. ejecutar validadores
14. esperar aprobacion explicita
15. bloquear solo lo aprobado
16. preservar historial y referencias
17. propagar F07 hacia F08-F10
```

---

## 51. Mapeo fuente experta -> arquitectura AIIF

| Elemento fuente experta | Tratamiento en AIIF F07 |
|---|---|
| Forma de expresarse | Núcleo de `VERBAL_IDENTITY_CANON` |
| Energía emocional | F04 aporta baseline; F07 la traduce a lenguaje y voz |
| Tipo de humor | F04 define función; F07 define realización verbal |
| Captions | F07 define reglas; F09 genera piezas concretas |
| Videos hablados | F07 define lenguaje y voz; F10 produce |
| Audios | F07 define identidad vocal; F10 ejecuta producción |
| Roleplay | F07 aporta voz; F08 aporta contexto narrativo |
| Copywriting: bios, tono | F07 define identidad y reglas |
| Hashtags, CTA | F07 define estilo; F09 decide ejecución concreta |
| Reglas de consistencia | Validadores, canon, referencias y gobernanza |
| Acento, pitch, velocidad, muestras | Extensión AIIF para síntesis de voz; no explícita en la fuente original |

---

## 52. Principio final propuesto

> **AI Influencer Factory debe poder construir una identidad verbal coherente incluso cuando el usuario no conozca copywriting, lingüística o dirección de voz. Debe utilizar biografía, personaje, marca, audiencia e idioma ya aprobados para proponer territorios verbales, convertir rasgos de personalidad en patrones lingüísticos observables, probar la misma identidad en distintos canales y localizarla entre idiomas sin crear personalidades nuevas. Cuando el proyecto requiera audio, debe construir una especificación vocal proveedor-agnóstica, comparar muestras con textos equivalentes, registrar referencias con alcance y exigir aprobación suficiente antes de bloquear la Identidad de Voz Canónica. F07 define cómo se expresa y cómo suena; F09 decide qué decir y F10 produce el activo final.**

---

## 53. Estado de esta especificación

```text
ESTADO_DOCUMENTAL = APROBADA
```

Esta especificación forma parte de la baseline comercial aprobada de AI Influencer Factory (Auditoría Transversal F01–F13 Pre-Freeze (tabla de fases y hallazgo H02) + Commercial Freeze v1.0 del 2026-08-17). La auditoría pre-freeze ya había señalado (hallazgo H02) que su estado anterior, `PROPUESTA_LISTA_PARA_APROBACION`, quedó desactualizado: el texto se redactó antes de la aprobación de F07.

Por eso la IA debe tratar los sistemas, identificadores, etapas internas y validadores definidos aquí como reglas vigentes de F07, no como propuestas.

Aprobar la especificación no aprueba datos de ningún proyecto. Cada objeto canónico de un influencer concreto sigue necesitando su propia aprobación explícita del usuario, según las reglas de este documento.

La versión con el estado anterior se conserva en `90_HISTORICO_Y_LEGACY/Versiones_Anteriores/v1.0/07_F07_IDENTIDAD_VERBAL_Y_VOZ/AI_INFLUENCER_FACTORY_Especificacion_General_Identidad_Verbal_Voz_Canonica_v1.0.md`, sin precedencia vigente.
