import type { TemplateMeta } from "@/lib/invitation/types";

// 04 · Aurora — quince años. Lila, violeta y rosa cuarzo; espejo ovalado,
// "XV" gigante de contorno, destellos y caligrafía. Ver docs/templates/06-aurora.md.
export const meta: TemplateMeta<"aurora"> = {
  id: "aurora",
  number: "04",
  name: "Aurora",
  kind: "quinceanos",
  concept: "Quince años de ensueño: lila, violeta y rosa cuarzo, con destellos.",
  highlights: ["Retrato en espejo ovalado con un XV gigante", "Programa de la noche: vals, brindis y fiesta", "Tira de fotos de cabina y destellos"],
  palette: {
    background: "#faf7fd",
    surface: "#f0e9f8",
    text: "#2a2140",
    textMuted: "#665d80",
    primary: "#553a88",
    onPrimary: "#fbf8ff",
    secondary: "#c8b4ea",
    accent: "#bf567c",
    onAccent: "#ffffff",
    line: "#e2d9f0",
  },
  fonts: { display: "Italiana", body: "Figtree" },
  musicPlayer: "destello",
  navLabels: { historia: "Mi mensaje" },
  photoSlots: {
    portada: { ratio: [3, 4], where: "Portada, dentro del espejo ovalado", position: "50% 30%" },
    historia: { ratio: [4, 5], where: "Junto al mensaje de la quinceañera", position: "50% 30%" },
    galeria1: { ratio: [4, 5], where: "Galería, foto grande", position: "50% 30%" },
    galeria2: { ratio: [4, 3], where: "Galería, tira de cabina (1.ª)", position: "50% 40%" },
    galeria3: { ratio: [4, 3], where: "Galería, tira de cabina (2.ª)", position: "50% 40%" },
    galeria4: { ratio: [4, 3], where: "Galería, tira de cabina (3.ª)", position: "50% 40%" },
    cierre: { ratio: [3, 2], where: "Antes del pie, foto horizontal con esquinas redondeadas", position: "50% 40%" },
  },
};
