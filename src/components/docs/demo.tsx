import fs from "node:fs/promises";
import path from "node:path";
import { type DemoName, demos } from "@/registry";
import { CodeBlock } from "./code-block";
import { Preview } from "./preview";

const DEMOS_DIR = path.join(process.cwd(), "src/registry/demos");

type DemoProps = {
  name: DemoName;
};

export async function Demo({ name }: DemoProps) {
  const Component = demos[name];
  const code = await fs.readFile(path.join(DEMOS_DIR, `${name}.tsx`), "utf-8");

  return (
    <div className="flex flex-col gap-3">
      <Preview>
        <Component />
      </Preview>
      <CodeBlock code={code} />
    </div>
  );
}
