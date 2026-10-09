"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Photo } from "@/lib/invitation/types";
import { CloseIcon } from "./icons";

// Visor de fotos de la galería. Cada diseño compone su galería como quiera
// y envuelve cada foto en <LightboxItem index={i}>. Botón "Cerrar" con
// texto (no una ✕ suelta) y sin anterior/siguiente: más claro para
// personas mayores. Escape cierra; el foco vuelve a la foto tocada.

const LightboxContext = createContext<(index: number, from: HTMLElement) => void>(() => {});

export function LightboxProvider({
  photos,
  overlayClassName,
  closeClassName,
  children,
}: {
  photos: Photo[];
  overlayClassName: string;
  closeClassName: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setActive(null);
    returnFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active, close]);

  const openAt = useCallback((index: number, from: HTMLElement) => {
    returnFocus.current = from;
    setActive(index);
  }, []);

  return (
    <LightboxContext.Provider value={openAt}>
      {children}
      {/* Teléfono: la foto empieza debajo de "Cerrar" (antes podía quedar
          tapada en pantallas bajas) y todo respeta la zona segura. */}
      {active !== null && (
        <div className={`fixed inset-0 z-[60] flex items-center justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(max(1rem,env(safe-area-inset-top))+4rem)] sm:p-10 ${overlayClassName}`} onClick={close} role="dialog" aria-modal="true" aria-label={photos[active].alt}>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className={`absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-12 items-center gap-2 rounded-full px-5 text-base font-semibold shadow-lg transition sm:right-8 sm:top-8 ${closeClassName}`}
          >
            <CloseIcon />
            Cerrar
          </button>
          <div className="relative h-full max-h-[78vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[active].src} alt={photos[active].alt} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

export function LightboxItem({
  index,
  label,
  className = "",
  children,
}: {
  index: number;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const openAt = useContext(LightboxContext);
  return (
    <button type="button" onClick={(e) => openAt(index, e.currentTarget)} aria-label={`Ver en grande: ${label}`} className={`block w-full cursor-zoom-in ${className}`}>
      {children}
    </button>
  );
}
