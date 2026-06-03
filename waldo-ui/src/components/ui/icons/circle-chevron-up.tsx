import * as React from "react";
import { cn } from "@/lib/utils";

export function IconCircleChevronUp({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-3.5 w-3.5", className)}
      {...props}
    >
      <g>
<path d="M8.00003 15C4.13403 15 1.00003 11.866 1.00003 7.99996C1.00003 4.13397 4.13403 0.99996 8.00003 0.99996C11.866 0.99996 15 4.13397 15 7.99996C15 11.866 11.866 15 8.00003 15ZM8.14651 6.85348L11.293 9.99996L12 9.29293L8.14651 5.43941L4.293 9.29293L5.00003 9.99996L8.14651 6.85348Z" fill="currentColor"/>
</g>
    </svg>
  );
}
