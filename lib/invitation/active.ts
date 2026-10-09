// Qué muestra este despliegue: el catálogo (config/invitation.ts = null) o
// la invitación de un cliente. Lo usan las rutas de app/.

import { invitation } from "@/config/invitation";
import { demos } from "@/templates/demos";
import { isTemplateId } from "@/templates/registry";
import { resolveInvitation, type ResolvedInvitation } from "./resolve";

export const isCatalog = invitation === null;

// La invitación del cliente (solo si no es catálogo).
export function activeInvitation(): ResolvedInvitation | null {
  return invitation ? resolveInvitation(invitation) : null;
}

// La demo de un diseño, para /plantillas/<diseño> (solo en modo catálogo).
export function demoInvitation(slug: string): ResolvedInvitation | null {
  if (!isCatalog || !isTemplateId(slug)) return null;
  return resolveInvitation(demos[slug], { basePath: `/plantillas/${slug}`, isDemo: true });
}
