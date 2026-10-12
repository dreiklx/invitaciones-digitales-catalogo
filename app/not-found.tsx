import type { Metadata } from "next";
import Link from "next/link";
import { catalogFonts } from "@/components/catalog/fonts";
import { catalogPalette } from "@/components/catalog/groups";
import { isCatalog } from "@/lib/invitation/active";
import { paletteStyle } from "@/lib/invitation/resolve";
import { ArrowLeftIcon } from "@/templates/shared/icons";

// Página "no encontrada" (404) en español: la de Next decía "This page could
// not be found". La usan las rutas que no existen y las que llaman a
// notFound() (p. ej. los otros diseños en la invitación de un cliente); Next
// responde con el estado HTTP 404.
// Aspecto neutro del catálogo (no la paleta de un diseño: no debe parecer
// una invitación más). En el catálogo vuelve a los diseños; en la invitación
// de un cliente lleva a su invitación (no hay catálogo ni enlaces a demos).
// Sus tipografías (las del catálogo) no se precargan: esta página está en el
// árbol de todas las rutas (ver components/catalog/fonts.ts).

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const back = isCatalog ? "Volver al catálogo" : "Ir a la invitación";
  return (
    <main className={`${catalogFonts} flex min-h-svh items-center justify-center bg-paper px-6 py-16 font-body text-ink antialiased`} style={paletteStyle(catalogPalette)}>
      <style>{`html,body{background:${catalogPalette.background}}`}</style>
      <div className="w-full max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Error 404</p>
        <h1 className="mt-5 text-balance font-display text-5xl font-light leading-[1.05] sm:text-6xl">
          Esta página <em className="font-normal">no existe</em>
        </h1>
        <span aria-hidden="true" className="mx-auto mt-7 block h-px w-16 bg-ink/25" />
        <p className="mt-7 text-base leading-relaxed text-muted sm:text-lg">
          Es posible que el enlace esté incompleto o que la página haya cambiado de dirección.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink px-7 text-sm font-semibold uppercase tracking-[0.2em] text-paper transition hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <ArrowLeftIcon size={16} />
          {back}
        </Link>
      </div>
    </main>
  );
}
