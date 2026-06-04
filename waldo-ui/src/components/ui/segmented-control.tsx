import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo SegmentedControl — values from Figma DS (node 83872:2208)
//
// Container  → zinc-950 (#171819) + rounded-[24px]
// Active opt → zinc-800 (#27282b) + zinc-200 full text
// Inactive   → transparent + zinc-200/70% text
// Font       → text-sm-normal: 14px / 400 / -0.02em
// Padding    → py-[6px] per option, options are flex-1
//
// Usage:
//   <SegmentedControl
//     options={[{ label: 'Visible', value: 'visible' }, { label: 'Hidden', value: 'hidden' }]}
//     value="visible"
//     onChange={setValue}
//   />
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
}

function SegmentedControl({
  options,
  value,
  onChange,
  className,
  disabled = false,
  fullWidth = false,
}: SegmentedControlProps) {
  return (
    <div
      className={cn(
        // Container — background pill
        "inline-flex items-center rounded-full bg-background p-0",
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
              // Base
              "flex flex-1 items-center justify-center rounded-full",
              "py-1.5 px-0 min-w-0",
              // Typography — text-sm-normal
              "text-sm font-normal tracking-[-0.02em] leading-5",
              // Transition
              "transition-colors duration-100 cursor-pointer select-none",
              // States
              isActive
                ? "bg-muted text-foreground"
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
