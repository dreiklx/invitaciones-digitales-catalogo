"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "./icons";

// "Desliza hacia abajo": existe porque en pruebas reales una persona mayor no
// se dio cuenta de que tenía que deslizar. Dice la acción con palabras, se
// desvanece al desplazarse y tocarla avanza a la sección siguiente.
// Flecha ARRIBA y texto abajo: así el texto queda por debajo del botón de
// música en 320px. En teléfonos bajos (`short:`) flecha y texto van en una
// fila: ocupa ~45 px menos de alto con el mismo tamaño de letra y de flecha.
// `stacked` lo deja siempre en columna (Tierra: va dentro de una foto angosta).
export default function ScrollCue({ className = "", circleClassName = "", stacked = false }: { className?: string; circleClassName?: string; stacked?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const next = () => ref.current?.closest("section")?.nextElementSibling?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <button
      ref={ref}
      type="button"
      onClick={next}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      className={`flex flex-col items-center gap-2.5 rounded-2xl px-2 py-2 min-[360px]:px-5 ${stacked ? "" : "short:flex-row short:gap-3 short:py-0"} transition-opacity duration-500 ${hidden ? "pointer-events-none opacity-0" : "opacity-100"} ${className}`}
    >
      <span className={`scroll-cue-arrow flex h-11 w-11 items-center justify-center rounded-full border-2 ${circleClassName}`}>
        <ArrowDownIcon />
      </span>
      <span className={`text-balance text-center text-sm font-semibold uppercase tracking-[0.14em] min-[360px]:tracking-[0.22em] ${stacked ? "" : "short:tracking-[0.1em]!"}`}>Desliza hacia abajo</span>
    </button>
  );
}
