# Canonia

**Crea tu influencer.** Un juego didáctico de plataformas donde recorres mundos, aprendes y terminas con un influencer virtual completamente creado.

> Estado: en construcción. La versión jugable mínima (Mundo 1) está especificada y empezó su implementación; todavía no hay juego jugable.

## Qué es

Canonia convierte la metodología AI Influencer Factory (AIIF) en un juego. Cada mundo es una fase de la factoría: nicho, concepto, identidad, personaje, marca, imagen, voz, narrativa, contenido, producción, monetización, crecimiento y consolidación. Al cerrar el último mundo, el jugador se lleva el perfil completo de su influencer, listo para seguir trabajando con cualquier IA.

Está pensado para personas sin conocimientos previos que quieren crear contenido en redes sociales.

## Qué hay en este repositorio

| Carpeta o archivo | Contenido |
|---|---|
| `ESTADO.md` | Estado actual del proyecto y siguiente acción. Empieza por aquí para retomar el trabajo |
| `CLAUDE.md` | Reglas de trabajo para la IA |
| `ESPECIFICACION_JUEGO_AIIF.md` | Especificación del juego y registro de todas las decisiones tomadas |
| `docs/concepto-visual/` | Concepto visual del tema "Dentro del teléfono" |
| `docs-entrada/` | Brief del producto, mapa de features y el mundo The Influence Foundry (personajes, distritos y arte de referencia) |
| `specs/` | Especificaciones de cada feature; en `005-version-jugable-minima/` están el plan técnico, los contratos y las tareas |
| `index.html` | Página del juego |
| `src/` | Código del juego, en cuatro capas: `domain` (reglas), `application` (casos de uso), `adapters` (IA y guardado), `presentation` (motor y pantallas), más `content` (textos y mundos) |
| `tests/` | Pruebas automáticas, sin navegador |
| `spike/` | Prueba técnica temporal dentro de Claude; se retira al cerrar la versión jugable mínima |
| `factoria-aiif/` | AI Influencer Factory Portable v1.0.2, edición pública y genérica (sin ningún influencer específico) |
| `.specify/` y `.claude/` | Spec Kit y los subagentes del proyecto |

## Cómo ejecutarlo

Solo hace falta [Node.js](https://nodejs.org/) 22 o superior para las pruebas. No hay dependencias que instalar.

Pruebas automáticas, desde la raíz del repositorio:

```bash
node --test
```

Para ver el juego en local, sirve la carpeta con cualquier servidor de archivos estáticos, por ejemplo:

```bash
python -m http.server 8000
```

y abre `http://localhost:8000`. Fuera de Claude, el juego funciona en **modo de demostración**, con respuestas de ejemplo en lugar de la IA, y lo indica con un aviso visible.

Dentro de Claude, el juego usa la IA de la cuenta del jugador cuando esta la ofrece. Si no (por ejemplo, con una cuenta gratuita), usa el **modo guía**: el juego te da la pregunta, la pegas en la IA de chat que prefieras y traes la respuesta de vuelta. La partida se guarda en tu navegador.

## Cómo se trabaja

El proyecto usa desarrollo guiado por especificación con [Spec Kit](https://github.com/github/spec-kit): primero se escribe y aprueba la especificación, después se construye. Ningún código entra sin estar documentado en la especificación.

## Primera versión

- Mundos 1 a 3: nicho, concepto, nombre y biografía.
- Solo influencer virtual.
- Móvil primero.
- Se juega dentro de Claude: con la IA del plan de cada jugador o, si su cuenta no la ofrece, con el modo guía.

## Contribuir

El proyecto es de código abierto y está hecho para que otros lo mejoren. Las contribuciones económicas son voluntarias y nunca obligatorias.

## Licencias

- Código: [MIT](LICENSE).
- Contenido (especificación, factoría AIIF, documentación y arte): [Creative Commons Atribución-CompartirIgual 4.0](LICENSE-CONTENT.md).
