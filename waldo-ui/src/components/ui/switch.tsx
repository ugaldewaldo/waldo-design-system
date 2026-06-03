import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Switch — values from Figma DS (node 11406:98105)
//
// Size      → 32×18px
// Shape     → pill (rounded-full)
// ON track  → primary (green-500)
// OFF track → muted (zinc-800)
// Thumb     → white circle, 14px
// Disabled  → opacity-40
// ─────────────────────────────────────────────────────────────────────────────

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-[18px] w-8 shrink-0 cursor-pointer items-center",
      "rounded-full px-[3px] py-[2px]",
      "bg-muted",
      "data-[state=checked]:bg-primary",
      "transition-colors duration-150",
      "focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-40",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-3.5 w-3.5 rounded-full bg-white shadow-sm",
        "transition-transform duration-150",
        "data-[state=checked]:translate-x-[13px]",
        "data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
