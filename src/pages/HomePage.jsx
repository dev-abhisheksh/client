import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import HomeFocusAreas from '../components/HomeFocusAreas';
import HomeProjects from '../components/HomeProjects';
import HomeGetInvolved from '../components/HomeGetInvolved';
import NeedHelp from '../components/NeedHelp';
import ImpactStrip from '../components/ImpactStrip';
import { homeContent } from '../data/siteData';

export default function HomePage({ onNavigate }) {
  const { hero, statsBar, focusAreas, projectsSection, getInvolvedSection } = homeContent;

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

  const glassImpactBadge = (
    <div className="gc">
      <small>15+ YEARS OF IMPACT</small>
      <b>15+</b>
      <span>Years of Empowering Lives &amp; Transforming Communities</span>
      <div className="gm">
        <div>
          <b>7</b>
          <small>Areas of Service</small>
        </div>
        <div>
          <b>100%</b>
          <small>Compassion Driven</small>
        </div>
      </div>
    </div>
  );

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero
        variant="dk"
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        actions={heroActions}
        face={glassImpactBadge}
      />

      {/* 2. 5-Metric Impact Stats Strip */}
      <StatsBar stats={statsBar} />

      {/* 3. Our Focus Areas */}
      <HomeFocusAreas data={focusAreas} onNavigate={onNavigate} />

      {/* 4. Our Projects: Seven Areas of Service */}
      <HomeProjects data={projectsSection} onNavigate={onNavigate} />

      {/* 5. Get Involved Showcase Split */}
      <HomeGetInvolved data={getInvolvedSection} onNavigate={onNavigate} />

      {/* 6. Need Help Interactive Section */}
      <NeedHelp />

      {/* 7. Impact Strip Section */}
      <ImpactStrip />
    </div>
  );
}
