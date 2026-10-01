import React from 'react';
import { footerContent, siteConfig } from '../data/siteData';
import { useAuth } from '../context/AuthContext';

export default function Footer({ onNavigate }) {
  const { organization, quickLinks, ourWork, copyright, credit } = footerContent;
  const { contact } = siteConfig;
  const { isAdmin, user, openLoginModal } = useAuth();

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
    <footer>
      {/* 4 Columns Main Grid */}
      <div className="w">
        {/* Col 1: Organization Info */}
        <div>
          <b style={{ font: "700 18px 'Merriweather', serif" }}>
            {organization.name}
          </b>
          {organization.tagline}
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <b>Quick Links</b>
          {quickLinks.map((link, idx) => (
            <a
              key={idx}
              href={`#${link.target}`}
              onClick={(e) => handleLinkClick(e, link.target)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Col 3: Our Work */}
        <div>
          <b>Our Work</b>
          {ourWork.map((item, idx) => (
            <a
              key={idx}
              href={`#${item.target}`}
              onClick={(e) => handleLinkClick(e, item.target)}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Col 4: Contact */}
        <div>
          <b>Contact</b>
          <div className="flex items-center gap-1.5 my-1">
            <span className="shrink-0 select-none">📍</span>
            <span>Valsao Pale, South Goa</span>
          </div>
          <div className="flex items-center gap-1.5 my-1">
            <span className="shrink-0 select-none">📞</span>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, '')}`}
              className="whitespace-nowrap"
            >
              {contact.phone}
            </a>
          </div>
          <div className="flex items-center gap-1.5 my-1">
            <span className="shrink-0 select-none">✉</span>
            <a href={`mailto:${contact.email}`} className="break-all">
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-1.5 my-1">
            <span className="shrink-0 select-none">💬</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Nexora Technologies credit */}
      <div className="w fb">
        <span>{copyright}</span>
        {credit && (
          <div className="cr">
            <b>{credit.title}</b>
            <span>{credit.subtitle}</span>
            <a href={`mailto:${credit.email}`}>{credit.email}</a>

            {/* Admin Login Button below Nexora Technologies credit */}
            <div className="mt-2.5 flex justify-end max-[600px]:justify-start">
              <button
                type="button"
                onClick={openLoginModal}
                
               
              >
                {/* <span className="text-[10px]">{isAdmin ? '⚡' : '🔒'}</span> */}
                <span>{isAdmin ? 'Admin' : 'Admin Login'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
