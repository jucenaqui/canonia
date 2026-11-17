// T013: pruebas de Piece (data-model.md, "Piece").

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Piece, PIECE_STATUS, validateContent, MAX_CONTENT_LENGTH } from '../../src/domain/piece.js';
import { NOW } from '../fixtures/world-fixture.js';

const LATER = '2026-11-17T13:00:00.000Z';

function newPiece() {
  return new Piece({ id: 'niche', worldId: 'world-1', dependsOn: ['incomeSource'] });
}

test('una pieza nueva está pendiente y sin contenido inventado (002/FR-028)', () => {
  const piece = newPiece();
  assert.equal(piece.status, PIECE_STATUS.PENDING);
  assert.equal(piece.content, null);
  assert.deepEqual(piece.history, []);
});

test('aprobar guarda exactamente el texto aprobado (002/FR-022)', () => {
  const piece = newPiece();
  const text = '  Cocina casera rápida, para gente de ciudad 🍳  ';
  piece.approve({ content: text, origin: 'player', now: NOW });
  assert.equal(piece.status, PIECE_STATUS.APPROVED);
  assert.equal(piece.content, text);
  assert.equal(piece.origin, 'player');
  assert.equal(piece.approvedAt, NOW);
});

test('aprobar el mismo texto otra vez no crea otra versión (002/FR-023)', () => {
  const piece = newPiece();
  piece.approve({ content: 'Cocina casera', origin: 'ai', now: NOW });
  const result = piece.approve({ content: 'Cocina casera', origin: 'ai', now: LATER });
  assert.equal(result.contentChanged, false);
  assert.deepEqual(piece.history, []);
  assert.equal(piece.approvedAt, NOW);
});

test('la versión reemplazada pasa al historial (002/FR-036)', () => {
  const piece = newPiece();
  piece.approve({ content: 'Cocina casera', origin: 'ai', extras: { publicLabel: 'Cocina' }, now: NOW });
  const result = piece.approve({ content: 'Plantas en balcones', origin: 'aiEdited', now: LATER });
  assert.equal(result.contentChanged, true);
  assert.equal(piece.content, 'Plantas en balcones');
  assert.equal(piece.history.length, 1);
  assert.deepEqual(piece.history[0], {
    content: 'Cocina casera', extras: { publicLabel: 'Cocina' }, origin: 'ai', approvedAt: NOW,
  });
});

test('cambiar solo los extras guarda la versión anterior pero no cuenta como cambio de contenido', () => {
  const piece = newPiece();
  piece.approve({ content: 'Cocina casera', origin: 'ai', extras: { publicLabel: 'Cocina' }, now: NOW });
  const result = piece.approve({ content: 'Cocina casera', origin: 'ai', extras: { publicLabel: 'Cocina fácil' }, now: LATER });
  assert.equal(result.contentChanged, false);
  assert.deepEqual(piece.extras, { publicLabel: 'Cocina fácil' });
  assert.equal(piece.history.length, 1);
});

test('una pieza aprobada pasa a por revisar y, al aprobarla, vuelve a aprobada (002/FR-035)', () => {
  const piece = newPiece();
  piece.approve({ content: 'Cocina casera', origin: 'ai', now: NOW });
  piece.markNeedsReview();
  assert.equal(piece.status, PIECE_STATUS.NEEDS_REVIEW);
  assert.equal(piece.content, 'Cocina casera', 'conserva su contenido (002/FR-033)');
  const result = piece.approve({ content: 'Cocina casera', origin: 'ai', now: LATER });
  assert.equal(piece.status, PIECE_STATUS.APPROVED);
  assert.equal(result.contentChanged, false);
  assert.deepEqual(piece.history, []);
});

test('una pieza pendiente no pasa a por revisar', () => {
  const piece = newPiece();
  piece.markNeedsReview();
  assert.equal(piece.status, PIECE_STATUS.PENDING);
});

test('el contenido no puede ser vacío, de un carácter ni más largo que el máximo (002/FR-015)', () => {
  assert.deepEqual(validateContent(''), { ok: false, reason: 'tooShort' });
  assert.deepEqual(validateContent('   '), { ok: false, reason: 'tooShort' });
  assert.deepEqual(validateContent('a'), { ok: false, reason: 'tooShort' });
  assert.deepEqual(validateContent('x'.repeat(MAX_CONTENT_LENGTH + 1)), { ok: false, reason: 'tooLong' });
  assert.deepEqual(validateContent('x'.repeat(MAX_CONTENT_LENGTH)), { ok: true });
  assert.deepEqual(validateContent(42), { ok: false, reason: 'tooShort' });
});

test('aprobar contenido inválido falla y no cambia la pieza', () => {
  const piece = newPiece();
  piece.approve({ content: 'Cocina casera', origin: 'ai', now: NOW });
  assert.throws(() => piece.approve({ content: ' ', origin: 'player', now: LATER }));
  assert.equal(piece.content, 'Cocina casera');
  assert.equal(piece.status, PIECE_STATUS.APPROVED);
});

test('se guarda y se recupera igual', () => {
  const piece = newPiece();
  piece.approve({ content: 'Cocina casera', origin: 'ai', extras: { publicLabel: 'Cocina' }, now: NOW });
  piece.approve({ content: 'Plantas', origin: 'player', now: LATER });
  const copy = Piece.fromData(JSON.parse(JSON.stringify(piece.toData())));
  assert.deepEqual(copy.toData(), piece.toData());
});
