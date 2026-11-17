// Guardado en memoria (T020). Para pruebas y como respaldo si el navegador no deja guardar.
// Cumple ProgressStore (contracts/puertos.md, sección 2).

export class MemoryProgressStore {
  #saved = null;

  async load() {
    return this.#saved === null ? null : structuredClone(this.#saved);
  }

  async save(game) {
    this.#saved = structuredClone(game);
    return { ok: true };
  }

  async clear() {
    this.#saved = null;
  }
}
