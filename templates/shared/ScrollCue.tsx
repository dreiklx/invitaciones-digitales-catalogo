"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "./icons";

// Indicador para seguir leyendo. Existe porque en pruebas reales una
// persona mayor no se dio cuenta de que había más abajo.
//
// Hasta el 2026-10-12 decía "Desliza hacia abajo" con una flecha hacia
// abajo: describía hacia dónde está el contenido, pero muchas personas lo
// leían como el gesto y arrastraban el dedo hacia abajo (la página no
// avanza o vuelve atrás). Ahora dice el GESTO, y depende del dispositivo:
// - Pantalla táctil: "Desliza hacia arriba" y una mano que sube. El dedo y
//   el contenido suben juntos, así que se entiende igual de las dos formas.
// - Mouse o trackpad (`pointer-fine:`): "Desplázate hacia abajo" con la
//   flecha hacia abajo (la rueda y la barra van hacia abajo).
// Texto y animación dicen lo mismo; con "reducir movimiento" la mano queda
// quieta y la flecha sobre ella sigue indicando la dirección.
// Tocarlo también avanza a la sección siguiente (para quien lo toca en vez
// de deslizar) y se desvanece al desplazarse.
// Flecha ARRIBA y texto abajo: así el texto queda por debajo del botón de
// música en 320px. En teléfonos bajos (`short:`) icono y texto van en una
// fila: ocupa ~45 px menos de alto con el mismo tamaño de letra.
// `stacked` lo deja siempre en columna (Tierra: va dentro de una foto angosta).
// Escritorio (lg): varias portadas son más altas que la pantalla y el
// indicador quedaba fuera de la vista; ahí es `sticky` al pie de la pantalla
// (sobre una pastilla con el fondo del diseño, que pasa cada diseño en
// `className`) hasta que llega a su lugar. El contenedor no puede ser
// `overflow-hidden` en lg (usar `lg:overflow-clip`): sticky dejaría de
// funcionar.
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
      data-scroll-cue
      className={`flex flex-col items-center gap-2.5 rounded-2xl px-2 py-2 min-[360px]:px-5 lg:sticky lg:bottom-5 lg:z-10 lg:w-fit lg:flex-row lg:gap-3 lg:rounded-full lg:py-1.5 lg:pl-1.5 lg:pr-6 lg:backdrop-blur-sm ${stacked ? "" : "short:flex-row short:gap-3 short:py-0"} transition-opacity duration-500 ${hidden ? "pointer-events-none opacity-0" : "opacity-100"} ${className}`}
    >
      <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 ${circleClassName}`}>
        <SwipeUpIcon className="scroll-cue-swipe pointer-fine:hidden" />
        <ArrowDownIcon className="scroll-cue-arrow hidden pointer-fine:block" />
      </span>
      <span className={`text-balance text-center text-sm font-semibold uppercase tracking-[0.14em] min-[360px]:tracking-[0.22em] ${stacked ? "" : "short:tracking-[0.1em]!"}`}>
        <span className="pointer-fine:hidden">Desliza hacia arriba</span>
        <span className="hidden pointer-fine:inline">Desplázate hacia abajo</span>
      </span>
    </button>
  );
}

// Mano con el índice extendido y una flecha hacia arriba encima: el gesto
// de deslizar el dedo hacia arriba. La animación (globals.css) la sube.
function SwipeUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M8 4.2 10.5 1.7 13 4.2" />
      <path d="M10.5 13V8.2a1.4 1.4 0 0 1 2.8 0v5" />
      <path d="M13.3 12.4a1.4 1.4 0 0 1 2.8 0v1.2" />
      <path d="M16.1 13.2a1.4 1.4 0 0 1 2.8 0v2.6a6 6 0 0 1-6 6h-.7a5.6 5.6 0 0 1-4.3-2l-3-3.6a1.3 1.3 0 0 1 1.9-1.8l2.3 2.2" />
    </svg>
  );
}
