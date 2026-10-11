import { Manrope, Newsreader } from "next/font/google";

// Tipografías del diseño. En un módulo aparte para que solo se precarguen
// en las páginas donde se usan (ver docs de next/font, "Using Multiple Fonts").
const display = Newsreader({ variable: "--f-display", subsets: ["latin"], style: ["normal", "italic"], weight: ["300", "400"] });
const body = Manrope({ variable: "--f-body", subsets: ["latin"] });

export const fontClasses = `${display.variable} ${body.variable}`;
