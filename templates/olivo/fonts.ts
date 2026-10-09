import { Jost, Playfair_Display } from "next/font/google";

// Tipografías del diseño. En un módulo aparte para que solo se precarguen
// en las páginas donde se usan (ver docs de next/font, "Using Multiple Fonts").
const display = Playfair_Display({ variable: "--f-display", subsets: ["latin"], style: ["normal", "italic"] });
const body = Jost({ variable: "--f-body", subsets: ["latin"] });

export const fontClasses = `${display.variable} ${body.variable}`;
