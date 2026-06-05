import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// CopyLink — Figma node 83966:356556
// Container: bg-secondary · rounded-2xl · px-4 py-2
// URL text: text-primary · text-sm-normal
// Icon: copy → check for 2s on click

export interface CopyLinkProps {
  url: string;
  className?: string;
}

export function CopyLink({ url, className }: CopyLinkProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-secondary cursor-pointer select-none",
        "transition-colors hover:bg-secondary/80",
        className
      )}
      onClick={handleCopy}
      role="button"
      aria-label="Copy link"
    >
      <span className="flex-1 min-w-0 truncate text-sm font-normal tracking-[-0.02em] text-primary">
        {url}
      </span>
      <span className="shrink-0 text-muted-foreground transition-colors">
        {copied
          ? <Check className="h-3.5 w-3.5 text-primary" />
          : <Copy className="h-3.5 w-3.5" />
        }
      </span>
    </div>
  );
}
