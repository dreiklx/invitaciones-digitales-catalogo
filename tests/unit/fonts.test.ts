// Tipografías locales (fonts/): el build no consulta Google Fonts
// (`npm run build:offline` lo comprueba sin red). Aquí: cada archivo
// declarado existe y trae su licencia, nadie vuelve a `next/font/google`,
// y el nombre de cada familia es único (si dos diseños la llamaran
// "display", sus letras se mezclarían: pasó al cambiar a fuentes locales).

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { templateIds, templateMetas } from "../../templates/registry";

const root = process.cwd();
const slug = (family: string) => family.toLowerCase().replace(/ /g, "-");
const ident = (family: string) => slug(family).replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

const fontModules = [path.join("components", "catalog", "fonts.ts"), ...templateIds.map((id) => path.join("templates", id, "fonts.ts"))];

function sourceFiles(dir: string): string[] {
  return readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? sourceFiles(path.join(dir, e.name)) : /\.(ts|tsx)$/.test(e.name) ? [path.join(dir, e.name)] : [],
  );
}

describe("tipografías locales", () => {
  it("las miniaturas del catálogo usan los mismos archivos que cada diseño, sin precarga, y solo el catálogo las importa", () => {
    const preview = readFileSync(path.join(root, "templates", "preview-fonts.ts"), "utf8");
    assert.ok(!/preload: true/.test(preview) && (preview.match(/preload: false/g) ?? []).length === (preview.match(/localFont\(/g) ?? []).length, "preview-fonts.ts debe ir sin precarga");
    for (const id of templateIds) {
      const own = readFileSync(path.join(root, "templates", id, "fonts.ts"), "utf8");
      for (const m of own.matchAll(/fonts\/[\w-]+\/[\w.-]+\.woff2/g)) assert.ok(preview.includes(m[0]), `${id}: ${m[0]} no está en preview-fonts.ts`);
    }
    // Los fonts.ts de un diseño solo los importa su propio Template (si otro
    // módulo los importara, sus tipografías se precargarían en otras rutas).
    for (const file of ["app", "components", "lib", "templates"].flatMap(sourceFiles)) {
      const text = readFileSync(path.join(root, file), "utf8");
      const imports = [...text.matchAll(/from "(?:\.\/|@\/templates\/(\w+)\/|\.\.\/(\w+)\/)fonts"/g)];
      for (const m of imports) {
        const owner = m[1] ?? m[2] ?? path.basename(path.dirname(file));
        if (!templateIds.includes(owner as (typeof templateIds)[number])) continue; // p. ej. components/catalog/fonts.ts
        assert.equal(file, path.join("templates", owner, "Template.tsx"), `${file} importa los fonts.ts de ${owner}`);
      }
    }
  });

  it("ningún archivo usa next/font/google ni descarga de fonts.googleapis.com", () => {
    for (const file of ["app", "components", "lib", "templates"].flatMap(sourceFiles)) {
      const text = readFileSync(path.join(root, file), "utf8");
      assert.ok(!text.includes("next/font/google"), `${file} usa next/font/google`);
      assert.ok(!text.includes("fonts.googleapis.com") && !text.includes("fonts.gstatic.com"), `${file} descarga de Google Fonts`);
    }
  });

  for (const file of fontModules) {
    it(`${file}: los archivos existen y cada familia tiene su licencia OFL`, () => {
      const text = readFileSync(path.join(root, file), "utf8");
      const paths = [...text.matchAll(/"(\.\.\/\.\.\/fonts\/[^"]+\.woff2)"/g)].map((m) => m[1]);
      assert.ok(paths.length > 0, "sin archivos de fuente");
      for (const p of paths) {
        const abs = path.resolve(root, path.dirname(file), p);
        assert.ok(existsSync(abs), `no existe ${p}`);
        assert.ok(existsSync(path.join(path.dirname(abs), "OFL.txt")), `falta OFL.txt junto a ${p}`);
      }
    });
  }

  for (const id of templateIds) {
    it(`${id}: las familias se llaman como su tipografía y existen para las imágenes al compartir`, () => {
      const text = readFileSync(path.join(root, "templates", id, "fonts.ts"), "utf8");
      const names = [...text.matchAll(/const (\w+) = localFont\(/g)].map((m) => m[1]);
      for (const family of [templateMetas[id].fonts.display, templateMetas[id].fonts.body]) {
        assert.ok(names.includes(ident(family)), `falta "const ${ident(family)} = localFont(" para ${family}`);
        const og = path.join(root, "fonts", slug(family), `${slug(family)}-latin-400-normal.woff`);
        assert.ok(existsSync(og), `falta ${path.relative(root, og)} (next/og no lee woff2)`);
      }
      for (const n of names) assert.ok(!["display", "body", "script"].includes(n), `"${n}" no es un nombre de familia único`);
    });
  }
});
