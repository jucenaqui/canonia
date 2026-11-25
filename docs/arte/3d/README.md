# Arte 3D de Canonia

Modelos 3D generados con IA (Magnific) a partir de las descripciones de `docs-entrada/03-influence-foundry.md` y del encargo `docs/arte/encargo-ilustraciones.md`. Formato GLB, listo para three.js. Se usan en las maquetas jugables de D46 y D47.

Licencia: la del contenido del repositorio (CC BY-SA), como el resto del arte del dueño (D42).

## Modelos (`modelos/`)

| Archivo | Qué es | Notas |
|---|---|---|
| `pix.glb` | PIX, el guía | Sin esqueleto; flota al lado del protagonista |
| `heroe-correr.glb` | Protagonista: el influencer en silueta de luz | Con esqueleto y animación de correr |
| `heroe-quieto.glb` | Mismo protagonista | Animación de estar quieto |
| `heroe-saltar.glb` | Mismo protagonista | Animación de saltar (una vez) |
| `avatar-smith.glb` | Avatar Smith, maestro de The Forge | Sin esqueleto |
| `prompt-mechanic.glb` | Prompt Mechanic, maestra del Prompt Garage | Sin esqueleto |
| `generalista.glb` | El Generalista, jefe del Mundo 1 | Sin esqueleto |
| `spam.glb` | Enemigo: dron de spam | Sin esqueleto |
| `maquina.glb` | Máquina de ingreso (zona 1 del Mundo 1) | |
| `terminal.glb` | Terminal de nichos (zona 2) | |
| `capsula.glb` | Cápsula del influencer (zona 3) | |
| `nucleo.glb` | Núcleo de PIX Central | |
| `plataforma.glb` | Plataforma flotante | Se estira para cubrir cada plataforma |

Las tres animaciones del protagonista comparten el mismo esqueleto: el juego carga el modelo de correr y toma las animaciones de los otros dos.

Pendiente para el juego final: comprimir los modelos (texturas más pequeñas). Hoy pesan entre 1 y 2 MB cada uno.

## Maquetas (`maquetas/`)

Código fuente de las páginas publicadas en privado dentro de Claude:

- `vistas-3d.html`: comparación de las tres vistas (de lado, en diagonal, mundo abierto). Publicada en https://claude.ai/artifact/7XkP3mU9C9yEk7ufj6EQec
- `mundo1-zonas.html`: Mundo 1 con las cinco zonas donde se decide jugando. Publicada en https://claude.ai/artifact/2vwqHYCpUEnEZ3VqRRoV94

Al publicarse, cada modelo se empaqueta como un archivo `.js` (el GLB en base64) porque la página publicada no sirve archivos `.glb`. Esos archivos se generan desde `modelos/` y no se guardan aquí.
