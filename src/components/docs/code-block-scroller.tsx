"use client";

import { useEffect, useRef } from "react";

type CodeBlockScrollerProps = {
  html: string;
};

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
    const onScroll = () => {
      element.style.pointerEvents = "none";
      clearTimeout(timer);
      timer = window.setTimeout(unlock, 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
      unlock();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-slot="code-block"
      className="max-h-120 overflow-auto rounded-lg border-hairline border-current/10 p-4 text-[0.8125rem]/6 [&_pre]:focus-visible:outline-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
