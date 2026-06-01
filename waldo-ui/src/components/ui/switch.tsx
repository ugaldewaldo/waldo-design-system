import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full",
      "border border-border/20 bg-secondary",
      "transition-colors duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25",
      "disabled:cursor-not-allowed disabled:opacity-40",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary/50",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-3 w-3 rounded-full",
        "bg-zinc-400 shadow-sm",
        "transition-transform duration-150",
        "data-[state=checked]:translate-x-3.5 data-[state=unchecked]:translate-x-0.5",
        "data-[state=checked]:bg-primary-foreground",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };
