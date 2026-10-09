// npm run optimize-images — comprime las fotos del cliente en public/images/
// (lado largo máx. 2400 px, JPEG calidad 82) y las endereza según su EXIF.
// SOBRESCRIBE los archivos: guardar los originales aparte (p. ej. /img,
// que está en .gitignore).

import sharp from "sharp";
import { readdir, rename, stat } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "images");
const MAX = 2400;
const QUALITY = 82;

const files = await readdir(dir);
const photos = files.filter((f) => /\.jpe?g$/i.test(f));
const others = files.filter((f) => /\.(png|webp|heic|heif|avif|tiff?)$/i.test(f));

for (const file of photos) {
  const filePath = path.join(dir, file);
  const before = (await stat(filePath)).size;
  // rotate() sin argumentos aplica la orientación EXIF ANTES de redimensionar,
  // y "inside" limita el lado largo sea vertical u horizontal.
  const buffer = await sharp(filePath)
    .rotate()
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();
  await sharp(buffer).toFile(filePath + ".tmp");
  await rename(filePath + ".tmp", filePath);
  const { width, height } = await sharp(filePath).metadata();
  const after = (await stat(filePath)).size;
  console.log(`${file}: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB (${width}×${height})`);
}

if (!photos.length) console.log("No hay fotos .jpg/.jpeg en public/images/.");
for (const file of others) {
  console.log(`! ${file}: formato no procesado. Convertir a .jpg antes (y actualizar la ruta en config/invitation.ts).`);
}
