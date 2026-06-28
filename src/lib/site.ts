const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arshad.fyi";

export const siteConfig = {
  name: "arshad/ui",
  title: "arshad/ui",
  description:
    "UI components, experiments, and design notes for design engineers, from Arshad Yaseen.",
  url,
  author: { name: "Arshad Yaseen", url },
  twitter: "@arshadyaseeen",
} as const;
