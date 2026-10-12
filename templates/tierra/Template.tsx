import { quoteCitation, type ResolvedInvitation } from "@/lib/invitation/resolve";
import type { PhotoSlotSpec, Quote } from "@/lib/invitation/types";
import Gate, { GateButton, GateMusicNote } from "../shared/Gate";
import Reveal from "../shared/Reveal";
import ScrollCue from "../shared/ScrollCue";
import Frame from "../shared/Frame";
import Emphasis from "../shared/Emphasis";
import CopyValue from "../shared/CopyValue";
import RsvpForm, { type RsvpStyles } from "../shared/RsvpForm";
import PageNav from "../shared/PageNav";
import { navSections } from "@/lib/invitation/sections";
import MusicPlayer from "../shared/MusicPlayer";
import MusicCredit from "../shared/MusicCredit";
import Shell from "../shared/Shell";
import { BeforeEvent } from "../shared/event-phase";
import { LightboxItem, LightboxProvider } from "../shared/Lightbox";
import { AvoidSwatch, CalendarIcon, PinIcon } from "../shared/icons";
import Countdown from "./Countdown";
import { fontClasses } from "./fonts";

// 02 · Tierra — una revista impresa en papel cálido. Portada con titular
// gigante, capítulos numerados, filetes finos, fotos que se descubren como
// una cortina y una galería en doble página. Texto alineado a la izquierda,
// jerarquía tipográfica fuerte, cero sombras. La fecha del encabezado va
// completa ("22 de mayo de 2027", `dates.long`), no en cifras con puntos.

function Chapter({ number, eyebrow, title, light = false }: { number?: string; eyebrow: string; title: string; light?: boolean }) {
  return (
    <div className={`border-t pt-5 ${light ? "border-on-primary/25" : "border-ink/20"}`}>
      <p className={`flex items-baseline justify-between text-xs uppercase tracking-[0.25em] ${light ? "text-on-primary/70" : "text-muted"}`}>
        <span>{eyebrow}</span>
        {number && <span className="font-display text-sm normal-case italic tracking-normal">{number}</span>}
      </p>
      <h2 className={`mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight [font-variation-settings:'opsz'_144,'SOFT'_50] sm:text-7xl ${light ? "text-on-primary" : "text-ink"}`}>{title}</h2>
    </div>
  );
}

// Cita: gran comilla de revista. Versículo: epígrafe con la referencia y la
// traducción arriba, como la entradilla de un capítulo.
function PullQuote({ quote }: { quote: Quote }) {
  const center = quote.align === "center";
  if (quote.kind === "verse") {
    return (
      <section className="px-6 py-20 sm:px-10 sm:py-28">
        <Reveal className={`mx-auto max-w-4xl ${center ? "text-center" : ""}`}>
          <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-ink/25 pt-3 text-[11px] uppercase tracking-[0.25em] sm:text-xs ${center ? "justify-center" : "justify-between"}`}>
            <span className="text-accent">{quote.reference}</span>
            {quote.translation && <span className="font-display text-sm normal-case italic tracking-normal text-muted">{quote.translation}</span>}
          </div>
          <p className="mt-8 font-display text-[2rem] font-light italic leading-[1.15] [font-variation-settings:'opsz'_144,'SOFT'_100] sm:mt-10 sm:text-5xl">
            <span className="text-secondary">&laquo;</span>
            {quote.text}
            <span className="text-secondary">&raquo;</span>
          </p>
        </Reveal>
      </section>
    );
  }
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28">
      <Reveal className={`mx-auto max-w-4xl ${center ? "text-center" : ""}`}>
        <span aria-hidden="true" className="block font-display text-[7rem] leading-[0.6] text-secondary">&ldquo;</span>
        <p className="mt-2 font-display text-3xl font-light italic leading-[1.15] [font-variation-settings:'opsz'_144,'SOFT'_100] sm:text-5xl">{quote.text}</p>
        {quote.reference && <p className="mt-6 text-xs uppercase tracking-[0.3em] text-accent">— {quoteCitation(quote)}</p>}
      </Reveal>
    </section>
  );
}

const rsvpStyles: RsvpStyles = {
  intro: "text-muted",
  deadline: "text-accent",
  progressDot: "bg-ink/20",
  progressDotActive: "bg-accent",
  progressLabel: "text-muted",
  legend: "text-ink",
  required: "text-accent",
  option: "border border-ink/35 bg-paper text-ink hover:border-ink",
  optionSelected: "border border-primary bg-primary text-on-primary",
  optionCheck: "bg-on-primary text-primary",
  label: "text-muted",
  input: "border border-ink/35 bg-paper text-ink placeholder:text-muted/60 focus:border-primary focus:ring-2 focus:ring-primary/20",
  inputError: "!border-accent",
  error: "text-accent",
  help: "text-muted",
  stepButton: "border border-ink/40 text-ink",
  counter: "font-display text-ink",
  submit: "bg-accent font-semibold uppercase tracking-[0.06em] text-on-accent sm:tracking-[0.12em] hover:bg-primary",
  submitNote: "text-muted",
  divider: "border-ink/15",
  declineLink: "text-ink/80 hover:text-ink",
  declineSubmit: "border border-ink/50 text-ink hover:bg-ink hover:text-paper",
  contact: "text-muted",
  panel: "border border-ink/20 bg-surface text-ink",
};

export default function TierraTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  const ratio = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3, photos.galeria4];
  const place = inv.locations[0];

  // Teléfonos bajos (`short:`, 320 × 568): nombres, foto y márgenes más
  // chicos para que "Abrir invitación" quede entero en la pantalla (la
  // portada no se desplaza).
  const cover = (
    <div className="flex h-full flex-col bg-paper px-6 pb-8 pt-16 text-ink short:pb-5 sm:px-12 sm:pb-12 sm:pt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink/25 pb-3 text-[11px] uppercase tracking-[0.25em] text-muted sm:text-xs">
        <span>{c.welcome.eyebrow}</span>
        <span className="whitespace-nowrap font-display text-sm normal-case italic tracking-normal">{dates.long}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-6 py-6 short:gap-3 short:py-3 sm:flex-row sm:items-center sm:gap-12">
        <h1 className="font-display text-[clamp(3.6rem,19vw,10rem)] short:text-[clamp(2.8rem,15vw,10rem)] font-light leading-[0.85] tracking-tight [font-variation-settings:'opsz'_144,'SOFT'_50] sm:flex-1">
          {names.one}
          <span className="block italic text-accent">&amp; {names.two}</span>
        </h1>
        <div className="ml-auto w-[58%] max-w-[300px] short:w-[42%] sm:w-[32%]">
          <Frame photo={photos.portada} ratio={ratio("portada")} sizes="(min-width: 640px) 300px, 58vw" priority />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 border-t border-ink/25 pt-5 short:gap-2 short:pt-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">{dates.weekdayLong}</p>
        <GateButton className="bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-on-primary transition hover:bg-accent">
          {c.welcome.buttonLabel}
        </GateButton>
        {c.music && <GateMusicNote className="-mt-1 sm:mt-0" />}
      </div>
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/85 text-ink border border-ink/15">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        {/* Portada de revista */}
        <section className="px-6 pb-16 pt-[4.5rem] sm:px-10 sm:pt-24 lg:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink/25 pb-3 text-[11px] uppercase tracking-[0.25em] text-muted sm:text-xs">
              <span>{c.hero.eyebrow}</span>
              <span className="whitespace-nowrap font-display text-sm normal-case italic tracking-normal">{dates.long}</span>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end lg:gap-12">
              <Reveal className="lg:col-span-7">
                <h1 className="font-display text-[clamp(4rem,21vw,11rem)] font-light short:text-[3.6rem] leading-[0.82] tracking-tight [font-variation-settings:'opsz'_144,'SOFT'_50]">
                  {names.one}
                  <span className="block italic text-accent">&amp; {names.two}</span>
                </h1>
                <dl className="mt-5 grid grid-cols-2 gap-6 border-t border-ink/20 pt-4 text-sm sm:mt-10 sm:max-w-lg sm:pt-5">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.25em] text-muted">Fecha</dt>
                    <dd className="mt-1.5 font-display text-lg leading-snug">{dates.weekdayLong}</dd>
                  </div>
                  {place && (
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.25em] text-muted">Lugar</dt>
                      <dd className="mt-1.5 font-display text-lg leading-snug">{place.name}</dd>
                    </div>
                  )}
                </dl>
              </Reveal>
              {/* Teléfono: el ancho de la foto sale del alto de la pantalla, para
                  que el indicador para seguir se vea sin desplazar. */}
              <Reveal variant="curtain" className="relative ml-auto w-[min(100%,max(13rem,calc((100svh-25rem)*0.8)))] sm:w-full lg:col-span-5">
                <Frame photo={photos.portada} ratio={ratio("portada")} sizes="(min-width: 1024px) 460px, 100vw" priority />
                {/* Teléfono bajo: la foto sigue debajo del borde (invita a bajar) y la
                    flecha sube a la mitad de la foto, dentro de la pantalla. */}
                <ScrollCue stacked className="absolute inset-x-0 bottom-3 mx-auto w-fit text-paper drop-shadow short:bottom-auto short:top-[42%] lg:hidden" circleClassName="border-paper/80 bg-ink/20" />
              </Reveal>
            </div>
          </div>
        </section>

        {c.openingQuote && <PullQuote quote={c.openingQuote} />}

        {c.story && (
          <section id="historia" className="px-6 pb-20 sm:px-10 sm:pb-28">
            <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12">
              <Reveal variant="curtain" className="lg:col-span-5">
                <Frame photo={photos.historia} ratio={ratio("historia")} sizes="(min-width: 1024px) 460px, 100vw" />
              </Reveal>
              <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
                <Reveal>
                  <Chapter number="I" eyebrow="Capítulo I" title="Nuestra historia" />
                </Reveal>
                {c.story.caption && (
                  <Reveal delay={100}>
                    <p className="mt-8 text-lg leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-accent sm:text-xl">
                      {c.story.caption}
                    </p>
                  </Reveal>
                )}
                {c.story.quote && (
                  <Reveal delay={180}>
                    <p className="mt-8 border-l-2 border-secondary pl-5 font-display text-2xl italic leading-snug text-primary">
                      {c.story.quote.text}
                      {c.story.quote.reference && <span className="mt-2 block font-body text-xs not-italic uppercase tracking-[0.25em] text-muted">{quoteCitation(c.story.quote)}</span>}
                    </p>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {c.family && (
          <section className="bg-surface px-6 py-16 sm:px-10 sm:py-20">
            <Reveal className="mx-auto max-w-6xl">
              <p className="text-center font-display text-2xl italic sm:text-3xl">{c.family.intro}</p>
              <div className="mt-10 grid grid-cols-1 gap-8 border-t border-ink/20 pt-8 text-center sm:grid-cols-3">
                {c.family.groups.map((g) => (
                  <div key={g.label}>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-muted">{g.label}</p>
                    {g.names.map((n, i) => (
                      <p key={i} className="mt-2 font-display text-lg">{n}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* El día: fecha monumental, cuenta regresiva y lugares */}
        <section id="fecha" className="bg-primary px-6 py-20 text-on-primary sm:px-10 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Chapter eyebrow={c.countdown.eyebrow} title={c.countdown.title} light />
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
              <Reveal className="min-w-0 lg:col-span-5">
                <p className="text-xs uppercase tracking-[0.3em] text-on-primary/70">{dates.weekday}</p>
                <p className="mt-2 flex items-end gap-4">
                  <span className="font-display text-[5.5rem] font-light leading-[0.8] [font-variation-settings:'opsz'_144] min-[360px]:text-[8rem] sm:text-[11rem]">{dates.day}</span>
                  <span className="pb-2 font-display text-xl italic leading-tight min-[360px]:pb-3 min-[360px]:text-2xl sm:text-3xl">
                    {dates.monthLong}
                    <br />
                    {dates.year}
                  </span>
                </p>
                <p className="mt-6 text-sm text-on-primary/80">{dates.time}</p>
                <div className="mt-6 flex flex-col items-start gap-2">
                  <a href={inv.links.calendar} className="inline-flex min-h-12 items-center gap-2.5 border border-on-primary/50 px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.04em] min-[360px]:px-5 min-[360px]:text-sm min-[360px]:tracking-[0.12em] transition hover:bg-on-primary hover:text-primary max-w-full text-center [&_svg]:shrink-0">
                    <CalendarIcon size={18} />
                    Agregar a mi calendario
                  </a>
                  <a href={inv.links.googleCalendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-on-primary/75 underline underline-offset-4 hover:text-on-primary">
                    o agregar en Google Calendar
                  </a>
                </div>
              </Reveal>
              <Reveal delay={120} className="min-w-0 lg:col-span-7">
                <Countdown startISO={inv.startISO} endISO={inv.endISO} todayMessage={c.countdown.todayMessage} afterMessage={c.countdown.afterMessage} />
              </Reveal>
            </div>

            <div id="lugares" className="mt-16">
              {inv.locations.map((l, i) => (
                <Reveal key={l.name + i} delay={i * 80}>
                  <div className="grid grid-cols-1 gap-4 border-t border-on-primary/20 py-8 sm:grid-cols-12 sm:gap-6">
                    <div className="sm:col-span-3">
                      {l.label && <p className="text-xs uppercase tracking-[0.25em] text-secondary">{l.label}</p>}
                      {l.timeLabel && <p className="mt-1 font-display text-2xl italic">{l.timeLabel}</p>}
                    </div>
                    <div className="sm:col-span-5">
                      <p className="font-display text-3xl font-light leading-tight">{l.name}</p>
                      <p className="mt-1 text-sm text-on-primary/75">{l.address}</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-4 sm:items-end">
                      <div className={`grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-end ${l.wazeUrl ? "min-[360px]:grid-cols-[1fr_auto]" : ""}`}>
                        <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 bg-on-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary transition hover:bg-secondary">
                          <PinIcon size={18} />
                          Abrir en Google Maps
                        </a>
                        {l.wazeUrl && (
                          <a href={l.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center border border-on-primary/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition hover:bg-on-primary/10">
                            Waze
                          </a>
                        )}
                      </div>
                      {l.wazeUrl && <p className="text-xs text-on-primary/70">Las dos aplicaciones te llevan al mismo lugar.</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {c.gallery && (
          <section id="galeria" className="px-6 py-20 sm:px-10 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <Chapter number="II" eyebrow={c.gallery.eyebrow} title={c.gallery.title} />
              </Reveal>
              <LightboxProvider photos={gallery} overlayClassName="bg-ink/92" closeClassName="bg-paper text-ink hover:bg-surface">
                {/* Doble página: marcos de proporción fija en todos los tamaños. */}
                <div className="mt-12 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
                  <Reveal variant="curtain" className="lg:col-span-5">
                    <LightboxItem index={0} label={gallery[0].alt}>
                      <Frame photo={gallery[0]} ratio={ratio("galeria1")} sizes="(min-width: 1024px) 460px, 100vw" />
                    </LightboxItem>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">Toca una foto para verla más grande</p>
                  </Reveal>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:col-span-7">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <Reveal variant="curtain" delay={100}>
                        <LightboxItem index={1} label={gallery[1].alt}>
                          <Frame photo={gallery[1]} ratio={ratio("galeria2")} sizes="(min-width: 1024px) 320px, 50vw" />
                        </LightboxItem>
                      </Reveal>
                      <Reveal variant="curtain" delay={180}>
                        <LightboxItem index={2} label={gallery[2].alt}>
                          <Frame photo={gallery[2]} ratio={ratio("galeria3")} sizes="(min-width: 1024px) 320px, 50vw" />
                        </LightboxItem>
                      </Reveal>
                    </div>
                    <Reveal variant="curtain" delay={240}>
                      <LightboxItem index={3} label={gallery[3].alt}>
                        <Frame photo={gallery[3]} ratio={ratio("galeria4")} sizes="(min-width: 1024px) 660px, 100vw" />
                      </LightboxItem>
                    </Reveal>
                  </div>
                </div>
              </LightboxProvider>
            </div>
          </section>
        )}

        {c.details && (c.details.notice || c.details.dressCode) && (
          <section id="detalles" className="bg-surface px-6 py-20 sm:px-10 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <Chapter number="III" eyebrow={c.details.eyebrow} title={c.details.title} />
              </Reveal>
              <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
                {c.details.notice && (
                  <Reveal>
                    <div className="border-t-4 border-accent pt-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{c.details.notice.label}</p>
                      <p className="mt-4 font-display text-3xl font-light leading-tight sm:text-4xl">
                        <Emphasis text={c.details.notice.title} className="font-normal italic text-accent" />
                      </p>
                      {c.details.notice.body && (
                        <p className="mt-4 text-base leading-relaxed text-ink/85 sm:text-lg">
                          <Emphasis text={c.details.notice.body} className="font-semibold text-ink" />
                        </p>
                      )}
                      {c.details.notice.note && <p className="mt-3 text-sm text-muted">{c.details.notice.note}</p>}
                    </div>
                  </Reveal>
                )}
                {c.details.dressCode && (
                  <Reveal delay={120}>
                    <div className="border-t-4 border-ink pt-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Vestimenta</p>
                      <p className="mt-4 font-display text-3xl font-light leading-tight sm:text-4xl">{c.details.dressCode.title}</p>
                      {c.details.dressCode.description && <p className="mt-4 text-base leading-relaxed text-ink/85 sm:text-lg">{c.details.dressCode.description}</p>}
                      {c.details.dressCode.avoidColors.length > 0 && (
                        <div className="mt-6">
                          {c.details.dressCode.avoidLabel && <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent">{c.details.dressCode.avoidLabel}</p>}
                          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                            {c.details.dressCode.avoidColors.map((color) => (
                              <span key={color.name} className="flex items-center gap-2.5 text-lg font-semibold">
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

        {c.gifts && (
          <section id="regalos" className="px-6 py-20 sm:px-10 sm:py-28">
            <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 lg:grid-cols-12 lg:items-end">
              <Reveal className="lg:col-span-6">
                <p className="text-xs uppercase tracking-[0.25em] text-muted">{c.gifts.eyebrow}</p>
                <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">{c.gifts.title}</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg">{c.gifts.message}</p>
              </Reveal>
              <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
                <div className="border border-ink/20 bg-surface p-6 sm:p-8">
                  {c.gifts.method && <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{c.gifts.method}</p>}
                  {c.gifts.value && (
                    <div className="mt-3">
                      <CopyValue
                        value={c.gifts.value}
                        copyLabel={c.gifts.copyLabel}
                        copiedLabel={c.gifts.copiedLabel}
                        align="start"
                        valueClassName="break-all font-display text-2xl leading-tight min-[360px]:text-3xl"
                        buttonClassName="border border-ink/50 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] hover:bg-ink hover:text-paper"
                        noteClassName="text-muted"
                      />
                    </div>
                  )}
                  {c.gifts.link && (
                    <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-12 items-center bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-on-primary hover:bg-accent">
                      {c.gifts.link.label}
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="border-t border-ink/15 px-6 py-20 sm:px-10 sm:py-28">
              <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <Reveal>
                    <p className="text-xs uppercase tracking-[0.25em] text-muted">{inv.rsvp.eyebrow}</p>
                    <h2 className="mt-4 font-display text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl">{inv.rsvp.title}</h2>
                  </Reveal>
                  <Reveal variant="curtain" delay={120} className="mt-10 hidden lg:block">
                    <Frame photo={photos.retrato} ratio={ratio("retrato")} sizes="420px" />
                  </Reveal>
                </div>
                <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
                  <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                </Reveal>
              </div>
            </section>
          </BeforeEvent>
        )}

        {c.closingQuote && <PullQuote quote={c.closingQuote} />}

        <Reveal variant="curtain" className="px-6 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <Frame photo={photos.cierre} ratio={ratio("cierre")} sizes="(min-width: 1152px) 1152px, 100vw" />
          </div>
        </Reveal>

        <footer className="mt-16 bg-primary px-6 py-20 text-on-primary sm:px-10 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs uppercase tracking-[0.3em] text-on-primary/70">{c.footer.message}</p>
            <p className="mt-6 font-display text-[clamp(3rem,14vw,8rem)] font-light leading-[0.9] tracking-tight">
              <span className="block sm:inline">{names.one}</span>{" "}
              <span className="block sm:inline">
                <span className="italic text-secondary">&amp;</span> {names.two}
              </span>
            </p>
            <p className="mt-8 border-t border-on-primary/25 pt-4 font-display text-lg italic">{dates.long}</p>
            <MusicCredit music={c.music} className="!mx-0 mt-10 text-on-primary/60" />
          </div>
        </footer>

        <PageNav sections={navSections(inv)} styles={{ bar: "bg-primary/95 backdrop-blur", item: "text-on-primary/90 hover:bg-current/10", primary: "bg-accent text-on-accent", panelFont: "font-display" }} />
        {c.music && <MusicPlayer music={c.music} fallback={inv.meta.musicPlayer} />}
      </Gate>
    </Shell>
  );
}
