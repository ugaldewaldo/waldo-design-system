# Adveron UI — what we learned

**From:** Miguel · **Date:** 2026-09-24 · **Status:** draft, not sent
**Scope:** `waldo-agentic/packages/adveron-web`, from its first commit (Aug 5) to
`bcc587a` (Sep 24): the 20 components in `src/components/ui` and the 3 theme
stylesheets.

## The short version

Adveron's UI has no owner on the design side. Its components started as copies of
Waldo's, and since then they've changed mostly as a by-product of other work: of
the 35 visual edits since the files were created, **30 rode inside PRs about
something else**. Nobody asked for those changes and nobody reviewed them as design.

Adveron also took only 20 of Waldo's 84 components, and rebuilt several of the
missing ones as one-off pieces for a single screen.

## Findings

### 1. Most visual changes happened in passing

| | Changes |
|---|---|
| Asked for — the card or PR title names the visual change | **5** |
| Side effect — the change rode inside a PR about something else | **30** |

The five that were asked for:

- ENG-13442 — drop the backdrop blur from the dialog overlay
- ENG-13395 — contain dialog scroll so the title, close button and footer stay reachable
- ENG-13099 — chart tooltip stacking and legend
- ENG-13224 — scope the signal redesign to the homepage
- #3178 — marketing pages restyled onto the Arcade brand system

Everything else changed inside unrelated feature work. The largest example:
**ENG-12795 "Adveron agent-OS layer (context, memory, activity)"** changed
Badge, Button, Card, Dialog, Dropdown menu, Input, Select and the global
stylesheet, eight files in all, in a PR whose title is about agent memory.

### 2. One PR can restyle the whole product without anyone noticing

The theme files hold the colors, fonts and spacing every component draws from, and
they changed 10 times in passing. Examples: onboarding work (ENG-12902, ENG-12979),
usage telemetry (ENG-13089) and a Safari toolbar fix. A change to those files
reaches every screen at once, and nothing flags it as a design change.

### 3. Nothing matches Waldo anymore

All 20 Adveron components differ from the Waldo component they came from. The
furthest apart:

| Component | Lines that differ from Waldo |
|---|---|
| Radio group | 218 |
| Dialog | 215 |
| Sheet | 204 |
| Select | 197 |
| Command | 169 |

Adveron uses 20 of Waldo's 84 components, so a fix made in Waldo never reaches
Adveron, and the reverse is also true.

### 4. Adveron rebuilt pieces Waldo already has

Waldo has 64 components Adveron never took, among them Avatar, Sidebar,
Segmented control, Copy link, Secret field, Combobox, Tag input, Empty state,
Toast, Pagination, Progress, Slider and Loader.

Instead, adveron-web has its own one-off versions of several of them outside
`components/ui`. Judging by name, these look like rebuilds:

| Adveron one-off | Waldo already has |
|---|---|
| `user-avatar` | Avatar |
| `app-sidebar`, `adaptive-nav-shell`, `nav-item` | Sidebar, Nav |
| `segmented-toggle` | Segmented control |
| `copy-button` | Copy link |
| `reveal-webhook-secret-dialog` | Secret field |
| `slack-channel-combobox`, `search-select` | Combobox |
| `chip-list-input` | Tag input |
| `error-state` | Empty state |
| `route-loader` | Loader |
| `console-search-palette` | Command (dialog) |

Each one is built once, for one screen, and never reaches the rest of the product
or any design review. Reusing Waldo's version would give Adveron a tested piece in
its own colors, and one place to fix it.

### 5. The work is spread over four people, none of them on design

| Person | Files created | Changes in passing |
|---|---|---|
| Justin | 6 | 23 |
| Tyler | 14 | 5 |
| Jesse | 3 | 2 |
| Austin | 0 | 0 (1 asked-for) |

This isn't about blame. The numbers show where the work happened, not who decided
anything. Much of it was likely written by Claude sessions while they worked on
the card in front of them.

### 6. Half the components have never been touched

Checkbox, Command, Label, Popover, Separator, Sheet, Skeleton, Switch, Tabs and
Tooltip are exactly as they were created. The drift sits in the other ten, which
are the ones used most: Button, Dialog, Input, Select, Badge, Card, Dropdown menu,
Table, Chart, Radio group.

## What's done

- **An official starting point.** A snapshot of every component and theme file
  exactly as Adveron ships them today (waldo-agentic `bcc587a`), kept in
  `waldo-design-system/adveron-ds`. We start from here; nothing gets undone.
- **A page showing all 20 components as they are today,** so there's one place to
  see what Adveron looks like.

## What's next

1. Every future change to an Adveron component or theme file reaches Miguel for
   approval before it counts. That review works off the starting point above.
2. Before anyone builds a new Adveron piece, check Waldo first. If Waldo has it,
   reuse it in Adveron's colors instead of building a new one.
3. Engineering answers the open questions in `questions-for-engineering.md`: could
   Adveron use Waldo's components directly, who decides what, and how edits made
   in passing get stopped.

## How the numbers were made

Git history of each file, read up to `bcc587a`. "Asked for" and "side effect" come
from the PR title: if the title names that component (or, for theme files, names
colors, fonts or a redesign), the change counts as asked for. This is evidence, not
proof of intent. A PR can be deliberate about a visual change and still have a
title that doesn't say so.
