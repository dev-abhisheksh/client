import React from 'react';
import { footerContent, siteConfig } from '../data/siteData';

export default function Footer({ onNavigate }) {
  const { organization, quickLinks, ourWork, copyright } = footerContent;
  const { contact } = siteConfig;

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  const whatsappUrl = `https://wa.me/${contact.whatsappHelp}?text=${encodeURIComponent(
    'Hello Bethesda Charitable Trust, I would like to know more.'
  )}`;

  return (
    <footer className="py-12 sm:py-16 bg-[#0b1f45] text-[#dbe6fb] text-[13px]">
      <div className="w grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Organization Info */}
        <div className="sm:col-span-2 md:col-span-1 lg:col-span-1">
          <b className="text-white text-[17px] sm:text-[18px] mb-2 block" style={{ fontFamily: "'Merriweather', serif" }}>
            {organization.name}
          </b>
          <p className="m-0 leading-relaxed text-[#dbe6fb]/80">
            {organization.tagline}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <b className="text-white font-bold block mb-3 text-[14px]">Quick Links</b>
          <div className="flex flex-col gap-1.5">
            {quickLinks.map((link, idx) => (
              <a
                key={idx}
                href={`#${link.target}`}
                onClick={(e) => handleLinkClick(e, link.target)}
                className="py-0.5 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Our Work */}
        <div>
          <b className="text-white font-bold block mb-3 text-[14px]">Our Work</b>
          <div className="flex flex-col gap-1.5">
            {ourWork.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.target}`}
                onClick={(e) => handleLinkClick(e, item.target)}
                className="py-0.5 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <b className="text-white font-bold block mb-3 text-[14px]">Contact</b>
          <div className="flex flex-col gap-2 leading-relaxed">
            <div>📍 {contact.address}</div>
            <div>
              📞{' '}
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="hover:text-white transition-colors"
              >
                {contact.phone}
              </a>
            </div>
            <div>
              ✉{' '}
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-white transition-colors break-all"
              >
                {contact.email}
              </a>
            </div>
            <div>
              💬{' '}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline font-medium"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#dbe6fb]/60">
          <div>{copyright}</div>
          <div className="flex items-center gap-4">
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white">About</a>
            <a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')} className="hover:text-white">Projects</a>
            <a href="#donate" onClick={(e) => handleLinkClick(e, 'donate')} className="hover:text-white">Donate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
