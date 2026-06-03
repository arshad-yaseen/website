import type { Metadata } from "next";
import Providers from "@/components/providers/providers";
import { fontMono, fontSans, fontSerif } from "@/lib/fonts";

import "@/styles/globals.css";

import Layout from "@/components/layout/root-layout";

export const metadata: Metadata = {
  title: "arshad/ui",
  description:
    "UI components, experiments, and design notes for design engineers, from Arshad Yaseen.",
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
