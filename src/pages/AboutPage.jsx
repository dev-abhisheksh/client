import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import ImpactStrip from '../components/ImpactStrip';
import TrusteeDetailModal from '../components/TrusteeDetailModal';
import TrusteeEditModal from '../components/TrusteeEditModal';
import { aboutContent, COLOR_MAP } from '../data/siteData';
import { useAuth } from '../context/AuthContext';
import { useContent, useUpdateContent, usePageHero } from '../hooks';
import { HeroBackground, HeroControls } from '../components/ProjectMediaViewer';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

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
        src={optimizeCloudinaryUrl(trustee.photo, { width: 300, height: 300, crop: 'fill' })}
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
  const heroMedia = usePageHero('about');

  // Load live trustees from backend or localStorage with fallback to siteData
  const { data: remoteData } = useContent('about_trustees');
  const updateContentMutation = useUpdateContent();

  const getInitialTrustees = () => {
    try {
      const saved = localStorage.getItem('bethesda_trustees');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = trustees.members.map((m) => {
            const match = parsed.find((p) => p.id === m.id || p.name === m.name);
            return match && match.photo
              ? { ...m, photo: match.photo, avatar: match.avatar || m.avatar }
              : m;
          });
          const customMembers = parsed.filter(
            (p) => !trustees.members.some((m) => m.id === p.id || m.name === p.name)
          );
          return [...merged, ...customMembers];
        }
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
      const merged = trustees.members.map((m) => {
        const match = serverTrustees.find((p) => p.id === m.id || p.name === m.name);
        return match && match.photo
          ? { ...m, photo: match.photo, avatar: match.avatar || m.avatar }
          : m;
      });
      const customMembers = serverTrustees.filter(
        (p) => !trustees.members.some((m) => m.id === p.id || m.name === p.name)
      );
      const combined = [...merged, ...customMembers];
      setTrusteesList(combined);
      try {
        localStorage.setItem('bethesda_trustees', JSON.stringify(combined));
      } catch {
        // Ignore local storage quota errors
      }
    }
  }, [remoteData, trustees.members]);

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
    } catch {
      // Ignore storage errors
    }

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
    } catch {
      // Ignore storage errors
    }

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
        face={heroMedia.hasPhotos ? null : hero.avatar}
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
          isAdmin ? (
            <HeroControls
              photos={heroMedia.photos}
              viewMode={heroMedia.mediaMode}
              setViewMode={heroMedia.handleToggleMediaMode}
              activeIndex={heroMedia.activeIndex}
              setActiveIndex={heroMedia.setActiveIndex}
              onSelectCoverPhoto={heroMedia.handleSelectCoverPhoto}
              onDeletePhoto={heroMedia.handleDeletePhoto}
              isAdmin={isAdmin}
              isSaving={heroMedia.isSaving}
              onUploadPhoto={heroMedia.handleUploadPhoto}
              isUploading={heroMedia.isUploading}
            />
          ) : null
        }
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
            className="cd h-[260px] sm:h-[300px] overflow-hidden shadow-xl"
          >
            <img
              src="https://res.cloudinary.com/dhdegqchc/image/upload/v1791434243/greenbox.jpg"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Our Journey Section - How Our Journey Started */}
      <section className="sec soft">
        <div className="w">
          {/* Header */}
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="eb2">HOW OUR JOURNEY STARTED</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[var(--nv)] mt-1 mb-2">
              {journey.subtitle}
            </h2>
            <div className="q mt-4 text-[15px] sm:text-[16px] leading-relaxed">
              {journey.lead}
            </div>
          </div>

          {/* Narrative Story Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-10">
            {/* Left: Our Journey Began */}
            <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--go)] font-bold mb-2 block">
                  ORIGIN &amp; CALLING
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--nv)] mb-4">
                  {journey.beganHeading || 'Our Journey Began'}
                </h3>
                <div className="space-y-4 text-[14.5px] sm:text-[15.5px] leading-relaxed text-[var(--tx)]/90">
                  <p>{journey.paragraphs[0]}</p>
                  <p>{journey.paragraphs[1]}</p>
                </div>
              </div>
            </div>

            {/* Right: Growing Our Mission */}
            <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--go)] font-bold mb-2 block">
                  COMMUNITY EXPANSION
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--nv)] mb-2">
                  {journey.growingMission?.title || 'Growing Our Mission'}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[var(--mu)] leading-relaxed mb-5">
                  {journey.growingMission?.subtitle}
                </p>
                <div className="space-y-3.5">
                  {journey.growingMission?.points?.map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-[13.5px] sm:text-[14.5px] leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--go)] mt-2 shrink-0" />
                      <div>
                        <strong className="text-[var(--nv)] font-semibold">{pt.title}</strong>
                        <span className="text-[var(--tx)]/85"> — {pt.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 7 Initiatives Cards */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 shadow-sm mb-10">
            <h3 className="text-[16px] sm:text-[18px] font-bold text-[var(--nv)] mb-5">
              {journey.initiativesTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-3.5">
              {journey.initiatives.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-[var(--soft)]/70 border border-[var(--ln)] hover:border-[var(--go)]/50 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-[var(--card)] shadow-xs flex items-center justify-center text-base shrink-0 select-none">
                    {item.icon}
                  </span>
                  <span className="text-[13px] sm:text-[13.5px] font-semibold text-[var(--tx)] leading-snug">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Foundational Commitment Showcase Card */}
          <div className="bg-gradient-to-br from-[#102237] via-[#17324D] to-[#1c3c5c] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden border border-white/10 text-center">
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  'radial-gradient(700px 300px at 50% 0%, rgba(214, 168, 79, 0.35), transparent 75%)',
              }}
            />
            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-[#D6A84F] font-bold mb-3 inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10">
                {journey.commitmentHeading || 'OUR FOUNDATIONAL COMMITMENT'}
              </span>
              <p className="text-white/80 text-[14px] sm:text-[16px] mb-4">
                {journey.commitmentIntro}
              </p>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif italic font-bold text-white leading-tight sm:leading-snug tracking-tight my-6 sm:my-8 text-balance drop-shadow-sm">
                {journey.commitmentQuote}
              </div>
              <p className="text-white/85 text-[14.5px] sm:text-[16px] leading-relaxed max-w-3xl mx-auto pt-6 border-t border-white/15">
                {journey.continuation}
              </p>
            </div>
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
                    className="ic select-none !w-10 !h-10 sm:!w-[46px] sm:!h-[46px] !text-[18px] sm:!text-[20px]"
                    style={{
                      backgroundColor: itemColor,
                      margin: '0 0 6px',
                    }}
                  >
                    {c.icon}
                  </span>
                  <b
                    style={{
                      color: itemColor,
                      fontFamily: "'Merriweather', serif",
                    }}
                    className="text-[13.5px] sm:text-[14px] leading-snug"
                  >
                    {c.title}
                  </b>
                  <span className="text-[12px] sm:text-[13px] text-[var(--mu)] leading-snug">
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
                  className="cd tr relative group select-none p-5 rounded-2xl flex flex-col items-center justify-between"
                  onClick={() => setSelectedTrustee(t)}
                  title={`Click to view profile of ${t.name}`}
                >
                  {/* Admin Quick Action Controls */}
                  {isAdmin && (
                    <div
                      className="absolute top-2.5 right-2.5 flex items-center gap-1 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={(e) => handleOpenEditTrustee(t, e)}
                        className="w-7 h-7 rounded-lg bg-[var(--soft)] hover:bg-[var(--bl)] hover:text-white border border-[var(--ln)] text-[12px] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
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
                        className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 text-[12px] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
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

                  <div className="w-full flex flex-col items-center text-center">
                    <b className="text-[14px] sm:text-[15px] text-[var(--nv)] font-serif font-bold mt-1 line-clamp-1">
                      {t.name}
                    </b>
                    <small className="block text-[12px] sm:text-[12.5px] text-[var(--mu)] leading-snug mt-1 line-clamp-2">
                      {t.role}
                    </small>
                  </div>

                  {/* Click to View Hint */}
                  <span className="mt-3 inline-flex items-center text-[11px] sm:text-[11.5px] font-semibold text-[var(--bl)] opacity-75 group-hover:opacity-100 transition-opacity">
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
