"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Photo } from "@/lib/invitation/types";
import { CloseIcon, ExpandIcon } from "./icons";
import { trapFocus } from "./focus-trap";
import { lockPageScroll } from "./scroll-lock";

// Visor de fotos de la galería. Cada diseño compone su galería como quiera
// y envuelve cada foto en <LightboxItem index={i}>. Botón "Cerrar" con
// texto (no una ✕ suelta) y sin anterior/siguiente: más claro para
// personas mayores. Escape cierra; el foco vuelve a la foto tocada y la
// página queda donde estaba.
// Encima de la galería, una línea dice que las fotos se abren (en el
// teléfono no hay cursor de lupa que lo sugiera); `hintClassName` la alinea
// con el diseño.

const LightboxContext = createContext<(index: number, from: HTMLElement) => void>(() => {});

export function LightboxProvider({
  photos,
  overlayClassName,
  closeClassName,
  hintClassName = "justify-center",
  hint = true,
  children,
}: {
  photos: Photo[];
  overlayClassName: string;
  closeClassName: string;
  hintClassName?: string;
  // false: el diseño pone <GalleryHint> en otro lugar (Olivo, junto al título).
  hint?: boolean;
  children: ReactNode;
}) {
  const [active, setActive] = useState<number | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setActive(null);
    // Sin desplazar: si la foto es más alta que la pantalla (o está a medio
    // aparecer), focus() movía la página al cerrar el visor.
    returnFocus.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const unlock = lockPageScroll(overlayRef.current);
    const release = trapFocus(overlayRef.current);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
      release();
    };
  }, [active, close]);

  const openAt = useCallback((index: number, from: HTMLElement) => {
    returnFocus.current = from;
    setActive(index);
  }, []);

  return (
    <LightboxContext.Provider value={openAt}>
      {hint && <GalleryHint className={`mt-6 sm:mt-8 ${hintClassName}`} />}
      {children}
      {/* Teléfono: la foto empieza debajo de "Cerrar" (antes podía quedar
          tapada en pantallas bajas) y todo respeta la zona segura. z-85:
          por encima de "Otros diseños" (z-80, demos), que antes flotaba
          sobre la foto. */}
      {active !== null && (
        <div ref={overlayRef} className={`fixed inset-0 z-[85] flex items-center justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(max(1rem,env(safe-area-inset-top))+4rem)] sm:p-10 ${overlayClassName}`} onClick={close} role="dialog" aria-modal="true" aria-label={photos[active].alt}>
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

// "Toca una foto para verla en grande" ("Haz clic…" con mouse).
export function GalleryHint({ className = "" }: { className?: string }) {
  return (
    <p data-gallery-hint className={`flex items-center gap-2 text-sm font-medium ${className}`}>
      <ExpandIcon size={16} className="shrink-0" />
      <span className="pointer-fine:hidden">Toca una foto para verla en grande.</span>
      <span className="hidden pointer-fine:inline">Haz clic en una foto para verla en grande.</span>
    </p>
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
