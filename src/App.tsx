import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductForm } from './components/ProductForm';
import { OptimizationResults } from './components/OptimizationResults';
import { AuditListingView } from './components/AuditListingView';
import { KeywordResearchView } from './components/KeywordResearchView';
import { FeeCalculatorView } from './components/FeeCalculatorView';
import { AlgorithmGuideView } from './components/AlgorithmGuideView';
import { HistoryModal, SavedHistoryItem } from './components/HistoryModal';
import { OptimizationData, PresetProduct } from './types/shopee';
import { PRESET_PRODUCTS } from './data/presets';
import { AlertCircle, CheckCircle2, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'audit' | 'keywords' | 'calculator' | 'algorithm'>('generator');
  const [optimizationData, setOptimizationData] = useState<OptimizationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<PresetProduct | null>(PRESET_PRODUCTS[0]);
  const [lastOptimizedName, setLastOptimizedName] = useState(PRESET_PRODUCTS[0].name);

  // History state
  const [historyItems, setHistoryItems] = useState<SavedHistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCurrentSaved, setIsCurrentSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shopeeboost_history');
      if (saved) {
        setHistoryItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse history:', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveHistoryToStorage = (items: SavedHistoryItem[]) => {
    setHistoryItems(items);
    try {
      localStorage.setItem('shopeeboost_history', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  // Perform full optimization
  const handleOptimize = async (formData: any) => {
    setIsLoading(true);
    setErrorMsg('');
    setIsCurrentSaved(false);
    setLastOptimizedName(formData.productName);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || json.message || 'Gagal memproses data dengan AI');
      }

      setOptimizationData(json.data);
      showToast('Optimasi produk Shopee berhasil digenerate!');
    } catch (err: any) {
      console.error('Optimization error:', err);
      setErrorMsg(err.message || 'Terjadi kesalahan sistem saat optimasi produk');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: PresetProduct) => {
    setSelectedPreset(preset);
    setActiveTab('generator');
  };

  const handleSaveToHistory = () => {
    if (!optimizationData) return;

    const newItem: SavedHistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      productName: lastOptimizedName || 'Produk Shopee',
      data: optimizationData,
    };

    const updated = [newItem, ...historyItems.slice(0, 19)]; // keep max 20
    saveHistoryToStorage(updated);
    setIsCurrentSaved(true);
    showToast('Tersimpan di riwayat optimasi!');
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = historyItems.filter((i) => i.id !== id);
    saveHistoryToStorage(updated);
  };

  const handleClearAllHistory = () => {
    saveHistoryToStorage([]);
    setIsHistoryOpen(false);
    showToast('Semua riwayat telah dibersihkan.');
  };

  const handleLoadFromHistory = (item: SavedHistoryItem) => {
    setOptimizationData(item.data);
    setLastOptimizedName(item.productName);
    setIsCurrentSaved(true);
    setActiveTab('generator');
    showToast(`Memuat data "${item.productName}"`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-gray-700 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectPreset={handleSelectPreset}
        onOpenHistory={() => setIsHistoryOpen(true)}
        savedCount={historyItems.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Optimasi Otomatis (All-in-One Generator) */}
        {activeTab === 'generator' && (
          <div className="space-y-6">
            {/* Top Value Proposition Banner */}
            <div className="bg-linear-to-r from-orange-500/10 via-amber-500/10 to-transparent p-4 rounded-2xl border border-orange-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EE4D2D] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-gray-900">
                    Mesin Otomatisasi SEO & Konversi Shopee Indonesia
                  </h2>
                  <p className="text-xs text-gray-600">
                    Menghasilkan Judul Algoritma Resmi, 15+ Kata Kunci Pencarian, Deskripsi Format Mobile, Panduan 9 Foto & Harga Coret.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#EE4D2D]">
                <span className="bg-white px-3 py-1.5 rounded-lg border border-orange-200 shadow-2xs">
                  ⚡ Tingkatkan CTR hingga 45%
                </span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-orange-200 shadow-2xs">
                  📈 Naikan Skor SERP Page 1
                </span>
              </div>
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Input Form */}
            <ProductForm
              onOptimize={handleOptimize}
              isLoading={isLoading}
              selectedPreset={selectedPreset}
            />

            {/* Results Section */}
            {optimizationData ? (
              <div className="pt-4">
                <OptimizationResults
                  data={optimizationData}
                  onSaveToHistory={handleSaveToHistory}
                  isSaved={isCurrentSaved}
                />
              </div>
            ) : (
              !isLoading && (
                <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
                  <Sparkles className="w-10 h-10 mx-auto text-[#EE4D2D] opacity-60 mb-2" />
                  <h3 className="font-bold text-gray-800 text-sm">
                    Hasil Optimasi Akan Muncul Di Sini
                  </h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto mt-1">
                    Silakan pilih salah satu contoh produk di bilah atas atau ketik data produk Anda di formulir, lalu klik "Optimasi Produk Shopee Sekarang".
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* Tab 2: Audit & Cek Pelanggaran */}
        {activeTab === 'audit' && <AuditListingView />}

        {/* Tab 3: Riset Kata Kunci & Iklan Shopee */}
        {activeTab === 'keywords' && <KeywordResearchView />}

        {/* Tab 4: Kalkulator Biaya Admin Shopee */}
        {activeTab === 'calculator' && <FeeCalculatorView />}

        {/* Tab 5: Panduan Algoritma Shopee 2026 */}
        {activeTab === 'algorithm' && <AlgorithmGuideView />}
      </main>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        items={historyItems}
        onSelect={handleLoadFromHistory}
        onDelete={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 mt-12 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">ShopeeBoost AI</span>
            <span>—</span>
            <span>Tools Optimasi Penjual Shopee Indonesia</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Formula Algoritma Shopee 2026</span>
            <span>•</span>
            <span>SEO & CVR Booster</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
