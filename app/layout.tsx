import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { baseUrl } from "./sitemap";
import { PropsWithChildren } from "react";
import Layout from "./components/layout";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Arshad Yaseen",
    template: "%s | Arshad Yaseen",
  },
  description: "Frontend engineer who does backend stuff too. Also into ML.",
  openGraph: {
    title: "Arshad Yaseen",
    description: "Frontend engineer who does backend stuff too. Also into ML.",
    url: baseUrl,
    siteName: "Arshad Yaseen",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cx("antialiased", GeistSans.variable, GeistMono.variable)}
    >
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
