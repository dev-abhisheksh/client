import React, { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import NeedHelp from '../components/NeedHelp';
import ImpactStrip from '../components/ImpactStrip';
import { contactContent, COLOR_MAP } from '../data/siteData';

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
        face={hero.avatar}
      />

      {/* 2. Contact Channels (4 Cards in .g4) */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="w g4">
          {channels.map((c, index) => {
            const colorBg = COLOR_MAP[c.color] || 'var(--bl)';
            return (
              <div key={index} className="cd ct">
                <div className="r">
                  <span className="ic" style={{ background: colorBg }}>
                    {c.icon}
                  </span>
                  <div>
                    <b>{c.title}</b>
                    <small>{c.detail}</small>
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

      {/* 3. Enquiry / Google Form Section (.g2) */}
      <section className="sec" id="enquiry">
        <div className="w g2" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
          {/* Left: We'd Love to Hear From You */}
          <div className="cd p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <h2 className="text-[22px] sm:text-[24px] mb-3">
                {enquiry.cardLeft.title}
              </h2>
              <div className="text-[14px] text-[var(--mu)] leading-relaxed space-y-1">
                {enquiry.cardLeft.points.map((pt, i) => (
                  <p key={i} className="m-0">
                    {pt}
                  </p>
                ))}
              </div>
            </div>
            <div
              style={{
                height: '200px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #c9dfb8, #5f9a5a)',
                display: 'grid',
                placeItems: 'center',
                fontSize: '64px',
                marginTop: '20px',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              {enquiry.cardLeft.emoji}
            </div>
          </div>

          {/* Right: Fill Our Enquiry Form */}
          <div className="cd p-7 sm:p-9 flex flex-col justify-center items-start gap-4">
            <h2 className="text-[22px] sm:text-[26px] m-0">
              {enquiry.cardRight.title}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[var(--mu)] leading-relaxed m-0 max-w-lg">
              {enquiry.cardRight.description}
            </p>
            <Button
              href={enquiry.cardRight.googleFormUrl}
              variant="default"
              className="text-[14px] py-3.5 px-6 font-bold"
            >
              {enquiry.cardRight.buttonText}
            </Button>
          </div>
        </div>
      </section>

      {/* 4. How Can We Help? (6 Service Cards in .g6) */}
      <section className="sec soft">
        <div className="w">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="c">How Can We Help?</h2>
          </div>
          <div className="g6">
            {helpServices.map((h, i) => {
              const colorBg = COLOR_MAP[h.color] || 'var(--bl)';
              return (
                <div key={i} className="cd sm">
                  <span className="ic" style={{ background: colorBg }}>
                    {h.icon}
                  </span>
                  <h4 style={{ color: colorBg }}>{h.title}</h4>
                  <p>{h.desc}</p>
                  <a
                    onClick={() => handleNav(h.target)}
                    className="inline-flex items-center gap-1 cursor-pointer"
                  >
                    Learn More →
                  </a>
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
            <span
              className="ic"
              style={{
                background: 'var(--gr)',
                margin: 0,
                width: '68px',
                height: '68px',
                fontSize: '32px',
                flexShrink: 0,
              }}
            >
              {whatsappBanner.icon}
            </span>
            <div>
              <h2 className="text-[22px] sm:text-[24px]">
                {whatsappBanner.title}
                <br />
                <small className="text-[17px] font-normal opacity-90">
                  {whatsappBanner.subtitle}
                </small>
              </h2>
            </div>
            <p className="flex-1 min-w-[240px] text-[14px] leading-relaxed">
              <b>Have a quick question?</b> {whatsappBanner.description}
            </p>
            <Button
              href={whatsappBanner.whatsappUrl}
              variant="green"
              className="py-3 px-6 whitespace-nowrap"
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
            className="cd overflow-hidden"
            style={{ minHeight: '300px', position: 'relative' }}
          >
            <iframe
              title="Bethesda Charitable Trust location"
              src={location.mapEmbedUrl}
              style={{
                border: 0,
                width: '100%',
                height: '100%',
                minHeight: '300px',
                position: 'absolute',
                inset: 0,
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Address info card */}
          <div
            className="cd p-6 flex flex-col justify-between"
            style={{ padding: '24px' }}
          >
            <div>
              <h3 className="text-[19px] mb-2">{location.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--mu)] my-3">
                <b>{location.orgName}</b>
                <br />
                {location.address}
              </p>
            </div>
            <Button href={location.directionsUrl} variant="default" className="w-full text-center justify-center">
              Get Directions →
            </Button>
          </div>

          {/* Inspirational faith banner */}
          <div
            className="cd flex flex-col justify-center items-center text-center p-6"
            style={{
              background: 'linear-gradient(135deg, #8fc7ee, #4c8f4c)',
              color: '#fff',
              font: "italic 22px 'Merriweather', serif",
              textShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          >
            {location.inspirationalQuote}
          </div>
        </div>
      </section>

      {/* 8. Stats Strip */}
      <section className="sec soft">
        <div className="w st">
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>
              {statsStrip.title}
            </h2>
          </div>
          {statsStrip.stats.map((s, index) => (
            <div key={index}>
              <b>{s.value}</b>
              {s.label}
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ Accordion Section */}
      <section className="sec">
        <div className="w">
          <h2 className="mb-6" style={{ fontSize: '22px' }}>
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
                >
                  <b>
                    <span>{item.question}</span>
                    <span>+</span>
                  </b>
                  <p>{item.answer}</p>
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
