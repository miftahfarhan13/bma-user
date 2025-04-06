import AvaiableCar from "@/components/bid/AvailableCar";
import BottomNavigationMobile from "@/components/layout/BottomNavigationMobile";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import BidTimer from "@/components/timer/BidTimer";
import { axiosClient } from "@/service/apiClient";
import { IBiddingTimeResponse } from "@/types/biddingTime";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axiosClient.get(`/current/time`);

  if (response.status !== 200) {
    throw new Error("Failed to fetch bidding time");
  }

  return {
    props: {
      biddingTime: response.status !== 200 ? null : response.data?.data,
    },
  };
};

export default function BidPage({
  biddingTime,
}: {
  biddingTime: IBiddingTimeResponse;
}) {
  return (
    <>
      <Header
        title="Belanja Mobil - Bid"
        description="Di Belanja Mobil kamu bisa Wujudkan punya Mobil pertama kamu yang Kualitasnya Terjamin. Beli Mobil Tanpa Khawatir, Keabsahan Dokumen terjamin, Gratis Garansi Full 1 Tahun. Beli Mobil Berkualitas."
      />
      <Navbar />
      <Container>
        <div className="flex flex-col gap-5">
          <p className="text-center text-5xl text-red-900 font-extrabold">
            LELANG
          </p>
          <div className="flex flex-col gap-1">
            {!biddingTime?.current_bidding_time?.end_time && (
              <div className="bg-red-900 text-center text-white font-bold py-1">
                Lelang Telah Berakhir
              </div>
            )}
            <BidTimer biddingTime={biddingTime} />
          </div>
          <AvaiableCar isFavorite={false} />
        </div>
      </Container>
      <BottomNavigationMobile />
    </>
  );
}
