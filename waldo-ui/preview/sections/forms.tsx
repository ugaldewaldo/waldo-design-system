import { useState } from "react";

import { AdvancedSection } from "@/components/ui/advanced-section";
import { Checkbox, CheckboxField } from "@/components/ui/checkbox";
import { CopyLink } from "@/components/ui/copy-link";
import { FileInput } from "@/components/ui/file-input";
import { Input, Textarea, Field } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem, RadioGroupField } from "@/components/ui/radio-group";
import { SearchTrigger } from "@/components/ui/search-trigger";
import { SecretField } from "@/components/ui/secret-field";
import { SegmentedControl } from "@/components/ui/segmented-control";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/ui/tag";

import type { SectionDef } from "../lib";

function SegmentedDemo() {
  const [v, setV] = useState("week");
  return (
    <SegmentedControl
      value={v}
      onChange={setV}
      options={[
        { label: "Day", value: "day" },
        { label: "Week", value: "week" },
        { label: "Month", value: "month" },
      ]}
    />
  );
}

function TagInputDemo() {
  const [tags, setTags] = useState(["skincare", "gen z"]);
  return <TagInput value={tags} onChange={setTags} placeholder="Add a topic" className="w-64" />;
}

export const formSections: SectionDef[] = [
  {
    id: "input",
    title: "Input",
    specs: [
      { label: "default", node: <Input placeholder="Placeholder" className="w-56" /> },
      { label: "value", node: <Input defaultValue="A typed value" className="w-56" /> },
      { label: "disabled", node: <Input disabled placeholder="Disabled" className="w-56" /> },
      { label: "textarea", node: <Textarea placeholder="Longer text" className="w-64" /> },
      {
        label: "field",
        node: (
          <Field label="Workspace name" className="w-64">
            <Input placeholder="Acme" />
          </Field>
        ),
      },
      { label: "label", node: <Label>Field label</Label> },
      { label: "secret", node: <SecretField value="sk-live-9f2c40ab77e1" /> },
      { label: "search trigger", node: <SearchTrigger placeholder="Search brands" /> },
      { label: "copy link", node: <CopyLink url="https://adveron.com/invite/9f2c" /> },
      { label: "file", node: <FileInput /> },
      { label: "tag input", node: <TagInputDemo /> },
      {
        label: "otp",
        node: (
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        ),
      },
    ],
  },
  {
    id: "controls",
    title: "Controls",
    specs: [
      { label: "switch on", node: <Switch defaultChecked /> },
      { label: "switch off", node: <Switch /> },
      { label: "checkbox on", node: <Checkbox defaultChecked /> },
      { label: "checkbox off", node: <Checkbox /> },
      { label: "checkbox field", node: <CheckboxField label="Email me weekly" /> },
      {
        label: "radio group",
        node: (
          <RadioGroup defaultValue="a" className="flex gap-4">
            <RadioGroupItem value="a" />
            <RadioGroupItem value="b" />
          </RadioGroup>
        ),
      },
      {
        label: "radio field",
        node: (
          // RadioGroupField reads the group's context, so it only renders inside one.
          <RadioGroup defaultValue="c">
            <RadioGroupField value="c" label="Monthly" />
          </RadioGroup>
        ),
      },
      { label: "segmented", node: <SegmentedDemo /> },
      { label: "slider", node: <Slider defaultValue={[40]} max={100} className="w-56" /> },
      {
        label: "select",
        node: (
          <Select defaultValue="meta">
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meta">Meta</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
      {
        label: "advanced section",
        wide: true,
        node: (
          <AdvancedSection label="Advanced">
            <div className="text-sm text-foreground/60">Rarely-used settings live behind this.</div>
          </AdvancedSection>
        ),
      },
    ],
  },
];
