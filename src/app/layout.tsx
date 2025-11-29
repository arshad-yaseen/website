import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import Providers from "@/components/providers/providers";

import "@/styles/globals.css";

import Layout from "@/components/layout/root-layout";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const fontSerif = localFont({
  src: [
    {
      path: "../../public/Redaction-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Redaction-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/Redaction-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ui",
  description:
    "Precision-crafted UI components I use, highly customizable and built for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} font-sans antialiased`}
      >
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
