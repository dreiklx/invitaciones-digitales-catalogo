// Archivo .ics de "Agregar a mi calendario" (lo abren iPhone, Android y
// Outlook). Un solo evento desde el inicio hasta `durationHours`; si hay
// varios lugares, todos van en la descripción con su hora.

import { calendarStamp, locationSummary, type ResolvedInvitation } from "./resolve";

// Escapado de texto RFC 5545: barra invertida, coma, punto y coma, saltos.
function icsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

// Líneas de máximo 75 bytes (RFC 5545), continuadas con un espacio.
function fold(line: string): string {
  const bytes = new TextEncoder();
  if (bytes.encode(line).length <= 75) return line;
  const out: string[] = [];
  let current = "";
  for (const char of line) {
    const limit = out.length === 0 ? 75 : 74;
    if (bytes.encode(current + char).length > limit) {
      out.push(current);
      current = char;
    } else {
      current += char;
    }
  }
  out.push(current);
  return out.join("\r\n ");
}

export function buildCalendarFile(inv: ResolvedInvitation, now = new Date()): string {
  const start = new Date(inv.startISO);
  const end = new Date(inv.endISO);
  const first = inv.locations[0];
  const description = `${locationSummary(inv.locations)}\n\n${inv.content.site.url}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Invitacion digital//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${calendarStamp(start)}-${inv.template}-${encodeURIComponent(inv.names.joined)}@invitacion`,
    `DTSTAMP:${calendarStamp(now)}`,
    `DTSTART:${calendarStamp(start)}`,
    `DTEND:${calendarStamp(end)}`,
    `SUMMARY:${icsText(inv.eventTitle)}`,
    `LOCATION:${icsText(first ? `${first.name}, ${first.address}` : "")}`,
    `DESCRIPTION:${icsText(description)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsText(inv.eventTitle)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .map(fold)
    .join("\r\n");
}

export function calendarResponse(inv: ResolvedInvitation): Response {
  return new Response(buildCalendarFile(inv), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${inv.content.event.name.replace(/\s+/g, "-")}.ics"`,
    },
  });
}
