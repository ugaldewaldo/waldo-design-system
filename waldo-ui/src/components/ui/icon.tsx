import { type LucideIcon, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Icon wrapper
//
// Two canvas sizes, icon strokes slightly smaller than the canvas:
//   sm  → 14px  (canvas 16 — inline text, table actions, button-sm)
//   md  → 16px  (canvas 24 — default buttons, nav items)
//   lg  → 18px  (canvas 24 large — standalone, prominent actions)
//
// strokeWidth is always 1.5 — matches Lucide's visual weight in Waldo.
//
// Usage:
//   import { Search } from "lucide-react"
//   import { Icon } from "@waldo/ui"
//
//   <Icon icon={Search} size="sm" />
//   <Icon icon={Search} size="md" className="text-primary" />
// ─────────────────────────────────────────────────────────────────────────────

export type IconSize = "sm" | "md" | "lg";

const sizeMap: Record<IconSize, string> = {
  sm: "h-3.5 w-3.5",          // 14px — canvas 16
  md: "h-4 w-4",               // 16px — canvas 24
  lg: "h-[18px] w-[18px]",    // 18px — canvas 24 large
};

export interface IconProps extends Omit<LucideProps, "size"> {
  icon: LucideIcon;
  size?: IconSize;
}

export function Icon({
  icon: LucideComponent,
  size = "md",
  className,
  strokeWidth = 1.5,
  ...props
}: IconProps) {
  return (
    <LucideComponent
      className={cn(sizeMap[size], className)}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}
