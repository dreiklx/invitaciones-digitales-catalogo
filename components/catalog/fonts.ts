import localFont from "next/font/local";

// Identidad neutra del catálogo (distinta de los ocho diseños), desde
// archivos del proyecto (fonts/, licencia OFL): el build no consulta
// Google Fonts.
// El nombre de la constante es el de la familia en el CSS (ver
// templates/olivo/fonts.ts).
// Sin precarga (`preload: false`): las usa también la página 404, que Next
// incluye en todas las rutas, y al agrupar el CSS las demos terminaban
// precargándolas (~150 KB de más). Se bajan solo donde se usan (catálogo y
// 404), en cuanto se lee su CSS.
const cormorantGaramond = localFont({
  variable: "--f-display",
  src: [
    { path: "../../fonts/cormorant-garamond/cormorant-garamond-latin-wght-normal.woff2", style: "normal" },
    { path: "../../fonts/cormorant-garamond/cormorant-garamond-latin-wght-italic.woff2", style: "italic" },
  ],
  weight: "300 700",
  adjustFontFallback: "Times New Roman",
  preload: false,
});
const manrope = localFont({
  variable: "--f-body",
  src: "../../fonts/manrope/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  adjustFontFallback: "Arial",
  preload: false,
});

export const catalogFonts = `${cormorantGaramond.variable} ${manrope.variable}`;
