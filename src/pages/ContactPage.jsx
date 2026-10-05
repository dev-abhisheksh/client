import React, { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import NeedHelp from '../components/NeedHelp';
import ImpactStrip from '../components/ImpactStrip';
import { contactContent, COLOR_MAP } from '../data/siteData';
import { usePageHero } from '../hooks';
import { HeroBackground, HeroControls } from '../components/ProjectMediaViewer';

export default function ContactPage({ onNavigate }) {
  const {
    hero,
    channels,
    enquiry,
    helpServices,
    whatsappBanner,
    location,
    statsStrip,
    faq,
  } = contactContent;

  const heroMedia = usePageHero('contact');

  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (index) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNav = (target) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <div className="contact-page">
      {/* 1. Hero Section */}
      <Hero
        variant="dk"
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        actions={hero.actions}
        face={heroMedia.hasPhotos ? null : hero.avatar}
        bgMedia={
          heroMedia.hasPhotos ? (
            <HeroBackground
              photos={heroMedia.photos}
              viewMode={heroMedia.mediaMode}
              activeIndex={heroMedia.activeIndex}
              title={hero.title}
            />
          ) : null
        }
        media={
          heroMedia.isAdmin ? (
            <HeroControls
              photos={heroMedia.photos}
              viewMode={heroMedia.mediaMode}
              setViewMode={heroMedia.handleToggleMediaMode}
              activeIndex={heroMedia.activeIndex}
              setActiveIndex={heroMedia.setActiveIndex}
              onSelectCoverPhoto={heroMedia.handleSelectCoverPhoto}
              onDeletePhoto={heroMedia.handleDeletePhoto}
              isAdmin={heroMedia.isAdmin}
              isSaving={heroMedia.isSaving}
              onUploadPhoto={heroMedia.handleUploadPhoto}
              isUploading={heroMedia.isUploading}
            />
          ) : null
        }
      />

      {/* 2. Contact Channels (4 Cards in .g4) */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="w g4">
          {channels.map((c, index) => {
            const colorBg = COLOR_MAP[c.color] || 'var(--bl)';
            return (
              <div key={index} className="cd ct">
                <div className="r">
                  <span className="ic shrink-0" style={{ background: colorBg }}>
                    {c.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <b className="truncate block">{c.title}</b>
                    <small className="break-all">{c.detail}</small>
                  </div>
                </div>
                <Button
                  href={c.href}
                  variant="default"
                  className="w-full text-center justify-center text-[13px] py-2.5"
                >
                  {c.actionText} →
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Enquiry / Google Form Section */}
      <section className="sec" id="enquiry">
        <div className="w contact-enquiry-grid">
          {/* Left: We'd Love to Hear From You */}
          <div className="cd p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <h2 className="text-[20px] sm:text-[24px] mb-2 sm:mb-3">
                {enquiry.cardLeft.title}
              </h2>
              <div className="text-[13.5px] sm:text-[14.5px] text-[var(--mu)] leading-relaxed space-y-1 sm:space-y-1.5">
                {enquiry.cardLeft.points.map((pt, i) => (
                  <p key={i} className="m-0">
                    {pt}
                  </p>
                ))}
              </div>
            </div>
            <div
              className="h-[140px] sm:h-[180px] md:h-[200px] text-5xl sm:text-6xl rounded-xl mt-4 sm:mt-5 flex items-center justify-center select-none"
              style={{
                background: 'linear-gradient(135deg, #c9dfb8, #5f9a5a)',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              {enquiry.cardLeft.emoji}
            </div>
          </div>

          {/* Right: Fill Our Enquiry Form */}
          <div className="cd p-6 sm:p-8 md:p-9 flex flex-col justify-center items-start gap-4">
            <h2 className="text-[20px] sm:text-[24px] md:text-[26px] m-0">
              {enquiry.cardRight.title}
            </h2>
            <p className="text-[14px] sm:text-[15.5px] text-[var(--mu)] leading-relaxed m-0 max-w-lg">
              {enquiry.cardRight.description}
            </p>
            <Button
              href={enquiry.cardRight.googleFormUrl}
              variant="default"
              className="w-full sm:w-auto text-center justify-center text-[14px] py-3.5 px-6 font-bold"
            >
              {enquiry.cardRight.buttonText}
            </Button>
          </div>
        </div>
      </section>

      {/* 4. How Can We Help? (6 Service Cards in .help-services-grid) */}
      <section className="sec soft">
        <div className="w">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-[22px] sm:text-[26px]">How Can We Help?</h2>
          </div>
          <div className="help-services-grid g6">
            {helpServices.map((h, i) => {
              const colorBg = COLOR_MAP[h.color] || 'var(--bl)';
              return (
                <div
                  key={i}
                  className="cd sm group"
                  onClick={() => handleNav(h.target)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNav(h.target);
                    }
                  }}
                >
                  <span className="ic" style={{ background: colorBg }}>
                    {h.icon}
                  </span>
                  <h4 style={{ color: colorBg }}>{h.title}</h4>
                  <p>{h.desc}</p>
                  <span className="lk">
                    Learn More →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Need Help Interactive Component */}
      <NeedHelp />

      {/* 6. Prefer WhatsApp? Direct Banner (.wa) */}
      <section className="sec">
        <div className="w">
          <div className="wa">
            <div className="wa-top">
              <span
                className="ic"
                style={{
                  background: 'var(--gr)',
                  margin: 0,
                  width: '58px',
                  height: '58px',
                  fontSize: '28px',
                  flexShrink: 0,
                }}
              >
                {whatsappBanner.icon}
              </span>
              <div>
                <h2 className="text-[20px] sm:text-[24px]">
                  {whatsappBanner.title}
                  <br />
                  <small className="text-[15px] sm:text-[17px] font-normal opacity-90">
                    {whatsappBanner.subtitle}
                  </small>
                </h2>
              </div>
            </div>
            <p className="flex-1 text-[13.5px] sm:text-[14px] leading-relaxed m-0">
              <b>Have a quick question?</b> {whatsappBanner.description}
            </p>
            <Button
              href={whatsappBanner.whatsappUrl}
              variant="green"
              className="w-full lg:w-auto py-3 px-6 whitespace-nowrap text-center justify-center shrink-0"
            >
              {whatsappBanner.buttonText}
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Location & Directions Section (.contact-loc-grid) */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="w contact-loc-grid">
          {/* Map iframe */}
          <div
            className="cd overflow-hidden h-[260px] sm:h-[300px] md:h-full min-h-[260px] relative"
          >
            <iframe
              title="Bethesda Charitable Trust location"
              src={location.mapEmbedUrl}
              className="w-full h-full absolute inset-0 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Address info card */}
          <div
            className="cd p-5 sm:p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-[18px] sm:text-[19px] mb-2">{location.title}</h3>
              <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-[var(--mu)] my-3">
                <b>{location.orgName}</b>
                <br />
                {location.address}
              </p>
            </div>
            <Button
              href={location.directionsUrl}
              variant="default"
              className="w-full text-center justify-center text-[13px] sm:text-[14px]"
            >
              Get Directions →
            </Button>
          </div>

          {/* Inspirational faith banner */}
          <div
            className="cd flex flex-col justify-center items-center text-center p-5 sm:p-6 min-h-[120px] sm:min-h-[160px]"
            style={{
              background: 'linear-gradient(135deg, #8fc7ee, #4c8f4c)',
              color: '#fff',
              font: "italic 20px 'Merriweather', serif",
              textShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          >
            <span className="text-[18px] sm:text-[21px] leading-relaxed">
              {location.inspirationalQuote}
            </span>
          </div>
        </div>
      </section>

      {/* 8. Stats Strip */}
      <section className="sec soft">
        <div className="w contact-st-grid">
          <div className="contact-st-title">
            <h2 style={{ margin: 0 }} className="text-[18px] sm:text-[20px]">
              {statsStrip.title}
            </h2>
          </div>
          {statsStrip.stats.map((s, index) => (
            <div key={index} className="contact-st-item">
              <b>{s.value}</b>
              <span className="text-[12px] sm:text-[13px] text-[var(--mu)] block mt-0.5">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ Accordion Section */}
      <section className="sec">
        <div className="w">
          <h2 className="mb-6 text-[20px] sm:text-[22px]">
            Frequently Asked Questions
          </h2>

          <div className="g2">
            {faq.map((item, index) => {
              const isOpen = !!openFaqs[index];
              return (
                <div
                  key={index}
                  className={`cd fq ${isOpen ? 'o' : ''}`}
                  onClick={() => toggleFaq(index)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFaq(index);
                    }
                  }}
                >
                  <b>
                    <span>{item.question}</span>
                    <span className="fq-icon">+</span>
                  </b>
                  <div className="fq-body">
                    <div className="fq-content">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Closing Impact Strip */}
      <ImpactStrip />
    </div>
  );
}
