import { useState } from 'react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import ImageWithLoader from '../components/ImageWithLoader';
import {
  ProjectHeroBackground,
  ProjectHeroControls,
} from '../components/ProjectMediaViewer';
import { projectsContent } from '../data/siteData';
import {
  useProjects,
  useUpdateProject,
  useUploadProjectPhoto,
  useDeleteProjectPhoto,
} from '../hooks';
import { useAuth } from '../context/AuthContext';

export default function ProjectDetailPage({ projectId, onNavigate }) {
  const { projects: fallbackProjects } = projectsContent;
  const { data: dbData } = useProjects();
  const { isAdmin } = useAuth();

  const updateProjectMutation = useUpdateProject();
  const uploadPhotoMutation = useUploadProjectPhoto();
  const deletePhotoMutation = useDeleteProjectPhoto();

  // Find project by id (e.g. 'pj0'), MongoDB _id, or index
  const dbProjects = dbData?.data?.projects;
  let activeIndex = fallbackProjects.findIndex((p) => p.id === projectId);
  if (activeIndex === -1 && dbProjects) {
    activeIndex = dbProjects.findIndex((p) => p._id === projectId || String(p.order) === projectId);
  }
  if (activeIndex === -1) activeIndex = 0;

  // Use live data from database with fallback to siteData
  const baseProject = fallbackProjects[activeIndex] || fallbackProjects[0];
  const dbProject =
    dbProjects?.find((p) => p._id === projectId || p.order === activeIndex) ||
    dbProjects?.[activeIndex];
  const project = dbProject ? { ...baseProject, ...dbProject } : baseProject;

  // Circular previous and next calculation
  const total = fallbackProjects.length;
  const prevIndex = (activeIndex + total - 1) % total;
  const nextIndex = (activeIndex + 1) % total;

  const prevProject =
    dbProjects && dbProjects[prevIndex]
      ? { ...fallbackProjects[prevIndex], ...dbProjects[prevIndex] }
      : fallbackProjects[prevIndex];
  const nextProject =
    dbProjects && dbProjects[nextIndex]
      ? { ...fallbackProjects[nextIndex], ...dbProjects[nextIndex] }
      : fallbackProjects[nextIndex];

  // Hero media view mode (Static Image vs Smooth Swiper Carousel)
  const [customMediaMode, setCustomMediaMode] = useState(null);
  const [prevProjectId, setPrevProjectId] = useState(project?._id);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Reset custom mode when navigating to a different project
  if (project?._id !== prevProjectId) {
    setPrevProjectId(project?._id);
    setCustomMediaMode(null);
  }

  const mediaMode = customMediaMode ?? (project?.mediaMode || 'carousel');

  // Persist mediaMode ("static" | "carousel") change to MongoDB across the entire website
  const handleToggleMediaMode = (newMode) => {
    setCustomMediaMode(newMode);
    if (!project?._id) {
      console.warn('Cannot save mediaMode: Project ID not found');
      return;
    }

    updateProjectMutation.mutate(
      {
        id: project._id,
        data: { mediaMode: newMode },
      },
      {
        onError: (err) => {
          alert('Failed to save display mode: ' + (err.message || 'Error occurred'));
          setCustomMediaMode(project.mediaMode || 'carousel');
        },
      }
    );
  };

  // Reorder photos to set selected thumbnail as primary cover photo across the site
  const handleSelectCoverPhoto = (idx) => {
    setActivePhotoIndex(0);
    if (!project?._id || !project.photos || project.photos.length <= idx) return;
    if (idx === 0) return;

    const selected = project.photos[idx];
    const remaining = project.photos.filter((_, i) => i !== idx);
    const updatedPhotos = [selected, ...remaining];

    updateProjectMutation.mutate(
      {
        id: project._id,
        data: { photos: updatedPhotos },
      },
      {
        onError: (err) => {
          alert('Failed to save cover image: ' + (err.message || 'Error occurred'));
        },
      }
    );
  };

  // Admin edit modal state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title || '',
    desc: project.desc || '',
    goal: project.goal || '',
    aboutText: project.aboutText || '',
    mediaMode: project.mediaMode || 'carousel',
  });

  const handleOpenEdit = () => {
    setFormData({
      title: project.title || '',
      desc: project.desc || '',
      goal: project.goal || '',
      aboutText: project.aboutText || '',
      mediaMode: project.mediaMode || mediaMode || 'carousel',
    });
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!project._id) {
      alert('Project ID not found in database. Please ensure database is seeded.');
      return;
    }
    updateProjectMutation.mutate(
      {
        id: project._id,
        data: formData,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (err) => {
          alert('Failed to save project changes: ' + (err.response?.data?.message || err.message));
        },
      }
    );
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (!project._id) {
      alert('Project ID not found. Ensure backend is running and database is seeded.');
      return;
    }
    uploadPhotoMutation.mutate(
      { id: project._id, files },
      {
        onError: (err) => {
          alert('Failed to upload photo(s): ' + (err.response?.data?.message || err.message));
        },
      }
    );
    e.target.value = '';
  };

  const handleDeletePhoto = (photoId) => {
    if (!project._id || !photoId) return;
    if (window.confirm('Are you sure you want to delete this photo from the gallery?')) {
      deletePhotoMutation.mutate(
        { id: project._id, photoId },
        {
          onError: (err) => {
            alert('Failed to delete photo: ' + (err.response?.data?.message || err.message));
          },
        }
      );
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

  const photos = project.photos || [];
  const hasPhotos = photos.length > 0;

  return (
    <div className="project-detail-page">
      {/* Admin Quick Action Floating Banner */}
      {isAdmin && (
        <div className="bg-[var(--gold)]/10 border-b border-[var(--gold)]/30 py-3 px-4 sticky top-16 z-30 backdrop-blur-md">
          <div className="w flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-bold text-[var(--nv)] flex items-center gap-1.5">
              <span>⚡</span> <span>Admin Mode: You have edit & upload permissions for this project.</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleOpenEdit}
                className="bg-[var(--nv)] hover:bg-[var(--bl)] text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition-colors shadow-xs"
              >
                ✏️ Edit Text
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <Hero
        variant="dk"
        eyebrow="Project Gallery"
        title={project.title}
        subtitle={`Gallery for ${project.title}`}
        description={project.desc}
        actions={[
          { label: '← All Projects', target: 'projects', variant: 'white-outline' },
          { label: 'Support This Project', target: 'contact', variant: 'gold' },
        ]}
        bgMedia={
          photos.length > 0 ? (
            <ProjectHeroBackground
              photos={project.photos}
              viewMode={mediaMode}
              activeIndex={activePhotoIndex}
              title={project.title}
            />
          ) : null
        }
        media={
          isAdmin ? (
            <ProjectHeroControls
              photos={project.photos}
              viewMode={mediaMode}
              setViewMode={handleToggleMediaMode}
              activeIndex={activePhotoIndex}
              setActiveIndex={setActivePhotoIndex}
              onSelectCoverPhoto={handleSelectCoverPhoto}
              onDeletePhoto={(idx) => {
                const p = project.photos?.[idx];
                handleDeletePhoto(p?._id || p?.url || p);
              }}
              isAdmin={isAdmin}
              isSaving={updateProjectMutation.isPending}
              onUploadPhoto={(fileOrFiles) => {
                if (project._id) {
                  uploadPhotoMutation.mutate({ id: project._id, files: fileOrFiles });
                }
              }}
              isUploading={uploadPhotoMutation.isPending}
            />
          ) : null
        }
        face={project.icon}
      />

      {/* 2. About The Project */}
      <section className="sec">
        <div className="w" style={{ maxWidth: '860px' }}>
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <h2>About {project.title}</h2>
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleOpenEdit}
                  className="text-xs text-[var(--bl)] font-bold hover:underline flex items-center gap-1"
                >
                  ✏️ Edit Details
                </button>
              )}
            </div>
            <p className="text-[14px] sm:text-[15px] text-[var(--tx)] leading-relaxed mt-3 whitespace-pre-line">
              {project.aboutText}
            </p>
            <div className="q mt-5">
              <b className="font-bold">Our goal: </b>
              <i>{project.goal}</i>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Gallery Section */}
      <section className="sec soft">
        <div className="w">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="m-0">Gallery</h2>
              <p className="text-xs text-[var(--mu)] mt-1">
                Visual stories and moments from our {project.title} outreach.
              </p>
            </div>

            {/* Admin Upload Button */}
            {isAdmin && (
              <label className="inline-flex items-center gap-2 bg-[var(--bl)] hover:bg-[var(--nv)] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer shadow-sm transition-all hover:scale-[1.02]">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  disabled={uploadPhotoMutation.isPending}
                  onChange={handlePhotoUpload}
                />
                <span>{uploadPhotoMutation.isPending ? '⏳ Uploading...' : '📷 Upload Photos (Multi)'}</span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {/* Gallery Photos */}
            {hasPhotos
              ? photos.map((item, idx) => {
                  const url = typeof item === 'string' ? item : item.url;
                  const photoId = typeof item === 'object' ? item._id : null;

                  return (
                    <div
                      key={photoId || idx}
                      className="cd gi shadow-md relative group overflow-hidden rounded-xl bg-black/5 transform-gpu will-change-transform"
                    >
                      <ImageWithLoader
                        src={url}
                        transformOptions={{ width: 640, quality: 'auto' }}
                        loading={idx < 3 ? 'eager' : 'lazy'}
                        alt={`${project.title} photo ${idx + 1}`}
                        containerClassName="w-full h-56"
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Delete Overlay for Admin */}
                      {isAdmin && photoId && (
                        <button
                          type="button"
                          onClick={() => handleDeletePhoto(photoId)}
                          disabled={deletePhotoMutation.isPending}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg opacity-90 hover:opacity-100 transition-all hover:scale-110"
                          title="Delete photo from gallery"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  );
                })
              : [1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="cd gi ph0 p-8 shadow-xs border border-[var(--ln)]">
                    <span className="select-none text-4xl block mb-2">📷</span>
                    <small className="block text-[14px] font-bold text-[var(--nv)] mb-0.5">
                      Photo {num}
                    </small>
                    <em className="text-xs text-[var(--mu)] not-italic">Coming soon</em>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* 4. Previous / Next Project Navigation Bar */}
      <section className="sec">
        <div className="w flex justify-between items-center gap-4 flex-wrap">
          <Button
            target={prevProject.id}
            variant="outline"
            onClick={(e) => handleNavClick(e, prevProject.id)}
          >
            ← {prevProject.title}
          </Button>

          <Button
            target={nextProject.id}
            variant="default"
            onClick={(e) => handleNavClick(e, nextProject.id)}
          >
            {nextProject.title} →
          </Button>
        </div>
      </section>

      {/* Admin Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[var(--card)] border border-[var(--ln)] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--ln)] mb-5">
              <div>
                <h3 className="text-lg font-bold text-[var(--nv)] m-0">Edit Project Details</h3>
                <p className="text-xs text-[var(--mu)] mt-0.5">
                  Update text for &quot;{project.title}&quot; (Saved to MongoDB)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-[var(--soft)] text-[var(--mu)] hover:text-[var(--tx)] flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                  Short Description
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                  Project Goal (Italicized Callout)
                </label>
                <input
                  type="text"
                  required
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                  Full &quot;About&quot; Text
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.aboutText}
                  onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[var(--ln)] bg-[var(--bg)] text-[var(--tx)] focus:outline-none focus:border-[var(--bl)]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--nv)] mb-1">
                  Header Media Display Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaMode: 'carousel' })}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.mediaMode === 'carousel'
                        ? 'bg-[var(--bl)] text-white border-[var(--bl)] shadow-xs'
                        : 'bg-[var(--bg)] text-[var(--tx)] border-[var(--ln)] hover:border-[var(--bl)]'
                    }`}
                  >
                    🎡 Smooth Carousel
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaMode: 'static' })}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.mediaMode === 'static'
                        ? 'bg-[var(--bl)] text-white border-[var(--bl)] shadow-xs'
                        : 'bg-[var(--bg)] text-[var(--tx)] border-[var(--ln)] hover:border-[var(--bl)]'
                    }`}
                  >
                    🖼️ Static Image
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--ln)] mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-xs font-bold text-[var(--mu)] hover:text-[var(--tx)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProjectMutation.isPending}
                  className="px-5 py-2 text-xs font-bold text-white bg-[var(--bl)] hover:bg-[var(--nv)] rounded-xl transition-all shadow-sm"
                >
                  {updateProjectMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
