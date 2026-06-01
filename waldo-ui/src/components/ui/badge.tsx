import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:     "bg-primary/10 text-primary border border-primary/20",
        secondary:   "bg-secondary text-secondary-foreground border border-border/20",
        outline:     "border border-border/20 text-foreground",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",
        warning:     "bg-[rgb(var(--accent-warning))/10] text-[rgb(var(--accent-warning))] border border-[rgb(var(--accent-warning))/20]",
        highlight:   "bg-[rgb(var(--accent-highlight))/10] text-[rgb(var(--accent-highlight))] border border-[rgb(var(--accent-highlight))/20]",
        success:     "bg-primary/10 text-primary border border-primary/20",
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
