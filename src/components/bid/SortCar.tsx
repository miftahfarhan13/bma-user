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

interface ISortOptions {
  value: string;
  label: string;
  orderBy: string;
  sort: "asc" | "desc";
}

const sortOptions: ISortOptions[] = [
  {
    value: "lowest_price",
    label: "Harga Terendah ↓",
    sort: "asc",
    orderBy: "price",
  },
  {
    value: "highest_price",
    label: "Harga Tertinggi ↑",
    sort: "desc",
    orderBy: "price",
  },
  {
    value: "newer_car",
    label: "Tahun Terkini ↓",
    sort: "desc",
    orderBy: "manufacture_year",
  },
  {
    value: "older_car",
    label: "Tahun Terlama ↑",
    sort: "asc",
    orderBy: "manufacture_year",
  },
  {
    value: "name_asc",
    label: "Nama (A-Z)",
    sort: "asc",
    orderBy: "car_name",
  },
  {
    value: "name_desc",
    label: "Nama (Z-A)",
    sort: "desc",
    orderBy: "car_name",
  },
];

export function SortCar({
  orderBy,
  sort,
  handleChange,
}: {
  orderBy: string;
  sort: string;
  handleChange: (orderBy: string, sort: "asc" | "desc") => void;
}) {
  const [open, setOpen] = React.useState(false);

  const defaultValue = sortOptions.find(
    (opt) => opt.orderBy === orderBy && opt.sort === sort
  );

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[200px] justify-between pr-10 w-full"
          >
            {defaultValue?.value
              ? sortOptions.find(
                  (opt) => opt.orderBy === orderBy && opt.sort === sort
                )?.label
              : "Urutkan..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {sortOptions.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={(currentValue) => {
                      const selected = sortOptions.find(
                        (opt) => opt.value === currentValue
                      );

                      handleChange(
                        selected?.orderBy || "",
                        selected?.sort || "asc"
                      );
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        defaultValue?.value === opt.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {orderBy && (
        <button
          onClick={() => handleChange("", "asc")}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
