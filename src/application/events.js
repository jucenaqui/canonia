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

// --- Mundo 3D (T006). Contrato: specs/006-motor-3d/contracts/eventos-3d.md ---
// Conviven con los del motor 2D hasta la integración (T042). Ninguno aprueba una pieza:
// `chosenForApproval` solo abre la tarjeta y `minigameFinished` solo informa (006/FR-015, FR-043).

/** Del mundo 3D a la aplicación. */
export const WORLD3D_EVENTS = Object.freeze({
  ZONE_ENTERED: 'zoneEntered',                 // { zoneId }
  OPTION_INSPECTED: 'optionInspected',         // { zoneId, optionId }
  MINIGAME_FINISHED: 'minigameFinished',       // { zoneId, optionId, lessonId, trustDelta }
  RECOMMENDATION_ASKED: 'recommendationAsked', // { zoneId, answers }
  CHOSEN_FOR_APPROVAL: 'chosenForApproval',    // { zoneId, optionId } | { zoneId, ownText }
  SPARK_COLLECTED: 'sparkCollected',           // {}
  PLAYER_FAILED: 'playerFailed',               // { reason: 'fall' | 'enemy' }
  LEVEL_PAUSED: ENGINE_EVENTS.LEVEL_PAUSED,
  LEVEL_RESUMED: ENGINE_EVENTS.LEVEL_RESUMED,
});

/** De la aplicación al mundo 3D. */
export const WORLD3D_COMMANDS = Object.freeze({
  OPEN_BRIDGE: 'openBridge',             // { zoneId }
  LIGHT_ZONE: 'lightZone',               // { zoneId }
  MARK_RECOMMENDED: 'markRecommended',   // { zoneId, optionId }
  SET_CHOSEN: 'setChosen',               // { zoneId, optionId }
  SHOW_BOSS: 'showBoss',                 // { worldId }
  SAY: 'say',                            // { textId, vars }
});

/**
 * Datos de `chosenForApproval` a partir de lo que pulsó el jugador en la pantalla de la zona:
 * "Elegir esta" y "Cambiar a esta" dan `{ optionId }`; "Otra", `{ ownText }`. Nunca los dos.
 * Devuelve null si la elección no tiene una de las dos formas. Solo informa: no aprueba.
 * @param {string} zoneId
 * @param {{ optionId?: string, ownText?: string }} choice
 * @returns {{ zoneId: string, optionId: string } | { zoneId: string, ownText: string } | null}
 */
export function chosenForApprovalData(zoneId, choice) {
  if (typeof zoneId !== 'string' || !zoneId) return null;
  const hasOption = typeof choice?.optionId === 'string' && choice.optionId.length > 0;
  const hasOwn = typeof choice?.ownText === 'string' && choice.ownText.length > 0;
  if (hasOption === hasOwn) return null;
  return hasOption ? { zoneId, optionId: choice.optionId } : { zoneId, ownText: choice.ownText };
}

const KNOWN = new Set([
  ...Object.values(ENGINE_EVENTS), ...Object.values(APP_COMMANDS),
  ...Object.values(WORLD3D_EVENTS), ...Object.values(WORLD3D_COMMANDS),
]);

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
