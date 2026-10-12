"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, GridIcon } from "./icons";
import { trapFocus } from "./focus-trap";
import { lockPageScroll } from "./scroll-lock";

// "Otros diseños": SOLO en las demos del catálogo (Shell.tsx lo monta
// cuando `inv.isDemo`; una invitación de cliente nunca lo recibe y, además,
// en el proyecto de un cliente las rutas de los otros diseños dan 404).
// - Botón fijo arriba a la izquierda (donde estaba "← Diseños"): se aparta
//   al bajar y vuelve al subir, como antes. Es la navegación ENTRE diseños;
//   la de las secciones de la invitación es PageNav.tsx (abajo en el
//   teléfono, arriba a la derecha en escritorio).
// - Abre un panel con los ocho diseños por categoría (Bodas, Quinceaños,
//   Bebés, Aniversarios), cada uno con la foto de su portada, número,
//   nombre, tipo de evento y colores; marca el que se está viendo, y lleva
//   al catálogo completo. Usa la paleta neutra del catálogo (no la del
//   diseño abierto) para que se note que es otra cosa.
// - Los datos (pocos campos por diseño) los arma Shell en el servidor.

export type DesignCard = {
  id: string;
  number: string;
  name: string;
  event: string;
  colors: string[];
  photo: { src: string; position?: string };
};

export type DesignGroup = { title: string; designs: DesignCard[] };

const DesignsContext = createContext<{ open: () => void } | null>(null);

// null = no es una demo (no hay selector de diseños).
export function useDesignsMenu() {
  return useContext(DesignsContext);
}

export default function DesignsMenu({
  groups,
  current,
  palette,
  triggerClassName,
  children,
}: {
  groups: DesignGroup[];
  current: string;
  // Variables CSS de la paleta neutra del catálogo (paletteStyle).
  palette: CSSProperties;
  triggerClassName: string;
  children: ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const openFrom = useRef<HTMLElement | null>(null);

  // Se aparta al bajar y vuelve al subir (o arriba del todo).
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = useCallback(() => {
    openFrom.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    (openFrom.current ?? triggerRef.current)?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const unlock = lockPageScroll(layerRef.current);
    const release = trapFocus(layerRef.current);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
      release();
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <DesignsContext.Provider value={value}>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Otros diseños"
        data-designs-trigger
        className={`fixed left-3 top-3 z-[80] inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-md transition duration-300 sm:left-5 sm:top-5 ${
          hidden && !isOpen ? "pointer-events-none -translate-y-16 opacity-0 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100" : "translate-y-0 opacity-100"
        } ${triggerClassName}`}
      >
        <GridIcon size={16} />
        {/* Angosto: "Diseños" (con "Otros" chocaba con el aviso de la música
            a 320–390 px); el nombre accesible es siempre "Otros diseños". */}
        <span className="min-[400px]:hidden">Diseños</span>
        <span className="hidden min-[400px]:inline">Otros diseños</span>
      </button>

      {children}

      {isOpen && (
        <div ref={layerRef} className="fixed inset-0 z-[90] flex justify-center sm:items-center sm:p-6" style={palette}>
          <div aria-hidden="true" className="absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={close} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-designs-menu
            className="relative flex h-full w-full flex-col bg-paper text-ink shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-5xl sm:rounded-[1.75rem]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 pb-3 pt-[max(env(safe-area-inset-top),0.75rem)] sm:px-8 sm:py-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">Catálogo de demostración</p>
                <h2 id={titleId} className="font-display text-2xl leading-tight sm:text-3xl">
                  Otros diseños
                </h2>
              </div>
              <button ref={closeRef} type="button" onClick={close} className="flex min-h-12 flex-shrink-0 items-center gap-2 rounded-full border border-line px-4 text-base font-semibold hover:bg-surface">
                <CloseIcon size={18} />
                Cerrar
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-6 sm:px-8">
              {groups.map((group) => (
                <section key={group.title} className="pt-6" aria-label={group.title}>
                  <h3 className="border-b-2 border-ink pb-2 font-display text-xl">{group.title}</h3>
                  <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.designs.map((d) => {
                      const here = d.id === current;
                      const body = (
                        <>
                          <span className="relative h-24 w-[4.5rem] flex-shrink-0 overflow-hidden rounded-md bg-surface">
                            <Image src={d.photo.src} alt="" fill sizes="72px" className="object-cover" style={{ objectPosition: d.photo.position }} />
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{d.event}</span>
                            {/* Con la letra del sistema agrandada a 320 px, "Aguamarina"
                                salía de la tarjeta: el nombre (una palabra que no se parte)
                                tiene tope en vw y el número puede pasar arriba. */}
                            <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                              <span className="font-display text-base italic text-muted">{d.number}</span>
                              <span className="font-display text-[min(1.5rem,7vw)] leading-tight">{d.name}</span>
                            </span>
                            <span className="mt-1.5 flex" aria-hidden="true">
                              {d.colors.map((c, i) => (
                                <span key={i} className="-mr-1 h-4 w-4 rounded-full border border-paper ring-1 ring-ink/15" style={{ background: c }} />
                              ))}
                            </span>
                            <span className={`mt-2 inline-flex items-center gap-1.5 text-sm font-semibold ${here ? "text-muted" : "text-ink"}`}>
                              {here ? "Estás viendo este diseño" : <>Abrir {d.name} <ArrowRightIcon size={14} /></>}
                            </span>
                          </span>
                        </>
                      );
                      const box = "flex h-full items-center gap-4 rounded-xl border p-3";
                      return (
                        <li key={d.id}>
                          {here ? (
                            <div aria-current="page" className={`${box} border-ink bg-surface`}>
                              {body}
                            </div>
                          ) : (
                            <Link href={`/plantillas/${d.id}`} onClick={() => setOpen(false)} className={`${box} border-line transition hover:border-ink/50 hover:bg-surface`}>
                              {body}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>

            <div className="border-t border-line px-5 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:px-8 sm:py-4">
              <Link href="/#disenos" transitionTypes={["nav-back"]} className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] underline-offset-4 hover:underline">
                <ArrowLeftIcon size={16} />
                Volver al catálogo completo
              </Link>
            </div>
          </div>
        </div>
      )}
    </DesignsContext.Provider>
  );
}
