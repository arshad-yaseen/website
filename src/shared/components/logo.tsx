import type { SVGProps } from "react";
import { cn } from "@/ui/lib/cn";

type LogoProps = SVGProps<SVGSVGElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 448 256"
      aria-hidden="true"
      className={cn("h-8 shrink-0", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0H192V64H0V0ZM0 64H64V256H0V64ZM128 64H192V256H128V64ZM64 128H128V192H64V128ZM256 0H320V64H256V0ZM384 0H448V64H384V0ZM320 64H384V256H320V64Z"
      />
    </svg>
  );
}
