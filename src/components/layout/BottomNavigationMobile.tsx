import { useRouter } from "next/router";
import React from "react";
import { menus } from "./NavbarMenu";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function BottomNavigationMobile() {
  const router = useRouter();
  const currentPage = router.pathname;
  return (
    <>
      <div className="h-20"></div>
      <div className="block md:hidden">
        <div className="flex flex-row justify-around py-2.5 items-center gap-5 fixed bottom-0 bg-white w-full shadow-2xl">
          {menus?.map((menu) => (
            <Link key={menu?.url} href={menu?.url}>
              <div
                className={`${
                  menu?.url === currentPage ? "text-red-600" : "text-gray-400"
                } hover:text-red-600 flex flex-col gap-1 items-center`}
              >
                <div className="items-center justify-center rounded-full border border-transparent text-sm font-semibold  hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 sm:inline-flex">
                  <Icon icon={menu?.icon} className="w-5 h-5  sm:h-6 sm:w-6" />
                </div>
                <p className="text-sm font-bold">{menu?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
