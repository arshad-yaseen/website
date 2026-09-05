const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arshad.fyi";

export const site = {
  name: "Arshad Yaseen",
  title: "Arshad Yaseen",
  description:
    "The personal site of Arshad Yaseen: design engineering, UI components, experiments, and writing.",
  url,
  author: { name: "Arshad Yaseen", url },
  twitter: "@arshadyaseeen",
  repository: "https://github.com/arshad-yaseen/ui",
} as const;
