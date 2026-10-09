"use client";

import { pad, useCountdown } from "../shared/event-phase";

const UNITS = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
] as const;

// Cuatro "cristales" translúcidos sobre el bloque violeta.
export default function Countdown({ startISO, endISO, todayMessage, afterMessage }: { startISO: string; endISO: string; todayMessage: string; afterMessage: string }) {
  const state = useCountdown(startISO, endISO);

  if (state && state.phase !== "before") {
    return (
      <p className="mx-auto max-w-md rounded-3xl border border-on-primary/25 bg-on-primary/10 px-6 py-7 text-center font-display text-3xl text-on-primary sm:text-4xl">
        {state.phase === "during" ? todayMessage : afterMessage}
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 min-[360px]:gap-3 sm:gap-5" role="timer" aria-live="off">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex min-w-0 flex-col items-center rounded-2xl border border-on-primary/25 bg-on-primary/10 px-1 py-4 backdrop-blur-sm sm:rounded-3xl sm:py-7">
          <span className="font-display text-[2rem] leading-none tabular-nums text-on-primary min-[360px]:text-4xl sm:text-6xl">{state ? pad(state.left[key]) : "--"}</span>
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary min-[360px]:text-xs sm:tracking-[0.2em]">{label}</span>
        </div>
      ))}
    </div>
  );
}
