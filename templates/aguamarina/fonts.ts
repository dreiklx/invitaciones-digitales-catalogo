import localFont from "next/font/local";

// Tipografías del diseño, desde archivos del proyecto (fonts/, licencia OFL
// en cada carpeta): el build no consulta Google Fonts. En un módulo aparte
// para que solo se precarguen en las páginas donde se usan.
// El nombre de cada constante es el nombre de la familia en el CSS: debe ser
// el de la tipografía (no "display"/"body"), o las de distintos diseños se
// mezclan en el catálogo y en las demos.

const cormorantGaramond = localFont({ variable: "--f-display", src: [{ path: "../../fonts/cormorant-garamond/cormorant-garamond-latin-wght-normal.woff2", style: "normal" }, { path: "../../fonts/cormorant-garamond/cormorant-garamond-latin-wght-italic.woff2", style: "italic" }], weight: "300 700", adjustFontFallback: "Times New Roman" });
const jost = localFont({ variable: "--f-body", src: [{ path: "../../fonts/jost/jost-latin-wght-normal.woff2", style: "normal" }], weight: "100 900", adjustFontFallback: "Arial" });

export const fontClasses = `${cormorantGaramond.variable} ${jost.variable}`;
