import React, { useState, useEffect } from 'react';
import { uploadImage } from '../api/upload.api';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

const EMOJI_OPTIONS = ['👩', '👨', '👩‍⚕️', '👔', '🧑‍🏫', '🤝', '🧑‍💼', '👤', '✝️', '🕊️'];

export default function TrusteeEditModal({
  isOpen,
  trustee,
  onClose,
  onSave,
  onDelete,
}) {
  const isNew = !trustee || !trustee.id;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    desc: '',
    photo: '',
    avatar: '👤',
  });

  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [imgPreviewFailed, setImgPreviewFailed] = useState(false);

  useEffect(() => {
    if (trustee) {
      setFormData({
        id: trustee.id || `tr-${Date.now()}`,
        name: trustee.name || '',
        role: trustee.role || '',
        desc: trustee.desc || '',
        photo: trustee.photo || '',
        avatar: trustee.avatar || '👤',
      });
    } else {
      setFormData({
        id: `tr-${Date.now()}`,
        name: '',
        role: '',
        desc: '',
        photo: '',
        avatar: '👤',
      });
    }
    setErrorMsg('');
    setImgPreviewFailed(false);
  }, [trustee, isOpen]);

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

  if (!isOpen) return null;

  // Helper to compress image if fallback is needed
  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const image = new Image();
        image.onload = () => {
          const maxDim = 450;
          let width = image.width;
          let height = image.height;
          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        image.onerror = () => resolve(readerEvent.target.result);
        image.src = readerEvent.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  // Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setUploading(true);

    try {
      // First attempt uploading to backend/Cloudinary
      const res = await uploadImage(file);
      if (res?.data?.image?.url) {
        setFormData((prev) => ({ ...prev, photo: res.data.image.url }));
        setImgPreviewFailed(false);
        setUploading(false);
        return;
      }
    } catch (err) {
      console.warn('Backend image upload failed, falling back to optimized lightweight preview:', err);
    }

    // Graceful offline fallback: compress and store lightweight base64 Data URL
    try {
      const compressedUrl = await compressImageFile(file);
      if (compressedUrl) {
        setFormData((prev) => ({ ...prev, photo: compressedUrl }));
        setImgPreviewFailed(false);
      } else {
        setErrorMsg('Failed to process image file. Please enter an image URL.');
      }
    } catch (err) {
      setErrorMsg('Failed to process image file. Please enter an image URL.');
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Trustee name is required.');
      return;
    }
    if (!formData.role.trim()) {
      setErrorMsg('Trustee role / designation is required.');
      return;
    }

    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove "${formData.name}" from the Board of Trustees?`)) {
      if (onDelete) onDelete(formData.id);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[92vh] flex flex-col relative z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Card */}
        <div className="cd p-6 sm:p-8 shadow-2xl border border-[var(--ln)] relative bg-[var(--card)] rounded-2xl flex flex-col overflow-hidden max-h-[90vh]">
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
            aria-label="Close Edit Modal"
          >
            ✕
          </button>

          {/* Modal Header */}
          <div className="mb-4 pr-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--bl)]">
              Admin CMS • Board of Trustees
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--nv)] m-0 mt-0.5">
              {isNew ? 'Add New Trustee' : 'Edit Trustee Details'}
            </h3>
            <p className="text-xs text-[var(--mu)] mt-1">
              Update name, role, photograph, and biographical description.
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Scrollable Form Body */}
          <form onSubmit={handleSubmit} className="overflow-y-auto pr-1 space-y-4 flex-1">
            {/* Live Preview & Photo Uploader */}
            <div className="p-4 rounded-xl bg-[var(--soft)]/70 border border-[var(--ln)] flex flex-col sm:flex-row items-center gap-4">
              {/* Photo Preview Circle */}
              <div className="relative shrink-0">
                {formData.photo && !imgPreviewFailed ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg ring-3 ring-[var(--go)] bg-[var(--card)] flex items-center justify-center">
                    <img
                      key={formData.photo}
                      src={optimizeCloudinaryUrl(formData.photo, { width: 160, height: 160, crop: 'fill' })}
                      alt="Preview"
                      onError={() => setImgPreviewFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full shadow-lg ring-3 ring-[var(--go)] bg-[var(--card)] flex items-center justify-center text-4xl select-none">
                    {formData.avatar || '👤'}
                  </div>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white text-xs">
                    <span className="animate-spin text-lg">⏳</span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 w-full text-center sm:text-left">
                <div className="text-xs font-bold text-[var(--nv)] mb-1">
                  Trustee Photo
                </div>
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <label className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-[var(--bl)] text-white hover:bg-[var(--nv)] cursor-pointer transition-colors shadow-xs">
                    <span>{uploading ? 'Uploading...' : '📁 Upload Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>

                  {formData.photo && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, photo: '' }))}
                      className="py-1.5 px-2.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 border border-red-500/30 transition-colors cursor-pointer"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
                <div className="text-[11px] text-[var(--mu)] mt-1.5">
                  Or paste a direct image URL below.
                </div>
              </div>
            </div>

            {/* Direct Image URL input */}
            <div>
              <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                Image URL (optional)
              </label>
              <input
                type="text"
                value={formData.photo}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, photo: e.target.value }));
                  setImgPreviewFailed(false);
                }}
                placeholder="https://images.unsplash.com/... or paste image URL / Data URI"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)]"
              />
            </div>

            {/* Fallback Emoji Avatar Picker */}
            <div>
              <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                Fallback Avatar Icon (when photo is not available)
              </label>
              <div className="flex flex-wrap gap-1.5 items-center">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, avatar: emoji }))}
                    className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center transition-all cursor-pointer ${
                      formData.avatar === emoji
                        ? 'bg-[var(--bl)] text-white scale-110 shadow-sm'
                        : 'bg-[var(--soft)] hover:bg-[var(--ln)]'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Mrs. Rajani S. Naik"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)]"
              />
            </div>

            {/* Role Input */}
            <div>
              <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                Role / Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                placeholder="e.g. President – Social Activities"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)]"
              />
            </div>

            {/* Description / Bio Textarea */}
            <div>
              <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                Biographical Description / Credentials <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.desc}
                onChange={(e) => setFormData((prev) => ({ ...prev, desc: e.target.value }))}
                placeholder="Write a detailed biography, background, or specific responsibilities within the trust..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)] resize-y"
              />
              <div className="text-[11px] text-[var(--mu)] mt-1">
                This description will be displayed when visitors tap the trustee's card to view their profile.
              </div>
            </div>

            {/* Form Actions Footer */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--ln)] mt-4">
              {!isNew ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="py-2 px-3.5 rounded-xl text-xs font-bold text-red-600 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors cursor-pointer"
                >
                  🗑️ Delete Trustee
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 rounded-xl text-xs font-bold text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--soft)] border border-[var(--ln)] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="py-2 px-5 rounded-xl text-xs font-bold text-white bg-[var(--bl)] hover:bg-[var(--nv)] transition-all shadow-md cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
                >
                  <span>✓</span>
                  <span>{isNew ? 'Add Trustee' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
