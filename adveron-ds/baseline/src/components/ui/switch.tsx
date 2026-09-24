"use client";

import type { ComponentPropsWithoutRef, ReactElement } from "react";

import { cn } from "@/lib/utils";

// The console's toggle, at the design system's own measurements (registry/ui/switch.tsx:
// a 32×18 pill, a 14px white thumb, primary when on, muted when off).
//
// A native button rather than that file's Radix primitive: this app does not depend on
// @radix-ui/react-switch, and `role="switch"` on a button already carries the whole
// contract — Space and Enter activate it because it IS a button, and `aria-checked` is
// what a screen reader announces. Nothing here needs the primitive's form integration:
// a switch in this console applies on the flip rather than being submitted.
//
// The accessible name comes from the caller (`aria-label`, or `aria-labelledby` pointing
// at the text beside it). A `<label htmlFor>` would not do it — labels name form
// controls, and a button is not one.
export function Switch({
  checked,
  onCheckedChange,
  className,
  disabled,
  ...props
}: Omit<
  ComponentPropsWithoutRef<"button">,
  "aria-checked" | "children" | "onChange" | "role" | "type" | "value"
> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}): ReactElement {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cn(
        "inline-flex h-[18px] w-8 shrink-0 cursor-pointer items-center rounded-full px-[3px] py-[2px]",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25",
        "disabled:cursor-not-allowed disabled:opacity-40",
        checked ? "bg-primary" : "bg-muted",
        className,
      )}
      onClick={() => onCheckedChange(!checked)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none block size-3.5 rounded-full bg-white shadow-sm transition-transform duration-150",
          checked ? "translate-x-[13px]" : "translate-x-0",
        )}
      />
    </button>
  );
}
