import type { TemplateMeta } from "@/lib/invitation/types";

// 05 · Camelia — quince años de gala, editorial y monumental: vino
// frambuesa, rosa empolvado y marfil con destellos. Ocupa el lugar
// del antiguo diseño de boda Borgoña. Ver docs/templates/05-camelia.md.
export const meta: TemplateMeta<"camelia"> = {
  id: "camelia",
  number: "05",
  name: "Camelia",
  kind: "quinceanos",
  concept: "Quince años de gala: su nombre en grande sobre vino frambuesa, rosa empolvado y destellos.",
  highlights: ["Su nombre monumental en cursiva y un medallón con los XV", "Programa de la noche y cuenta regresiva gigante", "Ficha elegante con todos los datos"],
  palette: {
    background: "#fbf5f2",
    surface: "#f4e3e3",
    text: "#2b1219",
    textMuted: "#74515a",
    primary: "#741a39",
    onPrimary: "#fbf1f1",
    secondary: "#f2c4cf",
    accent: "#b0284f",
    onAccent: "#fff7f8",
    line: "#ead1d6",
  },
  fonts: { display: "Instrument Serif", body: "Hanken Grotesk" },
  musicPlayer: "broche",
  photoSlots: {
    portada: { ratio: [4, 5], where: "Portada, al lado del nombre", position: "50% 30%" },
    historia: { ratio: [1, 1], where: "Sobre mí, foto cuadrada", position: "50% 35%" },
    galeria1: { ratio: [3, 4], where: "Galería, vertical izquierda", position: "50% 30%" },
    galeria2: { ratio: [3, 4], where: "Galería, vertical derecha (desplazada)", position: "50% 30%" },
    galeria3: { ratio: [21, 9], where: "Galería, panorámica de cierre", position: "50% 40%" },
  },
};
