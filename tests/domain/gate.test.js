// T015 (puerta): pruebas de Gate (data-model.md, "Gate" y "Option").

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Gate, GATE_STATUS } from '../../src/domain/gate.js';

function newGate() {
  return new Gate({ id: 'niche', worldId: 'world-1', pieceId: 'niche' });
}

const OPTIONS = [
  { text: 'Cocina casera', pros: 'Cercano', risks: 'Mucha competencia', recommended: true },
  { text: 'Plantas', pros: 'Visual', risks: 'Lento', recommended: false },
  { text: 'Viajes cortos', pros: 'Variado', risks: 'Costoso', recommended: false },
];

test('una puerta nueva está sin resolver y sin opciones', () => {
  const gate = newGate();
  assert.equal(gate.status, GATE_STATUS.UNRESOLVED);
  assert.equal(gate.lessonSeen, false);
  assert.deepEqual(gate.shownOptions, []);
});

test('la mini lección queda registrada una sola vez (002/FR-003)', () => {
  const gate = newGate();
  assert.equal(gate.completeLesson(), true);
  assert.equal(gate.completeLesson(), false);
  assert.equal(gate.lessonSeen, true);
});

test('guarda todas las opciones mostradas para poder volver a ellas (002/FR-011)', () => {
  const gate = newGate();
  gate.addOptions(OPTIONS, 'ai');
  gate.addOptions([{ text: 'Moda sostenible', pros: 'Actual', risks: 'Nicho saturado', recommended: true }], 'ai');
  assert.equal(gate.shownOptions.length, 4);
  assert.deepEqual(gate.shownTexts(), ['Cocina casera', 'Plantas', 'Viajes cortos', 'Moda sostenible']);
  assert.equal(gate.shownOptions[0].source, 'ai');
});

test('no repite una opción ya mostrada', () => {
  const gate = newGate();
  gate.addOptions(OPTIONS, 'ai');
  const added = gate.addOptions([{ ...OPTIONS[0] }, { text: 'Nueva', pros: 'a', risks: 'b', recommended: false }], 'ai');
  assert.equal(added.length, 1);
  assert.equal(gate.shownOptions.length, 4);
});

test('una puerta resuelta no vuelve atrás (001/FR-019)', () => {
  const gate = newGate();
  gate.resolve();
  assert.equal(gate.status, GATE_STATUS.RESOLVED);
  assert.equal(gate.resolve(), false, 'resolver otra vez no cambia nada');
  assert.equal(typeof gate.unresolve, 'undefined', 'no existe una operación para volver atrás');
});

test('se guarda y se recupera igual', () => {
  const gate = newGate();
  gate.completeLesson();
  gate.addOptions(OPTIONS, 'ai');
  const copy = Gate.fromData(JSON.parse(JSON.stringify(gate.toData())));
  assert.deepEqual(copy.toData(), gate.toData());
});
