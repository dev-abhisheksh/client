import React from 'react';

const STAT_ICONS = {
  since: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  teach: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  grad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  women: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="8" r="5" />
      <path d="M12 13v8" />
      <path d="M9 18h6" />
    </svg>
  ),
  fed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 11h18a1 1 0 0 1 1 1 9 9 0 0 1-9 9 9 9 0 0 1-9-9 1 1 0 0 1 1-1z" />
      <path d="M8 7c0-1.5 1-2.5 1-4" />
      <path d="M12 7c0-1.5 1-2.5 1-4" />
      <path d="M16 7c0-1.5 1-2.5 1-4" />
    </svg>
  ),
  med: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  shelter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

export default function StatsBar({ stats = [] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="stats-bar-section relative py-8 sm:py-12 bg-[#0e1d2f] text-white border-y border-[#17324D] overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'radial-gradient(900px 360px at 50% 0%, rgba(214, 168, 79, 0.12), transparent 70%), radial-gradient(700px 300px at 15% 100%, rgba(63, 107, 80, 0.15), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="w relative z-10 px-4 sm:px-6 mx-auto max-w-[1240px]">
        {/* Responsive Grid: 2 columns on mobile, 4 columns on tablet & desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {stats.map((item, index) => {
            const icon = STAT_ICONS[item.type] || item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/[0.06] hover:bg-white/[0.10] border border-white/12 hover:border-[#D6A84F]/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.22)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:-translate-y-0.5"
              >
                {/* Top Row: Icon + Warm Gold Badge/Prefix */}
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#D6A84F]/15 border border-[#D6A84F]/25 flex items-center justify-center text-[#D6A84F] group-hover:scale-105 transition-transform">
                    {icon}
                  </div>
                  {item.prefix && (
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#D6A84F]/20 text-[#D6A84F] border border-[#D6A84F]/35">
                      {item.prefix}
                    </span>
                  )}
                </div>

                {/* Metric Value: White Numbers with Warm Gold Accent */}
                <div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-white font-serif tracking-tight leading-none">
                      {item.value}
                    </span>
                    {item.accent && (
                      <span className="text-[18px] sm:text-[22px] lg:text-[26px] font-bold text-[#D6A84F] leading-none select-none">
                        {item.accent}
                      </span>
                    )}
                  </div>

                  {/* Metric Description / Label: High contrast, readable light-gray / off-white text */}
                  <p className="text-[12px] sm:text-[13px] text-white/85 group-hover:text-white leading-snug font-normal mt-2 line-clamp-3 transition-colors">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
