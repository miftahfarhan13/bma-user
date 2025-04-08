import GarageCar from "@/components/bid/GarageCar";
import BottomNavigationMobile from "@/components/layout/BottomNavigationMobile";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";

export default function GaragePage() {
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
            GARASIKU
          </p>
          <GarageCar />
        </div>
      </Container>
      <BottomNavigationMobile />
    </>
  );
}
