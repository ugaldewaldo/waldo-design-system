import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Button — v2
//
// Shape    → pill / rounded-full            (Figma DS)
// Colors   → new DS tokens                  (ugaldewaldo.github.io/waldo-design-system)
// Type     → Inter Medium 500, 14px/-0.02em (Figma: text-sm-medium)
//
// Variant taxonomy (shadcn-aligned naming):
//   default           Brand CTA          green-500 fill · zinc-950 text
//   secondary         Subtle fill        zinc-200/5% fill · zinc-200/70% text
//   outline           Bordered           zinc-200/20% border · zinc-200 text  (shadcn: outline)
//   ghost             Minimal            no fill · no border · zinc-200/70% text (shadcn: ghost)
//   solid             Dark fill          zinc-800 fill · zinc-200 text (dropdowns, contextual)
//   white             Inverse            zinc-200 fill · zinc-950 text (over images/color bg)
//   destructive       Soft danger        coral/10% fill+border · coral text
//   destructive-solid Hard danger        coral fill · white text (confirmation dialogs only)
//   link              Inline action      brand text · underline on hover
//
// Size taxonomy (Figma heights: 28 / 36 / 44):
//   sm       28px  dense UIs, table rows, toolbar
//   default  36px  standard
//   lg       44px  hero CTAs, onboarding
//   icon-sm  28×28
//   icon     36×36
//   icon-lg  44×44
//
// Disabled state:
//   All variants use disabled:opacity-40 (accessible, maintainable).
//   Figma shows zinc-750 bg + /28% text — that's a specific Figma aesthetic.
//   In code we normalize to opacity-40 for consistency across all variants.
// ─────────────────────────────────────────────────────────────────────────────
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "whitespace-nowrap select-none",
    // pill shape
    "rounded-full",
    // DS text-sm-medium: 14px / 20px / -0.02em / weight 500
    "text-sm font-medium tracking-[-0.02em]",
    "transition-colors duration-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        // green-500 fill / zinc-950 text. One per view max.
        default:
          "bg-primary text-primary-foreground hover:bg-primary/88 active:bg-primary/75",

        // zinc-200/5% fill / zinc-200/70% text. No border.
        // Filter chips, toolbar, secondary actions.
        secondary:
          "bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground active:bg-foreground/[0.14]",

        // zinc-200/20% border / zinc-200 text / no fill.
        // Pairs with default (Save / Cancel row).
        outline:
          "border border-foreground/[0.12] bg-transparent text-foreground hover:bg-foreground/[0.04] active:bg-foreground/10",

        // No fill, no border / zinc-200/70% text.
        // Tertiary actions, icon+text in dense lists.
        ghost:
          "bg-transparent text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04] active:bg-foreground/10",

        // zinc-800 fill / zinc-200 text.
        // Dropdown triggers, contextual menus, filter buttons on dark backgrounds.
        solid:
          "bg-zinc-800 text-foreground hover:bg-zinc-750 active:bg-zinc-700",

        // zinc-200 fill / zinc-950 text.
        // Use over images, gradient backgrounds, or colored surfaces.
        white:
          "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80",

        // coral/10% + border / coral text. Soft — for first-touch destructive.
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/15 active:bg-destructive/20",

        // coral fill / white text. Hard — confirmation dialogs ONLY.
        // Never use as a first-touch action.
        "destructive-solid":
          "bg-destructive text-white hover:bg-destructive/90 active:bg-destructive/80",

        // brand text / underline on hover. Inline body links only.
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto rounded-none",
      },

      size: {
        sm:        "h-7  px-3",
        default:   "h-9  px-4",
        lg:        "h-11 px-5",
        "icon-sm": "h-7  w-7  p-0",
        "icon":    "h-9  w-9  p-0",
        "icon-lg": "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-3.5 w-3.5 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
