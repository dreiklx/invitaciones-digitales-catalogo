import type { TemplateMeta } from "@/lib/invitation/types";

// 03 · Gala — noche de etiqueta: negro, dorado y plata.
// Ver docs/templates/03-gala.md.
export const meta: TemplateMeta<"gala"> = {
  id: "gala",
  number: "03",
  name: "Gala",
  kind: "boda",
  concept: "Lujo nocturno: negro, dorado y plata, con fotos en blanco y negro.",
  highlights: ["Monograma y marcos dorados art déco", "Programa en línea de tiempo", "Retratos en blanco y negro"],
  palette: {
    background: "#0c0c0e",
    surface: "#151518",
    text: "#efeae0",
    textMuted: "#a8a49b",
    primary: "#c9a45c",
    onPrimary: "#0c0c0e",
    secondary: "#bcc0c6",
    accent: "#c9a45c",
    onAccent: "#0c0c0e",
    line: "#3b3832",
  },
  fonts: { display: "Bodoni Moda", body: "Tenor Sans" },
  musicPlayer: "deco",
  photoSlots: {
    portada: { ratio: [3, 4], where: "Portada, retrato enmarcado en dorado", position: "50% 30%" },
    historia: { ratio: [16, 9], where: "Fotografía panorámica de la historia", position: "50% 40%" },
    galeria1: { ratio: [3, 4], where: "Galería, 1 de 4", position: "50% 35%" },
    galeria2: { ratio: [3, 4], where: "Galería, 2 de 4", position: "50% 35%" },
    galeria3: { ratio: [3, 4], where: "Galería, 3 de 4", position: "50% 35%" },
    galeria4: { ratio: [3, 4], where: "Galería, 4 de 4", position: "50% 35%" },
  },
};
