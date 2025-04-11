import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function DetailCarSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-[20px] md:h-[40px] w-full" />

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2.5">
            <div className="mx-auto w-full relative">
              <Skeleton className="w-full h-[300px] md:h-[500px]" />
            </div>
            <div className="flex flex-row gap-2.5 overflow-auto">
              <Skeleton className="h-[80px] md:h-[120px] w-[80px] md:w-[120px] rounded-xl" />
              <Skeleton className="h-[80px] md:h-[120px] w-[80px] md:w-[120px] rounded-xl" />
              <Skeleton className="h-[80px] md:h-[120px] w-[80px] md:w-[120px] rounded-xl" />
              <Skeleton className="h-[80px] md:h-[120px] w-[80px] md:w-[120px] rounded-xl" />
              <Skeleton className="h-[80px] md:h-[120px] w-[80px] md:w-[120px] rounded-xl" />
              <Skeleton className="h-[80px] md:h-[120px] w-[80px] md:w-[120px] rounded-xl" />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex flex-row items-start gap-2.5 justify-between">
              <div className="flex flex-col w-full gap-2.5">
                <Skeleton className="h-[20px] md:h-[30px] w-full" />
                <Skeleton className="h-[24px] md:h-[36px] w-[50%]" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-1">
              <Skeleton className="h-[20px] w-[20%]" />

              <div className="flex flex-row items-center justify-end gap-1 w-full">
                <Skeleton className="h-[20px] w-[20%]" />
                <Skeleton className="h-[20px] w-[20%]" />
              </div>
            </div>
          </div>
        </div>
        <Skeleton className="h-[20px] md:h-[40px] w-[40%]" />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          <Skeleton className="w-full h-[60px]" />
          <Skeleton className="w-full h-[60px]" />
          <Skeleton className="w-full h-[60px]" />
          <Skeleton className="w-full h-[60px]" />
          <Skeleton className="w-full h-[60px]" />
          <Skeleton className="w-full h-[60px]" />
        </div>
        <Skeleton className="w-full h-[40px]" />
      </div>
    </div>
  );
}
