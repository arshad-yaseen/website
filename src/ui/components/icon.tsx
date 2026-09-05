import type { ComponentProps, ReactNode } from "react";

const icons = {
  Moon: <path d="M9.44 4.26A8 8 0 1 0 19.74 14.56 8 8 0 0 1 9.44 4.26Z" />,
  Sun: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.25V4.75M12 19.25v2.5M21.75 12H19.25M4.75 12H2.25M18.89 5.11 17.13 6.87M6.87 17.13 5.11 18.89M18.89 18.89 17.13 17.13M6.87 6.87 5.11 5.11" />
    </>
  ),
  Monitor: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="3" />
      <path d="M12 17v2.5M8 19.5h8" />
    </>
  ),
  ArrowUpRight: <path d="M7.5 16.5 16.5 7.5M9.5 7.5h7v7" />,
  ChevronLeft: <path d="M14 6 9 12l5 6" />,
  ChevronRight: <path d="M10 6l5 6-5 6" />,
  Plus: <path d="M12 5.5v13M5.5 12h13" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

export type IconProps = Omit<ComponentProps<"svg">, "children"> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      data-slot="icon"
    >
      {icons[name]}
    </svg>
  );
}
