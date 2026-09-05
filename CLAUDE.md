# fyi

A design system and the site that documents it.

Two documents govern this repository. Read both before writing anything, and follow them strictly. They are requirements, not suggestions. Where a request and a document conflict, say so before you deviate.

| Document                             | Governs                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| [agents/design.md](agents/design.md) | What to build. Tokens, layout, spacing, typography, color, motion, interaction. |
| [agents/code.md](agents/code.md)     | How it is written. Architecture, naming, components, styling, types, hygiene.   |

Every change is judged against both. A component that reads well and violates the layer rules is wrong, and so is a correctly structured file that hardcodes a size the spacing scale can express.
