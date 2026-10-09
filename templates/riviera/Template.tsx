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
import { AvoidSwatch, CalendarIcon, PinIcon } from "../shared/icons";
import Countdown from "./Countdown";
import { Sun, TileBand, Wave } from "./ornaments";
import { fontClasses } from "./fonts";

// 04 · Riviera — una boda junto al mar Mediterráneo. Porcelana, azul
// cobalto y limón; fotos dentro de arcos, círculos y postales; bandas de
// azulejo y un sol que gira muy despacio. Luminoso, fresco y cercano.

function Heading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className="text-center">
      <p className={`text-xs font-medium uppercase tracking-[0.3em] ${light ? "text-secondary" : "text-primary/80"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-4xl leading-tight sm:text-6xl ${light ? "text-on-primary" : "text-ink"}`}>{title}</h2>
      <Wave className={`mx-auto mt-5 h-3 w-24 ${light ? "text-secondary" : "text-primary/60"}`} />
    </div>
  );
}

const rsvpStyles: RsvpStyles = {
  intro: "text-on-primary/90",
  deadline: "text-secondary",
  progressDot: "bg-on-primary/25",
  progressDotActive: "bg-secondary",
  progressLabel: "text-on-primary/65",
  legend: "text-on-primary",
  required: "text-secondary",
  option: "rounded-full border-2 border-on-primary/55 text-on-primary hover:border-on-primary hover:bg-on-primary/10",
  optionSelected: "rounded-full border-2 border-secondary bg-secondary text-ink",
  optionCheck: "bg-ink text-secondary",
  label: "text-on-primary/90",
  input: "rounded-full border-2 border-transparent bg-paper px-6 text-ink placeholder:text-muted/60 focus:ring-4 focus:ring-secondary/60",
  inputError: "!border-red-300",
  error: "text-red-100",
  help: "text-on-primary/80",
  stepButton: "border-2 border-secondary text-on-primary",
  counter: "font-display text-on-primary",
  submit: "rounded-full bg-secondary font-display text-ink shadow-lg shadow-black/20 hover:brightness-105",
  submitNote: "text-on-primary/90",
  divider: "border-on-primary/20",
  declineLink: "text-on-primary/85 hover:text-on-primary",
  declineSubmit: "rounded-full border-2 border-on-primary/60 text-on-primary hover:bg-on-primary/10",
  contact: "text-on-primary/80",
  panel: "rounded-3xl border border-on-primary/25 bg-on-primary/10 text-on-primary",
};

export default function RivieraTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  const ratio = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3, photos.galeria4];

  const cover = (
    <div className="flex h-full flex-col bg-paper text-ink">
      <TileBand id="gate-top" className="h-8 flex-shrink-0 text-primary" />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="relative w-[44%] max-w-[200px]">
          <Sun className="absolute -right-8 -top-8 h-16 w-16 text-secondary" />
          <Frame photo={photos.portada} ratio={ratio("portada")} sizes="200px" priority className="rounded-t-full border-4 border-paper shadow-[0_0_0_1.5px_var(--c-primary)]" />
        </div>
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-primary">{c.welcome.eyebrow}</p>
        <h1 className="mt-3 font-display text-[2.6rem] leading-tight text-ink min-[360px]:text-5xl sm:text-6xl">
          {names.one} <span className="text-primary">&amp;</span> {names.two}
        </h1>
        <p className="mt-3 text-sm tracking-[0.2em] text-muted">{dates.display}</p>
        <GateButton className="mt-8 rounded-full bg-primary px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-on-primary shadow-lg shadow-primary/25 transition hover:brightness-110">
          {c.welcome.buttonLabel}
        </GateButton>
      </div>
      <TileBand id="gate-bottom" className="h-8 flex-shrink-0 text-primary" />
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/85 text-primary border border-primary/20">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        <TileBand id="top" className="h-6 text-primary" />

        {/* Arco principal */}
        <section className="relative overflow-hidden px-6 pb-12 pt-12 text-center short:pt-10 sm:pb-16 sm:pt-24">
          <Reveal variant="fade">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">{c.hero.eyebrow}</p>
          </Reveal>
          {/* Teléfono: el ancho del arco sale del alto de la pantalla, para que
              nombres, fecha y "Desliza hacia abajo" quepan sin desplazar. */}
          <Reveal variant="scale" delay={100} className="relative mx-auto mt-7 short:mt-5 w-[min(70%,max(8rem,calc((100svh-31rem)*0.75)))] max-w-sm sm:mt-10 sm:w-[74%]">
            <Sun className="absolute -right-8 -top-8 z-10 h-20 w-20 text-secondary sm:-right-14 sm:-top-14 sm:h-32 sm:w-32" />
            <Frame photo={photos.portada} ratio={ratio("portada")} sizes="(min-width: 640px) 384px, 74vw" priority className="rounded-t-full border-[6px] border-paper shadow-[0_0_0_2px_var(--c-primary),0_30px_60px_-30px_rgba(20,38,79,0.5)]" />
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-5 font-display text-[3rem] short:mt-4 leading-[1.02] text-ink min-[360px]:text-6xl sm:mt-10 sm:text-8xl">
              {names.one}
              <span className="block text-primary">&amp; {names.two}</span>
            </h1>
            <p className="mx-auto mt-4 w-fit rounded-full border-2 border-primary/30 px-6 py-2 text-sm font-medium tracking-[0.2em] text-primary sm:mt-6">{dates.display}</p>
          </Reveal>
          <ScrollCue className="mx-auto mt-4 text-primary sm:mt-10" circleClassName="border-primary/60" />
        </section>

        {c.openingQuote && (
          <section className="px-6 pb-20 text-center">
            <Reveal className="mx-auto max-w-2xl">
              <p className="font-display text-2xl leading-snug text-ink sm:text-4xl">&ldquo;{c.openingQuote.text}&rdquo;</p>
              {c.openingQuote.reference && <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-primary">{quoteCitation(c.openingQuote)}</p>}
            </Reveal>
          </section>
        )}

        {/* Sellos de la cuenta regresiva y postales de los lugares */}
        <section id="ceremonia" className="bg-surface px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Heading eyebrow={c.countdown.eyebrow} title={c.countdown.title} />
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <Countdown startISO={inv.startISO} endISO={inv.endISO} todayMessage={c.countdown.todayMessage} afterMessage={c.countdown.afterMessage} />
            </Reveal>
            <Reveal delay={180} className="mt-12 text-center">
              <p className="font-display text-xl text-ink sm:text-2xl">
                {dates.weekdayLong}
                <span className="block whitespace-nowrap text-primary">{dates.time}</span>
              </p>
              <div className="mt-5 flex flex-col items-center gap-2">
                <a href={inv.links.calendar} className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-base font-semibold text-on-primary shadow-md shadow-primary/20 transition hover:brightness-110 min-[360px]:px-7 max-w-full text-center [&_svg]:shrink-0">
                  <CalendarIcon />
                  Agregar a mi calendario
                </a>
                <a href={inv.links.googleCalendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-muted underline underline-offset-4 hover:text-ink">
                  o agregar en Google Calendar
                </a>
              </div>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
              {inv.locations.map((l, i) => (
                <Reveal key={l.name + i} delay={i * 100}>
                  {/* Postal: borde blanco, sello con el sol y matasellos */}
                  <article className={`relative h-full rounded-sm border-[8px] border-white bg-paper p-5 sm:border-[10px] sm:p-6 shadow-[0_20px_40px_-24px_rgba(20,38,79,0.45)] ${i % 2 ? "md:rotate-1" : "md:-rotate-1"}`}>
                    <div className="absolute right-5 top-5 flex h-16 w-14 items-center justify-center border-2 border-dashed border-primary/50 bg-surface">
                      <Sun className="h-9 w-9 text-secondary" />
                    </div>
                    {l.label && <p className="pr-16 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{l.label}</p>}
                    {l.timeLabel && <p className="mt-1 pr-16 font-display text-3xl text-ink">{l.timeLabel}</p>}
                    <p className="mt-4 pr-16 font-display text-2xl leading-tight text-ink">{l.name}</p>
                    <p className="mt-1 text-sm text-muted">{l.address}</p>
                    <Wave className="mt-5 h-3 w-20 text-primary/40" />
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                      <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-base font-semibold text-on-primary transition hover:brightness-110">
                        <PinIcon size={18} />
                        Cómo llegar
                      </a>
                      {l.wazeUrl && (
                        <a href={l.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-primary/40 px-5 py-3 text-base font-semibold text-primary transition hover:border-primary">
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

        {c.story && (
          <section id="historia" className="px-6 py-20 sm:py-28">
            <div className="mx-auto grid grid-cols-1 max-w-5xl items-center gap-12 md:grid-cols-2">
              <Reveal variant="scale" className="mx-auto w-[78%] max-w-sm md:w-full">
                <Frame photo={photos.historia} ratio={ratio("historia")} sizes="(min-width: 768px) 384px, 78vw" className="rounded-t-full" />
              </Reveal>
              <Reveal delay={120} className="text-center md:text-left">
                <Sun className="mx-auto h-12 w-12 text-secondary md:mx-0" />
                {c.story.caption && <p className="mt-6 font-display text-2xl leading-snug text-ink sm:text-3xl">{c.story.caption}</p>}
                {c.story.quote && (
                  <p className="mt-6 text-base italic text-muted">
                    &ldquo;{c.story.quote.text}&rdquo;
                    {c.story.quote.reference && <span className="mt-2 block text-xs font-medium not-italic uppercase tracking-[0.3em] text-primary">{quoteCitation(c.story.quote)}</span>}
                  </p>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {c.family && (
          <section className="px-6 pb-20 text-center sm:pb-28">
            <Reveal className="mx-auto max-w-3xl rounded-[2.5rem] bg-surface px-6 py-12">
              <p className="font-display text-2xl text-primary sm:text-3xl">{c.family.intro}</p>
              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {c.family.groups.map((g) => (
                  <div key={g.label}>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">{g.label}</p>
                    {g.names.map((n, i) => (
                      <p key={i} className="mt-2 text-lg text-ink">{n}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {c.details && (c.details.notice || c.details.dressCode) && (
          <section id="detalles" className="bg-surface px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <Heading eyebrow={c.details.eyebrow} title={c.details.title} />
              </Reveal>
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {c.details.notice && (
                  <Reveal>
                    <div className="h-full rounded-[2rem] bg-primary px-7 py-9 text-on-primary">
                      <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                        <Sun className="h-6 w-6" />
                        {c.details.notice.label}
                      </p>
                      <p className="mt-5 font-display text-2xl leading-snug sm:text-3xl">
                        <Emphasis text={c.details.notice.title} className="font-normal text-secondary" />
                      </p>
                      {c.details.notice.body && (
                        <p className="mt-4 text-base leading-relaxed text-on-primary/90">
                          <Emphasis text={c.details.notice.body} className="font-semibold text-secondary" />
                        </p>
                      )}
                      {c.details.notice.note && <p className="mt-3 text-sm text-on-primary/80">{c.details.notice.note}</p>}
                    </div>
                  </Reveal>
                )}
                {c.details.dressCode && (
                  <Reveal delay={120}>
                    <div className="h-full rounded-[2rem] border-2 border-primary/25 bg-paper px-7 py-9">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Vestimenta</p>
                      <p className="mt-5 font-display text-3xl text-ink">{c.details.dressCode.title}</p>
                      {c.details.dressCode.description && <p className="mt-3 text-base leading-relaxed text-muted">{c.details.dressCode.description}</p>}
                      {c.details.dressCode.avoidColors.length > 0 && (
                        <div className="mt-6">
                          {c.details.dressCode.avoidLabel && <p className="text-sm font-semibold uppercase tracking-wide text-primary">{c.details.dressCode.avoidLabel}</p>}
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
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <Heading eyebrow={c.gallery.eyebrow} title={c.gallery.title} />
              </Reveal>
              <Reveal delay={60}>
                <p className="mt-5 text-center text-sm text-muted">Toca una foto para verla más grande.</p>
              </Reveal>
              <LightboxProvider photos={gallery} overlayClassName="bg-ink/90" closeClassName="bg-paper text-primary hover:bg-surface">
                {/* Arco + dos círculos + postal. Proporciones fijas en todos los tamaños. */}
                <div className="mt-10 flex items-center gap-3 sm:gap-6">
                  <Reveal variant="scale" className="w-[58%]">
                    <LightboxItem index={0} label={gallery[0].alt} className="rounded-t-full">
                      <Frame photo={gallery[0]} ratio={ratio("galeria1")} sizes="(min-width: 768px) 420px, 56vw" className="rounded-t-full" />
                    </LightboxItem>
                  </Reveal>
                  <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-6">
                    <Reveal variant="scale" delay={100}>
                      <LightboxItem index={1} label={gallery[1].alt} className="rounded-full">
                        <Frame photo={gallery[1]} ratio={ratio("galeria2")} sizes="(min-width: 768px) 300px, 40vw" className="rounded-full border-4 border-surface" />
                      </LightboxItem>
                    </Reveal>
                    <Reveal variant="scale" delay={180}>
                      <LightboxItem index={2} label={gallery[2].alt} className="rounded-full">
                        <Frame photo={gallery[2]} ratio={ratio("galeria3")} sizes="(min-width: 768px) 300px, 40vw" className="rounded-full border-4 border-surface" />
                      </LightboxItem>
                    </Reveal>
                  </div>
                </div>
                <Reveal delay={240} className="mx-auto mt-8 w-[92%] sm:mt-12 sm:w-[80%]">
                  <LightboxItem index={3} label={gallery[3].alt} className="relative rotate-[1.5deg] border-[10px] border-white bg-white shadow-[0_24px_48px_-24px_rgba(20,38,79,0.5)] sm:border-[14px]">
                    <Frame photo={gallery[3]} ratio={ratio("galeria4")} sizes="(min-width: 768px) 560px, 88vw" />
                    <span className="absolute -right-3 -top-3 flex h-14 w-12 items-center justify-center border-2 border-dashed border-primary/50 bg-surface sm:h-16 sm:w-14">
                      <Sun className="h-8 w-8 text-secondary" />
                    </span>
                  </LightboxItem>
                </Reveal>
              </LightboxProvider>
            </div>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="bg-primary text-on-primary">
              <TileBand id="rsvp" className="h-8 text-on-primary/30" />
              <div className="px-6 py-20 sm:py-24">
                <div className="mx-auto max-w-xl">
                  <Reveal>
                    <Heading eyebrow={inv.rsvp.eyebrow} title={inv.rsvp.title} light />
                  </Reveal>
                  <Reveal delay={120} className="mt-10">
                    <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                  </Reveal>
                </div>
              </div>
              <TileBand id="rsvp-bottom" className="h-8 text-on-primary/30" />
            </section>
          </BeforeEvent>
        )}

        {c.gifts && (
          <section id="regalos" className="px-6 py-20 sm:py-28">
            <Reveal className="mx-auto max-w-xl text-center">
              <Heading eyebrow={c.gifts.eyebrow} title={c.gifts.title} />
              <p className="mt-8 text-base leading-relaxed text-muted sm:text-lg">{c.gifts.message}</p>
              {c.gifts.method && <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{c.gifts.method}</p>}
              {c.gifts.value && (
                <div className="mt-4">
                  <CopyValue
                    value={c.gifts.value}
                    copyLabel={c.gifts.copyLabel}
                    copiedLabel={c.gifts.copiedLabel}
                    valueClassName="font-display text-4xl tracking-wider text-ink sm:text-5xl"
                    buttonClassName="rounded-full border-2 border-primary px-7 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-on-primary"
                    noteClassName="text-muted"
                  />
                </div>
              )}
              {c.gifts.link && (
                <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-on-primary hover:brightness-110">
                  {c.gifts.link.label}
                </a>
              )}
            </Reveal>
          </section>
        )}

        {c.closingQuote && (
          <section className="px-6 pb-20 text-center">
            <Reveal className="mx-auto max-w-2xl">
              <Wave className="mx-auto h-3 w-24 text-primary/50" />
              <p className="mt-6 font-display text-2xl leading-snug text-ink sm:text-3xl">&ldquo;{c.closingQuote.text}&rdquo;</p>
              {c.closingQuote.reference && <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-primary">{quoteCitation(c.closingQuote)}</p>}
            </Reveal>
          </section>
        )}

        <footer className="bg-primary text-on-primary">
          <TileBand id="footer" className="h-8 text-on-primary/30" />
          <div className="px-6 py-20 text-center">
            <Sun className="mx-auto h-16 w-16 text-secondary" />
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.3em] text-on-primary/80">{c.footer.message}</p>
            <p className="mt-4 font-display text-5xl leading-tight sm:text-7xl">
              <span className="block sm:inline">{names.one}</span> <span className="block sm:inline">&amp; {names.two}</span>
            </p>
            <p className="mt-4 text-sm tracking-[0.25em] text-on-primary/80">{dates.display}</p>
            <MusicCredit music={c.music} className="mt-10 text-on-primary/65" />
          </div>
        </footer>

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <StickyRsvp date={dates.compact} time={dates.time} barClassName="rounded-full bg-primary/95 backdrop-blur" textClassName="text-on-primary/90" buttonClassName="rounded-full bg-secondary font-bold text-ink" />
          </BeforeEvent>
        )}
        {c.music && <MusicPlayer music={c.music} fallback={inv.meta.musicPlayer} />}
      </Gate>
    </Shell>
  );
}
