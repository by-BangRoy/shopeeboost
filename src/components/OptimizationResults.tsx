import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  TrendingUp,
  Tag,
  Search,
  FileText,
  Image as ImageIcon,
  DollarSign,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Eye,
  Camera
} from 'lucide-react';
import { OptimizationData, TitleOption } from '../types/shopee';
import { ShopeeMobilePreview } from './ShopeeMobilePreview';

interface OptimizationResultsProps {
  data: OptimizationData;
  onSaveToHistory?: () => void;
  isSaved?: boolean;
}

export const OptimizationResults: React.FC<OptimizationResultsProps> = ({
  data,
  onSaveToHistory,
  isSaved = false,
}) => {
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(0);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [descViewMode, setDescViewMode] = useState<'full' | 'breakdown'>('full');

  const selectedTitle: TitleOption = data.titles[selectedTitleIndex] || data.titles[0];

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2200);
  };

  const calculateCharStatus = (length: number) => {
    if (length >= 80 && length <= 140) {
      return {
        label: 'Optimal (Sangat Direkomendasikan untuk Mobile)',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        barColor: 'bg-emerald-500',
      };
    }
    if (length < 80) {
      return {
        label: 'Terlalu Pendek (Potensi Kata Kunci Belum Maksimal)',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        barColor: 'bg-amber-500',
      };
    }
    return {
      label: 'Cukup Panjang (Pastikan Kata Kunci Utama Berada di Depan)',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      barColor: 'bg-blue-500',
    };
  };

  const charStatus = calculateCharStatus(selectedTitle.title.length);

  return (
    <div className="space-y-6">
      {/* Top Banner Analysis */}
      <div className="bg-linear-to-r from-orange-500 via-[#EE4D2D] to-red-500 text-white rounded-2xl p-5 shadow-lg shadow-orange-500/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-2xl text-amber-200">
              {selectedTitle.score}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-white">
                  Shopee SEO Score
                </span>
                <span className="text-xs text-orange-100">Siap Diterapkan ke Seller Centre</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-white mt-1 max-w-2xl">
                {data.productSummary || 'Optimasi lengkap kata kunci bervolume tinggi dan struktur konversi Shopee.'}
              </p>
            </div>
          </div>

          {onSaveToHistory && (
            <button
              onClick={onSaveToHistory}
              disabled={isSaved}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                isSaved
                  ? 'bg-white/30 text-white cursor-default'
                  : 'bg-white text-[#EE4D2D] hover:bg-orange-50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSaved ? 'Tersimpan di Riwayat' : 'Simpan ke Riwayat'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Titles & Live SERP Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Title Generator & Breakdown (8 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#EE4D2D] flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                  Formula Judul Algoritma Shopee
                </h3>
              </div>
              <span className="text-xs text-gray-500 font-medium">Pilih Formula Terbaik:</span>
            </div>

            {/* Title Formula Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {data.titles.map((t, idx) => (
                <button
                  key={t.type || idx}
                  onClick={() => setSelectedTitleIndex(idx)}
                  className={`p-2.5 rounded-xl text-left border transition text-xs relative ${
                    selectedTitleIndex === idx
                      ? 'border-[#EE4D2D] bg-orange-50/70 text-[#EE4D2D] font-bold shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-gray-400">
                      Opsi {idx + 1}
                    </span>
                    <span className="text-[10px] font-extrabold text-[#EE4D2D]">
                      {t.score}%
                    </span>
                  </div>
                  <div className="truncate font-semibold mt-1">
                    {t.label.split('(')[0].trim()}
                  </div>
                </button>
              ))}
            </div>

            {/* Current Active Title Display */}
            <div className="bg-orange-50/40 border border-orange-200 rounded-xl p-4 relative">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-orange-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#EE4D2D]" />
                  {selectedTitle.label}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {selectedTitle.title.length} Karakter
                </span>
              </div>

              {/* Title Text */}
              <p className="text-sm sm:text-base font-bold text-gray-900 leading-relaxed select-all">
                {selectedTitle.title}
              </p>

              {/* Character Bar */}
              <div className="mt-3 space-y-1.5">
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${charStatus.barColor} transition-all duration-300`}
                    style={{ width: `${Math.min(100, (selectedTitle.title.length / 140) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className={`px-2 py-0.5 rounded-md border font-medium ${charStatus.color}`}>
                    {charStatus.label}
                  </span>
                  <span className="text-gray-400">Batas Shopee: Maks 120-250 char</span>
                </div>
              </div>

              {/* Copy Button */}
              <div className="mt-3.5 pt-3 border-t border-orange-200/80 flex items-center justify-between">
                <p className="text-xs text-gray-600 italic">
                  💡 {selectedTitle.explanation}
                </p>
                <button
                  onClick={() => handleCopy(selectedTitle.title, 'title')}
                  className="px-3.5 py-1.5 bg-[#EE4D2D] hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                >
                  {copiedSection === 'title' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" />
                      <span>Salin Judul</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Formula Breakdown Breakdown */}
            {selectedTitle.formulaBreakdown && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wider">
                  Bedah Struktur Formula Shopee (5 Komponen Wajib):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-gray-400 block font-semibold text-[10px]">1. MEREK</span>
                    <span className="font-bold text-gray-800 truncate block">
                      {selectedTitle.formulaBreakdown.brand || '-'}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-gray-400 block font-semibold text-[10px]">2. KATEGORI</span>
                    <span className="font-bold text-gray-800 truncate block">
                      {selectedTitle.formulaBreakdown.category || '-'}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 col-span-2 sm:col-span-1">
                    <span className="text-gray-400 block font-semibold text-[10px]">3. KEYWORD UTAMA</span>
                    <span className="font-bold text-[#EE4D2D] truncate block">
                      {selectedTitle.formulaBreakdown.primaryKeyword || '-'}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-gray-400 block font-semibold text-[10px]">4. FITUR UNIK</span>
                    <span className="font-bold text-gray-800 truncate block">
                      {selectedTitle.formulaBreakdown.feature || '-'}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-gray-400 block font-semibold text-[10px]">5. VARIAN / MODEL</span>
                    <span className="font-bold text-gray-800 truncate block">
                      {selectedTitle.formulaBreakdown.specOrVariant || '-'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Shopee Mobile SERP Card Preview (5 cols) */}
        <div className="lg:col-span-5">
          <ShopeeMobilePreview
            title={selectedTitle.title}
            originalPrice={data.pricingStrategy?.recommendedOriginalPrice}
            discountPrice={data.pricingStrategy?.recommendedDiscountPrice}
            discountPercent={data.pricingStrategy?.discountPercent}
          />
        </div>
      </div>

      {/* Kata Kunci Riset & Shopee Ads */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#EE4D2D] flex items-center justify-center font-bold text-xs">
              2
            </span>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
              <Search className="w-4 h-4 text-[#EE4D2D]" />
              Kata Kunci Tertarget & Rekomendasi Iklan Shopee
            </h3>
          </div>
          <button
            onClick={() => handleCopy(data.keywords.hashtagTags, 'hashtags')}
            className="text-xs bg-orange-50 hover:bg-orange-100 text-[#EE4D2D] border border-orange-200 font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            {copiedSection === 'hashtags' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Semua Tag Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Semua Hashtag (#)</span>
              </>
            )}
          </button>
        </div>

        {/* Kata Kunci Volume Tinggi & Long Tail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Volume Tinggi */}
          <div className="p-3.5 bg-orange-50/40 rounded-xl border border-orange-100">
            <span className="text-xs font-bold text-orange-950 uppercase tracking-wider block mb-2">
              🔥 Kata Kunci Volume Pencarian Tinggi (Broad Traffic)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.keywords.highVolume.map((kw, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(kw, `kw-h-${i}`)}
                  title="Klik untuk salin"
                  className="text-xs bg-white hover:bg-orange-100 hover:text-[#EE4D2D] text-gray-800 font-medium px-2.5 py-1 rounded-lg border border-orange-200 transition flex items-center gap-1 shadow-2xs"
                >
                  <span>{kw}</span>
                  {copiedSection === `kw-h-${i}` ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Cocok dipasang di 40 karakter pertama judul & iklan pencarian pencocokan luas.
            </p>
          </div>

          {/* Long Tail Conversion */}
          <div className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-100">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block mb-2">
              🎯 Kata Kunci Long-Tail (Konversi Pembelian Tinggi)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.keywords.longTail.map((kw, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(kw, `kw-l-${i}`)}
                  title="Klik untuk salin"
                  className="text-xs bg-white hover:bg-emerald-100 hover:text-emerald-800 text-gray-800 font-medium px-2.5 py-1 rounded-lg border border-emerald-200 transition flex items-center gap-1 shadow-2xs"
                >
                  <span>{kw}</span>
                  {copiedSection === `kw-l-${i}` ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-400" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Diketikan oleh pembeli yang sudah siap checkout dan memiliki niat beli spesifik.
            </p>
          </div>
        </div>

        {/* Shopee Ads Recommendation Table */}
        {data.keywords.shopeeAdsTips && data.keywords.shopeeAdsTips.length > 0 && (
          <div className="mt-3">
            <span className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wider">
              Rekomendasi Bidding Iklan Pencarian Shopee (Shopee Ads Planner):
            </span>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px] border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Kata Kunci Iklan</th>
                    <th className="py-2.5 px-3">Tipe Pencocokan</th>
                    <th className="py-2.5 px-3">Estimasi Bid</th>
                    <th className="py-2.5 px-3">Persaingan</th>
                    <th className="py-2.5 px-3">Strategi Pemasangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.keywords.shopeeAdsTips.map((tip, idx) => (
                    <tr key={idx} className="hover:bg-orange-50/30 transition">
                      <td className="py-2 px-3 font-bold text-gray-900">{tip.keyword}</td>
                      <td className="py-2 px-3">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold text-[10px]">
                          {tip.matchType}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-semibold text-[#EE4D2D]">{tip.bidEstimate}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            tip.competition.toLowerCase().includes('tinggi')
                              ? 'bg-rose-50 text-rose-700'
                              : tip.competition.toLowerCase().includes('sedang')
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {tip.competition}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-gray-600">{tip.strategy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Deskripsi Konversi Tinggi */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#EE4D2D] flex items-center justify-center font-bold text-xs">
              3
            </span>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#EE4D2D]" />
                Deskripsi Produk Konversi Tinggi (Shopee Mobile-First)
              </h3>
              <p className="text-xs text-gray-500">
                Format rapi dengan emoji, hook emosional, spesifikasi detail, & garansi toko.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-gray-100 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setDescViewMode('full')}
                className={`px-3 py-1 rounded-md transition ${
                  descViewMode === 'full' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500'
                }`}
              >
                Teks Lengkap Siap Copy
              </button>
              <button
                onClick={() => setDescViewMode('breakdown')}
                className={`px-3 py-1 rounded-md transition ${
                  descViewMode === 'breakdown' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500'
                }`}
              >
                Bedah Bagian (Hook/Benefit)
              </button>
            </div>

            <button
              onClick={() => handleCopy(data.description.fullText, 'description')}
              className="px-3.5 py-1.5 bg-[#EE4D2D] hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {copiedSection === 'description' ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Deskripsi Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Deskripsi Lengkap</span>
                </>
              )}
            </button>
          </div>
        </div>

        {descViewMode === 'full' ? (
          <div className="relative">
            <pre className="w-full text-xs sm:text-sm font-sans bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-800 whitespace-pre-wrap leading-relaxed max-h-[360px] overflow-y-auto">
              {data.description.fullText}
            </pre>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-orange-50/40 rounded-xl border border-orange-100">
              <span className="font-bold text-orange-900 block mb-1">🎣 Hook Pembuka (Masalah & Solusi)</span>
              <p className="text-gray-700">{data.description.sections.hook}</p>
            </div>
            <div className="p-3 bg-blue-50/40 rounded-xl border border-blue-100">
              <span className="font-bold text-blue-900 block mb-1">⭐ Keunggulan Utama</span>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {data.description.sections.keyBenefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100">
              <span className="font-bold text-purple-900 block mb-1">📐 Spesifikasi & Panduan Ukuran</span>
              <p className="text-gray-700">{data.description.sections.specifications}</p>
            </div>
            <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100">
              <span className="font-bold text-emerald-900 block mb-1">🛡️ Garansi Toko & Call To Action</span>
              <p className="text-gray-700 mb-1">{data.description.sections.guaranteeAndShipping}</p>
              <p className="font-bold text-[#EE4D2D]">{data.description.sections.callToAction}</p>
            </div>
          </div>
        )}
      </div>

      {/* Visual Checklist & 9 Slot Foto Shopee */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#EE4D2D] flex items-center justify-center font-bold text-xs">
            4
          </span>
          <div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#EE4D2D]" />
              Panduan Optimasi Gambar & Foto Produk (Penentu CTR 80%)
            </h3>
            <p className="text-xs text-gray-500">
              Shopee mengizinkan hingga 9 foto. Ikuti urutan ini untuk mengurangi tingkat keraguan pembeli.
            </p>
          </div>
        </div>

        {/* Cover Photo Highlight */}
        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs">
          <span className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#EE4D2D]" />
            Formula Foto Cover Utama (Slot #1):
          </span>
          <p className="text-gray-800 leading-relaxed">
            {data.visualOptimization.coverPhotoStrategy}
          </p>
        </div>

        {/* Photo Slots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.visualOptimization.photoSlots.map((slot) => (
            <div
              key={slot.slot}
              className="p-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-orange-50/20 transition space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-[#EE4D2D] bg-orange-100 px-2 py-0.5 rounded-md">
                  Slot #{slot.slot}
                </span>
                <span className="text-[10px] text-gray-500 font-semibold">{slot.importance}</span>
              </div>
              <p className="font-bold text-gray-900">{slot.name}</p>
              <p className="text-gray-600 text-[11px] leading-relaxed">{slot.focus}</p>
            </div>
          ))}
        </div>

        {/* Video Recommendation */}
        {data.visualOptimization.videoRecommendation && (
          <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
              ▶
            </div>
            <div>
              <span className="font-bold text-rose-950 block">Rekomendasi Shopee Video (Durasi 15-30 Detik):</span>
              <p className="text-gray-700 mt-0.5">{data.visualOptimization.videoRecommendation}</p>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Psychology & Voucher Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pricing Strategy */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
            <DollarSign className="w-4 h-4 text-[#EE4D2D]" />
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              Strategi Harga Coret Psikologis
            </h3>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-orange-50/60 rounded-xl border border-orange-100">
            <div>
              <span className="text-[11px] text-gray-500 block font-medium">Harga Coret Rekomendasi</span>
              <span className="text-sm text-gray-400 line-through">
                Rp {data.pricingStrategy.recommendedOriginalPrice.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-gray-500 block font-medium">Harga Jual Akhir</span>
              <span className="text-lg font-black text-[#EE4D2D]">
                Rp {data.pricingStrategy.recommendedDiscountPrice.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="bg-[#EE4D2D] text-white text-xs font-black px-2.5 py-1 rounded-lg">
              Hemat {data.pricingStrategy.discountPercent}%
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-gray-700">
            <span className="font-bold text-gray-800 block text-[11px] uppercase tracking-wider">
              Pemicu Pembelian (Psychological Triggers):
            </span>
            {data.pricingStrategy.psychologicalTriggers.map((trig, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-[#EE4D2D] font-bold">✓</span>
                <span>{trig}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Voucher & Combo Recommendations */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2.5">
            <Tag className="w-4 h-4 text-[#EE4D2D]" />
            <h3 className="font-bold text-gray-900 text-sm sm:text-base">
              Rekomendasi Voucher & Kombo Toko
            </h3>
          </div>

          <div className="space-y-2">
            {data.pricingStrategy.voucherSuggestions.map((v, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-gray-200 bg-gray-50/60 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-gray-900 block">{v.name}</span>
                  <span className="text-[11px] text-gray-500">{v.minSpend}</span>
                </div>
                <span className="bg-orange-100 text-[#EE4D2D] font-bold px-2 py-0.5 rounded text-[11px]">
                  {v.amount}
                </span>
              </div>
            ))}
          </div>

          {/* Shopee Algorithm Tips */}
          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs">
            <span className="font-bold text-blue-950 block mb-1">
              ⚡ Kunci Algoritma Shopee:
            </span>
            <ul className="space-y-1 text-gray-700">
              {data.shopeeAlgorithmSecrets.map((sec, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{sec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
