import CarHome from "@/components/home/CarHome";
import CarouselHome from "@/components/home/CarouselHome";
import ShortcutHome from "@/components/home/ShortcutHome";
import UserHome from "@/components/home/UserHome";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Header
        title="Belanja Mobil - Home"
        description="Di Belanja Mobil kamu bisa Wujudkan punya Mobil pertama kamu yang Kualitasnya Terjamin. Beli Mobil Tanpa Khawatir, Keabsahan Dokumen terjamin, Gratis Garansi Full 1 Tahun. Beli Mobil Berkualitas."
      />
      <Navbar />
      <CarouselHome />
      <div className="px-4 md:px-5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <UserHome />
            <ShortcutHome />
          </div>
        </div>
      </div>
      <CarHome />
    </>
  );
}
