import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Checkbox — values from Figma DS (node 74417:39312)
//
// Shape     → CIRCULAR (16px circle, not square)
// Mono      → foreground/30 unchecked · foreground/70 checked (muted)
// Green     → foreground/30 unchecked · primary (green-500) checked (brand)
// Label     → font-semibold 14px foreground/70
//
// Two visual colorSchemes controlled by `colorScheme` prop:
//   mono  — neutral/muted (default)
//   green — brand teal
// ─────────────────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** mono = neutral muted · green = brand teal (default: green) */
  colorScheme?: "brand" | "mono";
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, colorScheme = "brand", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Circular — 16×16px
      "peer h-4 w-4 shrink-0 rounded-full",
      // Unchecked border
      "border border-foreground/30",
      // Background
      "bg-transparent",
      "transition-colors duration-100",
      "focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-40",
      // Checked states per colorScheme
      colorScheme === "brand"
        ? "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
        : "data-[state=checked]:bg-foreground/70 data-[state=checked]:border-foreground/70 data-[state=checked]:text-background",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-2.5 w-2.5" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// ── CheckboxField — checkbox + label ─────────────────────────────────────────

interface CheckboxFieldProps {
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  colorScheme?: "brand" | "mono";
  disabled?: boolean;
  className?: string;
}

function CheckboxField({
  label,
  checked,
  onCheckedChange,
  colorScheme = "brand",
  disabled,
  className,
}: CheckboxFieldProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
    >
      <Checkbox
        colorScheme={colorScheme}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <span className="text-sm font-semibold tracking-[-0.02em] text-foreground/70">
        {label}
      </span>
    </label>
  );
}

export { Checkbox, CheckboxField };
