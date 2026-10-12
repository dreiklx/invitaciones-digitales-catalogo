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

// Tres barras de ecualizador (Olivo, Tierra).
function Bars({ playing, className }: { playing: boolean; className: string }) {
  return (
    <span aria-hidden="true" className={`flex h-3 items-end gap-[3px] ${className}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`w-[3px] origin-bottom bg-current ${playing ? "player-bar" : ""}`} style={{ height: playing ? "100%" : `${[40, 70, 50][i]}%`, animationDelay: `${i * 180}ms` }} />
      ))}
    </span>
  );
}

// Estrella de cuatro puntas (Aurora, Aguamarina).
function Star({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

// ─── 01 Olivo · "lino": marcapáginas de tela olivo ───────────────────────
function Lino(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      {/* La sombra va en el envoltorio: en el mismo elemento, clip-path la recortaría. */}
      <span className="flex-shrink-0 drop-shadow-[0_10px_14px_rgba(35,39,28,0.32)]">
        <span className="flex h-[62px] w-12 flex-col items-center gap-1.5 bg-primary pt-3.5 text-on-primary [clip-path:polygon(0_0,100%_0,100%_100%,50%_82%,0_100%)]">
          <Glyph state={p.state} size={14} />
          <Bars playing={playing} className="h-2 text-on-primary/75" />
        </span>
      </span>
      <span className="hidden min-w-0 flex-col items-start py-2 pl-1 pr-5 text-left leading-tight sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">{statusText[p.state]}</span>
        <span className="mt-1 max-w-[13rem] truncate font-display text-lg italic text-ink">{p.title}</span>
        {p.artist && <span className="max-w-[13rem] truncate text-xs text-muted">{p.artist}</span>}
      </span>
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

// ─── 05 Aguamarina · "broche": gema tallada azul petróleo con filete champán ──
const OCT = (cut: number) => `polygon(${cut}px 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, ${cut}px 100%, 0 calc(100% - ${cut}px), 0 ${cut}px)`;
function Broche(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className="relative flex-shrink-0">
        {/* La sombra va en el envoltorio: clip-path la recortaría. */}
        <span className="block drop-shadow-[0_12px_16px_rgba(19,80,90,0.35)]">
          <span className="flex h-14 w-14 items-center justify-center bg-secondary" style={{ clipPath: OCT(15) }}>
            <span className="flex h-[52px] w-[52px] items-center justify-center bg-primary text-on-primary" style={{ clipPath: OCT(14) }}>
              <Glyph state={p.state} />
            </span>
          </span>
        </span>
        <Star className={`absolute -right-1 -top-1.5 h-4 w-4 text-secondary ${playing ? "twinkle" : ""}`} />
      </span>
      <span className="hidden min-w-0 flex-col items-start pl-1 pr-5 text-left leading-tight sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent">{statusText[p.state]}</span>
        <span className="mt-1 max-w-[13rem] truncate font-display text-lg font-medium italic text-primary">{p.title}</span>
        {p.artist && <span className="max-w-[13rem] truncate text-xs text-muted">{p.artist}</span>}
      </span>
    </>
  );
}

// ─── 04 Aurora · "destello": cristal lila con destellos ──────────────────
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

// ─── 08 Riviera · "sello": sello postal con borde perforado ──────────────
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

// ─── 06 Arrullo · "puntada": botón de tela salvia con puntada y una luna ──
function Puntada(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className="relative flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center rounded-full bg-surface shadow-[0_12px_28px_-14px_color-mix(in_srgb,var(--c-text)_55%,transparent)] ring-1 ring-line">
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary">
          <span aria-hidden="true" className={`absolute inset-[3px] rounded-full border-[1.5px] border-dashed border-on-primary/60 ${playing ? "player-spin" : ""}`} />
          <Glyph state={p.state} />
        </span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className={`absolute -right-1.5 -top-1.5 h-5 w-5 text-secondary drop-shadow-sm ${playing ? "twinkle" : ""}`}>
          <path d="M12.5 2.5a7.5 7.5 0 1 0 5 12.6 6.3 6.3 0 0 1-5-12.6Z" fill="currentColor" />
        </svg>
      </span>
      <Caption {...p} titleClass="font-display text-base text-primary" statusClass="text-muted" />
    </>
  );
}

// ─── 07 Nube · "globo": globo coral (y uno amarillo detrás) con su hilo ───
function Globo(p: FaceProps) {
  const playing = p.state === "playing";
  return (
    <>
      <span className={`relative flex h-[66px] w-[52px] flex-shrink-0 flex-col items-center ${playing ? "float-soft" : ""}`}>
        <span aria-hidden="true" className="absolute -left-3 top-1 h-7 w-6 rounded-[50%_50%_48%_48%/55%_55%_45%_45%] bg-secondary shadow-[inset_-3px_-4px_0_rgba(0,0,0,0.06)]" />
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
  lino: {
    position: STANDARD_POSITION,
    button: "flex items-start sm:items-center sm:bg-paper sm:pl-1.5 sm:shadow-[0_14px_30px_-18px_rgba(35,39,28,0.45)] sm:ring-1 sm:ring-line",
    Face: Lino,
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
  puntada: {
    position: STANDARD_POSITION,
    button: "flex items-center gap-3 rounded-full sm:bg-paper sm:py-1 sm:pl-1 sm:pr-5 sm:shadow-lg sm:ring-1 sm:ring-line",
    Face: Puntada,
  },
  broche: {
    position: STANDARD_POSITION,
    button: "flex items-center gap-2 rounded-full sm:bg-paper/95 sm:py-1 sm:pl-1 sm:shadow-lg sm:ring-1 sm:ring-secondary/60 sm:backdrop-blur",
    Face: Broche,
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
