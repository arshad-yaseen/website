import { ImageResponse } from "next/og";
import { OgImage } from "@/shared/components/og-image";
import { og } from "@/shared/config/og";
import { site } from "@/shared/config/site";
import { loadOgFonts } from "@fyi/ui/lib/load-og-fonts";

export const alt = site.description;
export const size = og.size;
export const contentType = og.contentType;

export default async function Image() {
  return new ImageResponse(
    <OgImage title={site.name} subtitle="Design engineer · UI · writing" />,
    { ...og.size, fonts: await loadOgFonts() },
  );
}
