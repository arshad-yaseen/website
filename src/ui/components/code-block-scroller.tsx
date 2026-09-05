"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/ui/lib/cn";

type CodeBlockScrollerProps = {
  html: string;
};

const UNLOCK_DELAY = 150;

/**
 * Renders highlighted code in its own scroll container, and drops pointer events
 * while the page scrolls so a trackpad gesture never gets trapped inside it.
 */
export function CodeBlockScroller({ html }: CodeBlockScrollerProps) {
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
        "[&_pre]:focus-visible:outline-hidden",
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
