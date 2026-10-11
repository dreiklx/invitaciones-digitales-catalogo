import type { TemplateMeta } from "@/lib/invitation/types";

// 05 · Aguamarina — quinceaños (rediseño 2026-10-11): azul
// petróleo, perla, bruma aguamarina y oro champán; marcos tallados como una
// joya, una tiara de línea fina y el nombre en cursiva. Ver
// docs/templates/05-aguamarina.md.
export const meta: TemplateMeta<"aguamarina"> = {
  id: "aguamarina",
  number: "05",
  name: "Aguamarina",
  kind: "quinceanos",
  concept: "Quinceaños de joyería: azul petróleo, perla, aguamarina y oro champán.",
  highlights: ["Fotos en marcos tallados como una joya", "Una tiara de línea fina y su nombre en cursiva", "Programa de la noche y corte de honor"],
  palette: {
    background: "#f7f6f1",
    surface: "#e6f0ed",
    text: "#15302f",
    textMuted: "#4f6967",
    primary: "#13505a",
    onPrimary: "#f7f6f1",
    secondary: "#d4b880",
    accent: "#2a8a84",
    onAccent: "#08201f",
    line: "#cfe0dc",
  },
  fonts: { display: "Cormorant Garamond", body: "Jost" },
  musicPlayer: "broche",
  photoSlots: {
    portada: { ratio: [4, 5], where: "Portada, en el marco tallado", position: "50% 25%" },
    historia: { ratio: [4, 5], where: "Sobre mí, en el marco tallado", position: "50% 30%" },
    galeria1: { ratio: [3, 4], where: "Galería, columna izquierda arriba", position: "50% 30%" },
    galeria2: { ratio: [1, 1], where: "Galería, columna derecha arriba", position: "50% 40%" },
    galeria3: { ratio: [1, 1], where: "Galería, columna izquierda abajo", position: "50% 40%" },
    galeria4: { ratio: [3, 4], where: "Galería, columna derecha abajo", position: "50% 30%" },
  },
};
