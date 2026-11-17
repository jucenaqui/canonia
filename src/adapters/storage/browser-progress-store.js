// Guardado en el almacenamiento del navegador (T092, D39).
// Cumple ProgressStore (contracts/puertos.md, sección 2). Nunca lanza.
// La partida se guarda como JSON bajo una sola clave y se lee solo con JSON.parse:
// nunca se interpreta como código ni sale del navegador (005/FR-019).

import { STORE_ERRORS } from '../../application/ports.js';

export const STORAGE_KEY = 'canonia.partida';

/** Acceso al almacenamiento del navegador; puede lanzar en ventanas privadas o con datos bloqueados. */
function defaultStorage() {
  return globalThis.localStorage ?? null;
}

export class BrowserProgressStore {
  #getStorage;
  #version;
  #key;

  /**
   * @param {{ getStorage?: () => Storage | null, version: number, key?: string }} options
   */
  constructor({ getStorage = defaultStorage, version, key = STORAGE_KEY }) {
    this.#getStorage = getStorage;
    this.#version = version;
    this.#key = key;
  }

  #storage() {
    try {
      return this.#getStorage() ?? null;
    } catch {
      return null;
    }
  }

  async load() {
    const storage = this.#storage();
    if (!storage) return { error: STORE_ERRORS.UNAVAILABLE };
    let raw;
    try {
      raw = storage.getItem(this.#key);
    } catch {
      return { error: STORE_ERRORS.UNAVAILABLE };
    }
    if (raw === null || raw === undefined) return null;
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return { error: STORE_ERRORS.UNREADABLE };
    }
    if (data === null || typeof data !== 'object' || Array.isArray(data) || typeof data.version !== 'number') {
      return { error: STORE_ERRORS.UNREADABLE };
    }
    if (data.version !== this.#version) return { error: STORE_ERRORS.OTHER_VERSION };
    return data;
  }

  async save(game) {
    const storage = this.#storage();
    if (!storage) return { ok: false, reason: STORE_ERRORS.UNAVAILABLE };
    try {
      storage.setItem(this.#key, JSON.stringify(game));
      return { ok: true };
    } catch {
      return { ok: false, reason: STORE_ERRORS.UNAVAILABLE };
    }
  }

  async clear() {
    try {
      this.#storage()?.removeItem(this.#key);
    } catch {
      // Sin almacenamiento no hay nada que borrar.
    }
  }
}
