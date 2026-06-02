import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Checkbox — values from Figma DS (node 74417:39312)
//
// Shape     → CIRCULAR (16px circle, not square)
// Mono      → zinc-200/30% unchecked · zinc-200/70% checked (muted)
// Green     → zinc-200/30% unchecked · green-700 #1b8c8c checked (brand)
// Label     → font-semibold 14px zinc-200/70%
//
// Two visual variants controlled by `variant` prop:
//   mono  — neutral/muted (default)
//   green — brand teal
// ─────────────────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** mono = neutral muted · green = brand teal (default: green) */
  variant?: "mono" | "green";
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant = "green", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Circular — 16×16px
      "peer h-4 w-4 shrink-0 rounded-full",
      // Unchecked border
      "border border-[rgba(210,211,211,0.30)]",
      // Background
      "bg-transparent",
      "transition-colors duration-100",
      "focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-40",
      // Checked states per variant
      variant === "green"
        ? "data-[state=checked]:bg-[#1b8c8c] data-[state=checked]:border-[#1b8c8c] data-[state=checked]:text-white"
        : "data-[state=checked]:bg-[rgba(210,211,211,0.70)] data-[state=checked]:border-[rgba(210,211,211,0.70)] data-[state=checked]:text-[#171819]",
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
  variant?: "mono" | "green";
  disabled?: boolean;
  className?: string;
}

function CheckboxField({
  label,
  checked,
  onCheckedChange,
  variant = "green",
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
        variant={variant}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      {/* Label: font-semibold 14px zinc-200/70% */}
      <span className="text-sm font-semibold tracking-[-0.02em] text-[rgba(210,211,211,0.70)]">
        {label}
      </span>
    </label>
  );
}

export { Checkbox, CheckboxField };
