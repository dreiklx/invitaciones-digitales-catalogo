// Secciones a las que se puede saltar desde la barra de navegación
// (templates/shared/PageNav.tsx). Función pura: sale de la configuración,
// así una sección en `null` (o sin datos) nunca aparece en el menú, y no hay
// que tocar la barra al crear una invitación.
//
// Cada diseño pone el `id` de cada sección en su Template.tsx (el mismo en
// los ocho diseños). El orden del menú es el de la página: la barra ordena
// por posición al montarse y descarta cualquier `id` que no encuentre (p.
// ej. la confirmación, que desaparece cuando empieza el evento).
// Una sección nueva: agregar su clave aquí (con la condición de la
// configuración y el nombre que verá el invitado) y el `id` en los diseños
// que la muestren. `tests/e2e/navigation.spec.ts` comprueba que cada sección
// de esta lista existe en la página de cada demo.

import type { ResolvedInvitation } from "./resolve";

export type SectionKey = "historia" | "fecha" | "programa" | "lugares" | "detalles" | "galeria" | "regalos" | "confirmar";

export type NavSection = { id: SectionKey; label: string };

export function navSections(inv: ResolvedInvitation): NavSection[] {
  const c = inv.content;
  const list: NavSection[] = [];
  const add = (id: SectionKey, label: string, when: unknown) => {
    if (when) list.push({ id, label });
  };

  // El mismo título que muestra el diseño (`navLabels` en su meta.ts:
  // "Nuestra espera", "Mi mensaje"); si no, uno claro y general.
  add("historia", inv.meta.navLabels?.historia ?? (inv.honoree ? "Sobre mí" : "Nuestra historia"), c.story);
  add("fecha", "Fecha y cuenta regresiva", true);
  add("programa", "Programa", inv.schedule);
  add("lugares", locationsLabel(inv), inv.locations.length);
  add("detalles", detailsLabel(c.details), c.details);
  add("galeria", "Galería de fotos", c.gallery);
  add("regalos", "Regalos", c.gifts);
  add("confirmar", "Confirmar asistencia", inv.rsvp);
  return list;
}

// "Ubicación" con un lugar; con varios, sus rótulos ("Ceremonia y
// recepción") si todos lo tienen, o "Lugares".
function locationsLabel(inv: ResolvedInvitation): string {
  const labels = inv.locations.map((l) => l.label?.trim()).filter(Boolean) as string[];
  if (inv.locations.length <= 1) return "Ubicación";
  if (labels.length !== inv.locations.length) return "Lugares";
  const words = labels.map((l, i) => (i === 0 ? l : l.charAt(0).toLowerCase() + l.slice(1)));
  return `${words.slice(0, -1).join(", ")} y ${words[words.length - 1]}`;
}

function detailsLabel(details: ResolvedInvitation["content"]["details"]): string {
  if (!details) return "";
  if (details.notice && details.dressCode) return "Información y vestimenta";
  if (details.dressCode) return "Vestimenta";
  return "Información importante";
}
