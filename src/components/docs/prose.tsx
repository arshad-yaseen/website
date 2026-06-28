import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/utils/cn";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type HeadingProps = PropsWithChildren<{
  as: "h2" | "h3";
  className: string;
}>;

type AnchorLinkProps = PropsWithChildren<{
  href: string;
}>;

export function AnchorLink({ href, children }: AnchorLinkProps) {
  return (
    <a href={href}>
      <span
        aria-hidden
        className="mr-2 -ml-5 text-neutral-400 opacity-0 transition-opacity duration-150 ease-out select-none group-hover:opacity-100 motion-reduce:transition-none dark:text-neutral-600"
      >
        #
      </span>
      {children}
    </a>
  );
}

function Heading({ as: Tag, className, children }: HeadingProps) {
  if (typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  const id = slugify(children);

  return (
    <Tag id={id} className={`group ${className}`}>
      <AnchorLink href={`#${id}`}>{children}</AnchorLink>
    </Tag>
  );
}

export function H2({ children }: PropsWithChildren) {
  return (
    <Heading as="h2" className="mt-10 text-lg font-medium tracking-tight">
      {children}
    </Heading>
  );
}

export function H3({ children }: PropsWithChildren) {
  return (
    <Heading as="h3" className="mt-8 text-base font-medium tracking-tight">
      {children}
    </Heading>
  );
}

export function P({ children }: PropsWithChildren) {
  return <p className="text-base/7 text-neutral-600 dark:text-neutral-400">{children}</p>;
}

type CalloutProps = PropsWithChildren<{
  className?: string;
}>;

export function Callout({ className, children }: CalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-lg bg-neutral-100/60 px-4 py-3 text-sm/6 text-neutral-600 dark:bg-neutral-900/60 dark:text-neutral-400",
        className,
      )}
    >
      {children}
    </aside>
  );
}

export function Strong({ children }: PropsWithChildren) {
  return <strong className="font-medium text-neutral-800 dark:text-neutral-200">{children}</strong>;
}

export function InlineCode({ children }: PropsWithChildren) {
  return (
    <code className="rounded-sm bg-neutral-200/60 px-1 py-0.5 text-sm text-neutral-900 ring ring-neutral-200 dark:bg-neutral-800/60 dark:text-white dark:ring-neutral-800">
      {children}
    </code>
  );
}

type AProps = PropsWithChildren<{
  href: string;
}>;

export function A({ href, children }: AProps) {
  return (
    <a
      href={href}
      className="text-neutral-900 underline decoration-neutral-400 underline-offset-2 transition-colors hover:decoration-neutral-500 dark:text-white dark:decoration-neutral-600 dark:hover:decoration-neutral-500"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function Hr() {
  return <hr className="border-t-hairline border-current/10" />;
}

export function Ul({ children }: PropsWithChildren) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-base/7 text-neutral-600 marker:text-neutral-400 dark:text-neutral-400 dark:marker:text-neutral-600">
      {children}
    </ul>
  );
}

export function Ol({ children }: PropsWithChildren) {
  return (
    <ol className="list-decimal space-y-3 pl-5 text-base/7 text-neutral-600 marker:text-neutral-400 dark:text-neutral-400 dark:marker:text-neutral-600">
      {children}
    </ol>
  );
}

export function Li({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}

type TableProps = {
  head: ReactNode[];
  rows: ReactNode[][];
};

export function Table({ head, rows }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border-hairline border-current/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b-hairline border-current/10 text-neutral-600 dark:text-neutral-400">
            {head.map((cell) => (
              <th key={String(cell)} className="px-4 py-2.5 font-medium whitespace-nowrap">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={String(row[0])} className="border-current/10 not-last:border-b-hairline">
              {row.map((cell, column) => (
                <td
                  key={`${String(row[0])}-${String(head[column])}`}
                  className="px-4 py-2.5 align-top text-neutral-600 dark:text-neutral-400"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
