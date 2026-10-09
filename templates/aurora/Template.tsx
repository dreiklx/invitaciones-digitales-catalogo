import { quoteCitation, type ResolvedInvitation } from "@/lib/invitation/resolve";
import type { PhotoSlotSpec } from "@/lib/invitation/types";
import { toRoman } from "@/lib/invitation/time";
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
import { Sparkle, SparkleField, SparkleRule } from "./ornaments";
import { fontClasses } from "./fonts";

// 06 · Aurora — quinceaños. Un amanecer lila: luces suaves de color,
// destellos que titilan, el retrato en un espejo ovalado con un "XV"
// gigante de contorno detrás y el nombre en caligrafía. Elegante y juvenil,
// sin coronas ni brillos recargados.

function Heading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="text-center">
      <p className={`text-xs font-semibold uppercase tracking-[0.35em] ${light ? "text-secondary" : "text-accent"}`}>{eyebrow}</p>
      <h2 className={`mt-4 font-display text-4xl leading-tight sm:text-6xl ${light ? "text-on-primary" : "text-ink"}`}>{title}</h2>
      <SparkleRule className="mt-5 text-secondary" />
    </div>
  );
}

const rsvpStyles: RsvpStyles = {
  intro: "text-muted",
  deadline: "text-accent",
  progressDot: "bg-primary/20",
  progressDotActive: "bg-accent",
  progressLabel: "text-muted",
  legend: "text-ink",
  required: "text-accent",
  option: "rounded-2xl border-2 border-primary/25 bg-paper text-ink hover:border-primary/60",
  optionSelected: "rounded-2xl border-2 border-primary bg-primary text-on-primary",
  optionCheck: "bg-on-primary text-primary",
  label: "text-muted",
  input: "rounded-2xl border-2 border-primary/20 bg-paper text-ink placeholder:text-muted/60 focus:border-primary focus:ring-4 focus:ring-secondary/40",
  inputError: "!border-accent",
  error: "text-accent",
  help: "text-muted",
  stepButton: "border-2 border-primary/50 text-primary",
  counter: "font-display text-primary",
  submit: "rounded-full bg-accent font-semibold text-on-accent shadow-lg shadow-accent/25 hover:bg-primary",
  submitNote: "text-muted",
  divider: "border-line",
  declineLink: "text-ink/80 hover:text-ink",
  declineSubmit: "rounded-full border-2 border-primary/40 text-primary hover:bg-primary hover:text-on-primary",
  contact: "text-muted",
  panel: "rounded-2xl border border-line bg-surface text-ink",
};

export default function AuroraTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  const ratio = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3, photos.galeria4];
  const roman = toRoman(inv.honoree?.age ?? 15);
  const ageText = inv.honoree?.ageText ?? "";

  const cover = (
    <div className="aurora-glow relative flex h-full flex-col items-center justify-center overflow-hidden px-6 text-center text-ink">
      <SparkleField className="text-primary/45" />
      <span aria-hidden="true" className="xv-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%] select-none font-display text-[clamp(13rem,78vw,32rem)] leading-none">
        {roman}
      </span>
      <div className="relative flex flex-col items-center">
        <Sparkle className="h-6 w-6 text-accent" />
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.4em] text-primary">{c.welcome.eyebrow}</p>
        <h1 className="mt-3 px-2 font-script text-[clamp(3.5rem,19vw,7.5rem)] leading-[1.15] text-primary">{names.one}</h1>
        <p className="mt-1 whitespace-nowrap text-sm font-medium tracking-[0.3em] text-muted sm:text-base">{dates.display}</p>
        <GateButton className="mt-10 rounded-full bg-primary px-9 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-on-primary shadow-lg shadow-primary/30 transition hover:bg-accent">
          {c.welcome.buttonLabel}
        </GateButton>
      </div>
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/85 text-primary border border-primary/20">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        {/* Espejo ovalado con el XV detrás. En teléfono el ancho del retrato
            sale del alto de la pantalla para que todo quepa sin desplazar. */}
        <section className="aurora-glow relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-8 pt-16 text-center sm:pb-12 sm:pt-20">
          <SparkleField className="text-primary/45" />
          <Reveal variant="fade" className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-primary">{c.hero.eyebrow}</p>
          </Reveal>
          <Reveal variant="scale" delay={100} className="relative mt-6 w-[min(68%,max(10rem,calc((100svh-25rem)*0.75)))] max-w-[22rem] sm:mt-8">
            <span aria-hidden="true" className="xv-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(13rem,82vw,34rem)] leading-none">
              {roman}
            </span>
            <div className="relative rounded-[50%] border border-primary/40 p-2 shadow-2xl shadow-primary/25 sm:p-2.5">
              <Frame photo={photos.portada} ratio={ratio("portada")} sizes="(min-width: 640px) 352px, 68vw" priority className="rounded-[50%]" />
            </div>
            <Sparkle className="twinkle absolute -right-3 top-[10%] h-7 w-7 text-accent" />
            <Sparkle className="twinkle absolute -left-2 bottom-[16%] h-5 w-5 text-primary/70" style={{ animationDelay: "1.4s" }} />
          </Reveal>
          <Reveal delay={200} className="relative">
            <h1 className="mt-4 px-2 font-script text-[clamp(3.25rem,17vw,6.5rem)] leading-[1.15] text-primary">{names.one}</h1>
            <div className="mt-1 flex items-center justify-center gap-3 text-primary">
              <span className="h-px w-6 bg-current opacity-40 sm:w-10" />
              <p className="whitespace-nowrap text-sm font-medium tracking-[0.3em] text-ink/80 sm:text-base">{dates.display}</p>
              <span className="h-px w-6 bg-current opacity-40 sm:w-10" />
            </div>
          </Reveal>
          <ScrollCue className="relative mx-auto mt-5 text-primary sm:mt-8" circleClassName="border-primary/50 bg-paper/40" />
        </section>

        {c.openingQuote && (
          <section className="px-6 py-20 text-center sm:py-28">
            <Reveal className="mx-auto max-w-2xl">
              <SparkleRule className="text-secondary" />
              <p className="mt-8 font-display text-3xl leading-snug text-ink sm:text-5xl">&ldquo;{c.openingQuote.text}&rdquo;</p>
              {c.openingQuote.reference && <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-accent">{quoteCitation(c.openingQuote)}</p>}
            </Reveal>
          </section>
        )}

        {c.story && (
          <section id="historia" className="px-6 pb-20 sm:pb-28">
            <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <Reveal variant="scale" className="relative mx-auto w-[80%] max-w-sm md:w-full">
                <span aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] bg-secondary/45 sm:-right-5 sm:-top-5" />
                <Frame photo={photos.historia} ratio={ratio("historia")} sizes="(min-width: 768px) 384px, 80vw" className="relative rounded-[2rem] shadow-xl shadow-primary/15" />
                <Sparkle className="twinkle absolute -bottom-3 -left-3 h-8 w-8 text-accent" />
              </Reveal>
              <Reveal delay={120} className="text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">Mi mensaje</p>
                {c.story.caption && <p className="mt-5 font-display text-2xl leading-snug text-ink sm:text-3xl">{c.story.caption}</p>}
                {c.story.quote && (
                  <div className="mt-6">
                    <p className="text-base leading-relaxed text-muted sm:text-lg">{c.story.quote.text}</p>
                    {c.story.quote.reference && <p className="mt-2 font-script text-4xl text-primary">{quoteCitation(c.story.quote)}</p>}
                  </div>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {c.family && (
          <section className="px-6 pb-20 sm:pb-28">
            <Reveal className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-surface/70 px-6 py-10 text-center sm:px-10 sm:py-12">
              <p className="font-display text-2xl text-primary sm:text-3xl">{c.family.intro}</p>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {c.family.groups.map((g) => (
                  <div key={g.label}>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{g.label}</p>
                    {g.names.map((n, i) => (
                      <p key={i} className="mt-2 text-lg text-ink">{n}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* Cuenta regresiva sobre violeta */}
        <section id="ceremonia" className="relative overflow-hidden bg-primary px-6 py-20 text-on-primary sm:py-28">
          <SparkleField className="text-secondary/60" />
          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <Heading eyebrow={c.countdown.eyebrow} title={c.countdown.title} light />
            </Reveal>
            <Reveal delay={100} className="mt-10 sm:mt-12">
              <Countdown startISO={inv.startISO} endISO={inv.endISO} todayMessage={c.countdown.todayMessage} afterMessage={c.countdown.afterMessage} />
            </Reveal>
            <Reveal delay={180} className="mt-10 flex flex-col items-center gap-2 sm:mt-12">
              <p className="text-lg font-light sm:text-xl">
                {dates.weekdayLong}
                <span className="block whitespace-nowrap text-secondary">{dates.time}</span>
              </p>
              <a href={inv.links.calendar} className="mt-3 inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-on-primary px-5 py-3 text-base font-semibold text-primary shadow-lg shadow-black/15 transition hover:bg-secondary min-[360px]:px-7 max-w-full text-center [&_svg]:shrink-0">
                <CalendarIcon />
                Agregar a mi calendario
              </a>
              <a href={inv.links.googleCalendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-on-primary/80 underline underline-offset-4 hover:text-on-primary">
                o agregar en Google Calendar
              </a>
            </Reveal>
          </div>
        </section>

        {/* Programa de la noche: línea de tiempo con destellos */}
        {inv.schedule && (
          <section id="programa" className="aurora-glow px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <Heading eyebrow={inv.schedule.eyebrow} title={inv.schedule.title} />
              </Reveal>
              <ol className="relative mx-auto mt-12 w-fit max-w-xl">
                <span aria-hidden="true" className="absolute bottom-6 left-[6.375rem] top-6 w-px bg-primary/25 sm:left-[8.25rem]" />
                {inv.schedule.items.map((item, i) => (
                  <li key={item.time + item.title}>
                    <Reveal delay={i * 70} className="grid grid-cols-[5.5rem_1.75rem_minmax(0,1fr)] items-start py-4 sm:grid-cols-[7rem_2.5rem_minmax(0,1fr)] sm:py-5">
                      <p className="whitespace-nowrap pt-0.5 text-right text-base font-semibold leading-tight text-primary sm:text-lg">{item.timeLabel}</p>
                      <span className="flex justify-center pt-1.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-paper">
                          <Sparkle className="h-4 w-4 text-accent" />
                        </span>
                      </span>
                      <div>
                        <p className="text-lg font-semibold leading-snug text-ink sm:text-xl">{item.title}</p>
                        {item.description && <p className="mt-1 text-sm text-muted sm:text-base">{item.description}</p>}
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Lugares */}
        <section id="lugares" className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Heading eyebrow="Ubicación" title="Dónde nos vemos" />
            </Reveal>
            <div className={`mx-auto mt-12 grid grid-cols-1 gap-6 ${inv.locations.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
              {inv.locations.map((l, i) => (
                <Reveal key={l.name + i} delay={i * 100}>
                  <article className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-paper px-5 pb-7 pt-9 text-center shadow-xl shadow-primary/10 sm:px-8">
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-secondary via-accent/60 to-secondary" />
                    {l.label && <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{l.label}</p>}
                    {l.timeLabel && <p className="mt-2 text-2xl font-light text-primary">{l.timeLabel}</p>}
                    <p className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">{l.name}</p>
                    <p className="mt-1 text-sm text-muted sm:text-base">{l.address}</p>
                    <div className={`mx-auto mt-6 grid max-w-sm grid-cols-1 gap-3 ${l.wazeUrl ? "sm:grid-cols-2" : ""}`}>
                      <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-base font-semibold text-on-primary transition hover:bg-accent">
                        <PinIcon size={18} />
                        Cómo llegar
                      </a>
                      {l.wazeUrl && (
                        <a href={l.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-primary/40 px-4 py-3 text-base font-semibold text-primary transition hover:border-primary">
                          Abrir en Waze
                        </a>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted">{l.wazeUrl ? "Se abre en Google Maps o Waze" : "Se abre en Google Maps"}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {c.details && (c.details.notice || c.details.dressCode) && (
          <section id="detalles" className="bg-surface px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <Heading eyebrow={c.details.eyebrow} title={c.details.title} />
              </Reveal>
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {c.details.notice && (
                  <Reveal>
                    <div className="h-full rounded-[2rem] border-2 border-accent/35 bg-paper px-6 py-9 text-center sm:px-8">
                      <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                        <Sparkle className="h-3.5 w-3.5" />
                        {c.details.notice.label}
                      </p>
                      <p className="mt-5 font-display text-2xl leading-snug text-ink sm:text-3xl">
                        <Emphasis text={c.details.notice.title} className="text-accent" />
                      </p>
                      {c.details.notice.body && (
                        <p className="mt-4 text-base leading-relaxed text-muted">
                          <Emphasis text={c.details.notice.body} className="font-semibold text-ink" />
                        </p>
                      )}
                      {c.details.notice.note && <p className="mt-3 text-sm text-muted">{c.details.notice.note}</p>}
                    </div>
                  </Reveal>
                )}
                {c.details.dressCode && (
                  <Reveal delay={120}>
                    <div className="h-full rounded-[2rem] border border-line bg-paper px-6 py-9 text-center sm:px-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">Vestimenta</p>
                      <p className="mt-5 font-display text-3xl text-primary sm:text-4xl">{c.details.dressCode.title}</p>
                      {c.details.dressCode.description && <p className="mt-3 text-base leading-relaxed text-muted">{c.details.dressCode.description}</p>}
                      {c.details.dressCode.avoidColors.length > 0 && (
                        <div className="mt-6">
                          {c.details.dressCode.avoidLabel && <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{c.details.dressCode.avoidLabel}</p>}
                          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-3">
                            {c.details.dressCode.avoidColors.map((color) => (
                              <span key={color.name} className="flex items-center gap-2.5 text-lg font-semibold text-ink">
                                <AvoidSwatch hex={color.hex} size={26} />
                                {color.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {c.details.dressCode.notice && <p className="mt-5 text-sm font-semibold text-primary">{c.details.dressCode.notice}</p>}
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {c.gallery && (
          <section id="galeria" className="px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <Heading eyebrow={c.gallery.eyebrow} title={c.gallery.title} />
              </Reveal>
              <Reveal delay={60}>
                <p className="mt-5 text-center text-sm text-muted">Toca una foto para verla más grande.</p>
              </Reveal>
              <LightboxProvider photos={gallery} overlayClassName="bg-ink/92" closeClassName="bg-paper text-primary hover:bg-surface">
                {/* Foto grande + tira de cabina (tres fotos 4:3). En teléfono la
                    tira va debajo, centrada; en escritorio, al lado. */}
                <div className="mt-10 grid grid-cols-1 items-center gap-10 md:grid-cols-[1.3fr_1fr] md:gap-12">
                  <Reveal variant="scale">
                    <LightboxItem index={0} label={gallery[0].alt} className="rounded-[2rem]">
                      <Frame photo={gallery[0]} ratio={ratio("galeria1")} sizes="(min-width: 768px) 480px, 100vw" className="rounded-[2rem] shadow-xl shadow-primary/15" />
                    </LightboxItem>
                  </Reveal>
                  <Reveal delay={120} className="mx-auto w-[66%] max-w-[15rem] md:w-[82%] md:max-w-[18rem]">
                    <div className="rotate-[2.5deg] rounded-md bg-paper p-2.5 pb-3 shadow-2xl shadow-primary/30 ring-1 ring-line sm:p-3">
                      <div className="grid grid-cols-1 gap-2.5">
                        {[1, 2, 3].map((i) => (
                          <LightboxItem key={i} index={i} label={gallery[i].alt}>
                            <Frame photo={gallery[i]} ratio={ratio(`galeria${i + 1}`)} sizes="(min-width: 768px) 260px, 60vw" />
                          </LightboxItem>
                        ))}
                      </div>
                      <p className="mt-2 text-center font-script text-3xl leading-tight text-primary">
                        {names.one} <span className="font-display text-xl tracking-[0.2em]">{roman}</span>
                      </p>
                    </div>
                  </Reveal>
                </div>
              </LightboxProvider>
            </div>
          </section>
        )}

        {c.gifts && (
          <section id="regalos" className="bg-surface px-6 py-20 sm:py-28">
            <Reveal className="mx-auto max-w-xl text-center">
              <Heading eyebrow={c.gifts.eyebrow} title={c.gifts.title} />
              <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">{c.gifts.message}</p>
              {(c.gifts.value || c.gifts.link) && (
                <div className="mt-8 rounded-[2rem] border border-line bg-paper px-5 py-8 sm:px-8">
                  {c.gifts.method && <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{c.gifts.method}</p>}
                  {c.gifts.value && (
                    <div className="mt-3">
                      <CopyValue
                        value={c.gifts.value}
                        copyLabel={c.gifts.copyLabel}
                        copiedLabel={c.gifts.copiedLabel}
                        valueClassName="font-display text-4xl tracking-wider text-primary sm:text-5xl"
                        buttonClassName="rounded-full border-2 border-primary/40 px-7 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-on-primary"
                        noteClassName="text-muted"
                      />
                    </div>
                  )}
                  {c.gifts.link && (
                    <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-[52px] items-center rounded-full bg-primary px-7 py-3 text-base font-semibold text-on-primary hover:bg-accent">
                      {c.gifts.link.label}
                    </a>
                  )}
                </div>
              )}
            </Reveal>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="aurora-glow relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28">
              <SparkleField className="text-primary/40" />
              <div className="relative mx-auto max-w-xl">
                <Reveal>
                  <Heading eyebrow={inv.rsvp.eyebrow} title={inv.rsvp.title} />
                </Reveal>
                <Reveal delay={120} className="mt-10">
                  <div className="rounded-[2rem] border border-line bg-paper/90 px-4 py-8 shadow-xl shadow-primary/10 backdrop-blur min-[360px]:px-5 sm:px-8 sm:py-10">
                    <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                  </div>
                </Reveal>
              </div>
            </section>
          </BeforeEvent>
        )}

        {c.closingQuote && (
          <section className="px-6 pt-20 text-center sm:pt-28">
            <Reveal className="mx-auto max-w-2xl">
              <p className="font-display text-3xl leading-snug text-ink sm:text-4xl">&ldquo;{c.closingQuote.text}&rdquo;</p>
              {c.closingQuote.reference && <p className="mt-5 text-xs font-semibold uppercase tracking-[0.35em] text-accent">{quoteCitation(c.closingQuote)}</p>}
            </Reveal>
          </section>
        )}

        <Reveal variant="scale" className="px-6 py-16 sm:py-20">
          <div className="relative mx-auto max-w-4xl">
            <Frame photo={photos.cierre} ratio={ratio("cierre")} sizes="(min-width: 896px) 896px, 100vw" className="rounded-[2rem] shadow-xl shadow-primary/15" />
            <Sparkle className="twinkle absolute -right-2 -top-3 h-8 w-8 text-accent" />
          </div>
        </Reveal>

        <footer className="relative overflow-hidden bg-primary px-6 py-20 text-center text-on-primary sm:py-24">
          <SparkleField className="text-secondary/60" />
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(12rem,70vw,28rem)] leading-none text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--c-on-primary)_18%,transparent)]">
            {roman}
          </span>
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">{c.footer.message}</p>
            <p className="mt-4 px-2 font-script text-[clamp(3.5rem,17vw,7rem)] leading-[1.15]">{names.one}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.35em] text-on-primary/80">{ageText}</p>
            <p className="mt-2 whitespace-nowrap text-sm font-medium tracking-[0.3em] text-on-primary/90 sm:text-base">{dates.display}</p>
            <MusicCredit music={c.music} className="mt-10 text-on-primary/65" />
          </div>
        </footer>

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <StickyRsvp date={dates.compact} time={dates.time} barClassName="rounded-full bg-primary/95 backdrop-blur" textClassName="text-on-primary/90" buttonClassName="rounded-full bg-accent font-bold text-on-accent" />
          </BeforeEvent>
        )}
        {c.music && <MusicPlayer music={c.music} fallback={inv.meta.musicPlayer} />}
      </Gate>
    </Shell>
  );
}
