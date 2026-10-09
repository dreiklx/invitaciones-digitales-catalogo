import type { TemplateMeta } from "@/lib/invitation/types";

// 02 · Tierra — editorial de revista en café y tonos tierra.
// Ver docs/templates/02-tierra.md.
export const meta: TemplateMeta<"tierra"> = {
  id: "tierra",
  number: "02",
  name: "Tierra",
  kind: "boda",
  concept: "Editorial y orgánico: café, arcilla y papel de revista.",
  highlights: ["Composición de revista en capítulos", "Titulares grandes y fotos con cortina", "Galería en doble página"],
  palette: {
    background: "#f1e9de",
    surface: "#e6d8c6",
    text: "#2a1c13",
    textMuted: "#6a5444",
    primary: "#4e3222",
    onPrimary: "#f4ece1",
    secondary: "#b68a5f",
    accent: "#9a4b2b",
    onAccent: "#f8f0e7",
    line: "#cfbca6",
  },
  fonts: { display: "Fraunces", body: "Instrument Sans" },
  musicPlayer: "ficha",
  photoSlots: {
    portada: { ratio: [4, 5], where: "Portada, foto principal", position: "50% 35%" },
    historia: { ratio: [3, 4], where: "Capítulo I, junto a la historia", position: "50% 35%" },
    retrato: { ratio: [3, 4], where: "Junto a la confirmación de asistencia", position: "50% 30%" },
    galeria1: { ratio: [4, 5], where: "Galería, la grande", position: "50% 35%" },
    galeria2: { ratio: [1, 1], where: "Galería, cuadrada izquierda", position: "50% 40%" },
    galeria3: { ratio: [1, 1], where: "Galería, cuadrada derecha", position: "50% 40%" },
    galeria4: { ratio: [16, 9], where: "Galería, panorámica", position: "50% 45%" },
    cierre: { ratio: [3, 2], where: "Antes del pie de página", position: "50% 40%" },
  },
};
