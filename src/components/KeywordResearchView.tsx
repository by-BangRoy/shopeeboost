import React, { useState } from 'react';
import {
  Search,
  TrendingUp,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Tag,
  DollarSign,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { KeywordResearchResult } from '../types/shopee';

export const KeywordResearchView: React.FC = () => {
  const [keywordInput, setKeywordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<KeywordResearchResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywordInput.trim()) return;

    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywordOrProduct: keywordInput.trim() }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || json.message || 'Gagal meriset kata kunci');
      }

      setResult(json.data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan saat meriset kata kunci Shopee');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const quickSeeds = [
    'Gamis Crinkle',
    'Serum Niacinamide',
    'TWS Bluetooth',
    'Baso Aci',
    'Sprei Aesthetic',
    'Kaos Oversize',
    'Casing iPhone',
  ];

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <div className="max-w-2xl">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-[#EE4D2D]" />
            Riset Kata Kunci & Rekomendasi Bidding Iklan Shopee
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Temukan kata kunci pencarian yang paling sering diketik pembeli di aplikasi Shopee Indonesia beserta estimasi bid Shopee Ads.
          </p>
        </div>

        {/* Quick Search Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          <span className="text-[11px] font-bold text-gray-400">Kata Kunci Populer:</span>
          {quickSeeds.map((seed) => (
            <button
              key={seed}
              type="button"
              onClick={() => {
                setKeywordInput(seed);
              }}
              className="text-xs bg-gray-100 hover:bg-orange-50 hover:text-[#EE4D2D] text-gray-700 px-2.5 py-1 rounded-lg border border-gray-200 transition font-medium"
            >
              {seed}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleResearch} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Masukkan kata kunci produk (misal: 'gamis wanita', 'serum wajah', 'tws')..."
              className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !keywordInput.trim()}
            className="px-6 py-2.5 rounded-xl bg-[#EE4D2D] hover:bg-orange-600 text-white font-bold text-sm shadow-md transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Meriset...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Riset Shopee</span>
              </>
            )}
          </button>
        </form>

        {errorMsg && (
          <p className="text-xs text-red-600 mt-2">{errorMsg}</p>
        )}
      </div>

      {/* Research Results */}
      {result && (
        <div className="space-y-6">
          {/* Trend & Summary */}
          <div className="bg-orange-50/50 rounded-2xl border border-orange-200 p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-900">
                Analisis Kata Kunci:
              </span>
              <h3 className="text-base font-extrabold text-gray-900">
                "{result.seedKeyword}"
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">Tren Pencarian Shopee:</span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                {result.estimatedSearchTrend}
              </span>
            </div>
          </div>

          {/* Top Keywords Table */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#EE4D2D]" />
              Kata Kunci Relevan Tertinggi di Mesin Pencari Shopee
            </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 font-bold uppercase text-[10px] border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Kata Kunci Pencarian</th>
                    <th className="py-2.5 px-3">Niat Pencarian (Intent)</th>
                    <th className="py-2.5 px-3">Tingkat Persaingan</th>
                    <th className="py-2.5 px-3">Estimasi Volume</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result.topKeywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-orange-50/30 transition">
                      <td className="py-2.5 px-3 font-bold text-gray-900 flex items-center gap-1.5">
                        <span>{kw.keyword}</span>
                        {kw.recommendedTag && (
                          <span className="text-[9px] bg-orange-100 text-[#EE4D2D] font-bold px-1.5 py-0.2 rounded">
                            HOT
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-gray-600">{kw.searchIntent}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            kw.competitionLevel.toLowerCase().includes('tinggi')
                              ? 'bg-rose-50 text-rose-700'
                              : kw.competitionLevel.toLowerCase().includes('sedang')
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {kw.competitionLevel}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-gray-700">{kw.monthlySearchEstimate}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleCopy(kw.keyword, `kw-${i}`)}
                          className="text-xs bg-gray-100 hover:bg-[#EE4D2D] hover:text-white px-2 py-1 rounded transition text-gray-700 font-medium inline-flex items-center gap-1 cursor-pointer"
                        >
                          {copiedKey === `kw-${i}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === `kw-${i}` ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Long Tail Conversion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">
                Kata Kunci Niche (Long-Tail) Siap Beli:
              </h4>
              <div className="space-y-2">
                {result.longTailKeywords.map((lt, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-gray-900">{lt.keyword}</p>
                      <p className="text-[11px] text-gray-500">{lt.reason}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(lt.keyword, `lt-${idx}`)}
                      className="text-gray-400 hover:text-[#EE4D2D] p-1 transition cursor-pointer"
                    >
                      {copiedKey === `lt-${idx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Shopee Ads Bidding Strategy */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#EE4D2D]" />
                Strategi Bidding Iklan Pencarian Shopee:
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                  <span className="text-[11px] font-bold text-blue-900 block">Pencocokan Luas</span>
                  <p className="text-sm font-extrabold text-blue-700 mt-1">
                    {result.shopeeAdsStrategy.broadMatchBid}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">Untuk menarik banyak impresi & pengunjung baru</p>
                </div>
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="text-[11px] font-bold text-emerald-900 block">Pencocokan Spesifik</span>
                  <p className="text-sm font-extrabold text-emerald-700 mt-1">
                    {result.shopeeAdsStrategy.exactMatchBid}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">Tinggi konversi, biaya iklan tidak bocor</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 p-3 bg-gray-50 rounded-xl border border-gray-200">
                💡 {result.shopeeAdsStrategy.budgetTips}
              </p>
            </div>
          </div>

          {/* Copy-paste hashtag cluster */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#EE4D2D]" />
                Kumpulan Tagar Shopee Siap Pakai (Shopee Feed & Deskripsi)
              </h4>
              <button
                onClick={() => handleCopy(result.copyPasteTags, 'all-tags')}
                className="text-xs bg-[#EE4D2D] hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'all-tags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'all-tags' ? 'Semua Tag Tersalin!' : 'Salin Semua Tagar'}</span>
              </button>
            </div>
            <p className="text-xs font-mono bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-700 leading-relaxed">
              {result.copyPasteTags}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
