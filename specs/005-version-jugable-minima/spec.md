# Feature Specification: Versión jugable mínima (integración)

**Feature Branch**: `005-version-jugable-minima`

**Created**: 2026-11-16

**Status**: Approved (2026-11-16)

**Input**: Orden de construcción aprobado en el mapa de features (D26): "Primero una versión jugable mínima: motor, puertas e inventario, jefe y Mundo 1, con un mapa de un solo mundo. Con eso se prueba si el juego divierte y enseña."

## Propósito

Esta especificación no añade requisitos nuevos. Reúne cuatro especificaciones ya aprobadas en una sola entrega, para que tengan un único plan técnico y una única lista de tareas:

| Spec | Qué aporta | Requisitos |
|---|---|---|
| [001](../001-motor-plataformas/spec.md) | Motor de plataformas y controles | FR-001 a FR-034 |
| [002](../002-puertas-decision-inventario/spec.md) | Puertas de decisión e inventario | FR-001 a FR-044 |
| [003](../003-jefe-mundo-validacion/spec.md) | Jefe de mundo: validación de la fase | FR-001 a FR-033 |
| [004](../004-mundo-1-nicho/spec.md) | Mundo 1: Nicho | FR-001 a FR-040 |

Para citar un requisito de otra spec se usa su carpeta como prefijo, por ejemplo `002/FR-018`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Jugar el Mundo 1 de principio a fin (Priority: P1)

Una persona sin conocimientos previos abre Canonia dentro de Claude en su teléfono, juega el Mundo 1 completo y termina con sus cinco piezas aprobadas y el resumen del mundo.

**Why this priority**: es la prueba de la idea. Si esto no divierte ni enseña, no tiene sentido construir los otros doce mundos.

**Independent Test**: una persona que nunca vio el juego lo abre desde un enlace, lo juega hasta cerrar el mundo y muestra su resumen.

**Acceptance Scenarios**:

1. **Given** el juego publicado dentro de Claude, **When** una persona con cuenta de Claude lo abre en el teléfono, **Then** puede empezar a jugar sin registrarse en nada más.
2. **Given** el jugador recorre el mundo, **When** resuelve las cinco puertas y enfrenta al Generalista, **Then** cierra el mundo y ve su resumen con las cinco piezas.
3. **Given** el jugador no permite que el juego use la IA, **When** llega a una puerta, **Then** puede escribir y aprobar sus propias respuestas y terminar el mundo igual.

### Edge Cases

- El jugador recarga la página a mitad del mundo: en esta entrega el progreso no se conserva entre cargas, y el juego se lo avisa antes de empezar. El guardado pertenece a la feature de guardado y exportación.
- El juego se abre fuera de Claude (por ejemplo, el archivo en un navegador): funciona en modo de demostración con respuestas de ejemplo, claramente señalado, para poder desarrollar y probar.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La entrega DEBE cumplir todos los requisitos de las specs 001, 002, 003 y 004.
- **FR-002**: La entrega DEBE incluir un mapa mínimo de un solo mundo, que permita entrar al Mundo 1 y verlo como completado al cerrarlo.
- **FR-003**: La entrega DEBE poder jugarse dentro de Claude con la cuenta del jugador, sin registro propio.
- **FR-004**: Antes de empezar, el juego DEBE avisar que el progreso no se conserva al cerrar o recargar en esta versión.
- **FR-005**: Fuera de Claude, el juego DEBE funcionar en un modo de demostración con respuestas de ejemplo, señalado de forma visible.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Se cumplen los criterios de éxito de las specs 001 a 004.
- **SC-002**: Una persona de fuera del proyecto, con su propia cuenta de Claude, abre el enlace en su teléfono y completa el Mundo 1.
- **SC-003**: Las pruebas automáticas obligatorias de decisión e inventario pasan al 100 %.

## Assumptions

- El mapa completo, los puntos, niveles y habilidades siguen perteneciendo a la feature de mapa y progreso.
- El guardado entre sesiones y la exportación siguen perteneciendo a la feature de guardado y exportación.
- Los mundos 2 y 3 no forman parte de esta entrega.

## No-objetivos

- NO se añaden funciones que no estén en las specs 001 a 004, salvo el mapa mínimo, el aviso de no guardado y el modo de demostración descritos aquí.
