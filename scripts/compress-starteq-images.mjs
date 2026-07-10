// Comprime os originais baixados (tmp-starteq-img/) pra WebP ~800px → public/products/starteq/.
// Uso: node scripts/compress-starteq-images.mjs
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const SRC = "tmp-starteq-img";
const OUT = "public/products/starteq";
const MAX_W = 800;
const QUALITY = 80;

async function main() {
  await mkdir(OUT, { recursive: true });
  let files;
  try {
    files = (await readdir(SRC)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  } catch {
    console.error(`Pasta ${SRC}/ não existe — rode o download primeiro.`);
    process.exit(1);
  }
  let ok = 0, fail = 0, bytesIn = 0, bytesOut = 0;
  for (const f of files) {
    const src = join(SRC, f);
    const out = join(OUT, `${parse(f).name}.webp`);
    try {
      const si = await stat(src);
      bytesIn += si.size;
      await sharp(src)
        .rotate()
        .resize({ width: MAX_W, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(out);
      bytesOut += (await stat(out)).size;
      ok++;
    } catch (e) {
      console.warn(`falhou: ${f} — ${e.message}`);
      fail++;
    }
  }
  const mb = (b) => (b / 1024 / 1024).toFixed(1);
  console.log(`\nWebP gerado: ${ok} ok · ${fail} falha`);
  console.log(`Tamanho: ${mb(bytesIn)}MB (original) → ${mb(bytesOut)}MB (webp)`);
}
main();
