# Guía de validación: versión jugable mínima

Cómo ejecutar, probar y comprobar que la entrega funciona. Los comandos se ejecutan desde la raíz del repositorio.

Esta guía describe el destino. Hasta que no se implemente, los comandos no existen todavía.

## Requisitos

- Node.js 22 o superior, solo para las pruebas.
- Un servidor de archivos estáticos para verlo en local (sirve el de Python).
- Un navegador moderno.
- Para la validación dentro de Claude: una cuenta de Claude y la app en un teléfono.

No hay dependencias que instalar.

## 1. Pruebas automáticas

```bash
node --test
```

Deben pasar todas. Cubren, sin navegador:

| Grupo | Qué demuestra |
|---|---|
| `tests/domain/` | Nada entra al inventario sin aprobar; nada aprobado se pierde; al cambiar una pieza, las dependientes quedan por revisar y ninguna se borra; un mundo no se cierra con piezas pendientes o por revisar |
| `tests/application/` | Los flujos de puerta, inventario y jefe, con la IA de demostración y con la IA no disponible |
| `tests/adapters/` | Una respuesta de la IA mal formada o repetida se descarta |
| `tests/engine/` | Reglas de fallo, corazones, puntos seguros y modo de ayuda |
| `tests/architecture.test.js` | Ninguna capa importa lo que no debe |

## 2. Jugar en modo de demostración

Servir la carpeta con cualquier servidor de archivos estáticos, por ejemplo:

```bash
python -m http.server 8000
```

Abrir `http://localhost:8000` en el navegador. Fuera de Claude el juego usa respuestas de ejemplo y lo indica con un aviso visible.

Comprobar:

1. El aviso de modo de demostración y el aviso de que el progreso no se guarda.
2. El primer tramo enseña a moverse, saltar y recoger.
3. Se eligen de 3 a 5 intereses.
4. Cada puerta muestra la mini lección, después tres tarjetas con una recomendada.
5. Seleccionar una tarjeta no la guarda; aprobar sí.
6. Caer al vacío reaparece en el último punto seguro, sin pantalla de fin de juego, y el inventario no cambia.
7. Tres fallos seguidos ofrecen la ayuda.
8. Reabrir el nicho deja audiencia y objetivo por revisar, sin borrarlos.
9. El jefe no aparece con piezas pendientes o por revisar.
10. Tras la pelea, el jefe muestra la revisión; aceptar una observación permite cerrar.
11. El mundo se cierra solo al aprobar el resumen.

## 3. Validar dentro de Claude

Después de publicar la página dentro de Claude (paso que confirma el dueño):

1. Abrir el enlace en la app de Claude del teléfono, con una cuenta distinta a la del dueño.
2. En la primera puerta, permitir el uso de la IA cuando se pida.
3. Completar el Mundo 1.
4. Repetir negando el permiso: el juego debe pasar al modo guía, y el mundo debe poder terminarse también escribiendo las propias respuestas.
5. Repetir con una cuenta gratuita, en modo guía: en cada puerta, copiar la pregunta, pegarla en una IA gratuita, volver, pegar la respuesta y revisar. Usar al menos dos IA distintas (por ejemplo, el chat de Claude y otra).

Medir y anotar: tiempo de respuesta de las opciones, tiempo de la revisión del jefe, si el movimiento se ve fluido y, en modo guía, cuántas respuestas pasaron la revisión al primer intento y si, tras volver de la otra IA, el juego retomó la misma puerta sin perder nada.

## 4. Prueba con una persona real

Los criterios que piden personas (por ejemplo 004/SC-001: completar el mundo en menos de 30 minutos sin conocimientos previos) se validan así:

1. Una persona que no conoce el proyecto ni juega habitualmente.
2. Se le da solo el enlace, sin explicaciones.
3. Se observa sin intervenir y se anota: dónde se atasca, cuánto tarda, si usa la ayuda.
4. Al terminar se le pregunta cuál es su nicho y por qué lo eligió, y si jugaría el siguiente mundo.

## Referencias

- Entidades y reglas: [data-model.md](data-model.md)
- Contratos entre capas: [contracts/puertos.md](contracts/puertos.md)
- Decisiones técnicas: [research.md](research.md)
