import Hero from "@/components/home/hero";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center overflow-x-clip px-(--layout-padding)">
      <Hero />
    </div>
  );
}
