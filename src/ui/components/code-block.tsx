import { type BundledLanguage, codeToHtml, type SpecialLanguage } from "shiki";
import { CodeBlockScroller } from "@/ui/components/code-block-scroller";

type CodeBlockProps = {
  code: string;
  lang?: BundledLanguage | SpecialLanguage;
};

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  });

  return <CodeBlockScroller html={html} />;
}
