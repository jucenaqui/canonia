"""Reduce las texturas de un GLB a un tamaño máximo y las vuelve a guardar como JPEG.
Uso: python shrink_glb.py entrada.glb salida.glb [max_px] [calidad]
No toca geometría, esqueleto ni animaciones."""
import io, json, struct, sys
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
max_px = int(sys.argv[3]) if len(sys.argv) > 3 else 1024
quality = int(sys.argv[4]) if len(sys.argv) > 4 else 82

data = open(src, 'rb').read()
magic, version, total = struct.unpack_from('<III', data, 0)
assert magic == 0x46546C67, 'no es GLB'
off = 12
gltf, binc = None, None
while off < len(data):
    clen, ctype = struct.unpack_from('<II', data, off)
    chunk = data[off + 8: off + 8 + clen]
    if ctype == 0x4E4F534A:
        gltf = json.loads(chunk.decode('utf-8').rstrip(' \x00'))
    elif ctype == 0x004E4942:
        binc = chunk
    off += 8 + clen

views = gltf['bufferViews']
new_bytes = {}
for img in gltf.get('images', []):
    if 'bufferView' not in img:
        continue
    bv = views[img['bufferView']]
    raw = binc[bv.get('byteOffset', 0): bv.get('byteOffset', 0) + bv['byteLength']]
    im = Image.open(io.BytesIO(raw))
    im.load()
    if im.mode not in ('RGB', 'L'):
        im = im.convert('RGB')
    w, h = im.size
    scale = min(1.0, max_px / max(w, h))
    if scale < 1.0:
        im = im.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.LANCZOS)
    out = io.BytesIO()
    im.save(out, 'JPEG', quality=quality, optimize=True)
    new_bytes[img['bufferView']] = out.getvalue()
    img['mimeType'] = 'image/jpeg'

blob = bytearray()
for i, bv in enumerate(views):
    chunk = new_bytes.get(i)
    if chunk is None:
        chunk = binc[bv.get('byteOffset', 0): bv.get('byteOffset', 0) + bv['byteLength']]
    while len(blob) % 4:
        blob.append(0)
    bv['byteOffset'] = len(blob)
    bv['byteLength'] = len(chunk)
    blob.extend(chunk)
while len(blob) % 4:
    blob.append(0)
gltf['buffers'][0]['byteLength'] = len(blob)

js = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
while len(js) % 4:
    js += b' '
out = bytearray()
out += struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(blob))
out += struct.pack('<II', len(js), 0x4E4F534A) + js
out += struct.pack('<II', len(blob), 0x004E4942) + blob
open(dst, 'wb').write(out)
print(f'{src.split("/")[-1]}: {len(data)//1024} KB -> {len(out)//1024} KB')
