import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Slider — Linear/Radix pattern
//
// Track    → 4px height, bg-muted (zinc-800)
// Range    → filled with primary (green-500)
// Thumb    → 16px circle, bg-primary, ring on focus
//
// Features:
//   - Single value (default) or range (two thumbs)
//   - Disabled state: opacity-40
//   - Steps via `step` prop
//
// Usage:
//   <Slider value={[50]} onValueChange={([v]) => setValue(v)} min={0} max={100} />
//   <Slider value={[20, 80]} onValueChange={setRange} />  // range
// ─────────────────────────────────────────────────────────────────────────────

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      "data-[disabled]:opacity-40 data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  >
    {/* Track */}
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-muted">
      {/* Range — filled portion */}
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>

    {/* Thumb(s) */}
    {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className={cn(
          "block h-2.5 w-2.5 rounded-full",
          "bg-primary",
          "shadow-surface",
          "transition-colors duration-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "hover:bg-primary/90",
          "cursor-grab active:cursor-grabbing"
        )}
      />
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
