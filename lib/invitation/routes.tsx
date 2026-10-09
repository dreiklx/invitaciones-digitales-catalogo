// Piezas comunes de las rutas de cada diseño (app/plantillas/<diseño>/).
// Cada diseño tiene su carpeta e importa SOLO su componente: así cada página
// incluye y precarga únicamente sus propias tipografías.
//
// - Catálogo (config/invitation.ts = null): cada carpeta muestra la demo.
// - Invitación de cliente: next.config.ts reescribe "/" a la carpeta del
//   diseño elegido, que muestra la invitación del cliente; los otros
//   diseños dan 404.

import type { Metadata, Viewport } from "next";
import { ImageResponse } from "next/og";
import { invitation } from "@/config/invitation";
import { templateMetas } from "@/templates/registry";
import { activeInvitation, demoInvitation, isCatalog } from "./active";
import { calendarResponse } from "./calendar";
import type { ResolvedInvitation } from "./resolve";
import { invitationShareImage, shareImageSize } from "./share-image";
import type { TemplateId } from "./types";

export function invitationFor(id: TemplateId): ResolvedInvitation | null {
  if (isCatalog) return demoInvitation(id);
  return invitation?.template === id ? activeInvitation() : null;
}

export function metadataFor(id: TemplateId): Metadata {
  if (!isCatalog) return {}; // la del cliente sale de app/layout.tsx
  const meta = templateMetas[id];
  const title = `${meta.number} · ${meta.name} — Invitación digital`;
  return {
    title,
    description: meta.concept,
    openGraph: { title, description: meta.concept, type: "website" },
    twitter: { card: "summary_large_image", title, description: meta.concept },
  };
}

export function viewportFor(id: TemplateId): Viewport {
  return { themeColor: invitationFor(id)?.palette.background };
}

export const shareImage = { alt: "Invitación digital", size: shareImageSize, contentType: "image/png" };

export async function shareImageFor(id: TemplateId): Promise<ImageResponse> {
  const inv = invitationFor(id);
  if (inv) return invitationShareImage(inv);
  // Diseño no usado en esta invitación: la ruta existe pero no se enlaza.
  return new ImageResponse(<div style={{ width: "100%", height: "100%", background: "#f4f1ea" }} />, shareImageSize);
}

export function calendarFor(id: TemplateId): Response {
  const inv = invitationFor(id);
  return inv ? calendarResponse(inv) : new Response("No encontrado", { status: 404 });
}
