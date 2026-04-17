export const siteConfig = {
  name: "Bengkel Las Al-Ihsan Bekasi",
  siteUrl: "https://las-al-ihsan-bekasi.pages.dev",
  primaryPhone: "081389424370",
  secondaryPhone: "085889792571",
  mapsUrl: "https://maps.app.goo.gl/Em9rP5zreHBsWsmA6",
  reviewUrl: "https://maps.app.goo.gl/Em9rP5zreHBsWsmA6",
  instagramUrl:
    "https://www.instagram.com/bengkellas_al_ihsan?igsh=aDkyZmxwNG8xcWNj",
  tiktokUrl:
    "https://www.tiktok.com/@bengkellasalihsan?_r=1&_t=ZS-95c4FykBysr",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Bengkel%20Las%20Al%20Ihsan%20Bekasi%2C%20Jl.%20Bengkong%20Raya%2C%20RT.001%2FRW.006%2C%20Padurenan%2C%20Kec.%20Mustika%20Jaya%2C%20Kota%20Bekasi%2C%20Jawa%20Barat%2017156&output=embed",
  address:
    "Jl. Bengkong Raya, RT.001/RW.006, Padurenan, Kec. Mustika Jaya, Kota Bekasi, Jawa Barat 17156",
  areaServed: ["Bekasi", "Tambun", "Cikarang", "Babelan"],
  whatsappContacts: [
    {
      label: "WhatsApp Utama",
      number: "081389424370",
      url: "https://wa.me/6281389424370?text=Halo%20Bengkel%20Las%20Al-Ihsan%20Bekasi%2C%20saya%20ingin%20konsultasi%20mengenai%20pengerjaan%20las.",
    },
    {
      label: "WhatsApp Kedua",
      number: "085889792571",
      url: "https://wa.me/6285889792571?text=Halo%20Bengkel%20Las%20Al-Ihsan%20Bekasi%2C%20saya%20ingin%20bertanya%20mengenai%20layanan%20las.",
    },
  ],
  whatsappPrimaryUrl:
    "https://wa.me/6281389424370?text=Halo%20Bengkel%20Las%20Al-Ihsan%20Bekasi%2C%20saya%20ingin%20konsultasi%20mengenai%20pengerjaan%20las.",
  whatsappSecondaryUrl:
    "https://wa.me/6285889792571?text=Halo%20Bengkel%20Las%20Al-Ihsan%20Bekasi%2C%20saya%20ingin%20bertanya%20mengenai%20layanan%20las.",
  socialLinks: [
    {
      label: "WhatsApp",
      icon: "whatsapp",
      url: "https://wa.me/6281389424370?text=Halo%20Bengkel%20Las%20Al-Ihsan%20Bekasi%2C%20saya%20ingin%20konsultasi%20mengenai%20pengerjaan%20las.",
      theme:
        "border-[#0d5c4d] bg-[#0f9d58] text-white hover:bg-[#0d8a4d]",
    },
    {
      label: "Instagram",
      icon: "instagram",
      url: "https://www.instagram.com/bengkellas_al_ihsan?igsh=aDkyZmxwNG8xcWNj",
      theme:
        "border-[#f4bdd5] bg-white text-[#e1306c] hover:bg-[#fff1f7]",
    },
    {
      label: "TikTok",
      icon: "tiktok",
      url: "https://www.tiktok.com/@bengkellasalihsan?_r=1&_t=ZS-95c4FykBysr",
      theme:
        "border-[#cad7f0] bg-[#f4f8ff] text-[#17336c] hover:bg-[#e8f0fd]",
    },
    {
      label: "Google Maps",
      icon: "maps",
      url: "https://maps.app.goo.gl/Em9rP5zreHBsWsmA6",
      theme:
        "border-[#cad7f0] bg-white text-[#17336c] hover:bg-[#f5f8ff]",
    },
  ],
  heroTags: [
    "Bengkel Las Bekasi",
    "Jasa Las Panggilan",
    "Google 4.9 / 261 Review",
    "Perbaikan & Pengecatan",
  ],
  stats: [
    { value: "4.9", label: "rating Google" },
    { value: "261", label: "review Google" },
    { value: "4", label: "area layanan inti" },
    { value: "2", label: "nomor WhatsApp aktif" },
  ],
  serviceChecklist: [
    "Pagar",
    "Teralis",
    "Stainless Steel",
    "Tangga Putar",
    "Folding Gate",
    "Pintu Besi",
    "Rolling Door",
    "Kanopi",
  ],
} as const;

export const navigationLinks = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/tentang", label: "Tentang" },
  { href: "/ulasan", label: "Ulasan" },
  { href: "/faq", label: "FAQ" },
  { href: "/lokasi", label: "Lokasi" },
] as const;

export const reviewSnapshot = {
  rating: "4.9",
  reviewCount: "261",
  source: "Google Maps",
  summary:
    "Snapshot profil Google Maps yang Anda berikan menunjukkan rating 4.9 dengan 261 review. Kami menampilkan angka ini apa adanya dan mengarahkan pengunjung untuk memeriksa ulasan langsung di Google Maps.",
  badgeAlt:
    "Rating Google Maps Bengkel Las Al-Ihsan Bekasi 4.9 dari 261 review",
} as const;

export const trustSignals = [
  {
    title: "Identitas bisnis mudah diverifikasi",
    description:
      "Nama usaha, WhatsApp, Google Maps, Instagram, dan TikTok ditampilkan konsisten untuk memudahkan calon pelanggan memeriksa bisnis sebelum pesan.",
  },
  {
    title: "Portfolio memakai dokumentasi asli",
    description:
      "Foto yang tampil berasal dari pekerjaan lapangan Bengkel Las Al-Ihsan Bekasi, bukan stok template atau mockup generik.",
  },
  {
    title: "CTA diarahkan ke jalur closing tercepat",
    description:
      "Setiap halaman diarahkan ke WhatsApp agar calon pelanggan bisa langsung kirim foto lokasi, ukuran kasar, dan kebutuhan awal.",
  },
  {
    title: "Fokus lokal Bekasi dan sekitarnya",
    description:
      "Konten dibuat untuk SEO lokal Bekasi, Tambun, Cikarang, dan Babelan agar relevan untuk pencarian jasa las terdekat.",
  },
];

export const valueProps = [
  {
    title: "Tampilan lebih serius untuk closing",
    description:
      "Landing page dibuat seperti company profile ringkas: jelas, meyakinkan, dan siap dipakai saat calon pelanggan membandingkan vendor.",
  },
  {
    title: "Scope pekerjaan langsung terbaca",
    description:
      "Kategori layanan dipisahkan rapi agar pengunjung cepat paham apakah kebutuhan mereka masuk ke pagar, kanopi, stainless, atau perbaikan.",
  },
  {
    title: "Real review snapshot, bukan quote palsu",
    description:
      "Bagian ulasan menonjolkan data rating Google yang bisa diperiksa langsung, tanpa menampilkan testimonial buatan.",
  },
  {
    title: "Setiap topik punya halaman sendiri",
    description:
      "Layanan, portfolio, tentang, ulasan, FAQ, dan lokasi dibuat sebagai page terpisah untuk pengalaman mobile dan SEO yang lebih matang.",
  },
  {
    title: "Branding merah-biru lebih tegas",
    description:
      "Palet visual dipertegas agar merek terasa lebih kokoh, mudah dikenali, dan konsisten dengan karakter logo welder Al-Ihsan.",
  },
];

export const advantages = [
  {
    tag: "01",
    title: "Respon cepat untuk konsultasi awal",
    description:
      "Pelanggan bisa langsung kirim foto area, ukuran kasar, dan referensi model ke WhatsApp tanpa perlu proses yang berbelit.",
  },
  {
    tag: "02",
    title: "Kategori pekerjaan lebih matang",
    description:
      "Layanan dipisah menjadi kategori yang jelas agar kebutuhan rumah, ruko, maupun proyek kecil menengah langsung terarah.",
  },
  {
    tag: "03",
    title: "Ada jalur trust sebelum deal",
    description:
      "Google Maps, rating, alamat, nomor aktif, dan sosial media resmi tampil jelas supaya pelanggan lebih yakin sebelum booking.",
  },
  {
    tag: "04",
    title: "Cocok untuk pembuatan baru maupun perbaikan",
    description:
      "Tidak hanya order baru. Bengkel juga menerima pengelasan ulang, penguatan struktur, pengecatan, dan layanan panggilan.",
  },
];

export const processSteps = [
  {
    title: "Kirim kebutuhan via WhatsApp",
    description:
      "Ceritakan kebutuhan Anda, kirim foto area, dan jelaskan ukuran kasar atau referensi model yang diinginkan.",
  },
  {
    title: "Survey atau arahkan solusi",
    description:
      "Untuk kebutuhan tertentu, tim bisa membantu survey lokasi atau memberi arahan awal agar pekerjaan lebih presisi.",
  },
  {
    title: "Produksi dan pemasangan",
    description:
      "Setelah kebutuhan jelas, pengerjaan dilakukan sesuai kategori layanan dengan fokus pada hasil rapi dan kokoh.",
  },
];

export type ServiceCategory = {
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  note: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    badge: "Kategori 01",
    title: "Pagar Besi & Gerbang Rumah",
    description:
      "Pembuatan pagar besi Bekasi untuk rumah, ruko, dan area depan bangunan dengan model minimalis, custom, atau dekoratif.",
    bullets: [
      "Pagar swing dan sliding sesuai kebutuhan akses",
      "Bisa menyesuaikan fasad rumah modern atau klasik",
      "Finishing warna dan detail dapat dikonsultasikan",
    ],
    note: "Pilihan tepat untuk keamanan rumah sekaligus memperkuat tampilan depan properti.",
  },
  {
    badge: "Kategori 02",
    title: "Teralis Jendela & Pengaman",
    description:
      "Teralis untuk jendela, bukaan samping, pintu belakang, dan area servis dengan desain rapi dan tetap proporsional.",
    bullets: [
      "Model vertikal, horizontal, silang, atau custom motif",
      "Dapat menyesuaikan bukaan existing",
      "Cocok untuk kebutuhan keamanan tambahan di rumah",
    ],
    note: "Sering dipesan bersamaan dengan pagar besi atau pintu pengaman.",
  },
  {
    badge: "Kategori 03",
    title: "Stainless Steel & Railing",
    description:
      "Layanan stainless Bekasi untuk railing tangga, balkon, kombinasi kaca, dan detail interior yang membutuhkan tampilan bersih.",
    bullets: [
      "Railing stainless untuk tangga dan balkon",
      "Bisa dipadukan dengan kaca atau ornamen lain",
      "Tampilan modern untuk indoor dan semi outdoor",
    ],
    note: "Cocok untuk rumah yang ingin hasil lebih presisi dan tampak premium.",
  },
  {
    badge: "Kategori 04",
    title: "Tangga Putar & Tangga Besi",
    description:
      "Pengerjaan tangga putar, tangga siku, dan tangga besi custom untuk ruang terbatas, mezzanine, atau akses lantai dua.",
    bullets: [
      "Tangga putar untuk optimasi ruang sempit",
      "Tangga besi custom sesuai tinggi dan lebar ruang",
      "Handrail dan railing bisa disesuaikan",
    ],
    note: "Banyak dipilih untuk konsep rumah modern dan gaya industrial.",
  },
  {
    badge: "Kategori 05",
    title: "Folding Gate & Gerbang Lipat",
    description:
      "Solusi untuk area toko, ruko, garasi, maupun akses lebar yang membutuhkan sistem lipat yang efisien dan aman.",
    bullets: [
      "Cocok untuk bukaan lebar pada area depan bangunan",
      "Pilihan panel dan finishing dapat disesuaikan",
      "Mendukung kebutuhan hunian maupun area komersial",
    ],
    note: "Baik untuk properti yang membutuhkan bukaan fleksibel dengan tingkat keamanan tinggi.",
  },
  {
    badge: "Kategori 06",
    title: "Pintu Besi & Panel Besi",
    description:
      "Pintu besi Bekasi untuk area servis, gudang, pintu pengaman, atau akses tambahan yang memerlukan struktur kokoh.",
    bullets: [
      "Pintu panel besi untuk area utilitas",
      "Bisa untuk rumah, gudang, kios, dan ruang servis",
      "Tahan pakai dan mudah dirawat",
    ],
    note: "Sesuai untuk area yang menuntut keamanan dan ketahanan jangka panjang.",
  },
  {
    badge: "Kategori 07",
    title: "Rolling Door",
    description:
      "Layanan rolling door untuk kios, toko, garasi, atau bukaan usaha dengan kebutuhan buka-tutup yang praktis dan aman.",
    bullets: [
      "Cocok untuk toko dan ruang usaha",
      "Membantu keamanan saat properti tutup",
      "Dapat disesuaikan dengan ukuran bukaan",
    ],
    note: "Sering dibutuhkan pemilik usaha yang ingin akses praktis dan aman setiap hari.",
  },
  {
    badge: "Kategori 08",
    title: "Kanopi & Carport",
    description:
      "Kanopi Bekasi untuk teras, carport, area samping rumah, maupun fasad depan dengan tampilan modern dan proporsional.",
    bullets: [
      "Kanopi teras, balkon, dan carport",
      "Menyesuaikan fasad rumah dan kebutuhan teduh",
      "Bisa untuk renovasi maupun finishing rumah baru",
    ],
    note: "Kategori unggulan untuk pemilik rumah yang ingin tampilan depan lebih rapi dan fungsional.",
  },
  {
    badge: "Kategori 09",
    title: "Perbaikan & Pengecatan Besi",
    description:
      "Menerima perbaikan las retak, penguatan sambungan, cat ulang pagar atau kanopi, dan pembenahan komponen yang sudah ada.",
    bullets: [
      "Las ulang dan penguatan struktur lama",
      "Pengecatan ulang pagar, pintu, dan kanopi",
      "Evaluasi kebutuhan perbaikan di lokasi",
    ],
    note: "Pilihan tepat jika Anda belum perlu bikin baru tetapi ingin hasil lebih aman dan rapi.",
  },
  {
    badge: "Kategori 10",
    title: "Layanan Panggilan & Konstruksi Ringan",
    description:
      "Tersedia layanan panggilan untuk survey, pengukuran, konsultasi desain, dan pekerjaan konstruksi besi sederhana.",
    bullets: [
      "Survey dan pengukuran di lokasi",
      "Diskusi model sebelum produksi dimulai",
      "Pekerjaan custom untuk kebutuhan proyek kecil-menengah",
    ],
    note: "Mempermudah pelanggan yang ingin proses lebih pasti sebelum order dijalankan.",
  },
];

export type FeaturedService = {
  title: string;
  kicker: string;
  description: string;
  image: string;
  alt: string;
};

export const featuredServices: FeaturedService[] = [
  {
    title: "Pagar Besi Bekasi",
    kicker: "Pagar",
    description:
      "Pagar besi custom untuk rumah tinggal, ruko, dan fasad depan dengan desain rapi dan proporsional.",
    image: "/images/pagar-besi-bekasi.jpg",
    alt: "Jasa pagar besi Bekasi",
  },
  {
    title: "Kanopi Bekasi",
    kicker: "Kanopi",
    description:
      "Kanopi teras dan carport untuk rumah modern dengan struktur kokoh dan tampilan bersih.",
    image: "/images/kanopi-bekasi.jpg",
    alt: "Kanopi minimalis Bengkel Las Bekasi",
  },
  {
    title: "Stainless Steel",
    kicker: "Stainless",
    description:
      "Railing stainless dan kombinasi kaca untuk rumah yang ingin tampilan lebih modern dan ringan.",
    image: "/images/stainless-bekasi.jpg",
    alt: "Stainless steel Bekasi untuk railing tangga",
  },
  {
    title: "Tangga Putar & Tangga Besi",
    kicker: "Tangga",
    description:
      "Tangga putar dan tangga custom untuk ruang terbatas maupun konsep industrial pada rumah dua lantai.",
    image: "/images/tangga-besi-bekasi.jpg",
    alt: "Tangga besi custom Bengkel Las Bekasi",
  },
  {
    title: "Folding Gate Bekasi",
    kicker: "Folding Gate",
    description:
      "Gerbang lipat untuk kebutuhan akses lebar, area depan rumah, kios, maupun bukaan properti komersial.",
    image: "/images/folding-gate-bekasi.jpg",
    alt: "Folding gate jasa las Bekasi",
  },
  {
    title: "Pintu Besi Bekasi",
    kicker: "Pintu Besi",
    description:
      "Pintu panel besi untuk area servis, gudang, dan kebutuhan pengaman yang mengutamakan kekokohan.",
    image: "/images/pintu-besi-panel-bekasi.jpg",
    alt: "Pintu besi panel Bengkel Las Bekasi",
  },
];

export const additionalServices = [
  "Teralis jendela dan pintu",
  "Rolling door untuk toko atau garasi",
  "Gerbang dan pintu besi custom",
  "Konstruksi besi ringan",
  "Perbaikan las dan penguatan sambungan",
  "Pengecatan besi dan finishing ulang",
  "Layanan panggilan untuk survey",
  "Diskusi desain sebelum produksi",
];

export type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Kanopi modern untuk fasad rumah",
    category: "Kanopi",
    description:
      "Pengerjaan kanopi modern yang menyatu dengan fasad rumah dan tetap proporsional dari sisi tampilan.",
    image: "/images/hero-kanopi-modern.jpg",
    alt: "Kanopi rumah modern jasa las Bekasi",
  },
  {
    title: "Gerbang besi garis vertikal",
    category: "Pagar",
    description:
      "Model gerbang besi yang tegas dan bersih, cocok untuk rumah modern dengan garis fasad sederhana.",
    image: "/images/gerbang-besi-bekasi.jpg",
    alt: "Gerbang besi modern jasa las Bekasi",
  },
  {
    title: "Canopy carport bentang lebar",
    category: "Kanopi",
    description:
      "Area carport yang dibuat teduh tanpa menghilangkan kesan lega di bagian depan rumah.",
    image: "/images/kanopi-carport-bekasi.jpg",
    alt: "Kanopi carport Bengkel Las Bekasi",
  },
  {
    title: "Railing stainless kombinasi kaca",
    category: "Stainless",
    description:
      "Pekerjaan stainless steel dan kaca untuk interior rumah yang terlihat bersih dan modern.",
    image: "/images/stainless-bekasi.jpg",
    alt: "Railing stainless steel Bekasi",
  },
  {
    title: "Tangga besi custom model industrial",
    category: "Tangga",
    description:
      "Tangga besi custom dengan karakter industrial untuk kebutuhan ruang yang efisien dan kuat.",
    image: "/images/tangga-besi-bekasi.jpg",
    alt: "Tangga besi custom jasa las Bekasi",
  },
  {
    title: "Pintu panel besi area utilitas",
    category: "Pintu Besi",
    description:
      "Pintu panel besi dengan tampilan rapi untuk area servis atau akses samping bangunan.",
    image: "/images/pintu-besi-panel-bekasi.jpg",
    alt: "Pintu besi panel jasa las Bekasi",
  },
  {
    title: "Folding gate warna silver kombinasi panel",
    category: "Folding Gate",
    description:
      "Gerbang lipat dengan bukaan lebar untuk area depan bangunan yang memerlukan akses fleksibel.",
    image: "/images/folding-gate-bekasi.jpg",
    alt: "Folding gate Bengkel Las Bekasi",
  },
  {
    title: "Pagar putih dekoratif",
    category: "Pagar",
    description:
      "Pilihan pagar dekoratif dengan aksen potong motif untuk fasad yang ingin tampil lebih menonjol.",
    image: "/images/pagar-dekoratif-putih.jpg",
    alt: "Pagar dekoratif putih Bekasi",
  },
  {
    title: "Railing tangga minimalis",
    category: "Railing",
    description:
      "Railing tangga model minimalis dengan finishing hitam yang bersih untuk interior rumah.",
    image: "/images/railing-tangga-bekasi.jpg",
    alt: "Railing tangga minimalis Bengkel Las Bekasi",
  },
];

export const areas = [
  {
    name: "Bekasi",
    description:
      "Fokus utama layanan untuk kebutuhan bengkel las, pagar besi, kanopi, stainless, rolling door, dan perbaikan.",
  },
  {
    name: "Tambun",
    description:
      "Melayani survey, pengerjaan custom, dan kebutuhan renovasi rumah atau ruko di area Tambun.",
  },
  {
    name: "Cikarang",
    description:
      "Siap untuk pengerjaan proyek rumah tinggal, pintu besi, tangga, kanopi, dan bukaan area usaha.",
  },
  {
    name: "Babelan",
    description:
      "Layanan panggilan, perbaikan, dan pengerjaan las untuk area Babelan dan sekitarnya.",
  },
];

export const reviewFacts = [
  {
    tag: "Google Rating",
    title: "4.9 / 5",
    description:
      "Snapshot rating Google Maps yang Anda lampirkan menunjukkan skor 4.9. Ini kami tampilkan sebagai social proof utama, lalu pengunjung diarahkan untuk memeriksa langsung di Maps.",
  },
  {
    tag: "Review Count",
    title: "261 review",
    description:
      "Jumlah review yang terlihat pada snapshot Google Maps kami tampilkan apa adanya agar trust dibangun dari data yang bisa diverifikasi.",
  },
  {
    tag: "Verifikasi",
    title: "Lokasi dan ulasan bisa dicek real-time",
    description:
      "Pengunjung dapat membuka Google Maps untuk memeriksa lokasi usaha, membaca ulasan, dan menilai bisnis sebelum menghubungi WhatsApp.",
  },
];

export const faqs = [
  {
    question: "Bengkel las Al-Ihsan Bekasi melayani apa saja?",
    answer:
      "Kami melayani pagar, teralis, stainless steel, tangga putar, folding gate, pintu besi, rolling door, kanopi, konstruksi ringan, perbaikan, pengecatan, dan layanan panggilan.",
  },
  {
    question: "Apakah bisa survey ke lokasi?",
    answer:
      "Bisa. Untuk pekerjaan tertentu kami dapat melakukan survey ke lokasi di Bekasi, Tambun, Cikarang, Babelan, dan area sekitar.",
  },
  {
    question: "Apakah bisa custom desain sesuai rumah saya?",
    answer:
      "Bisa. Anda dapat mengirim contoh desain, foto lokasi, atau ukuran kasar lewat WhatsApp agar kami bantu arahkan model yang paling sesuai.",
  },
  {
    question: "Apakah menerima perbaikan dan pengecatan?",
    answer:
      "Ya. Bengkel Las Al-Ihsan Bekasi juga menerima perbaikan komponen besi, penguatan struktur, pengelasan ulang, dan pengecatan finishing.",
  },
  {
    question: "Bagaimana cara memesan jasa las Bekasi di sini?",
    answer:
      "Klik tombol WhatsApp, kirim kebutuhan Anda, lalu lanjutkan konsultasi ukuran, model, lokasi, dan estimasi pengerjaan bersama tim kami.",
  },
  {
    question: "Apakah saya bisa cek lokasi dan ulasan sebelum memesan?",
    answer:
      "Bisa. Gunakan tombol Google Maps pada halaman ini untuk membuka lokasi dan melihat ulasan bisnis secara langsung.",
  },
];
