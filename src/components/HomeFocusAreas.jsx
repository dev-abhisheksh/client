import React from 'react';
import { COLOR_MAP } from '../data/siteData';

export default function HomeFocusAreas({ data, onNavigate }) {
  if (!data) return null;
  const { eyebrow = 'OUR FOCUS AREAS', title = 'Creating Lasting Change', items = [] } = data;

  const handleClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <section className="sec bi">
      <div className="w">
        <div className="fa">
          <div className="eb2">{eyebrow}</div>
          <h2>{title}</h2>
        </div>
        <div className="g6">
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
                    border: 0,
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
