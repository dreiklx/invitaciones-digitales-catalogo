import { notFound } from "next/navigation";
import BorgonaTemplate from "@/templates/borgona/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "borgona": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("borgona");
export const viewport = viewportFor("borgona");

export default function Page() {
  const inv = invitationFor("borgona");
  if (!inv) notFound();
  return <BorgonaTemplate inv={inv} />;
}
