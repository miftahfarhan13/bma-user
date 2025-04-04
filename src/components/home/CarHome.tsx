import { getAvailableCars } from "@/service/car";
import { useAuth } from "@/utils/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CarItem from "../car/CarItem";

export default function CarHome() {
  const { token } = useAuth();
  const { data } = useQuery({
    queryKey: ["cars", token],
    queryFn: () => getAvailableCars({ isPaginate: "true" }),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  return (
    <div className="p-4 md:p-5">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-2.5">
          <p className="text-xl font-bold">Mobil yang sering dilihat</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {data?.data?.data?.map((car) => (
              <CarItem key={car?.id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
