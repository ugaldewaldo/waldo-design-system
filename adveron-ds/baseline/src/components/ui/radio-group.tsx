"use client";

import { useId, type ChangeEvent, type ReactElement } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// A register-driven radio group. The error and the accessible name belong to the
// GROUP — a radio carries neither of its own — so the legend labels the fieldset and
// the message is announced on the radiogroup rather than on whichever option happened
// to be focused.
//
// Ids are minted per instance: two forms on one screen can register the same field
// name, and a name-derived id would point a label at the other form's input.

export interface RadioGroupOption {
  value: string;
  label: string;
  // The consequence of picking this option, DESCRIBED rather than folded into the
  // label: a label carrying three sentences is what a screen reader announces on every
  // focus, while a description is read once and on demand.
  description?: string;
  // A short fact shown BESIDE the label — a price, a rate — rather than under it:
  // it belongs on the same line as the name it prices, and it stays out of the
  // label element so the option's accessible name is still just the name.
  detail?: string;
  // An option that EXISTS but cannot be chosen here — a tier the actor lacks the
  // authority for, a choice the account is already on. Shown rather than dropped so
  // the operator can see the whole ladder; its `description` is where the reason
  // goes, which is why disabling one without saying why is not offered.
  disabled?: boolean;
}

export function RadioGroup<TFieldValues extends FieldValues>({
  name,
  legend,
  options,
  error,
  register,
  onChange,
}: {
  name: Path<TFieldValues>;
  legend: string;
  options: readonly RadioGroupOption[];
  error?: string;
  register: UseFormRegister<TFieldValues>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}): ReactElement {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  // A described option is a block of text, so its radio aligns to the first line; a group
  // of bare labels is a list of single lines, where centring is what every other form in
  // the console looks like.
  const described = options.some((option) => option.description !== undefined);
  return (
    <fieldset
      className="space-y-2"
      role="radiogroup"
      aria-labelledby={`${fieldId}-legend`}
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? true : undefined}
    >
      <legend
        id={`${fieldId}-legend`}
        className="text-sm font-medium tracking-[-0.02em]"
      >
        {legend}
      </legend>
      {options.map((option) => (
        <div
          key={option.value}
          className={cn("flex gap-3", described ? "items-start" : "items-center")}
        >
          <input
            id={`${fieldId}-${option.value}`}
            type="radio"
            className={cn(
              "size-4 accent-primary",
              described && "mt-1",
              option.disabled && "opacity-50",
            )}
            value={option.value}
            disabled={option.disabled}
            aria-describedby={
              option.description ? `${fieldId}-${option.value}-detail` : undefined
            }
            {...register(name, onChange ? { onChange } : {})}
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <Label
                htmlFor={`${fieldId}-${option.value}`}
                className={cn(
                  "font-normal",
                  option.disabled && "text-muted-foreground",
                )}
              >
                {option.label}
              </Label>
              {option.detail ? (
                <span className="text-[13px] text-muted-foreground">
                  {option.detail}
                </span>
              ) : null}
            </div>
            {option.description ? (
              <p
                id={`${fieldId}-${option.value}-detail`}
                className="text-[13px] leading-5 text-muted-foreground"
              >
                {option.description}
              </p>
            ) : null}
          </div>
        </div>
      ))}
      {error ? (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
