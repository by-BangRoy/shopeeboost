import React from 'react';
import {
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Star,
  Video,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Award
} from 'lucide-react';

export const AlgorithmGuideView: React.FC = () => {
  const rankingFactors = [
    {
      factor: '1. Click-Through Rate (CTR) Foto & Judul',
      weight: 'Bobot: 35% (Sangat Tinggi)',
      icon: <Sparkles className="w-5 h-5 text-[#EE4D2D]" />,
      summary: 'Algoritma Shopee mencatat rasio klik setiap kali produk Anda muncul di halaman pencarian.',
      tips: [
        'Gunakan foto cover beresolusi 1:1 tajam dengan teks benefit singkat (maks 3-4 kata) seperti "Bisa COD" atau "Bahan Adem".',
        'Gunakan Formula Judul Shopee Resmi: [Merek] + [Kategori] + [Kata Kunci Utama] + [Fitur] + [Varian].',
        'Taruh kata kunci dengan pencarian tertinggi di 40 karakter pertama judul agar terbaca penuh di layar smartphone.',
      ],
    },
    {
      factor: '2. Kecepatan Balas Chat & Performa Toko',
      weight: 'Bobot: 20% (Tinggi)',
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
      summary: 'Toko dengan respon chat di bawah 75% akan secara otomatis diturunkan peringkatnya oleh algoritma.',
      tips: [
        'Pertahankan Persentase Chat Dibalas minimal di atas 85% - 90% (syarat Star Seller).',
        'Gunakan fitur FAQ Asisten Chat Shopee untuk membalas pesan instan dalam hitungan detik.',
        'Jangan pernah membiarkan chat pelanggan tidak dibalas lebih dari 12 jam.',
      ],
    },
    {
      factor: '3. Tingkat Konversi (CVR) & Pesanan Selesai',
      weight: 'Bobot: 25% (Tinggi)',
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
      summary: 'Produk yang sering diklik DAN dibeli hingga pesanan selesai akan diutamakan masuk Halaman 1 (Page 1).',
      tips: [
        'Pasang Diskon Coret minimal 30% - 50% untuk menciptakan persepsi harga hemat.',
        'Aktifkan Voucher Ikuti Toko & Kombo Hemat untuk menaikkan keranjang belanja.',
        'Pastikan stok selalu tersedia dan hindari pembatalan pesanan karena stok kosong.',
      ],
    },
    {
      factor: '4. Sinyal Shopee Video & Shopee Live',
      weight: 'Bobot: 15% (Tren Terbesar 2026)',
      icon: <Video className="w-5 h-5 text-purple-500" />,
      summary: 'Shopee memberikan subsidi diskon voucher besar untuk produk yang aktif di Shopee Video & Live.',
      tips: [
        'Unggah video unboxing/pemakaian produk berdurasi 15-30 detik ke Shopee Video.',
        'Tautkan keranjang kuning produk Anda di Shopee Video untuk mendapatkan traffic gratis dari feed video.',
        'Lakukan siaran Shopee Live minimal 1-2 jam saat jam ramai (12:00 - 13:00 dan 19:00 - 21:00).',
      ],
    },
    {
      factor: '5. Partisipasi Program Gratis Ongkir XTRA & Star Seller',
      weight: 'Bobot: 10% (Katalog Filter)',
      icon: <Truck className="w-5 h-5 text-amber-500" />,
      summary: 'Lebih dari 78% pengguna Shopee Indonesia mencentang filter "Gratis Ongkir XTRA" saat mencari barang.',
      tips: [
        'Wajib daftar program Gratis Ongkir XTRA agar produk Anda tidak lenyap saat pembeli memfilter pencarian.',
        'Kejar status Star Seller dengan menjaga poin penalti 0 dan pesanan minimal 100/bulan.',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-linear-to-r from-gray-900 via-gray-800 to-black text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black">
              Rahasia Algoritma Pencarian Shopee Indonesia 2026
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Panduan lengkap prinsip ranking mesin pencari Shopee untuk mendominasi Halaman 1 tanpa harus banting harga.
            </p>
          </div>
        </div>
      </div>

      {/* 5 Ranking Factors */}
      <div className="space-y-4">
        {rankingFactors.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">{item.factor}</h3>
                  <p className="text-xs text-gray-500">{item.summary}</p>
                </div>
              </div>
              <span className="text-xs font-bold bg-orange-50 text-[#EE4D2D] px-2.5 py-1 rounded-full border border-orange-200">
                {item.weight}
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
                Strategi Praktis Top Seller:
              </span>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {item.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Red Flag Warning Box */}
      <div className="bg-rose-50 rounded-2xl border border-rose-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <h3 className="font-bold text-rose-950 text-sm sm:text-base">
            Hal-Hal yang Bikin Produk Tenggelam / Dihukum Shopee
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
          <div className="p-3 bg-white rounded-xl border border-rose-200">
            <span className="font-bold text-rose-700 block mb-1">❌ Keyword Spamming Berlebihan</span>
            <p>Memasukkan kata kunci berulang tanpa arti (contoh: "gamis murah gamis wanita gamis pesta gamis terbaru").</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-rose-200">
            <span className="font-bold text-rose-700 block mb-1">❌ Ajakan Transaksi Luar Shopee</span>
            <p>Menuliskan nomor WhatsApp, link Instagram, atau ajakan transfer manual pada gambar atau deskripsi.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-rose-200">
            <span className="font-bold text-rose-700 block mb-1">❌ Klaim Medis / Superlatif Palsu</span>
            <p>Menggunakan kata "Paling Murah Sedunia", "Nomor 1", atau klaim medis yang tidak disetujui BPOM.</p>
          </div>
          <div className="p-3 bg-white rounded-xl border border-rose-200">
            <span className="font-bold text-rose-700 block mb-1">❌ Foto Blur & Banyak Watermark</span>
            <p>Foto produk buram dan tertutup logo besar yang menutupi bentuk asli barang.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
