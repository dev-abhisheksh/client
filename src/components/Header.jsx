import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteData';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

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
      <header className="sticky top-0 z-40 transition-all duration-300">
        <div className="w hd">
          {/* Brand Logo - clean & proportional */}
          <a
            href="#home"
            className="logo flex items-center shrink-0 z-10"
            onClick={(e) => handleNavClick(e, 'home')}
            aria-label="Bethesda Charitable Trust – Home"
          >
            <img
              className="brand"
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
                ((currentPage.startsWith('pj') || currentPage === 'special-projects') && link.id === 'projects');

              if (link.id === 'donate') {
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="btn r inline-flex items-center px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer !text-white ml-1"
                    style={{
                      minHeight: '34px',
                    }}
                  >
                    Donate
                  </a>
                );
              }

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


          {/* Desktop Social Icons & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2 ml-6">
            {social.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
              >
                <i
                  style={{ backgroundColor: s.bg }}
                  className="w-7 h-7 rounded-full grid place-items-center text-white font-bold text-xs not-italic cursor-pointer"
                >
                  {s.letter}
                </i>
              </a>
            ))}
            <ThemeToggle className="ml-2" />
          </div>

          {/* Mobile Right Controls: Theme Toggle + Compact Donate Pill + Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {/* Quick Donate CTA Pill on mobile */}
            <a
              href="#donate"
              onClick={(e) => handleNavClick(e, 'donate')}
              className="btn r text-xs font-bold rounded-full shadow-md inline-flex items-center !text-white"
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                minHeight: '34px',
              }}
            >
              Donate
            </a>

            {/* Tactile Hamburger Button */}
            <button
              type="button"
              className="w-10 h-10 rounded-xl flex flex-col justify-center items-center gap-[4.5px] bg-[var(--soft)] border border-[var(--ln)] text-[var(--nv)] transition-all hover:bg-[var(--soft)]/80 active:scale-95 cursor-pointer z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-[18px] h-[2px] bg-current rounded-full transition-all duration-300 transform origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                }`}
              />
              <span
                className={`w-[18px] h-[2px] bg-current rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`w-[18px] h-[2px] bg-current rounded-full transition-all duration-300 transform origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-[#071634]/60 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[82%] max-w-[320px] z-50 bg-[var(--card)] shadow-2xl border-l border-[var(--ln)] flex flex-col justify-between transition-all duration-300 ease-out lg:hidden ${
          mobileMenuOpen
            ? 'translate-x-0 opacity-100 visible pointer-events-auto'
            : 'translate-x-full opacity-0 invisible pointer-events-none'
        }`}
        style={{
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
        }}
      >
        <div className="p-5 sm:p-6 overflow-y-auto">
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[var(--ln)] mb-5">
            <img
              src="/logo.png"
              alt="BCT Logo"
              className="h-8 w-auto bg-white rounded-md p-1 shadow-xs"
            />
            <button
              type="button"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--mu)] hover:text-[var(--nv)] hover:bg-[var(--soft)] text-base cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.id ||
                (currentPage === 'pay' && link.id === 'donate') ||
                ((currentPage.startsWith('pj') || currentPage === 'special-projects') && link.id === 'projects');

              if (link.id === 'donate') {
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-[14px] bg-red-600 text-white shadow-xs transition-all mt-1"
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                      Give
                    </span>
                  </a>
                );
              }

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-[14px] transition-all ${
                    isActive
                      ? 'bg-[var(--soft)] text-[var(--bl)] font-bold'
                      : 'text-[var(--tx)] hover:bg-[var(--soft)]/60'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--bl)]" />}
                </a>
              );
            })}
          </div>


          {/* Quick Donate CTA inside mobile menu */}
          <div className="mt-5 pt-5 border-t border-[var(--ln)]">
            <Button
              target="donate"
              variant="red"
              className="w-full text-center py-2.5 text-xs shadow-md font-bold !bg-red-600 hover:!bg-red-700 !text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donate Now
            </Button>
          </div>
        </div>

        {/* Drawer Footer Social and Info */}
        <div className="p-5 bg-[var(--soft)] border-t border-[var(--ln)]">
          <small className="block text-[11px] font-bold text-[var(--mu)] uppercase tracking-wider mb-2.5">
            Connect With Us
          </small>
          <div className="flex items-center gap-2.5 mb-3 so">
            {social.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
              >
                <i
                  style={{ backgroundColor: s.bg }}
                >
                  {s.letter}
                </i>
              </a>
            ))}
          </div>
          <p className="text-[11px] text-[var(--mu)] m-0 leading-relaxed">
            Bethesda Charitable Trust<br />
            Valsao Pale, South Goa
          </p>
        </div>
      </div>
    </>
  );
}
