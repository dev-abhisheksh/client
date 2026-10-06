import { useState } from 'react';
import { specialProjectsContent } from '../data/siteData';
import {
  useSpecialProjects,
  useUploadSpecialProjectPhoto,
  useDeleteSpecialProjectPhoto,
} from '../hooks';
import { useAuth } from '../context/AuthContext';
import { optimizeCloudinaryUrl } from '../utils/cloudinary';

/**
 * Reusable Special Projects Component
 *
 * Connects with backend for uploading and deleting gallery photos via Cloudinary.
 * Falls back to static data seamlessly if database is empty or offline.
 */

// Default special project data with Manipur
const defaultProjects = specialProjectsContent?.projects || [
  {
    id: 'manipur',
    title: 'Manipur',
    badge: 'Special Relief Project',
    description:
      'Standing alongside vulnerable families and displaced communities in Manipur with critical relief supplies, food assistance, student education support, and rehabilitation care.',
    images: [],
    emptySlotsCount: 4,
  },
];

// Reusable card for a single special project
export function SpecialProjectCard({ project }) {
  const { isAdmin, openLoginModal } = useAuth();
  const [localImages, setLocalImages] = useState([]);

  const uploadPhotoMutation = useUploadSpecialProjectPhoto();
  const deletePhotoMutation = useDeleteSpecialProjectPhoto();

  // Combine database photos (from backend), fallback images, and any local previews
  const dbPhotos = (project.photos || []).map((p) => ({
    _id: p._id,
    url: p.url,
    publicId: p.publicId,
  }));

  const staticPhotos = (project.images || []).map((img) =>
    typeof img === 'string' ? { url: img } : img
  );

  const allPhotos = [
    ...dbPhotos,
    ...staticPhotos,
    ...localImages.map((url) => ({ url, isLocal: true })),
  ];

  const projectId = project._id || project.slug || project.id || 'manipur';
  const isUploading = uploadPhotoMutation.isPending;

  // Handle image upload through backend or local preview (supports multi-upload)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (isAdmin) {
      uploadPhotoMutation.mutate(
        { id: projectId, files },
        {
          onError: (err) => {
            alert('Upload failed: ' + (err.message || 'Error uploading photo(s)'));
          },
        }
      );
    } else {
      // Local preview if not logged in as admin
      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setLocalImages((prev) => [...prev, ...previewUrls]);
    }

    e.target.value = '';
  };

  // Handle photo deletion (Admin only)
  const handleDeletePhoto = (photo) => {
    if (photo.isLocal) {
      setLocalImages((prev) => prev.filter((u) => u !== photo.url));
      return;
    }

    if (!photo._id) return;

    if (window.confirm('Are you sure you want to delete this photo from the special project?')) {
      deletePhotoMutation.mutate(
        { id: projectId, photoId: photo._id },
        {
          onError: (err) => {
            alert('Delete failed: ' + (err.message || 'Error deleting photo'));
          },
        }
      );
    }
  };

  const emptySlotsCount = project.emptySlotsCount ?? 4;
  const slotsToShow =
    allPhotos.length === 0
      ? Array.from({ length: emptySlotsCount })
      : Array.from({ length: 1 });

  return (
    <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300">
      {/* 1. Project Title & Admin Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          {project.badge && (
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-2">
              {project.badge}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--tx)] tracking-tight">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {isAdmin ? (
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              Admin Mode (Uploads sync to cloud)
            </span>
          ) : (
            <button
              onClick={openLoginModal}
              className="text-[11px] text-[var(--mu)] hover:text-amber-500 underline transition-colors"
            >
              Admin login to save permanently
            </button>
          )}

          {allPhotos.length > 0 && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--soft)] text-[var(--mu)]">
              {allPhotos.length} {allPhotos.length === 1 ? 'Photo' : 'Photos'}
            </span>
          )}
        </div>
      </div>

      {/* 2. Project Description */}
      {project.description && (
        <p className="text-[14px] sm:text-[15px] text-[var(--mu)] leading-relaxed max-w-3xl mb-8">
          {project.description}
        </p>
      )}

      {/* 3. Space to Add Images (Gallery Grid) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mu)] flex items-center gap-2">
            <span>📷 Project Gallery</span>
          </h4>
          <span className="text-xs text-[var(--mu)] italic">
            Space to add images
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* A. Render Uploaded & Existing Photos */}
          {allPhotos.map((photo, idx) => (
            <div
              key={photo._id || `img-${idx}`}
              className="group relative rounded-2xl overflow-hidden border border-[var(--ln)] bg-[var(--soft)] aspect-4/3 sm:aspect-square flex flex-col justify-end shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={optimizeCloudinaryUrl(photo.url, { width: 480, quality: 'auto' })}
                alt={`${project.title} photo ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />

              {/* Admin Delete Action */}
              {(isAdmin || photo.isLocal) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePhoto(photo);
                  }}
                  title="Delete Photo"
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}

              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 p-2 text-xs text-white bg-gradient-to-t from-black/80 to-transparent">
                  {photo.caption}
                </div>
              )}
            </div>
          ))}

          {/* B. Render Upload / Placeholder Slots */}
          {slotsToShow.map((_, idx) => (
            <label
              key={`slot-${idx}`}
              className="relative rounded-2xl border-2 border-dashed border-[var(--ln)] hover:border-amber-400 bg-[var(--soft)]/40 hover:bg-[var(--soft)] aspect-4/3 sm:aspect-square flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 group"
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden"
              />

              {isUploading ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-2" />
                  <span className="text-xs font-semibold text-[var(--tx)]">Uploading to Cloud...</span>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--ln)] flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 group-hover:border-amber-400 transition-all">
                    <svg
                      className="w-5 h-5 text-[var(--mu)] group-hover:text-amber-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-[var(--tx)] group-hover:text-amber-500 transition-colors">
                    {allPhotos.length === 0 ? 'Upload Photos (Multi-Select)' : 'Upload More Photos'}
                  </span>
                  <span className="text-[11px] text-[var(--mu)] mt-0.5">
                    {isAdmin ? 'Select one or more images' : 'Preview photos locally'}
                  </span>
                </>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Reusable Component for Special Projects Section
export default function SpecialProjects({
  title = 'Our Special Projects',
  subtitle = 'Focused regional relief and targeted initiatives responding to urgent humanitarian needs.',
  projects = defaultProjects,
}) {
  const { data: dbData } = useSpecialProjects();
  const dbProjects = dbData?.data?.projects;

  // Merge database values with canonical projects
  const displayProjects = projects.map((fallback) => {
    const matchingDb = dbProjects?.find(
      (p) =>
        p.slug === fallback.id ||
        p.slug === fallback.slug ||
        p.title?.toLowerCase() === fallback.title?.toLowerCase()
    );
    if (matchingDb) {
      return { ...fallback, ...matchingDb };
    }
    return fallback;
  });

  return (
    <section className="sec">
      <div className="w">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="c">{title}</h2>
          {subtitle && (
            <p className="text-[14px] sm:text-[15px] text-[var(--mu)] leading-relaxed mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* List of Special Projects */}
        <div className="flex flex-col gap-8">
          {displayProjects.map((project) => (
            <SpecialProjectCard
              key={project._id || project.slug || project.id || project.title}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
