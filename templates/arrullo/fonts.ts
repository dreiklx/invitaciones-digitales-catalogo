import { DM_Sans, Gilda_Display } from "next/font/google";

const display = Gilda_Display({ variable: "--f-display", subsets: ["latin"], weight: "400" });
const body = DM_Sans({ variable: "--f-body", subsets: ["latin"] });

export const fontClasses = `${display.variable} ${body.variable}`;
