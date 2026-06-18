import * as React from "react";
import { cn } from "@/lib/utils";

// Waldo wordmark — SVG path from Figma DS topbar (node 149:1735 area)
// viewBox: 0 0 69.75 18 · default render: 70×18px
// color: var(--foreground) by default — override via className or color prop

export interface WaldoLogoProps extends React.SVGAttributes<SVGSVGElement> {
  /** Rendered width in px. Height scales proportionally (ratio 69.75:18). */
  width?: number;
}

const WaldoLogo = React.forwardRef<SVGSVGElement, WaldoLogoProps>(
  ({ width = 70, className, color, style, ...props }, ref) => {
    const height = Math.round((width / 69.75) * 18);
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 69.75 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        style={{ color: color ?? "var(--foreground)", ...style }}
        aria-label="Waldo"
        role="img"
        {...props}
      >
        <path
          d="M63.2676 0C67.6298 0 69.75 2.26338 69.75 7.52148V10.6641C69.75 15.7985 67.6298 18 63.2676 18C58.8935 17.9984 56.7862 15.7968 56.7861 10.6641V7.52148C56.7861 2.26354 58.8934 0.000133701 63.2676 0ZM37.0039 14.6191L41.9775 13.9814V17.6562H32.4795V0.335938H37.0039V14.6191ZM5.47168 7.7832C5.68287 9.47803 5.78297 10.7646 5.85742 12.6689H6.10645C6.21888 10.7887 6.35555 9.37851 6.53027 7.7832L7.39062 0.335938H11.4912L12.4258 7.7832C12.6248 9.37852 12.7498 10.7902 12.8379 12.6689H13.1113C13.2116 10.7887 13.3102 9.47652 13.4971 7.7832L14.3193 0.335938H18.707L15.9277 17.6543H10.5449L10.0469 13.4609C9.79769 11.4328 9.62264 9.51443 9.49805 7.43652H9.23633C9.09958 9.51443 8.91281 11.4072 8.67578 13.4609L8.20215 17.6543H2.90332L0 0.335938H4.54883L5.47168 7.7832ZM31.6318 17.6543H26.8457L26.4961 15.5762H22.3086L21.959 17.6543H17.6094L21.6221 0.335938H27.5312L31.6318 17.6543ZM49.2207 0.335938C53.5328 0.335938 55.5898 2.67494 55.5898 7.61035V10.4062C55.5897 15.3172 53.5327 17.6543 49.2207 17.6543H43.2373V0.335938H49.2207ZM63.2676 3.55078C61.984 3.55097 61.3614 4.50431 61.3613 6.48242V11.6904C61.3613 13.5465 61.9839 14.449 63.2676 14.4492C64.5515 14.4492 65.1748 13.5452 65.1748 11.6904V6.48242C65.1748 4.5026 64.5515 3.55078 63.2676 3.55078ZM47.7617 14.1035H48.9717C50.3558 14.1035 51.0156 13.3613 51.0156 11.79V6.19824C51.0155 4.62735 50.3542 3.88577 48.9717 3.88574H47.7617V14.1035ZM24.2764 4.36816C24.1761 5.76588 23.989 7.03991 23.7656 8.53711L22.9043 12.7627L25.834 12.3721L25.0742 8.5498C24.8493 7.04039 24.65 5.76599 24.5254 4.36816H24.2764Z"
          fill="currentColor"
        />
      </svg>
    );
  }
);
WaldoLogo.displayName = "WaldoLogo";

export { WaldoLogo };
