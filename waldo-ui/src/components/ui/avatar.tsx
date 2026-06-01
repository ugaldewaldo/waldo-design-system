import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs:  "h-5 w-5 text-[10px]",
        sm:  "h-6 w-6 text-xs",
        md:  "h-8 w-8 text-sm",
        lg:  "h-10 w-10 text-base",
        xl:  "h-12 w-12 text-lg",
        "2xl": "h-16 w-16 text-xl",
      },
    },
    defaultVariants: { size: "md" },
  }
);

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-secondary text-muted-foreground font-medium",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// ── Avatar Group ──────────────────────────────────────────────────────────────

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  className?: string;
}

function AvatarGroup({ children, max, size = "sm", className }: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - max : 0;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((child, i) => (
        <div
          key={i}
          className="ring-2 ring-background rounded-full -ml-1.5 first:ml-0"
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
            : child}
        </div>
      ))}
      {overflow > 0 && (
        <div className="ring-2 ring-background rounded-full -ml-1.5">
          <Avatar size={size}>
            <AvatarFallback>+{overflow}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
