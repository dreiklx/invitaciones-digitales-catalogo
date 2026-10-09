import { Figtree, Italiana, Pinyon_Script } from "next/font/google";

// Tipografías del diseño. En un módulo aparte para que solo se precarguen
// en las páginas donde se usan (ver docs de next/font, "Using Multiple Fonts").
// Pinyon Script (caligrafía) solo para el nombre: clase `font-script`.
const display = Italiana({ variable: "--f-display", subsets: ["latin"], weight: "400" });
const script = Pinyon_Script({ variable: "--f-script", subsets: ["latin"], weight: "400" });
const body = Figtree({ variable: "--f-body", subsets: ["latin"] });

export const fontClasses = `${display.variable} ${script.variable} ${body.variable}`;
