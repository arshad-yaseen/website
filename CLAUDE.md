# fyi

A design system and the site that documents it, in one workspace. Every task runs through the root scripts.

Three documents govern this repository. Read them before writing anything, and follow them strictly. They are requirements, not suggestions. Where a request and a document conflict, say so before you deviate.

| Document                                 | Governs                                                                                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [agents/design.md](agents/design.md)     | What to build. Tokens, layout, spacing, typography, color, motion, interaction.                                                                                 |
| [agents/code.md](agents/code.md)         | How it is written, and what it may cost. Principles, architecture, naming, APIs, components, styling, types, performance, dependencies, accessibility, hygiene. |
| [agents/tailwind.md](agents/tailwind.md) | How styles are written. The v4 model, theme tokens, custom utilities and variants, and the v3 habits it replaces.                                               |

Every change is judged against all three. A component that reads well and violates the layer rules is wrong, and so is a correctly structured file that hardcodes a size the spacing scale can express.

These documents state rules, never the current shape of the project. A path, a package name, or a file list belongs in the code, where it can change without the rules changing.
