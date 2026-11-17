# Resultados de la prueba técnica

**Página probada:** `spike/` publicada en privado dentro de Claude.
**Fecha:** 2026-11-17
**Quién probó:** el dueño del proyecto, en la app de Claude de su teléfono, con su propia cuenta.

## T003 — Prueba en el teléfono del dueño

| Supuesto (research.md) | Resultado | Estado |
|---|---|---|
| R5. Una página publicada carga varios módulos enlazados | Cargaron los dos archivos | Confirmado |
| R6. El lienzo se mueve fluido en el teléfono | 64 cuadros por segundo; el peor salto entre cuadros fue de 17 ms | Confirmado |
| R6. Los botones táctiles responden | El dueño confirma que el cuadro se movió y saltó con los botones. El resumen copiado no registró el tiempo de respuesta porque se copió antes de pulsar | Confirmado (sin medida de tiempo) |
| R1. La IA al nivel rápido da tres opciones válidas en español | 3 opciones válidas en 3,0 s, nivel aplicado `quick`; el tiempo incluye el permiso | Confirmado |
| R1. Qué pasa al negar el permiso de la IA | No se pudo probar: Claude recuerda la decisión aceptada y al recargar no vuelve a preguntar | No verificado |
| R2. Almacenamiento del navegador | Disponible; el contador subió de 1 a 2 al recargar | Confirmado |

Pantalla útil del teléfono dentro de la app de Claude: 375 × 682 píxeles, táctil.

### Sobre negar el permiso

El permiso de la IA queda guardado por página y por persona. Para volver a probar el rechazo hay dos caminos:

- Retirar el permiso desde el menú de permisos de la página en Claude y volver a pedir opciones.
- Probarlo con la segunda cuenta en T004, negando el permiso la primera vez.

No bloquea el plan: el camino "IA no disponible" se construye y se prueba de todas formas con el adaptador de demostración (tareas T021 y T053).

## T004 — Prueba con una segunda cuenta

Pendiente. Requiere que el dueño comparta la página por enlace con otra cuenta de Claude.
