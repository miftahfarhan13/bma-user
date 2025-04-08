import BottomNavigationMobile from "@/components/layout/BottomNavigationMobile";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import HelpSection from "@/components/profile/HelpSection";
import Link from "next/link";

export default function ProfileBantuanPage() {
  return (
    <>
      <Header
        title="Belanja Mobil - Help"
        description="Di Belanja Mobil kamu bisa Wujudkan punya Mobil pertama kamu yang Kualitasnya Terjamin. Beli Mobil Tanpa Khawatir, Keabsahan Dokumen terjamin, Gratis Garansi Full 1 Tahun. Beli Mobil Berkualitas."
      />
      <Navbar />
      <Container>
        <div className="flex flex-col gap-5">
          <p className="text-2xl font-bold">Pengaturan Profil</p>
          <div className="grid grid-cols-2 gap-5">
            <Link href="/profile">
              <div className="text-center border-b-3 border-gray-300 text-gray-300 font-bold text-base md:text-lg">
                Profil
              </div>
            </Link>
            <Link href="/profile/bantuan">
              <div className="text-center border-b-3 border-red-900 text-red-900 font-bold text-base md:text-lg">
                Bantuan
              </div>
            </Link>
          </div>
          <HelpSection />
        </div>
      </Container>
      <BottomNavigationMobile />
    </>
  );
}
