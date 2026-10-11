import type { TemplateMeta } from "@/lib/invitation/types";

// 07 · Nube — primer cumpleaños (sirve para cualquier cumpleaños infantil).
// Cielo celeste, amarillo sol y coral; banderines, globos, confeti que cae
// despacio y una velita sobre la edad. Festivo sin saturar.
// Ver docs/templates/07-nube.md.
export const meta: TemplateMeta<"nube"> = {
  id: "nube",
  number: "07",
  name: "Nube",
  kind: "cumpleanos-infantil",
  concept: "Su primer añito, en fiesta: cielo celeste, amarillo sol, banderines y globos.",
  highlights: ["La edad con su velita, como protagonista", "Banderines, globos, estrellas y confeti que cae despacio", "Programa de la fiesta y galería en burbujas"],
  palette: {
    background: "#fffcf5",
    surface: "#e9f5fc",
    text: "#2e3250",
    textMuted: "#62668a",
    primary: "#7cc1e8",
    onPrimary: "#16304a",
    secondary: "#ffd35e",
    accent: "#ff8b69",
    onAccent: "#2c1a12",
    line: "#dfe9ef",
  },
  fonts: { display: "Fredoka", body: "Nunito" },
  musicPlayer: "globo",
  photoSlots: {
    portada: { ratio: [1, 1], where: "Portada, en un círculo con la edad", position: "50% 40%" },
    historia: { ratio: [4, 5], where: "Junto al mensaje", position: "50% 35%" },
    galeria1: { ratio: [4, 5], where: "Galería, arriba a la izquierda", position: "50% 35%" },
    galeria2: { ratio: [1, 1], where: "Galería, círculo arriba a la derecha", position: "50% 40%" },
    galeria3: { ratio: [1, 1], where: "Galería, círculo abajo a la izquierda", position: "50% 40%" },
    galeria4: { ratio: [4, 5], where: "Galería, abajo a la derecha", position: "50% 35%" },
  },
};
