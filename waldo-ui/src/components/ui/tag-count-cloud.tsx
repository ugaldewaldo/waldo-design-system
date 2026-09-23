import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// TagCountCloud — Waldo extension (no shadcn equivalent).
// Source: the Brand API console's "Top themes" panel on
// GET /v1/brands/{id}/mentions/summary, a ranked vocabulary of 10+ terms that
// has to be scannable at a glance.
//
// Every pill is the same size and the same type — Tag's `sm` metrics, so it
// reads as a member of that family. Only the fill carries the count. Varying
// the type as well would make the small tags hard to read for no extra
// information, and it is the fill that lets the eye find the heavy end without
// reading a single number.
//
//   <TagCountCloud tags={[
//     { name: "ai-safety", count: 893 },
//     { name: "ai", count: 412 },
//   ]} />
//
// The ramp is the brand green, light to dark: green-100 / -300 / -500 / -700 /
// -900. Each step carries the text colour the DS marries to that fill:
// green-100/300/500 take the ink (zinc-950 #171819), green-700/900 take white.
// The crossover is the DS's own law — "never white on green-500 (2.84:1)",
// "never dark text on green-700 (2.93:1)". All five steps clear AA: 15.29,
// 9.82, 6.31, 5.97 and 13.31 to 1, measured on the rendered pills.
//
// Fill and ink are set together, from the tokens, the way ShareBar and Treemap
// pass a chart colour: they are one decision, and the DS says the text colour
// is married to the fill. The chart palette is not an option here: it is
// categorical, and five of its hues would read as five categories rather than
// one scale.
//
// Shades are assigned by RANK, not by value. A vocabulary is usually skewed —
// on the source panel the leader has 893 and the tail 162 — so scaling on the
// maximum would drop nine of ten tags into the palest step and throw the ramp
// away. Rank keeps all five shades in play, which is what makes the cloud
// readable. Pass `scale="value"` when the numbers are the point and a flat
// cloud is the honest answer.
//
// Order is the caller's: the shade carries the count, so the list can be
// alphabetical, by count, or however it arrives.
//
// Prefer Badge for a static label with no quantity, Tag when the user can
// remove it, and a horizontal bar chart when the reader has to compare the
// numbers rather than see which terms lead.
// ─────────────────────────────────────────────────────────────────────────────

export interface CountedTag {
  name: React.ReactNode;
  count: number;
  /** Plain-text name, when `name` is a node. Used for `title`. */
  label?: string;
}

export interface TagCountCloudProps extends React.HTMLAttributes<HTMLUListElement> {
  tags: CountedTag[];
  /** "rank" (default) spreads the ramp evenly; "value" scales on the maximum. */
  scale?: "rank" | "value";
  formatCount?: (n: number) => string;
}

// Light to dark. Each step's text colour is the one the DS marries to the fill.
const INK = "hsl(var(--zinc-950))";
const STEPS = [
  { background: "hsl(var(--green-100))", color: INK },
  { background: "hsl(var(--green-300))", color: INK },
  { background: "hsl(var(--green-500))", color: INK },
  { background: "hsl(var(--green-700))", color: "#fff" },
  { background: "hsl(var(--green-900))", color: "#fff" },
];

const TagCountCloud = React.forwardRef<HTMLUListElement, TagCountCloudProps>(
  (
    { tags, scale = "rank", formatCount = (n) => n.toLocaleString("en-US"), className, ...props },
    ref
  ) => {
    const step = React.useMemo(() => {
      const n = STEPS.length;
      if (scale === "value") {
        const max = Math.max(1, ...tags.map((t) => t.count));
        return (t: CountedTag) => Math.min(n - 1, Math.floor((t.count / max) * n));
      }
      // Rank: the heaviest tag takes the darkest step, and the ranks are cut
      // into equal groups so every shade is used.
      const order = tags
        .map((t, i) => ({ i, count: t.count }))
        .sort((a, b) => b.count - a.count)
        .map((x) => x.i);
      const rank = new Map(order.map((i, r) => [i, r]));
      return (_t: CountedTag, i: number) =>
        n - 1 - Math.min(n - 1, Math.floor(((rank.get(i) ?? 0) / Math.max(1, tags.length)) * n));
    }, [tags, scale]);

    return (
      <ul
        ref={ref}
        className={cn("flex flex-wrap items-center gap-1.5", className)}
        {...props}
      >
        {tags.map((tag, i) => {
          const name = tag.label ?? (typeof tag.name === "string" ? tag.name : undefined);
          const count = formatCount(tag.count);
          return (
            <li
              key={i}
              data-slot="tag-count-cloud-tag"
              title={name ? `${name} · ${count}` : undefined}
              className={cn(
                "inline-flex h-7 items-center gap-1 rounded-full px-3",
                "text-xs font-medium leading-5 tracking-[-0.02em]",
                "select-none whitespace-nowrap transition-colors duration-100"
              )}
              style={STEPS[step(tag, i)]}
            >
              {tag.name}
              <span className="tabular-nums">({count})</span>
            </li>
          );
        })}
      </ul>
    );
  }
);
TagCountCloud.displayName = "TagCountCloud";

export { TagCountCloud };
