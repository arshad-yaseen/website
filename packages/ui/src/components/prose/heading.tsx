import type { PropsWithChildren } from "react";
import { cn } from "@fyi/ui/lib/cn";
import { slugify } from "@fyi/shared/lib/slugify";

type HeadingProps = PropsWithChildren<{
  as: "h2" | "h3";
  className: string;
}>;

type AnchorLinkProps = PropsWithChildren<{
  href: string;
}>;

function AnchorLink({ href, children }: AnchorLinkProps) {
  return (
    <a href={href}>
      <span
        aria-hidden
        className={cn(
          "mr-2 -ml-5 select-none",
          "text-foreground/50",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-150 motion-reduce:transition-none",
        )}
      >
        #
      </span>
      {children}
    </a>
  );
}

/** Only string headings get an id, because a slug needs text to derive one from. */
function Heading({ as: Tag, className, children }: HeadingProps) {
  if (typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }

  const id = slugify(children);

  return (
    <Tag id={id} className={cn("group", className)}>
      <AnchorLink href={`#${id}`}>{children}</AnchorLink>
    </Tag>
  );
}

export function H2({ children }: PropsWithChildren) {
  return (
    <Heading as="h2" className="mt-10 text-lg font-medium tracking-tight text-balance">
      {children}
    </Heading>
  );
}

export function H3({ children }: PropsWithChildren) {
  return (
    <Heading as="h3" className="mt-8 text-base/7 font-medium tracking-tight text-balance">
      {children}
    </Heading>
  );
}
