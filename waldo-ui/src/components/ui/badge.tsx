import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-semibold text-xs tracking-[-0.01em] transition-colors select-none whitespace-nowrap",
  {
    variants: {
      variant: {
        default:     "bg-primary/12 text-primary",
        secondary:   "bg-foreground/[0.08] text-foreground/65",
        outline:     "bg-transparent text-foreground/65 border border-foreground/30",
        destructive: "bg-destructive/10 text-destructive",
        warning:     "bg-warning/10 text-warning",
        highlight:   "bg-highlight/10 text-highlight",
        active:      "bg-primary/15 text-primary",
        success:     "bg-primary/12 text-primary",
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
