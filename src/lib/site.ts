const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arshad.fyi";

export const siteConfig = {
  name: "Arshad Yaseen",
  title: "Arshad Yaseen",
  description:
    "The personal site of Arshad Yaseen: design engineering, UI components, experiments, and writing.",
  url,
  author: { name: "Arshad Yaseen", url },
  twitter: "@arshadyaseeen",
} as const;
