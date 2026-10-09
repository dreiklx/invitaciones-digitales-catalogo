import type { ComponentType } from "react";
import type { MusicPlayerStyle } from "@/lib/invitation/types";
import { PauseIcon, PlayIcon, SpinnerIcon } from "./icons";

// Presentaciones del reproductor de música. La lógica de audio es una sola
// (MusicPlayer.tsx); aquí solo cambia la forma. Reglas comunes:
// - Teléfono: solo la forma con ▶/❚❚ (≥ 48 px). Sobre la portada va arriba
//   a la derecha; después, abajo a la derecha, encima de la barra
//   "Confirmar asistencia" (MusicPlayer.tsx decide). La píldora con texto
//   tapaba contenido en 390 px (lección de la boda original).
// - Escritorio (≥ sm): la forma + título y estado en texto.
// - Colores y letras solo con los tokens del diseño que lo usa.
// - Las animaciones (al sonar) se detienen con "reducir movimiento"
//   (globals.css).

// "blocked": el navegador no dejó sonar la música al abrir la invitación.
export type PlayerState = "idle" | "blocked" | "loading" | "playing" | "paused" | "error";

type FaceProps = { state: PlayerState; title: string; artist?: string };

type Variant = {
  // Posición fija del contenedor.
  position: string;
  // Clases del <button> (forma exterior y zona táctil).
  button: string;
  Face: ComponentType<FaceProps>;
};

const STANDARD_POSITION = "bottom-24 right-4 lg:bottom-8 lg:right-8";

const statusText: Record<PlayerState, string> = {
  idle: "Toca para escuchar",
  blocked: "Toca para escuchar",
  loading: "Cargando…",
  playing: "Sonando · toca para pausar",
  paused: "En pausa",
  error: "No disponible por ahora",
};

function Glyph({ state, size = 16 }: { state: PlayerState; size?: number }) {
  if (state === "loading") return <SpinnerIcon size={size + 2} />;
  if (state === "playing") return <PauseIcon size={size} />;
  return <PlayIcon size={size} className="translate-x-px" />;
}

// Texto de escritorio: título + estado.
function Caption({ title, artist, state, titleClass, statusClass }: FaceProps & { titleClass: string; statusClass: string }) {
  return (
    <span className="hidden min-w-0 flex-col items-start text-left leading-tight sm:flex">
      <span className={`max-w-[13rem] truncate ${titleClass}`}>{title}</span>
      {artist && <span className={`max-w-[13rem] truncate text-xs ${statusClass}`}>{artist}</span>}
      <span className={`mt-0.5 text-[11px] uppercase tracking-[0.18em] ${statusClass}`}>{statusText[state]}</span>
    </span>
  );
}

// Tres barras de ecualizador (Tierra, Borgoña).
function Bars({ playing, className }: { playing: boolean; className: string }) {
  return (
    <span aria-hidden="true" className={`flex h-3 items-end gap-[3px] ${className}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`w-[3px] origin-bottom bg-current ${playing ? "player-bar" : ""}`} style={{ height: playing ? "100%" : `${[40, 70, 50][i]}%`, animationDelay: `${i * 180}ms` }} />
      ))}
    </span>
  );
}

// Estrella de cuatro puntas (Aurora).
function Star({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

// ─── 01 Olivo · "rama": círculo de lino con una rama de olivo ────────────
function Rama(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-on-primary ring-[3px] ring-paper sm:ring-0">
        <svg viewBox="0 0 40 40" aria-hidden="true" className={`pointer-events-none absolute -left-4 -top-4 h-9 w-9 text-secondary ${playing ? "player-sway" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M34 34C26 26 18 20 6 16" />
          <path d="M14 19c-4-1-7 0-9 3 4 1 7 0 9-3zM20 23c-1-4-4-6-8-6 1 4 4 6 8 6zM24 26c-4 0-7 2-8 5 4 0 7-2 8-5zM28 29c-1-4 0-7 3-9 1 4 0 7-3 9z" fill="currentColor" fillOpacity="0.35" />
        </svg>
        <Glyph state={p.state} />
      </span>
      <Caption {...p} titleClass="font-display text-base italic text-ink" statusClass="text-muted" />
    </>
  );
}

// ─── 02 Tierra · "ficha": ficha técnica de revista, esquinas rectas ──────
function Ficha(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className="relative flex h-[52px] w-[52px] flex-shrink-0 flex-col items-center justify-center gap-1 border-ink bg-paper text-ink sm:border-r">
        <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />
        <Glyph state={p.state} />
        <Bars playing={playing} className="h-2 text-accent" />
      </span>
      <span className="hidden flex-col items-start px-4 py-2 text-left leading-tight sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">Pista · {statusText[p.state]}</span>
        <span className="mt-1 max-w-[13rem] truncate font-display text-lg italic text-ink">{p.title}</span>
        {p.artist && <span className="max-w-[13rem] truncate text-xs text-muted">{p.artist}</span>}
      </span>
    </>
  );
}

// ─── 03 Gala · "deco": rombo dorado con doble filete art déco ────────────
function Deco(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center">
        {playing && <span aria-hidden="true" className="player-pulse absolute inset-[6px] rotate-45 border border-primary/60" />}
        <span aria-hidden="true" className="absolute inset-[7px] rotate-45 border border-primary bg-paper shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]" />
        <span aria-hidden="true" className="absolute inset-[11px] rotate-45 border border-primary/40" />
        <span className="relative text-primary">
          <Glyph state={p.state} size={14} />
        </span>
      </span>
      <span className="hidden flex-col items-start text-left leading-tight sm:flex">
        <span className={`text-[11px] uppercase tracking-[0.4em] text-primary ${playing ? "gold-sheen" : ""}`}>Música</span>
        <span className="mt-1 max-w-[13rem] truncate font-display text-base italic text-ink">{p.title}</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted">{statusText[p.state]}</span>
      </span>
    </>
  );
}

// ─── 04 Riviera · "sello": sello postal con borde perforado ──────────────
function Sello(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className="relative flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full bg-paper shadow-[0_12px_28px_-12px_rgba(20,38,79,0.6)]">
        <span aria-hidden="true" className={`absolute inset-[3px] rounded-full border-2 border-dashed border-primary/70 ${playing ? "player-spin" : ""}`} />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary">
          <Glyph state={p.state} />
          <span aria-hidden="true" className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-paper bg-secondary" />
        </span>
      </span>
      <Caption {...p} titleClass="font-display text-base text-primary" statusClass="text-muted" />
    </>
  );
}

// ─── 05 Borgoña · "etiqueta": bloque vino tipográfico, esquinas rectas ───
function Etiqueta(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className="flex h-[52px] w-[52px] flex-shrink-0 flex-col items-center justify-center gap-1.5 bg-primary text-on-primary ring-1 ring-secondary/70 sm:ring-0">
        <Glyph state={p.state} />
        <span aria-hidden="true" className={`h-0.5 bg-secondary transition-all duration-700 ${playing ? "w-7" : "w-3"}`} />
      </span>
      <span className="hidden items-center gap-4 py-2 pl-4 pr-5 sm:flex">
        <span className="font-display text-2xl italic leading-none text-primary">Música</span>
        <span className="flex flex-col items-start border-l border-primary/25 pl-4 text-left leading-tight">
          <span className="max-w-[11rem] truncate text-xs font-semibold uppercase tracking-[0.2em] text-ink">{p.title}</span>
          <span className="mt-1 flex items-center gap-2 text-[11px] text-muted">
            <Bars playing={playing} className="h-2 text-primary" />
            {statusText[p.state]}
          </span>
        </span>
      </span>
    </>
  );
}

// ─── 06 Aurora · "destello": cristal lila con destellos ──────────────────
function Destello(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-paper/75 shadow-[0_12px_30px_-10px_rgba(85,58,136,0.55)] ring-1 ring-secondary backdrop-blur-md">
        <Star className={`absolute -right-1.5 -top-1.5 h-4 w-4 text-accent ${playing ? "twinkle" : ""}`} />
        <Star className={`absolute -bottom-1 -left-1.5 h-3 w-3 text-secondary ${playing ? "twinkle" : ""}`} />
        <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary ${playing ? "shadow-[0_0_0_4px_color-mix(in_srgb,var(--c-accent)_25%,transparent)]" : ""}`}>
          <Glyph state={p.state} />
        </span>
      </span>
      {/* Título en la letra de texto: los números de Italiana se leen mal. */}
      <Caption {...p} titleClass="font-body text-sm font-semibold text-primary" statusClass="text-muted" />
    </>
  );
}

// ─── 07 Nube · "globo": globo durazno con su hilo ────────────────────────
function Globo(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className={`relative flex h-[66px] w-[52px] flex-shrink-0 flex-col items-center ${playing ? "float-soft" : ""}`}>
        <span className="flex h-[54px] w-[52px] items-center justify-center rounded-[50%_50%_48%_48%/55%_55%_45%_45%] bg-accent text-on-accent shadow-[inset_-6px_-8px_0_rgba(0,0,0,0.06),0_10px_20px_-10px_rgba(0,0,0,0.35)]">
          <span aria-hidden="true" className="absolute left-3 top-2.5 h-3 w-2 rotate-[25deg] rounded-full bg-paper/60" />
          <Glyph state={p.state} />
        </span>
        <span aria-hidden="true" className="-mt-px h-0 w-0 border-x-[5px] border-b-[6px] border-x-transparent border-b-accent" />
        <svg aria-hidden="true" viewBox="0 0 10 14" className="-mt-px h-3 w-2 text-muted" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M5 0c-3 4 3 7 0 14" />
        </svg>
      </span>
      <Caption {...p} titleClass="font-display text-base font-semibold text-ink" statusClass="text-muted" />
    </>
  );
}

export const players: Record<MusicPlayerStyle, Variant> = {
  rama: {
    position: STANDARD_POSITION,
    button: "flex items-center gap-3 rounded-full p-0 sm:bg-paper/95 sm:py-1.5 sm:pl-1.5 sm:pr-5 sm:shadow-lg sm:ring-1 sm:ring-primary/20 sm:backdrop-blur max-sm:shadow-lg max-sm:rounded-full",
    Face: Rama,
  },
  ficha: {
    position: STANDARD_POSITION,
    button: "flex items-stretch border border-ink bg-paper shadow-[6px_6px_0_0_color-mix(in_srgb,var(--c-text)_14%,transparent)]",
    Face: Ficha,
  },
  deco: {
    position: STANDARD_POSITION,
    button: "flex items-center gap-2 sm:border sm:border-primary/40 sm:bg-paper sm:py-1 sm:pl-1 sm:pr-6",
    Face: Deco,
  },
  sello: {
    position: STANDARD_POSITION,
    button: "flex items-center gap-3 rounded-full sm:bg-paper sm:py-1 sm:pl-1 sm:pr-5 sm:shadow-lg sm:ring-1 sm:ring-primary/15",
    Face: Sello,
  },
  etiqueta: {
    position: STANDARD_POSITION,
    button: "flex items-stretch bg-paper shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)] sm:border sm:border-primary/20",
    Face: Etiqueta,
  },
  destello: {
    position: STANDARD_POSITION,
    button: "flex items-center gap-3 rounded-full sm:bg-paper/80 sm:py-1 sm:pl-1 sm:pr-5 sm:shadow-lg sm:ring-1 sm:ring-secondary sm:backdrop-blur-md",
    Face: Destello,
  },
  globo: {
    position: "bottom-[5.5rem] right-4 lg:bottom-8 lg:right-8",
    button: "flex items-start gap-3 sm:items-center sm:rounded-full sm:bg-paper sm:py-1.5 sm:pl-1.5 sm:pr-5 sm:shadow-lg sm:ring-1 sm:ring-line",
    Face: Globo,
  },
};
