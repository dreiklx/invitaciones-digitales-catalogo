// Datos ficticios de PRUEBA para la invitación que genera `npm run
// test:cliente` (scripts/test-cliente.ts). Completa todo lo que `npm run
// nueva` dejó en "REEMPLAZAR" como lo haría quien prepara una invitación
// real, sin tocar la estructura del diseño. Función pura: la prueba
// tests/unit/test-invitation.test.ts comprueba que no quede ningún
// "REEMPLAZAR", que ningún dato coincida con una demo y que la invitación
// pase `npm run check`.

import type { Invitation } from "@/lib/invitation/types";
import { PLACEHOLDER } from "./new-invitation";

// Nombres que no usa ninguna demo (la prueba unitaria lo verifica).
export const TEST_PEOPLE = ["Marisol Quirós", "Bernardo Arce"];
export const TEST_HONOREE = "Ximena Arce";
export const TEST_PLACE = "Salón Prueba Norte";
export const TEST_WHATSAPP = "50661234567";
// Fecha distinta de todas las demos (y plazo para confirmar antes).
export const TEST_DATE = "2028-03-18";
export const TEST_DEADLINE = "2028-03-01";
export const TEST_URL = "https://invitacion-de-prueba.vercel.app";

const first = (full: string) => full.split(" ")[0];

export function fillTestData(generated: Invitation): Invitation {
  const inv = structuredClone(generated) as Invitation;
  let place = 0;
  let relative = 0;

  inv.site = { ...inv.site, url: TEST_URL };
  inv.date = TEST_DATE;
  if (inv.rsvp) inv.rsvp = { ...inv.rsvp, deadline: TEST_DEADLINE, whatsappNumber: TEST_WHATSAPP };

  if ("couple" in inv) inv.couple = { partnerOne: first(TEST_PEOPLE[0]), partnerTwo: first(TEST_PEOPLE[1]) };
  else if ("shower" in inv) inv.shower = { ...inv.shower, parents: inv.shower.parents.map((_, i) => first(TEST_PEOPLE[i % TEST_PEOPLE.length])) };
  else inv.honoree = { ...inv.honoree, name: first(TEST_HONOREE) };

  if (inv.family) inv.family.groups = inv.family.groups.map((g) => ({ ...g, names: g.names.map(() => `Familiar Prueba ${++relative}`) }));

  inv.locations = inv.locations.map((l) => {
    const name = `${TEST_PLACE}${++place > 1 ? ` ${place}` : ""}`;
    const q = encodeURIComponent(name);
    return {
      ...l,
      name,
      address: "Calle de las Pruebas 123, Ciudad Ejemplo",
      mapsUrl: `https://maps.google.com/?q=${q}`,
      ...(l.wazeUrl ? { wazeUrl: `https://waze.com/ul?q=${q}` } : {}),
    };
  });

  // Todo lo demás que dice "REEMPLAZAR" (pie de la historia, avisos,
  // cuenta de regalos, textos alternativos, citas propias…).
  const fill = (value: unknown, key: string): unknown => {
    if (typeof value === "string") {
      if (!value.includes(PLACEHOLDER)) return value;
      if (key === "alt") return "Foto de prueba de la invitación";
      if (key === "value") return "8888-0000";
      if (key === "url") return "https://example.com/regalos-de-prueba";
      if (key === "reference") return "Texto de prueba";
      return "Texto de prueba para la invitación.";
    }
    if (Array.isArray(value)) return value.map((v) => fill(v, key));
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fill(v, k)]));
    return value;
  };
  return fill(inv, "") as Invitation;
}
