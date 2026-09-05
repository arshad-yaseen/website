import { readFile } from "node:fs/promises";
import { join } from "node:path";

const FONTS_DIR = join(process.cwd(), "src/styles/fonts");

type OgFont = {
  name: string;
  data: Buffer;
  style: "normal";
  weight: 400 | 700;
};

/** Satori needs the faces as buffers, not as a stylesheet. */
export async function loadOgFonts(): Promise<OgFont[]> {
  const [regular, bold] = await Promise.all([
    readFile(join(FONTS_DIR, "berkeley-mono-regular.otf")),
    readFile(join(FONTS_DIR, "berkeley-mono-bold.otf")),
  ]);

  return [
    { name: "Berkeley Mono", data: regular, style: "normal", weight: 400 },
    { name: "Berkeley Mono", data: bold, style: "normal", weight: 700 },
  ];
}
