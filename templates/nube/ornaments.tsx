import type { CSSProperties } from "react";

// Ornamentos de Nube (SVG que toman el color del texto: `text-paper`,
// `text-secondary`…). Trazo suave, pocos y con aire: tierno sin saturar.

export function Cloud({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 64 36" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M15 35a11 11 0 0 1-1.6-21.9A14 14 0 0 1 40.4 9.3 10 10 0 0 1 53.6 16 9.5 9.5 0 0 1 52 35Z" />
    </svg>
  );
}

export function Balloon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 92" className={className} style={style} aria-hidden="true">
      <ellipse cx="20" cy="20" rx="16" ry="19" fill="currentColor" />
      <ellipse cx="14" cy="13" rx="4" ry="6" fill="var(--c-background)" opacity="0.4" />
      <path d="M17 38.5 20 43l3-4.5Z" fill="currentColor" />
      <path d="M20 43c-5 9 5 15 0 24s5 15 0 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

// Borde ondulado (fila de semicírculos) para pasar de una sección a otra.
// `className` define el color de relleno (el de la sección que sigue).
export function CloudEdge({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg aria-hidden="true" className={`block h-5 w-full sm:h-7 ${className}`}>
      <defs>
        <pattern id={`edge-${id}`} width="40" height="28" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="30" r="22" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#edge-${id})`} />
    </svg>
  );
}

// Confeti suave (puntos y rayitas). Posiciones en %. Decorativo.
const CONFETTI = [
  { x: 7, y: 18, w: 8, h: 8, r: 0, c: "text-secondary" },
  { x: 88, y: 12, w: 12, h: 4, r: 35, c: "text-accent" },
  { x: 80, y: 58, w: 7, h: 7, r: 0, c: "text-paper" },
  { x: 12, y: 70, w: 12, h: 4, r: -25, c: "text-primary" },
  { x: 93, y: 84, w: 8, h: 8, r: 0, c: "text-secondary" },
  { x: 24, y: 40, w: 5, h: 5, r: 0, c: "text-accent" },
];

export function Confetti({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {CONFETTI.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-current ${p.c}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.w, height: p.h, transform: `rotate(${p.r}deg)` }}
        />
      ))}
    </div>
  );
}

// Guirnalda de banderines de colores (amarillo, coral y celeste del
// diseño) a todo el ancho. Patrón: no se estira ni ensancha la página.
export function Bunting({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg aria-hidden="true" className={`block h-10 w-full sm:h-12 ${className}`}>
      <defs>
        <pattern id={`bunting-${id}`} width="108" height="44" patternUnits="userSpaceOnUse">
          <path d="M0 6Q27 14 54 6T108 6" fill="none" stroke="var(--c-text)" strokeOpacity="0.35" strokeWidth="1.2" />
          <path d="M9 8.6 18 30 27 10.5Z" fill="var(--c-secondary)" />
          <path d="M45 7.4 54 28 63 6.2Z" fill="var(--c-accent)" />
          <path d="M81 6.2 90 27 99 8.6Z" fill="var(--c-primary)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#bunting-${id})`} />
    </svg>
  );
}

// Estrellita (titila con la clase `twinkle`).
export function Star({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 1.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 8.7l7.1-.6Z" />
    </svg>
  );
}

// Llamita de la vela (titila con `flicker`).
export function Flame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 30" className={className} aria-hidden="true">
      <path d="M10 1C14 8 18 12 18 19a8 8 0 0 1-16 0c0-5 3-8 4-12 1 3 2 4 3.5 5C10 9 9.5 5 10 1Z" fill="var(--c-accent)" />
      <path d="M10 13c2 3 4 5 4 8a4 4 0 0 1-8 0c0-2 1.5-3.5 2.2-5.4.6 1.2 1.2 1.8 1.8 2.2-.3-1.7-.3-3.2 0-4.8Z" fill="var(--c-secondary)" />
    </svg>
  );
}

// Confeti que cae muy despacio, pocas piezas y solo dentro de su sección
// (que debe tener overflow-hidden). Con "reducir movimiento" queda quieto.
const FALLING = [
  { x: 6, d: 0, t: 9, w: 7, h: 12, c: "bg-secondary" },
  { x: 18, d: 3.5, t: 11, w: 8, h: 8, c: "bg-accent", round: true },
  { x: 31, d: 1.2, t: 10, w: 6, h: 11, c: "bg-primary" },
  { x: 47, d: 5, t: 12, w: 7, h: 7, c: "bg-secondary", round: true },
  { x: 62, d: 2.2, t: 9.5, w: 6, h: 12, c: "bg-accent" },
  { x: 76, d: 6.2, t: 11.5, w: 8, h: 8, c: "bg-primary", round: true },
  { x: 89, d: 0.8, t: 10.5, w: 7, h: 11, c: "bg-secondary" },
];

export function FallingConfetti({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {FALLING.map((p, i) => (
        <span
          key={i}
          className={`confetti-fall absolute top-0 ${p.c} ${p.round ? "rounded-full" : "rounded-[2px]"}`}
          style={{ left: `${p.x}%`, width: p.w, height: p.h, animationDelay: `${p.d}s`, animationDuration: `${p.t}s` }}
        />
      ))}
    </div>
  );
}
