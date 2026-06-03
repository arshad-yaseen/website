import { Inter, Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const fontMono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    {
      path: "../fonts/BerkeleyMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/BerkeleyMono-Oblique.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/BerkeleyMono-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/BerkeleyMono-Bold-Oblique.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const fontSerif = Libre_Baskerville({
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});
