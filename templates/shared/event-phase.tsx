"use client";

import { useEffect, useState, type ReactNode } from "react";

// Antes / durante / después del evento. La página es estática, así que esto
// solo se puede saber en el navegador: el primer render (servidor) asume
// "antes" y después de montar se corrige con el reloj del visitante.

export type EventPhase = "before" | "during" | "after";

export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function phaseAt(now: number, startISO: string, endISO: string): EventPhase {
  if (now < Date.parse(startISO)) return "before";
  if (now < Date.parse(endISO)) return "during";
  return "after";
}

function timeLeftAt(now: number, startISO: string): TimeLeft {
  const diff = Math.max(Date.parse(startISO) - now, 0);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// null hasta montar (el servidor y el primer render coinciden en "--").
export function useCountdown(startISO: string, endISO: string): { phase: EventPhase; left: TimeLeft } | null {
  const [state, setState] = useState<{ phase: EventPhase; left: TimeLeft } | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      setState({ phase: phaseAt(now, startISO, endISO), left: timeLeftAt(now, startISO) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startISO, endISO]);
  return state;
}

export function useEventPhase(startISO: string, endISO: string): EventPhase {
  const [phase, setPhase] = useState<EventPhase>("before");
  useEffect(() => {
    const update = () => setPhase(phaseAt(Date.now(), startISO, endISO));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [startISO, endISO]);
  return phase;
}

// Muestra su contenido solo antes de que empiece el evento (la
// confirmación; la barra de navegación deja de ofrecerla al no encontrarla).
// Después ya no tiene sentido pedir confirmación.
export function BeforeEvent({ startISO, endISO, children }: { startISO: string; endISO: string; children: ReactNode }) {
  const phase = useEventPhase(startISO, endISO);
  return phase === "before" ? <>{children}</> : null;
}

export function pad(value: number): string {
  return String(value).padStart(2, "0");
}
