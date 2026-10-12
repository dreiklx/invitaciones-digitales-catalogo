// Lista de diseños para el selector "Otros diseños" (DesignsMenu.tsx).
// SOLO para las demos del catálogo: con una invitación de cliente
// (`isDemo` falso) devuelve null y Shell no monta el selector, así que la
// página del cliente no recibe nombres, fotos ni enlaces de las demos.
// Datos puros (sin componentes): lo prueba tests/unit/sections.test.ts.

import type { ResolvedInvitation } from "@/lib/invitation/resolve";
import { catalogGroups, eventLabel } from "@/components/catalog/groups";
import { templateIds, templateMetas } from "@/templates/registry";
import { demos } from "@/templates/demos";
import type { DesignGroup } from "./DesignsMenu";

export function designsMenuFor(inv: Pick<ResolvedInvitation, "isDemo">): DesignGroup[] | null {
  if (!inv.isDemo) return null;
  return catalogGroups.map((group) => ({
    title: group.title,
    designs: templateIds
      .filter((id) => group.kinds.includes(templateMetas[id].kind))
      .map((id) => {
        const meta = templateMetas[id];
        const photo = (demos[id].photos as Record<string, { src: string; position?: string }>).portada;
        return {
          id,
          number: meta.number,
          name: meta.name,
          event: eventLabel[meta.kind],
          colors: (["primary", "background", "secondary", "accent"] as const).map((k) => meta.palette[k]),
          photo: { src: photo.src, position: photo.position },
        };
      }),
  }));
}
