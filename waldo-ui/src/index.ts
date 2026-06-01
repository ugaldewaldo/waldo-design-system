// ── Utils ──────────────────────────────────────────────────────────────────────
export { cn } from "./lib/utils";

// ── Core ───────────────────────────────────────────────────────────────────────
export { Button, buttonVariants } from "./components/ui/button";
export type { ButtonProps } from "./components/ui/button";

export { Input, Textarea, Field } from "./components/ui/input";
export type { InputProps } from "./components/ui/input";

export { Badge, badgeVariants } from "./components/ui/badge";
export type { BadgeProps } from "./components/ui/badge";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "./components/ui/avatar";

export { Checkbox } from "./components/ui/checkbox";

export { Switch } from "./components/ui/switch";

export {
  Select, SelectGroup, SelectValue, SelectTrigger, SelectContent,
  SelectLabel, SelectItem, SelectSeparator,
  SelectScrollUpButton, SelectScrollDownButton,
} from "./components/ui/select";

// ── Overlay ────────────────────────────────────────────────────────────────────
export {
  Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger,
  DialogContent, DialogHeader, DialogFooter, DialogBody,
  DialogTitle, DialogDescription,
} from "./components/ui/dialog";

export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuRadioGroup, DropdownMenuItem, DropdownMenuCheckboxItem,
  DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
} from "./components/ui/dropdown-menu";

export {
  Command, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from "./components/ui/command";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/ui/tooltip";

// ── Data ───────────────────────────────────────────────────────────────────────
export {
  Table, TableHeader, TableBody, TableFooter,
  TableHead, TableRow, TableCell, TableCaption,
} from "./components/ui/table";
