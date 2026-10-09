import { notFound } from "next/navigation";
import OlivoTemplate from "@/templates/olivo/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "olivo": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("olivo");
export const viewport = viewportFor("olivo");

export default function Page() {
  const inv = invitationFor("olivo");
  if (!inv) notFound();
  return <OlivoTemplate inv={inv} />;
}
