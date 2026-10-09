"use client";

import { createContext, useContext, useEffect, useState, ViewTransition, type ReactNode } from "react";
import { startMusicFromGesture } from "./music-start";

// Portada "Abrir invitación". Cada diseño dibuja su propia portada (`cover`)
// y este componente pone la lógica común:
// - Bloquea la página (`inert` + overflow hidden) hasta que se toca el botón.
// - Su botón INICIA LA MÚSICA: llama a startMusicFromGesture() de forma
//   síncrona dentro del clic (los navegadores solo permiten play() dentro
//   del gesto real). Sin música no hace nada más que abrir.
// - Salida: fade + scale 700ms y se desmonta; respeta prefers-reduced-motion.
//   El scale va en un hijo, NUNCA en la capa fija: escalada, la capa fija
//   sobresalía 4-6 px por cada lado de la pantalla durante la animación y
//   en Safari (iPhone) eso basta para que la página se mueva de lado.
// - `transitionName`: la tarjeta del catálogo con el mismo nombre se
//   transforma en esta portada al navegar (View Transitions).

const EXIT_MS = 700;

type Phase = "gate" | "closing" | "closed";

const GateContext = createContext<{ open: () => void; phase: Phase }>({ open: () => {}, phase: "closed" });

export function useGate() {
  return useContext(GateContext);
}

export default function Gate({
  cover,
  className = "",
  transitionName,
  children,
}: {
  cover: ReactNode;
  className?: string;
  transitionName?: string;
  children: ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("gate");

  useEffect(() => {
    if (phase === "closed") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  const open = () => {
    if (phase !== "gate") return;
    // Primero la música, en este mismo clic; después el cambio de estado.
    startMusicFromGesture();
    setPhase("closing");
    window.setTimeout(() => setPhase("closed"), EXIT_MS);
  };

  const overlay = (
    <div
      aria-hidden={phase === "closing"}
      className={`fixed inset-0 z-[70] overflow-hidden transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        phase === "closing" ? "pointer-events-none opacity-0" : "opacity-100"
      } ${className}`}
    >
      <div
        className={`h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          phase === "closing" ? "scale-[1.03]" : ""
        }`}
      >
        {cover}
      </div>
    </div>
  );

  return (
    <GateContext.Provider value={{ open, phase }}>
      {phase !== "closed" &&
        (transitionName ? (
          <ViewTransition name={transitionName} share="cover-morph" default="none">
            {overlay}
          </ViewTransition>
        ) : (
          overlay
        ))}
      <div inert={phase !== "closed" ? true : undefined}>{children}</div>
    </GateContext.Provider>
  );
}

// Botón "Abrir invitación" (dentro de la portada de cada diseño).
// Mínimo 48px de alto y una sola línea: es el primer botón que ve cualquier
// invitado, incluidas personas mayores.
export function GateButton({ className = "", children }: { className?: string; children: ReactNode }) {
  const { open, phase } = useGate();
  return (
    <button
      type="button"
      onClick={open}
      disabled={phase !== "gate"}
      className={`min-h-12 whitespace-nowrap disabled:cursor-default ${className}`}
    >
      {children}
    </button>
  );
}
