import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo FilterTrigger — Figma DS node 84014-277810 (PANEL / INSIGHTS)
//
// Inline filter selector: label + optional active value + chevron down.
// No background, no pill — purely bare text trigger.
//
// States:
//   default  → label only, muted color
//   active   → label + value (value shown in foreground)
//
// Usage:
//   <FilterTrigger label="Any source" onClick={fn} />
//   <FilterTrigger label="Recent" value="Last 7 days" onClick={fn} />
// ─────────────────────────────────────────────────────────────────────────────

export interface FilterTriggerProps {
  /** Filter name — always visible */
  label: string;
  /** Selected value — shown inline when set */
  value?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function FilterTrigger({
  label,
  value,
  onClick,
  disabled,
  className,
}: FilterTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-1.5",
        "text-sm tracking-[-0.02em] select-none",
        "transition-colors duration-100",
        "cursor-pointer disabled:pointer-events-none disabled:opacity-40",
        value
          ? "text-foreground"
          : "text-foreground/70 hover:text-foreground",
        className
      )}
    >
      <span>{label}</span>
      {value && (
        <span className="font-medium text-foreground">{value}</span>
      )}
      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
    </button>
  );
}
