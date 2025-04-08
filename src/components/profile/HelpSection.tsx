const HelpSection = () => {
  return (
    <div className="space-y-10">
      {/* Pengaturan Profile */}
      <div className="space-y-3">
        <header>
          <h2 className="text-lg font-bold">Pengaturan Profile</h2>
        </header>
        <ol className="list-decimal ps-4 space-y-2">
          <li>
            Deskripsi dan kondisi Kendaraan (termasuk tetapi tidak terbatas pada
            mileage) adalah seperti kondisi Kendaraan pada tanggal pemeriksaan
            Kendaraan dan seperti yang dinyatakan dalam Platform Belanja Mobil
            Auction (“Deskripsi”). Deskripsi adalah indikasi dan Kendaraan akan
            dijual secara “as-is”.
          </li>
          <li>
            Kecuali disediakan secara tertulis dan bertulis, kami menolak semua
            pernyataan atau jaminan lain, yang tersurat atau tersirat berkaitan
            dengan Kendaraan ini, termasuk, tanpa batasan, sebarang jaminan
            mengenai kualitas, roadworthiness, kesesuaian, kemampuan jual beli,
            kesesuaian untuk tujuan tertentu atau sebaliknya (tanpa mengira apa
            cara urus niaga atau penggunaan perdagangan).
          </li>
          <li>
            Dengan membeli Kendaraan melalui Platform Belanja Mobil Auction,
            Pembeli dianggap telah meninjau dan setuju untuk membeli Kendaraan
            berdasarkan Deskripsi dan berdasarkan “as is”.
          </li>
          <li>
            Pembeli diingatkan untuk memeriksa keadaan Kenderaan, terutama
            sebelum atau selama penyerahan Kendaraan dari kami kepada Pembeli
            (“Serah Terima”) untuk (a) memastikan bahawa Kendaraan itu sesuai
            Deskirpsi atau (b) segera beritahu kami sekiranya terdapat
            percanggahan dalam Deskripsi semasa Serah Terima, jika gagal yang
            dianggap Pembeli telah menerima Kenderaan sesuai dengan Deskripsi /
            syarat Kenderaan semasa Serah Terima.
          </li>
        </ol>
      </div>

      {/* Sistem Penawaran Transparan */}
      <div className="space-y-3">
        <header>
          <h2 className="text-lg font-bold">Sistem Penawaran Transparan</h2>
        </header>
        <ol className="list-decimal ps-4 space-y-2">
          <li>
            Semua Kendaraan yang terdaftar di Marketplace ini telah menjalani
            pemeriksaan terlebih dahulu oleh tim inspeksi kami.
          </li>
          <li>
            Belanja Mobil Auction akan memberi tahu penjual dalam waktu 24 jam
            sejak akhir Acara Lelang Langsung (“Live Auction Event”) yang
            sukses. Penjualan, pengalihan kepemilikan, dan pembayaran akan
            diatur dengan penawar Harga Penawaran Akhir tertinggi (“Penawar
            Sukses”) setelah selesainya pengalihan antara penjual dan Belanja
            Mobil Auction (“Transaksi Penjual”).
          </li>
          <li>
            Penawar harus membayar Deposit sesuai ketentuan yang tertera dalam
            perjanjian kerjasama dari harga jual Kendaraan sejak Transaksi
            Penjual Sukses untuk memulai transaksi Belanja Mobil Auction dan
            penawar.
          </li>
          <li>
            Fitur Penyimpanan Terakhir berarti jika ada tawaran yang ditempatkan
            selama 30 detik terakhir dari sesi penawaran, pengatur waktu akan
            diperpanjang selama 30 detik tambahan, untuk penawar lain yang
            menempatkan tawaran terakhir mereka. Jika tidak ada tawaran baru
            yang diterima dalam perpanjangan waktu, pengatur waktu akan berakhir
            secara otomatis.
          </li>
          <li>
            Setelah transaksi Belanja Mobil Auction dan penawar dimulai, biaya
            penanganan berikut harus dibayarkan ke Belanja Mobil Auction:
          </li>
          <li>
            Untuk Kendaraan seharga 1 rupiah sampai 130 juta rupiah, biaya
            penanganannya adalah 1juta rupiah.
          </li>
          <li>
            Untuk Kendaraan seharga 130.000.001 rupiah - 300 juta rupiah, biaya
            penanganannya adalah 2 juta rupiah.
          </li>
          <li>
            Untuk Kendaraan seharga 300.000.001 rupiah ke atas, biaya
            penanganannya adalah 3 Juta rupiah.
          </li>
          <li>
            Penawar bertanggung jawab atas biaya penguasaan Kendaraan (termasuk
            transportasi, derek, parkir, tol, pengalihan kepemilikan dan
            lain-lain).
          </li>
        </ol>
        <div className="mt-5 font-semibold">
          * Catatan:
          <div className="text-sm">
            Panduan Open Marketplace Practice ini tunduk pada Perjanjian
            Kerjasama antara Belanja Mobil Auction dan penawar. Jika terjadi
            pertentangan antara rincian dalam Panduan ini dan Perjanjian
            Kerjasama, yang terakhir akan berlaku. Silakan hubungi Perwakilan
            Tim Business Development jika Anda memiliki pertanyaan terkait
            dengan Panduan praktik Marketplace.
          </div>
        </div>
      </div>

      {/* Pemahaman Dasar */}
      <div className="space-y-3">
        <header>
          <h2 className="text-lg font-bold">Pemahaman Dasar</h2>
        </header>
        <div className="flex flex-col gap-x-10 gap-y-5 md:flex-row">
          <img
            src="/images/help/help1.png"
            alt="Pemahaman Dasar"
            className="w-full rounded-lg md:max-w-[500px]"
          />
          <ol className="list-decimal ps-4 space-y-1">
            <li>Informasi waktu lelang</li>
            <li>Informasi Kerusakan Banjir</li>
            <li>
              Informasi kerusakan mobil :
              <ul>
                <li>Abu = Ringan</li>
                <li>Kuning = Sedang</li>
                <li>Merah = Berat</li>
              </ul>
            </li>
            <li>Status mobil disukai atau tidak</li>
            <li>List harga bidding</li>
            <li>Gambar Mobil</li>
            <li>
              Button untuk melakukan bidding Rp. 500.000 dan Rp. 1.000.000
            </li>
            <li>
              Button buy now untuk membantu anda menjadi pemenang secara
              langsung
            </li>
            <li>
              Membantu anda untuk menginputkan maks budget yang dipunya untuk
              melakukan bidding otomatis
            </li>
          </ol>
        </div>
      </div>

      {/* Fitur Live Bidding */}
      <div className="space-y-3">
        <header>
          <h2 className="text-lg font-bold">Fitur Live Bidding</h2>
        </header>
        <div className="flex flex-col gap-x-10 gap-y-5 md:flex-row">
          <img
            src="/images/help/help2.png"
            alt="Fitur Live Bidding"
            className="w-full rounded-lg md:max-w-[500px]"
          />
          <div>
            <p className="mb-4">
              <strong>Fitur live bidding</strong> membantu anda untuk melakukan{" "}
              <strong>bidding ke banyak mobil secara langsung</strong> di
              halaman favorit.
            </p>
            <ol className="list-decimal ps-4 space-y-1">
              <li>Timer waktu extend bidding</li>
              <li>Informasi terkait total bidding</li>
              <li>Informasi terkait jumlah orang yang sedang pantau bidding</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Status Mobil */}
      <div className="space-y-3">
        <header>
          <h2 className="text-lg font-bold">Status Mobil</h2>
        </header>
        <div className="flex flex-col gap-x-10 gap-y-5 md:flex-row">
          <img
            src="/images/help/help3.png"
            alt="Status Mobil"
            className="w-full rounded-lg md:max-w-[500px]"
          />
          <ol className="list-decimal ps-4 space-y-1">
            <li>
              Anda Menang : Anda memenangkan penawaran untuk kendaraan ini dan
              sekarang menunggu penjual untuk menerima tawaran tersebut.
            </li>
            <li>Anda Kalah : Anda kalah penawaran untuk kendaraan ini</li>
            <li>
              Terjual : Mobil sudah terjual dan proses pembayaran sudah selesai
            </li>
          </ol>
        </div>
      </div>

      {/* Bagaimana cara kerja Tawaran Maksimum? */}
      <div className="space-y-3">
        <header>
          <h2 className="text-lg font-bold">
            Bagaimana cara kerja Tawaran Maksimum?
          </h2>
        </header>
        <p>
          Masukkan jumlah maksimum yang tersedia untuk Anda membayarkan mobil
          ini. Sistem akan membantu Anda secara otomatis + 500 ribu rupiah
          setiap kali, jika ada tawaran baru dari dealer lain, hingga mencapai
          jumlah Tawaran Maksimum. Anda akan diinformasikan melalui sistem
          penawaran kami jika seseorang telah melakukan penawaran melebihi
          jumlah tawaran Maksimum Anda.
          <br />
          Contoh. Jika Anda telah menetapkan Tawaran Maksimum Menjadi 70 juta
          rupiah, sistem akan menaikkan 500 ribu rupiah (+ 500 ribu rupiah dari
          jumlah penawaran Anda) atas nama Anda sampai &apos;Harga Saat
          Ini&apos; mencapai 70 juta rupiah dan setelahnya sistem akan
          menghentikan penawaran untuk Anda.
          <br />
          <br />
          Anda dapat memperbarui Tawaran Maksimum Anda sebanyak yang Anda
          inginkan, tetapi minimal harus + 500 ribu rupiah lebih tinggi dari
          &apos;Harga Saat Ini&apos;. Jika Anda adalah penawar tertinggi saat
          ini, sistem tidak akan secara otomatis memberi + 500 ribu rupiah untuk
          Anda.
          <br />
          Contoh. Jika Anda adalah penawar tertinggi saat ini untuk mobil 50
          juta rupiah dan Anda memperbarui Tawaran Maksimum menjadi 60 juta
          rupiah, sistem tidak akan memberi Anda + 500 ribu rupiah pada
          &apos;Harga Saat Ini&apos;.
          <br />
          <br />
          Dalam hal dimana Tawaran Maksimum yang sama dimasukkan, penawar
          sebelumnya menang dan &apos;Harga Saat Ini&apos; akan dinaikkan ke
          jumlah Tawaran Maksimum.
          <br />
          Contoh. Jika Dealer A menetapkan Tawaran Maks menjadi 70 juta rupiah
          pada pukul 10:00:00 pagi dan Dealer B menetapkan Tawaran Maksimum yang
          sama pada pukul 10:00:35, dealer A menang. &apos;Harga Saat Ini&apos;
          secara otomatis akan meningkat menjadi 70 juta rupiah.
          <br />
          <br />
          Jika Tawaran Maksimum yang berbeda dimasukkan, sistem akan
          membandingkan Tawaran Maksimum dan menentukan siapa pemenangnya.
          &apos;Harga Saat Ini&apos; akan dinaikkan ke Tawaran Maksimum yang
          lebih rendah, dan sistem akan + 500 ribu rupiah untuk pemegang Tawaran
          Maksimum yang lebih tinggi.
          <br />
          Contoh. Dealer A memasukkan 70 juta rupiah sebagai Tawaran Maksimum
          dan Dealer B memasukkan 75 juta rupiah sebagai Tawaran Maksimum.
          Sistem akan menaikkan &apos;Harga Saat Ini&apos; menjadi 70 juta
          rupiah untuk Dealer A, dan kemudian + 500 ribu rupiah untuk Dealer B
          (yaitu Dealer B memegang 70 juta rupiah sebagai &apos;Harga Saat
          Ini&apos;).
          <br />
          <br />
        </p>
      </div>

      {/* Bagaimana cara kerja sistem penawaran? */}
      <div className="space-y-3">
        <header>
          <h2 className="text-lg font-bold">
            Bagaimana cara kerja sistem penawaran?
          </h2>
        </header>
        <ol className="list-decimal ps-4 space-y-1">
          <li>
            Jumlah Tawaran Manual ditempatkan. Masukan maksimum dari Penawaran
            Manual adalah 5 juta rupiah.
          </li>
          <li>Kurangi jumlah dengan interval 500 ribu rupiah.</li>
          <li>Tingkatkan jumlah dengan interval 500 ribu rupiah.</li>
          <li>Tempatkan Tawaran Manual Anda.</li>
          <li>Klik atau ketuk di sini untuk membuka menu Penawaran Manual.</li>
          <li>
            Untuk Penawaran otomatis, masukkan Tawaran Maksimum Anda di sini.
          </li>
          <li>Submit jumlah Tawaran Maksimum Anda.</li>
          <li>
            Pesan akan muncul untuk mengkonfirmasi jumlah penawaran yang Anda
            berikan, bersama dengan total Harga Penawaran Anda untuk mobil
            tersebut.
          </li>
          <li>Batalkan penawaran.</li>
          <li>Lanjutkan penawaran.</li>
        </ol>
      </div>
    </div>
  );
};

export default HelpSection;
