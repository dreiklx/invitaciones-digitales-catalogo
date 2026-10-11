import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";

const display = Instrument_Serif({
  variable: "--f-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const body = Hanken_Grotesk({ variable: "--f-body", subsets: ["latin"] });

export const fontClasses = `${display.variable} ${body.variable}`;
