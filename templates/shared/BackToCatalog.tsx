"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "./icons";

// Enlace para volver al catálogo. Solo aparece en las demos
// (/plantillas/<diseño>), nunca en la invitación de un cliente. Va por
// encima de la portada para poder salir sin abrir la invitación.
// Se esconde al bajar y vuelve al subir (o arriba del todo): fijo todo el
// tiempo tapaba títulos y fotos en el teléfono.
export default function BackToCatalog({ className }: { className: string }) {
  const [hidden, setHidden] = useState(false);

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

  return (
    <Link
      href="/#disenos"
      transitionTypes={["nav-back"]}
      className={`fixed left-3 top-3 z-[80] inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md transition duration-300 sm:left-5 sm:top-5 ${
        hidden ? "pointer-events-none -translate-y-16 opacity-0 focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100" : "translate-y-0 opacity-100"
      } ${className}`}
    >
      <ArrowLeftIcon size={16} />
      Diseños
    </Link>
  );
}
