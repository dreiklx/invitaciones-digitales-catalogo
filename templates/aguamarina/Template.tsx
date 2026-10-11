import type { ReactNode } from "react";
import { quoteCitation, type ResolvedInvitation, type ResolvedLocation } from "@/lib/invitation/resolve";
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
import { AvoidSwatch, CalendarIcon, PinIcon } from "../shared/icons";
import Countdown from "./Countdown";
import { Gem, Sparkle, Tiara, XvRule } from "./ornaments";
import { fontClasses } from "./fonts";

// 05 · Aguamarina — quinceaños (rediseño 2026-10-11). Una joya:
// azul petróleo, perla, bruma aguamarina y oro champán; fotos en marcos
// tallados como una esmeralda (esquinas biseladas, doble filete), una tiara
// de línea fina, el nombre en Cormorant cursiva y filetes con rombos. Mucho
// aire, composición simétrica en teléfono y a dos columnas en escritorio.
// Distinta de Aurora (lila, espejo ovalado, caligrafía) y de Gala (negro y
// dorado art déco).

function Heading({ eyebrow, title, light = false, className = "" }: { eyebrow: string; title: string; light?: boolean; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <p className={`text-[11px] font-medium uppercase tracking-[0.35em] sm:text-xs ${light ? "text-secondary" : "text-accent"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-[2.6rem] font-medium italic leading-[1.05] sm:text-6xl ${light ? "text-on-primary" : "text-primary"}`}>{title}</h2>
      <div className={`mx-auto mt-5 flex items-center justify-center gap-2 ${light ? "text-secondary" : "text-secondary"}`} aria-hidden="true">
        <span className="h-px w-10 bg-current" />
        <span className="h-1.5 w-1.5 rotate-45 bg-current" />
        <span className="h-px w-10 bg-current" />
      </div>
    </div>
  );
}

function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[11px] font-medium uppercase tracking-[0.3em] ${light ? "text-secondary" : "text-accent"}`}>{children}</p>;
}

function Place({ location }: { location: ResolvedLocation }) {
  return (
    <Gem cut={22} gap={0} className="h-full">
      <article className="flex h-full flex-col items-center bg-paper px-6 py-9 text-center sm:px-8">
        {location.label && <Label>{location.label}</Label>}
        {location.timeLabel && <p className="mt-2 font-display text-3xl font-medium italic text-primary">{location.timeLabel}</p>}
        <p className="mt-3 font-display text-[1.7rem] font-semibold leading-tight text-ink">{location.name}</p>
        <p className="mt-1 text-base text-muted">{location.address}</p>
        <div className={`mt-6 grid w-full max-w-sm grid-cols-1 gap-3 ${location.wazeUrl ? "min-[400px]:grid-cols-2" : ""}`}>
          <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-on-primary transition hover:brightness-110">
            <PinIcon size={18} />
            Cómo llegar
          </a>
          {location.wazeUrl && (
            <a href={location.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-primary/40 px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-primary transition hover:border-primary">
              Abrir en Waze
            </a>
          )}
        </div>
        <p className="mt-2 text-xs text-muted">{location.wazeUrl ? "Se abre en Google Maps o Waze" : "Se abre en Google Maps"}</p>
      </article>
    </Gem>
  );
}

const rsvpStyles: RsvpStyles = {
  intro: "text-muted",
  deadline: "text-accent",
  progressDot: "bg-primary/20",
  progressDotActive: "bg-secondary",
  progressLabel: "text-muted",
  legend: "text-ink",
  required: "text-accent",
  option: "rounded-full border border-primary/30 bg-paper text-ink hover:border-primary",
  optionSelected: "rounded-full border border-primary bg-primary text-on-primary",
  optionCheck: "bg-secondary text-primary",
  label: "text-muted",
  input: "rounded-full border border-primary/25 bg-paper px-6 text-ink placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-accent/30",
  inputError: "!border-accent",
  error: "text-accent",
  help: "text-muted",
  stepButton: "border border-primary text-primary",
  counter: "font-display italic text-primary",
  submit: "rounded-full bg-primary font-medium uppercase tracking-[0.08em] text-on-primary shadow-lg shadow-primary/20 hover:brightness-110 sm:tracking-[0.14em]",
  submitNote: "text-muted",
  divider: "border-primary/15",
  declineLink: "text-ink/80 hover:text-ink",
  declineSubmit: "rounded-full border border-primary/40 text-primary hover:border-primary",
  contact: "text-muted",
  panel: "rounded-3xl border border-secondary/60 bg-surface/60 text-ink",
};

export default function AguamarinaTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  const roman = toRoman(inv.honoree?.age ?? 15);
  const ratio = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3, photos.galeria4];
  // El nombre, en cursiva grande; tamaño solo en vw (no ensancha la página
  // ni con la letra del sistema agrandada) y un escalón menos si es largo.
  const nameSize = names.one.length > 8 ? "text-[min(15vw,6.5rem)]" : "text-[min(20vw,8rem)]";

  // Portada "Abrir invitación": azul petróleo con un halo aguamarina, marco
  // fino, tiara, el nombre y los XV.
  const cover = (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-primary bg-[radial-gradient(ellipse_at_50%_38%,color-mix(in_srgb,var(--c-accent)_45%,var(--c-primary))_0%,var(--c-primary)_68%)] px-6 text-center text-on-primary">
      <div aria-hidden="true" className="absolute inset-3 border border-secondary/45 sm:inset-6" />
      <div aria-hidden="true" className="absolute inset-[18px] border border-secondary/20 sm:inset-[30px]" />
      <Sparkle className="twinkle absolute left-[14%] top-[20%] h-3 w-3 text-secondary" />
      <Sparkle className="twinkle absolute bottom-[24%] right-[13%] h-4 w-4 text-secondary" style={{ animationDelay: "1.3s" }} />
      <div className="relative flex flex-col items-center">
        <Tiara className="h-9 w-[4.5rem] text-secondary" />
        <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.4em] text-secondary">{c.welcome.eyebrow}</p>
        <h1 className={`mt-4 font-display ${nameSize} font-medium italic leading-[0.95]`}>{names.one}</h1>
        <XvRule label={roman} className="mt-4 text-secondary" />
        <p className="mt-5 text-sm tracking-[0.12em] text-on-primary/85">{dates.weekdayLong}</p>
        <GateButton className="mt-9 rounded-full border border-secondary px-9 py-4 text-[13px] font-medium uppercase tracking-[0.3em] text-secondary transition hover:bg-secondary hover:text-primary">
          {c.welcome.buttonLabel}
        </GateButton>
      </div>
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/85 text-primary border border-secondary/50">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        {/* Portada: teléfono = todo centrado (el ancho del retrato sale del
            alto de la pantalla para que nombre, XV, fecha y "Desliza hacia
            abajo" quepan); escritorio = retrato a la izquierda y texto a la
            derecha. Bruma aguamarina arriba, perla abajo. */}
        <section className="relative overflow-hidden bg-gradient-to-b from-surface via-paper to-paper px-6 pb-10 pt-16 text-center sm:pt-20 lg:flex lg:min-h-screen lg:items-center lg:py-20">
          <Sparkle className="twinkle absolute left-[8%] top-[14%] h-3 w-3 text-secondary" />
          <Sparkle className="twinkle absolute right-[9%] top-[38%] h-4 w-4 text-secondary" style={{ animationDelay: "1.6s" }} />
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="fade" className="mx-auto w-[min(70%,max(9rem,calc((100svh-27rem)*0.8)))] max-w-[26rem] lg:mr-0 lg:w-[min(30rem,calc((100svh-9rem)*0.8))] lg:max-w-none">
              <Gem cut={30} gap={8}>
                <Frame photo={photos.portada} ratio={ratio("portada")} sizes="(min-width: 1024px) 420px, 70vw" priority />
              </Gem>
            </Reveal>
            <Reveal delay={120} className="lg:text-center">
              <Tiara className="mx-auto h-7 w-14 text-secondary sm:h-9 sm:w-[4.5rem]" />
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.4em] text-accent">{c.hero.eyebrow}</p>
              <h1 className={`mt-2 font-display ${nameSize} font-medium italic leading-[0.95] text-primary short:mt-1`}>{names.one}</h1>
              <XvRule label={roman} className="mt-3 text-secondary" />
              <p className="mt-3 text-sm tracking-[0.1em] text-ink/80 sm:text-base">{dates.weekdayLong}</p>
              {inv.locations[0] && <p className="mt-1 text-sm text-muted">{inv.locations[0].name}</p>}
              <ScrollCue className="mx-auto mt-5 text-primary lg:hidden" circleClassName="border-primary/40" />
            </Reveal>
          </div>
        </section>

        {c.openingQuote && (
          <section className="px-6 py-20 text-center sm:py-28">
            <Reveal className="mx-auto max-w-3xl">
              <Sparkle className="mx-auto h-4 w-4 text-secondary" />
              <p className="mt-6 font-display text-[1.9rem] italic leading-snug text-primary sm:text-5xl">{c.openingQuote.text}</p>
              {c.openingQuote.reference && <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.35em] text-muted">{quoteCitation(c.openingQuote)}</p>}
            </Reveal>
          </section>
        )}

        {/* Cuenta regresiva en gemas talladas */}
        <section className="relative overflow-hidden bg-primary bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--c-accent)_35%,var(--c-primary))_0%,var(--c-primary)_70%)] px-6 py-20 text-on-primary sm:py-28">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Heading eyebrow={c.countdown.eyebrow} title={c.countdown.title} light />
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <Countdown startISO={inv.startISO} endISO={inv.endISO} todayMessage={c.countdown.todayMessage} afterMessage={c.countdown.afterMessage} />
            </Reveal>
            <Reveal delay={180} className="mt-10 flex flex-col items-center gap-2 text-center">
              <p className="font-display text-2xl italic">
                {dates.weekdayLong} <span className="whitespace-nowrap text-secondary">· {dates.time}</span>
              </p>
              <a href={inv.links.calendar} className="mt-3 inline-flex min-h-12 max-w-full items-center gap-2.5 rounded-full border border-secondary px-6 py-3 text-center text-sm font-medium uppercase tracking-[0.16em] text-secondary transition hover:bg-secondary hover:text-primary [&_svg]:shrink-0">
                <CalendarIcon size={18} />
                Agregar a mi calendario
              </a>
              <a href={inv.links.googleCalendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-on-primary/80 underline underline-offset-4 hover:text-on-primary">
                o agregar en Google Calendar
              </a>
            </Reveal>
          </div>
        </section>

        {/* Dónde: tarjetas talladas */}
        <section id="ceremonia" className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Heading eyebrow="Te espero" title="Dónde celebraremos" />
            </Reveal>
            <div className={`mx-auto mt-12 grid grid-cols-1 gap-6 ${inv.locations.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
              {inv.locations.map((l, i) => (
                <Reveal key={l.name + i} delay={i * 100}>
                  <Place location={l} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Programa: línea vertical con gemas */}
        {inv.schedule && (
          <section id="programa" className="bg-surface px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-2xl">
              <Reveal>
                <Heading eyebrow={inv.schedule.eyebrow} title={inv.schedule.title} />
              </Reveal>
              <ol className="relative mt-12">
                <span aria-hidden="true" className="absolute bottom-3 left-[6.25rem] top-3 w-px bg-secondary sm:left-1/2" />
                {inv.schedule.items.map((item, i) => (
                  <li key={item.time + item.title}>
                    <Reveal delay={i * 70} className="relative grid grid-cols-[6.25rem_1fr] items-baseline gap-6 py-4 sm:grid-cols-2 sm:gap-12">
                      <span aria-hidden="true" className="absolute left-[6.25rem] top-[1.6rem] h-2.5 w-2.5 -translate-x-1/2 rotate-45 border border-secondary bg-paper sm:left-1/2" />
                      <span className="whitespace-nowrap pr-4 text-right text-[11px] font-medium uppercase tracking-[0.1em] text-accent sm:text-sm sm:tracking-[0.2em]">{item.timeLabel}</span>
                      <span className="min-w-0 pl-2">
                        <span className="block font-display text-2xl font-semibold leading-tight text-primary sm:text-3xl">{item.title}</span>
                        {item.description && <span className="mt-0.5 block text-sm text-muted">{item.description}</span>}
                      </span>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {c.story && (
          <section id="historia" className="px-6 py-20 sm:py-28">
            <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <Reveal variant="fade" className="mx-auto w-[78%] max-w-sm md:w-full">
                <Gem cut={26} gap={7}>
                  <Frame photo={photos.historia} ratio={ratio("historia")} sizes="(min-width: 768px) 384px, 78vw" />
                </Gem>
              </Reveal>
              <Reveal delay={120} className="text-center md:text-left">
                <Label>Sobre mí</Label>
                {c.story.caption && <p className="mt-5 font-display text-[1.75rem] leading-snug text-ink sm:text-3xl">{c.story.caption}</p>}
                {c.story.quote && (
                  <p className="mt-6 font-display text-2xl italic text-primary">
                    &ldquo;{c.story.quote.text}&rdquo;
                    {c.story.quote.reference && <span className="mt-2 block font-body text-[11px] not-italic uppercase tracking-[0.3em] text-muted">— {quoteCitation(c.story.quote)}</span>}
                  </p>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {/* Familia y corte de honor */}
        {c.family && (
          <section className="bg-surface px-6 py-20 text-center sm:py-24">
            <Reveal className="mx-auto max-w-5xl">
              <Tiara className="mx-auto h-7 w-14 text-secondary" />
              <p className="mt-4 font-display text-3xl italic text-primary sm:text-4xl">{c.family.intro}</p>
              <div className={`mt-10 grid grid-cols-1 gap-10 ${c.family.groups.length > 2 ? "md:grid-cols-3" : c.family.groups.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {c.family.groups.map((g) => (
                  <div key={g.label}>
                    <Label>{g.label}</Label>
                    <div className="mx-auto mt-3 h-px w-10 bg-secondary" />
                    {g.names.map((n, i) => (
                      <p key={i} className="mt-3 font-display text-xl text-ink sm:text-2xl">{n}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {c.details && (c.details.notice || c.details.dressCode) && (
          <section id="detalles" className="px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <Heading eyebrow={c.details.eyebrow} title={c.details.title} />
              </Reveal>
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {c.details.notice && (
                  <Reveal>
                    <Gem cut={22} gap={0} className="h-full">
                      <div className="h-full bg-primary px-7 py-10 text-center text-on-primary">
                        <Label light>{c.details.notice.label}</Label>
                        <p className="mt-4 font-display text-[1.75rem] leading-snug sm:text-3xl">
                          <Emphasis text={c.details.notice.title} className="italic text-secondary" />
                        </p>
                        {c.details.notice.body && (
                          <p className="mt-4 text-base leading-relaxed text-on-primary/90">
                            <Emphasis text={c.details.notice.body} className="font-semibold text-secondary" />
                          </p>
                        )}
                        {c.details.notice.note && <p className="mt-3 text-sm text-on-primary/80">{c.details.notice.note}</p>}
                      </div>
                    </Gem>
                  </Reveal>
                )}
                {c.details.dressCode && (
                  <Reveal delay={120}>
                    <Gem cut={22} gap={0} className="h-full">
                      <div className="h-full bg-paper px-7 py-10 text-center">
                        <Label>Vestimenta</Label>
                        <p className="mt-4 font-display text-3xl font-semibold text-primary">{c.details.dressCode.title}</p>
                        {c.details.dressCode.description && <p className="mt-2 text-base leading-relaxed text-muted">{c.details.dressCode.description}</p>}
                        {c.details.dressCode.avoidColors.length > 0 && (
                          <div className="mt-5">
                            {c.details.dressCode.avoidLabel && <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">{c.details.dressCode.avoidLabel}</p>}
                            <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-3">
                              {c.details.dressCode.avoidColors.map((color) => (
                                <span key={color.name} className="flex items-center gap-2.5 text-lg font-medium text-ink">
                                  <AvoidSwatch hex={color.hex} size={26} />
                                  {color.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {c.details.dressCode.notice && <p className="mt-4 text-sm font-medium text-primary">{c.details.dressCode.notice}</p>}
                      </div>
                    </Gem>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Galería: dos columnas que se cruzan, todas talladas */}
        {c.gallery && (
          <section id="galeria" className="bg-surface px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <Heading eyebrow={c.gallery.eyebrow} title={c.gallery.title} />
              </Reveal>
              <Reveal delay={60}>
                <p className="mt-5 text-center text-sm text-muted">Toca una foto para verla más grande.</p>
              </Reveal>
              <LightboxProvider photos={gallery} overlayClassName="bg-ink/92" closeClassName="bg-paper text-primary hover:bg-surface">
                <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
                  <div className="flex flex-col gap-3 sm:gap-6">
                    <Reveal variant="fade">
                      <LightboxItem index={0} label={gallery[0].alt}>
                        <Gem cut={18} gap={0}>
                          <Frame photo={gallery[0]} ratio={ratio("galeria1")} sizes="(min-width: 768px) 360px, 46vw" />
                        </Gem>
                      </LightboxItem>
                    </Reveal>
                    <Reveal variant="fade" delay={160}>
                      <LightboxItem index={2} label={gallery[2].alt}>
                        <Gem cut={18} gap={0}>
                          <Frame photo={gallery[2]} ratio={ratio("galeria3")} sizes="(min-width: 768px) 360px, 46vw" />
                        </Gem>
                      </LightboxItem>
                    </Reveal>
                  </div>
                  <div className="flex flex-col gap-3 pt-10 sm:gap-6 sm:pt-16">
                    <Reveal variant="fade" delay={80}>
                      <LightboxItem index={1} label={gallery[1].alt}>
                        <Gem cut={18} gap={0}>
                          <Frame photo={gallery[1]} ratio={ratio("galeria2")} sizes="(min-width: 768px) 360px, 46vw" />
                        </Gem>
                      </LightboxItem>
                    </Reveal>
                    <Reveal variant="fade" delay={240}>
                      <LightboxItem index={3} label={gallery[3].alt}>
                        <Gem cut={18} gap={0}>
                          <Frame photo={gallery[3]} ratio={ratio("galeria4")} sizes="(min-width: 768px) 360px, 46vw" />
                        </Gem>
                      </LightboxItem>
                    </Reveal>
                  </div>
                </div>
              </LightboxProvider>
            </div>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="bg-gradient-to-b from-paper to-surface px-5 py-20 sm:px-6 sm:py-28">
              <div className="mx-auto max-w-xl">
                <Reveal>
                  <Heading eyebrow={inv.rsvp.eyebrow} title={inv.rsvp.title} />
                </Reveal>
                <Reveal delay={120} className="mt-10">
                  <Gem cut={24} gap={0}>
                    <div className="bg-paper px-4 py-9 min-[360px]:px-6 sm:px-10 sm:py-12">
                      <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                    </div>
                  </Gem>
                </Reveal>
              </div>
            </section>
          </BeforeEvent>
        )}

        {c.gifts && (
          <section id="regalos" className="px-6 py-20 sm:py-28">
            <Reveal className="mx-auto max-w-xl text-center">
              <Heading eyebrow={c.gifts.eyebrow} title={c.gifts.title} />
              <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">{c.gifts.message}</p>
              {c.gifts.method && <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-accent">{c.gifts.method}</p>}
              {c.gifts.value && (
                <div className="mt-3">
                  <CopyValue
                    value={c.gifts.value}
                    copyLabel={c.gifts.copyLabel}
                    copiedLabel={c.gifts.copiedLabel}
                    valueClassName="font-display text-[min(12vw,3.5rem)] font-medium italic text-primary"
                    buttonClassName="rounded-full border border-primary/40 px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] text-primary hover:bg-primary hover:text-on-primary"
                    noteClassName="text-muted"
                  />
                </div>
              )}
              {c.gifts.link && (
                <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 max-w-full items-center rounded-full bg-primary px-8 py-3 text-center text-sm font-medium uppercase tracking-[0.14em] text-on-primary hover:brightness-110">
                  {c.gifts.link.label}
                </a>
              )}
            </Reveal>
          </section>
        )}

        {c.closingQuote && (
          <section className="px-6 pb-20 text-center">
            <Reveal className="mx-auto max-w-2xl">
              <p className="font-display text-3xl italic leading-snug text-primary sm:text-4xl">{c.closingQuote.text}</p>
              {c.closingQuote.reference && <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{quoteCitation(c.closingQuote)}</p>}
            </Reveal>
          </section>
        )}

        <footer className="relative overflow-hidden bg-primary bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_srgb,var(--c-accent)_40%,var(--c-primary))_0%,var(--c-primary)_70%)] px-6 pb-16 pt-20 text-center text-on-primary sm:pb-20 sm:pt-28">
          <div aria-hidden="true" className="absolute inset-3 border border-secondary/35 sm:inset-6" />
          <div className="relative">
            <Tiara className="mx-auto h-9 w-[4.5rem] text-secondary" />
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.4em] text-secondary">{c.footer.message}</p>
            <p className={`mt-4 font-display ${nameSize} font-medium italic leading-[0.95]`}>{names.one}</p>
            <XvRule label={roman} className="mt-4 text-secondary" />
            <p className="mt-5 text-sm tracking-[0.12em] text-on-primary/85">{dates.weekdayLong}</p>
            <MusicCredit music={c.music} className="mt-10 text-on-primary/60" />
          </div>
        </footer>

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <StickyRsvp date={dates.compact} time={dates.time} barClassName="rounded-full bg-primary/95 backdrop-blur" textClassName="text-on-primary/90" buttonClassName="rounded-full bg-secondary font-semibold text-primary" />
          </BeforeEvent>
        )}
        {c.music && <MusicPlayer music={c.music} fallback={inv.meta.musicPlayer} />}
      </Gate>
    </Shell>
  );
}
