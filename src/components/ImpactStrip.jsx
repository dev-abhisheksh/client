import React from 'react';
import { homeContent } from '../data/siteData';

export default function ImpactStrip() {
  const { badge, heading, description } = homeContent.impactStrip;

  return (
    <section className="strip py-10 sm:py-14 transform-gpu">
      <div className="w flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 md:gap-8">
        <div>
          <h2 style={{ fontStyle: 'italic', margin: 0 }} className="text-[22px] sm:text-[26px]">
            {badge}
          </h2>
        </div>
        <div
          className="text-[17px] sm:text-[19px] md:text-[20px] font-bold leading-snug"
          style={{
            fontFamily: "'Merriweather', serif",
            whiteSpace: 'pre-line',
          }}
        >
          {heading}
        </div>
        <p className="max-w-[420px] text-[13px] sm:text-[14px] leading-relaxed text-white/90 m-0">
          {description}
        </p>
      </div>
    </section>
  );
}
