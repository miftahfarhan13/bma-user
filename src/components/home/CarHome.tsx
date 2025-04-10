import { getLatestSeenCars } from "@/service/car";
import { useAuth } from "@/utils/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CarItem from "../car/CarItem";
import EmptyState from "../state/EmptyState";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import CarItemList from "../car/CarItemList";

export default function CarHome() {
  const { token } = useAuth();
  const [listType, setListType] = useState("grid");

  const { data } = useQuery({
    queryKey: ["latest-seen-cars", token],
    queryFn: () => getLatestSeenCars({ isPaginate: "true" }),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  return (
    <div className="p-4 md:p-5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-xl font-bold">Mobil yang sering dilihat</p>

            <div className="block md:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setListType(listType === "grid" ? "list" : "grid")
                }
              >
                <Icon icon={listType !== "grid" ? "si:grid-fill" : "el:list"} />
              </Button>
            </div>
          </div>
          {data && data?.length > 0 ? (
            <>
              {listType === "grid" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {data?.map((car) => (
                      <CarItem key={car?.id} car={car} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-5">
                    {data?.map((car) => (
                      <CarItemList key={car?.id} car={car} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <EmptyState
                message="Tidak ada Mobil yang tersedia. <br> Silakan Menunggu Waktu Lelang Selanjutnya !"
                isUseSearch={false}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
