import Image from "next/image";
import type { ResolvedInvitation, ResolvedLocation } from "@/lib/invitation/resolve";
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
import Shell from "../shared/Shell";
import { BeforeEvent } from "../shared/event-phase";
import { LightboxItem, LightboxProvider } from "../shared/Lightbox";
import { AvoidSwatch, CalendarIcon, PinIcon } from "../shared/icons";
import Countdown from "./Countdown";
import { fontClasses } from "./fonts";

// 01 · Olivo — el diseño original de la plantilla (probado con invitados
// reales, incluidas personas mayores), en verde olivo y lino.
// Composición: portada de papel → foto a pantalla completa → frases y foto
// de la pareja → bloque verde con cuenta regresiva y lugares → detalles →
// regalos → RSVP verde → galería collage → pie sobre foto.

function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 28" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M20 27V7" />
      <path d="M20 11c0 0-6-2-8-7" />
      <path d="M20 17c0 0 6-2 8-7" />
      <path d="M20 7c0 0-3.5-2.5-5.5-4.5" opacity="0.65" />
      <path d="M20 7c0 0 3.5-2.5 5.5-4.5" opacity="0.65" />
    </svg>
  );
}

function Heading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className={`text-xs uppercase tracking-[0.3em] sm:text-sm ${light ? "text-secondary" : "text-accent"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-3xl sm:text-5xl ${light ? "text-on-primary" : "text-primary"}`}>{title}</h2>
      <div className="ornament mt-5 w-full max-w-[220px] text-secondary" />
    </div>
  );
}

function QuoteBlock({ text, reference }: { text: string; reference?: string }) {
  return (
    <section className="bg-paper px-6 py-16 sm:py-20">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <div className="ornament mx-auto w-full max-w-[140px] text-secondary" />
          <p className="mt-6 font-display text-2xl italic leading-snug text-primary sm:text-3xl">&ldquo;{text}&rdquo;</p>
          {reference && <p className="mt-4 text-xs uppercase tracking-[0.3em] text-accent sm:text-sm">{reference}</p>}
          <div className="ornament mx-auto mt-6 w-full max-w-[140px] text-secondary" />
        </div>
      </Reveal>
    </section>
  );
}

function LocationBlock({ location }: { location: ResolvedLocation }) {
  return (
    <div className="mt-4 border-t border-on-primary/15 pt-4 text-center lg:text-left">
      {location.label && (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
          {location.label}
          {location.timeLabel && <span className="text-on-primary/80"> · {location.timeLabel}</span>}
        </p>
      )}
      <p className={`font-display text-xl text-on-primary ${location.label ? "mt-1.5" : ""}`}>{location.name}</p>
      {!location.label && location.timeLabel && <p className="mt-1 text-sm text-on-primary/90">{location.timeLabel}</p>}
      <p className="mt-1 text-sm leading-relaxed text-on-primary/80">{location.address}</p>
      {/* Forma de botón y aviso de que abre Google Maps (personas mayores). */}
      {/* Teléfono: botones del mismo ancho, uno debajo del otro (< 400px) o
          en dos columnas; fáciles de acertar con el pulgar. */}
      <div className="mt-5 flex flex-col items-center gap-2 lg:items-start">
        <div className={`grid w-full max-w-sm grid-cols-1 gap-3 lg:flex lg:w-auto lg:max-w-none ${location.wazeUrl ? "min-[400px]:grid-cols-2" : ""}`}>
          <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border-2 border-secondary bg-secondary/10 px-5 py-3 text-base font-bold text-secondary transition hover:bg-secondary hover:text-ink lg:px-6">
            <PinIcon />
            Cómo llegar
          </a>
          {location.wazeUrl && (
            <a href={location.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-on-primary/40 px-5 py-3 text-base font-bold text-on-primary transition hover:border-on-primary hover:bg-on-primary/10 lg:px-6">
              Abrir en Waze
            </a>
          )}
        </div>
        <p className="text-xs text-on-primary/75">{location.wazeUrl ? "Se abre en Google Maps o Waze" : "Se abre en Google Maps"}</p>
      </div>
    </div>
  );
}

const rsvpStyles: RsvpStyles = {
  intro: "text-on-primary/90",
  deadline: "text-secondary",
  progressDot: "bg-on-primary/25",
  progressDotActive: "bg-secondary",
  progressLabel: "text-on-primary/60",
  legend: "text-on-primary",
  required: "text-secondary",
  option: "rounded-2xl border-2 border-on-primary/60 bg-on-primary/5 text-on-primary hover:border-on-primary hover:bg-on-primary/10",
  optionSelected: "rounded-2xl border-2 border-secondary bg-secondary text-ink",
  optionCheck: "bg-ink text-paper",
  label: "text-on-primary/90",
  input: "rounded-2xl border-2 border-transparent bg-paper text-ink placeholder:text-muted/60 focus:ring-4 focus:ring-secondary/60",
  inputError: "!border-red-400",
  error: "text-red-200",
  help: "text-on-primary/80",
  stepButton: "border-2 border-secondary text-on-primary",
  counter: "font-display text-on-primary",
  submit: "rounded-full bg-accent font-display text-on-accent shadow-lg shadow-black/20 hover:brightness-110",
  submitNote: "text-on-primary/90",
  divider: "border-on-primary/15",
  declineLink: "text-on-primary/85 hover:text-on-primary",
  declineSubmit: "rounded-full border-2 border-on-primary/60 text-on-primary hover:border-on-primary hover:bg-on-primary/10",
  contact: "text-on-primary/80",
  panel: "rounded-2xl border border-on-primary/20 bg-on-primary/10 text-on-primary",
};

export default function OlivoTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  const slot = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3, photos.galeria4];

  const cover = (
    <div className="flex h-full items-center justify-center bg-gradient-to-b from-surface via-paper to-surface px-5 py-10 text-center sm:px-6">
      <div className="relative flex w-full max-w-md flex-col items-center gap-5 rounded-sm border border-secondary/50 bg-paper px-5 py-12 shadow-[0_30px_60px_-25px_rgba(28,32,20,0.35)] min-[360px]:px-8 sm:max-w-lg sm:px-14 sm:py-16">
        <Sprig className="h-7 w-10 text-secondary" />
        <p className="font-display text-xs uppercase italic tracking-[0.4em] text-accent">{c.welcome.eyebrow}</p>
        {/* Teléfono: un nombre por línea (no se pegan al borde de la tarjeta). */}
        <h1 className="font-display text-[2.6rem] leading-[1.08] text-ink sm:text-5xl sm:leading-tight">
          <span className="block sm:inline">{names.one}</span>
          <span className="block text-2xl text-accent sm:mx-2 sm:inline sm:align-middle sm:text-3xl">&amp;</span>
          <span className="block sm:inline">{names.two}</span>
        </h1>
        <div className="ornament w-full max-w-xs text-secondary">
          <span className="whitespace-nowrap font-display text-xs tracking-[0.25em] text-muted sm:text-sm sm:tracking-[0.3em]">{dates.display}</span>
        </div>
        <GateButton className="mt-6 rounded-full border border-ink bg-ink px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-paper shadow-lg shadow-ink/20 transition hover:bg-primary min-[360px]:px-9 min-[360px]:text-sm min-[360px]:tracking-[0.3em]">
          {c.welcome.buttonLabel}
        </GateButton>
      </div>
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/80 text-ink shadow-sm">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        {/* Hero a pantalla completa */}
        <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
          <Image src={photos.portada.src} alt={photos.portada.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: photos.portada.position }} />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/5 via-45% to-ink/85" />
          <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-10 text-center text-paper [text-shadow:0_1px_3px_rgba(0,0,0,0.45)] sm:pb-20">
            <p className="font-display text-sm uppercase italic tracking-[0.35em] text-paper/90 sm:text-base">{c.hero.eyebrow}</p>
            {/* Teléfono: un nombre por línea y más grandes (antes iban en una
                sola línea pegada a los bordes). Escritorio: una línea. */}
            <h1 className="mt-4 font-display text-[clamp(2.75rem,14vw,4rem)] leading-[1.02] sm:text-7xl sm:leading-[1.05]">
              <span className="block sm:inline">{names.one}</span>
              <span className="my-1 block text-[0.55em] text-secondary sm:mx-4 sm:my-0 sm:inline sm:align-middle sm:text-5xl">&amp;</span>
              <span className="block sm:inline">{names.two}</span>
            </h1>
            <div className="ornament mt-6 w-full max-w-sm text-secondary">
              <span className="whitespace-nowrap font-display text-sm tracking-[0.22em] sm:text-xl sm:tracking-[0.3em]">{dates.display}</span>
            </div>
            <ScrollCue className="mt-8 text-paper" circleClassName="border-paper/80 bg-ink/25" />
          </div>
        </section>

        {c.openingQuote && <QuoteBlock {...c.openingQuote} />}

        {c.story && (
          <section id="historia" className="bg-surface px-6 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl">
              <Reveal>
                <Frame photo={photos.historia} ratio={slot("historia")} sizes="(min-width: 768px) 672px, 100vw" className="rounded-[28px] shadow-xl shadow-ink/10" />
              </Reveal>
              {c.story.caption && (
                <Reveal delay={100}>
                  <p className="mx-auto mt-5 max-w-md text-center font-display text-lg italic text-muted sm:text-xl">{c.story.caption}</p>
                </Reveal>
              )}
              {c.story.quote && (
                <Reveal delay={160}>
                  <p className="mx-auto mt-4 max-w-md text-center font-display text-base italic text-muted sm:text-lg">
                    &ldquo;{c.story.quote.text}&rdquo;
                    {c.story.quote.reference && <span className="mt-1.5 block font-body text-xs not-italic uppercase tracking-[0.25em] text-accent">{c.story.quote.reference}</span>}
                  </p>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {c.family && (
          <section className={`bg-surface px-6 pb-16 sm:pb-20 ${c.story ? "pt-0" : "pt-16 sm:pt-20"}`}>
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="ornament mx-auto w-full max-w-[140px] text-secondary" />
                <p className="mt-6 font-display text-xl italic text-primary sm:text-2xl">{c.family.intro}</p>
                <div className="mt-8 flex flex-col items-center justify-center gap-8 sm:flex-row sm:items-start sm:gap-16">
                  {c.family.groups.map((group) => (
                    <div key={group.label} className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.3em] text-accent sm:text-sm">{group.label}</p>
                      <div className="mt-3 space-y-1">
                        {group.names.map((name, i) => (
                          <p key={i} className="font-display text-lg text-ink sm:text-xl">{name}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* Cuenta regresiva, calendario y lugares */}
        <section id="ceremonia" className="relative overflow-hidden bg-primary px-6 py-20 sm:py-28">
          <div className="mx-auto grid grid-cols-1 max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="order-2 lg:order-1">
              <Frame photo={photos.cuentaRegresiva} ratio={slot("cuentaRegresiva")} sizes="(min-width: 1024px) 380px, 320px" className="mx-auto w-full max-w-xs rounded-[28px] shadow-2xl shadow-black/30 lg:max-w-sm" />
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <Heading eyebrow={c.countdown.eyebrow} title={c.countdown.title} light />
              </Reveal>
              <Reveal delay={100} className="mt-10">
                <Countdown startISO={inv.startISO} endISO={inv.endISO} todayMessage={c.countdown.todayMessage} afterMessage={c.countdown.afterMessage} />
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 text-center text-sm text-on-primary/90 sm:text-base lg:text-left">
                  {dates.weekdayLong} · {dates.time}
                </p>
                <div className="mt-4 flex flex-col items-center gap-2 lg:items-start">
                  <a href={inv.links.calendar} className="inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap rounded-full border-2 border-on-primary/40 px-4 py-3 text-base font-bold text-on-primary transition hover:border-on-primary hover:bg-on-primary/10 min-[360px]:px-6">
                    <CalendarIcon />
                    Agregar a mi calendario
                  </a>
                  <a href={inv.links.googleCalendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-on-primary/80 underline underline-offset-4 hover:text-on-primary">
                    o agregar en Google Calendar
                  </a>
                </div>
              </Reveal>
              {inv.locations.map((location, i) => (
                <Reveal key={location.name + i} delay={260 + i * 60}>
                  <LocationBlock location={location} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {c.details && (c.details.notice || c.details.dressCode) && (
          <section id="detalles" className="bg-surface px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <Heading eyebrow={c.details.eyebrow} title={c.details.title} />
              </Reveal>
              {c.details.notice && (
                <Reveal delay={80}>
                  <div className="mx-auto mt-10 max-w-2xl rounded-[24px] border-2 border-accent bg-accent/10 px-6 py-7 text-center sm:px-10 sm:py-8">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{c.details.notice.label}</p>
                    <p className="mt-3 text-lg font-bold leading-snug text-primary sm:text-xl">
                      <Emphasis text={c.details.notice.title} className="text-accent" />
                    </p>
                    {c.details.notice.body && (
                      <p className="mt-4 text-sm leading-relaxed text-ink sm:text-base">
                        <Emphasis text={c.details.notice.body} className="font-bold text-accent" />
                      </p>
                    )}
                    {c.details.notice.note && <p className="mt-3 text-sm text-muted">{c.details.notice.note}</p>}
                  </div>
                </Reveal>
              )}
              {c.details.dressCode && (
                <Reveal delay={200}>
                  <div className={`mx-auto max-w-md rounded-[24px] border-2 border-accent/50 bg-paper px-6 py-8 text-center sm:px-8 ${c.details.notice ? "mt-8" : "mt-10"}`}>
                    <h3 className="font-display text-xl text-primary">{c.details.dressCode.title}</h3>
                    {c.details.dressCode.description && <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{c.details.dressCode.description}</p>}
                    {c.details.dressCode.avoidColors.length > 0 && (
                      <>
                        {c.details.dressCode.avoidLabel && <p className="mt-4 text-sm font-bold uppercase tracking-wide text-accent">{c.details.dressCode.avoidLabel}</p>}
                        <div className="mt-3 flex flex-col items-center gap-2.5">
                          {c.details.dressCode.avoidColors.map((color) => (
                            <span key={color.name} className="flex items-center gap-2.5 text-lg font-bold uppercase tracking-wide text-ink">
                              <AvoidSwatch hex={color.hex} />
                              {color.name}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    {c.details.dressCode.notice && <p className="mt-5 text-sm font-semibold leading-relaxed text-primary">{c.details.dressCode.notice}</p>}
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {c.gifts && (
          <section id="regalos" className="bg-paper px-6 py-20 sm:py-28">
            <div className="mx-auto grid grid-cols-1 max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <Frame photo={photos.regalos} ratio={slot("regalos")} sizes="(min-width: 1024px) 380px, 320px" className="mx-auto w-full max-w-xs rounded-[28px] shadow-xl shadow-ink/10 lg:max-w-sm" />
              </Reveal>
              <div>
                <Reveal>
                  <Heading eyebrow={c.gifts.eyebrow} title={c.gifts.title} />
                </Reveal>
                <Reveal delay={100}>
                  <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted sm:text-base">{c.gifts.message}</p>
                </Reveal>
                {c.gifts.method && (
                  <Reveal delay={180}>
                    <p className="mt-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-accent">{c.gifts.method}</p>
                  </Reveal>
                )}
                {c.gifts.value && (
                  <Reveal delay={240} className="mt-3">
                    <CopyValue
                      value={c.gifts.value}
                      copyLabel={c.gifts.copyLabel}
                      copiedLabel={c.gifts.copiedLabel}
                      valueClassName="text-center font-display text-3xl tracking-wider text-primary min-[360px]:text-4xl sm:text-5xl"
                      buttonClassName="rounded-full border-2 border-secondary bg-paper px-7 py-3 text-base font-semibold uppercase tracking-wide text-primary hover:bg-secondary/20"
                      noteClassName="text-muted"
                    />
                  </Reveal>
                )}
                {c.gifts.link && (
                  <Reveal delay={280} className="mt-6 flex justify-center">
                    <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 py-4 text-base font-semibold uppercase tracking-wide text-paper transition hover:bg-primary">
                      {c.gifts.link.label}
                    </a>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="bg-primary px-6 py-20 sm:py-28">
              <div className="mx-auto max-w-xl">
                <Reveal>
                  <Heading eyebrow={inv.rsvp.eyebrow} title={inv.rsvp.title} light />
                </Reveal>
                <Reveal delay={120} className="mt-8">
                  <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                </Reveal>
              </div>
            </section>
          </BeforeEvent>
        )}

        {c.gallery && (
          <section id="galeria" className="bg-surface px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <Heading eyebrow={c.gallery.eyebrow} title={c.gallery.title} />
              </Reveal>
              <Reveal delay={60}>
                <p className="mx-auto mt-4 max-w-sm text-center text-sm text-muted">Toca una foto para verla más grande.</p>
              </Reveal>
              {/* Collage editorial con marcos de proporción fija: fila 1
                  horizontal grande + vertical; fila 2 vertical + horizontal
                  inclinada y superpuesta. Igual en teléfono y escritorio. */}
              <LightboxProvider photos={gallery} overlayClassName="bg-ink/90" closeClassName="bg-paper text-ink hover:bg-surface">
                <div className="mt-8 sm:mt-12">
                  <div className="flex items-start gap-2.5 sm:gap-4">
                    <Reveal className="w-[58%]">
                      <LightboxItem index={0} label={gallery[0].alt} className="rounded-2xl border-[3px] border-paper shadow-lg shadow-ink/15 transition duration-300 hover:-translate-y-1">
                        <Frame photo={gallery[0]} ratio={slot("galeria1")} sizes="(min-width: 768px) 440px, 60vw" className="rounded-[13px]" />
                      </LightboxItem>
                    </Reveal>
                    <Reveal delay={100} className="mt-6 min-w-0 flex-1 sm:mt-10">
                      <LightboxItem index={1} label={gallery[1].alt} className="rounded-2xl border-[3px] border-paper shadow-lg shadow-ink/15 transition duration-300 hover:-translate-y-1">
                        <Frame photo={gallery[1]} ratio={slot("galeria2")} sizes="(min-width: 768px) 300px, 40vw" className="rounded-[13px]" />
                      </LightboxItem>
                    </Reveal>
                  </div>
                  <div className="-mt-3 flex items-start gap-2.5 sm:-mt-6 sm:gap-4">
                    <Reveal delay={150} className="relative z-0 w-[40%]">
                      <LightboxItem index={2} label={gallery[2].alt} className="rounded-2xl border-[3px] border-paper shadow-lg shadow-ink/15 transition duration-300 hover:-translate-y-1">
                        <Frame photo={gallery[2]} ratio={slot("galeria3")} sizes="(min-width: 768px) 300px, 40vw" className="rounded-[13px]" />
                      </LightboxItem>
                    </Reveal>
                    <Reveal delay={220} className="relative z-10 -ml-4 mt-10 min-w-0 flex-1 sm:-ml-6 sm:mt-16">
                      <LightboxItem index={3} label={gallery[3].alt} className="rounded-2xl border-[3px] border-paper shadow-2xl shadow-ink/30 transition duration-300 [transform:rotate(-2.5deg)] hover:[transform:rotate(-1deg)_translateY(-4px)]">
                        <Frame photo={gallery[3]} ratio={slot("galeria4")} sizes="(min-width: 768px) 460px, 62vw" className="rounded-[13px]" />
                      </LightboxItem>
                    </Reveal>
                  </div>
                </div>
              </LightboxProvider>
            </div>
          </section>
        )}

        {c.closingQuote && <QuoteBlock {...c.closingQuote} />}

        <footer className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-ink px-6 py-24 text-center">
          <Image src={photos.cierre.src} alt={photos.cierre.alt} fill sizes="100vw" className="object-cover opacity-30" style={{ objectPosition: photos.cierre.position }} />
          <div className="relative z-10 flex flex-col items-center">
            <p className="font-display text-xl italic text-paper/90 sm:text-2xl">{c.footer.message}</p>
            <h2 className="mt-3 font-display text-[2.6rem] leading-[1.1] text-paper sm:text-6xl">
              <span className="block sm:inline">{names.one}</span> <span className="block sm:inline">&amp; {names.two}</span>
            </h2>
            <div className="ornament mt-6 w-full max-w-xs text-secondary">
              <span className="whitespace-nowrap text-xs uppercase tracking-[0.25em] text-paper/80">{dates.numeric}</span>
            </div>
          </div>
        </footer>

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <StickyRsvp date={dates.compact} time={dates.time} barClassName="rounded-full bg-ink/95 backdrop-blur" textClassName="font-display text-paper/90" buttonClassName="rounded-full bg-accent font-bold text-on-accent" />
          </BeforeEvent>
        )}
        {c.music && <MusicPlayer song={c.music} classes={{ button: "bg-ink text-paper hover:bg-primary", icon: "bg-accent text-on-accent", status: "text-paper/70" }} />}
      </Gate>
    </Shell>
  );
}
