# Code

The standards that keep an interface maintainable as the codebase grows.

Code is organized by layer, then by kind. A layer says what code is for, a kind says what code is, and every file is exactly one thing in exactly one place. `agents/design.md` decides what to build. These sections decide how it is written.

## Architecture

```
src/
  app/        Routes. Only the files Next.js names, each delegating to a feature.
  features/   One folder per product area. Owns its components, hooks, functions, and types.
  content/    Authored material, with the types, config, and registries that describe and list it.
  shared/     Cross-cutting code with no domain knowledge.
  ui/         Design system primitives. Publishable on its own.
  styles/     Global CSS, tokens, fonts.
```

- **Dependencies flow down.** A layer imports only from the layers below it, never from above and never from a sibling feature. What two features share moves down a layer. A cycle is a design error.
- **A feature owns everything about itself.** Its components, hooks, functions, and types live inside its folder and nowhere else. Deleting the folder and its routes removes the feature, and the compiler lists every dangling import, because no barrel stands between a file and its users.
- **Routes are wiring.** A route file reads params, calls one feature, and renders. No logic, no markup beyond layout, no data shaping.
- **Nothing sits at a layer root.** Every file lives inside a kind folder, or inside an authored tree under `content/`. `app/` and `styles/` are the exceptions, because the framework names their files.

### Kinds

A kind folder holds one kind of file, and the kind fixes the extension. The list is closed. A new kind is added to this table and to the structure check before its first folder exists.

| Folder        | Holds                                       | Extension |
| ------------- | ------------------------------------------- | --------- |
| `components/` | React components                            | `.tsx`    |
| `hooks/`      | React hooks, one `use*` per file            | `.ts`     |
| `lib/`        | Functions with no JSX                       | `.ts`     |
| `types/`      | Types only, no runtime code                 | `.ts`     |
| `config/`     | Hand-authored constants                     | `.ts`     |
| `registry/`   | Generated lists that mirror the file system | `.ts`     |

- **The extension is the kind.** A hook that returns JSX is a component. A function that returns JSX is a component. Nothing in `lib/` renders, nothing in `components/` is a plain function.
- **`.ts` and `.tsx` never share a folder.** This follows from the rule above, and the structure check enforces it.
- **A kind folder is flat until a family needs a name.** A subfolder groups siblings that are used together and deleted together, such as the parts of a prose system or the icons of an icon set. It is never a second level of kinds.
- **Authored material is organized by subject, not by kind.** Under `content/`, docs, writings, and demos form trees of `.tsx` files grouped by what they are about. Those trees hold no kind folders. The kind folders beside them hold what types, configures, and lists the material.

### Files

- **One file, one export, named after it.** `button.tsx` exports `Button`, `use-theme.ts` exports `useTheme`, `format-date.ts` exports `formatDate`. A reader who knows the export knows the path.
- **A family may share a file.** Siblings that share a private base and die together live in one file named after the family: a heading file exporting each level, a list file exporting the list and its item.
- **A compound component is one file.** It exports one namespace whose parts are private functions. When the file passes three hundred lines, it keeps its name and gains a same-named folder beside it that holds the parts. The file stays the only import path, the folder is private to it.
- **A props type lives with its component.** A type derived from a value lives with that value. Every other type lives in `types/`, one type or one family per file.
- **A test sits beside what it tests.** `format-date.test.ts` beside `format-date.ts`.
- **No index files.** Not at a layer, not at a feature, not in a folder. An index hides what a folder exports, breaks every importer when one file moves, and defeats tree shaking. Import the file that defines the thing.
- **Registries are generated.** A list that mirrors the file system comes from a script, says so on its first line, and is never edited by hand. A list that carries a decision, such as an order, is hand-authored in `config/`.

### Imports

- **Every project import uses `@/` and the full path.** `@/ui/components/button`, never `./button`, never `../lib/cn`. One string names each file everywhere it is used, so a grep for the path finds every importer and a move is one find and replace.
- **Named exports only.** Default exports only where Next.js requires them.
- **No re-exports from project files.** `export { x } from "@/..."` is a barrel by another name. Re-exporting from a package is how a dependency gets wrapped, and it lives in the kind folder that matches what is wrapped.
- **`import type` for types.** Import order belongs to the formatter.
- **No side effects at module scope.** Importing a file never runs code that reaches outside the file. Constants, definitions, and configuration read once from the environment are fine.
- **One file, one responsibility.** Past three hundred lines, find the second one and split.
- **Duplicate before you abstract.** Two similar things are not a pattern. Extract on the third, when the shape is known.

The structure check fails on everything above that a script can see: files at a layer root, unknown kinds, wrong extensions, index files, relative imports, project re-exports, and names that are not kebab-case.

## Naming

| Thing                                            | Case            | Example                                 |
| ------------------------------------------------ | --------------- | --------------------------------------- |
| Files, folders, slugs, CSS variables, attributes | kebab-case      | `theme-toggle.tsx`, `--layout-width`    |
| Components, types                                | PascalCase      | `ThemeToggle`, `SelectProps`            |
| Functions, variables, hooks, props               | camelCase       | `formatDate`, `isOpen`, `useMediaQuery` |
| Module-level primitive constants                 | SCREAMING_SNAKE | `MAX_WIDTH`                             |

- **A file is named after its export.** `button.tsx` exports `Button`, `use-theme.ts` exports `useTheme`. When the export is a deliberate short alias for the element it renders, the file carries the element's full name, `paragraph.tsx` exports `P`.
- **Name the concern, never the category.** `format-date.ts`, not `utils.ts`. Kind folders are the only category names in the tree, and they come from the kinds table. No `utils`, `helpers`, `misc`, or `common` anywhere.
- **Functions are verbs, everything else is nouns.** `getDoc`, `formatDate`. A component is what it renders, a type is what it describes, a props type is `<Component>Props`.
- **Booleans are questions.** `isLoading`, `hasError`, `canSubmit`. Platform attributes keep their names, `open`, `disabled`. Never negated.
- **`on` for callbacks, `handle` for handlers.** `onOpenChange` in props, `handleOpenChange` inside the component.
- **Full words, no filler.** `button` not `btn`, `error` not `e`. Never `data`, `info`, `item`, `manager`, `helper`, `util`, in a name or as a file name. Standard abbreviations stay: `id`, `url`, `ref`, `props`.
- **Name intent, not implementation.** `visibleDocs`, not `filteredDocs`. Collections are plural and lookups say their key, `docs`, `docsBySlug`.

## Components

- **Server by default.** `"use client"` on the smallest leaf that needs state, effects, or events. Server content passes through as `children`.
- **Compound components over configuration.** A component with parts is a namespace of parts, `Select.Root`, `Select.Trigger`, `Select.Item`, that share state through context while each styles only itself. Callers arrange the parts. Never one component with fifteen boolean props or `renderX` props. A component without parts stays a single export.
- **Parts are the public API.** Each part is its own function with its own `<Part>Props`, exported together as one object, and stamped with `data-slot` so parents and tests can target it.
- **Keys are identity.** A stable id, never the index, unless the list is static and never reorders.
- **No hand memoization.** The React Compiler handles it. `useMemo` only with a profile and a comment.
- **Hooks are one per file, `use` prefixed, and return an object.** A hook that only wraps another hook is a re-export instead.

## Styling

- **Tailwind in `className`, tokens in `globals.css`.** No CSS modules, no CSS-in-JS. Inline `style` only to pass a CSS variable the classes then read.
- **Variants in `cva`, state in data attributes.** `data-slot`, `data-state`, `data-disabled` are the styling hooks. Class strings never concatenate.
- **`cn` merges, `cva` varies.** Long class lists are arrays grouped by concern, layout, typography, color, state, motion, one group per line, so a diff shows what changed.
- **Selectors reach down, never up.** A parent styles children through `group` and `*:data-[slot=icon]:`. `globals.css` holds tokens, resets, and base typography, never component rules.

## Types

- **Strict, with `noUncheckedIndexedAccess`, on an ES2022 target.** No `any`. `unknown` at boundaries, narrowed by a guard or a schema.
- **`type` over `interface`, unions over enums, `as const` over `enum`.**
- **Annotate boundaries, infer locals.** Exported functions declare parameter and return types.
- **Types are declared, never inline.** Every props type, options type, and return shape is a named `type` above its use. `function Button({ size }: { size: Size })` is `function Button({ size }: ButtonProps)`.
- **Discriminated unions for state.** `{ status: "loading" } | { status: "error"; error: Error }`. Never parallel booleans.
- **Derive from values.** `keyof typeof`, `ComponentProps<typeof Button>`, `satisfies` for registries and config.
- **Exhaustive switches.** The `default` branch is `value satisfies never`.
- **No `!` and no `as` to silence the compiler.** A cast carries a comment saying what was proven.
- **Types live with their domain.** A content type in `content/types/`, a feature’s route params in that feature’s `types/`, a primitive like `IsoDate` in `shared/types/`. Never a bare `Props` or `Data`.

## Functions

- **Small, pure, one level of abstraction.** Side effects live at the edges.
- **Return early.** Guards first, happy path last, no `else` after `return`.
- **Options object past two parameters.** No boolean positional flags.
- **No nested ternaries.** Lookup tables for mapping, `if` for branching.
- **Never mutate.** Spread, `toSorted`, `with`, `structuredClone`. `readonly` and `as const` where change is wrong.
- **Platform first.** `Intl`, `URL`, `Object.groupBy`. No package for what the platform does.
- **`const` always, `===` always, `??` for defaults.**
- **No floating promises.** Every promise is awaited, returned, or `void`ed with a reason. Independent work runs in `Promise.all`.

## Hygiene

- **Code says what, comments say why.** A comment carries a constraint, workaround, or decision. If it describes the next line, rename the line. Exports get one JSDoc sentence stating what the type cannot.
- **Comments are plain sentences.** No em dashes, and no colon or semicolon standing in for one. Split into two sentences instead.
- **No commented-out code, no journals.** Git is the history. A `TODO` names an owner and a next step or is deleted.
- **Every dependency is a decision.** Platform, then framework, then a focused, typed, maintained package. A one-function need is written, not installed. One tool per job.
- **Wrap what you might replace.** A third-party API used in more than one place goes through one module.
- **One change, one purpose.** Refactor and feature never share a commit, and a cleanup elsewhere is its own commit. The tree compiles at every commit, callers update with the API they use.
- **Commit messages follow Go.** The subject is `area: what changed`, all lowercase, imperative, no period, under seventy-two characters: `ui: add size variants to select`. The area is the layer or feature touched. A body of one or two lines says why, and only when the subject cannot.
- **Commits carry no attribution.** The subject and its short body are the whole message. No `Co-Authored-By` trailer, no session or tool link, no generated-by note, in a commit or a pull request description.
- **Delete, do not deprecate.** No `_old`, `Legacy`, or `V2`. Unused code and dependencies are removed.
