import React from 'react';
import Button from './Button';

export default function Hero({
  variant = 'dk',
  eyebrow,
  title,
  subtitle,
  description,
  actions = [],
  face = '🧒',
  bgMedia, // Full-width background media (Image or Swiper Carousel)
  media, // Right-column interactive media or controls
  children,
}) {
  const hasBgMedia = Boolean(bgMedia);

  return (
    <section className={`hero ${variant} relative overflow-hidden`}>
      {/* 1. Full-Width Background Media Layer */}
      {hasBgMedia && (
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto">
          {bgMedia}

          {/* Left-side Dark Gradient Overlay to ensure crisp, clear text readability */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(7, 20, 48, 0.96) 0%, rgba(7, 20, 48, 0.90) 40%, rgba(7, 20, 48, 0.55) 75%, rgba(7, 20, 48, 0.25) 100%)',
            }}
          />

          {/* Additional mobile-specific top-to-bottom soft gradient */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none md:hidden"
            style={{
              background:
                'linear-gradient(to bottom, rgba(7, 20, 48, 0.92) 0%, rgba(7, 20, 48, 0.85) 60%, rgba(7, 20, 48, 0.5) 100%)',
            }}
          />
        </div>
      )}

      {/* 2. Hero Content Grid */}
      <div className="w grid grid-cols-1 md:grid-cols-[1.3fr_0.9fr] gap-6 sm:gap-8 items-center relative z-10">
        <div className="hero-animate">
          {eyebrow && <div className="eb mb-1 sm:mb-2">{eyebrow}</div>}
          {title && <h1 className="tracking-tight">{title}</h1>}
          {subtitle && <em>{subtitle}</em>}
          {description && (
            <p className="text-[14px] sm:text-[15px] leading-relaxed max-w-[560px] text-white/95 drop-shadow-xs">
              {description}
            </p>
          )}

          {actions && actions.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-5 w-full sm:w-auto">
              {actions.map((btn, index) => (
                <Button
                  key={index}
                  variant={btn.variant}
                  target={btn.target}
                  href={btn.href}
                  onClick={btn.onClick}
                  className="w-full sm:w-auto text-center"
                >
                  {btn.label || btn.text}
                </Button>
              ))}
            </div>
          )}

          {children}
        </div>

        {/* Right Column: Interactive media / controls, or fallback Emoji face if no background media */}
        {media ? (
          <div className="hero-media relative z-10 w-full flex justify-center md:justify-end">
            {media}
          </div>
        ) : !hasBgMedia && face ? (
          <div className="face" aria-hidden="true">
            {face}
          </div>
        ) : null}
      </div>
    </section>
  );
}
