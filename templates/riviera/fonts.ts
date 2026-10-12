import localFont from "next/font/local";

// Tipografías del diseño, desde archivos del proyecto (fonts/, licencia OFL
// en cada carpeta): el build no consulta Google Fonts. En un módulo aparte
// para que solo se precarguen en las páginas donde se usan.
// El nombre de cada constante es el nombre de la familia en el CSS: debe ser
// el de la tipografía (no "display"/"body"), o las de distintos diseños se
// mezclan en el catálogo y en las demos.

const gloock = localFont({ variable: "--f-display", src: [{ path: "../../fonts/gloock/gloock-latin-400-normal.woff2", style: "normal" }], weight: "400", adjustFontFallback: "Times New Roman" });
const dmSans = localFont({ variable: "--f-body", src: [{ path: "../../fonts/dm-sans/dm-sans-latin-wght-normal.woff2", style: "normal" }], weight: "100 1000", adjustFontFallback: "Arial" });

export const fontClasses = `${gloock.variable} ${dmSans.variable}`;
