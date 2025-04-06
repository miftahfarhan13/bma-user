import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/router";

export const menus = [
  {
    url: "/",
    icon: "fa6-solid:house",
    name: "Beranda",
  },
  {
    url: "/bid/index",
    icon: "fa6-solid:hammer",
    name: "Lelang",
  },
  {
    url: "/favorite/index",
    icon: "fa6-solid:thumbs-up",
    name: "Favorit",
  },
  {
    url: "/garage",
    icon: "fa6-solid:car",
    name: "Garasiku",
  },
];

export default function NavbarMenu() {
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <div className="flex flex-row items-center gap-5">
      {menus?.map((menu) => (
        <TooltipProvider key={menu?.url}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={menu?.url}>
                <div
                  className={`${
                    menu?.url === currentPage ? "text-red-600" : "text-gray-200"
                  } hover:text-red-600 h-[2.375rem] w-[2.375rem] items-center justify-center rounded-full border border-transparent text-sm font-semibold  hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 sm:inline-flex`}
                >
                  <Icon icon={menu?.icon} className="w-5 h-5  sm:h-6 sm:w-6" />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{menu?.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
