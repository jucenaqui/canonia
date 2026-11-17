// T024: composición en main.js. Elige el modo de IA y el guardado según el entorno.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectAiMode, chooseStore, composeApp } from '../../src/main.js';
import { BrowserProgressStore } from '../../src/adapters/storage/browser-progress-store.js';
import { MemoryProgressStore } from '../../src/adapters/storage/memory-progress-store.js';
import { isAiPort } from '../../src/application/ports.js';
import { CONTENT } from '../fixtures/world-fixture.js';

class FakeStorage {
  constructor() { this.data = new Map(); }
  getItem(k) { return this.data.get(k) ?? null; }
  setItem(k, v) { this.data.set(k, String(v)); }
  removeItem(k) { this.data.delete(k); }
}

test('fuera de Claude, modo de demostración', async () => {
  assert.equal((await detectAiMode({})).mode, 'demo');
});

test('dentro de Claude sin IA en la página, modo guía (005/FR-006)', async () => {
  assert.equal((await detectAiMode({ claude: { use: async () => null } })).mode, 'guide');
  assert.equal((await detectAiMode({ claude: { use: async () => { throw new Error('x'); } } })).mode, 'guide');
});

test('dentro de Claude con IA en la página, modo directo', async () => {
  const sample = async () => ({ text: '' });
  assert.equal((await detectAiMode({ claude: { use: async (name) => (name === 'sample' ? sample : null) } })).mode, 'direct');
});

test('usa el navegador si deja guardar; si no, memoria', async () => {
  const ok = await chooseStore({ getStorage: () => new FakeStorage() });
  assert.ok(ok.store instanceof BrowserProgressStore);
  assert.equal(ok.storageAvailable, true);
  const blocked = await chooseStore({ getStorage: () => { throw new Error('SecurityError'); } });
  assert.ok(blocked.store instanceof MemoryProgressStore);
  assert.equal(blocked.storageAvailable, false);
});

test('compone eventos, IA, guardado y, con contenido, la sesión', async () => {
  const app = await composeApp({ env: {}, content: CONTENT, getStorage: () => new FakeStorage() });
  assert.ok(isAiPort(app.ai));
  assert.equal(app.aiMode, 'demo');
  assert.equal(typeof app.events.emit, 'function');
  assert.equal(app.session.inventory.list().length, 5);
  assert.equal((await composeApp({ env: {}, getStorage: () => new FakeStorage() })).session, null);
});
