import fs from "node:fs/promises";
import path from "node:path";
import { CodeBlock } from "./code-block";
import { Preview } from "./preview";

const DEMOS_DIR = path.join(process.cwd(), "src/registry/demos");

export async function Demo({ name }: { name: string }) {
  const [{ default: Component }, code] = await Promise.all([
    import(`@/registry/demos/${name}`),
    fs.readFile(path.join(DEMOS_DIR, `${name}.tsx`), "utf-8"),
  ]);

  return (
    <div className="flex flex-col gap-3">
      <Preview>
        <Component />
      </Preview>
      <CodeBlock code={code} />
    </div>
  );
}
