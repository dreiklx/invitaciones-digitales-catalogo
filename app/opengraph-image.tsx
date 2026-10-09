import { ImageResponse } from "next/og";
import { activeInvitation } from "@/lib/invitation/active";
import { invitationShareImage, loadGoogleFont, shareImageSize } from "@/lib/invitation/share-image";

// Vista previa al compartir "/" (WhatsApp, Facebook…): la de la invitación
// del cliente o la del catálogo. Se genera en el build.
export const alt = "Invitación digital";
export const size = shareImageSize;
export const contentType = "image/png";

export default async function Image() {
  const inv = activeInvitation();
  if (inv) return invitationShareImage(inv);

  const title = "Invitaciones digitales";
  const subtitle = "Bodas · Quinceaños · Cumpleaños";
  const font = await loadGoogleFont("Cormorant Garamond", title + subtitle);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f4f1ea", color: "#1f1c18" }}>
        <div style={{ fontFamily: "Display", fontSize: 92, letterSpacing: -1 }}>{title}</div>
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 80, height: 1, background: "#a69a85" }} />
          <div style={{ fontFamily: "Display", fontSize: 38, fontStyle: "italic", color: "#6f675b" }}>{subtitle}</div>
          <div style={{ width: 80, height: 1, background: "#a69a85" }} />
        </div>
        <div style={{ marginTop: 60, display: "flex", gap: 14 }}>
          {["#4a5432", "#4e3222", "#0c0c0e", "#1f4fa3", "#5c1a2b", "#553a88", "#86b1d3"].map((color) => (
            <div key={color} style={{ width: 46, height: 46, borderRadius: 46, background: color }} />
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Display", data: font, weight: 400, style: "normal" }] : [] }
  );
}
