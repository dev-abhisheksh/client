import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

/**
 * Full-Width Background Media Layer
 * Spans 100% of Hero width & height, behind the gradient overlay
 */
export function ProjectHeroBackground({
  photos = [],
  viewMode = 'carousel',
  activeIndex = 0,
  title = 'Project',
}) {
  const normalizedPhotos = photos
    .map((item) => (typeof item === 'string' ? item : item?.url))
    .filter(Boolean);

  if (normalizedPhotos.length === 0) return null;

  return (
    <div className="w-full h-full absolute inset-0">
      {viewMode === 'carousel' ? (
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1200}
          slidesPerView={1}
          loop={normalizedPhotos.length > 1}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          className="w-full h-full"
        >
          {normalizedPhotos.map((url, idx) => (
            <SwiperSlide key={idx} className="w-full h-full bg-[#071430]">
              <img
                src={url}
                alt={`${title} slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={normalizedPhotos[activeIndex] || normalizedPhotos[0]}
          alt={`${title} full width cover`}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
      )}
    </div>
  );
}

/**
 * Refined Glassmorphism Admin Hero Controls
 * Crisp luxury segmented toggle, thumbnail switcher & upload
 */
export function ProjectHeroControls({
  photos = [],
  viewMode = 'carousel',
  setViewMode,
  activeIndex = 0,
  setActiveIndex,
  isAdmin = false,
  onUploadPhoto,
  isUploading = false,
}) {
  const normalizedPhotos = photos
    .map((item) => (typeof item === 'string' ? item : item?.url))
    .filter(Boolean);

  // Strictly hide controls from normal visitors (Admin only)
  if (!isAdmin || normalizedPhotos.length === 0) return null;

  return (
    <div className="w-full max-w-[320px] bg-slate-950/75 backdrop-blur-2xl border border-white/15 rounded-2xl p-3 shadow-2xl text-white transition-all duration-300 hover:border-white/25">
      {/* 1. Header Bar: Status Indicator & Photo Count */}
      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/10 text-[11px]">
        <div className="flex items-center gap-1.5 font-mono text-white/70 tracking-wider uppercase text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold">Display Mode</span>
        </div>
        <span className="text-[10.5px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
          {normalizedPhotos.length} {normalizedPhotos.length === 1 ? 'photo' : 'photos'}
        </span>
      </div>

      {/* 2. Luxury Segmented Pill Switcher */}
      <div className="grid grid-cols-2 gap-1 bg-black/50 p-1 rounded-xl border border-white/10 shadow-inner">
        <button
          type="button"
          onClick={() => setViewMode('static')}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            viewMode === 'static'
              ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span>Static</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('carousel')}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            viewMode === 'carousel'
              ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <svg
            className="w-3.5 h-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="16" height="14" x="4" y="5" rx="2" />
            <path d="M4 10h16" />
            <circle cx="8" cy="15" r="1" />
            <circle cx="12" cy="15" r="1" />
            <circle cx="16" cy="15" r="1" />
          </svg>
          <span>Carousel</span>
        </button>
      </div>

      {/* 3. Thumbnail Switcher (when in static mode with multiple photos) */}
      {viewMode === 'static' && normalizedPhotos.length > 1 && (
        <div className="mt-2.5 pt-2 border-t border-white/10">
          <div className="text-[10px] text-white/50 mb-1.5 uppercase font-mono tracking-wider">
            Select Cover Image:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {normalizedPhotos.map((url, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'border-amber-400 shadow-lg scale-105 ring-2 ring-amber-400/40'
                    : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                }`}
                title={`Select Photo ${idx + 1}`}
              >
                <img src={url} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Bottom Footer: Quick Upload Action */}
      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
        <label className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 cursor-pointer font-medium transition-colors">
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && onUploadPhoto) onUploadPhoto(file);
              e.target.value = '';
            }}
          />
          <span>{isUploading ? 'Uploading...' : 'Add photo'}</span>
        </label>

        <span className="text-[10px] text-white/40 font-mono">⚡ Admin Only</span>
      </div>
    </div>
  );
}

export default ProjectHeroBackground;
