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
 * Foreground Hero Controls
 * Displays mode toggle (Static vs Carousel), thumbnail switcher, and admin upload button
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
    <div className="flex flex-col items-center md:items-end gap-3 w-full">
      {/* 1. Mode Toggle Pill: Static Image vs Smooth Swiper Carousel */}
      <div className="inline-flex items-center bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-2xl">
        <button
          type="button"
          onClick={() => setViewMode('static')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
            viewMode === 'static'
              ? 'bg-[var(--gold)] text-black shadow-md font-bold'
              : 'text-white/80 hover:text-white'
          }`}
        >
          🖼️ Static Image
        </button>
        <button
          type="button"
          onClick={() => setViewMode('carousel')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
            viewMode === 'carousel'
              ? 'bg-[var(--gold)] text-black shadow-md font-bold'
              : 'text-white/80 hover:text-white'
          }`}
        >
          🎡 Smooth Carousel
        </button>
      </div>

      {/* 2. Thumbnail Switcher (shown when in Static Mode and multiple photos exist) */}
      {viewMode === 'static' && normalizedPhotos.length > 1 && (
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-xl max-w-[340px] overflow-x-auto">
          {normalizedPhotos.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`w-11 h-11 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                activeIndex === idx
                  ? 'border-[var(--gold)] scale-110 shadow-lg'
                  : 'border-white/40 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={url} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* 3. Status Bar: Total Photos count + Admin Quick Upload Button */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-white/90 bg-black/50 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 shadow-sm">
          📷 {normalizedPhotos.length} {normalizedPhotos.length === 1 ? 'Photo' : 'Photos'}
        </span>

        {isAdmin && (
          <label className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3.5 py-1 rounded-full cursor-pointer transition-colors shadow-sm backdrop-blur-md border border-white/25">
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
            <span>{isUploading ? '⏳ Uploading...' : '＋ Add Photo'}</span>
          </label>
        )}
      </div>
    </div>
  );
}

export default ProjectHeroBackground;
