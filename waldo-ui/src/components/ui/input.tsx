import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Input system — values from Figma DS (node 83838:481260)
//
// Shape     → pill / rounded-full  (matches button language)
// Border    → zinc-200/12% at rest, /30% on hover/focus
// Fill      → transparent (no background)
// Height    → 40px (h-10) — compact, inline
// Font      → text-sm-normal: 14px / 400 / -0.02em
// Padding   → px-4 py-2.5 (16px / 10px)
// Placeholder → zinc-200/50%
// ─────────────────────────────────────────────────────────────────────────────

// ── Base input class string ───────────────────────────────────────────────────

// ── State border values (from Figma DS nodes 83865:55347–83865:55558) ──────────
// Default:        border-foreground/[0.12]   zinc-200/12%
// Hover/Focus:    border-waldo-green-800      green-800 (#265152)
// Label:          text-primary               green-500

const inputBase = [
  "flex h-10 w-full",
  // pill shape — matches button language
  "rounded-full",
  // no background, border only
  "border border-foreground/[0.12] bg-transparent",
  // typography — text-sm-normal: 14px / 400 / -0.02em
  "px-4 py-2.5 text-sm font-normal tracking-[-0.02em] text-foreground",
  // placeholder — zinc-200/50%
  "placeholder:text-foreground/50",
  "transition-colors duration-100",
  "hover:border-waldo-green-800",
  "focus-visible:outline-none focus-visible:border-waldo-green-800",
  "disabled:cursor-not-allowed disabled:opacity-40",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
].join(" ");

// ── Input ─────────────────────────────────────────────────────────────────────

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  /** Leading icon or element (renamed from prefix to avoid DOM clash) */
  leadingIcon?: React.ReactNode;
  /** Trailing icon or element */
  suffix?: React.ReactNode;
  /** @deprecated use leadingIcon */
  prefix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leadingIcon, prefix, suffix, ...props }, ref) => {
    const leading = leadingIcon ?? prefix;
    if (leading || suffix) {
      return (
        <div className="relative flex items-center">
          {leading && (
            <div className="pointer-events-none absolute left-4 flex items-center text-foreground/50">
              {leading}
            </div>
          )}
          <input
            type={type}
            className={cn(inputBase, leading && "pl-10", suffix && "pr-10", className)}
            ref={ref}
            {...props}
          />
          {suffix && (
            <div className="absolute right-4 flex items-center text-foreground/50">
              {suffix}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputBase, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// ── Textarea ──────────────────────────────────────────────────────────────────
// Same pill shape but auto-height. Min 3 rows.

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[88px] w-full resize-y",
      "rounded-3xl",           // large radius for textarea (consistent with pill)
      "border border-foreground/[0.12] bg-transparent",
      "px-4 py-3 text-sm font-normal tracking-[-0.02em] text-foreground",
      "placeholder:text-foreground/50",
      "transition-colors duration-100",
      "focus-visible:outline-none focus-visible:border-waldo-green-800",
      "disabled:cursor-not-allowed disabled:opacity-40",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// ── Field — label + input + hint/error ────────────────────────────────────────
// Two patterns:
//   compact  → label left-aligned above, small gap (default)
//   inline   → for dense form rows

interface FieldProps {
  /** Label text */
  label?: string;
  /** Helper text below the input */
  hint?: string;
  /** Error message — replaces hint when set */
  error?: string;
  /** Mark as required (adds * to label) */
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

function Field({ label, hint, error, required, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label className="px-1 pb-0 text-sm font-normal leading-5 tracking-[-0.02em] text-primary">
          {label}
          {required && (
            <span className="ml-1 text-foreground/50 font-normal" aria-hidden="true">*</span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p className="px-1 text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="px-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export { Input, Textarea, Field };
