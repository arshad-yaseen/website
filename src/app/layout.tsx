import type { Metadata } from "next";
import Header from "@/components/layout/header";
import ThemeProvider from "@/components/theme/theme-provider";
import { fontMono, fontSans, fontSerif } from "@/lib/fonts";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "arshad/ui",
    template: "%s - arshad/ui",
  },
  description:
    "UI components, experiments, and design notes for design engineers, from Arshad Yaseen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} ${fontSerif.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
