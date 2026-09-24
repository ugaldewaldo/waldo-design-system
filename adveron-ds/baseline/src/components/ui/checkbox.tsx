import * as React from "react";

import { cn } from "@/lib/utils";

// A native checkbox, styled to the console's border/accent tokens.
//
// Deliberately NOT a Radix control, unlike the other primitives here: a Radix
// checkbox renders a button plus a hidden input, so a group of them needs a
// react-hook-form Controller per box to produce an array. A real input is what
// `register` binds to directly, and the browser is what collects the checked
// values — one less layer between the form and what the API is sent.
const Checkbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>(
  ({ className, ...props }, ref): React.ReactElement => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "size-4 shrink-0 cursor-pointer rounded-[5px] accent-primary",
        "border border-foreground/[0.12]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    />
  ),
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
