import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Tag,
  ShoppingBag,
  DollarSign,
  HelpCircle,
  ChevronDown,
  Layers,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { PresetProduct } from '../types/shopee';

interface ProductFormProps {
  onOptimize: (formData: any) => Promise<void>;
  isLoading: boolean;
  selectedPreset: PresetProduct | null;
}

const CATEGORY_OPTIONS = [
  'Pakaian Wanita > Gamis & Dress Muslim',
  'Pakaian Pria > Kaos & Kemeja',
  'Perawatan & Kecantikan > Perawatan Wajah > Serum',
  'Audio > Earphone & Headset > True Wireless Stereo (TWS)',
  'Makanan & Minuman > Makanan Instan',
  'Perlengkapan Rumah > Kamar Tidur > Sprei',
  'Ibu & Bayi > Perlengkapan Makan Bayi',
  'Otomotif > Aksesoris Pengendara Motor',
  'Handphone & Aksesoris > Case & Pelindung Layar',
  'Kesehatan > Suplemen & Vitamin',
];

export const ProductForm: React.FC<ProductFormProps> = ({
  onOptimize,
  isLoading,
  selectedPreset,
}) => {
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('No Brand');
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [sellingPoints, setSellingPoints] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [targetPrice, setTargetPrice] = useState<number | ''>(89000);
  const [tone, setTone] = useState('persuasif');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');

  // Sync with preset if selected
  useEffect(() => {
    if (selectedPreset) {
      setProductName(selectedPreset.name);
      setBrand(selectedPreset.brand);
      setCategory(selectedPreset.category);
      setSellingPoints(selectedPreset.sellingPoints);
      setTargetAudience(selectedPreset.targetAudience);
      setTargetPrice(selectedPreset.targetPrice);
      if (selectedPreset.currentTitle) setCurrentTitle(selectedPreset.currentTitle);
      if (selectedPreset.currentDescription) setCurrentDescription(selectedPreset.currentDescription);
    }
  }, [selectedPreset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    onOptimize({
      productName: productName.trim(),
      brand: brand.trim() || 'No Brand',
      category: category.trim(),
      sellingPoints: sellingPoints.trim(),
      targetAudience: targetAudience.trim(),
      targetPrice: Number(targetPrice) || 0,
      tone,
      currentTitle: currentTitle.trim(),
      currentDescription: currentDescription.trim(),
    });
  };

  const handleAddSellingPointChip = (point: string) => {
    setSellingPoints((prev) => (prev ? `${prev}, ${point}` : point));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="bg-linear-to-r from-orange-50 to-amber-50/50 p-5 border-b border-orange-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#EE4D2D]" />
            Input Data Produk Shopee
          </h2>
          <p className="text-xs text-gray-600 mt-0.5">
            Cukup masukkan nama & keunggulan dasar, AI akan menyusun judul algoritma, kata kunci, dan deskripsi konversi.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
        {/* Nama Produk */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Nama Produk Sederhana <span className="text-[#EE4D2D]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Contoh: Gamis Crinkle Airflow Polos / TWS Bluetooth Earphone Bass"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition"
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Bisa berupa nama barang kasaran atau judul lama produk yang ingin ditingkatkan.
          </p>
        </div>

        {/* 2 Grid: Brand & Kategori */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Merek Produk
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Contoh: No Brand / Nama Brand Anda"
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition"
            />
            <span className="text-[11px] text-gray-400">
              Ketik "No Brand" jika produk tanpa merek resmi.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Kategori Shopee
            </label>
            <div className="relative">
              <input
                type="text"
                list="category-list"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Pilih atau ketik kategori produk"
                className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition"
              />
              <datalist id="category-list">
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {/* Keunggulan Utama & Fitur Produk */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Keunggulan / Fitur Utama / Spesifikasi
            </label>
            <span className="text-[11px] text-gray-400">Opsional tapi disarankan</span>
          </div>
          <textarea
            rows={3}
            value={sellingPoints}
            onChange={(e) => setSellingPoints(e.target.value)}
            placeholder="Contoh: Bahan adem tidak menerawang, resleting depan busui friendly, jahitan dobel rapi, ada saku kanan, size M L XL XXL"
            className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition"
          />

          {/* Quick chip buttons */}
          <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
            <span className="text-[10px] text-gray-400 font-medium">Tambah cepat:</span>
            {['Original 100%', 'Garansi Retur', 'Bahan Premium', 'Bisa COD', 'Pengiriman Cepat (Instant)', 'Free Bubble Wrap'].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleAddSellingPointChip(chip)}
                className="text-[11px] bg-gray-100 hover:bg-orange-50 hover:text-[#EE4D2D] text-gray-600 px-2 py-0.5 rounded-full border border-gray-200 transition"
              >
                + {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Harga Jual Target & Gaya Bahasa */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Harga Jual Bersih (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2 text-xs font-bold text-gray-400">Rp</span>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="79000"
                className="w-full text-sm pl-10 pr-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition font-semibold"
              />
            </div>
            <span className="text-[10px] text-gray-400">Untuk kalkulasi diskon coret psikologis</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Target Audiens
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Contoh: Wanita muda, mahasiswi, ibu rumah tangga"
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Gaya Bahasa Deskripsi
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-xl border border-gray-300 focus:border-[#EE4D2D] focus:ring-2 focus:ring-orange-100 outline-none transition bg-white"
            >
              <option value="persuasif">Persuasif & Emosional (Tinggi Konversi)</option>
              <option value="santai_ramah">Santai & Ramah (Gaya OOTD / Kuliner)</option>
              <option value="profesional_resmi">Profesional & Spesifik (Gadget / Mall)</option>
              <option value="urgensi_promo">Urgensi Promo & Diskon Kilat</option>
            </select>
          </div>
        </div>

        {/* Advanced Toggle (Current listing to compare) */}
        <div className="pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-1.5 transition"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            {showAdvanced ? 'Sembunyikan Listing Lama' : 'Punya Listing Lama di Shopee? Masukkan untuk Ditingkatkan (Opsional)'}
          </button>

          {showAdvanced && (
            <div className="mt-3 p-3.5 bg-gray-50 rounded-xl space-y-3 border border-gray-200">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Judul Shopee Saat Ini (Lama)
                </label>
                <input
                  type="text"
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                  placeholder="Ketik judul produk yang sudah tayang di tokomu sekarang"
                  className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-gray-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                  Deskripsi Saat Ini (Lama)
                </label>
                <textarea
                  rows={2}
                  value={currentDescription}
                  onChange={(e) => setCurrentDescription(e.target.value)}
                  placeholder="Paste deskripsi produk lama untuk disempurnakan"
                  className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-gray-300 outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isLoading || !productName.trim()}
            className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-[#EE4D2D] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>AI Sedang Menganalisis Algoritma Shopee & Menghitung Kata Kunci...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Optimasi Produk Shopee Sekarang (1-Klik Otomatis)</span>
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 mt-2">
            <span>✓ Formula Judul Shopee Resmi</span>
            <span>✓ Lolos Deteksi Pelanggaran</span>
            <span>✓ Format Mobile-Friendly</span>
          </div>
        </div>
      </form>
    </div>
  );
};
