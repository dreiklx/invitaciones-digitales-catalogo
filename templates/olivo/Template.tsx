import Image from "next/image";
import type { ReactNode } from "react";
import { quoteCitation, type ResolvedInvitation, type ResolvedLocation } from "@/lib/invitation/resolve";
import type { PhotoSlotSpec, Quote } from "@/lib/invitation/types";
import type { EventDates } from "@/lib/invitation/time";
import Gate, { GateButton, GateMusicNote } from "../shared/Gate";
import Reveal from "../shared/Reveal";
import ScrollCue from "../shared/ScrollCue";
import Frame from "../shared/Frame";
import Emphasis from "../shared/Emphasis";
import CopyValue from "../shared/CopyValue";
import RsvpForm, { type RsvpStyles } from "../shared/RsvpForm";
import StickyRsvp from "../shared/StickyRsvp";
import MusicPlayer from "../shared/MusicPlayer";
import MusicCredit from "../shared/MusicCredit";
import Shell from "../shared/Shell";
import { BeforeEvent } from "../shared/event-phase";
import { GalleryHint, LightboxItem, LightboxProvider } from "../shared/Lightbox";
import { ArrowRightIcon, AvoidSwatch, CalendarIcon, PinIcon } from "../shared/icons";
import Countdown from "./Countdown";
import { fontClasses } from "./fonts";

// 01 · Olivo — rediseño completo (2026-10-10). Una revista de arquitectura
// en verde olivo y lino: portada a dos columnas (bloque olivo | fotografía
// a toda la altura), nombres en una columna tipográfica alineada a la
// izquierda, la fecha como ficha de tres cifras, díptico de fotos,
// cuenta regresiva en franja, itinerario con línea de tiempo y un mosaico
// de fotos a sangre. Sin sombras, sin tarjetas, casi sin filetes; el único
// adorno es una hoja mínima junto a los antetítulos.

function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      <path d="M1 11C1.5 5 5 1.5 11 1c-.5 6-4 9.5-10 10Z" fill="currentColor" />
    </svg>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] sm:text-xs ${light ? "text-secondary" : "text-accent"}`}>
      <Leaf className="h-2.5 w-2.5 flex-shrink-0" />
      {children}
    </p>
  );
}

function Title({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return <h2 className={`mt-4 font-display text-[2.5rem] font-light leading-[1.02] tracking-tight sm:text-6xl ${light ? "text-on-primary" : "text-ink"} ${className}`}>{children}</h2>;
}

// La fecha como ficha de tres cifras: día · mes · año, con su rótulo.
function DateSheet({ dates, light = false, className = "" }: { dates: EventDates; light?: boolean; className?: string }) {
  const cells: [string, string][] = [
    [dates.day, dates.weekday],
    [String(dates.monthNumber).padStart(2, "0"), dates.monthLong],
    [dates.year, dates.time],
  ];
  return (
    <div className={`grid grid-cols-[1fr_1fr_1.45fr] border-t ${light ? "border-on-primary/25" : "border-ink/20"} ${className}`}>
      {cells.map(([value, label], i) => (
        <div key={label} className={`min-w-0 pt-3 ${i ? `border-l pl-3 sm:pl-5 ${light ? "border-on-primary/25" : "border-ink/20"}` : "pr-3"}`}>
          <p className={`font-display text-[min(10vw,3.25rem)] font-light leading-none tabular-nums ${light ? "text-on-primary" : "text-ink"}`}>{value}</p>
          <p className={`mt-1.5 truncate text-[11px] font-semibold uppercase tracking-[0.18em] ${light ? "text-secondary" : "text-muted"}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}

// Nombres en columna: el segundo, en cursiva y con sangría. Tamaño solo en
// vw (sin mínimo en rem): un nombre largo no ensancha la página aunque el
// teléfono tenga la letra agrandada.
function Names({ one, two, accentClass, size }: { one: string; two: string; accentClass: string; size: string }) {
  return (
    <h1 className={`font-display font-light leading-[0.92] tracking-tight ${size}`}>
      <span className="block">{one}</span>
      <span className={`block pl-[0.55em] italic ${accentClass}`}>y {two}</span>
    </h1>
  );
}

// Cita o versículo en dos columnas: la fuente a la izquierda (como una nota
// al margen) y el texto grande en cursiva, alineado a la izquierda.
function QuoteBlock({ quote, tone = "paper" }: { quote: Quote; tone?: "paper" | "surface" }) {
  const verse = quote.kind === "verse";
  return (
    <section className={`px-6 py-20 sm:px-12 sm:py-28 ${tone === "surface" ? "bg-surface" : ""}`}>
      <Reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3 md:pt-3">
          {quote.reference && <Eyebrow>{verse ? quote.reference : quoteCitation(quote)}</Eyebrow>}
          {verse && quote.translation && <p className="mt-2 text-xs text-muted">{quote.translation}</p>}
        </div>
        <p className="font-display text-[1.75rem] font-light italic leading-[1.25] text-ink sm:text-[2.5rem] md:col-span-9">
          {verse ? <>&laquo;{quote.text}&raquo;</> : <>&ldquo;{quote.text}&rdquo;</>}
        </p>
      </Reveal>
    </section>
  );
}

// Un lugar del itinerario: hora a la izquierda, línea de tiempo y datos.
function Stop({ location, last }: { location: ResolvedLocation; last: boolean }) {
  return (
    <li className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] sm:gap-10">
      {/* Escritorio: la hora en su columna. Teléfono: dentro del lugar (en una columna angosta se partía en dos líneas). */}
      <p className="hidden whitespace-nowrap pt-0.5 font-display text-4xl font-light leading-tight text-ink sm:block">{location.timeLabel}</p>
      <div className={`relative border-l border-primary/35 pl-5 sm:pl-10 ${last ? "pb-2" : "pb-14"}`}>
        <span aria-hidden="true" className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-primary" />
        {location.timeLabel && <p className="mb-2 font-display text-3xl font-light leading-none text-ink sm:hidden">{location.timeLabel}</p>}
        {location.label && <Eyebrow>{location.label}</Eyebrow>}
        <p className="mt-2 font-display text-[1.7rem] leading-tight text-ink sm:text-4xl">{location.name}</p>
        <p className="mt-1.5 text-base leading-relaxed text-muted">{location.address}</p>
        <div className={`mt-5 grid max-w-md grid-cols-1 gap-3 ${location.wazeUrl ? "min-[420px]:grid-cols-2" : ""}`}>
          <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2.5 bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-on-primary transition hover:bg-ink">
            <PinIcon size={18} />
            Abrir en Google Maps
          </a>
          {location.wazeUrl && (
            <a href={location.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center border border-ink/30 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-primary hover:text-primary">
              Abrir en Waze
            </a>
          )}
        </div>
        {location.wazeUrl && <p className="mt-2 text-xs text-muted">Las dos aplicaciones te llevan al mismo lugar.</p>}
      </div>
    </li>
  );
}

const rsvpStyles: RsvpStyles = {
  intro: "text-muted",
  deadline: "text-accent",
  progressDot: "bg-ink/15",
  progressDotActive: "bg-primary",
  progressLabel: "text-muted",
  legend: "text-ink",
  required: "text-accent",
  option: "border border-ink/25 bg-paper text-ink hover:border-primary",
  optionSelected: "border border-primary bg-primary text-on-primary",
  optionCheck: "bg-on-primary text-primary",
  label: "text-muted",
  input: "border border-ink/20 bg-paper text-ink placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/25",
  inputError: "!border-accent",
  error: "text-accent",
  help: "text-muted",
  stepButton: "border border-primary text-primary",
  counter: "font-display text-primary",
  submit: "bg-primary font-semibold uppercase tracking-[0.08em] text-on-primary hover:bg-ink sm:tracking-[0.14em]",
  submitNote: "text-muted",
  divider: "border-ink/15",
  declineLink: "text-ink/80 hover:text-ink",
  declineSubmit: "border border-ink/30 text-ink hover:border-primary hover:text-primary",
  contact: "text-muted",
  panel: "border border-primary/25 bg-paper text-ink",
};

export default function OlivoTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  const ratio = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3, photos.galeria4];
  const monogram = `${names.initials[0]} · ${names.initials[1]}`;

  // Portada "Abrir invitación": lino, nombres en columna y la ficha de la
  // fecha; el botón es una barra olivo a todo el ancho.
  const cover = (
    <div className="flex h-full flex-col bg-paper text-ink">
      <div className="flex items-center justify-between border-b border-line px-6 pb-4 pt-20 sm:px-12 sm:pt-8">
        <span className="font-display text-lg italic tracking-[0.2em] text-primary">{monogram}</span>
        <span className="font-display text-lg italic text-muted">{dates.dotted}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 sm:px-12 lg:px-24">
        <Eyebrow>{c.welcome.eyebrow}</Eyebrow>
        <div className="mt-6">
          <Names one={names.one} two={names.two} accentClass="text-primary" size="text-[min(16vw,8.5rem)]" />
        </div>
        <DateSheet dates={dates} className="mt-10 max-w-md" />
      </div>
      <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-12 sm:pb-12">
        <GateButton className="flex min-h-[60px] w-full items-center justify-between gap-4 bg-primary px-6 text-sm font-semibold uppercase tracking-[0.24em] text-on-primary transition hover:bg-ink sm:max-w-md">
          {c.welcome.buttonLabel}
          <ArrowRightIcon size={18} />
        </GateButton>
        {c.music && <GateMusicNote className="mt-3" />}
      </div>
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/90 text-ink">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        {/* Portada: teléfono = foto arriba (su alto sale del de la pantalla,
            para que nombres, fecha y el indicador para seguir quepan sin
            desplazar; 30rem deja sitio a nombres de tres líneas como "Don
            Ramón y Doña Florinda") y bloque olivo abajo; escritorio = dos
            columnas. */}
        <section className="grid min-h-[100svh] grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-2 lg:grid-rows-1">
          <div className="relative h-[max(11rem,calc(100svh-30rem))] short:h-[max(11rem,calc(100svh-25rem))] lg:order-2 lg:h-auto">
            <Image src={photos.portada.src} alt={photos.portada.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
          </div>
          <div className="flex flex-col bg-primary px-6 pb-6 pt-6 text-on-primary sm:px-12 lg:order-1 lg:justify-between lg:px-16 lg:pb-14 lg:pt-28">
            <div className="flex items-baseline justify-between gap-4">
              <Eyebrow light>{c.hero.eyebrow}</Eyebrow>
              <span className="font-display text-lg italic text-secondary">{monogram}</span>
            </div>
            <div className="mt-5 lg:mt-0">
              <Names one={names.one} two={names.two} accentClass="text-secondary" size="text-[min(15vw,7.5rem)] short:text-[min(12vw,7.5rem)] lg:text-[min(8vw,7.5rem)]" />
            </div>
            <DateSheet dates={dates} light className="mt-6 max-w-lg lg:mt-0" />
            <ScrollCue className="mx-auto mt-4 text-on-primary lg:mx-0 lg:mt-8 lg:bg-primary/85" circleClassName="border-on-primary/50" />
          </div>
        </section>

        {c.openingQuote && <QuoteBlock quote={c.openingQuote} />}

        {/* Díptico: foto horizontal grande + retrato pequeño, con el texto
            entre las dos como en una página de revista. */}
        {c.story && (
          <section id="historia" className="bg-surface px-6 py-20 sm:px-12 sm:py-28">
            <div className="mx-auto grid max-w-6xl grid-cols-12 gap-x-4 gap-y-8 sm:gap-x-8 md:gap-y-12">
              <Reveal className="col-span-12 md:col-span-8">
                <Frame photo={photos.historia} ratio={ratio("historia")} sizes="(min-width: 1152px) 740px, (min-width: 768px) 64vw, 100vw" />
              </Reveal>
              <Reveal delay={100} className="col-span-12 md:col-span-4 md:self-end">
                <Eyebrow>Nuestra historia</Eyebrow>
                {c.story.caption && <p className="mt-4 font-display text-[1.65rem] font-light leading-snug text-ink sm:text-3xl">{c.story.caption}</p>}
              </Reveal>
              {c.story.quote && (
                <Reveal delay={140} className="col-span-7 self-center md:col-span-6 md:col-start-2">
                  <p className="font-display text-xl italic leading-snug text-primary sm:text-3xl">&ldquo;{c.story.quote.text}&rdquo;</p>
                  {c.story.quote.reference && <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">{quoteCitation(c.story.quote)}</p>}
                </Reveal>
              )}
              <Reveal delay={180} className={`md:col-span-4 md:col-start-9 ${c.story.quote ? "col-span-5" : "col-span-8 col-start-5"}`}>
                <Frame photo={photos.retrato} ratio={ratio("retrato")} sizes="(min-width: 768px) 30vw, 42vw" />
              </Reveal>
            </div>
          </section>
        )}

        {c.family && (
          <section className="px-6 py-20 sm:px-12 sm:py-24">
            <Reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-12">
              <p className="font-display text-[1.9rem] font-light italic leading-tight text-ink sm:text-4xl md:col-span-5">{c.family.intro}</p>
              <div className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 md:col-span-6 md:col-start-7">
                {c.family.groups.map((group, i) => (
                  <div key={group.label} className="border-t border-ink/20 pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                      <span className="mr-2 font-display text-sm normal-case italic tracking-normal text-muted">{["I", "II", "III", "IV"][i] ?? i + 1}.</span>
                      {group.label}
                    </p>
                    {group.names.map((name, j) => (
                      <p key={j} className="mt-2 font-display text-xl text-ink sm:text-2xl">{name}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* Cuenta regresiva en franja olivo + calendario */}
        <section className="bg-primary px-6 py-20 text-on-primary sm:px-12 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Eyebrow light>{c.countdown.eyebrow}</Eyebrow>
              <Title light>{c.countdown.title}</Title>
            </Reveal>
            <Reveal delay={100} className="mt-10 sm:mt-14">
              <Countdown startISO={inv.startISO} endISO={inv.endISO} todayMessage={c.countdown.todayMessage} afterMessage={c.countdown.afterMessage} />
            </Reveal>
            <Reveal delay={180} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-xl text-on-primary sm:text-2xl">
                {dates.weekdayLong} <span className="whitespace-nowrap text-secondary">· {dates.time}</span>
              </p>
              <div className="flex flex-col items-start gap-1">
                <a href={inv.links.calendar} className="inline-flex min-h-12 max-w-full items-center gap-2.5 border border-on-primary/50 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-on-primary transition hover:bg-on-primary hover:text-primary [&_svg]:shrink-0">
                  <CalendarIcon size={18} />
                  Agregar a mi calendario
                </a>
                <a href={inv.links.googleCalendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-on-primary/80 underline underline-offset-4 hover:text-on-primary">
                  o agregar en Google Calendar
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Itinerario: hora | línea de tiempo | lugar */}
        <section id="ceremonia" className="px-6 py-20 sm:px-12 sm:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <Eyebrow>Itinerario</Eyebrow>
              <Title>Dónde y cuándo</Title>
            </Reveal>
            <ol className="md:col-span-8">
              {inv.locations.map((location, i) => (
                <Reveal key={location.name + i} delay={i * 100}>
                  <Stop location={location} last={i === inv.locations.length - 1} />
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {c.details && (c.details.notice || c.details.dressCode) && (
          <section id="detalles" className="bg-surface px-6 py-20 sm:px-12 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <Eyebrow>{c.details.eyebrow}</Eyebrow>
                <Title>{c.details.title}</Title>
              </Reveal>
              <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12">
                {c.details.notice && (
                  <Reveal className="md:col-span-7">
                    <div className="border-l-4 border-accent pl-5 sm:pl-8">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">{c.details.notice.label}</p>
                      <p className="mt-3 font-display text-[1.75rem] font-light leading-snug text-ink sm:text-4xl">
                        <Emphasis text={c.details.notice.title} className="italic text-accent" />
                      </p>
                      {c.details.notice.body && (
                        <p className="mt-4 text-base leading-relaxed text-ink/85 sm:text-lg">
                          <Emphasis text={c.details.notice.body} className="font-bold text-ink" />
                        </p>
                      )}
                      {c.details.notice.note && <p className="mt-3 text-sm text-muted">{c.details.notice.note}</p>}
                    </div>
                  </Reveal>
                )}
                {c.details.dressCode && (
                  <Reveal delay={120} className={c.details.notice ? "md:col-span-4 md:col-start-9" : "md:col-span-6"}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">Vestimenta</p>
                    <p className="mt-3 font-display text-3xl text-ink">{c.details.dressCode.title}</p>
                    {c.details.dressCode.description && <p className="mt-2 text-base leading-relaxed text-muted">{c.details.dressCode.description}</p>}
                    {c.details.dressCode.avoidColors.length > 0 && (
                      <div className="mt-5 border-t border-ink/15 pt-4">
                        {c.details.dressCode.avoidLabel && <p className="text-sm font-bold uppercase tracking-wide text-accent">{c.details.dressCode.avoidLabel}</p>}
                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                          {c.details.dressCode.avoidColors.map((color) => (
                            <span key={color.name} className="flex items-center gap-2.5 text-lg font-semibold text-ink">
                              <AvoidSwatch hex={color.hex} size={26} />
                              {color.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {c.details.dressCode.notice && <p className="mt-4 text-sm font-semibold leading-relaxed text-primary">{c.details.dressCode.notice}</p>}
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Mosaico a sangre: alta | vertical + horizontal; y una horizontal a todo el ancho. */}
        {c.gallery && (
          <section id="galeria" className="px-6 py-20 sm:px-12 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Eyebrow>{c.gallery.eyebrow}</Eyebrow>
                  <Title>{c.gallery.title}</Title>
                </div>
                <GalleryHint className="text-muted" />
              </Reveal>
              <LightboxProvider photos={gallery} hint={false} overlayClassName="bg-ink/92" closeClassName="bg-paper text-ink hover:bg-surface">
                <div className="mt-10 grid grid-cols-12 gap-2 sm:mt-14 sm:gap-4">
                  <Reveal variant="fade" className="col-span-6 sm:col-span-5">
                    <LightboxItem index={0} label={gallery[0].alt}>
                      <Frame photo={gallery[0]} ratio={ratio("galeria1")} sizes="(min-width: 1152px) 470px, 48vw" />
                    </LightboxItem>
                  </Reveal>
                  <div className="col-span-6 flex flex-col gap-2 sm:col-span-7 sm:gap-4">
                    <Reveal variant="fade" delay={100} className="w-[78%] self-end sm:w-[62%]">
                      <LightboxItem index={1} label={gallery[1].alt}>
                        <Frame photo={gallery[1]} ratio={ratio("galeria2")} sizes="(min-width: 1152px) 420px, 38vw" />
                      </LightboxItem>
                    </Reveal>
                    <Reveal variant="fade" delay={160}>
                      <LightboxItem index={2} label={gallery[2].alt}>
                        <Frame photo={gallery[2]} ratio={ratio("galeria3")} sizes="(min-width: 1152px) 660px, 48vw" />
                      </LightboxItem>
                    </Reveal>
                  </div>
                  <Reveal variant="fade" delay={200} className="col-span-12">
                    <LightboxItem index={3} label={gallery[3].alt}>
                      <Frame photo={gallery[3]} ratio={ratio("galeria4")} sizes="(min-width: 1152px) 1152px, 100vw" />
                    </LightboxItem>
                  </Reveal>
                </div>
              </LightboxProvider>
            </div>
          </section>
        )}

        {c.gifts && (
          <section id="regalos" className="border-t border-line px-6 py-20 sm:px-12 sm:py-28">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
              <Reveal className="md:col-span-6">
                <Eyebrow>{c.gifts.eyebrow}</Eyebrow>
                <Title>{c.gifts.title}</Title>
                <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">{c.gifts.message}</p>
              </Reveal>
              <Reveal delay={120} className="md:col-span-5 md:col-start-8">
                {c.gifts.method && <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">{c.gifts.method}</p>}
                {c.gifts.value && (
                  <div className="mt-3">
                    <CopyValue
                      value={c.gifts.value}
                      copyLabel={c.gifts.copyLabel}
                      copiedLabel={c.gifts.copiedLabel}
                      align="start"
                      valueClassName="font-display text-[min(11vw,3.5rem)] font-light tracking-wide text-ink"
                      buttonClassName="border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary hover:bg-primary hover:text-on-primary"
                      noteClassName="text-muted"
                    />
                  </div>
                )}
                {c.gifts.link && (
                  <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 max-w-full items-center bg-primary px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-on-primary hover:bg-ink">
                    {c.gifts.link.label}
                  </a>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="bg-surface px-6 py-20 sm:px-12 sm:py-28">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12">
                <Reveal className="lg:col-span-5">
                  <Eyebrow>{inv.rsvp.eyebrow}</Eyebrow>
                  <Title className="italic">{inv.rsvp.title}</Title>
                </Reveal>
                <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
                  <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                </Reveal>
              </div>
            </section>
          </BeforeEvent>
        )}

        {c.closingQuote && <QuoteBlock quote={c.closingQuote} />}

        <footer className="bg-primary px-6 pb-16 pt-20 text-on-primary sm:px-12 sm:pb-20 sm:pt-28">
          <div className="mx-auto max-w-6xl">
            <Eyebrow light>{c.footer.message}</Eyebrow>
            <div className="mt-6">
              <Names one={names.one} two={names.two} accentClass="text-secondary" size="text-[min(15vw,8rem)]" />
            </div>
            <DateSheet dates={dates} light className="mt-12 max-w-lg" />
            <MusicCredit music={c.music} className="!mx-0 mt-10 text-on-primary/60" />
          </div>
        </footer>

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <StickyRsvp date={dates.compact} time={dates.time} barClassName="bg-ink/95 backdrop-blur" textClassName="font-display text-paper/90" buttonClassName="bg-secondary font-bold text-ink" />
          </BeforeEvent>
        )}
        {c.music && <MusicPlayer music={c.music} fallback={inv.meta.musicPlayer} />}
      </Gate>
    </Shell>
  );
}
