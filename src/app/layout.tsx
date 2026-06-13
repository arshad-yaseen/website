import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import Header from "@/components/layout/header";
import ScrollToHash from "@/components/layout/ui/scroll-to-hash";
import ThemeProvider from "@/components/theme/theme-provider";
import { Inter, Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";

import "@/styles/globals.css";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
  title: {
    default: "arshad/ui",
    template: "%s - arshad/ui",
  },
  description:
    "UI components, experiments, and design notes for design engineers, from Arshad Yaseen.",
};

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = localFont({
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

const fontSerif = Libre_Baskerville({
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable}`}
    >
      <body
        className={cn(
          "font-sans antialiased",
          "[--header-height:--spacing(16)] [--layout-width:var(--container-5xl)]",
          "[--layout-padding:--spacing(4)]",
        )}
      >
        <ThemeProvider>
          <Header />
          {children}
          <ScrollToHash />
        </ThemeProvider>
      </body>
    </html>
  );
}
