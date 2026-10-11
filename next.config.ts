import type { NextConfig } from "next";
import { invitation } from "./config/invitation";

const nextConfig: NextConfig = {
  experimental: {
    // Agrupa el CSS por ruta en vez de un solo archivo para todo el sitio:
    // sin esto, cada página precargaba las tipografías de los cinco diseños.
    cssChunking: { type: "graph", requestCost: 2000 },
  },
  // Diseños renombrados (2026-10-10: Borgoña → Camelia; 2026-10-11: Arrullo
  // volvió a ser Riviera y Camelia pasó a llamarse Aguamarina): los enlaces
  // viejos de las demos siguen funcionando, siempre en un solo salto.
  async redirects() {
    return [
      { source: "/plantillas/arrullo", destination: "/plantillas/riviera", permanent: true },
      { source: "/plantillas/arrullo/:path+", destination: "/plantillas/riviera/:path+", permanent: true },
      { source: "/plantillas/camelia", destination: "/plantillas/aguamarina", permanent: true },
      { source: "/plantillas/camelia/:path+", destination: "/plantillas/aguamarina/:path+", permanent: true },
      { source: "/plantillas/borgona", destination: "/plantillas/aguamarina", permanent: true },
      { source: "/plantillas/borgona/:path+", destination: "/plantillas/aguamarina/:path+", permanent: true },
    ];
  },
  // Invitación de un cliente: "/" muestra la página de su diseño
  // (app/plantillas/<diseño>), sin cambiar la URL.
  async rewrites() {
    return invitation ? { beforeFiles: [{ source: "/", destination: `/plantillas/${invitation.template}` }], afterFiles: [], fallback: [] } : [];
  },
};

export default nextConfig;
