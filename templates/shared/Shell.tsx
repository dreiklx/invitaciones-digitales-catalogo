import type { ReactNode } from "react";
import { paletteStyle, type ResolvedInvitation } from "@/lib/invitation/resolve";
import BackToCatalog from "./BackToCatalog";

// Contenedor de cada diseño: aplica sus tipografías y su paleta (variables
// CSS) y, en las demos, el enlace para volver al catálogo y el aviso de
// que son demostraciones.
export default function Shell({
  inv,
  fontClasses,
  className = "",
  backClassName,
  children,
}: {
  inv: ResolvedInvitation;
  fontClasses: string;
  className?: string;
  backClassName: string;
  children: ReactNode;
}) {
  return (
    <div className={`${fontClasses} min-h-screen bg-paper font-body text-ink antialiased ${className}`} style={paletteStyle(inv.palette)}>
      {/* Fondo del documento con el color del diseño (rebote al desplazar en iPhone). */}
      <style>{`html,body{background:${inv.palette.background}}`}</style>
      {inv.isDemo && <BackToCatalog className={backClassName} />}
      {children}
      {/* Demos del catálogo: las personas o personajes de las fotos no deben
          parecer clientes ni respaldar el servicio (derechos de imagen; ver
          photo-map.md). Nunca aparece en una invitación de cliente. */}
      {inv.isDemo && (
        <p data-music-credit className="bg-paper px-6 pb-28 pt-6 text-center text-xs leading-relaxed text-muted lg:pb-8">
          Invitación de demostración con datos y fotos de ejemplo. Las personas o personajes que aparecen no son clientes ni respaldan ni recomiendan
          este servicio.
        </p>
      )}
    </div>
  );
}
