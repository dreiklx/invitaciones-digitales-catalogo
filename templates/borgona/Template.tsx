import type { ReactNode } from "react";
import { quoteCitation, type ResolvedInvitation } from "@/lib/invitation/resolve";
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

// 05 · Borgoña — contemporáneo y tipográfico. Bloques de color vino a
// sangre, nombres monumentales en cursiva, información en formato de ficha
// (filas con filetes), composición asimétrica y casi sin ornamentos. La
// confirmación va pronto en la página, con mucha presencia.

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

const rsvpStyles: RsvpStyles = {
  intro: "text-muted",
  deadline: "text-accent",
  progressDot: "bg-ink/20",
  progressDotActive: "bg-primary",
  progressLabel: "text-muted",
  legend: "text-ink",
  required: "text-accent",
  option: "border-2 border-ink/20 bg-paper text-ink hover:border-primary",
  optionSelected: "border-2 border-primary bg-primary text-on-primary",
  optionCheck: "bg-secondary text-primary",
  label: "text-muted",
  input: "border-2 border-ink/20 bg-paper text-ink placeholder:text-muted/60 focus:border-primary",
  inputError: "!border-accent",
  error: "text-accent",
  help: "text-muted",
  stepButton: "border-2 border-primary text-primary",
  counter: "font-display italic text-primary",
  submit: "bg-primary font-semibold uppercase tracking-[0.06em] text-on-primary sm:tracking-[0.12em] hover:bg-accent",
  submitNote: "text-muted",
  divider: "border-ink/15",
  declineLink: "text-ink/80 hover:text-ink",
  declineSubmit: "border-2 border-ink/30 text-ink hover:border-primary hover:text-primary",
  contact: "text-muted",
  panel: "border-2 border-primary/20 bg-paper text-ink",
};

export default function BorgonaTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  // Nombres largos ("Maximiliano") no caben a la escala gigante en 320 px:
  // bajan un escalón en vez de ensanchar la página o cortarse. El tamaño va
  // solo en vw (sin mínimo en rem) para que tampoco crezca con la letra
  // agrandada del teléfono.
  const longNames = Math.max(names.one.length, names.two.length + 2) > 10;
  const ratio = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3];

  const cover = (
    <div className="flex h-full flex-col justify-between bg-primary px-6 pb-10 pt-20 text-on-primary sm:px-12 sm:pb-14 sm:pt-14">
      <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
        <span>{c.welcome.eyebrow}</span>
        <span>{dates.dotted}</span>
      </div>
      <h1 className={`font-display ${longNames ? "text-[min(13.5vw,10rem)]" : "text-[clamp(3.6rem,18.5vw,13rem)]"} italic leading-[0.82] text-secondary`}>
        {names.one}
        <span className="block pl-[10%]">&amp;&nbsp;{names.two}</span>
      </h1>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-xs text-sm text-on-primary/80">{dates.weekdayLong}</p>
        <GateButton className="inline-flex items-center justify-center gap-3 bg-secondary px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:bg-on-primary">
          {c.welcome.buttonLabel}
          <ArrowRightIcon size={16} />
        </GateButton>
      </div>
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/85 text-primary">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        {/* Bloque vino + foto.
            Teléfono y tableta: una sola pantalla de color vino con la foto a
            la derecha (asimétrica), los nombres debajo y "Desliza hacia
            abajo" visible sin desplazar; el ancho de la foto sale del alto
            de la pantalla. Escritorio: mitad texto, mitad foto a sangre. */}
        <section className="flex min-h-[100svh] flex-col bg-primary px-6 pb-8 pt-16 text-on-primary sm:px-12 sm:pt-20 lg:grid lg:min-h-screen lg:grid-cols-2 lg:grid-rows-[auto_1fr_auto] lg:p-0">
          <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.25em] text-secondary lg:col-start-1 lg:row-start-1 lg:px-12 lg:pt-20">
            <span>{c.hero.eyebrow}</span>
            <span>{dates.dotted}</span>
          </div>
          <Reveal variant="fade" className="relative ml-auto mt-5 w-[min(78%,max(10rem,calc((100svh-25rem)*0.8)))] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:w-full">
            <Frame photo={photos.portada} ratio={ratio("portada")} sizes="(min-width: 1024px) 50vw, 68vw" priority />
          </Reveal>
          <Reveal delay={100} className="relative z-10 -mt-6 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-center lg:px-12">
            <h1 className={`font-display ${longNames ? "text-[min(13.5vw,8.5rem)]" : "text-[clamp(3.6rem,18.5vw,11rem)]"} italic leading-[0.82] text-secondary [text-shadow:0_2px_18px_rgba(0,0,0,0.25)]`}>
              {names.one}
              <span className="block pl-[10%]">&amp;&nbsp;{names.two}</span>
            </h1>
          </Reveal>
          <div className="mt-auto pt-5 lg:col-start-1 lg:row-start-3 lg:px-12 lg:pb-14">
            <p className="text-lg text-on-primary/90 short:text-base">{dates.weekdayLong}</p>
            {inv.locations[0] && <p className="mt-1 text-on-primary/70">{inv.locations[0].name}</p>}
            <ScrollCue className="mx-auto mt-5 text-on-primary lg:hidden" circleClassName="border-on-primary/60" />
          </div>
        </section>

        {c.openingQuote && (
          <section className="px-6 py-20 sm:px-12 sm:py-28">
            <Reveal className="mx-auto max-w-5xl">
              <p className="font-display text-[clamp(2rem,6vw,4.5rem)] italic leading-[1.05] text-primary">{c.openingQuote.text}</p>
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
                  <a href={inv.links.calendar} className="inline-flex min-h-12 items-center gap-2.5 border-2 border-primary px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.04em] text-primary transition min-[360px]:px-5 min-[360px]:text-sm min-[360px]:tracking-[0.12em] hover:bg-primary hover:text-on-primary max-w-full text-center [&_svg]:shrink-0">
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
                    <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-on-primary transition hover:bg-accent">
                      <PinIcon size={18} />
                      Cómo llegar
                    </a>
                    {l.wazeUrl && (
                      <a href={l.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center border-2 border-ink/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-primary">
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

        {c.details?.notice && (
          <section id="detalles" className="bg-primary px-6 py-20 text-on-primary sm:px-12 sm:py-28">
            <Reveal className="mx-auto max-w-6xl">
              <Label light>{c.details.notice.label}</Label>
              <p className="mt-6 font-display text-[clamp(2.4rem,8vw,6rem)] leading-[1.02]">
                <Emphasis text={c.details.notice.title} className="font-normal italic text-secondary" />
              </p>
              {c.details.notice.body && (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-primary/85">
                  <Emphasis text={c.details.notice.body} className="font-semibold text-on-primary" />
                </p>
              )}
              {c.details.notice.note && <p className="mt-3 text-base text-on-primary/70">{c.details.notice.note}</p>}
            </Reveal>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="bg-surface px-6 py-20 sm:px-12 sm:py-28">
              <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 lg:grid-cols-12">
                <Reveal className="lg:col-span-5">
                  <Label>{inv.rsvp.eyebrow}</Label>
                  <h2 className="mt-3 font-display text-[clamp(4rem,18vw,9rem)] italic leading-[0.85] text-primary">{inv.rsvp.title}</h2>
                </Reveal>
                <Reveal delay={120} className="lg:col-span-7">
                  <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                </Reveal>
              </div>
            </section>
          </BeforeEvent>
        )}

        {c.story && (
          <section id="historia" className="px-6 py-20 sm:px-12 sm:py-28">
            <div className="mx-auto grid grid-cols-1 max-w-6xl items-center gap-10 md:grid-cols-12">
              <Reveal variant="curtain" className="md:col-span-5">
                <Frame photo={photos.historia} ratio={ratio("historia")} sizes="(min-width: 768px) 460px, 100vw" />
              </Reveal>
              <Reveal delay={120} className="md:col-span-6 md:col-start-7">
                {c.story.caption && <p className="font-display text-3xl leading-[1.15] text-ink sm:text-4xl">{c.story.caption}</p>}
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
          <section className="px-6 pb-20 sm:px-12 sm:pb-28">
            <Reveal className="mx-auto max-w-6xl border-t border-ink/15 pt-8">
              <Label>{c.family.intro}</Label>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {c.family.groups.map((g) => (
                  <div key={g.label}>
                    <p className="text-sm text-muted">{g.label}</p>
                    {g.names.map((n, i) => (
                      <p key={i} className="mt-1 font-display text-2xl text-ink">{n}</p>
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
                  <h2 className="mt-3 font-display text-5xl text-ink sm:text-7xl">{c.gallery.title}</h2>
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
            <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 md:grid-cols-12 md:items-end">
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
                      buttonClassName="border-2 border-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary hover:bg-primary hover:text-on-primary"
                      noteClassName="text-muted"
                    />
                  </div>
                )}
                {c.gifts.link && (
                  <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-on-primary hover:bg-accent">
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

        <footer className="overflow-hidden bg-primary px-6 pb-12 pt-20 text-on-primary sm:px-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">{c.footer.message}</p>
            <p className={`mt-6 font-display ${longNames ? "text-[min(12.5vw,9rem)]" : "text-[clamp(3.4rem,16.5vw,12rem)]"} italic leading-[0.85] text-secondary`}>
              {names.one}
              <span className="block pl-[10%]">&amp;&nbsp;{names.two}</span>
            </p>
            <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-on-primary/25 pt-5 text-sm text-on-primary/80">
              <span>{dates.weekdayLong}</span>
              <span>{dates.dotted}</span>
            </div>
            <MusicCredit music={c.music} className="!mx-0 mt-8 text-on-primary/60" />
          </div>
        </footer>

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <StickyRsvp date={dates.compact} time={dates.time} barClassName="bg-primary/95 backdrop-blur" textClassName="text-on-primary/90" buttonClassName="bg-secondary font-bold text-primary" />
          </BeforeEvent>
        )}
        {c.music && <MusicPlayer music={c.music} fallback={inv.meta.musicPlayer} />}
      </Gate>
    </Shell>
  );
}
