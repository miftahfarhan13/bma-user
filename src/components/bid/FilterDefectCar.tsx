"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const defectOptions = [
  {
    value: "Tidak Ada",
    label: "Tidak Ada",
  },
  {
    value: "Ringan",
    label: "Ringan",
  },
  {
    value: "Sedang",
    label: "Sedang",
  },
  {
    value: "Berat",
    label: "Berat",
  },
];

export function FilterDefectCar({
  defectStatus,
  handleChangeDefectStatus,
}: {
  defectStatus: string;
  handleChangeDefectStatus: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[140px] justify-between pr-10 w-full"
          >
            {defectStatus
              ? defectOptions.find((opt) => opt.value === defectStatus)?.label
              : "Kondisi..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {defectOptions.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={(currentValue) => {
                      handleChangeDefectStatus(
                        currentValue === defectStatus ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        defectStatus === opt.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {defectStatus && (
        <button
          onClick={() => handleChangeDefectStatus("")}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
