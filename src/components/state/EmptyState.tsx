import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptyState({
  message,
  isUseSearch,
}: {
  message: string;
  isUseSearch: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <Icon icon="ion:car-sport" className="w-40 h-40 text-gray-300" />
      <div
        className="text-gray-400 mb-5 text-center"
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
      {isUseSearch && (
        <Link href="/bid/index">
          <Button className="bg-red-800 hover:bg-red-900">
            Cari Mobil Sekarang
          </Button>
        </Link>
      )}
    </div>
  );
}
