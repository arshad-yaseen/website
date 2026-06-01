import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

export function HomeComposer() {
  return (
    <div className="w-full rounded-2xl dark:bg-neutral-900 ring dark:ring-white/10 ring-neutral-950/5 shadow-sm bg-neutral-50 max-w-(--layout-width) h-44 flex flex-col my-6">
      <div className="rounded-2xl dark:bg-neutral-950 ring dark:ring-white/5 ring-neutral-300/80 bg-neutral-100 flex-1">
        <textarea
          placeholder="Describe the motion video you want to create..."
          className="w-full p-4 resize-none rounded-2xl h-full focus:outline-none ring-accent-500 ring-offset-0 focus-visible:ring-2 dark:placeholder:text-neutral-400 placeholder:text-neutral-500"
        />
      </div>
      <div className="p-2 flex justify-end w-full">
        <Button color="accent" size="lg" className="rounded-lg">
          Create
        </Button>
      </div>
    </div>
  );
}
