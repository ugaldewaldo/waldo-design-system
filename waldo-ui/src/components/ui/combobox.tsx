"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "../../lib/utils"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: React.ComponentProps<typeof ComboboxPrimitive.Value>) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Trigger>) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot="combobox-trigger-icon"
        className="pointer-events-none size-4 text-muted-foreground"
      />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Input> & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      disabled={disabled}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function ComboboxContent({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Popup>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner className="isolate z-50">
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "relative max-h-96 w-(--anchor-width) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: React.ComponentProps<typeof ComboboxPrimitive.List>) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn("max-h-96 scroll-py-1 overflow-y-auto p-1", className)}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Item>) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: React.ComponentProps<typeof ComboboxPrimitive.Group>) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.GroupLabel>) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        "px-2 py-1.5 text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function ComboboxEmpty({ className, ...props }: React.ComponentProps<typeof ComboboxPrimitive.Empty>) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "py-2 text-center text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Separator>) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
}
