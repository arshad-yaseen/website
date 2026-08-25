import { Hero } from "@/components/home/hero";
import { JsonLd, websiteJsonLd } from "@/lib/json-ld";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center overflow-x-clip px-(--layout-padding)">
      <JsonLd data={websiteJsonLd()} />
      <Hero />
    </main>
  );
}
