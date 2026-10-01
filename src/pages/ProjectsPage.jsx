import React from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import ImpactStrip from '../components/ImpactStrip';
import ImageWithLoader from '../components/ImageWithLoader';
import { projectsContent, COLOR_MAP } from '../data/siteData';
import { useProjects } from '../hooks';

export default function ProjectsPage({ onNavigate }) {
  const { hero, projects: fallbackProjects } = projectsContent;
  const { data: dbData } = useProjects();

  const dbProjects = dbData?.data?.projects;

  // Merge database values into canonical fallback project structure (orders 0..6)
  const displayProjects = fallbackProjects.map((fallback, index) => {
    if (dbProjects && dbProjects[index]) {
      return { ...fallback, ...dbProjects[index] };
    }
    return fallback;
  });

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
            {displayProjects.map((p, index) => {
              const colorBg = COLOR_MAP[p.color] || 'var(--bl)';
              const photos = p.photos || [];
              const firstPhoto =
                photos.length > 0
                  ? typeof photos[0] === 'string'
                    ? photos[0]
                    : photos[0]?.url
                  : null;

              return (
                <div
                  key={p.id || index}
                  className="group relative rounded-2xl overflow-hidden h-[480px] sm:h-[490px] flex flex-col justify-between border border-white/10 hover:border-amber-400/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-slate-900"
                  onClick={(e) => handleNavClick(e, p.id)}
                >
                  {/* 1. Background: First image of project or branded gradient fallback */}
                  {firstPhoto ? (
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <ImageWithLoader
                        src={firstPhoto}
                        alt={p.title}
                        containerClassName="w-full h-full"
                        skeletonClassName="!bg-gradient-to-r !from-[#071430] !via-[#0e275c] !to-[#071430]"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  ) : (
                    <div
                      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${colorBg} 0%, #071430 100%)`,
                      }}
                    >
                      <span className="text-8xl opacity-15 select-none pointer-events-none transform -rotate-12 group-hover:scale-110 transition-transform duration-500">
                        {p.icon}
                      </span>
                    </div>
                  )}

                  {/* 2. Top Bar: Floating Icon & Initiative Number Badges */}
                  <div className="p-4 flex items-center justify-between relative z-10 pointer-events-none">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg text-white shadow-lg backdrop-blur-md border border-white/20 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: `${colorBg}dd` }}
                    >
                      {p.icon}
                    </span>
                    <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 border border-white/15 shadow-sm">
                      0{index + 1}
                    </span>
                  </div>

                  {/* 3. Bottom Text Overlay: Transparent layer taking 50% or more of card height */}
                  <div className="relative z-10 w-full min-h-[52%] sm:min-h-[55%] p-5 flex flex-col justify-between rounded-b-2xl bg-gradient-to-t from-[#071430]/95 via-[#071430]/85 to-[#071430]/65 backdrop-blur-md border-t border-white/15 shadow-2xl text-white">
                    <div>
                      {/* Title */}
                      <h3 className="font-bold text-[17px] sm:text-[18px] leading-snug mb-2 text-white group-hover:text-amber-300 transition-colors drop-shadow-sm">
                        {p.title}
                      </h3>
                      {/* Description */}
                      <p className="text-[12.5px] leading-relaxed text-white/80 line-clamp-3 mb-3">
                        {p.desc}
                      </p>
                    </div>

                    {/* Bottom: Goal Strip & View Gallery Action */}
                    <div className="pt-2 flex flex-col gap-3">
                      <div
                        className="bg-white/10 border-l-[3px] rounded-r-lg px-2.5 py-1.5 text-[11px] leading-snug text-white/90 backdrop-blur-sm"
                        style={{ borderLeftColor: colorBg }}
                      >
                        <span className="font-bold mr-1 text-amber-300">Our Goal:</span>
                        <i className="text-white/85">{p.goal}</i>
                      </div>

                      <Button
                        target={p.id}
                        variant="gold"
                        className="w-full text-center justify-center py-2 text-xs font-bold shadow-md group-hover:brightness-110 transition-all"
                        onClick={(e) => handleNavClick(e, p.id)}
                      >
                        View Gallery →
                      </Button>
                    </div>
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
