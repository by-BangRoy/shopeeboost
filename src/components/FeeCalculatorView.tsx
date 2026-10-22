import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShoppingBag,
  Truck,
  Sparkles
} from 'lucide-react';

export const FeeCalculatorView: React.FC = () => {
  const [sellingPrice, setSellingPrice] = useState<number>(100000);
  const [costPrice, setCostPrice] = useState<number>(55000); // HPP Modal
  const [sellerType, setSellerType] = useState<'star' | 'non_star' | 'mall'>('star');
  const [hasFreeShippingXtra, setHasFreeShippingXtra] = useState<boolean>(true);
  const [hasCashbackXtra, setHasCashbackXtra] = useState<boolean>(true);
  const [targetDiscountPct, setTargetDiscountPct] = useState<number>(35);

  // Shopee Indonesia Rates 2026 approximation
  // Admin fee
  const getAdminRate = () => {
    switch (sellerType) {
      case 'non_star':
        return 0.055; // 5.5%
      case 'star':
        return 0.075; // 7.5% for Star/Star+
      case 'mall':
        return 0.095; // 9.5% for Mall
      default:
        return 0.075;
    }
  };

  const adminRate = getAdminRate();
  const freeShippingXtraRate = hasFreeShippingXtra ? 0.04 : 0; // 4% maks 10rb
  const cashbackXtraRate = hasCashbackXtra ? 0.02 : 0; // 2% maks 10rb
  const paymentFeeRate = 0.01; // Biaya transaksi pembayaran ~1%

  // Calculations
  const calculatedAdminFee = Math.round(sellingPrice * adminRate);
  const calculatedShippingFee = Math.min(10000, Math.round(sellingPrice * freeShippingXtraRate));
  const calculatedCashbackFee = Math.min(10000, Math.round(sellingPrice * cashbackXtraRate));
  const calculatedPaymentFee = Math.round(sellingPrice * paymentFeeRate);

  const totalShopeeCut =
    calculatedAdminFee + calculatedShippingFee + calculatedCashbackFee + calculatedPaymentFee;

  const netPayout = sellingPrice - totalShopeeCut;
  const netProfit = netPayout - costPrice;
  const profitMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;

  // Strikethrough psychology price
  const strikePrice =
    targetDiscountPct > 0
      ? Math.round((sellingPrice / (1 - targetDiscountPct / 100)) / 1000) * 1000
      : sellingPrice;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#EE4D2D]" />
          Kalkulator Biaya Admin Shopee & Simulasi Laba Bersih
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Hitung potongan biaya admin Shopee, Gratis Ongkir XTRA, Cashback XTRA, dan pastikan Anda tetap untung sebelum pasang diskon coret.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Settings (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">
            Parameter Penjualan & Program Shopee
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Harga Jual di Shopee (Rp)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-gray-400">Rp</span>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full text-sm pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:border-[#EE4D2D] outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Modal Produk / HPP (Rp)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-gray-400">Rp</span>
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full text-sm pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:border-[#EE4D2D] outline-none font-bold"
                />
              </div>
            </div>
          </div>

          {/* Seller Tier */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Status Akun Toko Shopee
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSellerType('non_star')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                  sellerType === 'non_star'
                    ? 'border-[#EE4D2D] bg-orange-50 text-[#EE4D2D]'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Non-Star
                <span className="block text-[10px] font-normal text-gray-400 mt-0.5">Admin ~5.5%</span>
              </button>
              <button
                type="button"
                onClick={() => setSellerType('star')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                  sellerType === 'star'
                    ? 'border-[#EE4D2D] bg-orange-50 text-[#EE4D2D]'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Star / Star+
                <span className="block text-[10px] font-normal text-gray-400 mt-0.5">Admin ~7.5%</span>
              </button>
              <button
                type="button"
                onClick={() => setSellerType('mall')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                  sellerType === 'mall'
                    ? 'border-[#EE4D2D] bg-orange-50 text-[#EE4D2D]'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Shopee Mall
                <span className="block text-[10px] font-normal text-gray-400 mt-0.5">Admin ~9.5%</span>
              </button>
            </div>
          </div>

          {/* Program XTRA Toggles */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">
              Partisipasi Program Unggulan Shopee:
            </span>

            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-orange-50/30 cursor-pointer transition">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#EE4D2D]" />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">Gratis Ongkir XTRA</span>
                  <span className="text-[10px] text-gray-500">Biaya 4% (Maks Rp 10.000). Filter wajib 78% pembeli</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={hasFreeShippingXtra}
                onChange={(e) => setHasFreeShippingXtra(e.target.checked)}
                className="w-4 h-4 accent-[#EE4D2D] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-orange-50/30 cursor-pointer transition">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="text-xs font-bold text-gray-900 block">Cashback XTRA</span>
                  <span className="text-[10px] text-gray-500">Biaya 2% (Maks Rp 10.000). Sangat menarik bagi pembeli koin</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={hasCashbackXtra}
                onChange={(e) => setHasCashbackXtra(e.target.checked)}
                className="w-4 h-4 accent-[#EE4D2D] rounded"
              />
            </label>
          </div>

          {/* Target Diskon Coret Slider */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-700 uppercase">
                Target Diskon Coret di Shopee: {targetDiscountPct}%
              </label>
              <span className="text-xs text-[#EE4D2D] font-bold">
                Harga Coret: Rp {strikePrice.toLocaleString('id-ID')}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={targetDiscountPct}
              onChange={(e) => setTargetDiscountPct(Number(e.target.value))}
              className="w-full accent-[#EE4D2D] cursor-pointer"
            />
            <span className="text-[10px] text-gray-400 block mt-1">
              Pasang diskon coret 30% - 50% untuk meningkatkan rasio klik (CTR) saat produk tampil di hasil pencarian.
            </span>
          </div>
        </div>

        {/* Right Output Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl p-5 shadow-lg space-y-4">
            <div className="border-b border-gray-700 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Estimasi Uang Masuk
                </span>
                <p className="text-2xl font-black text-emerald-400">
                  Rp {netPayout.toLocaleString('id-ID')}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gray-400">Laba Bersih</span>
                <p className={`text-xl font-black ${netProfit > 0 ? 'text-amber-300' : 'text-rose-400'}`}>
                  Rp {netProfit.toLocaleString('id-ID')}
                </p>
                <span className="text-[10px] font-bold text-gray-300">
                  Margin: {profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Deductions Breakdown */}
            <div className="space-y-2 text-xs">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Rincian Potongan Shopee per Produk:
              </span>

              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-300">Biaya Administrasi:</span>
                <span className="font-semibold text-rose-300">
                  - Rp {calculatedAdminFee.toLocaleString('id-ID')} ({(adminRate * 100).toFixed(1)}%)
                </span>
              </div>

              {hasFreeShippingXtra && (
                <div className="flex justify-between py-1 border-b border-gray-800">
                  <span className="text-gray-300">Gratis Ongkir XTRA:</span>
                  <span className="font-semibold text-rose-300">
                    - Rp {calculatedShippingFee.toLocaleString('id-ID')}
                  </span>
                </div>
              )}

              {hasCashbackXtra && (
                <div className="flex justify-between py-1 border-b border-gray-800">
                  <span className="text-gray-300">Cashback XTRA:</span>
                  <span className="font-semibold text-rose-300">
                    - Rp {calculatedCashbackFee.toLocaleString('id-ID')}
                  </span>
                </div>
              )}

              <div className="flex justify-between py-1 border-b border-gray-800">
                <span className="text-gray-300">Biaya Layanan Pembayaran:</span>
                <span className="font-semibold text-rose-300">
                  - Rp {calculatedPaymentFee.toLocaleString('id-ID')} (1%)
                </span>
              </div>

              <div className="flex justify-between pt-1 font-bold text-sm">
                <span className="text-gray-200">Total Potongan:</span>
                <span className="text-rose-400">- Rp {totalShopeeCut.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Health Verdict */}
            <div className="p-3 bg-white/10 rounded-xl text-xs space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-white">
                {netProfit > 15000 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Margin Aman & Sangat Sehat!
                  </>
                ) : netProfit > 0 ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    Margin Tipis, Hati-hati Iklan Boncos
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    Peringatan: Harga Jual Kurang Dari Biaya Modal!
                  </>
                )}
              </span>
              <p className="text-[11px] text-gray-300">
                Dengan laba bersih Rp {netProfit.toLocaleString('id-ID')}, Anda disarankan menyisihkan maksimal Rp {Math.max(0, Math.round(netProfit * 0.3)).toLocaleString('id-ID')} untuk biaya iklan pencarian Shopee per konversi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
