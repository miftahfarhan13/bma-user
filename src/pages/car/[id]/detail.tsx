import DetailCar from "@/components/car/DetailCar";
import DetailCarSkeleton from "@/components/car/DetailCarSkeleton";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { AuctionCountdown } from "@/components/timer/AuctionCountdown";
import { axiosClient } from "@/service/apiClient";
import { getCarById } from "@/service/car";
import { IBiddingTimeResponse } from "@/types/biddingTime";
import { ICarResponse } from "@/types/car";
import { useAuth } from "@/utils/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axiosClient.get(`/current/time`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch bidding time");
  }

  return {
    props: {
      id: context.query.id,
      biddingTime: response.status !== 200 ? null : response.data?.data,
    },
  };
};

export default function CarDetailPage({
  id,
  biddingTime,
}: {
  id: string;
  biddingTime: IBiddingTimeResponse;
}) {
  const { token } = useAuth();
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["car", token],
    queryFn: () => getCarById(id),
    refetchOnWindowFocus: false,
    enabled: !!token,
  });

  const serverTime = moment(biddingTime?.server_time);
  const dateAuctionStart = moment(data?.session_time_start);
  const dateAuctionEnd = moment(data?.session_time_end).add(3, "seconds");

  const isAuctionEnd = serverTime.isAfter(dateAuctionEnd) || !!data?.winner_id;

  const isAuctionNotStart =
    !biddingTime?.current_bidding_time

  const isAuctionActive =
    biddingTime?.current_bidding_time &&
    !isAuctionEnd &&
    serverTime.isSameOrAfter(dateAuctionStart) &&
    serverTime.isSameOrBefore(dateAuctionEnd) &&
    !data?.winner_id;

  return (
    <>
      <Header
        title="Belanja Mobil - Detail Car"
        description="Di Belanja Mobil kamu bisa Wujudkan punya Mobil pertama kamu yang Kualitasnya Terjamin. Beli Mobil Tanpa Khawatir, Keabsahan Dokumen terjamin, Gratis Garansi Full 1 Tahun. Beli Mobil Berkualitas."
      />
      <Navbar />
      <Container>
        {!isLoading && !isPending ? (
          <>
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
                          biddingTime?.current_bidding_time?.end_time
                            ? "Lelang berakhir dalam: "
                            : "Lelang selanjutnya dimulai dalam: "
                        }
                        serverTime={biddingTime?.server_time}
                        endTime={
                          biddingTime?.current_bidding_time?.end_time
                            ? data?.session_time_end
                            : biddingTime?.next_bidding_time?.start_time
                        }
                      />
                    )}
                  </>
                )}
              </div>
              <DetailCar
                id={id}
                data={data as ICarResponse}
                biddingTime={biddingTime}
                isAuctionEnd={isAuctionEnd}
                isAuctionNotStart={isAuctionNotStart}
                isAuctionActive={isAuctionActive}
              />
            </div>
          </>
        ) : (
          <>
            <DetailCarSkeleton />
          </>
        )}
      </Container>
    </>
  );
}
