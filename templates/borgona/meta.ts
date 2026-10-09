import type { TemplateMeta } from "@/lib/invitation/types";

// 05 · Borgoña — contemporáneo y tipográfico: vino, rosa empolvado, marfil.
// Ver docs/templates/05-borgona.md.
export const meta: TemplateMeta<"borgona"> = {
  id: "borgona",
  number: "05",
  name: "Borgoña",
  kind: "boda",
  concept: "Contemporáneo y romántico: vino, rosa empolvado y tipografía grande.",
  highlights: ["Tipografía protagonista en cursiva", "Información en formato de ficha", "Bloques de color a sangre"],
  palette: {
    background: "#f7f0ea",
    surface: "#efdcd6",
    text: "#2b1117",
    textMuted: "#6f4c52",
    primary: "#5c1a2b",
    onPrimary: "#f7ebe6",
    secondary: "#e2b4b0",
    accent: "#8f2337",
    onAccent: "#fbf2ee",
    line: "#ddc6c0",
  },
  fonts: { display: "Instrument Serif", body: "Hanken Grotesk" },
  musicPlayer: "etiqueta",
  photoSlots: {
    portada: { ratio: [4, 5], where: "Portada, al lado de los nombres", position: "50% 30%" },
    historia: { ratio: [1, 1], where: "Historia, foto cuadrada", position: "50% 40%" },
    galeria1: { ratio: [3, 4], where: "Galería, vertical izquierda", position: "50% 35%" },
    galeria2: { ratio: [3, 4], where: "Galería, vertical derecha (desplazada)", position: "50% 35%" },
    galeria3: { ratio: [21, 9], where: "Galería, panorámica de cierre", position: "50% 45%" },
  },
};
