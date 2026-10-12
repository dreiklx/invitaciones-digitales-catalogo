// Invitación de CLIENTE real: generada con `npm run nueva`, completada con
// datos de prueba, validada y compilada por `npm run test:cliente`
// (scripts/test-cliente.ts), que deja en CLIENTE_DIR/expected.json lo que
// se espera ver y lo que nunca debe aparecer. Se revisa lo que de verdad
// sirve la aplicación: HTML, rutas, archivos y el navegador.

import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";
import { containsWord } from "../../lib/invitation/names";
import { openInvitation, viewport } from "../e2e/helpers";

type Expected = {
  id: string;
  names: string[];
  siteTitle: string;
  dateLong: string;
  dtstart: string;
  places: string[];
  whatsapp: string | null;
  sections: string[];
  otherDesigns: string[];
  demoPhotos: string[];
  demoMarkers: string[];
  catalogTexts: string[];
};
const expected: Expected = JSON.parse(readFileSync(path.join(process.env.CLIENTE_DIR!, "expected.json"), "utf8"));

// Nada de las demos ni del catálogo en un texto (HTML o página).
function expectNoDemoContent(text: string, where: string) {
  for (const t of expected.catalogTexts) expect(text.includes(t), `${where}: aparece "${t}" (catálogo/demos)`).toBe(false);
  for (const m of expected.demoMarkers) expect(containsWord(text, m), `${where}: aparece "${m}" (dato de una demo)`).toBe(false);
  for (const other of expected.otherDesigns) expect(text.includes(`/plantillas/${other}`), `${where}: enlace a /plantillas/${other}`).toBe(false);
  for (const photo of expected.demoPhotos) expect(text.includes(photo), `${where}: foto de demo ${photo}`).toBe(false);
  expect(text.includes("data-designs-trigger"), `${where}: selector de diseños`).toBe(false);
  expect(text.includes("data-catalog-link"), `${where}: enlace al catálogo`).toBe(false);
}

test.describe(`invitación de cliente (${expected.id})`, () => {
  test("el HTML trae los datos de prueba, noindex y nada de las demos", async ({ request }) => {
    const res = await request.get("/");
    expect(res.status()).toBe(200);
    const html = await res.text();
    for (const name of expected.names) expect(html).toContain(name);
    expect(html).toContain(expected.dateLong);
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow"/);
    expectNoDemoContent(html, "HTML de /");
  });

  test("las rutas y las fotos de las demos no existen en el proyecto del cliente", async ({ request }) => {
    for (const other of expected.otherDesigns) {
      const res = await request.get(`/plantillas/${other}`, { maxRedirects: 0 });
      expect(res.status(), `/plantillas/${other}`).toBe(404);
      const html = await res.text();
      // Página 404 propia, renderizada en el servidor (no una página vacía).
      expect(html.replace(/<[^>]+>/g, "")).toContain("Esta página no existe");
      expectNoDemoContent(html, `404 de /plantillas/${other}`);
    }
    for (const photo of expected.demoPhotos) expect((await request.get(photo)).status(), photo).toBe(404);
    const optimized = await request.get(`/_next/image?url=${encodeURIComponent(expected.demoPhotos[0])}&w=640&q=75`);
    expect(optimized.status(), "optimizador con una foto de demo").toBe(400);
  });

  test("calendario con la fecha, los nombres y el lugar de prueba", async ({ request }) => {
    const res = await request.get("/calendario.ics");
    expect(res.status()).toBe(200);
    const ics = (await res.text()).replace(/\r?\n /g, "");
    expect(ics).toContain(expected.dtstart);
    for (const name of expected.names) expect(ics).toContain(name);
    expect(ics).toContain(expected.places[0]);
  });

  test("una ruta inexistente responde 404 en español y lleva a la invitación", async ({ page }) => {
    const res = await page.goto("/no-existe-esta-pagina");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: /esta página no existe/i })).toBeVisible();
    const back = page.getByRole("link", { name: "Ir a la invitación" });
    await expect(back).toHaveAttribute("href", "/");
    expectNoDemoContent(await page.content(), "página 404");
    await back.click();
    await expect(page.getByRole("button", { name: /abrir invitación/i })).toBeVisible();
  });

  for (const [width, height] of [
    [390, 844],
    [1366, 768],
  ] as const) {
    const mobile = width < 900;
    test.describe(`${width}×${height}`, () => {
      test.use(viewport(width, height));

      test("portada, nombres y barra de sus propias secciones, sin selector de demos", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("[data-designs-trigger]")).toHaveCount(0);
        await openInvitation(page);
        for (const name of expected.names) await expect(page.getByText(name, { exact: false }).first()).toBeAttached();
        expectNoDemoContent(await page.content(), "página abierta");

        await page.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" }));
        const bar = page.locator(mobile ? '[data-page-nav="bar"]' : '[data-page-nav="desktop"]');
        await expect(bar).toHaveCSS("opacity", "1");
        await bar.getByRole("button", { name: /^Secciones/ }).click();
        const menu = page.locator(mobile ? '[data-page-nav="sheet"]' : '[data-page-nav="dropdown"]');
        await expect(menu).toBeVisible();
        const items = await menu.locator("[data-nav-item]").evaluateAll((els) => els.map((e) => e.getAttribute("data-nav-item")));
        const labels = (await menu.locator("[data-nav-item]").allInnerTexts()).map((t) => t.split("\n")[0].trim());
        // Las de la configuración, ni una más ni una menos (en el orden de la página).
        expect(labels[0]).toBe("Inicio");
        expect([...labels.slice(1)].sort()).toEqual([...expected.sections].sort());
        // Cada entrada lleva a una sección que existe.
        for (const id of items.slice(1)) expect(await page.locator(`[id="${id}"]`).count(), `sección ${id}`).toBe(1);
        // Sin el bloque de las demos (otros diseños / catálogo).
        await expect(menu.getByText("Demostración")).toHaveCount(0);
        await expect(menu.locator("[data-catalog-link]")).toHaveCount(0);
        await page.keyboard.press("Escape");
        await expect(menu).toBeHidden();
      });

      test("la confirmación abre WhatsApp con el número y el nombre de prueba", async ({ page }) => {
        test.skip(!expected.whatsapp, "sin confirmación");
        await stubWindowOpen(page);
        await page.goto("/");
        await openInvitation(page);
        await page.locator("#confirmar").scrollIntoViewIfNeeded();
        const referrer = page.getByRole("radiogroup", { name: /de parte de quién/i });
        if (await referrer.count()) await referrer.getByRole("radio").first().click();
        await page.getByRole("radio", { name: /^Solo yo/ }).click();
        await page.getByRole("textbox", { name: "Nombre y apellido" }).fill("Invitado de Prueba");
        await page.getByRole("button", { name: /confirmar por whatsapp/i }).click();
        const opened = await page.evaluate(() => (window as unknown as { __opened?: string }).__opened ?? "");
        expect(opened).toContain(`https://wa.me/${expected.whatsapp}`);
        expect(decodeURIComponent(opened)).toContain("Invitado de Prueba");
        // Real (no demo): aviso de Enviar y alternativa si WhatsApp no se abrió.
        await expect(page.getByRole("status").filter({ hasText: "Ya casi está" })).toBeVisible();
        await expect(page.getByRole("link", { name: /no se abrió/i })).toHaveAttribute("href", opened);
      });
    });
  }
});

// WhatsApp no se abre de verdad: se registra la dirección que abriría.
async function stubWindowOpen(page: Page) {
  await page.addInitScript(() => {
    window.open = ((url?: string | URL) => {
      (window as unknown as { __opened?: string }).__opened = String(url);
      return null;
    }) as typeof window.open;
  });
}
