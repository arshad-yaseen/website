import { type BundledLanguage, codeToHtml } from "shiki";
import { CodeBlockScroller } from "./code-block-scroller";

type CodeBlockProps = {
  code: string;
  lang?: BundledLanguage;
};

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  });

  return <CodeBlockScroller html={html} />;
}
