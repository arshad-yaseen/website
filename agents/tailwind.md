# Tailwind

How Tailwind is written here, in the idiom of the version installed.

Tailwind v4 moved configuration into CSS and changed enough defaults that v3 habits now
produce working but wrong code. This document is the v4 way, verified against the version
in `packages/ui/package.json`. `agents/design.md` decides which values to reach for. This decides how
they are expressed.

Written against **tailwindcss 4.3.3**. When that version moves, re-check the sections
marked below against <https://tailwindcss.com/docs>, which stays the reference for the
utility tables this file deliberately does not copy.

## The model

- **Configuration is CSS.** One `@import "tailwindcss"` and a theme block. There is no
  `tailwind.config.js`, no `content` array, no `theme.extend`.
- **Source files are found, not listed.** The engine scans the project. `@source` adds a
  path it cannot infer, and is only needed for content outside the tree.
- **A token is a CSS variable and a utility at once.** Declaring `--color-accent-500`
  creates `bg-accent-500`, `text-accent-500`, `ring-accent-500`, and the rest of the
  namespace, and the variable stays readable at runtime.
- **The stylesheet is the source of truth.** A value that is not in `@theme` is not a
  token, whatever a comment claims.

## Theme

- **`@theme` emits variables, `@theme inline` does not.** Use `inline` when a token only
  aliases another variable, so the alias resolves at build time instead of shipping a
  second indirection. Use plain `@theme` when the value must be readable or overridable at
  runtime, such as anything a theme switch changes.
- **Namespaces decide which utilities appear.** `--color-*`, `--spacing`, `--text-*`,
  `--font-*`, `--font-weight-*`, `--radius-*`, `--shadow-*`, `--inset-shadow-*`,
  `--drop-shadow-*`, `--text-shadow-*`, `--blur-*`, `--ease-*`, `--animate-*`,
  `--breakpoint-*`, `--container-*`, `--leading-*`, `--tracking-*`, `--aspect-*`,
  `--perspective-*`, `--border-width-*`. A name outside a namespace is an ordinary
  variable and generates nothing.
- **`--spacing` is one number.** Every spacing, sizing, inset, and numeric leading utility
  derives from it, so the whole interface tightens or loosens from a single token.
- **Overriding a namespace wholesale uses `--color-*: initial`.** Clearing before
  declaring is how a palette is replaced rather than extended.
- **Runtime theming happens in `:root` and the theme class, not in `@theme`.** Tokens
  point at variables, and those variables change per theme.

## Custom utilities and variants

- **`@utility` defines a utility.** Not `@layer utilities`, which no longer sorts or
  merges correctly. A `--value(…)` argument makes it accept a scale.
- **`@custom-variant` defines a variant.** `@custom-variant dark (&:is(.dark *))` is how a
  class-based dark mode is declared, since v4 has no `darkMode` option.
- **`@variant` applies a variant inside CSS**, for the rare rule that cannot be written as
  a class.
- **`@apply` is a last resort**, and in an isolated stylesheet it needs `@reference` to see
  the theme. Prefer a component that owns its classes.

## Writing classes

- **Arbitrary values are square brackets, arbitrary properties are too.**
  `w-[calc(100%-1rem)]` sets a value, `[--panel-width:12rem]` sets a property. The second
  is how a component passes a variable that its own classes then read.
- **A variable value has a shorthand.** `bg-(--brand)` beats `bg-[var(--brand)]`, and
  `border-(length:--hairline)` carries the data type when the property is ambiguous.
- **An underscore in an arbitrary value means a space.** A literal underscore must be
  escaped as `\_`, which matters for any selector or font family that contains one. This
  fails silently: the class compiles, the selector just never matches.
- **`!` goes at the end.** `text-red-500!`, not `!text-red-500`. Reach for it only when a
  third party stylesheet outranks you, never to win against your own classes.
- **Prefixes go at the front and are variant-like.** `tw:flex`, configured on the import.

## Variants worth knowing

- **State and ARIA read from the element.** `data-[state=open]:`, `data-disabled:`,
  `aria-expanded:`, and bare `data-*` for presence. Prefer these over a boolean prop that
  swaps class strings.
- **`group` and `peer` take names.** `group/item` with `group-hover/item:` keeps nesting
  unambiguous.
- **Variants compose.** `dark:hover:not-focus:` reads left to right, and `not-*`,
  `in-*`, `has-*`, and `*` target relations rather than states.
- **Container queries are built in.** `@container` on the parent, `@sm:` and `@max-md:` on
  the child. Reach for these before breakpoints when a component can appear at more than
  one width.
- **`hover:` already guards itself.** v4 wraps hover variants in `@media (hover: hover)`,
  so a touch device never sticks in a hovered state without extra work.
- **`starting:` animates an element's first frame**, which is how a popover or dialog
  enters without JavaScript.

## Coming from v3

These are the defaults that changed. Code written from v3 memory compiles and looks wrong.

| v3 habit                             | v4                                            |
| ------------------------------------ | --------------------------------------------- |
| `tailwind.config.js`                 | `@theme` in CSS                               |
| `content: [...]`                     | automatic detection, `@source` for the rest   |
| `@layer utilities`                   | `@utility`                                    |
| `darkMode: "class"`                  | `@custom-variant dark`                        |
| `!text-red-500`                      | `text-red-500!`                               |
| `bg-[var(--x)]`                      | `bg-(--x)`                                    |
| `ring` was 3px and blue              | `ring` is 1px and `currentColor`              |
| `shadow-sm`, `blur-sm`               | renamed one step down, `shadow-xs`, `blur-xs` |
| `flex-shrink-0`, `overflow-ellipsis` | `shrink-0`, `text-ellipsis`                   |
| `w-4 h-4`                            | `size-4`                                      |
| separate container queries plugin    | built in                                      |

## In this codebase

- **`cn` merges, `cva` varies**, per `agents/code.md`. A conflict between two classes is
  resolved by the merge engine, so a custom scale the engine does not recognise has to be
  taught to it, or it will be dropped as the wrong kind of class.
- **Long class lists are arrays grouped by concern**, one group per line.
- **Never hardcode what a token expresses.** `agents/design.md` owns the spacing, type,
  radius, and color scales, and a raw value that bypasses them is a bug even when it
  renders correctly.
