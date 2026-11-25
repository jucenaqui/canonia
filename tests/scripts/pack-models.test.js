// Pruebas del empaquetado de modelos (T002, T004).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseGlb, buildGlb, keepAnimationOnly } from '../../scripts/pack-models.js';

const model = name => readFile(new URL(`../../assets/models/${name}.glb`, import.meta.url));

test('un GLB se lee y se vuelve a armar sin perder datos', async () => {
  const bytes = await model('pix');
  const { json, bin } = parseGlb(bytes);
  const again = parseGlb(buildGlb(json, bin));
  assert.deepEqual(again.json, json);
  assert.equal(again.bin.length >= bin.length, true);
});

test('la animación del protagonista queda sin malla ni textura, con todas sus pistas', async () => {
  const { json, bin } = parseGlb(await model('heroe-saltar'));
  const slim = keepAnimationOnly(json, bin);
  for (const key of ['meshes', 'materials', 'textures', 'images']) assert.equal(slim.json[key], undefined, key);
  assert.equal(slim.json.animations.length, json.animations.length);
  assert.equal(slim.json.animations[0].channels.length, json.animations[0].channels.length);
  assert.equal(slim.json.nodes.length, json.nodes.length);
  assert.ok(slim.bin.length < bin.length / 2, 'debe pesar mucho menos');
  for (const sampler of slim.json.animations[0].samplers) {
    const accessor = slim.json.accessors[sampler.output];
    const view = slim.json.bufferViews[accessor.bufferView];
    assert.ok(view.byteOffset + view.byteLength <= slim.bin.length);
  }
});

test('las animaciones conservan los nombres de los huesos del modelo que corre', async () => {
  const run = parseGlb(await model('heroe-correr')).json;
  const jump = keepAnimationOnly(...Object.values(parseGlb(await model('heroe-saltar')))).json;
  const runBones = new Set(run.nodes.map(n => n.name));
  for (const channel of jump.animations[0].channels) assert.ok(runBones.has(jump.nodes[channel.target.node].name));
});
