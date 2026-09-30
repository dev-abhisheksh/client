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
    <footer className="bg-[#0b1f45] text-[#dbe6fb] py-[60px] text-[13px]">
      <div className="w grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr_auto] gap-6 lg:gap-7 items-start">
        {/* Col 1: Organization Info */}
        <div>
          <b
            className="text-white block mb-2 text-[18px] leading-tight"
            style={{ fontFamily: "'Merriweather', Georgia, serif" }}
          >
            {organization.name}
          </b>
          <p className="m-0 leading-normal text-[#dbe6fb]/90">
            {organization.tagline}
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <b className="text-white block mb-2 font-bold">Quick Links</b>
          <div className="flex flex-col gap-1">
            {quickLinks.map((link, idx) => (
              <a
                key={idx}
                href={`#${link.target}`}
                onClick={(e) => handleLinkClick(e, link.target)}
                className="block hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Col 3: Our Work */}
        <div>
          <b className="text-white block mb-2 font-bold">Our Work</b>
          <div className="flex flex-col gap-1">
            {ourWork.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.target}`}
                onClick={(e) => handleLinkClick(e, item.target)}
                className="block hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Col 4: Contact */}
        <div>
          <b className="text-white block mb-2 font-bold">Contact</b>
          <div className="flex flex-col gap-1.5 leading-normal">
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 select-none">📍</span>
              <span>Valsao Pale, South Goa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 select-none">📞</span>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 select-none">✉</span>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-white transition-colors break-all"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 select-none">💬</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Col 5: Copyright */}
        <div className="text-[#dbe6fb]/80 text-[12px] sm:text-[13px] leading-relaxed self-start lg:max-w-[190px]">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
