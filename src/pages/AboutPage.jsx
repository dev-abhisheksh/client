import React from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import ImpactStrip from '../components/ImpactStrip';
import { aboutContent, COLOR_MAP } from '../data/siteData';

export default function AboutPage({ onNavigate }) {
  const { hero, story, journey, commitment, belief, trustees } = aboutContent;

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <div className="about-page">
      {/* 1. Hero Section */}
      <Hero
        variant="dk"
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        actions={hero.actions}
        face={hero.avatar}
      />

      {/* 2. Our Story Section */}
      <section className="sec">
        <div className="w g2 items-center">
          <div>
            <h2>{story.title}</h2>
            {story.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <div className="q">{story.quote}</div>
          </div>

          <div
            className="cd h-[260px] sm:h-[300px] grid place-items-center text-white text-center p-6 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #8fc07a, #3b7a3b)',
              fontFamily: "'Merriweather', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 3.5vw, 28px)',
              lineHeight: 1.4,
            }}
          >
            <div>
              <span className="text-4xl sm:text-5xl block mb-2 select-none">
                {story.cardEmoji}
              </span>
              {story.cardWords.map((w, idx) => (
                <div key={idx}>{w}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Journey Section */}
      <section className="sec soft">
        <div className="w">
          <div className="ln mb-6">
            <div>
              <h2 style={{ margin: 0 }}>{journey.title}</h2>
              <h3 className="text-[15px] sm:text-[16px] text-[var(--nv)] font-semibold mt-1">
                {journey.subtitle}
              </h3>
            </div>
            <p
              style={{
                borderLeft: '2px dotted var(--mu)',
                paddingLeft: '14px',
                fontSize: '13px',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {journey.description}
            </p>
          </div>

          <div className="g7">
            {journey.projects.map((p, i) => {
              const colorBg = COLOR_MAP[p.color] || 'var(--bl)';
              return (
                <div
                  key={i}
                  className="cd cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
                  onClick={(e) => handleNavClick(e, `pj${i}`)}
                >
                  <div className="ph select-none">{p.icon}</div>
                  <div className="bd">
                    <span
                      className="ic select-none"
                      style={{ backgroundColor: colorBg }}
                    >
                      {p.icon}
                    </span>
                    <small className="block text-[11px] text-[var(--mu)] font-bold mb-1">
                      0{i + 1}
                    </small>
                    <h4
                      style={{ color: colorBg }}
                      className="font-bold text-[14px] leading-snug mb-1"
                    >
                      {p.title}
                    </h4>
                    <p className="text-[12px] leading-relaxed line-clamp-3 mb-2">
                      {p.desc}
                    </p>
                    <p className="text-[11px] leading-tight m-0">
                      <b>Our goal:</b>
                      <br />
                      <i className="text-[var(--tx)]">{p.goal}</i>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Our Commitment Section */}
      <section className="sec">
        <div className="w ln">
          <div>
            <h2 style={{ margin: 0 }}>{commitment.title}</h2>
            <h3
              style={{ margin: '4px 0 12px' }}
              className="text-[15px] sm:text-[16px] text-[var(--nv)] font-semibold"
            >
              {commitment.subtitle}
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--mu)] mb-5">
              {commitment.description}
            </p>
            <Button
              target={commitment.buttonTarget}
              onClick={(e) => handleNavClick(e, commitment.buttonTarget)}
            >
              {commitment.buttonText}
            </Button>
          </div>

          <div className="cm">
            {commitment.items.map((c, idx) => {
              const itemColor = COLOR_MAP[c.color] || 'var(--bl)';
              return (
                <div key={idx} className="flex flex-col gap-1">
                  <span
                    className="ic select-none"
                    style={{
                      backgroundColor: itemColor,
                      margin: '0 0 6px',
                      width: '46px',
                      height: '46px',
                      fontSize: '20px',
                    }}
                  >
                    {c.icon}
                  </span>
                  <b
                    style={{
                      color: itemColor,
                      fontFamily: "'Merriweather', serif",
                      fontSize: '14px',
                    }}
                  >
                    {c.title}
                  </b>
                  <span className="text-[13px] text-[var(--mu)] leading-snug">
                    {c.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Our Belief & Board of Trustees Section */}
      <section className="sec soft">
        <div className="w ln">
          {/* Left Column: Our Belief */}
          <div>
            <h2>{belief.title}</h2>
            <div className="flex flex-col gap-2 my-3">
              {belief.items.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[var(--tx)]"
                >
                  <span className="select-none shrink-0">🌿</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--mu)] mt-3">
              {belief.summary}
            </p>
          </div>

          {/* Right Column: Board of Trustees */}
          <div>
            <h2 style={{ marginBottom: '4px' }}>{trustees.title}</h2>
            <p className="text-[13px] text-[var(--mu)] leading-relaxed m-0 mb-4">
              {trustees.description}
            </p>
            <div className="g5">
              {trustees.members.map((t, idx) => (
                <div key={idx} className="cd tr">
                  <div className="av select-none">{t.avatar}</div>
                  <b className="text-[12px] text-[var(--nv)] font-bold mt-1">
                    {t.name}
                  </b>
                  <small className="block text-[11px] text-[var(--mu)] leading-tight mt-0.5">
                    {t.role}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Impact Strip Section */}
      <ImpactStrip />
    </div>
  );
}
