import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function ProjectMediaViewer({
  photos = [],
  icon = '🌱',
  title = 'Project',
  isAdmin = false,
  onUploadPhoto,
  isUploading = false,
}) {
  const [viewMode, setViewMode] = useState('carousel'); // 'static' | 'carousel'
  const [selectedStaticIndex, setSelectedStaticIndex] = useState(0);

  // Normalize photos into array of URLs
  const normalizedPhotos = photos
    .map((item) => (typeof item === 'string' ? item : item?.url))
    .filter(Boolean);

  const hasPhotos = normalizedPhotos.length > 0;

  // 1. If NO image is added, display the existing emoji
  if (!hasPhotos) {
    return (
      <div className="relative flex flex-col items-center justify-center">
        <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex flex-col items-center justify-center text-center p-6 transition-all hover:scale-105 duration-300">
          <span className="text-6xl sm:text-7xl select-none filter drop-shadow-md mb-2">
            {icon}
          </span>
          <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">
            {title}
          </span>
        </div>

        {/* Admin Quick Upload Hint */}
        {isAdmin && (
          <label className="mt-4 inline-flex items-center gap-1.5 bg-[var(--gold)] hover:bg-[#c29160] text-black font-bold text-xs px-4 py-2 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-105">
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
            <span>{isUploading ? '⏳ Uploading...' : '📷 Add First Photo'}</span>
          </label>
        )}
      </div>
    );
  }

  // 2. When images ARE added: Show Toggle (Static vs Carousel) + Media Viewer
  return (
    <div className="w-full max-w-[460px] flex flex-col items-center">
      {/* Top Control Bar: Mode Toggle & Admin Quick Upload */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        {/* Toggle between Static Image and Swiper Carousel */}
        <div className="inline-flex items-center bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-md">
          <button
            type="button"
            onClick={() => setViewMode('static')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              viewMode === 'static'
                ? 'bg-[var(--gold)] text-black shadow-sm font-bold'
                : 'text-white/80 hover:text-white'
            }`}
          >
            🖼️ Static
          </button>
          <button
            type="button"
            onClick={() => setViewMode('carousel')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              viewMode === 'carousel'
                ? 'bg-[var(--gold)] text-black shadow-sm font-bold'
                : 'text-white/80 hover:text-white'
            }`}
          >
            🎡 Carousel
          </button>
        </div>

        {/* Counter & Admin Add Button */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-white/70 bg-black/30 px-2.5 py-0.5 rounded-full border border-white/10">
            {normalizedPhotos.length} {normalizedPhotos.length === 1 ? 'photo' : 'photos'}
          </span>

          {isAdmin && (
            <label className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-2.5 py-1 rounded-full cursor-pointer transition-colors shadow-xs">
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
              <span>{isUploading ? '⏳' : '＋ Add'}</span>
            </label>
          )}
        </div>
      </div>

      {/* Main Media Container */}
      <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/30 backdrop-blur-sm">
        {viewMode === 'static' ? (
          /* Static Image View */
          <div className="relative group w-full h-64 sm:h-72 md:h-80 overflow-hidden bg-black/20">
            <img
              src={normalizedPhotos[selectedStaticIndex] || normalizedPhotos[0]}
              alt={`${title} featured`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Thumbnail selector if multiple images exist */}
            {normalizedPhotos.length > 1 && (
              <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 px-3 overflow-x-auto py-1">
                {normalizedPhotos.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedStaticIndex(idx)}
                    className={`w-9 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedStaticIndex === idx
                        ? 'border-[var(--gold)] scale-110 shadow-lg'
                        : 'border-white/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Smooth Swiper Carousel */
          <div className="w-full h-64 sm:h-72 md:h-80 project-swiper">
            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              spaceBetween={0}
              slidesPerView={1}
              loop={normalizedPhotos.length > 1}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={normalizedPhotos.length > 1}
              className="w-full h-full rounded-2xl"
            >
              {normalizedPhotos.map((url, idx) => (
                <SwiperSlide key={idx} className="w-full h-full bg-black/40">
                  <img
                    src={url}
                    alt={`${title} slide ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
