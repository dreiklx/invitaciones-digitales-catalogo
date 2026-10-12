// Indicador para seguir leyendo, en los ocho diseños. En el teléfono debe
// decir el GESTO ("Desliza hacia arriba", con una mano que sube), quedar en
// la primera pantalla sin tapar los nombres ni el reproductor, y avanzar si
// se toca. Con mouse dice "Desplázate hacia abajo". Nunca "Desliza hacia
// abajo" (se leía como mover el dedo hacia abajo).

import { expect, test, type Locator, type Page } from "@playwright/test";
import { DESKTOP_SIZES, MOBILE_SIZES, openInvitation, templateIds, viewport } from "./helpers";

type Box = { x: number; y: number; width: number; height: number };
const overlaps = (a: Box, b: Box) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

// El indicador visible (Olivo y Aguamarina lo ocultan en escritorio ancho).
async function visibleCue(page: Page): Promise<Locator | null> {
  const cues = page.locator("[data-scroll-cue]");
  for (let i = 0; i < (await cues.count()); i++) if (await cues.nth(i).isVisible()) return cues.nth(i);
  return null;
}

for (const [width, height] of MOBILE_SIZES) {
  test.describe(`teléfono ${width}×${height}`, () => {
    test.use(viewport(width, height));

    for (const id of templateIds) {
      test(`${id}: dice el gesto, se ve entero y no tapa nada`, async ({ page }) => {
        await page.goto(`/plantillas/${id}`);
        expect(await page.evaluate(() => matchMedia("(pointer: coarse)").matches), "el teléfono emulado debe ser táctil").toBe(true);
        await openInvitation(page);
        await page.waitForTimeout(900); // animaciones de entrada

        const cue = await visibleCue(page);
        expect(cue, "falta el indicador en el teléfono").not.toBeNull();
        await expect(cue!).toHaveText(/^desliza hacia arriba$/i, { useInnerText: true });
        await expect(page.getByText(/desliza hacia abajo/i)).toHaveCount(0);

        // La animación sube (la mano), igual que el dedo.
        const icon = cue!.locator(".scroll-cue-swipe");
        await expect(icon).toBeVisible();
        expect(await icon.evaluate((el) => getComputedStyle(el).animationName)).toBe("scroll-cue-swipe");
        await expect(cue!.locator(".scroll-cue-arrow")).toBeHidden();

        // Dentro de la primera pantalla, sin tapar nombres ni el reproductor.
        const box = (await cue!.boundingBox())!;
        expect(box.y, "el indicador empieza fuera de la pantalla").toBeGreaterThanOrEqual(0);
        expect(box.y + box.height, `el indicador termina en ${Math.round(box.y + box.height)} y la pantalla mide ${height}`).toBeLessThanOrEqual(height);
        for (const h1 of await page.locator("h1:visible").all()) {
          const b = await h1.boundingBox();
          if (b) expect(overlaps(box, b), "el indicador tapa los nombres").toBe(false);
        }
        const player = page.getByRole("button", { name: /^(Pausar la música|Escuchar música)/ });
        if (await player.isVisible()) expect(overlaps(box, (await player.boundingBox())!), "el indicador queda debajo del reproductor").toBe(false);
        // El aviso breve de la música no tapa el botón "Otros diseños".
        // (Se mide de una vez: el aviso desaparece solo a los pocos segundos.)
        const rects = await page.evaluate(() => {
          const r = (el: Element | null) => (el ? (({ x, y, width, height }) => ({ x, y, width, height }))(el.getBoundingClientRect()) : null);
          return { bubble: r(document.querySelector("[data-music-hint]")), back: r(document.querySelector("[data-designs-trigger]")) };
        });
        if (rects.bubble && rects.back) expect(overlaps(rects.bubble, rects.back), "el aviso de la música tapa «Otros diseños»").toBe(false);

        // Tocarlo avanza a la sección siguiente y luego se desvanece.
        await cue!.click();
        await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 }).toBeGreaterThan(120);
        await expect(cue!).toHaveAttribute("aria-hidden", "true");
      });
    }
  });
}

// La portada no se desplaza: "Abrir invitación" (y el aviso de música)
// tienen que caber enteros en la pantalla.
for (const [width, height] of [...MOBILE_SIZES, ...DESKTOP_SIZES]) {
  test.describe(`portada ${width}×${height}`, () => {
    test.use(viewport(width, height));
    test("el botón de abrir y el aviso de música se ven enteros", async ({ page }) => {
      for (const id of templateIds) {
        await page.goto(`/plantillas/${id}`);
        const button = page.getByRole("button", { name: /abrir invitación/i });
        await expect(button).toBeVisible();
        const b = (await button.boundingBox())!;
        expect(b.y + b.height, `${id}: el botón termina en ${Math.round(b.y + b.height)}`).toBeLessThanOrEqual(height);
        expect(b.height, `${id}: zona táctil`).toBeGreaterThanOrEqual(44);
        const note = page.getByText("Con música: podrás pausarla cuando quieras.");
        if (await note.count()) {
          const n = (await note.boundingBox())!;
          expect(n.y + n.height, `${id}: el aviso de música termina en ${Math.round(n.y + n.height)}`).toBeLessThanOrEqual(height);
        }
      }
    });
  });
}

test.describe("teléfono con «reducir movimiento»", () => {
  test.use({ ...viewport(390), reducedMotion: "reduce" });
  for (const id of templateIds) {
    test(`${id}: la mano queda quieta y la flecha sigue diciendo hacia dónde`, async ({ page }) => {
      await page.goto(`/plantillas/${id}`);
      await openInvitation(page);
      const cue = (await visibleCue(page))!;
      await expect(cue).toHaveText(/^desliza hacia arriba$/i, { useInnerText: true });
      const icon = cue.locator(".scroll-cue-swipe");
      await expect(icon).toBeVisible();
      expect(await icon.evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
    });
  }
});

for (const [width, height] of DESKTOP_SIZES) {
  test.describe(`escritorio ${width}×${height}`, () => {
    test.use(viewport(width, height));
    for (const id of templateIds) {
      test(`${id}: con mouse dice "Desplázate hacia abajo"`, async ({ page }) => {
        await page.goto(`/plantillas/${id}`);
        await openInvitation(page);
        await page.waitForTimeout(900);
        await expect(page.getByText(/desliza hacia (abajo|arriba)/i).filter({ visible: true })).toHaveCount(0);
        const cue = await visibleCue(page);
        test.skip(!cue, "este diseño no muestra el indicador en pantallas anchas");
        await expect(cue!).toHaveText(/^desplázate hacia abajo$/i, { useInnerText: true });
        const box = (await cue!.boundingBox())!;
        expect(box.y + box.height).toBeLessThanOrEqual(height);
        await page.mouse.move(width / 2, height / 2);
        await page.mouse.wheel(0, 400);
        await expect(cue!).toHaveAttribute("aria-hidden", "true");
      });
    }
  });
}
