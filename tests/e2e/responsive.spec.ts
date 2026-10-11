// Sin desplazamiento lateral: catálogo y siete diseños en 8 anchos, antes y
// después de abrir la invitación y a lo largo de toda la página.

import { expect, test } from "@playwright/test";
import { DESKTOP_WIDTHS, MOBILE_WIDTHS, expectNoHorizontalOverflow, openInvitation, scrollThrough, templateIds, viewport } from "./helpers";

const routes = ["/", ...templateIds.map((id) => `/plantillas/${id}`)];

for (const width of [...MOBILE_WIDTHS, ...DESKTOP_WIDTHS]) {
  test.describe(`${width}px`, () => {
    test.use(viewport(width));

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
