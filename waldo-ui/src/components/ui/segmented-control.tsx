import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo SegmentedControl — values from Figma DS (node 83872:2208)
//
// variant="default"  → bg-background/50 container, flex-1 equal segments
//                       active: bg-foreground/12 + text-foreground shadow-sm
//
// variant="surface"  → bg-[#202123] (surface/elevated) container, shrink-0 per-content
//                       active: bg-zinc-200 text-zinc-950 drop-shadow
//                       Designed for many items (navigation tabs, Brand API)
//                       Figma: node 149:1735
//
// Font: text-sm-normal — 14px / 400 / -0.02em / lh-20
// ─────────────────────────────────────────────────────────────────────────────

export interface SegmentedOption {
  label: React.ReactNode;
  value: string;
  /** Optional icon — replaces label */
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  /** full — stretches to container width (default: auto) */
  fullWidth?: boolean;
  /**
   * default — equal-width segments on bg-background/50 (DS general use)
   * surface — content-fit segments on surface/elevated bg (nav tabs, Brand API)
   */
  variant?: "default" | "surface";
}

function SegmentedControl({
  options,
  value,
  onChange,
  className,
  disabled = false,
  fullWidth = false,
  variant = "default",
}: SegmentedControlProps) {
  const isSurface = variant === "surface";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full p-1",
        isSurface ? "bg-[#202123]" : "bg-background/[0.5]",
        fullWidth && "flex w-full",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
      role="group"
      aria-label="segmented control"
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isActive}
            onClick={() => !disabled && onChange(opt.value)}
            className={cn(
              "flex items-center justify-center rounded-full",
              "py-1.5 px-4",
              // Typography — text-sm-normal
              "text-sm font-normal tracking-[-0.02em] leading-5",
              "transition-colors duration-100 cursor-pointer select-none whitespace-nowrap",
              // Sizing: equal-width for default, content-fit for surface
              isSurface ? "shrink-0" : "flex-1 px-0 min-w-0",
              // States
              isActive
                ? isSurface
                  ? "bg-zinc-200 text-zinc-950 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.12)]"
                  : "bg-foreground/[0.12] text-foreground shadow-sm"
                : isSurface
                  ? "bg-transparent text-foreground/70"
                  : "bg-transparent text-foreground/70",
            )}
          >
            {opt.icon ?? opt.label}
          </button>
        );
      })}
    </div>
  );
}

export { SegmentedControl };
