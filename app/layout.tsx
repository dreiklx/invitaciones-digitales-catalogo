import type { Metadata, Viewport } from "next";
import "./globals.css";
import { catalog } from "@/config/catalog";
import { activeInvitation, isCatalog } from "@/lib/invitation/active";

// Raíz mínima: cada diseño trae sus propias tipografías y colores (ver
// templates/). La metadata base depende de si este despliegue es el
// catálogo o la invitación de un cliente.
const inv = activeInvitation();

export const metadata: Metadata = inv
  ? {
      metadataBase: new URL(inv.content.site.url),
      title: inv.siteTitle,
      description: inv.siteDescription,
      openGraph: { title: inv.siteTitle, description: inv.siteDescription, locale: inv.content.site.locale.replace("-", "_"), type: "website" },
      twitter: { card: "summary_large_image", title: inv.siteTitle, description: inv.siteDescription },
      // Invitación de un cliente: se comparte por enlace (WhatsApp) y trae
      // nombres, lugares, teléfono y a veces una cuenta bancaria; no debe
      // aparecer en buscadores. La vista previa al compartir no cambia
      // (WhatsApp lee las etiquetas Open Graph igual). El catálogo sí se indexa.
      robots: { index: false, follow: false },
    }
  : {
      metadataBase: new URL(catalog.url),
      title: catalog.title,
      description: catalog.description,
      openGraph: { title: catalog.title, description: catalog.description, locale: catalog.locale.replace("-", "_"), type: "website" },
      twitter: { card: "summary_large_image", title: catalog.title, description: catalog.description },
    };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Los diseños tienen su propia paleta (incluida Gala, que ya es oscura):
  // evita que el "modo oscuro forzado" del navegador los invierta.
  colorScheme: "only light",
  themeColor: inv ? inv.palette.background : "#f4f1ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const lang = (inv?.content.site.locale ?? catalog.locale).split("-")[0];
  return (
    <html lang={lang} data-mode={isCatalog ? "catalogo" : "invitacion"}>
      <head>
        {/* La extensión Dark Reader respeta esta etiqueta y no altera los colores. */}
        <meta name="darkreader-lock" />
      </head>
      {/* overflow-x: clip en un contenedor y no en <body>: CSS traslada el
          overflow de <body> a la ventana, donde iOS Safari no impide mover
          la página de lado con el dedo. Es solo la red de seguridad; las
          causas se corrigen en su origen (PROJECT-CONTEXT, "Sin
          desplazamiento horizontal"). */}
      <body>
        <div className="overflow-x-clip">{children}</div>
      </body>
    </html>
  );
}
