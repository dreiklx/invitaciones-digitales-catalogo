import { notFound } from "next/navigation";
import AguamarinaTemplate from "@/templates/aguamarina/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "aguamarina": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("aguamarina");
export const viewport = viewportFor("aguamarina");

export default function Page() {
  const inv = invitationFor("aguamarina");
  if (!inv) notFound();
  return <AguamarinaTemplate inv={inv} />;
}
