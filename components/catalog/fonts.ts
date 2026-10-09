import { Cormorant_Garamond, Manrope } from "next/font/google";

// Identidad neutra del catálogo (distinta de los cinco diseños).
const display = Cormorant_Garamond({
  variable: "--f-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});
const body = Manrope({ variable: "--f-body", subsets: ["latin"] });

export const catalogFonts = `${display.variable} ${body.variable}`;
