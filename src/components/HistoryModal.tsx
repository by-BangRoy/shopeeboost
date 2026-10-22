import React from 'react';
import { X, Trash2, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { OptimizationData } from '../types/shopee';

export interface SavedHistoryItem {
  id: string;
  timestamp: string;
  productName: string;
  data: OptimizationData;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: SavedHistoryItem[];
  onSelect: (item: SavedHistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelect,
  onDelete,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#EE4D2D]" />
            <h3 className="font-bold text-gray-900 text-base">
              Riwayat Optimasi Produk Tersimpan ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="w-8 h-8 mx-auto text-orange-300 mb-2" />
              <p className="font-semibold text-sm">Belum ada riwayat tersimpan</p>
              <p className="text-xs text-gray-400 mt-1">
                Lakukan optimasi produk dan klik "Simpan ke Riwayat" untuk menyimpannya di sini.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50/30 transition flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 truncate text-sm">
                      {item.productName}
                    </span>
                    <span className="text-[10px] text-gray-400 shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-500 truncate mt-0.5">
                    {item.data.titles[0]?.title}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-[#EE4D2D] hover:bg-orange-600 text-white font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Buka</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-3.5 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs">
            <span className="text-gray-500">Data tersimpan di penyimpanan browser Anda.</span>
            <button
              onClick={onClearAll}
              className="text-rose-600 hover:text-rose-700 font-semibold hover:underline cursor-pointer"
            >
              Hapus Semua Riwayat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
