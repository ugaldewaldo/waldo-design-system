import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Vendored from @waldo/design-system (registry/ui/badge.tsx).
// NOT a stock shadcn component: this is a DELIBERATELY NARROWED copy — re-adding
// it from the registry (`shadcn add`) would silently revert the narrowing.
// The registry's acid-yellow `highlight` variant is part of that narrowing: the
// brand kit spends yellow on the single call to action in a view, so no chip may
// wear it. Turquoise (`default`) is the accent a chip reaches for instead.
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md font-semibold text-xs tracking-[-0.01em] transition-colors select-none whitespace-nowrap",
  {
    variants: {
      /**
       * A chip carrying a MACHINE value — a status, a code, a count — is set in
       * the mono face and upper case, which is the kit's rule for anything a
       * machine returned. Chips carrying human language (a role, "Coming soon")
       * stay in the interface face.
       */
      mono: {
        true: "font-mono font-medium uppercase tracking-[0.06em]",
        false: "",
      },
      variant: {
        default: "bg-primary/12 text-ink-accent",
        secondary: "bg-foreground/[0.08] text-foreground/65",
        outline: "bg-transparent text-foreground/65 border border-foreground/30",
        destructive: "bg-destructive/10 text-destructive",
        warning: "bg-warning/10 text-warning",
      },
      size: {
        sm: "px-1.5 py-0 text-xs leading-5 rounded-[5px]",
        default: "px-2 py-0.5 text-xs",
        lg: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      mono: false,
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, mono, ...props }: BadgeProps): React.ReactElement {
  return <span className={cn(badgeVariants({ variant, size, mono, className }))} {...props} />;
}

export { Badge, badgeVariants };
