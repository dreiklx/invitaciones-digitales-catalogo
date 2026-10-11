// Configuración de los siete diseños: ids, rutas, demos, fechas, archivos y
// secciones opcionales. `npm test` (sin navegador).

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import nextConfig from "../../next.config";
import { invitation } from "../../config/invitation";
import { demos } from "../../templates/demos";
import { templateIds, templateMetas } from "../../templates/registry";
import { resolveInvitation } from "../../lib/invitation/resolve";
import { buildCalendarFile } from "../../lib/invitation/calendar";
import { validateInvitation } from "../../lib/invitation/validate";
import { zonedTimeToUtc } from "../../lib/invitation/time";
import type { Invitation } from "../../lib/invitation/types";

const root = process.cwd();
const publicDir = path.join(root, "public");
const fileExists = (p: string) => existsSync(path.join(publicDir, decodeURIComponent(p)));
const resolveDemo = (inv: Invitation) => resolveInvitation(inv, { basePath: `/plantillas/${inv.template}`, isDemo: true });

describe("registro de diseños", () => {
  it("config/invitation.ts está en modo catálogo (null)", () => {
    assert.equal(invitation, null, "config/invitation.ts debe quedar en null en este repositorio");
  });

  it("los ids coinciden en el registro, las demos y los meta", () => {
    assert.deepEqual(Object.keys(templateMetas).sort(), [...templateIds].sort());
    assert.deepEqual(Object.keys(demos).sort(), [...templateIds].sort());
    for (const id of templateIds) {
      assert.equal(templateMetas[id].id, id, `meta.id de ${id}`);
      assert.equal(demos[id].template, id, `demo.template de ${id}`);
    }
  });

  it("cada diseño tiene sus archivos y sus tres rutas", () => {
    for (const id of templateIds) {
      for (const f of ["Template.tsx", "Preview.tsx", "meta.ts", "demo.ts", "fonts.ts"])
        assert.ok(existsSync(path.join(root, "templates", id, f)), `falta templates/${id}/${f}`);
      for (const f of ["page.tsx", "opengraph-image.tsx", path.join("calendario.ics", "route.ts")])
        assert.ok(existsSync(path.join(root, "app", "plantillas", id, f)), `falta app/plantillas/${id}/${f}`);
    }
  });

  it("no hay rutas de diseños que no estén en el registro", () => {
    const dirs = readdirSync(path.join(root, "app", "plantillas")).filter((d) => statSync(path.join(root, "app", "plantillas", d)).isDirectory());
    assert.deepEqual(dirs.sort(), [...templateIds].sort());
  });

  it("las redirecciones viejas llegan a un diseño que existe, en un solo salto", async () => {
    const redirects = (await nextConfig.redirects?.()) ?? [];
    assert.ok(redirects.length > 0);
    for (const r of redirects) {
      const target = r.destination.match(/^\/plantillas\/([a-z]+)/)?.[1];
      assert.ok(target && (templateIds as string[]).includes(target), `${r.source} → ${r.destination} no es un diseño`);
      const source = r.source.match(/^\/plantillas\/([a-z]+)/)?.[1];
      assert.ok(source && !(templateIds as string[]).includes(source), `${r.source} tapa un diseño existente`);
      assert.ok(!redirects.some((o) => o.source === r.destination), `${r.destination} vuelve a redirigir`);
      assert.equal(r.permanent, true);
    }
  });
});

describe("demos", () => {
  for (const id of templateIds) {
    describe(id, () => {
      const demo = demos[id];

      it("pasa la validación sin errores", () => {
        const errors = validateInvitation(demo, { kind: "demo", fileExists }).filter((i) => i.level === "error");
        assert.deepEqual(errors, []);
      });

      it("se resuelve con una fecha válida y legible", () => {
        const inv = resolveDemo(demo);
        const [y, m, d] = demo.date.split("-").map(Number);
        assert.equal(inv.dates.dayNumber, d);
        assert.equal(inv.dates.monthNumber, m);
        assert.equal(inv.dates.year, String(y));
        assert.match(inv.dates.long, new RegExp(`^${d} de \\p{L}+ de ${y}$`, "u"));
        assert.ok(new Date(inv.endISO) > new Date(inv.startISO));
      });

      it("el calendario tiene el evento a la hora local correcta", () => {
        const inv = resolveDemo(demo);
        const ics = buildCalendarFile(inv);
        const start = zonedTimeToUtc(demo.date, demo.time, demo.site.timeZone).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
        assert.match(ics, /BEGIN:VEVENT/);
        assert.ok(ics.includes(`DTSTART:${start}`), `DTSTART debería ser ${start}`);
        assert.ok(ics.includes(`SUMMARY:${inv.eventTitle}`) || ics.includes("SUMMARY:"), "falta SUMMARY");
      });

      it("las fotos y la música existen", () => {
        for (const [slot, photo] of Object.entries(demo.photos as Record<string, { src: string }>))
          assert.ok(fileExists(photo.src), `${id}.photos.${slot}: no existe public${photo.src}`);
        if (demo.music) assert.ok(fileExists(demo.music.src), `${id}.music: no existe public${demo.music.src}`);
      });

      it("cada foto de su carpeta se usa (sin archivos sueltos)", () => {
        const dir = path.join(publicDir, "plantillas", id, "fotos");
        const used = new Set(Object.values(demo.photos as Record<string, { src: string }>).map((p) => path.basename(p.src)));
        for (const file of readdirSync(dir)) assert.ok(used.has(file), `public/plantillas/${id}/fotos/${file} no la usa la demo`);
      });

      it("funciona sin música, sin citas y sin secciones opcionales", () => {
        const bare = { ...demo, music: null, openingQuote: null, closingQuote: null, story: null, family: null, schedule: null, gifts: null, gallery: null, details: null } as Invitation;
        const inv = resolveDemo(bare);
        assert.equal(inv.content.music, null);
        const errors = validateInvitation(bare, { kind: "demo", fileExists }).filter((i) => i.level === "error");
        assert.deepEqual(errors, []);
      });
    });
  }
});

describe("fechas y zona horaria", () => {
  // La fecha del evento no puede depender de la zona del servidor o del
  // invitado: se forma con la zona del evento (site.timeZone).
  it("la fecha larga es igual con la máquina en UTC+14 y en UTC-11", () => {
    const original = process.env.TZ;
    try {
      for (const id of templateIds) {
        const results = ["Pacific/Kiritimati", "Pacific/Pago_Pago", "UTC"].map((tz) => {
          process.env.TZ = tz;
          const inv = resolveDemo(demos[id]);
          return [inv.dates.long, inv.dates.weekdayLong, inv.dates.time, inv.startISO].join(" | ");
        });
        assert.equal(new Set(results).size, 1, `${id}: ${results.join(" ≠ ")}`);
      }
    } finally {
      if (original === undefined) delete process.env.TZ;
      else process.env.TZ = original;
    }
  });

  it("un evento a las 23:30 sigue siendo ese día", () => {
    const late = { ...demos.tierra, date: "2027-05-22", time: "23:30" } as Invitation;
    assert.equal(resolveDemo(late).dates.long, "22 de mayo de 2027");
  });
});

describe("música", () => {
  // Las pistas se descargan en el teléfono del invitado: ninguna debe volver
  // a pesar lo que pesaban antes de comprimirlas (hasta 8 MB).
  it("cada pista pesa como máximo 7 MB y la usa alguna demo", () => {
    const dir = path.join(publicDir, "audio", "demo");
    const used = new Set(templateIds.map((id) => demos[id].music?.src).filter(Boolean));
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".mp3"))) {
      const mb = statSync(path.join(dir, file)).size / 1024 / 1024;
      assert.ok(mb <= 7, `${file} pesa ${mb.toFixed(1)} MB`);
      assert.ok(used.has(`/audio/demo/${file}`), `${file} no la usa ninguna demo`);
    }
  });

  it("cada pista tiene título y crédito o licencia", () => {
    for (const id of templateIds) {
      const music = demos[id].music;
      if (!music) continue;
      assert.ok(music.title.trim(), `${id}: music.title`);
      assert.ok(music.credit?.trim(), `${id}: music.credit (atribución o licencia)`);
    }
  });
});
