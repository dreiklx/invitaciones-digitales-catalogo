import localFont from "next/font/local";

// Tipografías del diseño, desde archivos del proyecto (fonts/, licencia OFL
// en cada carpeta): el build no consulta Google Fonts. En un módulo aparte
// para que solo se precarguen en las páginas donde se usan.
// El nombre de cada constante es el nombre de la familia en el CSS: debe ser
// el de la tipografía (no "display"/"body"), o las de distintos diseños se
// mezclan en el catálogo y en las demos.

const newsreader = localFont({ variable: "--f-display", src: [{ path: "../../fonts/newsreader/newsreader-latin-wght-normal.woff2", style: "normal" }, { path: "../../fonts/newsreader/newsreader-latin-wght-italic.woff2", style: "italic" }], weight: "200 800", adjustFontFallback: "Times New Roman" });
const manrope = localFont({ variable: "--f-body", src: [{ path: "../../fonts/manrope/manrope-latin-wght-normal.woff2", style: "normal" }], weight: "200 800", adjustFontFallback: "Arial" });

export const fontClasses = `${newsreader.variable} ${manrope.variable}`;
