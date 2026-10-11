// Pruebas de humo de cada diseño, en teléfono (390 px) y escritorio
// (1366 px): portada y apertura, música real, fecha y nombres desde la
// configuración, calendario, galería, confirmación y regreso al catálogo.
// Nada depende de los nombres ni de las fotos de una demo en particular.

import { expect, test, type Page } from "@playwright/test";
import { demos } from "../../templates/demos";
import { resolveInvitation } from "../../lib/invitation/resolve";
import { audioState, expectNoHorizontalOverflow, openInvitation, scrollThrough, templateIds, viewport } from "./helpers";

async function scrollToSection(page: Page, selector: string) {
  await page.locator(selector).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
}

for (const width of [390, 1366]) {
  test.describe(`${width}px`, () => {
    test.use(viewport(width));

    for (const id of templateIds) {
      const inv = resolveInvitation(demos[id], { basePath: `/plantillas/${id}`, isDemo: true });

      test.describe(id, () => {
        test("música: no suena antes de abrir; suena, pausa y reanuda", async ({ page }) => {
          test.skip(!inv.content.music, "sin música");
          const audioResponses: number[] = [];
          page.on("response", (r) => r.url().includes("/audio/") && audioResponses.push(r.status()));

          await page.goto(`/plantillas/${id}`);
          await page.waitForTimeout(800);
          expect((await audioState(page)).paused, "no debe sonar antes de abrir").toBe(true);
          expect(audioResponses, "no debe descargar el audio antes de abrir").toEqual([]);

          await openInvitation(page);
          // Suena de verdad: el tiempo de reproducción avanza.
          await expect.poll(async () => (await audioState(page)).time, { timeout: 15_000 }).toBeGreaterThan(0.5);
          const playing = await audioState(page);
          expect(playing).toMatchObject({ count: 1, paused: false, error: null });
          expect(audioResponses.length).toBeGreaterThan(0);
          for (const status of audioResponses) expect([200, 206]).toContain(status);

          const player = page.getByRole("button", { name: /^(Pausar la música|Escuchar música)/ });
          await expect(player).toHaveAttribute("aria-pressed", "true");
          await expect(player).toHaveAccessibleName(/^Pausar la música/);

          // Pausa: el tiempo se detiene.
          await player.click();
          await expect(player).toHaveAttribute("aria-pressed", "false");
          await expect(player).toHaveAccessibleName(/^Escuchar música/);
          const t1 = (await audioState(page)).time;
          await page.waitForTimeout(700);
          const paused = await audioState(page);
          expect(paused.paused).toBe(true);
          expect(paused.time).toBeCloseTo(t1, 1);

          // Reanuda y sigue sonando al recorrer la página.
          await player.click();
          await expect(player).toHaveAttribute("aria-pressed", "true");
          await expect.poll(async () => (await audioState(page)).time, { timeout: 10_000 }).toBeGreaterThan(t1 + 0.3);
          await scrollThrough(page);
          const t2 = (await audioState(page)).time;
          await page.waitForTimeout(700);
          const after = await audioState(page);
          expect(after.paused, "debe seguir sonando tras desplazarse").toBe(false);
          expect(after.time).toBeGreaterThan(t2);
        });

        test("fecha, nombres y calendario salen de la configuración", async ({ page, request }) => {
          await page.goto(`/plantillas/${id}`);
          await openInvitation(page);
          await scrollThrough(page);
          const text = (await page.locator("body").innerText()).toLowerCase();
          expect(text).toContain(inv.dates.long.toLowerCase());
          expect(text).toContain(inv.names.one.toLowerCase());

          const ics = page.locator('a[href$="/calendario.ics"]').first();
          await expect(ics).toBeAttached();
          const res = await request.get((await ics.getAttribute("href"))!);
          expect(res.status()).toBe(200);
          expect(res.headers()["content-type"]).toContain("text/calendar");
          const body = await res.text();
          expect(body).toContain("BEGIN:VEVENT");
          expect(body).toContain(`DTSTART:${inv.startISO.replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`);
          await expect(page.locator('a[href*="calendar.google.com"]').first()).toBeAttached();
        });

        test("galería: abre y cierra la foto en grande", async ({ page }) => {
          await page.goto(`/plantillas/${id}`);
          await openInvitation(page);
          const item = page.getByRole("button", { name: /^Ver en grande/ }).first();
          await item.scrollIntoViewIfNeeded();
          await item.click();
          const dialog = page.getByRole("dialog");
          await expect(dialog).toBeVisible();
          await expectNoHorizontalOverflow(page, width, "galería abierta");
          await page.keyboard.press("Escape");
          await expect(dialog).toBeHidden();
          await item.click();
          await expect(dialog).toBeVisible();
          await dialog.getByRole("button", { name: "Cerrar" }).click();
          await expect(dialog).toBeHidden();
          await expectNoHorizontalOverflow(page, width, "galería cerrada");
        });

        test("confirmación: valida, confirma y avisa que no podrá asistir", async ({ page }) => {
          test.skip(!inv.rsvp, "sin confirmación");
          await page.goto(`/plantillas/${id}`);
          await openInvitation(page);
          await scrollToSection(page, "#confirmar");

          const referrer = page.getByRole("radiogroup", { name: /de parte de quién/i });
          if (await referrer.count()) await referrer.getByRole("radio").first().click();
          await page.getByRole("radio", { name: "Individual" }).click();
          const submit = page.getByRole("button", { name: /confirmar por whatsapp/i });
          await submit.click();
          await expect(page.getByText("Escribe tu nombre y apellido.")).toBeVisible();

          await page.getByRole("textbox", { name: "Nombre y apellido" }).fill("Persona de Prueba");
          await submit.click();
          // En la demo se muestra el mensaje en lugar de abrir WhatsApp.
          await expect(page.getByRole("status").filter({ hasText: "Persona de Prueba" })).toBeVisible();
          await expectNoHorizontalOverflow(page, width, "tras confirmar");

          if (inv.rsvp?.allowDecline) {
            await page.getByRole("button", { name: /no podrás asistir/i }).click();
            await page.locator("#declineName").fill("Otra Persona");
            await page.getByRole("button", { name: /avisar por whatsapp/i }).click();
            await expect(page.getByRole("status").filter({ hasText: "Otra Persona" })).toBeVisible();
            await expectNoHorizontalOverflow(page, width, "tras avisar que no asiste");
          }
        });

        test("regreso al catálogo", async ({ page }) => {
          await page.goto(`/plantillas/${id}`);
          await page.getByRole("link", { name: "Diseños" }).click();
          await expect(page).toHaveURL(/\/(#disenos)?$/);
          await expect(page.locator(`a[href="/plantillas/${id}"]`).first()).toBeAttached();
        });
      });
    }
  });
}
