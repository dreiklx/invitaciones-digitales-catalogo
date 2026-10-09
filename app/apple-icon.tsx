import { activeInvitation } from "@/lib/invitation/active";
import { monogramIcon } from "@/lib/invitation/share-image";

// Ícono al guardar el enlace en la pantalla de inicio (iPhone).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const inv = activeInvitation();
  if (!inv) return monogramIcon("&", { background: "#1f1c18", foreground: "#f4f1ea" }, "Cormorant Garamond", 180);
  const [a, b] = inv.names.initials;
  return monogramIcon(b ? `${a}&${b}` : a, { background: inv.palette.primary, foreground: inv.palette.onPrimary }, inv.meta.fonts.display, 180);
}
