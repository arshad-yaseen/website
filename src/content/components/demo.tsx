import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { type DemoName, demos } from "@/content/config/demos";
import { Preview } from "@/content/components/preview";
import { CodeBlock } from "@/ui/components/code-block";

const DEMOS_DIR = join(process.cwd(), "src/content/demos");

type DemoProps = {
  name: DemoName;
};

/** Renders a demo beside its own source, read from the file the registry names. */
export async function Demo({ name }: DemoProps) {
  const Component = demos[name];
  const code = await readFile(join(DEMOS_DIR, `${name}.tsx`), "utf-8");

  return (
    <div className="flex flex-col gap-3">
      <Preview>
        <Component />
      </Preview>
      <CodeBlock code={code} />
    </div>
  );
}
