import type { TemplateMeta } from "@/lib/invitation/types";

// 07 · Nube — cumpleaños de bebé o infantil. Crema, celeste empolvado,
// amarillo mantequilla y durazno; nubes, globos y confeti de trazo suave.
// Ver docs/templates/07-nube.md.
export const meta: TemplateMeta<"nube"> = {
  id: "nube",
  number: "07",
  name: "Nube",
  kind: "cumpleanos-infantil",
  concept: "Tierno y moderno: crema, celeste empolvado y amarillo mantequilla.",
  highlights: ["La edad como protagonista, en una insignia", "Nubes que flotan, globos y confeti suave", "Programa de la fiesta y galería en burbujas"],
  palette: {
    background: "#fffaf2",
    surface: "#f6eee2",
    text: "#33354c",
    textMuted: "#6c6d85",
    primary: "#86b1d3",
    onPrimary: "#1d283d",
    secondary: "#f6cc72",
    accent: "#ef936f",
    onAccent: "#2c1a12",
    line: "#ebe0d0",
  },
  fonts: { display: "Fredoka", body: "Nunito" },
  photoSlots: {
    portada: { ratio: [1, 1], where: "Portada, en un círculo con la edad", position: "50% 40%" },
    historia: { ratio: [4, 5], where: "Junto al mensaje", position: "50% 35%" },
    galeria1: { ratio: [4, 5], where: "Galería, arriba a la izquierda", position: "50% 35%" },
    galeria2: { ratio: [1, 1], where: "Galería, círculo arriba a la derecha", position: "50% 40%" },
    galeria3: { ratio: [1, 1], where: "Galería, círculo abajo a la izquierda", position: "50% 40%" },
    galeria4: { ratio: [4, 5], where: "Galería, abajo a la derecha", position: "50% 35%" },
  },
};
