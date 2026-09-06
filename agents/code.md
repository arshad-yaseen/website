# Code

How code is written, what it may commit its callers to, and what it may cost. `agents/design.md` decides what to build.

## Principles

- **Less is more.** The least code, the fewest abstractions, and the fewest decisions that do the job. Delete before adding.
- **Explicit.** What a thing does is visible where it is called. Nothing happens that the call site does not show.
- **Flexible.** The lower a piece sits, the fewer decisions it makes, and every decision it makes can be overridden by its caller. An opinion in a shared piece is paid for by every caller that needs something else.
- **An abstraction must own behaviour or state.** It never exists to save keystrokes. A `Text` or `Heading` component is the example to refuse. The type tiers are a few utilities, and writing them at the call site is shorter, clearer, and free to vary. Shared components exist where behaviour is hard, such as a select or a dialog, and decide nothing beyond that behaviour and the system's tone.
- **The system is the abstraction.** Code is written by agents that read these documents and apply them. Tokens, tiers, and rules keep the codebase consistent. Wrapper components do not.

## Architecture

- **A workspace of applications and packages.** Applications are deployed, packages are shared. An application depends on packages, a package depends only on packages below it, and nothing depends on an application.
- **A package is self-contained.** It declares exactly the dependencies it imports, is consumed as source with no build step, and knows nothing about any consumer.
- **The design system owns the stylesheet and every token.** An application's stylesheet imports it and adds only that application's chrome.
- **Code is organized by layer, then by kind.** A layer says what code is for: routes, features, content, shared. A kind says what code is: components, hooks, functions, types, config. Every file is one kind in one layer.
- **Dependencies flow down.** A layer imports only from layers below it, never from above and never from a sibling. What two features share moves down a layer. What two applications share moves into a package. No cycles.
- **A feature owns everything about itself.** Its components, hooks, functions, and types live in its folder. Deleting the folder and its routes removes the feature.
- **Routes are wiring.** A route reads params, calls one feature, and renders.
- **Authored content is organized by subject, not by kind.** The types, config, and registries that describe it sit beside it.

## Files

- **A kind folder holds one kind, and the kind fixes the extension.** Components are `.tsx`, everything else is `.ts`. Anything that renders is a component. The two extensions never share a folder.
- **Nothing sits at a layer root** except files the framework names.
- **A kind folder is flat until a family needs a name.** A subfolder holds siblings that live and die together. It is never a second level of kinds.
- **One file, one export, named after it.** A family that shares a private base may share a file. A compound component exports one namespace, and past three hundred lines moves its parts into a private folder of the same name.
- **Types live with what they describe.** Props with the component, derived types with their value, everything else in `types/`.
- **Tests sit beside what they test.**
- **Registries that mirror the file system are generated** and say so on their first line. Lists that carry a decision are hand-authored in `config/`.
- **No index files.**

## Imports

- **Import the file that defines the thing, by its full path.** The path alias inside an application, the package name and export path everywhere else, including inside the package itself. No relative paths.
- **Named exports only.** Default exports only where the framework requires them.
- **No re-exports from project files.** Re-exporting from a dependency is how it is wrapped, and lives in the kind folder that matches what is wrapped.
- **`import type` for types.** Import order belongs to the formatter.
- **No side effects at module scope.**
- **Duplicate before you abstract.** Extract on the third occurrence, when the shape is known.

A structure check enforces everything above that a script can see.

## Naming

| Thing                                            | Case            | Example                                 |
| ------------------------------------------------ | --------------- | --------------------------------------- |
| Files, folders, slugs, CSS variables, attributes | kebab-case      | `theme-toggle.tsx`, `--layout-width`    |
| Components, types                                | PascalCase      | `ThemeToggle`, `SelectProps`            |
| Functions, variables, hooks, props               | camelCase       | `formatDate`, `isOpen`, `useMediaQuery` |
| Module-level primitive constants                 | SCREAMING_SNAKE | `MAX_WIDTH`                             |

- **Name the concern, never the category.** Kind folders are the only category names. No `utils`, `helpers`, `common`, `data`, `info`, `item`, `manager`.
- **Functions are verbs, everything else is nouns.** A props type is `<Component>Props`.
- **Booleans are questions, never negated.** Platform attributes keep their names.
- **`on` for callbacks, `handle` for handlers.**
- **Full words.** Only standard abbreviations such as `id`, `url`, `ref`.
- **Name intent, not implementation.** Collections are plural, lookups say their key.

## APIs

Every export is an API. The lower it sits, the more places call it, and the less it may decide.

- **Mechanism below, policy above.** A package exposes an axis and never picks a point on it for one consumer. A value only one consumer would choose lives in that consumer's config.
- **Compose, do not configure.** Small pieces the caller arranges, never one piece with a prop for every combination. Children for content, parts for structure, `className` for one-offs, variants only for a closed axis with named values.
- **Axes are orthogonal.** Every value of one variant works with every value of another. Every `variant` works with every `color`, every `size` with every `variant`. An axis that works only in some combinations is two components, or one axis too many.
- **Own what you act on, pass through the rest.** Declare the inputs you read and spread everything else onto what you render. `className`, `style`, `render`, and `ref` are always accepted. A props type extends the element it renders and omits only what the component owns.
- **The caller has the last word.** A default is a named constant that any call site can override. No style, attribute, or behaviour is fixed in a way a caller must work around.
- **State is controllable.** Value and `on<Value>Change` when controlled, `default<Value>` when not, and it works when neither is given.
- **Nothing is implicit.** No behaviour keyed off a context the caller did not compose, no prop inferred from children, no meaning in a magic string. A boolean is a switch, a choice is a union.
- **Grow beside, never within.** A new need adds a part, variant, or option. Existing callers do not change. A convenience preset is composed one layer up, never shipped by the package.
- **No workarounds.** If a caller has to wrap, fork, or copy a component to change something, the API is wrong.

## Components

- **Server by default.** `"use client"` on the smallest leaf that needs state, effects, or events.
- **A component with parts is a namespace of parts sharing state through context.** Every part is reachable, wraps one primitive, styles only itself and the children it owns, and carries `data-slot`. A component without parts is a single export.
- **A hook is one per file, takes an options object, and returns an object with named fields.** It touches the DOM only through a `ref` it was given and never renders. A hook that only wraps another hook is a re-export.
- **Keys are identity, never the index.**
- **No hand memoization.** The compiler handles it.

## Styling

- **Tailwind in `className`, tokens in the design system stylesheet.** No CSS modules, no CSS-in-JS. Inline `style` only to pass a variable the classes read.
- **`cva` varies, `cn` merges, data attributes carry state.** Class lists are arrays grouped by concern, one group per line.
- **A shared component styles only what makes it itself.** Every class it sets is a system default that `className` overrides cleanly, radius and spacing included. A style a caller cannot change without a wrapper or a fork is removed or moved onto an axis.
- **Selectors reach down, never up.** The stylesheet holds tokens, resets, and base typography, never component rules.

## Types

- **Strict, with `noUncheckedIndexedAccess`.** No `any`. `unknown` at boundaries, narrowed by a guard or a schema.
- **`type` over `interface`, unions over enums, `as const` over `enum`.**
- **Every type is named, never inline.**
- **Annotate boundaries, infer locals.** Accept wide, return narrow.
- **Derive from values.** `keyof typeof`, `ComponentProps`, `satisfies`.
- **Discriminated unions for state, exhaustive switches over them.** Never parallel booleans.
- **No `!` and no `as` to silence the compiler.** A cast carries a comment saying what was proven.

## Functions

- **Small, pure, one level of abstraction.** Side effects at the edges.
- **Guards first, no `else` after `return`, no nested ternaries.**
- **Take the value, never its container.**
- **Options object past two parameters, every option defaulted.** Policy such as a locale or a limit arrives as an argument.
- **Never mutate.** `const`, `===`, `??`.
- **No floating promises.** Independent work runs in `Promise.all`.

## Performance

- **100 on every Lighthouse metric, on every route, in both themes.**
- **Core Web Vitals hold their thresholds** on a throttled mid-range device.
- **Measure the built output.** A clean build before and after, and the delta on the routes touched. The budget is today's number.
- **Ship only what the route reaches.** Static, then server, then client. A client boundary sits on the smallest leaf.
- **The first paint waits for nothing.** No third party on a critical path. Off screen is not rendered.

## Dependencies

- **The default answer is no.** A dependency is weighed by its bytes, its surface, its transitive tree, and the day it is abandoned.
- **Install only what cannot reasonably be written here.** A framework, a renderer, a parser for a real specification, a cryptography primitive.
- **Platform before package. One tool per job.**
- **Wrap what may be replaced.** A third party API used in more than one place goes through one module.
- **A dependency leaves with its last use.**

## Accessibility

- **WCAG 2.2 AA is the floor, in both themes.**
- **Everything interactive is keyboard operable** in reading order, with focus visible, never trapped, and managed at boundaries.
- **Semantics come from the element.** Every control has a name. State and changes reach the accessibility tree.
- **Nothing is carried by color, shape, or motion alone.**
- **Platform preferences win.** Content survives 200% zoom and a 320px viewport.
- **The audit is not the standard.** A keyboard pass and a screen reader pass are part of done.

## Hygiene

- **A comment carries a constraint, a workaround, or a decision the code cannot show.** Nothing else. Plain sentences. No commented-out code, no journals. JSDoc only where the type falls short.
- **One change, one purpose.** The tree compiles at every commit, and callers update with the API they use.
- **Commit messages follow Go.** `area: what changed`, lowercase, imperative, under seventy-two characters. A short body only when the subject cannot say why. No attribution trailers, no tool links.
- **Delete, do not deprecate.** Unused code and dependencies are removed.
