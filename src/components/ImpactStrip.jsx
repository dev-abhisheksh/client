import React from 'react';
import { homeContent } from '../data/siteData';

export default function ImpactStrip() {
  const { badge, heading, description } = homeContent.impactStrip;

  return (
    <section className="strip">
      <div className="w">
        <h2 style={{ fontStyle: 'italic' }}>{badge}</h2>
        <div
          style={{
            font: "700 20px 'Merriweather', serif",
            whiteSpace: 'pre-line',
          }}
        >
          {heading}
        </div>
        <p style={{ maxWidth: '380px', fontSize: '13px', margin: 0 }}>
          {description}
        </p>
      </div>
    </section>
  );
}
