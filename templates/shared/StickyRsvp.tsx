"use client";

import { useEffect, useState } from "react";

// Barra flotante "Confirmar asistencia" (solo teléfonos y tabletas). Se
// oculta sobre el formulario (#confirmar): ahí tapaba el botón y dos
// "confirmar" a la vez confunden. También se oculta sobre el pie (<footer>):
// tapaba los nombres y la fecha del cierre. Fecha y hora en dos renglones fijos; por
// debajo de 375px solo el botón a todo lo ancho. Cada diseño la envuelve en
// <BeforeEvent> para que desaparezca cuando empieza el evento.
export default function StickyRsvp({
  date,
  time,
  barClassName,
  textClassName,
  buttonClassName,
}: {
  date: string;
  time: string;
  barClassName: string;
  textClassName: string;
  buttonClassName: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [rsvpInView, setRsvpInView] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById("confirmar");
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setRsvpInView(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !rsvpInView && !footerInView;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-[120%]"
      }`}
    >
      <div className={`mx-auto flex max-w-md items-center gap-3 p-1.5 shadow-2xl min-[375px]:pl-5 ${barClassName}`}>
        <span className={`hidden flex-shrink-0 flex-col text-sm leading-tight min-[375px]:flex ${textClassName}`}>
          <span className="whitespace-nowrap">{date}</span>
          <span className="whitespace-nowrap">{time}</span>
        </span>
        <a
          href="#confirmar"
          className={`flex min-h-12 min-w-0 flex-1 items-center justify-center px-4 py-3 text-center text-sm font-semibold uppercase leading-tight tracking-wide min-[375px]:ml-auto min-[375px]:flex-initial min-[375px]:px-5 ${buttonClassName}`}
        >
          Confirmar asistencia
        </a>
      </div>
    </div>
  );
}
