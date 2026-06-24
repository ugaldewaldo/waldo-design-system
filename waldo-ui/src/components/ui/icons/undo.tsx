import * as React from "react";
import { cn } from "@/lib/utils";

export function IconUndo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-3.5 w-3.5", className)}
      {...props}
    >
      <g>
<path d="M6 2L2 6L6 10M2 6H10C11.0609 6 12.0783 6.42143 12.8284 7.17157C13.5786 7.92172 14 8.93913 14 10C14 11.0609 13.5786 12.0783 12.8284 12.8284C12.0783 13.5786 11.0609 14 10 14H8" stroke="currentColor" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
    </svg>
  );
}
