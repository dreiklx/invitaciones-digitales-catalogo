// Miniaturas de los diseños para el catálogo, con sus tipografías.
// No importa las páginas completas (eso lo hace cada carpeta de
// app/plantillas/), así el catálogo no carga el código de las invitaciones.

import type { ComponentType } from "react";
import type { ResolvedInvitation } from "@/lib/invitation/resolve";
import type { TemplateId } from "@/lib/invitation/types";
import OlivoPreview from "./olivo/Preview";
import { fontClasses as olivoFonts } from "./olivo/fonts";
import TierraPreview from "./tierra/Preview";
import { fontClasses as tierraFonts } from "./tierra/fonts";
import GalaPreview from "./gala/Preview";
import { fontClasses as galaFonts } from "./gala/fonts";
import AuroraPreview from "./aurora/Preview";
import { fontClasses as auroraFonts } from "./aurora/fonts";
import AguamarinaPreview from "./aguamarina/Preview";
import { fontClasses as aguamarinaFonts } from "./aguamarina/fonts";
import ArrulloPreview from "./arrullo/Preview";
import { fontClasses as arrulloFonts } from "./arrullo/fonts";
import RivieraPreview from "./riviera/Preview";
import { fontClasses as rivieraFonts } from "./riviera/fonts";
import NubePreview from "./nube/Preview";
import { fontClasses as nubeFonts } from "./nube/fonts";

export const templatePreviews: Record<TemplateId, { Preview: ComponentType<{ inv: ResolvedInvitation }>; fontClasses: string }> = {
  olivo: { Preview: OlivoPreview, fontClasses: olivoFonts },
  tierra: { Preview: TierraPreview, fontClasses: tierraFonts },
  gala: { Preview: GalaPreview, fontClasses: galaFonts },
  aurora: { Preview: AuroraPreview, fontClasses: auroraFonts },
  aguamarina: { Preview: AguamarinaPreview, fontClasses: aguamarinaFonts },
  arrullo: { Preview: ArrulloPreview, fontClasses: arrulloFonts },
  riviera: { Preview: RivieraPreview, fontClasses: rivieraFonts },
  nube: { Preview: NubePreview, fontClasses: nubeFonts },
};
