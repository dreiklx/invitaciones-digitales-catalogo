"use client";

import { pad, useCountdown } from "../shared/event-phase";

const UNITS = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
] as const;

// Franja tipográfica: cuatro cifras grandes en lino separadas por filetes
// verticales, sobre el bloque olivo. Sin cajas ni sombras.
export default function Countdown({ startISO, endISO, todayMessage, afterMessage }: { startISO: string; endISO: string; todayMessage: string; afterMessage: string }) {
  const state = useCountdown(startISO, endISO);

  if (state && state.phase !== "before") {
    return <p className="font-display text-[min(11vw,4.5rem)] font-light italic leading-tight text-on-primary">{state.phase === "during" ? todayMessage : afterMessage}</p>;
  }

  return (
    <div className="grid grid-cols-4 border-y border-on-primary/20" role="timer" aria-live="off">
      {UNITS.map(({ key, label }, i) => (
        <div key={key} className={`flex min-w-0 flex-col py-5 sm:py-8 ${i ? "border-l border-on-primary/20 pl-3 sm:pl-6" : "pr-3"}`}>
          {/* Tamaño solo en vw: con la letra del sistema agrandada no se sale de la fila. */}
          <span className="font-display text-[min(10.5vw,5.5rem)] font-light leading-none tabular-nums text-on-primary">{state ? pad(state.left[key]) : "--"}</span>
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary sm:text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
}
