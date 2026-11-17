// Inventario del influencer (T017). data-model.md, "Inventory".

import { Piece, PIECE_STATUS, DomainError } from './piece.js';

function checkDefinitions(pieces) {
  const ids = new Set();
  for (const piece of pieces) {
    if (ids.has(piece.id)) throw new DomainError('invalidInventory', `Pieza repetida: ${piece.id}`);
    ids.add(piece.id);
  }
  for (const piece of pieces) {
    for (const dependency of piece.dependsOn) {
      if (!ids.has(dependency)) throw new DomainError('invalidInventory', `${piece.id} depende de una pieza desconocida: ${dependency}`);
    }
  }
  // Sin ciclos: recorrido en profundidad con marcas.
  const byId = new Map(pieces.map((p) => [p.id, p]));
  const state = new Map();
  const visit = (id) => {
    if (state.get(id) === 'done') return;
    if (state.get(id) === 'visiting') throw new DomainError('invalidInventory', `Dependencia en ciclo en ${id}`);
    state.set(id, 'visiting');
    for (const dependency of byId.get(id).dependsOn) visit(dependency);
    state.set(id, 'done');
  };
  for (const id of ids) visit(id);
}

export class Inventory {
  /** @param {Piece[]} pieces */
  constructor(pieces) {
    checkDefinitions(pieces);
    /** @type {Map<string, Piece>} */
    this.pieces = new Map(pieces.map((piece) => [piece.id, piece]));
  }

  /** Inventario nuevo, con todas las piezas pendientes. */
  static fromDefinitions(definitions) {
    return new Inventory(definitions.map(({ id, worldId, dependsOn }) => new Piece({ id, worldId, dependsOn })));
  }

  static fromData(data) {
    return new Inventory(data.map((pieceData) => Piece.fromData(pieceData)));
  }

  toData() {
    return this.list().map((piece) => piece.toData());
  }

  get(pieceId) {
    const piece = this.pieces.get(pieceId);
    if (!piece) throw new DomainError('unknownPiece', `Pieza desconocida: ${pieceId}`);
    return piece;
  }

  has(pieceId) {
    return this.pieces.has(pieceId);
  }

  list() {
    return [...this.pieces.values()];
  }

  /**
   * Aprueba una pieza. Si su contenido cambió, marca por revisar las aprobadas que dependen
   * de ella, directa o indirectamente (002/FR-033). Nunca borra nada (002/FR-034).
   * @returns {{ contentChanged: boolean, markedForReview: string[] }}
   */
  approve(pieceId, { content, origin, extras, now }) {
    const { contentChanged } = this.get(pieceId).approve({ content, origin, extras, now });
    const markedForReview = [];
    if (contentChanged) {
      for (const dependentId of this.dependentsOf(pieceId)) {
        if (this.get(dependentId).markNeedsReview()) markedForReview.push(dependentId);
      }
    }
    return { contentChanged, markedForReview };
  }

  /** Piezas que dependen de una dada, directa o indirectamente (002/FR-031). */
  dependentsOf(pieceId) {
    this.get(pieceId);
    const found = new Set();
    const pending = [pieceId];
    while (pending.length > 0) {
      const current = pending.pop();
      for (const piece of this.pieces.values()) {
        if (piece.dependsOn.includes(current) && !found.has(piece.id)) {
          found.add(piece.id);
          pending.push(piece.id);
        }
      }
    }
    return this.list().filter((piece) => found.has(piece.id)).map((piece) => piece.id);
  }

  piecesOfWorld(worldId) {
    return this.list().filter((piece) => piece.worldId === worldId);
  }

  pendingIds(worldId) {
    return this.piecesOfWorld(worldId).filter((p) => p.status === PIECE_STATUS.PENDING).map((p) => p.id);
  }

  needsReviewIds(worldId) {
    return this.piecesOfWorld(worldId).filter((p) => p.status === PIECE_STATUS.NEEDS_REVIEW).map((p) => p.id);
  }

  hasPending(worldId) {
    return this.pendingIds(worldId).length > 0;
  }

  hasNeedsReview(worldId) {
    return this.needsReviewIds(worldId).length > 0;
  }
}
