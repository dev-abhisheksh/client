import React from 'react';
import { siteConfig } from '../data/siteData';

export default function Header({ currentPage, onNavigate }) {
  const { navLinks, social } = siteConfig;

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      window.location.hash = id;
    }
  };

  return (
    <header>
      <div className="w hd">
        {/* Brand Logo */}
        <a
          href="#home"
          className="logo flex items-center gap-[10px]"
          onClick={(e) => handleNavClick(e, 'home')}
          aria-label="Bethesda Charitable Trust – Home"
        >
          <img
            className="brand"
            alt="Bethesda Charitable Trust – Empowering Lives, Transforming Communities"
            src="/logo.png"
          />
        </a>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-[22px] ml-auto flex-wrap">
          {navLinks.map((link) => {
            const isActive =
              currentPage === link.id ||
              (currentPage === 'pay' && link.id === 'donate') ||
              (currentPage.startsWith('pj') && link.id === 'projects');

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={isActive ? 'on' : ''}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Social Icons */}
        <div className="so">
          {social.map((s, idx) => (
            <i
              key={idx}
              style={{ backgroundColor: s.bg }}
              title={s.name}
            >
              {s.letter}
            </i>
          ))}
        </div>
      </div>
    </header>
  );
}
