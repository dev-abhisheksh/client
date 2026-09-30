import React from 'react';
import Hero from '../components/Hero';
import WhereSupportGoes from '../components/WhereSupportGoes';
import NeedHelp from '../components/NeedHelp';
import ImpactStrip from '../components/ImpactStrip';
import { homeContent } from '../data/siteData';

export default function HomePage({ onNavigate }) {
  const { hero } = homeContent;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero
        variant="dk"
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        actions={hero.actions}
        face={hero.avatar}
      />

      {/* Where Your Support Can Go Section */}
      <WhereSupportGoes onNavigate={onNavigate} />

      {/* Need Help Interactive Section */}
      <NeedHelp />

      {/* Impact Strip Section */}
      <ImpactStrip />
    </div>
  );
}
