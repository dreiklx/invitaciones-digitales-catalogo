import { Bodoni_Moda, Tenor_Sans } from "next/font/google";

// Didona de alto contraste + versalitas elegantes para etiquetas y textos.
const display = Bodoni_Moda({ variable: "--f-display", subsets: ["latin"], style: ["normal", "italic"] });
const body = Tenor_Sans({ variable: "--f-body", subsets: ["latin"], weight: "400" });

export const fontClasses = `${display.variable} ${body.variable}`;
