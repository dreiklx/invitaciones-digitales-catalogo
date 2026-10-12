"use client";

import { pad, useCountdown } from "../shared/event-phase";

const UNITS = [
  { key: "days", label: "días", tone: "bg-paper" },
  { key: "hours", label: "horas", tone: "bg-secondary/35" },
  { key: "minutes", label: "minutos", tone: "bg-paper" },
  { key: "seconds", label: "segundos", tone: "bg-accent/15" },
] as const;

// Cuatro sellos redondos con borde de puntada, en tonos suaves alternados.
export default function Countdown({ startISO, endISO, todayMessage, afterMessage }: { startISO: string; endISO: string; todayMessage: string; afterMessage: string }) {
  const state = useCountdown(startISO, endISO);

  if (state && state.phase !== "before") {
    return <p className="mx-auto max-w-md rounded-full border-2 border-dashed border-primary/50 px-8 py-6 text-center font-display text-3xl text-primary">{state.phase === "during" ? todayMessage : afterMessage}</p>;
  }

  return (
    <div className="mx-auto grid max-w-[17.5rem] grid-cols-2 gap-4 sm:max-w-3xl sm:grid-cols-4 sm:gap-6" role="timer" aria-live="off">
      {UNITS.map(({ key, label, tone }, i) => (
        <div key={key} className={`flex aspect-square flex-col items-center justify-center rounded-full border-2 border-dashed border-primary/40 ${tone} ${i % 2 ? "rotate-3" : "-rotate-2"}`}>
          <span className="font-display text-4xl leading-none tabular-nums text-primary sm:text-5xl">{state ? pad(state.left[key]) : "--"}</span>
          <span className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}
