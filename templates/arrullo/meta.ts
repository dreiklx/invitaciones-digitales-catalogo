import type { TemplateMeta } from "@/lib/invitation/types";

// 06 · Arrullo — baby shower: papelería suave en crema, salvia y
// mantequilla, con fotos en arcos, círculos y postales. Comparte la
// composición de Riviera (de donde nació) pero no sus colores ni sus
// ornamentos. Ver docs/templates/06-arrullo.md.
export const meta: TemplateMeta<"arrullo"> = {
  id: "arrullo",
  number: "06",
  name: "Arrullo",
  kind: "baby-shower",
  concept: "Baby shower delicado: papelería en crema, salvia y mantequilla, con una luna y banderines.",
  highlights: ["El nombre del bebé solo si la familia quiere mostrarlo", "Fotos en arcos, círculos y postales con sello", "Lista de regalos y confirmación paso a paso"],
  palette: {
    background: "#fbf7f0",
    surface: "#eef0e5",
    text: "#3f362e",
    textMuted: "#74675a",
    primary: "#5f7859",
    onPrimary: "#fbf7f0",
    secondary: "#ecd49a",
    accent: "#c4805f",
    onAccent: "#fffaf5",
    line: "#e1dbcc",
  },
  fonts: { display: "Gilda Display", body: "DM Sans" },
  musicPlayer: "puntada",
  navLabels: { historia: "Nuestra espera" },
  photoSlots: {
    portada: { ratio: [3, 4], where: "Portada, dentro del arco", position: "50% 30%" },
    historia: { ratio: [4, 5], where: "Nuestra espera, dentro del arco", position: "50% 35%" },
    galeria1: { ratio: [4, 5], where: "Galería, arco grande", position: "50% 35%" },
    galeria2: { ratio: [1, 1], where: "Galería, círculo de arriba", position: "50% 50%" },
    galeria3: { ratio: [1, 1], where: "Galería, círculo de abajo", position: "50% 40%" },
    galeria4: { ratio: [3, 2], where: "Galería, postal con sello", position: "50% 50%" },
  },
};
