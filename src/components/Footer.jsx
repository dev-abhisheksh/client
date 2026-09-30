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
    <footer>
      <div className="w">
        {/* Organization Info */}
        <div>
          <b style={{ font: "700 18px 'Merriweather', serif" }}>
            {organization.name}
          </b>
          {organization.tagline}
        </div>

        {/* Quick Links */}
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

        {/* Our Work */}
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

        {/* Contact Info */}
        <div>
          <b>Contact</b>
          📍 {contact.address}
          <br />
          📞 <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a>
          <br />
          ✉ <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <br />
          💬{' '}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>

        {/* Copyright */}
        <div>{copyright}</div>
      </div>
    </footer>
  );
}
