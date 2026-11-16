---
spec_id: AIIF_GENERAL_NAMING_CANON_SPEC
spec_version: "1.0.0"
spec_type: AIIF_NAMING_DISCOVERY_AND_CANONIZATION_SPEC
status: APROBADA
estado_documental: APROBADA
estado_documental_anterior: FINAL_INTEGRADA_PARA_IMPLEMENTACION
base_aprobacion: "Aprobación explícita del usuario para integrarla (CR-0001, 2026-11-16)"
phase: "F03 — Biografía e Identidad (subsistema de nombramiento F03:NAMING)"
internal_stages: "N00–N15"
canonical_document_language: ES
source_document: "AI_INFLUENCER_FACTORY_Especificacion_General_Nombramiento_Canonico_v1.0.docx"
replaces: "90_HISTORICO_Y_LEGACY/Especificaciones_Reemplazadas/UNIVERSAL_AI_CANONICAL_NAMING_SPEC(1).md"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
added_in_system_version: "AIIF_PORTABLE_v1.0.1"
change_request: "CR-0001"
---

# AI INFLUENCER FACTORY

## Especificación General del Sistema Inteligente de Nombramiento Canónico

**Versión:** 1.0.0  
**Idioma documental canónico:** Español  
**Ámbito:** General y reutilizable  
**Estado:** Final integrada para implementación en AI Influencer Factory — Sistema Portable v1.0

## 0. Control documental

### 0.1 Propósito del documento

Esta especificación define cómo AI Influencer Factory debe ayudar a investigar, generar, comparar, filtrar, prevalidar, recomendar, aprobar y bloquear el nombre canónico de una identidad virtual, influencer creada con IA, marca personal, personaje digital o proyecto equivalente.

El sistema no debe comportarse como un generador aleatorio de nombres. Debe transformar el contexto estratégico del proyecto en un proceso controlado de decisión de marca.

### 0.2 Fuente de consolidación

Este documento integra y adapta la especificación base `UNIVERSAL_AI_CANONICAL_NAMING_SPEC v1.0.0` al canon estructural, documental, multilingüe, de estados, validación, portabilidad y experiencia de usuario de AI Influencer Factory.

### 0.3 Regla de idioma

El idioma documental y estructural de esta especificación es español.

Se conservan identificadores técnicos estables ya establecidos cuando su traducción pudiera romper compatibilidad. En particular:

  - `NAME_CANON` se conserva como identificador técnico estable del nombre canónico.
  - Los estados globales de AI Influencer Factory conservan sus identificadores ya definidos.
  - Los nombres de plataformas, marcas, formatos y siglas técnicas pueden conservar su forma oficial.

Toda etiqueta visible, explicación, manual o guía debe preferir español cuando el `IDIOMA_INTERFAZ` sea español.

### 0.4 Regla de reutilización

La especificación debe funcionar con variables genéricas y no depender de nombres, personas, mercados o proyectos concretos.

Ejemplos de variables:

    [Nombre del proyecto]
    [Tipo de creador]
    [Nicho]
    [Concepto]
    [Posicionamiento]
    [Mercado]
    [Idioma público]
    [Nombre candidato]
    [Nombre finalista]
    [Nombre canónico]

## 1. Principio rector

> **El nombre canónico no se obtiene en un único paso creativo. Se construye mediante contexto estratégico, exploración controlada, filtrado de colisiones, validación lingüística, comparación de marca, pruebas de uso real, revisión preliminar de riesgos y aprobación humana explícita.**

AI Influencer Factory puede investigar, proponer, comparar y recomendar. Solo una aprobación válida convierte un candidato en `NAME_CANON`.

El sistema debe poder ayudar tanto a quien ya tiene un nombre como a quien no tiene ninguna idea.

## 2. Objetivos funcionales

El Sistema Inteligente de Nombramiento Canónico debe:

1.  detectar cuánto sabe el usuario sobre el nombre;
2.  reutilizar información ya existente en el proyecto;
3.  evitar preguntas repetidas;
4.  crear un brief de nombramiento cuando sea necesario;
5.  proponer territorios estratégicos antes de generar nombres cuando el usuario parte de cero;
6.  generar un conjunto manejable de candidatos;
7.  filtrar conflictos evidentes antes de privilegiar el gusto estético;
8.  validar pronunciación, escritura, memorabilidad y compatibilidad internacional;
9.  evaluar buscabilidad, distintividad y capacidad de marca;
10. realizar pruebas de uso real sobre finalistas;
11. realizar revisiones externas únicamente cuando la plataforma lo permita;
12. diferenciar claramente lo verificado de lo no verificado;
13. presentar una recomendación transparente;
14. requerir aprobación explícita para bloquear el nombre canónico;
15. conservar historial y trazabilidad;
16. permitir renombramientos controlados mediante análisis de impacto y versionado.

## 3. Ubicación dentro de AI Influencer Factory

El sistema de nombramiento no crea una nueva fase global.

Su ubicación principal es:

    F01 — Fundamentos Estratégicos
              ↓
    F02 — Concepto
              ↓
    F03 — Biografía e Identidad
              └── Sistema Inteligente de Nombramiento Canónico
                        ↓
                     NAME_CANON

### 3.1 Dependencias hacia atrás

El sistema utiliza prioritariamente información proveniente de:

  - F01: nicho, monetización, audiencia, mercados, tiempo, objetivo;
  - F02: concepto, dirección creativa, posicionamiento conceptual y atributos preliminares.

### 3.2 Dependencias hacia adelante

Una vez bloqueado `NAME_CANON`, debe propagarse a los entregables y sistemas posteriores que dependan de la identidad nominal, por ejemplo:

  - Biblia de Biografía e Identidad;
  - Biblia de Personaje;
  - Biblia de Marca;
  - Biblia de Identidad Visual;
  - Biblia de Voz e Identidad Verbal;
  - Biblia Narrativa;
  - Biblia de Contenido;
  - Sistema / Manual de Producción IA;
  - Perfil Maestro;
  - paquetes portables;
  - archivos de reanudación;
  - plantillas y prompts derivados.

## 4. Diferencia entre identificadores

AI Influencer Factory debe mantener separados los siguientes conceptos:

    ID_PROYECTO / ID_CREADOR
            ≠
    NAME_CANON
            ≠
    NOMBRE_VISIBLE
            ≠
    HANDLE_PREFERIDO

### 4.1 ID de proyecto o creador

Identificador técnico estable que existe incluso antes de conocer el nombre.

Ejemplo abstracto:

    ID_CREADOR = AIF-CREATOR-[ID]

Un cambio de nombre no debe romper este identificador.

### 4.2 `NAME_CANON`

Nombre oficial aprobado y bloqueado del proyecto.

### 4.3 Nombre visible

Representación pública del nombre. Puede coincidir con `NAME_CANON`, pero se registra por separado cuando una plataforma exige variantes de presentación.

### 4.4 Handle preferido

Nombre de usuario deseado en una plataforma específica.

Un cambio de handle no constituye un renombramiento del proyecto.

## 5. Modelo de datos del nombramiento

El sistema de nombramiento debe integrarse con la Matriz Maestra de Datos y con el ciclo global de estados.

### 5.1 Campos conceptuales mínimos

    {
      "id_proyecto": "[ID_PROYECTO]",
      "tipo_creador": "[TIPO_CREADOR]",
      "name_canon": null,
      "rol_nombre": "[TRABAJO|CANDIDATO|PRESELECCIONADO|FINALISTA|RECOMENDADO|CANONICO|RETIRADO|RECHAZADO]",
      "estado_dato": "[NO_DEFINIDO|PROPUESTO|BORRADOR|VALIDADO|APROBADO|BLOQUEADO]",
      "origen": "[PROPORCIONADO_POR_USUARIO|EXTRAIDO_DE_CONTEXTO|DEDUCIDO|PROPUESTO_POR_IA]",
      "contexto_nominal": {},
      "territorios_nombre": [],
      "nombres_trabajo": [],
      "candidatos": [],
      "preseleccion": [],
      "finalistas": [],
      "puntuaciones_marca": {},
      "pruebas_resistencia": {},
      "revision_conflictos": {},
      "revision_preliminar_marcas": {},
      "validacion_externa": {},
      "recomendacion": null,
      "aprobacion_requerida": true,
      "historial_preservado": true
    }

### 5.2 No crear un segundo sistema global de estados

Los términos de la especificación fuente como `WORKING`, `CANDIDATE`, `SHORTLIST`, `FINALIST`, `RECOMMENDED`, `CANONICAL` o `LOCKED` no se incorporan como estados globales nuevos.

Su significado se expresa mediante dos dimensiones:

    ESTADO_DATO + ROL_NOMBRE

Ejemplos:

    ESTADO_DATO = PROPUESTO
    ROL_NOMBRE  = CANDIDATO
    ESTADO_DATO = VALIDADO
    ROL_NOMBRE  = FINALISTA
    ESTADO_DATO = BLOQUEADO
    ROL_NOMBRE  = CANONICO

## 6. Rutas de entrada

La factoría debe detectar automáticamente una de tres rutas.

### 6.1 Ruta A — El usuario ya tiene un nombre

Ejemplo de intención:

> “Quiero que se llame [Nombre].”

Comportamiento:

1.  registrar el nombre como candidato principal;
2.  no generar alternativas innecesarias;
3.  ofrecer validación acorde con la profundidad activa;
4.  no convertirlo en `NAME_CANON` sin la aprobación correspondiente;
5.  permitir, si el usuario lo solicita, usarlo directamente sujeto a las reglas canónicas de aprobación y bloqueo.

### 6.2 Ruta B — El usuario tiene varias ideas

Ejemplo de intención:

> “Estoy entre [A], [B] y [C].”

Comportamiento:

1.  registrar las ideas como candidatos;
2.  comparar;
3.  filtrar;
4.  puntuar;
5.  reducir a finalistas;
6.  recomendar;
7.  solicitar aprobación.

### 6.3 Ruta C — El usuario no tiene ningún nombre

Ejemplos:

> “No sé cómo llamarla.”
> 
> “Ayúdame a encontrar el nombre.”
> 
> “Decide tú la mejor dirección.”

Comportamiento:

    BRIEF DE NOMBRAMIENTO
            ↓
    TERRITORIOS DE NOMBRE
            ↓
    SEMILLAS / NOMBRES DE TRABAJO
            ↓
    CANDIDATOS
            ↓
    FILTROS
            ↓
    PRESELECCIÓN
            ↓
    FINALISTAS
            ↓
    RECOMENDACIÓN
            ↓
    APROBACIÓN
            ↓
    NAME_CANON

Esta ruta es obligatoria para que la factoría pueda ayudar a principiantes que no aportan nombres iniciales.

## 7. Experiencia visible de entrada

Cuando corresponda, la factoría puede presentar una pregunta simple:

> **¿Ya tienes nombre para tu influencer?**

1.  Sí, ya tengo uno.
2.  Tengo algunas ideas.
3.  No tengo ninguno; ayúdame a encontrarlo.
4.  Recomiéndame tú la mejor dirección.

Esta interacción se integra con las reglas canónicas de Inicio Fácil y con activadores naturales como:

  - “No sé”;
  - “Dame opciones”;
  - “Recomiéndame”;
  - “Decide tú”;
  - “Haz lo mejor”;
  - “No tengo preferencia”.

El usuario no necesita aprender comandos especiales.

## 8. Brief de nombramiento

Antes de generar candidatos desde cero, AI Influencer Factory debe construir un brief de nombramiento utilizando primero información ya existente.

### 8.1 Inputs requeridos

Debe existir información suficiente sobre:

  - concepto de identidad;
  - nicho;
  - audiencia o mercados principales;
  - idioma público principal;
  - posicionamiento conceptual suficiente.

### 8.2 Inputs deseables

Mejoran la calidad pero no deben bloquear el proceso si aún no existen:

  - arquetipo preliminar;
  - percepción deseada;
  - atributos iniciales del personaje;
  - dirección estética preliminar;
  - tipo de relación deseada con la audiencia.

### 8.3 Inputs opcionales

No son requisito previo para definir el nombre:

  - personalidad completa de F04;
  - identidad de marca completa de F05;
  - identidad visual cerrada de F06;
  - universo narrativo completo de F08.

### 8.4 Regla de dependencia

El sistema nunca debe exigir información de una fase posterior como condición rígida para completar F03 si dispone de contexto suficiente para avanzar.

### 8.5 Estructura conceptual

    {
      "concepto_identidad": "[CONCEPTO]",
      "nicho": "[NICHO]",
      "posicionamiento_publico": "[POSICIONAMIENTO]",
      "mercados_objetivo": ["[MERCADO_01]", "[MERCADO_02]"],
      "idiomas_publicos": ["[IDIOMA_01]", "[IDIOMA_02]"],
      "percepcion_deseada": ["[ATRIBUTO_01]", "[ATRIBUTO_02]"],
      "estilo_nombre": ["[ESTILO_01]", "[ESTILO_02]"],
      "evitar": ["[EVITAR_01]", "[EVITAR_02]"],
      "escalabilidad_deseada": ["influencer", "colaboraciones", "productos", "marca"]
    }

## 9. Territorios de nombre

Cuando el usuario parte de cero, el sistema debe proponer primero un pequeño conjunto de direcciones estratégicas antes de generar candidatos.

Ejemplos genéricos de territorios:

    TERRITORIO A — Humano internacional
    TERRITORIO B — Editorial distintivo
    TERRITORIO C — Artístico y evocador
    TERRITORIO D — Comercial y escalable

Los territorios reales deben derivarse del proyecto. Los ejemplos anteriores no son taxonomías obligatorias.

### 9.1 Objetivo

Los territorios sirven para:

  - reducir aleatoriedad;
  - alinear estilo nominal con estrategia;
  - permitir al usuario elegir una dirección sin inventar nombres;
  - mejorar coherencia entre concepto y candidatos;
  - evitar listas masivas sin criterio.

### 9.2 Cantidad recomendada

Presentar normalmente entre 2 y 4 territorios suficientemente distintos.

## 10. Etapas internas del sistema

Para evitar conflicto con F01–F13, las etapas internas del nombramiento se identifican con prefijo `N`.

    N00 — Detección de ruta de entrada
    N01 — Contexto y brief de nombramiento
    N02 — Territorios de nombre
    N03 — Semillas y nombres de trabajo
    N04 — Variantes y exploración controlada
    N05 — Cribado inicial de colisiones
    N06 — Validación lingüística y fonética
    N07 — Buscabilidad y memorabilidad
    N08 — Preselección
    N09 — Puntuación de Marca
    N10 — Selección de finalistas
    N11 — Pruebas de resistencia
    N12 — Revisión preliminar de marcas
    N13 — Matriz final comparativa
    N14 — Recomendación
    N15 — Aprobación y bloqueo de NAME_CANON

Estas etapas son internas al sistema de nombramiento y no sustituyen las fases oficiales de AI Influencer Factory.

## 11. N00 — Detección de ruta de entrada

Determinar:

    NOMBRE_EXISTENTE
    VARIAS_IDEAS
    SIN_NOMBRE

También detectar activadores de asistencia.

Resultado conceptual:

    {
      "ruta_entrada": "SIN_NOMBRE",
      "requiere_generacion": true,
      "requiere_comparacion": true,
      "requiere_asistencia": true
    }

## 12. N01 — Contexto y brief

1.  recuperar información F01/F02 ya disponible;
2.  identificar vacíos críticos;
3.  deducir únicamente cuando sea seguro;
4.  proponer cuando corresponda;
5.  preguntar solo por datos realmente necesarios;
6.  registrar procedencia de cada dato.

No volver a preguntar información ya aprobada.

## 13. N02 — Territorios de nombre

Generar direcciones nominales estratégicas con:

  - descripción breve;
  - relación con el posicionamiento;
  - ventajas;
  - riesgos;
  - tipo de percepción que producen.

El usuario puede:

  - seleccionar un territorio;
  - combinar dos compatibles;
  - pedir alternativas;
  - decir “recomiéndame”;
  - decir “decide tú”.

## 14. N03 — Semillas y nombres de trabajo

Los nombres de trabajo pueden provenir de:

  - ideas del usuario;
  - conceptos semánticos;
  - fonemas o raíces;
  - combinaciones creadas por IA;
  - nombres heredados de una etapa previa;
  - propuestas derivadas de los territorios seleccionados.

No son canon.

    ROL_NOMBRE = TRABAJO

Si el usuario no aportó ningún nombre, esta etapa debe crearlos a partir del brief y los territorios.

## 15. N04 — Variantes y exploración controlada

Explorar únicamente variantes razonables, por ejemplo:

  - variaciones fonéticas;
  - variaciones ortográficas;
  - nombre + apellido;
  - nombre corto + apellido;
  - formas internacionales;
  - estructuras más memorables;
  - estructuras más visuales.

### Regla

No generar cientos de variantes.

El objetivo es un conjunto manejable y suficientemente diverso.

Recomendación operativa inicial:

    6 a 12 candidatos de calidad

La cantidad puede variar según profundidad y resultados de filtros.

## 16. N05 — Cribado inicial de colisiones

Antes de favorecer estética o preferencia subjetiva, revisar colisiones evidentes cuando la capacidad de plataforma lo permita.

Ámbitos posibles:

  - buscadores;
  - plataformas sociales relevantes;
  - creadores existentes;
  - entretenimiento;
  - marcas cercanas al nicho;
  - dominios relevantes;
  - otros resultados públicos pertinentes.

Resultado conceptual:

    {
      "nombre": "[CANDIDATO]",
      "coincidencia_exacta": false,
      "coincidencia_cercana": false,
      "riesgo_colision_social": "BAJO|MEDIO|ALTO|NO_VERIFICADO",
      "riesgo_colision_marca": "BAJO|MEDIO|ALTO|NO_VERIFICADO",
      "riesgo_confusion_busqueda": "BAJO|MEDIO|ALTO|NO_VERIFICADO",
      "decision_filtro": "CONSERVAR|REVISAR|RECHAZAR"
    }

Una colisión importante puede eliminar un nombre aunque creativamente sea fuerte.

## 17. N06 — Validación lingüística y fonética

Evaluar según mercados relevantes:

  - facilidad de pronunciación;
  - claridad al escucharlo;
  - facilidad de escritura;
  - riesgo de errores ortográficos;
  - sonoridad;
  - ritmo;
  - fonética internacional;
  - dobles sentidos;
  - significados no deseados;
  - conflictos lingüísticos.

Cuando corresponda:

  - transliteración;
  - pronunciación aproximada;
  - lectura local;
  - riesgo de deformación.

La evaluación debe considerar `IDIOMA_PUBLICO_INFLUENCER` y mercados objetivo, no solamente `IDIOMA_INTERFAZ`.

## 18. N07 — Buscabilidad y memorabilidad

Evaluar:

  - memorabilidad;
  - facilidad de escritura;
  - distintividad;
  - claridad sonora;
  - facilidad de búsqueda;
  - riesgo de autocorrector;
  - confusión con palabras comunes;
  - posibilidad de asociarse con una identidad única.

Preguntas orientativas:

1.  ¿Se recuerda después de verlo una vez?
2.  ¿Puede escribirse después de escucharlo?
3.  ¿Es suficientemente distintivo para buscarlo?
4.  ¿Se mezcla con conceptos o entidades previas?
5.  ¿Puede sostener una identidad reconocible?

## 19. N08 — Preselección

Reducir los candidatos supervivientes a un grupo manejable.

Recomendación:

    3 a 7 candidatos
    ROL_NOMBRE = PRESELECCIONADO

La IA debe registrar por qué cada candidato sobrevivió y por qué los demás fueron rechazados o puestos en revisión.

## 20. N09 — Puntuación de Marca

La Puntuación de Marca permite comparar candidatos de forma transparente.

Escala recomendada:

    0–100

### 20.1 Dimensiones principales

Evaluar al menos:

  - memorabilidad;
  - pronunciación;
  - compatibilidad internacional;
  - buscabilidad;
  - distintividad;
  - potencial de handle;
  - ajuste estratégico de marca;
  - ajuste visual;
  - expansión futura;
  - riesgo de colisión.

### 20.2 Indicador secundario de difusión social

El antiguo concepto de “potencial de viralidad” no debe presentarse como promesa de viralidad.

Se sustituye por:

    POTENCIAL_DIFUSION_SOCIAL

Este indicador puede considerar:

  - facilidad de recordar;
  - facilidad de escribir;
  - musicalidad;
  - uso como hashtag;
  - facilidad de repetición oral.

Debe tener peso secundario salvo decisión explícita del proyecto.

### 20.3 Pesos transparentes

Si el proyecto no define pesos:

1.  usar pesos iguales; o
2.  proponer pesos y declararlos claramente; o
3.  pedirlos cuando realmente sean relevantes.

Nunca utilizar pesos ocultos.

### 20.4 Ejemplo de estructura

    {
      "nombre": "[CANDIDATO]",
      "puntuaciones": {
        "memorabilidad": 0,
        "pronunciacion": 0,
        "compatibilidad_internacional": 0,
        "buscabilidad": 0,
        "distintividad": 0,
        "potencial_handle": 0,
        "ajuste_marca": 0,
        "ajuste_visual": 0,
        "potencial_difusion_social": 0,
        "expansion_futura": 0
      },
      "penalizacion_colision": 0,
      "puntuacion_marca_100": 0,
      "pesos_declarados": true
    }

### 20.5 Límite del score

La puntuación sirve para comparar.

No constituye:

  - registro de marca;
  - opinión jurídica;
  - garantía de disponibilidad;
  - garantía comercial;
  - predicción de viralidad.

## 21. N10 — Selección de finalistas

Reducir la preselección a aproximadamente:

    3 finalistas
    ROL_NOMBRE = FINALISTA

No declarar ganador todavía.

## 22. N11 — Pruebas de resistencia

Los finalistas deben probarse en situaciones de uso real.

### 22.1 Prueba de nombre de usuario

Simular estructuras como:

    @[NOMBRE]
    @[NOMBRE]official
    @[NOMBRE]ai

Estas variantes son pruebas de robustez, no propuestas automáticas de handle oficial.

Evaluar:

  - legibilidad;
  - longitud;
  - confusión;
  - disponibilidad potencial cuando pueda verificarse.

### 22.2 Prueba de búsqueda

Simular consultas como:

    "[NOMBRE]"
    "[NOMBRE] AI"
    "[NOMBRE] creator"
    "[NOMBRE] model"

Evaluar si el proyecto podría construir buscabilidad propia o quedaría mezclado con entidades previas.

### 22.3 Prueba de pronunciación

Evaluar:

  - persona que lo lee;
  - persona que solo lo escucha;
  - persona no nativa del idioma original.

Pregunta clave:

> ¿Puede repetirse correctamente después de escucharlo una vez?

### 22.4 Prueba de transliteración

Cuando corresponda a los mercados objetivo, evaluar:

  - sonoridad;
  - deformación;
  - ambigüedad;
  - facilidad de lectura.

### 22.5 Prueba de logo y marca de agua

Simular:

    [NOMBRE]
    [NOMBRE]™
    @[NOMBRE]

Evaluar:

  - balance visual;
  - longitud;
  - legibilidad en pequeño;
  - fuerza como firma;
  - compatibilidad con fotografía y video.

### 22.6 Prueba de hashtag

Simular:

    #[NOMBRE]
    #[NOMBRE]Style
    #[NOMBRE]Daily

Evaluar claridad, memorabilidad, colisiones y facilidad de escritura.

### 22.7 Prueba de colaboración

Simular:

    [MARCA] x [NOMBRE]
    [NOMBRE] para [MARCA]

Evaluar naturalidad comercial.

### 22.8 Prueba de campaña

Simular:

    [NOMBRE] — [CAMPAÑA]
    The [NOMBRE] Edit
    Inside [NOMBRE]

Las expresiones creativas pueden conservar idioma internacional cuando correspondan al mercado; no cambian el idioma documental canónico.

### 22.9 Prueba de comunidad

Explorar si el nombre admite extensiones comunitarias sin sonar forzado.

No convertir ninguna variante comunitaria en nombre oficial automáticamente.

### 22.10 Prueba de expansión

Preguntar:

  - ¿funciona si el proyecto pasa de influencer a marca?;
  - ¿funciona en nuevas categorías compatibles?;
  - ¿funciona en productos?;
  - ¿funciona en colaboraciones?;
  - ¿funciona como marca personal o editorial si el proyecto evoluciona?

Un nombre excesivamente atado a un formato puede limitar crecimiento futuro.

## 23. N12 — Revisión preliminar de marcas

Antes de recomendar el finalista principal, realizar una revisión preliminar en fuentes relevantes cuando exista capacidad de navegación o consulta.

Fuentes potenciales según jurisdicción:

  - WIPO;
  - USPTO;
  - EUIPO;
  - registros nacionales pertinentes;
  - otras fuentes oficiales relevantes.

Resultado conceptual:

    {
      "nombre": "[FINALISTA]",
      "riesgo_preliminar_marca": "BAJO|MEDIO|ALTO|DESCONOCIDO",
      "coincidencia_exacta_encontrada": false,
      "coincidencia_similar_encontrada": false,
      "estado_verificacion": "VERIFICADO|PARCIALMENTE_VERIFICADO|NO_VERIFICADO|NO_DISPONIBLE",
      "notas": []
    }

### Advertencia obligatoria

> **Esta revisión es preliminar y no sustituye una búsqueda jurídica profesional de marcas ni una opinión legal.**

La IA no debe afirmar:

> “El nombre está legalmente libre.”

salvo que exista una validación jurídica real, externa y explícita que permita sostener esa afirmación.

## 24. Compatibilidad de plataforma y verificación externa

El Sistema Portable v1.0 no puede asumir que todas las IAs tienen navegación, acceso a redes, consultas de dominios o registros de marcas.

### 24.1 Estados de verificación

Toda comprobación externa relevante debe registrar uno de:

    VERIFICADO
    PARCIALMENTE_VERIFICADO
    NO_VERIFICADO
    NO_DISPONIBLE

### 24.2 Regla

La ausencia de navegación no debe impedir el análisis creativo y estratégico del nombre.

Debe producirse degradación elegante:

    ANÁLISIS ESTRATÉGICO
    + ANÁLISIS LINGÜÍSTICO
    + PUNTUACIÓN INTERNA
    + PRUEBAS SIMULADAS
    +
    VERIFICACIONES EXTERNAS = NO_VERIFICADAS cuando no exista capacidad

Nunca inventar disponibilidad.

### 24.3 Handles

Por plataforma:

    {
      "instagram": "VERIFICADO|NO_VERIFICADO|NO_DISPONIBLE",
      "tiktok": "VERIFICADO|NO_VERIFICADO|NO_DISPONIBLE",
      "youtube": "VERIFICADO|NO_VERIFICADO|NO_DISPONIBLE",
      "otros": {}
    }

No afirmar que un handle está disponible sin comprobación real.

### 24.4 Dominios

La disponibilidad de un dominio es un dato independiente de `NAME_CANON`.

Un dominio ocupado no elimina automáticamente un nombre, salvo que afecte materialmente la estrategia del proyecto.

## 25. N13 — Matriz final comparativa

Presentar los finalistas de forma clara.

| **Criterio**                   | **[FINALISTA A]** | **[FINALISTA B]** | **[FINALISTA C]** |
| ------------------------------ | ------------------- | ------------------- | ------------------- |
| Memorabilidad                  | —                   | —                   | —                   |
| Pronunciación                  | —                   | —                   | —                   |
| Compatibilidad internacional   | —                   | —                   | —                   |
| Buscabilidad                   | —                   | —                   | —                   |
| Distintividad                  | —                   | —                   | —                   |
| Potencial de handle            | —                   | —                   | —                   |
| Logo / marca de agua           | —                   | —                   | —                   |
| Hashtag                        | —                   | —                   | —                   |
| Colaboraciones                 | —                   | —                   | —                   |
| Campañas                       | —                   | —                   | —                   |
| Comunidad                      | —                   | —                   | —                   |
| Expansión                      | —                   | —                   | —                   |
| Potencial de difusión social   | —                   | —                   | —                   |
| Riesgo de colisión             | —                   | —                   | —                   |
| Riesgo preliminar de marca     | —                   | —                   | —                   |
| Estado de verificación externa | —                   | —                   | —                   |
| **Puntuación de Marca**        | —                   | —                   | —                   |

## 26. N14 — Recomendación

La IA puede recomendar un candidato preferido.

    {
      "candidato_recomendado": "[FINALISTA]",
      "confianza": "ALTA|MEDIA|BAJA",
      "motivos": [
        "[MOTIVO_01]",
        "[MOTIVO_02]",
        "[MOTIVO_03]"
      ],
      "riesgos_restantes": ["[RIESGO_01]"],
      "verificaciones_pendientes": ["[PENDIENTE_01]"]
    }

### Regla crítica

La recomendación no cambia por sí sola el nombre a canónico.

    ROL_NOMBRE = RECOMENDADO
    ESTADO_DATO ≠ BLOQUEADO

## 27. N15 — Aprobación y bloqueo de `NAME_CANON`

### 27.1 Aprobación válida

Debe existir una instrucción explícita equivalente a:

  - “Aprueba [Nombre] como nombre canónico.”;
  - “Bloquea [Nombre] como `NAME_CANON`.”;
  - “Este será definitivamente el nombre.”;
  - “Queda aprobado como nombre oficial.”.

### 27.2 Expresiones insuficientes

No constituyen por sí solas aprobación:

  - “Me gusta.”;
  - “Suena bien.”;
  - “Puede servir.”;
  - “Compáralo con otro.”;
  - “Busca si está disponible.”;
  - “Simula cómo se vería.”.

### 27.3 Resultado

Solo después de aprobación válida:

    {
      "name_canon": "[NOMBRE_APROBADO]",
      "rol_nombre": "CANONICO",
      "estado_dato": "BLOQUEADO",
      "aprobado_por_usuario": true,
      "fecha_efectiva": "[FECHA]",
      "version": "[VERSION]",
      "candidatos_historicos_preservados": true
    }

Los candidatos anteriores deben conservarse como históricos, retirados o rechazados según corresponda.

## 28. Gobernanza posterior al bloqueo

Una vez bloqueado:

    NAME_CANON = [NOMBRE_APROBADO]

se considera estable.

No cambia automáticamente por:

  - nuevo handle;
  - nueva red social;
  - nuevo logo;
  - nueva campaña;
  - nuevo idioma;
  - nuevo contenido;
  - nuevo nicho secundario;
  - preferencia temporal.

### 28.1 Renombramiento

Un cambio de `NAME_CANON` requiere:

    INSTRUCCIÓN EXPLÍCITA
            +
    PUNTO DE CONTROL
            +
    RAMA DE REVISIÓN
            +
    ANÁLISIS DE IMPACTO
            +
    VALIDACIÓN
            +
    APROBACIÓN
            +
    REGISTRO DEL CAMBIO
            +
    ACTUALIZACIÓN DE VERSIÓN
            +
    REGENERACIÓN DE DERIVADOS AFECTADOS

El nombre anterior se conserva en historial.

## 29. Integración con Sistema 00

El Sistema Inteligente de Nombramiento Canónico debe utilizar:

  - Matriz Maestra de Datos;
  - Estado del Proyecto;
  - Registro de Decisiones;
  - Registro de Cambios;
  - Puntos de Control;
  - versiones;
  - procedencia de datos;
  - dependencias;
  - validadores.

### 29.1 Decisión de nombre

La decisión final debe registrar al menos:

    qué nombre se aprobó
    qué alternativas se evaluaron
    por qué se recomendó
    qué verificaciones se realizaron
    qué verificaciones quedaron pendientes
    quién lo aprobó
    cuándo entró en vigor
    qué versión del proyecto creó

## 30. Profundidad del proceso

El sistema reutiliza los niveles canónicos de profundidad de AI Influencer Factory.

### 30.1 NÚCLEO

Para una decisión rápida pero controlada:

  - ajuste estratégico;
  - memorabilidad;
  - pronunciación;
  - distintividad;
  - colisiones evidentes cuando puedan verificarse;
  - recomendación;
  - aprobación.

### 30.2 AMPLIADO — nivel recomendado

Incluye:

  - brief;
  - territorios;
  - candidatos;
  - cribado;
  - validación internacional básica;
  - Puntuación de Marca;
  - preselección;
  - finalistas;
  - pruebas de resistencia principales;
  - revisión preliminar de marcas cuando sea posible;
  - matriz final;
  - recomendación;
  - aprobación.

### 30.3 PROFUNDO

Añade, cuando sea pertinente:

  - mayor investigación de colisiones;
  - múltiples mercados;
  - transliteraciones;
  - mayor revisión de handles y dominios;
  - más escenarios de campaña y expansión;
  - registros de marcas adicionales;
  - documentación de riesgos más exhaustiva.

## 31. Experiencia de usuario: ocultar complejidad interna

El usuario normal no debe necesitar comprender N00–N15.

La interfaz conversacional debe presentar normalmente cuatro momentos:

    DIRECCIÓN
       ↓
    OPCIONES
       ↓
    FINALISTAS
       ↓
    NOMBRE CANÓNICO

La factoría ejecuta internamente los controles necesarios.

### 31.1 Principio de simplicidad

> **La complejidad pertenece al sistema, no al creador.**

### 31.2 Resumen contextual

Cuando ayude a la orientación, usar el formato canónico:

    QUÉ SABEMOS
    QUÉ FALTA
    QUÉ SIGUE

Ejemplo genérico:

    QUÉ SABEMOS
    - Concepto aprobado
    - Mercado aprobado
    - Dos territorios de nombre seleccionados
    
    QUÉ FALTA
    - Reducir candidatos a finalistas
    - Completar verificaciones externas disponibles
    
    QUÉ SIGUE
    - Comparar la preselección

## 32. Comportamiento para principiantes

Si el usuario no sabe nombrar la influencer:

1.  no bloquear el proceso;
2.  explicar que no necesita tener el nombre preparado;
3.  recuperar contexto existente;
4.  construir el brief;
5.  proponer territorios;
6.  recomendar una dirección;
7.  generar opciones limitadas;
8.  hacer el trabajo comparativo internamente;
9.  mostrar finalistas con explicación simple;
10. pedir aprobación al final.

Ejemplo de experiencia:

> “No necesitas tener el nombre pensado. Ya tengo información suficiente sobre el concepto y el mercado. Primero te mostraré las mejores direcciones de nombre y después reduciré las opciones hasta llegar a finalistas.”

## 33. Comportamiento para usuarios avanzados

Si el usuario aporta una instrucción clara:

> “El nombre será [Nombre].”

la factoría debe evitar sobreayuda.

Puede ofrecer:

  - validación correspondiente a la profundidad activa;
  - uso como candidato principal;
  - revisión de riesgos;
  - bloqueo posterior cuando exista aprobación válida.

No debe obligar al usuario a recorrer visualmente todas las etapas internas.

## 34. Compatibilidad multilingüe

El sistema debe distinguir:

    IDIOMA_INTERFAZ
    IDIOMA_PUBLICO_INFLUENCER
    IDIOMAS_PUBLICOS_SECUNDARIOS
    MERCADOS_OBJETIVO

El nombre debe evaluarse en función de los mercados y audiencias, no solo del idioma en que el creador conversa con AIIF.

### 34.1 Regla de localización

La documentación se presenta en `IDIOMA_INTERFAZ`.

El análisis lingüístico del nombre puede abarcar varios idiomas y sistemas de escritura cuando sea relevante.

### 34.2 Nomenclatura documental

En documentación española usar:

  - Sistema Inteligente de Nombramiento Canónico;
  - Brief de nombramiento;
  - Territorios de nombre;
  - Puntuación de Marca;
  - preselección;
  - finalistas;
  - Pruebas de resistencia;
  - revisión preliminar de marcas;
  - Nombre canónico.

Evitar como títulos primarios en documentación española:

  - Naming System;
  - Brand Score;
  - Shortlist;
  - Stress Test;
  - Trademark Check.

Esos términos pueden aparecer únicamente como aliases técnicos o referencias de compatibilidad cuando sea necesario.

## 35. Validador del Sistema de Nombramiento

Se define el componente lógico:

    VALIDADOR_DE_NOMBRE_CANONICO

Su función es comprobar que la decisión de nombre cumple los requisitos mínimos antes de bloqueo.

### 35.1 Comprobaciones

Debe validar, según profundidad y capacidad disponible:

1.  contexto estratégico suficiente;
2.  procedencia de datos;
3.  ausencia de confusión entre nombre de trabajo y canon;
4.  coherencia con el proyecto;
5.  memorabilidad;
6.  pronunciación;
7.  compatibilidad lingüística relevante;
8.  buscabilidad;
9.  distintividad;
10. riesgo de colisión;
11. Puntuación de Marca transparente;
12. pruebas de resistencia correspondientes;
13. revisión preliminar de marcas cuando sea posible;
14. estado real de verificaciones externas;
15. aprobación explícita;
16. trazabilidad de la decisión;
17. preservación de historial.

### 35.2 Resultados

Utiliza los resultados generales de validación ya canónicos:

    VALIDA
    VALIDA_CON_OBSERVACIONES
    REQUIERE_AJUSTES
    REQUIERE_DECISION_USUARIO
    NO_APTA_PARA_BLOQUEO

### 35.3 Casos bloqueantes

Ejemplos:

  - candidato intenta pasar a canon sin aprobación válida;
  - existe una contradicción crítica no resuelta;
  - el sistema presenta una verificación inexistente como realizada;
  - se pretende sobrescribir un `NAME_CANON` bloqueado sin flujo de cambio;
  - falta el contexto mínimo para una decisión responsable.

## 36. Reglas de IA

La IA que ejecute esta especificación debe cumplir:

1.  no inventar un nombre canónico sin proceso suficiente;
2.  no confundir nombre de trabajo con nombre final;
3.  no exigir que el usuario llegue con un nombre definido;
4.  no generar listas masivas sin filtro;
5.  no descartar conflictos relevantes por preferencia estética;
6.  no basar la decisión únicamente en disponibilidad de handle;
7.  no afirmar disponibilidad de handle o dominio sin verificación real;
8.  no presentar la Puntuación de Marca como dictamen jurídico;
9.  no declarar disponibilidad legal sin validación profesional suficiente;
10. no convertir recomendación en canon automáticamente;
11. conservar candidatos e historial;
12. diferenciar cambio de handle de cambio de nombre;
13. repetir validaciones internacionales si cambian mercados objetivo;
14. mantener trazabilidad de por qué ganó el candidato final;
15. registrar qué comprobaciones externas no pudieron ejecutarse;
16. respetar el idioma documental canónico y la política de localización;
17. no crear estados globales paralelos;
18. no crear fases globales paralelas a F01–F13;
19. respetar bloqueos y versionado de Sistema 00;
20. usar Inicio Fácil y activadores naturales cuando el usuario necesite ayuda;
21. evitar sobreayuda cuando el usuario ya ha decidido;
22. conservar `NAME_CANON` como identidad nominal estable hasta un renombramiento controlado.

## 37. Algoritmo operativo resumido

    ENTRADA contexto_proyecto
    
    ruta = detectar_ruta_de_entrada()
    
    SI ruta == NOMBRE_EXISTENTE:
        registrar_como_candidato_principal()
    
    SI ruta == VARIAS_IDEAS:
        registrar_ideas_como_candidatos()
    
    SI ruta == SIN_NOMBRE:
        brief = construir_brief_desde_contexto()
        territorios = generar_territorios(brief)
        territorio_preferido = resolver_seleccion_o_recomendacion(territorios)
        nombres_trabajo = generar_semillas(brief, territorio_preferido)
    
    candidatos = generar_variantes_controladas(nombres_trabajo)
    
    PARA cada candidato:
        revisar_colisiones_si_es_posible(candidato)
        validar_linguistica_y_fonetica(candidato)
        evaluar_buscabilidad_y_memorabilidad(candidato)
    
    supervivientes = descartar_riesgo_inaceptable(candidatos)
    preseleccion = reducir(supervivientes, objetivo=3..7)
    
    PARA cada candidato EN preseleccion:
        calcular_puntuacion_marca_con_pesos_transparentes(candidato)
    
    finalistas = seleccionar_finalistas(preseleccion, objetivo_aprox=3)
    
    PARA cada finalista:
        ejecutar_pruebas_de_resistencia(finalista)
        ejecutar_revision_preliminar_marcas_si_es_posible(finalista)
        registrar_verificaciones_no_disponibles(finalista)
    
    recomendado = comparar(finalistas)
    presentar_matriz_y_recomendacion(recomendado)
    
    ESPERAR_APROBACION_EXPLICITA()
    
    SI aprobado:
        ejecutar_VALIDADOR_DE_NOMBRE_CANONICO()
        SI resultado permite bloqueo:
            NAME_CANON = candidato_aprobado
            ESTADO_DATO = BLOQUEADO
            ROL_NOMBRE = CANONICO
            preservar_historial()
            registrar_decision()
            actualizar_version_y_derivados()
        SINO:
            resolver_ajustes()
    SINO:
        continuar_investigacion_o_comparacion()

## 38. Salida portable antes de canonizar

    {
      "investigacion_nombre": {
        "ruta_entrada": "[RUTA]",
        "brief": {},
        "territorios": [],
        "nombres_trabajo": [],
        "candidatos_revisados": [],
        "candidatos_rechazados": [
          {
            "nombre": "[...]",
            "motivo": "[...]"
          }
        ],
        "preseleccion": [],
        "finalistas": [],
        "puntuaciones_marca": {},
        "pruebas_resistencia": {},
        "revision_preliminar_marcas": {},
        "verificaciones_externas": {},
        "candidato_recomendado": "[...]",
        "aprobacion_requerida": true
      }
    }

## 39. Salida portable después de aprobación

    {
      "decision_nombre": {
        "name_canon": "[NOMBRE_APROBADO]",
        "rol_nombre": "CANONICO",
        "estado_dato": "BLOQUEADO",
        "aprobado_por_usuario": true,
        "fecha_efectiva": "[FECHA]",
        "version": "[VERSION]",
        "candidatos_historicos_preservados": true,
        "verificaciones_pendientes": []
      }
    }

## 40. Portabilidad entre IAs

El Paquete Portable y el Archivo Universal de Reanudación deben conservar, cuando el nombramiento esté activo o incompleto:

  - `NAME_CANON` si existe;
  - ruta de entrada;
  - brief de nombramiento;
  - territorios seleccionados;
  - nombres de trabajo;
  - candidatos;
  - preselección;
  - finalistas;
  - puntuaciones;
  - verificaciones realizadas;
  - verificaciones pendientes;
  - recomendación actual;
  - estado de aprobación;
  - historial;
  - próxima acción.

Una nueva IA no debe reiniciar el proceso si el paquete ya contiene esta información.

## 41. Compatibilidad con la especificación fuente

La especificación fuente se conserva como antecedente metodológico, pero AIIF aplica las siguientes adaptaciones.

| **Elemento fuente**            | **Tratamiento en AIIF**                                                |
| ------------------------------ | ---------------------------------------------------------------------- |
| Fases 0–14 internas            | Sustituidas por etapas `N00–N15` para no chocar con F01–F13            |
| Inicio con nombres de trabajo  | Ampliado con una ruta explícita para usuarios sin ningún nombre        |
| Contexto previo                | Integrado con F01/F02 y clasificado en requerido/deseable/opcional     |
| Variantes                      | Conservadas como exploración controlada                                |
| Cribado de colisiones          | Conservado con estados de verificación externa                         |
| Validación lingüística         | Conservada e integrada con sistema multilingüe de AIIF                 |
| Shortlist                      | Etiqueta visible sustituida por `preselección`                         |
| Brand Score                    | Etiqueta visible sustituida por `Puntuación de Marca`                  |
| Virality Potential             | Sustituido por `Potencial de difusión social`, de peso secundario      |
| Finalists                      | Etiqueta visible `finalistas`                                          |
| Stress Test                    | Etiqueta visible `Pruebas de resistencia`                              |
| Trademark Review               | Etiqueta visible `Revisión preliminar de marcas`                       |
| Estados WORKING/CANDIDATE/etc. | Sustituidos como estados globales por `ESTADO_DATO + ROL_NOMBRE`       |
| RECOMMENDED ≠ CANONICAL        | Conservado conceptualmente                                             |
| Aprobación humana explícita    | Conservada como requisito crítico                                      |
| `NAME_CANON`                  | Conservado como identificador técnico estable                          |
| Historial de candidatos        | Conservado                                                             |
| Renaming controlado            | Integrado con checkpoint, impacto, versión y regeneración de derivados |

## 42. Criterios de aceptación para implementación

La funcionalidad se considera correctamente implementada cuando:

1.  un usuario puede comenzar sin aportar ningún nombre;
2.  un usuario con nombre propio no es obligado a generar alternativas;
3.  un usuario con varias ideas puede compararlas directamente;
4.  el sistema reutiliza datos F01/F02;
5.  no exige F04/F05 completas para continuar;
6.  genera territorios antes de candidatos cuando parte de cero;
7.  no muestra listas excesivas;
8.  mantiene fases N separadas de F01–F13;
9.  mantiene estados de datos separados de roles de nombre;
10. diferencia verificado de no verificado;
11. nunca inventa disponibilidad externa;
12. la Puntuación de Marca declara sus pesos;
13. el indicador de difusión social no se presenta como predicción de viralidad;
14. la revisión de marcas incluye advertencia legal;
15. la UX visible puede resumirse en Dirección → Opciones → Finalistas → Nombre canónico;
16. `NAME_CANON` requiere aprobación válida;
17. los candidatos históricos no se eliminan;
18. el proceso se puede reanudar desde un paquete portable;
19. un cambio de handle no modifica `NAME_CANON`;
20. un renombramiento bloqueado sigue el flujo de cambio de Sistema 00;
21. la documentación visible respeta `IDIOMA_INTERFAZ` y la nomenclatura española canónica.

## 43. Ejecución resumida para otra IA

    INICIO
    Detecta si el usuario ya tiene nombre, tiene varias ideas o no tiene ninguna.
    
    CONTEXTO
    Recupera primero F01/F02. Pregunta solo lo imprescindible.
    
    SI NO HAY NOMBRE
    Construye brief → propone territorios → genera semillas.
    
    EXPLORA
    Crea variantes controladas, no listas masivas.
    
    FILTRA
    Revisa colisiones cuando sea posible. Marca lo no verificado.
    
    IDIOMA
    Prueba pronunciación, escritura, significados y transliteración según mercados.
    
    PRESELECCIONA
    Conserva solo candidatos viables.
    
    PUNTÚA
    Aplica Puntuación de Marca transparente. No uses pesos ocultos.
    
    FINALISTAS
    Reduce aproximadamente a tres.
    
    PRUEBA
    Ejecuta pruebas de resistencia: handle, búsqueda, pronunciación, transliteración, logo/marca de agua, hashtag, colaboración, campaña, comunidad y expansión.
    
    MARCAS
    Realiza únicamente revisión preliminar cuando exista capacidad. No declares disponibilidad legal.
    
    RECOMIENDA
    Selecciona candidato preferido, pero no lo canonices.
    
    APRUEBA
    Requiere aprobación explícita.
    
    VALIDA
    Ejecuta VALIDADOR_DE_NOMBRE_CANONICO.
    
    BLOQUEA
    Solo entonces establece NAME_CANON y ESTADO_DATO = BLOQUEADO.
    
    ARCHIVA
    Conserva alternativas e historial.
    
    CONTINÚA
    Propaga el nombre aprobado a los entregables y paquetes correspondientes.

## 44. Principio final

> **AI Influencer Factory no pregunta simplemente “¿Cuál será el nombre?” como si el creador tuviera obligación de saberlo. Detecta cuánto sabe, reutiliza el contexto disponible y, cuando haga falta, convierte una decisión compleja de marca en un proceso guiado, investigable, verificable, explicable y reversible hasta el momento de aprobación.**
> 
> **La IA puede generar, investigar y recomendar. Solo una aprobación válida y el paso de validación correspondiente convierten un candidato en** `NAME_CANON`**.**

## 45. Historial de versión

### v1.0.0 — Integración final

  - adaptación de la especificación universal al canon de AI Influencer Factory;
  - incorporación de ruta para usuarios sin nombre;
  - incorporación de territorios de nombre;
  - sustitución de fases internas por `N00–N15`;
  - integración con F01–F13;
  - integración con Matriz Maestra de Datos y Sistema 00;
  - eliminación de estados globales duplicados;
  - clasificación de inputs en requeridos, deseables y opcionales;
  - integración de compatibilidad de plataforma y estados de verificación;
  - conservación de revisión jurídica como preliminar;
  - separación entre `NAME_CANON`, ID técnico, nombre visible y handle;
  - reutilización de niveles `NÚCLEO`, `AMPLIADO`, `PROFUNDO`;
  - sustitución de “potencial de viralidad” por “Potencial de difusión social”;
  - simplificación de UX visible;
  - incorporación de `VALIDADOR_DE_NOMBRE_CANONICO`;
  - conservación de trazabilidad, aprobación explícita, historial y renombramiento controlado.

