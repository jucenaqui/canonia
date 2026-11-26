// Dron de spam (T036, spec 006/FR-029; D49): recorre su camino de ida y vuelta; tocarlo de lado empuja al
// personaje y cuenta como fallo; caerle encima lo vence (rebote), desaparece y reaparece al minuto.
// La lógica del contacto está en enemy-math.js. Aquí solo se dibuja y se aplican los efectos al cuerpo.

import { THREE } from './three.js';
import { placeModel } from './assets.js';
import {
  ENEMY, patrolPosition, knockbackFrom, createEnemyState, defeatEnemy, tickEnemy,
  createInvulnerability, startInvulnerability, tickInvulnerability, isInvulnerable, resolveEnemyContact,
} from './enemy-math.js';

/**
 * @param {object} options
 * @param {THREE.Scene} options.scene
 * @param {ReturnType<import('./assets.js').createAssetLoader>} options.loader
 * @param {object[]} options.enemies Datos de layout.js (`enemies`).
 * @param {(reason: 'enemy') => void} [options.onHit] El dron empujó al personaje.
 * @param {() => void} [options.onDefeat] El personaje venció a un dron.
 */
export function createEnemies({ scene, loader, enemies, onHit = () => {}, onDefeat = () => {} }) {
  const invulnerability = createInvulnerability();
  let prevY = null; // altura de los pies en el cuadro anterior
  let speedScale = 1; // ayuda (T040): el dron va más lento mientras dura "hacerlo más fácil"
  const items = enemies.map((spec) => {
    const group = new THREE.Group();
    // Forma de reserva mientras llega el modelo: una esfera con un ojo rojo.
    const fallback = new THREE.Group();
    const shell = new THREE.Mesh(new THREE.SphereGeometry(spec.height * 0.45, 18, 14), new THREE.MeshStandardMaterial({ color: 0x5a4a78, metalness: 0.5, roughness: 0.35 }));
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 8), new THREE.MeshStandardMaterial({ color: 0xff4d5a, emissive: 0xff2a3a, emissiveIntensity: 1.4 }));
    eye.position.set(0, 0, spec.height * 0.4);
    fallback.add(shell, eye);
    fallback.position.y = spec.height / 2;
    group.add(fallback);
    scene.add(group);
    return {
      spec, group, fallback, scale: 1, clock: 0, // reloj propio: cambiar la velocidad no hace saltar al dron
      state: createEnemyState(spec.respawnSeconds ?? ENEMY.RESPAWN),
      pos: { x: spec.path[0].x, y: spec.base, z: spec.path[0].z },
      dir: { dirX: 0, dirZ: 1 },
    };
  });

  async function loadModels() {
    const gltf = await loader.load('spam');
    if (!gltf) return;
    for (const item of items) {
      item.group.add(placeModel(gltf, item.spec.height, { ground: true }));
      item.fallback.visible = false;
    }
  }

  return {
    loadModels,
    /** ¿El personaje está en sus segundos de invulnerabilidad? (para que parpadee) */
    get invulnerable() { return isInvulnerable(invulnerability); },
    /**
     * @param {number} time segundos de juego
     * @param {number} dt
     * @param {ReturnType<import('./physics3d.js').createBody>} body Se modifica al empujar o rebotar.
     * @param {boolean} [paused] Con una pantalla abierta el dron sigue, pero no toca.
     */
    update(time, dt, body, paused = false) {
      tickInvulnerability(invulnerability, dt);
      for (const item of items) {
        const alivePrev = item.state.alive;
        tickEnemy(item.state, dt);
        item.clock += dt * speedScale;
        const p = patrolPosition(item.spec.path, item.spec.speed, item.clock, item.spec.pause);
        item.dir = p;
        item.pos.x = p.x; item.pos.z = p.z;
        item.pos.y = item.spec.base + Math.sin(time * 3 + item.spec.path[0].x) * 0.06;
        item.group.position.set(item.pos.x, item.pos.y, item.pos.z);
        item.group.rotation.y = Math.atan2(p.dirX, p.dirZ);
        // Vencido: se encoge y desaparece. Al reaparecer, vuelve a crecer.
        const target = item.state.alive ? 1 : 0;
        item.scale += (target - item.scale) * Math.min(1, dt * 10);
        if (Math.abs(target - item.scale) < 0.01) item.scale = target;
        item.group.visible = item.scale > 0;
        item.group.scale.setScalar(Math.max(0.001, item.scale));
        if (paused || !alivePrev || !item.state.alive) continue;
        const contact = resolveEnemyContact({ body, enemy: item.pos, state: item.state, invulnerability, prevY: prevY ?? body.y });
        if (contact === 'stomp') {
          defeatEnemy(item.state);
          body.vy = ENEMY.BOUNCE;
          body.forcedLift = true;
          body.onGround = false;
          body.coyote = 0;
          onDefeat();
        } else if (contact === 'side') {
          const knock = knockbackFrom(body, item.pos, item.dir);
          body.vx = knock.vx; body.vz = knock.vz; body.vy = knock.vy;
          body.onGround = false;
          startInvulnerability(invulnerability);
          onHit('enemy');
        }
      }
    },
    /** 1 = velocidad normal; menos = más lento (T040). */
    setSpeedScale(scale) { speedScale = Math.max(0.1, Number(scale) || 1); },
    /** Se llama al final de cada cuadro. */
    endFrame(body) { prevY = body.y; },
    destroy() { for (const item of items) scene.remove(item.group); },
  };
}
