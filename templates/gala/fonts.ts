import localFont from "next/font/local";

// Tipografías del diseño, desde archivos del proyecto (fonts/, licencia OFL
// en cada carpeta): el build no consulta Google Fonts. En un módulo aparte
// para que solo se precarguen en las páginas donde se usan.
// El nombre de cada constante es el nombre de la familia en el CSS: debe ser
// el de la tipografía (no "display"/"body"), o las de distintos diseños se
// mezclan en el catálogo y en las demos.
// Didona de alto contraste + versalitas elegantes para etiquetas y textos.
// Bodoni sin el eje `opsz`, como se veía cuando venía de Google Fonts.

const bodoniModa = localFont({ variable: "--f-display", src: [{ path: "../../fonts/bodoni-moda/bodoni-moda-latin-wght-normal.woff2", style: "normal" }, { path: "../../fonts/bodoni-moda/bodoni-moda-latin-wght-italic.woff2", style: "italic" }], weight: "400 900", adjustFontFallback: "Times New Roman" });
const tenorSans = localFont({ variable: "--f-body", src: [{ path: "../../fonts/tenor-sans/tenor-sans-latin-400-normal.woff2", style: "normal" }], weight: "400", adjustFontFallback: "Arial" });

export const fontClasses = `${bodoniModa.variable} ${tenorSans.variable}`;
