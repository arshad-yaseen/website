"use client";

import { useEffect, useRef } from "react";
import { cn } from "@fyi/ui/lib/cn";
import { highlight } from "@fyi/ui/lib/highlight";

type CodeBlockProps = {
  code: string;
};

const UNLOCK_DELAY = 150;

const SYNTAX = cn(
  "[&_.code-keyword]:text-neutral-700 dark:[&_.code-keyword]:text-neutral-300",
  "[&_.code-string]:text-neutral-700 dark:[&_.code-string]:text-neutral-300",
  "[&_.code-number]:text-neutral-700 dark:[&_.code-number]:text-neutral-300",
  "[&_.code-comment]:text-neutral-600 dark:[&_.code-comment]:text-neutral-400",
  "[&_.code-sign]:text-neutral-600 dark:[&_.code-sign]:text-neutral-400",
);

/** Drops pointer events while the page scrolls, so a trackpad gesture is never trapped inside. */
export function CodeBlock({ code }: CodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    let timer = 0;
    const unlock = () => {
      element.style.pointerEvents = "";
    };
    const handleScroll = () => {
      element.style.pointerEvents = "none";
      clearTimeout(timer);
      timer = window.setTimeout(unlock, UNLOCK_DELAY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      unlock();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-slot="code-block"
      className={cn(
        "max-h-120 overflow-auto rounded-lg p-4 text-sm/6",
        "border-hairline border-current/10",
        "text-neutral-900 dark:text-white",
        "[&_pre]:focus-visible:outline-hidden",
        SYNTAX,
      )}
    >
      <pre tabIndex={0}>
        <code dangerouslySetInnerHTML={{ __html: highlight(code.trim()) }} />
      </pre>
    </div>
  );
}
