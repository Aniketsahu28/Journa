"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoCalendarClearOutline } from "react-icons/io5";

type TDatePicker = {
  name: string;
  label?: string;
  value?: Date | null;
  onChange?: (date: Date | undefined) => void;
  error?: string[];
  disableFutureDates?: boolean;
  className?: string;
};

export function DatePickerBox({
  name,
  label,
  value,
  onChange,
  error,
  disableFutureDates = false,
  className = "",
}: TDatePicker) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-black/70 font-poppins">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            id={name}
            tabIndex={0}
            className={`flex items-center justify-between w-full text-lg font-nunito px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black transition ${
              error && error?.length > 0 ? "border-red" : "border-black/25"
            } ${className}`}
          >
            <span>{value ? value.toLocaleDateString() : "dd-mm-yyyy"}</span>
            <IoCalendarClearOutline className="text-black/75" size={22} />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-auto p-0 bg-white border border-black/25 rounded-md shadow-md"
        >
          <Calendar
            mode="single"
            selected={value ?? undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (onChange) onChange(date ?? undefined);
              setOpen(false);
            }}
            disabled={disableFutureDates && { after: new Date() }}
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red font-poppins">{error}</p>}
    </div>
  );
}
