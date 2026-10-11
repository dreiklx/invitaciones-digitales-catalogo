import { notFound } from "next/navigation";
import ArrulloTemplate from "@/templates/arrullo/Template";
import { invitationFor, metadataFor, viewportFor } from "@/lib/invitation/routes";

// Diseño "arrullo": demo del catálogo, o la invitación del cliente si eligió
// este diseño (next.config.ts reescribe "/" hacia aquí). Ver lib/invitation/routes.tsx.
export const metadata = metadataFor("arrullo");
export const viewport = viewportFor("arrullo");

export default function Page() {
  const inv = invitationFor("arrullo");
  if (!inv) notFound();
  return <ArrulloTemplate inv={inv} />;
}
