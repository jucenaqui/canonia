# AI Influencer Factory — Regla Canónica de Reanudación Simplificada v1.0

**Estado:** `CANONICAL_APPROVED`

## Activador de usuario

El creador solo necesita escribir:

`Continuar [Nombre Influencer]`

Ejemplo:

`Continuar Mi Influencer`

Si el artefacto cargado contiene un único proyecto inequívoco, también puede aceptarse:

`Continuar proyecto`

## Principio

El usuario no debe memorizar el protocolo técnico de recuperación.

Toda la lógica necesaria para reanudar debe residir dentro de los artefactos portables de AI Influencer Factory.

## Protocolo automático

Al detectar el activador, la IA destino debe:

1. identificar el proyecto;
2. verificar versión de proyecto y paquete;
3. cargar el estado actual;
4. aplicar precedencia;
5. preservar canon y objetos bloqueados;
6. recuperar pendientes;
7. detectar referencias no adjuntas;
8. determinar la siguiente acción;
9. continuar sin reconstruir;
10. no repetir preguntas ya resueltas.

## Frase larga de recuperación

La frase utilizada durante las pruebas del piloto:

“Este es un contexto nuevo. Recupera el proyecto desde el paquete sin reconstruirlo…”

queda clasificada como **prompt técnico de diagnóstico**, no como comando normal de usuario.

## Degradación elegante

Si una plataforma no recupera de forma fiable el `Full Portable`, debe usarse `Universal Resume` o `Contexto Portable Copiable`, manteniendo el mismo activador:

`Continuar [Nombre Influencer]`
