import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const FONTS_DIR = join(process.cwd(), "src/fonts");

async function loadFonts() {
  const [regular, bold] = await Promise.all([
    readFile(join(FONTS_DIR, "BerkeleyMono-Regular.otf")),
    readFile(join(FONTS_DIR, "BerkeleyMono-Bold.otf")),
  ]);

  return [
    { name: "Berkeley Mono", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Berkeley Mono", data: bold, style: "normal" as const, weight: 700 as const },
  ];
}

/** Shrink the title as it gets longer so it always fits the frame. */
function titleSize(length: number) {
  if (length > 55) return 56;
  if (length > 38) return 68;
  if (length > 22) return 82;
  return 100;
}

type RenderOgImageOptions = {
  title: string;
  subtitle?: string;
};

export async function renderOgImage({ title, subtitle }: RenderOgImageOptions) {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        padding: "100px",
        fontFamily: "Berkeley Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "1000px",
          fontSize: titleSize(title.length),
          fontWeight: 700,
          color: "#1a1a17",
          lineHeight: 1.15,
          textAlign: "center",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: "32px",
            fontSize: "28px",
            fontWeight: 400,
            color: "#9b9b90",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>,
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
