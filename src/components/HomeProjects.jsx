import React from 'react';
import { COLOR_MAP } from '../data/siteData';
import Button from './Button';

export default function HomeProjects({ data, onNavigate }) {
  if (!data) return null;
  const {
    eyebrow = 'OUR PROJECTS',
    title = 'Seven Areas of Service',
    description = 'Since 2009, each project has grown from a desire to respond practically and compassionately to those who need support.',
    projects = [],
    exploreCard = {
      title: 'Explore every project',
      description: 'See how each initiative serves children, women, families and communities.',
      buttonText: 'View All Projects →',
      target: 'projects',
    },
  } = data;

  const handleCardClick = (target) => {
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <section className="sec bw">
      <div className="w">
        <div className="fa">
          <div className="eb2">{eyebrow}</div>
          <h2>{title}</h2>
          {description && (
            <p style={{ color: 'var(--mu)', maxWidth: '640px', margin: '10px 0 0' }}>
              {description}
            </p>
          )}
        </div>
        <div className="g4">
          {projects.map((project, i) => {
            const targetId = project.id || `pj${i}`;
            const bgColor = COLOR_MAP[project.color] || 'var(--bl)';
            return (
              <div
                key={i}
                className="cd pc cursor-pointer"
                onClick={() => handleCardClick(targetId)}
              >
                <span
                  className="ic"
                  style={{
                    backgroundColor: bgColor,
                    margin: '0 0 14px',
                    border: 0,
                  }}
                >
                  {project.icon}
                </span>
                <h3 style={{ textTransform: 'none', fontSize: '17px', marginBottom: '6px' }}>
                  {project.title}
                </h3>
                <p>{project.desc}</p>
                <a
                  className="lk"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(targetId);
                  }}
                >
                  Learn more →
                </a>
              </div>
            );
          })}

          {/* 8th Explore Card */}
          <div
            className="cd pc"
            style={{
              background: 'var(--nv)',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '14px',
            }}
          >
            <h3 style={{ color: '#fff', textTransform: 'none', fontSize: '20px' }}>
              {exploreCard.title}
            </h3>
            <p style={{ color: '#dbe6fb' }}>{exploreCard.description}</p>
            <div>
              <Button
                variant="gold"
                onClick={() => handleCardClick(exploreCard.target)}
              >
                {exploreCard.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
