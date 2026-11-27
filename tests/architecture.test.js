// Prueba de arquitectura (T012).
// Recorre las importaciones de src/ y falla si una capa importa lo que no debe.
// Reglas (plan.md, "Reglas de dependencia"):
//   domain → nada · content → nada · application → domain
//   adapters → application, domain · presentation → application, content
//   main.js → todo
// Cada capa puede importar sus propios archivos. Nada de src/ importa paquetes externos, salvo
// three.js (D50): solo desde presentation/world3d/ (T003, T007).
// Los minijuegos (presentation/world3d/minigames/) no importan la aplicación: no pueden aprobar (plan 006).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

const ALLOWED = {
  domain: [],
  content: [],
  application: ['domain'],
  adapters: ['application', 'domain'],
  presentation: ['application', 'content'],
  main: ['domain', 'content', 'application', 'adapters', 'presentation'],
};

/** Capa de un archivo, a partir de su ruta relativa a src/. */
export function layerOf(relativePath) {
  const parts = relativePath.split(/[\\/]/);
  if (parts.length === 1) return parts[0] === 'main.js' ? 'main' : 'unknown';
  return parts[0] in ALLOWED ? parts[0] : 'unknown';
}

const IMPORT_PATTERN = /\bimport\s+(?:[^'"`;]*?\s+from\s+)?['"]([^'"]+)['"]|\bexport\s+[^'"`;]*?\s+from\s+['"]([^'"]+)['"]|\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

/** Especificadores importados por un código fuente. */
export function importsOf(source) {
  const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
  return [...withoutComments.matchAll(IMPORT_PATTERN)].map((m) => m[1] ?? m[2] ?? m[3]);
}

/**
 * Infracciones de un conjunto de archivos.
 * @param {{ file: string, source: string }[]} files Rutas relativas a src/.
 */
export function findViolations(files) {
  const violations = [];
  for (const { file, source } of files) {
    const from = layerOf(file);
    if (from === 'unknown') {
      violations.push(`${file}: está fuera de las capas conocidas`);
      continue;
    }
    const posixFile = file.replaceAll('\\', '/');
    for (const specifier of importsOf(source)) {
      if (!specifier.startsWith('.')) {
        const isThree = specifier === 'three' || specifier.startsWith('three/addons/');
        if (!(isThree && posixFile.startsWith('presentation/world3d/'))) {
          violations.push(`${file}: importa un paquete externo (${specifier})`);
        }
        continue;
      }
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(file.replaceAll('\\', '/')), specifier));
      if (target.startsWith('..')) {
        violations.push(`${file}: importa fuera de src/ (${specifier})`);
        continue;
      }
      const to = layerOf(target);
      if (to !== from && !ALLOWED[from].includes(to)) {
        violations.push(`${file}: la capa ${from} no puede importar de ${to} (${specifier})`);
      } else if (posixFile.startsWith('presentation/world3d/minigames/') && to === 'application') {
        violations.push(`${file}: un minijuego no puede importar la aplicación (${specifier})`);
      }
    }
  }
  return violations;
}

async function listJsFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listJsFiles(full);
    return entry.name.endsWith('.js') ? [full] : [];
  }));
  return files.flat();
}

test('ninguna capa de src/ importa lo que no debe', async () => {
  const paths = await listJsFiles(SRC);
  const files = await Promise.all(paths.map(async (full) => ({
    file: path.relative(SRC, full),
    source: await readFile(full, 'utf8'),
  })));
  assert.deepEqual(findViolations(files), []);
});

test('el comprobador detecta infracciones (no pasa en vacío)', () => {
  const violations = findViolations([
    { file: 'domain/piece.js', source: "import { x } from '../application/ports.js';" },
    { file: 'application/flow.js', source: "import { y } from '../adapters/ai/demo.js';" },
    { file: 'presentation/screens/a.js', source: "import { z } from '../../domain/piece.js';" },
    { file: 'adapters/ai/a.js', source: "import { w } from 'some-package';" },
    { file: 'content/es.js', source: "export { v } from '../presentation/x.js';" },
    { file: 'presentation/screens/b.js', source: "import * as T from 'three';" },
    { file: 'presentation/world3d/minigames/ugc.js', source: "import { a } from '../../../application/zone-flow.js';" },
  ]);
  assert.equal(violations.length, 7);
});

test('el comprobador acepta las importaciones permitidas', () => {
  const violations = findViolations([
    { file: 'application/flow.js', source: "import { a } from '../domain/piece.js';\nimport { b } from './ports.js';" },
    { file: 'adapters/storage/s.js', source: "import { c } from '../../application/ports.js';" },
    { file: 'presentation/screens/g.js', source: "import { d } from '../../content/es.js';\nimport { e } from '../world3d/zone-math.js';" },
    { file: 'main.js', source: "import { f } from './adapters/ai/demo.js';" },
    { file: 'domain/x.js', source: "// import { g } from '../application/ports.js';\nconst s = 'no es import';" },
    { file: 'presentation/world3d/scene.js', source: "import * as T from 'three';\nimport { L } from 'three/addons/loaders/GLTFLoader.js';" },
  ]);
  assert.deepEqual(violations, []);
});
