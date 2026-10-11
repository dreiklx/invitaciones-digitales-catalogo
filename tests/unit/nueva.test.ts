// `npm run nueva`: una invitación nueva nunca hereda datos de las demos.
// Se prueba con los siete diseños, sin tocar config/invitation.ts.

import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { demos } from "../../templates/demos";
import { templateIds } from "../../templates/registry";
import { containsWord, demoMarkers } from "../../lib/invitation/names";
import { validateInvitation } from "../../lib/invitation/validate";
import type { Invitation, TemplateId } from "../../lib/invitation/types";
import { invitationSource, newInvitationFrom, PLACEHOLDER } from "../../scripts/lib/new-invitation";

const root = process.cwd();
const hash = (file: string) => createHash("sha256").update(readFileSync(path.join(root, file))).digest("hex");
const watched = ["config/invitation.ts", ...templateIds.map((id) => `templates/${id}/demo.ts`)];

function strings(value: unknown, at = ""): [string, string][] {
  if (typeof value === "string") return [[at, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${at}[${i}]`));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([k, v]) => strings(v, at ? `${at}.${k}` : k));
  return [];
}

// Personas y lugares de TODAS las demos (no solo la del diseño).
const allMarkers = templateIds.flatMap((id) => {
  const m = demoMarkers(demos[id]);
  return [...m.people, ...m.places];
});

// Completa cada "REEMPLAZAR" como lo haría quien prepara la invitación.
function fill(inv: Invitation): Invitation {
  const copy = structuredClone(inv);
  const visit = (value: unknown) => {
    if (!value || typeof value !== "object") return;
    for (const [key, v] of Object.entries(value)) {
      if (typeof v === "string" && v.includes(PLACEHOLDER)) {
        (value as Record<string, unknown>)[key] =
          key === "whatsappNumber" ? "50688887777" : key === "url" || key.endsWith("Url") ? "https://cliente.example.com/enlace" : "Dato del cliente";
      } else visit(v);
    }
  };
  visit(copy);
  return copy;
}

describe("npm run nueva", () => {
  const before0 = Object.fromEntries(watched.map((f) => [f, hash(f)]));
  let tmp = "";
  before(() => {
    tmp = mkdtempSync(path.join(tmpdir(), "nueva-"));
  });
  after(() => {
    rmSync(tmp, { recursive: true, force: true });
    for (const f of watched) assert.equal(hash(f), before0[f], `${f} cambió durante las pruebas`);
  });

  for (const id of templateIds) {
    describe(id, () => {
      const demo = demos[id];

      it("no modifica la demo", () => {
        const snapshot = JSON.stringify(demo);
        newInvitationFrom(demo);
        assert.equal(JSON.stringify(demo), snapshot);
      });

      it("no contiene personas, lugares ni fotos de ninguna demo", () => {
        const inv = newInvitationFrom(demo);
        for (const [at, text] of strings(inv)) {
          const found = allMarkers.find((m) => containsWord(text, m));
          assert.equal(found, undefined, `${at} = "${text}" contiene "${found}"`);
          assert.ok(!text.startsWith("/plantillas/"), `${at} usa un archivo de la demo (${text})`);
        }
        // El archivo completo (con sus comentarios) tampoco.
        const source = invitationSource(inv);
        const leaked = allMarkers.find((m) => containsWord(source, m));
        assert.equal(leaked, undefined, `el archivo generado menciona "${leaked}"`);
      });

      it("conserva la estructura del diseño", () => {
        const inv = newInvitationFrom(demo);
        assert.equal(inv.template, id);
        assert.deepEqual(Object.keys(inv.photos).sort(), Object.keys(demo.photos).sort());
        assert.equal(inv.locations.length, demo.locations.length);
        assert.equal(inv.family?.groups.length, demo.family?.groups.length);
        assert.deepEqual(inv.schedule, demo.schedule);
        assert.deepEqual(inv.music, demo.music);
        assert.deepEqual(inv.countdown, demo.countdown);
        // Los versículos y las citas de autores (sin datos de la demo) se quedan.
        for (const key of ["openingQuote", "closingQuote"] as const) {
          const q = demo[key];
          const personal = q?.reference && demoMarkers(demo).people.some((p) => containsWord(q.reference!, p));
          if (q && !personal) assert.deepEqual(inv[key], q, `${key} genérica debería conservarse`);
          if (q && personal) assert.match(inv[key]!.text, new RegExp(PLACEHOLDER), `${key} firmada por la demo`);
        }
      });

      it("npm run check exige completar los REEMPLAZAR y nada más", () => {
        const inv = newInvitationFrom(demo);
        const errors = validateInvitation(inv, { kind: "cliente", demo, fileExists: () => true }).filter((i) => i.level === "error");
        assert.ok(errors.length > 0, "debería haber campos por completar");
        for (const e of errors) assert.match(e.message, new RegExp(PLACEHOLDER), `error inesperado: ${e.message}`);
      });

      it("una vez completada, pasa la validación", () => {
        const inv = fill(newInvitationFrom(demo));
        const errors = validateInvitation(inv, { kind: "cliente", demo, fileExists: () => true }).filter((i) => i.level === "error");
        assert.deepEqual(errors.map((e) => e.message), []);
      });

      it("el archivo generado es TypeScript válido con los mismos datos", async () => {
        const inv = newInvitationFrom(demo);
        const file = path.join(tmp, `${id}.ts`);
        writeFileSync(file, invitationSource(inv));
        const mod = await import(pathToFileURL(file).href);
        assert.deepEqual(mod.invitation, inv);
      });
    });
  }

  it("el comando escribe en --salida lo mismo que la función, sin tocar config/", () => {
    const tsx = path.join(root, "node_modules", "tsx", "dist", "cli.mjs");
    for (const id of templateIds as TemplateId[]) {
      const out = path.join(tmp, `cli-${id}.ts`);
      execFileSync(process.execPath, [tsx, "scripts/new-invitation.ts", id, "--salida", out], { cwd: root, stdio: "pipe" });
      assert.equal(readFileSync(out, "utf8"), invitationSource(newInvitationFrom(demos[id])));
    }
    assert.equal(hash("config/invitation.ts"), before0["config/invitation.ts"]);
  });

  it("rechaza un diseño que no existe", () => {
    const tsx = path.join(root, "node_modules", "tsx", "dist", "cli.mjs");
    assert.throws(() => execFileSync(process.execPath, [tsx, "scripts/new-invitation.ts", "camelia", "--salida", path.join(tmp, "x.ts")], { cwd: root, stdio: "pipe" }));
  });
});

describe("npm run check con datos reales parecidos a la demo", () => {
  it("un cliente que comparte el nombre de pila con la demo no da error", () => {
    const demo = demos.olivo;
    const inv = fill(newInvitationFrom(demo)) as Extract<Invitation, { couple: unknown }>;
    const markers = demoMarkers(demo).people;
    const firstName = markers.find((m) => !m.includes(" "))!;
    inv.couple = { partnerOne: `${firstName} Pérez`, partnerTwo: "Ana Solís" };
    inv.footer = { message: `Con cariño, ${firstName} y Ana` };
    const errors = validateInvitation(inv, { kind: "cliente", demo, fileExists: () => true }).filter((i) => i.level === "error");
    assert.deepEqual(errors.map((e) => e.message), []);
  });

  it("un texto que nombra a la demo sí da error", () => {
    const demo = demos.aguamarina;
    const inv = fill(newInvitationFrom(demo));
    inv.footer = { message: `Con cariño, ${"honoree" in demo ? demo.honoree.name : ""}` };
    const errors = validateInvitation(inv, { kind: "cliente", demo, fileExists: () => true }).filter((i) => i.level === "error");
    assert.ok(errors.some((e) => e.message.startsWith("footer.message nombra a una persona de la demo")), JSON.stringify(errors));
  });
});
