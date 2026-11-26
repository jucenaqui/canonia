"""Re-codifica los mp3 de una carpeta a mono, 24 kHz y baja tasa de bits (voz).
Uso: python scripts/shrink-audio.py carpeta [kbps]
Por defecto 64 kbps. Sobrescribe en sitio solo si el resultado pesa menos.
Dependencias: miniaudio (decodifica) y lameenc (codifica)."""
import os, sys
import lameenc
import miniaudio

RATE = 24000
folder = sys.argv[1]
kbps = int(sys.argv[2]) if len(sys.argv) > 2 else 64


def shrink(path):
    dec = miniaudio.decode_file(path, output_format=miniaudio.SampleFormat.SIGNED16,
                                nchannels=1, sample_rate=RATE)
    enc = lameenc.Encoder()
    enc.set_bit_rate(kbps)
    enc.set_in_sample_rate(RATE)
    enc.set_out_sample_rate(RATE)
    enc.set_channels(1)
    enc.set_quality(2)
    return bytes(enc.encode(dec.samples.tobytes())) + bytes(enc.flush())


total_before = total_after = 0
for name in sorted(os.listdir(folder)):
    if not name.lower().endswith('.mp3'):
        continue
    path = os.path.join(folder, name)
    before = os.path.getsize(path)
    out = shrink(path)
    after = min(before, len(out))
    if len(out) < before:
        with open(path, 'wb') as f:
            f.write(out)
    total_before += before
    total_after += after
    print(f'{name}: {before} -> {after} bytes')
print(f'TOTAL: {total_before} -> {total_after} bytes')
