import type { ReactNode } from "react";
import { paletteStyle, type ResolvedInvitation } from "@/lib/invitation/resolve";
import BackToCatalog from "./BackToCatalog";

// Contenedor de cada diseño: aplica sus tipografías y su paleta (variables
// CSS) y, en las demos, el enlace para volver al catálogo.
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
    </div>
  );
}
