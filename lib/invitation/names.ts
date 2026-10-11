// Nombres propios: tratamientos ("Don", "Doña"…), búsqueda de una palabra
// completa y los datos que identifican a una demo del catálogo.

import type { Invitation } from "./types";

const HONORIFIC = /^(don|doña|dña\.?|sr\.?|sra\.?|srta\.?|dr\.?|dra\.?)\s+/i;

// "Don Ramón" → "Ramón". Sin tratamiento, igual.
export function withoutHonorific(name: string): string {
  return name.trim().replace(HONORIFIC, "");
}

// ¿`text` contiene `word` como palabra completa? ("Ana" no está en "Mariana").
export function containsWord(text: string, word: string): boolean {
  const letter = /\p{L}/u;
  let from = 0;
  for (;;) {
    const at = text.indexOf(word, from);
    if (at < 0) return false;
    const before = text[at - 1];
    const after = text[at + word.length];
    if ((!before || !letter.test(before)) && (!after || !letter.test(after))) return true;
    from = at + 1;
  }
}

// Quién celebra, tal como lo escribe la invitación.
export function celebrants(inv: Invitation): string[] {
  if ("couple" in inv) return [inv.couple.partnerOne, inv.couple.partnerTwo];
  if ("shower" in inv) return [...inv.shower.parents, inv.shower.babyName ?? ""].filter(Boolean);
  return [inv.honoree.name];
}

// Todo lo que identifica a una demo y nunca debe llegar a la invitación de
// un cliente: quién celebra (con y sin tratamiento), los familiares y los
// lugares. Lo usan `npm run nueva` (para no copiarlo) y `npm run check`
// (para encontrarlo si quedó en algún texto).
export function demoMarkers(demo: Invitation): { people: string[]; places: string[] } {
  const people = new Set<string>();
  for (const name of celebrants(demo)) {
    people.add(name.trim());
    people.add(withoutHonorific(name));
  }
  for (const group of demo.family?.groups ?? []) for (const name of group.names) people.add(name.trim());
  const places = new Set(demo.locations.map((l) => l.name.trim()));
  return { people: [...people].filter(Boolean), places: [...places].filter(Boolean) };
}
