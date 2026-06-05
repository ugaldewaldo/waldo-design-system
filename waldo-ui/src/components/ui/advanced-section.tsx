import * as React from "react";
import { IconCircleChevronDown, IconCircleChevronUp } from "./icons";
import { cn } from "@/lib/utils";

// AdvancedSection — Figma node 84009:174707
// Toggle row 48px · chevron-right (collapsed) → chevron-down (expanded)
// Label: text-sm-normal, foreground/70
// Children revealed below with smooth height transition

export interface AdvancedSectionProps {
  label?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AdvancedSection({
  label = "Advanced",
  defaultOpen = false,
  children,
  className,
}: AdvancedSectionProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className={cn("flex flex-col", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 h-12 cursor-pointer select-none",
          "text-sm font-normal tracking-[-0.02em] text-foreground/70",
          "hover:text-foreground transition-colors duration-100",
          "bg-transparent border-none p-0"
        )}
      >
        {open
          ? <IconCircleChevronUp className="h-3.5 w-3.5 shrink-0 text-primary" />
          : <IconCircleChevronDown className="h-3.5 w-3.5 shrink-0 text-primary" />
        }
        {label}
      </button>

      {open && (
        <div className="flex flex-col gap-4">
          {children}
        </div>
      )}
    </div>
  );
}
