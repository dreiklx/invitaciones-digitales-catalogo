import { notFound } from "next/navigation";
import NubeTemplate from "@/templates/nube/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "nube": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("nube");
export const viewport = viewportFor("nube");

export default function Page() {
  const inv = invitationFor("nube");
  if (!inv) notFound();
  return <NubeTemplate inv={inv} />;
}
