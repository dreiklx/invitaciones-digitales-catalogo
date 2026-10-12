import type { ReactNode } from "react";
import { paletteStyle, type ResolvedInvitation } from "@/lib/invitation/resolve";
import { catalogPalette } from "@/components/catalog/groups";
import DesignsMenu from "./DesignsMenu";
import { designsMenuFor } from "./designs";

// Contenedor de cada diseño: aplica sus tipografías y su paleta (variables
// CSS) y, SOLO en las demos del catálogo (`inv.isDemo`), el selector "Otros
// diseños" (DesignsMenu.tsx) y el aviso de que son demostraciones. Una
// invitación de cliente no recibe ninguna de las dos cosas: ni la lista de
// los otros diseños ni sus fotos llegan a su página.
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
  // Estilo del botón "Otros diseños" (colores del diseño).
  backClassName: string;
  children: ReactNode;
}) {
  const body = (
    <>
      {children}
      {/* Demos del catálogo: las personas o personajes de las fotos no deben
          parecer clientes ni respaldar el servicio (derechos de imagen; ver
          photo-map.md). Nunca aparece en una invitación de cliente. Su
          margen de abajo deja espacio a la barra de navegación del teléfono. */}
      {inv.isDemo ? (
        <p data-music-credit className="bg-paper px-6 pb-28 pt-6 text-center text-xs leading-relaxed text-muted lg:pb-8">
          Invitación de demostración con datos y fotos de ejemplo. Las personas o personajes que aparecen no son clientes ni respaldan ni recomiendan
          este servicio.
        </p>
      ) : (
        // Teléfono: espacio para la barra de navegación (PageNav), así el
        // final del pie nunca queda debajo de ella.
        <div aria-hidden="true" className="h-[calc(5.5rem+env(safe-area-inset-bottom))] bg-paper lg:hidden" />
      )}
    </>
  );

  const designs = designsMenuFor(inv);
  return (
    <div className={`${fontClasses} min-h-screen bg-paper font-body text-ink antialiased ${className}`} style={paletteStyle(inv.palette)}>
      {/* Fondo del documento con el color del diseño (rebote al desplazar en iPhone). */}
      <style>{`html,body{background:${inv.palette.background}}`}</style>
      {designs ? (
        <DesignsMenu groups={designs} current={inv.template} palette={paletteStyle(catalogPalette)} triggerClassName={backClassName}>
          {body}
        </DesignsMenu>
      ) : (
        body
      )}
    </div>
  );
}
