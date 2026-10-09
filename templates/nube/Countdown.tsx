"use client";

import { pad, useCountdown } from "../shared/event-phase";

const UNITS = [
  { key: "days", label: "Días", tone: "bg-primary/45", tilt: "-rotate-2" },
  { key: "hours", label: "Horas", tone: "bg-secondary/60", tilt: "rotate-2" },
  { key: "minutes", label: "Min", tone: "bg-accent/40", tilt: "-rotate-1" },
  { key: "seconds", label: "Seg", tone: "bg-primary/25", tilt: "rotate-1" },
] as const;

// Cuatro "bloques de juguete" de colores suaves, apenas inclinados.
export default function Countdown({ startISO, endISO, todayMessage, afterMessage }: { startISO: string; endISO: string; todayMessage: string; afterMessage: string }) {
  const state = useCountdown(startISO, endISO);

  if (state && state.phase !== "before") {
    return (
      <p className="mx-auto max-w-md rounded-[2rem] bg-secondary/55 px-6 py-7 text-center font-display text-3xl font-medium text-ink sm:text-4xl">
        {state.phase === "during" ? todayMessage : afterMessage}
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 min-[360px]:gap-3 sm:gap-5" role="timer" aria-live="off">
      {UNITS.map(({ key, label, tone, tilt }) => (
        <div key={key} className={`flex min-w-0 flex-col items-center rounded-[1.4rem] px-1 py-4 sm:rounded-[2rem] sm:py-7 ${tone} ${tilt}`}>
          <span className="font-display text-[1.9rem] font-semibold leading-none tabular-nums text-ink min-[360px]:text-4xl sm:text-6xl">{state ? pad(state.left[key]) : "--"}</span>
          <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-ink/75 min-[360px]:text-xs sm:tracking-[0.18em]">{label}</span>
        </div>
      ))}
    </div>
  );
}
