export default function Home() {
  return (
    <div className="flex h-full gap-8 w-full flex-col py-28 px-6 items-center">
      <h1 className="sm:text-5xl/16 text-4xl/12 text-center font-serif font-medium max-w-2xl mx-auto tracking-tighter">
        Yuku JavaScript Parser
      </h1>
      <p className="sm:text-[1.0625rem]/8 text-base/7 dark:text-olive-400 text-olive-600 text-center max-w-xl mx-auto">
        A very fast JavaScript/TypeScript parser written in Zig to enable
        JavaScript tooling in Zig.
      </p>
    </div>
  );
}
