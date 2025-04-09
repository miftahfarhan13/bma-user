import React from "react";
import { CarGallery } from "./CarGallery";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/utils/context/AuthProvider";
import { getCarById } from "@/service/car";
import { formatCurrency } from "@/utils/format/number";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import BadgeDefectStatus from "./BadgeDefectStatus";
import useToggleFavorite from "@/utils/hooks/useToggleFavorite";
import IconPlate from "@/icons/IconPlate";
import IconNIK from "@/icons/IconNIK";
import IconTax from "@/icons/IconTax";
import moment from "moment";
import CarChecklistDocument from "./CarChecklistDocument";
import CarDamages from "./CarDamages";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";

const Gallery = dynamic(() => import("../layout/Gallery"), { ssr: false });

export default function DetailCar({ id }: { id: string }) {
  const { handleToggleFavorite } = useToggleFavorite({ id });
  const { token } = useAuth();
  const { data } = useQuery({
    queryKey: ["car", token],
    queryFn: () => getCarById(id),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  const documentImages = [
    { url: data?.car_document?.bpkb_pict, label: "BPKB" },
    { url: data?.car_document?.stnk_pict, label: "STNK" },
    { url: data?.car_document?.invoice_pict, label: "Faktur" },
    { url: data?.car_document?.vin_pict, label: "NIK/VIN" },
    { url: data?.car_document?.form_a_pict, label: "Form A (CBU)" },
    { url: data?.car_document?.stnk_fotocopy_pict, label: "FC an STNK" },
    { url: data?.car_document?.manual_book_pict, label: "Buku Manual" },
    { url: data?.car_document?.service_book_pict, label: "Buku Servis" },
    { url: data?.car_document?.backup_key_pict, label: "Kunci Cadangan" },
    { url: data?.car_document?.receipt_form_pict, label: "Blanko Kwitansi" },
    { url: data?.car_document?.declaration_right_pict, label: "SPH" },
    { url: data?.car_document?.toolkit_pict, label: "Toolkits" },
  ].filter((item) => item.url);

  const video = data?.car_videos?.filter((item) => item?.video_file);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CarGallery images={data?.car_images || []} />

        <div className="flex flex-col gap-2.5">
          <div className="flex flex-row items-start gap-2.5 justify-between">
            <div className="flex flex-col">
              <p className="font-bold text-xl md:text-3xl">
                {data?.brand?.brand_name} {data?.car_name}
              </p>
              <p className="font-extrabold text-red-900 text-2xl md:text-4xl">
                {formatCurrency(data?.price || 0)}
              </p>
            </div>
            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // prevent bubbling
                e.preventDefault(); // prevent link navigation (extra safety)
                handleToggleFavorite(); // your custom logic
              }}
            >
              <Icon
                icon={
                  data?.is_favorite
                    ? "fa6-solid:thumbs-up"
                    : "fa6-regular:thumbs-up"
                }
                className="text-2xl text-red-900"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-1">
            <Badge variant="secondary">{data?.car_availability}</Badge>

            <div className="flex flex-row items-center justify-end gap-1">
              {data?.is_flooded === 1 && (
                <div className="flex items-center gap-[5px] rounded-full bg-blue-100/30 px-3 py-1 text-xs font-medium text-blue-500">
                  <Icon icon="fa6-solid:droplet" />
                  Banjir
                </div>
              )}
              {data?.defect_status !== "Tidak Ada" && (
                <BadgeDefectStatus status={data?.defect_status || ""} />
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="text-base md:text-2xl font-bold">Informasi Mobil</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        <div className="p-1 md:p-2 flex justify-center border border-red-900 rounded-lg">
          <div className="flex flex-row items-center gap-2.5">
            <IconPlate fill="#82181a" style={{ width: "40px" }} />
            <div className="flex flex-col font-bold text-red-900">
              <p className="text-sm md:text-base">Plat Nomor</p>
              <p className="text-xs md:text-sm">{data?.license_plate}</p>
            </div>
          </div>
        </div>
        <div className="p-1 md:p-2 flex justify-center border border-red-900 rounded-lg">
          <div className="flex flex-row items-center gap-2.5">
            <IconNIK fill="#82181a" style={{ width: "40px" }} />
            <div className="flex flex-col font-bold text-red-900">
              <p className="text-sm md:text-base">Tahun Mobil</p>
              <p className="text-xs md:text-sm">
                {moment(new Date(data?.manufacture_year || "")).format("YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div className="p-1 md:p-2 flex justify-center border border-red-900 rounded-lg">
          <div className="flex flex-row items-center gap-2.5">
            <IconTax fill="#82181a" style={{ width: "40px" }} />
            <div className="flex flex-col font-bold text-red-900">
              <p className="text-sm md:text-base">Pajak Mobil</p>
              <p className="text-xs md:text-sm">
                {moment(new Date(data?.car_tax || "")).format("YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div className="p-1 md:p-2 flex justify-center border border-red-900 rounded-lg">
          <div className="flex flex-row items-center gap-2.5">
            <Icon icon="cil:gauge" className="text-red-900 text-[40px]" />
            <div className="flex flex-col font-bold text-red-900">
              <p className="text-sm md:text-base">Kilometer</p>
              <p className="text-xs md:text-sm">{data?.odometer} km</p>
            </div>
          </div>
        </div>
        <div className="p-1 md:p-2 flex justify-center border border-red-900 rounded-lg">
          <div className="flex flex-row items-center gap-2.5">
            <Icon
              icon="fluent:gas-pump-20-regular"
              className="text-red-900 text-[40px]"
            />
            <div className="flex flex-col font-bold text-red-900">
              <p className="text-sm md:text-base">Bahan Bakar</p>
              <p className="text-xs md:text-sm">{data?.fuel_type}</p>
            </div>
          </div>
        </div>
        <div className="p-1 md:p-2 flex justify-center border border-red-900 rounded-lg">
          <div className="flex flex-row items-center gap-2.5">
            <Icon
              icon="icon-park-outline:manual-gear"
              className="text-red-900 text-[40px]"
            />
            <div className="flex flex-col font-bold text-red-900">
              <p className="text-sm md:text-base">Transmisi</p>
              <p className="text-xs md:text-sm">{data?.transmission_type}</p>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultValue="document">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger
            value="document"
            className="data-[state=active]:bg-[#82181a] data-[state=active]:text-white font-bold"
          >
            Dokumen
          </TabsTrigger>
          <TabsTrigger
            value="inspection"
            className="data-[state=active]:bg-[#82181a] data-[state=active]:text-white font-bold"
          >
            Inspeksi
          </TabsTrigger>
          <TabsTrigger
            value="damage"
            className="data-[state=active]:bg-[#82181a] data-[state=active]:text-white font-bold"
          >
            Kerusakan
          </TabsTrigger>
          <TabsTrigger
            value="video"
            className="data-[state=active]:bg-[#82181a] data-[state=active]:text-white font-bold"
          >
            Video
          </TabsTrigger>
        </TabsList>
        <TabsContent value="document" className="py-5">
          <div className="flex flex-col gap-5">
            <CarChecklistDocument carDocument={data?.car_document} />
            <Gallery images={documentImages || []} />
          </div>
        </TabsContent>
        <TabsContent value="inspection" className="py-5">
          <div className="border border-muted rounded-xl p-2.5">
            <div
              dangerouslySetInnerHTML={{
                __html: data?.inspection_detail || "",
              }}
            ></div>
          </div>
        </TabsContent>
        <TabsContent value="damage" className="py-5">
          <CarDamages data={data} />
        </TabsContent>
        <TabsContent value="video" className="py-5">
          {video && video.length > 0 && (
            <ReactPlayer url={video[video?.length - 1]?.video_file} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
