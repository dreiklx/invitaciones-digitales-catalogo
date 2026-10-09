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
