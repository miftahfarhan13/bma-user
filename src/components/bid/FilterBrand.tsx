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
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/utils/context/AuthProvider";
import { getBrands } from "@/service/brand";

export function FilterBrand({
  brandName,
  handleChangeBrandName,
}: {
  brandName: string;
  handleChangeBrandName: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const { token } = useAuth();
  const { data } = useQuery({
    queryKey: ["brands", token],
    queryFn: () =>
      getBrands({
        isPaginate: "false",
      }),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  const brandOptions = data?.map((brand) => ({
    value: brand.brand_name,
    label: brand.brand_name,
  }));

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[120px] justify-between pr-10 w-full"
          >
            {brandName
              ? brandOptions?.find((opt) => opt.value === brandName)?.label
              : "Merek..."}
            <ChevronsUpDown className="opacity-50 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {brandOptions?.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={(currentValue) => {
                      handleChangeBrandName(
                        currentValue === brandName ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    {opt.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        brandName === opt.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {brandName && (
        <button
          onClick={() => handleChangeBrandName("")}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
