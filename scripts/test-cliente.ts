// npm run test:cliente [-- <diseño> …] [--conservar]
//
// Prueba de punta a punta de una invitación de CLIENTE, como se haría de
// verdad (propuesta P14 de docs/auditoria.md):
//  1. Copia el proyecto a .pruebas-tmp/cliente-<diseño>/ (dentro del
//     proyecto e ignorada por git, TypeScript, ESLint y Vercel), sin .git,
//     .vercel, .env*, node_modules, .next ni archivos privados.
//  2. En la copia corre `npm run nueva -- <diseño>` (el generador real).
//  3. Completa los "REEMPLAZAR" con datos ficticios de prueba
//     (scripts/lib/test-invitation.ts) y crea fotos de prueba de la
//     proporción de cada espacio en public/images/.
//  4. `npm run check` y `npm run build:offline` en la copia (sin red).
//  5. Playwright (playwright.cliente.config.ts, tests/cliente/) levanta la
//     copia con `next start` y revisa la invitación en el navegador.
//  6. Borra la copia (salvo --conservar).
// config/invitation.ts del proyecto NUNCA se toca.
// Sin argumentos prueba Olivo (pareja), Aurora (festejada) y Arrullo
// (baby shower): los tres modelos de "quién celebra".

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { demos } from "../templates/demos";
import { templateIds, templateMetas } from "../templates/registry";
import { catalogGroups } from "../components/catalog/groups";
import { demoMarkers } from "../lib/invitation/names";
import { calendarStamp, resolveInvitation } from "../lib/invitation/resolve";
import { navSections } from "../lib/invitation/sections";
import type { Invitation, TemplateId } from "../lib/invitation/types";
import { invitationSource } from "./lib/new-invitation";
import { fillTestData } from "./lib/test-invitation";

const root = process.cwd();
const args = process.argv.slice(2);
const keep = args.includes("--conservar");
const chosen = args.filter((a) => !a.startsWith("--")) as TemplateId[];
const designs: TemplateId[] = chosen.length ? chosen : ["olivo", "aurora", "arrullo"];
for (const id of designs) if (!templateIds.includes(id)) throw new Error(`Diseño desconocido: ${id}. Diseños: ${templateIds.join(", ")}`);

// Lo que NUNCA se copia: historial, enlaces y secretos de Vercel,
// dependencias, compilados, archivos privados o locales y la propia carpeta
// de pruebas. Sin package-lock.json, la copia usa el node_modules del
// proyecto (Turbopack toma como raíz la carpeta del lockfile de arriba).
const SKIP = new Set([".git", ".vercel", "node_modules", ".next", "_anterior", "img", ".pruebas-tmp", ".claude", ".agents", "test-results", "playwright-report", "blob-report", "coverage", "package-lock.json", "tsconfig.tsbuildinfo"]);
const skip = (name: string) => SKIP.has(name) || name.startsWith(".env");

const bin = path.join(root, "node_modules", ".bin");
const env = { ...process.env, PATH: `${bin}${path.delimiter}${process.env.PATH ?? ""}`, NEXT_TELEMETRY_DISABLED: "1" };

function run(cwd: string, command: string, extraEnv: Record<string, string> = {}) {
  console.log(`\n$ ${command}   (${path.relative(root, cwd) || "."})`);
  const r = spawnSync(command, { cwd, stdio: "inherit", shell: true, env: { ...env, ...extraEnv } });
  if (r.status !== 0) throw new Error(`Falló: ${command}`);
}

function remove(dir: string) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
}

async function testDesign(id: TemplateId, port: number) {
  const dir = path.join(root, ".pruebas-tmp", `cliente-${id}`);
  remove(dir);
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(root)) {
    if (skip(name)) continue;
    cpSync(path.join(root, name), path.join(dir, name), { recursive: true, filter: (src) => !skip(path.basename(src)) });
  }
  if (existsSync(path.join(dir, ".env.local")) || existsSync(path.join(dir, ".vercel"))) throw new Error("La copia incluye secretos.");

  try {
    // 2. El generador real, en la copia (su config/invitation.ts es null).
    run(dir, `npm run nueva -- ${id}`);

    // 3. Datos de prueba + fotos de prueba.
    const generatedUrl = pathToFileURL(path.join(dir, "config", "invitation.ts")).href;
    const generated = (await import(generatedUrl)).invitation as Invitation;
    const inv = fillTestData(generated);
    writeFileSync(path.join(dir, "config", "invitation.ts"), invitationSource(inv));
    const slots = templateMetas[id].photoSlots as Record<string, { ratio: [number, number] }>;
    for (const [slot, photo] of Object.entries(inv.photos as Record<string, { src: string }>)) {
      const [w, h] = slots[slot].ratio;
      const file = path.join(dir, "public", photo.src);
      mkdirSync(path.dirname(file), { recursive: true });
      await sharp({ create: { width: w * 200, height: h * 200, channels: 3, background: { r: 180, g: 170, b: 160 } } }).jpeg().toFile(file);
    }

    // 4. Validación y build sin red, como en un despliegue.
    run(dir, "npm run check");
    run(dir, "npm run build:offline");

    // Lo que la prueba de navegador espera (y lo que nunca debe aparecer).
    const resolved = resolveInvitation(inv);
    const demoPhotos = templateIds.flatMap((d) => Object.values(demos[d].photos as Record<string, { src: string }>).map((p) => p.src));
    const expected = {
      id,
      names: [resolved.names.one, resolved.names.two].filter(Boolean),
      siteTitle: resolved.siteTitle,
      dateLong: resolved.dates.long,
      dtstart: `DTSTART:${calendarStamp(new Date(resolved.startISO))}`,
      places: resolved.locations.map((l) => l.name),
      whatsapp: resolved.rsvp?.whatsappNumber ?? null,
      sections: navSections(resolved).map((s) => s.label),
      otherDesigns: templateIds.filter((d) => d !== id),
      demoPhotos,
      demoMarkers: [...new Set(templateIds.flatMap((d) => { const m = demoMarkers(demos[d]); return [...m.people, ...m.places]; }))],
      catalogTexts: ["Otros diseños", "Volver al catálogo", "Catálogo de demostración", "Invitación de demostración", ...catalogGroups.map((g) => g.text)],
    };
    writeFileSync(path.join(dir, "expected.json"), JSON.stringify(expected, null, 2));

    // 5. Navegador.
    run(root, "npx playwright test -c playwright.cliente.config.ts", { CLIENTE_DIR: dir, CLIENTE_PORT: String(port) });
  } finally {
    // 6. Limpieza.
    if (!keep) remove(dir);
    else console.log(`\nCopia conservada en ${path.relative(root, dir)}`);
  }
}

async function main() {
  let port = 3230;
  for (const id of designs) {
    console.log(`\n══ Invitación de cliente de prueba: ${templateMetas[id].name} ══`);
    await testDesign(id, port++);
  }
  if (!keep) remove(path.join(root, ".pruebas-tmp"));
  console.log(`\n✓ test:cliente: ${designs.join(", ")} sin errores.\n`);
}

main().catch((error) => {
  console.error(`\n✗ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
