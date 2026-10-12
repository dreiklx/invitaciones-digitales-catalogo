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
          // La portada avisa que habrá música antes de tocar el botón.
          await expect(page.getByText("Con música: podrás pausarla cuando quieras.")).toBeVisible();
          await page.waitForTimeout(800);
          expect((await audioState(page)).paused, "no debe sonar antes de abrir").toBe(true);
          expect(audioResponses, "no debe descargar el audio antes de abrir").toEqual([]);

          await openInvitation(page);
          // Teléfono: al empezar a sonar, un aviso breve (6 s) dice qué es y
          // cómo se pausa. Se busca enseguida: después ya no está.
          if (width < 900) await expect(page.locator("[data-music-hint]")).toHaveText(/música:\s*toca para\s*pausar/i);
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

        test("galería: dice que las fotos se abren; abre y cierra la foto en grande", async ({ page }) => {
          await page.goto(`/plantillas/${id}`);
          await openInvitation(page);
          const item = page.getByRole("button", { name: /^Ver en grande/ }).first();
          // Sin animación (html tiene scroll-behavior: smooth): con varias
          // pruebas en paralelo el desplazamiento suave seguía en curso al
          // medir la posición.
          await item.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
          const hint = page.locator("[data-gallery-hint]").first();
          await expect(hint).toBeVisible();
          await expect(hint).toHaveText(width < 900 ? "Toca una foto para verla en grande." : "Haz clic en una foto para verla en grande.", { useInnerText: true });
          // Posición de la página con el visor abierto: al cerrarlo (Escape o
          // "Cerrar") debe quedar igual. Se mide ya abierto porque el clic de
          // Playwright puede desplazar la página si algo flotante tapa la foto.
          const scrollY = () => page.evaluate(() => window.scrollY);
          await item.click();
          const dialog = page.getByRole("dialog");
          await expect(dialog).toBeVisible();
          await expectNoHorizontalOverflow(page, width, "galería abierta");
          let before = await scrollY();
          await page.keyboard.press("Escape");
          await expect(dialog).toBeHidden();
          expect(Math.abs((await scrollY()) - before), "Escape movió la página").toBeLessThan(4);
          await item.click();
          await expect(dialog).toBeVisible();
          before = await scrollY();
          await dialog.getByRole("button", { name: "Cerrar" }).click();
          await expect(dialog).toBeHidden();
          // Al cerrar, la página sigue donde estaba.
          await page.waitForTimeout(300);
          expect(Math.abs((await scrollY()) - before), "«Cerrar» movió la página").toBeLessThan(4);
          await expectNoHorizontalOverflow(page, width, "galería cerrada");
        });

        test("confirmación: valida, confirma y avisa que no podrá asistir", async ({ page }) => {
          test.skip(!inv.rsvp, "sin confirmación");
          await page.goto(`/plantillas/${id}`);
          await openInvitation(page);
          await scrollToSection(page, "#confirmar");

          const referrer = page.getByRole("radiogroup", { name: /de parte de quién/i });
          if (await referrer.count()) await referrer.getByRole("radio").first().click();
          // Las opciones dicen quién va, no "Individual"/"Grupo".
          await expect(page.getByRole("radiogroup", { name: "¿Quiénes van a asistir?" })).toBeVisible();
          await page.getByRole("radio", { name: /^Solo yo/ }).click();
          const submit = page.getByRole("button", { name: /confirmar por whatsapp/i });
          await submit.click();
          await expect(page.getByText("Escribe tu nombre y apellido.")).toBeVisible();

          await page.getByRole("textbox", { name: "Nombre y apellido" }).fill("Persona de Prueba");
          await expect(submit.locator("xpath=following-sibling::p[1]")).toContainText("Enviar");
          await submit.click();
          // En la demo se muestra el mensaje en lugar de abrir WhatsApp.
          await expect(page.getByRole("status").filter({ hasText: "Persona de Prueba" })).toBeVisible();
          await expectNoHorizontalOverflow(page, width, "tras confirmar");

          if (inv.rsvp?.allowDecline) {
            await page.getByRole("button", { name: /no podrás asistir/i }).click();
            const declineButton = page.getByRole("button", { name: /avisar por whatsapp que no asistiré/i });
            await declineButton.click();
            await expect(page.getByText("Escribe tu nombre y apellido.")).toBeVisible();
            await page.locator("#declineName").fill("Otra Persona");
            await declineButton.click();
            const declined = page.getByRole("status").filter({ hasText: "Otra Persona" });
            await expect(declined).toBeVisible();
            // El aviso no debe parecer una confirmación.
            await expect(declined).toContainText("no podré asistir");
            await expect(declined).not.toContainText("confirmar");
            await expectNoHorizontalOverflow(page, width, "tras avisar que no asiste");
          }
        });

        test("confirmación de varias personas: contador, nombres que faltan y cambio a «Solo yo»", async ({ page }) => {
          test.skip(!inv.rsvp, "sin confirmación");
          const rsvp = inv.rsvp!;
          await page.goto(`/plantillas/${id}`);
          await openInvitation(page);
          await scrollToSection(page, "#confirmar");

          const referrer = page.getByRole("radiogroup", { name: /de parte de quién/i });
          if (await referrer.count()) await referrer.getByRole("radio").first().click();
          await page.getByRole("radio", { name: /^Varias personas/ }).click();
          await expect(page.getByText("Cuéntate a ti también.")).toBeVisible();

          // El contador respeta el mínimo y el máximo de la configuración.
          const minus = page.getByRole("button", { name: "Restar una persona" });
          const plus = page.getByRole("button", { name: "Sumar una persona" });
          await expect(minus).toBeDisabled();
          await plus.click();
          const names = page.locator('input[id^="guestName-"]');
          await expect(names).toHaveCount(Math.min(rsvp.maxGroupSize, rsvp.minGroupSize + 1));
          await expect(page.getByLabel("Tu nombre y apellido")).toBeVisible();
          await expect(page.getByLabel("Persona 2: nombre y apellido")).toBeVisible();

          // Falta un nombre: el error se explica, se anuncia y el cursor va a ese campo.
          await names.nth(0).fill("Persona Uno");
          const submit = page.getByRole("button", { name: /confirmar por whatsapp/i });
          await submit.click();
          await expect(page.getByRole("alert").filter({ hasText: "Falta el nombre de alguna persona" })).toBeVisible();
          await expect(names.nth(1)).toBeFocused();
          await expect(names.nth(1)).toHaveAttribute("aria-invalid", "true");

          const count = await names.count();
          for (let i = 1; i < count; i++) await names.nth(i).fill(`Persona ${i + 1}`);
          await submit.click();
          const sent = page.getByRole("status").filter({ hasText: "Persona Uno" });
          await expect(sent).toBeVisible();
          await expect(sent).toContainText(`Persona ${count}`);

          // Volver a «Solo yo» deja un solo campo y sin errores.
          await page.getByRole("radio", { name: /^Solo yo/ }).click();
          await expect(names).toHaveCount(1);
          await expect(page.locator("#confirmar").getByRole("alert")).toHaveCount(0);
          await expectNoHorizontalOverflow(page, width, "varias personas");
        });

        test("regreso al catálogo", async ({ page }) => {
          await page.goto(`/plantillas/${id}`);
          await page.getByRole("button", { name: "Otros diseños" }).click();
          await page.getByRole("dialog", { name: "Otros diseños" }).getByRole("link", { name: /volver al catálogo completo/i }).click();
          // Con muchas pruebas en paralelo el servidor local puede tardar en
          // responder la navegación (siempre ocurre; ver project-log).
          await expect(page).toHaveURL(/\/(#disenos)?$/, { timeout: 30_000 });
          await expect(page.locator(`a[href="/plantillas/${id}"]`).first()).toBeAttached();
        });
      });
    }
  });
}
