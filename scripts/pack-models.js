// Empaqueta los modelos 3D para la página publicada dentro de Claude (T002, T004).
//
// La página publicada no sirve archivos .glb, así que cada modelo de assets/models/ se convierte en
// un archivo .js que guarda el modelo en base64 en window.CANONIA_MODELS[nombre]. El juego lo lee
// con assets.js y lo pasa al cargador de three.js.
//
// Las animaciones del protagonista (heroe-quieto, heroe-saltar) traen otra vez la misma malla y la
// misma textura que heroe-correr. Aquí se les quita todo menos el esqueleto y la animación, porque
// el juego aplica esas animaciones al modelo de heroe-correr.
//
// Uso:  node scripts/pack-models.js
// Salida: assets/models/packed/<nombre>.js (no se guarda en git; se genera antes de publicar).

import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets', 'models');
const OUT = path.join(SRC, 'packed');
export const ANIMATION_ONLY = new Set(['heroe-quieto', 'heroe-saltar']);

const GLB_MAGIC = 0x46546c67;
const CHUNK_JSON = 0x4e4f534a;
const CHUNK_BIN = 0x004e4942;

/** Lee un GLB y devuelve su JSON y su bloque binario. */
export function parseGlb(buffer) {
  if (buffer.readUInt32LE(0) !== GLB_MAGIC) throw new Error('No es un archivo GLB');
  let offset = 12;
  let json = null;
  let bin = Buffer.alloc(0);
  while (offset < buffer.length) {
    const length = buffer.readUInt32LE(offset);
    const type = buffer.readUInt32LE(offset + 4);
    const chunk = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === CHUNK_JSON) json = JSON.parse(chunk.toString('utf8').replace(/[\s\0]+$/, ''));
    else if (type === CHUNK_BIN) bin = chunk;
    offset += 8 + length;
  }
  if (!json) throw new Error('El GLB no tiene bloque JSON');
  return { json, bin };
}

/** Arma un GLB a partir de su JSON y su bloque binario. */
export function buildGlb(json, bin) {
  let jsonBytes = Buffer.from(JSON.stringify(json), 'utf8');
  const jsonPad = (4 - (jsonBytes.length % 4)) % 4;
  jsonBytes = Buffer.concat([jsonBytes, Buffer.alloc(jsonPad, 0x20)]);
  const binPad = (4 - (bin.length % 4)) % 4;
  const binBytes = Buffer.concat([bin, Buffer.alloc(binPad, 0)]);
  const header = Buffer.alloc(12);
  header.writeUInt32LE(GLB_MAGIC, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonBytes.length + 8 + binBytes.length, 8);
  const jsonHead = Buffer.alloc(8);
  jsonHead.writeUInt32LE(jsonBytes.length, 0);
  jsonHead.writeUInt32LE(CHUNK_JSON, 4);
  const binHead = Buffer.alloc(8);
  binHead.writeUInt32LE(binBytes.length, 0);
  binHead.writeUInt32LE(CHUNK_BIN, 4);
  return Buffer.concat([header, jsonHead, jsonBytes, binHead, binBytes]);
}

/** Deja en el GLB solo nodos, esqueleto y animaciones (sin mallas, materiales ni imágenes). */
export function keepAnimationOnly(json, bin) {
  const used = new Set();
  for (const animation of json.animations || []) {
    for (const sampler of animation.samplers) { used.add(sampler.input); used.add(sampler.output); }
  }
  for (const skin of json.skins || []) if (skin.inverseBindMatrices !== undefined) used.add(skin.inverseBindMatrices);

  const accessorMap = new Map();
  const accessors = [];
  [...used].sort((a, b) => a - b).forEach(oldIndex => { accessorMap.set(oldIndex, accessors.length); accessors.push({ ...json.accessors[oldIndex] }); });

  const viewMap = new Map();
  const views = [];
  const parts = [];
  let length = 0;
  for (const accessor of accessors) {
    if (accessor.bufferView === undefined) continue;
    if (!viewMap.has(accessor.bufferView)) {
      const view = json.bufferViews[accessor.bufferView];
      const start = view.byteOffset || 0;
      const slice = bin.subarray(start, start + view.byteLength);
      const pad = (4 - (length % 4)) % 4;
      if (pad) { parts.push(Buffer.alloc(pad)); length += pad; }
      viewMap.set(accessor.bufferView, views.length);
      views.push({ ...view, buffer: 0, byteOffset: length });
      parts.push(slice);
      length += slice.length;
    }
    accessor.bufferView = viewMap.get(accessor.bufferView);
  }

  const out = { ...json };
  out.accessors = accessors;
  out.bufferViews = views;
  out.buffers = [{ byteLength: length }];
  out.animations = (json.animations || []).map(a => ({ ...a, samplers: a.samplers.map(s => ({ ...s, input: accessorMap.get(s.input), output: accessorMap.get(s.output) })) }));
  out.skins = (json.skins || []).map(s => (s.inverseBindMatrices === undefined ? s : { ...s, inverseBindMatrices: accessorMap.get(s.inverseBindMatrices) }));
  out.nodes = json.nodes.map(node => { const copy = { ...node }; delete copy.mesh; delete copy.skin; return copy; });
  for (const key of ['meshes', 'materials', 'textures', 'images', 'samplers']) delete out[key];
  return { json: out, bin: Buffer.concat(parts) };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(SRC)).filter(f => f.endsWith('.glb'));
  let total = 0;
  for (const file of files) {
    const name = file.replace(/\.glb$/, '');
    let bytes = await readFile(path.join(SRC, file));
    if (ANIMATION_ONLY.has(name)) {
      const { json, bin } = parseGlb(bytes);
      const slim = keepAnimationOnly(json, bin);
      bytes = buildGlb(slim.json, slim.bin);
    }
    const js = `window.CANONIA_MODELS=window.CANONIA_MODELS||{};window.CANONIA_MODELS[${JSON.stringify(name)}]="${bytes.toString('base64')}";\n`;
    await writeFile(path.join(OUT, `${name}.js`), js);
    total += js.length;
    console.log(`${name}: ${Math.round(bytes.length / 1024)} KB`);
  }
  console.log(`Total empaquetado: ${(total / 1024 / 1024).toFixed(1)} MB en ${files.length} archivos`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
