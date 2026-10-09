"use client";

import { pad, useCountdown } from "../shared/event-phase";

const UNITS = [
  { key: "days", label: "días", short: "días" },
  { key: "hours", label: "horas", short: "horas" },
  { key: "minutes", label: "minutos", short: "min" },
  { key: "seconds", label: "segundos", short: "seg" },
] as const;

// Cifras de revista separadas por filetes verticales.
export default function Countdown({ startISO, endISO, todayMessage, afterMessage }: { startISO: string; endISO: string; todayMessage: string; afterMessage: string }) {
  const state = useCountdown(startISO, endISO);

  if (state && state.phase !== "before") {
    return <p className="font-display text-3xl italic leading-tight sm:text-5xl">{state.phase === "during" ? todayMessage : afterMessage}</p>;
  }

  return (
    <div className="grid grid-cols-4 border-y border-on-primary/20" role="timer" aria-live="off">
      {UNITS.map(({ key, label, short }, i) => (
        <div key={key} className={`flex min-w-0 flex-col py-5 sm:py-7 ${i > 0 ? "border-l border-on-primary/20 pl-3 sm:pl-6" : ""}`}>
          <span className="font-display text-[2.1rem] font-light leading-none tabular-nums min-[360px]:text-4xl sm:text-6xl">{state ? pad(state.left[key]) : "--"}</span>
          <span className="mt-2 text-[11px] uppercase tracking-[0.12em] text-on-primary/70 min-[360px]:text-xs sm:tracking-[0.2em]">
            <span className="sm:hidden">{short}</span>
            <span className="hidden sm:inline">{label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
