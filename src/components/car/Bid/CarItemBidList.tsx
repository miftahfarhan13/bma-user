import { ICarResponse } from "@/types/car";
import { formatCurrency, formatNumber } from "@/utils/format/number";
import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import IconBid from "@/icons/IconBid";
import IconUsers from "@/icons/IconUsers";
import IconPlate from "@/icons/IconPlate";
import IconNIK from "@/icons/IconNIK";
import IconTax from "@/icons/IconTax";
import BadgeDefectStatus from "../BadgeDefectStatus";
import useToggleFavorite from "@/utils/hooks/useToggleFavorite";
import { IBid } from "@/types/bid";
import HideCarListCountdown from "../HideCarListCountdown";
import { ModalConfirmationBid } from "./ModalConfirmationBid";
import FormMaxBid from "./FormMaxBid";

export default function CarItemBidList({
  car,
  bid,
  isCurrentlyWin,
  createdPrice,
  bidCount,
  bidUserCount,
}: {
  car: ICarResponse;
  bid?: IBid;
  isCurrentlyWin: boolean;
  createdPrice: number;
  bidCount: number;
  bidUserCount: number;
}) {
  const urlDetail = `/car/${car?.id}/detail`;

  const { handleToggleFavorite } = useToggleFavorite({
    id: car?.id.toString(),
  });

  const isSold = car?.status === "Terjual";
  return (
    <div className="shadow rounded-xl">
      <div className="flex flex-col">
        <a href={urlDetail}>
          <div className="flex flex-row">
            <div className="flex-[40%]">
              <div className="relative">
                <div className="relative w-full h-[130px] md:h-[300px]">
                  <Image
                    src={
                      car?.car_images && car?.car_images?.length > 0
                        ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${car?.car_images[0]?.img_path}`
                        : ""
                    }
                    fill
                    alt={`Image ${car?.car_name}`}
                    className="object-cover rounded-tl-xl object-center"
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33.33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="absolute bottom-1 left-1 text-white bg-gray-700/60 text-xs px-4 py-1 rounded-full font-bold">
                  {car?.id}
                </div>
                {isCurrentlyWin ? (
                  <div className="absolute right-0 top-0 z-30 flex items-center justify-center gap-2 rounded-bl-xl bg-green-300/90 px-5 py-1 text-xs text-gray-800">
                    <Icon
                      icon={
                        isSold ? "fa6-solid:flag-checkered" : "fa6-solid:award"
                      }
                    />
                    Sedang Unggul
                  </div>
                ) : (
                  <div className="absolute right-0 top-0 z-30 flex items-center justify-center gap-2 rounded-bl-xl bg-red-300/90 px-5 py-1 text-xs text-gray-800">
                    <Icon icon="fa-solid:ban" />
                    Sedang Kalah
                  </div>
                )}
                {bid && <HideCarListCountdown bid={bid} />}
                <div className="absolute bottom-1 right-1">
                  <div className="flex flex-col items-end gap-1">
                    {car?.is_flooded === 1 && (
                      <div className="flex items-center gap-[5px] rounded-full bg-blue-500/30 px-3 py-1 text-xs font-medium text-white">
                        <Icon icon="fa6-solid:droplet" />
                        Banjir
                      </div>
                    )}
                    {car?.defect_status !== "Tidak Ada" && (
                      <BadgeDefectStatus
                        type="list"
                        status={car?.defect_status}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 p-2.5 flex-[60%]">
              <div className="flex flex-row items-start gap-2.5 justify-between">
                <div className="flex flex-col">
                  <p className="font-bold text-red-900">
                    {formatCurrency(createdPrice)}
                  </p>
                  <p className="font-bold line-clamp-1">
                    {car?.brand?.brand_name} {car?.car_name}
                  </p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleToggleFavorite();
                  }}
                >
                  <Icon
                    icon={
                      car?.is_favorite
                        ? "fa6-solid:thumbs-up"
                        : "fa6-regular:thumbs-up"
                    }
                    className="text-lg text-red-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-0">
                  <div className="flex flex-row gap-1 items-center">
                    <IconPlate fill="#6a7282" style={{ width: "24px" }} />
                    <p className="text-xs text-gray-600">
                      {car?.license_plate}
                    </p>
                  </div>

                  <div className="flex flex-row gap-1 items-center">
                    <IconNIK fill="#6a7282" style={{ width: "24px" }} />
                    <p className="text-xs text-gray-600">
                      {moment(new Date(car?.manufacture_year)).format("YYYY")}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex flex-row gap-1 items-center">
                    <Icon icon="cil:gauge" className="text-gray-600 text-lg" />
                    <p className="text-xs text-gray-600">
                      {formatNumber(car?.odometer, "id")} km
                    </p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    <IconTax fill="#6a7282" style={{ width: "24px" }} />
                    <p className="text-xs text-gray-600">
                      {moment(new Date(car?.car_tax)).format("MMM YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>

        <div className="flex flex-col gap-2 px-2 py-2">
          <div className="grid grid-cols-2 gap-2.5">
            <ModalConfirmationBid
              car={car}
              amount={500000}
              createdPrice={createdPrice || 0}
              className="text-xs"
            />
            <ModalConfirmationBid
              car={car}
              amount={1000000}
              createdPrice={createdPrice || 0}
              className="text-xs"
            />
          </div>

          <FormMaxBid car={car} createdPrice={createdPrice || 0} type="list" />
        </div>
      </div>
      <a href={urlDetail}>
        <div className="bg-red-900 rounded-b-xl">
          <div className="flex justify-center py-1 text-white">
            <div className="flex flex-row gap-5">
              <div className="flex flex-row gap-2">
                <IconBid fill="white" style={{ width: "20px" }} />
                <p className="font-bold text-lg">{bidCount}</p>
              </div>
              <div className="flex flex-row gap-2">
                <IconUsers fill="white" style={{ width: "20px" }} />
                <p className="font-bold text-lg">{bidUserCount}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
