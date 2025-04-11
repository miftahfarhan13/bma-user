import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CarItemSkeleton() {
  return (
    <div className="shadow rounded-xl">
      <div className="relative">
        <Skeleton className="w-full h-[280px] sm:h-[300px] md:h-[260px] xl:h-[260px]" />
      </div>
      <div className="flex flex-col gap-2.5 p-2.5">
        <div className="flex flex-row items-start gap-2.5 justify-between">
          <div className="flex flex-col w-full gap-2">
            <Skeleton className="w-full h-[16px]" />
            <Skeleton className="w-[50%] h-[16px]" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-1">
          <Skeleton className="w-[20%] h-[16px]" />
          <Skeleton className="w-[20%] h-[16px]" />
        </div>
        <div className="border border-gray-200 p-2.5 rounded-xl">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="w-full h-[12px]" />
              <Skeleton className="w-full h-[12px]" />
              <Skeleton className="w-full h-[12px]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="w-full h-[12px]" />
              <Skeleton className="w-full h-[12px]" />
              <Skeleton className="w-full h-[12px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-b-xl">
        <Skeleton className="w-full h-[24px] rounded-t-none" />
      </div>
    </div>
  );
}
