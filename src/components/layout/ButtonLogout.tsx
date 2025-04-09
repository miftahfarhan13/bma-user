import React from "react";
import useLogout from "@/utils/hooks/useLogout";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ButtonLogout() {
  const { handleSubmit } = useLogout();

  return (
    <div
      onClick={handleSubmit}
      className="text-red-600 hover:text-red-600 h-[2.375rem] w-[2.375rem] items-center justify-center rounded-full border border-transparent text-sm font-semibold  hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 sm:inline-flex cursor-pointer"
    >
      <Icon icon="mdi:shutdown" className="w-6 h-6  sm:h-7 sm:w-7" />
    </div>
  );
}
