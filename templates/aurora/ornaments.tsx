import type { CSSProperties } from "react";

// Ornamentos de Aurora (SVG que toman el color del texto).

// Destello de cuatro puntas.
export function Sparkle({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M12 0c.6 5.6 3.9 9.2 12 12-8.1 2.8-11.4 6.4-12 12-.6-5.6-3.9-9.2-12-12C8.1 9.2 11.4 5.6 12 0Z" />
    </svg>
  );
}

// Varios destellos repartidos en un área (posiciones en %), que titilan
// desfasados. Decorativos: no reciben toques.
const FIELD = [
  { x: 8, y: 14, s: 14, d: 0 },
  { x: 86, y: 9, s: 18, d: 0.8 },
  { x: 92, y: 46, s: 10, d: 1.6 },
  { x: 5, y: 58, s: 12, d: 2.2 },
  { x: 74, y: 78, s: 16, d: 1.1 },
  { x: 18, y: 88, s: 10, d: 2.7 },
];

export function SparkleField({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {FIELD.map((p, i) => (
        <Sparkle
          key={i}
          className="twinkle absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDelay: `${p.d}s` }}
        />
      ))}
    </div>
  );
}

// Filete con un destello en medio.
export function SparkleRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-current opacity-50 sm:w-16" />
      <Sparkle className="h-3.5 w-3.5" />
      <span className="h-px w-12 bg-current opacity-50 sm:w-16" />
    </div>
  );
}
