import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { PropsWithChildren } from "react";
import { Preview } from "@/content/components/preview";
import { CodeBlock } from "@/ui/components/code-block";

const DEMOS_DIR = join(process.cwd(), "src/content/demos");

type DemoProps = PropsWithChildren<{
  /** Path of the demo under `content/demos`, without the extension. */
  name: string;
}>;

export async function Demo({ name, children }: DemoProps) {
  const code = await readFile(join(DEMOS_DIR, `${name}.tsx`), "utf-8");

  return (
    <div className="flex flex-col gap-3">
      <Preview>{children}</Preview>
      <CodeBlock code={code} />
    </div>
  );
}
