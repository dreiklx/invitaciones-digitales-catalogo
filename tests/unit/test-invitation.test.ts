// Datos de prueba de `npm run test:cliente` (scripts/lib/test-invitation.ts):
// completan toda invitación generada por `npm run nueva`, la dejan válida
// para `npm run check` y no repiten ningún dato de una demo.

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { demos } from "../../templates/demos";
import { templateIds, templateMetas } from "../../templates/registry";
import { containsWord, demoMarkers } from "../../lib/invitation/names";
import { validateInvitation } from "../../lib/invitation/validate";
import { newInvitationFrom, PLACEHOLDER } from "../../scripts/lib/new-invitation";
import { fillTestData, TEST_DATE, TEST_HONOREE, TEST_PEOPLE, TEST_PLACE, TEST_WHATSAPP } from "../../scripts/lib/test-invitation";

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

const allMarkers = templateIds.flatMap((id) => {
  const m = demoMarkers(demos[id]);
  return [...m.people, ...m.places];
});

describe("datos de prueba de una invitación de cliente", () => {
  it("los nombres y el lugar de prueba no son de ninguna demo", () => {
    for (const test of [...TEST_PEOPLE, TEST_HONOREE, TEST_PLACE])
      for (const marker of allMarkers) assert.ok(!containsWord(test, marker) && !containsWord(marker, test), `"${test}" coincide con "${marker}" de una demo`);
    for (const id of templateIds) {
      assert.notEqual(demos[id].date, TEST_DATE, `${id} usa la fecha de prueba`);
      assert.notEqual(demos[id].rsvp?.whatsappNumber, TEST_WHATSAPP, `${id} usa el WhatsApp de prueba`);
    }
  });

  for (const id of templateIds) {
    it(`${id}: completa todo lo de "nueva" y pasa la validación de cliente`, () => {
      const inv = fillTestData(newInvitationFrom(demos[id]));
      const left = strings(inv).filter((s) => s.includes(PLACEHOLDER));
      assert.deepEqual(left, [], `quedan "${PLACEHOLDER}"`);
      for (const text of strings(inv)) for (const marker of allMarkers) assert.ok(!containsWord(text, marker), `"${text}" menciona "${marker}" de una demo`);

      // Fotos: existen y tienen la proporción de cada espacio (como las que
      // genera test:cliente).
      const slots = templateMetas[id].photoSlots as Record<string, { ratio: [number, number] }>;
      const issues = validateInvitation(inv, {
        kind: "cliente",
        demo: demos[id],
        fileExists: () => true,
        imageSize: (src) => {
          const slot = Object.entries(inv.photos as Record<string, { src: string }>).find(([, p]) => p.src === src)?.[0];
          const [w, h] = slot ? slots[slot].ratio : [1, 1];
          return { width: w * 400, height: h * 400 };
        },
      });
      assert.deepEqual(issues.filter((i) => i.level === "error").map((i) => i.message), []);
    });
  }
});
