import type { PropsWithChildren } from "react";

export function H2({ children }: PropsWithChildren) {
  return <h2 className="mt-10 text-lg font-medium tracking-tight">{children}</h2>;
}

export function H3({ children }: PropsWithChildren) {
  return <h3 className="mt-8 text-base font-medium tracking-tight">{children}</h3>;
}

export function P({ children }: PropsWithChildren) {
  return <p className="text-base/7 text-neutral-600 dark:text-neutral-400">{children}</p>;
}

export function Strong({ children }: PropsWithChildren) {
  return <strong className="font-medium text-neutral-900 dark:text-white">{children}</strong>;
}

export function Em({ children }: PropsWithChildren) {
  return <em className="font-serif">{children}</em>;
}

export function InlineCode({ children }: PropsWithChildren) {
  return (
    <code className="rounded-sm bg-neutral-200/60 px-1 py-0.5 text-[0.8125rem] text-neutral-900 dark:bg-neutral-800/60 dark:text-white">
      {children}
    </code>
  );
}

export function A({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a
      href={href}
      className="text-neutral-900 underline underline-offset-3 decoration-neutral-400 hover:decoration-current dark:text-white dark:decoration-neutral-600"
    >
      {children}
    </a>
  );
}

export function Ul({ children }: PropsWithChildren) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-base/7 text-neutral-600 marker:text-neutral-400 dark:text-neutral-400 dark:marker:text-neutral-600">
      {children}
    </ul>
  );
}

export function Li({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}
