import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import HomeFocusAreas from '../components/HomeFocusAreas';
import HomeProjects from '../components/HomeProjects';
import HomeGetInvolved from '../components/HomeGetInvolved';
import NeedHelp from '../components/NeedHelp';
import ImpactStrip from '../components/ImpactStrip';
import { HeroBackground, HeroControls } from '../components/ProjectMediaViewer';
import { usePageHero } from '../hooks';
import { homeContent } from '../data/siteData';

export default function HomePage({ onNavigate }) {
  const { hero, statsBar, focusAreas, projectsSection, getInvolvedSection } = homeContent;
  const heroMedia = usePageHero('home');

  useEffect(() => {
    document.body.classList.add('pg-home');
    return () => {
      document.body.classList.remove('pg-home');
    };
  }, []);

  const heroActions = (hero.actions || []).map((btn) => ({
    ...btn,
    onClick: (e) => {
      if (btn.target) {
        if (onNavigate) {
          onNavigate(btn.target);
        } else {
          window.location.hash = btn.target;
        }
      }
    },
  }));

  return (
    <div className="home-page">
      {/* 1. Hero Section with Isolated Carousel / Static Cover Support */}
      <Hero
        variant="dk"
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        actions={heroActions}
        face={null}
        bgMedia={
          heroMedia.hasPhotos ? (
            <HeroBackground
              photos={heroMedia.photos}
              viewMode={heroMedia.mediaMode}
              activeIndex={heroMedia.activeIndex}
              title={hero.title}
            />
          ) : null
        }
        media={
          heroMedia.isAdmin ? (
            <HeroControls
              photos={heroMedia.photos}
              viewMode={heroMedia.mediaMode}
              setViewMode={heroMedia.handleToggleMediaMode}
              activeIndex={heroMedia.activeIndex}
              setActiveIndex={heroMedia.setActiveIndex}
              onSelectCoverPhoto={heroMedia.handleSelectCoverPhoto}
              onDeletePhoto={heroMedia.handleDeletePhoto}
              isAdmin={heroMedia.isAdmin}
              isSaving={heroMedia.isSaving}
              onUploadPhoto={heroMedia.handleUploadPhoto}
              isUploading={heroMedia.isUploading}
            />
          ) : null
        }
      />

      {/* 2. 8-Metric Impact Stats Strip */}
      <StatsBar stats={statsBar} />

      {/* 3. Our Focus Areas */}
      <HomeFocusAreas data={focusAreas} onNavigate={onNavigate} />

      {/* 4. Our Projects: Seven Areas of Service */}
      {/* <HomeProjects data={projectsSection} onNavigate={onNavigate} /> */}

      {/* 5. Get Involved Showcase Split */}
      <HomeGetInvolved data={getInvolvedSection} onNavigate={onNavigate} />

      {/* 6. Need Help Interactive Section */}
      <NeedHelp />

      {/* 7. Impact Strip Section */}
      <ImpactStrip />
    </div>
  );
}
