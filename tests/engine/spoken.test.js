import test from 'node:test';
import assert from 'node:assert/strict';
import { createSpokenSet, shouldSayPlayed } from '../../src/presentation/world3d/zone-math.js';

test('spoken set remembers keys', () => {
  const s = createSpokenSet();
  assert.equal(s.has('a'), false);
  s.add('a');
  assert.equal(s.has('a'), true);
});

test('shouldSayPlayed only when played, not chosen, close silent and not said', () => {
  const base = { played: true, chosen: false, closeSpoke: false, alreadySaid: false };
  assert.equal(shouldSayPlayed(base), true);
  assert.equal(shouldSayPlayed({ ...base, played: false }), false);
  assert.equal(shouldSayPlayed({ ...base, chosen: true }), false);
  assert.equal(shouldSayPlayed({ ...base, closeSpoke: true }), false);
  assert.equal(shouldSayPlayed({ ...base, alreadySaid: true }), false);
});

test('focus memory: repeats only after another object was focused (D62)', async () => {
  const { createFocusMemory } = await import('../../src/presentation/world3d/zone-math.js');
  const f = createFocusMemory();
  assert.equal(f.shouldSay('a'), true);
  assert.equal(f.shouldSay('a'), false); // cerrar su pantalla o quedarse junto a ella
  assert.equal(f.shouldSay('b'), true);
  assert.equal(f.shouldSay('a'), true); // volvió tras ir a otra
  assert.equal(f.shouldSay('a'), false);
});

test('introMode asks for the first tap only when audio is blocked just by that (D62)', async () => {
  const { introMode } = await import('../../src/presentation/world3d/zone-math.js');
  assert.equal(introMode({ muted: false, unlocked: false, supported: true }), 'ask');
  assert.equal(introMode({ muted: false, unlocked: true, supported: true }), 'voice');
  assert.equal(introMode({ muted: true, unlocked: false, supported: true }), 'card');
  assert.equal(introMode({ muted: true, unlocked: true, supported: true }), 'card');
  assert.equal(introMode({ muted: false, unlocked: false, supported: false }), 'card');
  assert.equal(introMode({ muted: false, unlocked: true, supported: false }), 'card');
});

test('shouldPresentZone only the first time, with intro, not approved (D62)', async () => {
  const { shouldPresentZone } = await import('../../src/presentation/world3d/zone-math.js');
  const base = { seen: false, approved: false, hasIntro: true };
  assert.equal(shouldPresentZone(base), true);
  assert.equal(shouldPresentZone({ ...base, seen: true }), false);
  assert.equal(shouldPresentZone({ ...base, approved: true }), false);
  assert.equal(shouldPresentZone({ ...base, hasIntro: false }), false);
});
