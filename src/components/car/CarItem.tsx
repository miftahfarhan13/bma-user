import { ICarResponse } from "@/types/car";
import { formatCurrency } from "@/utils/format/number";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import BidIcon from "@/icons/BidIcon";
import IconUsers from "@/icons/IconUsers";
import IconPlate from "@/icons/IconPlate";
import IconNIK from "@/icons/IconNIK";
import IconTax from "@/icons/IconTax";
import Link from "next/link";
import BadgeDefectStatus from "./BadgeDefectStatus";

export default function CarItem({ car }: { car: ICarResponse }) {
  return (
    <Link href={`/car/${car?.id}/detail`}>
      <div className="shadow rounded-xl">
        <div className="relative w-full h-[280px] sm:h-[300px] md:h-[260px] xl:h-[200px]">
          <Image
            src={
              car?.car_images && car?.car_images?.length > 0
                ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${car?.car_images[0]?.img_path}`
                : ""
            }
            fill
            alt={`Image ${car?.car_name}`}
            className="object-cover rounded-xl object-center"
          />
        </div>
        <div className="flex flex-col gap-2.5 p-2.5">
          <div className="flex flex-col">
            <p className="font-bold text-red-900">
              {formatCurrency(car?.price)}
            </p>
            <p className="font-bold">
              {car?.brand?.brand_name} {car?.car_name}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between gap-1">
            <Badge variant="secondary">{car?.car_availability}</Badge>

            <div className="flex flex-row items-center justify-end gap-1">
              {car?.is_flooded === 1 && (
                <div className="flex items-center gap-[5px] rounded-full bg-blue-100/30 px-3 py-1 text-xs font-medium text-blue-500">
                  <Icon icon="fa6-solid:droplet" />
                  Banjir
                </div>
              )}
              {car?.defect_status !== "Tidak Ada" && (
                <BadgeDefectStatus status={car?.defect_status} />
              )}
            </div>
          </div>
          <div className="border border-gray-200 p-2.5 rounded-xl">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-0">
                <div className="flex flex-row gap-1 items-center">
                  <IconPlate fill="#6a7282" style={{ width: "24px" }} />
                  <p className="text-xs text-gray-600">{car?.license_plate}</p>
                </div>

                <div className="flex flex-row gap-1 items-center">
                  <IconNIK fill="#6a7282" style={{ width: "24px" }} />
                  <p className="text-xs text-gray-600">
                    {moment(new Date(car?.manufacture_year)).format("YYYY")}
                  </p>
                </div>

                <div className="flex flex-row gap-1 items-center">
                  <IconTax fill="#6a7282" style={{ width: "24px" }} />
                  <p className="text-xs text-gray-600">
                    {moment(new Date(car?.car_tax)).format("MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex flex-row gap-1 items-center">
                  <Icon icon="cil:gauge" className="text-gray-600 text-lg" />
                  <p className="text-xs text-gray-600">{car?.odometer} km</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <Icon
                    icon="fluent:gas-pump-20-regular"
                    className="text-gray-600 text-lg"
                  />
                  <p className="text-xs text-gray-600">{car?.fuel_type}</p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <Icon
                    icon="icon-park-outline:manual-gear"
                    className="text-gray-600 text-lg"
                  />
                  <p className="text-xs text-gray-600">
                    {car?.transmission_type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-900 rounded-b-xl">
          <div className="flex justify-center py-1 text-white">
            <div className="flex flex-row gap-5">
              <div className="flex flex-row gap-2">
                <BidIcon fill="white" style={{ width: "20px" }} />
                <p className="font-bold text-lg">0</p>
              </div>
              <div className="flex flex-row gap-2">
                <IconUsers fill="white" style={{ width: "20px" }} />
                <p className="font-bold text-lg">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
