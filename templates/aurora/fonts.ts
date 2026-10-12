import localFont from "next/font/local";

// Tipografías del diseño, desde archivos del proyecto (fonts/, licencia OFL
// en cada carpeta): el build no consulta Google Fonts. En un módulo aparte
// para que solo se precarguen en las páginas donde se usan.
// El nombre de cada constante es el nombre de la familia en el CSS: debe ser
// el de la tipografía (no "display"/"body"), o las de distintos diseños se
// mezclan en el catálogo y en las demos.
// Pinyon Script (caligrafía) solo para el nombre: clase `font-script`.

const italiana = localFont({ variable: "--f-display", src: [{ path: "../../fonts/italiana/italiana-latin-400-normal.woff2", style: "normal" }], weight: "400", adjustFontFallback: "Times New Roman" });
const pinyonScript = localFont({ variable: "--f-script", src: [{ path: "../../fonts/pinyon-script/pinyon-script-latin-400-normal.woff2", style: "normal" }], weight: "400", adjustFontFallback: "Times New Roman" });
const figtree = localFont({ variable: "--f-body", src: [{ path: "../../fonts/figtree/figtree-latin-wght-normal.woff2", style: "normal" }], weight: "300 900", adjustFontFallback: "Arial" });

export const fontClasses = `${italiana.variable} ${pinyonScript.variable} ${figtree.variable}`;
