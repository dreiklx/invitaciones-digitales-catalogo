import type { TemplateMeta } from "@/lib/invitation/types";

// 04 · Riviera — mediterráneo: azul cobalto, porcelana y limón.
// Ver docs/templates/04-riviera.md.
export const meta: TemplateMeta<"riviera"> = {
  id: "riviera",
  number: "04",
  name: "Riviera",
  kind: "boda",
  concept: "Mediterráneo y luminoso: azul cobalto, porcelana y limón.",
  highlights: ["Fotos en arcos, círculos y postales", "Azulejos y un sol de limón", "Cuenta regresiva en sellos"],
  palette: {
    background: "#f8f6f0",
    surface: "#e8eef6",
    text: "#14264f",
    textMuted: "#4b5b7d",
    primary: "#1f4fa3",
    onPrimary: "#f8f6f0",
    secondary: "#e8c440",
    accent: "#1f4fa3",
    onAccent: "#f8f6f0",
    line: "#c8d3e5",
  },
  fonts: { display: "Gloock", body: "DM Sans" },
  photoSlots: {
    portada: { ratio: [3, 4], where: "Portada, dentro del arco", position: "50% 30%" },
    historia: { ratio: [4, 5], where: "Historia, dentro del arco", position: "50% 35%" },
    galeria1: { ratio: [4, 5], where: "Galería, arco grande", position: "50% 35%" },
    galeria2: { ratio: [1, 1], where: "Galería, círculo izquierdo", position: "50% 40%" },
    galeria3: { ratio: [1, 1], where: "Galería, círculo derecho", position: "50% 40%" },
    galeria4: { ratio: [3, 2], where: "Galería, postal", position: "50% 45%" },
  },
};
