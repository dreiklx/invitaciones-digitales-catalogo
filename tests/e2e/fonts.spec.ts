// Tipografías locales en el navegador: cada demo descarga SOLO las de su
// diseño (ni las del catálogo ni las de otros diseños; un enlace al
// catálogo con precarga bajaba ~800 KB de más) y las usa de verdad (con
// nombres de familia repetidos, las letras de dos diseños se mezclaban).

import { expect, test } from "@playwright/test";
import { templateMetas } from "../../templates/registry";
import { openInvitation, templateIds, viewport } from "./helpers";

const slug = (family: string) => family.toLowerCase().replace(/ /g, "-");
const ident = (family: string) => slug(family).replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

test.use(viewport(390));

for (const id of templateIds) {
  test(`${id}: descarga y usa solo sus tipografías`, async ({ page }) => {
    const fonts: string[] = [];
    page.on("response", (r) => r.request().resourceType() === "font" && fonts.push(new URL(r.url()).pathname.split("/").pop()!));
    await page.goto(`/plantillas/${id}`);
    await openInvitation(page);
    // (No "networkidle": la música sigue descargándose.)
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);

    const meta = templateMetas[id];
    // Los archivos de Next se llaman como el archivo de origen: "fredoka_latin_…".
    const own = [meta.fonts.display, meta.fonts.body, ...(id === "aurora" ? ["Pinyon Script"] : [])].map((f) => slug(f).replace(/-/g, "_"));
    expect(fonts.length, "no se descargó ninguna tipografía").toBeGreaterThan(0);
    for (const file of fonts) expect(own.some((o) => file.startsWith(`${o}_`)), `${file} no es de ${id}`).toBe(true);

    // Y se aplican: el texto usa la familia del diseño, cargada.
    const families = await page.evaluate(() => {
      const display = document.querySelector<HTMLElement>(".font-display");
      const body = document.querySelector<HTMLElement>(".font-body") ?? document.body;
      return {
        display: display ? getComputedStyle(display).fontFamily : "",
        body: getComputedStyle(body).fontFamily,
        loaded: [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family.replace(/"/g, "")),
      };
    });
    expect(families.display).toContain(ident(meta.fonts.display));
    expect(families.body).toContain(ident(meta.fonts.body));
    expect(families.loaded).toContain(ident(meta.fonts.display));
  });
}
