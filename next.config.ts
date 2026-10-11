import type { NextConfig } from "next";
import { invitation } from "./config/invitation";

const nextConfig: NextConfig = {
  experimental: {
    // Agrupa el CSS por ruta en vez de un solo archivo para todo el sitio:
    // sin esto, cada página precargaba las tipografías de los cinco diseños.
    cssChunking: { type: "graph", requestCost: 2000 },
  },
  // Diseños renombrados en la reorganización del catálogo (2026-10-10):
  // los enlaces viejos de las demos siguen funcionando.
  async redirects() {
    return [
      { source: "/plantillas/riviera/:path*", destination: "/plantillas/arrullo/:path*", permanent: true },
      { source: "/plantillas/borgona/:path*", destination: "/plantillas/camelia/:path*", permanent: true },
    ];
  },
  // Invitación de un cliente: "/" muestra la página de su diseño
  // (app/plantillas/<diseño>), sin cambiar la URL.
  async rewrites() {
    return invitation ? { beforeFiles: [{ source: "/", destination: `/plantillas/${invitation.template}` }], afterFiles: [], fallback: [] } : [];
  },
};

export default nextConfig;
