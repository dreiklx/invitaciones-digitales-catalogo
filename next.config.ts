import type { NextConfig } from "next";
import { invitation } from "./config/invitation";

const nextConfig: NextConfig = {
  experimental: {
    // Agrupa el CSS por ruta en vez de un solo archivo para todo el sitio:
    // sin esto, cada página precargaba las tipografías de los cinco diseños.
    cssChunking: { type: "graph", requestCost: 2000 },
  },
  // Invitación de un cliente: el optimizador de imágenes solo acepta sus
  // fotos (public/images/, README "Fotos"), no las de las demos (ver
  // rewrites).
  ...(invitation ? { images: { localPatterns: [{ pathname: "/images/**" }] } } : {}),
  // Diseños renombrados (2026-10-10: Borgoña → Camelia; 2026-10-11: Camelia
  // pasó a llamarse Aguamarina): los enlaces viejos de las demos siguen
  // funcionando, siempre en un solo salto. /plantillas/arrullo volvió a ser
  // una página propia (baby shower) el 2026-10-12; Riviera sigue en
  // /plantillas/riviera (aniversarios).
  async redirects() {
    return [
      { source: "/plantillas/camelia", destination: "/plantillas/aguamarina", permanent: true },
      { source: "/plantillas/camelia/:path+", destination: "/plantillas/aguamarina/:path+", permanent: true },
      { source: "/plantillas/borgona", destination: "/plantillas/aguamarina", permanent: true },
      { source: "/plantillas/borgona/:path+", destination: "/plantillas/aguamarina/:path+", permanent: true },
    ];
  },
  // Invitación de un cliente: "/" muestra la página de su diseño
  // (app/plantillas/<diseño>), sin cambiar la URL. Las fotos de las demos
  // (public/plantillas/*/fotos) viajan en la copia del proyecto, pero desde
  // el dominio de un cliente no se sirven (404): no son suyas y algunas
  // tienen derechos de imagen pendientes (photo-map.md). `beforeFiles` se
  // revisa antes que los archivos de public/.
  async rewrites() {
    if (!invitation) return [];
    return {
      // En orden: cada regla ve la ruta que dejó la anterior.
      beforeFiles: [
        { source: "/plantillas/:design/fotos/:path*", destination: "/no-disponible" },
        // Los otros diseños no existen aquí: van a la página 404 (antes
        // respondían 404 con una página vacía que cargaba las tipografías y
        // la imagen al compartir de ese diseño). La carpeta del diseño
        // elegido sigue: "/" la muestra y de ahí sale su imagen al compartir.
        { source: `/plantillas/:path((?!${invitation.template}(?:/|$)).*)`, destination: "/no-disponible" },
        { source: "/", destination: `/plantillas/${invitation.template}` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
