import React from 'react';

const ICONS = {
  cal: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="6.5" width="23" height="21" rx="3.5" />
      <path d="M4.5 13h23M10.5 3.5v6M21.5 3.5v6" />
      <g fill="currentColor" stroke="none">
        <circle cx="11" cy="18.5" r="1.4" />
        <circle cx="16" cy="18.5" r="1.4" />
        <circle cx="21" cy="18.5" r="1.4" />
        <circle cx="11" cy="23" r="1.4" />
        <circle cx="16" cy="23" r="1.4" />
      </g>
    </svg>
  ),
  med: (
    <svg viewBox="0 0 32 32">
      <rect x="3" y="3" width="26" height="26" rx="8" fill="currentColor" />
      <path d="M16 9v14M9 16h14" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 32 32" fill="currentColor">
      <path d="M1.5 12 16 5l14.5 7L16 19z" />
      <path d="M8 16.5v5.2c0 2.2 3.6 4.3 8 4.3s8-2.1 8-4.3v-5.2L16 21z" />
      <path d="M28 13.5v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  ppl: (
    <svg viewBox="0 0 32 32" fill="currentColor">
      <circle cx="16" cy="9.5" r="4.6" />
      <path d="M7.5 26c0-5.2 3.6-8.2 8.5-8.2s8.5 3 8.5 8.2z" />
      <circle cx="6.5" cy="12.5" r="3.1" />
      <circle cx="25.5" cy="12.5" r="3.1" />
      <path d="M0.8 24c0-3.8 2.4-6 5.7-6 .9 0 1.7.1 2.4.4-2 1.5-3.2 3.7-3.4 5.6zM31.2 24c0-3.8-2.4-6-5.7-6-.9 0-1.7.1-2.4.4 2 1.5 3.2 3.7 3.4 5.6z" />
    </svg>
  ),
  bowl: (
    <svg viewBox="0 0 32 32" fill="currentColor">
      <path d="M2.5 16h27c0 6.4-5.6 11.5-13.5 11.5S2.5 22.4 2.5 16z" />
      <path d="M10 12c0-2.2 2-3.2 2-5.5M16 12c0-2.2 2-3.2 2-5.5M22 12c0-2.2 2-3.2 2-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

export default function StatsBar({ stats = [] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="sbar bw">
      <div className="w sg">
        {stats.map((item, index) => (
          <div key={index} className="si">
            <span className="sv">{ICONS[item.type] || item.icon}</span>
            <div>
              <b>{item.value}</b>
              <small>{item.label}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
