// Servidor local para desarrollo, sin dependencias.
// Sirve la carpeta del proyecto pidiendo al navegador que NO guarde nada en caché, para que
// cada recarga muestre siempre la última versión del código (los módulos de JavaScript se
// quedaban guardados con el servidor de Python y se veía la versión anterior).
//
// Uso:  node scripts/serve.js        (puerto 8000)
//       node scripts/serve.js 8080   (otro puerto)

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { networkInterfaces } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2]) || 8000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.md': 'text/plain; charset=utf-8',
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    let target = path.normalize(path.join(ROOT, decodeURIComponent(url.pathname)));
    if (!target.startsWith(ROOT)) {
      response.writeHead(403).end('Prohibido');
      return;
    }
    if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    const body = await readFile(target);
    response.writeHead(200, {
      'Content-Type': TYPES[path.extname(target).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('No encontrado');
  }
});

server.listen(PORT, () => {
  console.log(`Canonia en http://localhost:${PORT}`);
  for (const addresses of Object.values(networkInterfaces())) {
    for (const address of addresses ?? []) {
      if (address.family === 'IPv4' && !address.internal) console.log(`En el teléfono (misma wifi): http://${address.address}:${PORT}`);
    }
  }
  console.log('Para cerrarlo: Ctrl + C');
});
