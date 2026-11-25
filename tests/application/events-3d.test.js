// T006: eventos del mundo 3D (specs/006-motor-3d/contracts/eventos-3d.md).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createEventBus, WORLD3D_EVENTS, WORLD3D_COMMANDS, ENGINE_EVENTS } from '../../src/application/events.js';

test('el contrato del mundo 3D tiene exactamente sus eventos y comandos', () => {
  assert.deepEqual(Object.values(WORLD3D_EVENTS).sort(), [
    'chosenForApproval', 'levelPaused', 'levelResumed', 'minigameFinished', 'optionInspected',
    'playerFailed', 'recommendationAsked', 'sparkCollected', 'zoneEntered',
  ]);
  assert.deepEqual(Object.values(WORLD3D_COMMANDS).sort(), ['lightZone', 'markRecommended', 'openBridge', 'say', 'setChosen', 'showBoss']);
});

test('ningún evento del mundo 3D es una orden de aprobar, reabrir o descartar', () => {
  // `chosenForApproval` solo abre la tarjeta: el nombre empieza por "chosen", no es una orden.
  for (const name of Object.values(WORLD3D_EVENTS)) assert.doesNotMatch(name, /^(approve|reopen|discard|setPiece)/i);
});

test('la pausa es el mismo evento en el motor 2D y en el mundo 3D', () => {
  assert.equal(WORLD3D_EVENTS.LEVEL_PAUSED, ENGINE_EVENTS.LEVEL_PAUSED);
  assert.equal(WORLD3D_EVENTS.LEVEL_RESUMED, ENGINE_EVENTS.LEVEL_RESUMED);
});

test('el bus acepta los eventos del mundo 3D y entrega sus datos', () => {
  const bus = createEventBus();
  const seen = [];
  bus.on(WORLD3D_EVENTS.MINIGAME_FINISHED, (data) => seen.push(data));
  bus.emit(WORLD3D_EVENTS.MINIGAME_FINISHED, { zoneId: 'incomeSource', optionId: 'ugc', lessonId: 'ugc-1', trustDelta: 0 });
  bus.emit(WORLD3D_COMMANDS.OPEN_BRIDGE, { zoneId: 'niche' });
  assert.deepEqual(seen, [{ zoneId: 'incomeSource', optionId: 'ugc', lessonId: 'ugc-1', trustDelta: 0 }]);
  assert.throws(() => bus.emit('approvePiece', {}));
});
