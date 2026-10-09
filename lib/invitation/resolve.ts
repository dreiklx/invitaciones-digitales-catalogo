// Convierte una invitación (config o demo) en los valores que usan los
// diseños: fechas ya formateadas, paleta final, textos armados, enlaces.
// Ningún diseño formatea fechas ni arma textos por su cuenta.

import type { CSSProperties } from "react";
import { templateMetas } from "@/templates/registry";
import type { Invitation, InvitationContent, Location, Palette, Photo, TemplateId, TemplateMeta } from "./types";
import { formatEventDates, formatLongDate, formatTime, zonedTimeToUtc, type EventDates } from "./time";
import { formatPhone, type RsvpContext } from "./whatsapp";

export type ResolvedLocation = Location & {
  // Hora formateada ("6:00 p. m."), si se conoce.
  timeLabel?: string;
};

export type ResolvedRsvp = NonNullable<InvitationContent["rsvp"]> & {
  phoneDisplay: string;
  referrerOptions: string[];
  // "1 de marzo de 2027"
  deadlineLabel?: string;
  // "Por favor confirma a más tardar el 1 de marzo de 2027."
  deadlineText?: string;
  // Fin del último día para confirmar (UTC).
  deadlineEndISO?: string;
  context: RsvpContext;
};

export type ResolvedScheduleItem = { time: string; timeLabel: string; title: string; description?: string };

export type ResolvedInvitation = {
  template: TemplateId;
  meta: TemplateMeta;
  content: InvitationContent;
  photos: Record<string, Photo>;
  palette: Palette;
  // Bodas: los dos nombres. Quinceaños y cumpleaños: `one` es la persona
  // que celebra y `two` queda vacío.
  names: {
    one: string;
    two: string;
    // "Ana & Luis" o "Mariana"
    joined: string;
    // "A", "L" (o "M", "")
    initials: [string, string];
  };
  // Solo quinceaños y cumpleaños.
  honoree: {
    name: string;
    age: number;
    // "15 años", "1 año", "6 meses"
    ageText: string;
  } | null;
  schedule: {
    eyebrow: string;
    title: string;
    items: ResolvedScheduleItem[];
  } | null;
  startISO: string;
  endISO: string;
  dates: EventDates;
  locations: ResolvedLocation[];
  rsvp: ResolvedRsvp | null;
  // "Boda de Ana y Luis"
  eventTitle: string;
  siteTitle: string;
  siteDescription: string;
  links: {
    // Archivo .ics de esta invitación.
    calendar: string;
    googleCalendar: string;
  };
  // true en /plantillas/<diseño> (catálogo): muestra "Volver al catálogo".
  isDemo: boolean;
};

export function resolveInvitation(
  invitation: Invitation,
  { basePath = "", isDemo = false }: { basePath?: string; isDemo?: boolean } = {}
): ResolvedInvitation {
  const meta = templateMetas[invitation.template] as TemplateMeta;
  const { site, event } = invitation;
  const couple = "couple" in invitation ? invitation.couple : null;
  const person = "honoree" in invitation ? invitation.honoree : null;
  const one = couple ? couple.partnerOne : (person?.name ?? "");
  const two = couple ? couple.partnerTwo : "";
  // "Ana y Luis" o "Mariana": en títulos y mensajes.
  const who = couple ? `${one} y ${two}` : one;
  const start = zonedTimeToUtc(invitation.date, invitation.time, site.timeZone);
  const end = new Date(start.getTime() + invitation.durationHours * 3600_000);
  const dates = formatEventDates(start, site.locale, site.timeZone);
  const joined = couple ? `${one} & ${two}` : one;
  const eventTitle = `${capitalize(event.name)} de ${who}`;
  const timeAt = (time: string) => formatTime(zonedTimeToUtc(invitation.date, time, site.timeZone), site.locale, site.timeZone);

  const locations: ResolvedLocation[] = invitation.locations.map((location, i) => ({
    ...location,
    timeLabel: location.time
      ? timeAt(location.time)
      : i === 0
        ? dates.time
        : undefined,
  }));

  const eventPhraseShort = `${event.article} ${event.name} de ${who} el ${dates.long}`;
  const deadlineLabel = invitation.rsvp?.deadline ? formatLongDate(invitation.rsvp.deadline, site.locale) : undefined;
  const rsvp: ResolvedRsvp | null = invitation.rsvp
    ? {
        ...invitation.rsvp,
        phoneDisplay: invitation.rsvp.phoneDisplay ?? formatPhone(invitation.rsvp.whatsappNumber),
        // Bodas: "¿De parte de quién?" con los dos nombres. Un solo festejado: no se pregunta.
        referrerOptions: invitation.rsvp.referrerOptions ?? (couple ? [one, two] : []),
        deadlineLabel,
        deadlineText: deadlineLabel ? `Por favor confirma a más tardar el ${deadlineLabel}.` : undefined,
        deadlineEndISO: invitation.rsvp.deadline
          ? new Date(zonedTimeToUtc(invitation.rsvp.deadline, "23:59", site.timeZone).getTime() + 59_000).toISOString()
          : undefined,
        context: {
          whatsappNumber: invitation.rsvp.whatsappNumber,
          eventPhrase: `${eventPhraseShort} a las ${dates.time}`,
          eventPhraseShort,
        },
      }
    : null;

  const firstPlace = locations[0];
  const siteTitle = site.title || `${joined} — ${dates.long}`;
  const siteDescription =
    site.description ||
    (couple
      ? `Acompáñanos a celebrar ${event.article === "la" ? "nuestra" : "nuestro"} ${event.name} el ${dates.long}`
      : `Acompáñanos a celebrar ${event.article} ${event.name} de ${one} el ${dates.long}`) +
      (firstPlace ? ` en ${firstPlace.name}.` : ".");

  return {
    template: invitation.template,
    meta,
    content: invitation,
    photos: invitation.photos as Record<string, Photo>,
    palette: { ...meta.palette, ...invitation.colors },
    names: {
      one,
      two,
      joined,
      initials: [initial(one), two ? initial(two) : ""],
    },
    honoree: person
      ? { name: person.name, age: person.age, ageText: person.ageLabel ?? `${person.age} ${person.age === 1 ? "año" : "años"}` }
      : null,
    schedule: invitation.schedule
      ? {
          eyebrow: invitation.schedule.eyebrow,
          title: invitation.schedule.title,
          items: invitation.schedule.items.map((item) => ({ ...item, timeLabel: timeAt(item.time) })),
        }
      : null,
    startISO: start.toISOString(),
    endISO: end.toISOString(),
    dates,
    locations,
    rsvp,
    eventTitle,
    siteTitle,
    siteDescription,
    links: {
      calendar: `${basePath}/calendario.ics`,
      googleCalendar: googleCalendarUrl(eventTitle, start, end, locations, site.url),
    },
    isDemo,
  };
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function initial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

// 20270417T220000Z
export function calendarStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

// Todos los lugares con su hora, para la descripción del calendario.
export function locationSummary(locations: ResolvedLocation[]): string {
  return locations
    .map((l) =>
      [l.label, l.timeLabel].filter(Boolean).join(" · ") +
      (l.label || l.timeLabel ? ": " : "") +
      `${l.name}, ${l.address}`
    )
    .join("\n");
}

function googleCalendarUrl(title: string, start: Date, end: Date, locations: ResolvedLocation[], url: string): string {
  const first = locations[0];
  return (
    "https://calendar.google.com/calendar/render?" +
    new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates: `${calendarStamp(start)}/${calendarStamp(end)}`,
      details: `${locationSummary(locations)}\n\n${url}`,
      location: first ? `${first.name}, ${first.address}` : "",
    }).toString()
  );
}

// Variables CSS de la paleta (ver app/globals.css). Se aplican en el
// contenedor del diseño, así cada diseño tiene sus propios colores.
export function paletteStyle(palette: Palette): CSSProperties {
  return {
    "--c-background": palette.background,
    "--c-surface": palette.surface,
    "--c-text": palette.text,
    "--c-text-muted": palette.textMuted,
    "--c-primary": palette.primary,
    "--c-on-primary": palette.onPrimary,
    "--c-secondary": palette.secondary,
    "--c-accent": palette.accent,
    "--c-on-accent": palette.onAccent,
    "--c-line": palette.line,
  } as CSSProperties;
}
