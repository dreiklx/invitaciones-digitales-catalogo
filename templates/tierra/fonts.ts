import localFont from "next/font/local";

// Tipografías del diseño, desde archivos del proyecto (fonts/, licencia OFL
// en cada carpeta): el build no consulta Google Fonts. En un módulo aparte
// para que solo se precarguen en las páginas donde se usan.
// El nombre de cada constante es el nombre de la familia en el CSS: debe ser
// el de la tipografía (no "display"/"body"), o las de distintos diseños se
// mezclan en el catálogo y en las demos.
// Fraunces con sus ejes de óptica y suavidad (`opsz`, `SOFT`; también trae
// `WONK` en su valor por defecto): títulos de revista cálidos.

const fraunces = localFont({ variable: "--f-display", src: [{ path: "../../fonts/fraunces/fraunces-latin-full-normal.woff2", style: "normal" }, { path: "../../fonts/fraunces/fraunces-latin-full-italic.woff2", style: "italic" }], weight: "100 900", adjustFontFallback: "Times New Roman" });
const instrumentSans = localFont({ variable: "--f-body", src: [{ path: "../../fonts/instrument-sans/instrument-sans-latin-wght-normal.woff2", style: "normal" }], weight: "400 700", adjustFontFallback: "Arial" });

export const fontClasses = `${fraunces.variable} ${instrumentSans.variable}`;
