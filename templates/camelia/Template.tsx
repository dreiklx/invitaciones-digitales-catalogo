import type { ReactNode } from "react";
import { quoteCitation, type ResolvedInvitation } from "@/lib/invitation/resolve";
import { toRoman } from "@/lib/invitation/time";
import type { PhotoSlotSpec } from "@/lib/invitation/types";
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
import { ArrowRightIcon, AvoidSwatch, CalendarIcon, PinIcon } from "../shared/icons";
import Countdown from "./Countdown";
import { fontClasses } from "./fonts";

// 05 · Camelia — quince años de gala, editorial y monumental (ocupa el
// lugar del antiguo diseño de boda Borgoña). Bloques vino frambuesa a
// sangre, el nombre de la quinceañera gigante en cursiva, un medallón con
// los XV, destellos rosa muy discretos, la información en formato de ficha
// y el programa de la noche. Juvenil y festivo sin ser infantil.

function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${light ? "text-secondary" : "text-accent"}`}>{children}</p>;
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t border-ink/15 py-6 sm:grid-cols-12 sm:gap-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted sm:col-span-3 sm:pt-1.5">{label}</p>
      <div className="sm:col-span-9">{children}</div>
    </div>
  );
}

// Destello de cuatro puntas (decorativo).
function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

// Medallón con la edad en números romanos ("XV"), doble anillo rosa.
function Medallion({ roman, className = "" }: { roman: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-full border border-secondary/80 p-[5%] ${className}`}>
      <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-secondary bg-primary">
        <span className="font-display text-[2.4em] italic leading-none text-secondary">{roman}</span>
      </div>
    </div>
  );
}

const rsvpStyles: RsvpStyles = {
  intro: "text-muted",
  deadline: "text-accent",
  progressDot: "bg-ink/20",
  progressDotActive: "bg-primary",
  progressLabel: "text-muted",
  legend: "text-ink",
  required: "text-accent",
  option: "rounded-full border-2 border-ink/20 bg-paper text-ink hover:border-primary",
  optionSelected: "rounded-full border-2 border-primary bg-primary text-on-primary",
  optionCheck: "bg-secondary text-primary",
  label: "text-muted",
  input: "rounded-full border-2 border-ink/20 bg-paper px-6 text-ink placeholder:text-muted/60 focus:border-primary",
  inputError: "!border-accent",
  error: "text-accent",
  help: "text-muted",
  stepButton: "border-2 border-primary text-primary",
  counter: "font-display italic text-primary",
  submit: "rounded-full bg-primary font-semibold uppercase tracking-[0.06em] text-on-primary sm:tracking-[0.12em] hover:bg-accent",
  submitNote: "text-muted",
  divider: "border-ink/15",
  declineLink: "text-ink/80 hover:text-ink",
  declineSubmit: "rounded-full border-2 border-ink/30 text-ink hover:border-primary hover:text-primary",
  contact: "text-muted",
  panel: "rounded-3xl border-2 border-primary/20 bg-paper text-ink",
};

export default function CameliaTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  const roman = toRoman(inv.honoree?.age ?? 15);
  // Un nombre largo ("Maximiliana") baja un escalón en vez de ensanchar la
  // página. Tamaño solo en vw para que no crezca con la letra agrandada.
  const longName = names.one.length > 8;
  const nameSize = longName ? "text-[min(17vw,9.5rem)]" : "text-[min(24vw,13rem)]";
  const ratio = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3];

  const cover = (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-primary px-6 pb-10 pt-20 text-on-primary sm:px-12 sm:pb-14 sm:pt-14">
      <Sparkle className="twinkle absolute right-[12%] top-[22%] h-5 w-5 text-secondary" />
      <Sparkle className="twinkle absolute bottom-[30%] left-[8%] h-3 w-3 text-secondary/80 [animation-delay:1.2s]" />
      <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
        <span>{c.welcome.eyebrow}</span>
        <span>{dates.dotted}</span>
      </div>
      <div>
        <Medallion roman={roman} className="h-20 w-20 text-[14px] sm:h-28 sm:w-28 sm:text-[19px]" />
        <h1 className={`mt-4 font-display ${nameSize} italic leading-[0.85] text-secondary`}>{names.one}</h1>
      </div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-xs text-sm text-on-primary/85">{dates.weekdayLong}</p>
        <GateButton className="inline-flex items-center justify-center gap-3 rounded-full bg-secondary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-on-primary">
          {c.welcome.buttonLabel}
          <ArrowRightIcon size={16} />
        </GateButton>
      </div>
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/85 text-primary">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        {/* Bloque vino + retrato. Teléfono: una pantalla con la foto a la
            derecha (su ancho sale del alto de la pantalla), el nombre
            monumental encima y "Desliza hacia abajo" visible.
            Escritorio: mitad texto, mitad foto a sangre. */}
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-primary px-6 pb-8 pt-16 text-on-primary sm:px-12 sm:pt-20 lg:grid lg:min-h-screen lg:grid-cols-2 lg:grid-rows-[auto_1fr_auto] lg:p-0">
          <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.25em] text-secondary lg:col-start-1 lg:row-start-1 lg:px-12 lg:pt-20">
            <span>{c.hero.eyebrow}</span>
            <span>{dates.dotted}</span>
          </div>
          <Reveal variant="fade" className="relative ml-auto mt-5 w-[min(72%,max(10rem,calc((100svh-26rem)*0.8)))] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:w-full">
            <Frame photo={photos.portada} ratio={ratio("portada")} sizes="(min-width: 1024px) 50vw, 68vw" priority className="lg:h-full" />
            <Medallion roman={roman} className="absolute -left-8 bottom-6 h-[4.5rem] w-[4.5rem] text-[12px] sm:h-24 sm:w-24 sm:text-[16px] lg:-left-14 lg:bottom-16 lg:h-28 lg:w-28 lg:text-[19px]" />
          </Reveal>
          <Reveal delay={100} className="relative z-10 -mt-4 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-center lg:px-12">
            <Sparkle className="twinkle mb-2 h-4 w-4 text-secondary" />
            <h1 className={`font-display ${nameSize} italic leading-[0.85] text-secondary [text-shadow:0_2px_18px_rgba(0,0,0,0.25)]`}>{names.one}</h1>
          </Reveal>
          <div className="mt-auto pt-4 lg:col-start-1 lg:row-start-3 lg:px-12 lg:pb-14">
            <p className="text-lg text-on-primary/90 short:text-base">{dates.weekdayLong}</p>
            {inv.locations[0] && <p className="mt-1 text-on-primary/70">{inv.locations[0].name}</p>}
            <ScrollCue className="mx-auto mt-5 text-on-primary lg:hidden" circleClassName="border-on-primary/60" />
          </div>
        </section>

        {c.openingQuote && (
          <section className="px-6 py-20 sm:px-12 sm:py-28">
            <Reveal className="mx-auto max-w-5xl">
              <Sparkle className="h-5 w-5 text-accent" />
              <p className="mt-6 font-display text-[clamp(2rem,6vw,4.5rem)] italic leading-[1.05] text-primary">{c.openingQuote.text}</p>
              {c.openingQuote.reference && <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted">— {quoteCitation(c.openingQuote)}</p>}
            </Reveal>
          </section>
        )}

        {/* Cuenta regresiva gigante */}
        <section className="bg-surface px-6 py-20 sm:px-12 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Label>{c.countdown.eyebrow}</Label>
              <h2 className="mt-3 font-display text-5xl text-ink sm:text-7xl">{c.countdown.title}</h2>
            </Reveal>
            <Reveal delay={120} className="mt-6">
              <Countdown startISO={inv.startISO} endISO={inv.endISO} todayMessage={c.countdown.todayMessage} afterMessage={c.countdown.afterMessage} />
            </Reveal>
          </div>
        </section>

        {/* Ficha con toda la información */}
        <section id="ceremonia" className="px-6 py-20 sm:px-12 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Label>{c.details?.eyebrow ?? "Información"}</Label>
              <h2 className="mt-3 font-display text-5xl text-ink sm:text-7xl">{c.details?.title ?? "Lo que debes saber"}</h2>
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <Row label="Fecha">
                <p className="font-display text-3xl leading-tight sm:text-4xl">{dates.weekdayLong}</p>
                <p className="mt-1 text-lg text-muted">{dates.time}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a href={inv.links.calendar} className="inline-flex min-h-12 max-w-full items-center gap-2.5 rounded-full border-2 border-primary px-4 py-3 text-center text-[13px] font-semibold uppercase tracking-[0.04em] text-primary transition min-[360px]:px-5 min-[360px]:text-sm min-[360px]:tracking-[0.12em] hover:bg-primary hover:text-on-primary [&_svg]:shrink-0">
                    <CalendarIcon size={18} />
                    Agregar a mi calendario
                  </a>
                  <a href={inv.links.googleCalendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-muted underline underline-offset-4 hover:text-ink">
                    o en Google Calendar
                  </a>
                </div>
              </Row>
              {inv.locations.map((l, i) => (
                <Row key={l.name + i} label={l.label ?? "Lugar"}>
                  <p className="font-display text-3xl leading-tight sm:text-4xl">{l.name}</p>
                  <p className="mt-1 text-lg text-muted">
                    {l.address}
                    {l.timeLabel && i > 0 && <span className="text-ink"> · {l.timeLabel}</span>}
                  </p>
                  <div className={`mt-4 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap ${l.wazeUrl ? "min-[360px]:grid-cols-[1fr_auto]" : ""}`}>
                    <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-on-primary transition hover:bg-accent">
                      <PinIcon size={18} />
                      Cómo llegar
                    </a>
                    {l.wazeUrl && (
                      <a href={l.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-ink/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-primary">
                        Waze
                      </a>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted">{l.wazeUrl ? "Se abre en Google Maps o Waze" : "Se abre en Google Maps"}</p>
                </Row>
              ))}
              {c.details?.dressCode && (
                <Row label="Vestimenta">
                  <p className="font-display text-3xl leading-tight sm:text-4xl">{c.details.dressCode.title}</p>
                  {c.details.dressCode.description && <p className="mt-1 text-lg text-muted">{c.details.dressCode.description}</p>}
                  {c.details.dressCode.avoidColors.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                      {c.details.dressCode.avoidLabel && <span className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">{c.details.dressCode.avoidLabel}</span>}
                      {c.details.dressCode.avoidColors.map((color) => (
                        <span key={color.name} className="flex items-center gap-2.5 text-lg font-semibold">
                          <AvoidSwatch hex={color.hex} size={26} />
                          {color.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {c.details.dressCode.notice && <p className="mt-3 text-base font-semibold text-primary">{c.details.dressCode.notice}</p>}
                </Row>
              )}
              <div className="border-t border-ink/15" />
            </Reveal>
          </div>
        </section>

        {/* Programa de la noche: horas en cursiva grande, una por fila */}
        {inv.schedule && (
          <section id="programa" className="bg-primary px-6 py-20 text-on-primary sm:px-12 sm:py-28">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-12">
              <Reveal className="md:col-span-4">
                <Label light>{inv.schedule.eyebrow}</Label>
                <h2 className="mt-3 font-display text-5xl italic leading-[0.95] text-secondary sm:text-6xl">{inv.schedule.title}</h2>
              </Reveal>
              <ol className="md:col-span-8">
                {inv.schedule.items.map((item, i) => (
                  <li key={item.time + item.title}>
                    <Reveal delay={i * 70} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-t border-on-primary/20 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                      <span className="font-display text-2xl italic leading-none text-secondary sm:text-4xl">{item.timeLabel}</span>
                      <span className="min-w-0">
                        <span className="block font-display text-2xl leading-tight sm:text-3xl">{item.title}</span>
                        {item.description && <span className="mt-1 block text-sm text-on-primary/75 sm:text-base">{item.description}</span>}
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {c.details?.notice && (
          <section id="detalles" className="bg-surface px-6 py-20 sm:px-12 sm:py-28">
            <Reveal className="mx-auto max-w-6xl">
              <Label>{c.details.notice.label}</Label>
              <p className="mt-6 font-display text-[clamp(2.4rem,8vw,6rem)] leading-[1.02] text-ink">
                <Emphasis text={c.details.notice.title} className="font-normal italic text-primary" />
              </p>
              {c.details.notice.body && (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  <Emphasis text={c.details.notice.body} className="font-semibold text-ink" />
                </p>
              )}
              {c.details.notice.note && <p className="mt-3 text-base text-muted">{c.details.notice.note}</p>}
            </Reveal>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="px-6 py-20 sm:px-12 sm:py-28">
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12">
                <Reveal className="lg:col-span-5">
                  <Label>{inv.rsvp.eyebrow}</Label>
                  <h2 className="mt-3 font-display text-[min(22vw,9rem)] italic leading-[0.85] text-primary">{inv.rsvp.title}</h2>
                </Reveal>
                <Reveal delay={120} className="lg:col-span-7">
                  <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                </Reveal>
              </div>
            </section>
          </BeforeEvent>
        )}

        {c.story && (
          <section id="historia" className="bg-surface px-6 py-20 sm:px-12 sm:py-28">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-12">
              <Reveal variant="curtain" className="md:col-span-5">
                <Frame photo={photos.historia} ratio={ratio("historia")} sizes="(min-width: 768px) 460px, 100vw" className="rounded-t-full" />
              </Reveal>
              <Reveal delay={120} className="md:col-span-6 md:col-start-7">
                <Label>Sobre mí</Label>
                {c.story.caption && <p className="mt-4 font-display text-3xl leading-[1.15] text-ink sm:text-4xl">{c.story.caption}</p>}
                {c.story.quote && (
                  <p className="mt-8 font-display text-2xl italic text-primary">
                    {c.story.quote.text}
                    {c.story.quote.reference && <span className="mt-2 block font-body text-xs font-semibold not-italic uppercase tracking-[0.25em] text-muted">— {quoteCitation(c.story.quote)}</span>}
                  </p>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {c.family && (
          <section className="px-6 py-20 sm:px-12 sm:py-24">
            <Reveal className="mx-auto max-w-6xl">
              <Label>{c.family.intro}</Label>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {c.family.groups.map((g) => (
                  <div key={g.label} className="border-t border-ink/15 pt-4">
                    <p className="font-display text-xl italic text-primary">{g.label}</p>
                    {g.names.map((n, i) => (
                      <p key={i} className="mt-1.5 text-lg text-ink">{n}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {c.gallery && (
          <section id="galeria" className="px-6 pb-20 sm:px-12 sm:pb-28">
            <div className="mx-auto max-w-6xl">
              <Reveal className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Label>{c.gallery.eyebrow}</Label>
                  <h2 className="mt-3 font-display text-5xl italic text-primary sm:text-7xl">{c.gallery.title}</h2>
                </div>
                <p className="text-sm text-muted">Toca una foto para verla más grande.</p>
              </Reveal>
              <LightboxProvider photos={gallery} overlayClassName="bg-ink/92" closeClassName="bg-secondary text-primary hover:bg-paper">
                <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
                  <Reveal variant="curtain">
                    <LightboxItem index={0} label={gallery[0].alt}>
                      <Frame photo={gallery[0]} ratio={ratio("galeria1")} sizes="(min-width: 1152px) 560px, 48vw" />
                    </LightboxItem>
                  </Reveal>
                  <Reveal variant="curtain" delay={120} className="mt-8 sm:mt-24">
                    <LightboxItem index={1} label={gallery[1].alt}>
                      <Frame photo={gallery[1]} ratio={ratio("galeria2")} sizes="(min-width: 1152px) 560px, 48vw" />
                    </LightboxItem>
                  </Reveal>
                </div>
                <Reveal variant="curtain" delay={180} className="mt-3 sm:mt-6">
                  <LightboxItem index={2} label={gallery[2].alt}>
                    <Frame photo={gallery[2]} ratio={ratio("galeria3")} sizes="(min-width: 1152px) 1152px, 100vw" />
                  </LightboxItem>
                </Reveal>
              </LightboxProvider>
            </div>
          </section>
        )}

        {c.gifts && (
          <section id="regalos" className="bg-surface px-6 py-20 sm:px-12 sm:py-24">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
              <Reveal className="md:col-span-6">
                <Label>{c.gifts.eyebrow}</Label>
                <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-6xl">{c.gifts.title}</h2>
                <p className="mt-5 max-w-md text-lg text-muted">{c.gifts.message}</p>
              </Reveal>
              <Reveal delay={120} className="md:col-span-5 md:col-start-8">
                {c.gifts.method && <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{c.gifts.method}</p>}
                {c.gifts.value && (
                  <div className="mt-3">
                    <CopyValue
                      value={c.gifts.value}
                      copyLabel={c.gifts.copyLabel}
                      copiedLabel={c.gifts.copiedLabel}
                      align="start"
                      valueClassName="font-display text-5xl italic text-primary sm:text-6xl"
                      buttonClassName="rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary hover:bg-primary hover:text-on-primary"
                      noteClassName="text-muted"
                    />
                  </div>
                )}
                {c.gifts.link && (
                  <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 max-w-full items-center rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-on-primary hover:bg-accent">
                    {c.gifts.link.label}
                  </a>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {c.closingQuote && (
          <section className="px-6 py-20 sm:px-12">
            <Reveal className="mx-auto max-w-5xl">
              <p className="font-display text-[clamp(2rem,6vw,4rem)] italic leading-[1.05] text-primary">{c.closingQuote.text}</p>
              {c.closingQuote.reference && <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-muted">— {quoteCitation(c.closingQuote)}</p>}
            </Reveal>
          </section>
        )}

        <footer className="relative overflow-hidden bg-primary px-6 pb-12 pt-20 text-on-primary sm:px-12">
          <Sparkle className="twinkle absolute right-[10%] top-14 h-5 w-5 text-secondary" />
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">{c.footer.message}</p>
            <p className={`mt-6 font-display ${nameSize} italic leading-[0.85] text-secondary`}>{names.one}</p>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-on-primary/25 pt-5 text-sm text-on-primary/80">
              <span>{dates.weekdayLong}</span>
              <span className="font-display text-2xl italic text-secondary">Mis {roman}</span>
            </div>
            <MusicCredit music={c.music} className="!mx-0 mt-8 text-on-primary/60" />
          </div>
        </footer>

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <StickyRsvp date={dates.compact} time={dates.time} barClassName="rounded-full bg-primary/95 backdrop-blur" textClassName="text-on-primary/90" buttonClassName="rounded-full bg-secondary font-bold text-primary" />
          </BeforeEvent>
        )}
        {c.music && <MusicPlayer music={c.music} fallback={inv.meta.musicPlayer} />}
      </Gate>
    </Shell>
  );
}
