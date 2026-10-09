import { notFound } from "next/navigation";
import GalaTemplate from "@/templates/gala/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "gala": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("gala");
export const viewport = viewportFor("gala");

export default function Page() {
  const inv = invitationFor("gala");
  if (!inv) notFound();
  return <GalaTemplate inv={inv} />;
}
