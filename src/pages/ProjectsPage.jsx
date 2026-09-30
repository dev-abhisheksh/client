import React from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import ImpactStrip from '../components/ImpactStrip';
import { projectsContent, COLOR_MAP } from '../data/siteData';

export default function ProjectsPage({ onNavigate }) {
  const { hero, projects } = projectsContent;

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <div className="projects-page">
      {/* 1. Hero Section (Matching Dark Variant of other pages) */}
      <Hero
        variant="dk"
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        actions={[hero.action]}
        face={hero.avatar}
      />

      {/* 2. Seven Areas of Service Showcase Grid */}
      <section className="sec soft">
        <div className="w">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="c">Our Service Initiatives</h2>
            <p className="text-[14px] sm:text-[15px] text-[var(--mu)] leading-relaxed mt-2">
              Explore each of our ongoing community programs and see how your support brings hope, care, and practical transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {projects.map((p, index) => {
              const colorBg = COLOR_MAP[p.color] || 'var(--bl)';
              return (
                <div
                  key={p.id}
                  className="bg-[var(--card)] border border-[var(--ln)] rounded-2xl p-5 hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                  onClick={(e) => handleNavClick(e, p.id)}
                >
                  {/* Top Bar: Squircle Icon Badge + Step Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl text-white shadow-xs group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: colorBg }}
                      >
                        {p.icon}
                      </span>
                      <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--soft)] text-[var(--mu)] group-hover:bg-[var(--bl)] group-hover:text-white transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3
                      style={{ color: 'var(--nv)' }}
                      className="font-bold text-[16px] sm:text-[17px] leading-snug mb-2 group-hover:text-[var(--bl)] transition-colors"
                    >
                      {p.title}
                    </h3>
                    <p className="text-[13px] text-[var(--mu)] leading-relaxed mb-4">
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom: Goal Strip & View Gallery Action */}
                  <div className="pt-3 border-t border-[var(--ln)]/60 flex flex-col gap-3">
                    <div
                      className="bg-[var(--soft)]/70 border-l-[3px] rounded-r-lg px-2.5 py-1.5 text-[11.5px] leading-snug text-[var(--tx)]/90"
                      style={{ borderLeftColor: colorBg }}
                    >
                      <span className="font-bold mr-1 text-[var(--nv)]">Our Goal:</span>
                      <i>{p.goal}</i>
                    </div>

                    <Button
                      target={p.id}
                      variant="default"
                      className="w-full text-center justify-center py-2 text-xs shadow-xs"
                      onClick={(e) => handleNavClick(e, p.id)}
                    >
                      View Gallery →
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Impact Strip Section */}
      <ImpactStrip />
    </div>
  );
}
