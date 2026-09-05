import { Inter, Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";

// next/font resolves local sources relative to this file, so these stay relative.
const mono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    { path: "../../styles/fonts/berkeley-mono-regular.otf", weight: "400", style: "normal" },
    { path: "../../styles/fonts/berkeley-mono-oblique.otf", weight: "400", style: "italic" },
    { path: "../../styles/fonts/berkeley-mono-bold.otf", weight: "700", style: "normal" },
    { path: "../../styles/fonts/berkeley-mono-bold-oblique.otf", weight: "700", style: "italic" },
  ],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Libre_Baskerville({
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const fonts = { sans, mono, serif } as const;
