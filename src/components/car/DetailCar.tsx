import React, { useEffect } from "react";
import { CarGallery } from "./CarGallery";
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
import { ICarResponse } from "@/types/car";
import { useAuth } from "@/utils/context/AuthProvider";
import DetailCarLiveBid from "./DetailCarLiveBid";
import { useBid } from "@/utils/context/BidProvider";
import { AuctionCountdown } from "../timer/AuctionCountdown";
import { IBiddingTimeResponse } from "@/types/biddingTime";

const Gallery = dynamic(() => import("../layout/Gallery"), { ssr: false });

export default function DetailCar({
  data,
  id,
  biddingTime,
}: {
  data: ICarResponse;
  id: string;
  biddingTime: IBiddingTimeResponse;
}) {
  const { user } = useAuth();
  const {
    sessionTimeEnd,
    setSessionTimeEnd,
    createdPrice,
    setCreatedPrice,
    setBidCount,
    setBidUserCount,
    serverTime,
    setServerTime,
  } = useBid();

  const serverTimeStart = moment(serverTime);
  const dateAuctionStart = moment(data?.session_time_start);
  const dateAuctionEnd = moment(sessionTimeEnd);

  const isAuctionEnd =
    serverTimeStart.isAfter(dateAuctionEnd) || !!data?.winner_id;

  const isAuctionNotStart =
    moment(new Date()) < moment(data?.session_time_start) ||
    moment(new Date()) < moment(data?.session_date);

  const isAuctionActive =
    !isAuctionEnd &&
    serverTimeStart.isSameOrAfter(dateAuctionStart) &&
    serverTimeStart.isSameOrBefore(dateAuctionEnd) &&
    !data?.winner_id;

  useEffect(() => {
    setCreatedPrice(data?.created_price || data?.price);
    setBidCount(data?.bids_count);
    setBidUserCount(data?.unique_user_bids_count);
    setSessionTimeEnd(data?.session_time_end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setServerTime(biddingTime?.server_time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [biddingTime?.server_time]);

  const { handleToggleFavorite } = useToggleFavorite({ id });

  const carDocument =
    data?.car_documents && data?.car_documents?.length > 0
      ? data?.car_documents[0]
      : undefined;

  const documentImages = [
    { url: carDocument?.bpkb_pict, label: "BPKB" },
    { url: carDocument?.stnk_pict, label: "STNK" },
    { url: carDocument?.invoice_pict, label: "Faktur" },
    { url: carDocument?.vin_pict, label: "NIK/VIN" },
    { url: carDocument?.form_a_pict, label: "Form A (CBU)" },
    { url: carDocument?.stnk_fotocopy_pict, label: "FC an STNK" },
    { url: carDocument?.manual_book_pict, label: "Buku Manual" },
    { url: carDocument?.service_book_pict, label: "Buku Servis" },
    { url: carDocument?.backup_key_pict, label: "Kunci Cadangan" },
    { url: carDocument?.receipt_form_pict, label: "Blanko Kwitansi" },
    { url: carDocument?.declaration_right_pict, label: "SPH" },
    { url: carDocument?.toolkit_pict, label: "Toolkits" },
  ].filter((item) => item.url);

  const video = data?.car_videos?.filter((item) => item?.video_file);

  const isWinner = data?.winner_id === user?.id;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        {!isAuctionActive ? (
          <div className="bg-red-900 text-center text-white font-bold py-1">
            Lelang Telah Berakhir
          </div>
        ) : (
          <>
            {isAuctionActive && data?.session_time_end && (
              <AuctionCountdown
                label={
                  isAuctionActive
                    ? "Lelang berakhir dalam: "
                    : "Lelang selanjutnya dimulai dalam: "
                }
                serverTime={serverTime || ""}
                endTime={
                  isAuctionActive
                    ? sessionTimeEnd || ""
                    : biddingTime?.next_bidding_time?.start_time
                }
              />
            )}
          </>
        )}
      </div>

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
                  {formatCurrency(createdPrice || 0)}
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
                  <BadgeDefectStatus
                    type="grid"
                    status={data?.defect_status || ""}
                  />
                )}
              </div>
            </div>
            {isAuctionEnd && data?.winner_id ? (
              <>
                {isWinner ? (
                  <>
                    <div className="flex items-center justify-center w-full px-5 py-10 text-white border rounded-lg gap-x-10 gap-y-5 border-green-800 bg-green-800 md:py-16">
                      <Icon
                        icon="heroicons:check-badge"
                        className="w-12 h-12"
                      />
                      <div className="text-2xl font-black">
                        Selamat!
                        <br />
                        Anda Menang
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center w-full px-5 py-10 text-white border rounded-lg gap-x-10 gap-y-5 border-red-800 bg-red-800 md:py-16">
                      <Icon icon="heroicons:x-circle" className="w-12 h-12" />
                      <div className="text-2xl font-black">
                        Mohon Maaf!
                        <br />
                        Anda Kalah
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : isAuctionNotStart ? (
              <>
                <div className="flex flex-col items-center justify-center w-full px-5 py-10 text-center bg-gray-100 rounded-lg gap-y-5 md:py-16">
                  <Icon icon="heroicons:clock" className="w-12 h-12" />
                  <div className="text-lg">
                    <div className="font-bold">Suka Mobil Ini?</div>
                    <div className="">
                      Jadikan favorit dan nantikan sesi penawaran kami
                      berikutnya pada
                    </div>
                    <div className="font-bold text-auc-primary-dark">
                      {moment(data?.session_date).format("dddd, DD MMMM YYYY")}{" "}
                    </div>
                  </div>
                </div>
              </>
            ) : isAuctionActive ? (
              <>
                <DetailCarLiveBid car={data} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full px-5 py-10 text-center bg-gray-100 rounded-lg gap-y-5 md:py-16">
                <Icon icon="heroicons:clock" className="w-12 h-12" />
                <div className="text-lg">
                  <div className="font-bold">Mobil telah selesai dilelang</div>
                </div>
              </div>
            )}
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
                  {moment(new Date(data?.manufacture_year || "")).format(
                    "YYYY"
                  )}
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
          <TabsList className="grid w-full grid-cols-4 h-10 md:h-14">
            <TabsTrigger
              value="document"
              className="data-[state=active]:bg-[#82181a] data-[state=active]:text-white font-bold text-xs md:text-xl"
            >
              Dokumen
            </TabsTrigger>
            <TabsTrigger
              value="inspection"
              className="data-[state=active]:bg-[#82181a] data-[state=active]:text-white font-bold text-xs md:text-xl"
            >
              Inspeksi
            </TabsTrigger>
            <TabsTrigger
              value="damage"
              className="data-[state=active]:bg-[#82181a] data-[state=active]:text-white font-bold text-xs md:text-xl"
            >
              Kerusakan
            </TabsTrigger>
            <TabsTrigger
              value="video"
              className="data-[state=active]:bg-[#82181a] data-[state=active]:text-white font-bold text-xs md:text-xl"
            >
              Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="document" className="py-5">
            <div className="flex flex-col gap-5">
              <CarChecklistDocument carDocument={carDocument} />
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
    </div>
  );
}
