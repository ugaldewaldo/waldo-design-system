import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Waldo Avatar — values from Figma DS (node 77985:54005)
//
// Shapes:
//   round  → rounded-full (circle) — people, users
//   square → rounded-sm         — brands, logos
//
// Sizes (px):  16 · 24 · 32 · 40
// Background:  zinc-950 #171819
// ─────────────────────────────────────────────────────────────────────────────

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden bg-background",
  {
    variants: {
      size: {
        "16": "h-4 w-4 text-xs",
        "24": "h-6 w-6 text-xs",
        "32": "h-8 w-8 text-xs",
        "40": "h-10 w-10 text-sm",
      },
      shape: {
        round:  "rounded-full",   // people, users
        square: "rounded-sm",  // brands, logos
      },
    },
    defaultVariants: {
      size: "32",
      shape: "round",
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, shape }), className)}
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
      "flex h-full w-full items-center justify-center",
      "bg-muted text-foreground/70 font-medium tracking-[-0.01em]",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// ── EntityAvatar — image → icon → initial fallback chain ──────────────────────
//
// Waldo extension. Tracked entities come from three sources with three levels of
// available art: a brand usually has a favicon, an audience or category never
// does, and a just-created entity has nothing but its name. This walks that
// chain in one place so every list, chip and table row degrades the same way.
//
//   <EntityAvatar name="Serval AI" image={favicon} shape="square" />
//   <EntityAvatar name="IT & Ops leaders" icon={<Users />} shape="square" />
//   <EntityAvatar name="IT Support AI" />        {/* → "I" */}
//
// Prefer plain Avatar + AvatarImage/AvatarFallback when the art is always
// present, or when the fallback is not derived from the name.

export interface EntityAvatarProps extends Omit<AvatarProps, "children"> {
  /** Entity name — supplies the alt text and the initial fallback. */
  name: string;
  /** Logo or favicon URL. Falls through to `icon`, then the initial, if absent or broken. */
  image?: string;
  /** Icon for entities that have no art of their own (audiences, categories). */
  icon?: React.ReactNode;
}

const EntityAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  EntityAvatarProps
>(({ name, image, icon, ...props }, ref) => (
  <Avatar ref={ref} {...props}>
    {image && <AvatarImage src={image} alt={name} />}
    <AvatarFallback>
      {icon ? (
        <span className="flex items-center justify-center [&_svg]:size-[55%]">{icon}</span>
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </AvatarFallback>
  </Avatar>
));
EntityAvatar.displayName = "EntityAvatar";

// ── AvatarGroup — overlapping avatars with overflow count ─────────────────────

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps["size"];
  shape?: AvatarProps["shape"];
  className?: string;
}

function AvatarGroup({ children, max, size = "32", shape = "round", className }: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - max : 0;

  const ringClass = shape === "square" ? "ring-2 ring-background rounded-sm" : "ring-2 ring-background rounded-full";

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((child, i) => (
        <div key={i} className={cn(ringClass, "-ml-1.5 first:ml-0")}>
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size, shape })
            : child}
        </div>
      ))}
      {overflow > 0 && (
        <div className={cn(ringClass, "-ml-1.5")}>
          <Avatar size={size} shape={shape}>
            <AvatarFallback className="text-xs">+{overflow}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, EntityAvatar };
