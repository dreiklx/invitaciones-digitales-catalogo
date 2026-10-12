"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowUpIcon, ChevronDownIcon, CloseIcon, GridIcon, MenuIcon } from "./icons";
import { lockPageScroll } from "./scroll-lock";
import { useDesignsMenu } from "./DesignsMenu";

// Barra de navegación de la invitación (y del catálogo). Una sola lógica;
// el aspecto lo pone cada diseño con `styles` (tokens de su paleta).
// - Teléfono (< lg): barra fija ABAJO, al alcance del pulgar, con tres
//   botones con texto: "Inicio" (vuelve a la portada), "Secciones" (abre un
//   panel con todas las secciones) y "Confirmar" (si hay confirmación).
//   Reemplaza a la antigua barra "Confirmar asistencia" (StickyRsvp).
// - Escritorio (lg): una pastilla arriba a la derecha con "Inicio", la
//   sección actual con su menú desplegable y "Confirmar asistencia". No es
//   la barra del teléfono estirada: arriba a la izquierda queda "Otros
//   diseños" (solo demos, DesignsMenu.tsx) y abajo a la derecha la música.
// - Aparece cuando la persona empieza a bajar (> 60 px, cuando se apaga el
//   indicador "Desliza hacia arriba"): así nunca lo tapa y la portada se ve
//   entera. En el teléfono se aparta mientras se escribe en un campo (el
//   teclado la subiría sobre el formulario) y mientras el formulario de
//   confirmación pasa por debajo de ella (tapaba "Confirmar por WhatsApp");
//   vuelve al salir. El visor de fotos la cubre.
// - Secciones: `navSections()` (lib/invitation/sections.ts) dice cuáles
//   existen según la configuración; aquí se descartan las que no están en
//   la página (p. ej. la confirmación después del evento) y se ordenan
//   como aparecen. Al elegir una, la página baja suave (sin animación con
//   "reducir movimiento") hasta dejar su título visible, y el foco pasa a
//   la sección (teclado y lectores de pantalla).

export type NavStyles = {
  // Fondo, borde, sombra y forma de la barra (y de la pastilla de escritorio).
  bar: string;
  // Botones secundarios sobre la barra ("Inicio", "Secciones").
  item: string;
  // Botón principal ("Confirmar").
  primary: string;
  // Tipografía de los nombres de sección en el panel (p. ej. "font-display").
  panelFont?: string;
};

type Item = { id: string; label: string };

const SHOW_AFTER = 60;

export default function PageNav({
  sections,
  styles,
  rsvpId = "confirmar",
  menuLabel = "Secciones",
  panelTitle = "Ir a una sección",
  ariaLabel = "Secciones de la invitación",
}: {
  sections: Item[];
  styles: NavStyles;
  rsvpId?: string;
  menuLabel?: string;
  panelTitle?: string;
  ariaLabel?: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(false);
  // Teléfono: el formulario de confirmación está justo debajo de la barra.
  const [overForm, setOverForm] = useState(false);
  const [open, setOpen] = useState<"sheet" | "dropdown" | null>(null);
  const designs = useDesignsMenu();
  const panelId = useId();
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Secciones que de verdad están en la página, en su orden.
  const refresh = useCallback(() => {
    const found = sections
      .map((s) => ({ ...s, el: document.getElementById(s.id) }))
      .filter((s): s is Item & { el: HTMLElement } => !!s.el)
      .sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    setItems((prev) => (prev.length === found.length && prev.every((p, i) => p.id === found[i].id) ? prev : found.map(({ id, label }) => ({ id, label }))));
    // Sección actual: la última cuyo comienzo ya pasó el tercio superior.
    const line = window.innerHeight * 0.35;
    let now: string | null = null;
    for (const s of found) if (s.el.getBoundingClientRect().top <= line) now = s.id;
    setCurrent(now);
    setVisible(window.scrollY > SHOW_AFTER);
    // La franja de abajo (donde va la barra del teléfono) muestra el
    // formulario: la barra se aparta para no tapar "Confirmar por WhatsApp"
    // y vuelve al salir de él.
    const form = document.getElementById(rsvpId)?.getBoundingClientRect();
    setOverForm(!!form && form.top < window.innerHeight - 40 && form.bottom > window.innerHeight - 120);
  }, [sections, rsvpId]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(refresh);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [refresh]);

  // Escribiendo en un campo: la barra se aparta (teclado del teléfono).
  useEffect(() => {
    const isField = (el: EventTarget | null) => el instanceof HTMLElement && el.matches("input:not([type=checkbox]):not([type=radio]), textarea, select");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  // Panel del teléfono: bloquea la página, Escape cierra, foco en "Cerrar".
  useEffect(() => {
    if (open !== "sheet") return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const unlock = lockPageScroll(sheetRef.current);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
    };
  }, [open, close]);

  // Menú de escritorio: Escape o un clic fuera lo cierran.
  useEffect(() => {
    if (open !== "dropdown") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, close]);

  const go = (id: string | null) => {
    setOpen(null);
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Se espera un cuadro: el panel cerrado devuelve el desplazamiento.
    requestAnimationFrame(() => {
      if (!id) {
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      // Escritorio: la pastilla de arriba ocupa ~5 rem; teléfono: aire mínimo.
      const offset = window.innerWidth >= 1024 ? 88 : 12;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: smooth ? "smooth" : "auto" });
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    });
  };

  const hasRsvp = items.some((i) => i.id === rsvpId);
  const inRsvp = current === rsvpId;
  const shown = visible && !typing;
  const barShown = shown && !overForm;
  const currentLabel = items.find((i) => i.id === current)?.label ?? "Inicio";

  const list = (onPick: (id: string | null) => void, big: boolean) => (
    <ul className={big ? "divide-y divide-line" : "py-1"}>
      {[{ id: "", label: "Inicio" }, ...items].map((item) => {
        const active = (item.id || null) === current;
        return (
          <li key={item.id || "inicio"}>
            <button
              type="button"
              onClick={() => onPick(item.id || null)}
              aria-current={active ? "location" : undefined}
              data-nav-item={item.id || "inicio"}
              className={`flex w-full items-center justify-between gap-3 text-left transition hover:bg-surface focus-visible:bg-surface ${
                big ? `min-h-14 px-6 py-3 text-lg ${styles.panelFont ?? ""}` : "min-h-11 px-4 py-2 text-[15px]"
              } ${active ? "font-semibold text-primary" : "text-ink"}`}
            >
              <span className="flex items-center gap-3">
                <span aria-hidden="true" className={`h-2 w-2 flex-shrink-0 rounded-full ${active ? "bg-primary" : "bg-line"}`} />
                {item.label}
              </span>
              {active && <span className="flex-shrink-0 font-body text-xs font-medium uppercase tracking-[0.15em] text-muted">Estás aquí</span>}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* ─── Teléfono: barra inferior ─────────────────────────────────── */}
      <nav
        aria-label={ariaLabel}
        data-page-nav="bar"
        className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 transition duration-300 motion-reduce:transition-none lg:hidden ${
          barShown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0"
        }`}
        aria-hidden={!barShown}
        inert={!barShown ? true : undefined}
      >
        <div className={`mx-auto flex max-w-md items-stretch gap-1 p-1.5 shadow-2xl ${styles.bar}`}>
          <button type="button" onClick={() => go(null)} className={`flex min-h-12 flex-shrink-0 items-center justify-center gap-1.5 rounded-[inherit] px-3 text-sm font-semibold ${styles.item}`}>
            <ArrowUpIcon size={18} className="shrink-0" />
            Inicio
          </button>
          <button
            type="button"
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              refresh();
              setOpen("sheet");
            }}
            aria-expanded={open === "sheet"}
            aria-controls={panelId}
            aria-haspopup="dialog"
            className={`flex min-h-12 items-center justify-center gap-1.5 rounded-[inherit] px-3 text-sm font-semibold ${hasRsvp && !inRsvp ? "flex-shrink-0" : "flex-1"} ${styles.item}`}
          >
            <MenuIcon size={18} className="shrink-0" />
            {menuLabel}
          </button>
          {hasRsvp && !inRsvp && (
            <button type="button" onClick={() => go(rsvpId)} className={`flex min-h-12 min-w-0 flex-1 items-center justify-center px-3 text-center text-sm font-semibold leading-tight ${styles.primary}`}>
              Confirmar
            </button>
          )}
        </div>
      </nav>

      {/* Panel del teléfono con todas las secciones. */}
      {open === "sheet" && (
        <div ref={sheetRef} className="fixed inset-0 z-[65] flex flex-col justify-end lg:hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]" onClick={close} />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            data-page-nav="sheet"
            className="relative max-h-[85svh] overflow-y-auto rounded-t-[1.75rem] bg-paper pb-[max(env(safe-area-inset-bottom),1rem)] text-ink shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-paper px-6 py-3">
              <h2 id={titleId} className="font-display text-2xl leading-tight">
                {panelTitle}
              </h2>
              <button ref={closeRef} type="button" onClick={close} className="flex min-h-12 items-center gap-2 rounded-full border border-line px-4 text-base font-semibold">
                <CloseIcon size={18} />
                Cerrar
              </button>
            </div>
            {list(go, true)}
            {designs && (
              // Solo demos del catálogo: separado de las secciones de ESTA
              // invitación para que se entienda que lleva a otro diseño.
              <div className="mx-6 mt-2 border-t-2 border-line pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Demostración</p>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(null);
                    designs.open();
                  }}
                  className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-ink/70 px-5 text-base font-semibold"
                >
                  <GridIcon size={18} />
                  Ver otros diseños
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Escritorio: pastilla arriba a la derecha ─────────────────── */}
      <div
        ref={dropdownRef}
        data-page-nav="desktop"
        className={`fixed right-5 top-5 z-40 hidden transition duration-300 motion-reduce:transition-none lg:block ${
          shown || open === "dropdown" ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
        }`}
        inert={!(shown || open === "dropdown") ? true : undefined}
      >
        <nav aria-label={ariaLabel} className={`flex items-center gap-1 p-1 shadow-xl ${styles.bar}`}>
          <button type="button" onClick={() => go(null)} className={`flex min-h-11 items-center gap-1.5 rounded-[inherit] px-3.5 text-sm font-semibold ${styles.item}`}>
            <ArrowUpIcon size={16} />
            Inicio
          </button>
          <button
            type="button"
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              refresh();
              setOpen(open === "dropdown" ? null : "dropdown");
            }}
            aria-expanded={open === "dropdown"}
            aria-controls={`${panelId}-menu`}
            className={`flex min-h-11 max-w-[17rem] items-center gap-2 rounded-[inherit] px-3.5 text-sm font-semibold ${styles.item}`}
          >
            <MenuIcon size={16} className="shrink-0" />
            <span className="truncate">
              {menuLabel}
              <span className="font-normal opacity-80">: {currentLabel}</span>
            </span>
            <ChevronDownIcon size={16} className={`shrink-0 transition-transform ${open === "dropdown" ? "rotate-180" : ""}`} />
          </button>
          {hasRsvp && !inRsvp && (
            <button type="button" onClick={() => go(rsvpId)} className={`flex min-h-11 items-center px-5 text-sm font-semibold ${styles.primary}`}>
              Confirmar asistencia
            </button>
          )}
        </nav>
        {open === "dropdown" && (
          <div id={`${panelId}-menu`} data-page-nav="dropdown" className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-2xl bg-paper text-ink shadow-2xl ring-1 ring-line">
            <p className="border-b border-line px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">{panelTitle}</p>
            {list(go, false)}
          </div>
        )}
      </div>
    </>
  );
}
