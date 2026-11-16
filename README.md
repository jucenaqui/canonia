# Canonia

**Crea tu influencer.** Un juego didáctico de plataformas donde recorres mundos, aprendes y terminas con un influencer virtual completamente creado.

> Estado: en especificación. Todavía no hay juego jugable.

## Qué es

Canonia convierte la metodología AI Influencer Factory (AIIF) en un juego. Cada mundo es una fase de la factoría: nicho, concepto, identidad, personaje, marca, imagen, voz, narrativa, contenido, producción, monetización, crecimiento y consolidación. Al cerrar el último mundo, el jugador se lleva el perfil completo de su influencer, listo para seguir trabajando con cualquier IA.

Está pensado para personas sin conocimientos previos que quieren crear contenido en redes sociales.

## Qué hay en este repositorio

| Carpeta o archivo | Contenido |
|---|---|
| `ESPECIFICACION_JUEGO_AIIF.md` | Especificación del juego y registro de todas las decisiones tomadas |
| `docs/concepto-visual/` | Concepto visual del tema "Dentro del teléfono" |
| `factoria-aiif/` | AI Influencer Factory Portable v1.0.2, edición pública y genérica (sin ningún influencer específico) |
| `.specify/` y `.claude/skills/` | Spec Kit: plantillas y comandos para el desarrollo guiado por especificación |

## Cómo se trabaja

El proyecto usa desarrollo guiado por especificación con [Spec Kit](https://github.com/github/spec-kit): primero se escribe y aprueba la especificación, después se construye. Ningún código entra sin estar documentado en la especificación.

## Primera versión

- Mundos 1 a 3: nicho, concepto, nombre y biografía.
- Solo influencer virtual.
- Móvil primero.
- Se juega dentro de Claude, con el plan de cada jugador.

## Contribuir

El proyecto es de código abierto y está hecho para que otros lo mejoren. Las contribuciones económicas son voluntarias y nunca obligatorias.

## Licencias

- Código: [MIT](LICENSE).
- Contenido (especificación, factoría AIIF, documentación y arte): [Creative Commons Atribución-CompartirIgual 4.0](LICENSE-CONTENT.md).
