import type { TemplateMeta } from "@/lib/invitation/types";

// 01 · Olivo — el diseño original (probado en una boda real), en verde olivo
// y lino. Ver docs/templates/01-olivo.md.
export const meta: TemplateMeta<"olivo"> = {
  id: "olivo",
  number: "01",
  name: "Olivo",
  kind: "boda",
  concept: "Botánico y cálido: verde olivo, lino y detalles dorados.",
  highlights: ["Portada con fotografía a pantalla completa", "Collage de fotos con una postal inclinada", "Detalles botánicos de línea fina"],
  palette: {
    background: "#f7f2e8",
    surface: "#eee6d4",
    text: "#262b1d",
    textMuted: "#575c48",
    primary: "#4a5432",
    onPrimary: "#f7f2e8",
    secondary: "#bfa26a",
    accent: "#a5643c",
    onAccent: "#fbf6ee",
    line: "#dbd0b6",
  },
  fonts: { display: "Playfair Display", body: "Jost" },
  photoSlots: {
    portada: { ratio: [2, 3], where: "Portada a pantalla completa (en escritorio se recorta a lo ancho)", position: "50% 30%" },
    historia: { ratio: [3, 2], where: "Foto de la pareja después de la frase de apertura", position: "50% 40%" },
    cuentaRegresiva: { ratio: [2, 3], where: "Junto a la cuenta regresiva", position: "50% 30%" },
    regalos: { ratio: [2, 3], where: "Sección de regalos", position: "50% 30%" },
    galeria1: { ratio: [3, 2], where: "Galería, arriba a la izquierda (la más grande)", position: "50% 40%" },
    galeria2: { ratio: [4, 5], where: "Galería, arriba a la derecha", position: "50% 35%" },
    galeria3: { ratio: [4, 5], where: "Galería, abajo a la izquierda", position: "50% 35%" },
    galeria4: { ratio: [3, 2], where: "Galería, abajo a la derecha (inclinada, superpuesta)", position: "50% 45%" },
    cierre: { ratio: [2, 3], where: "Fondo del pie de página (al 30 %)", position: "50% 30%" },
  },
};
