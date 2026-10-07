import React from 'react';
import Button from '../components/Button';
import SpecialProjects from '../components/SpecialProjects';
import ImpactStrip from '../components/ImpactStrip';
import { specialProjectsContent } from '../data/siteData';

export default function SpecialProjectsPage({ onNavigate }) {
  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <div className="special-projects-page">
      {/* 1. Top Navigation Bar */}
      <div className="bg-[var(--soft)]/70 border-b border-[var(--ln)] py-3 sm:py-4">
        <div className="w flex items-center justify-between">
          <Button
            target="projects"
            variant="outline"
            onClick={(e) => handleNavClick(e, 'projects')}
            className="text-xs font-bold"
          >
            ← Back to Projects
          </Button>
          <span className="text-xs text-[var(--mu)] font-mono font-bold tracking-wider uppercase">
            Special Relief Initiatives
          </span>
        </div>
      </div>

      {/* 2. Special Projects Component (with all cards, images, and upload controls) */}
      <SpecialProjects
        title={specialProjectsContent?.title || 'Our Special Projects'}
        subtitle={
          specialProjectsContent?.subtitle ||
          'Focused regional relief and targeted initiatives responding to urgent humanitarian needs.'
        }
        projects={specialProjectsContent?.projects}
      />

      {/* 3. Closing Impact Strip */}
      <ImpactStrip />
    </div>
  );
}
