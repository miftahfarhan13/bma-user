import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import useLogout from "@/utils/hooks/useLogout";

export default function ButtonLogout() {
  const { handleSubmit } = useLogout();

  return (
    <DropdownMenuItem className="text-red-500" onClick={handleSubmit}>
      Log out
    </DropdownMenuItem>
  );
}
