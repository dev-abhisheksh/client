import React, { useState, useEffect, useMemo } from 'react';
import { siteConfig } from '../data/siteData';

export default function IntroScreen() {
  const [visible, setVisible] = useState(false);
  const [isOut, setIsOut] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem('bctIntro');
    } catch (_) {}

    if (!seen) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();

      const timer = setTimeout(() => {
        handleClose();
      }, 4700);

      const handleKey = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          handleClose();
        }
      };

      window.addEventListener('keydown', handleKey);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKey);
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
      };
    }
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      left: `${(i * 5.5 + Math.random() * 5) % 100}%`,
      size: 2 + Math.random() * 4,
      delay: `${Math.random() * 4}s`,
      duration: `${5 + Math.random() * 5}s`,
    }));
  }, []);

  const handleClose = () => {
    setIsOut(true);
    try {
      sessionStorage.setItem('bctIntro', '1');
    } catch (_) {}
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();

    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };

  if (!visible) return null;

  return (
    <div
      id="intro"
      className={isOut ? 'out' : ''}
      role="dialog"
      aria-label="Welcome"
    >
      {/* Floating particles */}
      <div className="ps">
        {particles.map((p, idx) => (
          <i
            key={idx}
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="ib"></div>

      <div className="icn">
        <div className="il">
          <img alt="Bethesda Charitable Trust logo" src="/logo.png" />
        </div>
        <div className="iw">Welcome to</div>
        <h1>{siteConfig.name}</h1>
        <div className="ir"></div>
        <p className="it">{siteConfig.tagline}</p>
        <small className="is">{siteConfig.subTagline}</small>
        <button
          type="button"
          className="ie btn g mt-[30px]"
          onClick={handleClose}
        >
          ENTER WEBSITE →
        </button>
      </div>

      <div className="ip">
        <span></span>
      </div>
    </div>
  );
}
