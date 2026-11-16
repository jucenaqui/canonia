# AI INFLUENCER FACTORY
# Especificación Técnica — Política Canónica de Idioma v1.0

## Estado
`CANÓNICA`

## Objetivo
Evitar que el idioma de los materiales fuente de un influencer modifique accidentalmente el idioma estructural de AI INFLUENCER FACTORY y separar claramente idioma interno, idioma público, aliases creativos e idioma de exportación.

---

## 1. Idioma estructural de la factoría

El idioma oficial de AI INFLUENCER FACTORY es **español** para:

- arquitectura;
- fases y subfases;
- estados;
- validaciones;
- aprobaciones;
- dependencias;
- labels de campos;
- documentación;
- manuales;
- guías;
- documentación de uso;
- plantillas generales;
- especificaciones técnicas.

---

## 2. Regla de aislamiento de contexto

El idioma de un documento, archivo, prompt, briefing o referencia aportado para `[Nombre Influencer]`:

- se conserva como propiedad de la fuente;
- puede influir en el contenido público de ese proyecto cuando corresponda;
- **no puede redefinir el idioma estructural de la factoría**;
- no puede renombrar automáticamente fases, estados, entregables o campos globales.

---

## 3. Idioma público del influencer

Cada proyecto define:

```text
IDIOMA_PUBLICO_PRINCIPAL:
[Idioma]

IDIOMAS_PUBLICOS_SECUNDARIOS:
[Opcional]
```

Bio, captions, CTA, Stories, textos de Reels, respuestas públicas, media kits y pitches deben generarse en el idioma adecuado a la audiencia y al uso.

---

## 4. Idioma del canon interno

Por defecto:

`ESPAÑOL`

Excepciones válidas:

- nombres propios;
- marcas;
- taxonomías internacionales;
- términos de industria;
- aliases creativos;
- nombres de campañas;
- contenido público;
- prompts exportados cuando la herramienta destino lo recomiende.

---

## 5. Conceptos creativos bilingües

Para campos donde el inglés pueda aportar valor creativo, comercial o internacional, AI INFLUENCER FACTORY debe proponer alternativas y recomendar una arquitectura.

Campos frecuentes:

- Esencia de Marca (`Brand Essence`);
- Personalidad de Marca (`Brand Personality`);
- Firma Psicológica;
- Tagline;
- Claim;
- Posicionamiento Público;
- Nicho / Taxonomía Internacional;
- Territorios de Marca;
- Promesa de Marca;
- nombres de series;
- nombres de universos narrativos.

Formato recomendado:

```text
CAMPO:
[Nombre español]

VALOR_CANONICO_ES:
[...]

ALIAS_CREATIVO_EN:
[...]

USO_RECOMENDADO:
[Interno / público / ambos]

JUSTIFICACION:
[Por qué]
```

La factoría debe evitar traducciones literales cuando reduzcan calidad, naturalidad, recordación o valor comercial.

---

## 6. Alias de entregables

Los nombres oficiales son españoles.

Ejemplos:

```text
Biblia de Personaje
alias_en: Character Bible

Biblia de Marca
alias_en: Brand Bible

Biblia de Identidad Visual
alias_en: Visual Identity Bible

Biblia de Voz e Identidad Verbal
alias_en: Voice Bible

Biblia Narrativa
alias_en: Narrative Bible

Biblia de Contenido
alias_en: Content Bible
```

El alias no sustituye el nombre oficial.

---

## 7. IDs técnicos

No traducir ni renombrar por idioma:

- F01–F13;
- IDs de datos;
- IDs de expresiones;
- IDs de universos;
- IDs de checkpoints;
- IDs de documentos;
- IDs de contratos.

Los IDs deben ser semánticamente estables.

---

## 8. Exportación a herramientas IA

La documentación del sistema permanece en español.

Los prompts finales pueden exportarse en el idioma más adecuado para la herramienta:

```text
IDIOMA_SISTEMA: ES
IDIOMA_PROMPT_EXPORTADO: [ES/EN/OTRO]
IDIOMA_VOZ_PUBLICA: [Idioma del proyecto]
```

---

## 9. Migración lingüística

### Riesgo bajo
- labels;
- títulos visibles;
- nombres de fases;
- nombres de entregables;
- documentación humana.

### Riesgo medio
- nombres de archivos;
- rutas internas;
- aliases.

### Riesgo alto
- claves JSON;
- schemas;
- contratos API;
- automatizaciones;
- parsers.

### Riesgo muy alto
- IDs persistentes.

Regla: una migración de idioma debe ser **semántica y selectiva**, nunca un reemplazo masivo.

---

## 10. Regla canónica final

> AI INFLUENCER FACTORY piensa, administra y documenta en español. Cada influencer se comunica públicamente en el idioma definido para su proyecto. Los aliases creativos, taxonomías internacionales y prompts exportados pueden conservar otro idioma cuando aporten valor funcional, creativo o comercial.

---

## 11. Validación de nomenclatura documental

Queda incorporada como comprobación obligatoria del:

`VALIDADOR_DE_IDIOMA_Y_LOCALIZACION`

la operación:

`VALIDAR_NOMENCLATURA_DOCUMENTAL`

### Objetivo

Evitar que títulos oficiales, entregables, fases o términos documentales de AI INFLUENCER FACTORY aparezcan en inglés cuando existe un nombre canónico en español.

### Regla de decisión

Para cada término visible:

1. Si es un nombre oficial o documental → usar español.
2. Si es una marca o nombre propio → conservar.
3. Si es un formato o acrónimo internacional → conservar.
4. Si es un ID, clave, schema o contrato técnico estable → conservar.
5. Si es un alias creativo/internacional aprobado → conservar únicamente como alias secundario.
6. En cualquier otro caso → normalizar al español.

### Nomenclatura oficial relevante

- Character Bible → **Biblia de Personaje**
- Brand Bible → **Biblia de Marca**
- Visual Identity Bible → **Biblia de Identidad Visual**
- Voice Bible → **Biblia de Voz e Identidad Verbal**
- Narrative Bible → **Biblia Narrativa**
- Content Bible → **Biblia de Contenido**
- portfolio → **portafolio**
- dataset → **conjunto de datos**; “dataset” puede aparecer entre paréntesis en contexto técnico
- checkpoint → **punto de control**
- snapshot → **instantánea de estado**
- intents → **intenciones operativas**
- JSON schemas → **esquemas JSON**
- Portable Lite → **Paquete Portable Ligero** como nombre visible; `PAQUETE_PORTABLE_LITE` permanece estable
- Universal Resume → **Archivo Universal de Reanudación** como nombre visible; `[Nombre_Influencer]_UNIVERSAL_RESUME.md` puede permanecer como nombre técnico
- bootstrap → **Prompt de Arranque Universal** como nombre funcional visible; `AI_INFLUENCER_FACTORY_BOOTSTRAP` puede permanecer como identificador técnico

### Nombres oficiales de entregables

- F03 — Biblia de Biografía e Identidad
- F04 — Biblia de Personaje
- F05 — Biblia de Marca
- F06 — Biblia de Identidad Visual
- F07 — Biblia de Voz e Identidad Verbal
- F08 — Biblia Narrativa
- F09 — Biblia de Contenido
- F10 — Sistema / Manual de Producción IA
- F11 — Plan de Monetización
- F12 — Plan de Crecimiento
- F13 — Perfil Maestro + Paquete Portable

Los aliases ingleses definidos mediante campos como `alias_en` son válidos para interoperabilidad, pero nunca sustituyen el nombre oficial principal en español.

### Resultado ante incumplimiento documental

Por defecto:

```text
VALIDADOR: VALIDADOR_DE_IDIOMA_Y_LOCALIZACION
COMPROBACION: VALIDAR_NOMENCLATURA_DOCUMENTAL
RESULTADO: REQUIERE_AJUSTES
SEVERIDAD: MODERADO
```

La severidad puede elevarse si el error modifica contratos, claves, canon o genera ambigüedad operativa.
