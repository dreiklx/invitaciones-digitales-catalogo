import { notFound } from "next/navigation";
import CameliaTemplate from "@/templates/camelia/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "camelia": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("camelia");
export const viewport = viewportFor("camelia");

export default function Page() {
  const inv = invitationFor("camelia");
  if (!inv) notFound();
  return <CameliaTemplate inv={inv} />;
}
