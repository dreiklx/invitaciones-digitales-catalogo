// Barra de navegación: qué secciones ofrece según la configuración
// (lib/invitation/sections.ts). Que cada una exista en la página lo
// comprueba tests/e2e/navigation.spec.ts.

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { demos } from "../../templates/demos";
import { templateIds } from "../../templates/registry";
import { resolveInvitation } from "../../lib/invitation/resolve";
import { navSections } from "../../lib/invitation/sections";
import type { Invitation } from "../../lib/invitation/types";
import { designsMenuFor } from "../../templates/shared/designs";

const resolve = (inv: Invitation) => resolveInvitation(inv, { basePath: `/plantillas/${inv.template}`, isDemo: true });
const ids = (inv: Invitation) => navSections(resolve(inv)).map((s) => s.id);

describe("secciones de la barra de navegación", () => {
  for (const id of templateIds) {
    it(`${id}: una entrada por sección presente, con nombre`, () => {
      const list = navSections(resolve(demos[id]));
      assert.equal(new Set(list.map((s) => s.id)).size, list.length, "ids repetidos");
      for (const s of list) assert.ok(s.label.trim().length > 2, `${s.id} sin nombre`);
      assert.ok(list.some((s) => s.id === "fecha"), "la fecha siempre está");
      assert.equal(list.some((s) => s.id === "confirmar"), !!demos[id].rsvp);
    });

    it(`${id}: las secciones en null no aparecen`, () => {
      const inv = structuredClone(demos[id]);
      Object.assign(inv, { story: null, details: null, gallery: null, gifts: null, rsvp: null, schedule: null });
      assert.deepEqual(ids(inv), ["fecha", "lugares"]);
    });
  }

  it("cada diseño usa el título que muestra su sección de historia", () => {
    const label = (id: keyof typeof demos) => navSections(resolve(demos[id])).find((s) => s.id === "historia")?.label;
    assert.equal(label("arrullo"), "Nuestra espera");
    assert.equal(label("aurora"), "Mi mensaje");
    assert.equal(label("olivo"), "Nuestra historia");
  });

  it("los nombres de lugares y detalles salen de los datos", () => {
    const inv = structuredClone(demos.olivo);
    const base = { name: "Lugar", address: "Dirección", mapsUrl: "https://maps.google.com/?q=x" };
    const label = (i: Invitation, id: string) => navSections(resolve(i)).find((s) => s.id === id)?.label;

    inv.locations = [base];
    assert.equal(label(inv, "lugares"), "Ubicación");
    inv.locations = [{ ...base, label: "Ceremonia" }, { ...base, label: "Recepción" }];
    assert.equal(label(inv, "lugares"), "Ceremonia y recepción");
    inv.locations = [{ ...base, label: "Ceremonia" }, base];
    assert.equal(label(inv, "lugares"), "Lugares");

    const details = inv.details!;
    inv.details = { ...details, notice: null };
    assert.equal(label(inv, "detalles"), "Vestimenta");
    inv.details = { ...details, dressCode: null };
    assert.equal(label(inv, "detalles"), "Información importante");
  });
});

describe("selector «Otros diseños»", () => {
  it("una invitación de cliente no lo recibe", () => {
    const client = resolveInvitation(demos.riviera); // sin isDemo, como en el proyecto de un cliente
    assert.equal(client.isDemo, false);
    assert.equal(designsMenuFor(client), null);
  });

  it("en las demos muestra los ocho diseños por categoría, con foto de su demo", () => {
    const groups = designsMenuFor(resolve(demos.olivo))!;
    assert.deepEqual(groups.map((g) => g.title), ["Bodas", "Quinceaños", "Bebés", "Aniversarios"]);
    const all = groups.flatMap((g) => g.designs);
    assert.deepEqual(all.map((d) => d.id), templateIds);
    for (const d of all) {
      assert.ok(d.photo.src.startsWith(`/plantillas/${d.id}/`), `${d.id}: ${d.photo.src}`);
      assert.ok(d.event && d.name && d.number, d.id);
    }
  });
});
