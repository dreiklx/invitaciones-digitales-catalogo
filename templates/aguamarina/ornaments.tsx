import type { CSSProperties, ReactNode } from "react";

// Ornamentos de Aguamarina: el marco tallado como una joya (esquinas biseladas
// con doble filete champán), la tiara de línea fina, destellos y el filete
// con los XV. Finos y pocos: el refinamiento está en el detalle.

// Octógono de esquinas biseladas ("talla esmeralda"); `cut` en px.
export function gemClip(cut: number): string {
  return `polygon(${cut}px 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% calc(100% - ${cut}px), calc(100% - ${cut}px) 100%, ${cut}px 100%, 0 calc(100% - ${cut}px), 0 ${cut}px)`;
}

// Marco joya: filete exterior champán, aire color papel y filete interior.
// `gap` es el aire entre los dos filetes (0 = un solo filete).
export function Gem({ children, cut = 26, gap = 7, className = "", surface = "bg-paper" }: { children: ReactNode; cut?: number; gap?: number; className?: string; surface?: string }) {
  const inner = (
    <div className="bg-secondary p-[1.5px]" style={{ clipPath: gemClip(cut) }}>
      <div className="overflow-hidden" style={{ clipPath: gemClip(Math.max(cut - 1, 0)) }}>
        {children}
      </div>
    </div>
  );
  if (!gap) return <div className={className}>{inner}</div>;
  return (
    <div className={`bg-secondary/70 p-px ${className}`} style={{ clipPath: gemClip(cut + gap + 1) }}>
      <div className={surface} style={{ clipPath: gemClip(cut + gap), padding: gap }}>
        {inner}
      </div>
    </div>
  );
}

// Tiara de línea fina con tres gemas.
export function Tiara({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 64 30" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 26h52" />
      <path d="M8 26 5 12l11 7 8-14 8 12 8-12 8 14 11-7-3 14" />
      <path d="M32 5v-1" />
      <circle cx="32" cy="2.2" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="16" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="48" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <path d="M29 21.5h6l-3 3.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Destello de cuatro puntas.
export function Sparkle({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

// Filete con un texto al centro ("XV") y dos rombos pequeños.
export function XvRule({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-10 bg-current opacity-60 sm:w-16" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      <span className="font-display text-[1.6em] italic leading-none tracking-wide">{label}</span>
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      <span className="h-px w-10 bg-current opacity-60 sm:w-16" />
    </div>
  );
}
