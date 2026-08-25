import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";
import Header from "@/components/layout/header";
import ScrollToHash from "@/components/layout/ui/scroll-to-hash";
import ThemeProvider from "@/components/theme/theme-provider";
import { siteConfig } from "@/lib/site";
import { Inter, Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";

import "@/styles/globals.css";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [siteConfig.author],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitter,
    site: siteConfig.twitter,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c09" },
  ],
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
          "[--header-height:--spacing(16)] [--layout-width:var(--container-4xl)]",
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
