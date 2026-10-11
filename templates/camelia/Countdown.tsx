"use client";

import { pad, useCountdown } from "../shared/event-phase";

// Un número gigante (días) y el resto en una línea pequeña.
export default function Countdown({ startISO, endISO, todayMessage, afterMessage }: { startISO: string; endISO: string; todayMessage: string; afterMessage: string }) {
  const state = useCountdown(startISO, endISO);

  if (state && state.phase !== "before") {
    return <p className="font-display text-[clamp(3.5rem,14vw,9rem)] italic leading-none text-primary">{state.phase === "during" ? todayMessage : afterMessage}</p>;
  }

  const left = state?.left;
  return (
    <div role="timer" aria-live="off">
      <p className="flex items-end gap-4">
        <span className="font-display text-[clamp(7rem,38vw,18rem)] italic leading-[0.8] tabular-nums text-primary">{left ? left.days : "--"}</span>
        <span className="pb-3 text-sm font-semibold uppercase tracking-[0.25em] text-muted sm:pb-6">días</span>
      </p>
      {/* Tres columnas iguales (antes una línea que se partía en 320px). */}
      <p className="mt-6 grid max-w-md grid-cols-3 border-t border-ink/15 pt-4 tabular-nums text-ink">
        {([["hours", "horas"], ["minutes", "minutos"], ["seconds", "segundos"]] as const).map(([key, label]) => (
          <span key={key} className="flex flex-col">
            <strong className="font-display text-3xl font-normal leading-none text-primary sm:text-4xl">{left ? pad(left[key]) : "--"}</strong>
            <span className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</span>
          </span>
        ))}
      </p>
    </div>
  );
}
