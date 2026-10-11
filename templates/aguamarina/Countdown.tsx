"use client";

import { pad, useCountdown } from "../shared/event-phase";
import { gemClip } from "./ornaments";

const UNITS = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
] as const;

// Cuatro gemas talladas (filete champán) sobre el bloque azul petróleo.
export default function Countdown({ startISO, endISO, todayMessage, afterMessage }: { startISO: string; endISO: string; todayMessage: string; afterMessage: string }) {
  const state = useCountdown(startISO, endISO);

  if (state && state.phase !== "before") {
    return <p className="text-center font-display text-[min(11vw,4rem)] italic leading-tight text-on-primary">{state.phase === "during" ? todayMessage : afterMessage}</p>;
  }

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 min-[360px]:gap-3 sm:gap-6" role="timer" aria-live="off">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="bg-secondary/80 p-px" style={{ clipPath: gemClip(14) }}>
          <div className="flex min-w-0 flex-col items-center bg-primary px-1 py-4 sm:py-7" style={{ clipPath: gemClip(13.5) }}>
            {/* Tamaño solo en vw: la letra agrandada del sistema no saca las cifras de la fila. */}
            <span className="font-display text-[min(9.5vw,3.75rem)] font-medium leading-none tabular-nums text-on-primary">{state ? pad(state.left[key]) : "--"}</span>
            <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary min-[360px]:text-[11px] sm:text-xs sm:tracking-[0.25em]">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
