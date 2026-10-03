import React, { useEffect, useState } from 'react';

export default function TrusteeDetailModal({
  isOpen,
  trustee,
  onClose,
  onEdit,
  isAdmin,
}) {
  const [imgError, setImgError] = useState(false);

  // Reset img error state when trustee photo or id changes
  useEffect(() => {
    setImgError(false);
  }, [trustee?.photo, trustee?.id, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !trustee) return null;

  const hasPhoto = Boolean(trustee.photo && !imgError);

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg relative z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Card */}
        <div className="cd p-6 sm:p-8 shadow-2xl border border-[var(--ln)] relative bg-[var(--card)] rounded-2xl overflow-hidden">
          {/* Top Decorative Gradient Accent */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{
              background: 'linear-gradient(90deg, var(--bl), var(--go), var(--bl))',
            }}
          />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[var(--soft)] text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--ln)] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            ✕
          </button>

          {/* Header & Enlarged Portrait Display */}
          <div className="flex flex-col items-center text-center mt-2 mb-6">
            <div className="relative mb-4 group">
              {hasPhoto ? (
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-2xl ring-4 ring-[var(--go)] ring-offset-4 ring-offset-[var(--card)] bg-[var(--soft)] flex items-center justify-center">
                  <img
                    key={trustee.photo}
                    src={trustee.photo}
                    alt={trustee.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full shadow-2xl ring-4 ring-[var(--go)] ring-offset-4 ring-offset-[var(--card)] bg-[var(--soft)] flex items-center justify-center text-6xl sm:text-7xl select-none"
                >
                  {trustee.avatar || '👤'}
                </div>
              )}

              {/* Sub-badge */}
              <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[var(--bl)] text-white shadow-md">
                  Trustee
                </span>
              </div>
            </div>

            {/* Name & Role */}
            <h3 className="text-2xl sm:text-[26px] font-bold text-[var(--nv)] mt-3 mb-1 font-serif">
              {trustee.name}
            </h3>
            <div className="inline-block text-xs sm:text-sm font-semibold text-[var(--go)] px-3 py-1 rounded-full bg-[var(--soft)] border border-[var(--ln)] mb-2">
              {trustee.role}
            </div>
            <p className="text-[11.5px] uppercase tracking-wider text-[var(--mu)] font-medium">
              Bethesda Charitable Trust • Board of Trustees
            </p>
          </div>

          {/* Biography / Description Content */}
          <div className="bg-[var(--soft)]/60 rounded-xl p-4 sm:p-5 border border-[var(--ln)]/70 mb-6 text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--nv)] mb-2 uppercase tracking-wide">
              <span>📖</span>
              <span>About &amp; Responsibilities</span>
            </div>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--tx)] whitespace-pre-line m-0">
              {trustee.desc ||
                'Dedicated to advancing the mission and compassionate reach of Bethesda Charitable Trust with faith, dignity, and integrity.'}
            </p>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[var(--ln)]">
            {isAdmin ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onEdit) onEdit(trustee);
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-[var(--bl)] bg-[var(--soft)] hover:bg-[var(--bl)] hover:text-white border border-[var(--bl)]/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>✏️</span>
                <span>Edit Trustee</span>
              </button>
            ) : (
              <div className="text-[11px] text-[var(--mu)] italic">
                Bethesda Charitable Trust • Since 2009
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl text-xs font-bold text-white bg-[var(--bl)] hover:bg-[var(--nv)] transition-all shadow-xs cursor-pointer ml-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
