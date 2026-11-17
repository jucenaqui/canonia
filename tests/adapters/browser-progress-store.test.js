// T090: pruebas de BrowserProgressStore con un almacenamiento simulado (005/FR-014, FR-018, D39).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BrowserProgressStore, STORAGE_KEY } from '../../src/adapters/storage/browser-progress-store.js';

class FakeStorage {
  constructor() { this.data = new Map(); this.failWrites = false; }
  getItem(key) { return this.data.has(key) ? this.data.get(key) : null; }
  setItem(key, value) { if (this.failWrites) throw new Error('QuotaExceededError'); this.data.set(key, String(value)); }
  removeItem(key) { this.data.delete(key); }
}

const GAME = { version: 1, inventory: [{ id: 'niche', content: 'Cocina «casera» 🍳' }], worlds: [], gates: [], playerContext: {}, resume: null };

test('guardar y cargar devuelve la misma partida', async () => {
  const storage = new FakeStorage();
  const store = new BrowserProgressStore({ getStorage: () => storage, version: 1 });
  assert.deepEqual(await store.save(GAME), { ok: true });
  assert.deepEqual(await store.load(), GAME);
});

test('sin partida guardada, load devuelve null', async () => {
  const store = new BrowserProgressStore({ getStorage: () => new FakeStorage(), version: 1 });
  assert.equal(await store.load(), null);
});

test('sin almacenamiento, save devuelve unavailable y no lanza', async () => {
  const throwing = new BrowserProgressStore({ getStorage: () => { throw new Error('SecurityError'); }, version: 1 });
  assert.deepEqual(await throwing.save(GAME), { ok: false, reason: 'unavailable' });
  assert.deepEqual(await throwing.load(), { error: 'unavailable' });
  await throwing.clear();

  const missing = new BrowserProgressStore({ getStorage: () => null, version: 1 });
  assert.deepEqual(await missing.save(GAME), { ok: false, reason: 'unavailable' });
});

test('un error al escribir devuelve unavailable y no lanza', async () => {
  const storage = new FakeStorage();
  storage.failWrites = true;
  const store = new BrowserProgressStore({ getStorage: () => storage, version: 1 });
  assert.deepEqual(await store.save(GAME), { ok: false, reason: 'unavailable' });
});

test('datos ilegibles dan error y no se borran', async () => {
  const storage = new FakeStorage();
  storage.setItem(STORAGE_KEY, '{esto no es json');
  const store = new BrowserProgressStore({ getStorage: () => storage, version: 1 });
  assert.deepEqual(await store.load(), { error: 'unreadable' });
  assert.equal(storage.getItem(STORAGE_KEY), '{esto no es json');

  storage.setItem(STORAGE_KEY, '"solo un texto"');
  assert.deepEqual(await store.load(), { error: 'unreadable' });
});

test('una partida de otra versión da error y no se borra', async () => {
  const storage = new FakeStorage();
  storage.setItem(STORAGE_KEY, JSON.stringify({ ...GAME, version: 2 }));
  const store = new BrowserProgressStore({ getStorage: () => storage, version: 1 });
  assert.deepEqual(await store.load(), { error: 'otherVersion' });
  assert.ok(storage.getItem(STORAGE_KEY));
});

test('clear borra solo la clave del juego', async () => {
  const storage = new FakeStorage();
  storage.setItem('otra-cosa', 'x');
  const store = new BrowserProgressStore({ getStorage: () => storage, version: 1 });
  await store.save(GAME);
  await store.clear();
  assert.equal(storage.getItem(STORAGE_KEY), null);
  assert.equal(storage.getItem('otra-cosa'), 'x');
});

test('el contenido guardado se lee como datos, nunca como código', async () => {
  const storage = new FakeStorage();
  const store = new BrowserProgressStore({ getStorage: () => storage, version: 1 });
  const tricky = { ...GAME, inventory: [{ id: 'niche', content: '<img src=x onerror=alert(1)>' }] };
  await store.save(tricky);
  assert.deepEqual(await store.load(), tricky);
});
