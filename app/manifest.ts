import type { MetadataRoute } from "next";
import { catalog } from "@/config/catalog";
import { activeInvitation } from "@/lib/invitation/active";

export default function manifest(): MetadataRoute.Manifest {
  const inv = activeInvitation();
  return {
    name: inv ? inv.eventTitle : catalog.title,
    short_name: inv ? inv.names.joined : "Invitaciones",
    description: inv ? inv.siteDescription : catalog.description,
    start_url: "/",
    display: "browser",
    background_color: inv ? inv.palette.background : "#f4f1ea",
    theme_color: inv ? inv.palette.background : "#f4f1ea",
    icons: [{ src: "/apple-icon", sizes: "180x180", type: "image/png" }],
  };
}
