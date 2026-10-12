import localFont from "next/font/local";

// Tipografías de las MINIATURAS del catálogo (templates/previews.tsx): los
// mismos archivos, ejes y nombres de familia que templates/<diseño>/fonts.ts,
// pero sin precarga y en un módulo que solo usa el catálogo. Si el catálogo
// importara los fonts.ts de los diseños, esos módulos quedarían compartidos
// y, al agrupar el CSS, una demo terminaba precargando tipografías de otro
// diseño (Nube bajaba DM Sans; Riviera, Fredoka). tests/unit/fonts.test.ts
// comprueba que coincidan con las de cada diseño.

const newsreader = localFont({ variable: "--f-display", src: [{ path: "../fonts/newsreader/newsreader-latin-wght-normal.woff2", style: "normal" }, { path: "../fonts/newsreader/newsreader-latin-wght-italic.woff2", style: "italic" }], weight: "200 800", adjustFontFallback: "Times New Roman", preload: false });
const manrope = localFont({ variable: "--f-body", src: [{ path: "../fonts/manrope/manrope-latin-wght-normal.woff2", style: "normal" }], weight: "200 800", adjustFontFallback: "Arial", preload: false });
const fraunces = localFont({ variable: "--f-display", src: [{ path: "../fonts/fraunces/fraunces-latin-full-normal.woff2", style: "normal" }, { path: "../fonts/fraunces/fraunces-latin-full-italic.woff2", style: "italic" }], weight: "100 900", adjustFontFallback: "Times New Roman", preload: false });
const instrumentSans = localFont({ variable: "--f-body", src: [{ path: "../fonts/instrument-sans/instrument-sans-latin-wght-normal.woff2", style: "normal" }], weight: "400 700", adjustFontFallback: "Arial", preload: false });
const bodoniModa = localFont({ variable: "--f-display", src: [{ path: "../fonts/bodoni-moda/bodoni-moda-latin-wght-normal.woff2", style: "normal" }, { path: "../fonts/bodoni-moda/bodoni-moda-latin-wght-italic.woff2", style: "italic" }], weight: "400 900", adjustFontFallback: "Times New Roman", preload: false });
const tenorSans = localFont({ variable: "--f-body", src: [{ path: "../fonts/tenor-sans/tenor-sans-latin-400-normal.woff2", style: "normal" }], weight: "400", adjustFontFallback: "Arial", preload: false });
const italiana = localFont({ variable: "--f-display", src: [{ path: "../fonts/italiana/italiana-latin-400-normal.woff2", style: "normal" }], weight: "400", adjustFontFallback: "Times New Roman", preload: false });
const pinyonScript = localFont({ variable: "--f-script", src: [{ path: "../fonts/pinyon-script/pinyon-script-latin-400-normal.woff2", style: "normal" }], weight: "400", adjustFontFallback: "Times New Roman", preload: false });
const figtree = localFont({ variable: "--f-body", src: [{ path: "../fonts/figtree/figtree-latin-wght-normal.woff2", style: "normal" }], weight: "300 900", adjustFontFallback: "Arial", preload: false });
const cormorantGaramond = localFont({ variable: "--f-display", src: [{ path: "../fonts/cormorant-garamond/cormorant-garamond-latin-wght-normal.woff2", style: "normal" }, { path: "../fonts/cormorant-garamond/cormorant-garamond-latin-wght-italic.woff2", style: "italic" }], weight: "300 700", adjustFontFallback: "Times New Roman", preload: false });
const jost = localFont({ variable: "--f-body", src: [{ path: "../fonts/jost/jost-latin-wght-normal.woff2", style: "normal" }], weight: "100 900", adjustFontFallback: "Arial", preload: false });
const gildaDisplay = localFont({ variable: "--f-display", src: [{ path: "../fonts/gilda-display/gilda-display-latin-400-normal.woff2", style: "normal" }], weight: "400", adjustFontFallback: "Times New Roman", preload: false });
const dmSans = localFont({ variable: "--f-body", src: [{ path: "../fonts/dm-sans/dm-sans-latin-wght-normal.woff2", style: "normal" }], weight: "100 1000", adjustFontFallback: "Arial", preload: false });
const fredoka = localFont({ variable: "--f-display", src: [{ path: "../fonts/fredoka/fredoka-latin-wght-normal.woff2", style: "normal" }], weight: "300 700", adjustFontFallback: "Arial", preload: false });
const nunito = localFont({ variable: "--f-body", src: [{ path: "../fonts/nunito/nunito-latin-wght-normal.woff2", style: "normal" }], weight: "200 1000", adjustFontFallback: "Arial", preload: false });
const gloock = localFont({ variable: "--f-display", src: [{ path: "../fonts/gloock/gloock-latin-400-normal.woff2", style: "normal" }], weight: "400", adjustFontFallback: "Times New Roman", preload: false });

import type { TemplateId } from "@/lib/invitation/types";

export const previewFontClasses: Record<TemplateId, string> = {
  olivo: `${newsreader.variable} ${manrope.variable}`,
  tierra: `${fraunces.variable} ${instrumentSans.variable}`,
  gala: `${bodoniModa.variable} ${tenorSans.variable}`,
  aurora: `${italiana.variable} ${pinyonScript.variable} ${figtree.variable}`,
  aguamarina: `${cormorantGaramond.variable} ${jost.variable}`,
  arrullo: `${gildaDisplay.variable} ${dmSans.variable}`,
  nube: `${fredoka.variable} ${nunito.variable}`,
  riviera: `${gloock.variable} ${dmSans.variable}`,
};
