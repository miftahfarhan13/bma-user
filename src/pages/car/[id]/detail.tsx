import DetailCar from "@/components/car/DetailCar";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import BidTimer from "@/components/timer/BidTimer";
import { axiosClient } from "@/service/apiClient";
import { IBiddingTimeResponse } from "@/types/biddingTime";
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
  return (
    <>
      <Header
        title="Belanja Mobil - Detail Car"
        description="Di Belanja Mobil kamu bisa Wujudkan punya Mobil pertama kamu yang Kualitasnya Terjamin. Beli Mobil Tanpa Khawatir, Keabsahan Dokumen terjamin, Gratis Garansi Full 1 Tahun. Beli Mobil Berkualitas."
      />
      <Navbar />
      <Container>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            {!biddingTime?.current_bidding_time?.end_time && (
              <div className="bg-red-900 text-center text-white font-bold py-1">
                Lelang Telah Berakhir
              </div>
            )}
            <BidTimer biddingTime={biddingTime} />
          </div>
          <DetailCar id={id} />
        </div>
      </Container>
    </>
  );
}
