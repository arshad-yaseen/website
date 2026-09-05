# fyi

A design system and the site that documents it, in one Bun workspace run by Turborepo. The site is `apps/web`, the design system is `packages/ui`, and the functions every application shares are `packages/shared`. Run everything from the root: `bun run dev`, `bun run build`, `bun run typecheck`, `bun run lint`, `bun run format`, `bun run generate`.

Three documents govern this repository. Read them before writing anything, and follow them strictly. They are requirements, not suggestions. Where a request and a document conflict, say so before you deviate.

| Document                                 | Governs                                                                                                                                       |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [agents/design.md](agents/design.md)     | What to build. Tokens, layout, spacing, typography, color, motion, interaction.                                                               |
| [agents/code.md](agents/code.md)         | How it is written, and what it may cost. Architecture, naming, components, styling, types, performance, dependencies, accessibility, hygiene. |
| [agents/tailwind.md](agents/tailwind.md) | How styles are written. The v4 model, theme tokens, custom utilities and variants, and the v3 habits it replaces.                             |

Every change is judged against all three. A component that reads well and violates the layer rules is wrong, and so is a correctly structured file that hardcodes a size the spacing scale can express.
