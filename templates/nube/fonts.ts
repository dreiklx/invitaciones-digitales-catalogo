import { Fredoka, Nunito } from "next/font/google";

// Tipografías del diseño. En un módulo aparte para que solo se precarguen
// en las páginas donde se usan (ver docs de next/font, "Using Multiple Fonts").
const display = Fredoka({ variable: "--f-display", subsets: ["latin"] });
const body = Nunito({ variable: "--f-body", subsets: ["latin"] });

export const fontClasses = `${display.variable} ${body.variable}`;
