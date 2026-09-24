import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Adveron Button — brand kit v2.1
//
// Shape    → 9px radius on a 34px control (kit: "BUTTONS · 34PX, 9PX RADIUS").
//            Our ladder is 28/40/44, so the radius scales with it — a fixed 9px
//            reads tight at 44 and slack at 28. See the size variants.
// Colors   → Arcade brand roles (see app/adveron-theme.css)
// Type     → Inter Medium 500, 14px/-0.02em — the interface face never changes
//
// Brand rationing, which is what the variant split encodes: the kit gives a view
// exactly ONE call to action, and it is yellow. Turquoise is the highlight and
// the secondary brand action. Both take INK type — paper/white on a brand fill is
// called out as a "NEVER", and yellow-on-ink measures 17.8:1.
//
// Variant taxonomy (shadcn-aligned naming):
//   default           Primary CTA        yellow fill · ink text · deep-yellow hairline
//   brand             Secondary brand    turquoise fill · ink text (the kit's btn--ink)
//   secondary         Subtle fill        foreground/5% fill · foreground/70% text
//   outline           Bordered           foreground/12% border · foreground text
//   ghost             Minimal            no fill · no border · foreground/70% text
//   solid             Filled neutral     foreground/10% fill · foreground text (dropdowns, contextual)
//   white             Inverse            foreground fill · background text (over images/color bg)
//   destructive       Soft danger        coral/10% fill+border · coral text
//   destructive-solid Hard danger        coral fill · white text (confirmation dialogs only)
//   link              Inline action      ink-accent text · underline on hover
//
// Size taxonomy (heights 28 / 40 / 44, radius held at the kit's 9-on-34 ratio):
//   sm       28px  r7   dense UIs, table rows, toolbar
//   default  40px  r10  standard — aligns with input h-10
//   lg       44px  r11  hero CTAs, onboarding
//   icon-sm  28×28 r7
//   icon     40×40 r10
//   icon-lg  44×44 r11
//
// Disabled state:
//   All variants use disabled:opacity-40 (accessible, maintainable). An
//   `aria-disabled` button gets the same look and no hover/active reaction, but
//   stays hoverable and focusable — see the base classes.
// ─────────────────────────────────────────────────────────────────────────────
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "whitespace-nowrap select-none cursor-pointer",
    // DS text-sm-medium: 14px / 20px / -0.02em / weight 500
    "text-sm font-medium tracking-[-0.02em]",
    "transition-colors duration-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    // The inert-but-reachable state: `aria-disabled` keeps the control hoverable
    // and in the tab order (so a tooltip can say WHY it is not on offer) while
    // looking disabled. The variants below guard their hover/active fills with
    // `not-aria-disabled:` so the state also stops the control reacting.
    "aria-disabled:cursor-not-allowed aria-disabled:opacity-40",
    "[&_svg]:opacity-60",
  ],
  {
    variants: {
      variant: {
        // The kit's one call to action. The hairline is the hover fill drawn at
        // 1px, so the edge is what the button becomes when you reach for it.
        default:
          "border border-cta-edge bg-cta text-cta-foreground not-aria-disabled:hover:bg-cta-edge not-aria-disabled:active:bg-cta-edge",

        // The kit's btn--ink: turquoise fill, ink type. The brand-weight action
        // that is NOT the view's one primary — sign-in on public chrome, a
        // second affirmative beside a yellow submit.
        brand:
          "bg-primary text-primary-foreground not-aria-disabled:hover:bg-primary/88 not-aria-disabled:active:bg-primary/75",

        // foreground/5% fill / foreground/70% text. No border.
        // Filter chips, toolbar, secondary actions.
        secondary:
          "bg-foreground/5 text-foreground/70 not-aria-disabled:hover:bg-foreground/10 not-aria-disabled:hover:text-foreground not-aria-disabled:active:bg-foreground/[0.12]",

        // foreground/12% border / foreground text / no fill.
        // Pairs with default (Save / Cancel row).
        outline:
          "border border-foreground/[0.12] bg-transparent text-foreground not-aria-disabled:hover:bg-foreground/[0.04] not-aria-disabled:active:bg-foreground/10",

        // No fill, no border / foreground/70% text.
        // Tertiary actions, icon+text in dense lists.
        ghost:
          "bg-transparent text-foreground/70 not-aria-disabled:hover:text-foreground not-aria-disabled:hover:bg-foreground/[0.04] not-aria-disabled:active:bg-foreground/10",

        // foreground/10% fill / foreground text. Dropdown triggers, contextual
        // menus, filter buttons — the heavier sibling of `secondary`. Derived from
        // the foreground rather than a fixed zinc step, so it stays a neutral
        // against whichever ground is live: a dark literal here would be a dark
        // fill carrying dark type on a paper page.
        solid:
          "bg-foreground/10 text-foreground not-aria-disabled:hover:bg-foreground/[0.16] not-aria-disabled:active:bg-foreground/20",

        // foreground fill / background text.
        // Use over images, gradient backgrounds, or colored surfaces.
        white:
          "bg-foreground text-background not-aria-disabled:hover:bg-foreground/90 not-aria-disabled:active:bg-foreground/80",

        // coral/10% + border / coral text. Soft — for first-touch destructive.
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20 not-aria-disabled:hover:bg-destructive/15 not-aria-disabled:active:bg-destructive/20",

        // coral fill / white text. Hard — confirmation dialogs ONLY.
        // Never use as a first-touch action.
        "destructive-solid":
          "bg-destructive text-destructive-foreground not-aria-disabled:hover:bg-destructive/90 not-aria-disabled:active:bg-destructive/80",

        // ink-accent text / underline on hover. Inline body links only — it keeps the
        // size slot's radius, which is invisible on something with no fill,
        // no border and no padding.
        link:
          "text-ink-accent underline-offset-4 not-aria-disabled:hover:underline p-0 h-auto",
      },

      // The radius lives here rather than in the base, so it is a single class
      // per button: `buttonVariants()` is also called directly (public-header),
      // where the output is a raw string with no tailwind-merge to settle a
      // base-vs-size conflict, and whichever rule Tailwind happened to emit
      // first would win.
      size: {
        sm:        "h-7  px-3 rounded-[7px]",
        default:   "h-10 px-4 rounded-[10px]",
        lg:        "h-11 px-5 rounded-[11px]",
        "icon-sm": "h-7  w-7  p-0 rounded-[7px]",
        "icon":    "h-10 w-10 p-0 rounded-[10px]",
        "icon-lg": "h-11 w-11 p-0 rounded-[11px]",
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
  ({ className, variant, size, asChild = false, loading, disabled, children, ...props }, ref): React.ReactElement => {
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
