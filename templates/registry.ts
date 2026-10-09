// Registro de los diseños: solo datos (paleta, tipografías, espacios
// de foto). No importa componentes, así lo pueden usar los scripts.

import type { TemplateId, TemplateMeta } from "@/lib/invitation/types";
import { meta as olivo } from "./olivo/meta";
import { meta as tierra } from "./tierra/meta";
import { meta as gala } from "./gala/meta";
import { meta as riviera } from "./riviera/meta";
import { meta as borgona } from "./borgona/meta";
import { meta as aurora } from "./aurora/meta";
import { meta as nube } from "./nube/meta";

export const templateMetas: { [T in TemplateId]: TemplateMeta<T> } = { olivo, tierra, gala, riviera, borgona, aurora, nube };

// Orden del catálogo (las bodas primero; ver `kind` en cada meta).
export const templateIds: TemplateId[] = ["olivo", "tierra", "gala", "riviera", "borgona", "aurora", "nube"];

export function isTemplateId(value: string): value is TemplateId {
  return value in templateMetas;
}
