import { Fraunces, Instrument_Sans } from "next/font/google";

// Fraunces con sus ejes de óptica y suavidad: títulos de revista cálidos.
const display = Fraunces({
  variable: "--f-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});
const body = Instrument_Sans({ variable: "--f-body", subsets: ["latin"] });

export const fontClasses = `${display.variable} ${body.variable}`;
