import localFont from "next/font/local";

// Tipografías del diseño, desde archivos del proyecto (fonts/, licencia OFL
// en cada carpeta): el build no consulta Google Fonts. En un módulo aparte
// para que solo se precarguen en las páginas donde se usan.
// El nombre de cada constante es el nombre de la familia en el CSS: debe ser
// el de la tipografía (no "display"/"body"), o las de distintos diseños se
// mezclan en el catálogo y en las demos.

const fredoka = localFont({ variable: "--f-display", src: [{ path: "../../fonts/fredoka/fredoka-latin-wght-normal.woff2", style: "normal" }], weight: "300 700", adjustFontFallback: "Arial" });
const nunito = localFont({ variable: "--f-body", src: [{ path: "../../fonts/nunito/nunito-latin-wght-normal.woff2", style: "normal" }], weight: "200 1000", adjustFontFallback: "Arial" });

export const fontClasses = `${fredoka.variable} ${nunito.variable}`;
