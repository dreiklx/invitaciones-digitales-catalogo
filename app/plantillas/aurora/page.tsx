import { notFound } from "next/navigation";
import AuroraTemplate from "@/templates/aurora/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "aurora": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("aurora");
export const viewport = viewportFor("aurora");

export default function Page() {
  const inv = invitationFor("aurora");
  if (!inv) notFound();
  return <AuroraTemplate inv={inv} />;
}
