import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Loaders
//
// Type A — Three dots   · · ·   (2 sizes)
//   Staggered pulse animation. Use for: async loading states, waiting.
//
// Type B — Text cursor  |   (Claude-style blinking cursor)
//
// Type C — Spinner  ◌   (circular, zinc or green)
//   Blinking block cursor. Use for: streaming text, AI generation, typing.
//   Variants: zinc (neutral) · green (brand/active)
// ─────────────────────────────────────────────────────────────────────────────

// ── Type A — Three Dots ───────────────────────────────────────────────────────

interface DotsLoaderProps {
  size?: "sm" | "default";
  variant?: "zinc" | "green";
  className?: string;
}

export function DotsLoader({ size = "default", variant = "zinc", className }: DotsLoaderProps) {
  const dot = size === "sm" ? "h-1 w-1" : "h-1.5 w-1.5";
  const gap = size === "sm" ? "gap-1" : "gap-1.5";
  const color = variant === "green" ? "bg-primary" : "bg-muted-foreground";

  return (
    <span
      className={cn("inline-flex items-center", gap, className)}
      aria-label="Loading"
      role="status"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("rounded-full", color, dot, "animate-pulse")}
          style={{ animationDelay: `${i * 160}ms`, animationDuration: "900ms" }}
        />
      ))}
    </span>
  );
}

// ── Type B — Shimmer Text (Claude-style) ──────────────────────────────────────
// Moving gradient wave through text — zinc (neutral) or green (brand)

interface ShimmerTextProps {
  children: React.ReactNode;
  variant?: "zinc" | "green";
  className?: string;
}

export function ShimmerText({ children, variant = "zinc", className }: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "animate-[shimmer_2s_linear_infinite]",
        "bg-[length:200%_auto]",
        variant === "green"
          ? "bg-[linear-gradient(90deg,color-mix(in_srgb,var(--primary)_40%,transparent)_0%,var(--primary)_50%,color-mix(in_srgb,var(--primary)_40%,transparent)_100%)]"
          : "bg-[linear-gradient(90deg,color-mix(in_srgb,var(--foreground)_35%,transparent)_0%,color-mix(in_srgb,var(--foreground)_75%,transparent)_50%,color-mix(in_srgb,var(--foreground)_35%,transparent)_100%)]",
        className
      )}
    >
      {children}
    </span>
  );
}

// Keep TextCursor as a simple utility for cases where cursor is needed
export function TextCursor({ variant = "zinc", className }: { variant?: "zinc" | "green"; className?: string }) {
  return (
    <span
      className={cn("inline-block w-0.5 align-middle animate-[blink_1s_ease-in-out_infinite]",
        variant === "green" ? "bg-primary h-[1em]" : "bg-foreground/60 h-[1em]",
        className
      )}
      aria-hidden="true"
    />
  );
}
