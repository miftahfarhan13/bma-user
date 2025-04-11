import * as React from "react";
import InputSelect from "../input/InputSelect";

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
  const defaultValue = sortOptions.find(
    (opt) => opt.orderBy === orderBy && opt.sort === sort
  );

  const handleChangeSelect = (value: ISortOptions) => {
    handleChange(value?.orderBy || "created_at", value?.sort || "asc");
  };

  return (
    <InputSelect
      options={sortOptions}
      value={defaultValue}
      onChange={(value) => handleChangeSelect(value as ISortOptions)}
      placeholder="Urutkan.."
      isClearable
    />
  );
}
