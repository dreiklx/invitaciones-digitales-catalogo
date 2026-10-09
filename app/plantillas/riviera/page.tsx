import { notFound } from "next/navigation";
import RivieraTemplate from "@/templates/riviera/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "riviera": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("riviera");
export const viewport = viewportFor("riviera");

export default function Page() {
  const inv = invitationFor("riviera");
  if (!inv) notFound();
  return <RivieraTemplate inv={inv} />;
}
