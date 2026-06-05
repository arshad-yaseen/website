import { codeToHtml } from "shiki";

export async function CodeBlock({ code, lang = "tsx" }: { code: string; lang?: string }) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  });

  return (
    <div
      className="overflow-x-auto rounded-lg hairline border-current/10 p-4 text-[0.8125rem]/6 [&_pre]:focus-visible:outline-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
