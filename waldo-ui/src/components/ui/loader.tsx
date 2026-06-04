import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Loaders
//
// Type A — Three dots   · · ·   (2 sizes)
//   Staggered pulse animation. Use for: async loading states, waiting.
//
// Type B — Text cursor  |   (Claude-style blinking cursor)
//   Blinking block cursor. Use for: streaming text, AI generation, typing.
//   Variants: zinc (neutral) · green (brand/active)
// ─────────────────────────────────────────────────────────────────────────────

// ── Type A — Three Dots ───────────────────────────────────────────────────────

interface DotsLoaderProps {
  size?: "sm" | "default";
  className?: string;
}

export function DotsLoader({ size = "default", className }: DotsLoaderProps) {
  const dot = size === "sm" ? "h-1 w-1" : "h-1.5 w-1.5";
  const gap = size === "sm" ? "gap-1" : "gap-1.5";

  return (
    <span
      className={cn("inline-flex items-center", gap, className)}
      aria-label="Loading"
      role="status"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "rounded-full bg-muted-foreground",
            dot,
            "animate-pulse"
          )}
          style={{ animationDelay: `${i * 160}ms`, animationDuration: "900ms" }}
        />
      ))}
    </span>
  );
}

// ── Type B — Text Cursor (Claude-style) ───────────────────────────────────────

interface TextCursorProps {
  variant?: "zinc" | "green";
  className?: string;
}

export function TextCursor({ variant = "zinc", className }: TextCursorProps) {
  return (
    <span
      className={cn(
        "inline-block w-0.5 align-middle",
        "animate-[blink_1s_ease-in-out_infinite]",
        variant === "green"
          ? "bg-primary h-[1em]"
          : "bg-foreground/60 h-[1em]",
        className
      )}
      aria-hidden="true"
    />
  );
}

// Convenience: text + cursor together
interface StreamingTextProps {
  children: React.ReactNode;
  variant?: "zinc" | "green";
  className?: string;
}

export function StreamingText({ children, variant = "zinc", className }: StreamingTextProps) {
  return (
    <span className={cn("inline-flex items-baseline gap-0.5", className)}>
      {children}
      <TextCursor variant={variant} />
    </span>
  );
}
