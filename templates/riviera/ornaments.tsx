// Ornamentos del diseño Riviera: banda de azulejo, sol de limón y sello.

export function TileBand({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg className={`block h-12 w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id={`tile-${id}`} width="48" height="48" patternUnits="userSpaceOnUse">
          <circle cx="24" cy="24" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
          <path d="M0 12A12 12 0 0 0 12 0M36 0a12 12 0 0 0 12 12M48 36a12 12 0 0 0-12 12M12 48A12 12 0 0 0 0 36" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M24 0l4 6-4 6-4-6zM24 36l4 6-4 6-4-6zM0 24l6-4 6 4-6 4zM36 24l6-4 6 4-6 4z" fill="currentColor" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#tile-${id})`} />
    </svg>
  );
}

export function Sun({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g className="slow-spin" style={{ transformOrigin: "50px 50px" }}>
        {rays.map((deg) => (
          <line key={deg} x1="50" y1="6" x2="50" y2={deg % 45 === 0 ? 20 : 16} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" transform={`rotate(${deg} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="24" fill="currentColor" />
    </svg>
  );
}

// Ola fina para separar secciones.
export function Wave({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M0 6c10 0 10-5 20-5s10 5 20 5 10-5 20-5 10 5 20 5 10-5 20-5 10 5 20 5" />
    </svg>
  );
}
