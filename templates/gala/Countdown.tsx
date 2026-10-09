"use client";

import { Fragment } from "react";
import { pad, useCountdown } from "../shared/event-phase";

const UNITS = [
  { key: "days", label: "Días", short: "Días" },
  { key: "hours", label: "Horas", short: "Horas" },
  { key: "minutes", label: "Minutos", short: "Min" },
  { key: "seconds", label: "Segundos", short: "Seg" },
] as const;

// Cifras finas de Bodoni separadas por dos puntos dorados. Ancho flexible:
// los días pueden tener tres cifras.
export default function Countdown({ startISO, endISO, todayMessage, afterMessage }: { startISO: string; endISO: string; todayMessage: string; afterMessage: string }) {
  const state = useCountdown(startISO, endISO);

  if (state && state.phase !== "before") {
    return <p className="gold-sheen text-center font-display text-3xl italic sm:text-5xl">{state.phase === "during" ? todayMessage : afterMessage}</p>;
  }

  return (
    <div className="flex items-start justify-center gap-1 min-[360px]:gap-2 sm:gap-5" role="timer" aria-live="off">
      {UNITS.map(({ key, label, short }, i) => (
        <Fragment key={key}>
          {i > 0 && <span className="pt-0.5 font-display text-2xl text-primary/70 min-[360px]:text-3xl sm:text-5xl" aria-hidden="true">:</span>}
          <div className="flex min-w-[2.6rem] flex-col items-center min-[360px]:min-w-[3.2rem] sm:min-w-28">
            <span className="font-display text-[2rem] leading-none tabular-nums text-ink min-[360px]:text-[2.6rem] sm:text-7xl">{state ? pad(state.left[key]) : "--"}</span>
            <span className="mt-3 text-[10px] uppercase tracking-[0.12em] text-muted min-[360px]:text-[11px] sm:text-xs sm:tracking-[0.3em]">
              <span className="sm:hidden">{short}</span>
              <span className="hidden sm:inline">{label}</span>
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
