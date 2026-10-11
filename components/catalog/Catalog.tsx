import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { paletteStyle, resolveInvitation } from "@/lib/invitation/resolve";
import type { EventKind, Palette, TemplateId } from "@/lib/invitation/types";
import { templateIds, templateMetas } from "@/templates/registry";
import { templatePreviews } from "@/templates/previews";
import { demos } from "@/templates/demos";
import Reveal from "@/templates/shared/Reveal";
import { ArrowDownIcon, ArrowRightIcon } from "@/templates/shared/icons";
import { catalogFonts } from "./fonts";

// Catálogo público: "/" cuando config/invitation.ts es null. Presenta los
// siete diseños en tres categorías (Bodas, Quince años, Bebés) como un
// estudio de invitaciones
// (no un panel): poca palabra, mucho aire y las miniaturas como
// protagonistas. Al tocar un
// diseño, su miniatura se transforma en la portada de la demo (View
// Transitions, mismo nombre `cover-<diseño>` que en Gate.tsx).

const neutral: Palette = {
  background: "#f4f1ea",
  surface: "#ebe6dc",
  text: "#1f1c18",
  textMuted: "#6c655a",
  primary: "#1f1c18",
  onPrimary: "#f4f1ea",
  secondary: "#a69a85",
  accent: "#1f1c18",
  onAccent: "#f4f1ea",
  line: "#d9d2c5",
};

// Las tres categorías del catálogo; cada diseño entra por su `kind`
// (meta.ts): 3 bodas + 2 quince años + 2 bebés.
const groups: { id: string; title: string; text: string; kinds: EventKind[] }[] = [
  { id: "bodas", title: "Bodas", text: "Tres estilos para el día del sí: editorial en olivo y lino, revista en tonos tierra y noche de gala.", kinds: ["boda"] },
  { id: "quince-anos", title: "Quince años", text: "Dos fiestas para sus XV: una de ensueño en lila y otra de gala en vino y rosa.", kinds: ["quinceanos"] },
  { id: "bebes", title: "Bebés", text: "Para esperar su llegada con un baby shower y para celebrar su primer añito.", kinds: ["baby-shower", "cumpleanos-infantil"] },
];

// Tipo de evento que se muestra en cada tarjeta.
const eventLabel: Record<EventKind, string> = {
  boda: "Boda",
  quinceanos: "Quince años",
  "baby-shower": "Baby shower",
  "cumpleanos-infantil": "Primer cumpleaños",
};

// "También creamos invitaciones para": el color de cada punto viene de un
// diseño afín.
const events: [string, string][] = [
  ["Bodas", templateMetas.olivo.palette.primary],
  ["Quince años", templateMetas.camelia.palette.primary],
  ["Baby showers", templateMetas.arrullo.palette.primary],
  ["Primeros cumpleaños", templateMetas.nube.palette.accent],
  ["Cumpleaños infantiles", templateMetas.nube.palette.primary],
  ["Otros eventos", neutral.secondary],
];

const included = [
  ["Confirmación por WhatsApp", "Formulario guiado paso a paso, también para avisar si no podrán asistir."],
  ["Cuenta regresiva y calendario", "Un toque para guardar la fecha, con recordatorio un día antes."],
  ["Cómo llegar", "Botones a Google Maps y Waze para cada lugar."],
  ["Fotos y música", "Galería con visor y canción de fondo opcional."],
  ["Detalles del día", "Vestimenta, colores a evitar, avisos importantes y regalos."],
  ["Pensada para todos", "Textos grandes y botones claros, probada con invitados de todas las edades."],
];

export default function Catalog() {
  return (
    <div className={`${catalogFonts} min-h-screen bg-paper font-body text-ink antialiased`} style={paletteStyle(neutral)}>
      <style>{`html,body{background:${neutral.background}}`}</style>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <p className="font-display text-xl italic tracking-wide sm:text-2xl">Invitaciones digitales</p>
        <a href="#disenos" className="hidden min-h-11 items-center text-xs font-semibold uppercase tracking-[0.25em] text-muted transition hover:text-ink sm:inline-flex">
          Ver los diseños
        </a>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-14 pt-6 sm:px-10 sm:pb-32 sm:pt-20">
        <Reveal variant="fade">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Bodas · Quince años · Bebés</p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-5 font-display text-[3.4rem] font-light leading-[0.95] tracking-tight min-[400px]:text-6xl sm:mt-6 sm:text-8xl lg:text-[8.5rem]">
            Siete diseños,
            <br />
            tres <em className="font-normal">celebraciones.</em>
          </h1>
        </Reveal>
        <div className="mt-7 grid grid-cols-1 gap-8 sm:mt-14 sm:gap-10 md:grid-cols-12">
          <Reveal delay={240} className="md:col-span-5 md:col-start-8">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Invitaciones digitales que se abren en cualquier teléfono, con sus nombres, sus fotos, su fecha y sus colores.
              Elija la celebración y después el estilo: cada diseño tiene su propia personalidad.
            </p>
            <a href="#disenos" className="mt-6 inline-flex min-h-12 items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] sm:mt-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/30 transition hover:bg-ink hover:text-paper">
                <ArrowDownIcon size={18} />
              </span>
              Ver los diseños
            </a>
          </Reveal>
          {/* Índice por categoría: en el teléfono sirve para saltar directo
              a un diseño sin recorrer todo el catálogo. */}
          <Reveal delay={320} variant="fade" className="md:col-span-6 md:row-start-1 md:self-end">
            <nav aria-label="Diseños por celebración" className="space-y-4">
              {groups.map((group) => (
                <div key={group.id}>
                  <a href={`#${group.id}`} className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted hover:text-ink">
                    {group.title}
                  </a>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {templateIds
                      .filter((id) => group.kinds.includes(templateMetas[id].kind))
                      .map((id) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/15 py-2 pl-2.5 pr-4 text-sm transition hover:border-ink/40 hover:bg-surface"
                        >
                          <span className="h-4 w-4 rounded-full ring-1 ring-ink/10" style={{ background: templateMetas[id].palette.primary }} />
                          <span className="font-display italic text-muted">{templateMetas[id].number}</span>
                          {templateMetas[id].name}
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <main id="disenos" className="mx-auto max-w-7xl scroll-mt-6 px-6 sm:px-10">
        {groups.map((group) => {
          const ids = templateIds.filter((id) => group.kinds.includes(templateMetas[id].kind));
          if (!ids.length) return null;
          return (
            <section key={group.id} id={group.id} aria-labelledby={`grupo-${group.id}`} className="scroll-mt-4 pt-6 sm:pt-10">
              {/* Encabezado de la categoría: filete grueso, números, título,
                  cuántos diseños tiene y para qué sirven. */}
              <Reveal className="grid grid-cols-1 gap-x-10 gap-y-3 border-t-2 border-ink pb-6 pt-5 sm:pb-8 sm:pt-6 md:grid-cols-12 md:items-end">
                <div className="md:col-span-6">
                  <p className="font-display text-lg italic text-muted sm:text-xl">
                    {templateMetas[ids[0]].number} — {templateMetas[ids[ids.length - 1]].number} · {ids.length} diseños
                  </p>
                  <h2 id={`grupo-${group.id}`} className="mt-1 font-display text-5xl font-light leading-none sm:text-7xl">
                    {group.title}
                  </h2>
                </div>
                <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg md:col-span-6 md:justify-self-end">{group.text}</p>
              </Reveal>
              {ids.map((id) => (
                <Design key={id} id={id} index={templateIds.indexOf(id)} />
              ))}
            </section>
          );
        })}
      </main>

      {/* Más que bodas: tipos de evento (sin precios ni paquetes). */}
      <section aria-labelledby="eventos" className="mx-auto max-w-7xl px-6 pt-14 sm:px-10 sm:pt-24">
        <Reveal className="grid grid-cols-1 gap-8 border-y border-line py-10 sm:gap-10 sm:border-x sm:px-12 sm:py-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Más que bodas</p>
            <h2 id="eventos" className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">
              También creamos invitaciones <em>para:</em>
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted sm:text-lg">
              Cada celebración merece su propio diseño. Si su evento no está en la lista, también podemos crearlo.
            </p>
          </div>
          {/* Lista tipográfica, no píldoras: no son botones y no deben parecerlo. */}
          <ul className="grid grid-cols-1 border-t border-line min-[480px]:grid-cols-2 min-[480px]:gap-x-8 md:col-span-7 md:self-center">
            {events.map(([name, color]) => (
              <li key={name} className="flex min-h-14 items-center gap-4 border-b border-line py-3">
                <span className="h-3.5 w-3.5 flex-shrink-0 rounded-full ring-1 ring-ink/10" style={{ background: color }} />
                <span className="font-display text-2xl leading-tight">{name}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>


      <section className="mt-10 bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">En todos los diseños</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-light leading-tight sm:text-5xl">
              Todo lo que sus invitados necesitan, <em>en un solo enlace.</em>
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-6 sm:mt-14 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
            {included.map(([title, text], i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="border-t border-ink/15 pt-4 sm:pt-5">
                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted sm:mt-2 sm:text-sm">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pie oscuro: el logo del estudio está hecho para fondo oscuro (letras
          blancas con brillo azul) y es su único lugar en todo el sitio. */}
      <footer className="bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-[max(env(safe-area-inset-bottom),2.5rem)] pt-12 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-14">
          <div>
            <p className="font-display text-2xl italic">Invitaciones digitales</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper/65">Diseños para personalizar con sus datos, fotos y colores.</p>
          </div>
          <div className="border-t border-paper/15 pt-6 sm:border-0 sm:pt-0 sm:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/50">Creado por</p>
            <Image
              src="/logos/farley-systems-and-icon-logo.png"
              alt="Farley Systems"
              width={1983}
              height={793}
              sizes="180px"
              className="-ml-1.5 mt-2 h-14 w-auto sm:ml-auto sm:-mr-2 sm:h-16"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

// Un diseño del catálogo: miniatura (se transforma en la portada de la
// demo) y su descripción. `index` alterna el lado en escritorio.
function Design({ id, index }: { id: TemplateId; index: number }) {
  const meta = templateMetas[id];
  const { Preview, fontClasses } = templatePreviews[id];
  const inv = resolveInvitation(demos[id], { basePath: `/plantillas/${id}`, isDemo: true });
  const href = `/plantillas/${id}`;
  const flipped = index % 2 === 1;
  return (
    <article id={id} className="grid scroll-mt-4 grid-cols-1 items-center gap-6 border-t border-line pb-14 pt-8 sm:gap-8 sm:py-20 md:grid-cols-12 md:gap-12 lg:py-24">
      {/* Teléfono: número y nombre ANTES de la miniatura (se sabe qué
          diseño se está viendo); en escritorio van en la columna de texto. */}
      <div className="md:hidden">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">{eventLabel[meta.kind]}</p>
        <div className="mt-1 flex items-baseline gap-3">
          <p className="font-display text-xl italic text-muted">{meta.number}</p>
          <h3 className="font-display text-5xl font-light leading-none">{meta.name}</h3>
        </div>
      </div>
      <Reveal variant="scale" className={`mb-4 md:mb-0 md:col-span-6 ${flipped ? "md:order-2 md:col-start-7" : ""}`}>
        <Link href={href} transitionTypes={["nav-forward"]} aria-label={`Ver el diseño ${meta.name}`} className="group relative block">
          <ViewTransition name={`cover-${id}`} share="cover-morph" default="none">
            <div className={`@container relative aspect-[4/5] overflow-hidden rounded-[2px] shadow-[0_40px_80px_-40px_rgba(31,28,24,0.45)] ${fontClasses}`} style={paletteStyle(inv.palette)}>
              <div className="absolute inset-0 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]">
                <Preview inv={inv} />
              </div>
            </div>
          </ViewTransition>
          {/* Teléfono: sin hover, la miniatura necesita decir que se toca. Va
              a medio salir del borde para no tapar nombres ni fecha. */}
          <span aria-hidden="true" className="absolute -bottom-5 right-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold uppercase tracking-[0.2em] text-paper shadow-lg md:hidden">
            Abrir
            <ArrowRightIcon size={14} />
          </span>
        </Link>
      </Reveal>

      <Reveal delay={120} className={`md:col-span-5 ${flipped ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
        <p className="hidden text-xs font-semibold uppercase tracking-[0.3em] text-muted md:block">
          <span className="mr-3 font-display text-2xl normal-case italic tracking-normal">{meta.number}</span>
          {eventLabel[meta.kind]}
        </p>
        <h3 className="mt-1 hidden font-display text-7xl font-light leading-none md:block">{meta.name}</h3>
        <p className="max-w-sm text-base leading-relaxed text-muted sm:text-lg md:mt-5">{meta.concept}</p>
        <ul className="mt-5 space-y-2 text-[15px] text-ink/80 sm:mt-6 sm:text-sm">
          {meta.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-2 h-px w-4 flex-shrink-0 bg-ink/40" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-7">
          <div className="flex">
            {(["primary", "background", "secondary", "accent", "surface"] as const).map((k) => (
              <span key={k} className="-mr-1.5 h-7 w-7 rounded-full border-2 border-paper ring-1 ring-ink/15" style={{ background: meta.palette[k] }} />
            ))}
          </div>
          <p className="text-xs text-muted">
            {meta.fonts.display} · {meta.fonts.body}
          </p>
        </div>
        {/* Teléfono: botón lleno a todo lo ancho (fácil con el pulgar);
            escritorio: enlace subrayado. */}
        <Link
          href={href}
          transitionTypes={["nav-forward"]}
          className="group/cta mt-8 flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-ink px-6 text-sm font-semibold uppercase tracking-[0.22em] text-paper transition hover:bg-ink/85 md:mt-9 md:inline-flex md:min-h-12 md:w-auto md:justify-start md:rounded-none md:border-b md:border-ink md:bg-transparent md:px-0 md:pb-1 md:text-ink md:hover:bg-transparent"
        >
          Abrir {meta.name}
          <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
        </Link>
      </Reveal>
    </article>
  );
}
