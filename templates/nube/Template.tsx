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
import { Balloon, Bunting, Cloud, CloudEdge, Confetti, FallingConfetti, Flame, Star } from "./ornaments";
import { fontClasses } from "./fonts";

// 07 · Nube — primer cumpleaños (y cualquier cumpleaños infantil). Cielo
// celeste con nubes que flotan, banderines de colores, globos, estrellas que
// titilan, confeti que cae despacio y la edad en una insignia amarilla con
// su velita. Festivo pero ordenado: texto siempre oscuro (los colores van
// en las formas), movimientos lentos y cortos, todo quieto con "reducir
// movimiento", y cada adorno dentro de una sección con overflow-hidden.

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="mx-auto flex w-fit items-center gap-2 rounded-full bg-secondary/60 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-ink">
        <Star className="h-3.5 w-3.5 text-accent" />
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">{title}</h2>
    </div>
  );
}

// Insignia con la edad y su velita: "1 añito" → "1" grande y "añito" debajo.
function AgeBadge({ age, label, className = "" }: { age: number; label: string; className?: string }) {
  const match = label.match(/^(\d+)\s*(.*)$/);
  return (
    <div className={`flex flex-col items-center justify-center rounded-full bg-secondary text-ink shadow-lg shadow-secondary/40 ring-4 ring-paper ${className}`}>
      <span aria-hidden="true" className="absolute -top-[1.35em] left-1/2 flex -translate-x-1/2 flex-col items-center">
        <Flame className="flicker h-[0.95em] w-[0.65em]" />
        <span className="h-[0.6em] w-[0.3em] rounded-sm bg-accent" />
      </span>
      <span className="font-display text-[2.6em] font-semibold leading-none">{match ? match[1] : age}</span>
      <span className="text-[0.7em] font-extrabold uppercase tracking-[0.12em]">{match ? match[2] : label}</span>
    </div>
  );
}

const rsvpStyles: RsvpStyles = {
  intro: "text-muted",
  deadline: "font-bold text-ink",
  progressDot: "bg-ink/15",
  progressDotActive: "bg-accent",
  progressLabel: "text-muted",
  legend: "text-ink",
  required: "text-accent",
  option: "rounded-2xl border-2 border-ink/15 bg-paper text-ink hover:border-ink/40",
  optionSelected: "rounded-2xl border-2 border-primary bg-primary text-on-primary",
  optionCheck: "bg-on-primary text-primary",
  label: "text-muted",
  input: "rounded-2xl border-2 border-ink/15 bg-paper text-ink placeholder:text-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/30",
  inputError: "!border-accent",
  error: "font-bold text-ink",
  help: "text-muted",
  stepButton: "border-2 border-ink/25 text-ink",
  counter: "font-display font-semibold text-ink",
  submit: "rounded-full bg-accent font-display font-semibold text-on-accent shadow-lg shadow-accent/30 hover:brightness-105",
  submitNote: "text-muted",
  divider: "border-line",
  declineLink: "text-ink/80 hover:text-ink",
  declineSubmit: "rounded-full border-2 border-ink/25 text-ink hover:border-ink",
  contact: "text-muted",
  panel: "rounded-2xl bg-surface text-ink",
};

export default function NubeTemplate({ inv }: { inv: ResolvedInvitation }) {
  const { content: c, photos, names, dates, meta } = inv;
  const ratio = (key: string) => (meta.photoSlots as Record<string, PhotoSlotSpec>)[key].ratio;
  const gallery = [photos.galeria1, photos.galeria2, photos.galeria3, photos.galeria4];
  const age = inv.honoree?.age ?? 1;
  const ageText = inv.honoree?.ageText ?? "";

  const cover = (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-paper px-6 text-center text-ink">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[42%] bg-primary/40">
        <CloudEdge id="gate" className="absolute inset-x-0 -bottom-px text-paper" />
      </div>
      <Bunting id="gate" className="absolute inset-x-0 top-0" />
      <FallingConfetti />
      <Star className="twinkle absolute left-[16%] top-[30%] w-4 text-secondary" />
      <Star className="twinkle absolute right-[18%] top-[12%] w-3 text-paper" style={{ animationDelay: "1.1s" }} />
      <Cloud className="float-soft absolute left-[6%] top-[10%] w-20 text-paper sm:w-28" />
      <Cloud className="float-soft absolute right-[8%] top-[22%] w-14 text-paper sm:w-20" style={{ animationDelay: "2s" }} />
      <Balloon className="float-soft absolute bottom-[8%] left-[6%] w-8 text-accent sm:w-10" style={{ animationDelay: "1s" }} />
      <Balloon className="float-soft absolute bottom-[14%] right-[7%] w-7 text-primary sm:w-9" style={{ animationDelay: "3s" }} />
      <Balloon className="float-soft absolute bottom-[10%] right-[17%] w-6 text-secondary sm:w-8" style={{ animationDelay: "2s" }} />
      <div className="relative flex flex-col items-center">
        <div className="relative w-[min(48vw,13rem)]">
          <Frame photo={photos.portada} ratio={ratio("portada")} sizes="208px" priority className="rounded-full border-[6px] border-paper shadow-xl shadow-primary/30" />
          <AgeBadge age={age} label={ageText} className="absolute -bottom-2 -right-3 h-20 w-20 text-[14px]" />
        </div>
        <p className="mt-7 text-sm font-extrabold uppercase tracking-[0.22em] text-ink/80">{c.welcome.eyebrow}</p>
        <h1 className="mt-2 font-display text-[clamp(3rem,15vw,5.5rem)] font-semibold leading-none text-ink">{names.one}</h1>
        <p className="mt-4 rounded-full bg-surface px-5 py-2 font-display text-lg text-ink">{dates.weekdayLong}</p>
        <GateButton className="mt-8 rounded-full bg-accent px-9 py-4 font-display text-lg font-semibold text-on-accent shadow-lg shadow-accent/30 transition hover:brightness-105">
          {c.welcome.buttonLabel}
        </GateButton>
      </div>
    </div>
  );

  return (
    <Shell inv={inv} fontClasses={fontClasses} backClassName="bg-paper/85 text-ink border border-ink/10">
      <Gate cover={cover} transitionName={`cover-${inv.template}`}>
        {/* Cielo con la foto en un círculo y la edad. En teléfono el tamaño
            de la foto sale del alto de la pantalla para que todo quepa. */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-primary/35 px-6 pb-14 pt-20 text-center sm:pb-20 sm:pt-20">
          <Bunting id="hero" className="absolute inset-x-0 top-0" />
          <FallingConfetti />
          <Star className="twinkle absolute left-[12%] top-[22%] w-4 text-secondary sm:w-6" />
          <Star className="twinkle absolute right-[14%] top-[16%] w-3 text-paper sm:w-5" style={{ animationDelay: "1.4s" }} />
          <Star className="twinkle absolute bottom-[30%] right-[22%] hidden w-4 text-accent sm:block" style={{ animationDelay: "0.7s" }} />
          <Cloud className="float-soft absolute left-[4%] top-[9%] w-24 text-paper sm:w-36" />
          <Cloud className="float-soft absolute right-[5%] top-[28%] w-16 text-paper sm:w-24" style={{ animationDelay: "2.5s" }} />
          <Cloud className="float-soft absolute bottom-[22%] left-[8%] hidden w-20 text-paper sm:block" style={{ animationDelay: "4s" }} />
          <Balloon className="float-soft absolute right-[6%] top-[52%] w-8 text-accent sm:right-[14%] sm:w-12" style={{ animationDelay: "1s" }} />
          <Balloon className="float-soft absolute left-[5%] top-[48%] hidden w-10 text-secondary sm:block" style={{ animationDelay: "3s" }} />
          <Balloon className="float-soft absolute left-[11%] top-[55%] hidden w-8 text-primary sm:block" style={{ animationDelay: "1.6s" }} />
          <Balloon className="float-soft absolute right-[19%] top-[58%] hidden w-9 text-secondary sm:block" style={{ animationDelay: "2.2s" }} />
          <Confetti />
          <Reveal variant="fade" className="relative">
            <p className="rounded-full bg-paper/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-ink">{c.hero.eyebrow}</p>
          </Reveal>
          <Reveal variant="scale" delay={100} className="relative mt-6 w-[min(64%,max(10rem,calc(100svh-28rem)))] max-w-[20rem]">
            <Frame photo={photos.portada} ratio={ratio("portada")} sizes="(min-width: 640px) 320px, 64vw" priority className="rounded-full border-[6px] border-paper shadow-2xl shadow-primary/40 sm:border-8" />
            <AgeBadge age={age} label={ageText} className="absolute -bottom-1 -right-2 h-[4.75rem] w-[4.75rem] text-[13px] sm:h-28 sm:w-28 sm:text-[19px]" />
          </Reveal>
          <Reveal delay={200} className="relative">
            <h1 className="mt-5 font-display text-[clamp(3.25rem,17vw,6.5rem)] font-semibold leading-none text-ink">{names.one}</h1>
            <p className="mt-2 font-display text-xl text-ink/80 sm:text-2xl">¡Cumple {ageText}!</p>
            <p className="mx-auto mt-4 w-fit whitespace-nowrap rounded-full bg-paper px-5 py-2 font-display text-base text-ink shadow-sm sm:text-lg">{dates.weekdayLong}</p>
          </Reveal>
          <ScrollCue className="relative mx-auto mt-5 text-ink sm:mt-8" circleClassName="border-ink/40 bg-paper/50" />
          <CloudEdge id="hero" className="absolute inset-x-0 -bottom-px text-paper" />
        </section>

        {c.openingQuote && (
          <section className="px-6 py-16 text-center sm:py-24">
            <Reveal className="mx-auto max-w-2xl">
              <Balloon className="mx-auto w-7 text-accent" />
              <p className="mt-6 font-display text-3xl font-medium leading-snug text-ink sm:text-4xl">{c.openingQuote.text}</p>
              {c.openingQuote.reference && <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-muted">{quoteCitation(c.openingQuote)}</p>}
            </Reveal>
          </section>
        )}

        {c.story && (
          <section id="historia" className="px-5 pb-16 sm:px-6 sm:pb-24">
            <Reveal className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 rounded-[2.5rem] bg-surface p-5 sm:p-8 md:grid-cols-2 md:gap-12 md:p-12">
              <Frame photo={photos.historia} ratio={ratio("historia")} sizes="(min-width: 768px) 440px, 90vw" className="rounded-[2rem]" />
              <div className="px-2 pb-3 text-center md:px-0 md:pb-0 md:text-left">
                <p className="mx-auto w-fit rounded-full bg-primary/35 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-ink md:mx-0">Sobre mí</p>
                {c.story.caption && <p className="mt-5 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">{c.story.caption}</p>}
                {c.story.quote && (
                  <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                    {c.story.quote.text}
                    {c.story.quote.reference && <span className="mt-1 block font-display text-lg font-semibold text-ink">— {quoteCitation(c.story.quote)}</span>}
                  </p>
                )}
              </div>
            </Reveal>
          </section>
        )}

        {c.family && (
          <section className="px-6 pb-16 text-center sm:pb-24">
            <Reveal className="mx-auto max-w-3xl">
              <p className="font-display text-2xl font-medium text-ink sm:text-3xl">{c.family.intro}</p>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {c.family.groups.map((g, i) => (
                  <div key={g.label} className={`rounded-[2rem] px-6 py-6 ${i % 2 ? "bg-secondary/35" : "bg-primary/25"}`}>
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/75">{g.label}</p>
                    {g.names.map((n, j) => (
                      <p key={j} className="mt-1.5 text-lg text-ink">{n}</p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* Cuenta regresiva en bloques de juguete */}
        <section id="ceremonia" className="relative overflow-hidden px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <Heading eyebrow={c.countdown.eyebrow} title={c.countdown.title} />
            </Reveal>
            <Reveal delay={100} className="mt-10">
              <Countdown startISO={inv.startISO} endISO={inv.endISO} todayMessage={c.countdown.todayMessage} afterMessage={c.countdown.afterMessage} />
            </Reveal>
            <Reveal delay={180} className="mt-10 flex flex-col items-center gap-2">
              <p className="font-display text-xl font-medium text-ink sm:text-2xl">
                {dates.weekdayLong}
                <span className="block whitespace-nowrap text-muted">{dates.time}</span>
              </p>
              <a href={inv.links.calendar} className="mt-3 inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-ink px-5 py-3 font-display text-lg font-medium text-paper transition hover:bg-ink/85 min-[360px]:px-7 max-w-full text-center [&_svg]:shrink-0">
                <CalendarIcon />
                Agregar a mi calendario
              </a>
              <a href={inv.links.googleCalendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-muted underline underline-offset-4 hover:text-ink">
                o agregar en Google Calendar
              </a>
            </Reveal>
          </div>
        </section>

        {/* Programa en tarjetas con la hora en una píldora amarilla */}
        {inv.schedule && (
          <section id="programa" className="relative">
            <CloudEdge id="schedule-top" className="text-surface" />
            <div className="bg-surface px-6 py-16 sm:py-24">
              <div className="mx-auto max-w-2xl">
                <Reveal>
                  <Heading eyebrow={inv.schedule.eyebrow} title={inv.schedule.title} />
                </Reveal>
                <ol className="mt-10 grid grid-cols-1 gap-3 sm:gap-4">
                  {inv.schedule.items.map((item, i) => (
                    <li key={item.time + item.title}>
                      <Reveal delay={i * 70} className="flex items-center gap-4 rounded-[1.75rem] bg-paper p-3 pr-5 sm:gap-5 sm:p-4 sm:pr-6">
                        <span className="flex min-h-14 min-w-[6.25rem] flex-shrink-0 items-center justify-center rounded-2xl bg-secondary/60 px-3 font-display text-lg font-semibold whitespace-nowrap text-ink sm:min-w-[7.5rem] sm:text-xl">
                          {item.timeLabel}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-lg font-medium leading-snug text-ink sm:text-xl">{item.title}</span>
                          {item.description && <span className="mt-0.5 block text-sm text-muted">{item.description}</span>}
                        </span>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <CloudEdge id="schedule-bottom" className="rotate-180 text-surface" />
          </section>
        )}

        {/* Lugar(es) */}
        <section id="lugares" className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Heading eyebrow="¿Dónde?" title="Te espero aquí" />
            </Reveal>
            <div className={`mx-auto mt-10 grid grid-cols-1 gap-5 ${inv.locations.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
              {inv.locations.map((l, i) => (
                <Reveal key={l.name + i} delay={i * 100}>
                  <article className="relative h-full overflow-hidden rounded-[2.25rem] bg-primary/25 px-5 pb-7 pt-8 text-center sm:px-8">
                    <Cloud className="absolute -right-3 -top-1 w-24 text-paper/80" />
                    <div className="relative">
                      {l.label && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/75">{l.label}</p>}
                      {l.timeLabel && <p className="mt-1 font-display text-2xl font-medium text-ink">{l.timeLabel}</p>}
                      <p className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">{l.name}</p>
                      <p className="mt-1 text-base text-ink/75">{l.address}</p>
                      <div className={`mx-auto mt-6 grid max-w-sm grid-cols-1 gap-3 ${l.wazeUrl ? "sm:grid-cols-2" : ""}`}>
                        <a href={l.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-ink px-4 py-3 font-display text-lg font-medium text-paper transition hover:bg-ink/85">
                          <PinIcon size={18} />
                          Cómo llegar
                        </a>
                        {l.wazeUrl && (
                          <a href={l.wazeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-paper px-4 py-3 font-display text-lg font-medium text-ink transition hover:bg-surface">
                            Abrir en Waze
                          </a>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-ink/70">{l.wazeUrl ? "Se abre en Google Maps o Waze" : "Se abre en Google Maps"}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {c.details && (c.details.notice || c.details.dressCode) && (
          <section id="detalles" className="px-6 pb-16 sm:pb-24">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <Heading eyebrow={c.details.eyebrow} title={c.details.title} />
              </Reveal>
              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                {c.details.notice && (
                  <Reveal>
                    <div className="h-full rounded-[2.25rem] bg-secondary/40 px-6 py-8 text-center sm:px-8">
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/75">{c.details.notice.label}</p>
                      <p className="mt-4 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                        <Emphasis text={c.details.notice.title} className="font-semibold underline decoration-accent decoration-4 underline-offset-4" />
                      </p>
                      {c.details.notice.body && (
                        <p className="mt-4 text-base leading-relaxed text-ink/80">
                          <Emphasis text={c.details.notice.body} className="font-bold text-ink" />
                        </p>
                      )}
                      {c.details.notice.note && <p className="mt-3 text-sm text-ink/70">{c.details.notice.note}</p>}
                    </div>
                  </Reveal>
                )}
                {c.details.dressCode && (
                  <Reveal delay={120}>
                    <div className="h-full rounded-[2.25rem] bg-surface px-6 py-8 text-center sm:px-8">
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink/75">Vestimenta</p>
                      <p className="mt-4 font-display text-3xl font-semibold text-ink">{c.details.dressCode.title}</p>
                      {c.details.dressCode.description && <p className="mt-3 text-base leading-relaxed text-ink/80">{c.details.dressCode.description}</p>}
                      {c.details.dressCode.avoidColors.length > 0 && (
                        <div className="mt-5">
                          {c.details.dressCode.avoidLabel && <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-ink">{c.details.dressCode.avoidLabel}</p>}
                          <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-3">
                            {c.details.dressCode.avoidColors.map((color) => (
                              <span key={color.name} className="flex items-center gap-2.5 text-lg font-bold text-ink">
                                <AvoidSwatch hex={color.hex} size={26} />
                                {color.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {c.details.dressCode.notice && <p className="mt-5 text-sm font-bold text-ink">{c.details.dressCode.notice}</p>}
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {c.gallery && (
          <section id="galeria" className="px-6 pb-16 sm:pb-24">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <Heading eyebrow={c.gallery.eyebrow} title={c.gallery.title} />
              </Reveal>
              <Reveal delay={60}>
                <p className="mt-4 text-center text-sm text-muted">Toca una foto para verla más grande.</p>
              </Reveal>
              <LightboxProvider photos={gallery} overlayClassName="bg-ink/90" closeClassName="bg-paper text-ink hover:bg-surface">
                {/* Burbujas: dos columnas que se cruzan (rectángulo redondeado
                    + círculo / círculo + rectángulo). Igual en todos los tamaños. */}
                <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
                  <div className="flex flex-col gap-3 sm:gap-6">
                    <Reveal variant="scale">
                      <LightboxItem index={0} label={gallery[0].alt} className="rounded-[1.75rem] sm:rounded-[2.5rem]">
                        <Frame photo={gallery[0]} ratio={ratio("galeria1")} sizes="(min-width: 768px) 360px, 46vw" className="rounded-[1.75rem] sm:rounded-[2.5rem]" />
                      </LightboxItem>
                    </Reveal>
                    <Reveal variant="scale" delay={160} className="px-2 sm:px-6">
                      <LightboxItem index={2} label={gallery[2].alt} className="rounded-full">
                        <Frame photo={gallery[2]} ratio={ratio("galeria3")} sizes="(min-width: 768px) 300px, 40vw" className="rounded-full ring-4 ring-secondary/60 sm:ring-8" />
                      </LightboxItem>
                    </Reveal>
                  </div>
                  <div className="flex flex-col gap-3 pt-8 sm:gap-6 sm:pt-14">
                    <Reveal variant="scale" delay={80} className="px-2 sm:px-6">
                      <LightboxItem index={1} label={gallery[1].alt} className="rounded-full">
                        <Frame photo={gallery[1]} ratio={ratio("galeria2")} sizes="(min-width: 768px) 300px, 40vw" className="rounded-full ring-4 ring-primary/50 sm:ring-8" />
                      </LightboxItem>
                    </Reveal>
                    <Reveal variant="scale" delay={240}>
                      <LightboxItem index={3} label={gallery[3].alt} className="rounded-[1.75rem] sm:rounded-[2.5rem]">
                        <Frame photo={gallery[3]} ratio={ratio("galeria4")} sizes="(min-width: 768px) 360px, 46vw" className="rounded-[1.75rem] sm:rounded-[2.5rem]" />
                      </LightboxItem>
                    </Reveal>
                  </div>
                </div>
              </LightboxProvider>
            </div>
          </section>
        )}

        {c.gifts && (
          <section id="regalos" className="px-6 pb-16 sm:pb-24">
            <Reveal className="mx-auto max-w-xl rounded-[2.5rem] bg-surface px-6 py-10 text-center sm:px-10">
              <Heading eyebrow={c.gifts.eyebrow} title={c.gifts.title} />
              <p className="mt-6 text-base leading-relaxed text-ink/80 sm:text-lg">{c.gifts.message}</p>
              {c.gifts.method && <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-ink/75">{c.gifts.method}</p>}
              {c.gifts.value && (
                <div className="mt-3">
                  <CopyValue
                    value={c.gifts.value}
                    copyLabel={c.gifts.copyLabel}
                    copiedLabel={c.gifts.copiedLabel}
                    valueClassName="font-display text-4xl font-semibold tracking-wide text-ink sm:text-5xl"
                    buttonClassName="rounded-full bg-paper px-7 py-3 font-display text-lg font-medium text-ink hover:bg-primary/25"
                    noteClassName="text-muted"
                  />
                </div>
              )}
              {c.gifts.link && (
                <a href={c.gifts.link.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-[52px] items-center rounded-full bg-ink px-7 py-3 font-display text-lg font-medium text-paper hover:bg-ink/85">
                  {c.gifts.link.label}
                </a>
              )}
            </Reveal>
          </section>
        )}

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <section id="confirmar" className="relative">
              <CloudEdge id="rsvp" className="text-primary/30" />
              <div className="relative overflow-hidden bg-primary/30 px-5 py-16 sm:px-6 sm:py-24">
                <Cloud className="float-soft absolute -left-4 top-10 w-28 text-paper/90" />
                <Cloud className="float-soft absolute -right-6 bottom-16 w-32 text-paper/90" style={{ animationDelay: "3s" }} />
                <div className="relative mx-auto max-w-xl">
                  <Reveal>
                    <Heading eyebrow={inv.rsvp.eyebrow} title={inv.rsvp.title} />
                  </Reveal>
                  <Reveal delay={120} className="mt-10">
                    <div className="rounded-[2.25rem] bg-paper px-4 py-8 shadow-xl shadow-primary/20 min-[360px]:px-5 sm:px-8 sm:py-10">
                      <RsvpForm rsvp={inv.rsvp} isDemo={inv.isDemo} styles={rsvpStyles} />
                    </div>
                  </Reveal>
                </div>
              </div>
              <CloudEdge id="rsvp-bottom" className="rotate-180 text-primary/30" />
            </section>
          </BeforeEvent>
        )}

        {c.closingQuote && (
          <section className="px-6 py-16 text-center sm:py-20">
            <Reveal className="mx-auto max-w-2xl">
              <p className="font-display text-3xl font-medium leading-snug text-ink sm:text-4xl">{c.closingQuote.text}</p>
              {c.closingQuote.reference && <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-muted">{quoteCitation(c.closingQuote)}</p>}
            </Reveal>
          </section>
        )}

        <footer className="relative mt-10">
          <CloudEdge id="footer" className="text-secondary/45" />
          <div className="relative overflow-hidden bg-secondary/45 px-6 pb-20 pt-14 text-center sm:pb-24">
            <FallingConfetti />
            <Balloon className="float-soft absolute left-[8%] top-10 w-9 text-accent sm:left-[20%] sm:w-11" />
            <Balloon className="float-soft absolute right-[8%] top-16 w-8 text-primary sm:right-[20%] sm:w-10" style={{ animationDelay: "2s" }} />
            <div className="relative">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-ink/80">{c.footer.message}</p>
              <p className="mt-3 font-display text-[clamp(3.25rem,16vw,6rem)] font-semibold leading-none text-ink">{names.one}</p>
              <p className="mt-3 font-display text-xl text-ink/80">¡Cumple {ageText}!</p>
              <p className="mx-auto mt-4 w-fit whitespace-nowrap rounded-full bg-paper px-5 py-2 font-display text-base text-ink sm:text-lg">{dates.weekdayLong}</p>
              <MusicCredit music={c.music} className="mt-8 text-ink/65" />
            </div>
          </div>
        </footer>

        {inv.rsvp && (
          <BeforeEvent startISO={inv.startISO} endISO={inv.endISO}>
            <StickyRsvp date={dates.compact} time={dates.time} barClassName="rounded-full bg-ink/90 backdrop-blur" textClassName="font-display text-paper/90" buttonClassName="rounded-full bg-accent font-bold text-on-accent" />
          </BeforeEvent>
        )}
        {c.music && <MusicPlayer music={c.music} fallback={inv.meta.musicPlayer} />}
      </Gate>
    </Shell>
  );
}
