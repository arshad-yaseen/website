import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-8 px-(--layout-padding) py-14">
      <Hero />
    </div>
  );
}
