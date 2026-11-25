# Encargo de ilustraciones — Mundo 1 (PIX Central)

**Para:** el dueño del proyecto, que genera las ilustraciones con su herramienta de IA (D45).
**Qué pasa después:** las ilustraciones reemplazan al dibujo por código del juego, pieza por pieza. Mientras falte una, el juego sigue usando su versión por código.
**Referencia de estilo:** `docs-entrada/03-influence-foundry.md` (sección 11) y las imágenes de `docs-entrada/influence-foundry/`.
**Licencia:** como el resto del contenido, CC BY-SA 4.0 (D42).

---

## 1. Reglas para todas las piezas

- **Vista de perfil o tres cuartos, mirando a la derecha.** Es un juego de plataformas visto de lado: nada de vistas aéreas ni isométricas para personajes y objetos.
- **Fondo transparente** (PNG) en personajes y objetos. Si tu herramienta no da transparencia, usa un fondo liso de un color que no aparezca en la pieza (por ejemplo verde #00FF00) y yo lo quito.
- **Luz desde arriba a la izquierda** en todas las piezas, para que encajen entre sí.
- **Nada de texto** dentro de las imágenes (el juego pone los textos).
- **Misma familia que tus imágenes:** futurista luminoso, premium, blanco, cyan, violeta y acentos dorados; vidrio, metal limpio y hologramas. Nada de cyberpunk oscuro ni suciedad industrial. Público adulto: estilizado, no infantil.
- **Coherencia:** genera primero el protagonista y PIX, y usa esas imágenes como referencia de personaje para todas sus poses.
- **Peso:** el Mundo 1 completo debería quedar por debajo de 4 MB. Fondos en WebP; personajes y objetos en PNG.
- **Entrega:** pon los archivos en `src/presentation/art/assets/` con los nombres de la tabla, o pásamelos por el chat.

### Texto base de estilo (añádelo al principio de cada petición)

```text
Stylized premium game art, semi-realistic proportions, clean luminous futuristic factory,
white, cyan and violet palette with small gold accents, soft volumetric light from top left,
clean metal, glass and holograms, crisp silhouette, no dark cyberpunk, no dirt, no text,
side view for a 2D platformer.
```

---

## 2. Piezas del Mundo 1

| # | Archivo | Tamaño | Qué es | Sustituye a |
|---|---|---|---|---|
| 1 | `fondo-pix-central-apagado.webp` | 2400 × 1200 | Fondo lejano del núcleo, apagado | Cielo y anillos por código |
| 2 | `fondo-pix-central-encendido.webp` | 2400 × 1200 | El mismo fondo, encendido | Brillo del reactor |
| 3 | `capa-media-columnas.png` | 2400 × 700 | Columnas con cápsulas, transparente | Columnas por código |
| 4 | `suelo-tramo.png` | 512 × 160 | Trozo de suelo que se repite a lo ancho | Suelo pulido |
| 5 | `pasarela-luz.png` | 384 × 48 | Plataforma flotante de vidrio y luz | Pasarelas |
| 6 | `bloque-modulo.png` | 128 × 128 | Bloque sólido | Bloques |
| 7 | `portal-cerrado.png` / `portal-resuelto.png` | 160 × 320 | La puerta de decisión, en sus dos estados | Portal holográfico |
| 8 | `poste-apagado.png` / `poste-encendido.png` | 64 × 160 | Punto seguro | Poste de luz |
| 9 | `protagonista-quieto.png`, `-corre-1.png`, `-corre-2.png`, `-salta.png`, `-cae.png` | 256 × 384 cada una | Tu influencer en silueta, cinco poses | Silueta por código |
| 10 | `pix-flota.png`, `pix-habla.png`, `pix-contento.png`, `pix-preocupado.png` | 256 × 256 cada una | PIX, cuatro expresiones | PIX por código |
| 11 | `pix-icono.png` | 64 × 64 | PIX reconocible en pequeño | — |
| 12 | `capsula-apagada.png` / `capsula-encendida.png` | 192 × 384 | La cápsula del influencer que se enciende al cerrar el mundo (004/FR-041) | — |
| 13 | `generalista-quieto.png` / `generalista-golpeado.png` | 512 × 512 | El jefe del Mundo 1 (D44) | — |
| 14 | `enemigo-spam.png` | 128 × 128 | Enemigo: dron de notificaciones basura | Enemigos (T051) |
| 15 | `enemigo-glitch.png` | 128 × 128 | Enemigo: fragmento de imagen corrupta | Enemigos (T051) |
| 16 | `nucleo-energia.png` | 64 × 64 | Objeto para recoger (los "corazones" del motor) | Corazones (T051) |

---

## 3. Texto para generar cada pieza

Antepón el texto base de estilo a cada una.

**1 y 2. Fondo de PIX Central**

```text
Wide background of a giant circular futuristic factory hall seen from the side, a floating data
reactor core in the center with elevated light rings, rows of glass capsules along the walls,
distant walkways, white and pale lavender architecture, lots of empty space in the lower third
for the game floor. Version A: everything powered off, dim, desaturated, the reactor sleeping.
Version B: exactly the same composition, powered on, cyan light flowing through the rings, warm
gold accents, glowing capsules.
```

**3. Capa media**

```text
Transparent PNG, a horizontal row of tall white pillars with tall glass capsules between them,
each capsule holding a faint human silhouette, clean metal and glass, side view, isolated.
```

**4. Suelo**

```text
Seamless horizontally tileable side view of a polished white factory floor slab, thin cyan light
strip along the top edge, subtle panel seams, lavender to slate gradient going down.
```

**5. Pasarela de luz**

```text
Floating glass walkway platform seen from the side, thin and long, white frosted glass with a
cyan glowing edge and small lights underneath, isolated on transparent background.
```

**6. Bloque**

```text
Square modular white metal block with rounded corners, violet trim and a small gold light strip,
side view, isolated.
```

**7. Portal**

```text
Tall arched holographic portal door, white metal frame with gold trim, inner surface a violet to
cyan hologram with scan lines, side-facing, isolated. Version "cerrado": the hologram is active and
shows a floating question mark shape. Version "resuelto": the hologram is calm, soft cyan, with a
glowing check mark shape.
```

**8. Poste de punto seguro**

```text
Slim white light pylon with a small glowing orb on top, side view, isolated. Version "apagado":
orb dim grey. Version "encendido": orb bright cyan with a soft halo.
```

**9. Protagonista (tu influencer en silueta)**

```text
Full body adult human silhouette made of light, featureless, translucent white body with a
glowing violet-to-cyan outline, gender-neutral, slim athletic proportions, side view facing right,
isolated. Poses: standing idle; running stride A; running stride B; jumping with knees up;
falling with arms up. Keep the exact same figure in every pose.
```

**10 y 11. PIX** (usa tu imagen de PIX como referencia de personaje)

```text
PIX, a small floating AI assistant robot, glossy white shell, dark visor face with expressive cyan
light eyes, small pointed ears with gold trim, tiny body, hovering over a soft light ring,
three-quarter view facing right, isolated. Expressions: neutral floating; talking; happy (eyes as
arcs); worried. Also a simple 64 px icon of the head only, readable at small size.
```

**12. Cápsula del influencer**

```text
Tall glass capsule pod on a white metal base, side view, isolated. Version "apagada": empty and
dim. Version "encendida": glowing cyan inside with a faint human silhouette and gold base lights.
```

**13. El Generalista** (jefe del Mundo 1)

```text
An unstable holographic humanoid figure built from a chaotic mix of topic icons (food, travel,
fitness, tech, fashion, music) that flicker and overlap, no defined face, glitching edges, violet
and cyan hologram light, imposing but not scary, side view facing left, isolated. Version
"golpeado": the same figure breaking apart with scattered icon fragments.
```

**14 a 16. Enemigos y objeto**

```text
Enemy "spam": a small hovering drone shaped like a notification badge, white shell with a pulsing
red-orange counter light, slightly angry visor, side view, isolated.
Enemy "glitch": a floating shard of corrupted image, broken pixels and violet static, side view,
isolated.
Collectible: a small glowing energy core shaped like a heart, cyan and gold, isolated.
```

---

## 4. Cuando las tengas

1. Revisa que todas se vean del mismo mundo, una al lado de otra.
2. Déjalas en `src/presentation/art/assets/` o pásamelas por el chat.
3. Yo las integro, ajusto tamaños y quito fondos si hace falta. Las que falten siguen dibujadas por código.
