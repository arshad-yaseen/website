// import { HomeComposer } from "@/components/pages/home/composer";
import Hero from "@/components/pages/home/hero";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-8 px-6 py-16">
      <Hero />
      {/*<HomeComposer />*/}
    </div>
  );
}
