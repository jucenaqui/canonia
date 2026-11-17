// Eventos entre el motor y la aplicación (T011).
// Contrato: specs/005-version-jugable-minima/contracts/puertos.md, sección 3.
// El motor no llama al dominio: se comunica con la aplicación solo por estos eventos.
// Ninguno aprueba, cambia ni descarta una pieza (001/FR-018, 002/FR-020).

/** Del motor a la aplicación. */
export const ENGINE_EVENTS = Object.freeze({
  GATE_REACHED: 'gateReached',       // { gateId }
  BOSS_REACHED: 'bossReached',       // { worldId }
  BOSS_DEFEATED: 'bossDefeated',     // { worldId, skipped }
  LEVEL_PAUSED: 'levelPaused',       // {}
  LEVEL_RESUMED: 'levelResumed',     // {}
});

/** De la aplicación al motor. */
export const APP_COMMANDS = Object.freeze({
  RESUME_LEVEL: 'resumeLevel',           // {}
  START_BOSS_FIGHT: 'startBossFight',    // { worldId }
  DENY_BOSS: 'denyBoss',                 // { reason, pieceIds }
  SET_GATE_RESOLVED: 'setGateResolved',  // { gateId }
  WORLD_CLOSED: 'worldClosed',           // { worldId }
});

const KNOWN = new Set([...Object.values(ENGINE_EVENTS), ...Object.values(APP_COMMANDS)]);

/**
 * Emisor simple. Un error en un oyente no impide que los demás reciban el evento.
 * @param {{ onListenerError?: (error: unknown, name: string) => void }} [options]
 */
export function createEventBus({ onListenerError = () => {} } = {}) {
  /** @type {Map<string, Set<Function>>} */
  const listeners = new Map();

  function assertKnown(name) {
    if (!KNOWN.has(name)) throw new Error(`Evento desconocido: ${name}`);
  }

  return {
    /** Suscribe un oyente. Devuelve la función para darse de baja. */
    on(name, listener) {
      assertKnown(name);
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(listener);
      return () => listeners.get(name)?.delete(listener);
    },

    /** Emite un evento con sus datos. */
    emit(name, data = {}) {
      assertKnown(name);
      for (const listener of [...(listeners.get(name) ?? [])]) {
        try {
          listener(data);
        } catch (error) {
          onListenerError(error, name);
        }
      }
    },
  };
}
