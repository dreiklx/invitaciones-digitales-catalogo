// Lógica de `npm run nueva`: convierte la demo de un diseño en el punto de
// partida de una invitación de cliente. Es una función pura (sin archivos)
// para poder probarla con los siete diseños (tests/unit/nueva.test.ts).
//
// La demo conserva su ESTRUCTURA (secciones, rótulos, programa, colores
// reservados, música, citas de autores conocidos y versículos) y pierde todo
// lo que es de las personas de la demo:
//   - quién celebra, familiares, lugares, número de WhatsApp, cuenta y enlace
//     de regalos, URL del sitio → "REEMPLAZAR";
//   - textos personales (pie de la historia, frases firmadas por alguien de
//     la demo) → "REEMPLAZAR" con una indicación;
//   - fotos → /images/<espacio>.jpg con el texto alternativo por escribir;
//   - y, por si un texto nuevo de una demo nombra a alguien, cualquier texto
//     que todavía mencione a una persona o un lugar de la demo
//     (`demoMarkers`) → "REEMPLAZAR".
// `npm run check` da error mientras quede un "REEMPLAZAR".

import { containsWord, demoMarkers } from "@/lib/invitation/names";
import type { Invitation, Quote } from "@/lib/invitation/types";

export const PLACEHOLDER = "REEMPLAZAR";
const OWN_QUOTE = `${PLACEHOLDER}: frase propia (o poner null para no mostrar esta cita)`;

export function newInvitationFrom(demo: Invitation): Invitation {
  const inv = structuredClone(demo) as Invitation;
  const { people, places } = demoMarkers(demo);
  const personal = (text: string | undefined) => !!text && people.some((name) => containsWord(text, name));

  inv.site = { ...inv.site, url: `https://${PLACEHOLDER}.vercel.app` };

  if ("couple" in inv) inv.couple = { partnerOne: PLACEHOLDER, partnerTwo: PLACEHOLDER };
  else if ("shower" in inv) inv.shower = { parents: inv.shower.parents.map(() => PLACEHOLDER) }; // sin babyName: es opcional
  else inv.honoree = { ...inv.honoree, name: PLACEHOLDER };

  if (inv.family) inv.family.groups = inv.family.groups.map((g) => ({ ...g, names: g.names.map(() => PLACEHOLDER) }));

  // Citas: los versículos y las frases de autores conocidos son parte del
  // diseño y se conservan; las firmadas por alguien de la demo, no.
  const quote = <Q extends Quote | null | undefined>(q: Q): Q =>
    q && q.kind !== "verse" && personal(q.reference) ? ({ ...q, text: OWN_QUOTE, reference: PLACEHOLDER } as Q) : q;
  inv.openingQuote = quote(inv.openingQuote);
  inv.closingQuote = quote(inv.closingQuote);
  if (inv.story) {
    if (inv.story.caption) inv.story.caption = `${PLACEHOLDER}: texto breve propio (o quitar caption)`;
    if (inv.story.quote) inv.story.quote = quote(inv.story.quote);
  }

  inv.locations = inv.locations.map((l) => ({
    ...l,
    name: PLACEHOLDER,
    address: PLACEHOLDER,
    mapsUrl: `https://maps.google.com/?q=${PLACEHOLDER}`,
    ...(l.wazeUrl ? { wazeUrl: `https://waze.com/ul?q=${PLACEHOLDER}` } : {}),
  }));

  if (inv.rsvp) {
    inv.rsvp = { ...inv.rsvp, whatsappNumber: PLACEHOLDER };
    delete inv.rsvp.phoneDisplay;
    if (inv.rsvp.referrerOptions?.length) inv.rsvp.referrerOptions = inv.rsvp.referrerOptions.map(() => PLACEHOLDER);
  }
  if (inv.gifts) {
    if (inv.gifts.value) inv.gifts.value = PLACEHOLDER;
    if (inv.gifts.link) inv.gifts.link = { ...inv.gifts.link, url: `https://${PLACEHOLDER}` };
  }

  const photos: Record<string, { src: string; alt: string; position?: string }> = {};
  for (const [slot, photo] of Object.entries(inv.photos as Record<string, { src: string; alt: string; position?: string }>)) {
    photos[slot] = {
      src: `/images/${slot.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase()}.jpg`,
      alt: `${PLACEHOLDER}: quién aparece y qué hacen`,
      ...(photo.position ? { position: photo.position } : {}),
    };
  }
  (inv as { photos: unknown }).photos = photos;

  // Red de seguridad: ningún texto puede seguir nombrando a la demo.
  scrub(inv, (text) => people.some((n) => containsWord(text, n)) || places.some((n) => containsWord(text, n)));
  return inv;
}

function scrub(value: unknown, isDemo: (text: string) => boolean): void {
  if (!value || typeof value !== "object") return;
  for (const [key, v] of Object.entries(value)) {
    if (typeof v === "string") {
      if (isDemo(v)) (value as Record<string, unknown>)[key] = PLACEHOLDER;
    } else scrub(v, isDemo);
  }
}

// ─── Archivo config/invitation.ts ────────────────────────────────────────

export function invitationSource(inv: Invitation): string {
  const header = [
    `// INVITACIÓN DEL CLIENTE — diseño "${inv.template}". Guía: docs/templates/ y README.md.`,
    `// Creada con \`npm run nueva -- ${inv.template}\` a partir de la demo, sin sus datos:`,
    `// todo lo que dice "${PLACEHOLDER}" es del cliente (nombres, familia, lugares,`,
    "// WhatsApp, regalos, textos personales y fotos en public/images/).",
    "// Revisar también la fecha, la hora y los textos. `npm run check` señala lo pendiente.",
    "// Citas: `openingQuote`/`closingQuote` en null no se muestran.",
    "// Colores: `colors: { primary: \"#…\" }` cambia solo los indicados de la paleta.",
    "// Para volver al catálogo: `export const invitation: Invitation | null = null;`",
  ].join("\n");
  return `${header}\n\nimport type { Invitation } from "@/lib/invitation/types";\n\nexport const invitation: Invitation | null = ${literal(inv, "")};\n`;
}

const IDENT = /^[A-Za-z_$][\w$]*$/;

// Literal de TypeScript legible: objetos y listas cortos en una línea.
function literal(value: unknown, indent: string): string {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  const inner = indent + "  ";
  if (Array.isArray(value)) {
    const items = value.map((v) => literal(v, inner));
    const flat = `[${items.join(", ")}]`;
    return flat.length <= 100 && !flat.includes("\n") ? flat : `[\n${items.map((i) => inner + i).join(",\n")},\n${indent}]`;
  }
  const entries = Object.entries(value as Record<string, unknown>)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${IDENT.test(k) ? k : JSON.stringify(k)}: ${literal(v, inner)}`);
  if (!entries.length) return "{}";
  const flat = `{ ${entries.join(", ")} }`;
  return flat.length <= 100 && !flat.includes("\n") ? flat : `{\n${entries.map((e) => inner + e).join(",\n")},\n${indent}}`;
}
