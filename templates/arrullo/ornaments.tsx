import type { CSSProperties } from "react";

// Ornamentos de Arrullo (SVG que toman el color del texto). Pocos, finos
// y de papelería: banderines, una luna con estrellas y una puntada.

// Guirnalda de banderines a todo el ancho (patrón, no se estira).
export function Garland({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg className={`block h-9 w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id={`garland-${id}`} width="84" height="36" patternUnits="userSpaceOnUse">
          <path d="M0 5Q21 10 42 5T84 5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
          <path d="M10 7.2 19 26 28 8.3Z" fill="currentColor" opacity="0.85" />
          <path d="M52 7.2 61 24 70 6Z" fill="currentColor" opacity="0.45" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#garland-${id})`} />
    </svg>
  );
}

// Luna creciente con dos estrellas: el "arrullo" del diseño.
export function Moon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path d="M62 14a38 38 0 1 0 24 58A32 32 0 0 1 62 14Z" fill="currentColor" />
      <path d="M82 18c.4 4 3.6 7.2 7.6 7.6-4 .4-7.2 3.6-7.6 7.6-.4-4-3.6-7.2-7.6-7.6 4-.4 7.2-3.6 7.6-7.6Z" fill="currentColor" opacity="0.7" />
      <path d="M70 42c.3 2.6 2.4 4.7 5 5-2.6.3-4.7 2.4-5 5-.3-2.6-2.4-4.7-5-5 2.6-.3 4.7-2.4 5-5Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// Puntada (línea discontinua) para separar.
export function Stitch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 6" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="5 6" aria-hidden="true">
      <path d="M3 3h114" />
    </svg>
  );
}
