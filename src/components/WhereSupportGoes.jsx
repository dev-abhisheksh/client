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
        <div className="g6 mt-6">
          {items.map((item, index) => {
            const bgColor = COLOR_MAP[item.color] || 'var(--bl)';
            return (
              <a
                key={index}
                href={`#${item.target}`}
                className="c"
                onClick={(e) => handleClick(e, item.target)}
              >
                <span
                  className="ic"
                  style={{
                    backgroundColor: bgColor,
                    margin: '0 auto 8px',
                    border: '0',
                  }}
                >
                  {item.icon}
                </span>
                <h4 style={{ margin: 0 }}>{item.title}</h4>
                <small>{item.desc}</small>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
