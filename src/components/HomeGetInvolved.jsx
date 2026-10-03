import React from 'react';
import Button from './Button';
import { siteConfig } from '../data/siteData';

export default function HomeGetInvolved({ data, onNavigate }) {
  if (!data) return null;
  const {
    eyebrow = 'GET INVOLVED',
    title = 'Be Part of the Change',
    description = "You don't have to do everything. You can simply do something. Whether you give your time, skills, resources, or encouragement, your involvement can help bring hope and practical support to children, women, families and communities.",
    cards = [
      { icon: '👥', title: 'Volunteer', desc: 'Give your time', target: 'involved' },
      { icon: '❤️', title: 'Support a Project', desc: 'Give towards a cause', target: 'involved' },
      { icon: '🤝', title: 'Partner With Us', desc: 'Work together', target: 'involved' },
      { icon: '📦', title: 'Give Essentials', desc: 'Donate supplies', target: 'involved' },
    ],
  } = data;

  const handleCardClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <section className="sec bw" style={{ paddingTop: '20px' }}>
      <div className="w">
        <div className="gis">
          {/* Left Column: Story & CTAs */}
          <div className="gil">
            <div className="eb2">{eyebrow}</div>
            <h2>{title}</h2>
            <p>{description}</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
              <Button
                variant="default"
                href={siteConfig.contact.volunteerFormUrl}
              >
                Become a Volunteer
              </Button>
              <Button
                variant="outline"
                target="donate"
                onClick={() => onNavigate && onNavigate('donate')}
              >
                Support Our Work
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Quick Action Cards */}
          <div className="gir">
            {cards.map((card, i) => (
              <a
                key={i}
                href={`#${card.target}`}
                className="gw"
                onClick={(e) => handleCardClick(e, card.target)}
              >
                <span>{card.icon}</span>
                <div>
                  <b>{card.title}</b>
                  <small>{card.desc}</small>
                </div>
                <i>→</i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
