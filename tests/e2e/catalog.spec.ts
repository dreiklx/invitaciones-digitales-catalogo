// Catálogo: enlaces a los ocho diseños por categoría, rutas viejas y enlace
// del estudio.

import { expect, test } from "@playwright/test";
import nextConfig from "../../next.config";
import { templateIds, viewport } from "./helpers";
import { catalogGroups } from "../../components/catalog/groups";
import { templateMetas } from "../../templates/registry";

test.use(viewport(390));

test("el catálogo enlaza los ocho diseños y cada uno responde", async ({ page, request }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  for (const id of templateIds) {
    await expect(page.locator(`a[href="/plantillas/${id}"]`).first()).toBeAttached();
    const res = await request.get(`/plantillas/${id}`);
    expect(res.status(), id).toBe(200);
    const og = await request.get(`/plantillas/${id}/opengraph-image`);
    expect(og.status(), `${id} imagen al compartir`).toBe(200);
    expect(og.headers()["content-type"]).toContain("image/");
  }
});

test("cada diseño aparece en su categoría, con el tipo de evento", async ({ page }) => {
  await page.goto("/");
  for (const group of catalogGroups) {
    const section = page.locator(`section#${group.id}`);
    await expect(section.getByRole("heading", { level: 2, name: group.title })).toBeVisible();
    const ids = templateIds.filter((id) => group.kinds.includes(templateMetas[id].kind));
    for (const id of ids) await expect(section.locator(`article#${id}`), `${id} en ${group.title}`).toBeAttached();
    await expect(section.locator("article")).toHaveCount(ids.length);
  }
});

test("al tocar una tarjeta se abre su diseño", async ({ page }) => {
  await page.goto("/");
  const id = templateIds[0];
  await page.locator(`a[href="/plantillas/${id}"]`).first().click();
  await expect(page).toHaveURL(new RegExp(`/plantillas/${id}$`));
  await expect(page.getByRole("button", { name: /abrir invitación/i })).toBeVisible();
});

test("las rutas viejas redirigen de forma permanente en un salto", async ({ request }) => {
  const redirects = (await nextConfig.redirects?.()) ?? [];
  for (const r of redirects) {
    const source = r.source.replace("/:path+", "/calendario.ics");
    const expected = r.destination.replace("/:path+", "/calendario.ics");
    const res = await request.get(source, { maxRedirects: 0 });
    expect(res.status(), source).toBe(308);
    expect(new URL(res.headers()["location"], "http://x").pathname, source).toBe(expected);
  }
});

test("una ruta que no existe responde 404 en español y vuelve al catálogo", async ({ page, request }) => {
  for (const path of ["/no-existe", "/plantillas/no-existe", "/plantillas"]) {
    const res = await request.get(path, { maxRedirects: 0 });
    expect(res.status(), path).toBe(404);
    // Renderizada en el servidor (no una página vacía), sin el texto en inglés.
    const text = (await res.text()).replace(/<[^>]+>/g, "");
    expect(text, path).toContain("Esta página no existe");
    expect(text, path).not.toContain("could not be found");
  }
  // Las rutas válidas siguen respondiendo.
  for (const id of templateIds) expect((await request.get(`/plantillas/${id}`)).status(), id).toBe(200);

  const res = await page.goto("/una/direccion/que/no/existe");
  expect(res?.status()).toBe(404);
  await expect(page).toHaveTitle(/Página no encontrada/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Esta página no existe");
  const back = page.getByRole("link", { name: "Volver al catálogo" });
  await expect(back).toHaveAttribute("href", "/");
  expect((await back.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await back.click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#disenos")).toBeAttached();
});

test("el logo del estudio enlaza a su Instagram de forma segura", async ({ page }) => {
  await page.goto("/");
  const link = page.locator('footer a[href="https://www.instagram.com/farley.systems/"]');
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAccessibleName(/instagram/i);
});
