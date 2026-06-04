import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo RadioGroup — Linear/Radix pattern
//
// Shape     → circular, 16px — consistent with Checkbox
// Unchecked → border-foreground/30, transparent bg
// Checked   → border-primary, primary dot indicator
// Variants:
//   green   → primary color (default, brand)
//   mono    → foreground/70 (neutral)
//
// Usage:
//   <RadioGroup value={value} onValueChange={setValue}>
//     <RadioGroupItem value="a" id="a" />
//     <label htmlFor="a">Option A</label>
//   </RadioGroup>
// ─────────────────────────────────────────────────────────────────────────────

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// ── RadioGroupItem ────────────────────────────────────────────────────────────

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  variant?: "green" | "mono";
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant = "green", ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      // Shape — circular 16px, consistent with Checkbox
      "h-4 w-4 rounded-full border border-foreground/30",
      "bg-transparent",
      "transition-colors duration-100",
      "focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-40",
      // Checked state per variant
      variant === "green"
        ? "data-[state=checked]:border-primary data-[state=checked]:bg-transparent"
        : "data-[state=checked]:border-foreground/70 data-[state=checked]:bg-transparent",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <span
        className={cn(
          "block h-2 w-2 rounded-full",
          variant === "green" ? "bg-primary" : "bg-foreground/70"
        )}
      />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// ── RadioGroupField — item + label ────────────────────────────────────────────

interface RadioGroupFieldProps {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  variant?: "green" | "mono";
  className?: string;
}

function RadioGroupField({
  value,
  label,
  description,
  disabled,
  variant = "green",
  className,
}: RadioGroupFieldProps) {
  return (
    <label
      className={cn(
        "flex items-start gap-2.5 cursor-pointer select-none",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
    >
      <RadioGroupItem
        value={value}
        variant={variant}
        disabled={disabled}
        className="mt-0.5 shrink-0"
      />
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium tracking-[-0.02em] text-foreground">
          {label}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground leading-snug">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}

export { RadioGroup, RadioGroupItem, RadioGroupField };
