// Revisión de una invitación antes de desplegar (`npm run check`, que
// también corre antes de cada `npm run build`). Errores = no se puede
// publicar así; avisos = revisar a mano.

import { templateMetas } from "@/templates/registry";
import type { Invitation, PhotoSlotSpec } from "./types";
import { isValidDate, isValidTime, isValidTimeZone, zonedTimeToUtc } from "./time";

export type Issue = { level: "error" | "aviso"; message: string };

export type ValidateOptions = {
  // "cliente": config/invitation.ts. "demo": demos del catálogo.
  kind: "cliente" | "demo";
  // Demo del mismo diseño, para detectar datos de ejemplo olvidados.
  demo?: Invitation;
  // ¿Existe este archivo dentro de public/?
  fileExists: (publicPath: string) => boolean;
  // Medidas reales de una imagen (para revisar la orientación). Opcional.
  imageSize?: (publicPath: string) => { width: number; height: number } | null;
};

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function validateInvitation(inv: Invitation, options: ValidateOptions): Issue[] {
  const issues: Issue[] = [];
  const error = (message: string) => issues.push({ level: "error", message });
  const warn = (message: string) => issues.push({ level: "aviso", message });

  const meta = templateMetas[inv.template];
  if (!meta) {
    error(`template "${inv.template}" no existe. Opciones: ${Object.keys(templateMetas).join(", ")}.`);
    return issues;
  }

  // Texto de ejemplo olvidado en cualquier parte.
  walkStrings(inv, (path, value) => {
    if (/REEMPLAZAR/i.test(value)) error(`${path} todavía dice "REEMPLAZAR".`);
  });

  // Sitio
  if (!/^https:\/\/[^\s/]+\.[^\s/]+/.test(inv.site.url)) error(`site.url debe ser una URL https completa (ahora: "${inv.site.url}").`);
  if (inv.site.url.endsWith("/")) error("site.url no debe terminar en \"/\".");
  if (!isValidTimeZone(inv.site.timeZone)) error(`site.timeZone "${inv.site.timeZone}" no es una zona horaria válida.`);

  // Quién celebra y fecha
  if ("couple" in inv) {
    if (!inv.couple.partnerOne.trim() || !inv.couple.partnerTwo.trim()) error("couple: faltan nombres.");
  } else {
    if (!inv.honoree.name.trim()) error("honoree.name está vacío.");
    if (!(Number.isInteger(inv.honoree.age) && inv.honoree.age >= 0 && inv.honoree.age <= 120)) error("honoree.age debe ser un número entero de años.");
    else if (inv.honoree.age === 0 && !inv.honoree.ageLabel) error('honoree: con age 0 hace falta ageLabel (p. ej. "6 meses").');
    if (inv.honoree.ageLabel && !/^\d+\s+\S/.test(inv.honoree.ageLabel)) warn('honoree.ageLabel debería empezar con el número ("6 meses"): se muestra en la insignia.');
  }
  if (!isValidDate(inv.date)) error(`date "${inv.date}" debe tener el formato AAAA-MM-DD.`);
  if (!isValidTime(inv.time)) error(`time "${inv.time}" debe tener el formato HH:MM (24 h).`);
  if (!(inv.durationHours > 0 && inv.durationHours <= 24)) error("durationHours debe estar entre 1 y 24.");
  const datesOk = isValidDate(inv.date) && isValidTime(inv.time) && isValidTimeZone(inv.site.timeZone);
  if (datesOk && options.kind === "cliente") {
    const start = zonedTimeToUtc(inv.date, inv.time, inv.site.timeZone);
    if (start.getTime() < Date.now()) warn(`La fecha del evento (${inv.date}) ya pasó.`);
  }

  // Colores
  for (const [key, value] of Object.entries(inv.colors ?? {})) {
    if (!HEX.test(String(value))) error(`colors.${key} "${value}" debe ser un color hex (#aabbcc).`);
  }

  // Lugares
  if (inv.locations.length === 0) error("locations: hace falta al menos un lugar.");
  inv.locations.forEach((l, i) => {
    if (!l.name.trim()) error(`locations[${i}].name está vacío.`);
    if (!/^https:\/\//.test(l.mapsUrl)) error(`locations[${i}].mapsUrl debe empezar con https://.`);
    else if (/^https:\/\/(www\.)?google\.[a-z.]+\/maps\/?$/.test(l.mapsUrl))
      error(`locations[${i}].mapsUrl es el enlace genérico de Google Maps: usar el enlace "Compartir" del lugar.`);
    if (l.wazeUrl && !/^https:\/\//.test(l.wazeUrl)) error(`locations[${i}].wazeUrl debe empezar con https://.`);
    if (l.time && !isValidTime(l.time)) error(`locations[${i}].time "${l.time}" debe ser HH:MM (24 h).`);
  });

  // Programa
  inv.schedule?.items.forEach((item, i) => {
    if (!isValidTime(item.time)) error(`schedule.items[${i}].time "${item.time}" debe ser HH:MM (24 h).`);
    if (!item.title.trim()) error(`schedule.items[${i}].title está vacío.`);
  });

  // RSVP
  if (inv.rsvp) {
    const r = inv.rsvp;
    if (!/^\d{10,15}$/.test(r.whatsappNumber))
      error(`rsvp.whatsappNumber "${r.whatsappNumber}": código de país + número, solo dígitos (p. ej. 50688887777).`);
    else if (r.whatsappNumber.startsWith("506") && r.whatsappNumber.length !== 11)
      error("rsvp.whatsappNumber: un número de Costa Rica tiene 506 + 8 dígitos.");
    if (/0000000/.test(r.whatsappNumber) && options.kind === "cliente" && r.whatsappNumber !== options.demo?.rsvp?.whatsappNumber)
      error("rsvp.whatsappNumber es un número de ejemplo.");
    if (r.minGroupSize < 2 || r.maxGroupSize < r.minGroupSize) error("rsvp: minGroupSize ≥ 2 y maxGroupSize ≥ minGroupSize.");
    if (r.deadline) {
      if (!isValidDate(r.deadline)) error(`rsvp.deadline "${r.deadline}" debe tener el formato AAAA-MM-DD.`);
      else if (isValidDate(inv.date) && r.deadline > inv.date) error("rsvp.deadline es posterior a la fecha del evento.");
    }
  }

  // Regalos
  if (inv.gifts?.link && !/^https:\/\//.test(inv.gifts.link.url)) error("gifts.link.url debe empezar con https://.");
  if (inv.gifts?.value && /^0+[\s0]*$/.test(inv.gifts.value) && options.kind === "cliente") error("gifts.value es el número de ejemplo.");

  // Fotos
  const slots = meta.photoSlots as Record<string, PhotoSlotSpec>;
  const photos = inv.photos as Record<string, { src: string; alt: string } | undefined>;
  for (const [slot, spec] of Object.entries(slots)) {
    const photo = photos[slot];
    if (!photo) {
      error(`photos.${slot}: falta (diseño ${meta.name}, ${spec.where}).`);
      continue;
    }
    if (!photo.src.startsWith("/")) error(`photos.${slot}.src debe empezar con "/" (archivo dentro de public/).`);
    else if (!options.fileExists(photo.src)) error(`photos.${slot}: no existe public${photo.src}.`);
    else {
      const size = options.imageSize?.(photo.src);
      if (size) {
        const frame = spec.ratio[0] / spec.ratio[1];
        const image = size.width / size.height;
        if ((frame > 1.05 && image < 0.95) || (frame < 0.95 && image > 1.05))
          warn(`photos.${slot}: el marco es ${frame > 1 ? "horizontal" : "vertical"} (${spec.ratio.join(":")}) y la foto ${image > 1 ? "horizontal" : "vertical"} — se recortará mucho.`);
        if (Math.max(size.width, size.height) < 1000) warn(`photos.${slot}: la foto mide ${size.width}×${size.height}; se verá borrosa.`);
      }
    }
    if (!photo.alt.trim()) warn(`photos.${slot}.alt está vacío.`);
    if (options.kind === "cliente" && photo.src.startsWith("/plantillas/"))
      error(`photos.${slot} todavía usa la foto de demostración (${photo.src}).`);
  }
  for (const slot of Object.keys(photos)) {
    if (!(slot in slots)) warn(`photos.${slot} no es un espacio del diseño ${meta.name} (se ignora).`);
  }

  // Música
  if (inv.music) {
    if (!inv.music.src.startsWith("/") || !options.fileExists(inv.music.src)) error(`music.src: no existe public${inv.music.src}.`);
  }

  // Datos iguales a la demo del diseño (copiados con `npm run nueva`).
  if (options.kind === "cliente" && options.demo) {
    const d = options.demo;
    if ("couple" in inv && "couple" in d && inv.couple.partnerOne === d.couple.partnerOne && inv.couple.partnerTwo === d.couple.partnerTwo)
      error("couple: siguen los nombres de la demo.");
    if ("honoree" in inv && "honoree" in d && inv.honoree.name === d.honoree.name) error("honoree.name sigue siendo el de la demo.");
    if (inv.site.url === d.site.url) error("site.url sigue siendo la URL de la demo.");
    if (inv.rsvp && d.rsvp && inv.rsvp.whatsappNumber === d.rsvp.whatsappNumber) error("rsvp.whatsappNumber sigue siendo el de la demo.");
    inv.locations.forEach((l, i) => {
      if (d.locations.some((dl) => dl.mapsUrl === l.mapsUrl || dl.name === l.name))
        error(`locations[${i}] sigue con datos de la demo (${l.name}).`);
    });
    const demoNames = new Set(d.family?.groups.flatMap((g) => g.names) ?? []);
    inv.family?.groups.forEach((g, i) => {
      if (g.names.some((n) => demoNames.has(n))) error(`family.groups[${i}] tiene nombres de la demo.`);
    });
    if (inv.gifts?.value && inv.gifts.value === d.gifts?.value) error("gifts.value sigue siendo el de la demo.");
    if (inv.gifts?.link && inv.gifts.link.url === d.gifts?.link?.url) error("gifts.link.url sigue siendo el de la demo.");
    if (inv.story?.caption && inv.story.caption === d.story?.caption) warn("story.caption es el texto de la demo.");
    if (inv.date === d.date) warn("date es igual a la de la demo: confirmar que sea la fecha real.");
  }

  return issues;
}

function walkStrings(value: unknown, visit: (path: string, value: string) => void, path = ""): void {
  if (typeof value === "string") visit(path, value);
  else if (Array.isArray(value)) value.forEach((v, i) => walkStrings(v, visit, `${path}[${i}]`));
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) walkStrings(v, visit, path ? `${path}.${k}` : k);
}
