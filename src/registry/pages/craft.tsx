import { A, H2, InlineCode, Li, P, Strong, Table, Ul } from "@/components/docs/prose";
import type { Doc } from "../types";

export default {
  slug: "craft",
  title: "Craft",
  description: "Tokens, conventions, and details for building modern, compact interfaces.",
  source: "src/styles/globals.css",
  body: (
    <>
      <P>
        Interfaces succeed on hundreds of small decisions. Change a token to change the system.
        Follow the conventions to keep it coherent.
      </P>

      <H2>Spacing</H2>
      <P>
        One token decides how dense an interface feels. Tailwind resolves every spacing utility to{" "}
        <InlineCode>calc(var(--spacing) * n)</InlineCode>, so padding, margin, gap, width, height,
        insets, and numeric line heights all move together. The default unit is 4px, the comfortable
        scale. Dense product interfaces feel better one notch tighter.
      </P>
      <Table
        head={["Token", "Value", "Effect"]}
        rows={[
          [
            <InlineCode key="a">--spacing: 0.25rem</InlineCode>,
            "4px unit",
            "Comfortable, the Tailwind default",
          ],
          [
            <InlineCode key="b">--spacing: 0.21875rem</InlineCode>,
            "3.5px unit",
            "Compact, the scale dense interfaces use",
          ],
        ]}
      />
      <P>
        At the compact unit, <InlineCode>1</InlineCode> is 3.5px, <InlineCode>2</InlineCode> is 7px,{" "}
        <InlineCode>2.5</InlineCode> is 8.75px, <InlineCode>4</InlineCode> is 14px,{" "}
        <InlineCode>6</InlineCode> is 21px, and <InlineCode>8</InlineCode> is 28px.
      </P>
      <P>
        Never hardcode a size the scale can express. No <InlineCode>h-[28px]</InlineCode>, no rem
        constants inside <InlineCode>calc()</InlineCode>. Derived values use the{" "}
        <InlineCode>--spacing()</InlineCode> function so they follow the unit, for example{" "}
        <InlineCode>py-[calc((var(--anchor-height) - --spacing(6)) / 2)]</InlineCode>.
      </P>

      <H2>Typography</H2>
      <P>
        Type is tiered by size and color, and emphasized by weight. Thirteen pixels is the body size
        dense product interfaces settle on, one notch under the browser default, crisp without being
        small. Every piece of text belongs to a tier, and every tier has a job.
      </P>
      <Table
        head={["Tier", "Utility", "Rendered", "Use for"]}
        rows={[
          [
            "Control",
            <InlineCode key="c">text-sm/6</InlineCode>,
            "13px / 21px",
            "Buttons, inputs, menu items, labels",
          ],
          [
            "Body",
            <InlineCode key="b">text-sm</InlineCode>,
            "13px / 20px",
            "Default UI text, table cells",
          ],
          [
            "Meta",
            <InlineCode key="m">text-xs</InlineCode>,
            "12px",
            "Descriptions, group labels, timestamps",
          ],
          [
            "Micro",
            <InlineCode key="u">text-2xs</InlineCode>,
            "11px / 16px",
            "Badges, keyboard hints, overlines",
          ],
          [
            "Prose",
            <InlineCode key="p">text-base/8</InlineCode>,
            "16px / 28px",
            "Long form reading, docs",
          ],
          ["Heading", <InlineCode key="h">text-lg</InlineCode>, "18px", "Section titles (h2)"],
          ["Title", <InlineCode key="t">text-2xl</InlineCode>, "24px", "Page titles (h1)"],
          [
            "Display",
            <InlineCode key="d">text-3xl+</InlineCode>,
            "30px and up",
            "Long form and hero titles",
          ],
        ]}
      />
      <P>
        Numeric leadings like <InlineCode>/6</InlineCode> ride the spacing scale, so line heights
        compact together with everything else. Reading text is the exception. Long form prose keeps
        a roomy leading near 1.75 no matter how dense the chrome gets. Weights are tokens too.
        Normal is 400, medium 510, semibold 590, bold 680, tuned optically for the variable font.
      </P>
      <Ul>
        <Li>
          <Strong>Emphasize with weight and color, never with a size bump.</Strong> Nothing renders
          lighter than 400, and headings sit in the 500 to 600 range.
        </Li>
        <Li>
          <Strong>Headings are semantic and sequential.</Strong> One h1 per page, levels never skip,
          and the visual tier follows the semantic level, an h3 can even share prose size and stand
          on weight alone.
        </Li>
        <Li>
          <Strong>Micro text has rules.</Strong> <InlineCode>text-2xs</InlineCode> is for labels a
          few words long. It carries positive tracking baked into the token, reads best uppercase or
          medium weight, and is never used for sentences.
        </Li>
        <Li>
          <Strong>Numbers that change or align get</Strong> <InlineCode>tabular-nums</InlineCode>.
          Counts, timers, dates, and table columns keep every digit the same width, so nothing
          jiggles or drifts as values update.
        </Li>
        <Li>
          <Strong>Tracking follows size.</Strong> Headings tighten with{" "}
          <InlineCode>tracking-tight</InlineCode>. Tiny or uppercase text opens up with slight
          positive tracking to stay legible.
        </Li>
        <Li>
          <Strong>Wrapping is a decision.</Strong> Headings use{" "}
          <InlineCode>text-balance</InlineCode> and prose uses <InlineCode>text-pretty</InlineCode>{" "}
          to avoid orphans and lopsided lines.
        </Li>
        <Li>
          <Strong>Use real typographic characters.</Strong> An ellipsis is one character, quotes and
          apostrophes are curly. Three periods and straight quotes read as placeholders.
        </Li>
        <Li>
          <Strong>Glue terms together.</Strong> A non breaking space keeps units, shortcuts, and
          compound names on one line, and a number takes a space before its unit, 10 MB rather than
          10MB.
        </Li>
      </Ul>

      <H2>Radius</H2>
      <P>
        Radii do not scale with spacing, they are fixed rem tokens. A control wants a radius near
        one fifth of its height, 5px on a 28px control, which is what{" "}
        <InlineCode>rounded-md</InlineCode> maps to. Cards and previews step up to 8px with{" "}
        <InlineCode>rounded-lg</InlineCode>, and floating surfaces sit just above that. Larger
        surface, larger radius.
      </P>
      <P>
        Corners nested inside corners must be concentric, so both curves bend around one shared
        center. The formula is simple. The inner radius equals the outer radius minus the gap
        between the two edges, and the outer radius equals the inner radius plus that gap. A 5px
        item resting 3.5px inside a popup asks for an 8.5px popup corner. Derive these values from
        the radius and spacing tokens rather than writing the result as a number, and they stay
        correct when either token changes.
      </P>

      <H2>Edges</H2>
      <P>
        Edges are rings and hairlines, not borders. Controls draw{" "}
        <InlineCode>ring ring-black/15</InlineCode> in light and{" "}
        <InlineCode>dark:ring-white/12</InlineCode> in dark. Low opacity edges hold on any
        background. Structural lines use <InlineCode>border-hairline</InlineCode>, which renders
        0.5px on retina displays. See <A href="/ui/notes#rings-over-borders">Rings over borders</A>{" "}
        for why.
      </P>

      <H2>Color</H2>
      <P>
        Neutrals carry all of the chrome, the surfaces, edges, hover fills, and secondary text.
        Accent is reserved for focus rings, selection, and primary actions. If a state can be
        expressed in neutral, it should be.
      </P>
      <Ul>
        <Li>
          <Strong>Neutrals share a temperature.</Strong> Grays, edges, and shadows tint toward one
          hue so every surface feels cut from the same material.
        </Li>
        <Li>
          <Strong>Fills stay quiet.</Strong> Hover and highlight use fills like{" "}
          <InlineCode>bg-neutral-200</InlineCode> in light and{" "}
          <InlineCode>bg-neutral-800/50</InlineCode> in dark. Balance the two modes by eye, not by
          mirrored numbers. Dark mode needs less.
        </Li>
        <Li>
          <Strong>Interaction increases contrast.</Strong> Hover, active, and focus states are
          always more contrasted than rest, never less.
        </Li>
        <Li>
          <Strong>Contrast has a floor.</Strong> Body and secondary text hold 4.5 to 1 against their
          surface, checked perceptually where possible. Disabled states are the one exemption.
        </Li>
        <Li>
          <Strong>Every state override needs both modes.</Strong> A base{" "}
          <InlineCode>dark:</InlineCode> color outranks an unprefixed state class, so state colors
          declare a <InlineCode>dark:</InlineCode> counterpart too.
        </Li>
        <Li>
          <Strong>The browser matches the theme.</Strong> <InlineCode>color-scheme</InlineCode> is
          set in dark mode so native scrollbars and controls follow, and the theme color meta keeps
          browser chrome aligned with the background.
        </Li>
      </Ul>

      <H2>Stability</H2>
      <P>
        Polished interfaces do not move unless asked. Layout shift is a bug wherever it appears, and
        most of it is preventable by design.
      </P>
      <Ul>
        <Li>
          <Strong>State never changes font weight.</Strong> Selected tabs and hovered links change
          color, not weight, so text never reflows around them.
        </Li>
        <Li>
          <Strong>Everything dynamic reserves its space.</Strong> Images declare explicit
          dimensions, and skeletons mirror the exact size of the content they stand in for.
        </Li>
        <Li>
          <Strong>Theme switches do not animate.</Strong> Transitions pause while the theme flips,
          otherwise every hover transition fires at once.
        </Li>
        <Li>
          <Strong>Refresh shows the same interface.</Strong> Theme, collapsed panels, and other
          persisted state resolve before first paint so nothing flashes or jumps.
        </Li>
      </Ul>

      <H2>Motion</H2>
      <P>
        Motion is decided before it is styled, and the first question is frequency. An interaction a
        person triggers a hundred times a day, like a context menu or a list edit, gets no animation
        at all.
      </P>
      <Ul>
        <Li>
          <Strong>Easing by direction.</Strong> Entering and exiting elements use{" "}
          <InlineCode>ease-out</InlineCode>, elements moving on screen use{" "}
          <InlineCode>ease-in-out</InlineCode>, hover and color changes use plain{" "}
          <InlineCode>ease</InlineCode>. Never <InlineCode>ease-in</InlineCode> for UI.
        </Li>
        <Li>
          <Strong>Immediate means about 200ms.</Strong> Interactions stay near 200ms, larger
          transitions under 300ms, and exits run faster than entrances.
        </Li>
        <Li>
          <Strong>Proportional to the trigger.</Strong> Dialogs scale in from about 0.95, buttons
          press to about 0.97, nothing enters from zero.
        </Li>
        <Li>
          <Strong>Only transform and opacity animate.</Strong> Width, height, and position trigger
          layout. Transitions name their properties, never <InlineCode>transition: all</InlineCode>.
        </Li>
        <Li>
          <Strong>Motion is anchored.</Strong> A menu grows from its trigger via{" "}
          <InlineCode>transform-origin</InlineCode>, not from its own center.
        </Li>
        <Li>
          <Strong>Input driven and interruptible.</Strong> Animation responds to actions, never
          autoplays, and cancels cleanly when the user moves on. Looping animations pause off
          screen.
        </Li>
        <Li>
          <Strong>Paired elements move as one.</Strong> A popup and its arrow, a dialog and its
          backdrop share one easing and one duration.
        </Li>
        <Li>
          <Strong>Every animation respects</Strong> <InlineCode>prefers-reduced-motion</InlineCode>,
          with no exceptions for opacity or color.
        </Li>
      </Ul>

      <H2>Interaction</H2>
      <P>
        How an interface feels in the hand comes down to defaults. These are the ones worth being
        strict about.
      </P>
      <Ul>
        <Li>
          <Strong>Everything works from the keyboard.</Strong> Flows follow the established
          authoring patterns, focus is visible through <InlineCode>focus-visible</InlineCode>, moved
          deliberately into dialogs, and returned where it came from.
        </Li>
        <Li>
          <Strong>Targets are generous.</Strong> A visual target smaller than 24px still gets a 24px
          hit area, 44px on touch, and the gap between a control and its label is part of the
          target. No dead zones.
        </Li>
        <Li>
          <Strong>Hover is an enhancement.</Strong> Nothing depends on it, and hover styles sit
          behind <InlineCode>@media (hover: hover)</InlineCode> so touch devices never get stuck in
          a hovered state.
        </Li>
        <Li>
          <Strong>Links are links.</Strong> Navigation uses real anchors so new tabs, middle clicks,
          and copied addresses all work. Buttons act, links go, and the cursor agrees, an arrow on
          controls and a pointer on links.
        </Li>
        <Li>
          <Strong>Menus open on press.</Strong> Dropdowns trigger on mousedown rather than click.
          The first tooltip in a group waits, its siblings show instantly, and disabled buttons
          never carry tooltips because keyboard users cannot reach them.
        </Li>
        <Li>
          <Strong>State lives in the URL.</Strong> Tabs, filters, pagination, and expanded panels
          survive refresh, back, forward, and sharing.
        </Li>
        <Li>
          <Strong>Feel instant.</Strong> Local actions update optimistically and reconcile with the
          server, rolling back with feedback on failure. Likely destinations prefetch on hover or
          focus.
        </Li>
        <Li>
          <Strong>Loading states earn their place.</Strong> Spinners and skeletons appear only after
          a short delay and then persist long enough not to flicker. A loading button keeps its
          label beside the spinner.
        </Li>
        <Li>
          <Strong>Feedback lands at the trigger.</Strong> A successful copy shows an inline check
          next to the button, not a toast across the screen. Async updates announce politely through{" "}
          <InlineCode>aria-live</InlineCode>.
        </Li>
        <Li>
          <Strong>An ellipsis signals more.</Strong> Menu items that open a follow up end with one,
          and so do in progress labels like Saving…
        </Li>
      </Ul>

      <H2>Forms</H2>
      <P>
        Forms are where an interface earns trust. Most of these rules amount to never fighting the
        person typing.
      </P>
      <Ul>
        <Li>
          <Strong>A button is a button element.</Strong> Click handlers never land on a div or a
          span.
        </Li>
        <Li>
          <Strong>Labels focus their input.</Strong> Every control has an associated label, and
          clicking it moves focus where typing goes.
        </Li>
        <Li>
          <Strong>Enter submits.</Strong> Inputs live inside a form, and textareas submit with the
          platform modifier plus Enter.
        </Li>
        <Li>
          <Strong>Typing is never blocked.</Strong> A number field accepts any keystroke and
          explains itself through validation, silence teaches nothing. Paste always works,
          especially for one time codes.
        </Li>
        <Li>
          <Strong>Submit stays enabled until the request starts.</Strong> Pre disabling hides the
          validation feedback the user needs, and disabling in flight prevents duplicate requests.
        </Li>
        <Li>
          <Strong>Errors sit next to their field.</Strong> On submit, focus moves to the first error
          so the fix is one keystroke away.
        </Li>
        <Li>
          <Strong>Inputs declare their intent.</Strong> The right <InlineCode>type</InlineCode> and{" "}
          <InlineCode>inputmode</InlineCode> bring the right keyboard,{" "}
          <InlineCode>autocomplete</InlineCode> enables autofill, and spellcheck turns off for
          emails, codes, and usernames.
        </Li>
        <Li>
          <Strong>Placeholders are examples.</Strong> They show a sample value, end with an
          ellipsis, and never replace the label.
        </Li>
        <Li>
          <Strong>Warn before losing work.</Strong> Navigation away from unsaved changes asks first.
          Destructive actions confirm or offer an undo window.
        </Li>
      </Ul>

      <H2>Content</H2>
      <P>
        Words, states, and formats are design surfaces too, and they break in ways a mockup never
        shows.
      </P>
      <Ul>
        <Li>
          <Strong>Layouts survive real content.</Strong> Short, average, and very long values all
          render well. In dense surfaces, rows keep one line with <InlineCode>truncate</InlineCode>{" "}
          and the full value lives in a tooltip.
        </Li>
        <Li>
          <Strong>All states are designed.</Strong> Empty, sparse, dense, loading, and error each
          get composed on purpose, and empty states prompt the next action.
        </Li>
        <Li>
          <Strong>No dead ends.</Strong> Every error offers the way out. Instead of stating what
          failed, the message says how to fix it.
        </Li>
        <Li>
          <Strong>Status is never color alone.</Strong> Color pairs with a label or icon so meaning
          survives color blindness.
        </Li>
        <Li>
          <Strong>Formats follow locale.</Strong> Dates, numbers, and currencies format for the
          user’s locale, and language comes from browser settings, never from location.
        </Li>
        <Li>
          <Strong>The document title tells the truth.</Strong> It reflects the current context, and
          anchored headings set <InlineCode>scroll-margin-top</InlineCode> so links land with
          breathing room.
        </Li>
      </Ul>

      <H2>Details</H2>
      <P>
        The finishing layer. None of these are noticed when present, and all of them are felt when
        missing.
      </P>
      <Ul>
        <Li>
          <Strong>Align optically, not mathematically.</Strong> Icons nudge to their visual center,
          a pixel of adjustment wins when perception beats geometry, and padding compensates where a
          glyph carries uneven weight.
        </Li>
        <Li>
          <Strong>Everything aligns with something.</Strong> A grid, a baseline, an edge, or an
          optical center. No accidental positioning.
        </Li>
        <Li>
          <Strong>Stacking is managed, not escalated.</Strong> New stacking contexts come from{" "}
          <InlineCode>isolation: isolate</InlineCode>, and z-index values come from a small fixed
          scale, never from an arbitrary 9999.
        </Li>
        <Li>
          <Strong>Page scrollbars stay native.</Strong> Custom scrollbars belong only in small panes
          like code blocks, and no element renders a scrollbar it does not need.
        </Li>
        <Li>
          <Strong>Fade with masks.</Strong> Edge fades use <InlineCode>mask-image</InlineCode>{" "}
          rather than gradient overlays, and scrollable lists never fade at all, a fade there hides
          content.
        </Li>
        <Li>
          <Strong>Decoration never intercepts.</Strong> Ornamental layers disable pointer events and
          text selection, and interactive elements disable selection on their inner content so
          dragging feels clean.
        </Li>
        <Li>
          <Strong>Layouts respect the device.</Strong> Safe area insets pad around notches and home
          indicators, and overscroll is contained inside modals and drawers.
        </Li>
      </Ul>

      <H2>Performance</H2>
      <P>Speed is part of craft. A beautiful interface that stutters reads as broken.</P>
      <Ul>
        <Li>
          <Strong>Typing never lags.</Strong> Keystroke handling stays cheap, and expensive work
          moves off the main thread.
        </Li>
        <Li>
          <Strong>Long lists virtualize.</Strong> Rendering off screen rows is paying for pixels
          nobody sees. <InlineCode>content-visibility: auto</InlineCode> is the lightweight version.
        </Li>
        <Li>
          <Strong>Writes finish fast.</Strong> Mutations complete within about 500ms, and anything
          slower shows progress.
        </Li>
        <Li>
          <Strong>Fonts are deliberate.</Strong> Critical fonts preload and subset to the characters
          actually used.
        </Li>
        <Li>
          <Strong>Effects have budgets.</Strong> Large blurs are expensive,{" "}
          <InlineCode>will-change</InlineCode> is a last resort, and GPU promotion is a tool, not a
          default.
        </Li>
        <Li>
          <Strong>Test where it hurts.</Strong> Throttled CPU, slow networks, and low power mode
          reveal what a fast laptop hides.
        </Li>
      </Ul>

      <H2>Rules of thumb</H2>
      <P>Four habits keep everything above true.</P>
      <Ul>
        <Li>Medium first. Build the md size, derive sm and lg last.</Li>
        <Li>One knob. If a change needs edits in many components, it belongs in a token.</Li>
        <Li>Check both themes, keyboard only, and reduced motion before calling anything done.</Li>
        <Li>
          Accessible by default. Build on semantic elements or accessible primitives, give icon only
          controls an <InlineCode>aria-label</InlineCode>, keep visible focus states, and hide
          decorative elements with <InlineCode>aria-hidden</InlineCode>. Walk new components once
          with a screen reader and confirm every control announces its name, role, and state.
        </Li>
      </Ul>
    </>
  ),
} satisfies Doc;
