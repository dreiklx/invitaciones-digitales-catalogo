// Catálogo: enlaces a los siete diseños, rutas viejas y enlace del estudio.

import { expect, test } from "@playwright/test";
import nextConfig from "../../next.config";
import { templateIds, viewport } from "./helpers";

test.use(viewport(390));

test("el catálogo enlaza los siete diseños y cada uno responde", async ({ page, request }) => {
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

test("el logo del estudio enlaza a su Instagram de forma segura", async ({ page }) => {
  await page.goto("/");
  const link = page.locator('footer a[href="https://www.instagram.com/farley.systems/"]');
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAccessibleName(/instagram/i);
});
