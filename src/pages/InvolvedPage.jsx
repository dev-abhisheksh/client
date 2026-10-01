import React from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import WhereSupportGoes from '../components/WhereSupportGoes';
import NeedHelp from '../components/NeedHelp';
import ImpactStrip from '../components/ImpactStrip';
import { involvedContent, COLOR_MAP, siteConfig } from '../data/siteData';

export default function InvolvedPage({ onNavigate }) {
  const { hero, ways, banners, stayConnected } = involvedContent;

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <div className="involved-page">
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

      {/* 2. Ways to Get Involved Showcase Cards */}
      <section className="sec">
        <div className="w">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="c">There Are Many Ways to Get Involved</h2>
            <p className="text-[14px] sm:text-[15px] text-[var(--mu)] leading-relaxed mt-2">
              Whether you give your time, skills, essentials, or financial support, every act of kindness brings practical hope to communities.
            </p>
          </div>

          <div className="g3">
            {ways.map((w, index) => {
              const colorBg = COLOR_MAP[w.color] || 'var(--bl)';
              return (
                <div
                  key={index}
                  className="cd flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Header Emoji Visual Banner */}
                    <div
                      className="ph select-none text-5xl"
                      style={{ background: 'var(--soft)' }}
                    >
                      {w.bgEmoji}
                    </div>

                    <div className="bd pt-2">
                      {/* Squircle Color Icon */}
                      <span
                        className="ic"
                        style={{
                          backgroundColor: colorBg,
                          marginTop: '-26px',
                          position: 'relative',
                          zIndex: 2,
                          border: '3px solid var(--card)',
                        }}
                      >
                        {w.icon}
                      </span>

                      {/* Category & Title */}
                      <div style={{ marginTop: '-44px', marginLeft: '66px' }} className="mb-4">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider block"
                          style={{ color: colorBg }}
                        >
                          {w.category}
                        </span>
                        <h4 className="font-bold text-[16px] text-[var(--nv)] leading-snug m-0">
                          {w.title}
                        </h4>
                      </div>

                      {/* Description */}
                      <p className="text-[13.5px] text-[var(--mu)] leading-relaxed mb-4">
                        {w.desc}
                      </p>

                      {/* Optional Support List */}
                      {w.supportList && w.supportList.length > 0 && (
                        <div className="mb-5 pt-3 border-t border-[var(--ln)]/70">
                          <b className="block text-[12px] font-bold text-[var(--nv)] uppercase tracking-wide mb-2">
                            You can support:
                          </b>
                          <ul className="text-[12.5px] text-[var(--tx)] space-y-1.5 pl-4 list-disc marker:text-[var(--bl)]">
                            {w.supportList.map((item, idx) => (
                              <li key={idx} className="leading-tight">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA Button */}
                  <div className="p-4 pt-0">
                    {w.buttonHref ? (
                      <a
                        href={w.buttonHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn w-full text-center justify-center py-2 text-xs shadow-xs"
                        style={{ backgroundColor: colorBg, borderColor: colorBg }}
                      >
                        {w.buttonText} →
                      </a>
                    ) : (
                      <Button
                        target={w.buttonTarget}
                        className="w-full text-center justify-center py-2 text-xs shadow-xs"
                        style={{ backgroundColor: colorBg, borderColor: colorBg }}
                        onClick={(e) => handleNavClick(e, w.buttonTarget)}
                      >
                        {w.buttonText} →
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Where Your Support Can Go */}
      <WhereSupportGoes onNavigate={onNavigate} />

      {/* 4. Action Banners (Volunteer & Partner) */}
      <section className="sec">
        <div className="w g2">
          {/* Volunteer Banner */}
          <div className="ban" style={{ background: 'var(--bl)' }}>
            <div className="ph select-none">{banners.volunteer.emoji}</div>
            <div>
              <h3 className="text-xl font-bold font-serif">{banners.volunteer.title}</h3>
              <p>{banners.volunteer.desc}</p>
              <a
                href={banners.volunteer.buttonHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w2 text-center"
              >
                {banners.volunteer.buttonText}
              </a>
            </div>
          </div>

          {/* Partner Banner */}
          <div className="ban" style={{ background: 'var(--gr)' }}>
            <div className="ph select-none">{banners.partner.emoji}</div>
            <div>
              <h3 className="text-xl font-bold font-serif">{banners.partner.title}</h3>
              <p>{banners.partner.desc}</p>
              <Button
                target={banners.partner.buttonTarget}
                variant="white-opaque"
                onClick={(e) => handleNavClick(e, banners.partner.buttonTarget)}
              >
                {banners.partner.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Stay Connected Strip */}
      <section className="sec soft">
        <div className="w g3 items-center">
          <div>
            <h2 style={{ margin: 0 }}>{stayConnected.title}</h2>
            <p className="text-[14px] text-[var(--mu)] my-2 leading-relaxed">
              {stayConnected.desc}
            </p>
            <i className="text-[13px] font-semibold text-[var(--nv)] block">
              {stayConnected.quote}
            </i>
          </div>

          <div className="flex justify-center items-center gap-3">
            {siteConfig.social.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full text-white grid place-items-center font-bold text-base shadow-md hover:scale-110 transition-transform"
                style={{ backgroundColor: s.bg }}
                aria-label={s.name}
              >
                {s.letter}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <b className="font-serif font-bold text-lg sm:text-xl text-[var(--nv)] block leading-snug">
              {stayConnected.orgName}
            </b>
            <small className="text-[12px] text-[var(--mu)] block mt-1">
              {stayConnected.tagline}
            </small>
          </div>
        </div>
      </section>

      {/* 6. Need Help Interactive Chips Section */}
      <NeedHelp />

      {/* 7. Impact Strip Section */}
      <ImpactStrip />
    </div>
  );
}
