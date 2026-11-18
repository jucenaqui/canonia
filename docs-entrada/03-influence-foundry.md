# The Influence Foundry — mundo, personajes y arte

**Origen:** documento del dueño del proyecto, *AI Influencer Factory — World & Game Specification v1.0*, e imágenes de referencia propias. Incorporado el 2026-11-17. Publicado con la licencia del contenido del proyecto (CC BY-SA 4.0).

**Cómo se usa en Canonia (D41):** se adoptan el **mundo**, los **personajes** y la **dirección de arte**. **No** se adopta el género: Canonia sigue siendo un juego de plataformas por mundos con puertas de decisión (D07). La gestión de la fábrica, la economía, las cifras de seguidores e ingresos simuladas, las misiones de negocio y la vista isométrica del documento quedan fuera. Lo que manda es `ESPECIFICACION_JUEGO_AIIF.md`, sección 5.

Imágenes de referencia en `docs-entrada/influence-foundry/`:

| Archivo | Qué muestra |
|---|---|
| `pix.jpg` | PIX, el asistente IA y guía |
| `avatar-smith.jpg` | Avatar Smith, maestro de la forja |
| `prompt-mechanic.jpg` | Prompt Mechanic, mecánica de prompts |
| `mundo-y-escenas.webp` | Vista general de la ciudad-fábrica y escenas de PIX Central, The Forge, Prompt Garage, el distrito de contenido y The Vault |

---

## Texto del documento original

Se conserva tal como lo escribió el dueño, como referencia.

**Dirección de arte.** Futurista luminoso, premium, colorido y legible. Mezcla de laboratorio creativo, fábrica fantástica, hub tecnológico y ciudad aspiracional. Evitar cyberpunk oscuro y suciedad industrial excesiva.

### 1. Visión del mundo

The Influence Foundry es una ciudad-fábrica vertical donde los influencers digitales no son simples archivos: nacen, se entrenan, producen contenido, firman acuerdos, crecen y construyen reputación dentro de un ecosistema vivo. El jugador dirige la fábrica y transforma una operación pequeña en un imperio creativo de influencers IA.

**Fantasía central:** "Construir personas digitales con identidad, vida, carrera y valor comercial, viendo cómo cada decisión transforma físicamente la fábrica y la ciudad."

- El jugador empieza con un núcleo pequeño, pocos recursos y una única cápsula de avatar.
- Cada influencer creado enciende una nueva cápsula dentro de la fábrica.
- La ciudad se expande a medida que crecen producción, ingresos, audiencia y reputación.
- Las fases técnicas de AI Influencer Factory se convierten en edificios, estaciones y misiones.
- Los personajes guía representan especialidades concretas y ayudan a leer el sistema sin menús abstractos.

### 2. Estructura macro del mundo

El mundo se organiza en un hub central conectado a distritos especializados. La lectura espacial debe permitir al jugador entender el estado de su negocio casi sin abrir dashboards: luces, actividad, colas, hologramas, edificios y NPCs comunican progreso y problemas.

| Zona | Función real | Fantasía jugable | Color/atmósfera |
|---|---|---|---|
| PIX Central | Hub / navegación / alertas | Centro nervioso de la fábrica | Blanco + cyan |
| The Forge | Identidad / avatar / canon | Forjar una nueva persona digital | Violeta + oro |
| Prompt Garage | Diagnóstico / corrección | Reparar prompts y generaciones | Amarillo + azul |
| Content District | Producción de piezas | Estudios por formato | Morado + magenta |
| Simulation City | Vida del influencer | Escenarios cotidianos y narrativos | Paletas por barrio |
| Brand Avenue | Prospección comercial | Marcas, briefs y oportunidades | Azul + blanco |
| Deal Room | Negociación | Contratos, derechos y tarifas | Negro + oro suave |
| Growth Tower | Métricas / experimentación | Subir niveles de audiencia y negocio | Cyan + verde |
| Creator Market | Desbloqueables | Outfits, sets, recursos y upgrades | Colorido / retail |
| The Vault | Canon / activos definitivos | Proteger identidad y continuidad | Blanco + violeta profundo |

### 3. Mapa conceptual y conexiones

PIX Central ocupa el núcleo físico y visual. Desde allí parten cuatro ejes: creación, producción, negocio y crecimiento. Simulation City funciona como anillo exterior donde "vive" el contenido; The Vault queda debajo del núcleo como capa protegida del sistema.

```text
                THE FORGE            PROMPT GARAGE
CREATOR MARKET              PIX CENTRAL            CONTENT DISTRICT
                THE VAULT            SIMULATION CITY
BRAND AVENUE                DEAL ROOM              GROWTH TOWER
                        MUNDO EXTERIOR / CAMPAÑAS
```

### 4. Personajes principales

**Avatar Smith — Maestro de la Forja.** Creador y guardián del nacimiento de influencers. Convierte identidad, apariencia, personalidad y canon en una "forja" visual. Debe sentirse poderoso y artesanal, no como un científico genérico. Función: creación de avatar, identidad y canon. Firma visual: violeta, oro, cuero/metal y energía holográfica. Arquetipo: maestro artesano + mentor. Momento icónico: golpear un núcleo holográfico y hacer aparecer la silueta del nuevo influencer.

**PIX — AI Assistant.** Mascota, guía y sistema de notificaciones. Conecta todo el juego y acompaña al jugador de manera constante. Función: onboarding, alertas, tutoriales, seguimiento de tareas y contexto. Firma visual: blanco, cyan, oro mínimo y rostro digital expresivo. Arquetipo: compañero adorable + copiloto inteligente. Debe ser reconocible incluso como icono de 32–64 px.

**Prompt Mechanic — Mecánica de Prompts.** Especialista de diagnóstico y reparación cuando una producción falla o pierde consistencia. Convierte problemas técnicos en acciones visuales comprensibles. Función: ajustar prompts, corregir identidad, anatomía, pose, styling, cámara o escenario. Firma visual: amarillo, negro, cyan y herramientas digitales. Arquetipo: mecánica ingeniosa + solucionadora. Momento icónico: abrir un prompt como si fuera un motor, sustituir una pieza y volverlo a encender.

### 5. Distritos y localizaciones

- **PIX Central — Núcleo de la Fábrica.** Gran sala circular con un reactor de datos central y anillos elevados. Se ven cápsulas de influencers activos, tareas, campañas y estados de producción. Lobby, tablero vivo y punto de retorno. Elementos: mapa 3D de la fábrica, cápsulas de influencers activos, panel de alertas de PIX, portales/ascensores a distritos, indicadores de ingresos, reputación y capacidad.
- **The Forge — Forja de Avatares.** Híbrido entre herrería fantástica y laboratorio de identidad: núcleos luminosos, yunques holográficos, cápsulas corporales y paredes con rostros, paletas, voces y rasgos. Elementos: yunque de identidad, cámara de cuerpo/rostro, banco de personalidad, estación de voz, sello de canon final.
- **Prompt Garage — Taller de Reparación.** Taller abierto y energético; los prompts aparecen como piezas mecánicas flotantes y las generaciones fallidas se proyectan sobre bancos de trabajo. Elementos: banco de diagnóstico, panel de errores visuales, herramientas de prompt, prueba A/B holográfica, cabina de regeneración.
- **Content District — Distrito de Contenido.** Estudios temáticos conectados por pasarelas; cada edificio es un formato: Reel Studio, Carousel Lab, Photo Stage, Stories Station, sala de revisión de resultados.
- **Simulation City — Ciudad Simulada.** Ciudad viva donde los influencers "existen"; los escenarios cambian según nicho, narrativa y campañas: apartamentos, cafés y restaurantes, parques y calles, gimnasios y wellness, hoteles, aeropuertos y destinos, eventos y nightlife.
- **Brand Avenue.** Avenida corporativa de marcas con vitrinas holográficas y briefs visibles: edificios de marcas, tablón de oportunidades, sala UGC, brief kiosks, reputación por vertical.
- **Deal Room.** Sala premium de negociación con mesa holográfica; los contratos son objetos y cada cláusula puede "encenderse" o alertar riesgo: tarifa base, derechos de uso, exclusividad, duración, entregables, negociación asistida por PIX.
- **Growth Tower.** Torre donde cada piso es una escala de audiencia/negocio y se ilumina al subir de nivel: panel de audiencia, laboratorio de experimentos, comparador de contenido, retención y engagement, nivel comercial.
- **Creator Market.** Mercado modular de recursos desbloqueables: outfits, sets, props, cámaras/estilos visuales, animaciones/emotes, decoración de apartamento.
- **The Vault — Bóveda de Canon.** Zona segura bajo el núcleo; guarda la identidad oficial y detecta drift: referencia visual oficial, voz definitiva, Perfil Maestro, outfits aprobados, activos de marca, historial de decisiones.

### 6. Loop de juego principal (del documento original)

| Etapa | Acción jugable |
|---|---|
| 1. Crear | Entrar a The Forge y crear/seleccionar un influencer. |
| 2. Definir | Construir identidad, estética, voz, nicho y posicionamiento. |
| 3. Producir | Elegir formato en Content District y generar la pieza. |
| 4. Revisar | Corregir fallos con Prompt Mechanic o aprobar producción. |
| 5. Publicar/Simular | Llevar la pieza a Simulation City y activar resultados. |
| 6. Monetizar | Aceptar briefs y negociar en Brand Avenue / Deal Room. |
| 7. Crecer | Analizar rendimiento y lanzar experimentos en Growth Tower. |
| 8. Expandir | Desbloquear nuevos sets, edificios, personajes y capacidad. |

### 7. Progresión (del documento original)

La progresión debe sentirse física: la fábrica crece, se abren alas, aparecen cápsulas y se intensifica la actividad de la ciudad. Niveles: Emerging Creator (0–10K seguidores), Rising Influencer (10K–50K), Professional Creator (50K–250K), Digital Celebrity (250K–1M), Global AI Influencer (1M+).

### 8. Misiones y eventos (del documento original)

Misión de identidad (sin drift visual en tres producciones), misión de producción (carrusel coherente), misión comercial (paquete UGC y derechos de uso), evento de crisis (drift y alerta de The Vault), evento viral, evento de reputación (exclusividad frente a libertad futura).

### 9. Economía y recursos (del documento original)

Créditos, energía de producción, reputación, Insight Points y Canon Integrity (consistencia del influencer).

### 10. UX diegética

La interfaz debe sentirse parte del mundo: hologramas, paneles de vidrio, tablets, consolas y proyecciones. Alertas de PIX cerca del jugador, contratos sobre la mesa de Deal Room, prompts como módulos en Prompt Garage, slides flotando en Carousel Lab, métricas en la arquitectura de Growth Tower.

### 11. Dirección artística

Personajes estilizados premium, proporciones semi-realistas, siluetas claras y tecnología amable. Espectacular sin volverse visualmente ruidoso.

| Elemento | Sí | Evitar |
|---|---|---|
| Iluminación | Clara, volumétrica, neón suave | Oscuridad cyberpunk constante |
| Materiales | Vidrio, metal limpio, polímeros, hologramas | Óxido y suciedad industrial excesiva |
| Color | Blanco + cyan + violeta + acentos dorados | Paleta gris uniforme |
| Personajes | Estilizados, expresivos, icónicos | Realismo genérico sin silueta |
| UI | Diegética y flotante | HUD saturado permanente |

### 12. Audio y atmósfera

PIX Central: ambient electrónico limpio. The Forge: percusión metálica profunda y sintetizadores cálidos. Prompt Garage: percusión ligera, clicks y glitches controlados. Simulation City: música por barrio y horario. Growth Tower: capas que crecen con las métricas.

### 13 a 15. Vertical slice, bocetos y decisiones pendientes

El documento original propone un prototipo con PIX Central navegable, The Forge con creación de influencer, una misión en Prompt Garage, Carousel Lab, una calle de Simulation City, una marca con contrato simple, una Growth Tower mínima y The Vault con alerta de drift; ocho bocetos conceptuales (vista general, PIX Central, The Forge, Prompt Garage, Content District, Simulation City, Brand Avenue y Deal Room, Growth Tower y The Vault); y deja abiertas la perspectiva, el control del avatar, la circulación en Simulation City, el modelo económico y qué partes usan IA real. En Canonia, esas preguntas se responden con las decisiones de la especificación (plataformas, primera versión con los mundos 1 a 3, IA dentro de Claude).
