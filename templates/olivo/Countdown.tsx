"use client";

import { pad, useCountdown } from "../shared/event-phase";

const UNITS = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
] as const;

// Cajas opacas color papel con sombra difusa (diseño original).
export default function Countdown({ startISO, endISO, todayMessage, afterMessage }: { startISO: string; endISO: string; todayMessage: string; afterMessage: string }) {
  const state = useCountdown(startISO, endISO);

  if (state && state.phase !== "before") {
    return (
      <p className="rounded-2xl border border-line/70 bg-paper px-6 py-6 text-center font-display text-2xl text-primary shadow-[0_18px_30px_-18px_rgba(0,0,0,0.45)] sm:text-3xl">
        {state.phase === "during" ? todayMessage : afterMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 min-[360px]:gap-3 sm:gap-5" role="timer" aria-live="off">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center justify-center rounded-2xl border border-line/70 bg-paper px-1 py-4 shadow-[0_18px_30px_-18px_rgba(0,0,0,0.45)] sm:py-6">
          <span className="font-display text-3xl tabular-nums text-primary sm:text-5xl">{state ? pad(state.left[key]) : "--"}</span>
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted min-[360px]:text-xs min-[360px]:tracking-[0.12em] sm:text-sm">{label}</span>
        </div>
      ))}
    </div>
  );
}
