import DetailCar from "@/components/car/DetailCar";
import DetailCarSkeleton from "@/components/car/DetailCarSkeleton";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import { axiosClient } from "@/service/apiClient";
import { getCarById } from "@/service/car";
import { IBiddingTimeResponse } from "@/types/biddingTime";
import { ICarResponse } from "@/types/car";
import { useAuth } from "@/utils/context/AuthProvider";
import { BidProvider } from "@/utils/context/BidProvider";
import { useQuery } from "@tanstack/react-query";
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
    refetchOnWindowFocus: true,
    enabled: !!token,
  });

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
            <BidProvider>
              <DetailCar
                id={id}
                data={data as ICarResponse}
                biddingTime={biddingTime}
              />
            </BidProvider>
          </>
        ) : (
          <>
            <DetailCarSkeleton />
          </>
        )}
      </Container>
      <audio src="/sounds/bid-1.mp3" preload="auto" id="audio-bid-1" />
      <audio src="/sounds/bid-2.mp3" preload="auto" id="audio-bid-2" />
      <audio
        src="/sounds/alert-1minute.mp3"
        preload="auto"
        id="audio-alert-1-minute"
      />
      <audio src="/sounds/bid-over.mp3" preload="auto" id="audio-bid-over" />
    </>
  );
}
