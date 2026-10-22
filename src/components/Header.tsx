import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Search,
  Calculator,
  Flame,
  History,
  Store,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PRESET_PRODUCTS } from '../data/presets';
import { PresetProduct } from '../types/shopee';

interface HeaderProps {
  activeTab: 'generator' | 'audit' | 'keywords' | 'calculator' | 'algorithm';
  setActiveTab: (tab: 'generator' | 'audit' | 'keywords' | 'calculator' | 'algorithm') => void;
  onSelectPreset: (preset: PresetProduct) => void;
  onOpenHistory: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onSelectPreset,
  onOpenHistory,
  savedCount,
}) => {
  return (
    <header className="border-b border-orange-100 bg-white sticky top-0 z-40 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-linear-to-r from-orange-600 via-[#EE4D2D] to-amber-600 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Shopee Algorithm 2026 Ready
            </span>
            <span className="hidden sm:inline text-orange-50 font-medium">
              Tingkatkan Traffic Pencarian Alami (Organik) & Konversi Penjualan Toko Anda
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-orange-100 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Formula Judul Shopee Resmi
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-[#EE4D2D] to-orange-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-gray-900">
                Shopee<span className="text-[#EE4D2D]">Boost</span>
                <span className="ml-1 text-xs font-bold bg-orange-100 text-[#EE4D2D] px-2 py-0.5 rounded-full">AI</span>
              </h1>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Mesin Otomatisasi SEO & Konversi Seller Shopee Indonesia
            </p>
          </div>
        </div>

        {/* Quick Action & History */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Lihat Riwayat Optimasi Tersimpan"
          >
            <History className="w-4 h-4 text-gray-500" />
            <span>Riwayat</span>
            {savedCount > 0 && (
              <span className="bg-[#EE4D2D] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Preset bar for fast instant testing */}
      <div className="bg-orange-50/60 border-t border-orange-100/60 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-orange-900 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#EE4D2D]" /> Coba Contoh Produk:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {PRESET_PRODUCTS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="text-xs bg-white hover:bg-orange-100 hover:text-[#EE4D2D] border border-orange-200 text-gray-700 px-2.5 py-1 rounded-md transition font-medium flex items-center gap-1 shadow-2xs"
              >
                <span>{preset.name.split(' ').slice(0, 3).join(' ')}</span>
                <span className="text-[10px] text-orange-600 bg-orange-50 px-1 py-0.2 rounded font-semibold">
                  {preset.badge.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'generator'
                ? 'bg-[#EE4D2D] text-white shadow-sm shadow-orange-500/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Optimasi Otomatis (All-in-One)</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-[#EE4D2D] text-white shadow-sm shadow-orange-500/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Audit & Cek Pelanggaran</span>
          </button>

          <button
            onClick={() => setActiveTab('keywords')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'keywords'
                ? 'bg-[#EE4D2D] text-white shadow-sm shadow-orange-500/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Riset Kata Kunci & Iklan</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'calculator'
                ? 'bg-[#EE4D2D] text-white shadow-sm shadow-orange-500/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Kalkulator Admin & Margin</span>
          </button>

          <button
            onClick={() => setActiveTab('algorithm')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'algorithm'
                ? 'bg-[#EE4D2D] text-white shadow-sm shadow-orange-500/30'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Rahasia Algoritma Shopee</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
