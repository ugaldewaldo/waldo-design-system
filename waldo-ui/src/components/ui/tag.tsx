import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Tag — values from Figma DS (node 67645:81618, CHIP/800)
//
// Shape    → pill / rounded-full
// Fill     → zinc-750 #2d2f33 (updated from Figma)
// Text     → zinc-200 full (default) · zinc-200/70% (muted)
// Sizes    → sm=28px · default=36px · lg=44px
//
// Tag vs Badge:
//   Badge  → informational, static, no interaction
//   Tag    → interactive, removable (has onRemove), used for selected values
// ─────────────────────────────────────────────────────────────────────────────

const tagVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full",
    "bg-popover",
    "font-medium tracking-[-0.02em] leading-5",
    "select-none whitespace-nowrap",
    "transition-colors duration-100",
  ],
  {
    variants: {
      size: {
        sm:      "h-7  px-3   text-xs  gap-1",
        default: "h-9  px-4   text-sm",
        lg:      "h-11 px-5   text-sm",
      },
      textColor: {
        high:  "text-foreground",
        muted: "text-foreground/70",
      },
    },
    defaultVariants: {
      size: "default",
      textColor: "high",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** Show X button — becomes interactive/removable */
  onRemove?: () => void;
  disabled?: boolean;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, size, textColor, onRemove, disabled, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          tagVariants({ size, textColor }),
          disabled && "opacity-40 pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={cn(
              "flex items-center justify-center rounded-full",
              "opacity-50 hover:opacity-100 transition-opacity duration-100",
              "focus-visible:outline-none",
              size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"
            )}
            aria-label="Remove"
          >
            <X strokeWidth={1.5} className="h-full w-full" />
          </button>
        )}
      </span>
    );
  }
);
Tag.displayName = "Tag";

// ── TagInput — input that holds multiple Tag values ───────────────────────────
// Used for: email recipients, multi-select, keyword lists

export interface TagInputProps {
  /** Current tag values */
  value: string[];
  /** Called when tags change */
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Max number of tags (optional) */
  maxTags?: number;
}

function TagInput({
  value,
  onChange,
  placeholder = "Add…",
  disabled = false,
  className,
  maxTags,
}: TagInputProps) {
  const [inputVal, setInputVal] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag || value.includes(tag)) return;
    if (maxTags && value.length >= maxTags) return;
    onChange([...value, tag]);
    setInputVal("");
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputVal);
    }
    if (e.key === "Backspace" && !inputVal && value.length > 0) {
      removeTag(value.length - 1);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 min-h-10",
        "rounded-full border border-foreground/[0.12] bg-transparent",
        "px-4 py-2 cursor-text",
        "transition-colors duration-100",
        "focus-within:border-waldo-green-800",
        disabled && "opacity-40 pointer-events-none",
        // When there are tags, switch to rounded-2xl for better wrapping
        value.length > 0 && "rounded-2xl",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, i) => (
        <Tag key={tag + i} size="sm" onRemove={() => removeTag(i)}>
          {tag}
        </Tag>
      ))}
      <input
        ref={inputRef}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => { if (inputVal) addTag(inputVal); }}
        placeholder={value.length === 0 ? placeholder : ""}
        disabled={disabled}
        className={cn(
          "flex-1 min-w-[80px] bg-transparent outline-none border-none",
          "text-sm font-normal tracking-[-0.02em] text-foreground",
          "placeholder:text-foreground/50",
        )}
      />
    </div>
  );
}

export { Tag, TagInput, tagVariants };
