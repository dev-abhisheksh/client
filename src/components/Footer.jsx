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
          <b style={{ font: "700 18px 'Merriweather', serif", color: '#fff', display: 'block', marginBottom: '8px' }}>
            {organization.name}
          </b>
          <span style={{ color: '#dbe6fb', lineHeight: '1.6', display: 'block' }}>
            {organization.tagline}
          </span>
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
          <div style={{ color: '#dbe6fb', lineHeight: '1.8' }}>
            <div className="flex items-center gap-2 my-1">
              <span className="shrink-0 select-none">📍</span>
              <span>{contact.address}</span>
            </div>
            <div className="flex items-center gap-2 my-1">
              <span className="shrink-0 select-none">📞</span>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="hover:text-[var(--go)] inline"
                style={{ margin: 0, display: 'inline' }}
              >
                {contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 my-1">
              <span className="shrink-0 select-none">✉</span>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-[var(--go)] inline break-all"
                style={{ margin: 0, display: 'inline' }}
              >
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 my-1">
              <span className="shrink-0 select-none">💬</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--go)] inline"
                style={{ margin: 0, display: 'inline' }}
              >
                WhatsApp
              </a>
            </div>
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
            <div className="mt-3 flex justify-end max-[600px]:justify-start">
              <button
                type="button"
                onClick={openLoginModal}
                className="text-[11px] font-semibold text-[#D6A84F] hover:text-[#f7e5b5] bg-[#ffffff0d] hover:bg-[#ffffff1c] border border-[#D6A84F44] hover:border-[#D6A84F] px-2.5 py-1 rounded transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 tracking-wide"
                title={isAdmin ? 'Admin Dashboard (Logged In)' : 'Admin Login'}
              >
                <span className="opacity-80">{isAdmin ? '⚡' : '🔒'}</span>
                <span>{isAdmin ? 'Admin' : 'Admin Login'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
