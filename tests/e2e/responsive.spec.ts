// Sin desplazamiento lateral: catálogo y ocho diseños en 9 pantallas, antes
// y después de abrir la invitación y a lo largo de toda la página.

import { expect, test } from "@playwright/test";
import { DESKTOP_SIZES, MOBILE_SIZES, expectNoHorizontalOverflow, openInvitation, scrollThrough, templateIds, viewport } from "./helpers";

const routes = ["/", ...templateIds.map((id) => `/plantillas/${id}`)];

for (const [width, height] of [...MOBILE_SIZES, ...DESKTOP_SIZES]) {
  test.describe(`${width}×${height}`, () => {
    test.use(viewport(width, height));

    for (const route of routes) {
      test(`sin desplazamiento lateral: ${route}`, async ({ page }) => {
        await page.goto(route);
        await expectNoHorizontalOverflow(page, width, "al cargar");

        if (route !== "/") {
          await openInvitation(page);
          await expectNoHorizontalOverflow(page, width, "tras abrir la invitación");
        }

        await scrollThrough(page, async (y) => expectNoHorizontalOverflow(page, width, `en y=${y}`));

        if (width >= 900) {
          // Rueda o panel táctil hacia los lados.
          await page.mouse.move(width / 2, 300);
          await page.mouse.wheel(400, 0);
          await page.waitForTimeout(150);
          expect(await page.evaluate(() => window.scrollX)).toBe(0);
        }
      });
    }
  });
}

// Página 404 en los 9 tamaños.
test.describe("página 404", () => {
  for (const [width, height] of [...MOBILE_SIZES, ...DESKTOP_SIZES]) {
    test(`sin desplazamiento lateral a ${width}×${height}`, async ({ browser }) => {
      const ctx = await browser.newContext(viewport(width, height));
      const page = await ctx.newPage();
      expect((await page.goto("/no-existe"))?.status()).toBe(404);
      await expectNoHorizontalOverflow(page, width, "404");
      // El botón se ve entero en la primera pantalla.
      const box = (await page.getByRole("link", { name: "Volver al catálogo" }).boundingBox())!;
      expect(box.y + box.height).toBeLessThanOrEqual(height);
      await ctx.close();
    });
  }
});

// Letra del sistema agrandada (personas mayores) en el teléfono más angosto.
test.describe("320px con letra al 125 %", () => {
  test.use(viewport(320));
  for (const route of routes) {
    test(`sin desplazamiento lateral: ${route}`, async ({ page }) => {
      await page.goto(route);
      await page.addStyleTag({ content: "html { font-size: 125% !important; }" });
      await expectNoHorizontalOverflow(page, 320, "al cargar");
      if (route !== "/") {
        await openInvitation(page);
        await expectNoHorizontalOverflow(page, 320, "tras abrir");
      }
      await scrollThrough(page, async (y) => expectNoHorizontalOverflow(page, 320, `en y=${y}`));
    });
  }
});
