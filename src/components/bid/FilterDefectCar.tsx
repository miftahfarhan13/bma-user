"use client";

import * as React from "react";
import { MultiValue } from "react-select";
import { SelectOption } from "@/types/type";
import dynamic from "next/dynamic";

const InputSelect = dynamic(() => import("../input/InputSelect"), {
  ssr: false,
});

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
  defectStatus: string[];
  handleChangeDefectStatus: (values: MultiValue<SelectOption>) => void;
}) {
  const selectedValues = defectOptions?.filter((opt) =>
    defectStatus.includes(opt.value)
  );

  const handleChange = (selected: MultiValue<SelectOption>) => {
    handleChangeDefectStatus(selected);
  };

  return (
    <InputSelect
      options={defectOptions}
      value={selectedValues}
      onChange={(value) => handleChange(value as MultiValue<SelectOption>)}
      isMulti
      placeholder="Kondisi.."
    />
  );
}
