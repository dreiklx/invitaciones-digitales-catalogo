import { notFound } from "next/navigation";
import Catalog from "@/components/catalog/Catalog";
import { isCatalog } from "@/lib/invitation/active";

// "/" — el catálogo de diseños. En la invitación de un cliente,
// next.config.ts reescribe "/" a app/plantillas/<diseño> (que solo carga
// las tipografías de ese diseño), así que esta página no se usa.
export default function Home() {
  if (!isCatalog) notFound();
  return <Catalog />;
}
