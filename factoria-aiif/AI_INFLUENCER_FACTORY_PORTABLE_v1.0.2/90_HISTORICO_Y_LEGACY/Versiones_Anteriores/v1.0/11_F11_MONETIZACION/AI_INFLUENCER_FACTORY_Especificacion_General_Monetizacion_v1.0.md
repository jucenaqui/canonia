---
spec_id: AIIF_GENERAL_MONETIZATION_SYSTEM_SPEC
spec_version: "1.0.0"
spec_type: AIIF_MONETIZATION_DEFINITION_PLANNING_SPEC
status: PROPUESTA_LISTA_PARA_APROBACION
phase: "F11 - Monetización"
canonical_document_language: ES
source_methodology:
  - "Prompt_Maestro_AI_Influencer_Factory(1).md"
  - "Biografía Influencer Digital con IA.docx"
source_of_truth: "Sistema 00 / Matriz Maestra de Datos"
project_specific_examples: false
---

# AI INFLUENCER FACTORY
## Especificación General del Sistema Inteligente de Definición y Planificación de Monetización
### Versión 1.0.0 - Propuesta lista para aprobación

## 1. Propósito

Esta especificación define el sistema general y reutilizable mediante el cual AI Influencer Factory (AIIF) transforma la estrategia, identidad, marca, contenido, audiencia y capacidad operativa ya aprobadas en una **estrategia de monetización priorizada, coherente, viable y gobernable**.

F11 no existe para enumerar todas las formas posibles de ganar dinero. Su función es ayudar a decidir:

- qué rutas de ingreso encajan realmente con el proyecto;
- cuál debe activarse primero;
- cuáles deben esperar;
- qué condiciones deben cumplirse antes de activar cada ruta;
- qué ofertas y activos comerciales se necesitan;
- cómo probar la viabilidad sin deformar la identidad;
- cuándo mantener, escalar, pausar o retirar una ruta.

Flujo visible recomendado:

```text
CONTEXTO COMERCIAL
      ->
RUTAS DE MONETIZACION
      ->
COMPARACION
      ->
VIABILIDAD
      ->
SECUENCIA RECOMENDADA
      ->
APROBACION
      ->
ESTRATEGIA DE MONETIZACION CANONICA
```

La complejidad operativa permanece interna.

## 2. Fundamento experto de origen

La especificación original de expertos establece como información de entrada un **objetivo del negocio** que puede incluir UGC, cursos, afiliados, marca personal, YouTube, TikTok, Instagram, productos digitales, consultoría o comunidad.

Además exige como salida obligatoria un **Plan de Monetización** y define el resultado final como una marca personal viva, coherente, escalable y preparada para monetizar mediante contenido, colaboraciones, productos digitales y comunidad.

F11 conserva esa intención.

La fuente experta original no formaliza:

- una taxonomía cerrada de rutas;
- un algoritmo de priorización;
- una matriz de viabilidad;
- estados de activación de cada ruta;
- un catálogo operativo de ofertas;
- pricing versionado;
- pipeline comercial;
- media kit versionado;
- experimentos de monetización;
- gobernanza de cambios.

Estos elementos son **extensiones arquitectónicas de AIIF** necesarias para convertir el plan de monetización en un sistema operativo y portable.

## 3. Regla de procedencia

> **AIIF debe preservar la intención experta de construir un activo digital monetizable. Las estructuras de descubrimiento, comparación, secuenciación, viabilidad, ofertas, pricing, pipeline, experimentación, estados y portabilidad son adaptaciones de AIIF y no deben atribuirse retroactivamente a la fuente original.**

## 4. Ubicación en la arquitectura

```text
F01 - Fundamentos Estrategicos
      ↓
F02 - Concepto
      ↓
F03 - Biografia e Identidad
      ↓
F04 - Personaje y Psicologia
      ↓
F05 - Identidad de Marca
      ↓
F06 - Identidad Visual
      ↓
F07 - Identidad Verbal y Voz
      ↓
F08 - Universo Narrativo
      ↓
F09 - Sistema de Contenido
      ↓
F10 - Produccion IA
      ↓
F11 - Monetizacion
      ↓
F12 - Crecimiento
      ↓
F13 - Consolidacion
```

F11 no crea una fase global adicional.

## 5. Principio central

> **Monetizar no significa añadir ventas a una identidad existente. F11 debe seleccionar mecanismos de ingreso que la identidad, la audiencia, el contenido y la capacidad operativa puedan sostener sin destruir confianza, coherencia o viabilidad.**

Una ruta de monetización puede ser económicamente atractiva en abstracto y aun así ser inadecuada para un proyecto concreto.

## 6. Qué sí define F11

F11 puede definir:

- estrategia general de monetización;
- rutas de ingreso compatibles;
- ruta primaria;
- rutas secundarias;
- rutas posteriores;
- rutas experimentales;
- rutas incompatibles o descartadas;
- secuencia de activación;
- criterios de activación;
- guardrails comerciales;
- tipos de oferta compatibles;
- perfil de socios/marcas objetivo;
- arquitectura comercial de UGC cuando corresponda;
- estructura de portfolio y media kit;
- principios de paquetes comerciales;
- principios de pricing;
- funnel comercial;
- outreach comercial;
- pipeline de oportunidades;
- pruebas de viabilidad;
- experimentos de monetización;
- criterios de escalado, pausa o retiro;
- métricas comerciales necesarias para F12/F13.

## 7. Qué no debe cerrar prematuramente F11

F11 no debe convertir en canon permanente:

- cada precio concreto;
- cada marca objetivo;
- cada prospecto;
- cada email de outreach;
- cada propuesta comercial;
- cada paquete temporal;
- cada promoción;
- cada comisión de afiliado;
- cada condición contractual;
- cada previsión de ingresos;
- cada plataforma de pago;
- cada herramienta de CRM;
- cada táctica de adquisición;
- cada KPI de growth.

Estos elementos pueden cambiar con mercado, aprendizaje, negociación, plataforma o etapa del proyecto.

## 8. Dependencias principales de entrada

F11 debe recuperar automáticamente, cuando existan:

- `NICHE_CANON`;
- `CONCEPT_CANON`;
- `IDENTITY_CORE_CANON`;
- `BIOGRAPHY_CANON`;
- `CHARACTER_CANON`;
- `BRAND_IDENTITY_CANON`;
- `BRAND_POSITIONING_CANON`;
- `VALUE_PROPOSITION_CANON`;
- `VISUAL_IDENTITY_CANON`;
- `VERBAL_IDENTITY_CANON`;
- `NARRATIVE_UNIVERSE_CANON`;
- `CONTENT_SYSTEM_CANON`;
- `CONTENT_PILLAR_SET_CANON`;
- `CONTENT_EDITORIAL_RULES_CANON`;
- `AI_PRODUCTION_SYSTEM_CANON`;
- audiencia y mercados;
- objetivo de negocio inicial;
- objetivo a 90 días;
- tiempo disponible;
- recursos disponibles;
- restricciones del proyecto;
- datos comerciales reales que el usuario haya aportado.

F11 no debe volver a preguntar datos ya válidos.

## 9. Tres rutas de entrada

### Ruta A - El usuario ya tiene estrategia de monetización

Ejemplos abstractos:

```text
"Quiero monetizar primero con UGC."
"Ya vendo un producto digital."
"Mi prioridad son afiliados y luego colaboraciones."
```

AIIF debe:

1. registrar la estrategia existente;
2. separar ruta, oferta, precio y táctica;
3. validar coherencia con F01-F10;
4. detectar dependencias y riesgos;
5. completar solo faltantes críticos;
6. proponer aprobación o ajustes.

### Ruta B - El usuario tiene ideas parciales

Ejemplos:

```text
"Estoy entre UGC y afiliados."
"Quiero trabajar con marcas pero también vender algo mío."
```

AIIF debe comparar alternativas sin obligar al usuario a elegir a ciegas.

### Ruta C - El usuario no sabe cómo monetizar

Ejemplos:

```text
"No se."
"Recomiendame."
"Decide tu."
"Haz lo mejor."
```

AIIF activa Inicio Fácil y construye primero **Territorios de Monetización**.

## 10. Inicio Fácil aplicado a F11

Mensaje conceptual recomendado:

> **No necesitas conocer modelos de negocio ni saber cuánto cobrar. Usaré el nicho, la audiencia, la marca, el sistema de contenido y tu capacidad real para comparar rutas de ingreso, explicarte los tradeoffs y recomendar qué activar primero.**

No pedir al usuario definiciones financieras o comerciales académicas cuando AIIF pueda inferir opciones de forma segura.

## 11. Territorios de Monetización

Cuando el usuario parte desde cero o existen muchas opciones, AIIF puede generar entre 2 y 5 territorios suficientemente distintos.

Ejemplos abstractos de familias, no catálogo obligatorio:

```text
SERVICIOS / UGC
COLABORACIONES / PATROCINIOS
AFILIACION
PRODUCTOS DIGITALES
MEMBRESIA / COMUNIDAD
INGRESO DE PLATAFORMA
LICENCIAS / IP
MARCA PROPIA
```

Cada territorio debe explicar:

- mecanismo de ingreso;
- comprador o pagador;
- propuesta de valor;
- dependencia de audiencia;
- dependencia de portfolio/prueba social;
- complejidad operativa;
- velocidad relativa de activación;
- escalabilidad;
- riesgos principales;
- compatibilidad con identidad y contenido.

## 12. Ruta de monetización vs oferta

F11 debe distinguir:

```text
RUTA_DE_MONETIZACION
= mecanismo estructural por el cual entra dinero

OFERTA
= producto, servicio, colaboracion o paquete concreto que se vende
```

Ejemplo abstracto:

```text
RUTA = UGC PARA MARCAS
OFERTA = paquete de 3 videos UGC
```

La ruta puede permanecer estable mientras las ofertas cambian.

## 13. Ruta vs canal de adquisición

No confundir:

```text
RUTA_DE_INGRESO
!=
CANAL_DE_ADQUISICION
```

Una colaboración UGC puede conseguirse por:

- outreach directo;
- inbound;
- marketplace;
- agencia;
- referral;
- networking;
- otras vías.

El canal puede cambiar sin cambiar la ruta de monetización.

## 14. Ruta vs plataforma de distribución

No confundir:

```text
MONETIZAR_CON_AFILIADOS
!=
MONETIZAR_INSTAGRAM
```

Instagram, TikTok, YouTube u otras plataformas pueden ser canales de distribución, adquisición o monetización específica según el caso, pero la arquitectura debe registrar el mecanismo económico real.

## 15. Taxonomía flexible de rutas

AIIF puede utilizar, cuando sean relevantes:

```text
BRAND_UGC
BRAND_SPONSORSHIP
AFFILIATE
DIGITAL_PRODUCT
MEMBERSHIP_COMMUNITY
PLATFORM_REVENUE
SERVICE_CONSULTING
LICENSING_IP
OWN_BRAND_COMMERCE
OTHER
```

La taxonomía es extensible. No se deben forzar rutas irrelevantes.

## 16. Roles de las rutas

Cada ruta evaluada puede recibir un rol:

```text
PRIMARY
SECONDARY
LATER
EXPERIMENTAL
PAUSED
REJECTED
```

### PRIMARY
Ruta que debe recibir prioridad operativa.

### SECONDARY
Ruta compatible que puede desarrollarse sin distraer de la principal.

### LATER
Ruta potencialmente valiosa, pero prematura.

### EXPERIMENTAL
Ruta que merece prueba limitada antes de compromiso.

### PAUSED
Ruta previamente válida, temporalmente detenida.

### REJECTED
Ruta descartada por incoherencia, inviabilidad o decisión del usuario.

## 17. Arquitectura canónica propuesta

Se proponen como objetos canónicos de F11:

```text
MONETIZATION_STRATEGY_CANON
MONETIZATION_ROUTE_SET_CANON
MONETIZATION_SEQUENCE_CANON
COMMERCIAL_ALIGNMENT_RULES_CANON
```

### 17.1 `MONETIZATION_STRATEGY_CANON`

Define la lógica general de monetización aprobada.

### 17.2 `MONETIZATION_ROUTE_SET_CANON`

Registra las rutas aprobadas y su rol estratégico.

### 17.3 `MONETIZATION_SEQUENCE_CANON`

Define el orden estratégico de activación y las dependencias principales.

### 17.4 `COMMERCIAL_ALIGNMENT_RULES_CANON`

Define límites y criterios para proteger identidad, marca, audiencia y reputación durante monetización.

## 18. Nombres visibles documentales

| ID técnico | Nombre visible en español |
|---|---|
| `MONETIZATION_STRATEGY_CANON` | Estrategia de Monetización Canónica |
| `MONETIZATION_ROUTE_SET_CANON` | Conjunto Canónico de Rutas de Monetización |
| `MONETIZATION_SEQUENCE_CANON` | Secuencia Canónica de Monetización |
| `COMMERCIAL_ALIGNMENT_RULES_CANON` | Reglas Canónicas de Alineación Comercial |

Se mantiene `IDIOMA_CANONICO_DOCUMENTAL = ES`.

## 19. Objetos operativos dinámicos

Se proponen como objetos dinámicos:

```text
MONETIZATION_ROADMAP_CURRENT
OFFER_CATALOG_CURRENT
PRICING_CURRENT
PARTNER_TARGET_PROFILE_CURRENT
PORTFOLIO_CURRENT
MEDIA_KIT_CURRENT
COMMERCIAL_FUNNEL_CURRENT
OUTREACH_PLAYBOOK_CURRENT
COMMERCIAL_PIPELINE
MONETIZATION_EXPERIMENT_LOG
MONETIZATION_ASSUMPTIONS_CURRENT
REVENUE_TRACKER_CURRENT
```

Estos objetos pueden evolucionar sin recanonizar toda F11.

## 20. Matriz de Evaluación de Rutas

Cuando existan alternativas, AIIF debe compararlas cualitativamente.

| Criterio | Ruta A | Ruta B | Ruta C |
|---|---|---|---|
| Coherencia con nicho/concepto | [ ] | [ ] | [ ] |
| Coherencia con marca | [ ] | [ ] | [ ] |
| Valor para audiencia | [ ] | [ ] | [ ] |
| Ajuste al contenido | [ ] | [ ] | [ ] |
| Ajuste a capacidad de producción | [ ] | [ ] | [ ] |
| Dependencia de tamaño de audiencia | [ ] | [ ] | [ ] |
| Necesidad de portfolio/autoridad | [ ] | [ ] | [ ] |
| Tiempo relativo hasta validación | [ ] | [ ] | [ ] |
| Complejidad operativa | [ ] | [ ] | [ ] |
| Escalabilidad | [ ] | [ ] | [ ] |
| Repetibilidad | [ ] | [ ] | [ ] |
| Riesgo reputacional | [ ] | [ ] | [ ] |
| Dependencia de terceros | [ ] | [ ] | [ ] |
| Riesgos principales | [ ] | [ ] | [ ] |

No se requiere un `MONETIZATION_SCORE` numérico obligatorio.

## 21. No usar pesos ocultos

Si AIIF utiliza puntuaciones, pesos o fórmulas en un proyecto específico:

- deben declararse;
- deben explicarse;
- deben poder ser revisados;
- no deben presentarse como ciencia exacta;
- nunca deben sustituir la aprobación del usuario.

## 22. Viabilidad estratégica

Una ruta es estratégicamente viable cuando existe coherencia suficiente entre:

```text
RUTA
<-> AUDIENCIA
<-> PROPUESTA DE VALOR
<-> MARCA
<-> CONTENIDO
<-> PRODUCCION
<-> RECURSOS
```

No basta con que una ruta “pueda generar dinero” en abstracto.

## 23. Viabilidad operativa

F11 debe revisar:

- tiempo requerido;
- frecuencia comercial;
- volumen de producción;
- necesidad de portfolio;
- capacidad de contactar prospectos;
- seguimiento;
- entrega;
- soporte al cliente cuando aplique;
- herramientas;
- conocimientos;
- costos conocidos;
- dependencia de terceros.

Si una ruta supera claramente la capacidad actual, puede quedar `LATER` en vez de descartarse.

## 24. Viabilidad reputacional

Antes de recomendar una ruta o socio, validar:

- coherencia con posicionamiento;
- coherencia con valores/principios de marca;
- riesgo de perder confianza;
- exceso de comercialización;
- contradicción con audiencia;
- incompatibilidad con universo narrativo;
- categorías o claims restringidos;
- conflictos de exclusividad aportados por el usuario.

## 25. Guardrails comerciales

`COMMERCIAL_ALIGNMENT_RULES_CANON` puede incluir:

```text
CATEGORIAS_COMPATIBLES
CATEGORIAS_RESTRINGIDAS
CATEGORIAS_PROHIBIDAS
TIPOS_DE_CLAIM_PERMITIDOS
TIPOS_DE_CLAIM_RESTRINGIDOS
NIVEL_DE_INTEGRACION_COMERCIAL
FRECUENCIA_COMERCIAL_MAXIMA_ORIENTATIVA
REGLAS_DE_TRANSPARENCIA
LIMITES_NARRATIVOS
LIMITES_VISUALES
LIMITES_VERBALES
```

No todos los campos son obligatorios.

## 26. Transparencia comercial

F11 debe poder registrar reglas para distinguir contenido orgánico, afiliado, patrocinado o comercial cuando corresponda.

Las obligaciones concretas dependen de jurisdicción, plataforma y contrato. AIIF no debe inventar cumplimiento legal específico sin verificación adecuada.

## 27. Secuencia de monetización

La monetización debe poder expresarse como una secuencia, no solo como lista.

Ejemplo abstracto:

```text
FASE A
validar propuesta / portfolio
      ↓
FASE B
activar ruta primaria
      ↓
FASE C
estabilizar entrega y prueba social
      ↓
FASE D
activar ruta secundaria
      ↓
FASE E
experimentar con ruta escalable propia
```

La secuencia depende del proyecto.

## 28. Condiciones de activación

Cada ruta puede tener condiciones como:

```text
REQUIERE_PORTFOLIO
REQUIERE_AUDIENCIA_MINIMA_ESTRATEGICA
REQUIERE_PRUEBA_SOCIAL
REQUIERE_OFERTA
REQUIERE_MEDIA_KIT
REQUIERE_PAGINA_DE_VENTA
REQUIERE_SISTEMA_DE_ENTREGA
REQUIERE_VOZ
REQUIERE_CAPACIDAD_DE_PRODUCCION
REQUIERE_VALIDACION_LEGAL_O_CONTRACTUAL
```

No inventar umbrales universales. Los criterios numéricos deben venir del caso o de investigación específica.

## 29. `MONETIZATION_ROADMAP_CURRENT`

Es el plan operativo vigente para ejecutar `MONETIZATION_SEQUENCE_CANON`.

Puede contener:

- horizonte;
- acciones;
- entregables;
- responsables;
- dependencias;
- hitos;
- experimentos;
- métricas;
- estado.

Puede cambiar sin reescribir la lógica estratégica, siempre que respete el canon.

## 30. Oferta comercial

F11 debe poder transformar una ruta en ofertas concretas.

Una oferta puede especificar:

```text
BUYER
PROBLEM_OR_DESIRE
DELIVERABLE
FORMAT
SCOPE
TURNAROUND
REVISION_POLICY
USAGE_SCOPE
PRICE_REF
PROOF_REQUIRED
DELIVERY_METHOD
```

Los campos exactos dependen del tipo de negocio.

## 31. `OFFER_CATALOG_CURRENT`

Se adopta como catálogo dinámico de ofertas activas, candidatas, pausadas o retiradas.

Estados locales posibles:

```text
IDEA
DRAFT
VALIDATED
ACTIVE
PAUSED
RETIRED
REJECTED
```

Estos no son nuevos estados globales del proyecto.

## 32. Pricing

Se adopta:

```text
PRICING_CURRENT
```

El pricing es operativo y versionable.

Debe poder registrar, según caso:

- moneda;
- precio base;
- rango;
- paquetes;
- add-ons;
- descuentos autorizados;
- términos de pago;
- supuestos;
- fecha/versión.

F11 no debe tratar un precio inicial como canon permanente.

## 33. Regla anti-garantías

AIIF no debe presentar:

- ingresos futuros;
- número de clientes;
- tasa de conversión;
- retorno de inversión;
- tiempo hasta monetización;

como resultados garantizados.

Las proyecciones, cuando se utilicen, deben declararse como **escenarios condicionados a supuestos**.

## 34. Escenarios financieros simples

F11 puede construir escenarios de planificación cuando el usuario los solicite o cuando ayuden a comparar rutas.

Estructura conceptual:

```text
SUPUESTOS
x
VOLUMEN
x
PRECIO / COMISION
-
COSTOS CONOCIDOS
=
ESCENARIO ESTIMADO
```

Estos escenarios no son predicciones ni garantía.

## 35. Perfil de socio o marca objetivo

Se adopta:

```text
PARTNER_TARGET_PROFILE_CURRENT
```

Puede describir:

- categorías compatibles;
- tamaño/tipo de empresa;
- mercados;
- valores;
- estética;
- necesidad de UGC/contenido;
- buyer role;
- incompatibilidades;
- señales de prioridad.

No debe convertirse en una lista rígida de marcas específicas.

## 36. Portfolio comercial

Se adopta:

```text
PORTFOLIO_CURRENT
```

F11 define qué debe demostrar comercialmente el portfolio.

F10 puede producir los activos concretos.

El portfolio puede probar:

- categorías;
- formatos;
- hooks;
- demostración de producto;
- testimonial ficticio solo cuando esté claramente planteado como demo y no como experiencia falsa;
- estética;
- voz;
- adaptación por plataforma;
- consistencia.

No inventar clientes reales, resultados reales o testimonios reales que no existan.

## 37. Media kit

Se adopta:

```text
MEDIA_KIT_CURRENT
```

Puede incluir:

- posicionamiento;
- audiencia;
- mercados;
- formatos;
- portfolio;
- capacidades;
- métricas reales cuando existan;
- opciones de colaboración;
- contacto;
- disclaimers o notas relevantes.

Las métricas deben distinguir datos reales de objetivos o simulaciones.

## 38. Propuesta comercial

F11 puede generar plantillas y propuestas derivadas de la estrategia.

Cada propuesta concreta debe adaptarse a:

- prospecto;
- necesidad;
- categoría;
- deliverables;
- uso;
- plazo;
- precio actual;
- restricciones;
- personalidad y voz de marca.

Una plantilla no debe presentarse como contrato legal.

## 39. Outreach

Se adopta:

```text
OUTREACH_PLAYBOOK_CURRENT
```

Puede incluir:

- segmentos de prospectos;
- canales de contacto;
- estructura de mensaje;
- follow-up;
- frecuencia orientativa;
- criterios para abandonar un lead;
- variantes de tono;
- información que debe personalizarse.

F07 gobierna la identidad verbal; F11 gobierna el objetivo comercial.

## 40. Funnel comercial

Se adopta:

```text
COMMERCIAL_FUNNEL_CURRENT
```

Ejemplo abstracto:

```text
PROSPECTO
-> CONTACTADO
-> RESPONDE
-> CALIFICADO
-> PROPUESTA
-> NEGOCIACION
-> GANADO / PERDIDO
-> ENTREGA
-> RECOMPRA / REFERIDO
```

La estructura puede variar según la ruta.

## 41. Pipeline comercial

Se adopta:

```text
COMMERCIAL_PIPELINE
```

Cada oportunidad puede registrar:

- oportunidad;
- empresa/persona;
- ruta;
- etapa;
- valor potencial si se conoce;
- próxima acción;
- fecha;
- responsable;
- notas;
- resultado.

El pipeline es operacional, no canon.

## 42. Monetización UGC

Cuando `BRAND_UGC` sea relevante, F11 puede estructurar:

- portfolio;
- categorías de muestra;
- paquetes;
- derechos/uso como campo de negociación;
- número de conceptos o entregables;
- revisiones;
- extras;
- propuesta;
- outreach;
- pipeline;
- proceso de entrega;
- recompra.

No existe un precio universal ni un número universal de piezas.

## 43. Afiliación

Cuando `AFFILIATE` sea relevante, validar:

- ajuste del producto con audiencia;
- credibilidad;
- frecuencia de promoción;
- dependencia de plataforma;
- condiciones del programa;
- trazabilidad de links/códigos cuando exista;
- experiencia de usuario;
- riesgo reputacional.

No promover productos incompatibles solo por comisión.

## 44. Productos digitales

Cuando `DIGITAL_PRODUCT` sea relevante, F11 puede evaluar:

- problema que resuelve;
- formato;
- profundidad;
- prueba de demanda;
- capacidad de entrega;
- soporte;
- actualización;
- compatibilidad con autoridad real/narrativa;
- funnel;
- relación con contenido.

Una identidad virtual no debe inventar credenciales para vender productos que requieran autoridad profesional verificable.

## 45. Membresía y comunidad

Cuando `MEMBERSHIP_COMMUNITY` sea relevante, validar:

- razón de recurrencia;
- valor continuo;
- capacidad de moderación;
- frecuencia de entrega;
- expectativa de comunidad;
- límites de privacidad;
- compatibilidad narrativa;
- riesgo de carga operativa.

## 46. Servicios y consultoría

Cuando `SERVICE_CONSULTING` sea relevante:

- distinguir servicio creativo de asesoría profesional regulada;
- no inventar experiencia o credenciales;
- definir alcance;
- definir entregables;
- definir límites;
- definir proceso de onboarding;
- validar capacidad real de entrega del creador/equipo.

## 47. Licencias e IP

Cuando `LICENSING_IP` sea relevante, F11 puede modelar:

- tipo de activo;
- alcance de licencia;
- territorio;
- duración;
- exclusividad;
- uso permitido;
- restricciones;
- metadata de derechos.

Las condiciones jurídicas concretas requieren revisión apropiada cuando sean relevantes.

## 48. Colaboraciones y patrocinios

Cuando `BRAND_SPONSORSHIP` sea relevante, validar:

- encaje de categoría;
- nivel de integración;
- frecuencia;
- claridad de disclosure cuando aplique;
- exclusividad;
- coherencia con narrativa;
- impacto reputacional;
- reutilización del activo;
- relación con F09/F10.

## 49. Monetización de plataforma

Cuando `PLATFORM_REVENUE` sea relevante, F11 debe tratar requisitos, disponibilidad y condiciones como datos externos potencialmente cambiantes.

No asumir elegibilidad ni reglas actuales sin verificación cuando la decisión dependa de ellas.

## 50. Prueba de coherencia comercial

Antes de recomendar una ruta, preguntar:

```text
¿La audiencia entiende por que esta oferta existe?
¿La marca puede venderla sin parecer otra marca distinta?
¿El personaje puede presentarla sin romper su comportamiento?
¿El contenido puede integrarla sin volverse publicidad constante?
¿La produccion puede entregarla con calidad?
```

## 51. Prueba de confianza

F11 debe evaluar:

- saturación comercial;
- autenticidad percibida;
- consistencia de recomendación;
- credibilidad;
- disclosure;
- promesas excesivas;
- claims no verificables;
- contradicción entre mensaje orgánico y comercial.

## 52. Prueba de capacidad de oferta

Antes de activar una oferta:

- ¿se puede entregar?;
- ¿existe proceso?;
- ¿existen activos necesarios?;
- ¿el turnaround es viable?;
- ¿el pricing cubre la complejidad?;
- ¿hay límites claros?;
- ¿la experiencia posventa es sostenible?;
- ¿el creador/equipo tiene capacidad real?

## 53. Prueba de escalabilidad

Una ruta puede ser válida aunque no escale inmediatamente.

AIIF debe distinguir:

```text
INGRESO DE SERVICIO
INGRESO REPETIBLE
INGRESO ESCALABLE
INGRESO RECURRENTE
```

No todas las rutas necesitan cumplir las cuatro categorías.

## 54. Prueba de concentración de riesgo

F11 debe detectar dependencia excesiva de:

- una sola marca;
- una sola plataforma;
- un solo programa de afiliados;
- una sola oferta;
- una sola categoría;
- una sola fuente de tráfico.

La diversificación debe ser proporcional; no activar cinco rutas a la vez solo para “diversificar”.

## 55. Secuencia antes que simultaneidad

Regla recomendada:

> **Primero validar una ruta principal; después añadir complejidad cuando exista capacidad o evidencia suficiente.**

Esto no prohíbe rutas secundarias, pero evita dilución operativa temprana.

## 56. Simulaciones de monetización

AIIF puede simular estrategias como:

```text
MAS RAPIDA A PRIMER INGRESO
MAS ESCALABLE
MAS SIMPLE OPERATIVAMENTE
MAS COMPATIBLE CON MARCAS
MAS CENTRADA EN AUDIENCIA PROPIA
MAS DIVERSIFICADA
MAS PREMIUM
MAS DE BAJO RIESGO REPUTACIONAL
```

Cada simulación debe explicar:

- qué cambia;
- qué permanece;
- fortalezas;
- limitaciones;
- dependencias;
- impacto en F09;
- impacto en F10;
- impacto esperado en F12.

Una simulación nunca modifica automáticamente el canon.

## 57. Recomendación experta

Antes de aprobación, F11 debe poder producir una recomendación como:

```json
{
  "primary_route": "[RUTA]",
  "secondary_routes": ["[RUTA]"],
  "later_routes": ["[RUTA]"],
  "experimental_routes": [],
  "rejected_routes": [],
  "why": ["[RAZON_01]", "[RAZON_02]"],
  "activation_conditions": [],
  "main_risks": [],
  "next_commercial_asset": "[ACCION]",
  "approval_required": true
}
```

Regla:

```text
RECOMENDACION != CANON
```

## 58. Aprobación granular

F11 puede permitir aprobación por:

- ruta primaria;
- ruta secundaria;
- ruta posterior;
- secuencia;
- guardrail comercial;
- perfil de partner;
- arquitectura de oferta;
- política de pricing;
- estrategia completa.

Una frase como “me gusta UGC” no debe canonizar automáticamente una estrategia completa.

## 59. Bloqueo propuesto

Después de validación y aprobación suficiente:

```text
MONETIZATION_STRATEGY_CANON = [ESTRATEGIA_APROBADA]
MONETIZATION_ROUTE_SET_CANON = [RUTAS_APROBADAS]
MONETIZATION_SEQUENCE_CANON = [SECUENCIA_APROBADA]
COMMERCIAL_ALIGNMENT_RULES_CANON = [GUARDRAILS_APROBADOS]
ESTADO_DATO = BLOQUEADO
```

Los objetos dinámicos permanecen versionables.

## 60. `VALIDADOR_DE_ESTRATEGIA_DE_MONETIZACION`

Se propone incorporar:

```text
VALIDADOR_DE_ESTRATEGIA_DE_MONETIZACION
```

Debe comprobar al menos:

- coherencia con F01;
- coherencia con F05;
- ajuste a audiencia;
- ajuste a contenido;
- ajuste a producción;
- secuencia lógica;
- guardrails;
- factibilidad operativa;
- dependencia/riesgo;
- ausencia de contradicciones críticas.

## 61. `VALIDADOR_DE_AJUSTE_COMERCIAL_CON_CANON`

Se propone:

```text
VALIDADOR_DE_AJUSTE_COMERCIAL_CON_CANON
```

Evalúa una oferta, colaboración, partner o campaña concreta contra:

- `BRAND_IDENTITY_CANON`;
- `BRAND_POSITIONING_CANON`;
- `VALUE_PROPOSITION_CANON`;
- `CHARACTER_CANON`;
- `VISUAL_IDENTITY_CANON`;
- `VERBAL_IDENTITY_CANON`;
- `NARRATIVE_UNIVERSE_CANON`;
- `CONTENT_SYSTEM_CANON`;
- guardrails F11.

## 62. `VALIDADOR_DE_VIABILIDAD_DE_RUTA_DE_INGRESO`

Se propone:

```text
VALIDADOR_DE_VIABILIDAD_DE_RUTA_DE_INGRESO
```

Puede devolver:

```text
VIABLE_AHORA
VIABLE_CON_PRECONDICIONES
VIABLE_MAS_ADELANTE
REQUIERE_EXPERIMENTO
REQUIERE_DATOS
NO_RECOMENDADA
INCOMPATIBLE
```

Estos resultados específicos deben mapearse al sistema general cuando actualicen estados.

## 63. Relación F05 / F11

Regla:

> **F05 define qué representa la marca y qué valor promete; F11 define cómo convertir ese valor en mecanismos de ingreso compatibles.**

F11 no puede reescribir `BRAND_POSITIONING_CANON` para justificar una oportunidad comercial.

## 64. Relación F09 / F11

F09 puede reservar formatos y espacios comerciales.

F11 define:

- qué ruta se activa;
- qué oferta existe;
- qué objetivo comercial tiene;
- qué partner es compatible;
- qué guardrails aplican.

Si F11 introduce una oferta nueva, F09 puede requerir nuevos briefs o revalidación parcial.

## 65. Relación F10 / F11

Regla:

> **F11 define el objetivo y la estructura comercial; F10 produce los activos de venta, portfolio, demos, UGC o campañas.**

F10 no define pricing ni estrategia comercial por sí solo.

## 66. Relación F11 / F12

Esta frontera es crítica.

### F11 define

```text
que monetizar
como monetizar
que ruta priorizar
que oferta activar
que conversion comercial se busca
```

### F12 define

```text
como crecer distribucion y audiencia
que experimentos de alcance/engagement ejecutar
como optimizar adquisicion y conversion con datos
```

F12 puede generar aprendizajes que propongan revisar F11, pero no modifica el canon automáticamente.

## 67. Revalidación progresiva

F11 debe revalidarse cuando:

- F12 revele datos que cambien viabilidad;
- una ruta falle repetidamente;
- aparezca una nueva oferta importante;
- cambie la capacidad de producción;
- cambie el posicionamiento mediante revisión formal;
- F13 consolide el modelo final.

## 68. Experimentos de monetización

Se adopta:

```text
MONETIZATION_EXPERIMENT_LOG
```

Un experimento puede probar:

- paquete;
- pricing;
- tipo de prospecto;
- CTA comercial;
- oferta;
- canal de adquisición;
- formato de portfolio;
- secuencia de follow-up;
- otra variable controlada.

Los experimentos deben intentar cambiar pocas variables para producir aprendizaje interpretable.

## 69. Resultado de experimento

Cada experimento puede registrar:

```text
HYPOTHESIS
VARIABLE_CHANGED
BASELINE
OBSERVATION
RESULT
CONFIDENCE
NEXT_ACTION
IMPACT_ON_CANON
```

Un resultado aislado no debe cambiar canon automáticamente.

## 70. Métricas comerciales

F11 puede registrar métricas como:

- leads;
- respuestas;
- oportunidades calificadas;
- propuestas;
- cierres;
- valor medio;
- recompra;
- ingresos por ruta;
- margen cuando el usuario dispone de costos;
- tiempo de entrega;
- tasa de conversión;
- otras relevantes.

F12 puede utilizar estas métricas para experimentos de crecimiento/adquisición.

## 71. `REVENUE_TRACKER_CURRENT`

Puede existir como objeto opcional para registrar desempeño comercial real.

Debe separar claramente:

```text
REAL
ESTIMADO
OBJETIVO
SIMULADO
```

Nunca mezclar objetivos o proyecciones con ingresos efectivamente obtenidos.

## 72. `MONETIZATION_ASSUMPTIONS_CURRENT`

Se adopta para registrar supuestos vigentes usados en:

- pricing;
- escenarios;
- forecasting;
- capacidad;
- volumen;
- tasas estimadas;
- costos;
- otros cálculos.

Cuando cambian los supuestos, deben poder recalcularse derivados sin alterar automáticamente el canon estratégico.

## 73. Gobernanza de cambios

Modificar una estrategia de monetización bloqueada requiere, según impacto:

```text
INSTRUCCION EXPLICITA
-> CHECKPOINT
-> PROPUESTA / SIMULACION
-> ANALISIS DE IMPACTO
-> REVALIDACION
-> APROBACION
-> REGISTRO DE CAMBIO
-> NUEVA VERSION
-> REGENERAR DERIVADOS AFECTADOS
```

## 74. Cambios de bajo impacto

Normalmente no requieren reabrir el canon completo:

- cambiar precio operativo;
- reemplazar un prospecto;
- ajustar un email;
- cambiar un paquete temporal;
- modificar un CTA comercial compatible;
- probar un nuevo canal de outreach;
- actualizar media kit;
- retirar una oferta menor.

## 75. Cambios de alto impacto

Pueden requerir revisión canónica:

- sustituir la ruta primaria;
- activar una ruta previamente incompatible;
- cambiar significativamente la lógica comercial;
- vender una categoría incompatible con la marca;
- adoptar un modelo que cambie la relación con la audiencia;
- introducir una oferta que exija nueva autoridad/credenciales;
- cambiar guardrails comerciales.

## 76. Historial y trazabilidad

F11 debe poder responder:

- ¿qué rutas se evaluaron?;
- ¿por qué se eligió la primaria?;
- ¿qué se descartó?;
- ¿qué condiciones existían?;
- ¿qué ofertas se probaron?;
- ¿qué pricing se utilizó?;
- ¿qué experimentos funcionaron?;
- ¿qué cambió y por qué?;
- ¿qué decisión fue del usuario?;
- ¿qué fue propuesta de AIIF?

## 77. Compatibilidad de plataforma

F11 debe funcionar en Modo Básico Universal.

No requiere:

- CRM integrado;
- plataforma de pagos integrada;
- email conectado;
- analytics conectado;
- navegación web permanente.

Puede operar mediante archivos, tablas, briefs y registros manuales.

## 78. Información externa cambiante

Cuando la decisión dependa de datos actuales como:

- programas de monetización de plataforma;
- comisiones;
- términos de marketplace;
- requisitos de elegibilidad;
- tarifas de proveedor;
- normativa;
- reglas de disclosure;

AIIF debe tratarlos como información externa susceptible de cambio y verificar cuando corresponda.

## 79. Portabilidad

El estado F11 debe incluirse, cuando corresponda, en:

- Paquete Portable;
- Paquete Portable Ligero;
- Archivo Universal de Reanudación.

Contenido portable recomendado:

```text
MONETIZATION_STRATEGY_CANON
MONETIZATION_ROUTE_SET_CANON
MONETIZATION_SEQUENCE_CANON
COMMERCIAL_ALIGNMENT_RULES_CANON
MONETIZATION_ROADMAP_CURRENT
OFFER_CATALOG_CURRENT
PRICING_CURRENT
PARTNER_TARGET_PROFILE_CURRENT
PORTFOLIO_CURRENT
MEDIA_KIT_CURRENT
COMMERCIAL_FUNNEL_CURRENT
OUTREACH_PLAYBOOK_CURRENT
COMMERCIAL_PIPELINE
MONETIZATION_EXPERIMENT_LOG
MONETIZATION_ASSUMPTIONS_CURRENT
pendientes
historial relevante
proxima accion
```

## 80. Etapas internas del subsistema

Para no confundirse con F01-F13, F11 utiliza etapas internas `MO00-MO20`:

```text
MO00 - Detectar ruta de entrada
MO01 - Cargar contexto F01-F10
MO02 - Construir Brief de Monetizacion
MO03 - Generar Territorios de Monetizacion
MO04 - Construir rutas candidatas
MO05 - Clasificar roles de ruta
MO06 - Evaluar ajuste estrategico
MO07 - Evaluar viabilidad operativa
MO08 - Evaluar riesgo reputacional
MO09 - Construir Matriz de Rutas
MO10 - Definir guardrails comerciales
MO11 - Construir secuencia candidata
MO12 - Definir condiciones de activacion
MO13 - Simular estrategias alternativas
MO14 - Construir arquitectura de ofertas inicial
MO15 - Definir roadmap operativo
MO16 - Ejecutar validadores
MO17 - Presentar recomendacion
MO18 - Aprobar y bloquear estrategia
MO19 - Generar activos comerciales operativos
MO20 - Activar seguimiento / experimentos y puente a F12
```

Estas etapas son internas.

## 81. Brief de Monetización

Estructura conceptual:

```json
{
  "monetization_brief": {
    "business_objective": "[OBJETIVO]",
    "audience": "[AUDIENCIA]",
    "markets": [],
    "brand_positioning_ref": "BRAND_POSITIONING_CANON",
    "value_proposition_ref": "VALUE_PROPOSITION_CANON",
    "content_system_ref": "CONTENT_SYSTEM_CANON",
    "production_system_ref": "AI_PRODUCTION_SYSTEM_CANON",
    "time_available": "[TIEMPO]",
    "resources": [],
    "existing_assets": [],
    "existing_revenue_routes": [],
    "desired_routes": [],
    "commercial_limits": [],
    "unknowns": []
  }
}
```

## 82. Output técnico antes de aprobación

```json
{
  "f11_monetization": {
    "status": "BORRADOR|VALIDADO|REQUIERE_AJUSTES",
    "route": "EXISTING|PARTIAL|DISCOVERY",
    "monetization_territories": [],
    "route_candidates": [],
    "route_matrix": {},
    "recommended_primary_route": "",
    "recommended_sequence": [],
    "commercial_guardrails": [],
    "activation_conditions": [],
    "offer_architecture_draft": [],
    "risks": [],
    "validator_results": [],
    "approval_required": true
  }
}
```

## 83. Output técnico después de aprobación

```json
{
  "f11_monetization_canon": {
    "monetization_strategy_canon": {},
    "monetization_route_set_canon": [],
    "monetization_sequence_canon": [],
    "commercial_alignment_rules_canon": [],
    "status": "BLOQUEADO",
    "approved_by_user": true,
    "version": "[VERSION]",
    "operational_objects": {
      "monetization_roadmap_current": {},
      "offer_catalog_current": [],
      "pricing_current": {},
      "commercial_pipeline": []
    }
  }
}
```

## 84. Algoritmo operativo

```text
INPUT: canon F01-F10 + objetivo comercial + recursos

1. recuperar contexto existente
2. detectar si usuario sabe / tiene ideas / no sabe
3. construir Brief de Monetizacion
4. generar Territorios si hace falta
5. crear rutas candidatas
6. comparar ajuste marca / audiencia / contenido / produccion
7. evaluar viabilidad y riesgos
8. clasificar PRIMARY / SECONDARY / LATER / EXPERIMENTAL / REJECTED
9. construir secuencia
10. definir condiciones de activacion
11. definir guardrails comerciales
12. simular alternativas
13. construir arquitectura inicial de ofertas
14. ejecutar validadores
15. presentar recomendacion
16. esperar aprobacion explicita
17. bloquear solo estrategia/rutas/secuencia/guardrails aprobados
18. generar roadmap, pricing, portfolio, media kit, funnel y pipeline como objetos dinamicos
19. registrar experimentos y resultados
20. propagar aprendizajes a F12 sin modificar canon automaticamente
```

## 85. Mapeo fuente experta -> arquitectura AIIF

| Elemento de la fuente experta | Tratamiento en F11 |
|---|---|
| Objetivo del negocio | Input principal y restricción estratégica |
| UGC | Ruta posible `BRAND_UGC` cuando aplique |
| Cursos | Oferta/producto digital o servicio según caso |
| Afiliados | Ruta `AFFILIATE` |
| Marca Personal | Marco estratégico; F11 monetiza sin sustituir F05 |
| YouTube/TikTok/Instagram | Plataformas/canales; no siempre rutas económicas por sí solas |
| Productos Digitales | Ruta `DIGITAL_PRODUCT` |
| Consultoría | Ruta `SERVICE_CONSULTING`, con control de credenciales |
| Comunidad | Ruta `MEMBERSHIP_COMMUNITY` cuando aplique |
| Plan de Monetización | Entregable oficial F11 |
| Colaboraciones | `BRAND_SPONSORSHIP` / `BRAND_UGC` según mecanismo |
| Productos digitales y comunidad | Rutas que F11 puede priorizar o posponer |
| Reglas de consistencia | Guardrails comerciales + validadores |

## 86. Entregable oficial

El entregable oficial de F11 es:

# Plan de Monetización

Debe contener como mínimo:

1. resumen comercial;
2. objetivo de monetización;
3. rutas evaluadas;
4. matriz comparativa;
5. ruta primaria;
6. rutas secundarias/posteriores;
7. secuencia de activación;
8. condiciones de activación;
9. guardrails comerciales;
10. arquitectura inicial de ofertas;
11. política/principios de pricing;
12. perfil de partners;
13. portfolio requerido;
14. media kit requerido;
15. funnel y outreach;
16. pipeline comercial;
17. experimentos iniciales;
18. métricas comerciales;
19. riesgos y supuestos;
20. versión, validación y estado de aprobación.

Puede complementarse con:

```text
monetization-strategy.json
monetization-routes.json
monetization-roadmap.json
offer-catalog.json
pricing.json
partner-target-profile.json
commercial-pipeline.json
monetization-experiments.json
```

## 87. UX simplificada

La experiencia visible recomendada:

```text
OBJETIVO COMERCIAL
-> RUTAS
-> COMPARACION
-> RUTA PRIMARIA
-> SECUENCIA
-> PLAN RECOMENDADO
-> APROBACION
-> ESTRATEGIA DE MONETIZACION CANONICA
```

Después del bloqueo, AIIF puede mostrar solo la siguiente acción comercial necesaria.

## 88. Principio final propuesto

> **AI Influencer Factory debe poder construir una estrategia de monetización coherente aunque el usuario no conozca modelos de negocio, pricing ni ventas. Debe utilizar nicho, concepto, marca, audiencia, contenido, narrativa, producción y recursos para comparar rutas de ingreso, distinguir ruta de oferta y canal, elegir una prioridad, secuenciar activación, definir guardrails, comprobar viabilidad y exigir aprobación antes de bloquear la Estrategia de Monetización Canónica. Precios, ofertas, media kit, portfolio, funnel, pipeline y experimentos son objetos operativos versionables. Una oportunidad comercial atractiva nunca debe reescribir silenciosamente la identidad ni prometer ingresos garantizados. F11 define qué y cómo monetizar; F12 aprende cómo crecer y optimizar con datos.**

## 89. Estado de esta especificación

```text
ESTADO = PROPUESTA_LISTA_PARA_APROBACION
```

Hasta aprobación explícita del usuario:

- `MONETIZATION_STRATEGY_CANON` es propuesto;
- `MONETIZATION_ROUTE_SET_CANON` es propuesto;
- `MONETIZATION_SEQUENCE_CANON` es propuesto;
- `COMMERCIAL_ALIGNMENT_RULES_CANON` es propuesto;
- los validadores especializados son propuestas;
- los objetos operativos nuevos son propuestas arquitectónicas;
- F11 no debe considerarse bloqueada dentro de AI Influencer Factory Portable v1.0.
