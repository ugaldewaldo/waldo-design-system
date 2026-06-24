import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// CodeBlock — preformatted text surface with one or more copy actions in the header.
// bg: card (zinc-900) · border: border/subtle · rounded-xl
// Header: right-aligned ghost-sm buttons, separated from body by a bottom border.
// Body: font-mono text-sm, text-foreground/70, preserves whitespace.

export interface CodeBlockAction {
  label: string;
  content: string;
}

export interface CodeBlockProps {
  children: React.ReactNode;
  actions?: CodeBlockAction[];
  className?: string;
}

export function CodeBlock({ children, actions = [], className }: CodeBlockProps) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-card border border-border/[0.08] overflow-hidden",
        className
      )}
    >
      {actions.length > 0 && (
        <div className="flex items-center justify-end gap-1 px-3 py-2 border-b border-border/[0.08]">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleCopy(action.content, i)}
              className={cn(
                "inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full text-xs font-medium tracking-[-0.02em]",
                "bg-foreground/[0.06] text-foreground/60 hover:bg-foreground/10 hover:text-foreground/80",
                "transition-colors duration-100 cursor-pointer select-none"
              )}
            >
              {copiedIndex === i
                ? <Check className="h-3 w-3" />
                : <Copy className="h-3 w-3" />
              }
              {action.label}
            </button>
          ))}
        </div>
      )}
      <pre className="p-4 text-sm font-mono leading-relaxed text-foreground/70 overflow-x-auto whitespace-pre-wrap break-words m-0">
        {children}
      </pre>
    </div>
  );
}
