// Barra de navegación (templates/shared/PageNav.tsx) y selector "Otros
// diseños" (DesignsMenu.tsx), en los ocho diseños y el catálogo. Teléfono
// (390 × 844) y escritorio (1366 × 768). El desplazamiento lateral con la
// barra visible lo cubre responsive.spec.ts en los 9 tamaños.

import { expect, test, type Locator, type Page } from "@playwright/test";
import { demos } from "../../templates/demos";
import { resolveInvitation } from "../../lib/invitation/resolve";
import { navSections } from "../../lib/invitation/sections";
import { catalogGroups } from "../../components/catalog/groups";
import { audioState, openInvitation, templateIds, viewport } from "./helpers";

type Box = { x: number; y: number; width: number; height: number };
const overlaps = (a: Box, b: Box) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;

async function settle(page: Page) {
  let last = -1;
  for (let i = 0; i < 40; i++) {
    const y = await page.evaluate(() => window.scrollY);
    if (y === last) return y;
    last = y;
    await page.waitForTimeout(150);
  }
  return last;
}

// La barra visible según el tamaño: abajo en el teléfono, arriba en escritorio.
const bar = (page: Page, mobile: boolean) => page.locator(mobile ? '[data-page-nav="bar"]' : '[data-page-nav="desktop"]');

async function openMenu(page: Page, mobile: boolean): Promise<Locator> {
  await bar(page, mobile).getByRole("button", { name: /^(Secciones|Categorías)/ }).click();
  const menu = page.locator(mobile ? '[data-page-nav="sheet"]' : '[data-page-nav="dropdown"]');
  await expect(menu).toBeVisible();
  return menu;
}

// Título de la sección (h2/h3); si no tiene (p. ej. la historia de Gala
// empieza con una foto panorámica), el primer elemento visible.
async function headingBox(page: Page, id: string): Promise<Box | null> {
  return page.evaluate((id) => {
    const el = document.getElementById(id)!;
    const titles = Array.from(el.querySelectorAll("h2,h3"));
    const candidates = titles.length ? titles : Array.from(el.querySelectorAll("img,p,a,button"));
    const h = candidates.find((n) => {
      const r = n.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    if (!h) return null;
    const r = h.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  }, id);
}

for (const [width, height] of [
  [390, 844],
  [1366, 768],
] as const) {
  const mobile = width < 900;
  test.describe(`${mobile ? "teléfono" : "escritorio"} ${width}×${height}`, () => {
    test.use(viewport(width, height));

    for (const id of templateIds) {
      const inv = resolveInvitation(demos[id], { basePath: `/plantillas/${id}`, isDemo: true });
      const expected = navSections(inv);

      test(`${id}: cada sección del menú existe y el salto deja su título a la vista`, async ({ page }) => {
        test.setTimeout(180_000); // recorre todas las secciones, una por una
        await page.goto(`/plantillas/${id}`);
        await openInvitation(page);
        // Arriba del todo la barra no está (no tapa la portada ni el indicador).
        await expect(bar(page, mobile)).toHaveCSS("opacity", "0");
        await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
        await expect(bar(page, mobile)).toHaveCSS("opacity", "1");

        // El menú ofrece exactamente las secciones de la configuración (más
        // "Inicio"), en el orden de la página, y todas existen.
        let menu = await openMenu(page, mobile);
        const offered = await menu.locator("[data-nav-item]").evaluateAll((els) => els.map((e) => e.getAttribute("data-nav-item")));
        expect(offered[0]).toBe("inicio");
        expect([...offered.slice(1)].sort()).toEqual(expected.map((s) => s.id).sort());
        const tops = await page.evaluate((ids) => ids.map((i) => document.getElementById(i!)?.getBoundingClientRect().top ?? NaN), offered.slice(1));
        expect(tops.every((t) => Number.isFinite(t))).toBe(true);
        expect([...tops].sort((a, b) => a - b)).toEqual(tops);
        for (const s of expected) await expect(menu.getByRole("button", { name: new RegExp(`^${s.label}`) })).toBeVisible();

        // Escape cierra (y en el teléfono también "Cerrar").
        await page.keyboard.press("Escape");
        await expect(menu).toBeHidden();
        if (mobile) {
          menu = await openMenu(page, mobile);
          await menu.getByRole("button", { name: "Cerrar" }).click();
          await expect(menu).toBeHidden();
        }

        // Saltar a cada sección: queda arriba, con su título visible y sin
        // que la barra lo tape; la sección actual se marca en el menú.
        for (const s of expected) {
          // Cada salto parte de cerca de la portada (sobre el formulario de
          // confirmación el teléfono aparta la barra a propósito).
          await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
          await expect(bar(page, mobile)).toHaveCSS("opacity", "1");
          menu = await openMenu(page, mobile);
          await menu.locator(`[data-nav-item="${s.id}"]`).click();
          await expect(menu).toBeHidden();
          await settle(page);
          const top = await page.evaluate((i) => document.getElementById(i)!.getBoundingClientRect().top, s.id);
          const atEnd = await page.evaluate(() => Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2);
          if (!atEnd) expect(top, `${s.id}: la sección debe quedar arriba`).toBeLessThan(height * 0.25);
          const h = await headingBox(page, s.id);
          expect(h, `${s.id}: sin texto visible`).not.toBeNull();
          expect(h!.y, `${s.id}: el título queda arriba de la pantalla`).toBeGreaterThanOrEqual(0);
          expect(h!.y + h!.height, `${s.id}: el título queda debajo de la pantalla`).toBeLessThanOrEqual(height);
          const navBox = (await bar(page, mobile).boundingBox())!;
          expect(overlaps(h!, navBox), `${s.id}: la barra tapa el título`).toBe(false);
          expect(await page.evaluate(() => document.activeElement?.id), "el foco pasa a la sección").toBe(s.id);
        }

        // "Inicio" vuelve a la portada (desde un punto donde la barra se ve:
        // sobre el formulario de confirmación el teléfono la aparta).
        await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
        await expect(bar(page, mobile)).toHaveCSS("opacity", "1");
        await bar(page, mobile).getByRole("button", { name: "Inicio: portada de la invitación" }).click();
        await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 8000 }).toBeLessThan(5);
      });

      test(`${id}: "Confirmar" lleva al formulario, la barra no tapa el envío y la música sigue`, async ({ page }) => {
        test.skip(!inv.rsvp, "sin confirmación");
        await page.goto(`/plantillas/${id}`);
        await openInvitation(page);
        await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
        await bar(page, mobile).getByRole("button", { name: /^Confirmar/ }).click();
        await settle(page);
        await expect.poll(() => page.evaluate(() => document.getElementById("confirmar")!.getBoundingClientRect().top)).toBeLessThan(height * 0.25);
        // Dentro del formulario el botón "Confirmar" de la barra sobra.
        await expect(bar(page, mobile).getByRole("button", { name: /^Confirmar/ })).toHaveCount(0);

        const referrer = page.getByRole("radiogroup", { name: /de parte de quién/i });
        if (await referrer.count()) await referrer.getByRole("radio").first().click();
        await page.getByRole("radio", { name: /^Solo yo/ }).click();
        const field = page.getByRole("textbox", { name: "Nombre y apellido" });
        await field.fill("Persona de Prueba");
        // Escribiendo, la barra se aparta (el teclado del teléfono la subiría).
        if (mobile) await expect(bar(page, mobile)).toHaveCSS("opacity", "0");
        await field.blur();
        const submit = page.getByRole("button", { name: /confirmar por whatsapp/i });
        await submit.evaluate((el) => el.scrollIntoView({ block: "end", behavior: "instant" }));
        await page.waitForTimeout(400);
        const s = (await submit.boundingBox())!;
        const visibleNav = await bar(page, mobile).evaluate((el) => getComputedStyle(el).opacity === "1");
        if (visibleNav) expect(overlaps(s, (await bar(page, mobile).boundingBox())!), "la barra tapa «Confirmar por WhatsApp»").toBe(false);
        await submit.click({ trial: true }); // nada lo tapa
        await submit.click();
        await expect(page.getByRole("status").filter({ hasText: "Persona de Prueba" })).toBeVisible();
        if (inv.content.music) expect((await audioState(page)).paused, "la música sigue sonando").toBe(false);
      });
    }

    test("teclado: Tab llega a la barra, Enter abre el menú y elige una sección", async ({ page }) => {
      await page.goto("/plantillas/aurora");
      await openInvitation(page);
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
      await expect(bar(page, mobile)).toHaveCSS("opacity", "1");
      const trigger = bar(page, mobile).getByRole("button", { name: /^Secciones/ });
      await trigger.press("Enter");
      const menu = page.locator(mobile ? '[data-page-nav="sheet"]' : '[data-page-nav="dropdown"]');
      await expect(menu).toBeVisible();
      // El foco entra en el menú (teléfono: "Cerrar"; escritorio: la sección
      // actual) y Tab llega a la galería sin pasar por la página.
      await expect.poll(() => menu.evaluate((m) => m.contains(document.activeElement))).toBe(true);
      const target = menu.locator('[data-nav-item="galeria"]');
      for (let i = 0; i < 12 && !(await target.evaluate((el) => el === document.activeElement)); i++) await page.keyboard.press("Tab");
      await expect(target).toBeFocused();
      // Indicador de foco visible (anillo del navegador o el del diseño).
      expect(await target.evaluate((el) => getComputedStyle(el).outlineStyle !== "none" || getComputedStyle(el).boxShadow !== "none" || getComputedStyle(el).backgroundColor !== "rgba(0, 0, 0, 0)")).toBe(true);
      await page.keyboard.press("Enter");
      await expect(menu).toBeHidden();
      await expect.poll(() => page.evaluate(() => document.activeElement?.id)).toBe("galeria");
    });

    for (const id of templateIds) {
      test(`${id}: «Otros diseños» no queda sobre el visor ni el panel, y Tab no sale de ellos`, async ({ page }) => {
        // ¿Lo de arriba en el centro del botón es el botón mismo?
        const triggerOnTop = () =>
          page.evaluate(() => {
            const t = document.querySelector<HTMLElement>("[data-designs-trigger]")!;
            const r = t.getBoundingClientRect();
            if (getComputedStyle(t).opacity === "0") return false;
            return t.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
          });
        // Tab y Shift+Tab varias veces: el foco sigue dentro de la capa.
        const focusStaysIn = async (layer: Locator) => {
          for (const key of ["Tab", "Tab", "Tab", "Tab", "Tab", "Tab", "Shift+Tab", "Shift+Tab"]) {
            await page.keyboard.press(key);
            expect(await layer.evaluate((l) => l.contains(document.activeElement)), `${key} sacó el foco de la capa`).toBe(true);
          }
        };

        await page.goto(`/plantillas/${id}`);
        await openInvitation(page);
        // El selector de diseños mismo.
        await page.getByRole("button", { name: "Otros diseños" }).click();
        const designs = page.locator("[data-designs-menu]");
        await expect(designs).toBeVisible();
        await focusStaysIn(designs);
        await page.keyboard.press("Escape");
        await expect(designs).toBeHidden();

        // Visor de fotos. Se sube un poco antes de tocar la foto: así
        // "Otros diseños" vuelve a mostrarse (se esconde al bajar).
        const photo = page.locator("#galeria button[aria-label^='Ver en grande']").first();
        await photo.scrollIntoViewIfNeeded();
        await page.mouse.wheel(0, -200);
        await page.waitForTimeout(400);
        await photo.click();
        const viewer = page.getByRole("dialog").filter({ has: page.getByRole("button", { name: "Cerrar" }) });
        await expect(viewer).toBeVisible();
        expect(await triggerOnTop(), "«Otros diseños» sobre el visor").toBe(false);
        await focusStaysIn(viewer);
        await page.keyboard.press("Escape");
        await expect(viewer).toBeHidden();

        if (mobile) {
          // Lejos del formulario de confirmación (sobre él la barra se aparta
          // a propósito; en Riviera viene justo después de la galería).
          await page.locator("#fecha").evaluate((el) => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" }));
          await expect(bar(page, true)).toHaveCSS("opacity", "1");
          const sheet = await openMenu(page, true);
          expect(await triggerOnTop(), "«Otros diseños» sobre el panel de secciones").toBe(false);
          await focusStaysIn(sheet);
          await page.keyboard.press("Escape");
          await expect(sheet).toBeHidden();
        }
      });
    }

    test("con «reducir movimiento» el salto es inmediato", async ({ browser }) => {
      const ctx = await browser.newContext({ ...viewport(width, height), reducedMotion: "reduce" });
      const page = await ctx.newPage();
      await page.goto("/plantillas/olivo");
      await openInvitation(page);
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
      await expect(bar(page, mobile)).toHaveCSS("opacity", "1");
      const menu = await openMenu(page, mobile);
      await menu.locator('[data-nav-item="regalos"]').click();
      await page.waitForTimeout(120);
      expect(await page.evaluate(() => Math.abs(document.getElementById("regalos")!.getBoundingClientRect().top))).toBeLessThan(100);
      await ctx.close();
    });

    test("«Otros diseños»: ocho diseños por categoría, cambia de diseño y vuelve al catálogo", async ({ page }) => {
      await page.goto("/plantillas/riviera");
      // Está también sobre la portada, antes de abrir la invitación.
      await page.getByRole("button", { name: "Otros diseños" }).click();
      const dialog = page.getByRole("dialog", { name: "Otros diseños" });
      await expect(dialog).toBeVisible();
      for (const g of catalogGroups) await expect(dialog.getByRole("heading", { name: g.title })).toBeVisible();
      await expect(dialog.locator('a[href^="/plantillas/"]')).toHaveCount(templateIds.length - 1);
      await expect(dialog.locator('[aria-current="page"]')).toContainText("Riviera");
      await expect(dialog.locator('[aria-current="page"]')).toContainText("Estás viendo este diseño");
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();

      // Desde la barra de la invitación (teléfono) o el botón (escritorio).
      await openInvitation(page);
      if (mobile) {
        await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
        const sheet = await openMenu(page, true);
        await sheet.getByRole("button", { name: "Ver otros diseños" }).click();
      } else {
        await page.getByRole("button", { name: "Otros diseños" }).click();
      }
      await expect(dialog).toBeVisible();
      await dialog.locator('a[href="/plantillas/arrullo"]').click();
      await expect(page).toHaveURL(/\/plantillas\/arrullo$/, { timeout: 30_000 });
      await expect(page.getByRole("button", { name: /abrir invitación/i })).toBeVisible();

      await page.getByRole("button", { name: "Otros diseños" }).click();
      await dialog.getByRole("link", { name: "Volver al catálogo" }).click();
      await expect(page).toHaveURL(/\/(#disenos)?$/, { timeout: 30_000 });
      await expect(page.locator('a[href="/plantillas/arrullo"]').first()).toBeAttached();
    });

    test("«Volver al catálogo»: directo desde arriba y desde el menú de secciones; «Inicio» es la portada", async ({ page }) => {
      const catalogLoaded = async () => {
        await expect(page).toHaveURL(/\/(#disenos)?$/, { timeout: 30_000 });
        await expect(page.locator("#disenos")).toBeAttached();
        await expect(page.locator("[data-designs-trigger]")).toHaveCount(0);
      };

      // 1. La pastilla de arriba: dos acciones con texto, ≥ 44 px, sobre la
      //    portada y sin abrir la invitación.
      await page.goto("/plantillas/gala");
      const pill = page.locator("[data-designs-trigger]");
      const back = pill.getByRole("link", { name: "Volver al catálogo" });
      await expect(back).toBeVisible();
      await expect(back).toContainText("Catálogo");
      await expect(pill.getByRole("button", { name: "Otros diseños" })).toBeVisible();
      for (const control of [back, pill.getByRole("button", { name: "Otros diseños" })]) {
        const box = (await control.boundingBox())!;
        expect(box.height, "zona táctil").toBeGreaterThanOrEqual(44);
      }
      // Teclado: se llega con Tab y tiene foco visible.
      await back.focus();
      expect(await back.evaluate((el) => getComputedStyle(el).outlineStyle !== "none" || getComputedStyle(el).boxShadow !== "none")).toBe(true);
      await back.press("Enter");
      await catalogLoaded();

      // 2. Desde el menú de secciones, en medio de la invitación (la
      //    pastilla de arriba se aparta al bajar).
      await page.goto("/plantillas/nube");
      await openInvitation(page);
      await page.evaluate(() => window.scrollTo({ top: 1600, behavior: "instant" }));
      await expect(bar(page, mobile)).toHaveCSS("opacity", "1");
      const menu = await openMenu(page, mobile);
      // "Inicio" dice que es la portada de esta invitación, no el catálogo.
      await expect(menu.locator('[data-nav-item="inicio"]')).toContainText("Portada de la invitación");
      await expect(menu.getByText("Demostración")).toBeVisible();
      await expect(menu.getByRole("button", { name: "Ver otros diseños" })).toBeVisible();
      await menu.getByRole("link", { name: "Volver al catálogo" }).click();
      await catalogLoaded();

      // 3. "Inicio" lleva a la portada de la invitación abierta (no al catálogo).
      await page.goto("/plantillas/olivo");
      await openInvitation(page);
      await page.evaluate(() => window.scrollTo({ top: 1600, behavior: "instant" }));
      await expect(bar(page, mobile)).toHaveCSS("opacity", "1");
      await bar(page, mobile).getByRole("button", { name: "Inicio: portada de la invitación" }).click();
      await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 10_000 }).toBeLessThan(5);
      await expect(page).toHaveURL(/\/plantillas\/olivo$/);
    });

    test("«Otros diseños» con la letra del sistema agrandada: nada sale de las tarjetas a 320 px", async ({ browser }) => {
      test.skip(!mobile, "solo teléfono");
      const ctx = await browser.newContext(viewport(320, 568));
      const page = await ctx.newPage();
      await page.goto("/plantillas/tierra");
      await page.addStyleTag({ content: "html { font-size: 125% !important; }" });
      await page.getByRole("button", { name: "Otros diseños" }).click();
      const list = page.locator("[data-designs-menu] .overflow-y-auto");
      await expect(list).toBeVisible();
      // Sin desplazamiento lateral dentro del panel ni textos fuera de su tarjeta.
      expect(await list.evaluate((l) => l.scrollWidth - l.clientWidth)).toBeLessThanOrEqual(1);
      const outside = await list.evaluate((l) =>
        Array.from(l.querySelectorAll("li")).flatMap((li) => {
          const box = li.getBoundingClientRect();
          return Array.from(li.querySelectorAll("span"))
            .filter((s) => s.getBoundingClientRect().right > box.right + 1)
            .map((s) => s.textContent);
        }),
      );
      expect(outside).toEqual([]);
      await ctx.close();
    });

    test("catálogo: la barra salta a cada categoría", async ({ page }) => {
      await page.goto("/");
      await page.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" }));
      for (const g of catalogGroups) {
        const menu = await openMenu(page, mobile);
        await expect(menu.locator("[data-nav-item]")).toHaveCount(catalogGroups.length + 1);
        await menu.locator(`[data-nav-item="${g.id}"]`).click();
        await settle(page);
        const h = (await page.locator(`#grupo-${g.id}`).boundingBox())!;
        expect(h.y).toBeGreaterThanOrEqual(0);
        expect(h.y + h.height).toBeLessThanOrEqual(height);
        expect(overlaps(h, (await bar(page, mobile).boundingBox())!)).toBe(false);
      }
      // No hay selector de diseños ni "Volver al catálogo" en el catálogo (ya
      // es la lista completa); su menú no trae el bloque de las demos.
      await expect(page.getByRole("button", { name: "Otros diseños" })).toHaveCount(0);
      await expect(page.locator("[data-catalog-link]")).toHaveCount(0);
      const menu = await openMenu(page, mobile);
      await expect(menu.getByText("Demostración")).toHaveCount(0);
      await expect(menu.locator('[data-nav-item="inicio"]')).toContainText("Principio del catálogo");
    });
  });
}
