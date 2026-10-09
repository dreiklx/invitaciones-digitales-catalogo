// Fechas y horas del evento. Todo se calcula a partir de `date` + `time` +
// `site.timeZone`: el desfase horario (p. ej. -06:00) sale de la zona
// horaria, así que nunca hay dos fuentes de verdad.

// Desfase (ms) de una zona horaria en un instante dado.
function zoneOffset(timestamp: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(timestamp);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - timestamp;
}

// "2027-04-17" + "16:00" en "America/Costa_Rica" → instante UTC.
export function zonedTimeToUtc(date: string, time: string, timeZone: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const naive = Date.UTC(y, m - 1, d, hh, mm);
  // Dos pasadas resuelven los cambios de horario de verano.
  let guess = naive - zoneOffset(naive, timeZone);
  guess = naive - zoneOffset(guess, timeZone);
  return new Date(guess);
}

export function isValidDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [y, m, d] = date.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
}

export function isValidTime(time: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
}

export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export type EventDates = {
  // "17 · ABRIL · 2027"
  display: string;
  // "17 · 04 · 2027"
  numeric: string;
  // "17.04.27"
  dotted: string;
  // "17 abr 2027"
  compact: string;
  // "17 de abril de 2027"
  long: string;
  // "Sábado, 17 de abril de 2027"
  weekdayLong: string;
  // "4:00 p. m."
  time: string;
  day: string; // "17"
  dayNumber: number; // 17
  monthLong: string; // "abril"
  monthShort: string; // "abr"
  monthNumber: number; // 4
  year: string; // "2027"
  weekday: string; // "sábado"
};

export function formatEventDates(instant: Date, locale: string, timeZone: string): EventDates {
  const f = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(instant);

  const day = f({ day: "2-digit" });
  const month2 = f({ month: "2-digit" });
  const monthLong = f({ month: "long" });
  const monthShort = f({ month: "short" }).replace(".", "");
  const year = f({ year: "numeric" });

  return {
    display: `${day} · ${monthLong.toUpperCase()} · ${year}`,
    numeric: `${day} · ${month2} · ${year}`,
    dotted: `${day}.${month2}.${year.slice(-2)}`,
    compact: `${f({ day: "numeric" })} ${monthShort} ${year}`,
    long: f({ day: "numeric", month: "long", year: "numeric" }),
    weekdayLong: capitalize(f({ weekday: "long", day: "numeric", month: "long", year: "numeric" })),
    time: formatTime(instant, locale, timeZone),
    day,
    dayNumber: Number(f({ day: "numeric" })),
    monthLong,
    monthShort,
    monthNumber: Number(month2),
    year,
    weekday: f({ weekday: "long" }),
  };
}

// "4:00 p. m."
export function formatTime(instant: Date, locale: string, timeZone: string): string {
  return new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone }).format(instant);
}

// "1 de marzo de 2027"
export function formatLongDate(date: string, locale: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

// Número romano (diseño Gala).
export function toRoman(value: number): string {
  const map: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let n = value;
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}
