// Pruebas de navegador de una invitación de CLIENTE generada y compilada
// por `npm run test:cliente` (scripts/test-cliente.ts), que pasa la carpeta
// de la copia en CLIENTE_DIR. No correr directamente.

import path from "node:path";
import { defineConfig } from "@playwright/test";

const dir = process.env.CLIENTE_DIR;
if (!dir) throw new Error("Usar `npm run test:cliente` (falta CLIENTE_DIR).");
const port = Number(process.env.CLIENTE_PORT ?? 3230);

export default defineConfig({
  testDir: "tests/cliente",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${port}`,
    channel: process.env.E2E_BROWSER === "chromium" ? undefined : "chrome",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `node "${path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next")}" start -p ${port}`,
    cwd: dir,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
