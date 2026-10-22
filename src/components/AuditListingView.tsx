import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  CheckCircle2,
  TrendingUp,
  FileSearch,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { AuditResult } from '../types/shopee';

export const AuditListingView: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) {
      setErrorMsg('Harap masukkan judul atau deskripsi produk untuk diaudit.');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category: category.trim(),
          price: Number(price) || 0,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || json.message || 'Gagal melakukan audit listing');
      }

      setAuditResult(json.data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan saat memeriksa listing Shopee');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyImprovedTitle = () => {
    if (auditResult?.improvedTitle) {
      navigator.clipboard.writeText(auditResult.improvedTitle);
      setCopiedTitle(true);
      setTimeout(() => setCopiedTitle(false), 2000);
    }
  };

  const loadSampleAudit = () => {
    setTitle('Serum Pemutih Wajah Paling Ampuh Glowing 100% Cepat No 1 di Indonesia');
    setDescription('Serum whitening dijamin putih bersih glowing dalam 3 hari, langsung kinclong tanpa efek samping. Hubungi WA 08123456789 untuk reseller dan transfer manual.');
    setCategory('Perawatan & Kecantikan > Perawatan Wajah');
    setPrice(65000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#EE4D2D]" />
              Audit Kesehatan Listing Shopee & Deteksi Pelanggaran Kebijakan
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Periksa apakah produk Anda terancam diblokir, terkena penalti poin, atau tidak muncul di pencarian karena kata kunci terlarang.
            </p>
          </div>
          <button
            type="button"
            onClick={loadSampleAudit}
            className="text-xs bg-orange-50 hover:bg-orange-100 text-[#EE4D2D] font-bold px-3 py-1.5 rounded-lg border border-orange-200 transition cursor-pointer"
          >
            Isi Contoh Listing Rawan Penalti
          </button>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAudit} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Judul Listing Shopee yang Ingin Diaudit <span className="text-[#EE4D2D]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Paste judul produk yang saat ini tayang di toko Shopee Anda..."
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
            Deskripsi Produk Shopee Saat Ini
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste seluruh teks deskripsi produk saat ini..."
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Kategori Produk (Opsional)
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Contoh: Perawatan Wajah / Pakaian Wanita"
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#EE4D2D] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Harga Produk (Rp)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Contoh: 65000"
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#EE4D2D] outline-none"
            />
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || (!title.trim() && !description.trim())}
          className="w-full py-3 rounded-xl bg-linear-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
              <span>Memindai Pelanggaran & Skor Algoritma Shopee...</span>
            </>
          ) : (
            <>
              <FileSearch className="w-4 h-4 text-orange-400" />
              <span>Audit Listing & Deteksi Pelanggaran Sekarang</span>
            </>
          )}
        </button>
      </form>

      {/* Audit Results View */}
      {auditResult && (
        <div className="space-y-6">
          {/* Top Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Overall Score */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black ${
                  auditResult.overallScore >= 80
                    ? 'bg-emerald-100 text-emerald-700'
                    : auditResult.overallScore >= 60
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {auditResult.overallScore}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Skor Kesehatan Listing
                </span>
                <p className="font-extrabold text-gray-900 text-sm">
                  {auditResult.overallScore >= 80
                    ? 'Listing Sehat & Siap Bersaing'
                    : auditResult.overallScore >= 60
                    ? 'Perlu Perbaikan SEO'
                    : 'Kritis (Tinggi Resiko Tenggelam)'}
                </p>
              </div>
            </div>

            {/* SEO Title Score */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#EE4D2D] flex items-center justify-center text-xl font-black">
                {auditResult.seoTitleScore}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Skor Formula Judul
                </span>
                <p className="text-xs text-gray-600">
                  {auditResult.titleAudit.status} ({auditResult.titleAudit.length} Karakter)
                </p>
              </div>
            </div>

            {/* Policy Risk Status */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black ${
                  auditResult.policyRisk === 'AMAN'
                    ? 'bg-emerald-100 text-emerald-700'
                    : auditResult.policyRisk === 'PERINGATAN'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                {auditResult.policyRisk === 'AMAN' ? (
                  <ShieldCheck className="w-8 h-8" />
                ) : (
                  <AlertTriangle className="w-8 h-8" />
                )}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Status Resiko Penalti
                </span>
                <p
                  className={`text-sm font-black ${
                    auditResult.policyRisk === 'AMAN'
                      ? 'text-emerald-700'
                      : auditResult.policyRisk === 'PERINGATAN'
                      ? 'text-amber-700'
                      : 'text-rose-700'
                  }`}
                >
                  {auditResult.policyRisk}
                </p>
              </div>
            </div>
          </div>

          {/* Detected Violations Section */}
          {auditResult.detectedViolations && auditResult.detectedViolations.length > 0 ? (
            <div className="bg-rose-50 rounded-2xl border border-rose-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-rose-950 text-sm sm:text-base">
                  Ditemukan {auditResult.detectedViolations.length} Kata Berisiko / Melanggar Kebijakan Shopee
                </h3>
              </div>
              <p className="text-xs text-rose-800">
                Shopee secara otomatis menurunkan skor pencarian produk yang menggunakan klaim superlatif tanpa bukti, transaksi luar platform, atau kata-kata terlarang.
              </p>

              <div className="space-y-2 mt-2">
                {auditResult.detectedViolations.map((v, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-rose-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                        "{v.wordOrPhrase}"
                      </span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        Resiko: {v.severity}
                      </span>
                    </div>
                    <p className="text-gray-700">{v.reason}</p>
                    <p className="text-emerald-700 font-semibold">
                      💡 Saran Pengganti: {v.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4 text-xs flex items-center gap-2 text-emerald-800 font-semibold">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Listing Bersih! Tidak ditemukan kata-kata terlarang yang melanggar kebijakan Shopee.</span>
            </div>
          )}

          {/* Improved Title Recommendation */}
          {auditResult.improvedTitle && (
            <div className="bg-white rounded-2xl border border-orange-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#EE4D2D] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Rekomendasi Judul Hasil Perbaikan Instan:
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Potensi Naik Trafik: +{auditResult.estimatedTrafficIncrease}
                </span>
              </div>
              <div className="p-3.5 bg-orange-50/50 rounded-xl border border-orange-200 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-bold text-gray-900 select-all flex-1">
                  {auditResult.improvedTitle}
                </p>
                <button
                  onClick={handleCopyImprovedTitle}
                  className="px-3.5 py-1.5 bg-[#EE4D2D] hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                >
                  {copiedTitle ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Judul Baru</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Action Steps Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3 text-xs">
              <h4 className="font-bold text-gray-900 flex items-center gap-1.5 text-sm">
                <TrendingUp className="w-4 h-4 text-[#EE4D2D]" />
                Langkah Cepat Perbaikan (Quick Wins):
              </h4>
              <ul className="space-y-2">
                {auditResult.actionSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="w-4 h-4 rounded-full bg-orange-100 text-[#EE4D2D] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3 text-xs">
              <h4 className="font-bold text-gray-900 text-sm">
                Evaluasi Deskripsi & Keterbacaan Mobile:
              </h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Tingkat Keterbacaan:</span>
                  <span className="font-bold">{auditResult.descriptionAudit.readability}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Memiliki Size Chart / Spesifikasi:</span>
                  <span className={auditResult.descriptionAudit.hasSizeChart ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                    {auditResult.descriptionAudit.hasSizeChart ? '✓ Ada' : '✗ Tidak Ada'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Kebijakan Garansi & Retur:</span>
                  <span className={auditResult.descriptionAudit.hasGuarantee ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                    {auditResult.descriptionAudit.hasGuarantee ? '✓ Ada' : '✗ Belum Ada'}
                  </span>
                </div>
                <p className="text-gray-500 italic mt-2">
                  "{auditResult.descriptionAudit.critique}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
