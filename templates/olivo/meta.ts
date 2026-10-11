import type { TemplateMeta } from "@/lib/invitation/types";

// 01 · Olivo — editorial y sereno: verde olivo y lino con la composición de
// una revista de arquitectura (rediseñado por completo el 2026-10-10).
// Ver docs/templates/01-olivo.md.
export const meta: TemplateMeta<"olivo"> = {
  id: "olivo",
  number: "01",
  name: "Olivo",
  kind: "boda",
  concept: "Editorial y sereno: verde olivo y lino, con la calma de una revista de arquitectura.",
  highlights: ["Portada a dos columnas: color olivo y fotografía", "La fecha en una ficha de tres cifras y un itinerario con línea de tiempo", "Mosaico de fotos a sangre, sin marcos ni adornos"],
  palette: {
    background: "#f4efe4",
    surface: "#e8e0cf",
    text: "#23271c",
    textMuted: "#5c5f4e",
    primary: "#4a5433",
    onPrimary: "#f4efe4",
    secondary: "#c8bd97",
    accent: "#8a5d36",
    onAccent: "#f8f3ea",
    line: "#d5cbb4",
  },
  fonts: { display: "Newsreader", body: "Manrope" },
  musicPlayer: "lino",
  photoSlots: {
    portada: { ratio: [2, 3], where: "Portada, columna derecha a toda la altura (en teléfono, arriba)", position: "50% 25%" },
    historia: { ratio: [3, 2], where: "Nuestra historia, foto principal del díptico", position: "50% 45%" },
    retrato: { ratio: [4, 5], where: "Nuestra historia, foto pequeña del díptico", position: "50% 35%" },
    galeria1: { ratio: [2, 3], where: "Mosaico, columna izquierda (la alta)", position: "50% 30%" },
    galeria2: { ratio: [4, 5], where: "Mosaico, arriba a la derecha", position: "50% 35%" },
    galeria3: { ratio: [3, 2], where: "Mosaico, abajo a la derecha", position: "50% 40%" },
    galeria4: { ratio: [16, 9], where: "Mosaico, panorámica a todo el ancho", position: "50% 35%" },
  },
};
