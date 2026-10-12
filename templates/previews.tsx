// Miniaturas de los diseños para el catálogo, con sus tipografías (desde
// preview-fonts.ts, sin precarga: no desde los fonts.ts de cada diseño, que
// solo debe importar su propia página).
// No importa las páginas completas (eso lo hace cada carpeta de
// app/plantillas/), así el catálogo no carga el código de las invitaciones.

import type { ComponentType } from "react";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";
import type { TemplateId } from "@/lib/invitation/types";
import OlivoPreview from "./olivo/Preview";
import TierraPreview from "./tierra/Preview";
import GalaPreview from "./gala/Preview";
import AuroraPreview from "./aurora/Preview";
import AguamarinaPreview from "./aguamarina/Preview";
import ArrulloPreview from "./arrullo/Preview";
import RivieraPreview from "./riviera/Preview";
import NubePreview from "./nube/Preview";
import { previewFontClasses as f } from "./preview-fonts";

export const templatePreviews: Record<TemplateId, { Preview: ComponentType<{ inv: ResolvedInvitation }>; fontClasses: string }> = {
  olivo: { Preview: OlivoPreview, fontClasses: f.olivo },
  tierra: { Preview: TierraPreview, fontClasses: f.tierra },
  gala: { Preview: GalaPreview, fontClasses: f.gala },
  aurora: { Preview: AuroraPreview, fontClasses: f.aurora },
  aguamarina: { Preview: AguamarinaPreview, fontClasses: f.aguamarina },
  arrullo: { Preview: ArrulloPreview, fontClasses: f.arrullo },
  riviera: { Preview: RivieraPreview, fontClasses: f.riviera },
  nube: { Preview: NubePreview, fontClasses: f.nube },
};
