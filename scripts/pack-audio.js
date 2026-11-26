// Empaqueta las frases de PIX para la página publicada dentro de Claude.
//
// La página publicada no deja reproducir archivos .mp3 servidos, pero sí cargar scripts .js (así
// llegan los modelos 3D). Cada mp3 de assets/audio/pix/ se convierte en un .js que guarda sus bytes en
// base64 en globalThis.CANONIA_AUDIO[clave]. pix-voice.js lo lee y lo reproduce con Web Audio.
//
// Uso:  node scripts/pack-audio.js
// Salida: assets/audio/pix/packed/<clave>.js (no se guarda en git; se genera antes de publicar).

import { readFile, writeFile, readdir, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets', 'audio', 'pix');
const OUT = path.join(SRC, 'packed');

/** Código del .js empaquetado de una clave. */
export function packAudio(key, bytes) {
  return `(globalThis.CANONIA_AUDIO ||= {})[${JSON.stringify(key)}] = ${JSON.stringify(Buffer.from(bytes).toString('base64'))};\n`;
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(SRC)).filter((f) => f.endsWith('.mp3'));
  let total = 0;
  for (const file of files) {
    const key = file.replace(/\.mp3$/, '');
    const js = packAudio(key, await readFile(path.join(SRC, file)));
    await writeFile(path.join(OUT, `${key}.js`), js);
    total += js.length;
  }
  console.log(`Audio empaquetado: ${(total / 1024 / 1024).toFixed(1)} MB en ${files.length} archivos (assets/audio/pix/packed/)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
