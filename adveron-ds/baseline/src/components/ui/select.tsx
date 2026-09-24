import * as React from "react";

import { cn } from "@/lib/utils";

// A NATIVE <select>, styled to the design system's select-trigger language rather
// than a headless listbox. The console's selects are staff table filters, where
// the platform control is the better one: keyboard, type-ahead and the mobile
// picker come for free, and there is no extra runtime dependency or second a11y
// surface to keep correct.
//
// Height and padding follow the DS trigger (h-9, px-3.5) rather than Input's
// taller field: a filter sits in a toolbar, not in a form. The FILL is Input's,
// not the trigger's: the DS trigger's filled `secondary` grey is the same grey
// a disabled control wears, and a row of filters drawn in it read as a row of
// controls that could not be used.
const selectBase = [
  "flex h-9 w-full",
  // control radius at h-9, matching the button/input ladder
  "rounded-[9px]",
  "border border-foreground/[0.12] bg-transparent",
  // 16px below `sm`, and only there: a native <select> under 16px zooms mobile
  // Safari on focus like any other field, and it does not zoom back (see
  // ui/input.tsx).
  "px-3.5 text-base font-normal tracking-[-0.02em] text-foreground sm:text-sm",
  "transition-colors duration-100",
  "hover:border-waldo-green-800",
  "focus-visible:outline-none focus-visible:border-waldo-green-800",
  "disabled:cursor-not-allowed disabled:opacity-40",
  // The platform draws its menulist arrow at a fixed inset that padding cannot
  // move, and it is not the chevron the rest of the console uses.
  // appearance-none swaps it for ours, placed to mirror the 14px left padding;
  // pr-9 keeps the value text clear of it.
  "appearance-none pr-9 bg-no-repeat",
  "[background-position:right_0.875rem_center] [background-size:1rem]",
  // The popup list is left to the platform, which paints it
  // with the OS palette — the options need their own colors to stay legible.
  "[&>option]:bg-card [&>option]:text-foreground",
].join(" ");

// A data URI because background-image cannot read currentColor, which also means
// its colour is baked in and cannot follow the theme from here. The two drawings
// live in --select-chevron (adveron-theme.css), one per mode, each tracking that
// mode's muted foreground.
const CHEVRON_BACKGROUND = "var(--select-chevron)";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, style, ...props }, ref): React.ReactElement => (
  <select
    ref={ref}
    className={cn(selectBase, className)}
    style={{ backgroundImage: CHEVRON_BACKGROUND, ...style }}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

export { Select };
