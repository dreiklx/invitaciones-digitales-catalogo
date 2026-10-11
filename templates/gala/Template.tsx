import type { ReactNode } from "react";
import { quoteCitation, type ResolvedInvitation } from "@/lib/invitation/resolve";
import type { Photo, PhotoSlotSpec, Quote } from "@/lib/invitation/types";
import Gate, { GateButton } from "../shared/Gate";
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
import { LightboxItem, LightboxProvider } from "../shared/Lightbox";
import { AvoidSwatch, CalendarIcon, PinIcon } from "../shared/icons";
import Countdown from "./Countdown";
import { fontClasses } from "./fonts";

// 03 · Gala — una noche de etiqueta. Negro profundo, dorado y plata;
// monograma, abanicos art déco, marcos dorados dobles y retratos en blanco
// y negro. Todo centrado y simétrico. La fecha va siempre legible ("13 de
// noviembre de 2027", de `dates.long`); hasta el 2026-10-11 iba en números
// romanos y era difícil de leer.

// Abanico art déco.
function Fan({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 9 }, (_, i) => -80 + i * 20);
  return (
    <svg viewBox="0 0 120 60" className={className} fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
      <path d="M10 58a50 50 0 0 1 100 0" />
      <path d="M30 58a30 30 0 0 1 60 0" />
      {rays.map((deg) => (
        <line key={deg} x1="60" y1="58" x2={60 + 50 * Math.sin((deg * Math.PI) / 180)} y2={58 - 50 * Math.cos((deg * Math.PI) / 180)} />
      ))}
      <circle cx="60" cy="58" r="3" fill="currentColor" />
    </svg>
  );
}

// Filete con rombo central.
function Rule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-primary ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/70 sm:w-24" />
      <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/70 sm:w-24" />
    </div>
  );
}

function Monogram({ initials, size = "md" }: { initials: [string, string]; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-32 w-32 sm:h-36 sm:w-36" : "h-24 w-24";
  const text = size === "lg" ? "text-4xl sm:text-5xl" : "text-3xl";
  return (
    <div className={`relative flex items-center justify-center rounded-full border border-primary/80 ${box}`}>
      <span className="absolute inset-1.5 rounded-full border border-primary/30" />
      <span className={`gold-sheen font-display italic ${text}`}>
        {initials[0]}
        <span className="mx-0.5 text-[0.6em] not-italic">&amp;</span>
        {initials[1]}
      </span>
    </div>
  );
}

// Doble marco dorado.
// Cita o versículo bajo el abanico. Un versículo va entre comillas latinas,
// con la referencia entre filetes dorados y la traducción debajo.
function GalaQuote({ quote }: { quote: Quote }) {
  const verse = quote.kind === "verse";
  const start = quote.align === "start";
  return (
    <section className={`px-6 py-20 sm:py-24 ${start ? "text-left" : "text-center"}`}>
      <Reveal className="mx-auto max-w-2xl">
        <Fan className={`h-8 w-16 text-primary/80 ${start ? "" : "mx-auto"}`} />
        <p className={`mt-8 font-display italic text-ink ${verse ? "text-[1.65rem] leading-[1.45] sm:text-[2.1rem]" : "text-2xl leading-relaxed sm:text-3xl"}`}>
          {verse ? <>&laquo;{quote.text}&raquo;</> : <>&ldquo;{quote.text}&rdquo;</>}
        </p>
        {quote.reference && verse && (
          <>
            <div className={`mt-8 flex items-center gap-4 ${start ? "" : "justify-center"}`}>
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary" />
              <span className="whitespace-nowrap text-xs uppercase tracking-[0.35em] text-primary">{quote.reference}</span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary" />
            </div>
            {quote.translation && <p className="mt-2 text-xs tracking-[0.15em] text-muted">{quote.translation}</p>}
          </>
        )}
        {quote.reference && !verse && <p className="mt-6 text-xs uppercase tracking-[0.35em] text-primary">{quoteCitation(quote)}</p>}
      </Reveal>
    </section>
  );
}

function Gilded({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative border border-primary/70 p-2 sm:p-2.5 ${className}`}>
      <span className="pointer-events-none absolute inset-1 border border-primary/25" aria-hidden="true" />
      {children}
    </div>
  );
}

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-secondary">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-6xl">{title}</h2>
      <Rule className="mt-6" />
    </div>
  );
}

function BwFrame({ photo, ratio, sizes, priority }: { photo: Photo; ratio: [number, number]; sizes: string; priority?: boolean }) {
  return <Frame photo={photo} ratio={ratio} sizes={sizes} priority={priority} imageClassName="grayscale contrast-[1.08] brightness-[0.92]" />;
}

const rsvpStyles: RsvpStyles = {
  intro: "text-muted",
  deadline: "text-primary",
  progressDot: "bg-ink/20",
  progressDotActive: "bg-primary",
  progressLabel: "text-muted",
  legend: "text-ink",
  required: "text-primary",
  option: "border border-secondary/40 text-ink hover:border-primary",
  optionSelected: "border border-primary bg-primary text-on-primary",
  optionCheck: "bg-on-primary text-primary",
  label: "text-muted",
  input: "border border-primary/40 bg-transparent text-ink placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/25",
  inputError: "!border-red-400",
  error: "text-red-300",
  help: "text-muted",
  stepButton: "border border-primary text-ink",
  counter: "font-display text-ink",
  submit: "bg-primary font-body uppercase tracking-[0.08em] text-on-primary sm:tracking-[0.2em] hover:brightness-110",
  submitNote: "text-muted",
  divider: "border-line",
  declineLink: "text-ink/80 hover:text-ink",
  declineSubmit: "border border-primary/60 uppercase tracking-[0.15em] text-ink hover:bg-primary hover:text-on-primary",
  contact: "text-muted",
  panel: "border border-primary/40 bg-surface text-ink",
};

export default function GalaTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  const ratio = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3, photos.galeria4];

  const cover = (
    <div className="flex h-full items-center justify-center bg-paper px-6 text-center">
      <div className="relative flex w-full max-w-md flex-col items-center px-4 py-10 sm:px-10 sm:py-14">
        <span className="pointer-events-none absolute inset-0 border border-primary/50" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-2 border border-primary/20" aria-hidden="true" />
        <Fan className="h-10 w-20 text-primary" />
        <p className="mt-6 text-[11px] uppercase tracking-[0.35em] text-secondary sm:text-xs">{c.welcome.eyebrow}</p>
        <div className="mt-6 sm:mt-8">
          <Monogram initials={names.initials} size="lg" />
        </div>
        <h1 className="mt-6 font-display sm:mt-8 text-3xl uppercase tracking-[0.12em] text-ink min-[360px]:text-4xl">
          {names.one}
          <span className="my-1 block font-display text-2xl normal-case italic tracking-normal text-primary">&amp;</span>
          {names.two}
        </h1>
        <p className="mt-6 font-display text-lg tracking-[0.06em] text-muted sm:text-xl">{dates.long}</p>
        <GateButton className="mt-8 border border-primary sm:mt-10 px-8 py-4 text-xs uppercase tracking-[0.35em] text-primary transition hover:bg-primary hover:text-on-primary min-[360px]:px-10">
          {c.welcome.buttonLabel}
        </GateButton>
      </div>
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/70 text-secondary border border-primary/30">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        {/* Retrato y nombres */}
        <section className="relative overflow-hidden px-6 pb-12 pt-16 text-center sm:pb-16 sm:pt-28">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_at_top,rgba(201,164,92,0.14),transparent_65%)]" aria-hidden="true" />
          <Reveal variant="fade">
            <p className="text-xs uppercase tracking-[0.4em] text-secondary">{c.hero.eyebrow}</p>
          </Reveal>
          {/* Teléfono: el ancho del retrato sale del alto de la pantalla, para
              que nombres, fecha y "Desliza hacia abajo" quepan sin desplazar. */}
          <Reveal variant="scale" delay={120} className="mx-auto mt-5 w-[min(78%,max(8.5rem,calc((100svh-31rem)*0.75)))] max-w-sm sm:mt-10 sm:w-[78%]">
            <Gilded>
              <BwFrame photo={photos.portada} ratio={ratio("portada")} sizes="(min-width: 640px) 384px, 78vw" priority />
            </Gilded>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-6 font-display text-[2.6rem] short:mt-4 leading-[1.02] text-ink min-[360px]:text-5xl sm:mt-12 sm:text-7xl sm:leading-[1.05]">
              {/* Teléfono: "&" junto al segundo nombre (dos líneas, no tres). */}
              <span className="block">{names.one}</span>
              <span className="text-3xl italic text-primary sm:my-2 sm:block sm:text-4xl">&amp;</span>{" "}
              {names.two}
            </h1>
            <Rule className="mt-5 short:mt-3 sm:mt-8" />
            <p className="mt-4 text-balance font-display text-xl tracking-[0.06em] text-ink sm:mt-6 sm:text-2xl">{dates.long}</p>
            <p className="mt-1.5 text-xs uppercase tracking-[0.3em] text-muted">
              {dates.weekday} · {dates.time}
            </p>
          </Reveal>
          <ScrollCue className="mx-auto mt-5 text-secondary sm:mt-10" circleClassName="border-primary/60" />
        </section>

        {c.openingQuote && <GalaQuote quote={c.openingQuote} />}

        {/* Cuenta regresiva y programa */}
        <section id="ceremonia" className="bg-surface px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Heading eyebrow={c.countdown.eyebrow} title={c.countdown.title} />
            </Reveal>
            <Reveal delay={120} className="mt-12">
              <Countdown startISO={inv.startISO} endISO={inv.endISO} todayMessage={c.countdown.todayMessage} afterMessage={c.countdown.afterMessage} />
            </Reveal>
            <Reveal delay={200} className="mt-12 flex flex-col items-center gap-2">
              <a href={inv.links.calendar} className="inline-flex min-h-12 items-center gap-2.5 border border-primary/70 px-4 py-3 text-xs uppercase tracking-[0.1em] text-ink transition hover:bg-primary hover:text-on-primary min-[360px]:px-7 min-[360px]:tracking-[0.25em] max-w-full text-center [&_svg]:shrink-0">
                <CalendarIcon size={18} />
                Agregar a mi calendario
              </a>
              <a href={inv.links.googleCalendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-muted underline underline-offset-4 hover:text-ink">
                o agregar en Google Calendar
              </a>
            </Reveal>

            {/* Programa: línea dorada vertical con cada lugar */}
            <div className="relative mt-20">
              <span className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 sm:block" aria-hidden="true" />
              {inv.locations.map((l, i) => (
                <Reveal key={l.name + i} delay={i * 100} className="relative py-8 text-center">
                  <span className="mx-auto mb-5 block h-2 w-2 rotate-45 bg-primary" aria-hidden="true" />
                  {l.timeLabel && <p className="font-display text-3xl italic text-primary">{l.timeLabel}</p>}
                  {l.label && <p className="mt-2 text-xs uppercase tracking-[0.4em] text-secondary">{l.label}</p>}
                  <p className="mt-3 font-display text-2xl text-ink sm:text-3xl">{l.name}</p>
                  <p className="mt-1 text-sm text-muted">{l.address}</p>
                  <div className={`mx-auto mt-5 grid max-w-xs grid-cols-1 gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center ${l.wazeUrl ? "min-[360px]:grid-cols-[1fr_auto]" : ""}`}>
                    <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-primary px-5 py-3 text-xs uppercase tracking-[0.2em] text-on-primary transition hover:brightness-110 sm:px-6 sm:tracking-[0.25em]">
                      <PinIcon size={18} />
                      Cómo llegar
                    </a>
                    {l.wazeUrl && (
                      <a href={l.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center border border-secondary/50 px-6 py-3 text-xs uppercase tracking-[0.2em] text-ink transition hover:border-secondary sm:tracking-[0.25em]">
                        Waze
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted">{l.wazeUrl ? "Se abre en Google Maps o Waze" : "Se abre en Google Maps"}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {c.details && (c.details.notice || c.details.dressCode) && (
          <section id="detalles" className="px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <Heading eyebrow={c.details.eyebrow} title={c.details.title} />
              </Reveal>
              <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
                {c.details.dressCode && (
                  <Reveal>
                    <Gilded className="h-full">
                      <div className="flex h-full flex-col items-center px-5 py-10 text-center">
                        <p className="text-[11px] uppercase tracking-[0.4em] text-secondary">Vestimenta</p>
                        <p className="mt-4 font-display text-3xl italic text-primary sm:text-4xl">{c.details.dressCode.title}</p>
                        {c.details.dressCode.description && <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{c.details.dressCode.description}</p>}
                        {c.details.dressCode.avoidColors.length > 0 && (
                          <>
                            {c.details.dressCode.avoidLabel && <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-ink">{c.details.dressCode.avoidLabel}</p>}
                            <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-3">
                              {c.details.dressCode.avoidColors.map((color) => (
                                <span key={color.name} className="flex items-center gap-2.5 text-base uppercase tracking-[0.15em] text-ink">
                                  <AvoidSwatch hex={color.hex} />
                                  {color.name}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                        {c.details.dressCode.notice && <p className="mt-5 text-sm text-ink">{c.details.dressCode.notice}</p>}
                      </div>
                    </Gilded>
                  </Reveal>
                )}
                {c.details.notice && (
                  <Reveal delay={120}>
                    <Gilded className="h-full">
                      <div className="flex h-full flex-col items-center px-5 py-10 text-center">
                        <p className="text-[11px] uppercase tracking-[0.4em] text-secondary">{c.details.notice.label}</p>
                        <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
                          <Emphasis text={c.details.notice.title} className="font-normal italic text-primary" />
                        </p>
                        {c.details.notice.body && (
                          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                            <Emphasis text={c.details.notice.body} className="font-normal text-ink" />
                          </p>
                        )}
                        {c.details.notice.note && <p className="mt-3 text-sm text-muted">{c.details.notice.note}</p>}
                      </div>
                    </Gilded>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {c.story && (
          <section id="historia" className="bg-surface py-20 sm:py-28">
            <Reveal variant="fade" className="mx-auto max-w-5xl px-6">
              <Gilded>
                <BwFrame photo={photos.historia} ratio={ratio("historia")} sizes="(min-width: 1024px) 1000px, 100vw" />
              </Gilded>
            </Reveal>
            <Reveal className="mx-auto mt-10 max-w-2xl px-6 text-center">
              {c.story.caption && <p className="font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">{c.story.caption}</p>}
              {c.story.quote && (
                <p className="mt-6 text-sm text-muted">
                  &ldquo;{c.story.quote.text}&rdquo;
                  {c.story.quote.reference && <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-primary">{quoteCitation(c.story.quote)}</span>}
                </p>
              )}
            </Reveal>
            {c.family && (
              <Reveal className="mx-auto mt-16 max-w-3xl px-6 text-center">
                <Rule />
                <p className="mt-8 text-xs uppercase tracking-[0.4em] text-secondary">{c.family.intro}</p>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:divide-x sm:divide-primary/30">
                  {c.family.groups.map((g) => (
                    <div key={g.label}>
                      <p className="font-display text-sm italic text-primary">{g.label}</p>
                      {g.names.map((n, i) => (
                        <p key={i} className="mt-2 font-display text-xl text-ink">{n}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </section>
        )}
        {!c.story && c.family && (
          <section className="bg-surface px-6 py-20 text-center">
            <Reveal className="mx-auto max-w-3xl">
              <p className="text-xs uppercase tracking-[0.4em] text-secondary">{c.family.intro}</p>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:divide-x sm:divide-primary/30">
                {c.family.groups.map((g) => (
                  <div key={g.label}>
                    <p className="font-display text-sm italic text-primary">{g.label}</p>
                    {g.names.map((n, i) => (
                      <p key={i} className="mt-2 font-display text-xl text-ink">{n}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {c.gallery && (
          <section id="galeria" className="px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <Heading eyebrow={c.gallery.eyebrow} title={c.gallery.title} />
              </Reveal>
              <Reveal delay={60}>
                <p className="mt-6 text-center text-sm text-muted">Toca una foto para verla más grande.</p>
              </Reveal>
              <LightboxProvider photos={gallery} overlayClassName="bg-black/92" closeClassName="bg-primary text-on-primary hover:brightness-110">
                <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
                  {gallery.map((photo, i) => (
                    <Reveal key={i} variant="fade" delay={i * 90} className={i % 2 === 1 ? "translate-y-6 sm:translate-y-10" : ""}>
                      <LightboxItem index={i} label={photo.alt}>
                        <Gilded>
                          <BwFrame photo={photo} ratio={ratio(`galeria${i + 1}`)} sizes="(min-width: 896px) 420px, 46vw" />
                        </Gilded>
                      </LightboxItem>
                    </Reveal>
                  ))}
                </div>
              </LightboxProvider>
            </div>
          </section>
        )}

        {c.gifts && (
          <section id="regalos" className="bg-surface px-6 py-20 sm:py-28">
            <Reveal className="mx-auto max-w-xl text-center">
              <Heading eyebrow={c.gifts.eyebrow} title={c.gifts.title} />
              <p className="mt-8 text-base leading-relaxed text-muted">{c.gifts.message}</p>
              {c.gifts.method && <p className="mt-8 text-xs uppercase tracking-[0.35em] text-primary">{c.gifts.method}</p>}
              {c.gifts.value && (
                <div className="mt-4">
                  <CopyValue
                    value={c.gifts.value}
                    copyLabel={c.gifts.copyLabel}
                    copiedLabel={c.gifts.copiedLabel}
                    valueClassName="font-display text-3xl tracking-[0.1em] text-ink min-[360px]:text-4xl"
                    buttonClassName="border border-primary px-7 py-3 text-xs uppercase tracking-[0.25em] text-ink hover:bg-primary hover:text-on-primary"
                    noteClassName="text-muted"
                  />
                </div>
              )}
              {c.gifts.link && (
                <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-[52px] items-center justify-center border border-primary px-6 py-3 text-xs uppercase tracking-[0.18em] text-ink transition hover:bg-primary hover:text-on-primary min-[360px]:px-8 min-[360px]:tracking-[0.3em] max-w-full text-center [&_svg]:shrink-0">
                  {c.gifts.link.label}
                </a>
              )}
            </Reveal>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="px-6 py-20 sm:py-28">
              <div className="mx-auto max-w-2xl">
                <Reveal className="text-center">
                  <p className="text-xs uppercase tracking-[0.4em] text-secondary">{inv.rsvp.eyebrow}</p>
                  <h2 className="mt-4 font-display text-4xl text-ink sm:text-6xl">{inv.rsvp.title}</h2>
                  <Rule className="mt-6" />
                </Reveal>
                <Reveal delay={120} className="mt-10">
                  <Gilded>
                    <div className="px-3 py-8 sm:px-8 sm:py-10">
                      <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                    </div>
                  </Gilded>
                </Reveal>
              </div>
            </section>
          </BeforeEvent>
        )}

        {c.closingQuote && (
          <section className="px-6 py-16 text-center">
            <Reveal className="mx-auto max-w-2xl">
              <p className="font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">&ldquo;{c.closingQuote.text}&rdquo;</p>
              {c.closingQuote.reference && <p className="mt-6 text-xs uppercase tracking-[0.35em] text-primary">{quoteCitation(c.closingQuote)}</p>}
            </Reveal>
          </section>
        )}

        <footer className="border-t border-line px-6 py-24 text-center">
          <Reveal className="flex flex-col items-center">
            <Monogram initials={names.initials} />
            <p className="mt-8 text-xs uppercase tracking-[0.4em] text-secondary">{c.footer.message}</p>
            <p className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              <span className="block sm:inline">{names.one}</span> <span className="block sm:inline">&amp; {names.two}</span>
            </p>
            <p className="mt-4 font-display text-lg tracking-[0.06em] text-muted sm:text-xl">{dates.long}</p>
            <Fan className="mt-10 h-8 w-16 text-primary/70" />
            <MusicCredit music={c.music} className="mt-10 text-muted" />
          </Reveal>
        </footer>

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <StickyRsvp date={dates.compact} time={dates.time} barClassName="border border-primary/40 bg-paper/95 backdrop-blur" textClassName="font-display text-ink/90" buttonClassName="bg-primary text-on-primary tracking-[0.15em]" />
          </BeforeEvent>
        )}
        {c.music && <MusicPlayer music={c.music} fallback={inv.meta.musicPlayer} />}
      </Gate>
    </Shell>
  );
}
