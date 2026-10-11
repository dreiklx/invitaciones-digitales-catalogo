import { Cormorant_Garamond, Jost } from "next/font/google";

// Tipografías del diseño. En un módulo aparte para que solo se precarguen
// en las páginas donde se usan (ver docs de next/font, "Using Multiple Fonts").
const display = Cormorant_Garamond({ variable: "--f-display", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const body = Jost({ variable: "--f-body", subsets: ["latin"] });

export const fontClasses = `${display.variable} ${body.variable}`;
