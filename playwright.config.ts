// Pruebas de navegador (`npm run test:e2e`). Corren contra el sitio YA
// COMPILADO (`npm run build`) que Playwright levanta con `next start`.
// Navegador: el Google Chrome instalado (sin descargas). Para usar el
// Chromium de Playwright: `npx playwright install chromium` y
// E2E_BROWSER=chromium. Detalle en README.md, "Pruebas".

import { defineConfig } from "@playwright/test";

const port = Number(process.env.E2E_PORT ?? 3210);

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 90_000,
  // El servidor local atiende varias pruebas a la vez: una navegación puede
  // tardar más de los 5 s por defecto sin que haya un error real.
  expect: { timeout: 15_000 },
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${port}`,
    channel: process.env.E2E_BROWSER === "chromium" ? undefined : "chrome",
    // Barra de desplazamiento visible, como en un escritorio real (sin ella
    // no se ven los saltos de ancho que causaba en escritorio).
    launchOptions: { ignoreDefaultArgs: ["--hide-scrollbars"] },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: `npx next start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
