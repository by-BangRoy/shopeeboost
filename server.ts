import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client setup following official AI Studio system instructions
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for cleaning JSON markdown code fences
function cleanJsonText(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

// 1. API: Optimasi Lengkap Produk Shopee (Judul SEO, Kata Kunci, Deskripsi, Strategi Harga & Visual)
app.post('/api/optimize', async (req: Request, res: Response) => {
  try {
    const {
      productName,
      brand = 'No Brand',
      category = 'Umum',
      sellingPoints = '',
      targetAudience = '',
      tone = 'persuasif',
      targetPrice = 0,
      currentTitle = '',
      currentDescription = '',
    } = req.body;

    if (!productName || typeof productName !== 'string' || !productName.trim()) {
      return res.status(400).json({ error: 'Nama produk wajib diisi' });
    }

    const prompt = `Anda adalah Spesialis Algoritma SEO & Optimasi Konversi Marketplace Shopee Indonesia level Top Seller & Official Store.
Tugas Anda adalah membuat optimasi produk komprehensif agar produk mendapatkan PERINGKAT TERTINGGI (Page 1) di mesin pencari Shopee dan KONVERSI PENJUALAN TINGGI (CTR & CVR) otomatis.

Data Produk:
- Nama Produk: "${productName.trim()}"
- Merek: "${brand || 'No Brand'}"
- Kategori Shopee: "${category || 'Sesuai Produk'}"
- Keunggulan Utama/Fitur: "${sellingPoints || 'Kualitas premium, awet, nyaman digunakan'}"
- Target Pembeli: "${targetAudience || 'Pengguna Shopee Indonesia'}"
- Nada Gaya Bahasa: "${tone}" (opsi: persuasif, santai_ramah, profesional_resmi, urgensi_promo)
- Harga Jual Target: Rp ${targetPrice ? Number(targetPrice).toLocaleString('id-ID') : 'Sesuai Pasar'}
${currentTitle ? `- Judul Saat Ini (untuk evaluasi/ditingkatkan): "${currentTitle}"` : ''}
${currentDescription ? `- Deskripsi Saat Ini: "${currentDescription}"` : ''}

Peraturan Ketat Algoritma Shopee:
1. FORMULA JUDUL SHOPEE TERBAIK: [Merek] + [Kategori / Tipe Produk] + [Kata Kunci Utama Volume Tinggi] + [Fitur Unik / Spesifikasi] + [Varian / Warna / Model]
2. Panjang karakter judul optimal: 80 - 140 karakter (sangat terbaca di aplikasi Shopee Mobile & Search Snippet). Jangan melebihi 200 karakter.
3. HINDARI: Keyword stuffing spam berulang, kata-kata ilegal/terlarang (misal: "Termurah Se-Dunia", nomor HP/WA, merek palsu).
4. DESKRIPSI: Mobile-first, gunakan bullet points rapi, ada Hook emosional, 5 Keunggulan, Spesifikasi Lengkap, Garansi Toko, dan Call to Action kuat.
5. KATA KUNCI: Harus mencakup kata kunci bervolume tinggi, long-tail dengan konversi tinggi, serta rekomendasi bid Shopee Iklan Pencarian.

Berikan output HANYA dalam format JSON valid sesuai skema berikut:
{
  "productSummary": "Ringkasan analisis optimasi produk ini",
  "titles": [
    {
      "type": "seo_rank",
      "label": "Formula Ranking SEO #1 (Algoritma Shopee)",
      "title": "Judul lengkap...",
      "charCount": 115,
      "score": 98,
      "formulaBreakdown": {
        "brand": "...",
        "category": "...",
        "primaryKeyword": "...",
        "feature": "...",
        "specOrVariant": "..."
      },
      "explanation": "Alasan judul ini mudah masuk halaman pertama pencarian Shopee"
    },
    {
      "type": "ctr_magnet",
      "label": "Formula Magnet Klik & Promo (Tinggi CTR)",
      "title": "Judul lengkap...",
      "charCount": 110,
      "score": 95,
      "formulaBreakdown": {
        "brand": "...",
        "category": "...",
        "primaryKeyword": "...",
        "feature": "...",
        "specOrVariant": "..."
      },
      "explanation": "Memicu rasa penasaran dan keinginan klik pembeli saat scrolling"
    },
    {
      "type": "shopee_mall",
      "label": "Formula Shopee Mall / Official Store Style",
      "title": "Judul lengkap...",
      "charCount": 98,
      "score": 94,
      "formulaBreakdown": {
        "brand": "...",
        "category": "...",
        "primaryKeyword": "...",
        "feature": "...",
        "specOrVariant": "..."
      },
      "explanation": "Kesan elegan, mewah, terpercaya, dan bebas klaim murahan"
    },
    {
      "type": "long_tail",
      "label": "Formula Niche & Long-Tail (Toko Baru / Persaingan Rendah)",
      "title": "Judul lengkap...",
      "charCount": 120,
      "score": 92,
      "formulaBreakdown": {
        "brand": "...",
        "category": "...",
        "primaryKeyword": "...",
        "feature": "...",
        "specOrVariant": "..."
      },
      "explanation": "Target kata kunci spesifik dengan konversi beli tinggi tanpa harus perang harga"
    }
  ],
  "keywords": {
    "highVolume": ["kata kunci 1", "kata kunci 2", "kata kunci 3", "kata kunci 4", "kata kunci 5"],
    "longTail": ["kata kunci spesifik 1", "kata kunci spesifik 2", "kata kunci spesifik 3", "kata kunci spesifik 4"],
    "seasonalOrTrending": ["tren 1", "tren 2", "tren 3"],
    "hashtagTags": "#tag1 #tag2 #tag3 #tag4 #tag5 #tag6 #tag7 #tag8 #tag9 #tag10",
    "shopeeAdsTips": [
      {
        "keyword": "kata kunci iklan",
        "matchType": "Pencocokan Luas / Spesifik",
        "bidEstimate": "Rp 250 - Rp 450",
        "competition": "Sedang",
        "strategy": "Tips pasang iklan untuk kata kunci ini"
      },
      {
        "keyword": "kata kunci iklan 2",
        "matchType": "Pencocokan Spesifik",
        "bidEstimate": "Rp 200 - Rp 350",
        "competition": "Rendah",
        "strategy": "Tips pasang iklan untuk kata kunci ini"
      },
      {
        "keyword": "kata kunci iklan 3",
        "matchType": "Pencocokan Luas",
        "bidEstimate": "Rp 400 - Rp 650",
        "competition": "Tinggi",
        "strategy": "Tips pasang iklan untuk kata kunci ini"
      }
    ]
  },
  "description": {
    "fullText": "Teks deskripsi lengkap siap copy-paste langsung ke Shopee Seller Centre...",
    "sections": {
      "hook": "Paragraf pembuka memikat perhatian calon pembeli",
      "keyBenefits": ["Keunggulan 1 dengan penjelasan", "Keunggulan 2", "Keunggulan 3", "Keunggulan 4"],
      "specifications": "Detail spesifikasi material, ukuran, warna, isi paket",
      "sizeOrUsageGuide": "Panduan ukuran atau petunjuk pemakaian",
      "guaranteeAndShipping": "Kebijakan garansi retur jika rusak/salah kirim & pengiriman cepat",
      "callToAction": "Kalimat ajakan beli sekarang mumpung voucher masih aktif"
    }
  },
  "visualOptimization": {
    "coverPhotoStrategy": "Panduan gambar utama slot #1 (background putih/kontras, badge promo tidak menutupi produk, resolusi 1:1 min 1024x1024)",
    "photoSlots": [
      { "slot": 1, "name": "Foto Utama (Cover)", "focus": "Sudut terbaik produk + teks benefit singkat 3-4 kata + badge garansi", "importance": "Wajib (Mempengaruhi 80% CTR)" },
      { "slot": 2, "name": "Detail Material & Tekstur", "focus": "Foto zoom close-up serat bahan/kualitas jahitan/finishing", "importance": "Membangun kepercayaan" },
      { "slot": 3, "name": "Variasi Warna / Model", "focus": "Kompilasi semua opsi warna/varian berjejer rapi", "importance": "Memudahkan pilihan pembeli" },
      { "slot": 4, "name": "Tabel Ukuran / Dimensi", "focus": "Infografis Size Chart jelas dengan berat/tinggi badan rujukan", "importance": "Menurunkan retur barang" },
      { "slot": 5, "name": "Foto Penggunaan / Real Pic", "focus": "Foto saat dipakai model atau foto di lingkungan nyata", "importance": "Meningkatkan daya tarik emosional" },
      { "slot": 6, "name": "Isi Paket & Packaging", "focus": "Kelengkapan dalam box / bubble wrap aman", "importance": "Menghilangkan keraguan pengiriman" }
    ],
    "videoRecommendation": "Panduan video produk durasi 15-30 detik untuk Shopee Video & halaman produk"
  },
  "pricingStrategy": {
    "recommendedOriginalPrice": 0,
    "recommendedDiscountPrice": 0,
    "discountPercent": 35,
    "psychologicalTriggers": [
      "Gunakan akhiran angka ganjil (e.g. .900 atau .500)",
      "Pasang diskon coret minimal 30% agar masuk filter pencarian diskon Shopee",
      "Aktifkan Kombo Hemat / Paket Diskon untuk menaikkan nilai rata-rata keranjang (AOV)"
    ],
    "voucherSuggestions": [
      { "name": "Voucher Ikuti Toko", "amount": "Rp 3.000 / 5%", "minSpend": "Min. Belanja Rp 50.000" },
      { "name": "Voucher Toko Grosir", "amount": "Diskon Rp 10.000", "minSpend": "Min. Belanja Rp 150.000" },
      { "name": "Kombo Hemat", "amount": "Beli 2 Tambahan Diskon 3%", "minSpend": "Otomatis di keranjang" }
    ]
  },
  "shopeeAlgorithmSecrets": [
    "Respon Chat di atas 90% memberi boost peringkat organik di pencarian",
    "Aktifkan Program Gratis Ongkir XTRA & Cashback XTRA karena difilter oleh 78% pembeli",
    "Optimasi 30 menit pertama upload dengan share ke Shopee Feed/Video untuk sinyal CTR awal",
    "Perbarui stok atau varian berkala agar sistem mendeteksi produk aktif dan relevan"
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(cleanJsonText(rawText));

    // Calculate dynamic pricing if targetPrice provided
    const numPrice = Number(targetPrice) || 0;
    if (numPrice > 0 && parsedData.pricingStrategy) {
      const discountPct = parsedData.pricingStrategy.discountPercent || 35;
      const originalPrice = Math.round((numPrice / (1 - discountPct / 100)) / 1000) * 1000;
      parsedData.pricingStrategy.recommendedDiscountPrice = numPrice;
      parsedData.pricingStrategy.recommendedOriginalPrice = originalPrice;
    }

    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error optimizing product:', error);
    return res.status(500).json({
      error: 'Gagal melakukan optimasi produk dengan AI',
      message: error?.message || 'Terjadi kesalahan sistem',
    });
  }
});

// 2. API: Audit Listing Shopee & Cek Pelanggaran Kebijakan (Listing Health Check)
app.post('/api/audit', async (req: Request, res: Response) => {
  try {
    const { title = '', description = '', category = '', price = 0 } = req.body;

    if (!title && !description) {
      return res.status(400).json({ error: 'Harap masukkan judul atau deskripsi produk untuk diaudit' });
    }

    const prompt = `Anda adalah Auditor Kepatuhan Kebijakan & Algoritma SEO Shopee Indonesia.
Analisis listing produk Shopee berikut ini secara mendalam:

Judul: "${title}"
Deskripsi: "${description}"
Kategori: "${category || 'Belum dipilih'}"
Harga: Rp ${price ? Number(price).toLocaleString('id-ID') : 'Tidak ditentukan'}

Berikan audit ketat mencakup:
1. Skor Keseluruhan (0-100)
2. Skor SEO Judul (0-100) berdasarkan formula Shopee ([Merek] + [Jenis] + [Kata Kunci] + [Fitur/Spesifikasi])
3. Skor Konversi Deskripsi (0-100)
4. Tingkat Risiko Pelanggaran Shopee ("AMAN", "PERINGATAN", "BAHAYA")
5. Deteksi Kata Terlarang / Rawan Banned (misal: klaim berlebihan nomor 1/termurah, garansi seumur hidup palsu, kata kunci merek lain, ajakan WA/IG/transfer manual di luar Shopee, kata medis terlarang)
6. Analisis Kelebihan & Kekurangan Listing
7. Rekomendasi Perbaikan Cepat (Quick Wins)
8. Judul Hasil Optimasi Instan (Direct improved title)
9. Potensi Kenaikan Trafik jika diperbaiki (dalam persen perkiraan)

Format JSON yang wajib diberikan:
{
  "overallScore": 68,
  "seoTitleScore": 60,
  "descriptionScore": 72,
  "policyRisk": "PERINGATAN",
  "policyRiskExplanation": "Penjelasan singkat status resiko",
  "detectedViolations": [
    {
      "wordOrPhrase": "...",
      "reason": "Mengapa ini melanggar atau berisiko menurunkan poin penalti Shopee",
      "severity": "TINGGI / SEDANG / RENDAH",
      "recommendation": "Ganti dengan kata apa"
    }
  ],
  "titleAudit": {
    "length": 45,
    "status": "Terlalu Pendek / Optimal / Terlalu Panjang",
    "missingElements": ["Merek", "Kata Kunci Spesifik"],
    "critique": "Kritik konstruktif terhadap judul ini"
  },
  "descriptionAudit": {
    "readability": "Mudah Dibaca / Padat Berantakan / Minim Info",
    "hasSizeChart": false,
    "hasGuarantee": false,
    "hasMobileFormatting": true,
    "critique": "Evaluasi deskripsi untuk pembeli mobile"
  },
  "strengths": ["Poin positif 1", "Poin positif 2"],
  "weaknesses": ["Kelemahan 1", "Kelemahan 2", "Kelemahan 3"],
  "actionSteps": [
    "Langkah perbaikan 1",
    "Langkah perbaikan 2",
    "Langkah perbaikan 3"
  ],
  "improvedTitle": "Rekomendasi judul pengganti yang langsung sempurna sesuai SEO Shopee",
  "estimatedTrafficIncrease": "35% - 75%"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(cleanJsonText(rawText));

    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error auditing listing:', error);
    return res.status(500).json({
      error: 'Gagal melakukan audit listing Shopee',
      message: error?.message || 'Terjadi kesalahan sistem',
    });
  }
});

// 3. API: Riset Cepat Kata Kunci & Tren Shopee
app.post('/api/keywords', async (req: Request, res: Response) => {
  try {
    const { keywordOrProduct } = req.body;
    if (!keywordOrProduct) {
      return res.status(400).json({ error: 'Kata kunci atau nama produk diperlukan' });
    }

    const prompt = `Anda adalah Pakar Riset Kata Kunci Shopee Indonesia & Shopee Ads Specialist.
Lakukan riset kata kunci mendalam untuk produk / kata kunci: "${keywordOrProduct}".

Berikan kata kunci yang paling banyak diketik pembeli di kolom pencarian Shopee Indonesia, kata kunci turunan relevan, potensi volume, kompetisi, dan rekomendasi bidding Shopee Iklan.

Format output JSON:
{
  "seedKeyword": "${keywordOrProduct}",
  "estimatedSearchTrend": "Naik / Stabil / Musiman",
  "topKeywords": [
    {
      "keyword": "kata kunci",
      "searchIntent": "Siap Beli / Mencari Info / Mencari Promo",
      "competitionLevel": "Tinggi / Sedang / Rendah",
      "monthlySearchEstimate": "100.000+ pencarian",
      "recommendedTag": true
    }
  ],
  "longTailKeywords": [
    {
      "keyword": "kata kunci panjang 3-5 kata",
      "conversionPotential": "Sangat Tinggi",
      "reason": "Alasan kata kunci ini cepat konversi"
    }
  ],
  "shopeeAdsStrategy": {
    "broadMatchBid": "Rp 250 - Rp 400",
    "exactMatchBid": "Rp 350 - Rp 600",
    "budgetTips": "Panduan alokasi budget harian untuk pemula & scaling"
  },
  "copyPasteTags": "#tag1 #tag2 #tag3 #tag4 #tag5 #tag6 #tag7 #tag8 #tag9 #tag10 #tag11 #tag12"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const rawText = response.text || '{}';
    const parsedData = JSON.parse(cleanJsonText(rawText));

    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error fetching keywords:', error);
    return res.status(500).json({
      error: 'Gagal meriset kata kunci Shopee',
      message: error?.message || 'Terjadi kesalahan sistem',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ShopeeBoost AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
