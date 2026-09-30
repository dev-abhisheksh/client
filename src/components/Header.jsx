import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteData';
import Button from './Button';

export default function Header({ currentPage, onNavigate }) {
  const { navLinks, social } = siteConfig;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      window.location.hash = id;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 transition-all duration-300">
        <div className="w flex items-center justify-between h-[72px] sm:h-[80px] lg:h-[88px]">
          {/* Brand Logo */}
          <a
            href="#home"
            className="logo flex items-center gap-2.5 z-10"
            onClick={(e) => handleNavClick(e, 'home')}
            aria-label="Bethesda Charitable Trust – Home"
          >
            <img
              className="brand h-[46px] sm:h-[56px] lg:h-[66px] w-auto transition-transform duration-300"
              alt="Bethesda Charitable Trust – Empowering Lives, Transforming Communities"
              src="/logo.png"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-[22px] ml-auto">
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

          {/* Desktop Social Icons */}
          <div className="hidden lg:flex items-center gap-2 ml-6 so">
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

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              type="button"
              className="w-11 h-11 rounded-xl flex flex-col justify-center items-center gap-[5px] bg-[var(--soft)] border border-[var(--ln)] text-[var(--nv)] transition-all hover:brightness-95 active:scale-95 z-50 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 transform origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 transform origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[#071634]/60 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[84%] max-w-[340px] z-50 bg-[var(--card)] shadow-2xl border-l border-[var(--ln)] flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 overflow-y-auto">
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--ln)] mb-6">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="BCT Logo"
                className="h-10 w-auto"
              />
            </div>
            <button
              type="button"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--mu)] hover:text-[var(--nv)] hover:bg-[var(--soft)] text-lg cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.id ||
                (currentPage === 'pay' && link.id === 'donate') ||
                (currentPage.startsWith('pj') && link.id === 'projects');

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-[15px] transition-all ${
                    isActive
                      ? 'bg-[var(--soft)] text-[var(--bl)] font-bold'
                      : 'text-[var(--tx)] hover:bg-[var(--soft)]/50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[var(--bl)]" />}
                </a>
              );
            })}
          </div>

          {/* Quick Donate CTA inside mobile menu */}
          <div className="mt-6 pt-6 border-t border-[var(--ln)]">
            <Button
              target="donate"
              variant="gold"
              className="w-full text-center py-3 shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donate Now
            </Button>
          </div>
        </div>

        {/* Drawer Footer Social and Info */}
        <div className="p-6 bg-[var(--soft)] border-t border-[var(--ln)]">
          <small className="block text-xs font-semibold text-[var(--mu)] uppercase tracking-wider mb-3">
            Connect With Us
          </small>
          <div className="flex items-center gap-3 mb-4 so">
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
          <p className="text-xs text-[var(--mu)] m-0 leading-relaxed">
            Bethesda Charitable Trust<br />
            Valsao Pale, South Goa
          </p>
        </div>
      </div>
    </>
  );
}
