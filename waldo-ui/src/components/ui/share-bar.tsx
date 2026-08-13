import * as React from "react";
import { cn } from "@/lib/utils";
import { ChartTooltipPanel } from "./chart-tooltip-panel";

// ─────────────────────────────────────────────────────────────────────────────
// ShareBar — Waldo extension (no shadcn equivalent).
// React counterpart of the vanilla "Segmented Bar" chart page. Source of the
// hover behaviour: API-DASHBOARD SegmentShareBar (Projects + Entities "Usage").
//
// A 6px track split by share, one segment per series. Hovering a segment names
// it and dims its siblings, which is what lets a 3px sliver still be readable.
//
//   <ShareBar segments={[
//     { name: "Serval AI", color: "hsl(var(--chart-1))", value: 1200 },
//     { name: "Atomicwork", color: "hsl(var(--chart-6))", value: 840 },
//   ]} valueLabel="calls" />
//
// `total` defaults to the sum of the segments. Pass a larger total — a plan
// limit, a quota — to leave the unused remainder visible as empty track.
//
// Prefer Progress for a single value against a maximum, and the Benchmark Bar
// or Dual-Bar Row patterns for comparing absolute values across entities.
// ─────────────────────────────────────────────────────────────────────────────

export interface ShareSegment {
  name: React.ReactNode;
  /** CSS colour for the segment. Pass a DS chart token: `hsl(var(--chart-1))`. */
  color: string;
  /** Absolute value — calls, credits, mentions. */
  value: number;
}

export interface ShareBarProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: ShareSegment[];
  /** Denominator. Defaults to the sum of segment values. */
  total?: number;
  /** Unit shown after the value in the tooltip. */
  valueLabel?: string;
  formatValue?: (n: number) => string;
}

const ShareBar = React.forwardRef<HTMLDivElement, ShareBarProps>(
  (
    {
      segments,
      total,
      valueLabel,
      formatValue = (n) => String(n),
      className,
      ...props
    },
    ref
  ) => {
    const [active, setActive] = React.useState<number | null>(null);

    const visible = segments.filter((s) => s.value > 0);
    const sum = visible.reduce((acc, s) => acc + s.value, 0);
    const denom = Math.max(1, total ?? sum);

    // Centre of the hovered segment, clamped so the tooltip never clips the card.
    let activeLeft = 50;
    if (active != null && visible[active]) {
      let before = 0;
      for (let i = 0; i < active; i++) before += visible[i].value;
      activeLeft = Math.min(
        88,
        Math.max(12, ((before + visible[active].value / 2) / denom) * 100)
      );
    }

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* 4px of padding above and below keeps the thin track easy to hit
            without changing its visual height. */}
        <div className="flex w-full py-1" onMouseLeave={() => setActive(null)}>
          <div
            className="flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-secondary"
            role="img"
            aria-label="Share breakdown"
          >
            {visible.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "h-full min-w-[3px] transition-opacity duration-100",
                  active != null && active !== i ? "opacity-45" : "opacity-100"
                )}
                style={{ width: `${(s.value / denom) * 100}%`, background: s.color }}
                onMouseEnter={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {active != null && visible[active] && (
          <div
            className="pointer-events-none absolute top-0 z-20 -translate-x-1/2 -translate-y-[calc(100%+8px)]"
            style={{ left: `${activeLeft}%` }}
          >
            <ChartTooltipPanel className="py-2.5">
              <div className="flex items-center gap-2.5 whitespace-nowrap text-sm">
                <span
                  aria-hidden
                  className="size-[7px] shrink-0 rounded-full"
                  style={{ background: visible[active].color }}
                />
                <span className="text-foreground/70">{visible[active].name}</span>
                <span className="font-medium tabular-nums text-foreground">
                  {Math.round((visible[active].value / denom) * 100)}%
                </span>
                <span className="tabular-nums text-foreground/55">
                  {formatValue(visible[active].value)}
                  {valueLabel ? ` ${valueLabel}` : ""}
                </span>
              </div>
            </ChartTooltipPanel>
          </div>
        )}
      </div>
    );
  }
);
ShareBar.displayName = "ShareBar";

export { ShareBar };
