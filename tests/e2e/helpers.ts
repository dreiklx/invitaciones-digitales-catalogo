import { expect, type Page } from "@playwright/test";

export { templateIds } from "../../templates/registry";

// Pantallas que se revisan (ancho × alto). 320 × 568 es un iPhone SE
// antiguo; 320 × 600, uno angosto con la barra del navegador abierta.
export type Size = [width: number, height: number];
export const MOBILE_SIZES: Size[] = [[320, 568], [320, 600], [360, 740], [390, 844], [430, 932]];
export const DESKTOP_SIZES: Size[] = [[1024, 768], [1366, 768], [1440, 900], [1920, 1080]];
const HEIGHTS: Record<number, number> = Object.fromEntries([...MOBILE_SIZES, ...DESKTOP_SIZES].reverse());

// Teléfono: pantalla táctil (puntero "coarse"), como en un celular real.
export function viewport(width: number, height = HEIGHTS[width] ?? 800) {
  const mobile = width < 900;
  return { viewport: { width, height }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1 };
}

type Overflow = {
  clientWidth: number;
  innerWidth: number;
  docScrollWidth: number;
  bodyScrollWidth: number;
  panned: number;
  offenders: string[];
};

// ¿Se puede mover la página hacia los lados? Mira el documento completo
// (no solo el body), intenta desplazarla de verdad y, si algo sobresale,
// lista los elementos culpables para el mensaje de error.
export async function measureOverflow(page: Page): Promise<Overflow> {
  return page.evaluate(() => {
    const de = document.documentElement;
    const vw = de.clientWidth;
    const y = window.scrollY;
    window.scrollTo({ left: 500, top: y, behavior: "instant" });
    const panned = window.scrollX;
    window.scrollTo({ left: 0, top: y, behavior: "instant" });
    const offenders: string[] = [];
    if (de.scrollWidth > vw + 1 || document.body.scrollWidth > vw + 1 || panned > 0) {
      for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0 && (r.right > vw + 1 || r.left < -1)) {
          const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 4).join(".") : "";
          offenders.push(`${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${cls ? "." + cls : ""} [${Math.round(r.left)}→${Math.round(r.right)}]`);
          if (offenders.length >= 6) break;
        }
      }
    }
    return { clientWidth: vw, innerWidth: window.innerWidth, docScrollWidth: de.scrollWidth, bodyScrollWidth: document.body.scrollWidth, panned, offenders };
  });
}

// Tolerancia de 1 px solo para redondeos de subpíxeles.
export async function expectNoHorizontalOverflow(page: Page, width: number, step: string) {
  const o = await measureOverflow(page);
  const detail = `${step} @${width}px: ${JSON.stringify(o)}`;
  expect(o.docScrollWidth, detail).toBeLessThanOrEqual(o.clientWidth + 1);
  expect(o.bodyScrollWidth, detail).toBeLessThanOrEqual(o.clientWidth + 1);
  expect(o.panned, detail).toBe(0);
  // En un teléfono, el contenido ancho agranda el viewport de diseño.
  if (width < 900) expect(o.innerWidth, detail).toBe(width);
}

export async function openInvitation(page: Page) {
  const button = page.getByRole("button", { name: /abrir invitación/i });
  await button.click();
  await expect(button).toBeHidden({ timeout: 10_000 });
}

// Recorre la página de arriba abajo (dispara las animaciones de entrada y
// la carga diferida) y llama a `each` en cada tramo.
export async function scrollThrough(page: Page, each?: (y: number) => Promise<void>) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = await page.evaluate(() => Math.round(window.innerHeight * 0.9));
  for (let y = 0; y <= height; y += step) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(120);
    await each?.(y);
  }
}

export async function audioState(page: Page) {
  return page.evaluate(() => {
    const audios = Array.from(document.querySelectorAll("audio"));
    const a = audios[0];
    return a
      ? { count: audios.length, paused: a.paused, time: a.currentTime, error: a.error?.code ?? null, muted: a.muted, readyState: a.readyState }
      : { count: 0, paused: true, time: 0, error: null, muted: false, readyState: 0 };
  });
}
