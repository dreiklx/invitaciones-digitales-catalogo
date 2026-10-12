// Categorías y paleta neutra del catálogo (datos, sin componentes: también
// los usan las pruebas y el selector "Otros diseños" de las demos,
// templates/shared/DesignsMenu.tsx).

import type { EventKind, Palette } from "@/lib/invitation/types";

// Identidad neutra del catálogo (distinta de los ocho diseños).
export const catalogPalette: Palette = {
  background: "#f4f1ea",
  surface: "#ebe6dc",
  text: "#1f1c18",
  textMuted: "#6c655a",
  primary: "#1f1c18",
  onPrimary: "#f4f1ea",
  secondary: "#a69a85",
  accent: "#1f1c18",
  onAccent: "#f4f1ea",
  line: "#d9d2c5",
};


// Las cuatro categorías del catálogo; cada diseño entra por su `kind`
// (meta.ts): 3 bodas + 2 quinceaños + 2 bebés + 1 aniversario. La categoría
// se llama "Quinceaños", en una sola palabra (decisión del dueño,
// 2026-10-11). Aniversarios existe para conservar Riviera con su identidad
// (2026-10-12; ver PROJECT-CONTEXT).
export const catalogGroups: { id: string; title: string; text: string; kinds: EventKind[] }[] = [
  { id: "bodas", title: "Bodas", text: "Tres estilos para el día del sí: editorial en olivo y lino, revista en tonos tierra y noche de gala.", kinds: ["boda"] },
  { id: "quinceanos", title: "Quinceaños", text: "Dos fiestas para sus XV: una de ensueño en lila y otra de joyería en azul petróleo y aguamarina.", kinds: ["quinceanos"] },
  { id: "bebes", title: "Bebés", text: "Para esperar su llegada con un baby shower y para celebrar su primer añito.", kinds: ["baby-shower", "cumpleanos-infantil"] },
  { id: "aniversarios", title: "Aniversarios", text: "Para celebrar los años juntos: un aniversario de bodas o una renovación de votos, con aire mediterráneo.", kinds: ["aniversario"] },
];

// Tipo de evento que se muestra en cada tarjeta.
export const eventLabel: Record<EventKind, string> = {
  boda: "Boda",
  quinceanos: "Quinceaños",
  "baby-shower": "Baby shower",
  "cumpleanos-infantil": "Primer cumpleaños",
  aniversario: "Aniversario",
};
