import { activeInvitation } from "@/lib/invitation/active";
import { monogramIcon } from "@/lib/invitation/share-image";

// Ícono de la pestaña: iniciales de la pareja con los colores y la
// tipografía del diseño elegido (o un "&" neutro en el catálogo).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const inv = activeInvitation();
  if (!inv) return monogramIcon("&", { background: "#1f1c18", foreground: "#f4f1ea" }, "Cormorant Garamond", 32);
  return monogramIcon(inv.names.initials.join(""), { background: inv.palette.primary, foreground: inv.palette.onPrimary }, inv.meta.fonts.display, 32);
}
