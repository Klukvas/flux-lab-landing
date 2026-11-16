import { IBM_Plex_Mono, Inter, Manrope } from "next/font/google";

/*
 * Each product card is set in its product's own typeface, so these load only where the
 * catalog renders. FluxRadar uses the system Helvetica stack, as the product itself does.
 */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-catalog-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-catalog-manrope",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["500"],
  variable: "--font-catalog-plex",
  display: "swap",
});

export const catalogFontVariables = [
  inter.variable,
  manrope.variable,
  plexMono.variable,
].join(" ");
