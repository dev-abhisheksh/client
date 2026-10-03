import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import ImpactStrip from '../components/ImpactStrip';
import TrusteeDetailModal from '../components/TrusteeDetailModal';
import TrusteeEditModal from '../components/TrusteeEditModal';
import { aboutContent, COLOR_MAP } from '../data/siteData';
import { useAuth } from '../context/AuthContext';
import { useContent, useUpdateContent } from '../hooks';

// Dedicated React-safe avatar component with dynamic photo rendering and fallback
function TrusteeAvatar({ trustee }) {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [trustee?.photo]);

  if (trustee?.photo && !loadError) {
    return (
      <img
        key={trustee.photo}
        src={trustee.photo}
        alt={trustee.name}
        onError={() => setLoadError(true)}
        className="w-full h-full object-cover"
      />
    );
  }

  return <span>{trustee?.avatar || '👤'}</span>;
}

export default function AboutPage({ onNavigate }) {
  const { hero, story, journey, commitment, belief, trustees } = aboutContent;
  const { isAdmin } = useAuth();

  // Load live trustees from backend or localStorage with fallback to siteData
  const { data: remoteData } = useContent('about_trustees');
  const updateContentMutation = useUpdateContent();

  const getInitialTrustees = () => {
    try {
      const saved = localStorage.getItem('bethesda_trustees');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading cached trustees:', e);
    }
    return trustees.members;
  };

  const [trusteesList, setTrusteesList] = useState(getInitialTrustees);
  const [selectedTrustee, setSelectedTrustee] = useState(null);
  const [editingTrustee, setEditingTrustee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync state if remote database has custom trustees
  useEffect(() => {
    // Axios returns res.data = { success: true, key: "about_trustees", data: [...] }
    const raw = remoteData?.data;
    const serverTrustees = Array.isArray(raw?.data)
      ? raw.data
      : Array.isArray(raw)
      ? raw
      : null;

    if (serverTrustees && serverTrustees.length > 0) {
      setTrusteesList(serverTrustees);
      try {
        localStorage.setItem('bethesda_trustees', JSON.stringify(serverTrustees));
      } catch (e) {}
    }
  }, [remoteData]);

  // Admin CRUD Handlers
  const handleOpenAddTrustee = () => {
    setEditingTrustee(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEditTrustee = (t, e) => {
    if (e) e.stopPropagation();
    setEditingTrustee(t);
    setIsEditModalOpen(true);
  };

  const handleSaveTrustee = (trusteeData) => {
    let updated;
    const index = trusteesList.findIndex((t) => t.id === trusteeData.id);
    if (index >= 0) {
      updated = [...trusteesList];
      updated[index] = { ...trusteesList[index], ...trusteeData };
    } else {
      updated = [...trusteesList, { ...trusteeData }];
    }

    setTrusteesList(updated);
    try {
      localStorage.setItem('bethesda_trustees', JSON.stringify(updated));
    } catch (e) {}

    // Persist to MongoDB backend
    updateContentMutation.mutate(
      { key: 'about_trustees', data: updated },
      {
        onError: (err) => {
          console.warn('Backend sync failed, saved locally:', err);
          alert(
            'Notice: Changes were saved on this device, but syncing to the cloud database encountered an issue: ' +
              (err.response?.data?.message || err.message || 'Network error') +
              '. If you are not logged in as admin, please log in.'
          );
        },
      }
    );

    // Keep detail modal in sync if open
    if (selectedTrustee && selectedTrustee.id === trusteeData.id) {
      setSelectedTrustee({ ...trusteeData });
    }
  };

  const handleDeleteTrustee = (id) => {
    const updated = trusteesList.filter((t) => t.id !== id);
    setTrusteesList(updated);
    try {
      localStorage.setItem('bethesda_trustees', JSON.stringify(updated));
    } catch (e) {}

    updateContentMutation.mutate(
      { key: 'about_trustees', data: updated },
      {
        onError: (err) => {
          console.warn('Backend delete sync failed, saved locally:', err);
        },
      }
    );

    if (selectedTrustee && selectedTrustee.id === id) {
      setSelectedTrustee(null);
    }
  };

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      window.location.hash = target;
    }
  };

  return (
    <div className="about-page">
      {/* 1. Hero Section */}
      <Hero
        variant="dk"
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        actions={hero.actions}
        face={hero.avatar}
      />

      {/* 2. Our Story Section */}
      <section className="sec">
        <div className="w g2 items-center">
          <div>
            <h2>{story.title}</h2>
            {story.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            <div className="q">{story.quote}</div>
          </div>

          <div
            className="cd h-[260px] sm:h-[300px] grid place-items-center text-white text-center p-6 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #8fc07a, #3b7a3b)',
              fontFamily: "'Merriweather', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 3.5vw, 28px)',
              lineHeight: 1.4,
            }}
          >
            <div>
              <span className="text-4xl sm:text-5xl block mb-2 select-none">
                {story.cardEmoji}
              </span>
              {story.cardWords.map((w, idx) => (
                <div key={idx}>{w}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Journey Section - Compact, Minimal & Modern */}
      <section className="sec soft">
        <div className="w">
          <div className="ln mb-8 items-center">
            <div>
              <h2 style={{ margin: 0 }}>{journey.title}</h2>
              <h3 className="text-[15px] sm:text-[17px] text-[var(--nv)] font-semibold mt-1">
                {journey.subtitle}
              </h3>
            </div>
            <p
              style={{
                borderLeft: '2px dotted var(--mu)',
                paddingLeft: '14px',
                fontSize: '13px',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {journey.description}
            </p>
          </div>

          {/* Compact, Minimal, Modern Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {journey.projects.map((p, i) => {
              const colorBg = COLOR_MAP[p.color] || 'var(--bl)';
              return (
                <div
                  key={i}
                  className="bg-[var(--card)] border border-[var(--ln)] rounded-2xl p-5 hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                  onClick={(e) => handleNavClick(e, `pj${i}`)}
                >
                  {/* Top Bar: Icon Pill + Step Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl text-white shadow-xs group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: colorBg }}
                      >
                        {p.icon}
                      </span>
                      <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--soft)] text-[var(--mu)] group-hover:bg-[var(--bl)] group-hover:text-white transition-colors">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h4
                      style={{ color: 'var(--nv)' }}
                      className="font-bold text-[16px] leading-snug mb-1.5 group-hover:text-[var(--bl)] transition-colors"
                    >
                      {p.title}
                    </h4>
                    <p className="text-[13px] text-[var(--mu)] leading-relaxed mb-4">
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom: Minimal Goal Accent & Learn More Link */}
                  <div className="pt-3 border-t border-[var(--ln)]/60 flex flex-col gap-2.5">
                    <div
                      className="bg-[var(--soft)]/70 border-l-[3px] rounded-r-lg px-2.5 py-1.5 text-[11.5px] leading-snug text-[var(--tx)]/90"
                      style={{ borderLeftColor: colorBg }}
                    >
                      <span className="font-bold mr-1 text-[var(--nv)]">Our Goal:</span>
                      <i>{p.goal}</i>
                    </div>

                    <div className="flex items-center justify-between text-[12px] font-semibold text-[var(--bl)] pt-1">
                      <span>View Project</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Our Commitment Section */}
      <section className="sec">
        <div className="w ln">
          <div>
            <h2 style={{ margin: 0 }}>{commitment.title}</h2>
            <h3
              style={{ margin: '4px 0 12px' }}
              className="text-[15px] sm:text-[16px] text-[var(--nv)] font-semibold"
            >
              {commitment.subtitle}
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--mu)] mb-5">
              {commitment.description}
            </p>
            <Button
              target={commitment.buttonTarget}
              onClick={(e) => handleNavClick(e, commitment.buttonTarget)}
            >
              {commitment.buttonText}
            </Button>
          </div>

          <div className="cm">
            {commitment.items.map((c, idx) => {
              const itemColor = COLOR_MAP[c.color] || 'var(--bl)';
              return (
                <div key={idx} className="flex flex-col gap-1">
                  <span
                    className="ic select-none"
                    style={{
                      backgroundColor: itemColor,
                      margin: '0 0 6px',
                      width: '46px',
                      height: '46px',
                      fontSize: '20px',
                    }}
                  >
                    {c.icon}
                  </span>
                  <b
                    style={{
                      color: itemColor,
                      fontFamily: "'Merriweather', serif",
                      fontSize: '14px',
                    }}
                  >
                    {c.title}
                  </b>
                  <span className="text-[13px] text-[var(--mu)] leading-snug">
                    {c.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Our Belief & Board of Trustees Section */}
      <section className="sec soft">
        <div className="w ln">
          {/* Left Column: Our Belief */}
          <div>
            <h2>{belief.title}</h2>
            <div className="flex flex-col gap-2 my-3">
              {belief.items.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-[14px] sm:text-[15px] font-medium text-[var(--tx)]"
                >
                  <span className="select-none shrink-0">🌿</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--mu)] mt-3">
              {belief.summary}
            </p>
          </div>

          {/* Right Column: Board of Trustees */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-1">
              <h2 style={{ margin: 0 }}>{trustees.title}</h2>
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleOpenAddTrustee}
                  className="py-1.5 px-3 rounded-xl text-xs font-bold text-white bg-[var(--bl)] hover:bg-[var(--nv)] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="text-sm">+</span>
                  <span>Add Trustee</span>
                </button>
              )}
            </div>
            <p className="text-[13px] text-[var(--mu)] leading-relaxed m-0 mb-4">
              {trustees.description}
            </p>

            <div className="g5">
              {trusteesList.map((t) => (
                <div
                  key={t.id || t.name}
                  className="cd tr relative group select-none"
                  onClick={() => setSelectedTrustee(t)}
                  title={`Click to view profile of ${t.name}`}
                >
                  {/* Admin Quick Action Controls */}
                  {isAdmin && (
                    <div
                      className="absolute top-2 right-2 flex items-center gap-1 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={(e) => handleOpenEditTrustee(t, e)}
                        className="w-6 h-6 rounded-md bg-[var(--soft)] hover:bg-[var(--bl)] hover:text-white border border-[var(--ln)] text-[11px] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                        title="Edit Trustee"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Are you sure you want to remove "${t.name}" from the Board of Trustees?`)) {
                            handleDeleteTrustee(t.id);
                          }
                        }}
                        className="w-6 h-6 rounded-md bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 text-[11px] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                        title="Delete Trustee"
                      >
                        🗑️
                      </button>
                    </div>
                  )}

                  {/* Avatar / Photo Display */}
                  <div className="av select-none">
                    <TrusteeAvatar trustee={t} />
                  </div>

                  <b className="text-[12px] text-[var(--nv)] font-bold mt-1 line-clamp-1">
                    {t.name}
                  </b>
                  <small className="block text-[11px] text-[var(--mu)] leading-tight mt-0.5 line-clamp-1">
                    {t.role}
                  </small>

                  {/* Click to View Hint */}
                  <span className="mt-2 inline-flex items-center text-[10px] font-semibold text-[var(--bl)] opacity-70 group-hover:opacity-100 transition-opacity">
                    View Profile →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Impact Strip Section */}
      <ImpactStrip />

      {/* 7. Interactive Trustee Detail Modal */}
      <TrusteeDetailModal
        isOpen={Boolean(selectedTrustee)}
        trustee={selectedTrustee}
        onClose={() => setSelectedTrustee(null)}
        onEdit={(t) => {
          setEditingTrustee(t);
          setIsEditModalOpen(true);
        }}
        isAdmin={isAdmin}
      />

      {/* 8. Admin Add / Edit Trustee Modal */}
      <TrusteeEditModal
        isOpen={isEditModalOpen}
        trustee={editingTrustee}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTrustee(null);
        }}
        onSave={handleSaveTrustee}
        onDelete={handleDeleteTrustee}
      />
    </div>
  );
}
