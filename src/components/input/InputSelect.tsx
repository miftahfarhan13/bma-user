import React from "react";
import Select, { Props as ReactSelectProps } from "react-select";

export interface SelectOption {
  label: string;
  value: string;
}

type InputSelectProps<IsMulti extends boolean = false> = ReactSelectProps<
  SelectOption,
  IsMulti
>;

export default function InputSelect<IsMulti extends boolean = false>(
  props: InputSelectProps<IsMulti>
) {
  return <Select {...props} />;
}
