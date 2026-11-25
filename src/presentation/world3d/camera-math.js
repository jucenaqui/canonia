// Cálculos de la cámara detrás del personaje, sin three.js, para poder probarlos en Node (T012).
// spec 006/FR-006: cámara detrás y un poco por encima, con movimiento suave.

/** Distancia y altura de la cámara. En pantallas verticales se aleja un poco para ver más. */
export const CAMERA = Object.freeze({ distance: 7, height: 3.8, lookHeight: 1.3, portraitFactor: 1.35, smoothing: 0.002 });

/**
 * Posición a la que debe ir la cámara y punto al que mira.
 * @param {{ x: number, y: number, z: number }} player
 * @param {number} yaw Giro de la cámara alrededor del personaje, en radianes (0 = mirando hacia -z).
 * @param {number} aspect Ancho entre alto de la pantalla.
 */
export function cameraTarget(player, yaw, aspect) {
  const far = aspect < 1 ? CAMERA.portraitFactor : 1;
  return {
    position: {
      x: player.x + Math.sin(yaw) * CAMERA.distance * far,
      y: player.y + CAMERA.height * far,
      z: player.z + Math.cos(yaw) * CAMERA.distance * far,
    },
    lookAt: { x: player.x, y: player.y + CAMERA.lookHeight, z: player.z },
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
