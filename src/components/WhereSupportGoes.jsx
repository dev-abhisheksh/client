import React from 'react';
import { homeContent, COLOR_MAP } from '../data/siteData';

export default function WhereSupportGoes({ onNavigate }) {
  const { title, items } = homeContent.supportAreas;

  const handleClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <section className="sec soft">
      <div className="w">
        <h2 className="c text-center">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-6 sm:mt-8">
          {items.map((item, index) => {
            const bgColor = COLOR_MAP[item.color] || 'var(--bl)';
            return (
              <a
                key={index}
                href={`#${item.target}`}
                className="c block p-3.5 sm:p-4 rounded-2xl text-center transition-all duration-300 hover:bg-[var(--card)] hover:-translate-y-1 hover:shadow-lg"
                onClick={(e) => handleClick(e, item.target)}
              >
                <span
                  className="ic"
                  style={{
                    backgroundColor: bgColor,
                    margin: '0 auto 10px',
                    border: '0',
                  }}
                >
                  {item.icon}
                </span>
                <h4 className="font-bold text-[14px] sm:text-[15px] text-[var(--tx)] m-0 mb-1 leading-snug">
                  {item.title}
                </h4>
                <small className="block text-[12px] sm:text-[13px] text-[var(--mu)] leading-tight">
                  {item.desc}
                </small>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
