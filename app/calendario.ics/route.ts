import { calendarResponse } from "@/lib/invitation/calendar";
import { activeInvitation } from "@/lib/invitation/active";

// "Agregar a mi calendario" de la invitación del cliente. Se genera en el
// build. En modo catálogo no existe (cada demo tiene el suyo).
export const dynamic = "force-static";

export function GET() {
  const inv = activeInvitation();
  if (!inv) return new Response("No encontrado", { status: 404 });
  return calendarResponse(inv);
}
