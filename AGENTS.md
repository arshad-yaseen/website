# AGENTS.md

Tokens, conventions, and details for building modern, compact interfaces.

Interfaces succeed on hundreds of small decisions. Change a token to change the system. Follow the conventions to keep it coherent.

The tokens referenced here live in `src/styles/globals.css`.

## Spacing

One token decides how dense an interface feels. Tailwind resolves every spacing utility to `calc(var(--spacing) * n)`, so padding, margin, gap, width, height, insets, and numeric line heights all move together. The default unit is 4px, the comfortable scale. Dense product interfaces feel better one notch tighter.

| Token                   | Value      | Effect                                  |
| ----------------------- | ---------- | --------------------------------------- |
| `--spacing: 0.25rem`    | 4px unit   | Comfortable, the Tailwind default       |
| `--spacing: 0.21875rem` | 3.5px unit | Compact, the scale dense interfaces use |

At the compact unit, `1` is 3.5px, `2` is 7px, `2.5` is 8.75px, `4` is 14px, `6` is 21px, and `8` is 28px.

Never hardcode a size the scale can express. No `h-[28px]`, no rem constants inside `calc()`. Derived values use the `--spacing()` function so they follow the unit, for example `py-[calc((var(--anchor-height) - --spacing(6)) / 2)]`.

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

Numeric leadings like `/6` ride the spacing scale, so line heights compact together with everything else. Reading text is the exception. Long form prose keeps a roomy leading near 1.75 no matter how dense the chrome gets. Weights are tokens too. Normal is 400, medium 510, semibold 590, bold 680, tuned optically for the variable font.

- **Emphasize with weight and color, never with a size bump.** Nothing renders lighter than 400, and headings sit in the 500 to 600 range.
- **Headings are semantic and sequential.** One h1 per page, levels never skip, and the visual tier follows the semantic level, an h3 can even share prose size and stand on weight alone.
- **Micro text has rules.** `text-2xs` is for labels a few words long. It carries positive tracking baked into the token, reads best uppercase or medium weight, and is never used for sentences.
- **Numbers that change or align get** `tabular-nums`. Counts, timers, dates, and table columns keep every digit the same width, so nothing jiggles or drifts as values update.
- **Tracking follows size.** Headings tighten with `tracking-tight`. Tiny or uppercase text opens up with slight positive tracking to stay legible.
- **Wrapping is a decision.** Headings use `text-balance` and prose uses `text-pretty` to avoid orphans and lopsided lines.
- **Use real typographic characters.** An ellipsis is one character, quotes and apostrophes are curly. Three periods and straight quotes read as placeholders.
- **Glue terms together.** A non breaking space keeps units, shortcuts, and compound names on one line, and a number takes a space before its unit, 10 MB rather than 10MB.

## Radius

Radii do not scale with spacing, they are fixed rem tokens. A control wants a radius near one fifth of its height, 5px on a 28px control, which is what `rounded-md` maps to. Cards and previews step up to 8px with `rounded-lg`, and floating surfaces sit just above that. Larger surface, larger radius.

Corners nested inside corners must be concentric, so both curves bend around one shared center. The formula is simple. The inner radius equals the outer radius minus the gap between the two edges, and the outer radius equals the inner radius plus that gap. A 5px item resting 3.5px inside a popup asks for an 8.5px popup corner. Derive these values from the radius and spacing tokens rather than writing the result as a number, and they stay correct when either token changes.

## Edges

Edges are rings and hairlines, not borders. Controls draw `ring ring-black/15` in light and `dark:ring-white/12` in dark. Low opacity edges hold on any background. Structural lines use `border-hairline`, which renders 0.5px on retina displays. See the Shadows over borders note (`src/registry/notes/shadows-over-borders.tsx`) for why.

## Color

Neutrals carry all of the chrome, the surfaces, edges, hover fills, and secondary text. Accent is reserved for focus rings, selection, and primary actions. If a state can be expressed in neutral, it should be.

- **Neutrals share a temperature.** Grays, edges, and shadows tint toward one hue so every surface feels cut from the same material.
- **Interaction increases contrast.** Hover, active, and focus states are always more contrasted than rest, never less.
- **Every state override needs both modes.** A base `dark:` color outranks an unprefixed state class, so state colors declare a `dark:` counterpart too.
- **The browser matches the theme.** `color-scheme` is set in dark mode so native scrollbars and controls follow.

## Stability

- **State never changes font weight.** Selected tabs and hovered links change color, not weight, so text never reflows around them.
- **Theme switches do not animate.** Transitions pause while the theme flips, otherwise every hover transition fires at once.
- **Everything dynamic reserves its space.** Images declare explicit dimensions, and skeletons mirror the exact size of the content they stand in for.

## Motion

Frequency decides first. An interaction a person triggers a hundred times a day, like a context menu or a list edit, gets no animation at all.

- **Easing by direction.** Entering and exiting elements use `ease-out`, elements moving on screen use `ease-in-out`, hover and color changes use plain `ease`. Never `ease-in` for UI.
- **Immediate means about 200ms.** Larger transitions stay under 300ms, and exits run faster than entrances.
- **Proportional to the trigger.** Dialogs scale in from about 0.95, buttons press to about 0.97, nothing enters from zero.
- **Only transform and opacity animate.** Width, height, and position trigger layout. Transitions name their properties, never `transition: all`.
- **Motion is anchored.** A menu grows from its trigger via `transform-origin`, not from its own center.
- **Paired elements move as one.** A popup and its arrow, a dialog and its backdrop share one easing and one duration.
- **Animation is interruptible and respects** `prefers-reduced-motion`. It cancels cleanly when the user moves on, and looping animations pause off screen.

## Interaction

- **Targets are generous.** A visual target smaller than 24px still gets a 24px hit area, 44px on touch, and the gap between a control and its label is part of the target. No dead zones.
- **Hover is an enhancement.** Hover styles sit behind `@media (hover: hover)` so touch devices never get stuck in a hovered state, and the cursor agrees with the element, an arrow on controls and a pointer on links.
- **Menus open on press.** Dropdowns trigger on mousedown rather than click. The first tooltip in a group waits, its siblings show instantly, and disabled buttons never carry tooltips because keyboard users cannot reach them.
- **State lives in the URL.** Tabs, filters, pagination, and expanded panels survive refresh, back, forward, and sharing.
- **Feel instant.** Local actions update optimistically and reconcile with the server, rolling back with feedback on failure. Likely destinations prefetch on hover or focus.
- **Loading states earn their place.** Spinners and skeletons appear only after a short delay and then persist long enough not to flicker. A loading button keeps its label beside the spinner.
- **Feedback lands at the trigger.** A successful copy shows an inline check next to the button, not a toast across the screen.
- **An ellipsis signals more.** Menu items that open a follow up end with one, and so do in progress labels like Saving…

## Forms

- **Typing is never blocked.** A number field accepts any keystroke and explains itself through validation, silence teaches nothing. Paste always works, especially for one time codes.
- **Submit stays enabled until the request starts.** Pre disabling hides the validation feedback the user needs, and disabling in flight prevents duplicate requests.
- **Errors sit next to their field.** On submit, focus moves to the first error so the fix is one keystroke away.
- **Textareas submit too.** The platform modifier plus Enter sends the form, the same way Enter does from an input.
- **Inputs declare their intent.** The right `type` and `inputmode` bring the right keyboard, `autocomplete` enables autofill, and spellcheck turns off for emails, codes, and usernames.
- **Warn before losing work.** Navigation away from unsaved changes asks first, and destructive actions confirm or offer an undo window.

## Content

- **Layouts survive real content.** Short, average, and very long values all render well. In dense surfaces, rows keep one line with `truncate` and the full value lives in a tooltip.
- **All states are designed.** Empty, sparse, dense, loading, and error each get composed on purpose, and empty states prompt the next action.
- **No dead ends.** Instead of stating what failed, an error says how to fix it, and status is never color alone.
- **Formats follow locale.** Dates, numbers, and currencies format for the user’s locale, and language comes from browser settings, never from location.
- **Anchored headings set** `scroll-margin-top` so links land with breathing room.

## Details

- **Align optically, not mathematically.** Icons nudge to their visual center, a pixel of adjustment wins when perception beats geometry, and everything aligns with something, a grid, a baseline, an edge, or an optical center.
- **Stacking is managed, not escalated.** New stacking contexts come from `isolation: isolate`, and z-index values come from a small fixed scale, never from an arbitrary 9999.
- **Page scrollbars stay native.** Custom scrollbars belong only in small panes like code blocks, and no element renders a scrollbar it does not need.
- **Fade with masks.** Edge fades use `mask-image` rather than gradient overlays, and scrollable lists never fade at all, a fade there hides content.
- **Decoration never intercepts.** Ornamental layers disable pointer events and text selection, and interactive elements disable selection on their inner content so dragging feels clean.
- **Layouts respect the device.** Safe area insets pad around notches and home indicators, and overscroll is contained inside modals and drawers.

## Performance

- **Typing never lags.** Keystroke handling stays cheap, and expensive work moves off the main thread.
- **Long lists virtualize.** Rendering off screen rows is paying for pixels nobody sees. `content-visibility: auto` is the lightweight version.
- **Effects have budgets.** Large blurs are expensive, `will-change` is a last resort, and GPU promotion is a tool, not a default.

## Rules of thumb

- Medium first. Build the md size, derive sm and lg last.
- One knob. If a change needs edits in many components, it belongs in a token.
- Check both themes, keyboard only, reduced motion, and a throttled CPU before calling anything done.
- Icon only controls carry an `aria-label`, decorative elements are `aria-hidden`, and focus stays visible.
