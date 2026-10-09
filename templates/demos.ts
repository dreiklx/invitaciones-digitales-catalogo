// Datos de demostración de los diseños (catálogo y `npm run check`).
// Solo datos: no importa componentes.

import type { Invitation, TemplateId } from "@/lib/invitation/types";
import { demo as olivo } from "./olivo/demo";
import { demo as tierra } from "./tierra/demo";
import { demo as gala } from "./gala/demo";
import { demo as riviera } from "./riviera/demo";
import { demo as borgona } from "./borgona/demo";
import { demo as aurora } from "./aurora/demo";
import { demo as nube } from "./nube/demo";

export const demos: Record<TemplateId, Invitation> = { olivo, tierra, gala, riviera, borgona, aurora, nube };
