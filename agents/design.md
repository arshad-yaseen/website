# Design

Tokens, conventions, and composition for building modern, compact interfaces.

Interfaces succeed on hundreds of small decisions. Change a token to change the system. Follow the conventions to keep it coherent. Compose the page so the reader’s job is obvious before the polish is noticed.

Tokens live in `src/styles/globals.css`. Page chrome reads `--layout-width`, `--layout-padding`, and `--header-height` from the body, so every page shares one edge.

These sections decide what to build. `agents/code.md` decides how it is written, and what it is allowed to cost.

## Layout

- **Everything aligns with something.** A shared edge, baseline, grid line, or deliberate optical center. Peers share geometry: type tiers, value positions, internal rows, and action alignment. A split heading and paragraph meet on their first baselines.
- **One grid per page.** Header, title, sections, evidence, and footer share the outer grid. When a page needs columns, twelve on desktop, six on tablet, four on mobile. Prose takes six or seven of twelve, tables, charts, and comparisons take all of them. True peers split a row evenly, and a peer earns more width only when its difference means something.
- **Gutters are unmistakable.** A wrapped heading or label must never read as bridging into the next column. If adjacent columns can be misread as one line, widen the gutter, shorten the content, or stack.
- **Open space amplifies the focal object.** An empty rectangle from an underfilled split, an orphaned third item, or delayed proof is a layout failure. Reflow or rebalance.
- **Unequal findings do not get equal cells.** Rank them, group them, or give the decisive one more width. Geometry matches the argument.
- **Prose reads at 60 to 70 characters per line.** `max-w-2xl` at prose size is that measure. Evidence gets its section’s full width with the introduction above it, never stranded in a narrow track beside empty columns.
- **Reflow before shrinking.** Grid and flex children get `min-w-0`. Overflow is never concealed. Short comparisons stack on narrow screens, long tables scroll locally, nothing wraps at the character level.

## Spacing

One token decides how dense an interface feels. Tailwind resolves every spacing utility to `calc(var(--spacing) * n)`, so padding, margin, gap, sizes, insets, and numeric line heights all move together. The default unit is 4px, the comfortable scale. Dense product interfaces feel better one notch tighter.

| Token                   | Value      | Effect                                  |
| ----------------------- | ---------- | --------------------------------------- |
| `--spacing: 0.25rem`    | 4px unit   | Comfortable, the Tailwind default       |
| `--spacing: 0.21875rem` | 3.5px unit | Compact, the scale dense interfaces use |

At the compact unit, `1` is 3.5px, `2` is 7px, `2.5` is 8.75px, `4` is 14px, `6` is 21px, and `8` is 28px.

Never hardcode a size the scale can express. No `h-[28px]`, no rem constants inside `calc()`. Derived values use `--spacing()` so they follow the unit, for example `py-[calc((var(--anchor-height) - --spacing(6)) / 2)]`.

### Rhythm

Gaps express relationships, not one stack value.

| Relationship                        | Gap                               |
| ----------------------------------- | --------------------------------- |
| Heading → its first paragraph       | Close                             |
| Paragraph → paragraph or list       | One body rhythm                   |
| Label → value → detail              | Tight, and identical across peers |
| Caption → the evidence it qualifies | Close enough to read together     |
| Group → group                       | Clearly larger                    |
| Section → section                   | Largest                           |

Within a group `1` to `4`, between groups `6` to `8`, between sections `10` and up. Reserve `16` for a true chapter break, never as the default page stack.

- **Every gap has one owner.** A group sets rhythm with `gap` or `space-y` and its children carry no margins. A heading that marks a section turn owns its top margin, and it is the only margin in the flow.
- **Judge the transition, not the token.** A valid gap beside an underfilled split, a short section, or a sparse last row compounds the emptiness. Reduce, rebalance, or stack until the space has a purpose.
- **Fix the owner, not the symptom.** Never repair a transition with a one-off margin. Regroup, or move the gap to the right owner.

## Typography

Type is tiered by size and color, and emphasized by weight. Thirteen pixels is the body size dense product interfaces settle on, one notch under the browser default, crisp without being small. Every piece of text belongs to a tier, and every tier has a job.

| Tier    | Utility       | Rendered    | Use for                                |
| ------- | ------------- | ----------- | -------------------------------------- |
| Control | `text-sm/6`   | 13px / 21px | Buttons, inputs, menu items, labels    |
| Body    | `text-sm`     | 13px / 20px | Default UI text, table cells           |
| Meta    | `text-xs`     | 12px        | Descriptions, group labels, timestamps |
| Micro   | `text-2xs`    | 11px / 16px | Badges, keyboard hints, overlines      |
| Prose   | `text-base/8` | 16px / 28px | Long form reading, docs                |
| Heading | `text-lg`     | 18px        | Section titles (h2)                    |
| Title   | `text-2xl`    | 24px        | Page titles (h1)                       |
| Display | `text-3xl+`   | 30px and up | Long form and hero titles              |

Numeric leadings like `/6` ride the spacing scale, so line heights compact with everything else. Long form prose is the exception and keeps a leading near 1.75 however dense the chrome gets. Weights are tokens too: normal 400, medium 510, semibold 590, bold 680, tuned optically for the variable font.

- **Hierarchy comes from type first.** Tier, weight, and color before a surface, a border, or an accent.
- **Emphasize with weight and color, never a size bump.** Nothing renders lighter than 400, headings sit between 500 and 600.
- **Peers share a tier.** Never resize one because its string is longer or its number bigger. Rewrite before shrinking, and fix a stranded word by changing the copy or the measure, never by shrinking that element.
- **Headings are semantic and sequential.** One h1 per page, levels never skip, the visual tier follows the semantic level, and an h3 can share prose size and stand on weight alone.
- **Headings state the claim.** Sentence case, concrete nouns, active verbs, what changes or what to decide, never the name of the genre.
- **Mono marks identifiers.** Code, paths, commands, timestamps, prop names, IDs. Set the identifier in mono, not its sentence. Counts, dates in prose, money, and percentages stay in sans.
- **Micro text has rules.** `text-2xs` is for labels a few words long. Its positive tracking is baked into the token, it reads best uppercase or medium weight, and it is never used for sentences.
- **Overlines label groups.** A micro label above a list names the group. It is not a kicker above every heading.
- **Numbers that change or align get** `tabular-nums`. Counts, timers, dates, and table columns keep every digit the same width, so nothing jiggles as values update.
- **Tracking follows size.** Headings tighten with `tracking-tight`. Tiny or uppercase text opens up slightly to stay legible.
- **Wrapping is a decision.** Headings use `text-balance`, prose uses `text-pretty`. Paragraphs separate with space, never a first-line indent.
- **Use real typographic characters.** One ellipsis character, curly quotes and apostrophes. Three periods and straight quotes read as placeholders.
- **Glue terms together.** A non breaking space keeps units, shortcuts, and compound names on one line, and a number takes a space before its unit, 10 MB not 10MB.

## Radius

Radii are fixed rem tokens and do not scale with spacing. A control wants a radius near one fifth of its height, 5px on a 28px control, which is `rounded-md`. Cards and previews step up to 8px with `rounded-lg`, floating surfaces sit just above. Larger surface, larger radius.

Nested corners are concentric, bending around one shared center. Inner radius equals outer radius minus the gap between the edges, outer equals inner plus that gap. A 5px item resting 3.5px inside a popup asks for an 8.5px popup corner. Derive these from the radius and spacing tokens rather than writing the number, so they stay correct when either token changes.

## Edges

Edges are rings and hairlines, not borders. Controls draw `ring ring-black/15` in light and `dark:ring-white/12` in dark, low opacity holds on any background. Structural lines use `border-hairline`, 0.5px on retina displays. See `src/content/notes/shadows-over-borders.tsx` for why.

## Color

Neutrals carry all of the chrome: surfaces, edges, hover fills, secondary text. Accent is reserved for focus rings, selection, and primary actions. If a state can be expressed in neutral, it should be.

- **Color carries meaning or stays out.** State, action, or data, always paired with a non-color cue. A favorable number is not green, a bigger bar is not accent, and a gradient is a labelled data scale or nothing.
- **Neutrals share a temperature.** Grays, edges, and shadows tint toward one hue so every surface feels cut from the same material.
- **The page is one canvas.** A surface or boundary is earned only by selection, interaction, warning, or a grouping spacing cannot express. Reach for spacing, alignment, typography, and density before a border or a box. Not every section is a card, no panel sits inside a panel, and a border never repairs weak hierarchy.
- **Diagnose quantity and intensity separately.** Busy means remove, combine, or reorder. Loud means reduce competing color, scale, weight, borders, surfaces, and motion. Keep one deliberate anchor either way, restraint must not flatten the page into sameness.
- **Interaction increases contrast.** Hover, active, and focus are more contrasted than rest, never less.
- **Every state override needs both modes.** A base `dark:` color outranks an unprefixed state class, so state colors declare a `dark:` counterpart too.
- **The browser matches the theme.** `color-scheme` is set in dark mode so native scrollbars and controls follow.
- **Hard rejects.** Decorative gradients, gradient text, glows, blobs, stripes, textures, grid backgrounds, glass, paper, colored side rails, ornamental shadows, fake depth.

## Data

Choose the geometry before the component.

| Reader compares          | Encode with                                     |
| ------------------------ | ----------------------------------------------- |
| Magnitude or rank        | Position or length on one shared scale          |
| Change over time         | Horizontal order and aligned position           |
| Composition              | Proportion                                      |
| Threshold or range       | Distance from a boundary                        |
| Process or dependency    | Connection and sequence                         |
| Qualitative alternatives | Aligned rows or deliberately contrasted columns |

Tables for precise lookup, prose for one conclusion, charts only when the relationship is faster seen than read. Values existing is not a reason for bars.

## Stability

- **State never changes font weight.** Selected tabs and hovered links change color, not weight, so text never reflows.
- **Theme switches do not animate.** Transitions pause while the theme flips, otherwise every hover transition fires at once.
- **Everything dynamic reserves its space.** Images declare dimensions, skeletons mirror the exact size of what they stand in for.

## Motion

Default to stillness. Frequency decides next: an interaction triggered a hundred times a day, like a context menu or a list edit, gets no animation at all.

- **Motion has a reason.** It explains a state change, preserves continuity, or confirms an action, and reading is never gated behind it. No marquees, simulated typing cursors, pulsing status dots, scroll reveals, imagery moving on hover, parallax, or bounce.
- **Easing by direction.** Entering and exiting use `ease-out`, moving on screen uses `ease-in-out`, hover and color changes use plain `ease`. Never `ease-in` for UI.
- **Immediate means about 200ms.** Larger transitions stay under 300ms, exits run faster than entrances.
- **Proportional to the trigger.** Dialogs scale in from about 0.95, buttons press to about 0.97, nothing enters from zero.
- **Only transform and opacity animate.** Width, height, and position trigger layout. Transitions name their properties, never `transition: all`.
- **Motion is anchored.** A menu grows from its trigger via `transform-origin`, not from its own center.
- **Paired elements move as one.** A popup and its arrow, a dialog and its backdrop share one easing and one duration.
- **Animation is interruptible and respects** `prefers-reduced-motion`. It cancels cleanly when the user moves on, and loops pause off screen.

## Interaction

- **Targets are generous.** A visual target under 24px still gets a 24px hit area, 44px on touch, and the gap between a control and its label is part of the target. No dead zones.
- **Hover is an enhancement.** Hover styles sit behind `@media (hover: hover)` so touch never sticks in a hovered state, and the cursor agrees with the element: arrow on controls, pointer on links.
- **Menus open on press.** Dropdowns trigger on mousedown, not click. The first tooltip in a group waits, its siblings show instantly, and disabled buttons never carry tooltips because keyboard users cannot reach them.
- **State lives in the URL.** Tabs, filters, pagination, and expanded panels survive refresh, back, forward, and sharing.
- **Feel instant.** Local actions update optimistically and reconcile with the server, rolling back with feedback on failure. Likely destinations prefetch on hover or focus.
- **Loading states earn their place.** Spinners and skeletons appear after a short delay and persist long enough not to flicker. A loading button keeps its label beside the spinner.
- **Feedback lands at the trigger.** A successful copy shows an inline check beside the button, not a toast across the screen.
- **An ellipsis signals more.** Menu items that open a follow up end with one, so do in progress labels like Saving…

## Forms

- **Typing is never blocked.** A number field accepts any keystroke and explains itself through validation, silence teaches nothing. Paste always works, especially for one time codes.
- **Submit stays enabled until the request starts.** Pre disabling hides the validation the user needs, disabling in flight prevents duplicates.
- **Inputs declare their intent.** The right `type` and `inputmode` bring the right keyboard, `autocomplete` enables autofill, spellcheck turns off for emails, codes, and usernames.
- **Warn before losing work.** Leaving unsaved changes asks first, destructive actions confirm or offer undo.

## Content

- **Layouts survive real content.** Short, average, and very long values all render well. In dense surfaces, rows keep one line with `truncate` and the full value lives in a tooltip.
- **All states are designed.** Empty, sparse, dense, loading, and error are each composed on purpose, and empty states prompt the next action.
- **No dead ends.** An error says how to fix it, not what failed, and status is never color alone.
- **Simplify the language, never the claim.** Keep every qualifier, population, period, unit, condition, and comparison basis that changes meaning. A test condition never becomes a broader claim.
- **Say the supported thing.** A concrete statement beats tiny, huge, fast, or safe. Define an unfamiliar term plainly at first use, then use the exact term consistently.
- **The page never narrates its making.** No copy about how it was organized or why a representation was chosen. A caption states a takeaway or a limit.
- **Titles say what happened or what to decide.** Sentence case everywhere. No em dashes.
- **Icons and media earn their place.** An icon is not decoration and never sits in a colored tile, and a text label wins unless the icon is established and faster. No stock imagery, decorative illustration, fake screenshots, or mandatory hero media.
- **Formats follow locale.** Dates, numbers, and currencies format for the user’s locale, and language comes from browser settings, never location.
- **Anchored headings set** `scroll-margin-top` so links land with breathing room.

## Details

- **Align optically, not mathematically.** Icons nudge to their visual center, a pixel of adjustment wins when perception beats geometry.
- **Stacking is managed, not escalated.** New stacking contexts come from `isolation: isolate`, z-index values from a small fixed scale, never an arbitrary 9999.
- **Page scrollbars stay native.** Custom scrollbars belong only in small panes like code blocks, and nothing renders a scrollbar it does not need.
- **Fade with masks.** Edge fades use `mask-image`, not gradient overlays, and scrollable lists never fade, a fade there hides content.
- **Decoration never intercepts.** Ornamental layers disable pointer events and selection, and interactive elements disable selection on their inner content so dragging feels clean.
- **Layouts respect the device.** Safe area insets pad around notches and home indicators, overscroll is contained inside modals and drawers.

## Rules of thumb

- Reader first. If the answer is not obvious in the first viewport, polish does not matter yet.
- Medium first. Build md, derive sm and lg last.
- One knob. If a change needs edits in many components, it belongs in a token.
- Remove before adding. A weak page usually needs less, arranged better.
- Check both themes, keyboard only, reduced motion, and a throttled CPU before calling anything done.
- Icon only controls carry an `aria-label`, decorative elements are `aria-hidden`, focus stays visible.
