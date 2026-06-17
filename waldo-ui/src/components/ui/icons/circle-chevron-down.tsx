import * as React from "react";
import { cn } from "@/lib/utils";

export function IconCircleChevronDown({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-3.5 w-3.5", className)}
      {...props}
    >
      <g>
<path fillRule="evenodd" clipRule="evenodd" d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1ZM7.85352 9.14648L4.70703 6L4 6.70703L7.85352 10.5605L11.707 6.70703L11 6L7.85352 9.14648Z" fill="currentColor"/>
</g>
    </svg>
  );
}
