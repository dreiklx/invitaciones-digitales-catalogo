import { ImageResponse } from "next/og";
import { activeInvitation } from "@/lib/invitation/active";
import { invitationShareImage, loadFont, shareImageSize } from "@/lib/invitation/share-image";
import { templateIds, templateMetas } from "@/templates/registry";

// Vista previa al compartir "/" (WhatsApp, Facebook…): la de la invitación
// del cliente o la del catálogo. Se genera en el build.
export const alt = "Invitación digital";
export const size = shareImageSize;
export const contentType = "image/png";

export default async function Image() {
  const inv = activeInvitation();
  if (inv) return invitationShareImage(inv);

  const title = "Invitaciones digitales";
  // Las cuatro categorías y un punto con el color de cada diseño (antes
  // decía "Cumpleaños" y mostraba siete colores, uno de un diseño retirado).
  const subtitle = "Bodas · Quinceaños · Bebés · Aniversarios";
  const [font, italic] = await Promise.all([loadFont("Cormorant Garamond"), loadFont("Cormorant Garamond", "italic")]);
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
          {templateIds.map((id) => templateMetas[id].palette.primary).map((color) => (
            <div key={color} style={{ width: 46, height: 46, borderRadius: 46, background: color }} />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Display", data: font, weight: 400, style: "normal" },
        { name: "Display", data: italic, weight: 400, style: "italic" },
      ],
    }
  );
}
