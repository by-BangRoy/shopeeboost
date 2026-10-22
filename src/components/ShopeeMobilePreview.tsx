import React from 'react';
import { Star, Truck, ShieldCheck, Heart, MapPin, Tag } from 'lucide-react';

interface ShopeeMobilePreviewProps {
  title: string;
  originalPrice?: number;
  discountPrice?: number;
  discountPercent?: number;
  rating?: number;
  soldCount?: string;
  location?: string;
  shopType?: 'star_plus' | 'star' | 'mall' | 'regular';
}

export const ShopeeMobilePreview: React.FC<ShopeeMobilePreviewProps> = ({
  title,
  originalPrice = 120000,
  discountPrice = 79000,
  discountPercent = 35,
  rating = 4.9,
  soldCount = '2.4RB+',
  location = 'Kota Jakarta Barat',
  shopType = 'star_plus',
}) => {
  return (
    <div className="bg-gray-100 rounded-2xl p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Preview di Aplikasi Shopee Mobile
        </span>
        <span className="text-[11px] text-gray-500">Tampilan Hasil Pencarian (SERP)</span>
      </div>

      <div className="max-w-[260px] mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden text-left">
        {/* Mock Product Thumbnail with Badges */}
        <div className="relative aspect-square bg-linear-to-br from-orange-100 via-amber-50 to-orange-50 flex items-center justify-center p-4">
          {/* Shop badge */}
          <div className="absolute top-1.5 left-1.5 z-10 flex flex-col gap-1">
            {shopType === 'mall' ? (
              <span className="bg-[#D0011B] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs tracking-tighter">
                Mall
              </span>
            ) : (
              <span className="bg-[#EE4D2D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-xs flex items-center gap-0.5 shadow-2xs">
                <Star className="w-2.5 h-2.5 fill-white" /> Star+
              </span>
            )}
          </div>

          {/* Discount tag badge */}
          {discountPercent > 0 && (
            <div className="absolute top-0 right-1.5 bg-yellow-400 text-[#D0011B] text-[10px] font-black px-1.5 py-1 rounded-b-xs shadow-2xs text-center leading-none">
              <span>{discountPercent}%</span>
              <div className="text-[8px] uppercase text-white font-bold bg-[#D0011B] px-0.5 mt-0.5 rounded-xs">
                OFF
              </div>
            </div>
          )}

          {/* Product Silhouette / Placeholder visual */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-xl bg-orange-200/60 border border-orange-300/60 flex items-center justify-center text-[#EE4D2D]">
              <Tag className="w-8 h-8 opacity-80" />
            </div>
            <span className="text-[10px] text-gray-400 font-medium block mt-1">Foto Cover Produk</span>
          </div>

          {/* Overlay Promo frame */}
          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-1">
            <span className="bg-[#EE4D2D] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-xs shadow-xs flex items-center gap-0.5">
              <Truck className="w-2.5 h-2.5" /> Gratis Ongkir XTRA
            </span>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-2 space-y-1.5">
          {/* Title preview with 2-line clamp */}
          <p
            className="text-xs text-gray-900 leading-snug line-clamp-2 font-medium"
            title={title}
          >
            {title || 'Judul Produk Shopee yang telah dioptimasi kata kunci SEO...'}
          </p>

          {/* Price Area */}
          <div className="pt-0.5">
            <div className="flex items-baseline gap-1">
              <span className="text-[10px] font-bold text-[#EE4D2D]">Rp</span>
              <span className="text-sm font-extrabold text-[#EE4D2D]">
                {discountPrice ? discountPrice.toLocaleString('id-ID') : '79.000'}
              </span>
            </div>
            {originalPrice > discountPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                Rp {originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>

          {/* Rating & Sold count */}
          <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-500 font-bold">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span className="ml-0.5 text-gray-700">{rating}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span>Terjual {soldCount}</span>
            </div>
          </div>

          {/* Store location */}
          <div className="flex items-center gap-1 text-[9px] text-gray-400">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-gray-500 text-center mt-2.5">
        ⚡ Judul optimal tampil 2 baris penuh di layar smartphone pembeli tanpa terpotong di tengah kata penting.
      </p>
    </div>
  );
};
