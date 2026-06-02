import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Badge color rules ──────────────────────────────────────────────────────
// Active/brand → green-500 #63dbdb (NOT green-700 — that's for button fills only)
// No border on most variants — Linear style: subtle bg tint is enough
// ──────────────────────────────────────────────────────────────────────────
// ── shadcn-aligned badge — text-xs/600, border always present ────────────────
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border font-semibold text-xs tracking-[-0.01em] transition-colors select-none whitespace-nowrap",
  {
    variants: {
      variant: {
        // green-500 tint
        default:     "bg-[rgba(99,219,219,0.12)] text-[#63dbdb] border-[rgba(99,219,219,0.25)]",
        // zinc neutral
        secondary:   "bg-[rgba(210,211,211,0.08)] text-[rgba(210,211,211,0.65)] border-[rgba(210,211,211,0.15)]",
        // border only
        outline:     "bg-transparent text-[rgba(210,211,211,0.65)] border-[rgba(210,211,211,0.30)]",
        // coral
        destructive: "bg-[rgba(232,83,58,0.10)] text-[#e8533a] border-[rgba(232,83,58,0.25)]",
        // orange
        warning:     "bg-[rgba(231,102,56,0.10)] text-[#e76638] border-[rgba(231,102,56,0.25)]",
        // yellow
        highlight:   "bg-[rgba(253,224,71,0.10)] text-[#f7d371] border-[rgba(253,224,71,0.25)]",
        // alias
        success:     "bg-[rgba(99,219,219,0.12)] text-[#63dbdb] border-[rgba(99,219,219,0.25)]",
      },
      size: {
        sm:      "px-1.5 py-0 text-[10px] leading-5 rounded-[3px]",
        default: "px-2   py-0.5 text-xs",
        lg:      "px-2.5 py-1   text-sm",
      },
      dot: {
        true:  "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      dot: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, dot, className }))} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            variant === "destructive" ? "bg-destructive" :
            variant === "secondary"   ? "bg-muted-foreground" :
            "bg-primary"
          )}
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
