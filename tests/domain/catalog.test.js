// T008: opciones de la lista explícita de la factoría (origen "catalog", plan 006, decisión 3).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Gate, OPTION_SOURCE } from '../../src/domain/gate.js';
import { Piece, PIECE_ORIGIN, PIECE_STATUS } from '../../src/domain/piece.js';
import { NOW } from '../fixtures/world-fixture.js';

const CATALOG = [
  { text: 'UGC AI para marcas', recommended: false },
  { text: 'Marketing de afiliados', recommended: false },
  { text: 'Productos digitales', recommended: false },
];

test('existe el origen "catalog" para opciones y piezas', () => {
  assert.equal(OPTION_SOURCE.CATALOG, 'catalog');
  assert.equal(PIECE_ORIGIN.CATALOG, 'catalog');
});

test('una zona guarda las opciones de la lista de la factoría con su origen', () => {
  const gate = new Gate({ id: 'incomeSource', worldId: 'world-1', pieceId: 'incomeSource' });
  gate.addOptions(CATALOG, OPTION_SOURCE.CATALOG);
  assert.deepEqual(gate.shownOptions.map((o) => o.source), ['catalog', 'catalog', 'catalog']);
  const again = Gate.fromData(JSON.parse(JSON.stringify(gate.toData())));
  assert.equal(again.shownOptions[0].source, 'catalog');
});

test('una opción de la lista se aprueba igual que una de la IA y conserva su origen', () => {
  const piece = new Piece({ id: 'incomeSource', worldId: 'world-1' });
  piece.approve({ content: 'UGC AI para marcas', origin: PIECE_ORIGIN.CATALOG, now: NOW });
  assert.equal(piece.status, PIECE_STATUS.APPROVED);
  assert.equal(piece.origin, 'catalog');
  assert.equal(Piece.fromData(piece.toData()).origin, 'catalog');
});

test('un origen desconocido sigue sin aceptarse', () => {
  const piece = new Piece({ id: 'incomeSource', worldId: 'world-1' });
  assert.throws(() => piece.approve({ content: 'UGC AI para marcas', origin: 'minijuego', now: NOW }));
});
