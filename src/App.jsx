import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Header from './components/Header';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import InvolvedPage from './pages/InvolvedPage';
import Button from './components/Button';

export default function App() {
  const lenisRef = useRef(null);

  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const page = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(page);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    window.location.hash = page;
    setCurrentPage(page);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Setup scroll reveal animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(
      '#app .cd, #app h2, #app .cm>div, #app .g6>*, #app .st>*, #app .ban, #app .q'
    );

    elements.forEach((el, index) => {
      el.classList.add('rv');
      el.style.setProperty('--d', `${(index % 6) * 70}ms`);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  // Global button pointer-move shine effect
  useEffect(() => {
    const handlePointerMove = (e) => {
      const btn = e.target.closest && e.target.closest('.btn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        btn.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }
    };

    document.addEventListener('pointermove', handlePointerMove);
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Render current page content
  const renderPage = () => {
    if (currentPage.startsWith('pj')) {
      return <ProjectDetailPage projectId={currentPage} onNavigate={navigateTo} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'projects':
        return <ProjectsPage onNavigate={navigateTo} />;
      case 'involved':
        return <InvolvedPage onNavigate={navigateTo} />;
      default:
        // Placeholder for upcoming pages as we go page by page
        return (
          <section className="sec" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
            <div className="w text-center" style={{ maxWidth: '600px' }}>
              <h2 className="c capitalize" style={{ marginBottom: '16px' }}>
                {currentPage.replace(/[-_]/g, ' ')} Page
              </h2>
              <p style={{ color: 'var(--mu)', marginBottom: '24px' }}>
                Ready to be implemented next as we proceed page by page.
              </p>
              <Button target="home" variant="gold">
                ← Back to Home
              </Button>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--tx)]">
      {/* Welcome Splash Dialog */}
      <IntroScreen />

      {/* Main Sticky Header */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Page Content Container */}
      <main id="app" className="flex-1">
        {renderPage()}
      </main>

      {/* Site Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
