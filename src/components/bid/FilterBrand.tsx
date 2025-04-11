import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/utils/context/AuthProvider";
import { getBrands } from "@/service/brand";
import dynamic from "next/dynamic";
import { MultiValue } from "react-select";
import { SelectOption } from "@/types/type";

const InputSelect = dynamic(() => import("../input/InputSelect"), {
  ssr: false,
});

export function FilterBrand({
  brandName,
  handleChangeBrandName,
}: {
  brandName: string[];
  handleChangeBrandName: (values: MultiValue<SelectOption>) => void;
}) {
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

  const selectedValues = brandOptions?.filter((opt) =>
    brandName.includes(opt.value)
  );

  const handleChange = (selected: MultiValue<SelectOption>) => {
    handleChangeBrandName(selected);
  };

  return (
    <InputSelect
      options={brandOptions}
      value={selectedValues}
      onChange={(value) => handleChange(value as MultiValue<SelectOption>)}
      isMulti
      placeholder="Merek.."
    />
  );
}
