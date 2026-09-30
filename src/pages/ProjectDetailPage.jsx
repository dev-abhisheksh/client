import React from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import { projectsContent } from '../data/siteData';

export default function ProjectDetailPage({ projectId, onNavigate }) {
  const { projects } = projectsContent;

  // Find project by id (e.g. 'pj0') or index
  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;
  const project = projects[activeIndex];

  // Circular previous and next calculation
  const total = projects.length;
  const prevIndex = (activeIndex + total - 1) % total;
  const nextIndex = (activeIndex + 1) % total;

  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  const hasPhotos = project.photos && project.photos.length > 0;

  return (
    <div className="project-detail-page">
      {/* 1. Hero Section */}
      <Hero
        variant="dk"
        eyebrow="Project Gallery"
        title={project.title}
        subtitle={`Gallery for ${project.title}`}
        description={project.desc}
        actions={[
          { label: '← All Projects', target: 'projects', variant: 'white-outline' },
          { label: 'Support This Project', target: 'contact', variant: 'gold' },
        ]}
        face={project.icon}
      />

      {/* 2. About The Project */}
      <section className="sec">
        <div className="w" style={{ maxWidth: '860px' }}>
          <div>
            <h2>About {project.title}</h2>
            <p className="text-[14px] sm:text-[15px] text-[var(--tx)] leading-relaxed mt-3">
              {project.aboutText}
            </p>
            <div className="q mt-5">
              <b className="font-bold">Our goal: </b>
              <i>{project.goal}</i>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Gallery Section */}
      <section className="sec soft">
        <div className="w">
          <h2 className="mb-6">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {hasPhotos
              ? project.photos.map((url, idx) => (
                  <div key={idx} className="cd gi shadow-md">
                    <img src={url} alt={`${project.title} photo ${idx + 1}`} loading="lazy" />
                  </div>
                ))
              : [1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="cd gi ph0 p-8 shadow-xs border border-[var(--ln)]">
                    <span className="select-none text-4xl block mb-2">📷</span>
                    <small className="block text-[14px] font-bold text-[var(--nv)] mb-0.5">
                      Photo {num}
                    </small>
                    <em className="text-xs text-[var(--mu)] not-italic">Coming soon</em>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* 4. Previous / Next Project Navigation Bar */}
      <section className="sec">
        <div className="w flex justify-between items-center gap-4 flex-wrap">
          <Button
            target={prevProject.id}
            variant="outline"
            onClick={(e) => handleNavClick(e, prevProject.id)}
          >
            ← {prevProject.title}
          </Button>

          <Button
            target={nextProject.id}
            variant="default"
            onClick={(e) => handleNavClick(e, nextProject.id)}
          >
            {nextProject.title} →
          </Button>
        </div>
      </section>
    </div>
  );
}
