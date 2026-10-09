import { notFound } from "next/navigation";
import TierraTemplate from "@/templates/tierra/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "tierra": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("tierra");
export const viewport = viewportFor("tierra");

export default function Page() {
  const inv = invitationFor("tierra");
  if (!inv) notFound();
  return <TierraTemplate inv={inv} />;
}
