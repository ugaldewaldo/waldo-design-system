import * as React from "react";
import { cn } from "@/lib/utils";

// Depth Pill — Brand API component
// Encodes discount magnitude via text-color opacity.
// Alpha formula: Math.max(0.30, Math.min(1, 0.30 + (depth / 60) * 0.70))
// Base color: amber #f7d372 (--highlight-rgb: 247,211,113)

const HIGHLIGHT_RGB = "247,211,113";

/** @param maxDepth — denominator for the alpha scale (default 60; leaderboard uses 70) */
function depthAlpha(depth: number, maxDepth = 60): number {
  return Math.max(0.30, Math.min(1, 0.30 + (depth / maxDepth) * 0.70));
}

export interface DepthPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Discount percentage (0–100) */
  depth: number;
  /** Label override — defaults to "{depth}% off" */
  label?: string;
  /** Denominator for the alpha scale. Default 60; leaderboards use 70 */
  maxDepth?: number;
}

const DepthPill = React.forwardRef<HTMLSpanElement, DepthPillProps>(
  ({ depth, maxDepth = 60, label, className, style, ...props }, ref) => {
    const alpha = depthAlpha(depth, maxDepth);
    return (
      <span
        ref={ref}
        className={cn(
          "text-sm font-bold px-2.5 py-1 rounded-lg whitespace-nowrap",
          className
        )}
        style={{
          color: `rgba(${HIGHLIGHT_RGB},${alpha})`,
          background: `rgba(${HIGHLIGHT_RGB},0.10)`,
          ...style,
        }}
        {...props}
      >
        {label ?? `${depth}% off`}
      </span>
    );
  }
);
DepthPill.displayName = "DepthPill";

export { DepthPill, depthAlpha };
