# Voz de PIX

33 frases de PIX (una por zona/estado, `<zona>.entry.N.mp3` y `<zona>.end.mp3`).

## Cómo se generan

Con Magnific (herramienta `audio_tts`): voz Norah, modelo `eleven_v4`. El nombre del archivo es la clave de la frase.

## Cómo se comprimen

Magnific entrega mp3 a 320 kbps, 44,1 kHz. Para el juego se re-codifican a mono, 24 kHz y 64 kbps (voz clara):

    python scripts/shrink-audio.py assets/audio/pix [kbps]

Necesita `miniaudio` y `lameenc` (`pip install miniaudio lameenc`). Sobrescribe en sitio solo si el resultado pesa menos, por lo que es seguro repetirlo. Conserva los originales fuera del repositorio antes de ejecutarlo si quieres poder volver atrás. Resultado de la primera pasada: 14,16 MB a 2,74 MB.
