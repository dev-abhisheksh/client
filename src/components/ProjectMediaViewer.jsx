import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

/**
 * Full-Width Background Media Layer
 * Spans 100% of Hero width & height, behind the gradient overlay
 */
export function ProjectHeroBackground({
  photos = [],
  viewMode = 'carousel',
  activeIndex = 0,
  title = 'Page',
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const normalizedPhotos = photos
    .map((item) => (typeof item === 'string' ? item : item?.url))
    .filter(Boolean);

  if (normalizedPhotos.length === 0) return null;

  return (
    <div className="w-full h-full absolute inset-0 bg-[#071430] overflow-hidden">
      {/* Loading Shimmer Placeholder until hero image loads */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-r from-[#071430] via-[#0e275c] to-[#071430] animate-pulse">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70 text-xs font-mono">
            <span className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span>Loading visual...</span>
          </div>
        </div>
      )}

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
            <SwiperSlide key={idx} className="w-full h-full bg-transparent">
              <img
                src={optimizeCloudinaryUrl(url, { width: 1440, quality: 'auto' })}
                alt={`${title} slide ${idx + 1}`}
                decoding="async"
                onLoad={() => {
                  if (idx === 0) setIsLoaded(true);
                }}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={optimizeCloudinaryUrl(normalizedPhotos[activeIndex] || normalizedPhotos[0], { width: 1440, quality: 'auto' })}
          alt={`${title} full width cover`}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}

/**
 * Refined Glassmorphism Admin Hero Controls
 * Crisp luxury segmented toggle, thumbnail switcher, delete & upload
 */
export function ProjectHeroControls({
  photos = [],
  viewMode = 'carousel',
  setViewMode,
  activeIndex = 0,
  setActiveIndex,
  onSelectCoverPhoto,
  onDeletePhoto,
  isAdmin = false,
  isSaving = false,
  onUploadPhoto,
  isUploading = false,
}) {
  const normalizedPhotos = photos
    .map((item) => (typeof item === 'string' ? item : item?.url))
    .filter(Boolean);

  // Strictly hide controls from normal visitors (Admin only)
  if (!isAdmin) return null;

  // Empty state when admin has not uploaded any photos yet
  if (normalizedPhotos.length === 0) {
    return (
      <div className="w-full max-w-[320px] bg-slate-950/80 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-2xl text-white transition-all duration-300 hover:border-white/25">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10 text-[11px]">
          <div className="flex items-center gap-1.5 font-mono text-white/70 tracking-wider uppercase text-[10px]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold">Hero Carousel</span>
          </div>
          <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            0 photos
          </span>
        </div>
        <p className="text-xs text-white/70 mb-3 leading-relaxed">
          No hero background photos uploaded yet for this page. Add images to activate the smooth carousel / static cover.
        </p>
        <label className="flex items-center justify-center gap-2 py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-md">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={isUploading}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length && onUploadPhoto) onUploadPhoto(files.length === 1 ? files[0] : files);
              e.target.value = '';
            }}
          />
          <span>{isUploading ? 'Uploading...' : '+ Add Hero Photos'}</span>
        </label>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[320px] bg-slate-950/80 backdrop-blur-2xl border border-white/15 rounded-2xl p-3 shadow-2xl text-white transition-all duration-300 hover:border-white/25">
      {/* 1. Header Bar: Status Indicator & Photo Count */}
      <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/10 text-[11px]">
        <div className="flex items-center gap-1.5 font-mono text-white/70 tracking-wider uppercase text-[10px]">
          <span
            className={`w-2 h-2 rounded-full ${
              isSaving
                ? 'bg-amber-400 animate-spin'
                : 'bg-emerald-400 animate-pulse'
            }`}
          />
          <span className="font-bold">
            {isSaving ? 'Saving Changes...' : 'Display Mode'}
          </span>
        </div>
        <span className="text-[10.5px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
          {normalizedPhotos.length} {normalizedPhotos.length === 1 ? 'photo' : 'photos'}
        </span>
      </div>

      {/* 2. Luxury Segmented Pill Switcher */}
      <div className="grid grid-cols-2 gap-1 bg-black/50 p-1 rounded-xl border border-white/10 shadow-inner">
        <button
          type="button"
          disabled={isSaving}
          onClick={() => setViewMode && setViewMode('static')}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            viewMode === 'static'
              ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
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
          disabled={isSaving}
          onClick={() => setViewMode && setViewMode('carousel')}
          className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            viewMode === 'carousel'
              ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          } ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
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

      {/* 3. Thumbnail Switcher & Photo Manager */}
      {normalizedPhotos.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-[10px] text-white/50 mb-1.5 uppercase font-mono tracking-wider">
            <span>{viewMode === 'static' ? 'Select Cover Image:' : 'Uploaded Slides:'}</span>
            {isSaving && <span className="text-amber-400 text-[9px] animate-pulse">Syncing...</span>}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {normalizedPhotos.map((url, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div key={idx} className="relative group shrink-0">
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => {
                      if (onSelectCoverPhoto) {
                        onSelectCoverPhoto(idx);
                      } else if (setActiveIndex) {
                        setActiveIndex(idx);
                      }
                    }}
                    className={`relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer block ${
                      isSelected
                        ? 'border-amber-400 shadow-lg scale-105 ring-2 ring-amber-400/40'
                        : 'border-white/20 opacity-70 hover:opacity-100 hover:border-white/50'
                    }`}
                    title={idx === 0 ? 'Current Primary Cover' : `Click to set as primary cover`}
                  >
                    <img
                      src={optimizeCloudinaryUrl(url, { width: 100, height: 100, crop: 'fill' })}
                      alt={`thumb ${idx}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-amber-400 text-slate-950 font-bold text-[7px] leading-tight text-center py-0.5">
                        COVER
                      </span>
                    )}
                  </button>

                  {/* Delete Photo Button on Hover */}
                  {onDeletePhoto && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePhoto(idx);
                      }}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center text-[10px] shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                      title="Delete this photo"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
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
            multiple
            className="hidden"
            disabled={isUploading}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length && onUploadPhoto) onUploadPhoto(files.length === 1 ? files[0] : files);
              e.target.value = '';
            }}
          />
          <span>{isUploading ? 'Uploading...' : 'Add photos (multi)'}</span>
        </label>

        <span className="text-[10px] text-white/40 font-mono">⚡ Admin Only</span>
      </div>
    </div>
  );
}

// Aliases for clean semantic imports across all pages
export const HeroBackground = ProjectHeroBackground;
export const HeroControls = ProjectHeroControls;

export default ProjectHeroBackground;
