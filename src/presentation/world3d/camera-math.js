// Cálculos de la cámara detrás del personaje, sin three.js, para poder probarlos en Node (T012).
// spec 006/FR-006: cámara detrás y un poco por encima, con movimiento suave.

/** Distancia y altura de la cámara. En pantallas verticales se aleja un poco para ver más. */
export const CAMERA = Object.freeze({ distance: 7, height: 3.8, lookHeight: 1.3, portraitFactor: 1.35, smoothing: 0.002, closeDistance: 0.5, closeHeight: 0.55 });

/**
 * Inclinación vertical de la cámara. `pitch` es un desvío, en radianes, sobre el ángulo normal
 * (0 = como siempre; positivo = más desde arriba). La elevación final se limita entre casi a ras
 * del suelo (mirando un poco hacia arriba) y una vista casi cenital de unos 72 grados.
 */
export const PITCH = Object.freeze({
  minElevation: -0.14,
  maxElevation: 1.26,
  minHeightAboveFeet: 0.4,
  lowLookLift: 2.2,
  idleSeconds: 4,
  returnPerSecond: 0.6,
});
/** Desvíos que el estado de la cámara puede acumular (con el ángulo normal en la vertical por defecto). */
const BASE_ELEVATION = Math.atan2(CAMERA.height - CAMERA.lookHeight, CAMERA.distance);
export const PITCH_RANGE = Object.freeze({ min: PITCH.minElevation - BASE_ELEVATION, max: PITCH.maxElevation - BASE_ELEVATION });

/** Limita un desvío de inclinación a lo que la cámara admite. */
export function clampPitch(pitch) {
  return Math.min(PITCH_RANGE.max, Math.max(PITCH_RANGE.min, Number.isFinite(pitch) ? pitch : 0));
}

/**
 * Posición a la que debe ir la cámara y punto al que mira.
 * @param {{ x: number, y: number, z: number }} player
 * @param {number} yaw Giro de la cámara alrededor del personaje, en radianes (0 = mirando hacia -z).
 * @param {number} aspect Ancho entre alto de la pantalla.
 * @param {number} [closeUp] De 0 (cámara normal) a 1 (acercada, para la presentación de PIX, D62).
 * @param {number} [pitch] Desvío vertical en radianes sobre el ángulo normal (0 = normal).
 */
export function cameraTarget(player, yaw, aspect, closeUp = 0, pitch = 0) {
  const far = aspect < 1 ? CAMERA.portraitFactor : 1;
  const k = Math.min(1, Math.max(0, closeUp));
  const dist = CAMERA.distance * far * (1 - k * (1 - CAMERA.closeDistance));
  const high = CAMERA.height * far * (1 - k * (1 - CAMERA.closeHeight));
  const rise = high - CAMERA.lookHeight;
  const radius = Math.hypot(dist, rise);
  const elevation = Math.min(PITCH.maxElevation, Math.max(PITCH.minElevation, Math.atan2(rise, dist) + (Number.isFinite(pitch) ? pitch : 0)));
  // Al mirar bajo, el punto de mira sube un poco para que se vean el cielo y lo alto de los edificios.
  const lift = elevation < 0 ? (-elevation / -PITCH.minElevation) * PITCH.lowLookLift : 0;
  const lookY = player.y + CAMERA.lookHeight;
  const horizontal = Math.cos(elevation) * radius;
  return {
    position: {
      x: player.x + Math.sin(yaw) * horizontal,
      y: Math.max(player.y + PITCH.minHeightAboveFeet, lookY + Math.sin(elevation) * radius),
      z: player.z + Math.cos(yaw) * horizontal,
    },
    lookAt: { x: player.x, y: lookY + lift, z: player.z },
  };
}

/**
 * Fracción del camino que la cámara recorre en este paso, igual a cualquier velocidad de pantalla.
 * @param {number} dt Segundos desde el cuadro anterior.
 */
export function followFactor(dt) {
  return 1 - Math.pow(CAMERA.smoothing, Math.max(0, dt));
}

/** Dirección "adelante" y "derecha" en el suelo para un giro de cámara dado. */
export function groundAxes(yaw) {
  return {
    forward: { x: -Math.sin(yaw), z: -Math.cos(yaw) },
    right: { x: Math.cos(yaw), z: -Math.sin(yaw) },
  };
}
