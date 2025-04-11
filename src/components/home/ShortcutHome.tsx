import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ShortcutHome() {
  return (
    <div className="border-0 md:border-2 border-red-900 rounded-lg flex items-center justify-center w-full">
      <div className="flex flex-col gap-5 items-start md:items-center">
        <p className="font-bold text-xl self-start md:self-center">
          Tindakan Cepat
        </p>
        <div className="flex flex-row items-center justify-around md:justify-normal gap-10 w-full">
          <Link href="/garage?status=Menang">
            <div className="flex flex-col gap-2 text-red-900 hover:text-red-600 items-center">
              <Icon
                icon="fa6-solid:award"
                className="w-5 md:w-10 h-5 md:h-10"
              />
              <p>Menang</p>
            </div>
          </Link>
          <Link href="/garage?status=Kalah">
            <div className="flex flex-col gap-2 text-red-900 hover:text-red-600 items-center">
              <Icon icon="fa6-solid:ban" className="w-5 md:w-10 h-5 md:h-10" />
              <p>Kalah</p>
            </div>
          </Link>
          <Link href="/garage?status=Terjual">
            <div className="flex flex-col gap-2 text-red-900 hover:text-red-600 items-center">
              <Icon
                icon="fa6-solid:flag-checkered"
                className="w-5 md:w-10 h-5 md:h-10"
              />
              <p>Terjual</p>
            </div>
          </Link>
          <Link href="/profile/bantuan">
            <div className="flex flex-col gap-2 text-red-900 hover:text-red-600 items-center">
              <Icon
                icon="fa6-solid:circle-info"
                className="w-5 md:w-10 h-5 md:h-10"
              />
              <p>Bantuan</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
