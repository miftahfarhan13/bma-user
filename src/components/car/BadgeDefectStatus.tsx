import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface BadgeDefectStatusProps {
  status: string;
  type: string;
}

const defectThemeGrid: Record<BadgeDefectStatusProps["status"], string> = {
  Berat: "bg-red-100/30 text-red-600",
  Sedang: "bg-orange-100/30 text-orange-600",
  Ringan: "bg-gray-200/30 text-gray-800",
};

const defectThemeList: Record<BadgeDefectStatusProps["status"], string> = {
  Berat: "bg-red-500/50 text-white",
  Sedang: "bg-orange-500/50 text-white",
  Ringan: "bg-gray-500/50 text-white",
};

export default function BadgeDefectStatus({
  status,
  type,
}: BadgeDefectStatusProps) {
  const defectTheme = type === "grid" ? defectThemeGrid : defectThemeList;
  return (
    <div
      className={`${defectTheme[status]} flex items-center gap-[5px] rounded-full px-3 py-1 text-xs font-medium`}
    >
      <Icon icon="fa6-solid:car-burst" />
      {type === "grid" ? "Tabrak" : ""} {status}
    </div>
  );
}
