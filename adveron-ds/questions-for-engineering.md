# Adveron UI — questions for Steve and Justin

**From:** Miguel · **Date:** 2026-09-24 · **Status:** draft, not sent

## Context

I want to govern Adveron's UI the way I govern Waldo's: one place where the
components are defined, and every visual change reaching me before it ships.

Today that place doesn't exist. `packages/adveron-web/src/components/ui` holds
20 components that were copied from the Waldo registry and then edited in place.
None of the 20 matches its Waldo original anymore (Button differs by ~140 lines,
Dialog by ~215). Most of those edits rode inside PRs about something else, so
nobody on design saw them.

I've taken a snapshot of what ships today (waldo-agentic `bcc587a`). That snapshot
is the official starting point, and I'm not trying to undo anything in it. The
questions below are about how we work from here on.

## Questions

1. **Why copy instead of reuse?** When adveron-web was scaffolded, were the Waldo
   components copied on purpose (speed, Tailwind v4, freedom to diverge), or was it
   just the quickest way to start?

2. **Could Adveron use Waldo's components directly?** The idea: Waldo's components
   with Adveron's colors and fonts layered on top as a theme, so a fix to one piece
   lands in both brands. What would block that? Here's what I can see from outside:
   - Waldo is on Tailwind v3 and Adveron on v4.
   - Adveron added its own variants (Button `brand`, `solid`, `white`; Badge `mono`).
   - Some Adveron components were rebuilt on purpose (Switch as a native button,
     RadioGroup wired to react-hook-form).

3. **If Adveron stays separate:** could adveron-web consume its components from
   one source (`waldo-design-system/adveron-ds`), with a drift guard that fails
   when someone edits them directly in adveron-web? It would be the same pattern
   `packages/design-system/scripts/sync-upstream.sh` already uses for Waldo. Because
   the starting point equals what ships today, the switch wouldn't change anything
   visually.

4. **Who decides?** Justin, which Adveron UI decisions are yours and should stay
   yours? Which ones should come to me for approval? My proposal: any change to a
   component or theme file gets a review from me, and when you've made a deliberate
   call we talk it through.

5. **Claude-made changes.** A lot of the drift came from Claude sessions editing a
   component while working on an unrelated card. Can we add a rule to the
   adveron-web `CLAUDE.md` that `components/ui/*` and the theme files are not edited
   as a side effect, and that any change to them goes through its own PR?

## What I'm asking for

Answers to 1–5, or 20 minutes to go through them together.
