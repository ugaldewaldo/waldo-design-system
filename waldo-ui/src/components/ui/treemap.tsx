import * as React from "react";
import { cn } from "@/lib/utils";
import { ChartTooltipPanel } from "./chart-tooltip-panel";

// ─────────────────────────────────────────────────────────────────────────────
// Treemap — Waldo extension (no shadcn equivalent).
// Source of the layout: the Brand API console's "Top communities" panel on
// GET /v1/brands/{id}/mentions/summary, where a long tail of domains and
// subreddits has to fit a fixed 180px band.
//
// Area is the value. Tiles are packed into rows: each row's height is its
// share of the total, each tile's width is its share of its row. That reads as
// a treemap and needs no measurement pass, which is what lets it render on the
// server and stay stable while the panel resizes.
//
//   <Treemap tiles={[
//     { name: "youtube.com", value: 1130 },
//     { name: "linkedin.com", value: 942 },
//     { name: "x.com", value: 521 },
//   ]} valueLabel="mentions" />
//
// Colours come from the chart palette in order — chart-1 for the largest tile
// down — so rank is legible before any label is read. Pass `color` on a tile to
// override.
//
// The name and the value share one line, the name at text-base and the value a
// step down at text-xs, washed to 90% white so it reads as the second thing.
// One pixel between tiles: enough to read as separate parts, little enough that
// the block still reads as one surface.
//
// Labels are white and sit straight on the tile, no scrim. White on the raw
// palette fails AA everywhere — 1.85:1 on chart-1, 3.22:1 at best on chart-12 —
// so every tile is mixed with 45% black. That figure is set by the washed
// value, not by the name: at 55% colour the worst of the twelve reaches 5.52:1
// for full white and 4.81:1 at 90%, so both pass. Hue and rank order survive
// the mix, which is what the palette is for. Washing further does not: 85%
// white lands at 4.47:1, and a number nobody can read is not a number.
//
// A tile too small for its label drops it and keeps the name and value on
// `title` and `aria-label`, so the tail stays reachable by pointer and by
// screen reader without printing text that would be clipped anyway.
//
// Prefer ShareBar when the parts are few enough to read on one 6px track, and
// a horizontal bar chart when the reader has to compare values rather than see
// how one whole is divided.
// ─────────────────────────────────────────────────────────────────────────────

export interface TreemapTile {
  name: React.ReactNode;
  /** Absolute value — mentions, calls, credits. Area is proportional to it. */
  value: number;
  /** CSS colour. Defaults to the chart palette in rank order. */
  color?: string;
  /** Plain-text name, when `name` is a node. Used for `title` / `aria-label`. */
  label?: string;
}

export interface TreemapProps extends React.HTMLAttributes<HTMLDivElement> {
  tiles: TreemapTile[];
  /** Band height. Area only reads as area at a fixed height. */
  height?: number;
  /** Unit shown after the value in the tooltip. */
  valueLabel?: string;
  formatValue?: (n: number) => string;
  /** Tiles per row, largest first. Defaults to 1, 2, then 4 and 4 again. */
  rowSizes?: number[];
}

const PALETTE = Array.from({ length: 12 }, (_, i) => `hsl(var(--chart-${i + 1}))`);

/** Greedy row packing: the biggest tile alone, then pairs, then the tail. */
function pack(count: number, rowSizes: number[]) {
  const rows: number[][] = [];
  let i = 0;
  let r = 0;
  while (i < count) {
    const size = rowSizes[Math.min(r, rowSizes.length - 1)];
    rows.push(Array.from({ length: Math.min(size, count - i) }, (_, k) => i + k));
    i += size;
    r += 1;
  }
  return rows;
}

const Treemap = React.forwardRef<HTMLDivElement, TreemapProps>(
  (
    {
      tiles,
      height = 180,
      valueLabel,
      formatValue = (n) => n.toLocaleString("en-US"),
      rowSizes = [1, 2, 4],
      className,
      ...props
    },
    ref
  ) => {
    const [active, setActive] = React.useState<number | null>(null);

    const visible = React.useMemo(
      () => tiles.filter((t) => t.value > 0).sort((a, b) => b.value - a.value),
      [tiles]
    );
    const total = Math.max(1, visible.reduce((acc, t) => acc + t.value, 0));
    const rows = React.useMemo(() => pack(visible.length, rowSizes), [visible.length, rowSizes]);

    const plain = (t: TreemapTile) =>
      t.label ?? (typeof t.name === "string" ? t.name : undefined);

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div
          data-slot="treemap"
          className="flex w-full flex-col gap-px overflow-hidden rounded-2xl"
          style={{ height }}
          onMouseLeave={() => setActive(null)}
          role="img"
          aria-label="Share of the total by area"
        >
          {rows.map((row, r) => {
            const rowTotal = row.reduce((acc, i) => acc + visible[i].value, 0);
            return (
              <div
                key={r}
                data-slot="treemap-row"
                className="flex min-h-0 gap-px"
                style={{ flexBasis: `${(rowTotal / total) * 100}%` }}
              >
                {row.map((i) => {
                  const tile = visible[i];
                  const name = plain(tile);
                  const value = formatValue(tile.value);
                  // One line needs less height than two but more width, so the
                  // thresholds moved with it. Below either, the tile keeps its
                  // title and drops the labels.
                  const wide = tile.value / rowTotal > 0.18;
                  const tall = (rowTotal / total) * height > 30;
                  return (
                    <div
                      key={i}
                      data-slot="treemap-tile"
                      title={name ? `${name} · ${value}` : undefined}
                      aria-label={name ? `${name} · ${value}` : undefined}
                      className={cn(
                        "flex min-w-0 items-baseline gap-2",
                        "overflow-hidden px-4 py-3 transition-opacity duration-100",
                        active != null && active !== i ? "opacity-45" : "opacity-100"
                      )}
                      style={{
                        flexBasis: `${(tile.value / rowTotal) * 100}%`,
                        backgroundColor: `color-mix(in srgb, ${
                          tile.color ?? PALETTE[i % PALETTE.length]
                        } 55%, black)`,
                      }}
                      onMouseEnter={() => setActive(i)}
                    >
                      {wide && tall && (
                        <>
                          <span className="min-w-0 truncate text-base font-medium text-white">
                            {tile.name}
                          </span>
                          <span className="shrink-0 text-xs tabular-nums text-white/90">
                            {value}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {active != null && visible[active] && (
          <div className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[calc(100%+8px)]">
            <ChartTooltipPanel className="py-2.5">
              <div className="flex items-center gap-2.5 whitespace-nowrap text-sm">
                <span
                  aria-hidden
                  className="size-[7px] shrink-0 rounded-full"
                  style={{
                    background: visible[active].color ?? PALETTE[active % PALETTE.length],
                  }}
                />
                <span className="text-foreground/70">{visible[active].name}</span>
                <span className="font-medium tabular-nums text-foreground">
                  {Math.round((visible[active].value / total) * 100)}%
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
Treemap.displayName = "Treemap";

export { Treemap };
