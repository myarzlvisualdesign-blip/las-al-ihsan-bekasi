export type SiteStat = {
  value: number;
  label: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export const siteConfig = {
  name: "Bengkel Las Al-Ihsan Bekasi",
  siteUrl: "https://bengkellasal-ihsan.com",
  lastModified: "2026-04-18T16:50:38+07:00",
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
  areaServed: ["Bekasi", "Jakarta"],
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
    "Bengkel Las Bekasi & Jakarta",
    "Jasa Las Panggilan",
    "Google 4.9 / 261 Review",
    "Perbaikan & Pengecatan",
  ],
  stats: [
    { value: 4.9, decimals: 1, label: "rating Google" },
    { value: 261, label: "review Google" },
    { value: 2, label: "area layanan inti" },
    { value: 2, label: "nomor WhatsApp aktif" },
  ] satisfies readonly SiteStat[],
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
    "Rating Google 4.9 dengan 261 ulasan mengarah langsung ke profil Maps bisnis, sehingga ulasan, lokasi, dan reputasi usaha bisa dicek sebelum menghubungi tim.",
  badgeAlt:
    "Rating Google Maps Bengkel Las Al-Ihsan Bekasi 4.9 dari 261 review",
  capturedAt: "18 April 2026",
} as const;

export type GoogleTestimonial = {
  name: string;
  quote: string;
  avatar?: string;
  rating: number;
  source: string;
  sourceDate: string;
  headline: string;
  proofPoints: string[];
  kind?: "review" | "insight";
};

export const googleTestimonials: GoogleTestimonial[] = [
  {
    name: "Raipo Markhel",
    quote:
      "Harga rekomendasi, kualitas bagus, hasil tidak mengecewakan. Good job, Pak.",
    avatar: "/images/reviews/raipo-markhel.png",
    rating: 5,
    source: "Google Maps",
    sourceDate: "18 Apr 2026",
    headline: "Nilai utama ada di harga, kualitas, dan hasil akhir.",
    proofPoints: [
      "Harga rekomendasi",
      "Kualitas bagus",
      "Hasil tidak mengecewakan",
    ],
    kind: "review",
  },
  {
    name: "Dhaniar Prasetyorini",
    quote:
      "Terima kasih Mas Isan. Saya buat pintu kasa nyamuk untuk area Bekasi Utara.",
    avatar: "/images/reviews/dhaniar-prasetyorini.png",
    rating: 5,
    source: "Google Maps",
    sourceDate: "18 Apr 2026",
    headline: "Review spesifik untuk order pintu kasa nyamuk di Bekasi Utara.",
    proofPoints: [
      "Pintu kasa nyamuk",
      "Area Bekasi Utara",
      "Ucapan terima kasih setelah pemasangan",
    ],
    kind: "review",
  },
  {
    name: "Indah Wijaya",
    quote:
      "Saya request pasang kaca film jendela dadakan pun tetap disanggupi dengan baik.",
    avatar: "/images/reviews/indah-wijaya.png",
    rating: 5,
    source: "Google Maps",
    sourceDate: "18 Apr 2026",
    headline: "Respons cepat tetap terasa meski kebutuhan masuk mendadak.",
    proofPoints: [
      "Pasang kaca film jendela",
      "Request dadakan",
      "Tetap disanggupi dengan baik",
    ],
    kind: "review",
  },
] as const;

export const trustSignals = [
  {
    title: "Identitas bisnis mudah diverifikasi",
    description:
      "Nama usaha, WhatsApp, Google Maps, Instagram, dan TikTok tampil konsisten sehingga identitas bisnis mudah dicek sebelum order.",
  },
  {
    title: "Portfolio menampilkan hasil kerja nyata",
    description:
      "Foto yang tampil berasal dari pekerjaan lapangan Bengkel Las Al-Ihsan Bekasi, bukan stok template atau mockup generik.",
  },
  {
    title: "CTA diarahkan ke jalur closing tercepat",
    description:
      "Setiap halaman mengarah ke WhatsApp supaya konsultasi bisa langsung lanjut dengan foto lokasi, ukuran kasar, dan kebutuhan awal.",
  },
  {
    title: "Fokus lokal Bekasi dan Jakarta",
    description:
      "Konten difokuskan untuk Bekasi dan Jakarta agar lebih relevan untuk pencarian jasa las terdekat.",
  },
];

export const valueProps = [
  {
    title: "Tampilan lebih serius untuk closing",
    description:
      "Informasi utama langsung terbaca seperti company profile ringkas saat pelanggan membandingkan vendor.",
  },
  {
    title: "Scope pekerjaan langsung terbaca",
    description:
      "Kategori layanan membantu pelanggan cepat melihat apakah kebutuhannya masuk ke pagar, kanopi, stainless, atau perbaikan.",
  },
  {
    title: "Cuplikan pelanggan asli dari Google Maps",
    description:
      "Bagian ulasan memakai cuplikan pelanggan asli yang tampil publik di Google Maps, lengkap dengan jalur verifikasi langsung ke profil bisnis.",
  },
  {
    title: "Setiap topik punya halaman sendiri",
    description:
      "Layanan, portfolio, tentang, ulasan, FAQ, dan lokasi dipisah ke halaman sendiri untuk pengalaman mobile yang lebih nyaman.",
  },
  {
    title: "Branding merah-biru lebih tegas",
    description:
      "Palet visual yang tegas membuat merek terasa lebih kokoh, mudah dikenali, dan konsisten dengan karakter Al-Ihsan.",
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
    title: "Kategori layanan mudah dipilih",
    description:
      "Pagar, kanopi, stainless, tangga, rolling door, dan perbaikan tersusun per kategori sehingga kebutuhan cepat terarah.",
  },
  {
    tag: "03",
    title: "Identitas usaha mudah diverifikasi",
    description:
      "Google Maps, rating, alamat, nomor aktif, dan sosial media resmi tersedia sebelum Anda booking.",
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
      "Model sliding gate dengan kombinasi warna tegas untuk rumah yang ingin keamanan dan tampilan fasad lebih modern.",
    image: "/images/pagar-sliding-oranye-abu.jpg",
    alt: "Pagar sliding rumah jasa las Bekasi",
  },
  {
    title: "Kanopi Bekasi",
    kicker: "Kanopi",
    description:
      "Kanopi rumah minimalis dengan garis atap yang rapi untuk teras dan area depan bangunan.",
    image: "/images/kanopi-rumah-minimalis.jpg",
    alt: "Kanopi rumah minimalis Bengkel Las Bekasi",
  },
  {
    title: "Railing Stainless & Kaca",
    kicker: "Stainless",
    description:
      "Railing tangga stainless dengan panel kaca untuk interior rumah yang ingin terlihat bersih dan premium.",
    image: "/images/tangga-kaca-stainless.jpg",
    alt: "Railing tangga stainless dan kaca Bekasi",
  },
  {
    title: "Tangga Besi Industrial",
    kicker: "Tangga",
    description:
      "Tangga besi dengan karakter industrial untuk ruang sempit maupun area mezzanine yang butuh solusi kuat.",
    image: "/images/tangga-besi-hitam-industrial.jpg",
    alt: "Tangga besi industrial Bengkel Las Bekasi",
  },
  {
    title: "Pintu Custom Motif",
    kicker: "Pintu Besi",
    description:
      "Pintu besi custom dengan potongan motif untuk proyek yang ingin tampil lebih unik dan punya karakter kuat.",
    image: "/images/pintu-custom-motif-macan.jpg",
    alt: "Pintu besi custom motif Bengkel Las Bekasi",
  },
  {
    title: "Pintu Panel Besi Bekasi",
    kicker: "Pintu Besi",
    description:
      "Pintu besi panel dengan kombinasi bidang lebar yang cocok untuk area servis, garasi, dan akses samping bangunan.",
    image: "/images/pintu-besi-panel-wood.jpg",
    alt: "Pintu panel besi Bekasi",
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

export type DocumentationMedia = {
  type: "image" | "video";
  title: string;
  category: string;
  description: string;
  src: string;
  alt: string;
  poster?: string;
  durationSeconds?: number;
};

export const documentationMedia: DocumentationMedia[] = [
  {
    type: "image",
    title: "Kanopi carport rumah dengan garis fasad rapi",
    category: "Kanopi",
    description:
      "Dokumentasi lapangan untuk carport rumah tinggal dengan struktur teduh yang tetap terlihat bersih dari arah depan rumah.",
    src: "/images/dokumentasi/kanopi-carport-rumah.jpg",
    alt: "Dokumentasi asli kanopi carport rumah Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Kanopi kaca area void dan samping rumah",
    category: "Kanopi",
    description:
      "Contoh pengerjaan kanopi kaca dengan rangka rapi untuk area atas void atau teras samping bangunan.",
    src: "/images/dokumentasi/kanopi-kaca-void.jpg",
    alt: "Dokumentasi asli kanopi kaca area void Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Railing tangga proyek saat proses finishing",
    category: "Railing",
    description:
      "Foto asli proses pengerjaan railing tangga di dalam rumah untuk menunjukkan detail kerja lapangan, bukan render.",
    src: "/images/dokumentasi/railing-tangga-proyek.jpg",
    alt: "Dokumentasi asli railing tangga proyek Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Pintu kaca rangka besi untuk akses samping",
    category: "Pintu Besi",
    description:
      "Pintu rangka besi kombinasi kaca yang dipasang pada area akses rumah dengan komposisi panel yang rapi.",
    src: "/images/dokumentasi/pintu-kaca-besi.jpg",
    alt: "Dokumentasi asli pintu kaca rangka besi Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Pintu besi minimalis untuk area dalam rumah",
    category: "Pintu Besi",
    description:
      "Dokumentasi pemasangan pintu besi minimalis dengan panel tegas untuk akses dalam rumah atau area servis.",
    src: "/images/dokumentasi/pintu-besi-minimalis-proyek.jpg",
    alt: "Dokumentasi asli pintu besi minimalis Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Railing rooftop dan tangga akses ke atas",
    category: "Railing",
    description:
      "Pekerjaan railing rooftop dengan tangga akses untuk area atas rumah yang butuh keamanan dan akses perawatan.",
    src: "/images/dokumentasi/railing-rooftop-ladder.jpg",
    alt: "Dokumentasi asli railing rooftop Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Pagar putih kombinasi panel motif kayu",
    category: "Pagar",
    description:
      "Contoh pagar panel rumah dengan komposisi warna putih dan aksen kayu untuk tampilan depan yang lebih bersih.",
    src: "/images/dokumentasi/pagar-putih-panel-kayu.jpg",
    alt: "Dokumentasi asli pagar putih panel kayu Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Railing tangga industrial dengan mesh besi",
    category: "Tangga",
    description:
      "Dokumentasi railing tangga model industrial berbasis mesh besi untuk rumah bertingkat dengan karakter tegas.",
    src: "/images/dokumentasi/railing-tangga-industrial-mesh.jpg",
    alt: "Dokumentasi asli railing tangga industrial Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Gerbang laser cut putih dengan motif daun dekoratif",
    category: "Pagar",
    description:
      "Pagar putih motif laser cut untuk rumah modern yang ingin tampilan depan tetap bersih, terang, dan terlihat premium.",
    src: "/images/dokumentasi/gerbang-laser-cut-monstera-putih.jpg",
    alt: "Gerbang laser cut putih motif daun Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Kanopi carport modern untuk rumah lebar depan",
    category: "Kanopi",
    description:
      "Dokumentasi kanopi carport modern dengan bentang lebar untuk rumah tinggal yang membutuhkan area parkir lebih teduh dan rapi.",
    src: "/images/dokumentasi/kanopi-carport-modern-bekasi.jpg",
    alt: "Kanopi carport modern Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Railing balkon putih dengan panel dekoratif",
    category: "Railing",
    description:
      "Contoh railing balkon dan panel samping rumah dengan potongan dekoratif untuk area fasad yang ingin tetap aman tetapi tidak terlihat polos.",
    src: "/images/dokumentasi/railing-balkon-laser-cut-putih.jpg",
    alt: "Railing balkon laser cut putih Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Railing tangga rumah dengan handrail nuansa kayu",
    category: "Tangga",
    description:
      "Railing tangga rumah dengan besi hitam dan handrail warna kayu untuk interior yang ingin tetap hangat namun kokoh.",
    src: "/images/dokumentasi/railing-tangga-rumah-kayu.jpg",
    alt: "Railing tangga rumah handrail kayu Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Pintu teralis geometris untuk akses utama rumah",
    category: "Pintu Besi",
    description:
      "Pintu teralis geometris untuk area masuk rumah dengan komposisi garis yang rapi agar keamanan tetap terjaga tanpa menutup cahaya.",
    src: "/images/dokumentasi/pintu-teralis-geometris-rumah.jpg",
    alt: "Pintu teralis geometris rumah Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Pagar bilah putih saat tahap pemasangan proyek",
    category: "Pagar",
    description:
      "Dokumentasi proses pemasangan pagar bilah putih untuk menunjukkan bahwa tim juga mengerjakan model minimalis yang tegas dan fungsional.",
    src: "/images/dokumentasi/pagar-bilah-putih-proyek.jpg",
    alt: "Pagar bilah putih proyek Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Gerbang geometrik hitam untuk fasad rumah modern",
    category: "Pagar",
    description:
      "Gerbang besi hitam berpola geometrik untuk rumah modern yang ingin tampilan depan tetap tegas, rapi, dan terlihat premium.",
    src: "/images/dokumentasi/gerbang-geometrik-hitam-rumah.jpg",
    alt: "Gerbang geometrik hitam rumah Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Gerbang laser cut putih dengan panel dekoratif tegas",
    category: "Pagar",
    description:
      "Contoh gerbang putih dengan panel laser cut dekoratif yang cocok untuk fasad rumah agar terlihat bersih tanpa terasa polos.",
    src: "/images/dokumentasi/gerbang-laser-cut-putih.jpg",
    alt: "Gerbang laser cut putih dekoratif Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Pagar proyek lapangan saat tahap fabrikasi dan pemasangan",
    category: "Pagar",
    description:
      "Dokumentasi lapangan yang menunjukkan skala kerja tim saat pagar sedang dikerjakan langsung di lokasi proyek.",
    src: "/images/dokumentasi/pagar-lapangan.jpg",
    alt: "Pagar proyek lapangan Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Proses kanopi rumah baru saat rangka mulai terpasang",
    category: "Kanopi",
    description:
      "Foto asli tahap pemasangan kanopi rumah baru untuk memperlihatkan progres kerja, skala bentang, dan kondisi lapangan.",
    src: "/images/dokumentasi/proses-kanopi-rumah-baru.jpg",
    alt: "Proses pemasangan kanopi rumah baru Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "image",
    title: "Teralis pintu minimalis untuk akses masuk rumah",
    category: "Teralis",
    description:
      "Teralis pintu minimalis dengan garis sederhana untuk kebutuhan pengaman tambahan yang tetap terasa ringan dilihat.",
    src: "/images/dokumentasi/teralis-pintu-minimalis.jpg",
    alt: "Teralis pintu minimalis Bengkel Las Al-Ihsan Bekasi",
  },
  {
    type: "video",
    title: "Video detail panel laser cut putih",
    category: "Video Lapangan",
    description:
      "Video pendek yang menampilkan detail panel laser cut dekoratif dari proyek asli Bengkel Las Al-Ihsan Bekasi.",
    src: "/videos/dokumentasi/panel-laser-cut.mp4",
    poster: "/images/dokumentasi/panel-laser-cut-poster.jpg",
    alt: "Video dokumentasi panel laser cut putih Bengkel Las Al-Ihsan Bekasi",
    durationSeconds: 12,
  },
  {
    type: "video",
    title: "Video sliding gate saat pengerjaan lapangan",
    category: "Video Lapangan",
    description:
      "Video proses lapangan saat sliding gate sedang dikerjakan untuk menunjukkan skala pekerjaan dan detail finishing.",
    src: "/videos/dokumentasi/sliding-gate-lapangan.mp4",
    poster: "/images/dokumentasi/sliding-gate-lapangan-poster.jpg",
    alt: "Video dokumentasi sliding gate lapangan Bengkel Las Al-Ihsan Bekasi",
    durationSeconds: 20,
  },
  {
    type: "video",
    title: "Video ornamen pagar dinding rumah",
    category: "Video Lapangan",
    description:
      "Video proyek ornamen pagar dinding rumah untuk menunjukkan detail pola besi dan finishing lapangan.",
    src: "/videos/dokumentasi/ornamen-pagar-dinding.mp4",
    poster: "/images/dokumentasi/ornamen-pagar-dinding-poster.jpg",
    alt: "Video dokumentasi ornamen pagar dinding Bengkel Las Al-Ihsan Bekasi",
    durationSeconds: 19,
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Gerbang laser cut putih dekoratif",
    category: "Pagar",
    description:
      "Gerbang putih dengan panel dekoratif untuk rumah yang ingin keamanan tetap berjalan tanpa tampilan depan terasa berat.",
    image: "/images/dokumentasi/gerbang-laser-cut-putih.jpg",
    alt: "Gerbang laser cut putih dekoratif Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Teralis pintu dan jendela model minimalis",
    category: "Teralis",
    description:
      "Dokumentasi teralis pintu dan jendela dengan garis geometris sederhana untuk area rumah yang membutuhkan pengaman tambahan.",
    image: "/images/dokumentasi/teralis-pintu-minimalis.jpg",
    alt: "Teralis pintu minimalis Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Pagar proyek lapangan saat tahap fabrikasi",
    category: "Pagar",
    description:
      "Foto proses pengerjaan pagar di lokasi untuk memperlihatkan skala kerja tim saat fabrikasi dan pemasangan berlangsung.",
    image: "/images/dokumentasi/pagar-lapangan.jpg",
    alt: "Pagar proyek lapangan Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Pagar putih panel rumah dengan aksen kayu",
    category: "Pagar",
    description:
      "Model pagar rumah dengan bidang panel tegas dan aksen kayu untuk fasad yang terlihat bersih namun tetap kokoh.",
    image: "/images/dokumentasi/pagar-putih-panel-kayu.jpg",
    alt: "Pagar putih panel kayu Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Tangga stainless kaca interior",
    category: "Stainless",
    description:
      "Railing stainless kombinasi kaca untuk interior rumah yang butuh hasil lebih bersih, presisi, dan modern.",
    image: "/images/tangga-kaca-stainless.jpg",
    alt: "Tangga stainless kaca interior Bekasi",
  },
  {
    title: "Tangga besi hitam model industrial",
    category: "Tangga",
    description:
      "Tangga besi custom dengan garis tegas untuk rumah bertingkat yang membutuhkan solusi kuat dan hemat ruang.",
    image: "/images/tangga-besi-hitam-industrial.jpg",
    alt: "Tangga besi hitam industrial Bekasi",
  },
  {
    title: "Railing tangga industrial dengan mesh",
    category: "Tangga",
    description:
      "Railing besi industrial dengan panel mesh untuk interior rumah bertingkat yang ingin terlihat kokoh dan modern.",
    image: "/images/dokumentasi/railing-tangga-industrial-mesh.jpg",
    alt: "Railing tangga industrial mesh Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Pintu custom motif artistik",
    category: "Pintu Besi",
    description:
      "Pintu custom dengan potongan motif artistik untuk kebutuhan proyek yang ingin tampil lebih unik dan berkarakter.",
    image: "/images/pintu-custom-motif-macan.jpg",
    alt: "Pintu custom motif besi Bekasi",
  },
  {
    title: "Pintu panel besi kombinasi bidang besar",
    category: "Pintu Besi",
    description:
      "Pintu panel besi dengan komposisi bidang tegas untuk akses servis, garasi, atau area samping bangunan.",
    image: "/images/pintu-besi-panel-wood.jpg",
    alt: "Pintu panel besi besar Bekasi",
  },
  {
    title: "Pintu besi minimalis proyek rumah",
    category: "Pintu Besi",
    description:
      "Pintu besi minimalis dengan panel sederhana untuk akses dalam rumah, area servis, atau ruang tambahan.",
    image: "/images/dokumentasi/pintu-besi-minimalis-proyek.jpg",
    alt: "Pintu besi minimalis proyek Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Gerbang hitam ornamental untuk carport",
    category: "Pagar",
    description:
      "Gerbang hitam dengan pola ornamental yang cocok untuk area carport dan rumah modern dengan fasad tegas.",
    image: "/images/gerbang-hitam-ornamental.jpg",
    alt: "Gerbang hitam ornamental Bekasi",
  },
  {
    title: "Panel railing floral untuk balkon",
    category: "Railing",
    description:
      "Panel railing dengan motif floral untuk detail balkon atau teras yang ingin terlihat lebih dekoratif.",
    image: "/images/panel-railing-floral.jpg",
    alt: "Panel railing floral Bengkel Las Bekasi",
  },
  {
    title: "Railing rooftop dengan tangga servis",
    category: "Railing",
    description:
      "Railing rooftop dengan tangga servis untuk akses ke area atas bangunan yang butuh pengaman tambahan.",
    image: "/images/dokumentasi/railing-rooftop-ladder.jpg",
    alt: "Railing rooftop dan tangga servis Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Gerbang laser cut putih motif daun",
    category: "Pagar",
    description:
      "Gerbang putih laser cut dengan nuansa dekoratif yang cocok untuk rumah modern yang ingin terlihat bersih tetapi tetap punya karakter.",
    image: "/images/dokumentasi/gerbang-laser-cut-monstera-putih.jpg",
    alt: "Gerbang laser cut putih motif daun Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Gerbang geometrik hitam untuk fasad modern",
    category: "Pagar",
    description:
      "Gerbang hitam berpola geometrik untuk tampilan depan rumah yang lebih tegas, rapi, dan meyakinkan sejak pandangan pertama.",
    image: "/images/dokumentasi/gerbang-geometrik-hitam-rumah.jpg",
    alt: "Gerbang geometrik hitam rumah Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Kanopi carport modern bentang lebar",
    category: "Kanopi",
    description:
      "Kanopi carport rumah tinggal dengan bentang lebar untuk kebutuhan parkir harian yang tetap terlihat bersih dan proporsional.",
    image: "/images/dokumentasi/kanopi-carport-modern-bekasi.jpg",
    alt: "Kanopi carport modern bentang lebar Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Proses kanopi rumah baru saat pemasangan",
    category: "Kanopi",
    description:
      "Dokumentasi proses pemasangan kanopi rumah baru untuk menunjukkan tahap kerja lapangan, rangka, dan skala proyek secara nyata.",
    image: "/images/dokumentasi/proses-kanopi-rumah-baru.jpg",
    alt: "Proses pemasangan kanopi rumah baru Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Railing balkon laser cut putih",
    category: "Railing",
    description:
      "Railing balkon dengan panel dekoratif putih untuk rumah yang membutuhkan pengaman lantai atas tanpa mengorbankan estetika fasad.",
    image: "/images/dokumentasi/railing-balkon-laser-cut-putih.jpg",
    alt: "Railing balkon laser cut putih Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Railing tangga rumah dengan handrail kayu",
    category: "Tangga",
    description:
      "Railing tangga rumah dengan kombinasi besi hitam dan handrail warna kayu untuk hasil yang terasa hangat sekaligus kokoh.",
    image: "/images/dokumentasi/railing-tangga-rumah-kayu.jpg",
    alt: "Railing tangga handrail kayu Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Pintu teralis geometris untuk area masuk rumah",
    category: "Pintu Besi",
    description:
      "Pintu teralis geometris yang menjaga sirkulasi cahaya dan udara, sekaligus memberi lapisan pengaman tambahan di area masuk rumah.",
    image: "/images/dokumentasi/pintu-teralis-geometris-rumah.jpg",
    alt: "Pintu teralis geometris area masuk rumah Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Pagar bilah putih model minimalis",
    category: "Pagar",
    description:
      "Pagar bilah putih dengan karakter minimalis untuk rumah yang mengutamakan garis bersih, privasi, dan tampilan depan yang lebih rapi.",
    image: "/images/dokumentasi/pagar-bilah-putih-proyek.jpg",
    alt: "Pagar bilah putih minimalis Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Pagar rumah kombinasi kisi dan aksen kayu",
    category: "Pagar",
    description:
      "Model pagar rumah dengan kisi atas dan aksen kayu yang terasa modern serta cocok untuk fasad hunian dua lantai.",
    image: "/images/dokumentasi/pagar-putih-panel-kayu.jpg",
    alt: "Pagar kombinasi kisi dan panel kayu Bengkel Las Al-Ihsan Bekasi",
  },
  {
    title: "Kanopi carport Bekasi untuk rumah tinggal",
    category: "Kanopi",
    description:
      "Portfolio kanopi carport rumah tinggal yang dirancang untuk kebutuhan teduh harian, tampilan depan rapi, dan struktur yang proporsional.",
    image: "/images/kanopi-carport-bekasi.jpg",
    alt: "Kanopi carport rumah tinggal Bekasi",
  },
  {
    title: "Pintu besi pengaman untuk rumah dan servis",
    category: "Pintu Besi",
    description:
      "Pintu besi pengaman untuk area samping rumah, ruang servis, atau akses tambahan yang membutuhkan struktur lebih kokoh.",
    image: "/images/pintu-besi-bekasi.jpg",
    alt: "Pintu besi pengaman rumah Bekasi",
  },
  {
    title: "Folding gate untuk toko dan bukaan usaha",
    category: "Folding Gate",
    description:
      "Folding gate yang cocok untuk area usaha, garasi, atau bukaan lebar yang membutuhkan sistem aman dan praktis dipakai harian.",
    image: "/images/folding-gate-bekasi.jpg",
    alt: "Folding gate toko dan usaha Bekasi",
  },
];

export const areas = [
  {
    name: "Bekasi",
    description:
      "Fokus utama layanan untuk kebutuhan bengkel las, pagar besi, kanopi, stainless, rolling door, dan perbaikan di area rumah maupun usaha.",
  },
  {
    name: "Jakarta",
    description:
      "Melayani kebutuhan proyek rumah, ruko, pagar, kanopi, railing, dan pekerjaan custom untuk area Jakarta sesuai titik pengerjaan.",
  },
];

export const reviewFacts = [
  {
    tag: "Google Rating",
    title: "4.9 / 5",
    description:
      "Skor rating Google tampil sebagai rujukan utama dan mengarah langsung ke profil Maps bisnis.",
  },
  {
    tag: "Review Count",
    title: "261 review",
    description:
      "Jumlah ulasan ditampilkan sesuai data Google Maps agar reputasi bisnis bisa dicek dengan lebih yakin.",
  },
  {
    tag: "Verifikasi",
    title: "Cuplikan review dan profil bisnis bisa dicek langsung",
    description:
      "Pengunjung dapat membuka Google Maps untuk memeriksa lokasi usaha, membaca ulasan lengkap, dan menilai bisnis sebelum menghubungi WhatsApp.",
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
      "Bisa. Untuk pekerjaan tertentu kami dapat melakukan survey ke lokasi di Bekasi, Jakarta, dan area sekitar sesuai kebutuhan proyek.",
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
