import { useState } from "react";
import { Plus, Search, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup, EntityAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EntityChip, EntityChipAdd } from "@/components/ui/entity-chip";
import { FilterChip } from "@/components/ui/filter-chip";
import { Icon } from "@/components/ui/icon";
import { KvPill } from "@/components/ui/kv-pill";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Tag } from "@/components/ui/tag";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { WaldoLogo } from "@/components/ui/waldo-logo";

import type { SectionDef } from "../lib";

const BADGE_VARIANTS = [
  "default", "secondary", "outline", "destructive",
  "warning", "highlight", "active", "success",
] as const;

const BUTTON_VARIANTS = [
  "default", "secondary", "outline", "ghost", "solid",
  "white", "destructive", "destructive-solid", "link",
] as const;

function FilterChipDemo() {
  const [on, setOn] = useState(false);
  return (
    <FilterChip active={on} showChevron onClick={() => setOn((v) => !v)}>
      Platform
    </FilterChip>
  );
}

export const coreSections: SectionDef[] = [
  {
    id: "badge",
    title: "Badge",
    note:
      "A chip carries a value, not an action. A value a machine returned takes mono: mono face, upper case, tracked out. Human language stays in the interface face.",
    specs: [
      ...BADGE_VARIANTS.map((v) => ({ label: v, node: <Badge variant={v}>Label</Badge> })),
      { label: "mono", node: <Badge mono>Active</Badge> },
      { label: "mono outline", node: <Badge mono variant="outline">Invited</Badge> },
      { label: "dot", node: <Badge dot>Live</Badge> },
      { label: "size sm", node: <Badge size="sm">Small</Badge> },
      { label: "size lg", node: <Badge size="lg">Large</Badge> },
    ],
  },
  {
    id: "button",
    title: "Button",
    note: "One default per view. The text colour is married to the fill — never restate either.",
    specs: [
      ...BUTTON_VARIANTS.map((v) => ({ label: v, node: <Button variant={v}>Button</Button> })),
      { label: "size sm", node: <Button size="sm">Small</Button> },
      { label: "size lg", node: <Button size="lg">Large</Button> },
      { label: "icon + text", node: <Button><Plus className="h-4 w-4" />New</Button> },
      { label: "disabled", node: <Button disabled>Disabled</Button> },
    ],
  },
  {
    id: "toggle",
    title: "Toggle",
    specs: [
      { label: "toggle", node: <Toggle aria-label="Bold">B</Toggle> },
      { label: "toggle on", node: <Toggle defaultPressed aria-label="Bold">B</Toggle> },
      {
        label: "toggle group",
        node: (
          <ToggleGroup type="single" defaultValue="d">
            <ToggleGroupItem value="d">Day</ToggleGroupItem>
            <ToggleGroupItem value="w">Week</ToggleGroupItem>
            <ToggleGroupItem value="m">Month</ToggleGroupItem>
          </ToggleGroup>
        ),
      },
    ],
  },
  {
    id: "chips",
    title: "Chips & pills",
    specs: [
      { label: "tag", node: <Tag>Skincare</Tag> },
      { label: "tag removable", node: <Tag onRemove={() => {}}>Removable</Tag> },
      { label: "filter chip", node: <FilterChipDemo /> },
      { label: "entity chip", node: <EntityChip name="Rhode" kind="brand" /> },
      { label: "entity chip add", node: <EntityChipAdd label="Add brand" /> },
      { label: "kv pill", node: <KvPill label="Region" value="US" /> },
      { label: "kbd", node: <Kbd>⌘</Kbd> },
      { label: "kbd group", node: <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup> },
    ],
  },
  {
    id: "avatar",
    title: "Avatar",
    specs: [
      { label: "fallback", node: <Avatar><AvatarFallback>MU</AvatarFallback></Avatar> },
      { label: "entity", node: <EntityAvatar name="Rhode" /> },
      { label: "entity icon", node: <EntityAvatar name="Gamers" icon={<Search className="h-4 w-4" />} /> },
      {
        label: "group",
        node: (
          <AvatarGroup>
            <Avatar><AvatarFallback>RV</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>JR</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>TR</AvatarFallback></Avatar>
          </AvatarGroup>
        ),
      },
    ],
  },
  {
    id: "brand",
    title: "Logo & icon",
    specs: [
      { label: "logo", node: <WaldoLogo width={120} /> },
      { label: "icon sm", node: <Icon icon={Settings} size="sm" /> },
      { label: "icon md", node: <Icon icon={Settings} size="md" /> },
      { label: "icon lg", node: <Icon icon={Settings} size="lg" /> },
    ],
  },
];
