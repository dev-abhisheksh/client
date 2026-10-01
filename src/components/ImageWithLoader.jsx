import React, { useState } from 'react';

/**
 * Reusable image component that displays a smooth shimmer skeleton
 * while the image is loading, fading in seamlessly once loaded.
 */
export default function ImageWithLoader({
  src,
  alt = '',
  className = '',
  skeletonClassName = '',
  loading = 'lazy',
  containerClassName = '',
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* 1. Shimmer / Skeleton Placeholder while loading */}
      {!loaded && !hasError && (
        <div
          className={`absolute inset-0 z-1 bg-gradient-to-r from-[var(--soft)] via-[var(--ln)] to-[var(--soft)] bg-[length:200%_100%] animate-pulse flex items-center justify-center ${skeletonClassName}`}
        >
          <span className="w-5 h-5 border-2 border-[var(--bl)]/30 border-t-[var(--bl)] rounded-full animate-spin" />
        </div>
      )}

      {/* 2. Error Fallback if image fails to load */}
      {hasError ? (
        <div className="absolute inset-0 z-1 flex flex-col items-center justify-center bg-[var(--soft)] text-[var(--mu)] p-4 text-center">
          <span className="text-2xl mb-1">🖼️</span>
          <span className="text-[11px] font-mono">Image unavailable</span>
        </div>
      ) : (
        /* 3. The Image itself with smooth fade-in once loaded */
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={(e) => {
            // If already complete in cache or freshly loaded
            if (e.target.complete) {
              setLoaded(true);
            }
          }}
          onError={() => {
            setHasError(true);
            setLoaded(true);
          }}
          className={`${className} transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
}
